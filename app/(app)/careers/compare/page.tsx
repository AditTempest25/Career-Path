"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { careers, formatSalary, getAllModules, getCareer } from "@/lib/data/careers";
import type { CareerId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function CareerComparePage() {
  const { data, setActiveCareer } = useApp();

  const [careerAId, setCareerAId] = useState<CareerId>(data.activeCareer || "web-developer");
  const [careerBId, setCareerBId] = useState<CareerId>(
    (data.activeCareer === "ui-ux-designer" ? "web-developer" : "ui-ux-designer") as CareerId
  );

  const careerA = getCareer(careerAId)!;
  const careerB = getCareer(careerBId)!;

  const modulesA = getAllModules(careerA);
  const modulesB = getAllModules(careerB);

  const totalHoursA = modulesA.reduce((sum, m) => sum + m.hours, 0);
  const totalHoursB = modulesB.reduce((sum, m) => sum + m.hours, 0);

  // Skill overlap analysis
  const sharedSkills = careerA.skills.filter((s) => careerB.skills.includes(s));
  const sharedTools = careerA.tools.filter((t) => careerB.tools.includes(t));

  const handleActivate = (id: CareerId, title: string) => {
    setActiveCareer(id);
    toast.success(`Jalur aktif diubah ke ${title}!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tombol Kembali */}
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5 text-xs text-muted-foreground">
          <Link href="/careers">
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Katalog Karier
          </Link>
        </Button>
      </div>

      <PageHeader
        title="Bandingkan Jalur Karier"
        description="Bandingkan dua jalur karier teknologi di Indonesia secara berdampingan: gaji, kurikulum belajar, dan keahlian yang dibutuhkan."
      />

      {/* Selectors Bar */}
      <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-border bg-card p-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
            Pilih Karier A:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {careers.map((c) => (
              <Button
                key={c.id}
                variant={careerAId === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCareerAId(c.id)}
                className="text-xs h-8"
              >
                {c.title}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
            Pilih Karier B:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {careers.map((c) => (
              <Button
                key={c.id}
                variant={careerBId === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCareerBId(c.id)}
                className="text-xs h-8"
              >
                {c.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side Hero Comparison Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card A */}
        <div
          className={cn(
            "rounded-2xl border bg-card p-6 flex flex-col justify-between shadow-sm",
            data.activeCareer === careerA.id ? "border-primary ring-2 ring-primary/20" : "border-border"
          )}
        >
          <div>
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <careerA.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{careerA.level}</Badge>
                {data.activeCareer === careerA.id && (
                  <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                    Jalur Aktifmu
                  </Badge>
                )}
              </div>
            </div>

            <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              {careerA.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {careerA.tagline}
            </p>

            <div className="mt-6 space-y-4 border-t border-border pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kisaran Gaji/Bln:</span>
                <span className="font-bold text-foreground text-sm">{formatSalary(careerA.salary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durasi Belajar:</span>
                <span className="font-semibold text-foreground">{careerA.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kebutuhan Industri (Demand):</span>
                <span className="font-semibold text-primary">{careerA.demand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Kurikulum:</span>
                <span className="font-semibold text-foreground">
                  {modulesA.length} Modul ({totalHoursA} jam)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
              <Link href={`/careers/${careerA.id}`}>Detail Karier</Link>
            </Button>
            {data.activeCareer !== careerA.id && (
              <Button size="sm" onClick={() => handleActivate(careerA.id, careerA.title)} className="text-xs">
                Pilih Jalur
              </Button>
            )}
          </div>
        </div>

        {/* Card B */}
        <div
          className={cn(
            "rounded-2xl border bg-card p-6 flex flex-col justify-between shadow-sm",
            data.activeCareer === careerB.id ? "border-primary ring-2 ring-primary/20" : "border-border"
          )}
        >
          <div>
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <careerB.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{careerB.level}</Badge>
                {data.activeCareer === careerB.id && (
                  <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                    Jalur Aktifmu
                  </Badge>
                )}
              </div>
            </div>

            <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              {careerB.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {careerB.tagline}
            </p>

            <div className="mt-6 space-y-4 border-t border-border pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kisaran Gaji/Bln:</span>
                <span className="font-bold text-foreground text-sm">{formatSalary(careerB.salary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durasi Belajar:</span>
                <span className="font-semibold text-foreground">{careerB.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kebutuhan Industri (Demand):</span>
                <span className="font-semibold text-primary">{careerB.demand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Kurikulum:</span>
                <span className="font-semibold text-foreground">
                  {modulesB.length} Modul ({totalHoursB} jam)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
              <Link href={`/careers/${careerB.id}`}>Detail Karier</Link>
            </Button>
            {data.activeCareer !== careerB.id && (
              <Button size="sm" onClick={() => handleActivate(careerB.id, careerB.title)} className="text-xs">
                Pilih Jalur
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Skill Overlap & Transferability Insight */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold">
            Skill Overlap & Kemudahan Pindah Jalur
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Keahlian atau perangkat yang sama-sama digunakan oleh {careerA.title} dan {careerB.title}:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {sharedSkills.length === 0 && sharedTools.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              Tidak ada skill langsung yang sama, kedua bidang ini saling melengkapi dengan fokus berbeda.
            </span>
          ) : (
            <>
              {sharedSkills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20"
                >
                  Skill: {s}
                </span>
              ))}
              {sharedTools.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-foreground border border-border"
                >
                  Tool: {t}
                </span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Detailed Side-by-Side Breakdown Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h4 className="font-bold text-sm text-foreground">
            Perbandingan Keseharian & Skill Lengkap
          </h4>
        </div>

        <div className="grid grid-cols-2 divide-x divide-border">
          {/* Kolom A */}
          <div className="p-6 space-y-6 text-xs">
            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Keahlian {careerA.title}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {careerA.skills.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Tools yang Dipakai
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {careerA.tools.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Aktivitas Keseharian
              </h5>
              <ul className="space-y-1.5 text-muted-foreground list-disc pl-4">
                {careerA.dayInLife.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom B */}
          <div className="p-6 space-y-6 text-xs">
            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Keahlian {careerB.title}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {careerB.skills.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Tools yang Dipakai
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {careerB.tools.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                Aktivitas Keseharian
              </h5>
              <ul className="space-y-1.5 text-muted-foreground list-disc pl-4">
                {careerB.dayInLife.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
