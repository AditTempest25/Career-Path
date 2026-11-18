import {
  Bug,
  Code2,
  Database,
  Kanban,
  LineChart,
  Megaphone,
  Palette,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import type { Career, CareerId } from "@/lib/types";

export const careers: Career[] = [
  {
    id: "web-developer",
    title: "Web Developer",
    tagline: "Bangun website dan aplikasi web yang dipakai jutaan orang.",
    description:
      "Web Developer merancang, membangun, dan memelihara aplikasi berbasis web. Kamu akan bekerja dengan HTML, CSS, JavaScript, dan framework modern seperti React untuk menciptakan pengalaman digital yang cepat dan mudah diakses.",
    icon: Code2,
    level: "Ramah Pemula",
    demand: "Sangat Tinggi",
    skills: ["HTML & CSS", "JavaScript", "React", "Node.js", "Git"],
    tools: ["VS Code", "Git & GitHub", "Chrome DevTools", "Figma", "Postman"],
    salary: { min: 6, max: 15 },
    duration: "6–12 bulan",
    employers: ["Startup teknologi", "E-commerce", "Software house", "Bank & fintech"],
    dayInLife: [
      "Stand-up meeting singkat bersama tim produk",
      "Mengubah desain Figma menjadi komponen UI",
      "Menghubungkan frontend dengan API backend",
      "Code review dan memperbaiki bug",
    ],
    roadmap: [
      {
        id: "wd-p1",
        title: "Fondasi Web",
        description: "Pahami cara kerja web dan bangun halaman pertamamu.",
        modules: [
          {
            id: "wd-m1",
            title: "Cara Kerja Internet & Browser",
            description: "HTTP, DNS, request–response, dan peran browser.",
            type: "materi",
            hours: 3,
            skill: "HTML & CSS",
            resources: [
              { title: "MDN – Cara kerja web", url: "https://developer.mozilla.org/id/docs/Learn" },
            ],
          },
          {
            id: "wd-m2",
            title: "HTML Semantik",
            description: "Struktur dokumen, form, dan aksesibilitas dasar.",
            type: "materi",
            hours: 6,
            skill: "HTML & CSS",
            resources: [
              { title: "MDN – HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
            ],
          },
          {
            id: "wd-m3",
            title: "CSS Layout: Flexbox & Grid",
            description: "Membuat layout responsif untuk semua ukuran layar.",
            type: "praktik",
            hours: 10,
            skill: "HTML & CSS",
            resources: [
              { title: "CSS-Tricks – Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
              { title: "Grid Garden", url: "https://cssgridgarden.com/" },
            ],
          },
        ],
      },
      {
        id: "wd-p2",
        title: "JavaScript Inti",
        description: "Logika pemrograman dan interaktivitas halaman.",
        modules: [
          {
            id: "wd-m4",
            title: "Dasar JavaScript",
            description: "Variabel, tipe data, fungsi, array, dan object.",
            type: "materi",
            hours: 12,
            skill: "JavaScript",
            resources: [
              { title: "javascript.info", url: "https://javascript.info/" },
            ],
          },
          {
            id: "wd-m5",
            title: "DOM & Event",
            description: "Memanipulasi halaman dan merespons interaksi pengguna.",
            type: "praktik",
            hours: 8,
            skill: "JavaScript",
            resources: [
              { title: "MDN – DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
            ],
          },
          {
            id: "wd-m6",
            title: "Async JS & Fetch API",
            description: "Promise, async/await, dan mengambil data dari API.",
            type: "praktik",
            hours: 8,
            skill: "JavaScript",
            resources: [
              { title: "javascript.info – Promises", url: "https://javascript.info/async" },
            ],
          },
        ],
      },
      {
        id: "wd-p3",
        title: "Framework & Tools",
        description: "Bekerja seperti developer profesional.",
        modules: [
          {
            id: "wd-m7",
            title: "Git & GitHub",
            description: "Version control, branch, dan pull request.",
            type: "praktik",
            hours: 5,
            skill: "Git",
            resources: [
              { title: "Pro Git Book", url: "https://git-scm.com/book/id/v2" },
            ],
          },
          {
            id: "wd-m8",
            title: "React Fundamental",
            description: "Komponen, props, state, dan hooks.",
            type: "materi",
            hours: 16,
            skill: "React",
            resources: [
              { title: "react.dev – Learn", url: "https://react.dev/learn" },
            ],
          },
          {
            id: "wd-m9",
            title: "REST API dengan Node.js",
            description: "Membuat endpoint sederhana dengan Express.",
            type: "praktik",
            hours: 12,
            skill: "Node.js",
            resources: [
              { title: "Node.js – Learn", url: "https://nodejs.org/en/learn" },
            ],
          },
        ],
      },
      {
        id: "wd-p4",
        title: "Proyek Portofolio",
        description: "Buktikan kemampuanmu lewat proyek nyata.",
        modules: [
          {
            id: "wd-m10",
            title: "Proyek: Aplikasi Full-Stack",
            description: "Bangun dan deploy aplikasi CRUD lengkap.",
            type: "proyek",
            hours: 25,
            skill: "React",
            resources: [
              { title: "Vercel – Deploy", url: "https://vercel.com/docs" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    tagline: "Rancang produk digital yang mudah dan menyenangkan dipakai.",
    description:
      "UI/UX Designer memahami kebutuhan pengguna lewat riset, lalu menerjemahkannya menjadi alur, wireframe, dan antarmuka visual yang intuitif. Peran ini memadukan empati, logika, dan estetika.",
    icon: Palette,
    level: "Ramah Pemula",
    demand: "Tinggi",
    skills: ["User Research", "Wireframing", "Figma", "Prototyping", "Design System"],
    tools: ["Figma", "FigJam", "Maze", "Notion", "Miro"],
    salary: { min: 5.5, max: 14 },
    duration: "4–8 bulan",
    employers: ["Startup produk", "Agensi digital", "E-commerce", "Perusahaan BUMN digital"],
    dayInLife: [
      "Wawancara pengguna atau membaca hasil survei",
      "Menyusun user flow dan wireframe",
      "Mendesain high-fidelity di Figma",
      "Handoff desain ke developer",
    ],
    roadmap: [
      {
        id: "ux-p1",
        title: "Dasar Desain",
        description: "Prinsip visual dan cara berpikir desainer.",
        modules: [
          {
            id: "ux-m1",
            title: "Prinsip Desain Visual",
            description: "Hierarki, kontras, tipografi, warna, dan spacing.",
            type: "materi",
            hours: 6,
            skill: "Figma",
            resources: [
              { title: "Laws of UX", url: "https://lawsofux.com/" },
            ],
          },
          {
            id: "ux-m2",
            title: "Design Thinking",
            description: "Empathize, define, ideate, prototype, test.",
            type: "materi",
            hours: 4,
            skill: "User Research",
            resources: [
              { title: "IDEO – Design Thinking", url: "https://designthinking.ideo.com/" },
            ],
          },
          {
            id: "ux-m3",
            title: "Figma dari Nol",
            description: "Frame, auto layout, komponen, dan variants.",
            type: "praktik",
            hours: 10,
            skill: "Figma",
            resources: [
              { title: "Figma Learn", url: "https://help.figma.com/hc/en-us/categories/360002051613" },
            ],
          },
        ],
      },
      {
        id: "ux-p2",
        title: "Riset & Arsitektur",
        description: "Pahami pengguna sebelum mendesain.",
        modules: [
          {
            id: "ux-m4",
            title: "User Interview & Persona",
            description: "Menyusun pertanyaan, mewawancarai, dan sintesis insight.",
            type: "praktik",
            hours: 8,
            skill: "User Research",
            resources: [
              { title: "NN/g – User Interviews", url: "https://www.nngroup.com/articles/user-interviews/" },
            ],
          },
          {
            id: "ux-m5",
            title: "User Flow & Information Architecture",
            description: "Memetakan perjalanan dan struktur konten.",
            type: "praktik",
            hours: 6,
            skill: "Wireframing",
            resources: [
              { title: "NN/g – Information Architecture", url: "https://www.nngroup.com/topic/information-architecture/" },
            ],
          },
          {
            id: "ux-m6",
            title: "Wireframing",
            description: "Low-fidelity hingga mid-fidelity wireframe.",
            type: "praktik",
            hours: 6,
            skill: "Wireframing",
            resources: [
              { title: "Figma – Wireframing", url: "https://www.figma.com/resource-library/what-is-wireframing/" },
            ],
          },
        ],
      },
      {
        id: "ux-p3",
        title: "UI & Validasi",
        description: "Desain akhir dan uji ke pengguna.",
        modules: [
          {
            id: "ux-m7",
            title: "Prototyping Interaktif",
            description: "Membuat prototype yang bisa diklik.",
            type: "praktik",
            hours: 6,
            skill: "Prototyping",
            resources: [
              { title: "Figma – Prototyping", url: "https://help.figma.com/hc/en-us/articles/360040314193" },
            ],
          },
          {
            id: "ux-m8",
            title: "Usability Testing",
            description: "Merencanakan dan menjalankan uji kegunaan.",
            type: "praktik",
            hours: 6,
            skill: "User Research",
            resources: [
              { title: "NN/g – Usability Testing 101", url: "https://www.nngroup.com/articles/usability-testing-101/" },
            ],
          },
          {
            id: "ux-m9",
            title: "Design System",
            description: "Token, komponen, dan dokumentasi.",
            type: "materi",
            hours: 8,
            skill: "Design System",
            resources: [
              { title: "Material Design 3", url: "https://m3.material.io/" },
            ],
          },
        ],
      },
      {
        id: "ux-p4",
        title: "Proyek Portofolio",
        description: "Studi kasus yang menceritakan prosesmu.",
        modules: [
          {
            id: "ux-m10",
            title: "Proyek: Case Study End-to-End",
            description: "Dari riset hingga prototype teruji.",
            type: "proyek",
            hours: 25,
            skill: "Prototyping",
            resources: [
              { title: "Behance – UX Case Study", url: "https://www.behance.net/search/projects?search=ux%20case%20study" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    tagline: "Jadi penjaga kualitas sebelum produk sampai ke pengguna.",
    description:
      "QA Engineer memastikan software berjalan sesuai harapan. Kamu akan menyusun skenario uji, menemukan dan melaporkan bug, serta mengotomatisasi pengujian agar rilis lebih cepat dan aman.",
    icon: Bug,
    level: "Menengah",
    demand: "Tinggi",
    skills: ["Test Case Design", "Bug Reporting", "API Testing", "Automation", "SQL"],
    tools: ["Jira", "Postman", "Playwright", "Selenium", "TestRail"],
    salary: { min: 5.5, max: 13 },
    duration: "4–6 bulan",
    employers: ["Software house", "Bank & fintech", "E-commerce", "Telco"],
    dayInLife: [
      "Membaca requirement dan acceptance criteria",
      "Menulis dan menjalankan test case",
      "Melaporkan bug ke Jira dengan langkah reproduksi",
      "Memelihara script automation di CI/CD",
    ],
    roadmap: [
      {
        id: "qa-p1",
        title: "Dasar Pengujian",
        description: "Konsep fundamental software testing.",
        modules: [
          {
            id: "qa-m1",
            title: "SDLC & STLC",
            description: "Posisi QA dalam siklus pengembangan software.",
            type: "materi",
            hours: 4,
            skill: "Test Case Design",
            resources: [
              { title: "ISTQB Foundation Syllabus", url: "https://www.istqb.org/certifications/certified-tester-foundation-level" },
            ],
          },
          {
            id: "qa-m2",
            title: "Teknik Desain Test Case",
            description: "Equivalence partitioning, boundary value, decision table.",
            type: "praktik",
            hours: 8,
            skill: "Test Case Design",
            resources: [
              { title: "Guru99 – Test Case Design", url: "https://www.guru99.com/test-case-design-technique.html" },
            ],
          },
          {
            id: "qa-m3",
            title: "Bug Reporting yang Efektif",
            description: "Severity, priority, dan langkah reproduksi yang jelas.",
            type: "praktik",
            hours: 4,
            skill: "Bug Reporting",
            resources: [
              { title: "Atlassian – Bug tracking", url: "https://www.atlassian.com/software/jira/guides/use-cases/what-is-jira-used-for" },
            ],
          },
        ],
      },
      {
        id: "qa-p2",
        title: "Pengujian Teknis",
        description: "Masuk lebih dalam ke sisi teknis.",
        modules: [
          {
            id: "qa-m4",
            title: "API Testing dengan Postman",
            description: "Request, assertion, dan collection.",
            type: "praktik",
            hours: 8,
            skill: "API Testing",
            resources: [
              { title: "Postman Learning Center", url: "https://learning.postman.com/" },
            ],
          },
          {
            id: "qa-m5",
            title: "SQL untuk QA",
            description: "Validasi data langsung ke database.",
            type: "praktik",
            hours: 6,
            skill: "SQL",
            resources: [
              { title: "SQLBolt", url: "https://sqlbolt.com/" },
            ],
          },
        ],
      },
      {
        id: "qa-p3",
        title: "Test Automation",
        description: "Otomatisasi pengujian berulang.",
        modules: [
          {
            id: "qa-m6",
            title: "Dasar Pemrograman untuk Automation",
            description: "JavaScript/TypeScript yang dibutuhkan QA.",
            type: "materi",
            hours: 10,
            skill: "Automation",
            resources: [
              { title: "javascript.info", url: "https://javascript.info/" },
            ],
          },
          {
            id: "qa-m7",
            title: "E2E Testing dengan Playwright",
            description: "Locator, assertion, dan page object model.",
            type: "praktik",
            hours: 12,
            skill: "Automation",
            resources: [
              { title: "Playwright Docs", url: "https://playwright.dev/docs/intro" },
            ],
          },
          {
            id: "qa-m8",
            title: "CI/CD untuk Testing",
            description: "Menjalankan test otomatis di GitHub Actions.",
            type: "materi",
            hours: 5,
            skill: "Automation",
            resources: [
              { title: "GitHub Actions", url: "https://docs.github.com/en/actions" },
            ],
          },
        ],
      },
      {
        id: "qa-p4",
        title: "Proyek Portofolio",
        description: "Test suite lengkap untuk aplikasi nyata.",
        modules: [
          {
            id: "qa-m9",
            title: "Proyek: Test Plan & Automation Suite",
            description: "Test plan, test case, dan automation untuk web demo.",
            type: "proyek",
            hours: 20,
            skill: "Automation",
            resources: [
              { title: "Sauce Demo (situs latihan)", url: "https://www.saucedemo.com/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    tagline: "Jembatani kebutuhan bisnis dengan solusi teknologi.",
    description:
      "Business Analyst menggali masalah bisnis, mendokumentasikan kebutuhan, dan memastikan tim teknis membangun solusi yang tepat. Kemampuan komunikasi dan berpikir terstruktur adalah senjata utamamu.",
    icon: LineChart,
    level: "Ramah Pemula",
    demand: "Tinggi",
    skills: ["Requirement Gathering", "Process Modeling", "SQL", "Stakeholder Mgmt", "Agile"],
    tools: ["Jira", "Confluence", "Excel / Google Sheets", "draw.io", "Notion"],
    salary: { min: 6, max: 14 },
    duration: "3–6 bulan",
    employers: ["Bank & fintech", "Konsultan IT", "Perusahaan multinasional", "Startup"],
    dayInLife: [
      "Workshop kebutuhan bersama stakeholder",
      "Menulis user story dan acceptance criteria",
      "Memodelkan proses bisnis (BPMN)",
      "Menganalisis data untuk rekomendasi",
    ],
    roadmap: [
      {
        id: "ba-p1",
        title: "Fondasi Analisis Bisnis",
        description: "Peran BA dan cara berpikir analitis.",
        modules: [
          {
            id: "ba-m1",
            title: "Peran & Tanggung Jawab BA",
            description: "BABOK, deliverable BA, dan kolaborasi tim.",
            type: "materi",
            hours: 3,
            skill: "Requirement Gathering",
            resources: [
              { title: "IIBA – What is Business Analysis", url: "https://www.iiba.org/business-analysis/" },
            ],
          },
          {
            id: "ba-m2",
            title: "Teknik Elisitasi Kebutuhan",
            description: "Wawancara, workshop, observasi, dan survei.",
            type: "praktik",
            hours: 6,
            skill: "Requirement Gathering",
            resources: [
              { title: "BA Times – Elicitation", url: "https://www.batimes.com/" },
            ],
          },
          {
            id: "ba-m3",
            title: "Manajemen Stakeholder",
            description: "Peta stakeholder, RACI, dan komunikasi.",
            type: "materi",
            hours: 4,
            skill: "Stakeholder Mgmt",
            resources: [
              { title: "Atlassian – Stakeholder map", url: "https://www.atlassian.com/team-playbook/plays/stakeholder-communications" },
            ],
          },
        ],
      },
      {
        id: "ba-p2",
        title: "Dokumentasi & Pemodelan",
        description: "Mengubah kebutuhan jadi dokumen yang jelas.",
        modules: [
          {
            id: "ba-m4",
            title: "User Story & Acceptance Criteria",
            description: "Format INVEST dan Given–When–Then.",
            type: "praktik",
            hours: 5,
            skill: "Agile",
            resources: [
              { title: "Atlassian – User Stories", url: "https://www.atlassian.com/agile/project-management/user-stories" },
            ],
          },
          {
            id: "ba-m5",
            title: "BPMN & Process Modeling",
            description: "Memodelkan proses as-is dan to-be.",
            type: "praktik",
            hours: 6,
            skill: "Process Modeling",
            resources: [
              { title: "draw.io", url: "https://www.drawio.com/" },
            ],
          },
          {
            id: "ba-m6",
            title: "Agile & Scrum",
            description: "Sprint, backlog, dan peran BA dalam Scrum.",
            type: "materi",
            hours: 4,
            skill: "Agile",
            resources: [
              { title: "Scrum Guide", url: "https://scrumguides.org/" },
            ],
          },
        ],
      },
      {
        id: "ba-p3",
        title: "Analisis Data",
        description: "Ambil keputusan berbasis data.",
        modules: [
          {
            id: "ba-m7",
            title: "Spreadsheet untuk Analisis",
            description: "Pivot table, lookup, dan visualisasi.",
            type: "praktik",
            hours: 6,
            skill: "SQL",
            resources: [
              { title: "Google Sheets Training", url: "https://support.google.com/a/users/answer/9282959" },
            ],
          },
          {
            id: "ba-m8",
            title: "SQL Dasar",
            description: "SELECT, JOIN, GROUP BY untuk menjawab pertanyaan bisnis.",
            type: "praktik",
            hours: 8,
            skill: "SQL",
            resources: [
              { title: "SQLBolt", url: "https://sqlbolt.com/" },
            ],
          },
        ],
      },
      {
        id: "ba-p4",
        title: "Proyek Portofolio",
        description: "Dokumen BA lengkap untuk satu fitur.",
        modules: [
          {
            id: "ba-m9",
            title: "Proyek: BRD & Process Improvement",
            description: "Analisis masalah, BRD, dan rekomendasi solusi.",
            type: "proyek",
            hours: 15,
            skill: "Process Modeling",
            resources: [
              { title: "Template BRD (Atlassian)", url: "https://www.atlassian.com/software/confluence/templates/product-requirements" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    tagline: "Ubah data mentah menjadi insight yang menggerakkan bisnis.",
    description:
      "Data Analyst mengumpulkan, membersihkan, dan menganalisis data untuk menjawab pertanyaan bisnis. Hasilnya disajikan dalam dashboard dan rekomendasi yang membantu pengambilan keputusan.",
    icon: Database,
    level: "Menengah",
    demand: "Sangat Tinggi",
    skills: ["SQL", "Spreadsheet", "Python", "Statistika", "Visualisasi Data"],
    tools: ["Google Sheets", "BigQuery", "Python (pandas)", "Looker Studio", "Tableau"],
    salary: { min: 6, max: 15 },
    duration: "6–10 bulan",
    employers: ["E-commerce", "Bank & fintech", "Startup", "FMCG"],
    dayInLife: [
      "Menerima pertanyaan bisnis dari tim marketing atau produk",
      "Menulis query SQL dan membersihkan data",
      "Membangun dashboard di Looker Studio",
      "Mempresentasikan insight ke stakeholder",
    ],
    roadmap: [
      {
        id: "da-p1",
        title: "Fondasi Data",
        description: "Berpikir analitis dan mengolah data dasar.",
        modules: [
          {
            id: "da-m1",
            title: "Analytical Thinking",
            description: "Merumuskan pertanyaan bisnis dan metrik.",
            type: "materi",
            hours: 4,
            skill: "Statistika",
            resources: [
              { title: "Google Data Analytics", url: "https://grow.google/certificates/data-analytics/" },
            ],
          },
          {
            id: "da-m2",
            title: "Spreadsheet Lanjutan",
            description: "Pivot, VLOOKUP/XLOOKUP, dan cleaning data.",
            type: "praktik",
            hours: 8,
            skill: "Spreadsheet",
            resources: [
              { title: "Google Sheets Training", url: "https://support.google.com/a/users/answer/9282959" },
            ],
          },
          {
            id: "da-m3",
            title: "Statistika Deskriptif",
            description: "Mean, median, distribusi, dan korelasi.",
            type: "materi",
            hours: 8,
            skill: "Statistika",
            resources: [
              { title: "Khan Academy – Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
            ],
          },
        ],
      },
      {
        id: "da-p2",
        title: "SQL",
        description: "Bahasa utama seorang analis.",
        modules: [
          {
            id: "da-m4",
            title: "SQL Dasar",
            description: "SELECT, WHERE, ORDER BY, dan agregasi.",
            type: "praktik",
            hours: 8,
            skill: "SQL",
            resources: [
              { title: "SQLBolt", url: "https://sqlbolt.com/" },
            ],
          },
          {
            id: "da-m5",
            title: "SQL Lanjutan",
            description: "JOIN, subquery, CTE, dan window function.",
            type: "praktik",
            hours: 12,
            skill: "SQL",
            resources: [
              { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
            ],
          },
        ],
      },
      {
        id: "da-p3",
        title: "Python & Visualisasi",
        description: "Analisis lebih dalam dan presentasi yang memukau.",
        modules: [
          {
            id: "da-m6",
            title: "Python untuk Analisis Data",
            description: "pandas, numpy, dan Jupyter Notebook.",
            type: "praktik",
            hours: 16,
            skill: "Python",
            resources: [
              { title: "Kaggle Learn – pandas", url: "https://www.kaggle.com/learn/pandas" },
            ],
          },
          {
            id: "da-m7",
            title: "Data Visualization & Storytelling",
            description: "Memilih chart yang tepat dan bercerita dengan data.",
            type: "materi",
            hours: 6,
            skill: "Visualisasi Data",
            resources: [
              { title: "Storytelling with Data", url: "https://www.storytellingwithdata.com/" },
            ],
          },
          {
            id: "da-m8",
            title: "Dashboard dengan Looker Studio",
            description: "Membangun dashboard interaktif.",
            type: "praktik",
            hours: 8,
            skill: "Visualisasi Data",
            resources: [
              { title: "Looker Studio Help", url: "https://support.google.com/looker-studio" },
            ],
          },
        ],
      },
      {
        id: "da-p4",
        title: "Proyek Portofolio",
        description: "Analisis end-to-end dengan dataset nyata.",
        modules: [
          {
            id: "da-m9",
            title: "Proyek: Analisis Penjualan E-commerce",
            description: "Dari pertanyaan bisnis hingga rekomendasi.",
            type: "proyek",
            hours: 20,
            skill: "Visualisasi Data",
            resources: [
              { title: "Kaggle Datasets", url: "https://www.kaggle.com/datasets" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    tagline: "Ciptakan aplikasi yang ada di genggaman setiap orang.",
    description:
      "Mobile Developer membangun aplikasi Android dan iOS. Dengan framework lintas platform seperti Flutter atau React Native, kamu bisa menjangkau dua platform sekaligus dari satu codebase.",
    icon: Smartphone,
    level: "Menengah",
    demand: "Tinggi",
    skills: ["Dart", "Flutter", "State Management", "REST API", "Kotlin"],
    tools: ["Android Studio", "VS Code", "Firebase", "Postman", "Git & GitHub"],
    salary: { min: 7, max: 17 },
    duration: "8–14 bulan",
    employers: ["Startup aplikasi", "Bank & fintech", "Software house", "Super-app"],
    dayInLife: [
      "Mengimplementasikan layar baru dari desain",
      "Integrasi API dan penyimpanan lokal",
      "Debug di emulator dan perangkat fisik",
      "Menyiapkan rilis ke Play Store / App Store",
    ],
    roadmap: [
      {
        id: "md-p1",
        title: "Fondasi Pemrograman",
        description: "Logika dan bahasa Dart.",
        modules: [
          {
            id: "md-m1",
            title: "Dasar Pemrograman dengan Dart",
            description: "Variabel, fungsi, OOP, dan null safety.",
            type: "materi",
            hours: 12,
            skill: "Dart",
            resources: [
              { title: "Dart Language Tour", url: "https://dart.dev/language" },
            ],
          },
          {
            id: "md-m2",
            title: "Git & GitHub",
            description: "Version control untuk proyek aplikasi.",
            type: "praktik",
            hours: 4,
            skill: "Dart",
            resources: [
              { title: "Pro Git Book", url: "https://git-scm.com/book/id/v2" },
            ],
          },
        ],
      },
      {
        id: "md-p2",
        title: "Flutter UI",
        description: "Membangun antarmuka aplikasi.",
        modules: [
          {
            id: "md-m3",
            title: "Widget & Layout",
            description: "Stateless, stateful, Row, Column, dan Stack.",
            type: "praktik",
            hours: 12,
            skill: "Flutter",
            resources: [
              { title: "Flutter – Learn", url: "https://docs.flutter.dev/get-started/learn-flutter" },
            ],
          },
          {
            id: "md-m4",
            title: "Navigasi & Form",
            description: "Routing, input, dan validasi.",
            type: "praktik",
            hours: 8,
            skill: "Flutter",
            resources: [
              { title: "Flutter Cookbook", url: "https://docs.flutter.dev/cookbook" },
            ],
          },
        ],
      },
      {
        id: "md-p3",
        title: "Data & Arsitektur",
        description: "Aplikasi yang terhubung dan rapi.",
        modules: [
          {
            id: "md-m5",
            title: "State Management",
            description: "Provider, Riverpod, atau Bloc.",
            type: "materi",
            hours: 10,
            skill: "State Management",
            resources: [
              { title: "Flutter – State management", url: "https://docs.flutter.dev/data-and-backend/state-mgmt" },
            ],
          },
          {
            id: "md-m6",
            title: "Integrasi REST API",
            description: "HTTP request, JSON parsing, dan error handling.",
            type: "praktik",
            hours: 10,
            skill: "REST API",
            resources: [
              { title: "Flutter – Fetch data", url: "https://docs.flutter.dev/cookbook/networking/fetch-data" },
            ],
          },
          {
            id: "md-m7",
            title: "Pengenalan Kotlin & Android Native",
            description: "Memahami platform Android di balik layar.",
            type: "materi",
            hours: 10,
            skill: "Kotlin",
            resources: [
              { title: "Android Developers – Courses", url: "https://developer.android.com/courses" },
            ],
          },
        ],
      },
      {
        id: "md-p4",
        title: "Proyek Portofolio",
        description: "Aplikasi siap rilis.",
        modules: [
          {
            id: "md-m8",
            title: "Proyek: Aplikasi Mobile Lengkap",
            description: "Aplikasi dengan API, state, dan build APK.",
            type: "proyek",
            hours: 30,
            skill: "Flutter",
            resources: [
              { title: "Flutter – Build & release", url: "https://docs.flutter.dev/deployment/android" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "digital-marketer",
    title: "Digital Marketing Specialist",
    tagline: "Rancang strategi pemasaran kreatif, konten viral, dan iklan berkonversi tinggi.",
    description:
      "Digital Marketing Specialist bertanggung jawab membangun kesadaran merek (brand awareness), mendatangkan pelanggan baru, dan meningkatkan penjualan melalui kanal digital seperti Media Sosial, SEO, Google/Meta Ads, dan Content Marketing.",
    icon: Megaphone,
    level: "Ramah Pemula",
    demand: "Sangat Tinggi",
    skills: ["Copywriting", "Social Media Strategy", "SEO & Content", "Performance Ads", "Marketing Analytics"],
    tools: ["Meta Ads Manager", "Google Analytics 4", "TikTok Creative Center", "Canva", "Google Search Console"],
    salary: { min: 5, max: 12 },
    duration: "3–6 bulan",
    employers: ["Brand FMCG & Retail", "Agensi Digital & Kreatif", "E-commerce", "UMKM & Korporat"],
    dayInLife: [
      "Merancang kalender konten (Content Pillar) dan naskah copywriting untuk Instagram & TikTok",
      "Memantau performa kampanye iklan berbayar (ROAS, CTR, CPA) di Meta & Google Ads",
      "Melakukan riset kata kunci (keyword research) agar artikel berada di halaman 1 Google",
      "Menganalisis laporan insight mingguan bersama tim brand dan kreatif",
    ],
    roadmap: [
      {
        id: "dm-p1",
        title: "Fondasi Pemasaran & Copywriting",
        description: "Pahami psikologi konsumen, marketing funnel, dan seni menulis persuasif.",
        modules: [
          {
            id: "dm-m1",
            title: "Dasar Digital Marketing & Marketing Funnel",
            description: "Memahami perjalanan konsumen dari Awareness, Consideration, hingga Conversion.",
            type: "materi",
            hours: 5,
            skill: "Copywriting",
            resources: [
              { title: "Google Digital Garage – Fundamentals of Digital Marketing", url: "https://skillshop.exceedlms.com/" },
            ],
          },
          {
            id: "dm-m2",
            title: "Copywriting & Storytelling Persuasif",
            description: "Formula AIDA, PAS, dan penulisan hook untuk iklan serta media sosial.",
            type: "praktik",
            hours: 8,
            skill: "Copywriting",
            resources: [
              { title: "HubSpot – Copywriting Guide", url: "https://blog.hubspot.com/marketing/good-copywriting-practices-list" },
            ],
          },
        ],
      },
      {
        id: "dm-p2",
        title: "Media Sosial & SEO",
        description: "Bangun pertumbuhan organik lewat konten media sosial dan mesin pencari.",
        modules: [
          {
            id: "dm-m3",
            title: "Social Media Management & Content Pillar",
            description: "Menyusun strategi konten Instagram, TikTok, dan LinkedIn yang konsisten.",
            type: "praktik",
            hours: 10,
            skill: "Social Media Strategy",
            resources: [
              { title: "Buffer – Social Media Marketing Guide", url: "https://buffer.com/library/social-media-marketing-strategy/" },
            ],
          },
          {
            id: "dm-m4",
            title: "Search Engine Optimization (SEO) On-Page & Riset Keyword",
            description: "Optimasi artikel dan halaman web agar mudah ditemukan di Google.",
            type: "praktik",
            hours: 10,
            skill: "SEO & Content",
            resources: [
              { title: "Ahrefs – Beginner's Guide to SEO", url: "https://ahrefs.com/seo" },
            ],
          },
        ],
      },
      {
        id: "dm-p3",
        title: "Performance Marketing & Analitik",
        description: "Kelola anggaran iklan digital dan ukur efektivitas kampanye.",
        modules: [
          {
            id: "dm-m5",
            title: "Meta Ads & Google Ads Fundamental",
            description: "Targeting audiens, struktur kampanye, A/B testing kreatif, dan optimasi ROAS.",
            type: "praktik",
            hours: 12,
            skill: "Performance Ads",
            resources: [
              { title: "Meta Blueprint Free Courses", url: "https://www.facebookblueprint.com/" },
            ],
          },
          {
            id: "dm-m6",
            title: "Marketing Analytics & Google Analytics 4",
            description: "Membaca metrik konversi, CTR, CPC, CAC, dan menyusun laporan performa.",
            type: "materi",
            hours: 8,
            skill: "Marketing Analytics",
            resources: [
              { title: "Google Analytics Academy", url: "https://skillshop.docebosaas.com/" },
            ],
          },
        ],
      },
      {
        id: "dm-p4",
        title: "Proyek Portofolio",
        description: "Rencana kampanye pemasaran digital terpadu.",
        modules: [
          {
            id: "dm-m7",
            title: "Proyek: Integrated Digital Campaign Plan 360°",
            description: "Menyusun rencana peluncuran produk lengkap dengan kalender konten, alokasi budget ads, dan KPI.",
            type: "proyek",
            hours: 18,
            skill: "Social Media Strategy",
            resources: [
              { title: "HubSpot Marketing Campaign Template", url: "https://www.hubspot.com/marketing-plan-template-generator" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hr-specialist",
    title: "HR & Talent Acquisition",
    tagline: "Temukan talenta terbaik, bangun budaya kerja sehat, dan kembangkan potensi SDM.",
    description:
      "HR & Talent Acquisition Specialist berperan strategis dalam merekrut kandidat yang tepat, menyelenggarakan onboarding, mengelola hubungan industrial & administrasi karyawan, serta merancang sistem penilaian kinerja (Performance Appraisal).",
    icon: Users,
    level: "Ramah Pemula",
    demand: "Tinggi",
    skills: ["Recruitment & Selection", "Behavioral Interview", "Onboarding & Training", "Performance Management", "Employee Relations"],
    tools: ["LinkedIn Recruiter", "Glints / JobStreet", "HRIS (Talenta / Mekari)", "Google Workspace", "Alat Tes Psikometri Dasar"],
    salary: { min: 5, max: 11 },
    duration: "3–6 bulan",
    employers: ["Semua Industri Korporat", "Perusahaan Manufaktur & FMCG", "Konsultan SDM / Headhunter", "Startup & Perbankan"],
    dayInLife: [
      "Menyusun Job Description dan menyaring ratusan CV pelamar (CV Screening)",
      "Melakukan wawancara HR berbasis kompetensi (Metode STAR) dengan kandidat",
      "Menyambut karyawan baru dalam sesi Onboarding dan pengenalan budaya perusahaan",
      "Mengelola administrasi HRIS, evaluasi KPI karyawan, dan kegiatan employee engagement",
    ],
    roadmap: [
      {
        id: "hr-p1",
        title: "Fondasi Manajemen SDM & Rekrutmen",
        description: "Pahami siklus hidup karyawan (Employee Lifecycle) dan proses rekrutmen end-to-end.",
        modules: [
          {
            id: "hr-m1",
            title: "Pengantar Human Resources & Employee Lifecycle",
            description: "Peran HR modern: dari perencanaan tenaga kerja hingga offboarding.",
            type: "materi",
            hours: 5,
            skill: "Recruitment & Selection",
            resources: [
              { title: "AIHR – What is Human Resources", url: "https://www.aihr.com/blog/what-is-human-resources/" },
            ],
          },
          {
            id: "hr-m2",
            title: "Job Analysis, Job Description & CV Screening",
            description: "Merumuskan kualifikasi jabatan yang tepat dan teknik menyaring resume secara objektif.",
            type: "praktik",
            hours: 8,
            skill: "Recruitment & Selection",
            resources: [
              { title: "SHRM – How to Develop a Job Description", url: "https://www.shrm.org/" },
            ],
          },
        ],
      },
      {
        id: "hr-p2",
        title: "Teknik Wawancara & Seleksi",
        description: "Gali kompetensi kandidat secara akurat dan bebas bias.",
        modules: [
          {
            id: "hr-m3",
            title: "Behavioral Event Interview (BEI) & Metode STAR",
            description: "Menyusun daftar pertanyaan wawancara berbasis perilaku dan rubrik penilaian kandidat.",
            type: "praktik",
            hours: 10,
            skill: "Behavioral Interview",
            resources: [
              { title: "Workable – Structured Interview Guide", url: "https://resources.workable.com/tutorial/structured-interviews" },
            ],
          },
          {
            id: "hr-m4",
            title: "Employer Branding & Onboarding Karyawan Baru",
            description: "Membangun citra perusahaan di mata pencari kerja dan program orientasi 90 hari pertama.",
            type: "materi",
            hours: 6,
            skill: "Onboarding & Training",
            resources: [
              { title: "BambooHR – New Hire Onboarding Guide", url: "https://www.bamboohr.com/resources/guides/onboarding" },
            ],
          },
        ],
      },
      {
        id: "hr-p3",
        title: "Kinerja, Pelatihan & Hubungan Industrial",
        description: "Kelola performa tim dan kepatuhan regulasi ketenagakerjaan.",
        modules: [
          {
            id: "hr-m5",
            title: "Performance Management (KPI & OKR)",
            description: "Merancang indikator kinerja utama dan evaluasi performa berkala.",
            type: "praktik",
            hours: 8,
            skill: "Performance Management",
            resources: [
              { title: "Lattice – Performance Management Guide", url: "https://lattice.com/library" },
            ],
          },
          {
            id: "hr-m6",
            title: "Dasar Hukum Ketenagakerjaan Indonesia & Administrasi HRIS",
            description: "Memahami PKWT/PKWTT, BPJS, cuti, dan pengelolaan database karyawan.",
            type: "materi",
            hours: 8,
            skill: "Employee Relations",
            resources: [
              { title: "Mekari Talenta – Panduan HR & Regulasi", url: "https://www.talenta.co/blog/" },
            ],
          },
        ],
      },
      {
        id: "hr-p4",
        title: "Proyek Portofolio",
        description: "Dokumen rekrutmen dan matriks penilaian kandidat siap pakai.",
        modules: [
          {
            id: "hr-m7",
            title: "Proyek: End-to-End Recruitment Kit & Interview Scorecard",
            description: "Menyusun paket rekrutmen lengkap: Job Desc, matriks screening, panduan wawancara STAR, dan evaluasi kandidat.",
            type: "proyek",
            hours: 16,
            skill: "Behavioral Interview",
            resources: [
              { title: "SmartRecruiters – Hiring Scorecard Guide", url: "https://www.smartrecruiters.com/resources/glossary/interview-scorecard/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "finance-analyst",
    title: "Finance & Accounting Analyst",
    tagline: "Kelola kesehatan finansial, susun anggaran strategis, dan analisis profitabilitas bisnis.",
    description:
      "Finance & Accounting Analyst bertugas mencatat dan menganalisis laporan keuangan (Laba Rugi, Neraca, Arus Kas), menyusun proyeksi anggaran (budgeting & forecasting), mengevaluasi efisiensi biaya, serta memastikan kepatuhan pajak perusahaan.",
    icon: Wallet,
    level: "Ramah Pemula",
    demand: "Sangat Tinggi",
    skills: ["Financial Accounting", "Spreadsheet & Excel Modeling", "Budgeting & Forecasting", "Cash Flow Analysis", "Taxation & Compliance"],
    tools: ["Microsoft Excel / Google Sheets", "Accurate / Jurnal.id", "SAP / ERP", "Power BI", "DJP Online (e-Faktur/e-Bupot)"],
    salary: { min: 5.5, max: 13 },
    duration: "4–8 bulan",
    employers: ["Perbankan & Lembaga Keuangan", "KAP & Konsultan Pajak", "FMCG & Manufaktur", "Perusahaan Ritel & Korporat"],
    dayInLife: [
      "Memeriksa jurnal transaksi harian, invoice vendor, dan rekonsiliasi rekening bank",
      "Menyusun laporan keuangan bulanan (Income Statement, Balance Sheet, Cash Flow)",
      "Menganalisis selisih anggaran (Budget vs Actual Variance) tiap departemen",
      "Menyiapkan proyeksi keuangan di Excel untuk mendukung keputusan ekspansi manajemen",
    ],
    roadmap: [
      {
        id: "fa-p1",
        title: "Fondasi Akuntansi & Laporan Keuangan",
        description: "Kuasai siklus akuntansi dan cara membaca tiga laporan keuangan utama.",
        modules: [
          {
            id: "fa-m1",
            title: "Prinsip Dasar Akuntansi & Siklus Jurnal",
            description: "Persamaan dasar akuntansi, debit-kredit, jurnal umum, buku besar, dan neraca saldo.",
            type: "materi",
            hours: 8,
            skill: "Financial Accounting",
            resources: [
              { title: "AccountingCoach – Accounting Basics", url: "https://www.accountingcoach.com/" },
            ],
          },
          {
            id: "fa-m2",
            title: "Membedah Laporan Laba Rugi, Neraca, & Arus Kas",
            description: "Hubungan antara Income Statement, Balance Sheet, dan Cash Flow Statement.",
            type: "praktik",
            hours: 10,
            skill: "Financial Accounting",
            resources: [
              { title: "Corporate Finance Institute (CFI) – Reading Financial Statements", url: "https://corporatefinanceinstitute.com/" },
            ],
          },
        ],
      },
      {
        id: "fa-p2",
        title: "Excel Finansial & Analisis Rasio",
        description: "Olahan angka cepat dan akurat untuk menilai kesehatan perusahaan.",
        modules: [
          {
            id: "fa-m3",
            title: "Excel & Spreadsheet untuk Finance",
            description: "INDEX-MATCH/XLOOKUP, Pivot Table, fungsi finansial (NPV, IRR, PMT), dan otomatisasi laporan.",
            type: "praktik",
            hours: 10,
            skill: "Spreadsheet & Excel Modeling",
            resources: [
              { title: "ExcelJet – Financial Functions", url: "https://exceljet.net/" },
            ],
          },
          {
            id: "fa-m4",
            title: "Analisis Rasio Keuangan & Arus Kas",
            description: "Rasio likuiditas, profitabilitas (Gross/Net Margin, ROE), solvabilitas, dan working capital.",
            type: "praktik",
            hours: 8,
            skill: "Cash Flow Analysis",
            resources: [
              { title: "Investopedia – Financial Ratio Analysis", url: "https://www.investopedia.com/financial-edge/0910/6-basic-financial-ratios-and-what-they-tell-you.aspx" },
            ],
          },
        ],
      },
      {
        id: "fa-p3",
        title: "Budgeting, Forecasting & Perpajakan",
        description: "Rencanakan anggaran masa depan dan pahami kewajiban perpajakan bisnis di Indonesia.",
        modules: [
          {
            id: "fa-m5",
            title: "Corporate Budgeting & Variance Analysis",
            description: "Menyusun anggaran tahunan (OPEX & CAPEX) dan mengevaluasi selisih realisasi vs target.",
            type: "praktik",
            hours: 10,
            skill: "Budgeting & Forecasting",
            resources: [
              { title: "CFI – Budgeting and Forecasting", url: "https://corporatefinanceinstitute.com/resources/fpa/" },
            ],
          },
          {
            id: "fa-m6",
            title: "Dasar Perpajakan Perusahaan di Indonesia",
            description: "Pengenalan PPh 21, PPh 23, PPh Final UMKM/Badan, dan PPN.",
            type: "materi",
            hours: 8,
            skill: "Taxation & Compliance",
            resources: [
              { title: "Klikpajak – Panduan Pajak Perusahaan", url: "https://klikpajak.id/blog/" },
            ],
          },
        ],
      },
      {
        id: "fa-p4",
        title: "Proyek Portofolio",
        description: "Model proyeksi keuangan dan rekomendasi efisiensi biaya.",
        modules: [
          {
            id: "fa-m7",
            title: "Proyek: Financial Health Check & Budget Forecast Model",
            description: "Menganalisis laporan keuangan perusahaan ritel, menemukan kebocoran biaya, dan membuat proyeksi 12 bulan.",
            type: "proyek",
            hours: 20,
            skill: "Budgeting & Forecasting",
            resources: [
              { title: "CFI Financial Modeling Best Practices", url: "https://corporatefinanceinstitute.com/resources/financial-modeling/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "project-manager",
    title: "Project & Operations Manager",
    tagline: "Pimpin eksekusi proyek lintas tim agar selesai tepat waktu, sesuai anggaran, dan berdampak nyata.",
    description:
      "Project & Operations Manager merencanakan ruang lingkup proyek, menyusun jadwal (timeline), membagi beban kerja tim, memitigasi risiko operasional, dan memastikan seluruh pemangku kepentingan (stakeholder) bergerak selaras mencapai target.",
    icon: Kanban,
    level: "Menengah",
    demand: "Tinggi",
    skills: ["Project Planning", "Risk & Issue Management", "Stakeholder Communication", "Agile & Waterfall", "Operations Optimization"],
    tools: ["Trello / Asana", "Jira / Notion", "Microsoft Project / Gantt Chart", "Google Sheets", "Slack / Microsoft Teams"],
    salary: { min: 6, max: 15 },
    duration: "4–8 bulan",
    employers: ["Logistik & Supply Chain", "Konstruksi & Infrastruktur", "Konsultan Manajemen", "Perusahaan Teknologi & Perbankan"],
    dayInLife: [
      "Memimpin rapat koordinasi harian/mingguan untuk mengecek progres dan hambatan (blocker) tim",
      "Memperbarui Project Timeline (Gantt Chart), alokasi sumber daya, dan serapan anggaran",
      "Mengidentifikasi risiko keterlambatan vendor/operasional serta menyiapkan rencana mitigasi",
      "Melaporkan status pencapaian milestone proyek kepada jajaran manajemen dan klien",
    ],
    roadmap: [
      {
        id: "pm-p1",
        title: "Fondasi Manajemen Proyek",
        description: "Kuasai siklus proyek dari inisiasi hingga penutupan (Project Lifecycle).",
        modules: [
          {
            id: "pm-m1",
            title: "Siklus Hidup Proyek & Peran Project Manager",
            description: "Initiation, Planning, Execution, Monitoring, dan Closing beserta Triple Constraint (Scope, Time, Cost).",
            type: "materi",
            hours: 6,
            skill: "Project Planning",
            resources: [
              { title: "PMI – What is Project Management", url: "https://www.pmi.org/about/learn-about-pmi/what-is-project-management" },
            ],
          },
          {
            id: "pm-m2",
            title: "Menyusun Project Charter & Work Breakdown Structure (WBS)",
            description: "Mendefinisikan tujuan proyek, ruang lingkup (in-scope/out-of-scope), dan memecah paket kerja.",
            type: "praktik",
            hours: 8,
            skill: "Project Planning",
            resources: [
              { title: "Asana – Guide to Project Charters & WBS", url: "https://asana.com/resources/project-charter" },
            ],
          },
        ],
      },
      {
        id: "pm-p2",
        title: "Penjadwalan, Metodologi & Operasional",
        description: "Kelola alur kerja dengan pendekatan Waterfall, Agile, dan Lean Operations.",
        modules: [
          {
            id: "pm-m3",
            title: "Project Scheduling, Gantt Chart & Critical Path",
            description: "Menentukan dependensi antar tugas, estimasi durasi, dan jalur kritis proyek.",
            type: "praktik",
            hours: 8,
            skill: "Project Planning",
            resources: [
              { title: "Atlassian – Gantt Chart & Timeline Guide", url: "https://www.atlassian.com/agile/project-management/gantt-chart" },
            ],
          },
          {
            id: "pm-m4",
            title: "Metodologi Agile, Scrum & Kanban untuk Eksekusi Tim",
            description: "Mengatur sprint, papan Kanban, daily stand-up, dan retrospective.",
            type: "materi",
            hours: 6,
            skill: "Agile & Waterfall",
            resources: [
              { title: "Scrum Guide Bahasa Indonesia", url: "https://scrumguides.org/" },
            ],
          },
          {
            id: "pm-m5",
            title: "Standarisasi SOP & Efisiensi Operasional (Lean)",
            description: "Menghilangkan bottleneck operasional dan menyusun Standard Operating Procedure (SOP).",
            type: "praktik",
            hours: 8,
            skill: "Operations Optimization",
            resources: [
              { title: "Lean Enterprise Institute – What is Lean", url: "https://www.lean.org/explore-lean/what-is-lean/" },
            ],
          },
        ],
      },
      {
        id: "pm-p3",
        title: "Manajemen Risiko & Komunikasi Stakeholder",
        description: "Antisipasi masalah sebelum terjadi dan jaga keselarasan lintas pihak.",
        modules: [
          {
            id: "pm-m6",
            title: "Risk Register & Mitigasi Krisis Proyek",
            description: "Mengukur probabilitas dan dampak risiko serta menyusun rencana kontingensi.",
            type: "praktik",
            hours: 8,
            skill: "Risk & Issue Management",
            resources: [
              { title: "ProjectManager – Risk Matrix Guide", url: "https://www.projectmanager.com/blog/risk-matrix" },
            ],
          },
          {
            id: "pm-m7",
            title: "Matriks RACI & Komunikasi Eksekutif",
            description: "Membagi tanggung jawab (Responsible, Accountable, Consulted, Informed) dan laporan status proyek.",
            type: "materi",
            hours: 6,
            skill: "Stakeholder Communication",
            resources: [
              { title: "Atlassian – RACI Chart Guide", url: "https://www.atlassian.com/work-management/project-management/raci-chart" },
            ],
          },
        ],
      },
      {
        id: "pm-p4",
        title: "Proyek Portofolio",
        description: "Dokumen perencanaan dan pengendalian proyek komprehensif.",
        modules: [
          {
            id: "pm-m8",
            title: "Proyek: Master Project Plan, RACI & Risk Register",
            description: "Menyusun dokumen Project Charter, WBS, jadwal 8 minggu, matriks RACI, dan Risk Register untuk ekspansi cabang.",
            type: "proyek",
            hours: 18,
            skill: "Risk & Issue Management",
            resources: [
              { title: "Smartsheet – Project Management Templates", url: "https://www.smartsheet.com/top-project-management-excel-templates" },
            ],
          },
        ],
      },
    ],
  },
];

export function getCareer(id: string | null | undefined): Career | undefined {
  if (!id) return undefined;
  return careers.find((c) => c.id === id);
}

export function getAllModules(career: Career) {
  return career.roadmap.flatMap((p) => p.modules);
}

export function formatSalary(salary: { min: number; max: number }) {
  const fmt = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });
  return `Rp${fmt(salary.min)}–${fmt(salary.max)} jt`;
}

export const careerIds = careers.map((c) => c.id) as CareerId[];
