import { NextResponse } from "next/server";
import { revokeSessionCookie } from "@/lib/server/session";

export async function POST() {
  try {
    await revokeSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[POST /api/auth/logout]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus sesi login." },
      { status: 500 }
    );
  }
}
