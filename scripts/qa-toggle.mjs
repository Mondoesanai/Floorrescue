import puppeteer from "puppeteer";
const BASE = "http://localhost:3100";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
for (const vp of [{ n: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true }, { n: "tablet", width: 820, height: 1180, isMobile: true, hasTouch: true }, { n: "desktop", width: 1366, height: 900 }]) {
  const p = await b.newPage();
  await p.setViewport(vp);
  await p.goto(BASE + "/", { waitUntil: "networkidle2" });
  await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await p.reload({ waitUntil: "networkidle2" });
  const off = await p.evaluate(() => document.body.classList.contains("concrete-on"));
  const w0 = await p.evaluate(() => document.documentElement.scrollWidth);
  // footer toggle
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(500);
  await p.click("footer button[aria-label^='Switch to the concrete']");
  await sleep(500);
  const on = await p.evaluate(() => document.body.classList.contains("concrete-on"));
  const w1 = await p.evaluate(() => document.documentElement.scrollWidth);
  await p.reload({ waitUntil: "networkidle2" });
  const persisted = await p.evaluate(() => document.body.classList.contains("concrete-on"));
  const w2 = await p.evaluate(() => document.documentElement.scrollWidth);
  if (vp.n === "desktop") {
    await p.evaluate(() => document.getElementById("learn-more")?.scrollIntoView({ block: "start" }));
    await sleep(1000);
    await p.screenshot({ path: "temporary-screenshots/toggle-on.jpg", type: "jpeg", quality: 60 });
    // sticky bar toggle turns it off
    await p.evaluate(() => window.scrollTo(0, 1600));
    await sleep(800);
    const hasSticky = await p.evaluate(() => !!document.querySelector("div.fixed button[aria-label^='Switch to the standard']"));
    await p.click("div.fixed button[aria-label^='Switch to the standard']");
    await sleep(300);
    console.log("sticky toggle present:", hasSticky, "now on:", await p.evaluate(() => document.body.classList.contains("concrete-on")));
  }
  console.log(vp.n, { startsOff: !off, footerTurnedOn: on, persisted, widths: [w0, w1, w2] });
  await p.goto(BASE + "/systems", { waitUntil: "networkidle2" });
  console.log(vp.n, "toggle hidden off-home:", (await p.$("footer button[aria-label*='look']")) === null);
  await p.close();
}
await b.close();
