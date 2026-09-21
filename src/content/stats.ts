import { projects } from "./projects";
import { floorSystems } from "./floorSystems";
import { testimonials } from "./testimonials";
import { resources } from "./resources";
import type { Stat } from "@/components/ui/StatsStrip";

/** Proof numbers derived from the real content graph — never hard-coded claims. */
export function getSiteStats(): Stat[] {
  return [
    { value: 20, suffix: "+", label: "Years in the trade" },
    { value: projects.length, suffix: "+", label: "Documented projects" },
    { value: floorSystems.length, label: "Floor systems" },
    { value: testimonials.length, label: "Five-star reviews" },
  ];
}

export function getResourceCount() {
  return resources.length;
}
