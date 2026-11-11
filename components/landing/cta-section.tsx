import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center lg:px-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary-foreground md:text-4xl">
              <span className="text-balance">Ready to Forge Your Path?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Join thousands of ambitious career starters who are building real
              skills and landing their dream roles.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 px-8"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-primary-foreground/60">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
