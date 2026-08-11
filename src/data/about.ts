export const aboutHero = {
  title: "About TheModelToken",
  subtitle: "Unified AI Access for High-Performance Teams",
  body: "In an era of explosive AI model growth, developers shouldn't be bogged down by complex API docs, fluctuating service stability, or steep startup costs. TheModelToken was born with a single goal: to provide global developers with the most stable, transparent, and high-performance unified AI API gateway.",
} as const;

export const aboutWhy = {
  title: "Why TheModelToken?",
  intro:
    "We are not just another API proxy; we are deeply involved in AI infrastructure.",
  cards: [
    {
      id: "exclusive",
      title: "Exclusive Model Access",
      label: "Exclusive Access",
      body: "TheModelToken is the official global launch partner for Seedance 2.0 API. We are committed to delivering the most cutting-edge underlying models with extreme concurrency capabilities to developers at the earliest opportunity.",
    },
    {
      id: "stability",
      title: "Enterprise-Grade Stability",
      label: "Massive Concurrency",
      body: "Deeply optimized for high-frequency business scenarios. Whether it's a startup project or a high-traffic application, TheModelToken's distributed architecture ensures minimal latency and extremely high success rates under massive concurrency.",
    },
    {
      id: "dx",
      title: "Ultimate Developer Experience",
      label: "Developer Experience",
      body: "Call over 100+ mainstream models including OpenAI, Claude, Gemini, and Seedance through a single OpenAI-compatible endpoint. No need to learn new frameworks—connect everywhere with one line of code.",
    },
    {
      id: "cost",
      title: "Transparent Cost Efficiency",
      label: "Cost Efficiency",
      body: "We reject complex subscription models. TheModelToken uses a pure pay-as-you-go model. Through fine-grained resource scheduling, we can save up to 90% of your API expenses.",
    },
  ],
} as const;

export const aboutProviders = {
  title: "Supported LLM Providers",
  items: [
    { id: "openai", alt: "OpenAI", width: 110, height: 28 },
    { id: "claude", alt: "Claude", width: 120, height: 30 },
    { id: "gemini", alt: "Gemini", width: 100, height: 30 },
    { id: "grok", alt: "Grok", width: 90, height: 35 },
    { id: "qwen", alt: "Qwen", width: 95, height: 30 },
    { id: "kimi", alt: "Kimi", width: 60, height: 22 },
    { id: "doubao", alt: "Doubao", width: 110, height: 26 },
    { id: "minimax", alt: "Minimax", width: 120, height: 25 },
    { id: "deepseek", alt: "DeepSeek", width: 140, height: 25 },
    { id: "zhipu", alt: "Z.ai", width: 80, height: 25 },
  ],
} as const;

export type AboutTrustItem =
  | {
      id: string;
      title: string;
      badge: string;
      body: string;
    }
  | {
      id: string;
      title: string;
      badge: string;
      bodyBefore: string;
      ticketLabel: string;
      bodyAfter: string;
    };

export const aboutTrust: {
  title: string;
  titleAside: string;
  intro: string;
  items: AboutTrustItem[];
} = {
  title: "Our Core Commitment: Trust & Security",
  titleAside: "Our Trust Stack",
  intro: "We understand that trust is the lifeline of an API provider.",
  items: [
    {
      id: "zdr",
      title: "Zero Data Retention",
      badge: "Zero Data Retention",
      body: "TheModelToken adheres to the 'pure passthrough' principle. We never store, view, or utilize any of your Prompts or generated content. Your data belongs solely to you; we only handle efficient transport.",
    },
    {
      id: "lockin",
      title: "No Vendor Lock-in & Low Risk",
      badge: "No Vendor Lock-in & Low Risk",
      body: "We despise hidden fees and high barriers to entry. TheModelToken adopts a pure Pay-as-you-go model with no mandatory subscriptions. You can start testing all model endpoints with very little money, and we rely entirely on our excellent concurrency processing and stability to retain your business.",
    },
    {
      id: "support",
      title: "Direct Engineering Support",
      badge: "Direct Engineering Access",
      bodyBefore:
        "Experiencing 400/500 errors or routing delays? You don't have to wait for a cold ",
      ticketLabel: "'Submit Ticket'",
      bodyAfter:
        " button. We provide direct access to our core engineering team—join our Discord developer community, and our team is on the front lines to provide direct, authentic diagnostic support for any technical blockers.",
    },
  ],
};

export const aboutCommunity = {
  title: "Join the Community",
  body: "TheModelToken was founded by a team of AI technology geeks. We deeply understand the struggles of building a product from 0 to 1, so we are committed to being the most reliable puzzle piece in your tech stack.",
  links: {
    docs: { label: "Explore Documentation", href: "/documentation" },
    discord: { label: "Join our Discord", href: "https://discord.gg/fwh5wfxnwA" },
    start: { label: "Get Started for Free", href: "/console" },
  },
} as const;
