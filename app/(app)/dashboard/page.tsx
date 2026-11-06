"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Flame,
  FolderKanban,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader, ScoreRing, StatCard } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { getSimulationsByCareer } from "@/lib/data/simulations";
import {
  formatRelative,
  getLevel,
  getNextModule,
  getReadiness,
  getRoadmapProgress,
  getSimulationStats,
  getStreak,
  getTotalXp,
} from "@/lib/progress";

export default function DashboardPage() {
  const { user, data } = useApp();
  const career = getCareer(data.activeCareer);
  const roadmapProgress = career ? getRoadmapProgress(career, data) : null;
  const simStats = career ? getSimulationStats(career.id, data) : null;
  const nextMod = career ? getNextModule(career, data) : null;
  const readiness = career ? getReadiness(career.id, data) : 0;
  const careerSims = career ? getSimulationsByCareer(career.id) : [];

  const xp = getTotalXp(data);
  const level = getLevel(xp);
  const streak = getStreak(data);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title={`Halo, ${user?.name.split(" ")[0]}! 👋`}
        description={
          career
            ? `Kamu sedang menempuh jalur ${career.title}. Siap lanjutkan langkah hari ini?`
            : "Selamat datang di PathForge."
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild size="sm">
              <Link href="/careers">
                <Compass className="mr-1.5 h-4 w-4 text-primary" />
                Ganti Jalur
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/roadmap">
                <Play className="mr-1.5 h-4 w-4" />
                Lanjut Belajar
              </Link>
            </Button>
          </div>
        }
      />

      {/* Grid Statistik Utama */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Skor Kesiapan Kerja"
          value={`${readiness}%`}
          hint={readiness >= 70 ? "Sudah mendekati siap kerja!" : "Tingkatkan modul & simulasi"}
          icon={Trophy}
          tone="primary"
        />
        <StatCard
          label="Modul Diselesaikan"
          value={roadmapProgress ? `${roadmapProgress.completed} / ${roadmapProgress.total}` : "0"}
          hint={roadmapProgress ? `${roadmapProgress.hoursDone} jam dari ${roadmapProgress.hoursTotal} jam` : "-"}
          icon={BookOpen}
          tone="accent"
        />
        <StatCard
          label="Simulasi Dikerjakan"
          value={simStats ? `${simStats.completed} / ${simStats.total}` : "0"}
          hint={simStats?.completed ? `Rata-rata skor: ${simStats.avgScore}/100` : "Belum ada simulasi"}
          icon={BriefcaseBusiness}
          tone="success"
        />
        <StatCard
          label="Level & Total XP"
          value={`Lv ${level.level}`}
          hint={`${xp} XP · Streak ${streak} hari aktif`}
          icon={Zap}
          tone="warning"
        />
      </div>

      {/* Baris Tengah: Next Action & Readiness Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card Target Selanjutnya (2 kolom) */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" /> Rekomendasi Langkah
              </Badge>
              {career && (
                <span className="text-xs text-muted-foreground">
                  Jalur: <span className="font-semibold text-foreground">{career.title}</span>
                </span>
              )}
            </div>

            {nextMod ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Fase: {nextMod.phase.title}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                  {nextMod.module.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {nextMod.module.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-1 font-medium text-foreground">
                    Tipe: {nextMod.module.type}
                  </span>
                  <span>Estimasi: {nextMod.module.hours} jam</span>
                  <span>Fokus skill: {nextMod.module.skill}</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold">
                  Semua modul selesai!
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Kamu telah menyelesaikan seluruh roadmap modul untuk jalur ini. Lanjutkan ke Work Simulator untuk memperkuat portofolio.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div className="text-xs text-muted-foreground">
              {roadmapProgress ? `${roadmapProgress.percent}% roadmap terpenuhi` : ""}
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/roadmap">Buka Roadmap</Link>
              </Button>
              {nextMod && (
                <Button asChild size="sm">
                  <Link href="/roadmap">
                    Mulai Belajar Sekarang <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Card Kesiapan Kerja (1 kolom) */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
          <ScoreRing value={readiness} size={130} stroke={12} label="Kesiapan" />
          <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
            {readiness >= 80 ? "Sangat Siap Kerja" : readiness >= 50 ? "Sedang Berkembang" : "Baru Memulai"}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Dihitung dari progres roadmap ({roadmapProgress?.percent || 0}%), rata-rata simulasi ({simStats?.avgScore || 0}%), dan kecocokan asesmen.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-5 w-full">
            <Link href="/progress">Lihat Detail Analitik</Link>
          </Button>
        </div>
      </div>

      {/* Baris Bawah: Simulasi Tersedia & Riwayat Aktivitas */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Simulasi Nyata (2 kolom) */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                Work Simulator untuk {career?.title}
              </h2>
              <p className="text-xs text-muted-foreground">Tantangan kerja nyata yang bisa langsung kamu kerjakan.</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/simulator">
                Semua Simulasi <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {careerSims.slice(0, 3).map((sim) => {
              const submission = data.submissions[sim.id];
              return (
                <div
                  key={sim.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 bg-background/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                        {sim.company.initials}
                      </span>
                      <h4 className="truncate font-semibold text-sm text-foreground">{sim.title}</h4>
                      {submission && (
                        <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                          Skor {submission.score}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{sim.summary}</p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>Perusahaan: {sim.company.name}</span>
                      <span>·</span>
                      <span>+{sim.xp} XP</span>
                      <span>·</span>
                      <span>{sim.estimatedTime}</span>
                    </div>
                  </div>

                  <Button asChild size="sm" variant={submission ? "outline" : "default"}>
                    <Link href={`/simulator/${sim.id}`}>
                      {submission ? "Lihat Review" : "Mulai Tugas"}
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aktivitas Terbaru (1 kolom) */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Aktivitas Terakhir
            </h2>
            <Link href="/progress" className="text-xs text-primary hover:underline">
              Semua
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {data.activity.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">Belum ada aktivitas tercatat.</p>
            ) : (
              data.activity.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{act.label}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{formatRelative(act.date)}</span>
                      {act.xp > 0 && <span className="font-semibold text-primary">+{act.xp} XP</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
