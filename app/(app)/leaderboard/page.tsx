"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Crown,
  ExternalLink,
  Flame,
  Loader2,
  MapPin,
  Medal,
  Sparkles,
  Trophy,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { careers } from "@/lib/data/careers";
import { initials } from "@/lib/progress";
import type { LeaderboardEntry } from "@/app/api/leaderboard/route";

export default function LeaderboardPage() {
  const { user, data } = useApp();
  const [selectedCareer, setSelectedCareer] = useState<string>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/leaderboard?careerId=${encodeURIComponent(selectedCareer)}`,
          { credentials: "include", cache: "no-store" }
        );
        if (res.ok) {
          const payload = (await res.json()) as {
            ok?: boolean;
            leaderboard?: LeaderboardEntry[];
          };
          if (active && payload.ok && payload.leaderboard) {
            setEntries(payload.leaderboard);
          }
        }
      } catch {
        /* abaikan error jaringan sementara */
      } finally {
        if (active) setLoading(false);
      }
    }
    loadLeaderboard();
    return () => {
      active = false;
    };
  }, [selectedCareer, data.completedModules.length, Object.keys(data.submissions).length]);

  const topThree = entries.slice(0, 3);
  const currentUserIndex = entries.findIndex(
    (e) => e.isCurrentUser || (user && e.id === user.id)
  );
  const currentUserEntry =
    currentUserIndex >= 0 ? entries[currentUserIndex] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Papan Peringkat Talenta (Leaderboard)"
        description="Kompetisi sehat antar pembelajar PathForge di seluruh Indonesia berdasarkan Total XP, Kesiapan Kerja, dan konsistensi Streak."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link href="/simulator">
              <Zap className="mr-1.5 h-4 w-4 text-primary" /> Tambah XP di Simulator
            </Link>
          </Button>
        }
      />

      {/* Highlight Posisi Pengguna Saat Ini */}
      {currentUserEntry && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-sm">
              #{currentUserIndex + 1}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                  Posisi Kamu Saat Ini: Peringkat #{currentUserIndex + 1}
                </h3>
                <Badge variant="default" className="text-[10px]">
                  Lv {currentUserEntry.level} · {currentUserEntry.xp} XP
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Kesiapan Kerja {currentUserEntry.readiness}% · {currentUserEntry.completedModulesCount} Modul ·{" "}
                {currentUserEntry.submissionsCount} Proyek Simulasi
              </p>
            </div>
          </div>

          <Button asChild size="sm">
            <Link href="/roadmap">Kejar Peringkat Atas</Link>
          </Button>
        </div>
      )}

      {/* Filter Jalur Karier */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card p-3">
        <Button
          variant={selectedCareer === "all" ? "default" : "ghost"}
          size="sm"
          className="h-8 text-xs"
          onClick={() => setSelectedCareer("all")}
        >
          Semua Jalur Karier
        </Button>
        {careers.map((c) => (
          <Button
            key={c.id}
            variant={selectedCareer === c.id ? "default" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setSelectedCareer(c.id)}
          >
            {c.title}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            Memuat peringkat pembelajar dari server...
          </p>
        </div>
      ) : (
        <>
          {/* Podium Top 3 */}
          {topThree.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {topThree.map((item, idx) => {
                const rank = idx + 1;
                const badgeStyle =
                  rank === 1
                    ? "border-yellow-500/40 bg-gradient-to-b from-yellow-500/10 to-card"
                    : rank === 2
                    ? "border-slate-400/40 bg-gradient-to-b from-slate-400/10 to-card"
                    : "border-amber-600/40 bg-gradient-to-b from-amber-600/10 to-card";

                const iconColor =
                  rank === 1
                    ? "text-yellow-500"
                    : rank === 2
                    ? "text-slate-400"
                    : "text-amber-600";

                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col justify-between rounded-2xl border p-6 shadow-xs ${badgeStyle}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-bold text-foreground border border-border">
                          {rank === 1 ? (
                            <Crown className={`h-4 w-4 ${iconColor}`} />
                          ) : (
                            <Medal className={`h-4 w-4 ${iconColor}`} />
                          )}
                          Peringkat #{rank}
                        </span>
                        {item.isCurrentUser && (
                          <Badge variant="default" className="text-[10px]">
                            Kamu
                          </Badge>
                        )}
                      </div>

                      <div className="mt-5 flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-base">
                          {initials(item.name)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                            {item.name}
                          </h3>
                          <p className="truncate text-xs font-medium text-primary">
                            {item.careerTitle}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" /> {item.location}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                        {item.headline}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-border/70 pt-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-background/70 p-2">
                          <span className="text-[10px] text-muted-foreground block">
                            Total XP
                          </span>
                          <span className="font-bold text-xs text-primary">
                            {item.xp} XP
                          </span>
                        </div>
                        <div className="rounded-lg bg-background/70 p-2">
                          <span className="text-[10px] text-muted-foreground block">
                            Kesiapan
                          </span>
                          <span className="font-bold text-xs text-foreground">
                            {item.readiness}%
                          </span>
                        </div>
                        <div className="rounded-lg bg-background/70 p-2">
                          <span className="text-[10px] text-muted-foreground block">
                            Streak
                          </span>
                          <span className="font-bold text-xs text-orange-700 dark:text-orange-400">
                            🔥 {item.streak}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tabel Peringkat Lengkap */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                  Daftar Peringkat Lengkap ({entries.length} Talenta)
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Diurutkan berdasarkan Total XP & Skor Kesiapan
              </span>
            </div>

            <div className="divide-y divide-border">
              {entries.map((entry, idx) => {
                const rank = idx + 1;
                return (
                  <div
                    key={entry.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 transition-colors ${
                      entry.isCurrentUser
                        ? "bg-primary/5"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          rank === 1
                            ? "bg-yellow-500/15 text-yellow-800 dark:text-yellow-300"
                            : rank === 2
                            ? "bg-slate-500/15 text-slate-800 dark:text-slate-200"
                            : rank === 3
                            ? "bg-amber-500/15 text-amber-900 dark:text-amber-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        #{rank}
                      </span>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
                        {initials(entry.name)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-foreground truncate">
                            {entry.name}
                          </span>
                          {entry.isCurrentUser && (
                            <Badge variant="default" className="text-[10px] h-5">
                              Kamu
                            </Badge>
                          )}
                          {entry.isServerUser && !entry.isCurrentUser && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 gap-1 border-success/30 text-success bg-success/5"
                            >
                              <UserCheck className="h-3 w-3" /> Terdaftar
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-[10px] h-5">
                            {entry.careerTitle}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground truncate">
                          {entry.headline} · {entry.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6 text-xs shrink-0">
                      <div className="text-center">
                        <span className="text-[10px] text-muted-foreground block">
                          Modul & Sim
                        </span>
                        <span className="font-semibold text-foreground">
                          {entry.completedModulesCount} modul · {entry.submissionsCount} proyek
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] text-muted-foreground block">
                          Kesiapan
                        </span>
                        <span className="font-semibold text-success">
                          {entry.readiness}%
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] text-muted-foreground block">
                          Streak
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-orange-700 dark:text-orange-400">
                          <Flame className="h-3.5 w-3.5" /> {entry.streak}h
                        </span>
                      </div>

                      <div className="min-w-[85px] text-right">
                        <span className="text-[10px] text-muted-foreground block">
                          Level {entry.level}
                        </span>
                        <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-primary">
                          {entry.xp} XP
                        </span>
                      </div>

                      {entry.isServerUser && (
                        <Button asChild variant="ghost" size="sm" className="h-8 px-2.5 text-xs">
                          <Link href={`/p/${entry.slug}`}>
                            Portofolio <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
