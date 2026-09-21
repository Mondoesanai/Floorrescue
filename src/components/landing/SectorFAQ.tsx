import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { getFAQsForEnvironment, getGeneralFAQs } from "@/content/faqs";
import type { Environment } from "@/content/types";

/** Real answers for this kind of space — environment questions first, then the sitewide ones. */
export function SectorFAQ({ environment }: { environment: Environment }) {
  const list = [...getFAQsForEnvironment(environment), ...getGeneralFAQs()].slice(0, 6);
  if (list.length === 0) return null;
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Straight Answers" title="Questions people ask before they start" align="center" />
        <div className="mt-8">
          <FAQAccordion faqs={list} />
        </div>
      </Container>
    </section>
  );
}
