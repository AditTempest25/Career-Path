import { NextResponse } from "next/server";
import {
  errorResponse,
  isPayloadTooLarge,
  readJson,
  requireSession,
} from "@/lib/server/api";
import { saveUserData } from "@/lib/server/db";
import { makeActivity, validateBackupPayload } from "@/lib/seed-data";

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

    const body = await readJson(request);
    // PF-003: Validasi ketat versi dan struktur backup sebelum menimpa data progres
    const validated = validateBackupPayload(body);
    if (!validated.ok) {
      return errorResponse(validated.error, 400);
    }

    const nextData = {
      ...validated.data,
      activity: [
        makeActivity("profile", "Memulihkan progres dari file backup (.json)", 0),
        ...validated.data.activity,
      ],
    };

    const saved = await saveUserData(auth.session.rawUser.id, nextData);

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
