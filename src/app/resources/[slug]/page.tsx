import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { resources, getResource } from "@/content/resources";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return { title: resource.title, description: resource.summary, alternates: { canonical: `/resources/${slug}` } };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const related = resources.filter((r) => r.category === resource.category && r.slug !== resource.slug).slice(0, 3);

  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/crew-troweling-floor.png"
        alt="Floor Rescue applying a floor system"
        caption={resource.category}
      />
      <div className="py-16">
        <Container className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{resource.category}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{resource.title}</h1>
          <div className="mt-6 space-y-4">
            {resource.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.7] text-warm-white/75">
                {paragraph}
              </p>
            ))}
          </div>

          <Button href="/quote" className="mt-10">
            Request a Quote
          </Button>

          {related.length ? (
            <div className="mt-16 border-t border-warm-white/10 pt-10">
              <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">More in {resource.category}</h2>
              <ul className="mt-4 space-y-2.5">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/resources/${r.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-warm-white/75 transition-colors hover:text-gold-200"
                    >
                      {r.title}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </div>
    </div>
  );
}
