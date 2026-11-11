import type { CareerId } from "@/lib/types";

export interface FlashQuizQuestion {
  id: string;
  careerId: CareerId | "general";
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skillTag: string;
}

export const dailyQuizPool: FlashQuizQuestion[] = [
  /* General / Logic */
  {
    id: "quiz-gen-1",
    careerId: "general",
    question: "Apa tujuan utama dari prinsip DRY (Don't Repeat Yourself) dalam pengembangan software?",
    options: [
      "Mengurangi penggunaan RAM dan memori server saat runtime",
      "Mencegah duplikasi kode sehingga lebih mudah di-maintain dan minim bug saat ada perubahan",
      "Mempercepat proses compile dengan menghapus spasi dan komentar",
      "Membuat kode hanya bisa dibaca oleh mesin",
    ],
    correctIndex: 1,
    explanation: "Prinsip DRY menekankan bahwa setiap bagian dari pengetahuan atau logika sistem harus memiliki representasi tunggal dan tegas dalam basis kode.",
    skillTag: "Clean Code",
  },
  {
    id: "quiz-gen-2",
    careerId: "general",
    question: "Dalam version control Git, apa fungsi dari perintah 'git pull origin main'?",
    options: [
      "Menghapus branch lokal dan menggantinya dengan repository remote",
      "Mengirim perubahan lokal ke server remote",
      "Mengambil perubahan terbaru dari remote dan langsung menggabungkannya (merge) ke branch lokal aktif",
      "Membuat branch baru dari main",
    ],
    correctIndex: 2,
    explanation: "'git pull' merupakan singkatan dari 'git fetch' yang diikuti oleh 'git merge', menarik commit terbaru dari remote repository.",
    skillTag: "Git",
  },

  /* Web Developer */
  {
    id: "quiz-wd-1",
    careerId: "web-developer",
    question: "Perhatikan cuplikan React berikut. Mengapa nilai count tidak langsung berubah di baris console.log?",
    codeSnippet: `const [count, setCount] = useState(0);\nconst handleClick = () => {\n  setCount(count + 1);\n  console.log(count);\n};`,
    options: [
      "Karena ada bug di compiler JavaScript",
      "State update di React bersifat asinkron dan baru diterapkan pada re-render berikutnya",
      "Karena useState hanya bisa membaca angka bertipe string",
      "Fungsi handleClick harus dibuat async",
    ],
    correctIndex: 1,
    explanation: "Pemanggilan setter state (setCount) menjadwalkan update di React. Nilai 'count' di dalam scope fungsi saat ini masih mereferensikan snapshot nilai pada saat render tersebut.",
    skillTag: "React",
  },
  {
    id: "quiz-wd-2",
    careerId: "web-developer",
    question: "Dalam CSS Grid Layout, apa arti unit 'fr' pada 'grid-template-columns: 1fr 2fr'?",
    options: [
      "Frame rate dari animasi CSS",
      "Fraksi (fraction) dari sisa ruang kosong yang tersedia di kontainer",
      "Font resolution dari ukuran teks",
      "Fixed ratio terhadap lebar layar",
    ],
    correctIndex: 1,
    explanation: "Unit 'fr' merepresentasikan bagian fraksional dari ruang yang tersedia dalam kontainer grid setelah ruang berukuran tetap dialokasikan.",
    skillTag: "HTML & CSS",
  },

  /* UI/UX Designer */
  {
    id: "quiz-ux-1",
    careerId: "ui-ux-designer",
    question: "Dalam Laws of UX, apa yang dijelaskan oleh 'Fitts's Law'?",
    options: [
      "Pengguna menghabiskan lebih banyak waktu di situs lain daripada situsmu",
      "Waktu untuk menjangkau suatu target dipengaruhi oleh jarak dan ukuran target tersebut",
      "Mata manusia cenderung memindai halaman membentuk huruf F",
      "Desain yang indah selalu lebih mudah digunakan",
    ],
    correctIndex: 1,
    explanation: "Fitts's Law menyatakan bahwa semakin besar dan semakin dekat target klik/sentuh ke posisi kursor atau jempol pengguna, semakin cepat dan mudah target tersebut diakses.",
    skillTag: "UX Principles",
  },
  {
    id: "quiz-ux-2",
    careerId: "ui-ux-designer",
    question: "Apa tujuan utama penggunaan Auto Layout di Figma?",
    options: [
      "Mengubah format file Figma menjadi kode HTML secara otomatis",
      "Membuat frame dan komponen yang responsif menyesuaikan ukuran konten di dalamnya",
      "Mendeteksi kesalahan kontras warna secara otomatis",
      "Menyinkronkan file desain dengan Google Drive",
    ],
    correctIndex: 1,
    explanation: "Auto Layout di Figma bekerja mirip CSS Flexbox, memungkinkan komponen dan layout membesar/mengecil dinamis saat isi teks atau elemen bertambah.",
    skillTag: "Figma",
  },

  /* QA Engineer */
  {
    id: "quiz-qa-1",
    careerId: "qa-engineer",
    question: "Jika sebuah field input password menerima 6 hingga 12 karakter, nilai berapa yang diuji pada Boundary Value Analysis (BVA)?",
    options: [
      "0, 1, 100",
      "5, 6, 7, 11, 12, 13",
      "6, 9, 12",
      "Semua angka dari 1 sampai 100",
    ],
    correctIndex: 1,
    explanation: "Boundary Value Analysis menguji nilai tepat pada batas minimum dan maksimum serta tepat satu langkah di luar batas (5, 6, 7 dan 11, 12, 13) karena kesalahan kode paling sering terjadi di titik transisi batas.",
    skillTag: "Test Case Design",
  },

  /* Data Analyst */
  {
    id: "quiz-da-1",
    careerId: "data-analyst",
    question: "Kapan fungsi agregasi SQL memerlukan klausa 'GROUP BY'?",
    options: [
      "Ketika kita hanya ingin mengurutkan data dari terbesar ke terkecil",
      "Ketika kita memilih kolom non-agregasi bersamaan dengan fungsi agregasi (SUM, COUNT, AVG)",
      "Hanya ketika tabel memiliki lebih dari 1 juta baris",
      "Ketika menggunakan filter WHERE dengan angka negatif",
    ],
    correctIndex: 1,
    explanation: "GROUP BY digunakan untuk mengelompokkan baris yang memiliki nilai sama di kolom tertentu sehingga fungsi agregat seperti SUM() atau COUNT() dapat dihitung per kelompok.",
    skillTag: "SQL",
  },

  /* Business Analyst */
  {
    id: "quiz-ba-1",
    careerId: "business-analyst",
    question: "Dalam penulisan User Story, apa kepanjangan dari akronim kualitas 'INVEST'?",
    options: [
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Integrated, Networked, Verified, Evaluated, Standard, Targeted",
      "Important, Necessary, Valid, Effective, Secure, Timely",
      "Internal, New, Variable, Efficient, Simple, Tested",
    ],
    correctIndex: 0,
    explanation: "INVEST adalah pedoman standar industri untuk memastikan user story berkualitas: Independent, Negotiable, Valuable, Estimable, Small, dan Testable.",
    skillTag: "Agile",
  },

  /* Mobile Developer */
  {
    id: "quiz-md-1",
    careerId: "mobile-developer",
    question: "Di framework Flutter, apa perbedaan mendasar antara StatelessWidget dan StatefulWidget?",
    options: [
      "StatelessWidget hanya untuk teks, StatefulWidget untuk gambar",
      "StatelessWidget tidak memiliki state internal yang bisa berubah selama runtime; StatefulWidget memiliki State object yang bisa berubah via setState()",
      "StatefulWidget hanya bisa berjalan di Android, tidak di iOS",
      "StatelessWidget tidak bisa menerima parameter konstruktor",
    ],
    correctIndex: 1,
    explanation: "StatelessWidget bersifat statis/immutable. Sedangkan StatefulWidget dapat mengubah antarmuka layarnya saat terjadi interaksi pengguna dengan memanggil setState().",
    skillTag: "Flutter",
  },
];

export function getDailyQuizForUser(careerId?: CareerId | null): FlashQuizQuestion[] {
  const matching = dailyQuizPool.filter(
    (q) => q.careerId === "general" || (careerId && q.careerId === careerId)
  );

  // Take 3 questions: general first + 2 career specific
  const selected = matching.slice(0, 3);
  if (selected.length < 3) {
    return dailyQuizPool.slice(0, 3);
  }
  return selected;
}
