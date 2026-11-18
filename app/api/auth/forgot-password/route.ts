import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/server/auth-crypto";
import {
  createPasswordResetOtp,
  verifyOtpAndResetPassword,
} from "@/lib/server/db";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { DEMO_EMAIL } from "@/lib/seed-data";

const requestOtpSchema = z.object({
  action: z.literal("request"),
  email: z.string().trim().email("Masukkan alamat email yang valid."),
});

const resetPasswordSchema = z.object({
  action: z.literal("reset"),
  email: z.string().trim().email("Format email tidak valid."),
  code: z.string().trim().length(6, "Kode OTP harus 6 digit angka."),
  newPassword: z.string().min(8, "Kata sandi baru minimal 8 karakter."),
});

const forgotSchema = z.discriminatedUnion("action", [
  requestOtpSchema,
  resetPasswordSchema,
]);

export async function POST(request: Request) {
  try {
    const rate = checkRateLimit(request, "auth-forgot-pw", 6, 60_000);
    if (!rate.allowed) return rate.response;

    const body = await request.json();
    const parsed = forgotSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message || "Permintaan reset kata sandi tidak valid.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase();
    if (email === DEMO_EMAIL) {
      return NextResponse.json(
        {
          ok: false,
          error: "Akun demo dilindungi dan tidak dapat diubah kata sandinya.",
        },
        { status: 403 }
      );
    }

    // PF-001: Nonaktifkan pemulihan mandiri di server jika kanal pengiriman terverifikasi belum tersedia.
    const verifiedChannelEnabled = process.env.PATHFORGE_VERIFIED_RECOVERY_ENABLED === "true";
    if (!verifiedChannelEnabled) {
      return NextResponse.json(
        {
          ok: false,
          disabled: true,
          error:
            "Fitur pemulihan kata sandi mandiri dinonaktifkan karena kanal pengiriman email OTP terverifikasi belum tersedia.",
        },
        { status: 403 }
      );
    }

    if (parsed.data.action === "request") {
      const otpRes = await createPasswordResetOtp(email);
      if (!otpRes.ok) {
        return NextResponse.json(
          { ok: false, error: otpRes.error },
          { status: 404 }
        );
      }

      // PF-001: Jangan pernah mengirimkan kode rahasia (OTP) kembali di body HTTP response.
      return NextResponse.json({
        ok: true,
        expiresAt: otpRes.expiresAt,
        message:
          "Jika email terdaftar, kode OTP pemulihan telah dikirim melalui kanal email pemilik.",
      });
    }

    // action === "reset"
    const newHash = hashPassword(parsed.data.newPassword);
    const resetRes = await verifyOtpAndResetPassword(
      email,
      parsed.data.code,
      newHash
    );

    if (!resetRes.ok) {
      return NextResponse.json(
        { ok: false, error: resetRes.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Kata sandi berhasil direset dan seluruh sesi lama telah dicabut.",
    });
  } catch (error) {
    console.error("[POST /api/auth/forgot-password]", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server saat mereset kata sandi." },
      { status: 500 }
    );
  }
}
