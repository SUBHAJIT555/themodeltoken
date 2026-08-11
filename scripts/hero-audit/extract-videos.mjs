import { createServer } from "http";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const files = {
  "/orig.mp4": "C:/Users/D/Videos/Screen Recordings/herosection.mp4",
  "/curr.mp4": "C:/Users/D/Videos/Screen Recordings/herocursormade.mp4",
};

const server = createServer((req, res) => {
  const file = files[req.url?.split("?")[0] || ""];
  if (!file || !fs.existsSync(file)) {
    res.writeHead(404);
    res.end("missing");
    return;
  }
  const stat = fs.statSync(file);
  res.writeHead(200, {
    "Content-Type": "video/mp4",
    "Content-Length": stat.size,
    "Accept-Ranges": "bytes",
  });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(8765, "127.0.0.1", r));

const outO = path.resolve("scripts/hero-audit/orig");
const outC = path.resolve("scripts/hero-audit/curr");
fs.mkdirSync(outO, { recursive: true });
fs.mkdirSync(outC, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({
  viewport: { width: 1888, height: 772 },
  deviceScaleFactor: 1,
});

async function extract(src, outDir, prefix, times) {
  await page.setContent(`<!doctype html>
<html><body style="margin:0;background:#000;overflow:hidden">
<video id="v" muted playsinline src="${src}" style="width:1888px;height:772px;object-fit:fill;display:block"></video>
</body></html>`);

  await page.waitForFunction(() => {
    const v = document.getElementById("v");
    return Boolean(v && v.readyState >= 2 && v.videoWidth > 0);
  }, null, { timeout: 60000 });

  const meta = await page.evaluate(() => {
    const v = document.getElementById("v");
    return { w: v.videoWidth, h: v.videoHeight, d: v.duration, ready: v.readyState };
  });
  console.log(prefix, meta);

  for (const t of times) {
    await page.evaluate(async (seek) => {
      const v = /** @type {HTMLVideoElement} */ (document.getElementById("v"));
      v.pause();
      await new Promise((resolve) => {
        const done = () => {
          v.removeEventListener("seeked", done);
          resolve(null);
        };
        v.addEventListener("seeked", done);
        v.currentTime = Math.min(seek, Math.max(0, v.duration - 0.05));
      });
    }, t);
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(outDir, `${prefix}-${String(t).padStart(2, "0")}s.png`),
      clip: { x: 0, y: 0, width: 1888, height: 772 },
    });
  }
}

const times = [0, 2, 4, 6, 8, 10, 12, 13];
await extract("http://127.0.0.1:8765/orig.mp4", outO, "o", times);
await extract("http://127.0.0.1:8765/curr.mp4", outC, "c", times);
await browser.close();
server.close();
console.log("done");
