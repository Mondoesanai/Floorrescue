import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "Floor Rescue is a concrete and resinous flooring company built around 20+ years of trade experience.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">About Floor Rescue</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">
          The Floor Starts With the Slab.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-[1.7] text-warm-white/75">
          <p>
            Floor Rescue is a concrete and resinous flooring company built on decades of hands-on trade experience —
            not a generic coating contractor working from a template.
          </p>
          <p>
            The business is organized the way the trade actually works: by environment — residential, commercial,
            and industrial — and by system, because a floor that performs in a retail showroom can fail fast in a
            commercial kitchen. Every recommendation starts with the slab, the space, and what the floor needs to
            survive.
          </p>
          <p>
            That&apos;s the idea behind &ldquo;the power is in the install&rdquo; — the difference between a floor that
            holds up and one that doesn&apos;t usually comes down to preparation and installation quality, not the
            product on the label.
          </p>
        </div>
        <Button href="/quote" className="mt-10">
          Request a Quote
        </Button>
      </Container>
    </div>
  );
}
