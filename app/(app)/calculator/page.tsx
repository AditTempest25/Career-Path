"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Compass,
  DollarSign,
  Info,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PageHeader } from "@/components/app/shared";
import { useApp } from "@/lib/store";
import { careers, getCareer } from "@/lib/data/careers";
import type { CareerId } from "@/lib/types";
import { cn } from "@/lib/utils";

type LevelKey = "junior" | "mid" | "senior";
type RegionKey = "jabodetabek" | "bandung" | "surabaya" | "yogya" | "remote-global";
type PtkpKey = "tk0" | "k0" | "k1";

const LEVELS: { key: LevelKey; label: string; years: string; mult: number }[] = [
  { key: "junior", label: "Junior / Fresh Grad", years: "0–1 tahun", mult: 0.85 },
  { key: "mid", label: "Mid-Level", years: "1–3 tahun", mult: 1.4 },
  { key: "senior", label: "Senior / Lead", years: "3–5+ tahun", mult: 2.3 },
];

const REGIONS: { key: RegionKey; label: string; note: string; mult: number }[] = [
  { key: "jabodetabek", label: "Jabodetabek", note: "Pusat korporat & startup", mult: 1.1 },
  { key: "bandung", label: "Bandung", note: "Tech hub Jawa Barat", mult: 0.9 },
  { key: "surabaya", label: "Surabaya / Malang", note: "Jawa Timur", mult: 0.88 },
  { key: "yogya", label: "Yogyakarta / Semarang", note: "Jawa Tengah & DIY", mult: 0.8 },
  { key: "remote-global", label: "Remote Luar Negeri", note: "Singapura / Australia / US", mult: 2.1 },
];

const PTKP_OPTIONS: { key: PtkpKey; label: string; desc: string; thresholdJt: number }[] = [
  { key: "tk0", label: "TK/0", desc: "Belum menikah, tanpa tanggungan", thresholdJt: 5.4 },
  { key: "k0", label: "K/0", desc: "Menikah, tanpa tanggungan", thresholdJt: 5.85 },
  { key: "k1", label: "K/1", desc: "Menikah, 1 tanggungan", thresholdJt: 6.3 },
];

function formatRupiah(amountInMillions: number): string {
  const full = Math.round(amountInMillions * 1_000_000);
  return "Rp" + full.toLocaleString("id-ID");
}

export default function SalaryCalculatorPage() {
  const { data } = useApp();
  const [selectedCareerId, setSelectedCareerId] = useState<CareerId>(
    data.activeCareer || "web-developer"
  );
  const [level, setLevel] = useState<LevelKey>("junior");
  const [region, setRegion] = useState<RegionKey>("jabodetabek");
  const [ptkp, setPtkp] = useState<PtkpKey>("tk0");

  const career = getCareer(selectedCareerId) || careers[0];
  const levelObj = LEVELS.find((l) => l.key === level)!;
  const regionObj = REGIONS.find((r) => r.key === region)!;
  const ptkpObj = PTKP_OPTIONS.find((p) => p.key === ptkp)!;

  // Base midpoint from career salary
  const baseMid = (career.salary.min + career.salary.max) / 2;
  const recommendedGross = Number((baseMid * levelObj.mult * regionObj.mult).toFixed(1));

  const [customGross, setCustomGross] = useState<number>(recommendedGross);

  useEffect(() => {
    setCustomGross(recommendedGross);
  }, [recommendedGross]);

  // Deductions calculation (in million IDR)
  // 1. BPJS Kesehatan (1% employee share, capped at 12jt wage base = Rp120k)
  const bpjsKesehatan = Math.min(customGross, 12) * 0.01;
  // 2. BPJS Ketenagakerjaan: JHT (2%) + JP (1% capped at ~10jt wage base)
  const bpjsJht = customGross * 0.02;
  const bpjsJp = Math.min(customGross, 10) * 0.01;
  const totalBpjs = bpjsKesehatan + bpjsJht + bpjsJp;

  // 3. Estimasi PPh 21 (TER / Tarif Efektif Rata-rata bulanan sederhana)
  let taxRate = 0;
  if (customGross > ptkpObj.thresholdJt) {
    if (customGross <= 8) taxRate = 0.015;
    else if (customGross <= 12) taxRate = 0.035;
    else if (customGross <= 18) taxRate = 0.06;
    else if (customGross <= 28) taxRate = 0.09;
    else taxRate = 0.13;
  }
  const pph21 = customGross * taxRate;

  const totalDeduction = totalBpjs + pph21;
  const takeHomePay = Math.max(0, customGross - totalDeduction);
  const annualCompensation = takeHomePay * 12 + customGross; // 12 bulan THP + 1x THR

  // 50/30/20 Budget rule
  const budgetNeeds = takeHomePay * 0.5;
  const budgetWants = takeHomePay * 0.3;
  const budgetSavings = takeHomePay * 0.2;

  // 5-Year trajectory
  const trajectory = [
    { year: "Tahun 1 (Junior)", gross: Number((baseMid * 0.85 * regionObj.mult).toFixed(1)) },
    { year: "Tahun 2", gross: Number((baseMid * 1.1 * regionObj.mult).toFixed(1)) },
    { year: "Tahun 3 (Mid)", gross: Number((baseMid * 1.45 * regionObj.mult).toFixed(1)) },
    { year: "Tahun 4", gross: Number((baseMid * 1.85 * regionObj.mult).toFixed(1)) },
    { year: "Tahun 5 (Senior)", gross: Number((baseMid * 2.35 * regionObj.mult).toFixed(1)) },
  ];
  const maxTrajectory = Math.max(...trajectory.map((t) => t.gross));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Kalkulator Gaji & Take Home Pay Tech"
        description="Simulasikan estimasi gaji bersih (Take Home Pay), potongan BPJS & PPh 21, serta proyeksi pertumbuhan penghasilan karier teknologi di Indonesia."
        actions={
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href="/jobs">
              <Building2 className="h-4 w-4 text-primary" /> Lihat Lowongan Aktif
            </Link>
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Kolom Kiri: Parameter Konfigurasi (7 Kolom) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
            {/* Pilih Jalur Karier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-2.5">
                1. Pilih Spesialisasi Karier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {careers.map((c) => {
                  const active = c.id === selectedCareerId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCareerId(c.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-medium transition-all",
                        active
                          ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/20 font-semibold"
                          : "border-border bg-background hover:border-primary/40 text-foreground"
                      )}
                    >
                      <c.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{c.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pilih Level Pengalaman */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-2.5">
                2. Tingkat Pengalaman (Senioritas)
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {LEVELS.map((l) => {
                  const active = l.key === level;
                  return (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => setLevel(l.key)}
                      className={cn(
                        "rounded-xl border p-3 text-left transition-all",
                        active
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <div className="font-semibold text-xs text-foreground">{l.label}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{l.years}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pilih Wilayah Kerja */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-2.5">
                3. Lokasi / Wilayah Perusahaan
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {REGIONS.map((r) => {
                  const active = r.key === region;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRegion(r.key)}
                      className={cn(
                        "rounded-xl border p-3 text-left transition-all flex items-center justify-between",
                        active
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <div>
                        <div className="font-semibold text-xs text-foreground">{r.label}</div>
                        <div className="text-[10px] text-muted-foreground">{r.note}</div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {r.mult}x
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider Penyesuaian Gaji Kotor */}
            <div className="pt-2 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-foreground block">
                    Sesuaikan Nominal Gaji Kotor (Gross):
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Rekomendasi pasar untuk profil ini: <strong>{formatRupiah(recommendedGross)}</strong>
                  </span>
                </div>
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-primary">
                  {formatRupiah(customGross)}
                </span>
              </div>

              <Slider
                value={[customGross]}
                min={3}
                max={45}
                step={0.5}
                onValueChange={(v) => setCustomGross(v[0])}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Rp3.000.000</span>
                <span>Rp20.000.000</span>
                <span>Rp45.000.000</span>
              </div>
            </div>

            {/* Pilih Status PTKP */}
            <div className="pt-2 border-t border-border">
              <label className="text-xs font-semibold text-foreground block mb-2">
                Status PTKP (Penghasilan Tidak Kena Pajak):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PTKP_OPTIONS.map((p) => {
                  const active = p.key === ptkp;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPtkp(p.key)}
                      className={cn(
                        "rounded-xl border p-2.5 text-left transition-all",
                        active
                          ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <div className="font-bold text-xs text-foreground">{p.label}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5-Year Trajectory Card */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                  Proyeksi Pertumbuhan Gaji 5 Tahun ({career.title})
                </h3>
              </div>
              <Badge variant="outline" className="text-[10px]">
                {regionObj.label}
              </Badge>
            </div>

            <div className="space-y-3 pt-2">
              {trajectory.map((item) => {
                const widthPct = Math.round((item.gross / maxTrajectory) * 100);
                return (
                  <div key={item.year} className="space-y-1 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-muted-foreground">{item.year}</span>
                      <span className="font-semibold text-foreground">{formatRupiah(item.gross)} / bln</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rincian Slip Gaji & Take Home Pay (5 Kolom) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Slip THP Utama */}
          <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-md space-y-6">
            <div className="rounded-xl bg-primary p-5 text-primary-foreground text-center space-y-1">
              <span className="text-xs uppercase tracking-wider opacity-85">
                Estimasi Take Home Pay (Bersih / Bulan)
              </span>
              <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold">
                {formatRupiah(takeHomePay)}
              </p>
              <span className="text-[11px] opacity-80 block pt-1">
                ~{Math.round((takeHomePay / customGross) * 100)}% dari Gaji Kotor ({formatRupiah(customGross)})
              </span>
            </div>

            {/* Rincian Potongan */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-muted-foreground text-[11px]">
                Rincian Komponen Bulanan
              </h4>

              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Gaji Pokok + Tunjangan Tetap (Gross)</span>
                <span className="font-semibold text-foreground">{formatRupiah(customGross)}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border text-destructive">
                <span>Potongan BPJS Kesehatan (1%)</span>
                <span>- {formatRupiah(bpjsKesehatan)}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border text-destructive">
                <span>Potongan BPJS TK JHT & JP (3%)</span>
                <span>- {formatRupiah(bpjsJht + bpjsJp)}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-border text-destructive">
                <span>Estimasi Pajak PPh 21 ({ptkpObj.label})</span>
                <span>- {formatRupiah(pph21)}</span>
              </div>

              <div className="flex justify-between pt-2 font-bold text-sm text-success">
                <span>Gaji Bersih Diterima (THP)</span>
                <span>{formatRupiah(takeHomePay)}</span>
              </div>
            </div>

            {/* Kompensasi Tahunan */}
            <div className="rounded-xl border border-border bg-muted/40 p-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-foreground block">Estimasi Total Tahunan</span>
                <span className="text-[11px] text-muted-foreground">12x Gaji Bersih + 1x THR Keagamaan</span>
              </div>
              <span className="font-bold text-sm text-primary">
                {formatRupiah(annualCompensation)}
              </span>
            </div>
          </div>

          {/* Alokasi Gaji 50/30/20 */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                Rekomendasi Alokasi Bulanan (50/30/20)
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Saran pembagian pos keuangan sehat dari Take Home Pay kamu:
            </p>

            <div className="space-y-3 text-xs pt-1">
              <div className="rounded-xl border border-border bg-background p-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">50% Kebutuhan Pokok</span>
                  <span className="text-[11px] text-muted-foreground">Sewa kos/rumah, makan, transportasi</span>
                </div>
                <span className="font-bold text-foreground">{formatRupiah(budgetNeeds)}</span>
              </div>

              <div className="rounded-xl border border-border bg-background p-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">30% Gaya Hidup & Belajar</span>
                  <span className="text-[11px] text-muted-foreground">Hiburan, hobi, buku & sertifikasi</span>
                </div>
                <span className="font-bold text-foreground">{formatRupiah(budgetWants)}</span>
              </div>

              <div className="rounded-xl border border-success/30 bg-success/5 p-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-success block">20% Tabungan & Investasi</span>
                  <span className="text-[11px] text-muted-foreground">Dana darurat, reksa dana, saham</span>
                </div>
                <span className="font-bold text-success">{formatRupiah(budgetSavings)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
