import puppeteer from "puppeteer";
import fs from "node:fs";
const BASE = "http://localhost:3100";
const OUT = "temporary-screenshots/levels";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1366, height: 900 });
await p.goto(BASE + "/", { waitUntil: "networkidle2" });
await p.evaluate(() => sessionStorage.clear());
const levels = await p.evaluate(() => [...document.querySelectorAll(".cn-level")].map((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
console.log("levels", levels.length);
const picks = [0, 1, 3, 4, 5, 7, 9, 12];
for (const i of picks) {
  await p.evaluate((y) => window.scrollTo(0, y - 60), levels[i]);
  await sleep(1400);
  await p.screenshot({ path: `${OUT}/lvl${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 60 });
}
await b.close();
