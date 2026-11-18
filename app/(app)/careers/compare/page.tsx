"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  X,
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
  const [careerCId, setCareerCId] = useState<CareerId | null>(null);

  const selectedCareers = [
    getCareer(careerAId)!,
    getCareer(careerBId)!,
    ...(careerCId ? [getCareer(careerCId)!] : []),
  ].filter(Boolean);

  // Skill overlap analysis across all selected careers
  const sharedSkills = selectedCareers[0].skills.filter((s) =>
    selectedCareers.slice(1).every((c) => c.skills.includes(s))
  );
  const sharedTools = selectedCareers[0].tools.filter((t) =>
    selectedCareers.slice(1).every((c) => c.tools.includes(t))
  );

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
        description="Bandingkan 2 hingga 3 jalur karier (IT & Non-IT) di Indonesia secara berdampingan: kisaran gaji, kurikulum belajar, dan keahlian yang dibutuhkan."
      />

      {/* Selectors Bar */}
      <div className="grid gap-4 lg:grid-cols-3 rounded-2xl border border-border bg-card p-6">
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pilih Karier C (Opsional):
            </span>
            {careerCId && (
              <button
                type="button"
                onClick={() => setCareerCId(null)}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> Hapus Slot C
              </button>
            )}
          </div>
          {careerCId ? (
            <div className="flex flex-wrap gap-1.5">
              {careers.map((c) => (
                <Button
                  key={c.id}
                  variant={careerCId === c.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCareerCId(c.id)}
                  className="text-xs h-8"
                >
                  {c.title}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const third =
                  careers.find((c) => c.id !== careerAId && c.id !== careerBId)?.id ||
                  "data-analyst";
                setCareerCId(third);
              }}
              className="gap-1.5 text-xs h-8"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Karier ke-3 untuk Dibandingkan
            </Button>
          )}
        </div>
      </div>

      {/* Side-by-side Hero Comparison Cards */}
      <div
        className={cn(
          "grid gap-6",
          selectedCareers.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
        )}
      >
        {selectedCareers.map((careerItem, idx) => {
          const modules = getAllModules(careerItem);
          const totalHours = modules.reduce((sum, m) => sum + m.hours, 0);

          return (
            <div
              key={`${careerItem.id}-${idx}`}
              className={cn(
                "rounded-2xl border bg-card p-6 flex flex-col justify-between shadow-sm min-w-0",
                data.activeCareer === careerItem.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <careerItem.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <Badge variant="secondary">{careerItem.level}</Badge>
                    {data.activeCareer === careerItem.id && (
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                        Jalur Aktifmu
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  {careerItem.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {careerItem.tagline}
                </p>

                <div className="mt-6 space-y-4 border-t border-border pt-4 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Kisaran Gaji/Bln:</span>
                    <span className="font-bold text-foreground text-sm text-right">
                      {formatSalary(careerItem.salary)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Durasi Belajar:</span>
                    <span className="font-semibold text-foreground text-right">{careerItem.duration}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Kebutuhan Industri:</span>
                    <span className="font-semibold text-primary text-right">{careerItem.demand}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Total Kurikulum:</span>
                    <span className="font-semibold text-foreground text-right">
                      {careerItem.roadmap.length} Fase · {modules.length} Modul ({totalHours} jam)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
                  <Link href={`/careers/${careerItem.id}`}>Detail Karier</Link>
                </Button>
                {data.activeCareer !== careerItem.id && (
                  <Button
                    size="sm"
                    onClick={() => handleActivate(careerItem.id, careerItem.title)}
                    className="text-xs"
                  >
                    Pilih Jalur
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Overlap & Transferability Insight */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold">
            Skill Overlap &amp; Kemudahan Pindah Jalur
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Keahlian atau perangkat yang sama-sama digunakan pada jalur yang dibandingkan ({selectedCareers.map((c) => c.title).join(", ")}):
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {sharedSkills.length === 0 && sharedTools.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              Tidak ada skill langsung yang sama persis; bidang-bidang ini saling melengkapi dengan fokus kompetensi yang berbeda.
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
            Perbandingan Keseharian &amp; Skill Lengkap
          </h4>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 divide-y divide-border",
            selectedCareers.length === 3
              ? "lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
              : "md:grid-cols-2 md:divide-y-0 md:divide-x"
          )}
        >
          {selectedCareers.map((careerItem, idx) => (
            <div key={`detail-${careerItem.id}-${idx}`} className="p-6 space-y-6 text-xs min-w-0">
              <div>
                <h5 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
                  Keahlian {careerItem.title}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {careerItem.skills.map((s) => (
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
                  {careerItem.tools.map((t) => (
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
                  {careerItem.dayInLife.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
