"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  Filter,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge, PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { simulations } from "@/lib/data/simulations";
import { careers, getCareer } from "@/lib/data/careers";
import type { CareerId } from "@/lib/types";

export default function SimulatorPage() {
  const { data } = useApp();
  const [selectedCareer, setSelectedCareer] = useState<string>(data.activeCareer || "all");

  const filtered = simulations.filter((sim) => {
    if (selectedCareer === "all") return true;
    return sim.careerId === selectedCareer;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Work Simulator"
        description="Kerjakan tantangan proyek nyata dari perusahaan mock. Dapatkan review instan berbasis rubrik untuk dimasukkan ke portofoliomu."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/portfolio">
              <Trophy className="mr-1.5 h-4 w-4 text-primary" />
              Buka Portofolio
            </Link>
          </Button>
        }
      />

      {/* Filter Per Career */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        <Filter className="h-4 w-4 text-muted-foreground mr-1" />
        <Button
          variant={selectedCareer === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setSelectedCareer("all")}
          className="text-xs h-7"
        >
          Semua Jalur ({simulations.length})
        </Button>
        {careers.map((c) => {
          const count = simulations.filter((s) => s.careerId === c.id).length;
          return (
            <Button
              key={c.id}
              variant={selectedCareer === c.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCareer(c.id)}
              className="text-xs h-7"
            >
              {c.title} ({count})
            </Button>
          );
        })}
      </div>

      {/* Grid Simulasi */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((sim) => {
          const career = getCareer(sim.careerId);
          const submission = data.submissions[sim.id];

          return (
            <div
              key={sim.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary text-sm">
                      {sim.company.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {sim.company.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground">· {sim.company.industry}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Peran: {sim.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <DifficultyBadge difficulty={sim.difficulty} />
                    {submission && (
                      <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                        Skor {submission.score}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Judul & Summary */}
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                  {sim.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {sim.summary}
                </p>

                {/* Skill Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {sim.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Info Footer Card */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{sim.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-primary">
                    <Zap className="h-3.5 w-3.5" />
                    <span>+{sim.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Button asChild className="w-full gap-2" variant={submission ? "outline" : "default"}>
                  <Link href={`/simulator/${sim.id}`}>
                    {submission ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Tinjau Hasil & Kirim Ulang
                      </>
                    ) : (
                      <>
                        Buka Brief & Kerjakan
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
