import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("scripts/hero-audit");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1888, height: 772 },
  deviceScaleFactor: 1,
});

await page.goto("https://tokenhot.ai/", {
  waitUntil: "networkidle",
  timeout: 180000,
});
await page.waitForTimeout(2500);

// Capture frames over ~14s at intervals
const frames = [];
for (let t = 0; t <= 14; t += 1) {
  const shot = path.join(OUT, `frame-${String(t).padStart(2, "0")}s.png`);
  await page.screenshot({ path: shot, clip: { x: 0, y: 0, width: 1888, height: 772 } });

  const state = await page.evaluate(() => {
    const stack = document.querySelector(".hero-card-swap, .card-swap-container")?.closest(".hero-card-swap")
      || document.querySelector(".hero-card-swap");
    const container = document.querySelector(".card-swap-container");
    const cards = Array.from(document.querySelectorAll(".card-swap-container > .card, .hero-card-swap .card"));

    const mapCard = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const label =
        el.querySelector("[aria-label]")?.getAttribute("aria-label") ||
        el.querySelector("title")?.textContent ||
        (el.textContent || "").trim().slice(0, 24);
      return {
        label,
        x: +r.x.toFixed(1),
        y: +r.y.toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
        z: cs.zIndex,
        transform: cs.transform,
        opacity: cs.opacity,
        br: cs.borderRadius,
      };
    };

    const hero = document.querySelector("section");
    const h1 = document.querySelector("h1");
    const left = document.querySelector(".max-w-\\[760px\\], [class*='max-w-[760px]']");

    return {
      viewport: { w: innerWidth, h: innerHeight },
      hero: hero
        ? {
            className: String(hero.className).slice(0, 280),
            rect: (() => {
              const r = hero.getBoundingClientRect();
              return { x: r.x, y: r.y, w: r.width, h: r.height };
            })(),
            bg: getComputedStyle(hero).backgroundColor,
            padding: getComputedStyle(hero).padding,
          }
        : null,
      stack: stack
        ? {
            className: String(stack.className).slice(0, 300),
            rect: (() => {
              const r = stack.getBoundingClientRect();
              return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.w?.toFixed?.(1) || +r.width.toFixed(1), h: +r.height.toFixed(1) };
            })(),
          }
        : null,
      container: container
        ? {
            className: String(container.className),
            style: container.getAttribute("style"),
            rect: (() => {
              const r = container.getBoundingClientRect();
              return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
            })(),
          }
        : null,
      cards: cards.map(mapCard),
      h1: h1
        ? {
            html: h1.innerHTML.slice(0, 800),
            rect: (() => {
              const r = h1.getBoundingClientRect();
              return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
            })(),
            fontSize: getComputedStyle(h1).fontSize,
          }
        : null,
      left: left
        ? (() => {
            const r = left.getBoundingClientRect();
            return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
          })()
        : null,
    };
  });

  frames.push({ t, ...state });
  if (t < 14) await page.waitForTimeout(1000);
}

fs.writeFileSync(path.join(OUT, "frames.json"), JSON.stringify(frames, null, 2));

// Dump grainient / card CSS and canvas info
const tech = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll(".card-swap-container > .card"));
  return cards.map((card) => {
    const grain = card.querySelector(".grainient-container, canvas");
    const canvas = card.querySelector("canvas");
    const label =
      card.querySelector("[aria-label]")?.getAttribute("aria-label") ||
      (card.textContent || "").trim().slice(0, 40);
    return {
      label,
      cardClass: String(card.className),
      grainClass: grain ? String(grain.className) : null,
      canvas: canvas
        ? { w: canvas.width, h: canvas.height, style: canvas.getAttribute("style") }
        : null,
      styleAttr: card.getAttribute("style"),
      innerHTMLHead: card.innerHTML.slice(0, 500),
    };
  });
});
fs.writeFileSync(path.join(OUT, "tech.json"), JSON.stringify(tech, null, 2));

// Search page scripts for card-swap timing hints in window
const timingHints = await page.evaluate(() => {
  const scripts = Array.from(document.querySelectorAll("script[src]")).map((s) => s.src);
  return { scriptCount: scripts.length, sample: scripts.slice(0, 5) };
});

console.log(
  JSON.stringify(
    {
      frameCount: frames.length,
      t0: {
        left: frames[0].left,
        container: frames[0].container,
        cards: frames[0].cards.map((c) => ({
          label: c.label,
          x: c.x,
          y: c.y,
          z: c.z,
          transform: c.transform,
        })),
      },
      t2: frames[2]?.cards?.map((c) => ({ label: c.label, x: c.x, y: c.y, z: c.z })),
      t4: frames[4]?.cards?.map((c) => ({ label: c.label, x: c.x, y: c.y, z: c.z })),
      techLabels: tech.map((t) => t.label),
      timingHints,
    },
    null,
    2,
  ),
);

await browser.close();
