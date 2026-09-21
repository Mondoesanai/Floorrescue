export function RotatingBadge({ text = "20+ YEARS IN THE TRADE • CONCRETE • COATINGS • " }: { text?: string }) {
  const id = "rotating-badge-path";
  return (
    <div className="badge-wheel relative flex h-24 w-24 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]">
        <defs>
          <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill="var(--color-gold-300)" fontSize="7.2" fontWeight="700" letterSpacing="1.5">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-700 shadow-elevated">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-charcoal-950">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  );
}
