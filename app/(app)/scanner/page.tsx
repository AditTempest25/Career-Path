"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Copy,
  FileSearch,
  FileText,
  Lightbulb,
  Loader2,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, ScoreRing } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { analyzeResumeText, type ScanResult } from "@/lib/data/scanner";
import { careers, getCareer } from "@/lib/data/careers";
import type { CareerId } from "@/lib/types";
import { cn } from "@/lib/utils";

const SAMPLE_RESUME = `Pendidikan:
S1 Sistem Informasi, Universitas Indonesia (2020 - 2024)

Keahlian Teknis:
- Bahasa Pemrograman: JavaScript (ES6+), HTML5, CSS3, Dasar SQL
- Framework & Library: React.js, Tailwind CSS, Bootstrap, Git & GitHub
- Tools: VS Code, Chrome DevTools, Postman, Figma (dasar)

Pengalaman Proyek:
1. Website Portfolio & E-commerce Sederhana (React, Tailwind CSS)
- Membangun landing page responsif menggunakan semantic HTML dan CSS Grid.
- Mengintegrasikan state management sederhana dan fetch data REST API.
2. Aplikasi Pencatat Tugas (Vanilla JavaScript)
- Mengimplementasikan manipulasi DOM, localStorage, dan event handling.`;

export default function ResumeScannerPage() {
  const { data, syncScannedModules } = useApp();
  const [targetCareer, setTargetCareer] = useState<CareerId>(data.activeCareer || "web-developer");
  const [resumeText, setResumeText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const career = getCareer(targetCareer);

  const handleScan = () => {
    if (!resumeText.trim()) {
      toast.error("Harap tempelkan (paste) teks CV atau ringkasan profilmu terlebih dahulu.");
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      const result = analyzeResumeText(resumeText, targetCareer);
      setScanResult(result);
      setIsScanning(false);
      toast.success(`Pemindaian selesai! Ditemukan ${result.detectedSkills.length} keahlian.`);
    }, 600);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    toast.info("Contoh resume berhasil dimuat.");
  };

  const handleSyncModules = () => {
    if (!scanResult || scanResult.matchingModuleIds.length === 0) {
      toast.info("Tidak ada modul baru yang dapat disinkronkan.");
      return;
    }
    const newlyAdded = syncScannedModules(scanResult.matchingModuleIds);
    if (newlyAdded > 0) {
      toast.success(`${newlyAdded} modul roadmap berhasil ditandai selesai! +${newlyAdded * 20} XP 🎉`);
    } else {
      toast.info("Semua modul keahlian yang terdeteksi sudah tercatat selesai sebelumnya.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Resume & CV Skill Gap Scanner"
        description="Analisis resume atau profil LinkedIn-mu secara instan untuk mendeteksi kesiapan dan skill gap terhadap karier impian."
      />

      {/* Target Career Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Target Jalur Karier:
          </span>
          <span className="font-bold text-sm text-foreground">
            {career?.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {careers.map((c) => (
            <Button
              key={c.id}
              variant={targetCareer === c.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                setTargetCareer(c.id);
                if (scanResult) {
                  setScanResult(analyzeResumeText(resumeText, c.id));
                }
              }}
              className="h-7 text-xs"
            >
              {c.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Form di Kiri & Hasil di Kanan */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Input CV (6 Kolom) */}
        <div className="space-y-4 lg:col-span-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Teks Resume / CV</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadSample}
                className="text-xs h-7 text-primary hover:text-primary"
              >
                <Sparkles className="h-3 w-3 mr-1" /> Muat Contoh CV
              </Button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Salin seluruh isi CV, ringkasan profil LinkedIn, atau daftar proyek yang pernah kamu kerjakan ke kolom di bawah ini:
            </p>

            <Textarea
              rows={14}
              placeholder="Tempelkan (paste) teks CV di sini... Contoh: 'Keahlian: HTML, CSS, JavaScript, React, Git. Pengalaman: Membuat website toko online...'"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="text-xs leading-relaxed font-mono"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-muted-foreground">
                {resumeText.trim().split(/\s+/).filter(Boolean).length} kata terinput
              </span>
              <Button onClick={handleScan} disabled={isScanning} className="gap-2">
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Memindai...
                  </>
                ) : (
                  <>
                    <FileSearch className="h-4 w-4" /> Pindai & Analisis Gap
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Lightbulb className="h-3.5 w-3.5 text-warning" /> Tips Pemindaian Maksimal
            </div>
            <p>
              Sertakan nama tools (*Figma, Postman, Git, VS Code*), pustaka pemrograman (*React, Tailwind, Express*), dan metodologi (*Agile, Scrum, BVA*) untuk akurasi tertinggi.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Analisis & Action Plan (6 Kolom) */}
        <div className="space-y-6 lg:col-span-6">
          {scanResult ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score & Overview Card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Hasil Analisis Kesiapan
                    </Badge>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                      {scanResult.targetCareerTitle}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {scanResult.matchedSkills.length} dari {career?.skills.length || 5} core skills terdeteksi di CV kamu.
                    </p>
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <ScoreRing value={scanResult.matchScore} size={110} stroke={10} label="Kecocokan" />
                  </div>
                </div>

                {/* Quick Sync Button */}
                {scanResult.matchingModuleIds.length > 0 && (
                  <div className="mt-5 border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-primary/5 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Sudah punya skill dasar?
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Tandai {scanResult.matchingModuleIds.length} modul kurikulum terkait sebagai sudah dikuasai.
                      </p>
                    </div>
                    <Button size="sm" onClick={handleSyncModules} className="shrink-0 text-xs gap-1.5">
                      <Zap className="h-3.5 w-3.5" /> Sinkronkan Modul
                    </Button>
                  </div>
                )}
              </div>

              {/* Skill Breakdown Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Skill Sudah Dimiliki */}
                <div className="rounded-2xl border border-success/30 bg-success/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-success font-semibold text-xs">
                    <CheckCircle2 className="h-4 w-4" />
                    Skill Terdeteksi ({scanResult.matchedSkills.length})
                  </div>
                  {scanResult.matchedSkills.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground">
                      Belum ada core skill yang cocok terdeteksi di teks.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-success/15 px-2.5 py-1 text-xs font-semibold text-success border border-success/30"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skill Gap (Perlu Dipelajari) */}
                <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-warning-foreground dark:text-warning font-semibold text-xs">
                    <AlertCircle className="h-4 w-4" />
                    Skill Gap ({scanResult.gapSkills.length})
                  </div>
                  {scanResult.gapSkills.length === 0 ? (
                    <p className="text-[11px] text-success font-semibold">
                      Luar biasa! Seluruh core skill jalur ini sudah ada di CV kamu.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.gapSkills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning-foreground dark:text-warning border border-warning/30"
                        >
                          + {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Learning Path */}
              {scanResult.recommendedModules.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">
                        Modul Rekomendasi untuk Menutup Gap
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Prioritaskan modul berikut untuk melengkapi portofolio CV-mu:
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="text-xs h-7">
                      <Link href="/roadmap">Ke Roadmap</Link>
                    </Button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {scanResult.recommendedModules.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between rounded-xl border border-border bg-background p-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="h-4 w-4 text-primary shrink-0" />
                          <div>
                            <span className="font-semibold text-foreground">{m.title}</span>
                            <span className="text-muted-foreground block text-[10px]">
                              Skill target: {m.skill} · {m.hours} jam belajar
                            </span>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="ghost" className="h-7 text-xs">
                          <Link href="/roadmap">Pelajari</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
              <FileSearch className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="font-bold text-base text-foreground">
                Belum Ada Hasil Pemindaian
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Tempelkan teks resume pada kolom di sebelah kiri atau klik &ldquo;Muat Contoh CV&rdquo; lalu tekan tombol &ldquo;Pindai & Analisis Gap&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
