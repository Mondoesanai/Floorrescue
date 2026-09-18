import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems, getProblem } from "@/content/problems";
import { getFloorSystems } from "@/content/floorSystems";
import { getProjectsByProblem } from "@/content/projects";

export function generateStaticParams() {
  return problems.map((p) => ({ problem: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ problem: string }> }): Promise<Metadata> {
  const { problem: id } = await params;
  const problem = getProblem(id);
  if (!problem) return {};
  return { title: problem.label, description: problem.shortDescription, alternates: { canonical: `/problems/${id}` } };
}

export default async function ProblemPage({ params }: { params: Promise<{ problem: string }> }) {
  const { problem: id } = await params;
  const problem = getProblem(id);
  if (!problem) notFound();

  const systems = getFloorSystems(problem.relevantSystemIds);
  const matchingProjects = getProjectsByProblem(problem.id);

  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/crew-metallic-blue-application.png"
        alt="Floor Rescue diagnosing and fixing a floor problem"
        caption={problem.label}
      />
      <div className="py-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Floor Problem</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{problem.label}</h1>
          <p className="mt-4 text-base leading-[1.7] text-warm-white/75">{problem.shortDescription}</p>

          {systems.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">System Families Often Used</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {systems.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/systems/${s.id}`}
                      className="inline-block rounded-full border border-warm-white/15 px-3.5 py-1.5 text-xs font-medium text-warm-white/75 transition-colors hover:border-gold-300 hover:text-gold-100"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Button href={`/quote?concern=${problem.id}`} className="mt-8">
            Request a Quote
          </Button>

          {matchingProjects.length ? (
            <div className="mt-16">
              <SectionHeading eyebrow="Real Proof" title="We've fixed this before" />
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
        </Container>
      </div>
    </div>
  );
}
