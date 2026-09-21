import puppeteer from "puppeteer";
const [, , url = "http://localhost:3100/", w = "820"] = process.argv;
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: +w, height: 1180, isMobile: true });
await p.goto(url, { waitUntil: "networkidle2" });
console.log("scrollWidth", await p.evaluate(() => document.documentElement.scrollWidth));
console.log(await p.evaluate((W) => [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.right > W + 1 && r.width > 0; }).slice(0, 8).map((e) => e.tagName + "." + String(e.className).slice(0, 70) + " r=" + Math.round(e.getBoundingClientRect().right)), +w));
await b.close();
