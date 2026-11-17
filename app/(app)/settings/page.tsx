"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Check,
  DatabaseBackup,
  Download,
  KeyRound,
  Loader2,
  Lock,
  RotateCcw,
  Save,
  Shield,
  Trash2,
  Upload,
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
import type { Profile, UserData, UserStatus } from "@/lib/types";

export default function SettingsPage() {
  const router = useRouter();
  const {
    user,
    data,
    updateAccount,
    changePassword,
    updateProfile,
    updateSettings,
    importBackupData,
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
  const [restoringBackup, setRestoringBackup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportBackup = async () => {
    try {
      const res = await fetch("/api/user/backup", { credentials: "include" });
      let backupObj: unknown;
      if (res.ok) {
        const json = (await res.json()) as { backup?: unknown };
        backupObj = json.backup;
      } else {
        backupObj = {
          app: "PathForge",
          version: 1,
          exportedAt: new Date().toISOString(),
          user: { name: user?.name || "User", email: user?.email || "" },
          data,
        };
      }

      const blob = new Blob([JSON.stringify(backupObj, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = (user?.name || "user")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const dateStr = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = `pathforge-backup-${slug}-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("File backup (.json) berhasil diunduh!");
    } catch {
      toast.error("Gagal mengunduh file backup.");
    }
  };

  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoringBackup(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        data?: Partial<UserData>;
        backup?: { data?: Partial<UserData> };
      } & Partial<UserData>;
      const rawData = parsed?.backup?.data ?? parsed?.data ?? parsed;

      const res = await importBackupData(rawData);
      if (res.ok) {
        if (rawData.profile) {
          setProfileForm((prev) => ({ ...prev, ...rawData.profile }));
        }
        toast.success("Progres berhasil dipulihkan dari file backup!");
      } else {
        toast.error(res.error || "Gagal memulihkan data backup.");
      }
    } catch {
      toast.error("File JSON tidak valid atau rusak.");
    } finally {
      setRestoringBackup(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    updateProfile(profileForm);
    const accRes = await updateAccount({ name: accountName, email: accountEmail });
    setSavingProfile(false);

    if (!accRes.ok) {
      toast.error(accRes.error || "Gagal memperbarui informasi akun.");
      return;
    }
    toast.success("Profil & akun berhasil diperbarui di server!");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
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
    const res = await changePassword(oldPassword, newPassword);
    setSavingPassword(false);

    if (res.ok) {
      toast.success("Kata sandi berhasil diubah di server!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.error || "Gagal mengubah kata sandi.");
    }
  };

  const handleReset = () => {
    if (confirm("Apakah kamu yakin ingin mereset seluruh progres modul dan simulasi? Data ini tidak dapat dikembalikan.")) {
      resetProgress();
      toast.info("Seluruh progres belajar telah direset.");
    }
  };

  const handleDelete = async () => {
    if (confirm("PERINGATAN: Akun ini beserta seluruh datanya akan dihapus permanen. Lanjutkan?")) {
      await deleteAccount();
      toast.info("Akun berhasil dihapus dari server.");
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

          {/* Card Backup & Restore JSON */}
          <div className="rounded-2xl border border-primary/25 bg-card p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <DatabaseBackup className="h-5 w-5 text-primary" />
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold">
                Cadangan & Pemulihan Data (.json)
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Simpan seluruh progres modul, nilai simulasi, dan portofolio ke file{" "}
                <code className="rounded bg-muted px-1 py-0.5">.json</code> atau pulihkan kapan saja (sangat berguna saat berpindah perangkat atau setelah server Vercel di-restart).
              </p>

              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportBackup}
                  className="w-full gap-1.5 text-xs"
                >
                  <Download className="h-3.5 w-3.5 text-primary" /> Unduh Backup Progres (.json)
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={restoringBackup}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full gap-1.5 text-xs"
                >
                  {restoringBackup ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5 text-primary" />
                  )}
                  Pulihkan dari File Backup (.json)
                </Button>
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
