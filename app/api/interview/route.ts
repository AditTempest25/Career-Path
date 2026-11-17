import { NextResponse } from "next/server";
import { z } from "zod";
import {
  errorResponse,
  isPayloadTooLarge,
  readJson,
  requireSession,
  validationError,
} from "@/lib/server/api";
import { getAuthenticatedSession } from "@/lib/server/session";
import { mutateUserData } from "@/lib/server/db";
import { getInterviewQuestions, interviewQuestions } from "@/lib/data/interviews";
import { makeActivity } from "@/lib/seed-data";

const practiceInterviewSchema = z.object({
  questionId: z.string().trim().min(1, "ID pertanyaan wajib diisi."),
  answer: z
    .string()
    .trim()
    .min(5, "Jawaban latihan minimal 5 karakter.")
    .max(20_000, "Jawaban latihan terlalu panjang."),
  rating: z.number().int().min(1).max(5).optional().default(4),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const careerId = searchParams.get("careerId") ?? undefined;
    const category = searchParams.get("category") ?? undefined;

    const session = await getAuthenticatedSession();
    const questions = getInterviewQuestions(careerId, category);

    return NextResponse.json({
      ok: true,
      questions,
      practices: session?.data.interviewPractice ?? {},
    });
  } catch (error) {
    console.error("[GET /api/interview]", error);
    return errorResponse("Gagal memuat daftar pertanyaan interview.", 500);
  }
}

export async function POST(request: Request) {
  try {
    if (isPayloadTooLarge(request, 50_000)) {
      return errorResponse("Ukuran jawaban terlalu besar.", 413);
    }

    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = practiceInterviewSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Data latihan interview tidak valid.");
    }

    const question = interviewQuestions.find((q) => q.id === parsed.data.questionId);
    if (!question) {
      return errorResponse("Pertanyaan wawancara tidak ditemukan.", 404);
    }

    const { practice, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const newPractice = {
          questionId: question.id,
          answer: parsed.data.answer,
          practicedAt: new Date().toISOString(),
          rating: parsed.data.rating,
        };

        const isFirstTime = !current.interviewPractice?.[question.id];
        const nextData = {
          ...current,
          interviewPractice: {
            ...(current.interviewPractice ?? {}),
            [question.id]: newPractice,
          },
          activity: [
            makeActivity(
              "interview",
              `Latihan simulasi wawancara pertanyaan #${question.id}`,
              isFirstTime ? 15 : 5
            ),
            ...current.activity,
          ],
        };

        return {
          next: nextData,
          result: { practice: newPractice, data: nextData },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      practice,
      data,
    });
  } catch (error) {
    console.error("[POST /api/interview]", error);
    return errorResponse("Gagal menyimpan latihan wawancara di server.", 500);
  }
}
