import puppeteer from "puppeteer";
import fs from "node:fs";
const BASE = "http://localhost:3100";
const OUT = "temporary-screenshots/levels2";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1366, height: 900 });
await p.goto(BASE + "/", { waitUntil: "networkidle2" });
await p.evaluate(() => { sessionStorage.clear(); localStorage.setItem("fr-concrete", "1"); });
await p.reload({ waitUntil: "networkidle2" });
const tops = await p.evaluate(() => [...document.querySelectorAll(".cn-level")].map((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
const pick = (process.argv[2] || "0,1,2,3,5,7,10,12").split(",").map(Number);
for (const i of pick) {
  await p.evaluate((y) => window.scrollTo(0, y - 40), tops[i]);
  await sleep(1300);
  await p.screenshot({ path: `${OUT}/l${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 58 });
}
await b.close();
