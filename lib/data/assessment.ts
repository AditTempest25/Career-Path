import type { AssessmentQuestion, CareerId } from "@/lib/types";
import { careerIds } from "@/lib/data/careers";

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "Aktivitas mana yang paling membuatmu lupa waktu?",
    options: [
      {
        id: "a",
        label: "Membuat website atau aplikasi yang bisa langsung dipakai orang",
        scores: { "web-developer": 3, "mobile-developer": 3 },
      },
      {
        id: "b",
        label: "Menata tampilan visual, konten kreatif, atau menulis copywriting yang menarik",
        scores: { "ui-ux-designer": 3, "digital-marketer": 4 },
      },
      {
        id: "c",
        label: "Mengulik angka, laporan keuangan, atau menemukan pola dari data",
        scores: { "data-analyst": 3, "finance-analyst": 4 },
      },
      {
        id: "d",
        label: "Mendengarkan cerita orang, merekrut tim, atau menengahi dinamika organisasi",
        scores: { "hr-specialist": 4, "business-analyst": 2 },
      },
      {
        id: "e",
        label: "Mengatur jadwal, mengoordinasikan tim, dan memastikan target selesai tepat waktu",
        scores: { "project-manager": 4, "qa-engineer": 2, "business-analyst": 2 },
      },
    ],
  },
  {
    id: "q2",
    question: "Saat menghadapi masalah di organisasi atau proyek, kamu cenderung…",
    options: [
      {
        id: "a",
        label: "Langsung membongkar sistem teknis atau mencoba solusi sampai berhasil",
        scores: { "web-developer": 3, "mobile-developer": 2, "qa-engineer": 2 },
      },
      {
        id: "b",
        label: "Mewawancarai orang-orang yang terlibat untuk memahami kebutuhan manusia di baliknya",
        scores: { "hr-specialist": 3, "ui-ux-designer": 3, "business-analyst": 2 },
      },
      {
        id: "c",
        label: "Mengecek anggaran, angka performa, dan menghitung untung-ruginya terlebih dahulu",
        scores: { "finance-analyst": 3, "data-analyst": 3 },
      },
      {
        id: "d",
        label: "Membuat daftar tugas (timeline), membagi peran anggota, dan memantau progresnya",
        scores: { "project-manager": 4, "qa-engineer": 2 },
      },
      {
        id: "e",
        label: "Mencari cara kreatif untuk mengomunikasikan solusi ke audiens luas",
        scores: { "digital-marketer": 3, "business-analyst": 1 },
      },
    ],
  },
  {
    id: "q3",
    question: "Mata kuliah atau topik yang paling kamu nikmati?",
    options: [
      {
        id: "a",
        label: "Akuntansi, keuangan, matematika, atau statistika",
        scores: { "finance-analyst": 4, "data-analyst": 3 },
      },
      {
        id: "b",
        label: "Komunikasi, pemasaran (marketing), media sosial, atau desain visual",
        scores: { "digital-marketer": 4, "ui-ux-designer": 3 },
      },
      {
        id: "c",
        label: "Psikologi, manajemen SDM (HR), atau perilaku organisasi",
        scores: { "hr-specialist": 4, "project-manager": 1 },
      },
      {
        id: "d",
        label: "Manajemen operasional, kewirausahaan, atau strategi bisnis",
        scores: { "project-manager": 3, "business-analyst": 3 },
      },
      {
        id: "e",
        label: "Teknologi informasi, pemrograman, & rekayasa perangkat lunak",
        scores: { "web-developer": 3, "mobile-developer": 3, "qa-engineer": 2 },
      },
    ],
  },
  {
    id: "q4",
    question: "Lingkungan kerja seperti apa yang paling membuatmu berkembang?",
    options: [
      {
        id: "a",
        label: "Fokus mendalam di depan layar untuk membangun kode atau mengolah spreadsheet",
        scores: { "web-developer": 2, "mobile-developer": 2, "finance-analyst": 2, "data-analyst": 2 },
      },
      {
        id: "b",
        label: "Dinamis, kreatif, dan selalu mengikuti tren pasar atau media sosial terbaru",
        scores: { "digital-marketer": 4, "ui-ux-designer": 2 },
      },
      {
        id: "c",
        label: "Berinteraksi langsung dengan kandidat, karyawan, dan mengembangkan budaya kerja",
        scores: { "hr-specialist": 4 },
      },
      {
        id: "d",
        label: "Memimpin rapat lintas divisi, mengatur alur operasional, dan menjaga kualitas",
        scores: { "project-manager": 3, "business-analyst": 3, "qa-engineer": 2 },
      },
    ],
  },
  {
    id: "q5",
    question: "Hasil kerja yang paling membuatmu bangga adalah…",
    options: [
      {
        id: "a",
        label: "Aplikasi atau website yang berjalan mulus tanpa bug dan dipakai banyak orang",
        scores: { "web-developer": 3, "mobile-developer": 3, "qa-engineer": 3 },
      },
      {
        id: "b",
        label: "Kampanye promosi yang viral dan meningkatkan penjualan perusahaan secara drastis",
        scores: { "digital-marketer": 4 },
      },
      {
        id: "c",
        label: "Laporan anggaran & analisis finansial yang menyelamatkan efisiensi biaya perusahaan",
        scores: { "finance-analyst": 4, "data-analyst": 2 },
      },
      {
        id: "d",
        label: "Tim yang kompak, rekrutmen talenta yang tepat, dan karyawan yang betah bekerja",
        scores: { "hr-specialist": 4 },
      },
      {
        id: "e",
        label: "Proyek besar yang berhasil rilis tepat waktu sesuai anggaran dan desain yang ramah pengguna",
        scores: { "project-manager": 4, "ui-ux-designer": 2, "business-analyst": 2 },
      },
    ],
  },
  {
    id: "q6",
    question: "Bagaimana preferensimu terhadap tugas teknis (coding) vs non-teknis?",
    helper: "PathForge menyediakan jalur karier IT maupun Non-IT sesuai minatmu.",
    options: [
      {
        id: "a",
        label: "Ingin fokus penuh di jalur teknis / coding (Web, Mobile, atau QA)",
        scores: { "web-developer": 4, "mobile-developer": 4, "qa-engineer": 2 },
      },
      {
        id: "b",
        label: "Suka mengolah angka, Excel/Spreadsheet, laporan keuangan, atau SQL tanpa bikin aplikasi",
        scores: { "finance-analyst": 3, "data-analyst": 3 },
      },
      {
        id: "c",
        label: "Lebih suka bidang kreatif, komunikasi pemasaran, atau desain pengalaman pengguna",
        scores: { "digital-marketer": 3, "ui-ux-designer": 3 },
      },
      {
        id: "d",
        label: "Lebih suka manajemen manusia (HR), kepemimpinan proyek, dan analisis bisnis (100% Non-Coding)",
        scores: { "hr-specialist": 3, "project-manager": 3, "business-analyst": 3 },
      },
    ],
  },
  {
    id: "q7",
    question: "Teman-temanmu biasanya mengenalmu sebagai orang yang…",
    options: [
      {
        id: "a",
        label: "Teliti dengan angka, anggaran, dan detail kecil",
        scores: { "finance-analyst": 3, "qa-engineer": 3, "data-analyst": 2 },
      },
      {
        id: "b",
        label: "Kreatif, pandai merangkai kata, dan punya selera visual bagus",
        scores: { "digital-marketer": 3, "ui-ux-designer": 3 },
      },
      {
        id: "c",
        label: "Empatik, pendengar yang baik, dan mudah akrab dengan orang baru",
        scores: { "hr-specialist": 4 },
      },
      {
        id: "d",
        label: "Terorganisir, tegas mengatur jadwal, dan bisa diandalkan memimpin kelompok",
        scores: { "project-manager": 4, "business-analyst": 2 },
      },
      {
        id: "e",
        label: "Logis dan suka mengutak-atik gadget atau software",
        scores: { "web-developer": 3, "mobile-developer": 3 },
      },
    ],
  },
  {
    id: "q8",
    question: "Jika diberi proyek bebas selama sebulan, kamu paling tertarik membuat…",
    options: [
      {
        id: "a",
        label: "Website atau aplikasi mobile fungsional untuk memecahkan masalah sehari-hari",
        scores: { "web-developer": 3, "mobile-developer": 3 },
      },
      {
        id: "b",
        label: "Strategi konten media sosial, iklan digital, & branding untuk menaikkan omzet bisnis",
        scores: { "digital-marketer": 4 },
      },
      {
        id: "c",
        label: "Sistem rekrutmen, kurikulum pelatihan, & penilaian kinerja untuk organisasi",
        scores: { "hr-specialist": 4 },
      },
      {
        id: "d",
        label: "Perencanaan anggaran tahunan, proyeksi arus kas (cash flow), & analisis investasi",
        scores: { "finance-analyst": 4, "data-analyst": 2 },
      },
      {
        id: "e",
        label: "Rencana eksekusi proyek (Project Charter), perbaikan alur kerja, atau desain produk",
        scores: { "project-manager": 3, "business-analyst": 3, "ui-ux-designer": 2, "qa-engineer": 2 },
      },
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
