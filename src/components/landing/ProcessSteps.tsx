import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Assess",
    body: "Slab condition, moisture, contamination, and how the space actually gets used — before any system is proposed.",
  },
  {
    title: "Prepare",
    body: "Media blasting, diamond grinding, or repair work sized to what the substrate needs, not a generic checklist.",
  },
  {
    title: "Install",
    body: "The right system applied to spec, scheduled around your operating hours where downtime matters.",
  },
  {
    title: "Handoff",
    body: "Care guidance and next steps so the floor performs the way it was built to.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="How It Works" title="The process" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-warm-white/10 shadow-elevated">
            <Image
              src="/assets/images/team-photos/crew-troweling-floor.png"
              alt="A Floor Rescue crew member hand-troweling a floor system"
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
          </div>
          <ol className="grid gap-6 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-md border border-warm-white/10 bg-charcoal-900 p-5">
                <span className="text-gold-gradient text-3xl font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-medium text-warm-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
