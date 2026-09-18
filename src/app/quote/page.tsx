import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Start a Floor Rescue project — tell us about your space and we'll follow up with a quote.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <div className="py-16">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Request a Quote</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">
          Tell us about the project.
        </h1>
        <p className="mt-4 text-base leading-[1.7] text-warm-white/70">
          If you got here from the guided experience, we&apos;ve already carried your answers over — just fill in
          the rest.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-warm-white/50">Loading form…</p>}>
            <QuoteForm />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
