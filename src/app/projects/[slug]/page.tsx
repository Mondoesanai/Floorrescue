import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects, getProject } from "@/content/projects";
import { getFloorSystems } from "@/content/floorSystems";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/projects/${slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const systems = getFloorSystems(project.systems);

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase capitalize">{project.environment}</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{project.title}</h1>
        {project.location ? <p className="mt-2 text-sm text-warm-white/50">{project.location}</p> : null}
        <p className="mt-5 text-base leading-[1.7] text-warm-white/75">{project.summary}</p>

        {!project.verified ? (
          <p className="mt-4 text-xs text-warm-white/40">Project details and photos pending client confirmation.</p>
        ) : null}

        {systems.length ? (
          <div className="mt-8">
            <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">Systems Used</h2>
            <ul className="mt-3 space-y-2">
              {systems.map((s) => (
                <li key={s.id} className="text-sm text-warm-white/70">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Button href="/quote" className="mt-8">
          Start a Similar Project
        </Button>
      </Container>
    </div>
  );
}
