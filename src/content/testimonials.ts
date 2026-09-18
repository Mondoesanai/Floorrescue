import type { Testimonial } from "./types";

// Intentionally empty: the build package explicitly warns that testimonial
// wording/authenticity is an open conflict across sources (see needsReview.ts).
// Never fabricate a quote or attribution here — populate this once Jeremy
// supplies confirmed, attributable testimonials.
export const testimonials: Testimonial[] = [];

export function getTestimonials(environment?: Testimonial["environment"]): Testimonial[] {
  return environment ? testimonials.filter((t) => t.environment === environment) : testimonials;
}
