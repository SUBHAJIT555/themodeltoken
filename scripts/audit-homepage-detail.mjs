import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("scripts/homepage-audit");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://tokenhot.ai/", { waitUntil: "networkidle", timeout: 180000 });
await page.waitForTimeout(2000);

const detail = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("main section, body > div > main section, main > section"));
  // fallback
  const allSections = sections.length
    ? sections
    : Array.from(document.querySelectorAll("section"));

  const dumpSection = (section, idx) => {
    const r = section.getBoundingClientRect();
    const html = section.innerHTML;
    // extract key class patterns
    const cards = Array.from(section.querySelectorAll("[class*='card'], [class*='Card'], article")).slice(0, 20).map((el) => {
      const cs = getComputedStyle(el);
      const rr = el.getBoundingClientRect();
      return {
        className: String(el.className).slice(0, 220),
        text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 220),
        w: Math.round(rr.width),
        h: Math.round(rr.height),
        bg: cs.backgroundColor,
        br: cs.borderRadius,
        border: `${cs.borderTopWidth} ${cs.borderTopColor}`,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      };
    });

    const labels = Array.from(section.querySelectorAll("p,span,div"))
      .map((el) => ({
        text: (el.textContent || "").trim(),
        className: String(el.className).slice(0, 180),
      }))
      .filter((x) =>
        /NEXT-GEN|Text & Reasoning|Image|Video|Audio|OpenAI SDK|INSTANT|Ultra-Low|Generate API|View Docs|cURL|Fully compatible/i.test(
          x.text,
        ) && x.text.length < 120,
      )
      .slice(0, 40);

    return {
      idx,
      className: String(section.className).slice(0, 300),
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      text: (section.innerText || "").trim().replace(/\s+/g, "\n").slice(0, 3500),
      cards,
      labels,
      htmlLength: html.length,
    };
  };

  // Hero model stack cards (colored provider cards)
  const heroCards = Array.from(document.querySelectorAll("section"))[0]
    ? Array.from(document.querySelectorAll("section")[0].querySelectorAll("div")).filter((el) => {
        const t = (el.textContent || "").trim();
        return /^(OpenAI|Gemini|Suno|deepseek|Doubao|Qwen|Claude)$/i.test(t) ||
          (/Claude|Gemini|OpenAI|Suno|Doubao|Qwen|deepseek/i.test(t) && t.length < 40 && el.children.length < 8);
      }).slice(0, 20).map((el) => {
        const cs = getComputedStyle(el);
        const rr = el.getBoundingClientRect();
        return {
          text: (el.textContent || "").trim().slice(0, 40),
          className: String(el.className).slice(0, 240),
          w: Math.round(rr.width),
          h: Math.round(rr.height),
          x: Math.round(rr.x),
          y: Math.round(rr.y),
          bg: cs.backgroundColor,
          bgImage: cs.backgroundImage.slice(0, 200),
          br: cs.borderRadius,
          transform: cs.transform,
        };
      })
    : [];

  // Logo loop section (#3)
  const logoSection = allSections[1] || null;
  let logoLoop = null;
  if (logoSection) {
    logoLoop = {
      className: String(logoSection.className),
      text: (logoSection.innerText || "").trim().slice(0, 200),
      html: logoSection.innerHTML.slice(0, 5000),
      childCount: logoSection.querySelectorAll("*").length,
      svgs: logoSection.querySelectorAll("svg").length,
      imgs: Array.from(logoSection.querySelectorAll("img")).map((i) => i.src),
    };
  }

  // Code block content
  const codeEl = document.querySelector("pre, code, [class*='code']");
  let code = null;
  if (codeEl) {
    const pre = document.querySelector("pre") || codeEl;
    const cs = getComputedStyle(pre);
    code = {
      text: (pre.textContent || "").slice(0, 1200),
      className: String(pre.className).slice(0, 200),
      bg: cs.backgroundColor,
      color: cs.color,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      br: cs.borderRadius,
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      border: `${cs.borderTopWidth} ${cs.borderTopColor}`,
    };
  }

  // Benefits cards detailed
  const benefitSection = allSections.find((s) =>
    /Stop overpaying/i.test(s.innerText || ""),
  );
  let benefits = null;
  if (benefitSection) {
    const items = Array.from(benefitSection.querySelectorAll("h3")).map((h) => {
      const card = h.closest("div");
      const cs = card ? getComputedStyle(card) : null;
      const rr = card?.getBoundingClientRect();
      const img = card?.querySelector("img");
      return {
        title: h.textContent?.trim(),
        desc: card?.querySelector("p")?.textContent?.trim(),
        className: String(card?.className || "").slice(0, 240),
        w: Math.round(rr?.width || 0),
        h: Math.round(rr?.height || 0),
        bg: cs?.backgroundColor,
        br: cs?.borderRadius,
        padding: cs ? `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}` : null,
        img: img ? { src: img.currentSrc || img.src, alt: img.alt, w: img.getBoundingClientRect().width, h: img.getBoundingClientRect().height } : null,
      };
    });
    benefits = items;
  }

  // Modalities row structure - get full text of models section
  const modelsSection = allSections.find((s) =>
    /Four modalities/i.test(s.innerText || ""),
  );
  let modelsText = modelsSection ? (modelsSection.innerText || "").slice(0, 6000) : null;

  // Hero exact HTML structure for left column
  const hero = allSections[0];
  const heroLeft = hero
    ? {
        html: hero.querySelector(".max-w-7xl, [class*='max-w']")?.innerHTML?.slice(0, 8000),
        className: String(hero.className),
      }
    : null;

  return {
    sectionSummaries: allSections.map(dumpSection),
    heroCards: heroCards.slice(0, 30),
    logoLoop,
    code,
    benefits,
    modelsText,
    heroLeftClass: heroLeft?.className,
    // full models section HTML truncated
    modelsHtml: modelsSection?.innerHTML.slice(0, 15000) || null,
    apiHtml: allSections.find((s) => /One Endpoint/i.test(s.innerText || ""))?.innerHTML.slice(0, 12000) || null,
    benefitsHtml: benefitSection?.innerHTML.slice(0, 10000) || null,
    ctaHtml: allSections.find((s) => /Ready to build/i.test(s.innerText || ""))?.innerHTML.slice(0, 6000) || null,
    heroHtml: hero?.innerHTML.slice(0, 20000) || null,
  };
});

fs.writeFileSync(path.join(OUT, "detail.json"), JSON.stringify({
  sectionSummaries: detail.sectionSummaries,
  heroCards: detail.heroCards,
  logoLoop: detail.logoLoop,
  code: detail.code,
  benefits: detail.benefits,
  modelsText: detail.modelsText,
}, null, 2));

fs.writeFileSync(path.join(OUT, "hero.html"), detail.heroHtml || "");
fs.writeFileSync(path.join(OUT, "models.html"), detail.modelsHtml || "");
fs.writeFileSync(path.join(OUT, "api.html"), detail.apiHtml || "");
fs.writeFileSync(path.join(OUT, "benefits.html"), detail.benefitsHtml || "");
fs.writeFileSync(path.join(OUT, "cta.html"), detail.ctaHtml || "");
if (detail.logoLoop?.html) fs.writeFileSync(path.join(OUT, "logoloop.html"), detail.logoLoop.html);

console.log(JSON.stringify({
  sections: detail.sectionSummaries.map((s) => ({
    idx: s.idx,
    top: s.top,
    h: s.height,
    cards: s.cards.length,
    preview: s.text.slice(0, 120).replace(/\n/g, " | "),
  })),
  heroCards: detail.heroCards.slice(0, 12),
  logoLoop: {
    childCount: detail.logoLoop?.childCount,
    svgs: detail.logoLoop?.svgs,
    imgs: detail.logoLoop?.imgs,
    htmlPreview: detail.logoLoop?.html?.slice(0, 400),
  },
  code: detail.code,
  benefits: detail.benefits,
  modelsTextPreview: detail.modelsText?.slice(0, 1500),
}, null, 2));

await browser.close();
