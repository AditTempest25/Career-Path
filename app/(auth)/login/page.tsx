"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, KeyRound, Loader2, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/store";
import { Divider, emailPattern, FieldError, PasswordInput } from "@/components/app/auth-fields";

export default function LoginPage() {
  const { login, loginDemo } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  // Modal Informasi Pemulihan Akun (PF-001: Pemulihan mandiri tanpa kanal email terverifikasi dinonaktifkan)
  const [forgotOpen, setForgotOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!emailPattern.test(email)) next.email = "Masukkan email yang valid.";
    if (!password) next.password = "Kata sandi wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    toast.success("Selamat datang kembali!");
  };

  const onDemo = async () => {
    setDemoLoading(true);
    const res = await loginDemo();
    setDemoLoading(false);

    if (!res.ok) {
      toast.error(res.error || "Gagal memuat akun demo.");
      return;
    }
    toast.success("Masuk dengan sesi demo terisolasi!");
    router.replace("/dashboard");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
            Masuk
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Lanjutkan perjalanan kariermu.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
          <ShieldCheck className="h-3.5 w-3.5" /> Server Auth
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        {errors.form && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.form}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
          />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Kata sandi</Label>
            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline"
              onClick={() => setForgotOpen(true)}
            >
              Lupa kata sandi?
            </button>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
          <FieldError message={errors.password} />
        </div>
        <Button type="submit" className="w-full" disabled={loading || demoLoading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Masuk
        </Button>
      </form>

      <Divider label="atau" />

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={onDemo}
        disabled={loading || demoLoading}
      >
        {demoLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
        Coba dengan akun demo
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Daftar gratis
        </Link>
      </p>

      {/* Modal Informasi Pemulihan Kata Sandi (PF-001) */}
      {forgotOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3
                    id="forgot-dialog-title"
                    className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground"
                  >
                    Pemulihan Kata Sandi
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Kebijakan keamanan akun PathForge
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup dialog pemulihan kata sandi"
                onClick={() => setForgotOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
              <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/5 p-3.5 text-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">
                    Pemulihan Mandiri Dinonaktifkan pada Mode Demo
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Demi keamanan akun dan mencegah pengambilalihan akun tanpa verifikasi, fitur reset kata sandi melalui OTP dinonaktifkan karena kanal pengiriman email terverifikasi belum dihubungkan.
                  </p>
                </div>
              </div>

              <p>
                Jika kamu sedang mengevaluasi aplikasi atau lupa kata sandi akun pengujian:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Gunakan tombol <strong>Coba dengan akun demo</strong> untuk langsung masuk ke sesi demo terisolasi.
                </li>
                <li>
                  Jika masih masuk di perangkat lain, ubah kata sandi melalui menu{" "}
                  <strong>Profil &amp; Pengaturan &rarr; Keamanan &amp; Kata Sandi</strong> atau unduh cadangan progres (<code>.json</code>).
                </li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setForgotOpen(false)}
              >
                Tutup
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setForgotOpen(false);
                  onDemo();
                }}
              >
                Masuk Akun Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
