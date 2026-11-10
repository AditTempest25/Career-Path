"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Flame,
  Globe,
  MapPin,
  Send,
  Share2,
  Sparkles,
  Trophy,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { calculateJobMatch, jobs, type Job } from "@/lib/data/jobs";
import { careers, formatSalary, getCareer } from "@/lib/data/careers";
import { formatDate } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  const { user, data, applyJob } = useApp();
  const career = getCareer(data.activeCareer);

  // Filters
  const [selectedCareer, setSelectedCareer] = useState<string>(data.activeCareer || "all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"catalog" | "applied">("catalog");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const appliedMap = data.appliedJobs ?? {};
  const appliedList = Object.values(appliedMap);

  const filteredJobs = jobs.filter((job) => {
    if (selectedCareer !== "all" && job.careerId !== selectedCareer) return false;
    if (selectedType !== "all" && job.type !== selectedType) return false;
    return true;
  });

  const publicSlug = (user?.name || "user").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  const portfolioUrl = typeof window !== "undefined" ? `${window.location.origin}/p/${publicSlug}` : `/p/${publicSlug}`;

  const handleApply = (job: Job) => {
    applyJob(job.id, job.title, job.company.name);
    toast.success(`Lamaran untuk "${job.title}" di ${job.company.name} berhasil dikirim! 🚀`);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Peluang Kerja & Magang"
        description="Lowongan terkurasi di perusahaan teknologi Indonesia yang dicocokkan otomatis dengan kesiapan portofoliomu."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "catalog" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("catalog")}
            >
              Semua Lowongan ({jobs.length})
            </Button>
            <Button
              variant={activeTab === "applied" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("applied")}
              className="gap-1.5"
            >
              Lamaran Saya ({appliedList.length})
            </Button>
          </div>
        }
      />

      {/* Banner Kecocokan Profil */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                  Profil Pelamar: {user?.name}
                </h3>
                {career && <Badge variant="secondary">{career.title}</Badge>}
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-xl">
                Portofolio publikmu telah terverifikasi dengan{" "}
                <span className="font-semibold text-foreground">{Object.keys(data.submissions).length} proyek simulasi</span>.
                Recruiter dapat melihat hasil karyamu secara langsung saat melamar.
              </p>
            </div>
          </div>

          <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5">
            <Link href={`/p/${publicSlug}`} target="_blank">
              <Eye className="h-4 w-4" /> Cek Portofolio Publik
            </Link>
          </Button>
        </div>
      </div>

      {activeTab === "catalog" ? (
        <>
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Filter className="h-4 w-4 text-muted-foreground mr-1" />
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
              {["all", "Full-time", "Magang"].map((t) => (
                <Button
                  key={t}
                  variant={selectedType === t ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType(t)}
                  className="h-7 text-xs"
                >
                  {t === "all" ? "Semua Tipe" : t}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid Lowongan */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job) => {
              const match = calculateJobMatch(job, data);
              const isApplied = !!appliedMap[job.id];

              return (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div>
                    {/* Header Card */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary text-sm">
                          {job.company.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">
                              {job.company.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground">· {job.company.industry}</span>
                          </div>
                          <h4 className="font-[family-name:var(--font-heading)] font-bold text-base text-foreground mt-0.5">
                            {job.title}
                          </h4>
                        </div>
                      </div>

                      {/* Match Score Badge */}
                      <div
                        className={cn(
                          "rounded-xl px-2.5 py-1 text-center font-bold text-xs shrink-0 border",
                          match.score >= 75
                            ? "bg-success/10 text-success border-success/30"
                            : match.score >= 55
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-warning/10 text-warning-foreground border-warning/30"
                        )}
                        title={`Tingkat kecocokan berdasarkan skill dan kesiapan portofolio`}
                      >
                        <span className="block text-sm">{match.score}%</span>
                        <span className="text-[10px] font-normal block">{match.label}</span>
                      </div>
                    </div>

                    {/* Metadata chips */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-md bg-muted px-2.5 py-1 text-foreground font-medium">
                        {job.type}
                      </span>
                      <span className="rounded-md bg-muted px-2.5 py-1 text-foreground">
                        {job.workplace}
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatSalary(job.salary)}/bln
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill matching indicators */}
                    <div className="mt-4">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Kebutuhan Keahlian:
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((skill) => {
                          const hasSkill = match.matchedSkills.includes(skill);
                          return (
                            <span
                              key={skill}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border",
                                hasSkill
                                  ? "bg-success/10 text-success border-success/20"
                                  : "bg-muted text-muted-foreground border-border"
                              )}
                            >
                              {hasSkill && <Check className="h-3 w-3" />}
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[11px] text-muted-foreground">
                      Tayang {job.postedDaysAgo} hari lalu
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                        className="text-xs h-8"
                      >
                        Lihat Rincian
                      </Button>
                      {isApplied ? (
                        <Button size="sm" variant="secondary" disabled className="text-xs h-8 gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Dilamar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setSelectedJob(job)}
                          className="text-xs h-8 gap-1"
                        >
                          Lamar Cepat <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Lamaran Saya Tab */
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="border-b border-border pb-4">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Riwayat Lamaran Terkirim ({appliedList.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Status proses lamaran yang telah kamu kirimkan melalui PathForge.
            </p>
          </div>

          {appliedList.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Belum ada lamaran yang dikirim. Jelajahi lowongan di tab katalog!
            </div>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {appliedList.map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                if (!job) return null;

                return (
                  <div key={app.jobId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                        {job.company.initials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{job.title}</h4>
                        <p className="text-muted-foreground">{job.company.name} · {job.workplace}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                          {app.status}
                        </Badge>
                        <span className="block text-[11px] text-muted-foreground mt-0.5">
                          Dikirim {formatDate(app.appliedAt)}
                        </span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                        <Link href={`/p/${publicSlug}`} target="_blank">
                          Portofolio Terlampir
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal Detail & Lamar Cepat */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary text-base">
                  {selectedJob.company.initials}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedJob.company.name} · {selectedJob.workplace} · {formatSalary(selectedJob.salary)}/bln
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs text-muted-foreground leading-relaxed">
              <div>
                <h4 className="font-semibold text-foreground text-sm">Tentang Peran Ini</h4>
                <p className="mt-1">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground text-sm">Tanggung Jawab Utama</h4>
                <ul className="mt-2 space-y-1.5 list-disc pl-4">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground text-sm">Kualifikasi Pelamar</h4>
                <ul className="mt-2 space-y-1.5 list-disc pl-4">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground text-sm">Benefit & Fasilitas</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedJob.perks.map((p, i) => (
                    <span key={i} className="rounded-md bg-muted px-2.5 py-1 text-[11px] text-foreground">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box Portofolio Attachment */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                  <UserCheck className="h-4 w-4" />
                  Portofolio PathForge yang Dilampirkan
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Recruiter akan menerima link portofolio publikmu lengkap dengan review kode & skor kesiapan kerja:
                </p>
                <div className="rounded-lg bg-background p-2 font-mono text-[11px] text-foreground break-all border border-border">
                  {portfolioUrl}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedJob(null)}>
                Batal
              </Button>
              {appliedMap[selectedJob.id] ? (
                <Button disabled size="sm" variant="secondary" className="gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-success" /> Lamaran Sudah Terkirim
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleApply(selectedJob)} className="gap-2">
                  <Send className="h-4 w-4" /> Kirim Lamaran Cepat
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
