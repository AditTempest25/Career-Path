"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Check,
  KeyRound,
  Loader2,
  Lock,
  RotateCcw,
  Save,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import type { Profile, UserStatus } from "@/lib/types";

export default function SettingsPage() {
  const router = useRouter();
  const {
    user,
    data,
    updateAccount,
    changePassword,
    updateProfile,
    updateSettings,
    resetProgress,
    deleteAccount,
  } = useApp();

  // Profile Form State
  const [profileForm, setProfileForm] = useState<Profile>(data.profile);
  const [accountName, setAccountName] = useState(user?.name || "");
  const [accountEmail, setAccountEmail] = useState(user?.email || "");

  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    setTimeout(() => {
      updateProfile(profileForm);
      updateAccount({ name: accountName, email: accountEmail });
      setSavingProfile(false);
      toast.success("Profil berhasil diperbarui!");
    }, 400);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error("Harap isi semua kolom kata sandi.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      const res = changePassword(oldPassword, newPassword);
      setSavingPassword(false);
      if (res.ok) {
        toast.success("Kata sandi berhasil diubah!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.error || "Gagal mengubah kata sandi.");
      }
    }, 500);
  };

  const handleReset = () => {
    if (confirm("Apakah kamu yakin ingin mereset seluruh progres modul dan simulasi? Data ini tidak dapat dikembalikan.")) {
      resetProgress();
      toast.info("Seluruh progres belajar telah direset.");
    }
  };

  const handleDelete = () => {
    if (confirm("PERINGATAN: Akun ini beserta seluruh datanya akan dihapus permanen. Lanjutkan?")) {
      deleteAccount();
      toast.info("Akun berhasil dihapus.");
      router.replace("/");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Profil & Pengaturan"
        description="Kelola informasi publik, preferensi notifikasi, dan keamanan akun PathForge kamu."
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Profil & Akun (8 Kolom) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Card Info Profil */}
          <form onSubmit={handleProfileSubmit} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
                Informasi Profil & Portofolio
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accName">Nama Lengkap</Label>
                  <Input
                    id="accName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accEmail">Alamat Email</Label>
                  <Input
                    id="accEmail"
                    type="email"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline">Headline Profesional</Label>
                <Input
                  id="headline"
                  placeholder="Contoh: Aspiring Frontend Developer | UI Enthusiast"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Tentang Saya (Bio)</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  placeholder="Ceritakan latar belakang minat dan tujuan kariermu..."
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi / Domisili</Label>
                  <Input
                    id="location"
                    placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Latar Belakang Pendidikan</Label>
                  <Input
                    id="education"
                    placeholder="Contoh: S1 Teknik Informatika"
                    value={profileForm.education}
                    onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="github">Link GitHub / Git</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/username"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">Link LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-border pt-4">
              <Button type="submit" disabled={savingProfile} className="gap-2">
                {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Simpan Perubahan Profil
              </Button>
            </div>
          </form>

          {/* Card Ganti Kata Sandi */}
          <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <KeyRound className="h-5 w-5 text-primary" />
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
                Keamanan & Kata Sandi
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPw">Kata Sandi Saat Ini</Label>
                <Input
                  id="oldPw"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPw">Kata Sandi Baru</Label>
                  <Input
                    id="newPw"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confPw">Ulangi Kata Sandi Baru</Label>
                  <Input
                    id="confPw"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-border pt-4">
              <Button type="submit" variant="outline" disabled={savingPassword} className="gap-2">
                {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Perbarui Kata Sandi
              </Button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Preferensi & Zona Bahaya (4 Kolom) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Card Preferensi Notifikasi */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold">
                Preferensi Notifikasi
              </h3>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Pengingat Mingguan</p>
                  <p className="text-muted-foreground">Kirim email progres & target belajar</p>
                </div>
                <Switch
                  checked={data.settings.weeklyReminder}
                  onCheckedChange={(v) => updateSettings({ weeklyReminder: v })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Pembaruan Modul Baru</p>
                  <p className="text-muted-foreground">Info saat ada simulasi baru</p>
                </div>
                <Switch
                  checked={data.settings.emailNotifications}
                  onCheckedChange={(v) => updateSettings({ emailNotifications: v })}
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
            <div className="flex items-center gap-2 text-destructive border-b border-destructive/20 pb-4">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold">
                Zona Bahaya
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-foreground">Reset Progres Belajar</p>
                <p className="text-[11px] text-muted-foreground">
                  Hapus data modul selesai, simulasi, dan histori XP tanpa menghapus akun.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="mt-2 text-xs w-full gap-1.5 text-warning border-warning/30 hover:bg-warning/10"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Progres Saja
                </Button>
              </div>

              <div className="border-t border-destructive/20 pt-4">
                <p className="text-xs font-semibold text-foreground">Hapus Akun Permanen</p>
                <p className="text-[11px] text-muted-foreground">
                  Menghapus kredensial akun dan seluruh data lokal di perangkat ini.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="mt-2 text-xs w-full gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus Akun Saya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
