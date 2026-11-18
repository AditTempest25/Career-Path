import { NextResponse } from "next/server";
import { ensureDemoUser, findUsersByProfileSlug } from "@/lib/server/db";
import { getAuthenticatedSession } from "@/lib/server/session";
import { getCareer } from "@/lib/data/careers";
import { getSimulation } from "@/lib/data/simulations";
import { getLevel, getReadiness, getTotalXp } from "@/lib/progress";
import { toProfileSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    const slug = decodeURIComponent(username).trim().toLowerCase();

    // Pastikan akun demo utama ter-seed jika mengakses slug demo
    if (slug === "raka-pratama" || slug === "rina-pratama" || slug === "demo") {
      await ensureDemoUser();
    }

    const session = await getAuthenticatedSession();
    const matches = await findUsersByProfileSlug(slug);

    let target = matches[0] ?? null;
    if (!target && slug === "demo") {
      const demo = await ensureDemoUser();
      target = demo;
    }

    // Jika pemilik sedang login dan namanya cocok, prioritaskan sesi miliknya
    if (session && toProfileSlug(session.user.name) === slug) {
      target = { user: session.rawUser, data: session.data };
    }

    if (!target) {
      return NextResponse.json(
        {
          ok: false,
          code: "NOT_FOUND",
          error: "Portofolio pengguna tidak ditemukan di server.",
        },
        { status: 404 }
      );
    }

    const isOwner = session?.user.id === target.user.id;
    const isPublic = Boolean(target.data.settings?.publicPortfolio);

    // PF-002: Tegakkan pilihan visibilitas privat di sisi server sebelum membentuk proyeksi profil
    if (!isOwner && !isPublic) {
      return NextResponse.json(
        {
          ok: false,
          code: "PRIVATE",
          error:
            "Portofolio ini bersifat privat dan belum dipublikasikan oleh pemilik akun.",
        },
        { status: 403 }
      );
    }

    const career = getCareer(target.data.activeCareer || "web-developer");
    const readiness = career ? getReadiness(career.id, target.data) : 0;
    const xp = getTotalXp(target.data);
    const level = getLevel(xp);

    const featuredProjects = target.data.featured
      .map((simId) => {
        const sim = getSimulation(simId);
        const sub = target.data.submissions[simId];
        if (!sim || !sub) return null;
        return {
          simulationId: sim.id,
          title: sim.title,
          role: sim.role,
          summary: sim.summary,
          skills: sim.skills,
          company: sim.company,
          score: sub.score,
          answers: sub.answers,
          submittedAt: sub.submittedAt,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    // PF-010: Label verifikasi hanya aktif untuk profil sah yang telah menyelesaikan simulasi
    const verified = Boolean(target.data.onboarded && featuredProjects.length > 0);

    return NextResponse.json({
      ok: true,
      isOwner,
      portfolio: {
        name: target.user.name,
        slug: toProfileSlug(target.user.name),
        createdAt: target.user.createdAt,
        publicPortfolioEnabled: isPublic,
        isOwnerPreview: isOwner && !isPublic,
        verified,
        activeCareerId: career?.id ?? "web-developer",
        careerTitle: career?.title ?? "Web Developer",
        skills: career?.skills ?? [],
        tools: career?.tools ?? [],
        profile: {
          headline: target.data.profile.headline,
          bio: target.data.profile.bio,
          location: target.data.profile.location,
          education: target.data.profile.education,
          github: target.data.profile.github,
          linkedin: target.data.profile.linkedin,
          website: target.data.profile.website,
        },
        stats: {
          readiness,
          xp,
          level: level.level,
          completedModulesCount: target.data.completedModules.length,
          submissionsCount: Object.keys(target.data.submissions).length,
        },
        featuredProjects,
      },
    });
  } catch (error) {
    console.error("[GET /api/public/portfolio/[username]]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal memuat data portofolio publik." },
      { status: 500 }
    );
  }
}
