import { NextResponse } from "next/server";
import { ensureDemoUser, listAllUsersWithData } from "@/lib/server/db";
import { getAuthenticatedSession } from "@/lib/server/session";
import { getCareer } from "@/lib/data/careers";
import { getLevel, getReadiness, getStreak, getTotalXp } from "@/lib/progress";
import { toProfileSlug } from "@/lib/slug";
import type { CareerId } from "@/lib/types";

export interface LeaderboardEntry {
  id: string;
  name: string;
  slug: string;
  careerId: CareerId;
  careerTitle: string;
  headline: string;
  location: string;
  xp: number;
  level: number;
  readiness: number;
  streak: number;
  completedModulesCount: number;
  submissionsCount: number;
  isCurrentUser: boolean;
  isServerUser: boolean;
  publicPortfolioEnabled?: boolean;
}

const COMMUNITY_PEERS: Omit<LeaderboardEntry, "isCurrentUser" | "isServerUser">[] = [
  {
    id: "peer-1",
    name: "Nadia Kusuma",
    slug: "nadia-kusuma",
    careerId: "web-developer",
    careerTitle: "Web Developer",
    headline: "Frontend Engineer Intern · React & TypeScript",
    location: "Jakarta Selatan",
    xp: 1850,
    level: 4,
    readiness: 88,
    streak: 9,
    completedModulesCount: 10,
    submissionsCount: 3,
  },
  {
    id: "peer-2",
    name: "Bima Sakti Wijaya",
    slug: "bima-sakti-wijaya",
    careerId: "data-analyst",
    careerTitle: "Data Analyst",
    headline: "Data Enthusiast · SQL, Python & BI Dashboard",
    location: "Surabaya",
    xp: 1620,
    level: 4,
    readiness: 84,
    streak: 7,
    completedModulesCount: 9,
    submissionsCount: 2,
  },
  {
    id: "peer-3",
    name: "Alya Putri Rahmani",
    slug: "alya-putri-rahmani",
    careerId: "ui-ux-designer",
    careerTitle: "UI/UX Designer",
    headline: "Product Designer · Design System & Research",
    location: "Bandung",
    xp: 1490,
    level: 3,
    readiness: 81,
    streak: 6,
    completedModulesCount: 8,
    submissionsCount: 2,
  },
  {
    id: "peer-4",
    name: "Dimas Aditya Pratama",
    slug: "dimas-aditya-pratama",
    careerId: "business-analyst",
    careerTitle: "Business Analyst",
    headline: "Associate Product & Business Analyst",
    location: "Yogyakarta",
    xp: 1280,
    level: 3,
    readiness: 76,
    streak: 5,
    completedModulesCount: 7,
    submissionsCount: 2,
  },
  {
    id: "peer-5",
    name: "Citra Lestari",
    slug: "citra-lestari",
    careerId: "qa-engineer",
    careerTitle: "QA Engineer",
    headline: "Software Quality Assurance · Automation & API Testing",
    location: "Semarang",
    xp: 1120,
    level: 3,
    readiness: 73,
    streak: 4,
    completedModulesCount: 6,
    submissionsCount: 2,
  },
  {
    id: "peer-6",
    name: "Farhan Rizki Maulana",
    slug: "farhan-rizki-maulana",
    careerId: "mobile-developer",
    careerTitle: "Mobile Developer",
    headline: "Flutter & React Native Mobile Developer",
    location: "Malang",
    xp: 940,
    level: 2,
    readiness: 68,
    streak: 3,
    completedModulesCount: 5,
    submissionsCount: 1,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const careerFilter = searchParams.get("careerId");

    await ensureDemoUser();
    const session = await getAuthenticatedSession();
    const serverUsers = await listAllUsersWithData();

    // PF-002: Hanya proyeksikan akun pengguna ke leaderboard publik jika:
    // 1) Itu adalah akun pengguna yang sedang login sendiri (isCurrentUser), ATAU
    // 2) Pengguna tersebut telah mengaktifkan persetujuan visibilitas (showOnLeaderboard === true)
    const visibleServerUsers = serverUsers.filter(({ user, data }) => {
      const isCurrentUser = session?.user.id === user.id;
      const optedIn = Boolean(data.settings?.showOnLeaderboard);
      return isCurrentUser || optedIn;
    });

    const serverEntries: LeaderboardEntry[] = visibleServerUsers.map(
      ({ user, data }) => {
        const cId = (data.activeCareer || "web-developer") as CareerId;
        const career = getCareer(cId);
        const xp = getTotalXp(data);
        const level = getLevel(xp).level;
        const readiness = career ? getReadiness(cId, data) : 0;
        const streak = getStreak(data);

        return {
          id: user.id,
          name: user.name,
          slug: toProfileSlug(user.name),
          careerId: cId,
          careerTitle: career?.title || "Web Developer",
          headline:
            data.profile.headline ||
            `Pembelajar ${career?.title || "PathForge"}`,
          location: data.profile.location || "Indonesia",
          xp,
          level,
          readiness,
          streak,
          completedModulesCount: data.completedModules.length,
          submissionsCount: Object.keys(data.submissions).length,
          isCurrentUser: session?.user.id === user.id,
          isServerUser: true,
          publicPortfolioEnabled: Boolean(data.settings?.publicPortfolio),
        };
      }
    );

    const existingSlugs = new Set(serverEntries.map((e) => e.slug));
    const peerEntries: LeaderboardEntry[] = COMMUNITY_PEERS.filter(
      (p) => !existingSlugs.has(p.slug)
    ).map((p) => ({
      ...p,
      isCurrentUser: false,
      isServerUser: false,
      publicPortfolioEnabled: false,
    }));

    const combined = [...serverEntries, ...peerEntries]
      .filter((entry) => {
        if (!careerFilter || careerFilter === "all") return true;
        return entry.careerId === careerFilter;
      })
      .sort((a, b) => {
        if (b.xp !== a.xp) return b.xp - a.xp;
        return b.readiness - a.readiness;
      });

    return NextResponse.json({
      ok: true,
      leaderboard: combined,
    });
  } catch (error) {
    console.error("[GET /api/leaderboard]", error);
    return NextResponse.json(
      { ok: false, error: "Gagal memuat data papan peringkat." },
      { status: 500 }
    );
  }
}
