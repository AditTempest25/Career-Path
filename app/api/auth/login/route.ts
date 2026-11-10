import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "@/lib/server/auth-crypto";
import {
  ensureDemoUser,
  findUserByEmail,
  getUserData,
  toPublicUser,
} from "@/lib/server/db";
import { issueSessionCookie } from "@/lib/server/session";
import { DEMO_EMAIL } from "@/lib/seed-data";

const loginSchema = z.object({
  email: z.string().trim().email("Format email tidak valid."),
  password: z.string().min(1, "Kata sandi wajib diisi."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || "Data login tidak valid.";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // Pastikan akun demo sudah ter-seed jika user login manual memakai email demo
    if (normalizedEmail === DEMO_EMAIL) {
      await ensureDemoUser();
    }

    const user = await findUserByEmail(normalizedEmail);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { ok: false, error: "Email atau kata sandi salah." },
        { status: 401 }
      );
    }

    await issueSessionCookie(user.id);
    const data = await getUserData(user.id);

    return NextResponse.json({
      ok: true,
      user: toPublicUser(user),
      data,
    });
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server saat proses masuk." },
      { status: 500 }
    );
  }
}
