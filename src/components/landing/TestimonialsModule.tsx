import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/content/types";

export function TestimonialsModule({ testimonials }: { testimonials: Testimonial[] }) {
  // Intentionally renders nothing when empty rather than filling the space
  // with a fabricated quote — see content/testimonials.ts.
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16">
      <Container>
        <SectionHeading eyebrow="From Clients" title="What it's like to work with Floor Rescue" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="rounded-md border border-warm-white/10 bg-charcoal-950/60 p-6">
              <div className="flex gap-0.5 text-gold-300" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7-5.4-4.7 7.1-.6z" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-base leading-[1.7] text-warm-white/80">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-3 text-sm text-gold-300">{t.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
