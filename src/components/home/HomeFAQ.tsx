import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { getGeneralFAQs, getFAQsForEnvironment } from "@/content/faqs";

export function HomeFAQ() {
  const faqs = [...getGeneralFAQs(), ...getFAQsForEnvironment("commercial")].slice(0, 6);
  if (!faqs.length) return null;
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Straight Answers</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">Questions we hear every week</h2>
        <div className="mt-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
