"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Flame, Zap } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar, navItems } from "@/components/app/app-sidebar";
import { FullPageLoader } from "@/components/app/shared";
import { ThemeToggle } from "@/components/theme-toggle";
import { useApp } from "@/lib/store";
import { getLevel, getStreak, getTotalXp } from "@/lib/progress";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { ready, user, data } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace(`/login`);
    else if (!data.onboarded) router.replace("/onboarding");
  }, [ready, user, data.onboarded, router]);

  if (!ready || !user || !data.onboarded) return <FullPageLoader />;

  const current =
    pathname.startsWith("/settings")
      ? "Profil & Pengaturan"
      : navItems.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"))?.label ?? "";
  const xp = getTotalXp(data);
  const level = getLevel(xp);
  const streak = getStreak(data);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-xl">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
          <span className="truncate text-sm font-medium text-foreground">{current}</span>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/progress"
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted sm:flex"
              title="Streak belajar"
            >
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              {streak} hari
            </Link>
            <Link
              href="/progress"
              className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
              title={`${xp} XP total`}
            >
              <Zap className="h-3.5 w-3.5" />
              Lv {level.level} · {xp} XP
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
