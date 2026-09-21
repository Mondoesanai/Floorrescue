// One-time wiring for the concrete theme: layout flag, css import, and the deboss / wheel hooks.
import fs from "node:fs";

const edit = (file, pairs) => {
  let s = fs.readFileSync(file, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) console.log("MISSING in", file, "->", a.slice(0, 60));
    s = s.replace(a, b);
  }
  fs.writeFileSync(file, s);
};

edit("src/app/globals.css", [['@import "tailwindcss";', '@import "tailwindcss";\n@import "./concrete.css";']]);
edit("src/app/layout.tsx", [
  [
    '<body className="flex min-h-full flex-col bg-charcoal-950 text-warm-white">',
    '<body className={`flex min-h-full flex-col bg-charcoal-950 text-warm-white ${CONCRETE_THEME ? "theme-concrete" : ""}`}>',
  ],
  [
    "export const metadata",
    "// One-line switch: false returns the flat black look (also tagged in git as before-concrete-theme).\nconst CONCRETE_THEME = true;\n\nexport const metadata",
  ],
]);
edit("src/components/home/WhoWeAreSection.tsx", [
  ['<div className="relative overflow-visible rounded-2xl', '<div className="deboss relative overflow-visible rounded-2xl'],
]);
edit("src/components/ui/RotatingBadge.tsx", [['<div className="relative flex h-24 w-24', '<div className="badge-wheel relative flex h-24 w-24']]);
edit("src/components/home/SystemExplorer.tsx", [['<div className="group/photo relative aspect-[4/3]', '<div className="deboss group/photo relative aspect-[4/3]']]);
edit("src/components/home/FindYourSpaceSection.tsx", [['<div className="group/photo relative h-64', '<div className="deboss group/photo relative h-64']]);
edit("src/components/home/WorkRail.tsx", [['className="group relative h-56 w-80', 'className="deboss group relative h-56 w-80']]);
console.log("applied");
