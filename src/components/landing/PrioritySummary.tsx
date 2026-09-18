"use client";

import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { getProblem } from "@/content/problems";

interface PrioritySummaryProps {
  concernIds: string[];
  activeConcernIds: string[];
  onToggle?: (id: string) => void;
}

export function PrioritySummary({ concernIds, activeConcernIds, onToggle }: PrioritySummaryProps) {
  const concerns = concernIds.map(getProblem).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (concerns.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="What Usually Matters Here" title="What matters in a space like yours" />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {concerns.map((concern) => (
            <Chip
              key={concern.id}
              active={activeConcernIds.includes(concern.id)}
              onClick={() => onToggle?.(concern.id)}
              title={concern.shortDescription}
            >
              {concern.label}
            </Chip>
          ))}
        </div>
        {activeConcernIds.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {activeConcernIds
              .map(getProblem)
              .filter((p): p is NonNullable<typeof p> => Boolean(p))
              .map((concern) => (
                <li key={concern.id} className="text-sm leading-[1.7] text-warm-white/70">
                  <span className="font-medium text-gold-200">{concern.label}:</span> {concern.shortDescription}
                </li>
              ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
