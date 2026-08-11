import { chromium } from "playwright";
import fs from "fs";

async function styleOf(el) {
  return el.evaluate((node) => {
    const cs = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return {
      tag: node.tagName,
      className: String(node.className).slice(0, 300),
      text: (node.textContent || "").trim().slice(0, 80),
      rect: {
        x: rect.x,
        y: rect.y,
        w: rect.width,
        h: rect.height,
      },
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      backgroundImage: cs.backgroundImage.slice(0, 240),
      border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
      borderRadius: cs.borderRadius,
      boxShadow: cs.boxShadow,
      backdropFilter: cs.backdropFilter,
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      gap: cs.gap,
      maxWidth: cs.maxWidth,
      height: cs.height,
      width: cs.width,
    };
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://tokenhot.ai/", { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(1500);

const detail = await page.evaluate(() => {
  const navShell = document.querySelector(".fixed.inset-x-0.max-w-\\[992px\\], [class*='max-w-[992px]']");
  // find pill bar inside header shell
  const shell = Array.from(document.querySelectorAll("div")).find((el) =>
    String(el.className).includes("max-w-[992px]"),
  );
  const pill = shell
    ? Array.from(shell.querySelectorAll("div")).find((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return r.height >= 50 && r.height <= 70 && parseFloat(cs.borderRadius) >= 20;
      })
    : null;

  if (pill) pill.setAttribute("data-pill", "1");
  if (shell) shell.setAttribute("data-shell", "1");

  const signUp = Array.from(document.querySelectorAll("a,button")).find((el) =>
    /^Sign Up$/i.test((el.textContent || "").trim()),
  );
  const login = Array.from(document.querySelectorAll("a,button")).find((el) =>
    /^Login$/i.test((el.textContent || "").trim()),
  );
  const generate = Array.from(document.querySelectorAll("a,button")).find((el) =>
    /Generate API Key/i.test(el.textContent || ""),
  );
  const viewDocs = Array.from(document.querySelectorAll("a,button")).find((el) =>
    /View Docs/i.test(el.textContent || ""),
  );

  for (const [el, key] of [
    [signUp, "signup"],
    [login, "login"],
    [generate, "generate"],
    [viewDocs, "docs"],
  ]) {
    if (el) el.setAttribute("data-btn", key);
  }

  // footer columns
  const footer = document.querySelector("footer");
  const footerLinks = footer
    ? Array.from(footer.querySelectorAll("a")).map((a) => ({
        text: (a.textContent || "").trim(),
        href: a.getAttribute("href"),
      }))
    : [];
  const footerHeadings = footer
    ? Array.from(footer.querySelectorAll("h3,h4,p,span"))
        .map((el) => ({
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 60),
          className: String(el.className).slice(0, 120),
        }))
        .filter((x) => /Company|Support|Legal|systems|copyright|TokenHot|frontier/i.test(x.text))
        .slice(0, 30)
    : [];

  // css vars on html
  const cs = getComputedStyle(document.documentElement);
  const varNames = [
    "--background",
    "--foreground",
    "--surface",
    "--muted",
    "--accent",
    "--accent-foreground",
    "--border",
    "--radius",
    "--nav-top",
    "--nav-height-offset",
    "--primary",
    "--snow",
    "--eclipse",
  ];
  const vars = {};
  for (const n of varNames) vars[n] = cs.getPropertyValue(n).trim();

  // hero paragraph
  const heroP = Array.from(document.querySelectorAll("p")).find((p) =>
    /Access OpenAI and Claude/i.test(p.textContent || ""),
  );
  if (heroP) heroP.setAttribute("data-hero-p", "1");

  // badge
  const badge = Array.from(document.querySelectorAll("div,span")).find((el) =>
    /1\.8s Ultra-Low Latency/i.test(el.textContent || ""),
  );
  if (badge) badge.setAttribute("data-badge", "1");

  // footer inner container
  const footerInner = footer
    ? Array.from(footer.querySelectorAll("div")).find((el) => {
        const r = el.getBoundingClientRect();
        return r.width >= 1100 && r.width <= 1320;
      })
    : null;
  if (footerInner) footerInner.setAttribute("data-footer-inner", "1");

  return {
    vars,
    footerLinks,
    footerHeadings,
    hasPill: !!pill,
    hasShell: !!shell,
  };
});

const out = { ...detail };
for (const sel of [
  "[data-shell='1']",
  "[data-pill='1']",
  "[data-btn='signup']",
  "[data-btn='login']",
  "[data-btn='generate']",
  "[data-btn='docs']",
  "[data-hero-p='1']",
  "[data-badge='1']",
  "[data-footer-inner='1']",
  "footer",
]) {
  const el = await page.$(sel);
  out[sel] = el ? await styleOf(el) : null;
}

// get nested button child if generate wrapper
if (out["[data-btn='generate']"]) {
  const inner = await page.$("[data-btn='generate'] *");
  // walk to deepest styled button-like child
  out.generateDeep = await page.evaluate(() => {
    const root = document.querySelector("[data-btn='generate']");
    if (!root) return null;
    let best = root;
    const walk = (el) => {
      for (const child of el.children) {
        const cs = getComputedStyle(child);
        const r = child.getBoundingClientRect();
        if (r.height >= 36 && r.height <= 48 && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderRadius)) {
          best = child;
        }
        walk(child);
      }
    };
    walk(root);
    const cs = getComputedStyle(best);
    const r = best.getBoundingClientRect();
    return {
      tag: best.tagName,
      className: String(best.className).slice(0, 300),
      text: (best.textContent || "").trim().slice(0, 40),
      rect: { w: r.width, h: r.height },
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      boxShadow: cs.boxShadow,
      border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
    };
  });
  out.docsDeep = await page.evaluate(() => {
    const root = document.querySelector("[data-btn='docs']");
    if (!root) return null;
    let best = root;
    const walk = (el) => {
      for (const child of el.children) {
        const cs = getComputedStyle(child);
        const r = child.getBoundingClientRect();
        if (r.height >= 36 && r.height <= 48 && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.borderRadius)) {
          best = child;
        }
        walk(child);
      }
    };
    walk(root);
    const cs = getComputedStyle(best);
    const r = best.getBoundingClientRect();
    return {
      tag: best.tagName,
      className: String(best.className).slice(0, 300),
      text: (best.textContent || "").trim().slice(0, 40),
      rect: { w: r.width, h: r.height },
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      boxShadow: cs.boxShadow,
      border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
    };
  });
}

fs.writeFileSync("scripts/tokenhot-audit-detail.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
