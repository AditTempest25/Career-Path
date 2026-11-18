import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  Flame,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import type { UserData } from "@/lib/types";
import { getStreak, getTotalXp } from "@/lib/progress";

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: "belajar" | "simulasi" | "konsistensi" | "portofolio";
  isUnlocked: (data: UserData) => boolean;
  progressText?: (data: UserData) => string;
}

export const badges: AchievementBadge[] = [
  {
    id: "first-step",
    title: "Langkah Pertama",
    description: "Selesaikan asesmen Career GPS dan pilih jalur karier pertamamu.",
    icon: Compass,
    category: "belajar",
    isUnlocked: (data) => !!data.assessment && !!data.activeCareer,
  },
  {
    id: "module-starter",
    title: "Haus Ilmu",
    description: "Selesaikan modul belajar pertama di kurikulum roadmap.",
    icon: BookOpen,
    category: "belajar",
    isUnlocked: (data) => data.completedModules.length >= 1,
    progressText: (data) => `${data.completedModules.length}/1 modul`,
  },
  {
    id: "knowledge-builder",
    title: "Pondasi Kuat",
    description: "Selesaikan minimal 5 modul belajar.",
    icon: GraduationCap,
    category: "belajar",
    isUnlocked: (data) => data.completedModules.length >= 5,
    progressText: (data) => `${Math.min(5, data.completedModules.length)}/5 modul`,
  },
  {
    id: "first-simulation",
    title: "Sentuhan Industri",
    description: "Kirimkan tugas simulasi kerja pertamamu dan peroleh review.",
    icon: Briefcase,
    category: "simulasi",
    isUnlocked: (data) => Object.keys(data.submissions).length >= 1,
    progressText: (data) => `${Object.keys(data.submissions).length}/1 tugas`,
  },
  {
    id: "perfectionist",
    title: "Standar Emas",
    description: "Raih skor 90 atau lebih pada tugas simulasi kerja.",
    icon: Trophy,
    category: "simulasi",
    isUnlocked: (data) => Object.values(data.submissions).some((s) => s.score >= 90),
  },
  {
    id: "portfolio-ready",
    title: "Siap Dilirik HRD",
    description: "Tandai minimal 1 proyek simulasi ke Portofolio Pilihan (Featured).",
    icon: Star,
    category: "portofolio",
    isUnlocked: (data) => data.featured.length >= 1,
    progressText: (data) => `${data.featured.length}/1 proyek`,
  },
  {
    id: "streak-3",
    title: "Konsisten Membara",
    description: "Pertahankan streak belajar minimal 3 hari beruntun.",
    icon: Flame,
    category: "konsistensi",
    isUnlocked: (data) => getStreak(data) >= 3,
    progressText: (data) => `${Math.min(3, getStreak(data))}/3 hari`,
  },
  {
    id: "xp-master",
    title: "Pengumpul XP",
    description: "Capai total 500 XP atau setara Level 2.",
    icon: Zap,
    category: "konsistensi",
    isUnlocked: (data) => getTotalXp(data) >= 500,
    progressText: (data) => `${Math.min(500, getTotalXp(data))}/500 XP`,
  },
];

export function getUnlockedBadges(data: UserData) {
  return badges.filter((b) => b.isUnlocked(data));
}
