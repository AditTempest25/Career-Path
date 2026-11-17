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
import {
  getSimulation,
  getSimulationsByCareer,
  simulations,
} from "@/lib/data/simulations";

const saveDraftSchema = z.object({
  action: z.literal("save-draft"),
  simulationId: z.string().trim().min(1),
  answers: z.record(z.string(), z.string()),
});

const toggleFeaturedSchema = z.object({
  action: z.literal("toggle-featured"),
  simulationId: z.string().trim().min(1),
});

const simulatorPatchSchema = z.discriminatedUnion("action", [
  saveDraftSchema,
  toggleFeaturedSchema,
]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const careerId = searchParams.get("careerId");
    const session = await getAuthenticatedSession();

    if (id) {
      const sim = getSimulation(id);
      if (!sim) {
        return errorResponse("Simulasi kerja tidak ditemukan.", 404);
      }
      return NextResponse.json({
        ok: true,
        simulation: sim,
        submission: session?.data.submissions[sim.id] ?? null,
        draft: session?.data.drafts[sim.id] ?? null,
        featured: session?.data.featured.includes(sim.id) ?? false,
      });
    }

    const list =
      careerId && careerId !== "all"
        ? getSimulationsByCareer(careerId)
        : simulations;

    return NextResponse.json({
      ok: true,
      simulations: list.map((sim) => ({
        ...sim,
        submission: session?.data.submissions[sim.id] ?? null,
        hasDraft: Boolean(session?.data.drafts[sim.id]),
        featured: session?.data.featured.includes(sim.id) ?? false,
      })),
      submissions: session?.data.submissions ?? {},
      featured: session?.data.featured ?? [],
    });
  } catch (error) {
    console.error("[GET /api/simulator]", error);
    return errorResponse("Gagal memuat daftar Work Simulator.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    if (isPayloadTooLarge(request, 100_000)) {
      return errorResponse("Ukuran data terlalu besar.", 413);
    }

    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = simulatorPatchSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Data pembaruan simulasi tidak valid.");
    }

    const payload = parsed.data;
    const sim = getSimulation(payload.simulationId);
    if (!sim) {
      return errorResponse("Simulasi kerja tidak ditemukan.", 404);
    }

    if (payload.action === "save-draft") {
      const { data } = await mutateUserData(auth.session.rawUser.id, (current) => {
        const nextData = {
          ...current,
          drafts: {
            ...current.drafts,
            [sim.id]: payload.answers,
          },
        };
        return { next: nextData, result: { data: nextData } };
      });

      return NextResponse.json({ ok: true, data });
    }

    // action === "toggle-featured"
    const { featured, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const isFeatured = current.featured.includes(sim.id);
        const nextFeatured = isFeatured
          ? current.featured.filter((id) => id !== sim.id)
          : [...current.featured, sim.id];

        const nextData = {
          ...current,
          featured: nextFeatured,
        };
        return {
          next: nextData,
          result: { featured: !isFeatured, data: nextData },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      featured,
      data,
    });
  } catch (error) {
    console.error("[PATCH /api/simulator]", error);
    return errorResponse("Gagal memperbarui data simulasi di server.", 500);
  }
}
