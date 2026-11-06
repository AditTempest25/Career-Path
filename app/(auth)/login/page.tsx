"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!emailPattern.test(email)) next.email = "Masukkan email yang valid.";
    if (!password) next.password = "Kata sandi wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // Simulasi latensi jaringan
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) {
        setErrors({ form: res.error });
        return;
      }
      toast.success("Selamat datang kembali!");
    }, 500);
  };

  const onDemo = () => {
    loginDemo();
    toast.success("Masuk dengan akun demo");
    router.replace("/dashboard");
  };

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">Masuk</h1>
      <p className="mt-1 text-sm text-muted-foreground">Lanjutkan perjalanan kariermu.</p>

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
              onClick={() => toast.info("Fitur reset kata sandi akan tersedia setelah backend siap.")}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Masuk
        </Button>
      </form>

      <Divider label="atau" />

      <Button variant="outline" className="w-full gap-2" onClick={onDemo}>
        <Sparkles className="h-4 w-4 text-primary" />
        Coba dengan akun demo
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Daftar gratis
        </Link>
      </p>
    </div>
  );
}
