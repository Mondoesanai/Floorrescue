import Image from "next/image";
import Link from "next/link";

const photos = [
  ["project-metallic-white-garage", "Metallic epoxy"],
  ["project-airport-terminal-scored-concrete", "Scored concrete · terminal"],
  ["project-residential-kitchen-polished", "Polished concrete · kitchen"],
  ["project-industrial-warehouse-polished", "Polished concrete · warehouse"],
  ["project-metallic-blue-garage", "Metallic epoxy"],
  ["project-commercial-kitchen-concrete", "Commercial kitchen restoration"],
  ["project-residential-home-office", "Polished concrete · home office"],
  ["project-mclaren-garage", "Metallic epoxy"],
  ["project-modern-commercial-patio", "Commercial exterior concrete"],
  ["project-residential-slide-polished", "Polished concrete · residence"],
  ["crew-troweling-floor", "On the trowel"],
  ["project-metallic-blue-empty-room", "Metallic epoxy"],
] as const;

/** A slow, endless rail of real Floor Rescue work. */
export function WorkRail() {
  const row = [...photos, ...photos];
  return (
    <section className="overflow-hidden border-t border-warm-white/10 bg-charcoal-950 py-16">
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">The Work</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">Real floors. Real jobsites.</h2>
        </div>
        <Link href="/projects" className="hidden text-sm font-semibold text-gold-200 hover:text-gold-100 sm:block">
          Browse all projects →
        </Link>
      </div>
      <div className="flex w-max gap-4" style={{ animation: "marquee 70s linear infinite" }}>
        {row.map(([file, label], i) => (
          <figure key={`${file}-${i}`} className="relative h-56 w-80 flex-none overflow-hidden rounded-xl border border-warm-white/10 sm:h-64 sm:w-96">
            <Image src={`/assets/images/team-photos/${file}.png`} alt={label} fill sizes="24rem" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/90 to-transparent px-4 pt-8 pb-3 text-xs font-semibold tracking-[0.1em] text-warm-white/80 uppercase">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
