import type { FAQ } from "@/content/types";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-warm-white/10 rounded-md border border-warm-white/10 bg-charcoal-900">
      {faqs.map((faq) => (
        <details key={faq.id} className="group px-5 py-4 open:pb-5 first:rounded-t-md last:rounded-b-md">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-warm-white marker:content-none transition-[color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300">
            {faq.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-lg font-light text-gold-300 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-[1.7] text-warm-white/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
