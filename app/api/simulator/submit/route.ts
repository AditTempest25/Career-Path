import { NextResponse } from "next/server";
import { z } from "zod";
import {
  errorResponse,
  isPayloadTooLarge,
  readJson,
  requireSession,
  validationError,
} from "@/lib/server/api";
import { mutateUserData } from "@/lib/server/db";
import { getSimulation } from "@/lib/data/simulations";
import { evaluateSubmission } from "@/lib/feedback";
import { makeActivity } from "@/lib/seed-data";
import type { Submission } from "@/lib/types";

const submitSimulationSchema = z.object({
  simulationId: z.string().trim().min(1, "ID simulasi wajib diisi."),
  answers: z.record(z.string(), z.string()),
});

export async function POST(request: Request) {
  try {
    if (isPayloadTooLarge(request, 100_000)) {
      return errorResponse("Ukuran jawaban terlalu besar (maksimal 100 KB).", 413);
    }

    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = submitSimulationSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Format pengumpulan simulasi tidak valid.");
    }

    const { simulationId, answers } = parsed.data;
    const sim = getSimulation(simulationId);
    if (!sim) {
      return errorResponse("Skenario simulasi kerja tidak ditemukan.", 404);
    }

    // Pastikan semua deliverable wajib sudah diisi
    const emptyDeliverable = sim.deliverables.find((d) => !answers[d.id]?.trim());
    if (emptyDeliverable) {
      return errorResponse(
        `Harap lengkapi deliverable: "${emptyDeliverable.label}".`,
        400
      );
    }

    // Evaluasi rubrik dan skor langsung di sisi server
    const evaluated = evaluateSubmission(sim, answers);

    const { submission, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const prevSub = current.submissions[simulationId];
        const nextSub: Submission = {
          simulationId,
          answers,
          ...evaluated,
          submittedAt: new Date().toISOString(),
          attempts: (prevSub?.attempts ?? 0) + 1,
        };

        const prevXp = prevSub ? Math.round((sim.xp * prevSub.score) / 100) : 0;
        const newXp = Math.round((sim.xp * evaluated.score) / 100);
        const xpDelta = Math.max(0, newXp - prevXp);

        const { [simulationId]: _removedDraft, ...remainingDrafts } = current.drafts;

        const nextData = {
          ...current,
          drafts: remainingDrafts,
          submissions: {
            ...current.submissions,
            [simulationId]: nextSub,
          },
          activity: [
            makeActivity(
              "simulation",
              `Mengirim simulasi "${sim.title}" (skor ${evaluated.score})`,
              xpDelta
            ),
            ...current.activity,
          ],
        };

        return {
          next: nextData,
          result: { submission: nextSub, data: nextData },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      submission,
      data,
    });
  } catch (error) {
    console.error("[POST /api/simulator/submit]", error);
    return errorResponse("Gagal menilai simulasi kerja di server.", 500);
  }
}
