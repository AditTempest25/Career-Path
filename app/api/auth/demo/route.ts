import { NextResponse } from "next/server";
import { createIsolatedDemoUser, toPublicUser } from "@/lib/server/db";
import { issueSessionCookie } from "@/lib/server/session";

export async function POST() {
  try {
    // PF-012: Setiap pengunjung demo mendapatkan akun & state demo terisolasi
    const { user, data } = await createIsolatedDemoUser();
    await issueSessionCookie(user.id);

    return NextResponse.json({
      ok: true,
      user: toPublicUser(user),
      data,
    });
  } catch (error) {
    console.error("[POST /api/auth/demo]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal memuat akun demo dari server." },
      { status: 500 }
    );
  }
}
