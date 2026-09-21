"use client";

import { useMemo, useState } from "react";
import { useJourney } from "@/lib/journey/context";
import { getEnvironmentPoster, getEnvironmentCardPhoto } from "@/lib/video/registry";
import { resolveHeroCopy } from "@/content/heroCopy";
import { getProjectsBySector, projects as allProjects } from "@/content/projects";
import { getFloorSystems } from "@/content/floorSystems";
import { getProblem } from "@/content/problems";
import { getSiteStats } from "@/content/stats";
import { Marquee } from "@/components/ui/Marquee";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { WorkRail } from "@/components/home/WorkRail";
import { getResourcesByIds } from "@/content/resources";
import { getTestimonials } from "@/content/testimonials";
import type { Sector } from "@/content/types";
import { Hero } from "./Hero";
import { PrioritySummary } from "./PrioritySummary";
import { RelevantSystems } from "./RelevantSystems";
import { MatchingProjects } from "./MatchingProjects";
import { EducationModule } from "./EducationModule";
import { ProcessSteps } from "./ProcessSteps";
import { TestimonialsModule } from "./TestimonialsModule";
import { QuoteCTA } from "./QuoteCTA";
import { ConcernCards } from "./ConcernCards";
import { BeforeYouCall } from "./BeforeYouCall";
import { RelatedSpaces } from "./RelatedSpaces";
import { SectorFAQ } from "./SectorFAQ";

export function SectorLandingPage({ sector }: { sector: Sector }) {
  const { state, dispatch } = useJourney();
  const personalized =
    (state.stage === "commercial-landing" || state.stage === "residential-landing") && state.sectorId === sector.id;
  const [localConcerns, setLocalConcerns] = useState<string[]>([]);

  const activeConcerns = personalized ? state.concerns : localConcerns;

  function toggleConcern(id: string) {
    if (personalized) {
      dispatch({ type: "TOGGLE_CONCERN", concernId: id });
    } else {
      setLocalConcerns((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    }
  }

  const heroCopy = useMemo(
    () =>
      resolveHeroCopy(
        sector,
        personalized ? state.projectState : null,
        activeConcerns,
        personalized ? state.otherSectorText || state.otherProjectText : null,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sector, personalized, state.projectState, activeConcerns, state.otherSectorText, state.otherProjectText],
  );

  // Sector-specific work first; backfill from the same environment so no page is thin.
  const sectorProjects = getProjectsBySector(sector.id, 6);
  const projects =
    sectorProjects.length >= 6
      ? sectorProjects
      : [
          ...sectorProjects,
          ...allProjects.filter((p) => p.environment === sector.environment && !sectorProjects.includes(p) && !p.sectors.includes("garage-workshop")),
        ].slice(0, 6);
  const resources = getResourcesByIds(sector.relevantResourceIds);
  // This environment’s reviews first, then the rest — the module only shows four.
  const envTestimonials = getTestimonials(sector.environment);
  const testimonials = [...envTestimonials, ...getTestimonials().filter((t) => !envTestimonials.includes(t))];
  const siteStats = getSiteStats();
  const environmentProjectCount = allProjects.filter((p) => p.environment === sector.environment).length;
  const marqueeItems = [
    ...getFloorSystems(sector.relevantSystemIds).map((s) => s.name),
    ...sector.commonConcerns.map((id) => getProblem(id)?.label).filter((l): l is string => Boolean(l)),
  ];
  const quoteHref = `/quote?sector=${sector.id}&environment=${sector.environment}`;

  return (
    <div>
      <Hero copy={heroCopy} posterSrc={getEnvironmentPoster(sector.environment)} quoteHref={quoteHref} />
      {marqueeItems.length > 0 ? <Marquee items={marqueeItems} seconds={45} /> : null}
      <PrioritySummary concernIds={sector.commonConcerns} activeConcernIds={activeConcerns} onToggle={toggleConcern} />
      <StatsStrip
        stats={[
          { value: 20, suffix: "+", label: "Years in the trade" },
          { value: environmentProjectCount, suffix: "+", label: `${sector.environment} projects` },
          { value: getFloorSystems(sector.relevantSystemIds).length, label: "Systems that fit" },
          { value: siteStats[3].value, label: "Five-star reviews" },
        ]}
      />
      <ConcernCards concernIds={sector.commonConcerns} sectorName={sector.shortLabel} />
      <RelevantSystems systemIds={sector.relevantSystemIds} environment={sector.environment} />
      <WorkRail />
      <MatchingProjects projects={projects} atmospherePhoto={getEnvironmentCardPhoto(sector.environment)} />
      <EducationModule resources={resources} />
      <ProcessSteps />
      <BeforeYouCall quoteHref={quoteHref} />
      <TestimonialsModule testimonials={testimonials} limit={4} quoteHref={quoteHref} />
      <SectorFAQ environment={sector.environment} />
      <RelatedSpaces sector={sector} />
      <QuoteCTA href={quoteHref} sectorLabel={sector.name} />
    </div>
  );
}
