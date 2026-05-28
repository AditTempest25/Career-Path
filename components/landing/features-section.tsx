import {
  Compass,
  BriefcaseBusiness,
  FolderKanban,
  BarChart3,
  GraduationCap,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Career GPS",
    description:
      "Discover your ideal career path with AI-powered assessments and personalized recommendations tailored to your skills and interests.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Work Simulator",
    description:
      "Practice real-world job tasks in a safe environment. Get briefs, complete deliverables, and receive professional feedback.",
  },
  {
    icon: FolderKanban,
    title: "Portfolio Builder",
    description:
      "Automatically compile your best simulation work into a professional portfolio that impresses employers.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor your growth with detailed analytics, skill assessments, and career readiness scores that evolve with you.",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmaps",
    description:
      "Follow structured, step-by-step learning paths curated by industry professionals for each career track.",
  },
  {
    icon: Target,
    title: "Skill Matching",
    description:
      "See exactly which skills you need, which you have, and get actionable recommendations to close the gap.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Everything You Need to Launch Your Career</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From discovery to portfolio-ready — PathForge gives you the tools,
            practice, and confidence to break into your dream career.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
