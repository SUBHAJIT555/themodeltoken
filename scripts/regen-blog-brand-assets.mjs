import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const iconSvg = `
<svg width="SIZE" height="SIZE" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4.2V6.4" stroke="COLOR" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="3.2" r="1.15" fill="COLOR"/>
  <path d="M12 6.6 17.4 9.7v6.2L12 19 6.6 15.9V9.7L12 6.6Z" stroke="COLOR" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="9.7" cy="12.1" r="1.05" fill="COLOR"/>
  <circle cx="14.3" cy="12.1" r="1.05" fill="COLOR"/>
  <path d="M12 13.35 13.35 14.7 12 16.05 10.65 14.7Z" fill="COLOR"/>
  <path d="M10.35 18.55 12 20.8 13.65 18.55" stroke="COLOR" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function brandIcon(size, color) {
  return iconSvg.replaceAll("SIZE", String(size)).replaceAll("COLOR", color);
}

async function shot(page, html, out, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(120);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: "png" });
  console.log("wrote", out, fs.statSync(out).size);
}

const articleDir =
  "public/blogs/articles/introducing-themodeltoken-fast-fully-customizable-and-unbeatable-pricing";
const coverPath =
  "public/blogs/covers/introducing-themodeltoken-fast-fully-customizable-and-unbeatable-pricing.png";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await shot(
  page,
  `<!doctype html><html><body style="margin:0;width:96px;height:96px;display:grid;place-items:center;background:#0a0a0a">${brandIcon(58, "#fa5902")}</body></html>`,
  "public/blogs/authors/team.png",
  96,
  96,
);

const coverHtml = `<!doctype html><html><head><style>
html,body{margin:0;width:1024px;height:559px;overflow:hidden;font-family:Inter,system-ui,sans-serif}
.bg{width:100%;height:100%;background:radial-gradient(circle at 42% 50%,#1b3a6b 0%,#0b1224 48%,#05070f 100%);position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(80,160,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(80,160,255,.08) 1px,transparent 1px);background-size:48px 48px;opacity:.35}
.hub{position:absolute;left:34%;top:50%;transform:translate(-50%,-50%);width:220px;height:220px;border-radius:50%;
  background:radial-gradient(circle,#ff8a3d 0%,#fa5902 35%,rgba(250,89,2,.15) 60%,transparent 72%);
  box-shadow:0 0 80px rgba(250,89,2,.45),0 0 160px rgba(60,140,255,.25);display:grid;place-items:center}
.hub-inner{width:160px;height:160px;border-radius:50%;background:rgba(8,12,22,.88);border:2px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;gap:8px;padding:0 10px}
.wm{color:#fff;font-weight:650;font-size:14px;letter-spacing:-.02em}
.cable{position:absolute;left:0;top:50%;width:32%;height:10px;transform:translateY(-50%);
  background:linear-gradient(90deg,transparent,#3ea0ff 20%,#7cc4ff);box-shadow:0 0 18px #3ea0ff;border-radius:999px}
.nodes{position:absolute;right:48px;top:50%;transform:translateY(-50%);display:grid;grid-template-columns:1fr 1fr;gap:12px;width:340px}
.node{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:10px 12px;color:#fff;backdrop-filter:blur(6px)}
.node b{display:block;font-size:13px;margin-bottom:2px}
.node span{font-size:11px;opacity:.7}
.beam{position:absolute;left:46%;top:50%;width:18%;height:2px;background:linear-gradient(90deg,#fa5902,#7aa7ff);box-shadow:0 0 12px #7aa7ff;transform:translateY(-50%)}
</style></head><body><div class="bg"><div class="grid"></div><div class="cable"></div><div class="beam"></div>
<div class="hub"><div class="hub-inner">${brandIcon(36, "#fa5902")}<span class="wm">themodeltoken</span></div></div>
<div class="nodes">
  <div class="node"><b>GPT-5.2 High</b><span>OpenAI</span></div>
  <div class="node"><b>Claude Opus 4.6</b><span>Anthropic</span></div>
  <div class="node"><b>Gemini 3 Pro</b><span>Google</span></div>
  <div class="node"><b>DeepSeek V3.2</b><span>DeepSeek</span></div>
  <div class="node"><b>Grok 4.1</b><span>xAI</span></div>
  <div class="node"><b>Flux / Runway</b><span>Media models</span></div>
</div></div></body></html>`;

await shot(page, coverHtml, coverPath, 1024, 559);
fs.copyFileSync(coverPath, path.join(articleDir, "hero.png"));
console.log("copied hero");

await shot(
  page,
  `<!doctype html><html><head><style>
body{margin:0;width:1200px;height:720px;font-family:Inter,system-ui,sans-serif;background:#f6f8fb;color:#152033;padding:40px 48px;box-sizing:border-box}
h1{margin:0 0 28px;font-size:28px;letter-spacing:-.02em}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:28px}
.card{background:#fff;border:1px solid #e5e9f0;border-radius:18px;padding:22px;text-align:center;box-shadow:0 8px 24px rgba(20,40,80,.05)}
.badge{display:inline-block;background:#eef4ff;color:#2b5bd7;font-weight:700;font-size:12px;padding:4px 10px;border-radius:999px;margin-bottom:14px}
.icon{width:72px;height:72px;margin:0 auto 14px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(180deg,#eef7ff,#dcecff)}
.url{display:inline-block;margin-top:8px;background:#111;color:#fff;border-radius:999px;padding:8px 12px;font-size:12px;font-family:ui-monospace,monospace}
.code{background:#111827;color:#e5e7eb;border-radius:16px;padding:22px 24px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15px;line-height:1.7;white-space:pre}
.cm{color:#8b9bb4}.kw{color:#ffac60}.st{color:#3fa4ff}
</style></head><body>
<h1>Three Steps to Access 100+ AI Models</h1>
<div class="steps">
  <div class="card"><div class="badge">Step 1</div><div class="icon">🔑</div><div><b>Sign Up & Generate API Key</b></div></div>
  <div class="card"><div class="badge">Step 2</div><div class="icon">${brandIcon(40, "#fa5902")}</div><div><b>Update Base URL</b></div><div class="url">https://api.themodeltoken.com/v1</div></div>
  <div class="card"><div class="badge">Step 3</div><div class="icon">🚀</div><div><b>Call 100+ Models</b></div></div>
</div>
<div class="code"><span class="kw">from</span> openai <span class="kw">import</span> OpenAI

client = OpenAI(
    api_key=<span class="st">"YOUR_API_KEY"</span>,  <span class="cm"># your TheModelToken key</span>
    base_url=<span class="st">"https://api.themodeltoken.com/v1"</span>,  <span class="cm"># update base URL</span>
)
print(<span class="st">"ready"</span>)</div>
</body></html>`,
  path.join(articleDir, "image-01.png"),
  1200,
  720,
);

await shot(
  page,
  `<!doctype html><html><head><style>
body{margin:0;width:1200px;height:720px;font-family:Inter,system-ui,sans-serif;color:#fff;background:radial-gradient(circle at 50% 20%,#1a3558,#0b1424 55%,#070b14);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
.row{display:flex;gap:40px;align-items:center}
.col{width:320px;text-align:center}
.tag{display:inline-block;background:#111;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:8px 14px;font-weight:700;letter-spacing:.04em}
.down{font-size:72px;color:#ff4d4d;line-height:1;margin:12px 0}
.up{font-size:84px;color:#22e38a;line-height:1}
.pct{font-size:64px;font-weight:800;background:linear-gradient(180deg,#7dffb2,#22e38a);-webkit-background-clip:text;color:transparent}
.sub{opacity:.75;margin-top:8px}
.prices{display:flex;gap:16px}
.p{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 22px;min-width:160px;text-align:center}
.p b{display:block;font-size:28px;color:#7dffb2;margin:6px 0}
</style></head><body>
<div class="row">
  <div class="col"><div class="tag">DIRECT</div><div class="down">▼</div><div class="sub">Monthly Fees + Expiry</div></div>
  <div class="col"><div class="up">▲</div></div>
  <div class="col"><div class="tag">THEMODELTOKEN</div><div class="pct">-90%</div><div class="sub">No Monthly Fees, Pay-as-you-go</div>
    <div style="margin-top:14px;display:flex;justify-content:center">${brandIcon(42, "#fa5902")}</div>
  </div>
</div>
<div class="prices">
  <div class="p">Base:<b>$0.18/M</b>tokens</div>
  <div class="p">Core:<b>$0.30/M</b>tokens</div>
  <div class="p">Top:<b>$1.88/M</b>tokens</div>
</div>
</body></html>`,
  path.join(articleDir, "image-02.png"),
  1200,
  720,
);

await shot(
  page,
  `<!doctype html><html><head><style>
body{margin:0;width:1200px;height:720px;font-family:Inter,system-ui,sans-serif;background:#eef1f5;display:grid;place-items:center;color:#152033}
.stage{width:920px;height:420px;background:#2b3038;border-radius:28px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.18);padding:28px;box-sizing:border-box}
.brand{position:absolute;left:28px;bottom:24px;display:flex;align-items:center;gap:10px;color:#fff;font-weight:700;letter-spacing:.04em}
.mods{display:flex;gap:16px;flex-wrap:wrap;margin-top:18px}
.m{background:#fff;border-radius:16px;padding:16px 18px;min-width:150px;box-shadow:0 10px 24px rgba(0,0,0,.12)}
.m b{display:block}
.m span{font-size:12px;opacity:.65}
.flow{margin-top:28px;display:flex;gap:14px}
.orb{width:84px;height:84px;border-radius:50%;background:rgba(34,227,138,.15);border:2px solid #22e38a;display:grid;place-items:center;color:#0b3;font-weight:700}
</style></head><body>
<div class="stage">
  <div style="color:#fff;font-size:22px;font-weight:700">Flexible AI infrastructure</div>
  <div class="mods">
    <div class="m"><b>Chatbox</b><span>Apps</span></div>
    <div class="m"><b>Cherry Studio</b><span>Workflow</span></div>
    <div class="m"><b>Dify</b><span>Agents</span></div>
    <div class="m"><b>themodeltoken</b><span>Gateway</span></div>
  </div>
  <div class="flow"><div class="orb">Text</div><div class="orb">Image</div><div class="orb">Video</div><div class="orb">Audio</div></div>
  <div class="brand">${brandIcon(28, "#fa5902")} THEMODELTOKEN</div>
</div>
</body></html>`,
  path.join(articleDir, "image-03.png"),
  1200,
  720,
);

await shot(
  page,
  `<!doctype html><html><head><style>
body{margin:0;width:1400px;height:788px;font-family:Inter,system-ui,sans-serif;background:linear-gradient(135deg,#dfe7f1,#f4f7fb);display:grid;place-items:center}
.monitor{width:1100px;height:620px;background:#0f1724;border-radius:18px;border:10px solid #1d2430;box-shadow:0 40px 90px rgba(0,0,0,.25);padding:22px;box-sizing:border-box;color:#fff}
.top{display:flex;align-items:center;gap:10px;margin-bottom:18px;font-weight:700}
.grid{display:grid;grid-template-columns:1.1fr 1.4fr 1fr;gap:14px;height:calc(100% - 40px)}
.panel{background:#151e2e;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px}
.panel h3{margin:0 0 10px;font-size:13px;opacity:.8;font-weight:600}
.big{font-size:34px;font-weight:800;color:#7dffb2}
.bars{display:flex;align-items:flex-end;gap:8px;height:120px;margin-top:20px}
.b{flex:1;background:linear-gradient(180deg,#3fa4ff,#1d4ed8);border-radius:6px 6px 0 0}
.line{height:140px;margin-top:20px;background:linear-gradient(180deg,transparent,rgba(34,227,138,.08));border-bottom:2px solid #22e38a;position:relative}
.line:after{content:"";position:absolute;left:0;right:0;top:40%;height:2px;background:linear-gradient(90deg,#3fa4ff,#22e38a);box-shadow:0 0 10px #22e38a}
</style></head><body>
<div class="monitor">
  <div class="top">${brandIcon(26, "#fa5902")} ${"the" + "model" + "token"}.com · Enterprise Control Panel</div>
  <div class="grid">
    <div class="panel"><h3>Traffic Saving</h3><div class="big">3,990 mbps</div><div class="bars"><div class="b" style="height:40%"></div><div class="b" style="height:70%"></div><div class="b" style="height:55%"></div><div class="b" style="height:90%"></div><div class="b" style="height:65%"></div></div></div>
    <div class="panel"><h3>Elastic Scaling</h3><div class="big">99.99%</div><div class="line"></div></div>
    <div class="panel"><h3>Real-Time Usage</h3><div style="margin-top:24px;opacity:.85">Tokens up · Cost down</div><div class="line"></div></div>
  </div>
</div>
</body></html>`,
  path.join(articleDir, "image-04.png"),
  1400,
  788,
);

await browser.close();
console.log("done");
