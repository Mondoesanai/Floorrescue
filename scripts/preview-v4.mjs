import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 810 });
await page.goto("file:///" + path.join(process.cwd(), "scripts", "pitch-deck-final.html").replace(/\\/g, "/"), { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 1500));
fs.mkdirSync("temporary-screenshots/deck", { recursive: true });
const want = new Set((process.argv[2] || "1,2,3,4,9,10,11,12,16,17,20,21,26,27").split(",").map(Number));
const total = await page.evaluate(() => document.querySelectorAll(".slide").length);
for (let i = 1; i <= total; i++) {
  if (want.has(i)) {
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({ path: `temporary-screenshots/deck/s${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 55 });
    // overflow check: does slide content exceed viewport?
    const over = await page.evaluate(() => {
      const s = document.querySelector(".slide.active");
      return s.scrollHeight - s.clientHeight;
    });
    if (over > 4) console.log("OVERFLOW slide", i, over);
  }
  await page.keyboard.press("ArrowRight");
}
// overflow scan on every slide
for (let i = 0; i < total; i++) {
  await page.keyboard.press("Home");
  for (let j = 0; j < i; j++) await page.keyboard.press("ArrowRight");
  const over = await page.evaluate(() => {
    const s = document.querySelector(".slide.active");
    return s.scrollHeight - s.clientHeight;
  });
  if (over > 4) console.log("scan overflow", i + 1, over);
}
await browser.close();
