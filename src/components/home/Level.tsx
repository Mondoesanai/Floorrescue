import type { ReactNode } from "react";
import { CONCRETE_THEME } from "@/lib/theme";

// Lightness of each slab, top to bottom: pale smooth concrete under the hero, stepping down
// into deep dark concrete. Text flips from dark ink to pale ink where the slab turns dark.
const LIGHTNESS = [64, 30, 60, 56, 38, 33, 29, 26, 23, 20, 17, 14, 12, 10, 8];
const TIER = [0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6];
const LIGHT = new Set([0, 2, 3]); // pale slabs (dark ink); every other slab is dark (pale ink)

/** Wraps a homepage section as one concrete level. A no-op unless CONCRETE_THEME is on. */
export function Level({ index, children }: { index: number; children: ReactNode }) {
  if (!CONCRETE_THEME) return <>{children}</>;
  const i = Math.min(index, LIGHTNESS.length - 1);
  return (
    <div
      className="cn-level"
      data-tier={TIER[i]}
      data-tone={LIGHT.has(i) ? "light" : "dark"}
      style={{ "--lvl-l": LIGHTNESS[i] } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
