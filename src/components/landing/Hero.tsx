import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { ResolvedHeroCopy } from "@/content/heroCopy";

interface HeroProps {
  copy: ResolvedHeroCopy;
  posterSrc: string;
  quoteHref: string;
}

export function Hero({ copy, posterSrc, quoteHref }: HeroProps) {
  return (
    <section className="relative flex min-h-[85svh] animate-[hero-fade-in_600ms_cubic-bezier(0.22,1,0.36,1)] items-end overflow-hidden bg-charcoal-950">
      <Image src={posterSrc} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-transparent to-transparent" />

      <div className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-24">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{copy.eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-5 text-base leading-[1.7] text-warm-white/75">{copy.support}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={quoteHref}>Request a Quote</Button>
            <Button href="#relevant-systems" variant="secondary">
              See Floor Systems
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
