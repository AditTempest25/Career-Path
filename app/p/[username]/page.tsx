"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  MapPin,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { getSimulation } from "@/lib/data/simulations";
import { formatDate, getLevel, getReadiness, getTotalXp, initials } from "@/lib/progress";

interface ServerPublicPortfolio {
  name: string;
  slug: string;
  createdAt: string;
  publicPortfolioEnabled: boolean;
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

export default function PublicPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const { user, data } = useApp();

  const [serverPortfolio, setServerPortfolio] = useState<ServerPublicPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchPortfolio() {
      try {
        const res = await fetch(
          `/api/public/portfolio/${encodeURIComponent(username)}`,
          { credentials: "include", cache: "no-store" }
        );
        if (res.ok) {
          const payload = (await res.json()) as {
            ok?: boolean;
            portfolio?: ServerPublicPortfolio;
          };
          if (active && payload.ok && payload.portfolio) {
            setServerPortfolio(payload.portfolio);
          }
        }
      } catch {
        /* fallback ke state lokal jika server tidak terjangkau */
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchPortfolio();
    return () => {
      active = false;
    };
  }, [username]);

  // Fallback dari context client jika belum ada di server
  const fallbackCareer = getCareer(data.activeCareer || "web-developer");
  const fallbackXp = getTotalXp(data);
  const fallbackLevel = getLevel(fallbackXp);
  const fallbackReadiness = fallbackCareer ? getReadiness(fallbackCareer.id, data) : 75;
  const fallbackFeatured = data.featured
    .map((id) => {
      const sim = getSimulation(id);
      const sub = data.submissions[id];
      if (!sim || !sub) return null;
      return {
        simulationId: sim.id,
        title: sim.title,
        role: sim.role,
        summary: sim.summary,
        skills: sim.skills,
        company: sim.company,
        score: sub.score,
        answers: sub.answers,
        submittedAt: sub.submittedAt,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const displayName =
    serverPortfolio?.name ||
    user?.name ||
    decodeURIComponent(username).replace(/-/g, " ");
  const careerTitle =
    serverPortfolio?.careerTitle || fallbackCareer?.title || "Professional";
  const profile = serverPortfolio?.profile ?? data.profile;
  const readiness = serverPortfolio?.stats.readiness ?? fallbackReadiness;
  const xp = serverPortfolio?.stats.xp ?? fallbackXp;
  const levelNum = serverPortfolio?.stats.level ?? fallbackLevel.level;
  const skills = serverPortfolio?.skills ?? fallbackCareer?.skills ?? [];
  const tools = serverPortfolio?.tools ?? fallbackCareer?.tools ?? [];
  const featured = serverPortfolio?.featuredProjects ?? fallbackFeatured;

  const printResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Navbar */}
      <header className="mx-auto max-w-4xl flex items-center justify-between pb-8 border-b border-border print:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Memuat dari server...
            </span>
          )}
          <Button variant="outline" size="sm" onClick={printResume} className="gap-1.5">
            <Printer className="h-4 w-4" /> Cetak / PDF
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Buat Portofolio Seperti Ini</Link>
          </Button>
        </div>
      </header>

      {/* Main Resume Sheet */}
      <main className="mx-auto mt-6 max-w-4xl space-y-6">
        {/* Profile Card Header */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
                {initials(displayName)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-foreground capitalize">
                    {displayName}
                  </h1>
                  <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/30">
                    <ShieldCheck className="h-3 w-3" /> Terverifikasi PathForge
                  </Badge>
                </div>

                <p className="mt-1.5 text-base font-semibold text-primary">
                  {profile.headline || `Junior ${careerTitle}`}
                </p>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {profile.bio ||
                    "Portofolio hasil pengerjaan proyek simulasi kerja berbasis standar industri teknologi."}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {profile.location}
                    </span>
                  )}
                  {profile.education && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5" /> {profile.education}
                    </span>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
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
                {readiness}%
              </p>
              <span className="text-[11px] text-muted-foreground">
                Level {levelNum} ({xp} XP Terverifikasi)
              </span>
            </div>
          </div>
        </div>

        {/* Skill Badge Section */}
        {(skills.length > 0 || tools.length > 0) && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Kompetensi & Perangkat Kerja
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {s}
                </span>
              ))}
              {tools.map((t) => (
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
              Proyek Simulasi Kerja Terverifikasi
            </h2>
            <span className="text-xs text-muted-foreground">
              {featured.length} Proyek Unggulan
            </span>
          </div>

          {featured.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Belum ada proyek simulasi yang ditampilkan.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((proj) => (
                <div
                  key={proj.simulationId}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {proj.company.initials}
                        </span>
                        <div>
                          <h3 className="font-bold text-base text-foreground">{proj.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {proj.company.name} · {proj.role}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
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
                    <span className="text-success font-medium">✓ Lulus Rubrik Review</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="pt-8 text-center text-xs text-muted-foreground border-t border-border">
          <p>
            Portofolio ini dibuat dan divalidasi melalui{" "}
            <Link href="/" className="font-semibold text-primary underline">
              PathForge Career GPS & Work Simulator
            </Link>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}
