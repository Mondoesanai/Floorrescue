import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const executablePath = (() => {
  const base = "C:/Users/mondo/.cache/puppeteer/chrome";
  for (const v of fs.readdirSync(base)) {
    const p = `${base}/${v}/chrome-win64/chrome.exe`;
    if (fs.existsSync(p)) return p;
  }
})();

const browser = await puppeteer.launch({ headless: true, executablePath, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 860 });
const fileUrl = "file:///" + path.join(process.cwd(), "scripts", "pitch-deck-final.html").replace(/\\/g, "/");
await page.goto(fileUrl, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));

const shots = [
  { name: "deck-slide-1", presses: 0 },
  { name: "deck-slide-3", presses: 2 },
  { name: "deck-slide-9", presses: 6 },
  { name: "deck-slide-14", presses: 5 },
];

for (const s of shots) {
  for (let i = 0; i < s.presses; i++) await page.keyboard.press("ArrowRight");
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `temporary-screenshots/${s.name}.png` });
  console.log(`Saved ${s.name}.png`);
}

await browser.close();
