import puppeteer from "puppeteer";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
for (const [n, vp] of [["m", { width: 390, height: 844, isMobile: true, hasTouch: true }], ["t", { width: 820, height: 1180, isMobile: true, hasTouch: true }]]) {
  const p = await b.newPage();
  await p.setViewport(vp);
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle2" });
  await p.evaluate(() => sessionStorage.clear());
  await p.reload({ waitUntil: "networkidle2" });
  await sleep(1500);
  const skip = await p.$("button ::-p-text(Skip)");
  if (skip) await skip.click();
  await sleep(2500);
  await p.screenshot({ path: `temporary-screenshots/text-hero-${n}.jpg`, type: "jpeg", quality: 60 });
  await p.evaluate(() => document.getElementById("learn-more")?.scrollIntoView());
  await sleep(800);
  await p.screenshot({ path: `temporary-screenshots/text-who-${n}.jpg`, type: "jpeg", quality: 60 });
  await p.close();
}
await b.close();
