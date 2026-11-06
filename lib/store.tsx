"use client";

import * as React from "react";
import type {
  Activity,
  ActivityType,
  AssessmentResult,
  CareerId,
  Profile,
  Settings,
  Submission,
  User,
  UserData,
} from "@/lib/types";
import { careers, getAllModules, getCareer } from "@/lib/data/careers";
import { getSimulation } from "@/lib/data/simulations";
import { calculateScores } from "@/lib/data/assessment";
import { evaluateSubmission } from "@/lib/feedback";

const USERS_KEY = "pathforge:users";
const SESSION_KEY = "pathforge:session";
const dataKey = (id: string) => `pathforge:data:${id}`;

export const DEMO_EMAIL = "demo@pathforge.id";
export const DEMO_PASSWORD = "demo1234";

const defaultProfile: Profile = {
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

const defaultSettings: Settings = {
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
    activity: [],
    settings: { ...defaultSettings },
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage penuh / diblokir */
  }
}

function normalize(data: Partial<UserData> | null): UserData {
  const empty = createEmptyData();
  if (!data) return empty;
  return {
    ...empty,
    ...data,
    profile: { ...empty.profile, ...(data.profile ?? {}) },
    settings: { ...empty.settings, ...(data.settings ?? {}) },
  };
}

function makeActivity(type: ActivityType, label: string, xp: number, date?: Date): Activity {
  return { id: uid(), type, label, xp, date: (date ?? new Date()).toISOString() };
}

/* ---------------- Demo seed ---------------- */

function buildDemoData(): UserData {
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
  data.activity.push(makeActivity("assessment", "Menyelesaikan asesmen Career GPS", 50, daysAgo(20)));
  data.activity.push(makeActivity("career", "Memilih jalur Web Developer", 0, daysAgo(20)));

  const career = getCareer("web-developer")!;
  const modules = getAllModules(career).slice(0, 6);
  const dayPlan = [18, 15, 12, 9, 5, 2];
  modules.forEach((m, i) => {
    data.completedModules.push(m.id);
    data.activity.push(makeActivity("module", `Menyelesaikan modul "${m.title}"`, m.hours * 10, daysAgo(dayPlan[i])));
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
    makeActivity("simulation", `Mengirim simulasi "${sim.title}" (skor ${result.score})`, Math.round((sim.xp * result.score) / 100), daysAgo(4))
  );
  data.activity.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return data;
}

/* ---------------- Context ---------------- */

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AppContextValue {
  ready: boolean;
  user: Omit<User, "password"> | null;
  data: UserData;
  register: (input: { name: string; email: string; password: string }) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  loginDemo: () => void;
  logout: () => void;
  updateAccount: (input: { name?: string; email?: string }) => AuthResult;
  changePassword: (current: string, next: string) => AuthResult;
  deleteAccount: () => void;
  saveAssessment: (answers: Record<string, string>, profile: Partial<Profile>) => AssessmentResult;
  completeOnboarding: (careerId: CareerId) => void;
  setActiveCareer: (careerId: CareerId) => void;
  toggleModule: (moduleId: string) => boolean;
  saveDraft: (simulationId: string, answers: Record<string, string>) => void;
  submitSimulation: (simulationId: string, answers: Record<string, string>) => Submission | null;
  toggleFeatured: (simulationId: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetProgress: () => void;
}

const AppContext = React.createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [data, setData] = React.useState<UserData>(createEmptyData);

  React.useEffect(() => {
    const sessionId = read<string | null>(SESSION_KEY, null);
    if (sessionId) {
      const users = read<User[]>(USERS_KEY, []);
      const found = users.find((u) => u.id === sessionId);
      if (found) {
        setUser(found);
        setData(normalize(read<UserData | null>(dataKey(found.id), null)));
      }
    }
    setReady(true);
  }, []);

  const commit = React.useCallback(
    (updater: (prev: UserData) => UserData) => {
      setData((prev) => {
        const next = updater(prev);
        if (user) write(dataKey(user.id), next);
        return next;
      });
    },
    [user]
  );

  const startSession = (u: User, d: UserData) => {
    write(SESSION_KEY, u.id);
    setUser(u);
    setData(d);
  };

  const register: AppContextValue["register"] = ({ name, email, password }) => {
    const users = read<User[]>(USERS_KEY, []);
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, error: "Email sudah terdaftar. Silakan masuk." };
    }
    const newUser: User = {
      id: uid(),
      name: name.trim(),
      email: normalized,
      password,
      createdAt: new Date().toISOString(),
    };
    write(USERS_KEY, [...users, newUser]);
    const d = createEmptyData();
    write(dataKey(newUser.id), d);
    startSession(newUser, d);
    return { ok: true };
  };

  const login: AppContextValue["login"] = (email, password) => {
    const users = read<User[]>(USERS_KEY, []);
    const found = users.find((u) => u.email === email.trim().toLowerCase());
    if (!found || found.password !== password) {
      return { ok: false, error: "Email atau kata sandi salah." };
    }
    startSession(found, normalize(read<UserData | null>(dataKey(found.id), null)));
    return { ok: true };
  };

  const loginDemo = () => {
    const users = read<User[]>(USERS_KEY, []);
    let demo = users.find((u) => u.email === DEMO_EMAIL);
    if (!demo) {
      demo = {
        id: "demo-user",
        name: "Rina Pratama",
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        createdAt: new Date().toISOString(),
      };
      write(USERS_KEY, [...users, demo]);
    }
    let d = read<UserData | null>(dataKey(demo.id), null);
    if (!d) {
      d = buildDemoData();
      write(dataKey(demo.id), d);
    }
    startSession(demo, normalize(d));
  };

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setData(createEmptyData());
  };

  const updateAccount: AppContextValue["updateAccount"] = (input) => {
    if (!user) return { ok: false, error: "Tidak ada sesi aktif." };
    const users = read<User[]>(USERS_KEY, []);
    const email = input.email?.trim().toLowerCase();
    if (email && email !== user.email && users.some((u) => u.email === email)) {
      return { ok: false, error: "Email sudah digunakan akun lain." };
    }
    const updated: User = {
      ...user,
      name: input.name?.trim() || user.name,
      email: email || user.email,
    };
    write(USERS_KEY, users.map((u) => (u.id === user.id ? updated : u)));
    setUser(updated);
    return { ok: true };
  };

  const changePassword: AppContextValue["changePassword"] = (current, next) => {
    if (!user) return { ok: false, error: "Tidak ada sesi aktif." };
    if (user.password !== current) return { ok: false, error: "Kata sandi saat ini salah." };
    const users = read<User[]>(USERS_KEY, []);
    const updated = { ...user, password: next };
    write(USERS_KEY, users.map((u) => (u.id === user.id ? updated : u)));
    setUser(updated);
    return { ok: true };
  };

  const deleteAccount = () => {
    if (!user) return;
    const users = read<User[]>(USERS_KEY, []);
    write(USERS_KEY, users.filter((u) => u.id !== user.id));
    window.localStorage.removeItem(dataKey(user.id));
    logout();
  };

  const saveAssessment: AppContextValue["saveAssessment"] = (answers, profile) => {
    const result: AssessmentResult = {
      completedAt: new Date().toISOString(),
      answers,
      scores: calculateScores(answers),
    };
    commit((prev) => ({
      ...prev,
      assessment: result,
      profile: { ...prev.profile, ...profile },
      activity: [makeActivity("assessment", "Menyelesaikan asesmen Career GPS", 50), ...prev.activity],
    }));
    return result;
  };

  const completeOnboarding = (careerId: CareerId) => {
    const career = getCareer(careerId);
    commit((prev) => ({
      ...prev,
      onboarded: true,
      activeCareer: careerId,
      activity: [makeActivity("career", `Memilih jalur ${career?.title ?? careerId}`, 0), ...prev.activity],
    }));
  };

  const setActiveCareer = (careerId: CareerId) => {
    const career = getCareer(careerId);
    commit((prev) => ({
      ...prev,
      activeCareer: careerId,
      activity: [makeActivity("career", `Beralih ke jalur ${career?.title ?? careerId}`, 0), ...prev.activity],
    }));
  };

  const toggleModule = (moduleId: string) => {
    const isDone = data.completedModules.includes(moduleId);
    const mod = findModule(moduleId);
    commit((prev) => {
      if (prev.completedModules.includes(moduleId)) {
        return { ...prev, completedModules: prev.completedModules.filter((m) => m !== moduleId) };
      }
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        activity: mod
          ? [makeActivity("module", `Menyelesaikan modul "${mod.title}"`, mod.hours * 10), ...prev.activity]
          : prev.activity,
      };
    });
    return !isDone;
  };

  const saveDraft = (simulationId: string, answers: Record<string, string>) => {
    commit((prev) => ({ ...prev, drafts: { ...prev.drafts, [simulationId]: answers } }));
  };

  const submitSimulation: AppContextValue["submitSimulation"] = (simulationId, answers) => {
    const sim = getSimulation(simulationId);
    if (!sim) return null;
    const result = evaluateSubmission(sim, answers);
    const prevSub = data.submissions[simulationId];
    const submission: Submission = {
      simulationId,
      answers,
      ...result,
      submittedAt: new Date().toISOString(),
      attempts: (prevSub?.attempts ?? 0) + 1,
    };
    const prevXp = prevSub ? Math.round((sim.xp * prevSub.score) / 100) : 0;
    const newXp = Math.round((sim.xp * result.score) / 100);
    commit((prev) => {
      const { [simulationId]: _removed, ...drafts } = prev.drafts;
      return {
        ...prev,
        drafts,
        submissions: { ...prev.submissions, [simulationId]: submission },
        activity: [
          makeActivity("simulation", `Mengirim simulasi "${sim.title}" (skor ${result.score})`, Math.max(0, newXp - prevXp)),
          ...prev.activity,
        ],
      };
    });
    return submission;
  };

  const toggleFeatured = (simulationId: string) => {
    commit((prev) => ({
      ...prev,
      featured: prev.featured.includes(simulationId)
        ? prev.featured.filter((f) => f !== simulationId)
        : [...prev.featured, simulationId],
    }));
  };

  const updateProfile = (patch: Partial<Profile>) => {
    commit((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  };

  const updateSettings = (patch: Partial<Settings>) => {
    commit((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const resetProgress = () => {
    commit((prev) => ({
      ...prev,
      completedModules: [],
      submissions: {},
      drafts: {},
      featured: [],
      activity: [],
    }));
  };

  const publicUser = user
    ? { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    : null;

  const value: AppContextValue = {
    ready,
    user: publicUser,
    data,
    register,
    login,
    loginDemo,
    logout,
    updateAccount,
    changePassword,
    deleteAccount,
    saveAssessment,
    completeOnboarding,
    setActiveCareer,
    toggleModule,
    saveDraft,
    submitSimulation,
    toggleFeatured,
    updateProfile,
    updateSettings,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Cari modul di semua karier (dipakai untuk label aktivitas). */
function findModule(moduleId: string) {
  for (const c of careers) {
    const m = getAllModules(c).find((x) => x.id === moduleId);
    if (m) return m;
  }
  return undefined;
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam <AppProvider>");
  return ctx;
}
