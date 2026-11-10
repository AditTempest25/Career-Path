"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Compass, Filter, Layers, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { careers, formatSalary } from "@/lib/data/careers";
import type { CareerId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function CareersPage() {
  const { data, setActiveCareer } = useApp();
  const [filter, setFilter] = useState<string>("all");

  const assessmentScores = data.assessment?.scores;

  const filtered = careers.filter((c) => {
    if (filter === "all") return true;
    if (filter === "pemula") return c.level === "Ramah Pemula";
    if (filter === "menengah") return c.level === "Menengah";
    return true;
  });

  const onSelect = (id: CareerId, title: string) => {
    setActiveCareer(id);
    toast.success(`Jalur aktif diubah ke ${title}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Career GPS & Katalog Jalur"
        description="Eksplorasi seluruh jalur karier teknologi terpopuler di Indonesia, lengkap dengan roadmap dan estimasi gaji."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/careers/compare">
                <Layers className="h-4 w-4 text-primary" />
                Bandingkan Jalur Karier
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/onboarding">
                <Sparkles className="mr-1.5 h-4 w-4 text-primary" />
                Ulangi Asesmen
              </Link>
            </Button>
          </div>
        }
      />

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Tingkat:</span>
          {["all", "pemula", "menengah"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs h-7"
            >
              {f === "all" ? "Semua" : f === "pemula" ? "Ramah Pemula" : "Menengah"}
            </Button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Menampilkan {filtered.length} jalur karier
        </div>
      </div>

      {/* Grid Katalog */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => {
          const isActive = data.activeCareer === career.id;
          const matchScore = assessmentScores ? assessmentScores[career.id] : null;

          return (
            <div
              key={career.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md",
                isActive ? "border-primary ring-2 ring-primary/20" : "border-border"
              )}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <career.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {career.level}
                    </Badge>
                    {matchScore && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                        <Trophy className="h-3 w-3" /> {matchScore}% cocok
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                  {career.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {career.tagline}
                </p>

                {/* Skill Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {career.skills.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  {career.skills.length > 4 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      +{career.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Info Gaji & Waktu */}
                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Kisaran Gaji:</span>
                    <p className="font-semibold text-foreground">{formatSalary(career.salary)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Durasi Belajar:</span>
                    <p className="font-semibold text-foreground">{career.duration}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/careers/${career.id}`}>Detail Jalur</Link>
                </Button>
                {isActive ? (
                  <Button size="sm" variant="secondary" disabled className="gap-1.5">
                    <Check className="h-4 w-4 text-primary" /> Aktif
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => onSelect(career.id, career.title)}>
                    Pilih Jalur
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
