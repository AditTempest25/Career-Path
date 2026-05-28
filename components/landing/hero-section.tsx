import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 lg:pb-32 lg:pt-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Your Career Starts Here
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">
              Navigate Your Career{" "}
              <span className="text-primary">With Confidence</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Get personalized career roadmaps, practice with realistic work
            simulations, and build a portfolio that proves you&apos;re ready for
            the real world.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/auth/register">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-semibold text-secondary-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">12,000+</span> career starters worldwide
            </p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
              <div className="ml-4 flex-1 rounded-md bg-muted px-3 py-1 text-center text-xs text-muted-foreground">
                app.pathforge.io/dashboard
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0">
              {/* Mini sidebar */}
              <div className="col-span-3 hidden border-r border-border bg-muted/30 p-4 lg:block">
                <div className="space-y-3">
                  {["Dashboard", "Career GPS", "Simulator", "Portfolio", "Progress"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`rounded-lg px-3 py-2 text-xs font-medium ${
                          i === 0
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* Main content */}
              <div className="col-span-12 p-6 lg:col-span-9">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="h-3 w-32 rounded bg-foreground/80" />
                    <div className="mt-2 h-2 w-48 rounded bg-muted-foreground/30" />
                  </div>
                  <div className="h-8 w-24 rounded-lg bg-primary/10" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Career Score", value: "78%", color: "bg-primary/10" },
                    { label: "Tasks Done", value: "24", color: "bg-accent/10" },
                    { label: "Skills", value: "12", color: "bg-success/10" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-xl ${stat.color} p-4`}
                    >
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="flex-1 rounded-xl border border-border p-4">
                    <div className="h-2 w-20 rounded bg-muted-foreground/30" />
                    <div className="mt-3 flex items-end gap-1">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-primary/20"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="hidden flex-1 rounded-xl border border-border p-4 md:block">
                    <div className="h-2 w-24 rounded bg-muted-foreground/30" />
                    <div className="mt-3 space-y-2">
                      {[75, 60, 45, 30].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-2 w-12 rounded bg-muted-foreground/20" />
                          <div className="h-2 flex-1 rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-accent"
                              style={{ width: `${w}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
