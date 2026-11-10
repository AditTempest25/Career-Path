"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  MessageSquareQuote,
  Pause,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { getInterviewQuestions, interviewQuestions, type InterviewQuestion } from "@/lib/data/interviews";
import { careers, getCareer } from "@/lib/data/careers";
import { cn } from "@/lib/utils";

export default function InterviewPage() {
  const { data, saveInterviewPractice } = useApp();
  const career = getCareer(data.activeCareer);

  // Filters
  const [selectedCareer, setSelectedCareer] = useState<string>(data.activeCareer || "all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentQId, setCurrentQId] = useState<string>(interviewQuestions[0].id);

  // Practice session state
  const currentQ = interviewQuestions.find((q) => q.id === currentQId) || interviewQuestions[0];
  const savedPractice = data.interviewPractice?.[currentQ.id];

  const [userAnswer, setUserAnswer] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(savedPractice?.rating || 0);
  const [revealKey, setRevealKey] = useState<boolean>(false);

  // Countdown timer state
  const totalSeconds = currentQ.expectedTimeMinutes * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    setUserAnswer(savedPractice?.answer || "");
    setUserRating(savedPractice?.rating || 0);
    setRevealKey(false);
    setTimeLeft(currentQ.expectedTimeMinutes * 60);
    setTimerRunning(false);
  }, [currentQId, savedPractice, currentQ.expectedTimeMinutes]);

  // Timer interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      toast.info("Waktu simulasi habis! Evaluasi jawabanmu sekarang.");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => setTimerRunning((r) => !r);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(currentQ.expectedTimeMinutes * 60);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSave = () => {
    if (!userAnswer.trim()) {
      toast.error("Tuliskan poin jawabanmu terlebih dahulu.");
      return;
    }
    saveInterviewPractice(currentQ.id, userAnswer, userRating || 4);
    toast.success("Latihan jawaban tersimpan! +15 XP ditambahkan 🎉");
  };

  const filteredQuestions = getInterviewQuestions(selectedCareer, selectedCategory);
  const completedCount = Object.keys(data.interviewPractice ?? {}).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Mock Interview Simulator"
        description="Latihan menjawab pertanyaan wawancara HR & teknis terpopuler dengan kerangka STAR dan timer standar rekruter."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
              <Trophy className="h-3.5 w-3.5" /> {completedCount} / {interviewQuestions.length} Pertanyaan Dilatih
            </Badge>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Button
            variant={selectedCareer === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCareer("all")}
            className="h-7 text-xs"
          >
            Semua Bidang
          </Button>
          {careers.map((c) => (
            <Button
              key={c.id}
              variant={selectedCareer === c.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCareer(c.id)}
              className="h-7 text-xs"
            >
              {c.title}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "hr-behavioral", label: "HR & Behavioral" },
            { id: "technical", label: "Teknis" },
            { id: "situational", label: "Situasional" },
          ].map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "outline" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="h-7 text-xs"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Layout: List Pertanyaan di Kiri & Workspace di Kanan */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Navigasi Pertanyaan (4 Kolom) */}
        <div className="space-y-3 lg:col-span-4">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            <span>Daftar Pertanyaan</span>
            <span>{filteredQuestions.length} Soal</span>
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {filteredQuestions.map((q, idx) => {
              const isSelected = q.id === currentQ.id;
              const isDone = !!data.interviewPractice?.[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQId(q.id)}
                  className={cn(
                    "w-full text-left rounded-xl border p-3.5 transition-all flex items-start gap-3 text-xs",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                      : "border-border bg-card hover:border-primary/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-bold text-[11px]",
                      isDone
                        ? "bg-success/15 text-success"
                        : isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isDone ? "✓" : idx + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">
                        {q.categoryLabel}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{q.expectedTimeMinutes} mnt</span>
                    </div>
                    <p className="font-semibold text-foreground line-clamp-2 leading-snug">
                      {q.question}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Simulator Workspace (8 Kolom) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Card Soal & Timer */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {currentQ.categoryLabel}
                </Badge>
                <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-foreground leading-snug">
                  {currentQ.question}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  💡 {currentQ.context}
                </p>
              </div>

              {/* Countdown Timer Widget */}
              <div className="flex flex-col items-center sm:items-end shrink-0">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xl font-bold",
                    timeLeft <= 30
                      ? "border-destructive/40 bg-destructive/10 text-destructive animate-pulse"
                      : "border-border bg-muted/40 text-foreground"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  <span>{formatTimer(timeLeft)}</span>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTimer}
                    className="h-7 text-xs gap-1"
                  >
                    {timerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    {timerRunning ? "Jeda" : "Mulai"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetTimer}
                    className="h-7 text-xs p-1.5"
                    title="Reset Timer"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* STAR Framework Guide Helper */}
            <div className="mt-6 rounded-xl border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Target className="h-4 w-4" />
                Panduan Kerangka STAR (Situation, Task, Action, Result)
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                <div className="rounded-lg bg-card p-2.5 border border-border/60">
                  <span className="font-semibold text-foreground block mb-0.5">S (Situation):</span>
                  {currentQ.starGuide.situation}
                </div>
                <div className="rounded-lg bg-card p-2.5 border border-border/60">
                  <span className="font-semibold text-foreground block mb-0.5">T (Task):</span>
                  {currentQ.starGuide.task}
                </div>
                <div className="rounded-lg bg-card p-2.5 border border-border/60">
                  <span className="font-semibold text-foreground block mb-0.5">A (Action):</span>
                  {currentQ.starGuide.action}
                </div>
                <div className="rounded-lg bg-card p-2.5 border border-border/60">
                  <span className="font-semibold text-foreground block mb-0.5">R (Result):</span>
                  {currentQ.starGuide.result}
                </div>
              </div>
            </div>

            {/* Answer Notepad */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  Catatan / Poin Jawabanmu:
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Gunakan untuk merangkum poin pembicaraan sebelum latihan verbal
                </span>
              </div>
              <Textarea
                rows={5}
                placeholder="Tuliskan poin-poin yang akan kamu sampaikan (misal: 'Proyek yang saya pilih adalah..., kendala utamanya..., aksi saya..., hasilnya...')"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-xs leading-relaxed"
              />
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground mr-1">Evaluasi Diri:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-0.5 text-warning transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        userRating >= star ? "fill-warning text-warning" : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevealKey((r) => !r)}
                  className="gap-1.5 text-xs"
                >
                  <Lightbulb className="h-3.5 w-3.5 text-warning" />
                  {revealKey ? "Tutup Kunci Jawaban" : "Buka Jawaban Ideal & Tips"}
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-1.5 text-xs">
                  <Save className="h-3.5 w-3.5" /> Simpan Jawaban (+15 XP)
                </Button>
              </div>
            </div>
          </div>

          {/* Revealed Ideal Answer & Recruiter Tip Box */}
          {revealKey && (
            <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-warning font-bold text-sm">
                <Sparkles className="h-4 w-4" />
                Poin Kunci Jawaban Standar Emas
              </div>
              <ul className="space-y-1.5 text-xs text-foreground list-disc pl-4">
                {currentQ.idealAnswerKey.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-border bg-card p-4 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-primary font-semibold">
                  <UserCheck className="h-4 w-4" /> Tips Khusus Recruiter:
                </div>
                <p className="text-muted-foreground leading-relaxed pl-5">
                  &ldquo;{currentQ.recruiterTip}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
