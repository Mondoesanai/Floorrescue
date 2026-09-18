import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { floorSystems, getFloorSystem } from "@/content/floorSystems";
import { getFAQsForSystem } from "@/content/faqs";
import type { SystemFamily } from "@/content/types";

const familyLabel: Record<SystemFamily, string> = {
  concrete: "Concrete / Cementitious",
  resinous: "Resinous / Coatings",
  decorative: "Decorative Artistry",
  service: "Preparation & Restoration",
};

export function generateStaticParams() {
  return floorSystems.map((s) => ({ system: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ system: string }> }): Promise<Metadata> {
  const { system: id } = await params;
  const system = getFloorSystem(id);
  if (!system) return {};
  return { title: system.name, alternates: { canonical: `/systems/${id}` } };
}

export default async function SystemPage({ params }: { params: Promise<{ system: string }> }) {
  const { system: id } = await params;
  const system = getFloorSystem(id);
  if (!system) notFound();

  const faqs = getFAQsForSystem(system.id);

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{familyLabel[system.family]}</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{system.name}</h1>

        <div className="mt-8 space-y-4">
          {Object.entries(system.summaryByAudience).map(([audience, text]) => (
            <p key={audience} className="text-base leading-[1.7] text-warm-white/75">
              <span className="font-medium text-gold-200 capitalize">{audience}: </span>
              {text}
            </p>
          ))}
        </div>

        {system.technicalNotes?.length ? (
          <div className="mt-6 rounded-md border border-warm-white/10 bg-charcoal-900 p-5">
            {system.technicalNotes.map((note) => (
              <p key={note} className="text-sm text-warm-white/55">
                {note}
              </p>
            ))}
          </div>
        ) : null}

        <p className="mt-8 text-sm text-warm-white/50">Common applications: {system.applications.join(", ")}</p>

        <Button href={`/quote?system=${system.id}`} className="mt-8">
          Request a Quote
        </Button>

        {faqs.length ? (
          <div className="mt-16">
            <SectionHeading eyebrow="Common Questions" title={`Questions about ${system.name}`} />
            <div className="mt-6">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
