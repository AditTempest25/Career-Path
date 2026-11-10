import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/server/auth-crypto";
import {
  createPasswordResetOtp,
  ensureDemoUser,
  verifyOtpAndResetPassword,
} from "@/lib/server/db";
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
    const body = await request.json();
    const parsed = forgotSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message || "Permintaan reset kata sandi tidak valid.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    if (parsed.data.action === "request") {
      const email = parsed.data.email.toLowerCase();
      if (email === DEMO_EMAIL) {
        await ensureDemoUser();
      }

      const otpRes = await createPasswordResetOtp(email);
      if (!otpRes.ok) {
        return NextResponse.json(
          { ok: false, error: otpRes.error },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ok: true,
        devOtpCode: otpRes.code,
        expiresAt: otpRes.expiresAt,
        message: "Kode OTP pemulihan kata sandi telah dibuat.",
      });
    }

    // action === "reset"
    const newHash = hashPassword(parsed.data.newPassword);
    const resetRes = await verifyOtpAndResetPassword(
      parsed.data.email,
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
      message: "Kata sandi berhasil direset! Silakan masuk dengan kata sandi baru.",
    });
  } catch (error) {
    console.error("[POST /api/auth/forgot-password]", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server saat mereset kata sandi." },
      { status: 500 }
    );
  }
}
