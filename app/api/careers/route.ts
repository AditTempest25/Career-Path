import { NextResponse } from "next/server";
import { z } from "zod";
import {
  errorResponse,
  readJson,
  requireSession,
  validationError,
} from "@/lib/server/api";
import { getAuthenticatedSession } from "@/lib/server/session";
import { mutateUserData } from "@/lib/server/db";
import { careers, getCareer } from "@/lib/data/careers";
import {
  getReadiness,
  getRoadmapProgress,
  getSimulationStats,
} from "@/lib/progress";
import { makeActivity } from "@/lib/seed-data";
import type { CareerId } from "@/lib/types";

const switchCareerSchema = z.object({
  careerId: z.string().trim().min(1, "ID jalur karier wajib diisi."),
  completeOnboarding: z.boolean().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const session = await getAuthenticatedSession();

    const serializeCareer = (c: (typeof careers)[number]) => ({
      id: c.id,
      title: c.title,
      tagline: c.tagline,
      description: c.description,
      salary: c.salary,
      demand: c.demand,
      duration: c.duration,
      level: c.level,
      skills: c.skills,
      tools: c.tools,
      employers: c.employers,
      dayInLife: c.dayInLife,
      roadmap: c.roadmap,
      userMetrics: session
        ? {
            isActive: session.data.activeCareer === c.id,
            matchScore: session.data.assessment?.scores[c.id] ?? 0,
            readiness: getReadiness(c.id, session.data),
            roadmapProgress: getRoadmapProgress(c, session.data),
            simulationStats: getSimulationStats(c.id, session.data),
          }
        : null,
    });

    if (id) {
      const found = getCareer(id);
      if (!found) {
        return errorResponse("Jalur karier tidak ditemukan.", 404);
      }
      return NextResponse.json({
        ok: true,
        career: serializeCareer(found),
      });
    }

    return NextResponse.json({
      ok: true,
      activeCareer: session?.data.activeCareer ?? null,
      careers: careers.map(serializeCareer),
    });
  } catch (error) {
    console.error("[GET /api/careers]", error);
    return errorResponse("Gagal memuat data jalur karier.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = switchCareerSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Permintaan pergantian karier tidak valid.");
    }

    const career = getCareer(parsed.data.careerId);
    if (!career) {
      return errorResponse("Jalur karier tidak ditemukan.", 404);
    }

    const { data } = await mutateUserData(auth.session.rawUser.id, (current) => {
      const isOnboarding = Boolean(parsed.data.completeOnboarding);
      const label = isOnboarding
        ? `Memilih jalur ${career.title}`
        : `Beralih ke jalur ${career.title}`;

      const nextData = {
        ...current,
        onboarded: isOnboarding ? true : current.onboarded,
        activeCareer: career.id as CareerId,
        activity: [makeActivity("career", label, 0), ...current.activity],
      };

      return {
        next: nextData,
        result: { data: nextData },
      };
    });

    return NextResponse.json({
      ok: true,
      activeCareer: career.id,
      data,
    });
  } catch (error) {
    console.error("[PATCH /api/careers]", error);
    return errorResponse("Gagal mengganti jalur karier aktif di server.", 500);
  }
}
