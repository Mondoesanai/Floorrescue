"use client";

import { useMemo, useState } from "react";
import { useJourney } from "@/lib/journey/context";
import { getEnvironmentPoster } from "@/lib/video/registry";
import { resolveHeroCopy } from "@/content/heroCopy";
import { getProjectsBySector } from "@/content/projects";
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

export function SectorLandingPage({ sector }: { sector: Sector }) {
  const { state, dispatch } = useJourney();
  const personalized = state.stage === "commercial-landing" && state.sectorId === sector.id;
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

  const projects = getProjectsBySector(sector.id);
  const resources = getResourcesByIds(sector.relevantResourceIds);
  const testimonials = getTestimonials(sector.environment);
  const quoteHref = `/quote?sector=${sector.id}&environment=${sector.environment}`;

  return (
    <div>
      <Hero copy={heroCopy} posterSrc={getEnvironmentPoster(sector.environment)} quoteHref={quoteHref} />
      <PrioritySummary concernIds={sector.commonConcerns} activeConcernIds={activeConcerns} onToggle={toggleConcern} />
      <RelevantSystems systemIds={sector.relevantSystemIds} environment={sector.environment} />
      <MatchingProjects projects={projects} />
      <EducationModule resources={resources} />
      <ProcessSteps />
      <TestimonialsModule testimonials={testimonials} />
      <QuoteCTA href={quoteHref} sectorLabel={sector.name} />
    </div>
  );
}
