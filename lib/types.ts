import type { LucideIcon } from "lucide-react";

export type CareerId =
  | "web-developer"
  | "ui-ux-designer"
  | "qa-engineer"
  | "business-analyst"
  | "data-analyst"
  | "mobile-developer";

export type ModuleType = "materi" | "praktik" | "proyek";

export interface Resource {
  title: string;
  url: string;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  hours: number;
  skill: string;
  resources: Resource[];
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  modules: RoadmapModule[];
}

export interface Career {
  id: CareerId;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  level: "Ramah Pemula" | "Menengah";
  demand: "Sangat Tinggi" | "Tinggi" | "Stabil";
  skills: string[];
  tools: string[];
  /** Gaji entry-level hingga mid-level, dalam juta rupiah per bulan */
  salary: { min: number; max: number };
  duration: string;
  employers: string[];
  dayInLife: string[];
  roadmap: RoadmapPhase[];
}

export type Difficulty = "Mudah" | "Sedang" | "Sulit";

export interface Deliverable {
  id: string;
  label: string;
  description: string;
  type: "text" | "link";
  placeholder?: string;
  minWords?: number;
}

export interface RubricCriterion {
  id: string;
  label: string;
  weight: number;
  keywords: string[];
  hint: string;
}

export interface Simulation {
  id: string;
  careerId: CareerId;
  title: string;
  company: { name: string; industry: string; initials: string };
  role: string;
  difficulty: Difficulty;
  estimatedTime: string;
  xp: number;
  skills: string[];
  summary: string;
  context: string;
  objectives: string[];
  deliverables: Deliverable[];
  rubric: RubricCriterion[];
  tips: string[];
}

export interface AssessmentOption {
  id: string;
  label: string;
  scores: Partial<Record<CareerId, number>>;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  helper?: string;
  options: AssessmentOption[];
}

/* ---------- Persisted user state ---------- */

export interface User {
  id: string;
  name: string;
  email: string;
  /** Mock-only. Akan diganti autentikasi backend. */
  password: string;
  createdAt: string;
}

export type UserStatus =
  | "mahasiswa"
  | "fresh-graduate"
  | "career-switcher"
  | "bekerja";

export interface Profile {
  headline: string;
  bio: string;
  location: string;
  education: string;
  status: UserStatus;
  weeklyHours: number;
  linkedin: string;
  github: string;
  website: string;
}

export interface AssessmentResult {
  completedAt: string;
  answers: Record<string, string>;
  scores: Record<CareerId, number>;
}

export interface CriterionResult {
  id: string;
  label: string;
  score: number;
  max: number;
  met: boolean;
}

export interface Feedback {
  summary: string;
  strengths: string[];
  improvements: string[];
}

export interface Submission {
  simulationId: string;
  answers: Record<string, string>;
  score: number;
  breakdown: CriterionResult[];
  feedback: Feedback;
  submittedAt: string;
  attempts: number;
}

export type ActivityType =
  | "module"
  | "simulation"
  | "assessment"
  | "career"
  | "profile"
  | "job"
  | "interview"
  | "quiz"
  | "scanner";

export interface Activity {
  id: string;
  type: ActivityType;
  label: string;
  date: string;
  xp: number;
}

export interface Settings {
  emailNotifications: boolean;
  weeklyReminder: boolean;
  publicPortfolio: boolean;
}

export interface JobApplication {
  jobId: string;
  appliedAt: string;
  status: "Terkirim" | "Ditinjau" | "Wawancara";
}

export interface InterviewPractice {
  questionId: string;
  answer: string;
  practicedAt: string;
  rating?: number;
}

export interface StudyPlan {
  weeklyHours: number;
  preferredDays: string[];
  startDate?: string;
}

export interface DailyChallengeState {
  lastCompletedDate?: string;
  streakCount: number;
  totalAnswered: number;
}

export interface UserData {
  profile: Profile;
  onboarded: boolean;
  assessment: AssessmentResult | null;
  activeCareer: CareerId | null;
  completedModules: string[];
  submissions: Record<string, Submission>;
  drafts: Record<string, Record<string, string>>;
  featured: string[];
  appliedJobs?: Record<string, JobApplication>;
  interviewPractice?: Record<string, InterviewPractice>;
  studyPlan?: StudyPlan;
  dailyChallenge?: DailyChallengeState;
  moduleNotes?: Record<string, string>;
  activity: Activity[];
  settings: Settings;
}
