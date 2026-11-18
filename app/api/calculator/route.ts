import { NextResponse } from "next/server";
import { z } from "zod";
import { errorResponse, readJson, validationError } from "@/lib/server/api";
import { careers, getCareer } from "@/lib/data/careers";

const LEVEL_MULTIPLIERS = {
  junior: 0.85,
  mid: 1.4,
  senior: 2.3,
} as const;

const REGION_MULTIPLIERS = {
  jabodetabek: 1.1,
  bandung: 0.9,
  surabaya: 0.88,
  yogya: 0.8,
  "remote-global": 2.1,
} as const;

const PTKP_THRESHOLDS_JT = {
  tk0: 5.4,
  k0: 5.85,
  k1: 6.3,
} as const;

const calculatorSchema = z.object({
  careerId: z.string().default("web-developer"),
  level: z.enum(["junior", "mid", "senior"]).default("junior"),
  region: z
    .enum(["jabodetabek", "bandung", "surabaya", "yogya", "remote-global"])
    .default("jabodetabek"),
  ptkp: z.enum(["tk0", "k0", "k1"]).default("tk0"),
  customGrossMillions: z.number().min(1).max(200).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const parsed = calculatorSchema.safeParse(body ?? {});
    if (!parsed.success) {
      return validationError(parsed.error, "Parameter kalkulator gaji tidak valid.");
    }

    const { careerId, level, region, ptkp, customGrossMillions } = parsed.data;
    const career = getCareer(careerId) || careers[0];

    const levelMult = LEVEL_MULTIPLIERS[level];
    const regionMult = REGION_MULTIPLIERS[region];
    const ptkpThreshold = PTKP_THRESHOLDS_JT[ptkp];

    const baseMid = (career.salary.min + career.salary.max) / 2;
    // PF-017: Bulatkan rekomendasi ke kelipatan 0.5 juta agar selaras dengan step slider
    const recommendedGross =
      Math.round(baseMid * levelMult * regionMult * 2) / 2;
    const gross = customGrossMillions ?? recommendedGross;

    // 1. Potongan BPJS Kesehatan (1% ditanggung karyawan, plafon upah Rp12 juta)
    const bpjsKesehatan = Math.min(gross, 12) * 0.01;
    // 2. Potongan BPJS Ketenagakerjaan: JHT (2%) + JP (1% plafon upah Rp10 juta)
    const bpjsJht = gross * 0.02;
    const bpjsJp = Math.min(gross, 10) * 0.01;
    const totalBpjs = bpjsKesehatan + bpjsJht + bpjsJp;

    // 3. Estimasi PPh 21 Ilustratif (5 pita sederhana untuk edukasi perencanaan karier)
    let taxRate = 0;
    if (gross > ptkpThreshold) {
      if (gross <= 8.55) taxRate = 0.015;
      else if (gross <= 12) taxRate = 0.035;
      else if (gross <= 18) taxRate = 0.06;
      else if (gross <= 28) taxRate = 0.09;
      else taxRate = 0.13;
    }
    const pph21 = gross * taxRate;

    const totalDeduction = totalBpjs + pph21;
    const takeHomePay = Math.max(0, gross - totalDeduction);
    const annualCompensation = takeHomePay * 12 + gross; // 12x THP + 1x THR

    return NextResponse.json({
      ok: true,
      calculation: {
        modelType: "illustrative-estimate",
        disclaimer:
          "Estimasi ilustratif untuk perencanaan karier menggunakan 5 pita tarif penyederhanaan, bukan perhitungan payroll resmi DJP.",
        careerId: career.id,
        careerTitle: career.title,
        recommendedGross,
        gross,
        deductions: {
          bpjsKesehatan: Number(bpjsKesehatan.toFixed(3)),
          bpjsJht: Number(bpjsJht.toFixed(3)),
          bpjsJp: Number(bpjsJp.toFixed(3)),
          totalBpjs: Number(totalBpjs.toFixed(3)),
          taxRatePercent: Number((taxRate * 100).toFixed(1)),
          pph21: Number(pph21.toFixed(3)),
          totalDeduction: Number(totalDeduction.toFixed(3)),
        },
        takeHomePay: Number(takeHomePay.toFixed(3)),
        annualCompensation: Number(annualCompensation.toFixed(3)),
        budget503020: {
          needs: Number((takeHomePay * 0.5).toFixed(3)),
          wants: Number((takeHomePay * 0.3).toFixed(3)),
          savings: Number((takeHomePay * 0.2).toFixed(3)),
        },
        trajectory: [
          {
            year: "Tahun 1 (Junior)",
            gross: Math.round(baseMid * 0.85 * regionMult * 2) / 2,
          },
          {
            year: "Tahun 2",
            gross: Math.round(baseMid * 1.1 * regionMult * 2) / 2,
          },
          {
            year: "Tahun 3 (Mid)",
            gross: Math.round(baseMid * 1.45 * regionMult * 2) / 2,
          },
          {
            year: "Tahun 4",
            gross: Math.round(baseMid * 1.85 * regionMult * 2) / 2,
          },
          {
            year: "Tahun 5 (Senior)",
            gross: Math.round(baseMid * 2.35 * regionMult * 2) / 2,
          },
        ],
      },
    });
  } catch (error) {
    console.error("[POST /api/calculator]", error);
    return errorResponse("Gagal menghitung simulasi gaji di server.", 500);
  }
}
