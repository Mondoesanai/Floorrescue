import clsx from "clsx";

/** Endless scrolling strip of short labels — pure CSS, honors reduced motion globally. */
export function Marquee({
  items,
  seconds = 40,
  reverse,
  className,
}: {
  items: string[];
  seconds?: number;
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={clsx("overflow-hidden border-y border-warm-white/10 bg-charcoal-950 py-4", className)} aria-hidden="true">
      <div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animation: `marquee ${seconds}s linear infinite ${reverse ? "reverse" : "normal"}` }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 text-xs font-semibold tracking-[0.16em] text-warm-white/40 uppercase">
            {item}
            <span className="h-1 w-1 rounded-full bg-gold-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
