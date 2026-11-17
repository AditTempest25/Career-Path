import { NextResponse } from "next/server";
import {
  errorResponse,
  isPayloadTooLarge,
  readJson,
  requireSession,
} from "@/lib/server/api";
import { saveUserData } from "@/lib/server/db";
import { normalizeUserData } from "@/lib/seed-data";
import { makeActivity } from "@/lib/seed-data";
import type { UserData } from "@/lib/types";

export async function GET() {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const { user, data } = auth.session;

    return NextResponse.json({
      ok: true,
      backup: {
        app: "PathForge",
        version: 1,
        exportedAt: new Date().toISOString(),
        user: {
          name: user.name,
          email: user.email,
        },
        data,
      },
    });
  } catch (error) {
    console.error("[GET /api/user/backup]", error);
    return errorResponse("Gagal membuat file cadangan progres.", 500);
  }
}

export async function POST(request: Request) {
  try {
    if (isPayloadTooLarge(request, 500_000)) {
      return errorResponse("Ukuran file backup terlalu besar (maksimal 500 KB).", 413);
    }

    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = (await readJson(request)) as {
      data?: Partial<UserData>;
      backup?: { data?: Partial<UserData> };
    } | null;

    const rawData = body?.backup?.data ?? body?.data;
    if (!rawData || typeof rawData !== "object") {
      return errorResponse(
        "Format file backup tidak valid. Pastikan memilih file .json dari PathForge.",
        400
      );
    }

    const normalized = normalizeUserData(rawData);
    normalized.activity = [
      makeActivity("profile", "Memulihkan progres dari file backup (.json)", 0),
      ...normalized.activity,
    ];

    const saved = await saveUserData(auth.session.rawUser.id, normalized);

    return NextResponse.json({
      ok: true,
      data: saved,
      message: "Data progres berhasil dipulihkan ke server.",
    });
  } catch (error) {
    console.error("[POST /api/user/backup]", error);
    return errorResponse("Gagal memulihkan data dari file backup.", 500);
  }
}
