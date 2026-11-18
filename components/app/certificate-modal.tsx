"use client";

import Link from "next/link";
import { useRef } from "react";
import { Award, Lock, Printer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { formatDate, getRoadmapProgress, isCertificateEligible } from "@/lib/progress";

export function CertificateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, data } = useApp();
  const career = getCareer(data.activeCareer);
  const certRef = useRef<HTMLDivElement>(null);

  if (!career) return null;

  const roadmapProgress = getRoadmapProgress(career, data);
  const eligible = isCertificateEligible(career, data);

  const certId = `PF-${career.id.substring(0, 3).toUpperCase()}-${Math.abs(
    (user?.id || "demo")
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0) * 83
  )}`;

  // Gunakan tanggal penerbitan yang konsisten dari riwayat penyelesaian terakhir
  const issuedDateIso =
    data.certificates?.[career.id] ||
    data.activity.find((a) => a.type === "module")?.date ||
    data.assessment?.completedAt ||
    "2026-11-18T00:00:00.000Z";

  const handlePrint = () => {
    if (!eligible) return;
    window.print();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-3xl rounded-2xl p-6 max-h-[92vh] overflow-y-auto">
        <DialogHeader className="border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <DialogTitle className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Sertifikat Digital PathForge
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            {eligible
              ? `Sertifikat kelulusan resmi jalur ${career.title} telah terbuka dan siap dicetak.`
              : `Selesaikan seluruh modul kurikulum pada jalur ${career.title} untuk membuka sertifikat kelulusan.`}
          </DialogDescription>
        </DialogHeader>

        {eligible ? (
          <>
            {/* Tampilan Fisik Sertifikat */}
            <div
              ref={certRef}
              className="mt-2 relative overflow-hidden rounded-2xl border-4 border-double border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-8 text-center shadow-inner"
            >
              {/* Watermark Logo Background */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
                <Award className="h-80 w-80 text-primary" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex justify-center">
                  <Logo />
                </div>

                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  Certificate of Skill Mastery
                </p>

                <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-muted-foreground">
                  Diberikan kepada:
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold text-foreground border-b-2 border-primary/20 pb-2 max-w-md mx-auto">
                  {user?.name}
                </h2>

                <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Atas dedikasi dan keberhasilannya menyelesaikan 100% program kurikulum terstruktur ({roadmapProgress.total} modul) pada spesialisasi:
                </p>

                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                  {career.title} Specialist
                </h3>

                {/* Verification & Signatures */}
                <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4 text-xs">
                  <div className="text-left">
                    <span className="text-muted-foreground block text-[10px]">ID Sertifikasi:</span>
                    <span className="font-mono font-semibold text-foreground">{certId}</span>
                    <span className="text-muted-foreground block text-[10px] mt-1">
                      Diterbitkan pada: {formatDate(issuedDateIso)}
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end justify-end">
                    <div className="h-8 flex items-end">
                      <span className="font-[family-name:var(--font-heading)] italic text-sm font-bold text-foreground">
                        PathForge Academic Board
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground border-t border-border pt-0.5">
                      Dewan Kurikulum &amp; Standar Industri
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-success">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Terverifikasi telah menuntaskan seluruh modul kurikulum jalur {career.title}.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 print:hidden">
              <span className="text-xs text-muted-foreground">
                Bisa dilampirkan ke resume atau profil LinkedIn.
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Tutup
                </Button>
                <Button size="sm" onClick={handlePrint} className="gap-1.5">
                  <Printer className="h-4 w-4" /> Cetak / Simpan PDF
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Locked State (PF-009) */
          <div className="mt-2 rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Lock className="h-7 w-7" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                Sertifikat Belum Memenuhi Syarat Kelulusan
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sertifikat Digital PathForge hanya diterbitkan setelah kamu menyelesaikan <strong>100% modul Roadmap</strong> pada jalur <strong>{career.title}</strong>.
              </p>
            </div>

            <div className="max-w-sm mx-auto space-y-2 rounded-xl border border-border bg-card p-4 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Progres Kurikulum Saat Ini</span>
                <span className="font-bold text-primary">
                  {roadmapProgress.completed} / {roadmapProgress.total} Modul ({roadmapProgress.percent}%)
                </span>
              </div>
              <Progress
                value={roadmapProgress.percent}
                aria-label="Progres syarat kelulusan sertifikat"
                className="h-2"
              />
              <p className="text-[11px] text-muted-foreground">
                Selesaikan {roadmapProgress.total - roadmapProgress.completed} modul lagi untuk membuka penerbitan &amp; pencetakan sertifikat.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Tutup
              </Button>
              <Button asChild size="sm" onClick={onClose}>
                <Link href="/roadmap">Lanjutkan Modul di Roadmap</Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
