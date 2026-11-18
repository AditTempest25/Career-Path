import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                Kebijakan Privasi PathForge
              </h1>
              <p className="text-xs text-muted-foreground">
                Berlaku untuk lingkungan demonstrasi akademik & portofolio PathForge
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">1. Tujuan Aplikasi</h2>
              <p>
                PathForge adalah aplikasi web simulasi perencanaan karier (Career GPS) dan latihan proyek kerja (Work Simulator) yang dikembangkan untuk keperluan akademik dan demonstrasi portofolio. Jangan memasukkan data pribadi sensitif, nomor identitas resmi, atau dokumen rahasia perusahaan.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">2. Penyimpanan Data & Persistensi</h2>
              <p>
                Data akun, progres roadmap, hasil simulasi, dan preferensi disimpan pada peramban lokal (<code>localStorage</code>) serta penyimpanan file sementara di server. Pada lingkungan serverless seperti Vercel, data server bersifat sementara (ephemeral) dan dapat ter-reset saat instance server dimulai ulang. Pengguna dapat mengunduh cadangan progres (<code>.json</code>) kapan saja di halaman Pengaturan.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">3. Visibilitas Portofolio Publik & Leaderboard</h2>
              <p>
                Anda memegang kendali penuh atas privasi profil melalui menu <strong>Profil &amp; Pengaturan</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Portofolio Publik (<code>/p/[username]</code>):</strong> Jika dinonaktifkan, server menolak akses pihak ketiga dan hanya pemilik akun yang sedang masuk yang dapat melihat pratinjau.
                </li>
                <li>
                  <strong>Papan Peringkat (Leaderboard):</strong> Akun baru secara bawaan tidak ditampilkan ke pengguna lain di Leaderboard kecuali opsi visibilitas diaktifkan.
                </li>
              </ul>
            </section>

            <section className="space-y-1.5">
              <h2 className="font-semibold text-foreground">4. Penghapusan Akun & Hak Pengguna</h2>
              <p>
                Anda dapat mereset progres belajar atau menghapus akun secara permanen melalui menu <strong>Profil &amp; Pengaturan &rarr; Zona Bahaya</strong>. Penghapusan akun akan membersihkan kredensial, progres, sesi aktif, dan rekaman terkait di server serta peramban.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
