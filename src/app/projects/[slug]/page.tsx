import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects, getProject } from "@/content/projects";
import { getFloorSystems } from "@/content/floorSystems";
import { getEnvironmentCardPhoto } from "@/lib/video/registry";

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
    <div>
      <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh]">
        <Image src={getEnvironmentCardPhoto(project.environment)} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
        {!project.verified ? (
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-charcoal-950/70 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-warm-white/70 uppercase backdrop-blur-sm">
            Atmosphere photo — jobsite photos pending
          </span>
        ) : null}
      </div>
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

          <Button href="/quote" className="mt-8">
            Start a Similar Project
          </Button>
        </Container>
      </div>
    </div>
  );
}
