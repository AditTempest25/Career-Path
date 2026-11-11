import { NextResponse } from "next/server";
import { saveUserData } from "@/lib/server/db";
import { getAuthenticatedSession } from "@/lib/server/session";
import type { UserData } from "@/lib/types";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Tidak terautentikasi." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: session.data,
    });
  } catch (error) {
    console.error("[GET /api/user/data]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data progres." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Tidak terautentikasi." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as { data?: UserData };
    if (!body?.data) {
      return NextResponse.json(
        { ok: false, error: "Payload data tidak valid." },
        { status: 400 }
      );
    }

    const saved = await saveUserData(session.rawUser.id, body.data);
    return NextResponse.json({
      ok: true,
      data: saved,
    });
  } catch (error) {
    console.error("[PUT /api/user/data]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal menyimpan data progres ke server." },
      { status: 500 }
    );
  }
}
