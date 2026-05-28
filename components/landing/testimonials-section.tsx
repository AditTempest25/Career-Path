import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Now Frontend Developer at Shopify",
    initials: "SC",
    quote:
      "PathForge gave me the confidence I lacked. The work simulations felt like real projects, and my portfolio helped me land my first dev job within 3 months.",
  },
  {
    name: "Marcus Rivera",
    role: "UX Designer at a Startup",
    initials: "MR",
    quote:
      "I was lost after graduation. PathForge mapped out exactly what I needed to learn, practice, and build. The structured roadmap changed everything.",
  },
  {
    name: "Aisha Patel",
    role: "QA Engineer at Microsoft",
    initials: "AP",
    quote:
      "The simulation tasks were incredibly realistic. Reviewers gave me feedback I could actually use, and the portfolio I built stood out in interviews.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Hear From Career Starters Like You</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-warning text-warning"
                  />
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
