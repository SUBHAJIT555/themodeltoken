export const siteConfig = {
  name: "TheModelToken",
  wordmark: "themodeltoken",
  title: "TheModelToken – Unified LLM API Gateway",
  description:
    "Better price, better stability. The unified LLM API gateway supporting OpenAI, Claude, Gemini, DeepSeek and 30+ providers.",
  url: "https://themodeltoken.com",
  tagline:
    "The frontier intelligence gateway. One API. 127 models. 0.2s latency. Pay only for what you use.",
  status: "All systems normal · 99.997% uptime",
  email: "hi@themodeltoken.com",
  legalEntity: "Heba Prime - F.Z.E",
  address: {
    permissionNumber: "B.C. 1308309",
    buildingName: "Ajman Free Zone C1 Building",
    /** Single-line form for compact surfaces */
    line: "Permission Number B.C. 1308309, Ajman Free Zone C1 Building",
  },
  social: {
    x: "https://x.com/themodeltoken",
    discord: "https://discord.gg/fwh5wfxnwA",
    telegram: "https://t.me/themodeltoken",
  },
  logo: {
    icon: "/brand/icon.svg",
    og: "/brand/og.png",
  },
  announcement: {
    text: "We’ve launched one new models, doubao-seedance-2-5  — try them now.",
    href: "/models",
  },
} as const;

export const siteMailto = `mailto:${siteConfig.email}` as const;
