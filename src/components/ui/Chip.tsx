import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={clsx(
        "rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-[transform,opacity,background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 active:scale-[0.97]",
        active
          ? "border-gold-300 bg-gold-500/15 text-gold-100"
          : "border-warm-white/20 text-warm-white/70 hover:border-warm-white/40 hover:text-warm-white",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
