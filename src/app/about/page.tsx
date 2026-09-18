import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CredentialsStrip } from "@/components/landing/CredentialsStrip";

export const metadata: Metadata = {
  title: "About",
  description: "Floor Rescue is a concrete and resinous flooring company built around 20+ years of trade experience.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "We Start With Conditions",
    body: "Every slab is different. Existing conditions determine prep, repair, moisture strategy, system selection, and finish — before anything gets proposed.",
  },
  {
    title: "We Understand the Whole System",
    body: "Prep, primer, build coat, design layer, topcoat, cure, and maintenance — not just the material in the bucket. A floor is only as good as the step nobody sees.",
  },
  {
    title: "We Work Across Concrete + Coatings",
    body: "Floor Rescue isn't boxed into one product category. The right answer is sometimes the concrete itself, sometimes a resinous system built on top of it.",
  },
  {
    title: "We Can Speak to the Project Team",
    body: "Homeowner, designer, builder, GC, architect, property manager, or facility operator — the conversation changes, the standard doesn't.",
  },
  {
    title: "Restoration Before Replacement",
    body: "When it makes sense, an existing slab can be repaired, re-profiled, restored, densified, polished, overlaid, or coated instead of torn out.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[50svh] items-end overflow-hidden bg-charcoal-950">
        <Image
          src="/assets/images/team-photos/jeremy-warehouse-smiling.png"
          alt="Jeremy on a Floor Rescue jobsite"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/15" />
        <Container className="relative z-10 pb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">About Floor Rescue</p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-[-0.03em] text-warm-white sm:text-5xl">
            Built From the Jobsite Up.
          </h1>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <div className="space-y-4 text-base leading-[1.7] text-warm-white/75">
            <p>
              Floor Rescue is a concrete and resinous flooring company built on decades of hands-on trade
              experience — not a generic coating contractor working from a template.
            </p>
            <p>
              The business is organized the way the trade actually works: by environment — residential, commercial,
              and industrial — and by system, because a floor that performs in a retail showroom can fail fast in a
              commercial kitchen. Every recommendation starts with the slab, the space, and what the floor needs to
              survive.
            </p>
            <p>
              That&apos;s the idea behind &ldquo;the power is in the install&rdquo; — the difference between a floor
              that holds up and one that doesn&apos;t usually comes down to preparation and installation quality,
              not the product on the label.
            </p>
            <p>
              Jeremy has spent his career on the install side of this trade — hands-on with the grinders, the
              coatings, and the slabs themselves, not managing it from a distance. That&apos;s the same standard the
              rest of the crew works to.
            </p>
          </div>
          <Button href="/quote" className="mt-10">
            Request a Quote
          </Button>
        </Container>
      </section>

      <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">The Power Is in the Install</p>
          <h2 className="mt-2 max-w-xl text-balance text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
            What that actually means, job to job.
          </h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-warm-white/10 bg-charcoal-950 p-6 shadow-elevated">
                <h3 className="text-base font-bold text-warm-white">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-warm-white/65">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {[
          "/assets/images/team-photos/project-metallic-blue-garage.png",
          "/assets/images/team-photos/project-mclaren-garage.png",
          "/assets/images/team-photos/crew-metallic-blue-application.png",
          "/assets/images/team-photos/crew-jobsite-trailer.png",
        ].map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden">
            <Image src={src} alt="Real Floor Rescue jobsite work" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>

      <CredentialsStrip />
    </div>
  );
}
