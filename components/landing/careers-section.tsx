import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { careers, formatSalary } from "@/lib/data/careers";

export function CareersSection() {
  return (
    <section id="careers" className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Jalur Karier
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Pilih Jalurmu, Kami Pandu Langkahnya</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Eksplorasi jalur karier teknologi dengan roadmap terstruktur, simulasi kerja nyata, dan acuan gaji standar industri Indonesia.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <Link
              key={career.id}
              href={`/careers/${career.id}`}
              className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <career.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {career.level}
                </Badge>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {career.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {career.tagline}
              </p>

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
                  <span className="text-xs text-muted-foreground">Est. Gaji/bln</span>
                  <p className="font-semibold text-foreground">{formatSalary(career.salary)}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Durasi</span>
                  <p className="font-semibold text-foreground">{career.duration}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
