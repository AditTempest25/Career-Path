"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useApp } from "@/lib/store";

const navLinks = [
  { href: "#features", label: "Fitur" },
  { href: "#how-it-works", label: "Cara Kerja" },
  { href: "#careers", label: "Jalur Karier" },
  { href: "#testimonials", label: "Testimoni" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, ready } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" aria-label="PathForge home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {ready && user ? (
            <Button size="sm" asChild className="gap-2">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" /> Ke Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Mulai Gratis</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-1"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              {ready && user ? (
                <Button size="sm" asChild className="w-full">
                  <Link href="/dashboard">Ke Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/login">Masuk</Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href="/register">Mulai Gratis</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
