import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSector } from "@/content/sectors";
import type { Environment } from "@/content/types";

export function requireSector(id: string, environment: Environment) {
  const sector = getSector(id);
  if (!sector || sector.environment !== environment || sector.legacy) notFound();
  return sector;
}

export function sectorMetadata(id: string, environment: Environment): Metadata {
  const sector = getSector(id);
  if (!sector) return {};
  return {
    title: sector.name,
    description: sector.description,
    alternates: { canonical: `/${environment}/${id}` },
  };
}
