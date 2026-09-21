import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { Marquee } from "@/components/ui/Marquee";
import { FilterBrowser, type BrowserItem } from "@/components/browse/FilterBrowser";
import { floorSystems } from "@/content/floorSystems";

export const metadata: Metadata = {
  title: "Floor Systems",
  description: "Concrete and resinous floor system families — polished concrete, micro cement, urethane cement, and more.",
  alternates: { canonical: "/systems" },
};

const familyLabel: Record<string, string> = {
  concrete: "Concrete",
  resinous: "Resinous",
  decorative: "Decorative",
  service: "Prep & Restoration",
};

const familyPhoto: Record<string, string> = {
  concrete: "/assets/images/team-photos/project-industrial-warehouse-polished.png",
  resinous: "/assets/images/team-photos/project-mclaren-garage.png",
  decorative: "/assets/images/team-photos/project-metallic-blue-garage.png",
  service: "/assets/images/team-photos/crew-troweling-floor.png",
};

export default function SystemsIndexPage() {
  const items: BrowserItem[] = floorSystems.map((s) => ({
    id: s.id,
    href: `/systems/${s.id}`,
    title: s.name,
    meta: familyLabel[s.family] ?? s.family,
    summary: s.summaryByAudience.trade ?? s.summaryByAudience.commercial ?? s.summaryByAudience.residential ?? s.applications.join(", "),
    group: s.family,
    image: familyPhoto[s.family],
  }));
  const groups = Object.keys(familyLabel)
    .filter((id) => floorSystems.some((s) => s.family === id))
    .map((id) => ({ id, label: familyLabel[id] }));

  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/project-metallic-white-garage.png"
        alt="A real Floor Rescue metallic epoxy floor system"
        caption="A real Floor Rescue metallic epoxy system"
      />
      <Marquee items={floorSystems.map((s) => s.name)} seconds={70} />
      <div className="py-16">
        <Container>
          <SectionHeading eyebrow="Floor Systems" title="Every system Floor Rescue installs, by family" />
          <div className="mt-8">
            <FilterBrowser items={items} groups={groups} searchLabel="Search systems — e.g. epoxy, overlay, moisture" cta="View system" />
          </div>
        </Container>
      </div>
    </div>
  );
}
