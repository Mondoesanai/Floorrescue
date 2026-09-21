import { Reveal } from "@/components/ui/Reveal";

const order: [string, string, string][] = [
  ["residential", "For your home", "Residential"],
  ["commercial", "For your business", "Commercial"],
  ["industrial", "For your facility", "Industrial"],
  ["trade", "For the trade", "Architects, builders & GCs"],
];

/** First sentences up to ~230 characters; the rest (if any) goes behind a "more detail" toggle. */
function splitShort(text: string): [string, string] {
  if (text.length <= 260) return [text, ""];
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let head = "";
  for (const sent of sentences) {
    if (head && (head + sent).length > 230) break;
    head += sent;
  }
  head = head.trim();
  return [head || text, text.slice(head.length).trim()];
}

/**
 * The same system in the voice of whoever is reading, laid out as sections you
 * scroll through — nothing to click, nothing hidden. One short paragraph each.
 */
export function AudienceSections({ summaries }: { summaries: Record<string, string | undefined> }) {
  const rows = order.filter(([id]) => summaries[id]);
  if (!rows.length) return null;
  return (
    <div className="mt-10 divide-y divide-warm-white/10 border-y border-warm-white/10">
      {rows.map(([id, label, who], i) => (
        <Reveal key={id} delay={i * 60}>
          <section className="grid gap-3 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.01em] text-warm-white">{label}</h2>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-gold-300 uppercase">{who}</p>
            </div>
            {(() => {
              const [head, rest] = splitShort(summaries[id] ?? "");
              return (
                <div>
                  <p className="text-base leading-[1.75] text-warm-white/80">{head}</p>
                  {rest ? (
                    <details className="group mt-3">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-gold-200 marker:content-none hover:text-gold-100">
                        <span className="group-open:hidden">More detail</span>
                        <span className="hidden group-open:inline">Less</span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform group-open:rotate-180" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-sm leading-[1.75] text-warm-white/65">{rest}</p>
                    </details>
                  ) : null}
                </div>
              );
            })()}
          </section>
        </Reveal>
      ))}
    </div>
  );
}
