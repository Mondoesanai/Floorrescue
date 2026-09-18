import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function QuoteCTA({ href, sectorLabel }: { href: string; sectorLabel: string }) {
  return (
    <section className="border-t border-warm-white/10 bg-gradient-to-b from-charcoal-900 to-charcoal-950 py-20">
      <Container className="text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{sectorLabel}</p>
        <h2 className="mx-auto mt-3 max-w-xl text-balance text-3xl font-semibold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Ready to get a floor plan for this space?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-[1.7] text-warm-white/70">
          Tell us a little more and we&apos;ll pick up where you left off — no need to repeat anything you&apos;ve
          already told us.
        </p>
        <Button href={href} className="mt-8">
          Request a Quote
        </Button>
      </Container>
    </section>
  );
}
