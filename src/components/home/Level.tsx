import type { ReactNode } from "react";

/**
 * Wraps a homepage section as one concrete level. Each index is its own material (see
 * scripts/gen-concrete.mjs) — no two sections share one. The wrapper is inert until the
 * visitor flips the concrete switch (body.concrete-on) — see ConcreteToggle.
 */
const LIGHT_LEVELS = new Set([0, 2, 3]); // pale slabs use dark ink; every deeper slab uses pale ink

export function Level({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="cn-level" data-level={index} data-tone={LIGHT_LEVELS.has(index) ? "light" : "dark"}>
      {children}
    </div>
  );
}
