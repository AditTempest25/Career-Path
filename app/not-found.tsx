import Link from "next/link";
import { ArrowLeft, Compass, Home, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MapPinOff className="h-8 w-8" />
        </div>

        <span className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Error 404
        </span>

        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
          Tersesat di Jalur Karier?
        </h1>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan. Yuk kembali ke jalur yang benar bersama Career GPS PathForge!
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="w-full sm:w-auto gap-2">
            <Link href="/dashboard">
              <Compass className="h-4 w-4" /> Ke Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
            <Link href="/">
              <Home className="h-4 w-4" /> Halaman Utama
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
