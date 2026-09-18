import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/content/testimonials";
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
      <TestimonialsModule testimonials={testimonials} />
    </div>
  );
}
