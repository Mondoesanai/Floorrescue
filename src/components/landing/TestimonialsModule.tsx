import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/content/types";

/**
 * With `limit`, shows just that many reviews plus a "View all reviews" link and
 * a quote button — landing pages don't need every review, the reviews page does.
 */
export function TestimonialsModule({
  testimonials,
  limit,
  quoteHref = "/quote",
}: {
  testimonials: Testimonial[];
  limit?: number;
  quoteHref?: string;
}) {
  // Intentionally renders nothing when empty rather than filling the space
  // with a fabricated quote — see content/testimonials.ts.
  if (testimonials.length === 0) return null;
  const shown = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16">
      <Container>
        <SectionHeading eyebrow="From Clients" title="What it's like to work with Floor Rescue" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {shown.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} className="h-full">
              <blockquote className="h-full rounded-md border border-warm-white/10 bg-charcoal-950/60 p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/30">
                <div className="flex gap-0.5 text-gold-300" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7-5.4-4.7 7.1-.6z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-base leading-[1.7] text-warm-white/80">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm text-gold-300">{t.attribution}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        {limit && testimonials.length > limit ? (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/testimonials"
              className="rounded-full border border-warm-white/25 px-6 py-3 text-sm font-semibold text-warm-white/85 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-100"
            >
              View all {testimonials.length} reviews
            </Link>
            <Button href={quoteHref}>Request a Quote</Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
