import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { problems, getProblem } from "@/content/problems";
import { getFloorSystems } from "@/content/floorSystems";

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

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Floor Problem</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{problem.label}</h1>
        <p className="mt-4 text-base leading-[1.7] text-warm-white/75">{problem.shortDescription}</p>

        {systems.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">System Families Often Used</h2>
            <ul className="mt-3 space-y-2">
              {systems.map((s) => (
                <li key={s.id} className="text-sm text-warm-white/70">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Button href={`/quote?concern=${problem.id}`} className="mt-8">
          Request a Quote
        </Button>
      </Container>
    </div>
  );
}
