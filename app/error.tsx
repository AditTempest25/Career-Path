"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PathForge Runtime Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-destructive/30 bg-card p-8 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
          Terjadi Kendala Teknis
        </h1>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Maaf, halaman mengalami gangguan sementara saat memuat data. Progres belajarmu tetap aman.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()} className="w-full sm:w-auto gap-2">
            <RotateCcw className="h-4 w-4" /> Coba Muat Ulang
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
            <Link href="/dashboard">
              <Home className="h-4 w-4" /> Ke Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
