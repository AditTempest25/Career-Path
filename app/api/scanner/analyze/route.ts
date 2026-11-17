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
import { analyzeResumeText } from "@/lib/data/scanner";
import { careers, getAllModules, getCareer } from "@/lib/data/careers";
import { makeActivity } from "@/lib/seed-data";
import type { CareerId } from "@/lib/types";

const analyzeSchema = z.object({
  action: z.literal("analyze").optional().default("analyze"),
  resumeText: z
    .string()
    .trim()
    .min(10, "Teks CV minimal 10 karakter.")
    .max(50_000, "Teks CV terlalu panjang (maksimal 50.000 karakter)."),
  targetCareerId: z.string().trim().min(1, "Target jalur karier wajib dipilih."),
});

const syncSchema = z.object({
  action: z.literal("sync"),
  moduleIds: z.array(z.string().trim().min(1)).min(1, "Daftar modul kosong."),
});

export async function POST(request: Request) {
  try {
    if (isPayloadTooLarge(request, 100_000)) {
      return errorResponse("Ukuran teks CV terlalu besar.", 413);
    }

    const body = (await readJson(request)) as { action?: string } | null;
    if (!body || typeof body !== "object") {
      return errorResponse("Payload JSON tidak valid.", 400);
    }

    // Mode 1: Sinkronisasi modul hasil scan ke akun user di server
    if (body.action === "sync") {
      const auth = await requireSession();
      if (auth.response) return auth.response;

      const parsedSync = syncSchema.safeParse(body);
      if (!parsedSync.success) {
        return validationError(parsedSync.error, "Data modul untuk sinkronisasi tidak valid.");
      }

      // Validasi bahwa moduleId benar-benar ada di katalog karier
      const validModuleSet = new Set(
        careers.flatMap((c) => getAllModules(c).map((m) => m.id))
      );
      const validIds = parsedSync.data.moduleIds.filter((id) => validModuleSet.has(id));

      const { newlyAdded, data } = await mutateUserData(
        auth.session.rawUser.id,
        (current) => {
          const existing = new Set(current.completedModules);
          const toAdd = validIds.filter((id) => !existing.has(id));
          if (toAdd.length === 0) {
            return { result: { newlyAdded: 0, data: current } };
          }

          const nextData = {
            ...current,
            completedModules: [...current.completedModules, ...toAdd],
            activity: [
              makeActivity(
                "scanner",
                `Sinkronisasi ${toAdd.length} modul dari hasil scan CV`,
                toAdd.length * 20
              ),
              ...current.activity,
            ],
          };

          return {
            next: nextData,
            result: { newlyAdded: toAdd.length, data: nextData },
          };
        }
      );

      return NextResponse.json({
        ok: true,
        newlyAdded,
        data,
      });
    }

    // Mode 2: Analisis teks CV & deteksi skill gap di server
    const parsedAnalyze = analyzeSchema.safeParse(body);
    if (!parsedAnalyze.success) {
      return validationError(parsedAnalyze.error, "Input pemindaian CV tidak valid.");
    }

    const career = getCareer(parsedAnalyze.data.targetCareerId);
    if (!career) {
      return errorResponse("Jalur karier target tidak ditemukan.", 404);
    }

    const result = analyzeResumeText(
      parsedAnalyze.data.resumeText,
      career.id as CareerId
    );

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("[POST /api/scanner/analyze]", error);
    return errorResponse("Gagal menganalisis CV di server.", 500);
  }
}
