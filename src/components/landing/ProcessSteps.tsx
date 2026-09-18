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
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-md border border-warm-white/10 bg-charcoal-900 p-5">
              <span className="text-gold-gradient text-3xl font-semibold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-base font-medium text-warm-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
