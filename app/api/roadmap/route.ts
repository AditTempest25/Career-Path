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
import { careers, getAllModules, getCareer } from "@/lib/data/careers";
import { getPhaseProgress, getRoadmapProgress } from "@/lib/progress";
import { makeActivity } from "@/lib/seed-data";

const toggleModuleSchema = z.object({
  action: z.literal("toggle-module"),
  moduleId: z.string().trim().min(1, "ID modul wajib diisi."),
});

const saveNoteSchema = z.object({
  action: z.literal("save-note"),
  moduleId: z.string().trim().min(1, "ID modul wajib diisi."),
  note: z.string().max(10_000, "Catatan terlalu panjang (maksimal 10.000 karakter)."),
});

const saveStudyPlanSchema = z.object({
  action: z.literal("save-study-plan"),
  weeklyHours: z.number().min(1).max(80),
  preferredDays: z.array(z.string().trim().min(1)),
  startDate: z.string().optional(),
});

const roadmapMutationSchema = z.discriminatedUnion("action", [
  toggleModuleSchema,
  saveNoteSchema,
  saveStudyPlanSchema,
]);

function findModuleAcrossCareers(moduleId: string) {
  for (const c of careers) {
    const mod = getAllModules(c).find((m) => m.id === moduleId);
    if (mod) return mod;
  }
  return undefined;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getAuthenticatedSession();
    const careerId =
      searchParams.get("careerId") ||
      session?.data.activeCareer ||
      "web-developer";

    const career = getCareer(careerId);
    if (!career) {
      return errorResponse("Kurikulum roadmap tidak ditemukan.", 404);
    }

    return NextResponse.json({
      ok: true,
      careerId: career.id,
      careerTitle: career.title,
      roadmap: career.roadmap,
      completedModules: session?.data.completedModules ?? [],
      moduleNotes: session?.data.moduleNotes ?? {},
      studyPlan: session?.data.studyPlan ?? null,
      progress: session ? getRoadmapProgress(career, session.data) : null,
      phases: session ? getPhaseProgress(career, session.data) : null,
    });
  } catch (error) {
    console.error("[GET /api/roadmap]", error);
    return errorResponse("Gagal memuat data roadmap dari server.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = roadmapMutationSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Permintaan perubahan roadmap tidak valid.");
    }

    const payload = parsed.data;

    if (payload.action === "toggle-module") {
      const mod = findModuleAcrossCareers(payload.moduleId);
      if (!mod) {
        return errorResponse("Modul belajar tidak ditemukan.", 404);
      }

      const { completed, data } = await mutateUserData(
        auth.session.rawUser.id,
        (current) => {
          const isAlreadyCompleted = current.completedModules.includes(mod.id);
          if (isAlreadyCompleted) {
            const nextData = {
              ...current,
              completedModules: current.completedModules.filter((id) => id !== mod.id),
            };
            return {
              next: nextData,
              result: { completed: false, data: nextData },
            };
          }

          const nextData = {
            ...current,
            completedModules: [...current.completedModules, mod.id],
            activity: [
              makeActivity(
                "module",
                `Menyelesaikan modul "${mod.title}"`,
                mod.hours * 10
              ),
              ...current.activity,
            ],
          };
          return {
            next: nextData,
            result: { completed: true, data: nextData },
          };
        }
      );

      return NextResponse.json({
        ok: true,
        completed,
        data,
      });
    }

    if (payload.action === "save-note") {
      const { data } = await mutateUserData(auth.session.rawUser.id, (current) => {
        const nextData = {
          ...current,
          moduleNotes: {
            ...(current.moduleNotes ?? {}),
            [payload.moduleId]: payload.note,
          },
        };
        return {
          next: nextData,
          result: { data: nextData },
        };
      });

      return NextResponse.json({
        ok: true,
        data,
      });
    }

    // action === "save-study-plan"
    const { data } = await mutateUserData(auth.session.rawUser.id, (current) => {
      const plan = {
        weeklyHours: payload.weeklyHours,
        preferredDays: payload.preferredDays,
        startDate: payload.startDate,
      };
      const nextData = {
        ...current,
        studyPlan: plan,
        profile: {
          ...current.profile,
          weeklyHours: payload.weeklyHours,
        },
      };
      return {
        next: nextData,
        result: { data: nextData },
      };
    });

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("[POST /api/roadmap]", error);
    return errorResponse("Gagal menyimpan progres roadmap di server.", 500);
  }
}
