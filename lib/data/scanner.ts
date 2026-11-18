import type { CareerId } from "@/lib/types";
import { careers, getAllModules, getCareer } from "@/lib/data/careers";

export interface SkillKeywordMap {
  skill: string;
  careerIds: CareerId[];
  keywords: string[];
  category: "frontend" | "backend" | "design" | "qa" | "data" | "analysis" | "mobile" | "general";
}

export const skillDictionary: SkillKeywordMap[] = [
  /* Web Dev & Frontend */
  {
    skill: "HTML & CSS",
    careerIds: ["web-developer"],
    keywords: ["html", "html5", "css", "css3", "sass", "scss", "tailwind", "bootstrap", "flexbox", "grid", "responsive web"],
    category: "frontend",
  },
  {
    skill: "JavaScript",
    careerIds: ["web-developer", "qa-engineer"],
    keywords: ["javascript", "js", "typescript", "ts", "es6", "vanilla js", "dom manipulation", "async/await"],
    category: "frontend",
  },
  {
    skill: "React",
    careerIds: ["web-developer"],
    keywords: ["react", "react.js", "reactjs", "next.js", "nextjs", "jsx", "hooks", "redux", "zustand"],
    category: "frontend",
  },
  {
    skill: "Node.js",
    careerIds: ["web-developer"],
    keywords: ["node", "nodejs", "node.js", "express", "express.js", "nest.js", "rest api", "backend"],
    category: "backend",
  },
  {
    skill: "Git",
    careerIds: ["web-developer", "qa-engineer", "mobile-developer"],
    keywords: ["git", "github", "gitlab", "bitbucket", "version control", "pull request", "branching"],
    category: "general",
  },

  /* UI/UX */
  {
    skill: "Figma",
    careerIds: ["ui-ux-designer"],
    keywords: ["figma", "figjam", "auto layout", "component variants", "design tokens", "ui design"],
    category: "design",
  },
  {
    skill: "User Research",
    careerIds: ["ui-ux-designer"],
    keywords: ["user research", "usability testing", "in-depth interview", "user persona", "user interview", "heuristic evaluation", "survey"],
    category: "design",
  },
  {
    skill: "Wireframing",
    careerIds: ["ui-ux-designer"],
    keywords: ["wireframe", "wireframing", "lo-fi", "mid-fi", "information architecture", "user flow", "sitemap"],
    category: "design",
  },
  {
    skill: "Prototyping",
    careerIds: ["ui-ux-designer"],
    keywords: ["prototype", "prototyping", "interactive prototype", "micro-interaction", "smart animate", "maze"],
    category: "design",
  },
  {
    skill: "Design System",
    careerIds: ["ui-ux-designer"],
    keywords: ["design system", "design tokens", "atomic design", "component library", "style guide"],
    category: "design",
  },

  /* QA Engineer */
  {
    skill: "Test Case Design",
    careerIds: ["qa-engineer"],
    keywords: ["test case", "test plan", "test scenario", "stlc", "boundary value analysis", "equivalence partitioning"],
    category: "qa",
  },
  {
    skill: "Bug Reporting",
    careerIds: ["qa-engineer"],
    keywords: ["bug report", "bug reporting", "jira", "testrail", "trello", "issue tracking", "severity", "reproduce steps"],
    category: "qa",
  },
  {
    skill: "API Testing",
    careerIds: ["qa-engineer", "web-developer", "mobile-developer"],
    keywords: ["api testing", "postman", "rest api", "swagger", "insomnia", "curl", "endpoint testing"],
    category: "qa",
  },
  {
    skill: "Automation",
    careerIds: ["qa-engineer"],
    keywords: ["automation", "playwright", "cypress", "selenium", "appium", "ci/cd", "e2e testing", "automated testing"],
    category: "qa",
  },

  /* Data Analyst */
  {
    skill: "SQL",
    careerIds: ["data-analyst", "business-analyst", "qa-engineer"],
    keywords: ["sql", "mysql", "postgresql", "bigquery", "sqlite", "query", "rdbms", "database", "join", "group by"],
    category: "data",
  },
  {
    skill: "Spreadsheet",
    careerIds: ["data-analyst", "business-analyst"],
    keywords: ["excel", "google sheets", "spreadsheet", "pivot table", "vlookup", "xlookup", "macros", "data cleaning"],
    category: "data",
  },
  {
    skill: "Python",
    careerIds: ["data-analyst"],
    keywords: ["python", "pandas", "numpy", "matplotlib", "seaborn", "jupyter", "jupyter notebook", "data analysis"],
    category: "data",
  },
  {
    skill: "Statistika",
    careerIds: ["data-analyst"],
    keywords: ["statistics", "statistika", "probability", "hypothesis testing", "correlation", "regression", "a/b testing"],
    category: "data",
  },
  {
    skill: "Visualisasi Data",
    careerIds: ["data-analyst"],
    keywords: ["tableau", "looker", "looker studio", "power bi", "dashboard", "data visualization", "storytelling with data"],
    category: "data",
  },

  /* Business Analyst */
  {
    skill: "Requirement Gathering",
    careerIds: ["business-analyst"],
    keywords: ["requirement gathering", "brd", "prd", "elicitation", "user story", "acceptance criteria", "babok"],
    category: "analysis",
  },
  {
    skill: "Process Modeling",
    careerIds: ["business-analyst"],
    keywords: ["bpmn", "flowchart", "process flow", "as-is", "to-be", "draw.io", "lucidchart", "business process"],
    category: "analysis",
  },
  {
    skill: "Stakeholder Mgmt",
    careerIds: ["business-analyst"],
    keywords: ["stakeholder", "stakeholder management", "raci", "communication", "facilitation", "workshop"],
    category: "analysis",
  },
  {
    skill: "Agile",
    careerIds: ["business-analyst", "web-developer", "qa-engineer"],
    keywords: ["agile", "scrum", "sprint", "kanban", "product backlog", "daily standup", "retrospective"],
    category: "analysis",
  },

  /* Mobile Developer */
  {
    skill: "Dart",
    careerIds: ["mobile-developer"],
    keywords: ["dart", "dart lang", "oop", "null safety", "asynchronous programming"],
    category: "mobile",
  },
  {
    skill: "Flutter",
    careerIds: ["mobile-developer"],
    keywords: ["flutter", "flutter sdk", "widgets", "stateless", "stateful", "cross-platform", "mobile app"],
    category: "mobile",
  },
  {
    skill: "State Management",
    careerIds: ["mobile-developer", "web-developer"],
    keywords: ["state management", "provider", "riverpod", "bloc", "getx", "redux", "mobx"],
    category: "mobile",
  },
  {
    skill: "Kotlin",
    careerIds: ["mobile-developer"],
    keywords: ["kotlin", "android studio", "android native", "gradle", "jetpack compose"],
    category: "mobile",
  },

  /* Digital Marketer (Non-IT) */
  {
    skill: "Copywriting",
    careerIds: ["digital-marketer"],
    keywords: ["copywriting", "copywriter", "content writing", "storytelling", "aida", "scriptwriting", "caption"],
    category: "general",
  },
  {
    skill: "Social Media Strategy",
    careerIds: ["digital-marketer"],
    keywords: ["social media", "instagram", "tiktok", "content pillar", "content calendar", "engagement", "kol", "influencer"],
    category: "general",
  },
  {
    skill: "SEO & Content",
    careerIds: ["digital-marketer"],
    keywords: ["seo", "search engine optimization", "keyword research", "google search console", "ahrefs", "semrush", "artikel"],
    category: "general",
  },
  {
    skill: "Performance Ads",
    careerIds: ["digital-marketer"],
    keywords: ["meta ads", "facebook ads", "google ads", "tiktok ads", "sem", "roas", "cpa", "cpc", "paid ads"],
    category: "general",
  },
  {
    skill: "Marketing Analytics",
    careerIds: ["digital-marketer"],
    keywords: ["google analytics", "ga4", "ctr", "conversion rate", "marketing funnel", "insight", "campaign report"],
    category: "analysis",
  },

  /* HR & Talent Acquisition (Non-IT) */
  {
    skill: "Recruitment & Selection",
    careerIds: ["hr-specialist"],
    keywords: ["recruitment", "rekrutmen", "talent acquisition", "cv screening", "sourcing", "job description", "hiring"],
    category: "general",
  },
  {
    skill: "Behavioral Interview",
    careerIds: ["hr-specialist"],
    keywords: ["interview", "wawancara", "behavioral interview", "metode star", "psikotes", "asesmen", "seleksi"],
    category: "general",
  },
  {
    skill: "Onboarding & Training",
    careerIds: ["hr-specialist"],
    keywords: ["onboarding", "orientasi", "training", "pelatihan", "learning and development", "l&d", "employer branding"],
    category: "general",
  },
  {
    skill: "Performance Management",
    careerIds: ["hr-specialist"],
    keywords: ["kpi", "okr", "performance appraisal", "evaluasi kinerja", "workload analysis", "kompetensi"],
    category: "general",
  },
  {
    skill: "Employee Relations",
    careerIds: ["hr-specialist"],
    keywords: ["employee relations", "hris", "pkwt", "pkwtt", "bpjs", "payroll", "hubungan industrial", "sdm", "human resources"],
    category: "general",
  },

  /* Finance & Accounting Analyst (Non-IT) */
  {
    skill: "Financial Accounting",
    careerIds: ["finance-analyst"],
    keywords: ["akuntansi", "accounting", "jurnal", "neraca", "laba rugi", "laporan keuangan", "balance sheet", "income statement", "audit"],
    category: "analysis",
  },
  {
    skill: "Spreadsheet & Excel Modeling",
    careerIds: ["finance-analyst", "data-analyst"],
    keywords: ["financial modeling", "accurate", "jurnal.id", "sap", "erp", "rekonsiliasi", "pembukuan"],
    category: "data",
  },
  {
    skill: "Budgeting & Forecasting",
    careerIds: ["finance-analyst"],
    keywords: ["budgeting", "forecasting", "anggaran", "variance analysis", "opex", "capex", "cost control", "rab"],
    category: "analysis",
  },
  {
    skill: "Cash Flow Analysis",
    careerIds: ["finance-analyst"],
    keywords: ["cash flow", "arus kas", "piutang", "hutang", "account receivable", "account payable", "working capital", "likuiditas"],
    category: "analysis",
  },
  {
    skill: "Taxation & Compliance",
    careerIds: ["finance-analyst"],
    keywords: ["pajak", "tax", "pph 21", "pph 23", "ppn", "brevet", "e-faktur", "spt", "perpajakan"],
    category: "analysis",
  },

  /* Project & Operations Manager (Non-IT) */
  {
    skill: "Project Planning",
    careerIds: ["project-manager"],
    keywords: ["project management", "manajemen proyek", "project charter", "wbs", "gantt chart", "timeline", "milestone", "trello", "asana"],
    category: "analysis",
  },
  {
    skill: "Risk & Issue Management",
    careerIds: ["project-manager"],
    keywords: ["risk management", "manajemen risiko", "mitigasi", "risk register", "contingency", "problem solving"],
    category: "analysis",
  },
  {
    skill: "Stakeholder Communication",
    careerIds: ["project-manager", "business-analyst"],
    keywords: ["koordinasi", "kepemimpinan", "leadership", "negosiasi", "vendor management", "presentasi"],
    category: "general",
  },
  {
    skill: "Agile & Waterfall",
    careerIds: ["project-manager", "business-analyst"],
    keywords: ["waterfall", "critical path", "pmp", "capm", "sprint planning", "project lifecycle"],
    category: "analysis",
  },
  {
    skill: "Operations Optimization",
    careerIds: ["project-manager"],
    keywords: ["operasional", "operations", "sop", "standard operating procedure", "supply chain", "logistik", "lean", "efisiensi"],
    category: "analysis",
  },
];

export interface ScanResult {
  detectedSkills: string[];
  targetCareerId: CareerId;
  targetCareerTitle: string;
  matchedSkills: string[];
  gapSkills: string[];
  matchScore: number;
  matchingModuleIds: string[];
  recommendedModules: { id: string; title: string; skill: string; hours: number }[];
}

export function analyzeResumeText(rawText: string, targetCareerId: CareerId): ScanResult {
  const normalized = rawText.toLowerCase();
  const detectedSkillsSet = new Set<string>();

  // Check each skill against keywords
  for (const entry of skillDictionary) {
    const isPresent = entry.keywords.some((kw) => {
      // Regex word boundary matching when kw is alphanumeric
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, "i");
      return regex.test(normalized);
    });

    if (isPresent) {
      detectedSkillsSet.add(entry.skill);
    }
  }

  const detectedSkills = Array.from(detectedSkillsSet);
  const targetCareer = getCareer(targetCareerId);
  const careerSkills = targetCareer ? targetCareer.skills : [];

  const matchedSkills = careerSkills.filter((s) => detectedSkillsSet.has(s));
  const gapSkills = careerSkills.filter((s) => !detectedSkillsSet.has(s));

  const matchRatio = careerSkills.length > 0 ? matchedSkills.length / careerSkills.length : 0;
  const matchScore = Math.round(matchRatio * 100);

  // Map matched skills to roadmap modules
  const allMods = targetCareer ? getAllModules(targetCareer) : [];
  const matchingModuleIds = allMods
    .filter((m) => matchedSkills.includes(m.skill))
    .map((m) => m.id);

  // Modules that are still in gap skills
  const recommendedModules = allMods
    .filter((m) => gapSkills.includes(m.skill))
    .slice(0, 4)
    .map((m) => ({ id: m.id, title: m.title, skill: m.skill, hours: m.hours }));

  return {
    detectedSkills,
    targetCareerId,
    targetCareerTitle: targetCareer?.title || "Target Karier",
    matchedSkills,
    gapSkills,
    matchScore,
    matchingModuleIds,
    recommendedModules,
  };
}
