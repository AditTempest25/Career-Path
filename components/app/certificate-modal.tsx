"use client";

import { useRef, useState } from "react";
import { Award, CheckCircle2, Download, Printer, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { useApp } from "@/lib/store";
import { getCareer } from "@/lib/data/careers";
import { formatDate } from "@/lib/progress";

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

  if (!isOpen || !career) return null;

  const certId = `PF-${(career.id.substring(0, 3)).toUpperCase()}-${Math.abs(
    (user?.id || "demo").split("").reduce((a, b) => a + b.charCodeAt(0), 0) * 83
  )}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header Dialog */}
        <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              Sertifikat Digital PathForge
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tampilan Fisik Sertifikat */}
        <div
          ref={certRef}
          className="mt-6 relative overflow-hidden rounded-2xl border-4 border-double border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-8 text-center shadow-inner"
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

            <h1 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-muted-foreground">
              Diberikan kepada:
            </h1>

            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold text-foreground border-b-2 border-primary/20 pb-2 max-w-md mx-auto">
              {user?.name}
            </h2>

            <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Atas dedikasi dan keberhasilannya menyelesaikan program kurikulum terstruktur serta
              seluruh deliverable proyek simulasi industri pada spesialisasi:
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
                  Diterbitkan pada: {formatDate(new Date().toISOString())}
                </span>
              </div>
              <div className="text-right flex flex-col items-end justify-end">
                <div className="h-8 flex items-end">
                  <span className="font-[family-name:var(--font-heading)] italic text-sm font-bold text-foreground">
                    PathForge Academic Board
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground border-t border-border pt-0.5">
                  Dewan Kurikulum & Standar Industri
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-success">
              <ShieldCheck className="h-4 w-4" />
              <span>Terverifikasi dan memenuhi standar kompetensi level junior-ready.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 print:hidden">
          <span className="text-xs text-muted-foreground">
            Bisa dilampirkan langsung ke resume atau profil LinkedIn.
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
      </div>
    </div>
  );
}
