import type { CriterionResult, Feedback, Simulation } from "@/lib/types";

/**
 * Mock evaluator berbasis rubrik.
 * Akan digantikan oleh penilaian AI ketika backend tersedia.
 */
export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function isValidUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function evaluateSubmission(
  sim: Simulation,
  answers: Record<string, string>
): { score: number; breakdown: CriterionResult[]; feedback: Feedback } {
  const textParts = sim.deliverables
    .filter((d) => d.type === "text")
    .map((d) => answers[d.id] ?? "");
  const text = textParts.join(" \n ").toLowerCase();
  const words = countWords(text);

  const minWords = sim.deliverables
    .filter((d) => d.type === "text")
    .reduce((sum, d) => sum + (d.minWords ?? 50), 0);

  // Faktor kelengkapan: tulisan pendek menurunkan nilai
  const lengthFactor = Math.min(1, 0.55 + 0.45 * (words / Math.max(1, minWords)));

  const linkDeliverables = sim.deliverables.filter((d) => d.type === "link");
  const validLinks = linkDeliverables.filter((d) => isValidUrl(answers[d.id] ?? "")).length;
  const linkFactor = linkDeliverables.length
    ? 0.85 + 0.15 * (validLinks / linkDeliverables.length)
    : 1;

  const breakdown: CriterionResult[] = sim.rubric.map((c) => {
    const hits = c.keywords.filter((k) => text.includes(k.toLowerCase())).length;
    const needed = Math.max(1, Math.ceil(c.keywords.length * 0.35));
    const ratio = Math.min(1, hits / needed);
    const raw = words === 0 ? 0 : c.weight * (0.35 + 0.65 * ratio) * lengthFactor * linkFactor;
    const score = Math.round(Math.min(c.weight, raw));
    return { id: c.id, label: c.label, score, max: c.weight, met: score / c.weight >= 0.7 };
  });

  const score = Math.min(100, breakdown.reduce((s, b) => s + b.score, 0));

  const strengths: string[] = [];
  const improvements: string[] = [];

  for (const b of breakdown) {
    const crit = sim.rubric.find((c) => c.id === b.id)!;
    if (b.met) strengths.push(`${crit.label}: penjelasanmu sudah kuat dan relevan.`);
    else improvements.push(crit.hint);
  }

  if (validLinks === linkDeliverables.length && linkDeliverables.length > 0) {
    strengths.push("Link hasil kerja tersedia sehingga reviewer dapat memeriksa langsung.");
  } else if (linkDeliverables.length > 0) {
    improvements.push("Sertakan link hasil kerja yang valid (diawali https://) agar karyamu bisa diperiksa.");
  }

  if (words < minWords) {
    improvements.push(
      `Penjelasanmu baru ${words} kata. Usahakan minimal ${minWords} kata agar prosesmu tergambar jelas.`
    );
  }

  let summary: string;
  if (score >= 85) {
    summary = "Luar biasa! Hasil kerjamu sudah setara standar profesional dan siap dipajang di portofolio.";
  } else if (score >= 70) {
    summary = "Kerja bagus! Kamu sudah memenuhi sebagian besar ekspektasi. Sedikit penyempurnaan akan membuatnya makin menonjol.";
  } else if (score >= 50) {
    summary = "Awal yang baik. Beberapa aspek penting masih perlu diperdalam. Pelajari masukan di bawah dan coba lagi.";
  } else {
    summary = "Jangan menyerah! Hasil kerjamu masih perlu banyak pengembangan. Ikuti petunjuk perbaikan dan kirim ulang.";
  }

  return { score, breakdown, feedback: { summary, strengths, improvements } };
}

export function scoreLabel(score: number) {
  if (score >= 85) return { label: "Sangat Baik", tone: "success" as const };
  if (score >= 70) return { label: "Baik", tone: "primary" as const };
  if (score >= 50) return { label: "Cukup", tone: "warning" as const };
  return { label: "Perlu Perbaikan", tone: "destructive" as const };
}
