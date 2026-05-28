import {
  Code2,
  Palette,
  Bug,
  LineChart,
  Database,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const careers = [
  {
    icon: Code2,
    title: "Web Developer",
    level: "Beginner Friendly",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    salary: "$65K - $120K",
    duration: "6-12 months",
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    level: "Beginner Friendly",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    salary: "$60K - $110K",
    duration: "4-8 months",
  },
  {
    icon: Bug,
    title: "QA Engineer",
    level: "Intermediate",
    skills: ["Testing", "Automation", "Selenium", "CI/CD"],
    salary: "$55K - $100K",
    duration: "4-6 months",
  },
  {
    icon: LineChart,
    title: "Business Analyst",
    level: "Beginner Friendly",
    skills: ["SQL", "Excel", "Stakeholder Mgmt", "Agile"],
    salary: "$60K - $105K",
    duration: "3-6 months",
  },
  {
    icon: Database,
    title: "Data Analyst",
    level: "Intermediate",
    skills: ["Python", "SQL", "Tableau", "Statistics"],
    salary: "$58K - $110K",
    duration: "6-10 months",
  },
  {
    icon: Smartphone,
    title: "Mobile Developer",
    level: "Intermediate",
    skills: ["React Native", "Swift", "Kotlin", "APIs"],
    salary: "$70K - $130K",
    duration: "8-14 months",
  },
];

export function CareersSection() {
  return (
    <section id="careers" className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Career Paths
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Choose Your Path, We&apos;ll Guide the Way</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Explore curated career tracks with clear roadmaps, salary insights, and realistic simulations.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <div
              key={career.title}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <career.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {career.level}
                </Badge>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                {career.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {career.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Avg Salary</span>
                  <p className="font-semibold text-foreground">{career.salary}</p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">Duration</span>
                  <p className="font-semibold text-foreground">{career.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
