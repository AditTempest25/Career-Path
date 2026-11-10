import { NextResponse } from "next/server";
import { ensureDemoUser, toPublicUser } from "@/lib/server/db";
import { issueSessionCookie } from "@/lib/server/session";

export async function POST() {
  try {
    const { user, data } = await ensureDemoUser();
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
