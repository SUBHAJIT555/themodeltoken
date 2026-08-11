import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("scripts/tokenhot-audit-report.json");

function pick(styles, keys) {
  const out = {};
  for (const key of keys) out[key] = styles[key];
  return out;
}

const STYLE_KEYS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "color",
  "backgroundColor",
  "backgroundImage",
  "borderTopColor",
  "borderTopWidth",
  "borderRadius",
  "boxShadow",
  "backdropFilter",
  "webkitBackdropFilter",
  "opacity",
  "height",
  "width",
  "maxWidth",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginBottom",
  "gap",
  "display",
  "position",
  "top",
  "zIndex",
];

async function measure(page, selector, label) {
  const handle = await page.$(selector);
  if (!handle) return { label, selector, found: false };

  const data = await handle.evaluate((el, keys) => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const styles = {};
    for (const key of keys) styles[key] = cs[key];
    return {
      tag: el.tagName.toLowerCase(),
      className: el.className?.toString?.() ?? "",
      text: (el.textContent || "").trim().slice(0, 120),
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
      },
      styles,
    };
  }, STYLE_KEYS);

  return { label, selector, found: true, ...data, styles: pick(data.styles, STYLE_KEYS) };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto("https://tokenhot.ai/", { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(2000);

  // Collect CSS variables from :root / html
  const cssVars = await page.evaluate(() => {
    const el = document.documentElement;
    const cs = getComputedStyle(el);
    const vars = {};
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules || [])) {
        if (!(rule instanceof CSSStyleRule)) continue;
        if (!rule.selectorText?.includes(":root") && rule.selectorText !== "html") continue;
        for (const name of rule.style) {
          if (name.startsWith("--")) vars[name] = rule.style.getPropertyValue(name).trim();
        }
      }
    }
    // also dump commonly used computed custom props if present
    const probe = [
      "--background",
      "--foreground",
      "--primary",
      "--muted",
      "--border",
      "--card",
      "--radius",
      "--font-sans",
      "--font-serif",
      "--font-mono",
    ];
    const computed = {};
    for (const p of probe) computed[p] = cs.getPropertyValue(p).trim();
    return { declared: vars, computed };
  });

  const fontFaces = await page.evaluate(() => {
    const faces = [];
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules || [])) {
        if (rule.constructor.name === "CSSFontFaceRule" || rule instanceof CSSFontFaceRule) {
          faces.push({
            family: rule.style.getPropertyValue("font-family"),
            weight: rule.style.getPropertyValue("font-weight"),
            style: rule.style.getPropertyValue("font-style"),
            src: rule.style.getPropertyValue("src"),
            display: rule.style.getPropertyValue("font-display"),
            stretch: rule.style.getPropertyValue("font-stretch"),
          });
        }
      }
    }
    return faces;
  });

  // Discover key structural elements
  const selectors = await page.evaluate(() => {
    const banner = document.querySelector(".announcement-banner-wrapper");
    const header =
      document.querySelector("header") ||
      document.querySelector("[class*='header']") ||
      document.querySelector("nav")?.closest("div");
    const nav = document.querySelector("nav");
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const buttons = Array.from(document.querySelectorAll("a,button")).filter((el) =>
      /Generate API Key|View Docs|Get Your API Key|Create API Key|Talk to Sales/i.test(
        el.textContent || "",
      ),
    );
    const cards = Array.from(document.querySelectorAll("section *")).filter((el) => {
      const cs = getComputedStyle(el);
      return (
        (cs.borderRadius && parseFloat(cs.borderRadius) >= 12) &&
        (cs.backgroundColor.includes("rgba") || cs.backdropFilter.includes("blur"))
      );
    }).slice(0, 8);

    const containers = Array.from(document.querySelectorAll("div,section")).filter((el) => {
      const cs = getComputedStyle(el);
      const w = el.getBoundingClientRect().width;
      return cs.marginLeft !== "0px" && cs.marginRight !== "0px" && w > 1000 && w < 1400;
    }).slice(0, 10);

    const footer = document.querySelector("footer");
    const logo = document.querySelector('img[src*="Logo"], img[alt*="ogo"], a img');

    return {
      banner: banner ? ".announcement-banner-wrapper" : null,
      header: header
        ? header.tagName.toLowerCase() +
          (header.className ? "." + String(header.className).trim().split(/\s+/).slice(0, 3).join(".") : "")
        : null,
      headerTag: !!document.querySelector("header"),
      navExists: !!nav,
      h1Text: h1?.textContent?.trim(),
      h2Text: h2?.textContent?.trim(),
      buttonTexts: buttons.map((b) => (b.textContent || "").trim()).slice(0, 10),
      cardCount: cards.length,
      containerCount: containers.length,
      footerExists: !!footer,
      logoSrc: logo?.getAttribute("src") || null,
      bodyClass: document.body.className,
      htmlClass: document.documentElement.className,
      theme: document.documentElement.getAttribute("data-theme"),
    };
  });

  // More robust queries after page settled
  const measurements = [];

  measurements.push(await measure(page, "html", "html"));
  measurements.push(await measure(page, "body", "body"));
  measurements.push(await measure(page, ".announcement-banner-wrapper", "announcement-banner"));

  // Find sticky/fixed header near top
  const headerInfo = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll("header, div, nav")).filter((el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        (cs.position === "fixed" || cs.position === "sticky") &&
        rect.top >= 0 &&
        rect.top < 120 &&
        rect.height > 40 &&
        rect.height < 120 &&
        rect.width > 800
      );
    });
    return candidates.slice(0, 5).map((el, i) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      el.setAttribute("data-audit-header", String(i));
      return {
        i,
        tag: el.tagName,
        className: String(el.className).slice(0, 200),
        position: cs.position,
        height: rect.height,
        top: rect.top,
        backdropFilter: cs.backdropFilter,
        backgroundColor: cs.backgroundColor,
        borderBottom: `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`,
      };
    });
  });

  for (const h of headerInfo) {
    measurements.push(await measure(page, `[data-audit-header="${h.i}"]`, `header-candidate-${h.i}`));
  }

  // Logo
  const logoSel = await page.evaluate(() => {
    const img = document.querySelector('img[src*="Logo-header"], img[src*="logo"], img[src*="Logo"]');
    if (img) {
      img.setAttribute("data-audit-logo", "1");
      return true;
    }
    return false;
  });
  if (logoSel) measurements.push(await measure(page, "[data-audit-logo='1']", "logo"));

  // Nav links
  const navLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a")).filter((a) =>
      /^(Models|Console|Docs|Documentation|About|Home|Blog)/i.test((a.textContent || "").trim()),
    );
    return links.slice(0, 8).map((a, i) => {
      a.setAttribute("data-audit-nav", String(i));
      const cs = getComputedStyle(a);
      const rect = a.getBoundingClientRect();
      return {
        i,
        text: (a.textContent || "").trim(),
        href: a.getAttribute("href"),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        color: cs.color,
        letterSpacing: cs.letterSpacing,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });
  });

  for (const n of navLinks) {
    measurements.push(await measure(page, `[data-audit-nav="${n.i}"]`, `nav-${n.text}`));
  }

  // H1 / H2
  measurements.push(await measure(page, "h1", "h1"));
  measurements.push(await measure(page, "h2", "h2"));

  // Primary CTA buttons
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("a,button"));
    const generate = buttons.find((el) => /Generate API Key/i.test(el.textContent || ""));
    const viewDocs = buttons.find((el) => /View Docs/i.test(el.textContent || ""));
    if (generate) generate.setAttribute("data-audit-btn", "generate");
    if (viewDocs) viewDocs.setAttribute("data-audit-btn", "docs");
  });
  measurements.push(await measure(page, "[data-audit-btn='generate']", "btn-generate"));
  measurements.push(await measure(page, "[data-audit-btn='docs']", "btn-docs"));

  // Main content max width containers
  const containers = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("div")).filter((el) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return (
        rect.width >= 1100 &&
        rect.width <= 1320 &&
        cs.maxWidth !== "none" &&
        rect.top < 900
      );
    });
    return nodes.slice(0, 6).map((el, i) => {
      el.setAttribute("data-audit-container", String(i));
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        i,
        maxWidth: cs.maxWidth,
        width: rect.width,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        className: String(el.className).slice(0, 180),
        left: rect.left,
        right: rect.right,
      };
    });
  });

  for (const c of containers) {
    measurements.push(await measure(page, `[data-audit-container="${c.i}"]`, `container-${c.i}`));
  }

  // Footer
  measurements.push(await measure(page, "footer", "footer"));

  // Sample cards
  const cards = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("div")).filter((el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        rect.width > 280 &&
        rect.width < 700 &&
        rect.height > 180 &&
        parseFloat(cs.borderRadius) >= 12 &&
        rect.top > 400 &&
        rect.top < 2200
      );
    });
    return nodes.slice(0, 6).map((el, i) => {
      el.setAttribute("data-audit-card", String(i));
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        i,
        width: rect.width,
        height: rect.height,
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
        boxShadow: cs.boxShadow,
        backdropFilter: cs.backdropFilter,
        className: String(el.className).slice(0, 180),
      };
    });
  });

  for (const c of cards) {
    measurements.push(await measure(page, `[data-audit-card="${c.i}"]`, `card-${c.i}`));
  }

  // Collect image/video sources
  const assets = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img")).map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      displayWidth: img.getBoundingClientRect().width,
      displayHeight: img.getBoundingClientRect().height,
    }));
    const videos = Array.from(document.querySelectorAll("video, source")).map((el) => ({
      tag: el.tagName,
      src: el.getAttribute("src") || el.currentSrc || "",
    }));
    const bgImages = Array.from(document.querySelectorAll("*"))
      .map((el) => getComputedStyle(el).backgroundImage)
      .filter((v) => v && v !== "none" && v.includes("url("))
      .slice(0, 40);
    return { imgs, videos, bgImages: Array.from(new Set(bgImages)) };
  });

  // Screenshot for later comparison
  const shotPath = path.resolve("scripts/tokenhot-1440x900.png");
  await page.screenshot({ path: shotPath, fullPage: false });

  const report = {
    viewport: { width: 1440, height: 900 },
    url: page.url(),
    title: await page.title(),
    selectors,
    headerInfo,
    navLinks,
    containers,
    cards,
    cssVars,
    fontFaces,
    measurements,
    assets,
    screenshot: shotPath,
  };

  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log("Wrote", OUT);
  console.log("Screenshot", shotPath);
  console.log(
    JSON.stringify(
      {
        fonts: fontFaces.map((f) => f.family),
        headerInfo,
        navLinks,
        containers,
        body: measurements.find((m) => m.label === "body")?.styles,
        h1: measurements.find((m) => m.label === "h1")?.styles,
        logo: measurements.find((m) => m.label === "logo"),
        cssVarKeys: Object.keys(cssVars.declared).slice(0, 80),
        computedVars: cssVars.computed,
      },
      null,
      2,
    ),
  );

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
