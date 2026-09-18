import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

          {/* Meet the Owner — a real photo is pending from the client; this is an
              honest placeholder, never a generated stand-in for a real person. */}
          <div className="rounded-2xl border border-warm-white/10 bg-charcoal-950 p-7 shadow-elevated">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Meet the Owner</p>
            <div className="mt-5 flex items-center gap-5">
              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full border border-gold-500/30 bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-xl font-bold tracking-wide text-gold-300">
                J
              </div>
              <div>
                <p className="text-lg font-bold text-warm-white">Jeremy</p>
                <p className="text-sm text-warm-white/50">Founder, Floor Rescue</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-[1.7] text-warm-white/70">
              Two decades in the trade, across concrete and resinous systems, residential, commercial, and
              industrial work. Every project starts with the same question: what does the slab and the space
              actually need to survive?
            </p>
            <p className="mt-3 text-xs text-warm-white/35">Photo coming soon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
