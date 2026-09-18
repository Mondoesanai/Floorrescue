import type { MetadataRoute } from "next";
import { commercialSectorIds, industrialSectorIds, residentialSectorIds } from "@/content/sectors";
import { floorSystems } from "@/content/floorSystems";
import { problems } from "@/content/problems";
import { projects } from "@/content/projects";
import { resources } from "@/content/resources";

const BASE_URL = "https://floorrescue.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/residential",
    "/commercial",
    "/industrial",
    "/systems",
    "/problems",
    "/projects",
    "/resources",
    "/for-the-trade",
    "/for-the-trade/architects",
    "/for-the-trade/builders",
    "/for-the-trade/general-contractors",
    "/about",
    "/testimonials",
    "/explore",
    "/quote",
  ];

  const dynamicRoutes = [
    ...residentialSectorIds.map((id) => `/residential/${id}`),
    ...commercialSectorIds.map((id) => `/commercial/${id}`),
    ...industrialSectorIds.map((id) => `/industrial/${id}`),
    ...floorSystems.map((s) => `/systems/${s.id}`),
    ...problems.map((p) => `/problems/${p.id}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
  ];

  const now = new Date();
  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));
}
