import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "temporary-screenshots");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const executablePath = (() => {
  const base = "C:/Users/mondo/.cache/puppeteer/chrome";
  if (!fs.existsSync(base)) return undefined;
  for (const v of fs.readdirSync(base)) {
    const p = `${base}/${v}/chrome-win64/chrome.exe`;
    if (fs.existsSync(p)) return p;
  }
  return undefined;
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, txt) =>
      [...document.querySelectorAll(sel)].find((el) => {
        if (!el.textContent?.includes(txt)) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && getComputedStyle(el).pointerEvents !== "none";
      }),
    selector,
    text,
  );
  const el = handle.asElement();
  if (!el) throw new Error(`Could not find a visible, clickable ${selector} with text "${text}"`);
  await el.click();
}

async function shot(page, name) {
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log(`Saved ${name}.png`);
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on("pageerror", (e) => console.log("PAGE ERROR:", String(e)));
page.on("console", (msg) => console.log("CONSOLE:", msg.type(), msg.text()));

await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await sleep(6000); // intro -> garage idle

await clickByText(page, "button", "Commercial");
await sleep(4800); // build clip near-end -> sector chooser
await shot(page, "journey-1-commercial-build");

await clickByText(page, "button", "Restaurant / Food Service");
await sleep(3800); // door-entry clip near-end -> project-state chooser
await shot(page, "journey-2-door-entry");

await clickByText(page, "button", "Failed or Damaged Floor");
await sleep(7000); // deep-dive clip ended -> router.replace to landing, generous buffer
await shot(page, "journey-3-personalized-landing");
console.log("Final URL:", page.url());

await clickByText(page, "a, button", "Request a Quote");
await sleep(1200);
await shot(page, "journey-4-quote-prefilled");
console.log("Quote page URL:", page.url());

await browser.close();
