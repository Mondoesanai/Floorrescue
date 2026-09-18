import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const executablePath = (() => {
  const base = "C:/Users/mondo/.cache/puppeteer/chrome";
  for (const v of fs.readdirSync(base)) {
    const p = `${base}/${v}/chrome-win64/chrome.exe`;
    if (fs.existsSync(p)) return p;
  }
})();

const outDir = path.join(process.cwd(), "scripts", "shots");
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, executablePath, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

async function getStage() {
  return page.evaluate(() => {
    try {
      const raw = sessionStorage.getItem("fr_journey_v1");
      return raw ? JSON.parse(raw).stage : null;
    } catch {
      return null;
    }
  });
}

async function waitForStage(stageOrStages, timeoutMs = 20000) {
  const stages = Array.isArray(stageOrStages) ? stageOrStages : [stageOrStages];
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const s = await getStage();
    if (s && stages.includes(s)) return s;
    await new Promise((r) => setTimeout(r, 300));
  }
  const finalStage = await getStage();
  throw new Error(`Timed out waiting for stage in [${stages.join(",")}] — last seen: ${finalStage}`);
}

async function shot(name) {
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log(`shot: ${name} (stage=${await getStage()}, url=${await page.evaluate(() => location.href)})`);
}

async function clickButtonWithText(text) {
  const clicked = await page.evaluate((t) => {
    const buttons = [...document.querySelectorAll("button")];
    const btn = buttons.find((b) => b.textContent && b.textContent.includes(t));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }, text);
  if (!clicked) throw new Error(`Could not find button containing text: "${text}"`);
}

async function runJourney(label, prefix, envPrefix, cardText, sectorButtonText, projectStateText, expectedPathPrefix) {
  console.log(`\n=== ${label} ===`);
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
  // Clear any journey state left over from a prior run in this same browser
  // session so each journey starts clean from garage-idle, then reload.
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });
  await waitForStage("garage-idle", 25000);
  await shot(`${prefix}-01-garage-idle`);

  await clickButtonWithText(cardText);
  await new Promise((r) => setTimeout(r, 900));
  await shot(`${prefix}-02-build-video-playing`);

  const sectorStage = await waitForStage([`${envPrefix}-sector`], 20000);
  console.log("reached sector stage:", sectorStage);
  await new Promise((r) => setTimeout(r, 700));
  await shot(`${prefix}-03-sector-chooser`);

  await clickButtonWithText(sectorButtonText);
  await new Promise((r) => setTimeout(r, 900));
  await shot(`${prefix}-04-doorentry-video-playing`);

  const projStage = await waitForStage([`${envPrefix}-project-state`], 20000);
  console.log("reached project-state stage:", projStage);
  await new Promise((r) => setTimeout(r, 700));
  await shot(`${prefix}-05-project-state-chooser`);

  await clickButtonWithText(projectStateText);
  await new Promise((r) => setTimeout(r, 900));
  await shot(`${prefix}-06-deepdive-video-playing`);

  const start = Date.now();
  let landed = false;
  while (Date.now() - start < 20000) {
    const url = await page.evaluate(() => location.pathname);
    if (url.startsWith(expectedPathPrefix)) {
      landed = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  if (!landed) throw new Error(`Never landed on ${expectedPathPrefix}... — stuck at ${await page.evaluate(() => location.pathname)}`);
  await new Promise((r) => setTimeout(r, 1200));
  await shot(`${prefix}-07-landing-page`);
  console.log(`${label} SUCCESS — landed at`, await page.evaluate(() => location.href));
}

try {
  await runJourney(
    "RESIDENTIAL",
    "res",
    "residential",
    "Residential",
    "Inside My Home",
    "Upgrade / Renovation",
    "/residential/",
  );
} catch (e) {
  console.log("RESIDENTIAL JOURNEY FAILED:", e.message);
}

try {
  await runJourney(
    "COMMERCIAL",
    "com",
    "commercial",
    "Commercial",
    "Retail / Showroom",
    "New Construction",
    "/commercial/",
  );
} catch (e) {
  console.log("COMMERCIAL JOURNEY FAILED:", e.message);
}

await browser.close();
console.log("\nDONE");
