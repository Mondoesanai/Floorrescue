import { sectors } from "@/content/sectors";
import { floorSystems } from "@/content/floorSystems";
import { problems } from "@/content/problems";
import { resources } from "@/content/resources";
import { projects } from "@/content/projects";

export interface SearchEntry {
  type: "sector" | "system" | "problem" | "resource" | "project";
  label: string;
  description: string;
  href: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const sectorEntries: SearchEntry[] = sectors
    .filter((s) => !s.legacy)
    .map((s) => ({ type: "sector", label: s.name, description: s.description, href: `/${s.environment}/${s.id}` }));

  const systemEntries: SearchEntry[] = floorSystems.map((s) => ({
    type: "system",
    label: s.name,
    description: s.summaryByAudience.trade ?? s.summaryByAudience.commercial ?? s.applications.join(", "),
    href: `/systems/${s.id}`,
  }));

  const problemEntries: SearchEntry[] = problems.map((p) => ({
    type: "problem",
    label: p.label,
    description: p.shortDescription,
    href: `/problems/${p.id}`,
  }));

  const resourceEntries: SearchEntry[] = resources.map((r) => ({
    type: "resource",
    label: r.title,
    description: r.summary,
    href: `/resources/${r.slug}`,
  }));

  const projectEntries: SearchEntry[] = projects.map((p) => ({
    type: "project",
    label: p.title,
    description: `${p.location} — ${p.summary}`,
    href: `/projects/${p.slug}`,
  }));

  return [...sectorEntries, ...systemEntries, ...problemEntries, ...resourceEntries, ...projectEntries];
}

export function searchIndex(entries: SearchEntry[], query: string): SearchEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return entries.filter(
    (entry) => entry.label.toLowerCase().includes(normalized) || entry.description.toLowerCase().includes(normalized),
  );
}
