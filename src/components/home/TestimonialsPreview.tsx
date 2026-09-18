import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";

export function TestimonialsPreview() {
  const featured = testimonials.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Client Stories</p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
              What our clients say
            </h2>
          </div>
          <Link href="/testimonials" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
            Read all reviews →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featured.map((t) => (
            <div key={t.id} className="flex flex-col rounded-2xl border border-warm-white/10 bg-charcoal-950 p-7 shadow-elevated">
              <div className="flex gap-0.5 text-gold-300" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7-5.4-4.7 7.1-.6z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-[1.7] text-warm-white/75">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-5 text-sm font-semibold text-warm-white">{t.attribution}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
