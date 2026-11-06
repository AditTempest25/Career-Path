"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { useApp } from "@/lib/store";
import { FullPageLoader } from "@/components/app/shared";

const points = [
  "Rekomendasi karier personal dari asesmen Career GPS",
  "Roadmap belajar terstruktur dengan sumber gratis",
  "Simulasi kerja nyata dengan feedback instan",
  "Portofolio otomatis dari hasil simulasi",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { ready, user, data } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (ready && user) router.replace(data.onboarded ? "/dashboard" : "/onboarding");
  }, [ready, user, data.onboarded, router]);

  if (!ready || user) return <FullPageLoader />;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <Link href="/" className="relative z-10 w-fit rounded-xl bg-background/95 px-3 py-2">
          <Logo />
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight">
            Dari bingung menjadi siap kerja.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Ribuan pencari kerja pemula sudah memetakan kariernya bersama PathForge.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/90" />
                <span className="text-primary-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-sm text-primary-foreground/60">© 2026 PathForge</p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
