import type { Project } from "./types";

// Real Floor Rescue project names carried over from prior source material.
// Square footage / exact figures are withheld or marked unverified per the
// build package's instruction not to publish unconfirmed project stats.
// `media` is intentionally empty until real jobsite photos are supplied —
// see components/landing/MatchingProjects.tsx for how that's presented.
export const projects: Project[] = [
  {
    id: "80000sf-warehouse-showroom",
    slug: "80000-sf-warehouse-showroom",
    title: "80,000 SF Warehouse & Showroom",
    environment: "industrial",
    sectors: ["warehouse-distribution"],
    systems: ["seal-systems", "metallic-epoxy"],
    problems: ["heavy-traffic", "appearance-design"],
    location: "Dallas–Fort Worth, TX",
    media: [],
    verified: false,
    summary: "Sealed concrete throughout the warehouse floor with a metallic epoxy entry to carry the showroom presentation.",
  },
  {
    id: "uptown-dallas-commercial-kitchen",
    slug: "uptown-dallas-commercial-kitchen",
    title: "Commercial Kitchen Rescue",
    environment: "commercial",
    sectors: ["restaurant-food-service"],
    systems: ["urethane-cement"],
    problems: ["existing-floor-failure", "washdown"],
    location: "Uptown Dallas, TX",
    media: [],
    verified: false,
    summary: "A failed kitchen floor rebuilt around washdown and constant cleaning demands.",
  },
  {
    id: "verdad-real-estate-southlake",
    slug: "verdad-real-estate-southlake",
    title: "Verdad Real Estate",
    environment: "commercial",
    sectors: ["office-corporate", "retail-showroom"],
    systems: ["polished-concrete"],
    problems: ["appearance-design"],
    location: "Southlake, TX",
    media: [],
    verified: false,
    summary: "A polished concrete finish specified for a real estate office and showroom presentation.",
  },
  {
    id: "stewart-peninsula-golf-course",
    slug: "stewart-peninsula-golf-course",
    title: "Stewart Peninsula Golf Course",
    environment: "commercial",
    sectors: ["general-commercial"],
    systems: ["epoxy-coatings"],
    problems: ["maintenance"],
    location: "Texas",
    media: [],
    verified: false,
    summary: "Clubhouse and back-of-house flooring built for a golf course's mixed foot and cart traffic.",
  },
  {
    id: "fsg-dallas-office",
    slug: "fsg-dallas-office",
    title: "FSG Dallas Office",
    environment: "commercial",
    sectors: ["office-corporate"],
    systems: ["micro-cement"],
    problems: ["appearance-design"],
    location: "Dallas, TX",
    media: [],
    verified: false,
    summary: "A seamless micro cement finish specified for a corporate office interior.",
  },
  {
    id: "w2-plus-office",
    slug: "w2-plus-office",
    title: "W2 Plus Office",
    environment: "commercial",
    sectors: ["office-corporate"],
    systems: ["polished-concrete"],
    problems: ["maintenance"],
    location: "Texas",
    media: [],
    verified: false,
    summary: "A polished concrete office floor chosen for durability and low upkeep.",
  },
  {
    id: "saltbox-apothecary",
    slug: "saltbox-apothecary",
    title: "Saltbox Apothecary",
    environment: "commercial",
    sectors: ["retail-showroom", "general-commercial"],
    systems: ["stained-concrete"],
    problems: ["appearance-design"],
    location: "Texas",
    media: [],
    verified: false,
    summary: "A stained concrete floor for a retail apothecary space built around a distinct brand look.",
  },
  {
    id: "asi-gymnastics",
    slug: "asi-gymnastics",
    title: "ASI Gymnastics",
    environment: "commercial",
    sectors: ["general-commercial"],
    systems: ["epoxy-coatings"],
    problems: ["heavy-traffic", "maintenance"],
    location: "Texas",
    media: [],
    verified: false,
    summary: "A durable coating system specified for a gymnastics facility's high-traffic training floors.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySector(sectorId: string, limit = 3): Project[] {
  return projects.filter((p) => p.sectors.includes(sectorId)).slice(0, limit);
}
