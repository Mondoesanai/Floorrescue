import puppeteer from "puppeteer";
import fs from "node:fs";

const executablePath = (() => {
  const base = "C:/Users/mondo/.cache/puppeteer/chrome";
  for (const v of fs.readdirSync(base)) {
    const p = `${base}/${v}/chrome-win64/chrome.exe`;
    if (fs.existsSync(p)) return p;
  }
})();

const browser = await puppeteer.launch({ headless: true, executablePath, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

const targets = [
  { url: "http://localhost:3001", name: "mobile-home", wait: 6500 },
  { url: "http://localhost:3001/commercial/restaurant-food-service", name: "mobile-landing", wait: 800 },
  { url: "http://localhost:3001/quote", name: "mobile-quote", wait: 800 },
];

for (const t of targets) {
  await page.goto(t.url, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, t.wait));
  await page.screenshot({ path: `temporary-screenshots/${t.name}.png` });
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`${t.name}: scrollWidth=${scrollWidth} (viewport 390)`);
}

await browser.close();
