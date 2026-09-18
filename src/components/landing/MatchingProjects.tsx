import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/content/types";

export function MatchingProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Matching Projects" title="Similar Floor Rescue work" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="overflow-hidden rounded-md border border-warm-white/10 bg-charcoal-900 shadow-elevated">
              {/* No confirmed jobsite photo yet — a stylized material texture stands
                  in rather than a placeholder that could read as a real photo. */}
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal-800 via-charcoal-700 to-charcoal-900">
                <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(115deg,rgba(203,164,86,0.08)_0px,rgba(203,164,86,0.08)_1px,transparent_1px,transparent_14px)]" />
                <span className="relative text-xs font-semibold tracking-[0.2em] text-warm-white/40 uppercase">
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
