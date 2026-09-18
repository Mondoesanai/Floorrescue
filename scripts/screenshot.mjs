import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--")) || "http://localhost:3000";
const label = args.filter((a) => !a.startsWith("--")).slice(1)[0] || "";
const waitArg = args.find((a) => a.startsWith("--wait="));
const waitMs = waitArg ? Number(waitArg.split("=")[1]) : 800;

const outDir = path.join(__dirname, "..", "temporary-screenshots");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${label || "screenshot"}.png`);

const executablePath = (() => {
  const base = "C:/Users/mondo/.cache/puppeteer/chrome";
  if (!fs.existsSync(base)) return undefined;
  const versions = fs.readdirSync(base);
  for (const v of versions) {
    const p = `${base}/${v}/chrome-win64/chrome.exe`;
    if (fs.existsSync(p)) return p;
  }
  return undefined;
})();

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, waitMs));
await page.screenshot({ path: outPath });
await browser.close();

console.log(`Saved: ${outPath}`);
if (errors.length) console.log("Console errors:\n" + errors.join("\n"));
