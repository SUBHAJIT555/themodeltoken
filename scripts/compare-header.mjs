import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("scripts/compare");
fs.mkdirSync(OUT_DIR, { recursive: true });

async function measureHeader(page, label) {
  return page.evaluate((lab) => {
    const banner = document.querySelector(".announcement-banner-wrapper");
    const nav = document.querySelector("nav[aria-label='Primary'], nav.navbar, nav");
    const logo = document.querySelector('img[alt="TokenHot"], img[alt="NexusAPI"], img[src*="Logo-header"]');
    const body = document.body;
    const pick = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        x: +r.x.toFixed(1),
        y: +r.y.toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
        bg: cs.backgroundColor,
        color: cs.color,
        fontFamily: cs.fontFamily,
        borderRadius: cs.borderRadius,
        backdropFilter: cs.backdropFilter,
      };
    };
    return {
      label: lab,
      bodyBg: getComputedStyle(body).backgroundColor,
      banner: pick(banner),
      nav: pick(nav),
      logo: pick(logo),
    };
  }, label);
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const original = await ctx.newPage();
await original.goto("https://tokenhot.ai/", { waitUntil: "networkidle", timeout: 120000 });
await original.waitForTimeout(1200);
await original.screenshot({ path: path.join(OUT_DIR, "original-1440x900.png") });
const originalMetrics = await measureHeader(original, "original");

const local = await ctx.newPage();
await local.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await local.waitForTimeout(1200);
await local.screenshot({ path: path.join(OUT_DIR, "local-1440x900.png") });
const localMetrics = await measureHeader(local, "local");

const report = { original: originalMetrics, local: localMetrics };
fs.writeFileSync(path.join(OUT_DIR, "header-metrics.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
