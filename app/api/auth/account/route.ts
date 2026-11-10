import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/lib/server/auth-crypto";
import {
  deleteUserAccount,
  toPublicUser,
  updateUserAccount,
  updateUserPassword,
} from "@/lib/server/db";
import {
  getAuthenticatedSession,
  revokeSessionCookie,
} from "@/lib/server/session";

const updateProfileAccountSchema = z.object({
  type: z.literal("profile"),
  name: z.string().trim().min(2, "Nama minimal 2 karakter.").optional(),
  email: z.string().trim().email("Format email tidak valid.").optional(),
});

const changePasswordSchema = z.object({
  type: z.literal("password"),
  currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi."),
  newPassword: z.string().min(8, "Kata sandi baru minimal 8 karakter."),
});

const patchSchema = z.discriminatedUnion("type", [
  updateProfileAccountSchema,
  changePasswordSchema,
]);

export async function PATCH(request: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Sesi telah berakhir. Silakan masuk kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message || "Data pembaruan akun tidak valid.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    if (parsed.data.type === "profile") {
      const updated = await updateUserAccount(session.rawUser.id, {
        name: parsed.data.name,
        email: parsed.data.email,
      });

      if (!updated.ok) {
        return NextResponse.json(
          { ok: false, error: updated.error },
          { status: 409 }
        );
      }

      return NextResponse.json({
        ok: true,
        user: toPublicUser(updated.user),
      });
    }

    // type === "password"
    const isCurrentValid = verifyPassword(
      parsed.data.currentPassword,
      session.rawUser.passwordHash
    );
    if (!isCurrentValid) {
      return NextResponse.json(
        { ok: false, error: "Kata sandi saat ini salah." },
        { status: 400 }
      );
    }

    const newHash = hashPassword(parsed.data.newPassword);
    await updateUserPassword(session.rawUser.id, newHash);

    return NextResponse.json({
      ok: true,
      message: "Kata sandi berhasil diperbarui.",
    });
  } catch (error) {
    console.error("[PATCH /api/auth/account]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal memperbarui pengaturan akun." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getAuthenticatedSession();
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Tidak ada sesi aktif." },
        { status: 401 }
      );
    }

    await deleteUserAccount(session.rawUser.id);
    await revokeSessionCookie();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/auth/account]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus akun." },
      { status: 500 }
    );
  }
}
