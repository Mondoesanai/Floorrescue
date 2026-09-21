import { ImmersiveJourney } from "@/components/immersive/ImmersiveJourney";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FindYourSpaceSection } from "@/components/home/FindYourSpaceSection";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { ExploreEverything } from "@/components/home/ExploreEverything";
import { SystemExplorer, type ExplorerFamily } from "@/components/home/SystemExplorer";
import { ProblemFinder } from "@/components/home/ProblemFinder";
import { WorkRail } from "@/components/home/WorkRail";
import { FloorLayers } from "@/components/home/FloorLayers";
import { Level } from "@/components/home/Level";
import { WhyFloorRescue } from "@/components/home/WhyFloorRescue";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { DescribeCTA } from "@/components/home/DescribeCTA";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { floorSystems } from "@/content/floorSystems";
import { getSiteStats } from "@/content/stats";

const familyMeta: Record<string, Omit<ExplorerFamily, "systems" | "id">> = {
  concrete: {
    label: "Concrete",
    blurb: "Grind it, polish it, stain it, seal it, restore it — the concrete itself becomes the floor.",
    image: "/assets/images/team-photos/project-industrial-warehouse-polished.png",
  },
  resinous: {
    label: "Resinous Coatings",
    blurb: "An engineered layer built on the slab for chemicals, washdown, traffic, or a design only resin can deliver.",
    image: "/assets/images/team-photos/project-mclaren-garage.png",
  },
  decorative: {
    label: "Decorative Artistry",
    blurb: "Custom scoring, logos, and one-of-one designs — the floor as part of the brand.",
    image: "/assets/images/team-photos/project-metallic-blue-garage.png",
  },
  service: {
    label: "Prep & Restoration",
    blurb: "The work every finish depends on: grinding, moisture testing, repair, and slab coordination.",
    image: "/assets/images/team-photos/crew-troweling-floor.png",
  },
};

function buildFamilies(): ExplorerFamily[] {
  return Object.entries(familyMeta)
    .map(([id, meta]) => ({
      id,
      ...meta,
      systems: floorSystems
        .filter((s) => s.family === id)
        .map((s) => ({
          id: s.id,
          name: s.name,
          summary: s.summaryByAudience.commercial ?? s.summaryByAudience.residential ?? s.summaryByAudience.trade ?? s.applications.join(", "),
        })),
    }))
    .filter((f) => f.systems.length > 0);
}

export default function Home() {
  return (
    <div>
      <ImmersiveJourney />

      {/* Crawlable content below the immersive hero — never relies on the
          client-only cinematic state for essential content or navigation,
          per implementation/seo-and-directory.md. */}
      <Level index={0}>
        <WhoWeAreSection />
      </Level>
      <Level index={1}>
        <ClientMarquee />
      </Level>
      <Level index={2}>
        <StatsStrip stats={getSiteStats()} />
      </Level>
      <Level index={3}>
        <ProblemFinder />
      </Level>
      <Level index={4}>
        <ServicesSection />
      </Level>
      <Level index={5}>
        <SystemExplorer families={buildFamilies()} />
      </Level>
      <Level index={6}>
        <FindYourSpaceSection />
      </Level>
      <Level index={7}>
        <WorkRail />
      </Level>
      <Level index={8}>
        <WhyFloorRescue />
      </Level>
      <Level index={9}>
        <FloorLayers />
      </Level>
      <Level index={10}>
        <ProcessSteps />
      </Level>
      <Level index={11}>
        <TestimonialsPreview />
      </Level>
      <Level index={12}>
        <HomeFAQ />
      </Level>
      <Level index={13}>
        <DescribeCTA />
      </Level>
      <Level index={14}>
        <ExploreEverything />
      </Level>
    </div>
  );
}
