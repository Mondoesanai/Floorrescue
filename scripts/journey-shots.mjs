// Walks the real guided experience on the local build and saves deck screenshots.
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = "temporary-screenshots";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, txt) =>
      [...document.querySelectorAll(sel)].find((el) => {
        if (!el.textContent?.includes(txt)) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).pointerEvents !== "none";
      }),
    selector,
    text,
  );
  const el = handle.asElement();
  if (!el) throw new Error(`no clickable ${selector} with "${text}"`);
  await el.click();
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE, { waitUntil: "networkidle2" });
await page.evaluate(() => sessionStorage.clear());
await page.reload({ waitUntil: "networkidle2" });
await sleep(7000); // intro -> garage idle

await clickByText(page, "button", "Commercial");
await sleep(5500);
await page.screenshot({ path: `${OUT}/j-sector.jpg`, type: "jpeg", quality: 80 });
console.log("sector chooser");

await clickByText(page, "button", "Restaurant / Food Service");
await sleep(4500);
await page.screenshot({ path: `${OUT}/j-project.jpg`, type: "jpeg", quality: 80 });
console.log("project state chooser");

await clickByText(page, "button", "Failed or Damaged Floor");
await sleep(9000);
console.log("landing url:", page.url());
await sleep(1500);
await page.screenshot({ path: `${OUT}/j-landing-top.jpg`, type: "jpeg", quality: 80 });
await page.evaluate(() => window.scrollTo(0, 880));
await sleep(1600);
await page.screenshot({ path: `${OUT}/j-landing-2.jpg`, type: "jpeg", quality: 80 });
await page.evaluate(() => window.scrollTo(0, 1900));
await sleep(1600);
await page.screenshot({ path: `${OUT}/j-landing-3.jpg`, type: "jpeg", quality: 80 });
await browser.close();
