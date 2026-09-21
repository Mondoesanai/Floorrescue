import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/content/testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { TestimonialsModule } from "@/components/landing/TestimonialsModule";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What it's like to work with Floor Rescue.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <div className="py-16">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Testimonials</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">
          What it&apos;s like to work with Floor Rescue
        </h1>
        {testimonials.length > 0 ? (
          <div className="mt-4 flex items-center gap-1.5">
            <div className="flex gap-0.5 text-gold-300" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7-5.4-4.7 7.1-.6z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-warm-white/80">
              5.0 — {testimonials.length} real reviews, every one 5 stars
            </span>
          </div>
        ) : null}
        {testimonials.length === 0 ? (
          <p className="mt-6 text-base leading-[1.7] text-warm-white/70">
            Client testimonials are being collected for this site. Ask us for project references directly, or
            request a quote and we&apos;ll follow up.
          </p>
        ) : null}
        <Button href="/quote" className="mt-8">
          Request a Quote
        </Button>
      </Container>
      <Marquee items={testimonials.map((t) => t.attribution.split(" — ")[0])} seconds={50} />
      <TestimonialsModule testimonials={testimonials} />
    </div>
  );
}
