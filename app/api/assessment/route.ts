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
import { assessmentQuestions, calculateScores } from "@/lib/data/assessment";
import { getCareer } from "@/lib/data/careers";
import { makeActivity } from "@/lib/seed-data";
import type { AssessmentResult, CareerId, Profile } from "@/lib/types";

const submitAssessmentSchema = z.object({
  answers: z.record(z.string(), z.string()),
  profile: z
    .object({
      headline: z.string().optional(),
      bio: z.string().optional(),
      location: z.string().optional(),
      education: z.string().optional(),
      status: z
        .enum(["mahasiswa", "fresh-graduate", "career-switcher", "bekerja"])
        .optional(),
      weeklyHours: z.number().min(1).max(80).optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
  selectedCareerId: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    return NextResponse.json({
      ok: true,
      questions: assessmentQuestions,
      assessment: session?.data.assessment ?? null,
      onboarded: session?.data.onboarded ?? false,
      activeCareer: session?.data.activeCareer ?? null,
    });
  } catch (error) {
    console.error("[GET /api/assessment]", error);
    return errorResponse("Gagal memuat kuis asesmen Career GPS.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = submitAssessmentSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Jawaban asesmen tidak valid.");
    }

    const { answers, profile, selectedCareerId } = parsed.data;
    const scores = calculateScores(answers);

    const result: AssessmentResult = {
      completedAt: new Date().toISOString(),
      answers,
      scores,
    };

    const validCareer = selectedCareerId ? getCareer(selectedCareerId) : undefined;

    const { data } = await mutateUserData(auth.session.rawUser.id, (current) => {
      const nextActivities = [
        makeActivity("assessment", "Menyelesaikan asesmen Career GPS", 50),
        ...current.activity,
      ];

      if (validCareer) {
        nextActivities.unshift(
          makeActivity("career", `Memilih jalur ${validCareer.title}`, 0)
        );
      }

      const nextData = {
        ...current,
        assessment: result,
        onboarded: validCareer ? true : current.onboarded,
        activeCareer: validCareer ? (validCareer.id as CareerId) : current.activeCareer,
        profile: {
          ...current.profile,
          ...((profile as Partial<Profile>) ?? {}),
        },
        activity: nextActivities,
      };

      return {
        next: nextData,
        result: { data: nextData },
      };
    });

    return NextResponse.json({
      ok: true,
      assessment: result,
      data,
    });
  } catch (error) {
    console.error("[POST /api/assessment]", error);
    return errorResponse("Gagal menyimpan hasil asesmen di server.", 500);
  }
}
