import type { CareerId, UserData } from "@/lib/types";
import { getCareer } from "@/lib/data/careers";
import { getReadiness, getSkillLevels } from "@/lib/progress";

export type JobType = "Full-time" | "Magang" | "Kontrak";
export type WorkplaceType = "Remote" | "Hybrid (Jakarta)" | "Onsite (Bandung)" | "Hybrid (Surabaya)";

export interface Job {
  id: string;
  careerId: CareerId;
  title: string;
  company: {
    name: string;
    industry: string;
    initials: string;
    location: string;
  };
  type: JobType;
  workplace: WorkplaceType;
  salary: { min: number; max: number };
  requiredSkills: string[];
  minReadinessScore: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  postedDaysAgo: number;
}

export const jobs: Job[] = [
  /* Web Developer */
  {
    id: "job-wd-tokokita",
    careerId: "web-developer",
    title: "Junior Frontend Developer (React)",
    company: {
      name: "TokoKita",
      industry: "E-Commerce",
      initials: "TK",
      location: "Jakarta Selatan",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 7, max: 11 },
    requiredSkills: ["HTML & CSS", "JavaScript", "React"],
    minReadinessScore: 60,
    description:
      "TokoKita membuka kesempatan bagi lulusan baru atau career switcher untuk bergabung dengan tim frontend platform promo & checkout. Kamu akan berkolaborasi dengan Product Designer dan Backend Engineer.",
    responsibilities: [
      "Mengimplementasikan komponen UI React dari desain Figma dengan standar aksesibilitas tinggi.",
      "Mengintegrasikan REST API katalog dan keranjang belanja.",
      "Melakukan debugging dan optimasi performa halaman mobile.",
    ],
    requirements: [
      "Memahami dasar HTML semantik, modern CSS (Flexbox/Grid), dan JavaScript ES6+.",
      "Pengalaman membuat aplikasi dengan React (proyek simulasi atau mandiri).",
      "Memiliki portofolio kode (GitHub) yang dapat ditinjau.",
    ],
    perks: ["Asuransi kesehatan lengkap", "Tunjangan laptop & WFH", "Akses bootcamp internal gratis"],
    postedDaysAgo: 2,
  },
  {
    id: "job-wd-pasardigital",
    careerId: "web-developer",
    title: "Web Developer Intern",
    company: {
      name: "PasarDigital",
      industry: "Marketplace & UMKM",
      initials: "PD",
      location: "Bandung",
    },
    type: "Magang",
    workplace: "Remote",
    salary: { min: 3.5, max: 5 },
    requiredSkills: ["HTML & CSS", "JavaScript", "Git"],
    minReadinessScore: 40,
    description:
      "Program magang 6 bulan bergengsi dengan bimbingan senior engineer langsung. Peluang konversi menjadi karyawan tetap sangat tinggi untuk performa memuaskan.",
    responsibilities: [
      "Membantu pengembangan landing page dan widget interaktif toko UMKM.",
      "Membuat unit test dasar dan dokumentasi komponen.",
    ],
    requirements: [
      "Familiar dengan Git, HTML, dan dasar JavaScript.",
      "Semangat belajar tinggi dan aktif berkomunikasi dalam tim jarak jauh.",
    ],
    perks: ["Uang saku bulanan kompetitif", "Mentorship 1-on-1 mingguan", "Sertifikat magang resmi"],
    postedDaysAgo: 4,
  },

  /* UI/UX Designer */
  {
    id: "job-ux-sehatyuk",
    careerId: "ui-ux-designer",
    title: "Junior UI/UX Designer",
    company: {
      name: "SehatYuk",
      industry: "Healthtech",
      initials: "SY",
      location: "Jakarta Pusat",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 6.5, max: 10 },
    requiredSkills: ["Figma", "User Research", "Wireframing"],
    minReadinessScore: 55,
    description:
      "SehatYuk sedang mendesain ulang pengalaman pendaftaran pasien dan konsultasi dokter online. Kami mencari desainer muda yang berempati tinggi pada kebutuhan pengguna.",
    responsibilities: [
      "Merancang wireframe, user flow, dan interactive prototype di Figma.",
      "Membantu proses usability testing dan mengolah insight temuan pengguna.",
      "Mendokumentasikan komponen design system.",
    ],
    requirements: [
      "Menguasai Figma (Auto-layout, Components, Variants).",
      "Memiliki minimal 1 case study end-to-end yang menceritakan proses desain.",
      "Kemampuan komunikasi dan presentasi yang baik.",
    ],
    perks: ["Free telemedicine & lab test", "Fasilitas makan siang kantor", "Budget pelatihan desain"],
    postedDaysAgo: 1,
  },
  {
    id: "job-ux-kreatifindo",
    careerId: "ui-ux-designer",
    title: "Product Design Trainee",
    company: {
      name: "KreatifLab",
      industry: "Digital Agency",
      initials: "KL",
      location: "Surabaya",
    },
    type: "Magang",
    workplace: "Remote",
    salary: { min: 3, max: 4.5 },
    requiredSkills: ["Figma", "Wireframing"],
    minReadinessScore: 45,
    description:
      "Dapatkan pengalaman menangani ragam klien korporat dan startup dalam program inkubator desain selama 4 bulan.",
    responsibilities: [
      "Membantu pembuatan UI mockup untuk web aplikasi klien.",
      "Melakukan riset kompetitor dan visual benchmark.",
    ],
    requirements: [
      "Portofolio desain UI di Figma / Behance / Dribbble.",
      "Teliti terhadap tata letak, kontras warna, dan hierarki tipografi.",
    ],
    perks: ["Jam kerja fleksibel", "Jaringan klien korporat", "Mentoring dari Lead Designer"],
    postedDaysAgo: 5,
  },

  /* QA Engineer */
  {
    id: "job-qa-paylink",
    careerId: "qa-engineer",
    title: "Junior QA Engineer (Manual & API)",
    company: {
      name: "PayLink",
      industry: "Fintech & Payments",
      initials: "PL",
      location: "Jakarta Selatan",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 6.5, max: 11 },
    requiredSkills: ["Test Case Design", "Bug Reporting", "API Testing"],
    minReadinessScore: 60,
    description:
      "Menjaga keandalan transaksi jutaan pengguna PayLink. Kamu akan merancang test plan menyeluruh untuk fitur transfer, QRIS, dan pinjaman digital.",
    responsibilities: [
      "Menulis test scenario & test cases positif/negatif dengan teknik boundary value.",
      "Menguji endpoint REST API menggunakan Postman.",
      "Membuat bug report terperinci di Jira dan berkoordinasi dengan developer.",
    ],
    requirements: [
      "Paham siklus pengujian software (STLC).",
      "Kritis dan teliti terhadap celah kelemahan aplikasi.",
      "Familiar dengan Postman & query database SQL dasar.",
    ],
    perks: ["BPJS & Asuransi Swasta", "Bonus kinerja kuartalan", "Subsidi pulsa & internet"],
    postedDaysAgo: 3,
  },

  /* Data Analyst */
  {
    id: "job-da-kopinusantara",
    careerId: "data-analyst",
    title: "Junior Data Analyst",
    company: {
      name: "KopiNusantara",
      industry: "F&B & Retail Chain",
      initials: "KN",
      location: "Jakarta Barat",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 7, max: 12 },
    requiredSkills: ["SQL", "Spreadsheet", "Visualisasi Data"],
    minReadinessScore: 65,
    description:
      "Mengolah jutaan baris data transaksi 200+ gerai kopi di seluruh Indonesia untuk menemukan insight penjualan, promosi terlaris, dan retensi pelanggan.",
    responsibilities: [
      "Menjalankan query SQL untuk mengekstrak dan membersihkan data penjualan.",
      "Membangun dashboard performa interaktif di Looker Studio / Tableau.",
      "Menyajikan ringkasan temuan mingguan kepada tim marketing dan operasional.",
    ],
    requirements: [
      "Mahir SQL (JOIN, GROUP BY, Window Functions).",
      "Fasih spreadsheet analitis (Pivot, XLOOKUP).",
      "Pernah mengerjakan proyek analisis data nyata.",
    ],
    perks: ["Free coffee setiap hari di seluruh gerai", "Lingkungan kerja kasual & seru", "Asuransi kesehatan"],
    postedDaysAgo: 2,
  },

  /* Business Analyst */
  {
    id: "job-ba-bankdigital",
    careerId: "business-analyst",
    title: "Associate Business Analyst",
    company: {
      name: "NusaBank Digital",
      industry: "Banking & Financial Services",
      initials: "NB",
      location: "Jakarta Pusat",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 7.5, max: 13 },
    requiredSkills: ["Requirement Gathering", "Process Modeling", "Agile"],
    minReadinessScore: 60,
    description:
      "Jadilah jembatan strategis antara divisi produk perbankan dengan tim engineering dalam mengembangkan fitur tabungan dan deposito digital masa depan.",
    responsibilities: [
      "Menyelenggarakan workshop kebutuhan dan memetakan alur proses bisnis (BPMN).",
      "Menulis user stories & acceptance criteria dengan format Given-When-Then.",
      "Mengawal sprint review dan mengelola backlog fitur.",
    ],
    requirements: [
      "Kemampuan berpikir logis, terstruktur, dan komunikasi interpersonal yang kuat.",
      "Memahami metodologi Scrum / Agile.",
      "Mampu menerjemahkan masalah bisnis menjadi spesifikasi sistem.",
    ],
    perks: ["Gaji 14 bulan + bonus tahunan", "Tunjangan transportasi", "Jenjang karier cepat di industri perbankan"],
    postedDaysAgo: 1,
  },

  /* Mobile Developer */
  {
    id: "job-md-antarcepat",
    careerId: "mobile-developer",
    title: "Mobile App Developer (Flutter)",
    company: {
      name: "AntarCepat",
      industry: "Logistics & Tech",
      initials: "AC",
      location: "Tangerang / BSD",
    },
    type: "Full-time",
    workplace: "Hybrid (Jakarta)",
    salary: { min: 7.5, max: 12 },
    requiredSkills: ["Flutter", "Dart", "REST API"],
    minReadinessScore: 65,
    description:
      "Kembangkan aplikasi kurir dan customer AntarCepat yang digunakan oleh puluhan ribu kurir setiap hari untuk pengiriman paket instan.",
    responsibilities: [
      "Mengembangkan fitur mobile baru berbasis Flutter & Dart.",
      "Integrasi geolocation API, peta, dan tracking status pengiriman real-time.",
      "Menjaga kestabilan aplikasi dan meminimalkan crash rate.",
    ],
    requirements: [
      "Pengalaman membangun aplikasi Android/iOS dengan Flutter.",
      "Faham state management (Provider/Riverpod/Bloc).",
      "Memiliki aplikasi demo atau repository GitHub yang bisa diuji.",
    ],
    perks: ["Fasilitas gym kantor", "Tunjangan kesehatan & kacamata", "Fleksibilitas jam kerja"],
    postedDaysAgo: 3,
  },
];

export function calculateJobMatch(job: Job, data: UserData): {
  score: number;
  label: "Sangat Cocok" | "Cukup Cocok" | "Perlu Peningkatan";
  matchedSkills: string[];
  missingSkills: string[];
} {
  const isSameCareer = data.activeCareer === job.careerId;
  const userReadiness = data.activeCareer ? getReadiness(data.activeCareer, data) : 50;

  // Cek skill yang cocok dari modul selesai & simulasi
  const career = getCareer(job.careerId);
  const userSkillLevels = career ? getSkillLevels(career, data) : [];

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const req of job.requiredSkills) {
    const found = userSkillLevels.find((s) => s.skill.toLowerCase() === req.toLowerCase());
    if (found && found.level >= 40) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  }

  const skillRatio = job.requiredSkills.length > 0 ? matchedSkills.length / job.requiredSkills.length : 0;
  const readinessFactor = Math.min(1.2, userReadiness / Math.max(1, job.minReadinessScore));

  let finalScore = 40;
  if (isSameCareer) {
    finalScore = Math.round(userReadiness * 0.5 + skillRatio * 40 + (readinessFactor >= 1 ? 10 : 0));
  } else {
    finalScore = Math.round(30 + skillRatio * 35);
  }

  finalScore = Math.max(25, Math.min(98, finalScore));

  let label: "Sangat Cocok" | "Cukup Cocok" | "Perlu Peningkatan";
  if (finalScore >= 75) label = "Sangat Cocok";
  else if (finalScore >= 55) label = "Cukup Cocok";
  else label = "Perlu Peningkatan";

  return {
    score: finalScore,
    label,
    matchedSkills,
    missingSkills,
  };
}
