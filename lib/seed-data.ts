import type {
  Activity,
  ActivityType,
  Profile,
  Settings,
  UserData,
} from "@/lib/types";
import { getAllModules, getCareer } from "@/lib/data/careers";
import { getSimulation } from "@/lib/data/simulations";
import { calculateScores } from "@/lib/data/assessment";
import { evaluateSubmission } from "@/lib/feedback";

export const DEMO_EMAIL = "demo@pathforge.id";
export const DEMO_PASSWORD = "demo1234";
export const DEMO_USER_ID = "demo-user";
export const DEMO_USER_NAME = "Raka Pratama";

export const defaultProfile: Profile = {
  headline: "",
  bio: "",
  location: "",
  education: "",
  status: "fresh-graduate",
  weeklyHours: 10,
  linkedin: "",
  github: "",
  website: "",
};

export const defaultSettings: Settings = {
  emailNotifications: true,
  weeklyReminder: true,
  publicPortfolio: false,
};

export function createEmptyData(): UserData {
  return {
    profile: { ...defaultProfile },
    onboarded: false,
    assessment: null,
    activeCareer: null,
    completedModules: [],
    submissions: {},
    drafts: {},
    featured: [],
    appliedJobs: {},
    interviewPractice: {},
    studyPlan: {
      weeklyHours: 10,
      preferredDays: ["Senin", "Rabu", "Jumat"],
    },
    dailyChallenge: {
      streakCount: 0,
      totalAnswered: 0,
    },
    moduleNotes: {},
    activity: [],
    settings: { ...defaultSettings },
  };
}

export function normalizeUserData(data: Partial<UserData> | null | undefined): UserData {
  const empty = createEmptyData();
  if (!data) return empty;
  return {
    ...empty,
    ...data,
    profile: { ...empty.profile, ...(data.profile ?? {}) },
    appliedJobs: data.appliedJobs ?? {},
    interviewPractice: data.interviewPractice ?? {},
    studyPlan: data.studyPlan ?? empty.studyPlan,
    dailyChallenge: data.dailyChallenge ?? empty.dailyChallenge,
    moduleNotes: data.moduleNotes ?? {},
    settings: { ...empty.settings, ...(data.settings ?? {}) },
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function makeActivity(type: ActivityType, label: string, xp: number, date?: Date): Activity {
  return { id: uid(), type, label, xp, date: (date ?? new Date()).toISOString() };
}

export function buildDemoData(): UserData {
  const data = createEmptyData();
  const daysAgo = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(10 + (n % 8), 15, 0, 0);
    return d;
  };

  const answers = { q1: "a", q2: "a", q3: "d", q4: "a", q5: "b", q6: "a", q7: "c", q8: "b" };
  data.assessment = {
    completedAt: daysAgo(20).toISOString(),
    answers,
    scores: calculateScores(answers),
  };
  data.onboarded = true;
  data.activeCareer = "web-developer";
  data.profile = {
    ...data.profile,
    headline: "Aspiring Frontend Developer",
    bio: "Lulusan Sistem Informasi yang senang membangun antarmuka web yang cepat dan mudah diakses.",
    location: "Bandung, Jawa Barat",
    education: "S1 Sistem Informasi, Universitas Contoh",
    status: "fresh-graduate",
    weeklyHours: 15,
    github: "https://github.com/demo",
    linkedin: "https://linkedin.com/in/demo",
  };
  data.settings.publicPortfolio = true;

  data.activity.push(makeActivity("assessment", "Menyelesaikan asesmen Career GPS", 50, daysAgo(20)));
  data.activity.push(makeActivity("career", "Memilih jalur Web Developer", 0, daysAgo(20)));

  const career = getCareer("web-developer")!;
  const modules = getAllModules(career).slice(0, 6);
  const dayPlan = [18, 15, 12, 9, 5, 2];
  modules.forEach((m, i) => {
    data.completedModules.push(m.id);
    data.activity.push(
      makeActivity("module", `Menyelesaikan modul "${m.title}"`, m.hours * 10, daysAgo(dayPlan[i]))
    );
  });

  const sim = getSimulation("sim-wd-landing")!;
  const simAnswers = {
    link: "https://github.com/demo/promo-ramadan",
    explanation:
      "Saya memulai dengan pendekatan mobile-first karena mayoritas traffic berasal dari HP. Layout menggunakan CSS grid untuk daftar produk dan flexbox untuk hero, dengan media query di breakpoint 768px dan 1024px sehingga tampilan responsif. Struktur HTML semantik memakai header, main, section, dan footer, serta setiap gambar memiliki atribut alt dan tombol diberi aria-label agar aksesibel. Countdown dibuat dengan JavaScript menggunakan objek Date dan setInterval setiap detik; fungsi akan menampilkan pesan 'Promo berakhir' ketika selisih waktu bernilai negatif. Untuk performa, gambar dikompres ke format WebP dan memakai lazy loading sehingga skor Lighthouse mencapai 96.",
  };
  const result = evaluateSubmission(sim, simAnswers);
  data.submissions[sim.id] = {
    simulationId: sim.id,
    answers: simAnswers,
    ...result,
    submittedAt: daysAgo(4).toISOString(),
    attempts: 1,
  };
  data.featured.push(sim.id);
  data.activity.push(
    makeActivity(
      "simulation",
      `Mengirim simulasi "${sim.title}" (skor ${result.score})`,
      Math.round((sim.xp * result.score) / 100),
      daysAgo(4)
    )
  );
  data.activity.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return data;
}
