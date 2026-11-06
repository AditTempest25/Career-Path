import {
  Bug,
  Code2,
  Database,
  LineChart,
  Palette,
  Smartphone,
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
