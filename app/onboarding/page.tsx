"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Compass, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FullPageLoader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { assessmentQuestions, rankCareers } from "@/lib/data/assessment";
import { formatSalary, getCareer } from "@/lib/data/careers";
import type { AssessmentResult, CareerId, UserStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusOptions: { value: UserStatus; label: string; desc: string }[] = [
  { value: "mahasiswa", label: "Mahasiswa", desc: "Masih kuliah dan ingin bersiap" },
  { value: "fresh-graduate", label: "Fresh Graduate", desc: "Baru lulus, mencari kerja pertama" },
  { value: "career-switcher", label: "Pindah Karier", desc: "Ingin beralih ke bidang baru" },
  { value: "bekerja", label: "Sedang Bekerja", desc: "Ingin naik level di bidang sekarang" },
];

export default function OnboardingPage() {
  const { ready, user, data, saveAssessment, completeOnboarding } = useApp();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<UserStatus>(data.profile.status);
  const [education, setEducation] = useState(data.profile.education);
  const [hours, setHours] = useState(data.profile.weeklyHours);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [selected, setSelected] = useState<CareerId | null>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  useEffect(() => {
    if (ready) {
      setStatus(data.profile.status);
      setEducation(data.profile.education);
      setHours(data.profile.weeklyHours);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const totalSteps = assessmentQuestions.length + 2; // intro + pertanyaan + hasil
  const questionIndex = step - 1;
  const question = assessmentQuestions[questionIndex];
  const isResult = step === totalSteps - 1;

  const ranked = useMemo(() => (result ? rankCareers(result.scores) : []), [result]);

  if (!ready || !user) return <FullPageLoader />;

  const next = () => {
    if (step === assessmentQuestions.length) {
      const res = saveAssessment(answers, { status, education, weeklyHours: hours });
      setResult(res);
      setSelected(rankCareers(res.scores)[0][0]);
    }
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const choose = (optionId: string) => {
    setAnswers((a) => ({ ...a, [question.id]: optionId }));
    setTimeout(() => {
      if (step === assessmentQuestions.length) return;
      setStep((s) => s + 1);
    }, 220);
  };

  const finish = () => {
    if (!selected) return;
    completeOnboarding(selected);
    toast.success(`Jalur ${getCareer(selected)?.title} dipilih. Ayo mulai!`);
    router.push("/dashboard");
  };

  const progress = Math.round((step / (totalSteps - 1)) * 100);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Logo />
          {data.onboarded ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">Halo, {user.name.split(" ")[0]} 👋</span>
          )}
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Compass className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
              Mari kenali dirimu dulu
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Jawab beberapa pertanyaan singkat (±3 menit) agar Career GPS bisa merekomendasikan jalur karier yang paling cocok.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <Label className="text-base">Status kamu saat ini</Label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {statusOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setStatus(o.value)}
                      className={cn(
                        "rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/40",
                        status === o.value ? "border-primary ring-2 ring-primary/20" : "border-border"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{o.label}</span>
                        {status === o.value && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="text-base">
                  Pendidikan terakhir / jurusan <span className="font-normal text-muted-foreground">(opsional)</span>
                </Label>
                <Input
                  id="education"
                  placeholder="Contoh: S1 Manajemen, SMK RPL"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="bg-card"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-base">Waktu belajar per minggu</Label>
                  <span className="font-semibold text-primary">{hours} jam</span>
                </div>
                <Slider value={[hours]} min={2} max={40} step={1} onValueChange={(v) => setHours(v[0])} className="mt-4" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Kami akan menyesuaikan estimasi waktu roadmap dengan ketersediaanmu.
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <Button size="lg" onClick={next} className="gap-2">
                Mulai Asesmen <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {question && !isResult && (
          <div key={question.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-primary">
              Pertanyaan {questionIndex + 1} dari {assessmentQuestions.length}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl">
              {question.question}
            </h2>
            {question.helper && <p className="mt-2 text-muted-foreground">{question.helper}</p>}

            <div className="mt-8 space-y-3">
              {question.options.map((o) => {
                const active = answers[question.id] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => choose(o.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-sm",
                      active ? "border-primary ring-2 ring-primary/20" : "border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold uppercase",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {o.id}
                    </span>
                    <span className="text-foreground">{o.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <Button variant="ghost" onClick={back} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Kembali
              </Button>
              <Button onClick={next} disabled={!answers[question.id]} className="gap-2">
                {step === assessmentQuestions.length ? "Lihat Hasil" : "Lanjut"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {isResult && result && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
                Hasil Career GPS kamu
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Berdasarkan jawabanmu, berikut jalur karier yang paling sesuai. Pilih satu untuk memulai. Kamu bisa
                menggantinya kapan saja.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {ranked.map(([id, score], i) => {
                const c = getCareer(id)!;
                const active = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={cn(
                      "flex w-full flex-col gap-4 rounded-2xl border bg-card p-5 text-left transition-all hover:border-primary/40 sm:flex-row sm:items-center",
                      active ? "border-primary ring-2 ring-primary/20" : "border-border",
                      i > 2 && "opacity-80"
                    )}
                  >
                    <div className="flex items-center gap-4 sm:flex-1">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <c.icon className="h-6 w-6" />
                        {i === 0 && (
                          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-warning text-warning-foreground">
                            <Trophy className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                            {c.title}
                          </span>
                          {i === 0 && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                              Paling cocok
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{c.tagline}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatSalary(c.salary)}/bulan · {c.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:w-48">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${score}%` }} />
                      </div>
                      <span className="w-12 text-right font-semibold text-foreground">{score}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
              <Button variant="ghost" onClick={() => { setStep(1); setResult(null); }} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Ulangi asesmen
              </Button>
              <Button size="lg" onClick={finish} disabled={!selected} className="gap-2">
                Mulai sebagai {getCareer(selected)?.title}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
