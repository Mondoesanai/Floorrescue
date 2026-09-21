import puppeteer from "puppeteer";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = "temporary-screenshots/concrete";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "tablet", width: 820, height: 1180, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1366, height: 900 },
];
const pages = ["/", "/commercial/restaurant-food-service", "/industrial/cold-storage", "/problems/moisture", "/quote", "/projects", "/systems", "/about"];

for (const vp of viewports) {
  for (const mode of ["concrete", "fallback"]) {
    const bad = [];
    for (const p of pages) {
      const page = await browser.newPage();
      await page.setViewport(vp);
      await page.goto(BASE + p, { waitUntil: "networkidle2", timeout: 60000 });
      if (mode === "fallback") await page.evaluate(() => document.body.classList.remove("theme-concrete"));
      await sleep(200);
      const w = await page.evaluate(() => document.documentElement.scrollWidth);
      if (w > vp.width) bad.push(`${p}:${w}`);
      await page.close();
    }
    console.log(vp.name, mode, bad.length ? "OVERFLOW " + bad.join(" ") : "ok");
  }
}

// screenshots (concrete)
for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() => sessionStorage.clear());
  await page.evaluate(() => document.getElementById("learn-more")?.scrollIntoView({ block: "start" }));
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/${vp.name}-who.jpg`, type: "jpeg", quality: 72 });
  await page.evaluate(() => document.getElementById("problem-finder")?.scrollIntoView({ block: "center" }));
  await sleep(1000);
  await page.screenshot({ path: `${OUT}/${vp.name}-finder.jpg`, type: "jpeg", quality: 72 });
  await page.close();
}
await browser.close();
