"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Lightbulb,
  Loader2,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/store";
import { getDailyQuizForUser } from "@/lib/data/daily-quiz";
import { cn } from "@/lib/utils";

export function DailyChallengeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data, completeDailyChallenge } = useApp();
  const questions = getDailyQuizForUser(data.activeCareer);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answersList, setAnswersList] = useState<
    { questionId: string; selectedIndex: number }[]
  >([]);
  const [submitting, setSubmitting] = useState(false);
  const [xpAwarded, setXpAwarded] = useState<number>(0);
  const [wasAlreadyCompleted, setWasAlreadyCompleted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = async () => {
    if (selectedOption === null) return;
    const nextAnswers = [
      ...answersList,
      { questionId: currentQ.id, selectedIndex: selectedOption },
    ];
    setAnswersList(nextAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setSubmitting(true);
      const res = await completeDailyChallenge(nextAnswers);
      setSubmitting(false);

      if (!res.ok) {
        toast.error(res.error || "Gagal menyimpan hasil kuis harian ke server.");
        return;
      }

      const finalCorrect = res.correctCount ?? correctCount;
      setXpAwarded(res.xpAwarded);
      setWasAlreadyCompleted(Boolean(res.alreadyDoneToday));
      setCorrectCount(finalCorrect);
      setIsFinished(true);

      if (res.alreadyDoneToday) {
        toast.info(
          `Latihan ulang selesai (${finalCorrect}/${questions.length} benar). Reward harian sudah diklaim hari ini.`
        );
      } else if (res.xpAwarded > 0) {
        toast.success(
          `Tantangan harian selesai! +${res.xpAwarded} XP ditambahkan & Streak dipertahankan 🔥`
        );
      } else {
        toast.info(
          `Tantangan harian selesai (${finalCorrect}/${questions.length} benar). Streak harian tercatat!`
        );
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setAnswersList([]);
    setXpAwarded(0);
    setWasAlreadyCompleted(false);
    setIsFinished(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-quiz-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header Dialog */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-700 dark:text-orange-400 fill-current" />
            <h3
              id="daily-quiz-title"
              className="font-[family-name:var(--font-heading)] text-lg font-bold"
            >
              Tantangan Kuis Kilat Harian
            </h3>
          </div>
          <button
            type="button"
            aria-label="Tutup tantangan kuis harian"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isFinished ? (
          /* Finished State */
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Trophy className="h-8 w-8" />
            </div>

            <div>
              <Badge variant="outline" className="mb-2 bg-success/10 text-success border-success/30">
                {wasAlreadyCompleted ? "Latihan Ulang Selesai" : "Tantangan Hari Ini Selesai"}
              </Badge>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Skor: {correctCount} / {questions.length} Benar!
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {wasAlreadyCompleted
                  ? "Reward XP dan statistik soal harian hanya dihitung pada pengerjaan pertama setiap hari."
                  : correctCount === questions.length
                  ? "Sempurna! Pemahaman fundamentalmu sangat tajam."
                  : "Kerja bagus! Konsistensi belajar harian adalah kunci penguasaan karier."}
              </p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 max-w-sm mx-auto text-xs flex items-center justify-around">
              <div>
                <span className="text-muted-foreground block text-[10px]">Reward XP</span>
                <span className="font-bold text-primary text-base">
                  +{xpAwarded} XP
                </span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="text-muted-foreground block text-[10px]">Status Streak</span>
                <span className="font-bold text-orange-700 dark:text-orange-400 text-base flex items-center gap-1">
                  <Flame className="h-4 w-4 fill-current" /> Aktif
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 text-xs">
                <RotateCcw className="h-3.5 w-3.5" /> Coba Lagi
              </Button>
              <Button size="sm" onClick={onClose} className="text-xs">
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        ) : (
          /* Quiz In Progress */
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-primary">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <Badge variant="secondary" className="text-[10px]">
                {currentQ.skillTag}
              </Badge>
            </div>

            <h4 className="font-semibold text-base text-foreground leading-snug">
              {currentQ.question}
            </h4>

            {currentQ.codeSnippet && (
              <pre className="rounded-xl bg-muted/70 p-3 text-xs font-mono text-foreground overflow-x-auto border border-border">
                {currentQ.codeSnippet}
              </pre>
            )}

            {/* Options list */}
            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optStyle = "border-border bg-card hover:border-primary/40";
                if (isAnswered) {
                  if (isCorrect) {
                    optStyle = "border-success bg-success/10 text-success font-semibold";
                  } else if (isSelected && !isCorrect) {
                    optStyle = "border-destructive bg-destructive/10 text-destructive";
                  } else {
                    optStyle = "border-border bg-muted/40 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "w-full text-left rounded-xl border p-3 text-xs transition-all flex items-start gap-3",
                      optStyle
                    )}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-bold text-[11px] bg-muted/60">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {isAnswered && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-1 text-xs animate-in fade-in duration-200">
                <span className="font-semibold text-primary flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5" /> Pembahasan:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            <div className="mt-6 flex justify-end border-t border-border pt-4">
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!isAnswered || submitting}
                className="gap-1.5 text-xs"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {currentIndex === questions.length - 1 ? "Selesaikan Kuis" : "Soal Berikutnya"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
