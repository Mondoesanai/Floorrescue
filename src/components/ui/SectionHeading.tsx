import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  support?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, support, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-warm-white sm:text-4xl">{title}</h2>
      {support ? <p className="mt-4 text-base leading-[1.7] text-warm-white/70">{support}</p> : null}
    </div>
  );
}
