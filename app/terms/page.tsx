import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between border-b border-border pb-6">
          <Link href="/">
            <Logo />
          </Link>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
            </Link>
          </Button>
        </header>

        <main className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Syarat &amp; Ketentuan Penggunaan PathForge
              </h1>
              <p className="text-xs text-muted-foreground">
                Ketentuan layanan simulasi edukasi & kesiapan karier PathForge
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">1. Ruang Lingkup Layanan Edukasi</h2>
              <p>
                PathForge menyediakan asesmen minat karier (Career GPS), kurikulum belajar mandiri (Roadmap), studi kasus simulasi kerja (Work Simulator), pemindai kata kunci CV, latihan wawancara STAR, dan kalkulator gaji ilustratif.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">2. Sifat Simulasi & Evaluasi Heuristik</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Work Simulator &amp; CV Scanner:</strong> Penilaian skor menggunakan rubrik heuristik otomatis (kelengkapan deliverable, jumlah kata, kata kunci teknis, dan format tautan) sebagai umpan balik latihan mandiri.
                </li>
                <li>
                  <strong>Simulasi Lamaran Kerja:</strong> Fitur lamar kerja di halaman Peluang Kerja merupakan simulasi latihan pencocokan portofolio dan tidak mengirimkan lamaran kerja nyata ke perusahaan pihak ketiga.
                </li>
                <li>
                  <strong>Kalkulator Gaji &amp; Pajak:</strong> Perhitungan Take Home Pay, BPJS, dan PPh 21 merupakan estimasi ilustratif dan bukan nasihat pajak atau keuangan resmi.
                </li>
              </ul>
            </section>

            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">3. Akun Pengujian & Sesi Demo</h2>
              <p>
                Pengguna disarankan menggunakan akun pengujian atau fitur <strong>Coba dengan akun demo</strong> yang menyediakan ruang kerja terisolasi per sesi pengunjung.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
