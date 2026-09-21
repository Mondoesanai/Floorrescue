import puppeteer from "puppeteer";
const BASE = "http://localhost:3100";
const OUT = "temporary-screenshots";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
// finder
await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => sessionStorage.clear());
await page.evaluate(() => document.getElementById("problem-finder").scrollIntoView({ block: "center" }));
await sleep(800);
await page.type("#problem-finder", "my floor is breaking");
await sleep(500);
await page.screenshot({ path: `${OUT}/v6-finder.jpg`, type: "jpeg", quality: 78 });
// walk plan (restaurant)
await page.goto(BASE + "/commercial/restaurant-food-service", { waitUntil: "networkidle2" });
await page.evaluate(() => [...document.querySelectorAll("section")].find((s) => /Walk Your/i.test(s.textContent.slice(0, 40)))?.scrollIntoView({ block: "start" }));
await sleep(2200);
await page.screenshot({ path: `${OUT}/v6-walk.jpg`, type: "jpeg", quality: 78 });
// systems columns
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await page.evaluate(() => [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("Every system we install"))?.scrollIntoView({ block: "start" }));
await sleep(1800);
await page.screenshot({ path: `${OUT}/v6-systems.jpg`, type: "jpeg", quality: 78 });
// problem page
await page.goto(BASE + "/problems/moisture", { waitUntil: "networkidle2" });
await page.evaluate(() => window.scrollTo(0, 380));
await sleep(600);
await page.screenshot({ path: `${OUT}/v6-problem.jpg`, type: "jpeg", quality: 78 });
await browser.close();
