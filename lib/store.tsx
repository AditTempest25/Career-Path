"use client";

import * as React from "react";
import type {
  Activity,
  ActivityType,
  AssessmentResult,
  CareerId,
  Profile,
  Settings,
  StudyPlan,
  Submission,
  User,
  UserData,
} from "@/lib/types";
import { careers, getAllModules, getCareer } from "@/lib/data/careers";
import { getSimulation } from "@/lib/data/simulations";
import { calculateScores } from "@/lib/data/assessment";
import { evaluateSubmission } from "@/lib/feedback";
import {
  buildDemoData,
  createEmptyData,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  normalizeUserData,
} from "@/lib/seed-data";

export { createEmptyData, DEMO_EMAIL, DEMO_PASSWORD };

const USERS_KEY = "pathforge:users";
const SESSION_KEY = "pathforge:session";
const dataKey = (id: string) => `pathforge:data:${id}`;

type PublicUser = Omit<User, "password">;

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
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage penuh / diblokir */
  }
}

function makeActivity(type: ActivityType, label: string, xp: number, date?: Date): Activity {
  return { id: uid(), type, label, xp, date: (date ?? new Date()).toISOString() };
}

/* ---------------- Context ---------------- */

export interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AppContextValue {
  ready: boolean;
  user: PublicUser | null;
  data: UserData;
  register: (input: { name: string; email: string; password: string }) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginDemo: () => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateAccount: (input: { name?: string; email?: string }) => Promise<AuthResult>;
  changePassword: (current: string, next: string) => Promise<AuthResult>;
  deleteAccount: () => Promise<void>;
  saveAssessment: (answers: Record<string, string>, profile: Partial<Profile>) => AssessmentResult;
  completeOnboarding: (careerId: CareerId) => void;
  setActiveCareer: (careerId: CareerId) => void;
  toggleModule: (moduleId: string) => boolean;
  saveDraft: (simulationId: string, answers: Record<string, string>) => void;
  submitSimulation: (simulationId: string, answers: Record<string, string>) => Submission | null;
  toggleFeatured: (simulationId: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  applyJob: (jobId: string, jobTitle: string, companyName: string) => void;
  saveInterviewPractice: (questionId: string, answer: string, rating?: number) => void;
  syncScannedModules: (moduleIds: string[]) => number;
  saveStudyPlan: (plan: StudyPlan) => void;
  completeDailyChallenge: (xpEarned: number) => void;
  saveModuleNote: (moduleId: string, note: string) => void;
  resetProgress: () => void;
}

const AppContext = React.createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<PublicUser | null>(null);
  const [data, setData] = React.useState<UserData>(createEmptyData);

  // Sinkronisasi sesi dari Backend HTTP-Only Cookie saat aplikasi dimuat
  React.useEffect(() => {
    let active = true;

    async function hydrateSession() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (res.ok) {
          const payload = (await res.json()) as {
            authenticated: boolean;
            user: PublicUser | null;
            data: UserData | null;
          };

          if (active && payload.authenticated && payload.user) {
            const normalized = normalizeUserData(payload.data);
            setUser(payload.user);
            setData(normalized);
            write(SESSION_KEY, payload.user.id);
            write(dataKey(payload.user.id), normalized);
            setReady(true);
            return;
          }
        }
      } catch {
        // Fallback ke localStorage jika sedang offline
        const sessionId = read<string | null>(SESSION_KEY, null);
        if (sessionId && active) {
          const users = read<User[]>(USERS_KEY, []);
          const found = users.find((u) => u.id === sessionId);
          if (found) {
            setUser({
              id: found.id,
              name: found.name,
              email: found.email,
              createdAt: found.createdAt,
            });
            setData(normalizeUserData(read<UserData | null>(dataKey(found.id), null)));
          }
        }
      }

      if (active) {
        setReady(true);
      }
    }

    hydrateSession();
    return () => {
      active = false;
    };
  }, []);

  const syncDataToServer = React.useCallback((nextData: UserData) => {
    fetch("/api/user/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ data: nextData }),
    }).catch(() => {
      /* abaikan error jaringan sementara, data tetap tersimpan di localStorage */
    });
  }, []);

  const commit = React.useCallback(
    (updater: (prev: UserData) => UserData) => {
      setData((prev) => {
        const next = updater(prev);
        if (user) {
          write(dataKey(user.id), next);
          syncDataToServer(next);
        }
        return next;
      });
    },
    [user, syncDataToServer]
  );

  const startSession = (u: PublicUser, d: UserData) => {
    const normalized = normalizeUserData(d);
    write(SESSION_KEY, u.id);
    write(dataKey(u.id), normalized);
    setUser(u);
    setData(normalized);
  };

  const register: AppContextValue["register"] = async ({ name, email, password }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        user?: PublicUser;
        data?: UserData;
      };

      if (!res.ok || !payload.ok || !payload.user) {
        return { ok: false, error: payload.error || "Gagal mendaftarkan akun." };
      }

      startSession(payload.user, payload.data ?? createEmptyData());
      return { ok: true };
    } catch {
      return { ok: false, error: "Gagal terhubung ke server. Periksa koneksi kamu." };
    }
  };

  const login: AppContextValue["login"] = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        user?: PublicUser;
        data?: UserData;
      };

      if (!res.ok || !payload.ok || !payload.user) {
        return { ok: false, error: payload.error || "Email atau kata sandi salah." };
      }

      startSession(payload.user, payload.data ?? createEmptyData());
      return { ok: true };
    } catch {
      return { ok: false, error: "Gagal terhubung ke server autentikasi." };
    }
  };

  const loginDemo: AppContextValue["loginDemo"] = async () => {
    try {
      const res = await fetch("/api/auth/demo", {
        method: "POST",
        credentials: "include",
      });

      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        user?: PublicUser;
        data?: UserData;
      };

      if (res.ok && payload.ok && payload.user) {
        startSession(payload.user, payload.data ?? buildDemoData());
        return { ok: true };
      }
      return { ok: false, error: payload.error || "Gagal masuk ke akun demo." };
    } catch {
      // Fallback lokal jika server tidak terjangkau
      const demoUser: PublicUser = {
        id: "demo-user",
        name: "Raka Pratama",
        email: DEMO_EMAIL,
        createdAt: new Date().toISOString(),
      };
      const d = buildDemoData();
      startSession(demoUser, d);
      return { ok: true };
    }
  };

  const logout: AppContextValue["logout"] = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* abaikan error jaringan */
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_KEY);
    }
    setUser(null);
    setData(createEmptyData());
  };

  const updateAccount: AppContextValue["updateAccount"] = async (input) => {
    if (!user) return { ok: false, error: "Tidak ada sesi aktif." };
    try {
      const res = await fetch("/api/auth/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "profile",
          name: input.name,
          email: input.email,
        }),
      });

      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        user?: PublicUser;
      };

      if (!res.ok || !payload.ok || !payload.user) {
        return { ok: false, error: payload.error || "Gagal memperbarui akun." };
      }

      setUser(payload.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Gagal menghubungi server saat menyimpan akun." };
    }
  };

  const changePassword: AppContextValue["changePassword"] = async (currentPassword, newPassword) => {
    if (!user) return { ok: false, error: "Tidak ada sesi aktif." };
    try {
      const res = await fetch("/api/auth/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "password",
          currentPassword,
          newPassword,
        }),
      });

      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!res.ok || !payload.ok) {
        return { ok: false, error: payload.error || "Gagal mengubah kata sandi." };
      }

      return { ok: true };
    } catch {
      return { ok: false, error: "Gagal menghubungi server untuk mengubah kata sandi." };
    }
  };

  const deleteAccount: AppContextValue["deleteAccount"] = async () => {
    if (!user) return;
    const currentId = user.id;
    try {
      await fetch("/api/auth/account", {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      /* abaikan error jaringan */
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(dataKey(currentId));
      window.localStorage.removeItem(SESSION_KEY);
    }
    setUser(null);
    setData(createEmptyData());
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

  const applyJob = (jobId: string, jobTitle: string, companyName: string) => {
    commit((prev) => ({
      ...prev,
      appliedJobs: {
        ...(prev.appliedJobs ?? {}),
        [jobId]: {
          jobId,
          appliedAt: new Date().toISOString(),
          status: "Terkirim",
        },
      },
      activity: [
        makeActivity("job", `Melamar posisi ${jobTitle} di ${companyName}`, 25),
        ...prev.activity,
      ],
    }));
  };

  const saveInterviewPractice = (questionId: string, answer: string, rating?: number) => {
    commit((prev) => ({
      ...prev,
      interviewPractice: {
        ...(prev.interviewPractice ?? {}),
        [questionId]: {
          questionId,
          answer,
          practicedAt: new Date().toISOString(),
          rating,
        },
      },
      activity: [
        makeActivity("interview", `Latihan simulasi wawancara pertanyaan #${questionId}`, 15),
        ...prev.activity,
      ],
    }));
  };

  const syncScannedModules = (moduleIds: string[]): number => {
    let newlyAdded = 0;
    commit((prev) => {
      const existing = new Set(prev.completedModules);
      const toAdd = moduleIds.filter((id) => !existing.has(id));
      newlyAdded = toAdd.length;
      if (newlyAdded === 0) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, ...toAdd],
        activity: [
          makeActivity("scanner", `Sinkronisasi ${newlyAdded} modul dari hasil scan CV`, newlyAdded * 20),
          ...prev.activity,
        ],
      };
    });
    return newlyAdded;
  };

  const saveStudyPlan = (plan: StudyPlan) => {
    commit((prev) => ({
      ...prev,
      studyPlan: plan,
      profile: {
        ...prev.profile,
        weeklyHours: plan.weeklyHours,
      },
    }));
  };

  const completeDailyChallenge = (xpEarned: number) => {
    const todayStr = new Date().toISOString().split("T")[0];
    commit((prev) => ({
      ...prev,
      dailyChallenge: {
        lastCompletedDate: todayStr,
        streakCount: (prev.dailyChallenge?.streakCount ?? 0) + 1,
        totalAnswered: (prev.dailyChallenge?.totalAnswered ?? 0) + 1,
      },
      activity: [
        makeActivity("quiz", `Menyelesaikan Tantangan Kuis Kilat Harian (+${xpEarned} XP)`, xpEarned),
        ...prev.activity,
      ],
    }));
  };

  const saveModuleNote = (moduleId: string, note: string) => {
    commit((prev) => ({
      ...prev,
      moduleNotes: {
        ...(prev.moduleNotes ?? {}),
        [moduleId]: note,
      },
    }));
  };

  const resetProgress = () => {
    commit((prev) => ({
      ...prev,
      completedModules: [],
      submissions: {},
      drafts: {},
      featured: [],
      appliedJobs: {},
      interviewPractice: {},
      moduleNotes: {},
      dailyChallenge: {
        streakCount: 0,
        totalAnswered: 0,
      },
      activity: [],
    }));
  };

  const value: AppContextValue = {
    ready,
    user,
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
    applyJob,
    saveInterviewPractice,
    syncScannedModules,
    saveStudyPlan,
    completeDailyChallenge,
    saveModuleNote,
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
