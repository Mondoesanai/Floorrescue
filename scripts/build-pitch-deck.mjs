import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "scripts");
const shotsDir = path.join(process.cwd(), "temporary-screenshots");

function dataUri(file) {
  const buf = fs.readFileSync(path.join(shotsDir, file));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

let html = fs.readFileSync(path.join(root, "pitch-deck-template.html"), "utf8");

html = html
  .replaceAll("{{IMG_HERO}}", dataUri("deck-hero.jpg"))
  .replaceAll("{{IMG_BUILD}}", dataUri("deck-build.jpg"))
  .replaceAll("{{IMG_LANDING}}", dataUri("deck-landing.jpg"))
  .replaceAll("{{IMG_QUOTE}}", dataUri("deck-quote.jpg"))
  .replaceAll("{{IMG_OLD_HOME}}", dataUri("old-home.jpg"))
  .replaceAll("{{IMG_OLD_SCROLL}}", dataUri("old-scroll.jpg"))
  .replaceAll("{{IMG_OLD_MOBILE}}", dataUri("old-mobile.jpg"))
  .replaceAll("{{IMG_SYSTEMS}}", dataUri("v7-systems.jpg"))
  .replaceAll("{{IMG_FINDER}}", dataUri("v7-finder.jpg"))
  .replaceAll("{{IMG_LAYERS}}", dataUri("v7-layers.jpg"))
  .replaceAll("{{IMG_WALK}}", dataUri("v6-walk.jpg"))
  .replaceAll("{{IMG_J1}}", dataUri("j-sector.jpg"))
  .replaceAll("{{IMG_J2}}", dataUri("j-project.jpg"))
  .replaceAll("{{IMG_J3}}", dataUri("j-landing-top.jpg"));

const outPath = path.join(root, "pitch-deck-final.html");
fs.writeFileSync(outPath, html, "utf8");
console.log(`Written: ${outPath} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
