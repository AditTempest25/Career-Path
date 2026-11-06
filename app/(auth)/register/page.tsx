"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/lib/store";
import { emailPattern, FieldError, PasswordInput } from "@/components/app/auth-fields";
import { cn } from "@/lib/utils";

function passwordStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthLabel = ["Sangat lemah", "Lemah", "Cukup", "Kuat", "Sangat kuat"];
const strengthColor = ["bg-destructive", "bg-destructive", "bg-warning", "bg-success", "bg-success"];

export default function RegisterPage() {
  const { register } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const strength = passwordStrength(form.password);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Nama minimal 2 karakter.";
    if (!emailPattern.test(form.email)) next.email = "Masukkan email yang valid.";
    if (form.password.length < 8) next.password = "Kata sandi minimal 8 karakter.";
    if (form.confirm !== form.password) next.confirm = "Konfirmasi kata sandi tidak cocok.";
    if (!agree) next.agree = "Kamu perlu menyetujui syarat & ketentuan.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      const res = register({ name: form.name, email: form.email, password: form.password });
      setLoading(false);
      if (!res.ok) {
        setErrors({ form: res.error });
        return;
      }
      toast.success("Akun berhasil dibuat! Yuk, kenali dirimu dulu.");
    }, 600);
  };

  return (
    <div>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">Buat akun</h1>
      <p className="mt-1 text-sm text-muted-foreground">Gratis, tanpa kartu kredit.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        {errors.form && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.form}{" "}
            <Link href="/login" className="font-semibold underline">
              Masuk
            </Link>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Nama lengkap</Label>
          <Input id="name" autoComplete="name" placeholder="Nama kamu" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} />
          <FieldError message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="nama@email.com" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Kata sandi</Label>
          <PasswordInput id="password" autoComplete="new-password" placeholder="Minimal 8 karakter" value={form.password} onChange={set("password")} aria-invalid={!!errors.password} />
          {form.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={cn("h-1 flex-1 rounded-full", i < strength ? strengthColor[strength] : "bg-muted")} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{strengthLabel[strength]}</p>
            </div>
          )}
          <FieldError message={errors.password} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Konfirmasi kata sandi</Label>
          <PasswordInput id="confirm" autoComplete="new-password" placeholder="Ulangi kata sandi" value={form.confirm} onChange={set("confirm")} aria-invalid={!!errors.confirm} />
          <FieldError message={errors.confirm} />
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(v === true)} className="mt-0.5" />
            <Label htmlFor="agree" className="text-sm font-normal leading-snug text-muted-foreground">
              Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi PathForge.
            </Label>
          </div>
          <FieldError message={errors.agree} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Daftar
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
