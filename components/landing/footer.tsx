import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Produk: [
    { label: "Fitur Utama", href: "/#features" },
    { label: "Cara Kerja", href: "/#how-it-works" },
    { label: "Jalur Karier", href: "/#careers" },
    { label: "Testimoni", href: "/#testimonials" },
  ],
  Eksplorasi: [
    { label: "Mulai Gratis", href: "/register" },
    { label: "Masuk Akun", href: "/login" },
    { label: "Katalog Karier", href: "/careers" },
    { label: "Work Simulator", href: "/simulator" },
  ],
  Fitur: [
    { label: "Roadmap Belajar", href: "/roadmap" },
    { label: "Scan CV & Gap", href: "/scanner" },
    { label: "Kalkulator Gaji", href: "/calculator" },
    { label: "Mock Interview", href: "/interview" },
  ],
  Legal: [
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Career GPS &amp; Work Simulator untuk membantu mahasiswa, fresh graduate, dan career switcher menemukan jalur karier serta membangun portofolio terverifikasi.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground">
                {category}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 PathForge. Proyek Demonstrasi Akademik &amp; Portofolio.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privasi
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Ketentuan
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Demo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
