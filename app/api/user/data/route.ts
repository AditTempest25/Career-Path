import { NextResponse } from "next/server";
import { saveUserData } from "@/lib/server/db";
import { getAuthenticatedSession } from "@/lib/server/session";
import { normalizeUserData, userDataValidationSchema } from "@/lib/seed-data";
import { hasValidSavedAssessment } from "@/lib/data/assessment";
import type { AssessmentResult, UserData } from "@/lib/types";

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

    const body = (await request.json().catch(() => null)) as { data?: unknown } | null;
    if (!body?.data || typeof body.data !== "object") {
      return NextResponse.json(
        { ok: false, error: "Payload data tidak valid." },
        { status: 400 }
      );
    }

    // PF-003: Validasi skema snapshot UserData agar objek kosong/rusak tidak menimpa progres
    const parsed = userDataValidationSchema.safeParse(body.data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Struktur data progres tidak valid: " +
            (parsed.error.errors[0]?.message || "format tidak sesuai"),
        },
        { status: 400 }
      );
    }

    if (
      parsed.data.onboarded &&
      !hasValidSavedAssessment(parsed.data.assessment as AssessmentResult | null | undefined)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Onboarding hanya dapat diselesaikan setelah seluruh 8 pertanyaan asesmen Career GPS dijawab dengan valid.",
        },
        { status: 400 }
      );
    }

    const saved = await saveUserData(
      session.rawUser.id,
      normalizeUserData(parsed.data as unknown as Partial<UserData>)
    );
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
