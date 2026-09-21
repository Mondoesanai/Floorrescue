import puppeteer from "puppeteer";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = "temporary-screenshots";
fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// mobile overflow
for (const p of ["/", "/commercial/restaurant-food-service", "/residential/inside-home", "/industrial/cold-storage", "/problems/moisture", "/problems/existing-floor-failure"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(BASE + p, { waitUntil: "networkidle2", timeout: 60000 });
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(w > 390 ? "OVERFLOW" : "ok", p, w);
  await page.close();
}

const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => sessionStorage.clear());
const scrollToH2 = async (text) => {
  await page.evaluate((t) => {
    const h = [...document.querySelectorAll("h2")].find((x) => x.textContent.includes(t));
    h?.scrollIntoView({ block: "start" });
  }, text);
  await sleep(1800);
};
await scrollToH2("Every system we install");
await page.screenshot({ path: `${OUT}/v5-systems.jpg`, type: "jpeg", quality: 70 });
console.log("systems visible li:", await page.evaluate(() => [...document.querySelectorAll("section")].find((s) => s.textContent.includes("Every system we install")).querySelectorAll("li:not(.hidden)").length));
await scrollToH2("A floor is layers");
await sleep(2500);
await page.screenshot({ path: `${OUT}/v5-layers.jpg`, type: "jpeg", quality: 75 });
await scrollToH2("Real floors");
await page.hover("button[aria-label^='Open photo']");
await sleep(500);
await page.screenshot({ path: `${OUT}/v5-rail.jpg`, type: "jpeg", quality: 70 });
await page.click("button[aria-label^='Open photo']");
await sleep(600);
await page.screenshot({ path: `${OUT}/v5-lightbox.jpg`, type: "jpeg", quality: 60 });
await page.keyboard.press("Escape");
// order check
console.log("h2 order:", await page.evaluate(() => [...document.querySelectorAll("main h2")].slice(0, 8).map((h) => h.textContent.slice(0, 30))));
// progress bar
await page.evaluate(() => window.scrollTo(0, 4200));
await sleep(1500);
await page.screenshot({ path: `${OUT}/v5-progress.jpg`, type: "jpeg", quality: 70 });
// header search
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(300);
await page.click("button[aria-label='Search Floor Rescue']");
await page.keyboard.type("floor is breaking");
await sleep(500);
await page.screenshot({ path: `${OUT}/v5-search.jpg`, type: "jpeg", quality: 70 });

// problem page
await page.goto(BASE + "/problems/slip-resistance", { waitUntil: "networkidle2" });
await page.screenshot({ path: `${OUT}/v5-problem.jpg`, type: "jpeg", quality: 40, fullPage: true });

// sector walk
for (const id of ["commercial/office-corporate", "industrial/food-beverage-processing"]) {
  await page.goto(`${BASE}/${id}`, { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const h = [...document.querySelectorAll("section")].find((s) => /Walk Your/i.test(s.textContent.slice(0, 40)));
    h?.scrollIntoView({ block: "start" });
  });
  await sleep(1800);
  await page.screenshot({ path: `${OUT}/v5-walk-${id.split("/")[1]}.jpg`, type: "jpeg", quality: 70 });
}
await browser.close();
