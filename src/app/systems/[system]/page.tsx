import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { floorSystems, getFloorSystem } from "@/content/floorSystems";
import { getFAQsForSystem } from "@/content/faqs";
import { getProjectsBySystem } from "@/content/projects";
import type { SystemFamily } from "@/content/types";

const familyLabel: Record<SystemFamily, string> = {
  concrete: "Concrete / Cementitious",
  resinous: "Resinous / Coatings",
  decorative: "Decorative Artistry",
  service: "Preparation & Restoration",
};

const familyPhoto: Record<SystemFamily, string> = {
  concrete: "/assets/images/team-photos/project-industrial-warehouse-polished.png",
  resinous: "/assets/images/team-photos/project-mclaren-garage.png",
  decorative: "/assets/images/team-photos/project-metallic-blue-garage.png",
  service: "/assets/images/team-photos/crew-troweling-floor.png",
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
  const matchingProjects = getProjectsBySystem(system.id);

  return (
    <div>
      <PhotoBanner
        src={familyPhoto[system.family]}
        alt={`Real Floor Rescue ${system.name} work`}
        caption={system.name}
      />
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

        {matchingProjects.length ? (
          <div className="mt-16">
            <SectionHeading eyebrow="Real Proof" title={`${system.name} — real Floor Rescue work`} />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {matchingProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group block rounded-md border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50"
                >
                  <h3 className="text-sm font-bold text-warm-white">{p.title}</h3>
                  {p.location ? <p className="mt-1 text-xs text-warm-white/45">{p.location}</p> : null}
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] text-gold-300 uppercase">
                    View Project
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

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
    </div>
  );
}
