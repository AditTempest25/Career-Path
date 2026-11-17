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
import { calculateJobMatch, jobs } from "@/lib/data/jobs";
import { makeActivity } from "@/lib/seed-data";

const applyJobSchema = z.object({
  jobId: z.string().trim().min(1, "ID lowongan kerja wajib diisi."),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const careerId = searchParams.get("careerId");
    const type = searchParams.get("type");

    const session = await getAuthenticatedSession();
    const filtered = jobs.filter((job) => {
      if (careerId && careerId !== "all" && job.careerId !== careerId) return false;
      if (type && type !== "all" && job.type !== type) return false;
      return true;
    });

    const items = filtered.map((job) => ({
      ...job,
      match: session ? calculateJobMatch(job, session.data) : null,
      application: session?.data.appliedJobs?.[job.id] ?? null,
    }));

    return NextResponse.json({
      ok: true,
      jobs: items,
      appliedJobs: session?.data.appliedJobs ?? {},
    });
  } catch (error) {
    console.error("[GET /api/jobs]", error);
    return errorResponse("Gagal memuat daftar lowongan kerja.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const body = await readJson(request);
    const parsed = applyJobSchema.safeParse(body);
    if (!parsed.success) {
      return validationError(parsed.error, "Data lamaran kerja tidak valid.");
    }

    const job = jobs.find((j) => j.id === parsed.data.jobId);
    if (!job) {
      return errorResponse("Lowongan kerja tidak ditemukan.", 404);
    }

    const { application, alreadyApplied, data } = await mutateUserData(
      auth.session.rawUser.id,
      (current) => {
        const existing = current.appliedJobs?.[job.id];
        if (existing) {
          return {
            result: {
              application: existing,
              alreadyApplied: true,
              data: current,
            },
          };
        }

        const newApp = {
          jobId: job.id,
          appliedAt: new Date().toISOString(),
          status: "Terkirim" as const,
        };

        const nextData = {
          ...current,
          appliedJobs: {
            ...(current.appliedJobs ?? {}),
            [job.id]: newApp,
          },
          activity: [
            makeActivity(
              "job",
              `Melamar posisi ${job.title} di ${job.company.name}`,
              25
            ),
            ...current.activity,
          ],
        };

        return {
          next: nextData,
          result: {
            application: newApp,
            alreadyApplied: false,
            data: nextData,
          },
        };
      }
    );

    return NextResponse.json({
      ok: true,
      alreadyApplied,
      application,
      data,
    });
  } catch (error) {
    console.error("[POST /api/jobs]", error);
    return errorResponse("Gagal mengirim lamaran kerja ke server.", 500);
  }
}
