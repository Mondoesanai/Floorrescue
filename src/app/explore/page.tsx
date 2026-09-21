import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { floorSystems } from "@/content/floorSystems";
import { problems } from "@/content/problems";
import { projects } from "@/content/projects";
import { resources, resourceCategories } from "@/content/resources";
import { sectors, residentialSectorIds, commercialSectorIds, industrialSectorIds } from "@/content/sectors";
import { getSiteStats } from "@/content/stats";

export const metadata: Metadata = {
  title: "Explore Floor Rescue",
  description: "Every Floor Rescue page in one place — environments, floor systems, problems, projects, education, and trade resources.",
  alternates: { canonical: "/explore" },
};

const top = [
  { href: "/residential", label: "Residential", note: "Homes, estates, new construction" },
  { href: "/commercial", label: "Commercial", note: "Retail, restaurants, offices, hospitality" },
  { href: "/industrial", label: "Industrial", note: "Manufacturing, food & beverage, warehousing" },
  { href: "/for-the-trade", label: "For the Trade", note: "Architects, builders, developers, GCs" },
  { href: "/systems", label: "Floor Systems", note: `${floorSystems.length} systems, compared` },
  { href: "/projects", label: "Projects", note: `${projects.length} documented projects` },
  { href: "/resources", label: "Resources", note: `${resources.length} education articles` },
  { href: "/testimonials", label: "Testimonials", note: "Real five-star reviews" },
  { href: "/about", label: "About", note: "Built from the jobsite up" },
  { href: "/quote", label: "Request a Quote", note: "Three short steps" },
];

const familyLabel: Record<string, string> = {
  concrete: "Concrete",
  resinous: "Resinous coatings",
  decorative: "Decorative artistry",
  service: "Prep & restoration",
};

function List({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="break-inside-avoid">
      <h3 className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm leading-snug text-warm-white/70 transition-colors hover:text-gold-200">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function sectorLinks(ids: string[]) {
  return ids
    .map((id) => sectors.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ href: `/${s.environment}/${s.id}`, label: s.name }));
}

export default function ExplorePage() {
  const systemGroups = Object.keys(familyLabel)
    .map((f) => ({ f, list: floorSystems.filter((s) => s.family === f) }))
    .filter((g) => g.list.length);

  return (
    <div>
      <div className="py-16">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Explore Floor Rescue</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
            Every page on the site, in one place.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-warm-white/65">
            No guided questions. Start with the big doors, or jump straight to a specific system, problem, or project below.
            Looking for something specific? Use the search box at the top of any page.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {top.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-xl border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50"
              >
                <span className="text-sm font-bold text-warm-white">{t.label}</span>
                <span className="mt-1.5 block text-xs leading-[1.6] text-warm-white/50">{t.note}</span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <Marquee items={floorSystems.map((s) => s.name)} seconds={80} />
      <StatsStrip stats={getSiteStats()} />

      <div className="py-16">
        <Container>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-warm-white">By space</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-3">
            <List title="Residential" links={sectorLinks(residentialSectorIds)} />
            <List title="Commercial" links={sectorLinks(commercialSectorIds)} />
            <List title="Industrial" links={sectorLinks(industrialSectorIds)} />
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-[-0.02em] text-warm-white">Floor systems</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-2 lg:columns-4">
            {systemGroups.map((g) => (
              <List key={g.f} title={familyLabel[g.f]} links={g.list.map((s) => ({ href: `/systems/${s.id}`, label: s.name }))} />
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-[-0.02em] text-warm-white">Floor problems</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-2 lg:columns-4">
            <List title="What are you dealing with?" links={problems.map((p) => ({ href: `/problems/${p.id}`, label: p.label }))} />
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-[-0.02em] text-warm-white">Education</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-2 lg:columns-4">
            {resourceCategories
              .filter((c) => resources.some((r) => r.category === c))
              .map((c) => (
                <List
                  key={c}
                  title={c}
                  links={resources.filter((r) => r.category === c).map((r) => ({ href: `/resources/${r.slug}`, label: r.title }))}
                />
              ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-[-0.02em] text-warm-white">Projects</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-2 lg:columns-3">
            {(["residential", "commercial", "industrial"] as const).map((env) => (
              <List
                key={env}
                title={env}
                links={projects.filter((p) => p.environment === env).map((p) => ({ href: `/projects/${p.slug}`, label: p.title.split(" — ")[0] }))}
              />
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold tracking-[-0.02em] text-warm-white">For the trade</h2>
          <div className="mt-6 columns-1 gap-10 sm:columns-2">
            <List
              title="Professional audiences"
              links={[
                { href: "/for-the-trade/architects", label: "Architects & Designers" },
                { href: "/for-the-trade/builders", label: "Builders & Developers" },
                { href: "/for-the-trade/general-contractors", label: "General Contractors" },
                { href: "/for-the-trade/developers", label: "Developers & Owners" },
              ]}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
