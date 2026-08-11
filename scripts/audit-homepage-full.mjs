import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("scripts/homepage-audit");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto("https://tokenhot.ai/", {
  waitUntil: "networkidle",
  timeout: 180000,
});
await page.waitForTimeout(2500);

// Full-page screenshots in chunks
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const viewport = 900;
let y = 0;
let i = 0;
while (y < totalHeight) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(OUT, `chunk-${String(i).padStart(2, "0")}-y${y}.png`),
  });
  y += viewport - 80;
  i += 1;
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

const inventory = await page.evaluate(() => {
  const main = document.querySelector("main") || document.body;

  // Section-like blocks: direct children of main / major wrappers
  const candidates = [];
  const walkRoots = [main];
  for (const root of walkRoots) {
    for (const child of root.children) {
      const tag = child.tagName.toLowerCase();
      if (["script", "style", "noscript"].includes(tag)) continue;
      const r = child.getBoundingClientRect();
      const absTop = r.top + window.scrollY;
      const text = (child.innerText || "").trim().replace(/\s+/g, " ").slice(0, 280);
      const headings = Array.from(child.querySelectorAll("h1,h2,h3,h4"))
        .slice(0, 8)
        .map((h) => ({
          tag: h.tagName,
          text: (h.textContent || "").trim().slice(0, 160),
          className: String(h.className).slice(0, 200),
        }));
      const imgs = Array.from(child.querySelectorAll("img")).map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
        dw: Math.round(img.getBoundingClientRect().width),
        dh: Math.round(img.getBoundingClientRect().height),
      }));
      const videos = Array.from(child.querySelectorAll("video,source"))
        .map((el) => el.getAttribute("src") || el.currentSrc || "")
        .filter(Boolean);
      const links = Array.from(child.querySelectorAll("a"))
        .slice(0, 20)
        .map((a) => ({
          text: (a.textContent || "").trim().slice(0, 80),
          href: a.getAttribute("href"),
        }));
      const buttons = Array.from(child.querySelectorAll("button,a"))
        .filter((el) =>
          /Generate|View Docs|API Key|Talk to Sales|Create|Get Your/i.test(
            el.textContent || "",
          ),
        )
        .map((el) => (el.textContent || "").trim());

      const cs = getComputedStyle(child);
      candidates.push({
        tag,
        className: String(child.className).slice(0, 260),
        top: Math.round(absTop),
        height: Math.round(r.height),
        width: Math.round(r.width),
        bg: cs.backgroundColor,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        textPreview: text,
        headings,
        imgs: imgs.slice(0, 30),
        videos,
        links: links.slice(0, 15),
        buttons: [...new Set(buttons)].slice(0, 10),
      });
    }
  }

  // Also collect all section/h2 blocks with absolute positions
  const h2Blocks = Array.from(document.querySelectorAll("h1,h2")).map((h) => {
    const r = h.getBoundingClientRect();
    const section =
      h.closest("section") ||
      h.closest("[class*='section']") ||
      h.parentElement?.parentElement;
    const scs = section ? getComputedStyle(section) : null;
    const sr = section?.getBoundingClientRect();
    return {
      tag: h.tagName,
      text: (h.textContent || "").trim().slice(0, 200),
      className: String(h.className).slice(0, 240),
      fontSize: getComputedStyle(h).fontSize,
      fontWeight: getComputedStyle(h).fontWeight,
      fontFamily: getComputedStyle(h).fontFamily,
      lineHeight: getComputedStyle(h).lineHeight,
      color: getComputedStyle(h).color,
      top: Math.round(r.top + window.scrollY),
      width: Math.round(r.width),
      section: section
        ? {
            className: String(section.className).slice(0, 240),
            top: Math.round((sr?.top || 0) + window.scrollY),
            height: Math.round(sr?.height || 0),
            padding: scs
              ? `${scs.paddingTop} ${scs.paddingRight} ${scs.paddingBottom} ${scs.paddingLeft}`
              : null,
            bg: scs?.backgroundColor,
          }
        : null,
    };
  });

  // All network-visible media from DOM
  const allImgs = Array.from(document.querySelectorAll("img")).map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    w: img.naturalWidth,
    h: img.naturalHeight,
  }));
  const allVideos = Array.from(document.querySelectorAll("video")).map((v) => ({
    src: v.currentSrc || v.getAttribute("src"),
    poster: v.getAttribute("poster"),
  }));
  const audio = Array.from(document.querySelectorAll("audio,source")).map(
    (el) => el.getAttribute("src") || el.currentSrc || "",
  );

  // Background images
  const bgUrls = new Set();
  document.querySelectorAll("*").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== "none") {
      const matches = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
      for (const m of matches) bgUrls.add(m[1]);
    }
  });

  // Code section tabs
  const tabLabels = Array.from(document.querySelectorAll("button,a,[role='tab']"))
    .map((el) => (el.textContent || "").trim())
    .filter((t) =>
      /^(cURL|Python|JavaScript|Go|Java|PHP|TypeScript|Node)$/i.test(t),
    );

  // Model card titles
  const modelTitles = Array.from(document.querySelectorAll("h3,h4"))
    .map((el) => ({
      text: (el.textContent || "").trim(),
      className: String(el.className).slice(0, 160),
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    }))
    .filter((x) => x.text.length > 0 && x.text.length < 80);

  return {
    title: document.title,
    bodyHeight: document.body.scrollHeight,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    candidates,
    h2Blocks,
    allImgs,
    allVideos,
    audio: [...new Set(audio)].filter(Boolean),
    bgUrls: [...bgUrls],
    tabLabels: [...new Set(tabLabels)],
    modelTitles,
  };
});

fs.writeFileSync(
  path.join(OUT, "inventory.json"),
  JSON.stringify(inventory, null, 2),
);

// Capture HTML of main for structure analysis
const mainHtml = await page.evaluate(() => {
  const main = document.querySelector("main");
  return main ? main.outerHTML : document.body.innerHTML;
});
fs.writeFileSync(path.join(OUT, "main.html"), mainHtml);

// Collect network requests for media
const mediaUrls = new Set();
page.on("response", (res) => {
  const url = res.url();
  if (/\.(png|jpe?g|webp|avif|svg|gif|mp4|webm|mp3|wav|woff2?)(\?|$)/i.test(url)) {
    mediaUrls.add(url);
  }
});

// Scroll again to trigger lazy loads
await page.evaluate(async () => {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await delay(200);
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);

fs.writeFileSync(
  path.join(OUT, "media-urls.json"),
  JSON.stringify([...mediaUrls], null, 2),
);

console.log(
  JSON.stringify(
    {
      bodyHeight: inventory.bodyHeight,
      sectionCount: inventory.candidates.length,
      h2Count: inventory.h2Blocks.length,
      headings: inventory.h2Blocks.map((h) => h.text),
      modelTitles: inventory.modelTitles.map((m) => m.text),
      tabLabels: inventory.tabLabels,
      imgCount: inventory.allImgs.length,
      videoCount: inventory.allVideos.length,
      mediaNetwork: [...mediaUrls].length,
      chunkScreenshots: i,
    },
    null,
    2,
  ),
);

await browser.close();
