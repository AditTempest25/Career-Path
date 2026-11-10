"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp, DEMO_EMAIL } from "@/lib/store";
import { Divider, emailPattern, FieldError, PasswordInput } from "@/components/app/auth-fields";

export default function LoginPage() {
  const { login, loginDemo } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  // State Modal Lupa Kata Sandi (Reset Password via Backend OTP)
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<"request" | "reset">("request");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [devOtpPreview, setDevOtpPreview] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

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
    toast.success("Masuk dengan akun demo (Sesi Server Aktif)");
    router.replace("/dashboard");
  };

  const openForgotModal = () => {
    setForgotEmail(email || DEMO_EMAIL);
    setForgotStep("request");
    setOtpCode("");
    setNewPassword("");
    setDevOtpPreview(null);
    setForgotError(null);
    setForgotOpen(true);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    if (!emailPattern.test(forgotEmail)) {
      setForgotError("Masukkan alamat email yang valid.");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email: forgotEmail }),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        devOtpCode?: string;
      };

      if (!res.ok || !payload.ok) {
        setForgotError(payload.error || "Gagal membuat kode OTP.");
        setForgotLoading(false);
        return;
      }

      setDevOtpPreview(payload.devOtpCode || null);
      if (payload.devOtpCode) {
        setOtpCode(payload.devOtpCode);
      }
      setForgotStep("reset");
      toast.success("Kode OTP pemulihan berhasil dibuat!");
    } catch {
      setForgotError("Gagal menghubungi server.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    if (otpCode.trim().length !== 6) {
      setForgotError("Kode OTP harus terdiri dari 6 digit angka.");
      return;
    }
    if (newPassword.length < 8) {
      setForgotError("Kata sandi baru minimal 8 karakter.");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email: forgotEmail,
          code: otpCode,
          newPassword,
        }),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok || !payload.ok) {
        setForgotError(payload.error || "Gagal mereset kata sandi.");
        setForgotLoading(false);
        return;
      }

      toast.success(payload.message || "Kata sandi berhasil diperbarui!");
      setEmail(forgotEmail);
      setPassword(newPassword);
      setForgotOpen(false);
    } catch {
      setForgotError("Gagal menghubungi server.");
    } finally {
      setForgotLoading(false);
    }
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
              onClick={openForgotModal}
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

      {/* Modal Reset Kata Sandi (Terhubung ke Backend /api/auth/forgot-password) */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                    Reset Kata Sandi
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {forgotStep === "request"
                      ? "Masukkan email terdaftar untuk mendapatkan kode OTP."
                      : "Masukkan kode OTP 6 digit dan kata sandi baru kamu."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {forgotError && (
              <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {forgotError}
              </div>
            )}

            {forgotStep === "request" ? (
              <form onSubmit={handleRequestOtp} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email Akun</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setForgotOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" size="sm" disabled={forgotLoading}>
                    {forgotLoading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                    Kirim Kode OTP
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
                {devOtpPreview && (
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs">
                    <p className="font-semibold text-primary">
                      Simulasi Email Server (Mode Lokal):
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      Kode OTP untuk <span className="font-medium text-foreground">{forgotEmail}</span> adalah:{" "}
                      <span className="rounded bg-background px-1.5 py-0.5 font-mono font-bold text-foreground">
                        {devOtpPreview}
                      </span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp-code">Kode OTP (6 Digit)</Label>
                  <Input
                    id="otp-code"
                    placeholder="123456"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="font-mono tracking-widest"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-reset-pw">Kata Sandi Baru</Label>
                  <PasswordInput
                    id="new-reset-pw"
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setForgotStep("request")}
                  >
                    Ganti Email
                  </Button>
                  <Button type="submit" size="sm" disabled={forgotLoading}>
                    {forgotLoading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                    Simpan Kata Sandi Baru
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
