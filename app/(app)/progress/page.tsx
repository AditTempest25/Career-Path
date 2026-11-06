"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Flame,
  LineChart,
  Lock,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader, ScoreRing, StatCard } from "@/components/app/shared";
import { CertificateModal } from "@/components/app/certificate-modal";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { badges } from "@/lib/data/badges";
import {
  formatDate,
  formatRelative,
  getDailyActivity,
  getLevel,
  getReadiness,
  getRoadmapProgress,
  getSkillLevels,
  getStreak,
  getTotalXp,
  XP_PER_LEVEL,
} from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function ProgressPage() {
  const { data } = useApp();
  const career = getCareer(data.activeCareer);
  const [certOpen, setCertOpen] = useState(false);

  const xp = getTotalXp(data);
  const level = getLevel(xp);
  const streak = getStreak(data);
  const readiness = career ? getReadiness(career.id, data) : 0;
  const roadmapProgress = career ? getRoadmapProgress(career, data) : null;
  const skillLevels = career ? getSkillLevels(career, data) : [];
  const dailyActivity = getDailyActivity(data, 14);

  const unlockedCount = badges.filter((b) => b.isUnlocked(data)).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <CertificateModal isOpen={certOpen} onClose={() => setCertOpen(false)} />

      <PageHeader
        title="Progres & Analitik Belajar"
        description="Pantau pencapaian, penguasaan keterampilan teknis, dan konsistensi belajarmu secara mendalam."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCertOpen(true)}
            className="gap-1.5 text-primary border-primary/30"
          >
            <Award className="h-4 w-4" /> Cetak Sertifikat Digital
          </Button>
        }
      />

      {/* Grid Statistik Utama */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Skor Kesiapan Karier"
          value={`${readiness}%`}
          hint={career ? `Target: ${career.title}` : "Pilih jalur karier"}
          icon={Trophy}
          tone="primary"
        />
        <StatCard
          label="Total Pengalaman (XP)"
          value={`${xp} XP`}
          hint={`Level ${level.level} · ${XP_PER_LEVEL - level.current} XP menuju Lv ${level.level + 1}`}
          icon={Zap}
          tone="warning"
        />
        <StatCard
          label="Konsistensi (Streak)"
          value={`${streak} Hari`}
          hint="Pertahankan dengan belajar tiap hari"
          icon={Flame}
          tone="accent"
        />
        <StatCard
          label="Lencana Terbuka"
          value={`${unlockedCount} / ${badges.length}`}
          hint="Koleksi lencana prestasi"
          icon={Award}
          tone="success"
        />
      </div>

      {/* Baris Tengah: Level Progress & Kesiapan */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Level XP Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Level Gamifikasi
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">
                Level {level.level}
              </h3>
            </div>
            <Badge variant="outline" className="gap-1 font-mono text-xs">
              <Zap className="h-3 w-3 text-warning fill-warning" /> {xp} XP
            </Badge>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progres level saat ini</span>
              <span>{level.percent}% ({level.current} / {level.next} XP)</span>
            </div>
            <Progress value={level.percent} className="h-2.5" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Dapatkan XP tambahan dengan menyelesaikan modul kurikulum (+10 XP per jam estimasi) dan mengirim deliverable Work Simulator (+150 hingga +350 XP sesuai skor).
          </p>
        </div>

        {/* Skor Kesiapan */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
          <ScoreRing value={readiness} size={120} stroke={10} label="Kesiapan" />
          <h4 className="mt-3 font-bold text-sm">Indeks Kesiapan Kerja</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Berdasarkan evaluasi komprehensif jalur {career?.title}.
          </p>
        </div>
      </div>

      {/* Lencana & Prestasi (Badges Section) */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Lencana & Prestasi ({unlockedCount}/{badges.length} Terbuka)
            </h3>
            <p className="text-xs text-muted-foreground">
              Pencapaian nyata atas dedikasi dan penguasaan simulasi kerjamu.
            </p>
          </div>
          <Badge variant="secondary">Gamified Milestones</Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {badges.map((badge) => {
            const unlocked = badge.isUnlocked(data);
            const Icon = badge.icon;
            const progress = badge.progressText ? badge.progressText(data) : null;

            return (
              <div
                key={badge.id}
                className={cn(
                  "relative flex flex-col items-center justify-between rounded-xl border p-4 text-center transition-all",
                  unlocked
                    ? "border-primary/40 bg-primary/5 shadow-sm"
                    : "border-border bg-muted/20 opacity-60"
                )}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold",
                      unlocked
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-3 font-semibold text-sm text-foreground">{badge.title}</h4>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 w-full border-t border-border/50 pt-2 text-[10px]">
                  {unlocked ? (
                    <span className="font-semibold text-success flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Berhasil Dibuka
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center justify-center gap-1">
                      <Lock className="h-3 w-3" /> {progress || "Terkunci"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analisis Penguasaan Keterampilan (Skill Mastery) */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Penguasaan Skill ({career?.title})
            </h3>
            <p className="text-xs text-muted-foreground">
              Kalkulasi otomatis dari modul yang diselesaikan dan nilai tugas simulasi yang relevan.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit">
            {skillLevels.length} Keterampilan Inti
          </Badge>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {skillLevels.map(({ skill, level }) => (
            <div key={skill} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{skill}</span>
                <span className="font-mono text-muted-foreground">{level}%</span>
              </div>
              <Progress value={level} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Grafik Aktivitas 14 Hari Terakhir */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
          Aktivitas Belajar (14 Hari Terakhir)
        </h3>
        <p className="text-xs text-muted-foreground">
          Intensitas perolehan XP dan modul harianmu.
        </p>

        <div className="mt-6 grid grid-cols-7 sm:grid-cols-14 gap-2">
          {dailyActivity.map((day) => {
            const hasActivity = day.xp > 0 || day.count > 0;
            return (
              <div key={day.key} className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border flex items-end justify-center p-1 bg-muted/30"
                  title={`${day.label}: ${day.xp} XP (${day.count} aktivitas)`}
                >
                  <div
                    className="w-full rounded bg-primary transition-all"
                    style={{
                      height: hasActivity ? `${Math.min(100, Math.max(15, (day.xp / 100) * 100))}%` : "0%",
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground truncate w-full">
                  {day.label.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Riwayat Log Aktivitas Lengkap */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
          Log Riwayat Aktivitas
        </h3>

        <div className="mt-4 divide-y divide-border">
          {data.activity.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">Belum ada riwayat aktivitas.</p>
          ) : (
            data.activity.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{act.label}</p>
                    <span className="text-[11px] text-muted-foreground">{formatDate(act.date)}</span>
                  </div>
                </div>
                {act.xp > 0 && (
                  <span className="font-semibold text-primary">+{act.xp} XP</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
