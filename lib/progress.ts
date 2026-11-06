import type { Career, CareerId, UserData } from "@/lib/types";
import { careers, getAllModules, getCareer } from "@/lib/data/careers";
import { getSimulation, getSimulationsByCareer } from "@/lib/data/simulations";

export const XP_PER_LEVEL = 500;

export function getTotalXp(data: UserData) {
  let xp = data.assessment ? 50 : 0;
  for (const c of careers) {
    for (const m of getAllModules(c)) {
      if (data.completedModules.includes(m.id)) xp += m.hours * 10;
    }
  }
  for (const sub of Object.values(data.submissions)) {
    const sim = getSimulation(sub.simulationId);
    if (sim) xp += Math.round((sim.xp * sub.score) / 100);
  }
  return xp;
}

export function getLevel(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const current = xp % XP_PER_LEVEL;
  return { level, current, next: XP_PER_LEVEL, percent: Math.round((current / XP_PER_LEVEL) * 100) };
}

export function getRoadmapProgress(career: Career, data: UserData) {
  const modules = getAllModules(career);
  const done = modules.filter((m) => data.completedModules.includes(m.id));
  const hoursTotal = modules.reduce((s, m) => s + m.hours, 0);
  const hoursDone = done.reduce((s, m) => s + m.hours, 0);
  return {
    completed: done.length,
    total: modules.length,
    percent: modules.length ? Math.round((done.length / modules.length) * 100) : 0,
    hoursDone,
    hoursTotal,
  };
}

export function getPhaseProgress(career: Career, data: UserData) {
  return career.roadmap.map((phase) => {
    const done = phase.modules.filter((m) => data.completedModules.includes(m.id)).length;
    return {
      phase,
      done,
      total: phase.modules.length,
      percent: Math.round((done / phase.modules.length) * 100),
    };
  });
}

export function getNextModule(career: Career, data: UserData) {
  for (const phase of career.roadmap) {
    for (const m of phase.modules) {
      if (!data.completedModules.includes(m.id)) return { phase, module: m };
    }
  }
  return null;
}

export function getSimulationStats(careerId: CareerId, data: UserData) {
  const sims = getSimulationsByCareer(careerId);
  const subs = sims.map((s) => data.submissions[s.id]).filter(Boolean);
  const avg = subs.length ? Math.round(subs.reduce((s, x) => s + x.score, 0) / subs.length) : 0;
  return { completed: subs.length, total: sims.length, avgScore: avg };
}

export function getAllSimulationStats(data: UserData) {
  const subs = Object.values(data.submissions);
  const avg = subs.length ? Math.round(subs.reduce((s, x) => s + x.score, 0) / subs.length) : 0;
  return { completed: subs.length, avgScore: avg, best: subs.reduce((m, s) => Math.max(m, s.score), 0) };
}

/** Skor kesiapan kerja 0–100 untuk sebuah jalur karier. */
export function getReadiness(careerId: CareerId, data: UserData) {
  const career = getCareer(careerId);
  if (!career) return 0;
  const roadmap = getRoadmapProgress(career, data).percent;
  const sims = getSimulationsByCareer(careerId);
  const simTotal = sims.reduce((s, sim) => s + (data.submissions[sim.id]?.score ?? 0), 0);
  const simPart = sims.length ? simTotal / sims.length : 0;
  const match = data.assessment?.scores[careerId] ?? 0;
  return Math.round(roadmap * 0.5 + simPart * 0.4 + match * 0.1);
}

export function getSkillLevels(career: Career, data: UserData) {
  const modules = getAllModules(career);
  const sims = getSimulationsByCareer(career.id);
  return career.skills.map((skill) => {
    const related = modules.filter((m) => m.skill === skill);
    const done = related.filter((m) => data.completedModules.includes(m.id)).length;
    const moduleRatio = related.length ? done / related.length : 0;
    const relatedSims = sims.filter((s) => s.skills.includes(skill));
    const simScores = relatedSims
      .map((s) => data.submissions[s.id]?.score)
      .filter((x): x is number => typeof x === "number");
    const simAvg = simScores.length ? simScores.reduce((a, b) => a + b, 0) / simScores.length : 0;
    const hasSims = relatedSims.length > 0;
    const hasModules = related.length > 0;
    let level: number;
    if (hasModules && hasSims) level = moduleRatio * 70 + simAvg * 0.3;
    else if (hasModules) level = moduleRatio * 100;
    else level = simAvg;
    return { skill, level: Math.round(level) };
  });
}

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function getDailyActivity(data: UserData, days = 14) {
  const today = new Date();
  const buckets: { key: string; label: string; xp: number; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    buckets.push({
      key: dayKey(d),
      label: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      xp: 0,
      count: 0,
    });
  }
  for (const a of data.activity) {
    const b = buckets.find((x) => x.key === dayKey(new Date(a.date)));
    if (b) {
      b.xp += a.xp;
      b.count += 1;
    }
  }
  return buckets;
}

export function getStreak(data: UserData) {
  const days = new Set(data.activity.map((a) => dayKey(new Date(a.date))));
  let streak = 0;
  const d = new Date();
  // Hari ini boleh belum ada aktivitas
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
