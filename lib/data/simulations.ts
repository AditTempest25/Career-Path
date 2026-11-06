import type { Simulation } from "@/lib/types";

export const simulations: Simulation[] = [
  /* ---------------- Web Developer ---------------- */
  {
    id: "sim-wd-landing",
    careerId: "web-developer",
    title: "Landing Page Promo Ramadan",
    company: { name: "TokoKita", industry: "E-commerce", initials: "TK" },
    role: "Junior Frontend Developer",
    difficulty: "Mudah",
    estimatedTime: "3–4 jam",
    xp: 150,
    skills: ["HTML & CSS", "JavaScript"],
    summary: "Bangun landing page promo yang responsif dan cepat untuk kampanye musiman.",
    context:
      "Tim marketing TokoKita akan meluncurkan kampanye promo Ramadan dalam 5 hari. Mereka butuh landing page sederhana berisi hero banner, daftar produk unggulan, hitung mundur promo, dan tombol menuju aplikasi. Halaman harus tampil baik di HP karena 80% traffic berasal dari mobile.",
    objectives: [
      "Layout responsif (mobile-first) dengan Flexbox atau Grid",
      "Komponen hitung mundur menggunakan JavaScript",
      "Struktur HTML semantik dan aksesibel",
      "Performa baik (gambar dioptimasi, tanpa library berat)",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link repository atau demo",
        description: "GitHub repository, CodePen, atau link deploy (Vercel/Netlify).",
        type: "link",
        placeholder: "https://github.com/username/promo-ramadan",
      },
      {
        id: "explanation",
        label: "Penjelasan teknis",
        description: "Jelaskan struktur halaman, pendekatan responsif, cara kerja countdown, dan keputusan teknis yang kamu ambil.",
        type: "text",
        minWords: 80,
        placeholder: "Saya memulai dengan pendekatan mobile-first...",
      },
    ],
    rubric: [
      { id: "responsive", label: "Desain responsif", weight: 30, keywords: ["responsif", "responsive", "mobile", "media query", "flexbox", "grid", "breakpoint"], hint: "Jelaskan bagaimana layout beradaptasi di berbagai ukuran layar (mobile-first, media query, breakpoint)." },
      { id: "semantic", label: "HTML semantik & aksesibilitas", weight: 25, keywords: ["semantik", "semantic", "header", "section", "alt", "aria", "aksesib", "accessib"], hint: "Sebutkan penggunaan tag semantik (header, main, section) dan atribut alt/aria." },
      { id: "js", label: "Logika JavaScript", weight: 25, keywords: ["javascript", "countdown", "hitung mundur", "setinterval", "date", "fungsi", "function"], hint: "Uraikan logika countdown (Date, setInterval) dan bagaimana kamu menangani promo yang sudah berakhir." },
      { id: "performance", label: "Performa", weight: 20, keywords: ["performa", "performance", "optimasi", "lazy", "webp", "kompres", "lighthouse"], hint: "Tambahkan langkah optimasi seperti lazy loading, format WebP, atau skor Lighthouse." },
    ],
    tips: [
      "Mulai dari tampilan mobile, baru tambahkan breakpoint untuk desktop.",
      "Gunakan loading=\"lazy\" untuk gambar produk.",
      "Tangani kondisi saat waktu promo sudah habis.",
    ],
  },
  {
    id: "sim-wd-api",
    careerId: "web-developer",
    title: "Halaman Daftar Produk dari API",
    company: { name: "PasarDigital", industry: "Marketplace", initials: "PD" },
    role: "Frontend Developer",
    difficulty: "Sedang",
    estimatedTime: "5–6 jam",
    xp: 250,
    skills: ["React", "JavaScript"],
    summary: "Tampilkan katalog produk dari REST API lengkap dengan pencarian, filter, dan state loading.",
    context:
      "PasarDigital sedang memigrasi halaman katalog lama ke React. Kamu ditugaskan membuat halaman daftar produk yang mengambil data dari API publik (misalnya https://dummyjson.com/products), dengan fitur pencarian, filter kategori, pagination, serta penanganan loading dan error.",
    objectives: [
      "Fetch data dari REST API dan tampilkan dalam grid",
      "Fitur pencarian dan filter kategori",
      "State loading, kosong, dan error yang jelas",
      "Struktur komponen React yang rapi dan reusable",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link repository",
        description: "Repository GitHub berisi source code dan README.",
        type: "link",
        placeholder: "https://github.com/username/katalog-produk",
      },
      {
        id: "explanation",
        label: "Penjelasan arsitektur",
        description: "Jelaskan struktur komponen, pengelolaan state, cara fetch data, dan penanganan error.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "component", label: "Struktur komponen", weight: 25, keywords: ["komponen", "component", "props", "reusable", "folder", "struktur"], hint: "Uraikan pemecahan komponen (misal ProductCard, SearchBar) dan alasan pemisahannya." },
      { id: "state", label: "State management", weight: 25, keywords: ["state", "usestate", "useeffect", "hook", "context", "query"], hint: "Jelaskan state apa saja yang dikelola dan hook yang dipakai." },
      { id: "fetch", label: "Integrasi API", weight: 25, keywords: ["fetch", "api", "async", "await", "axios", "endpoint", "json"], hint: "Jelaskan alur fetch data, parameter query, dan parsing respons." },
      { id: "ux", label: "Loading & error handling", weight: 25, keywords: ["loading", "error", "skeleton", "kosong", "empty", "retry", "try"], hint: "Tunjukkan bagaimana pengguna diberi umpan balik saat loading, data kosong, atau gagal." },
    ],
    tips: [
      "Gunakan debounce untuk input pencarian agar tidak memanggil API terlalu sering.",
      "Pisahkan logika fetch ke custom hook.",
      "Tulis README yang menjelaskan cara menjalankan proyek.",
    ],
  },

  /* ---------------- UI/UX Designer ---------------- */
  {
    id: "sim-ux-onboarding",
    careerId: "ui-ux-designer",
    title: "Redesain Onboarding Aplikasi Kesehatan",
    company: { name: "SehatYuk", industry: "Healthtech", initials: "SY" },
    role: "Junior UI/UX Designer",
    difficulty: "Mudah",
    estimatedTime: "4–5 jam",
    xp: 150,
    skills: ["User Research", "Wireframing", "Figma"],
    summary: "Kurangi drop-off pengguna baru dengan merancang ulang alur onboarding.",
    context:
      "Data SehatYuk menunjukkan 60% pengguna baru berhenti di tahap onboarding yang terdiri dari 7 layar dan meminta banyak data pribadi di awal. Product Manager memintamu merancang ulang onboarding agar lebih singkat, jelas manfaatnya, dan tetap mengumpulkan data penting.",
    objectives: [
      "Identifikasi masalah pada alur onboarding saat ini",
      "Rancang user flow baru yang lebih singkat",
      "Buat wireframe dan desain high-fidelity di Figma",
      "Jelaskan metrik untuk mengukur keberhasilan",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link file Figma",
        description: "Pastikan akses file dapat dilihat (view access).",
        type: "link",
        placeholder: "https://www.figma.com/file/...",
      },
      {
        id: "rationale",
        label: "Design rationale",
        description: "Ceritakan masalah, insight pengguna, solusi, dan cara mengukur keberhasilan.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "problem", label: "Definisi masalah", weight: 25, keywords: ["masalah", "problem", "drop", "pain point", "friction", "hambatan"], hint: "Uraikan masalah utama dan dampaknya terhadap pengguna (pain point, drop-off)." },
      { id: "user", label: "Fokus pada pengguna", weight: 25, keywords: ["pengguna", "user", "persona", "insight", "wawancara", "interview", "riset"], hint: "Sertakan insight atau persona pengguna yang mendasari keputusan desain." },
      { id: "solution", label: "Solusi desain", weight: 30, keywords: ["flow", "wireframe", "layar", "screen", "progressive", "skip", "prototype", "komponen"], hint: "Jelaskan perubahan alur (misal progressive disclosure, opsi skip) dan alasannya." },
      { id: "metric", label: "Metrik keberhasilan", weight: 20, keywords: ["metrik", "metric", "conversion", "konversi", "completion", "a/b", "ukur"], hint: "Tentukan metrik seperti completion rate atau time-to-value untuk mengukur dampak." },
    ],
    tips: [
      "Tunda pertanyaan yang tidak wajib sampai pengguna merasakan manfaat aplikasi.",
      "Tampilkan indikator progres agar pengguna tahu berapa langkah tersisa.",
      "Ceritakan proses, bukan hanya hasil akhir.",
    ],
  },
  {
    id: "sim-ux-checkout",
    careerId: "ui-ux-designer",
    title: "Usability Test Halaman Checkout",
    company: { name: "TokoKita", industry: "E-commerce", initials: "TK" },
    role: "UI/UX Designer",
    difficulty: "Sedang",
    estimatedTime: "5–6 jam",
    xp: 250,
    skills: ["User Research", "Prototyping"],
    summary: "Rencanakan usability test dan usulkan perbaikan berdasarkan temuan.",
    context:
      "Tingkat cart abandonment TokoKita mencapai 70%. Tim menduga halaman checkout membingungkan, terutama di pemilihan pengiriman dan metode pembayaran. Kamu diminta menyusun rencana usability test, menjalankannya pada 3–5 orang, lalu mengusulkan perbaikan desain.",
    objectives: [
      "Susun rencana usability test (tujuan, skenario, tugas)",
      "Jalankan tes dan rangkum temuan",
      "Prioritaskan masalah berdasarkan tingkat keparahan",
      "Usulkan desain perbaikan dalam bentuk prototype",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link prototype atau laporan",
        description: "Link Figma prototype, Notion, atau Google Docs.",
        type: "link",
      },
      {
        id: "report",
        label: "Ringkasan hasil usability test",
        description: "Jelaskan metodologi, partisipan, temuan utama, dan rekomendasi.",
        type: "text",
        minWords: 120,
      },
    ],
    rubric: [
      { id: "plan", label: "Rencana pengujian", weight: 25, keywords: ["skenario", "scenario", "tugas", "task", "partisipan", "participant", "tujuan"], hint: "Jelaskan tujuan tes, profil partisipan, dan skenario tugas yang diberikan." },
      { id: "findings", label: "Temuan", weight: 30, keywords: ["temuan", "finding", "bingung", "confus", "kesulitan", "observasi", "quote"], hint: "Sajikan temuan konkret disertai observasi atau kutipan partisipan." },
      { id: "priority", label: "Prioritisasi", weight: 20, keywords: ["prioritas", "priority", "severity", "keparahan", "dampak", "impact"], hint: "Urutkan masalah berdasarkan severity atau dampak." },
      { id: "recommendation", label: "Rekomendasi desain", weight: 25, keywords: ["rekomendasi", "recommend", "perbaikan", "prototype", "iterasi", "redesain"], hint: "Tunjukkan rekomendasi perbaikan dan bagaimana prototype menjawab temuan." },
    ],
    tips: [
      "Hindari pertanyaan yang menggiring partisipan.",
      "Minta partisipan berpikir keras (think-aloud) saat menyelesaikan tugas.",
      "Gunakan skala severity sederhana: rendah, sedang, tinggi.",
    ],
  },

  /* ---------------- QA Engineer ---------------- */
  {
    id: "sim-qa-login",
    careerId: "qa-engineer",
    title: "Test Case Fitur Login & Registrasi",
    company: { name: "PayLink", industry: "Fintech", initials: "PL" },
    role: "Junior QA Engineer",
    difficulty: "Mudah",
    estimatedTime: "3 jam",
    xp: 150,
    skills: ["Test Case Design", "Bug Reporting"],
    summary: "Rancang test case menyeluruh untuk fitur autentikasi aplikasi pembayaran.",
    context:
      "PayLink akan merilis fitur login dengan OTP dan registrasi baru minggu depan. Sebagai QA, kamu diminta menyusun test case yang mencakup skenario positif, negatif, dan edge case, termasuk validasi input, batas percobaan OTP, dan keamanan dasar.",
    objectives: [
      "Test case positif dan negatif",
      "Penerapan boundary value & equivalence partitioning",
      "Contoh bug report yang jelas",
      "Pertimbangan keamanan dasar",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link dokumen test case",
        description: "Google Sheets, TestRail, atau Notion.",
        type: "link",
      },
      {
        id: "summary",
        label: "Ringkasan strategi pengujian",
        description: "Jelaskan pendekatan, cakupan, teknik desain test case, dan contoh 1 bug report.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "coverage", label: "Cakupan skenario", weight: 30, keywords: ["positif", "positive", "negatif", "negative", "edge case", "skenario", "scenario"], hint: "Pastikan skenario positif, negatif, dan edge case tercakup." },
      { id: "technique", label: "Teknik desain test", weight: 25, keywords: ["boundary", "batas", "equivalence", "partition", "decision table"], hint: "Sebutkan teknik seperti boundary value analysis atau equivalence partitioning." },
      { id: "bug", label: "Kualitas bug report", weight: 25, keywords: ["langkah", "steps", "expected", "actual", "severity", "reproduksi", "reproduce"], hint: "Bug report sebaiknya berisi langkah reproduksi, expected vs actual result, dan severity." },
      { id: "security", label: "Aspek keamanan", weight: 20, keywords: ["keamanan", "security", "brute", "otp", "rate limit", "injection", "password"], hint: "Pertimbangkan brute force, batas percobaan OTP, dan validasi password." },
    ],
    tips: [
      "Gunakan format: ID, judul, prasyarat, langkah, data uji, expected result.",
      "Uji batas panjang input (misal password 7, 8, dan 64 karakter).",
      "Jangan lupa skenario OTP kedaluwarsa.",
    ],
  },
  {
    id: "sim-qa-automation",
    careerId: "qa-engineer",
    title: "Automation Test Alur Belanja",
    company: { name: "PasarDigital", industry: "Marketplace", initials: "PD" },
    role: "QA Automation Engineer",
    difficulty: "Sulit",
    estimatedTime: "6–8 jam",
    xp: 350,
    skills: ["Automation", "API Testing"],
    summary: "Otomatisasi skenario end-to-end dari login hingga checkout.",
    context:
      "Regression test manual PasarDigital memakan 2 hari setiap rilis. Kamu diminta membuat automation test end-to-end untuk alur utama: login, cari produk, tambah ke keranjang, dan checkout. Gunakan situs latihan https://www.saucedemo.com sebagai target.",
    objectives: [
      "Script E2E dengan Playwright, Cypress, atau Selenium",
      "Terapkan Page Object Model",
      "Assertion yang bermakna di setiap langkah",
      "Integrasi dengan CI (GitHub Actions)",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link repository",
        description: "Repository berisi script, README, dan konfigurasi CI.",
        type: "link",
      },
      {
        id: "explanation",
        label: "Penjelasan framework",
        description: "Jelaskan tools, struktur proyek, skenario yang diotomatisasi, dan cara menjalankannya.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "tool", label: "Penggunaan tools", weight: 20, keywords: ["playwright", "cypress", "selenium", "webdriver", "test runner"], hint: "Sebutkan tools yang dipakai dan alasan memilihnya." },
      { id: "pom", label: "Struktur & Page Object", weight: 30, keywords: ["page object", "pom", "struktur", "fixture", "reusable", "helper"], hint: "Jelaskan penerapan Page Object Model dan struktur folder." },
      { id: "assertion", label: "Assertion", weight: 25, keywords: ["assert", "expect", "verifikasi", "validasi", "should"], hint: "Tunjukkan assertion yang memverifikasi hasil di setiap langkah penting." },
      { id: "ci", label: "Integrasi CI", weight: 25, keywords: ["ci", "github actions", "pipeline", "workflow", "report", "headless"], hint: "Jelaskan konfigurasi CI dan bagaimana laporan test dihasilkan." },
    ],
    tips: [
      "Hindari hard wait; gunakan auto-wait atau explicit wait.",
      "Simpan kredensial di environment variable.",
      "Sertakan screenshot saat test gagal.",
    ],
  },

  /* ---------------- Business Analyst ---------------- */
  {
    id: "sim-ba-userstory",
    careerId: "business-analyst",
    title: "User Story Fitur Cicilan",
    company: { name: "PayLink", industry: "Fintech", initials: "PL" },
    role: "Junior Business Analyst",
    difficulty: "Mudah",
    estimatedTime: "3 jam",
    xp: 150,
    skills: ["Requirement Gathering", "Agile"],
    summary: "Terjemahkan kebutuhan bisnis fitur paylater menjadi user story yang siap dikerjakan.",
    context:
      "Tim bisnis PayLink ingin menambahkan fitur cicilan (paylater) 3, 6, dan 12 bulan untuk transaksi di atas Rp500.000. Dari hasil rapat, kebutuhannya masih berupa catatan kasar. Tugasmu menyusun user story lengkap dengan acceptance criteria agar tim engineering bisa mulai sprint berikutnya.",
    objectives: [
      "User story dengan format As a… I want… so that…",
      "Acceptance criteria dengan format Given–When–Then",
      "Identifikasi stakeholder dan asumsi",
      "Prioritisasi backlog",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link dokumen (opsional)",
        description: "Notion, Confluence, atau Google Docs.",
        type: "link",
      },
      {
        id: "stories",
        label: "User story & acceptance criteria",
        description: "Tuliskan minimal 3 user story beserta acceptance criteria, asumsi, dan prioritasnya.",
        type: "text",
        minWords: 120,
      },
    ],
    rubric: [
      { id: "format", label: "Format user story", weight: 25, keywords: ["sebagai", "as a", "saya ingin", "i want", "sehingga", "so that", "agar"], hint: "Gunakan format: Sebagai [peran], saya ingin [tujuan], sehingga [manfaat]." },
      { id: "ac", label: "Acceptance criteria", weight: 30, keywords: ["given", "when", "then", "diberikan", "ketika", "maka", "acceptance"], hint: "Tulis acceptance criteria dengan format Given–When–Then." },
      { id: "stakeholder", label: "Stakeholder & asumsi", weight: 20, keywords: ["stakeholder", "asumsi", "assumption", "risiko", "risk", "dependensi"], hint: "Sebutkan stakeholder yang terlibat, asumsi, dan risiko." },
      { id: "priority", label: "Prioritisasi", weight: 25, keywords: ["prioritas", "priority", "moscow", "must have", "should", "mvp"], hint: "Gunakan metode seperti MoSCoW untuk menentukan prioritas." },
    ],
    tips: [
      "Satu user story sebaiknya bisa diselesaikan dalam satu sprint.",
      "Sertakan skenario gagal, misalnya limit kredit tidak cukup.",
      "Tulis asumsi secara eksplisit agar mudah divalidasi.",
    ],
  },
  {
    id: "sim-ba-process",
    careerId: "business-analyst",
    title: "Analisis Proses Klaim Asuransi",
    company: { name: "LindungiAja", industry: "Insurtech", initials: "LA" },
    role: "Business Analyst",
    difficulty: "Sedang",
    estimatedTime: "5 jam",
    xp: 250,
    skills: ["Process Modeling", "Stakeholder Mgmt"],
    summary: "Petakan proses klaim saat ini dan usulkan proses baru yang lebih efisien.",
    context:
      "Proses klaim LindungiAja rata-rata memakan 14 hari dan banyak dikeluhkan nasabah. Proses melibatkan nasabah, customer service, tim verifikasi, dan keuangan, dengan banyak langkah manual via email. Kamu diminta memetakan proses as-is, menemukan bottleneck, dan merancang proses to-be.",
    objectives: [
      "Diagram proses as-is (BPMN atau flowchart)",
      "Identifikasi bottleneck dan akar masalah",
      "Rancang proses to-be beserta dampaknya",
      "Rekomendasi KPI",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link diagram",
        description: "draw.io, Miro, Lucidchart, atau FigJam.",
        type: "link",
      },
      {
        id: "analysis",
        label: "Analisis & rekomendasi",
        description: "Uraikan proses as-is, bottleneck, proses to-be, serta KPI yang diusulkan.",
        type: "text",
        minWords: 120,
      },
    ],
    rubric: [
      { id: "asis", label: "Pemetaan as-is", weight: 25, keywords: ["as-is", "as is", "proses saat ini", "bpmn", "flowchart", "swimlane"], hint: "Gambarkan proses saat ini, idealnya dengan swimlane per aktor." },
      { id: "rootcause", label: "Bottleneck & akar masalah", weight: 25, keywords: ["bottleneck", "akar masalah", "root cause", "fishbone", "5 why", "manual", "delay"], hint: "Gunakan teknik seperti 5 Whys atau fishbone untuk menemukan akar masalah." },
      { id: "tobe", label: "Proses to-be", weight: 30, keywords: ["to-be", "to be", "otomasi", "automation", "usulan", "digital", "self-service"], hint: "Jelaskan perubahan pada proses baru dan dampaknya pada waktu klaim." },
      { id: "kpi", label: "KPI", weight: 20, keywords: ["kpi", "sla", "metrik", "waktu", "kepuasan", "nps", "csat"], hint: "Usulkan KPI terukur, misalnya rata-rata waktu klaim atau CSAT." },
    ],
    tips: [
      "Bedakan gejala dan akar masalah.",
      "Hitung estimasi penghematan waktu dari proses baru.",
      "Libatkan sudut pandang setiap stakeholder.",
    ],
  },

  /* ---------------- Data Analyst ---------------- */
  {
    id: "sim-da-sales",
    careerId: "data-analyst",
    title: "Analisis Penurunan Penjualan",
    company: { name: "KopiNusantara", industry: "F&B Retail", initials: "KN" },
    role: "Junior Data Analyst",
    difficulty: "Sedang",
    estimatedTime: "4–5 jam",
    xp: 250,
    skills: ["SQL", "Spreadsheet", "Visualisasi Data"],
    summary: "Temukan penyebab turunnya penjualan kuartal ini dan berikan rekomendasi.",
    context:
      "Penjualan KopiNusantara turun 18% pada Q3 dibanding Q2. Manajemen ingin tahu penyebabnya: apakah dari cabang tertentu, kategori produk, waktu, atau kanal (dine-in vs online). Gunakan dataset penjualan retail publik (misalnya dari Kaggle) sebagai simulasi, lalu sajikan analisis dan rekomendasimu.",
    objectives: [
      "Rumuskan pertanyaan analisis dan hipotesis",
      "Query/olah data untuk menguji hipotesis",
      "Visualisasi temuan utama",
      "Rekomendasi bisnis yang dapat ditindaklanjuti",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link dashboard atau notebook",
        description: "Looker Studio, Tableau Public, Google Sheets, atau Kaggle Notebook.",
        type: "link",
      },
      {
        id: "insight",
        label: "Ringkasan insight",
        description: "Jelaskan hipotesis, metode analisis, temuan utama, dan rekomendasi.",
        type: "text",
        minWords: 120,
      },
    ],
    rubric: [
      { id: "hypothesis", label: "Pertanyaan & hipotesis", weight: 20, keywords: ["hipotesis", "hypothesis", "pertanyaan", "dugaan", "asumsi"], hint: "Mulai dengan hipotesis yang jelas, misalnya penurunan terjadi di kanal online." },
      { id: "method", label: "Metode analisis", weight: 25, keywords: ["sql", "query", "group by", "pivot", "segmentasi", "cleaning", "pandas"], hint: "Jelaskan cara data diolah (query, pivot, segmentasi)." },
      { id: "insight", label: "Temuan berbasis data", weight: 30, keywords: ["temuan", "insight", "turun", "naik", "%", "persen", "tren", "trend"], hint: "Sajikan temuan dengan angka, misalnya 'cabang X turun 32%'." },
      { id: "recommendation", label: "Rekomendasi", weight: 25, keywords: ["rekomendasi", "recommend", "saran", "aksi", "action", "strategi"], hint: "Berikan rekomendasi konkret yang terhubung langsung dengan temuan." },
    ],
    tips: [
      "Pecah penurunan berdasarkan dimensi: lokasi, produk, waktu, kanal.",
      "Satu chart, satu pesan.",
      "Mulai ringkasan dengan kesimpulan utama.",
    ],
  },
  {
    id: "sim-da-dashboard",
    careerId: "data-analyst",
    title: "Dashboard KPI Marketing",
    company: { name: "BelajarPintar", industry: "Edtech", initials: "BP" },
    role: "Data Analyst",
    difficulty: "Sulit",
    estimatedTime: "6 jam",
    xp: 350,
    skills: ["Visualisasi Data", "SQL"],
    summary: "Bangun dashboard yang memantau performa kampanye marketing lintas kanal.",
    context:
      "Tim marketing BelajarPintar menjalankan kampanye di Instagram, TikTok, Google Ads, dan email, tetapi datanya tersebar di berbagai spreadsheet. Mereka butuh satu dashboard untuk memantau CAC, conversion rate, dan ROI per kanal setiap minggu.",
    objectives: [
      "Tentukan KPI utama dan definisinya",
      "Modelkan data dari beberapa sumber",
      "Dashboard interaktif dengan filter",
      "Insight dan rekomendasi alokasi budget",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link dashboard",
        description: "Looker Studio, Tableau Public, atau Power BI.",
        type: "link",
      },
      {
        id: "doc",
        label: "Dokumentasi dashboard",
        description: "Jelaskan definisi KPI, sumber data, desain dashboard, dan insight utama.",
        type: "text",
        minWords: 120,
      },
    ],
    rubric: [
      { id: "kpi", label: "Definisi KPI", weight: 25, keywords: ["cac", "conversion", "konversi", "roi", "roas", "ctr", "kpi"], hint: "Definisikan KPI secara jelas beserta rumusnya." },
      { id: "model", label: "Pemodelan data", weight: 25, keywords: ["sumber data", "join", "gabung", "model", "cleaning", "blend", "tabel"], hint: "Jelaskan bagaimana data dari berbagai kanal digabungkan." },
      { id: "design", label: "Desain dashboard", weight: 25, keywords: ["filter", "chart", "scorecard", "interaktif", "layout", "tren"], hint: "Uraikan susunan dashboard, jenis chart, dan filter yang tersedia." },
      { id: "insight", label: "Insight", weight: 25, keywords: ["insight", "rekomendasi", "budget", "alokasi", "kanal terbaik", "temuan"], hint: "Berikan insight tentang kanal mana yang paling efisien dan saran alokasi budget." },
    ],
    tips: [
      "Letakkan KPI terpenting di kiri atas.",
      "Gunakan warna konsisten per kanal.",
      "Tambahkan perbandingan periode sebelumnya.",
    ],
  },

  /* ---------------- Mobile Developer ---------------- */
  {
    id: "sim-md-todo",
    careerId: "mobile-developer",
    title: "Aplikasi Catatan Keuangan Harian",
    company: { name: "HematIn", industry: "Fintech", initials: "HI" },
    role: "Junior Mobile Developer",
    difficulty: "Sedang",
    estimatedTime: "5–6 jam",
    xp: 250,
    skills: ["Flutter", "State Management"],
    summary: "Bangun MVP aplikasi pencatat pengeluaran dengan penyimpanan lokal.",
    context:
      "HematIn ingin menguji ide aplikasi pencatat keuangan untuk mahasiswa. Kamu diminta membuat MVP dengan fitur tambah/edit/hapus transaksi, kategori, ringkasan bulanan, dan data tersimpan di perangkat (offline-first).",
    objectives: [
      "CRUD transaksi dengan form tervalidasi",
      "State management yang rapi",
      "Penyimpanan lokal (SQLite/Hive/SharedPreferences)",
      "Ringkasan pengeluaran per kategori",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link repository",
        description: "Repository berisi source code, screenshot, dan README.",
        type: "link",
      },
      {
        id: "explanation",
        label: "Penjelasan teknis",
        description: "Jelaskan arsitektur, state management, penyimpanan data, dan tantangan yang dihadapi.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "arch", label: "Arsitektur aplikasi", weight: 25, keywords: ["arsitektur", "architecture", "layer", "repository", "model", "mvvm", "clean"], hint: "Jelaskan pemisahan layer (UI, logic, data)." },
      { id: "state", label: "State management", weight: 25, keywords: ["provider", "riverpod", "bloc", "getx", "state", "setstate"], hint: "Sebutkan pendekatan state management dan alasannya." },
      { id: "storage", label: "Penyimpanan lokal", weight: 25, keywords: ["sqlite", "hive", "sharedpreferences", "offline", "lokal", "local", "isar"], hint: "Jelaskan cara data disimpan dan dibaca secara offline." },
      { id: "ux", label: "Validasi & UX", weight: 25, keywords: ["validasi", "validation", "form", "error", "empty state", "snackbar"], hint: "Tunjukkan validasi input dan umpan balik untuk pengguna." },
    ],
    tips: [
      "Simpan nominal dalam satuan terkecil (integer) untuk menghindari error pembulatan.",
      "Tambahkan empty state saat belum ada transaksi.",
      "Sertakan screenshot di README.",
    ],
  },
  {
    id: "sim-md-api",
    careerId: "mobile-developer",
    title: "Fitur Lacak Pesanan Real-time",
    company: { name: "AntarCepat", industry: "Logistik", initials: "AC" },
    role: "Mobile Developer",
    difficulty: "Sulit",
    estimatedTime: "7–8 jam",
    xp: 350,
    skills: ["REST API", "Flutter"],
    summary: "Integrasikan API pelacakan dan tampilkan status pengiriman yang selalu terbaru.",
    context:
      "Pengguna AntarCepat sering menghubungi CS hanya untuk menanyakan posisi paket. Tim produk ingin halaman lacak pesanan yang menampilkan timeline status, estimasi tiba, dan pembaruan otomatis. Gunakan mock API (misalnya JSON Server atau mockapi.io).",
    objectives: [
      "Integrasi REST API dengan model data yang tepat",
      "Timeline status pengiriman",
      "Pembaruan otomatis (polling/pull-to-refresh)",
      "Penanganan error dan kondisi offline",
    ],
    deliverables: [
      {
        id: "link",
        label: "Link repository",
        description: "Repository berisi source code dan dokumentasi.",
        type: "link",
      },
      {
        id: "explanation",
        label: "Penjelasan implementasi",
        description: "Jelaskan integrasi API, mekanisme update, error handling, dan keputusan teknis.",
        type: "text",
        minWords: 100,
      },
    ],
    rubric: [
      { id: "api", label: "Integrasi API", weight: 30, keywords: ["api", "http", "dio", "json", "model", "endpoint", "serializ"], hint: "Jelaskan pemanggilan API dan parsing JSON ke model." },
      { id: "realtime", label: "Mekanisme pembaruan", weight: 25, keywords: ["polling", "refresh", "stream", "websocket", "timer", "real-time", "realtime"], hint: "Jelaskan bagaimana status diperbarui secara berkala." },
      { id: "error", label: "Error & offline handling", weight: 25, keywords: ["error", "offline", "retry", "timeout", "koneksi", "cache"], hint: "Tunjukkan perilaku aplikasi saat koneksi buruk atau API gagal." },
      { id: "ui", label: "UI timeline", weight: 20, keywords: ["timeline", "status", "estimasi", "ui", "widget", "stepper"], hint: "Jelaskan cara menampilkan timeline status dengan jelas." },
    ],
    tips: [
      "Hentikan polling saat halaman tidak aktif untuk menghemat baterai.",
      "Tampilkan waktu pembaruan terakhir.",
      "Cache respons terakhir untuk kondisi offline.",
    ],
  },
];

export function getSimulation(id: string | null | undefined) {
  if (!id) return undefined;
  return simulations.find((s) => s.id === id);
}

export function getSimulationsByCareer(careerId: string) {
  return simulations.filter((s) => s.careerId === careerId);
}
