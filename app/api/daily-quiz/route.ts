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
import { getDailyQuizForUser } from "@/lib/data/daily-quiz";
import { makeActivity } from "@/lib/seed-data";
import type { CareerId } from "@/lib/types";

// PF-028: Hanya terima daftar jawaban dari klien; jangan terima xpEarned dari klien atau memberi XP default tanpa jawaban.
const submitQuizSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().trim().min(1, "ID soal wajib diisi."),
        selectedIndex: z.number().int().min(0).max(3),
      })
    )
    .min(1, "Jawaban kuis harian wajib dikirim."),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getAuthenticatedSession();
    const careerId = (searchParams.get("careerId") ||
      session?.data.activeCareer ||
      "web-developer") as CareerId;

    const rawQuestions = getDailyQuizForUser(careerId);
    // PF-028: Jangan kirim kunci jawaban (correctIndex & explanation) pada pembacaan soal
    const questions = rawQuestions.map(
      ({ correctIndex: _c, explanation: _e, ...publicFields }) => publicFields
    );

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
    const parsed = submitQuizSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Jawaban kuis harian tidak valid.");
    }

    const careerId = (auth.session.data.activeCareer || "web-developer") as CareerId;
    const activeQuestions = getDailyQuizForUser(careerId);
    const activeQuestionMap = new Map(activeQuestions.map((q) => [q.id, q]));

    if (parsed.data.answers.length !== activeQuestions.length) {
      return errorResponse(
        `Harap jawab seluruh ${activeQuestions.length} soal kuis harian yang berlaku.`,
        400
      );
    }

    const seenIds = new Set<string>();
    let correctCount = 0;
    const gradedResults: {
      questionId: string;
      selectedIndex: number;
      correctIndex: number;
      isCorrect: boolean;
      explanation: string;
    }[] = [];

    for (const ans of parsed.data.answers) {
      if (seenIds.has(ans.questionId)) {
        return errorResponse(
          `Terdapat ID soal duplikat ("${ans.questionId}") pada pengiriman jawaban kuis.`,
          400
        );
      }
      seenIds.add(ans.questionId);

      const q = activeQuestionMap.get(ans.questionId);
      if (!q) {
        return errorResponse(
          `Soal kuis "${ans.questionId}" tidak termasuk dalam set soal harian yang berlaku untuk jalur kariermu.`,
          400
        );
      }

      const isCorrect = q.correctIndex === ans.selectedIndex;
      if (isCorrect) correctCount++;
      gradedResults.push({
        questionId: q.id,
        selectedIndex: ans.selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      });
    }

    // PF-028: Hitung XP murni di server dari jawaban benar terhadap set soal yang berlaku (0..25 XP)
    const computedXp = Math.round((correctCount / activeQuestions.length) * 25);

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const { alreadyDoneToday, xpAwarded, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const prevChallenge = current.dailyChallenge;
        const wasDoneToday = prevChallenge?.lastCompletedDate === todayStr;

        // PF-028: Jika hari ini sudah diselesaikan, latihan ulang tidak menambah totalAnswered, streak, atau XP
        if (wasDoneToday) {
          return {
            result: {
              alreadyDoneToday: true,
              xpAwarded: 0,
              data: current,
            },
          };
        }

        const isConsecutive = prevChallenge?.lastCompletedDate === yesterdayStr;
        const nextStreak = isConsecutive
          ? (prevChallenge?.streakCount ?? 0) + 1
          : 1;

        const nextData = {
          ...current,
          dailyChallenge: {
            lastCompletedDate: todayStr,
            streakCount: nextStreak,
            totalAnswered: (prevChallenge?.totalAnswered ?? 0) + 1,
          },
          activity: [
            makeActivity(
              "quiz",
              `Menyelesaikan Tantangan Kuis Kilat Harian (+${computedXp} XP)`,
              computedXp
            ),
            ...current.activity,
          ],
        };

        return {
          next: nextData,
          result: {
            alreadyDoneToday: false,
            xpAwarded: computedXp,
            data: nextData,
          },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      alreadyDoneToday,
      correctCount,
      totalQuestions: activeQuestions.length,
      results: gradedResults,
      xpAwarded,
      data,
    });
  } catch (error) {
    console.error("[POST /api/daily-quiz]", error);
    return errorResponse("Gagal menyimpan hasil Kuis Kilat Harian di server.", 500);
  }
}
