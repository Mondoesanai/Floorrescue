import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatchingProjects } from "@/components/landing/MatchingProjects";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Floor Rescue project history across residential, commercial, and industrial flooring work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading eyebrow="Project Library" title="Floor Rescue project history" />
      </Container>
      <MatchingProjects projects={projects} />
    </div>
  );
}
