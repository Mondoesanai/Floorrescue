import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/content/types";

export function MatchingProjects({ projects, atmospherePhoto }: { projects: Project[]; atmospherePhoto?: string }) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Matching Projects" title="Similar Floor Rescue work" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-md border border-warm-white/10 bg-charcoal-900 shadow-elevated">
              {/* No confirmed jobsite photo yet — a real environment atmosphere shot
                  stands in, clearly tagged, rather than a flat placeholder gradient. */}
              <div className="relative h-40 overflow-hidden">
                {atmospherePhoto ? (
                  <Image src={atmospherePhoto} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/20" />
                <span className="absolute bottom-3 left-3 rounded-full bg-charcoal-950/70 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-warm-white/70 uppercase backdrop-blur-sm">
                  Photos Pending
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-medium text-warm-white">{project.title}</h3>
                {project.location ? <p className="mt-1 text-xs text-warm-white/45">{project.location}</p> : null}
                <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{project.summary}</p>
                {!project.verified ? (
                  <p className="mt-2 text-xs text-warm-white/35">Details pending client confirmation.</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
