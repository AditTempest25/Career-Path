"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  EyeOff,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  MapPin,
  Printer,
  RefreshCw,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { formatDate, initials } from "@/lib/progress";

interface ServerPublicPortfolio {
  name: string;
  slug: string;
  createdAt: string;
  publicPortfolioEnabled: boolean;
  isOwnerPreview?: boolean;
  verified?: boolean;
  activeCareerId: string;
  careerTitle: string;
  skills: string[];
  tools: string[];
  profile: {
    headline: string;
    bio: string;
    location: string;
    education: string;
    github: string;
    linkedin: string;
    website: string;
  };
  stats: {
    readiness: number;
    xp: number;
    level: number;
    completedModulesCount: number;
    submissionsCount: number;
  };
  featuredProjects: {
    simulationId: string;
    title: string;
    role: string;
    summary: string;
    skills: string[];
    company: {
      name: string;
      initials: string;
      industry: string;
    };
    score: number;
    answers: Record<string, string>;
    submittedAt: string;
  }[];
}

type PortfolioLoadState = "loading" | "ready" | "not-found" | "private" | "network-error";

export default function PublicPortfolioPage() {
  const params = useParams();
  const username = params.username as string;

  const [serverPortfolio, setServerPortfolio] = useState<ServerPublicPortfolio | null>(null);
  const [status, setStatus] = useState<PortfolioLoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchPortfolio = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(
        `/api/public/portfolio/${encodeURIComponent(username)}`,
        { credentials: "include", cache: "no-store" }
      );
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        error?: string;
        portfolio?: ServerPublicPortfolio;
      };

      if (res.ok && payload.ok && payload.portfolio) {
        setServerPortfolio(payload.portfolio);
        setStatus("ready");
        return;
      }

      setServerPortfolio(null);
      if (res.status === 403 || payload.code === "PRIVATE") {
        setStatus("private");
        setErrorMessage(
          payload.error || "Portofolio ini diatur sebagai privat oleh pemilik akun."
        );
      } else if (res.status === 404 || payload.code === "NOT_FOUND") {
        setStatus("not-found");
        setErrorMessage(
          payload.error || `Profil dengan username "${username}" tidak ditemukan di PathForge.`
        );
      } else {
        setStatus("network-error");
        setErrorMessage(
          payload.error || "Terjadi kendala saat memuat data portofolio dari server."
        );
      }
    } catch {
      setServerPortfolio(null);
      setStatus("network-error");
      setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi internetmu dan coba lagi.");
    }
  }, [username]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const printResume = () => {
    if (status !== "ready" || !serverPortfolio) return;
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Top Navbar (PF-018: flex-wrap agar tidak overflow di 360px/390px) */}
      <header className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border print:hidden">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo />
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {status === "loading" && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Memuat...
            </span>
          )}
          {status === "ready" && serverPortfolio && (
            <Button variant="outline" size="sm" onClick={printResume} className="gap-1.5">
              <Printer className="h-4 w-4" /> Cetak / PDF
            </Button>
          )}
          <Button asChild size="sm">
            <Link href="/register">Buat Portofolio</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-4xl space-y-6">
        {status === "loading" && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <h1 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Memuat Portofolio...
            </h1>
            <p className="text-xs text-muted-foreground">
              Mengambil data profil dan proyek terverifikasi dari server PathForge.
            </p>
          </div>
        )}

        {status === "not-found" && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <Badge variant="secondary">404 · Tidak Ditemukan</Badge>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Portofolio Tidak Ditemukan
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">Masuk ke Akun</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "private" && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/15 text-warning-foreground dark:text-warning">
              <EyeOff className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <Badge variant="outline">403 · Akses Privat</Badge>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Portofolio Ini Bersifat Privat
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {errorMessage} Jika ini adalah akun milikmu, silakan masuk terlebih dahulu atau aktifkan visibilitas publik di halaman Pengaturan.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">Masuk sebagai Pemilik</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "network-error" && (
          <div className="rounded-2xl border border-destructive/30 bg-card p-10 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <Badge variant="outline" className="border-destructive/30 text-destructive">
                Gangguan Jaringan
              </Badge>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Gagal Memuat Portofolio
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={fetchPortfolio} className="gap-1.5">
                <RefreshCw className="h-4 w-4" /> Coba Muat Ulang
              </Button>
              <Button asChild size="sm">
                <Link href="/">Ke Beranda</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "ready" && serverPortfolio && (
          <>
            {(serverPortfolio.isOwnerPreview || !serverPortfolio.publicPortfolioEnabled) && (
              <div className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-xs text-warning-foreground dark:text-warning flex flex-wrap items-center justify-between gap-2 print:hidden">
                <span>
                  <strong>Mode Pratinjau Pemilik:</strong> Portofolio ini sedang berstatus <strong>Privat</strong> dan hanya dapat dilihat olehmu.
                </span>
                <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                  <Link href="/settings">Ubah Privasi di Pengaturan</Link>
                </Button>
              </div>
            )}

            {/* Profile Card Header */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
                    {initials(serverPortfolio.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-foreground capitalize">
                        {serverPortfolio.name}
                      </h1>
                      {serverPortfolio.verified ? (
                        <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/30">
                          <ShieldCheck className="h-3 w-3" /> Terverifikasi PathForge
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Profil Pembelajar PathForge
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1.5 text-base font-semibold text-primary">
                      {serverPortfolio.profile.headline || `Junior ${serverPortfolio.careerTitle}`}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                      {serverPortfolio.profile.bio ||
                        "Portofolio hasil pengerjaan proyek simulasi kerja berbasis standar industri."}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      {serverPortfolio.profile.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {serverPortfolio.profile.location}
                        </span>
                      )}
                      {serverPortfolio.profile.education && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5" /> {serverPortfolio.profile.education}
                        </span>
                      )}
                      {serverPortfolio.profile.github && (
                        <a
                          href={serverPortfolio.profile.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Github className="h-3.5 w-3.5" /> GitHub
                        </a>
                      )}
                      {serverPortfolio.profile.linkedin && (
                        <a
                          href={serverPortfolio.profile.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4 text-center sm:text-right shrink-0">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                    Indeks Kesiapan Kerja
                  </span>
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                    {serverPortfolio.stats.readiness}%
                  </p>
                  <span className="text-[11px] text-muted-foreground">
                    Level {serverPortfolio.stats.level} ({serverPortfolio.stats.xp} XP)
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Badge Section */}
            {(serverPortfolio.skills.length > 0 || serverPortfolio.tools.length > 0) && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Kompetensi &amp; Perangkat Kerja
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {serverPortfolio.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {s}
                    </span>
                  ))}
                  {serverPortfolio.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Simulation Projects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                  Proyek Simulasi Kerja
                </h2>
                <span className="text-xs text-muted-foreground">
                  {serverPortfolio.featuredProjects.length} Proyek Unggulan
                </span>
              </div>

              {serverPortfolio.featuredProjects.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                  Belum ada proyek simulasi yang ditampilkan.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {serverPortfolio.featuredProjects.map((proj) => (
                    <div
                      key={proj.simulationId}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                              {proj.company.initials}
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-bold text-base text-foreground truncate">{proj.title}</h3>
                              <span className="text-xs text-muted-foreground">
                                {proj.company.name} · {proj.role}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs shrink-0">
                            Skor {proj.score}/100
                          </Badge>
                        </div>

                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          {proj.summary}
                        </p>

                        {/* Output Preview */}
                        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3.5 space-y-2 text-xs">
                          {Object.entries(proj.answers).map(([key, val]) => (
                            <div key={key}>
                              <span className="font-semibold text-foreground capitalize">
                                {key}:
                              </span>{" "}
                              {val.startsWith("http") ? (
                                <a
                                  href={val}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-primary underline break-all"
                                >
                                  {val} <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : (
                                <p className="mt-0.5 text-muted-foreground line-clamp-3 leading-relaxed">
                                  {val}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {proj.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 border-t border-border pt-3 text-[11px] text-muted-foreground flex items-center justify-between">
                        <span>Selesai: {formatDate(proj.submittedAt)}</span>
                        <span className="text-success font-medium">✓ Dinilai Rubrik Simulator</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer info */}
            <footer className="pt-8 text-center text-xs text-muted-foreground border-t border-border">
              <p>
                Portofolio ini dibuat melalui{" "}
                <Link href="/" className="font-semibold text-primary underline">
                  PathForge Career GPS &amp; Work Simulator
                </Link>
                .
              </p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
