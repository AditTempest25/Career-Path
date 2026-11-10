import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/server/auth-crypto";
import { createUser, toPublicUser } from "@/lib/server/db";
import { issueSessionCookie } from "@/lib/server/session";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama lengkap minimal 2 karakter.")
    .max(80, "Nama lengkap terlalu panjang."),
  email: z.string().trim().email("Masukkan alamat email yang valid."),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter.")
    .max(128, "Kata sandi terlalu panjang."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message || "Data pendaftaran tidak valid.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const passwordHash = hashPassword(password);

    const created = await createUser({
      name,
      email,
      passwordHash,
    });

    if (!created.ok) {
      return NextResponse.json(
        { ok: false, error: created.error },
        { status: 409 }
      );
    }

    await issueSessionCookie(created.user.id);

    return NextResponse.json(
      {
        ok: true,
        user: toPublicUser(created.user),
        data: created.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server saat membuat akun." },
      { status: 500 }
    );
  }
}
