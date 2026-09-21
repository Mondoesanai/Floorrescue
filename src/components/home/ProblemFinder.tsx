import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { problems } from "@/content/problems";

export function ProblemFinder() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Have a Problem Right Now?</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          What are you dealing with?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/60">
          Pick the closest match — you&apos;ll land on what usually causes it and the systems that fix it.
        </p>
        <Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <Link
                key={p.id}
                href={`/problems/${p.id}`}
                className="group flex flex-col rounded-xl border border-warm-white/10 bg-charcoal-950 p-4 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50"
              >
                <span className="text-sm font-bold text-warm-white">{p.label}</span>
                <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-[1.6] text-warm-white/50">{p.shortDescription}</p>
                <span className="mt-3 text-[10px] font-bold tracking-[0.12em] text-gold-300 uppercase transition-transform group-hover:translate-x-0.5">
                  See the fix →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
