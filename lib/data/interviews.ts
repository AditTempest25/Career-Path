import type { CareerId } from "@/lib/types";

export type InterviewCategory = "hr-behavioral" | "technical" | "situational";

export interface InterviewQuestion {
  id: string;
  careerId: CareerId | "all";
  category: InterviewCategory;
  categoryLabel: string;
  question: string;
  context: string;
  expectedTimeMinutes: number;
  starGuide: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  idealAnswerKey: string[];
  recruiterTip: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  /* General HR Behavioral */
  {
    id: "int-gen-intro",
    careerId: "all",
    category: "hr-behavioral",
    categoryLabel: "HR & Perkenalan Diri",
    question: "Ceritakan tentang dirimu dan mengapa kamu tertarik berkarier di bidang ini?",
    context: "Pertanyaan pembuka paling krusial untuk mengukur kejelasan tujuan karier dan antusiasmemu.",
    expectedTimeMinutes: 2,
    starGuide: {
      situation: "Latar belakang pendidikan atau pengalaman saat ini secara ringkas.",
      task: "Momen saat kamu menemukan ketertarikan pada industri teknologi.",
      action: "Langkah nyata yang telah kamu ambil untuk belajar (kursus, modul roadmap, proyek simulasi).",
      result: "Target karier yang ingin kamu capai dan kontribusi yang ingin kamu berikan di perusahaan ini.",
    },
    idealAnswerKey: [
      "Jelaskan latar belakang dalam 30 detik tanpa mengulang seluruh isi CV.",
      "Sebutkan proyek simulasi atau aplikasi praktis yang pernah kamu selesaikan.",
      "Hubungkan keahlian barumu dengan posisi yang sedang dilamar.",
    ],
    recruiterTip:
      "Recruiter tidak hanya ingin mendengar riwayat hidupmu, melainkan benang merah kenapa kamu cocok untuk posisi ini hari ini.",
  },
  {
    id: "int-gen-challenge",
    careerId: "all",
    category: "situational",
    categoryLabel: "Problem Solving & Tantangan",
    question: "Ceritakan tantangan teknis tersulit yang pernah kamu hadapi dan bagaimana kamu menyelesaikannya?",
    context: "Menguji ketahanan mental (resilience), rasa ingin tahu, dan cara berpikir saat buntu.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Proyek atau tugas apa yang sedang dikerjakan dan masalah spesifik apa yang muncul (misal: bug, performa lambat, requirement ambigu).",
      task: "Tanggung jawabmu untuk menemukan akar masalah sebelum deadline.",
      action: "Langkah terstruktur: membaca dokumentasi, debugging log, menguji hipotesis, atau meminta saran.",
      result: "Solusi yang berhasil diterapkan, pelajaran yang dipetik, dan dampaknya pada hasil akhir.",
    },
    idealAnswerKey: [
      "Fokus pada tindakan terstrukturmu, bukan hanya mengeluhkan masalahnya.",
      "Gunakan data/fakta pendukung (misal: 'setelah dioptimasi, waktu loading turun dari 4 detik ke 1.2 detik').",
      "Sebutkan hikmah atau best practice yang kamu bawa ke proyek berikutnya.",
    ],
    recruiterTip:
      "Jawaban yang jujur tentang kegagalan awal dan bagaimana kamu bangkit jauh lebih disukai daripada jawaban klise 'saya tidak pernah punya masalah'.",
  },

  /* Web Developer */
  {
    id: "int-wd-react-state",
    careerId: "web-developer",
    category: "technical",
    categoryLabel: "Teknis Web Development",
    question: "Kapan sebaiknya kita menggunakan Local State (useState) vs Global State (Context/Redux) di React?",
    context: "Menguji pemahaman arsitektur frontend dan efisiensi manajemen data aplikasi web.",
    expectedTimeMinutes: 2,
    starGuide: {
      situation: "Aplikasi React yang memiliki banyak komponen saling berinteraksi.",
      task: "Menentukan tempat data harus disimpan agar kode bersih dan performa tidak berat.",
      action: "Gunakan useState untuk data yang hanya dibutuhkan 1-2 komponen (misal: input form, toggle dialog). Gunakan Context/Redux untuk data lintas halaman (misal: user session, dark mode, keranjang belanja).",
      result: "Mencegah terjadinya 'prop drilling' yang berlebihan dan re-render yang tidak perlu.",
    },
    idealAnswerKey: [
      "Jelaskan konsep prop drilling dengan bahasa sederhana.",
      "Sebutkan contoh konkrit penggunaan Context API (misal: tema warna, info login user).",
      "Sebutkan dampak performa jika salah meletakkan state global.",
    ],
    recruiterTip:
      "Tunjukkan bahwa kamu memahami trade-off, bukan sekadar menghafal definisi pustaka.",
  },
  {
    id: "int-wd-perf",
    careerId: "web-developer",
    category: "technical",
    categoryLabel: "Teknis Web Development",
    question: "Bagaimana strategimu mengoptimasi website yang lambat saat dibuka di smartphone?",
    context: "Sangat relevan di Indonesia karena mayoritas pengguna mengakses internet lewat jaringan seluler.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Landing page promosi yang memiliki skor Lighthouse rendah dan bounce rate tinggi.",
      task: "Meningkatkan performa Core Web Vitals (LCP, CLS, FID).",
      action: "Kompresi gambar ke WebP, terapkan lazy loading, code splitting dengan dynamic import, dan minimalkan CSS/JS yang tidak dipakai.",
      result: "Skor Lighthouse naik dari 50 ke 90+ dan halaman terasa instan di jaringan 4G.",
    },
    idealAnswerKey: [
      "Sebutkan tools audit performa (Chrome DevTools Lighthouse, Network Tab).",
      "Tekankan optimasi aset visual (gambar WebP/AVIF, responsive srcset).",
      "Jelaskan konsep code-splitting dan tree-shaking.",
    ],
    recruiterTip:
      "Senior engineer sangat menghargai junior yang peduli pada pengalaman pengguna di perangkat low-end.",
  },

  /* UI/UX Designer */
  {
    id: "int-ux-conflict",
    careerId: "ui-ux-designer",
    category: "situational",
    categoryLabel: "Kolaborasi Desain & Bisnis",
    question: "Apa yang kamu lakukan jika ide desainmu ditolak oleh Product Manager atau Developer?",
    context: "Menguji kemampuan diplomasi, fleksibilitas, dan advokasi berbasis data.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Developer mengatakan komponen desain terlalu rumit untuk sprint 2 minggu, atau PM menginginkan tombol promosi yang mengganggu estetika.",
      task: "Mencari titik temu antara pengalaman pengguna (UX), batasan teknis (feasibility), dan target bisnis (viability).",
      action: "Ajak diskusi untuk memahami akar batasan. Usulkan solusi kompromi (MVP bertahap), dan validasi dengan data uji usability pengguna jika diperlukan.",
      result: "Fitur tetap rilis tepat waktu tanpa merusak pengalaman esensial pengguna.",
    },
    idealAnswerKey: [
      "Jangan defensif; jadikan feedback sebagai masukan kolaborasi.",
      "Gunakan data riset pengguna alih-alih selera pribadi ('menurut riset, 4 dari 5 user bingung...').",
      "Pahami batasan engineering (feasibility).",
    ],
    recruiterTip:
      "Desainer hebat bukan yang paling keras mempertahankan egonya, melainkan yang paling jago memecahkan masalah bersama tim.",
  },

  /* QA Engineer */
  {
    id: "int-qa-bug-priority",
    careerId: "qa-engineer",
    category: "technical",
    categoryLabel: "Teknis Quality Assurance",
    question: "Apa perbedaan antara Bug Severity dan Bug Priority? Berikan contoh kasus nyatanya!",
    context: "Konsep fundamental QA untuk memprioritaskan perbaikan sebelum rilis produk.",
    expectedTimeMinutes: 2,
    starGuide: {
      situation: "Aplikasi e-commerce akan rilis besok sore dan ditemukan beberapa bug di staging.",
      task: "Menentukan bug mana yang harus diperbaiki malam ini vs yang bisa ditunda ke patch rilis berikutnya.",
      action: "Severity = dampak teknis pada sistem (misal crash/data corrupt). Priority = urgensi perbaikan dari kacamata bisnis.",
      result: "Contoh: Typo pada logo perusahaan di halaman utama (Severity Rendah, Priority Tinggi). Crash saat klik tombol di menu tersembunyi yang jarang dipakai (Severity Tinggi, Priority Sedang).",
    },
    idealAnswerKey: [
      "Definisi yang tepat: Severity = dampak teknis; Priority = urgensi bisnis.",
      "Contoh kontras yang jelas antara kedua matriks.",
      "Cara mengomunikasikan prioritas ke tim developer.",
    ],
    recruiterTip:
      "Pertanyaan ini sering keluar di wawancara teknis QA pertama untuk menyaring pemahaman dasar.",
  },

  /* Data Analyst */
  {
    id: "int-da-explain",
    careerId: "data-analyst",
    category: "hr-behavioral",
    categoryLabel: "Komunikasi Data (Storytelling)",
    question: "Bagaimana caramu menjelaskan insight data teknis kepada stakeholder non-teknis yang tidak paham SQL atau statistik?",
    context: "Data Analyst bernilai tinggi bukan karena rumus rumitnya, melainkan kemampuannya menggerakkan aksi bisnis.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Manajer Marketing bingung membaca laporan tabel pivot yang penuh angka persentase.",
      task: "Menyampaikan kesimpulan kampanye dan rekomendasi budget berikutnya dengan jelas.",
      action: "Hindari jargon statistik (p-value, koefisien). Gunakan analogi sehari-hari, visualisasi chart sederhana (1 chart = 1 pesan), dan langsung hubungkan ke dampak Rupiah.",
      result: "Stakeholder langsung memahami rekomendasi dan menyetujui realokasi budget 20%.",
    },
    idealAnswerKey: [
      "Mulai dari 'So What?' (apa artinya bagi bisnis mereka).",
      "Gunakan visualisasi yang intuitif daripada tabel data mentah.",
      "Berikan rekomendasi tindakan nyata, bukan sekadar memaparkan grafik.",
    ],
    recruiterTip:
      "Tunjukkan bahwa kamu adalah business partner yang solutif, bukan sekadar mesin penarik query data.",
  },

  /* Business Analyst */
  {
    id: "int-ba-ambiguity",
    careerId: "business-analyst",
    category: "situational",
    categoryLabel: "Elisitasi & Manajemen Kebutuhan",
    question: "Bagaimana pendekatanmu saat stakeholder meminta fitur yang sangat samar atau saling bertentangan?",
    context: "Skenario harian Business Analyst dalam menguraikan ekspektasi klien atau pimpinan.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Dua divisi menginginkan alur persetujuan dokumen yang berbeda di sistem baru.",
      task: "Menyelaraskan kebutuhan dan membuat spesifikasi fungsional yang disepakati bersama.",
      action: "Gelar workshop elisitasi terfokus. Gunakan teknik 5 Whys untuk menemukan akar objektif bisnis masing-masing pihak. Buat diagram alur proses (BPMN) agar terlihat titik temu.",
      result: "Tersusun BRD (Business Requirement Document) tunggal dengan prioritas yang disepakati bersama.",
    },
    idealAnswerKey: [
      "Gunakan teknik elisitasi aktif (wawancara, diagram alur, 5 Whys).",
      "Dokumentasikan asumsi dan kriteria keberhasilan secara transparan.",
      "Fokus pada tujuan bisnis akhir, bukan sekadar ego departemen.",
    ],
    recruiterTip:
      "Perusahaan mencari BA yang memiliki empati tinggi dan kemampuan mendengarkan secara aktif.",
  },

  /* Mobile Developer */
  {
    id: "int-md-offline",
    careerId: "mobile-developer",
    category: "technical",
    categoryLabel: "Teknis Mobile Development",
    question: "Bagaimana caramu merancang aplikasi mobile agar tetap nyaman dipakai saat koneksi internet terputus (Offline-First)?",
    context: "Kualitas penentu aplikasi mobile modern di pasar berkembang seperti Indonesia.",
    expectedTimeMinutes: 3,
    starGuide: {
      situation: "Pengguna sering membuka aplikasi di lift, basement, atau daerah sinyal lemah.",
      task: "Mencegah layar putih / crash saat tidak ada koneksi internet.",
      action: "Gunakan local database (Hive, SQLite, Room) sebagai single source of truth untuk tampilan UI. Data baru disimpan di lokal terlebih dahulu (optimistic update), lalu sinkronisasi ke server di background saat koneksi pulih.",
      result: "Aplikasi terasa instan dan pengguna tetap bisa mencatat transaksi tanpa hambatan.",
    },
    idealAnswerKey: [
      "Jelaskan konsep Local Database Cache vs Remote API.",
      "Sebutkan mekanisme antrian sinkronisasi (sync queue / background worker).",
      "Uraikan penanganan konflik data sederhana (misal: timestamp terakhir menang).",
    ],
    recruiterTip:
      "Pengalaman menangani kasus nyata seperti koneksi putus-nyambung menunjukkan kematangan teknis seorang mobile developer.",
  },
];

export function getInterviewQuestions(careerId?: string, category?: string) {
  return interviewQuestions.filter((q) => {
    const matchCareer = !careerId || careerId === "all" || q.careerId === "all" || q.careerId === careerId;
    const matchCat = !category || category === "all" || q.category === category;
    return matchCareer && matchCat;
  });
}
