"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { getPhaseProgress, getRoadmapProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
  const { data, toggleModule } = useApp();
  const career = getCareer(data.activeCareer);

  const progress = career ? getRoadmapProgress(career, data) : null;
  const phaseProgress = career ? getPhaseProgress(career, data) : [];

  if (!career || !progress) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold">Belum ada jalur karier aktif</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pilih jalur karier terlebih dahulu untuk melihat roadmap belajar.
        </p>
        <Button asChild className="mt-4" size="sm">
          <Link href="/careers">Pilih Jalur Karier</Link>
        </Button>
      </div>
    );
  }

  const handleToggle = (id: string, title: string) => {
    const isCompletedNow = toggleModule(id);
    if (isCompletedNow) {
      toast.success(`Modul "${title}" selesai! XP bertambah 🎉`);
    } else {
      toast.info(`Status modul "${title}" dibatalkan.`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title={`Roadmap: ${career.title}`}
        description="Panduan kurikulum bertahap dari pemula hingga siap kerja. Centang modul yang sudah kamu kuasai."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/careers">Ganti Jalur Karier</Link>
          </Button>
        }
      />

      {/* Progress Bar Card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Progres Keseluruhan
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
                {progress.percent}%
              </span>
              <span className="text-xs text-muted-foreground">
                ({progress.completed} dari {progress.total} modul selesai)
              </span>
            </div>
          </div>
          <div className="text-right sm:text-right">
            <span className="text-xs text-muted-foreground">Investasi Waktu</span>
            <p className="font-semibold text-foreground text-sm">
              {progress.hoursDone} / {progress.hoursTotal} jam belajar
            </p>
          </div>
        </div>
        <Progress value={progress.percent} className="mt-4 h-2.5" />
      </div>

      {/* Fase-Fase Roadmap */}
      <div className="space-y-8">
        {phaseProgress.map(({ phase, done, total, percent }, phaseIdx) => (
          <div key={phase.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Fase {phaseIdx + 1}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{phase.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {done}/{total} Modul
                </span>
                <Badge variant={percent === 100 ? "default" : "secondary"}>
                  {percent}%
                </Badge>
              </div>
            </div>

            {/* Daftar Modul dalam Fase */}
            <div className="mt-4 space-y-3">
              {phase.modules.map((mod) => {
                const isDone = data.completedModules.includes(mod.id);

                return (
                  <div
                    key={mod.id}
                    className={cn(
                      "flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border p-4 transition-all",
                      isDone
                        ? "border-success/30 bg-success/5 dark:bg-success/10"
                        : "border-border bg-background/50 hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggle(mod.id, mod.title)}
                        className="mt-0.5 shrink-0 transition-transform hover:scale-110 focus:outline-none"
                        aria-label={isDone ? "Batalkan modul" : "Tandai selesai"}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-success fill-success/20" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4
                            className={cn(
                              "font-semibold text-sm",
                              isDone ? "text-muted-foreground line-through" : "text-foreground"
                            )}
                          >
                            {mod.title}
                          </h4>
                          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                            {mod.type}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {mod.hours} jam · +{mod.hours * 10} XP
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {mod.description}
                        </p>

                        {/* Sumber Belajar Gratis */}
                        {mod.resources.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-[11px] font-medium text-muted-foreground">
                              Materi rujukan:
                            </span>
                            {mod.resources.map((res) => (
                              <a
                                key={res.url}
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary hover:underline"
                              >
                                {res.title}
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button
                        size="sm"
                        variant={isDone ? "ghost" : "outline"}
                        onClick={() => handleToggle(mod.id, mod.title)}
                        className="text-xs h-8"
                      >
                        {isDone ? "Tandai Belum Selesai" : "Tandai Selesai"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
