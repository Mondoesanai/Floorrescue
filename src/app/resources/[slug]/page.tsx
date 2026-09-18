import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
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

  return (
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
      </Container>
    </div>
  );
}
