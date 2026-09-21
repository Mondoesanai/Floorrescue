import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { problems, getProblem } from "@/content/problems";
import { problemArticles } from "@/content/problemArticles";
import { getFloorSystems } from "@/content/floorSystems";
import { getProjectsByProblem } from "@/content/projects";
import { getResource } from "@/content/resources";

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

  const article = problemArticles[problem.id];
  const systems = getFloorSystems(problem.relevantSystemIds);
  const matchingProjects = getProjectsByProblem(problem.id, 3);
  const resources = (article?.resourceSlugs ?? []).map(getResource).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const others = problems.filter((p) => p.id !== problem.id);

  const jsonLd = article
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: problem.label,
          description: problem.shortDescription,
          author: { "@type": "Organization", name: "Floor Rescue" },
          publisher: { "@type": "Organization", name: "Floor Rescue" },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.questions.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ]
    : [];

  const toc = article
    ? [
        ["signs", "How to tell"],
        ["causes", "Why it happens"],
        ["mistakes", "Common mistakes"],
        ["fix", "How it's fixed"],
        ["faq", "Questions"],
      ]
    : [];

  return (
    <div>
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />
      ))}
      <PhotoBanner
        src="/assets/images/team-photos/crew-metallic-blue-application.png"
        alt="Floor Rescue diagnosing and fixing a floor problem"
        caption={problem.label}
      />
      <div className="py-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Floor Problem</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{problem.label}</h1>
          <p className="mt-4 text-lg leading-[1.7] text-warm-white/80">{problem.shortDescription}</p>

          {article ? (
            <>
              <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
                {toc.map(([anchor, label]) => (
                  <a
                    key={anchor}
                    href={`#${anchor}`}
                    className="rounded-full border border-warm-white/15 px-3.5 py-1.5 text-xs font-medium text-warm-white/70 transition-colors hover:border-gold-300 hover:text-gold-100"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 space-y-4 text-base leading-[1.8] text-warm-white/75">
                {article.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <section id="signs" className="mt-14 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">How to tell if this is your problem</h2>
                <ul className="mt-5 grid gap-2.5">
                  {article.signs.map((s) => (
                    <li key={s} className="flex gap-3 text-base leading-[1.65] text-warm-white/75">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold-300" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="causes" className="mt-14 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">Why it happens</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {article.causes.map((c) => (
                    <div key={c.title} className="rounded-xl border border-warm-white/10 bg-charcoal-900 p-5">
                      <h3 className="text-base font-bold text-warm-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{c.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="mistakes" className="mt-14 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">Common mistakes</h2>
                <ul className="mt-5 grid gap-2.5">
                  {article.mistakes.map((m) => (
                    <li key={m} className="flex gap-3 text-base leading-[1.65] text-warm-white/75">
                      <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-warm-white/15 text-[11px] font-bold text-warm-white">
                        ×
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="fix" className="mt-14 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">How it&apos;s properly fixed</h2>
                <ol className="mt-5 space-y-4">
                  {article.fixSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="text-gold-gradient w-8 flex-none text-2xl font-bold tabular-nums">{i + 1}</span>
                      <div>
                        <h3 className="text-base font-bold text-warm-white">{s.title}</h3>
                        <p className="mt-1 text-sm leading-[1.75] text-warm-white/65">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <aside className="mt-14 rounded-2xl border border-gold-300/30 bg-charcoal-900 p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">The Floor Rescue approach</p>
                <p className="mt-3 text-base leading-[1.8] text-warm-white/80">{article.approach}</p>
                <Button href={`/quote?concern=${problem.id}`} className="mt-5">
                  Request a Quote
                </Button>
              </aside>
            </>
          ) : null}

          {systems.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">System families often used</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {systems.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/systems/${s.id}`}
                      className="group block h-full rounded-xl border border-warm-white/10 bg-charcoal-900 p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/50"
                    >
                      <p className="text-sm font-bold text-warm-white group-hover:text-gold-100">{s.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-[1.6] text-warm-white/55">
                        {s.summaryByAudience.commercial ?? s.summaryByAudience.residential ?? s.summaryByAudience.trade}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-warm-white/40">
                A starting point, not a diagnosis — we confirm the right system after evaluating the slab and the space.
              </p>
            </section>
          ) : null}

          {article ? (
            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">Questions people ask</h2>
              <div className="mt-5">
                <FAQAccordion faqs={article.questions.map((f, i) => ({ id: `${problem.id}-${i}`, question: f.q, answer: f.a, scope: { kind: "general" as const } }))} />
              </div>
            </section>
          ) : null}

          {resources.length > 0 ? (
            <section className="mt-14">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">Keep reading</h2>
              <ul className="mt-4 grid gap-3">
                {resources.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/resources/${r.slug}`}
                      className="block rounded-xl border border-warm-white/10 bg-charcoal-900 p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/50"
                    >
                      <p className="text-[10px] font-bold tracking-[0.18em] text-gold-300 uppercase">{r.category}</p>
                      <p className="mt-1 text-sm font-bold text-warm-white">{r.title}</p>
                      <p className="mt-1 text-xs leading-[1.6] text-warm-white/55">{r.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

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

          <div className="mt-16 border-t border-warm-white/10 pt-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-warm-white/40 uppercase">Other problems</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.id}`}
                  className="rounded-full border border-warm-white/10 px-3 py-1.5 text-xs text-warm-white/60 transition-colors hover:border-gold-300/60 hover:text-gold-100"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
