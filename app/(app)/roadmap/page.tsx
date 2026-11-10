"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  ExternalLink,
  FileSearch,
  GraduationCap,
  Save,
  Sparkles,
  StickyNote,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { getPhaseProgress, getRoadmapProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const DAYS_OF_WEEK = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function RoadmapPage() {
  const { data, toggleModule, saveStudyPlan, saveModuleNote } = useApp();
  const career = getCareer(data.activeCareer);

  const progress = career ? getRoadmapProgress(career, data) : null;
  const phaseProgress = career ? getPhaseProgress(career, data) : [];

  // Study Planner State
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [weeklyHours, setWeeklyHours] = useState(data.studyPlan?.weeklyHours || data.profile.weeklyHours || 10);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    data.studyPlan?.preferredDays || ["Senin", "Rabu", "Jumat"]
  );

  // Module Note State
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>("");

  const toggleNoteEditor = (modId: string) => {
    if (openNoteId === modId) {
      setOpenNoteId(null);
    } else {
      setOpenNoteId(modId);
      setNoteDraft(data.moduleNotes?.[modId] || "");
    }
  };

  const handleSaveNote = (modId: string, modTitle: string) => {
    saveModuleNote(modId, noteDraft);
    toast.success(`Catatan untuk "${modTitle}" berhasil disimpan!`);
    setOpenNoteId(null);
  };

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

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Kalkulasi target kelulusan
  const remainingHours = Math.max(0, progress.hoursTotal - progress.hoursDone);
  const weeksNeeded = Math.ceil(remainingHours / Math.max(1, weeklyHours));
  const projectedDate = new Date();
  projectedDate.setDate(projectedDate.getDate() + weeksNeeded * 7);

  const formattedProjectedDate = projectedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSavePlan = () => {
    saveStudyPlan({
      weeklyHours,
      preferredDays: selectedDays,
      startDate: new Date().toISOString(),
    });
    toast.success(`Rencana belajar disimpan! Target siap kerja: ${formattedProjectedDate}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title={`Roadmap: ${career.title}`}
        description="Panduan kurikulum bertahap dari pemula hingga siap kerja. Centang modul yang sudah kamu kuasai."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/scanner">
                <FileSearch className="h-4 w-4 text-primary" /> Scan CV & Skip Modul
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/careers">Ganti Jalur</Link>
            </Button>
          </div>
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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Sisa Waktu Belajar</span>
              <p className="font-semibold text-foreground text-sm">
                {remainingHours} jam lagi ({progress.hoursDone}/{progress.hoursTotal} jam)
              </p>
            </div>
            <Button
              variant={plannerOpen ? "secondary" : "outline"}
              size="sm"
              onClick={() => setPlannerOpen((o) => !o)}
              className="gap-1.5 shrink-0"
            >
              <Calendar className="h-4 w-4 text-primary" />
              {plannerOpen ? "Tutup Planner" : "Study Planner"}
            </Button>
          </div>
        </div>
        <Progress value={progress.percent} className="mt-4 h-2.5" />
      </div>

      {/* Interactive Study Planner & Projected Timeline Drawer */}
      {plannerOpen && (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                  Study Planner & Target Timeline
                </h3>
                <p className="text-xs text-muted-foreground">
                  Sesuaikan komitmen belajarmu untuk menghitung estimasi tanggal kesiapan kerja secara akurat.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-3 text-center sm:text-right shrink-0">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider block">
                Target Siap Melamar
              </span>
              <span className="font-bold text-sm text-primary">
                {remainingHours === 0 ? "Sudah Siap Kerja!" : formattedProjectedDate}
              </span>
              <span className="text-[10px] text-muted-foreground block">
                ({weeksNeeded} minggu lagi pada {weeklyHours} jam/mgg)
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Slider Jam Belajar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Komitmen Belajar per Minggu:
                </span>
                <span className="font-bold text-primary text-sm">{weeklyHours} jam / minggu</span>
              </div>
              <Slider
                value={[weeklyHours]}
                min={3}
                max={30}
                step={1}
                onValueChange={(val) => setWeeklyHours(val[0])}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Santai (3-5 jam)</span>
                <span>Standar (10-15 jam)</span>
                <span>Intensif (20-30 jam)</span>
              </div>
            </div>

            {/* Hari Belajar Pilihan */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground block">
                Hari Belajar Favorit:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DAYS_OF_WEEK.map((day) => {
                  const active = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-xs font-medium border transition-colors",
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                {selectedDays.length} hari per minggu (~{(weeklyHours / Math.max(1, selectedDays.length)).toFixed(1)} jam per sesi).
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-primary/20 pt-4">
            <Button size="sm" onClick={handleSavePlan} className="gap-1.5 text-xs">
              <Save className="h-3.5 w-3.5" /> Simpan Rencana Belajar
            </Button>
          </div>
        </div>
      )}

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
                const savedNote = data.moduleNotes?.[mod.id] || "";
                const isNoteOpen = openNoteId === mod.id;

                return (
                  <div
                    key={mod.id}
                    className={cn(
                      "rounded-xl border p-4 transition-all space-y-3",
                      isDone
                        ? "border-success/30 bg-success/5 dark:bg-success/10"
                        : "border-border bg-background/50 hover:border-primary/40"
                    )}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                            {savedNote && (
                              <span className="inline-flex items-center gap-1 rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold text-warning-foreground dark:text-warning">
                                <StickyNote className="h-2.5 w-2.5" /> Ada Catatan
                              </span>
                            )}
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

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant={isNoteOpen || savedNote ? "secondary" : "ghost"}
                          onClick={() => toggleNoteEditor(mod.id)}
                          className="text-xs h-8 gap-1.5"
                        >
                          <StickyNote className="h-3.5 w-3.5 text-primary" />
                          Catatan
                        </Button>
                        <Button
                          size="sm"
                          variant={isDone ? "ghost" : "outline"}
                          onClick={() => handleToggle(mod.id, mod.title)}
                          className="text-xs h-8"
                        >
                          {isDone ? "Batal Selesai" : "Tandai Selesai"}
                        </Button>
                      </div>
                    </div>

                    {/* Preview Catatan Tersimpan (saat tidak sedang diedit) */}
                    {savedNote && !isNoteOpen && (
                      <div className="ml-8 rounded-lg border border-border bg-card/80 p-3 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground text-[11px] flex items-center gap-1">
                            <StickyNote className="h-3 w-3 text-primary" /> Catatan Pribadimu:
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleNoteEditor(mod.id)}
                            className="text-[11px] text-primary hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="whitespace-pre-line leading-relaxed">{savedNote}</p>
                      </div>
                    )}

                    {/* Inline Note Editor */}
                    {isNoteOpen && (
                      <div className="ml-0 sm:ml-8 rounded-xl border border-primary/30 bg-card p-3.5 space-y-2.5 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            <StickyNote className="h-3.5 w-3.5 text-primary" />
                            Catatan Belajar: {mod.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            Tersimpan di browser
                          </span>
                        </div>
                        <Textarea
                          rows={3}
                          placeholder="Tulis rangkuman materi, poin penting, atau tempelkan link referensi tambahanmu di sini..."
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          className="text-xs"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setOpenNoteId(null)}
                            className="h-7 text-xs"
                          >
                            Tutup
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveNote(mod.id, mod.title)}
                            className="h-7 text-xs gap-1"
                          >
                            <Save className="h-3 w-3" /> Simpan Catatan
                          </Button>
                        </div>
                      </div>
                    )}
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
