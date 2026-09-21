import puppeteer from "puppeteer";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = "temporary-screenshots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

// 1) mobile overflow
const paths = ["/", "/commercial/restaurant-food-service", "/industrial/warehouse-distribution", "/residential/inside-home", "/projects", "/systems", "/testimonials", "/about"];
for (const p of paths) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
  await page.goto(BASE + p, { waitUntil: "networkidle2", timeout: 60000 });
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(w > 390 ? "OVERFLOW" : "ok", p, w);
  await page.close();
}

// 2) problem finder behavior (desktop)
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() => sessionStorage.clear());
  const box = await page.$("#problem-finder");
  await box.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await new Promise((r) => setTimeout(r, 600));
  await box.type("my floor is breaking");
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/v4-finder-ask.jpg`, type: "jpeg", quality: 70 });
  const q = await page.evaluate(() => document.querySelector("[aria-live=polite]")?.innerText.slice(0, 160));
  console.log("ASK:", q?.replace(/\n/g, " | "));
  const btns = await page.$$("[aria-live=polite] button");
  await btns[0].click();
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${OUT}/v4-finder-result.jpg`, type: "jpeg", quality: 70 });
  console.log("RESULT:", (await page.evaluate(() => document.querySelector("[aria-live=polite]")?.innerText.slice(0, 200)))?.replace(/\n/g, " | "));
  // typo
  await box.click({ clickCount: 3 });
  await box.type("slipery when wet");
  await new Promise((r) => setTimeout(r, 300));
  console.log("TYPO:", (await page.evaluate(() => document.querySelector("[aria-live=polite]")?.innerText.slice(0, 120)))?.replace(/\n/g, " | "));

  // systems columns
  const sys = await page.evaluateHandle(() => [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("Every system we install")));
  await sys.evaluate((el) => el.scrollIntoView({ block: "start" }));
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/v4-systems.jpg`, type: "jpeg", quality: 70 });
  const layers = await page.evaluateHandle(() => [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("A floor is layers")));
  await layers.evaluate((el) => el.scrollIntoView({ block: "start" }));
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${OUT}/v4-layers.jpg`, type: "jpeg", quality: 70 });
  await page.close();
}

// 3) logo smooth scroll + who we are smooth
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() => window.scrollTo(0, 3000));
  await new Promise((r) => setTimeout(r, 300));
  await page.click('button[aria-label^="Floor Rescue"]');
  await new Promise((r) => setTimeout(r, 120));
  const mid = await page.evaluate(() => window.scrollY);
  await new Promise((r) => setTimeout(r, 1500));
  const end = await page.evaluate(() => window.scrollY);
  console.log("LOGO scroll mid/end:", mid, end);
  await page.close();
}

// 4) sector page screenshots
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto(BASE + "/commercial/restaurant-food-service", { waitUntil: "networkidle2", timeout: 60000 });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log("sector page height", h);
  const n = await page.evaluate(() => document.querySelectorAll("blockquote").length);
  console.log("reviews shown", n);
  await page.screenshot({ path: `${OUT}/v4-sector-full.jpg`, type: "jpeg", quality: 45, fullPage: true });
  await page.close();
}
await browser.close();
