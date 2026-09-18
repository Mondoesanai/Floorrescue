const names = [
  "TD Industries",
  "Amazon",
  "KIA Dealerships",
  "Luminant Power Plants",
  "Comerica Bank",
  "McKinney Airport",
  "Verdad Real Estate",
  "Stewart Peninsula Golf Course",
  "Crocker Reynolds Kovarik",
  "City of Lewisville",
];

export function ClientMarquee() {
  const row = [...names, ...names];
  return (
    <div className="overflow-hidden border-y border-warm-white/10 bg-charcoal-950 py-5">
      <div className="animate-[marquee_32s_linear_infinite] flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center gap-10 text-sm font-semibold tracking-[0.15em] text-warm-white/35 uppercase">
            {name}
            <span className="h-1 w-1 rounded-full bg-gold-500/50" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
