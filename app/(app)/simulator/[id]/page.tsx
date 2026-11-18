"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckSquare,
  Clock,
  ExternalLink,
  Info,
  Lightbulb,
  Loader2,
  MessageSquare,
  RotateCcw,
  Send,
  Square,
  Star,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DifficultyBadge, ScoreRing } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { getSimulation } from "@/lib/data/simulations";
import { countWords, isValidUrl, scoreLabel } from "@/lib/feedback";
import type { Submission } from "@/lib/types";
import { cn } from "@/lib/utils";

const leadQA = [
  {
    q: "Bagaimana jika saya belum sempat mendeploy ke link aktif?",
    a: "Kamu tetap bisa melampirkan link repository GitHub atau Google Drive/Loom yang berisi kode dan tangkapan layar, pastikan README menjelaskan cara menjalankannya.",
  },
  {
    q: "Berapa panjang penjelasan teknis yang ideal?",
    a: "Fokus pada keputusan teknis dan trade-off yang kamu ambil. Tulisan sekitar 100–200 kata yang padat jauh lebih bernilai dibanding salinan teori.",
  },
  {
    q: "Apakah boleh menggunakan AI atau pustaka pihak ketiga?",
    a: "Boleh! Di dunia kerja nyata efisiensi diutamakan. Namun kamu harus paham betul kode yang kamu tulis dan mampu mempertanggungjawabkannya di lembar penjelasan.",
  },
];

export default function SimulationDetailPage() {
  const params = useParams();
  const { ready, data, saveDraft, flushDraft, submitSimulation, toggleFeatured } = useApp();
  const simId = params.id as string;
  const sim = getSimulation(simId);

  const existingSubmission = data.submissions[simId];
  const draft = data.drafts[simId];

  // Form State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<Submission | null>(
    existingSubmission || null
  );
  const hydratedSimRef = useRef<string | null>(null);

  // Pre-submission Self Check
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"workspace" | "lead">("workspace");

  // PF-005: Prioritaskan draft revisi terbaru di editor, sambil tetap menampilkan submission terakhir di riwayat hasil.
  useEffect(() => {
    if (existingSubmission) {
      setSubmissionResult(existingSubmission);
    }
  }, [existingSubmission]);

  useEffect(() => {
    if (!ready) return;
    const hasDraft = Boolean(draft && Object.keys(draft).length > 0);
    const hasSubmission = Boolean(existingSubmission);

    if (hydratedSimRef.current !== simId) {
      if (hasDraft) {
        setAnswers({ ...(existingSubmission?.answers || {}), ...draft });
        hydratedSimRef.current = simId;
      } else if (hasSubmission && existingSubmission) {
        setAnswers(existingSubmission.answers);
        hydratedSimRef.current = simId;
      }
      return;
    }

    // Jika sebelumnya kosong lalu data server selesai disinkronkan
    setAnswers((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      if (hasDraft) return { ...(existingSubmission?.answers || {}), ...draft };
      if (existingSubmission) return existingSubmission.answers;
      return prev;
    });
  }, [ready, simId, draft, existingSubmission]);

  useEffect(() => {
    return () => {
      flushDraft(simId);
    };
  }, [flushDraft, simId]);

  if (!sim) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold">Simulasi tidak ditemukan</h2>
        <Button asChild className="mt-4" size="sm">
          <Link href="/simulator">Kembali ke Work Simulator</Link>
        </Button>
      </div>
    );
  }

  const handleFieldChange = (id: string, value: string) => {
    const next = { ...answers, [id]: value };
    hydratedSimRef.current = sim.id;
    setAnswers(next);
    saveDraft(sim.id, next);
  };

  const toggleCheck = (idx: number) => {
    setChecklist((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi kelengkapan
    const emptyFields = sim.deliverables.filter((d) => !answers[d.id]?.trim());
    if (emptyFields.length > 0) {
      toast.error(`Harap isi deliverable: "${emptyFields[0].label}"`);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const res = submitSimulation(sim.id, answers);
      setSubmitting(false);
      if (res) {
        setSubmissionResult(res);
        toast.success(`Tugas berhasil dinilai! Skor kamu: ${res.score}/100 (Percobaan ke-${res.attempts}) 🎉`);
      }
    }, 500);
  };

  const isFeatured = data.featured.includes(sim.id);
  const hasUnsavedRevision = Boolean(
    submissionResult &&
      draft &&
      Object.keys(draft).some(
        (k) => (draft[k] ?? "") !== (submissionResult.answers[k] ?? "")
      )
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5 text-xs text-muted-foreground">
          <Link href="/simulator">
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Simulasi
          </Link>
        </Button>
      </div>

      {/* Header Brief */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {sim.company.initials}
              </span>
              <span className="font-semibold text-sm">{sim.company.name}</span>
              <span className="text-xs text-muted-foreground">· {sim.company.industry}</span>
              <DifficultyBadge difficulty={sim.difficulty} />
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl">
              {sim.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {sim.summary}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {sim.estimatedTime}
              </span>
              <span className="flex items-center gap-1 font-semibold text-primary">
                <Zap className="h-3.5 w-3.5" /> +{sim.xp} XP
              </span>
            </div>
            {submissionResult && (
              <Button
                variant={isFeatured ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFeatured(sim.id)}
                className="gap-1.5 text-xs"
              >
                <Star className={cn("h-3.5 w-3.5", isFeatured ? "fill-warning text-warning" : "")} />
                {isFeatured ? "Dipajang di Portofolio" : "Pajang di Portofolio"}
              </Button>
            )}
          </div>
        </div>

        {/* Latar Belakang & Sasaran */}
        <div className="mt-6 border-t border-border pt-6 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              Konteks Proyek &amp; Situasi Nyata
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {sim.context}
            </p>
          </div>

          {/* Ekspektasi Output & Interactive Self-Checklist */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Checklist Mandiri Kriteria Output (Acceptance Criteria)
              </h3>
              <span className="text-[11px] text-muted-foreground">
                Centang sebelum submit untuk memastikan kualitas
              </span>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {sim.objectives.map((obj, i) => {
                const checked = !!checklist[i];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleCheck(i)}
                    className={cn(
                      "flex items-start gap-2.5 rounded-xl border p-3 text-left transition-colors text-xs",
                      checked
                        ? "border-success/40 bg-success/5 text-foreground"
                        : "border-border bg-background/60 text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    {checked ? (
                      <CheckSquare className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    ) : (
                      <Square className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <span className={checked ? "line-through text-muted-foreground" : ""}>{obj}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu: Workspace vs Tanya Lead (PF-018: flex-wrap agar tidak overflow di 360px/390px) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
        <Button
          variant={activeTab === "workspace" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("workspace")}
          className="gap-1.5 text-xs"
        >
          <Target className="h-3.5 w-3.5" /> Lembar Pengumpulan
        </Button>
        <Button
          variant={activeTab === "lead" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("lead")}
          className="gap-1.5 text-xs text-primary"
        >
          <MessageSquare className="h-3.5 w-3.5" /> Tanya Lead / Mentor ({leadQA.length} Panduan)
        </Button>
      </div>

      {activeTab === "lead" && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">
              Konsultasi Brief Bersama Tech Lead {sim.company.name}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sebelum mengerjakan atau saat bingung, berikut klarifikasi teknis yang sering ditanyakan talenta junior:
          </p>

          <div className="grid gap-3 pt-2">
            {leadQA.map((qa, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-1.5 text-xs">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-primary font-bold">Q:</span> {qa.q}
                </p>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  <span className="text-success font-semibold">Lead:</span> {qa.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Utama: Form Workspace & Panel Hasil / Rubrik */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Form Pengumpulan (7 Kolom) */}
        <div className="space-y-6 lg:col-span-7 min-w-0">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
                  Lembar Kerja &amp; Pengumpulan
                </h2>
                <p className="text-xs text-muted-foreground">
                  Isi deliverable sesuai instruksi. Draf revisi otomatis tersimpan secara berkala.
                </p>
              </div>
              {hasUnsavedRevision && (
                <Badge variant="secondary" className="text-[11px]">
                  Draf Revisi Aktif
                </Badge>
              )}
            </div>

            <div className="mt-6 space-y-6">
              {sim.deliverables.map((deliv) => {
                const val = answers[deliv.id] || "";
                const words = deliv.type === "text" ? countWords(val) : 0;
                const minWords = deliv.minWords || 50;
                const validLink = deliv.type === "link" && isValidUrl(val);

                return (
                  <div key={deliv.id} className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <Label htmlFor={deliv.id} className="text-sm font-semibold">
                        {deliv.label}
                      </Label>
                      {deliv.type === "text" && (
                        <span
                          className={cn(
                            "text-xs",
                            words >= minWords ? "text-success font-medium" : "text-muted-foreground"
                          )}
                        >
                          {words} / min. {minWords} kata
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{deliv.description}</p>

                    {deliv.type === "link" ? (
                      <div className="space-y-2">
                        <Input
                          id={deliv.id}
                          type="url"
                          placeholder={deliv.placeholder || "https://..."}
                          value={val}
                          onChange={(e) => handleFieldChange(deliv.id, e.target.value)}
                          className="font-mono text-xs"
                        />
                        {val && (
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] rounded-lg bg-muted/50 px-3 py-1.5">
                            <span className={validLink ? "text-success font-medium" : "text-destructive"}>
                              {validLink ? "✓ Format URL Valid" : "⚠ Format URL belum valid (gunakan https://)"}
                            </span>
                            {validLink && (
                              <a
                                href={val}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-primary underline"
                              >
                                Buka Link <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Textarea
                        id={deliv.id}
                        rows={8}
                        placeholder={deliv.placeholder || "Uraikan hasil kerjamu di sini..."}
                        value={val}
                        onChange={(e) => handleFieldChange(deliv.id, e.target.value)}
                        className="leading-relaxed text-sm"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                {submissionResult
                  ? `Riwayat terakhir: Percobaan ke-${submissionResult.attempts}`
                  : "Belum dikirim"}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Menilai...
                    </>
                  ) : submissionResult ? (
                    <>
                      <RotateCcw className="h-4 w-4" /> Nilai Ulang
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Kumpulkan &amp; Dapatkan Review
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Tips Pengerjaan */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-warning-foreground dark:text-warning">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-semibold text-sm text-foreground">Tips Agar Nilaimu Maksimal</h3>
            </div>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {sim.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary font-bold">·</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Hasil Penilaian / Rubrik (5 Kolom) */}
        <div className="space-y-6 lg:col-span-5 min-w-0">
          {/* PF-015: Penjelasan transparansi evaluasi heuristik */}
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Info className="h-4 w-4 text-primary shrink-0" />
              Metode Evaluasi Heuristik Otomatis
            </div>
            <p className="leading-relaxed">
              Skor dan umpan balik dihitung secara heuristik berdasarkan kelengkapan deliverable, kedalaman uraian kata, pencocokan kata kunci teknis, serta format tautan (tanpa mengeksekusi kode di repositori eksternal).
            </p>
          </div>

          {submissionResult ? (
            <div className="rounded-2xl border border-border bg-card p-6 animate-in fade-in duration-300">
              <div className="text-center">
                <Badge variant="outline" className="mb-3">
                  Hasil Review Heuristik · Percobaan #{submissionResult.attempts}
                </Badge>
                <div className="flex justify-center">
                  <ScoreRing value={submissionResult.score} size={120} stroke={10} label="Skor Akhir" />
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold">
                  {scoreLabel(submissionResult.score).label}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {submissionResult.feedback.summary}
                </p>
              </div>

              {/* Rincian Skor per Kriteria */}
              <div className="mt-6 space-y-3 border-t border-border pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Breakdown Kriteria Rubrik
                </h4>
                {submissionResult.breakdown.map((crit) => (
                  <div key={crit.id} className="rounded-lg bg-muted/50 p-2.5 text-xs">
                    <div className="flex items-center justify-between font-medium">
                      <span>{crit.label}</span>
                      <span className={crit.met ? "text-success font-semibold" : "text-muted-foreground"}>
                        {crit.score} / {crit.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rekomendasi Perbaikan */}
              {submissionResult.feedback.improvements.length > 0 && (
                <div className="mt-6 border-t border-border pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-warning-foreground dark:text-warning flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" /> Saran Pengembangan
                  </h4>
                  <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                    {submissionResult.feedback.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold">·</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                Rubrik Penilaian Heuristik
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Karyamu akan dinilai otomatis menggunakan indikator rubrik berikut:
              </p>

              <div className="mt-4 space-y-3">
                {sim.rubric.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-background p-3 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span>{r.label}</span>
                      <span className="text-primary font-bold">{r.weight}%</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{r.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
