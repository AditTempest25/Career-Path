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
import { dailyQuizPool, getDailyQuizForUser } from "@/lib/data/daily-quiz";
import { makeActivity } from "@/lib/seed-data";
import type { CareerId } from "@/lib/types";

const submitQuizSchema = z.object({
  xpEarned: z.number().int().min(0).max(50).optional(),
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        selectedIndex: z.number().int().min(0).max(3),
      })
    )
    .optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getAuthenticatedSession();
    const careerId = (searchParams.get("careerId") ||
      session?.data.activeCareer ||
      "web-developer") as CareerId;

    const questions = getDailyQuizForUser(careerId);
    const todayStr = new Date().toISOString().split("T")[0];
    const isCompletedToday =
      session?.data.dailyChallenge?.lastCompletedDate === todayStr;

    return NextResponse.json({
      ok: true,
      date: todayStr,
      isCompletedToday,
      dailyChallenge: session?.data.dailyChallenge ?? null,
      questions,
    });
  } catch (error) {
    console.error("[GET /api/daily-quiz]", error);
    return errorResponse("Gagal memuat soal Tantangan Kuis Kilat.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = submitQuizSchema.safeParse(body ?? {});
    if (!parsed.success) {
      return validationError(parsed.error, "Jawaban kuis harian tidak valid.");
    }

    // Jika client mengirimkan daftar jawaban, hitung skor dan XP di server
    let computedXp = parsed.data.xpEarned ?? 25;
    let correctCount = 0;

    if (parsed.data.answers && parsed.data.answers.length > 0) {
      for (const ans of parsed.data.answers) {
        const q = dailyQuizPool.find((item) => item.id === ans.questionId);
        if (q && q.correctIndex === ans.selectedIndex) {
          correctCount++;
        }
      }
      computedXp = correctCount > 0 ? Math.min(25, correctCount * 8 + 1) : 10;
    }

    const todayStr = new Date().toISOString().split("T")[0];

    const { alreadyDoneToday, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const wasDoneToday =
          current.dailyChallenge?.lastCompletedDate === todayStr;
        const awardedXp = wasDoneToday ? 0 : computedXp;

        const nextData = {
          ...current,
          dailyChallenge: {
            lastCompletedDate: todayStr,
            streakCount: wasDoneToday
              ? current.dailyChallenge?.streakCount ?? 1
              : (current.dailyChallenge?.streakCount ?? 0) + 1,
            totalAnswered: (current.dailyChallenge?.totalAnswered ?? 0) + 1,
          },
          activity: wasDoneToday
            ? current.activity
            : [
                makeActivity(
                  "quiz",
                  `Menyelesaikan Tantangan Kuis Kilat Harian (+${awardedXp} XP)`,
                  awardedXp
                ),
                ...current.activity,
              ],
        };

        return {
          next: nextData,
          result: { alreadyDoneToday: wasDoneToday, data: nextData },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      alreadyDoneToday,
      xpAwarded: alreadyDoneToday ? 0 : computedXp,
      data,
    });
  } catch (error) {
    console.error("[POST /api/daily-quiz]", error);
    return errorResponse("Gagal menyimpan hasil Kuis Kilat Harian di server.", 500);
  }
}
