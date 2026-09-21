// Generates src/app/concrete.css — the concrete "levels" look for the HOMEPAGE.
// Everything is scoped under body.concrete-on (the visitor's switch), inside <Level> wrappers.
// Fifteen slabs, each a different material, stepping down from a polished floor through
// gravel, rebar and soil to bedrock — no two neighbouring sections share a material.
import fs from "node:fs";

const svg = (w, h, filter) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='f' x='0' y='0' width='100%' height='100%'>${filter}</filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`,
  )}")`;
const turb = (freq, oct, seed, type = "fractalNoise") => `<feTurbulence type='${type}' baseFrequency='${freq}' numOctaves='${oct}' seed='${seed}' stitchTiles='stitch'/>`;
const a = (r, g, b, k, off) => `<feColorMatrix type='matrix' values='0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  ${k} 0 0 0 ${off}'/>`;
const dim = (f, k) => f + `<feComponentTransfer><feFuncA type='linear' slope='${k}'/></feComponentTransfer>`;

const T = {
  grain: svg(300, 300, dim(turb(0.9, 3, 4) + a(0.95, 0.95, 0.93, 1.0, -0.42), 0.55)),
  grainDark: svg(300, 300, dim(turb(0.9, 3, 8) + a(0, 0, 0, -1.0, 0.62), 0.5)),
  sand: svg(260, 260, dim(turb(1.3, 2, 33) + a(0.9, 0.82, 0.68, 1.3, -0.5), 0.6)),
  trowelL: svg(900, 900, dim(turb("0.006 0.006", 3, 15) + a(1, 1, 1, 0.5, -0.16), 0.5)),
  trowelD: svg(900, 900, dim(turb("0.005 0.007", 3, 5) + a(0, 0, 0, 0.5, -0.16), 0.5)),
  broom: svg(600, 600, dim(turb("0.0015 0.75", 2, 3) + a(0, 0, 0, 1.1, -0.38), 0.85)),
  broomL: svg(600, 600, dim(turb("0.0015 0.75", 2, 13) + a(1, 1, 1, 1.1, -0.42), 0.5)),
  speckD: svg(300, 300, dim(turb(0.7, 1, 12) + a(0, 0, 0, 11, -7.4), 0.4)),
  speckL: svg(300, 300, dim(turb(0.65, 1, 31) + a(0.98, 0.97, 0.94, -11, 3.4), 0.35)),
  aggGray: svg(500, 500, dim(turb(0.08, 2, 44) + a(0.55, 0.56, 0.6, 12, -7.5), 0.34)),
  aggTan: svg(500, 500, dim(turb(0.07, 2, 6) + a(0.66, 0.6, 0.5, 12, -7.3), 0.3)),
  chips: svg(700, 700, dim(turb(0.035, 2, 61) + a(0.7, 0.68, 0.62, 12, -7.6), 0.3)),
  boardGrain: svg(400, 700, dim(turb("0.5 0.004", 2, 9) + a(0, 0, 0, 0.9, -0.3), 0.9)),
  gravel: svg(420, 420, dim(turb(0.2, 3, 17) + a(0, 0, 0, 10, -6.5), 0.36)),
  gravelBig: svg(520, 520, dim(turb(0.09, 3, 71) + a(0.7, 0.62, 0.5, 10, -6.4), 0.3)),
  pores: svg(380, 380, dim(turb(0.42, 1, 21) + a(0, 0, 0, 16, -12.6), 0.55)),
  strata: svg(800, 400, dim(turb("0.002 0.03", 3, 81) + a(0.16, 0.08, 0.03, 1.1, -0.4), 0.7)),
  strataL: svg(800, 400, dim(turb("0.002 0.025", 3, 83) + a(0.75, 0.55, 0.35, 1.0, -0.42), 0.32)),
  veins: svg(600, 600, dim(turb(0.018, 4, 91, "turbulence") + a(0, 0, 0, -9, 1.5), 0.6)),
  glint: svg(300, 300, turb(0.9, 1, 95) + a(0.75, 0.85, 1, 22, -19.2)),
  rust: svg(1000, 1000, dim(turb("0.004 0.006", 3, 27) + a(0.5, 0.25, 0.1, 0.9, -0.3), 0.5)),
};

const lines = (deg, gap, w, col) => `repeating-linear-gradient(${deg}deg, transparent 0 ${gap - w}px, ${col} ${gap - w}px ${gap}px)`;
const sheen = "linear-gradient(115deg, rgba(255,255,255,0) 18%, rgba(255,255,255,0.2) 36%, rgba(255,255,255,0) 52%, rgba(255,255,255,0.1) 78%, rgba(255,255,255,0) 100%)";
const sheenD = "linear-gradient(115deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.09) 38%, rgba(255,255,255,0) 54%)";
const tieHoles = "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.75) 0 6px, rgba(255,255,255,0.16) 6px 8px, transparent 8px)";
const rebarV = lines(90, 120, 5, "rgba(140,70,34,0.7)");
const rebarH = lines(0, 120, 5, "rgba(140,70,34,0.7)");
const rebarHi = lines(90, 120, 2, "rgba(255,190,140,0.16)");

// One entry per homepage section, top to bottom. hsl = base colour; tone = text ink.
const L = [
  { name: "polished troweled slab", hsl: [32, 4, 64], img: [sheen, T.trowelL, T.trowelD, T.grain], size: ["100% 100%", "900px", "900px", "300px"] },
  { name: "brushed dark band", hsl: [215, 6, 27], img: [T.broom, T.grain, T.pores], size: ["600px", "300px", "380px"] },
  { name: "salt & pepper polish", hsl: [40, 5, 60], img: [T.speckD, T.speckL, T.trowelD, T.grain], size: ["300px", "300px", "900px", "300px"] },
  { name: "sandblasted sand finish", hsl: [34, 14, 56], img: [T.sand, T.broomL, T.trowelD], size: ["260px", "600px", "900px"] },
  { name: "exposed aggregate", hsl: [210, 5, 35], img: [T.aggGray, T.aggTan, T.speckD, T.trowelD], size: ["500px", "500px", "300px", "900px"] },
  { name: "board-formed", hsl: [26, 6, 31], img: [lines(90, 142, 2, "rgba(0,0,0,0.42)"), lines(90, 142, 2, "rgba(255,255,255,0.06)"), T.boardGrain, T.grain], size: ["auto", "auto", "400px 700px", "300px"] },
  { name: "precast panel with tie holes", hsl: [200, 4, 30], img: [tieHoles, lines(90, 480, 3, "rgba(0,0,0,0.5)"), lines(0, 360, 3, "rgba(0,0,0,0.5)"), T.grain, T.pores], size: ["240px 240px", "auto", "auto", "300px", "380px"] },
  { name: "terrazzo chips", hsl: [18, 5, 26], img: [T.chips, T.aggGray, T.speckL, T.grainDark], size: ["700px", "500px", "300px", "300px"] },
  { name: "dark polished", hsl: [0, 0, 22], img: [sheenD, T.trowelL, T.glint, T.grain], size: ["100% 100%", "900px", "300px", "300px"] },
  { name: "crushed-stone base", hsl: [36, 9, 27], img: [T.gravelBig, T.gravel, T.pores, T.grain], size: ["520px", "420px", "380px", "300px"] },
  { name: "rebar in concrete", hsl: [14, 9, 22], img: [rebarHi, rebarV, rebarH, T.rust, T.gravel, T.grain], size: ["auto", "auto", "auto", "1000px", "420px", "300px"] },
  { name: "compacted sand & soil", hsl: [28, 24, 20], img: [T.sand, T.strataL, T.gravel, T.pores], size: ["260px", "800px 400px", "420px", "380px"] },
  { name: "clay strata", hsl: [20, 30, 17], img: [T.strata, T.strataL, T.grainDark, T.pores], size: ["800px 400px", "800px 400px", "300px", "380px"] },
  { name: "bedrock", hsl: [216, 9, 14], img: [T.veins, T.gravel, T.glint, T.grain], size: ["600px", "420px", "300px", "300px"] },
  { name: "deep rock", hsl: [222, 12, 9], img: [T.veins, T.glint, T.aggGray, T.grainDark], size: ["600px", "300px", "500px", "300px"] },
];

const levelCss = L.map(
  (v, i) => `/* ${i}: ${v.name} */
.cn-level[data-level="${i}"] {
  background-color: hsl(${v.hsl[0]}deg ${v.hsl[1]}% ${v.hsl[2]}%);
  background-image: ${v.img.join(",\n    ")};
  background-size: ${v.size.join(", ")};
}`,
).join("\n");

const pocket = [
  `.cn-level :is(div, article, aside, li, blockquote, details, form)[class~="bg-charcoal-900"][class*="rounded"]`,
  `.cn-level :is(div, article, aside, li, blockquote, details, form)[class~="bg-charcoal-950"][class*="rounded"]`,
  `.cn-level :is(a, button)[class~="bg-charcoal-900"][class*="rounded"]:not([class*="fixed"])`,
  `.cn-level :is(a, button)[class~="bg-charcoal-950"][class*="rounded"]:not([class*="fixed"])`,
];
const pocketSel = (extra = "") => pocket.map((s) => s + extra).join(",\n");

const css = `/* GENERATED by scripts/gen-concrete.mjs — homepage concrete levels (inert until body.concrete-on). */

/* Each section is its own slab, one level lower than the one above it. */
.cn-level {
  position: relative;
  box-shadow:
    inset 0 4px 0 rgba(255, 255, 255, 0.3),
    inset 0 44px 46px -26px rgba(0, 0, 0, 0.8),
    inset 0 -16px 26px -16px rgba(0, 0, 0, 0.5);
  border-top: 2px solid rgba(0, 0, 0, 0.7);
}
${levelCss}

/* the section's own flat background steps aside; the slab shows through */
.cn-level > * {
  background: none !important;
  box-shadow: none !important;
  border-top-color: transparent !important;
}

/* ---------- READABILITY: every muted text class is lifted to near-full strength ---------- */
.cn-level [class*="text-warm-white/"] {
  color: color-mix(in srgb, var(--color-warm-white) 93%, transparent) !important;
}
.cn-level [class*="text-[10px]"],
.cn-level [class*="text-[11px]"] {
  font-size: 12.5px !important;
  line-height: 1.5 !important;
}
.cn-level [class*="text-xs"] {
  font-size: 13px !important;
}
.cn-level .text-sm {
  font-size: 15px !important;
}

/* big gradient numbers: no inherited highlight, so they stay solid */
.cn-level .text-gold-gradient,
.cn-level .text-gold-gradient * {
  text-shadow: none !important;
  font-weight: 800;
}

/* ---------- light slabs: dark ink cut into pale concrete ---------- */
.cn-level[data-tone="light"] {
  --color-warm-white: #0d0e10;
  --color-gold-100: #3a2a07;
  --color-gold-200: #3a2a07;
  --color-gold-300: #47340a;
  --color-gold-500: #5b420f;
  color: #0d0e10;
}
.cn-level[data-tone="light"] .text-gold-gradient {
  background-image: linear-gradient(180deg, #3a2906, #1b1303);
  -webkit-background-clip: text;
  background-clip: text;
}
.cn-level[data-tone="light"] :is(h1, h2, h3, h4) {
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.75), 0 -1px 1px rgba(0, 0, 0, 0.4);
}
.cn-level[data-tone="light"] :is(p, li, label, span):not(.text-gold-gradient) {
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
  font-weight: 500;
}

/* ---------- dark slabs: pale ink cut into deep concrete ---------- */
.cn-level[data-tone="dark"] {
  --color-warm-white: #fbf8f0;
  color: #fbf8f0;
}
.cn-level[data-tone="dark"] :is(h1, h2, h3, h4):not(.text-gold-gradient) {
  text-shadow: 0 -2px 1px rgba(0, 0, 0, 1), 0 2px 0 rgba(255, 255, 255, 0.2);
}
.cn-level[data-tone="dark"] :is(p, li, label, span):not(.text-gold-gradient) {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.85);
}

/* ---------- pockets: cards and wells cut down into the slab ---------- */
${pocketSel()} {
  --color-warm-white: #fbf8f0;
  --color-gold-100: #f4e8c9;
  --color-gold-200: #f0dfb4;
  --color-gold-300: #e8cf9a;
  --color-gold-500: #cba456;
  color: #fbf8f0;
  background-color: #0b0c0d;
  background-image: ${[T.pores, T.grain].join(", ")};
  background-size: 380px, 300px;
  border: 1px solid rgba(0, 0, 0, 0.85);
  translate: none !important;
  box-shadow:
    inset 0 3px 0 rgba(0, 0, 0, 1),
    inset 0 18px 30px rgba(0, 0, 0, 0.95),
    inset 12px 12px 26px rgba(0, 0, 0, 0.65),
    inset -3px -3px 0 rgba(255, 255, 255, 0.16),
    0 3px 0 rgba(255, 255, 255, 0.4),
    0 -2px 0 rgba(0, 0, 0, 0.75),
    0 0 0 5px rgba(0, 0, 0, 0.16) !important;
}
${pocketSel(":hover")} {
  translate: none !important;
  border-color: rgba(232, 205, 138, 0.55);
}
${pocketSel()} :is(h1, h2, h3, h4, p, li, span) {
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 1), 0 1px 0 rgba(255, 255, 255, 0.14);
}

/* ---------- inputs: holes in the slab ---------- */
.cn-level :is(input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea, select) {
  --color-warm-white: #fbf8f0;
  color: #fbf8f0;
  background-color: #060708;
  background-image: ${T.grain};
  background-size: 300px;
  border: 1px solid rgba(0, 0, 0, 0.9);
  box-shadow:
    inset 0 4px 0 rgba(0, 0, 0, 1),
    inset 0 20px 32px rgba(0, 0, 0, 1),
    inset 8px 8px 18px rgba(0, 0, 0, 0.7),
    inset -3px -3px 0 rgba(255, 255, 255, 0.15),
    0 3px 0 rgba(255, 255, 255, 0.42),
    0 0 0 5px rgba(0, 0, 0, 0.16) !important;
}
.cn-level :is(input, textarea, select):focus {
  box-shadow:
    inset 0 20px 32px rgba(0, 0, 0, 1),
    0 0 0 3px rgba(232, 205, 138, 0.7) !important;
}

/* ---------- buttons: raised metal on top of the slab ---------- */
.cn-level :is(a, button)[class*="from-gold-300"][class*="to-gold-700"],
.cn-level :is(a, button)[class~="bg-gold-300"]:not([aria-pressed]) {
  --color-warm-white: #fbf8f0;
  background-image: linear-gradient(180deg, #f8e9bb 0%, #d8b25c 50%, #a17c34 100%);
  color: #14110a;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) !important;
  border: 1px solid #7a5c22;
  box-shadow:
    0 7px 0 #5f4a1c,
    0 14px 20px -2px rgba(0, 0, 0, 0.75),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -3px 0 rgba(0, 0, 0, 0.2);
  translate: 0 -4px;
  transition: translate 0.12s ease, box-shadow 0.12s ease;
}
.cn-level :is(a, button)[class*="from-gold-300"][class*="to-gold-700"]:hover,
.cn-level :is(a, button)[class~="bg-gold-300"]:not([aria-pressed]):hover {
  translate: 0 -5px;
}
.cn-level :is(a, button)[class*="from-gold-300"][class*="to-gold-700"]:active,
.cn-level :is(a, button)[class~="bg-gold-300"]:not([aria-pressed]):active {
  translate: 0 3px;
  box-shadow:
    0 1px 0 #5f4a1c,
    0 3px 6px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* ---------- photos pressed into the slab ---------- */
.cn-level .deboss {
  position: relative;
  box-shadow: 0 3px 0 rgba(255, 255, 255, 0.4), 0 -2px 0 rgba(0, 0, 0, 0.8), 0 0 0 5px rgba(0, 0, 0, 0.16) !important;
}
.cn-level .deboss::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 3;
  box-shadow:
    inset 0 0 0 5px rgba(0, 0, 0, 0.7),
    inset 0 16px 28px rgba(0, 0, 0, 0.9),
    inset 12px 14px 22px rgba(0, 0, 0, 0.55),
    inset -4px -4px 0 rgba(255, 255, 255, 0.16);
}

/* ---------- the wheel: a round recess ---------- */
.cn-level .badge-wheel::before {
  content: "";
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  background-color: #08090a;
  background-image: ${T.grain}, radial-gradient(circle at 50% 28%, #1c1d1f, #060607 72%);
  background-size: 300px, auto;
  box-shadow:
    inset 0 12px 20px rgba(0, 0, 0, 1),
    inset 5px 6px 12px rgba(0, 0, 0, 0.7),
    inset -3px -3px 0 rgba(255, 255, 255, 0.16),
    0 3px 0 rgba(255, 255, 255, 0.42),
    0 -2px 0 rgba(0, 0, 0, 0.85),
    0 0 0 5px rgba(0, 0, 0, 0.16);
}
`;
fs.writeFileSync("src/app/concrete.css", css.replaceAll(".cn-level", "body.concrete-on .cn-level"));
console.log("concrete.css", (css.length / 1024).toFixed(1) + " KB", L.length, "levels");
