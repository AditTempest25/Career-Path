import { UserPlus, Route, Briefcase, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Tell us about your interests, current skills, and career goals. Our AI analyzes your strengths and potential.",
  },
  {
    icon: Route,
    step: "02",
    title: "Get Your Roadmap",
    description:
      "Receive a personalized learning path with milestones, resources, and timelines tailored to your target career.",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Complete Simulations",
    description:
      "Tackle real-world tasks and projects that mirror actual job responsibilities. Build experience before day one.",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Launch Your Career",
    description:
      "Showcase your simulation portfolio to employers and land your dream role with proven, practical skills.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Four Steps to Career Readiness</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A simple, structured process that takes you from uncertain to unstoppable.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-full top-12 hidden h-px w-full bg-border lg:block" />
              )}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">
                Step {step.step}
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
