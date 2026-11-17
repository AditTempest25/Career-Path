import { NextResponse } from "next/server";
import { errorResponse, requireSession } from "@/lib/server/api";
import { getCareer } from "@/lib/data/careers";
import { badges } from "@/lib/data/badges";
import {
  getAllSimulationStats,
  getDailyActivity,
  getLevel,
  getReadiness,
  getRoadmapProgress,
  getSimulationStats,
  getSkillLevels,
  getStreak,
  getTotalXp,
} from "@/lib/progress";

export async function GET() {
  try {
    const auth = await requireSession();
    if (auth.response) return auth.response;

    const { user, data } = auth.session;
    const career = getCareer(data.activeCareer || "web-developer");

    const xp = getTotalXp(data);
    const level = getLevel(xp);
    const streak = getStreak(data);
    const readiness = career ? getReadiness(career.id, data) : 0;
    const roadmapProgress = career ? getRoadmapProgress(career, data) : null;
    const careerSimStats = career ? getSimulationStats(career.id, data) : null;
    const allSimStats = getAllSimulationStats(data);
    const skillLevels = career ? getSkillLevels(career, data) : [];
    const dailyActivity = getDailyActivity(data, 14);

    const badgeStatuses = badges.map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      category: b.category,
      unlocked: b.isUnlocked(data),
      progressText: b.progressText ? b.progressText(data) : undefined,
    }));

    const certificateEligible =
      Boolean(roadmapProgress && roadmapProgress.percent === 100) ||
      readiness >= 70;

    return NextResponse.json({
      ok: true,
      user,
      analytics: {
        activeCareerId: career?.id ?? null,
        careerTitle: career?.title ?? null,
        xp,
        level,
        streak,
        readiness,
        roadmapProgress,
        careerSimStats,
        allSimStats,
        skillLevels,
        dailyActivity,
        badges: badgeStatuses,
        unlockedBadgesCount: badgeStatuses.filter((b) => b.unlocked).length,
        certificateEligible,
      },
    });
  } catch (error) {
    console.error("[GET /api/progress]", error);
    return errorResponse("Gagal menghitung analitik progres di server.", 500);
  }
}
