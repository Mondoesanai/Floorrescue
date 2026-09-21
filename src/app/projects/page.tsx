import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { Marquee } from "@/components/ui/Marquee";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { FilterBrowser, type BrowserItem } from "@/components/browse/FilterBrowser";
import { projects } from "@/content/projects";
import { getSiteStats } from "@/content/stats";
import { getEnvironmentCardPhoto } from "@/lib/video/registry";

export const metadata: Metadata = {
  title: "Projects",
  description: "Floor Rescue project history across residential, commercial, and industrial flooring work.",
  alternates: { canonical: "/projects" },
};

const envLabel = { residential: "Residential", commercial: "Commercial", industrial: "Industrial" } as const;

export default function ProjectsIndexPage() {
  const items: BrowserItem[] = projects.map((p) => ({
    id: p.id,
    href: `/projects/${p.slug}`,
    title: p.title,
    meta: [envLabel[p.environment], p.location].filter(Boolean).join(" · "),
    summary: p.summary,
    group: p.environment,
    image: getEnvironmentCardPhoto(p.environment),
  }));

  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/project-mclaren-garage.png"
        alt="Real Floor Rescue project work"
        caption={`${projects.length}+ real projects across residential, commercial, and industrial`}
      />
      <Marquee items={projects.slice(0, 14).map((p) => p.title.split(" — ")[0])} seconds={55} />
      <StatsStrip stats={getSiteStats()} />
      <div className="py-16">
        <Container>
          <SectionHeading eyebrow="Project Library" title="Floor Rescue project history" />
          <div className="mt-8">
            <FilterBrowser
              items={items}
              groups={[
                { id: "residential", label: "Residential" },
                { id: "commercial", label: "Commercial" },
                { id: "industrial", label: "Industrial" },
              ]}
              searchLabel="Search projects — e.g. warehouse, loft, polished"
              cta="View project"
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
