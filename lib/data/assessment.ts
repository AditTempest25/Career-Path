import type { AssessmentQuestion, CareerId } from "@/lib/types";
import { careerIds } from "@/lib/data/careers";

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "Aktivitas mana yang paling membuatmu lupa waktu?",
    options: [
      { id: "a", label: "Membuat sesuatu yang bisa langsung dilihat dan dipakai orang", scores: { "web-developer": 3, "mobile-developer": 3 } },
      { id: "b", label: "Menggambar, menata tampilan, atau memilih warna", scores: { "ui-ux-designer": 4 } },
      { id: "c", label: "Mencari kesalahan kecil yang terlewat oleh orang lain", scores: { "qa-engineer": 4 } },
      { id: "d", label: "Mengulik angka dan menemukan pola", scores: { "data-analyst": 4 } },
      { id: "e", label: "Berdiskusi dan merapikan ide yang berantakan", scores: { "business-analyst": 4 } },
    ],
  },
  {
    id: "q2",
    question: "Saat menghadapi masalah, kamu cenderung…",
    options: [
      { id: "a", label: "Langsung mencoba berbagai solusi sampai berhasil", scores: { "web-developer": 3, "mobile-developer": 2 } },
      { id: "b", label: "Bertanya pada orang yang mengalaminya untuk memahami akar masalah", scores: { "ui-ux-designer": 3, "business-analyst": 2 } },
      { id: "c", label: "Mengumpulkan data terlebih dahulu sebelum memutuskan", scores: { "data-analyst": 3, "business-analyst": 1 } },
      { id: "d", label: "Memecahnya jadi langkah kecil dan mengecek satu per satu", scores: { "qa-engineer": 3, "web-developer": 1 } },
    ],
  },
  {
    id: "q3",
    question: "Mata pelajaran atau topik yang paling kamu nikmati?",
    options: [
      { id: "a", label: "Matematika & statistika", scores: { "data-analyst": 3, "qa-engineer": 1 } },
      { id: "b", label: "Seni, desain, atau psikologi", scores: { "ui-ux-designer": 3 } },
      { id: "c", label: "Ekonomi, bisnis, atau manajemen", scores: { "business-analyst": 3, "data-analyst": 1 } },
      { id: "d", label: "Komputer & teknologi", scores: { "web-developer": 2, "mobile-developer": 2, "qa-engineer": 1 } },
    ],
  },
  {
    id: "q4",
    question: "Lingkungan kerja seperti apa yang kamu sukai?",
    options: [
      { id: "a", label: "Fokus mendalam, banyak waktu mengerjakan sendiri", scores: { "web-developer": 2, "mobile-developer": 2, "data-analyst": 1 } },
      { id: "b", label: "Kolaboratif, sering bertemu banyak orang", scores: { "business-analyst": 3, "ui-ux-designer": 2 } },
      { id: "c", label: "Terstruktur dengan proses dan standar yang jelas", scores: { "qa-engineer": 3, "business-analyst": 1 } },
      { id: "d", label: "Campuran antara riset dan presentasi", scores: { "data-analyst": 2, "ui-ux-designer": 2 } },
    ],
  },
  {
    id: "q5",
    question: "Hasil kerja yang paling membuatmu bangga adalah…",
    options: [
      { id: "a", label: "Aplikasi yang berjalan mulus di HP orang lain", scores: { "mobile-developer": 4 } },
      { id: "b", label: "Website yang cepat dan dipakai banyak orang", scores: { "web-developer": 4 } },
      { id: "c", label: "Desain yang membuat pengguna berkata 'wah, gampang banget!'", scores: { "ui-ux-designer": 4 } },
      { id: "d", label: "Laporan yang mengubah keputusan perusahaan", scores: { "data-analyst": 3, "business-analyst": 2 } },
      { id: "e", label: "Rilis produk tanpa bug kritis", scores: { "qa-engineer": 4 } },
    ],
  },
  {
    id: "q6",
    question: "Seberapa nyaman kamu dengan coding?",
    helper: "Tidak ada jawaban benar atau salah, semua bisa dipelajari.",
    options: [
      { id: "a", label: "Sangat tertarik, ingin coding setiap hari", scores: { "web-developer": 3, "mobile-developer": 3 } },
      { id: "b", label: "Oke, selama untuk mengolah data atau otomatisasi", scores: { "data-analyst": 2, "qa-engineer": 2 } },
      { id: "c", label: "Sedikit saja, lebih suka sisi visual atau strategi", scores: { "ui-ux-designer": 2, "business-analyst": 2 } },
      { id: "d", label: "Belum pernah, tapi penasaran", scores: { "web-developer": 1, "qa-engineer": 1, "ui-ux-designer": 1, "business-analyst": 1 } },
    ],
  },
  {
    id: "q7",
    question: "Teman-temanmu biasanya mengenalmu sebagai orang yang…",
    options: [
      { id: "a", label: "Teliti dan detail", scores: { "qa-engineer": 3, "data-analyst": 1 } },
      { id: "b", label: "Kreatif dan punya selera estetika", scores: { "ui-ux-designer": 3 } },
      { id: "c", label: "Logis dan suka mengutak-atik teknologi", scores: { "web-developer": 2, "mobile-developer": 2 } },
      { id: "d", label: "Komunikatif dan bisa menengahi", scores: { "business-analyst": 3 } },
      { id: "e", label: "Kritis dan suka bertanya 'kenapa?'", scores: { "data-analyst": 2, "business-analyst": 1, "ui-ux-designer": 1 } },
    ],
  },
  {
    id: "q8",
    question: "Jika diberi proyek bebas selama sebulan, kamu akan membuat…",
    options: [
      { id: "a", label: "Aplikasi mobile untuk komunitas", scores: { "mobile-developer": 3, "ui-ux-designer": 1 } },
      { id: "b", label: "Website portofolio atau toko online", scores: { "web-developer": 3 } },
      { id: "c", label: "Riset pengguna dan redesain aplikasi favorit", scores: { "ui-ux-designer": 3 } },
      { id: "d", label: "Analisis data tren media sosial", scores: { "data-analyst": 3 } },
      { id: "e", label: "Rencana digitalisasi untuk UMKM keluarga", scores: { "business-analyst": 3 } },
    ],
  },
];

export function calculateScores(answers: Record<string, string>) {
  const raw = Object.fromEntries(careerIds.map((id) => [id, 0])) as Record<CareerId, number>;
  const max = Object.fromEntries(careerIds.map((id) => [id, 0])) as Record<CareerId, number>;

  for (const q of assessmentQuestions) {
    for (const id of careerIds) {
      max[id] += Math.max(0, ...q.options.map((o) => o.scores[id] ?? 0));
    }
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    if (!chosen) continue;
    for (const [id, val] of Object.entries(chosen.scores)) {
      raw[id as CareerId] += val ?? 0;
    }
  }

  const result = {} as Record<CareerId, number>;
  for (const id of careerIds) {
    // Skala 40–98 agar hasil terasa realistis dan memotivasi
    const ratio = max[id] ? raw[id] / max[id] : 0;
    result[id] = Math.round(40 + ratio * 58);
  }
  return result;
}

export function rankCareers(scores: Record<CareerId, number>) {
  return (Object.entries(scores) as [CareerId, number][]).sort((a, b) => b[1] - a[1]);
}
