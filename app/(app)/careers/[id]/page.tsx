"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { formatSalary, getCareer } from "@/lib/data/careers";
import { getSimulationsByCareer } from "@/lib/data/simulations";
import type { CareerId } from "@/lib/types";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data, setActiveCareer } = useApp();
  const careerId = params.id as string;
  const career = getCareer(careerId);
  const sims = career ? getSimulationsByCareer(career.id) : [];

  if (!career) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold">Jalur karier tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">Silakan kembali ke katalog karier.</p>
        <Button asChild className="mt-4" size="sm">
          <Link href="/careers">Kembali ke Katalog</Link>
        </Button>
      </div>
    );
  }

  const isActive = data.activeCareer === career.id;
  const matchScore = data.assessment?.scores[career.id as CareerId];

  const onActivate = () => {
    setActiveCareer(career.id as CareerId);
    toast.success(`Jalur aktif diubah ke ${career.title}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tombol Kembali */}
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5 text-xs text-muted-foreground">
          <Link href="/careers">
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Katalog
          </Link>
        </Button>
      </div>

      {/* Header Jalur Karier */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <career.icon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl">
                  {career.title}
                </h1>
                <Badge variant="secondary">{career.level}</Badge>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Demand: {career.demand}
                </Badge>
                {matchScore && (
                  <Badge variant="default" className="gap-1 bg-primary text-primary-foreground">
                    <Trophy className="h-3 w-3" /> Cocok {matchScore}%
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                {career.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isActive ? (
              <Button variant="secondary" disabled className="gap-1.5">
                <Check className="h-4 w-4 text-primary" /> Sedang Ditempuh
              </Button>
            ) : (
              <Button onClick={onActivate} className="gap-1.5">
                <Compass className="h-4 w-4" /> Jadikan Jalur Aktif
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href="/roadmap">
                Buka Roadmap <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Ringkasan Snapshot */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <div>
            <span className="text-xs text-muted-foreground">Perkiraan Gaji</span>
            <p className="mt-1 font-semibold text-foreground">{formatSalary(career.salary)}/bln</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Durasi Roadmap</span>
            <p className="mt-1 font-semibold text-foreground">{career.duration}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Fase & Modul</span>
            <p className="mt-1 font-semibold text-foreground">
              {career.roadmap.length} Fase ({career.roadmap.reduce((a, b) => a + b.modules.length, 0)} Modul)
            </p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Work Simulator</span>
            <p className="mt-1 font-semibold text-foreground">{sims.length} Studi Kasus</p>
          </div>
        </div>
      </div>

      {/* Grid Informasi Pendukung */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Keseharian di Tempat Kerja */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Sehari-hari di Pekerjaan Ini
            </h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {career.dayInLife.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill & Tools yang Dikuasai */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Keahlian & Perangkat Kerja
            </h2>
          </div>

          <div className="mt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Core Skills
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {career.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Software / Tools Populer
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {career.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industri & Contoh Perusahaan */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
            Pemberi Kerja Potensial di Indonesia
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Bidang usaha yang aktif merekrut talenta {career.title}:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {career.employers.map((emp) => (
            <div
              key={emp}
              className="rounded-xl border border-border bg-background p-3.5 text-center text-xs font-medium text-foreground"
            >
              {emp}
            </div>
          ))}
        </div>
      </div>

      {/* Intipan Fase Roadmap */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Struktur Roadmap Belajar
            </h2>
          </div>
          <Button asChild size="sm">
            <Link href="/roadmap">Buka Detail Roadmap</Link>
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {career.roadmap.map((phase, idx) => (
            <div key={phase.id} className="rounded-xl border border-border p-4 bg-background/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Fase {idx + 1}
                  </span>
                  <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                </div>
                <span className="text-xs text-muted-foreground">{phase.modules.length} modul</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
