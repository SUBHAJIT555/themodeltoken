export const logoMarqueeBrands = [
  "deepseek",
  "gemini",
  "minimax",
  "openai",
  "qwen",
  "grok",
  "z-ai",
  "claude",
  "moonshotai",
] as const;

export type BrandIcon = {
  src: string;
  /** Circular badge background (solid or CSS gradient) */
  background: string;
  /** When true, SVG uses currentColor white mark */
  invertMark?: boolean;
};

export type ModalityCard = {
  id: string;
  category: string;
  name: string;
  description: string;
  colSpan: number;
  cardBg: string;
  /** Soft text on orange video cards */
  textOnAccent?: boolean;
  variant:
    | "bar-chart"
    | "line-chart"
    | "image-strip"
    | "image-scatter"
    | "video"
    | "audio";
  brandIcon: BrandIcon;
  media?: string[];
  videoSrc?: string;
  minHeightClass?: string;
  audioMeta?: {
    title: string;
    subtitle: string;
    duration: string;
    src: string;
    barColor: string;
    playerBg: string;
    ariaLabel: string;
  };
};

export const modalityCards: ModalityCard[] = [
  {
    id: "deepseek-v4-pro",
    category: "Text & Reasoning",
    name: "DeepSeek-V4 Pro",
    description:
      "1.6T MoE architecture topping the SWE-Bench. Matches top-tier models in complex logical deduction and coding at a fraction of the cost.",
    colSpan: 7,
    cardBg: "var(--th-card-yellow)",
    variant: "bar-chart",
    brandIcon: {
      src: "/icons/models/deepseek.svg",
      background: "#4D6BFE",
      invertMark: true,
    },
    minHeightClass: "md:min-h-[440px]",
  },
  {
    id: "qwen-36-max",
    category: "Text & Reasoning",
    name: "Qwen-3.6 Max",
    description:
      "1M token context with flawless MCP integration. The ultimate engine for 2026 agentic workflows and tool execution.",
    colSpan: 7,
    cardBg: "var(--th-card-yellow)",
    variant: "line-chart",
    brandIcon: {
      src: "/icons/models/qwen.svg",
      background: "#615ced",
      invertMark: true,
    },
    minHeightClass: "md:min-h-[440px]",
  },
  {
    id: "seedream-50-lite",
    category: "High-Fidelity Image Generation",
    name: "Seedream 5.0 Lite",
    description:
      "First model with web-search-powered generation, precise CJK & English text rendering. Only $0.034/img — 1/5 the cost of GPT-Image-2.",
    colSpan: 10,
    cardBg: "var(--th-card-green)",
    variant: "image-strip",
    brandIcon: {
      src: "/icons/models/doubao.svg",
      background: "#FFFFFF",
    },
    media: [
      "/models/seedream-1.jpeg",
      "/models/seedream-2.jpeg",
      "/models/seedream-3.jpeg",
      "/models/seedream-4.jpeg",
    ],
    minHeightClass: "md:min-h-[440px]",
  },
  {
    id: "qwen-image-20-pro",
    category: "High-Fidelity Image Generation",
    name: "Qwen Image 2.0 Pro",
    description:
      "First model with web-search-powered generation, precise CJK & English text rendering. Only $0.034/img — 1/5 the cost of GPT-Image-2.",
    colSpan: 12,
    cardBg: "var(--th-card-green)",
    variant: "image-scatter",
    brandIcon: {
      src: "/icons/models/qwen.svg",
      background: "#615ced",
      invertMark: true,
    },
    media: [
      "/models/qwen-1.jpeg",
      "/models/qwen-2.jpeg",
      "/models/qwen-3.jpeg",
      "/models/qwen-4.png",
    ],
    minHeightClass: "md:min-h-[585px]",
  },
  {
    id: "seedance-20",
    category: "Cinematic Video Generation",
    name: "Seedance 2.0",
    description:
      "15-second multi-shot narratives with native audio lip-sync, end-to-end image-to-video pipeline. Visual quality and motion coherence on par with VEO3.",
    colSpan: 12,
    cardBg: "var(--th-accent)",
    textOnAccent: true,
    variant: "video",
    brandIcon: {
      src: "/icons/models/doubao.svg",
      background: "#FFFFFF",
    },
    videoSrc: "/video/seedance.mp4",
    minHeightClass: "md:min-h-[585px]",
  },
  {
    id: "kling-30",
    category: "Cinematic Video Generation",
    name: "Kling 3.0",
    description:
      "Text/image-to-video with keyframe control, 3–15s multi-aspect output with native audio synthesis. Physics simulation and motion coherence on par with VEO3.",
    colSpan: 10,
    cardBg: "var(--th-accent)",
    textOnAccent: true,
    variant: "video",
    brandIcon: {
      src: "/icons/models/kling.svg",
      background: "#000000",
    },
    videoSrc: "/video/kling.mp4",
    minHeightClass: "md:min-h-[524px]",
  },
  {
    id: "suno",
    category: "Hyper-Realistic Audio & Voice",
    name: "Suno",
    description:
      "Built for the Agent era. Define unique voices purely via text prompts. Naturally injects laughs, sighs, and dynamic emotions on the fly.",
    colSpan: 7,
    cardBg: "var(--th-card-magenta)",
    variant: "audio",
    brandIcon: {
      src: "/icons/models/suno.svg",
      background: "#000000",
      invertMark: true,
    },
    minHeightClass: "md:min-h-[524px]",
    audioMeta: {
      title: "真夜中トーキョーラブ",
      subtitle: "Suno v4",
      duration: "01:00",
      src: "/audio/suno-demo.m4a",
      barColor: "#f59e0b",
      playerBg: "#14161a",
      ariaLabel: "Play Suno player",
    },
  },
  {
    id: "speech-02",
    category: "Hyper-Realistic Audio & Voice",
    name: "Speech-02",
    description:
      "Topping Hugging Face TTS Arena. Clones any voice flawlessly from a 3-second sample across 32 languages.",
    colSpan: 7,
    cardBg: "var(--th-card-magenta)",
    variant: "audio",
    brandIcon: {
      src: "/icons/models/minimax.svg",
      background: "linear-gradient(to right, #E2167E, #FE603C)",
      invertMark: true,
    },
    minHeightClass: "md:min-h-[524px]",
    audioMeta: {
      title: "Aussie Bloke",
      subtitle: "Speech-02",
      duration: "00:21",
      src: "/audio/speech02-demo.mp3",
      barColor: "#ef4444",
      playerBg: "#15161a",
      ariaLabel: "Play Speech-02 player",
    },
  },
];

export type CodeTab = {
  id: string;
  label: string;
  lines: { type: "keyword" | "string" | "plain"; text: string }[][];
};

export const apiCodeTabs: CodeTab[] = [
  {
    id: "curl",
    label: "cURL",
    lines: [
      [
        { type: "keyword", text: "curl" },
        { type: "plain", text: " --location " },
        {
          type: "string",
          text: "'https://api.themodeltoken.com/v1/chat/completions'",
        },
        { type: "plain", text: " \\" },
      ],
      [
        { type: "plain", text: "  --header " },
        {
          type: "string",
          text: "'Authorization: Bearer <THEMODELTOKEN_API_KEY>'",
        },
        { type: "plain", text: " \\" },
      ],
      [
        { type: "plain", text: "  --header " },
        { type: "string", text: "'Content-Type: application/json'" },
        { type: "plain", text: " \\" },
      ],
      [{ type: "plain", text: "  --data '{" }],
      [
        { type: "plain", text: "    " },
        { type: "string", text: '"model"' },
        { type: "plain", text: ": " },
        { type: "string", text: '"gpt-4o"' },
        { type: "plain", text: "," },
      ],
      [
        { type: "plain", text: "    " },
        { type: "string", text: '"messages"' },
        { type: "plain", text: ": [" },
      ],
      [{ type: "plain", text: "      {" }],
      [
        { type: "plain", text: "        " },
        { type: "string", text: '"role"' },
        { type: "plain", text: ": " },
        { type: "string", text: '"system"' },
        { type: "plain", text: "," },
      ],
      [
        { type: "plain", text: "        " },
        { type: "string", text: '"content"' },
        { type: "plain", text: ": " },
        {
          type: "string",
          text: '"You are a professional AI assistant."',
        },
      ],
      [{ type: "plain", text: "      }," }],
      [{ type: "plain", text: "      {" }],
      [
        { type: "plain", text: "        " },
        { type: "string", text: '"role"' },
        { type: "plain", text: ": " },
        { type: "string", text: '"user"' },
        { type: "plain", text: "," },
      ],
      [
        { type: "plain", text: "        " },
        { type: "string", text: '"content"' },
        { type: "plain", text: ": " },
        {
          type: "string",
          text: '"Tell me about the history of artificial intelligence."',
        },
      ],
      [{ type: "plain", text: "      }" }],
      [{ type: "plain", text: "    ]" }],
      [{ type: "plain", text: "  }'" }],
    ],
  },
  {
    id: "python",
    label: "Python",
    lines: [
      [
        { type: "keyword", text: "from" },
        { type: "plain", text: " openai " },
        { type: "keyword", text: "import" },
        { type: "plain", text: " OpenAI" },
      ],
      [{ type: "plain", text: "" }],
      [{ type: "plain", text: "client = OpenAI(" }],
      [
        { type: "plain", text: "  base_url=" },
        { type: "string", text: '"https://api.themodeltoken.com/v1"' },
        { type: "plain", text: "," },
      ],
      [
        { type: "plain", text: "  api_key=" },
        { type: "string", text: '"<THEMODELTOKEN_API_KEY>"' },
        { type: "plain", text: "," },
      ],
      [{ type: "plain", text: ")" }],
      [{ type: "plain", text: "" }],
      [
        {
          type: "plain",
          text: "completion = client.chat.completions.create(",
        },
      ],
      [
        { type: "plain", text: "  model=" },
        { type: "string", text: '"gpt-4o"' },
        { type: "plain", text: "," },
      ],
      [{ type: "plain", text: "  messages=[" }],
      [
        { type: "plain", text: "    {" },
        { type: "string", text: '"role"' },
        { type: "plain", text: ": " },
        { type: "string", text: '"user"' },
        { type: "plain", text: ", " },
        { type: "string", text: '"content"' },
        { type: "plain", text: ": " },
        { type: "string", text: '"Hello"' },
        { type: "plain", text: "}," },
      ],
      [{ type: "plain", text: "  ]," }],
      [{ type: "plain", text: ")" }],
    ],
  },
  {
    id: "javascript",
    label: "JavaScript",
    lines: [
      [
        { type: "keyword", text: "import" },
        { type: "plain", text: " OpenAI " },
        { type: "keyword", text: "from" },
        { type: "plain", text: " " },
        { type: "string", text: '"openai"' },
        { type: "plain", text: ";" },
      ],
      [{ type: "plain", text: "" }],
      [{ type: "plain", text: "const client = new OpenAI({" }],
      [
        { type: "plain", text: "  baseURL: " },
        { type: "string", text: '"https://api.themodeltoken.com/v1"' },
        { type: "plain", text: "," },
      ],
      [
        { type: "plain", text: "  apiKey: " },
        { type: "string", text: '"<THEMODELTOKEN_API_KEY>"' },
        { type: "plain", text: "," },
      ],
      [{ type: "plain", text: "});" }],
      [{ type: "plain", text: "" }],
      [
        {
          type: "plain",
          text: "const completion = await client.chat.completions.create({",
        },
      ],
      [
        { type: "plain", text: "  model: " },
        { type: "string", text: '"gpt-4o"' },
        { type: "plain", text: "," },
      ],
      [
        {
          type: "plain",
          text: '  messages: [{ role: "user", content: "Hello" }],',
        },
      ],
      [{ type: "plain", text: "});" }],
    ],
  },
  {
    id: "go",
    label: "Go",
    lines: [
      [{ type: "plain", text: "// OpenAI-compatible Go client example" }],
      [
        { type: "plain", text: "baseURL := " },
        { type: "string", text: '"https://api.themodeltoken.com/v1"' },
      ],
      [
        { type: "plain", text: "apiKey := " },
        { type: "string", text: '"<THEMODELTOKEN_API_KEY>"' },
      ],
      [
        { type: "plain", text: "model := " },
        { type: "string", text: '"gpt-4o"' },
      ],
    ],
  },
  {
    id: "java",
    label: "Java",
    lines: [
      [{ type: "plain", text: "// OpenAI-compatible Java client example" }],
      [
        { type: "plain", text: "String baseUrl = " },
        { type: "string", text: '"https://api.themodeltoken.com/v1"' },
        { type: "plain", text: ";" },
      ],
      [
        { type: "plain", text: "String apiKey = " },
        { type: "string", text: '"<THEMODELTOKEN_API_KEY>"' },
        { type: "plain", text: ";" },
      ],
    ],
  },
  {
    id: "php",
    label: "PHP",
    lines: [
      [{ type: "plain", text: "<?php" }],
      [{ type: "plain", text: "$client = OpenAI::factory()" }],
      [
        { type: "plain", text: "  ->withBaseUri(" },
        { type: "string", text: "'https://api.themodeltoken.com/v1'" },
        { type: "plain", text: ")" },
      ],
      [
        { type: "plain", text: "  ->withApiKey(" },
        { type: "string", text: "'<THEMODELTOKEN_API_KEY>'" },
        { type: "plain", text: ")" },
      ],
      [{ type: "plain", text: "  ->make();" }],
    ],
  },
];

export const benefitCards = [
  {
    id: "latency",
    title: "1.8s Latency",
    description:
      "Dedicated enterprise lines keep responses fast across global routes.",
    bg: "var(--th-benefit-lime)",
    image: "/illustrations/cta-latency-target.png",
    alt: "Target latency illustration",
  },
  {
    id: "payg",
    title: "Pay-As-You-Go",
    description:
      "No subscriptions or seat fees. Scale usage only when you need it.",
    bg: "var(--th-benefit-blue)",
    image: "/illustrations/cta-payg-wallet.png",
    alt: "Wallet payment illustration",
  },
  {
    id: "kyc",
    title: "Zero KYC",
    description:
      "No identity verification required. Start building instantly with any major credit card.",
    bg: "var(--th-benefit-orange)",
    image: "/illustrations/cta-zero-kyc-card.png",
    alt: "Zero KYC payment card illustration",
  },
] as const;
