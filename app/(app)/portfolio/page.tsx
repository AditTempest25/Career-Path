"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  FolderKanban,
  Github,
  Globe,
  Linkedin,
  Mail,
  Share2,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { CertificateModal } from "@/components/app/certificate-modal";
import { useApp } from "@/lib/store";
import { getSimulation } from "@/lib/data/simulations";
import { getCareer } from "@/lib/data/careers";
import { formatDate, initials } from "@/lib/progress";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const { user, data, toggleFeatured } = useApp();
  const career = getCareer(data.activeCareer);
  const [certOpen, setCertOpen] = useState(false);

  // Ambil semua submission
  const submissions = Object.values(data.submissions);
  const featuredList = data.featured
    .map((id) => ({ sim: getSimulation(id), sub: data.submissions[id] }))
    .filter((x): x is { sim: NonNullable<typeof x.sim>; sub: NonNullable<typeof x.sub> } => !!x.sim && !!x.sub);

  const publicSlug = (user?.name || "user").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  const publicPath = `/p/${publicSlug}`;

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${publicPath}`;
      navigator.clipboard.writeText(fullUrl);
      toast.success("Link portofolio publik disalin ke clipboard!");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <CertificateModal isOpen={certOpen} onClose={() => setCertOpen(false)} />

      <PageHeader
        title="Portofolio Karya Nyata"
        description="Kompilasi proyek simulasi kerja yang telah kamu kerjakan. Bagikan ke perekrut atau employer untuk membuktikan keahlianmu."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCertOpen(true)}
              className="gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
            >
              <Award className="h-4 w-4" /> Sertifikat Kelulusan
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-1.5">
              <Link href={publicPath} target="_blank">
                <Eye className="h-4 w-4" /> Lihat Halaman Publik
              </Link>
            </Button>
            <Button variant="default" size="sm" onClick={copyShareLink} className="gap-1.5">
              <Share2 className="h-4 w-4" /> Salin Link Publik
            </Button>
          </div>
        }
      />

      {/* Profil Banner Portofolio */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
              {initials(user?.name || "User")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  {user?.name}
                </h2>
                {career && <Badge variant="secondary">{career.title}</Badge>}
              </div>
              <p className="mt-1 text-sm font-medium text-primary">
                {data.profile.headline || "Talenta Digital Berbakat"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-xl">
                {data.profile.bio || "Menampilkan proyek simulasi praktis berbasis studi kasus industri nyata."}
              </p>

              {/* Social Links */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {data.profile.location && <span>📍 {data.profile.location}</span>}
                {data.profile.github && (
                  <a
                    href={data.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                )}
                {data.profile.linkedin && (
                  <a
                    href={data.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 text-center sm:text-right shrink-0">
            <span className="text-xs text-muted-foreground">Proyek Terselesaikan</span>
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              {submissions.length}
            </p>
            <span className="text-[11px] text-muted-foreground">
              {featuredList.length} terpilih di portofolio utama
            </span>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
              Karya Pilihan (Featured Projects)
            </h3>
            <p className="text-xs text-muted-foreground">
              Proyek unggulan yang diprioritaskan tampil kepada reviewer dan halaman publik.
            </p>
          </div>
        </div>

        {featuredList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <FolderKanban className="mx-auto h-10 w-10 text-muted-foreground" />
            <h4 className="mt-3 font-semibold text-sm">Belum ada karya pilihan</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Kerjakan tantangan di Work Simulator lalu klik ikon bintang untuk menampilkannya di sini.
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/simulator">Mulai Kerjakan Simulasi</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredList.map(({ sim, sub }) => (
              <div
                key={sim.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                        {sim.company.initials}
                      </span>
                      <div>
                        <h4 className="font-bold text-base text-foreground">{sim.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {sim.company.name} · {sim.role}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFeatured(sim.id)}
                      className="text-warning transition-transform hover:scale-110"
                      title="Hapus dari featured"
                    >
                      <Star className="h-5 w-5 fill-warning" />
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {sim.summary}
                  </p>

                  {/* Submission Answers preview */}
                  <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3.5 space-y-2 text-xs">
                    {Object.entries(sub.answers).map(([key, val]) => (
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

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {sim.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span className="font-semibold text-success">
                    Skor Review: {sub.score}/100
                  </span>
                  <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                    <Link href={`/simulator/${sim.id}`}>Lihat Review Lengkap</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Semua Proyek */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
          Semua Hasil Kerja ({submissions.length})
        </h3>

        <div className="space-y-3">
          {submissions.map((sub) => {
            const sim = getSimulation(sub.simulationId);
            if (!sim) return null;
            const isFeatured = data.featured.includes(sim.id);

            return (
              <div
                key={sub.simulationId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{sim.title}</span>
                    <Badge variant="outline" className="text-xs">
                      Skor {sub.score}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {sim.company.name} · Selesai pada {formatDate(sub.submittedAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(sim.id)}
                    className="h-8 gap-1 text-xs"
                  >
                    <Star
                      className={cn("h-3.5 w-3.5", isFeatured ? "fill-warning text-warning" : "")}
                    />
                    {isFeatured ? "Bintang" : "Pajang"}
                  </Button>
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                    <Link href={`/simulator/${sim.id}`}>Detail</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
