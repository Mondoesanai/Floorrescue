import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

export function WhoWeAreSection() {
  return (
    <section id="learn-more" className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24 scroll-mt-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Who We Are</p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
              We are Floor Rescue — a concrete and resinous flooring company built on decades in the trade.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.7] text-warm-white/70">
              We work across residential, commercial, and industrial spaces, and every recommendation starts the
              same way: the slab, the space, and what the floor actually needs to survive. The trade isn&apos;t
              complicated — it&apos;s layered, and we&apos;ve spent years building the systems, terminology, and
              process to match that.
            </p>
            <p className="mt-4 max-w-xl text-base leading-[1.7] text-warm-white/70">
              Ready to start? Choose My Home, My Business, or My Facility above and we&apos;ll walk you straight to
              a plan built for your space — or request a quote any time and tell us directly.
            </p>
            <Button href="/quote" className="mt-7">
              Request a Quote
            </Button>
          </div>

          {/* Meet the Owner — real photo of Jeremy, supplied by the client. */}
          <div className="relative overflow-visible rounded-2xl border border-warm-white/10 bg-charcoal-950 shadow-elevated">
            <div className="pointer-events-none absolute -top-8 right-2 z-10 hidden sm:block lg:-right-8">
              <RotatingBadge />
            </div>
            <div className="relative h-72 w-full overflow-hidden rounded-t-2xl sm:h-80">
              <Image
                src="/assets/images/jeremy-owner.png"
                alt="Jeremy, Founder of Floor Rescue"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
            </div>
            <div className="rounded-b-2xl bg-charcoal-950 p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Meet the Owner</p>
              <p className="mt-2 text-lg font-bold text-warm-white">Jeremy</p>
              <p className="text-sm text-warm-white/50">Founder, Floor Rescue</p>
              <p className="mt-5 text-sm leading-[1.7] text-warm-white/70">
                Two decades in the trade, across concrete and resinous systems, residential, commercial, and
                industrial work. Every project starts with the same question: what does the slab and the space
                actually need to survive?
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
