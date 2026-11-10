"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Compass,
  Eye,
  FileSearch,
  FolderKanban,
  Layers,
  LayoutDashboard,
  Map,
  MessageSquareQuote,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { careers } from "@/lib/data/careers";
import { simulations } from "@/lib/data/simulations";
import { jobs } from "@/lib/data/jobs";
import { useApp } from "@/lib/store";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useApp();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const publicSlug = (user?.name || "user").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="relative h-8 w-9 justify-center p-0 sm:w-52 sm:justify-start sm:px-3 text-xs text-muted-foreground bg-muted/40 border-border hover:bg-muted"
      >
        <Search className="h-3.5 w-3.5 sm:mr-2 shrink-0" />
        <span className="hidden sm:inline-flex truncate">Cari fitur, karier...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-[10px]">Ctrl</span>K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Navigasi Cepat PathForge"
        description="Ketik nama halaman, jalur karier, simulasi, atau lowongan kerja..."
      >
        <CommandInput placeholder="Cari halaman, simulasi, karier, atau lowongan..." />
        <CommandList>
          <CommandEmpty>Tidak ditemukan hasil yang cocok.</CommandEmpty>

          <CommandGroup heading="Menu & Fitur Utama">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
              <span>Dashboard Utama</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/careers"))}>
              <Compass className="mr-2 h-4 w-4 text-primary" />
              <span>Career GPS (Katalog Karier)</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/careers/compare"))}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Bandingkan Jalur Karier</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/scanner"))}>
              <FileSearch className="mr-2 h-4 w-4 text-primary" />
              <span>Resume & CV Skill Gap Scanner</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/calculator"))}>
              <Calculator className="mr-2 h-4 w-4 text-primary" />
              <span>Kalkulator Gaji & Take Home Pay Tech</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/roadmap"))}>
              <Map className="mr-2 h-4 w-4 text-primary" />
              <span>Roadmap Belajar & Study Planner</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/simulator"))}>
              <BriefcaseBusiness className="mr-2 h-4 w-4 text-primary" />
              <span>Work Simulator</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/portfolio"))}>
              <FolderKanban className="mr-2 h-4 w-4 text-primary" />
              <span>Portofolio Karya</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/jobs"))}>
              <Building2 className="mr-2 h-4 w-4 text-primary" />
              <span>Peluang Kerja & Magang</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/interview"))}>
              <MessageSquareQuote className="mr-2 h-4 w-4 text-primary" />
              <span>Mock Interview Simulator</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/progress"))}>
              <BarChart3 className="mr-2 h-4 w-4 text-primary" />
              <span>Progres, Lencana & Sertifikat</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4 text-primary" />
              <span>Profil & Pengaturan</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Jalur Karier Teknologi">
            {careers.map((c) => (
              <CommandItem
                key={c.id}
                value={`karier ${c.title} ${c.skills.join(" ")}`}
                onSelect={() => runCommand(() => router.push(`/careers/${c.id}`))}
              >
                <c.icon className="mr-2 h-4 w-4 text-primary" />
                <span>{c.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tantangan Work Simulator">
            {simulations.map((s) => (
              <CommandItem
                key={s.id}
                value={`simulasi ${s.title} ${s.company.name} ${s.skills.join(" ")}`}
                onSelect={() => runCommand(() => router.push(`/simulator/${s.id}`))}
              >
                <BriefcaseBusiness className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {s.title} — <span className="text-xs text-muted-foreground">{s.company.name}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Lowongan Kerja & Magang">
            {jobs.map((j) => (
              <CommandItem
                key={j.id}
                value={`lowongan kerja ${j.title} ${j.company.name} ${j.workplace}`}
                onSelect={() => runCommand(() => router.push("/jobs"))}
              >
                <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {j.title} — <span className="text-xs text-muted-foreground">{j.company.name}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Aksi Cepat">
            <CommandItem
              onSelect={() =>
                runCommand(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>Ganti ke Tema {resolvedTheme === "dark" ? "Terang (Light)" : "Gelap (Dark)"}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/p/${publicSlug}`))}
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Buka Halaman Portofolio Publik</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
