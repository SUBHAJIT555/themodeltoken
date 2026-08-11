export type ProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "deepseek"
  | "qwen"
  | "xai"
  | "moonshot"
  | "doubao"
  | "kling"
  | "minimax"
  | "zhipu"
  | "xiaomi"
  | "longcat";

export type ProviderConfig = {
  id: ProviderId;
  label: string;
  icon: string;
  /** Logo size inside the ~40px card badge */
  cardIconClassName: string;
  /** Logo size inside filter pills */
  filterIconClassName: string;
  /** Logo size inside the details drawer badge */
  drawerIconClassName: string;
};

export const PROVIDERS = {
  openai: {
    id: "openai",
    label: "OpenAI",
    icon: "/models/providers/openai.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  anthropic: {
    id: "anthropic",
    label: "Anthropic",
    icon: "/models/providers/anthropic.svg",
    cardIconClassName: "size-[23px]",
    filterIconClassName: "size-[16px]",
    drawerIconClassName: "size-[24px]",
  },
  google: {
    id: "google",
    label: "Google",
    icon: "/models/providers/google-gemini.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  deepseek: {
    id: "deepseek",
    label: "DeepSeek",
    icon: "/models/providers/deepseek.svg",
    cardIconClassName: "size-[22px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[23px]",
  },
  qwen: {
    id: "qwen",
    label: "Qwen",
    icon: "/models/providers/qwen.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  xai: {
    id: "xai",
    label: "xAI",
    icon: "/models/providers/xai.svg",
    cardIconClassName: "size-[22px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[23px]",
  },
  moonshot: {
    id: "moonshot",
    label: "Moonshot",
    icon: "/models/providers/moonshot.svg",
    cardIconClassName: "size-[22px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[23px]",
  },
  doubao: {
    id: "doubao",
    label: "Doubao",
    icon: "/models/providers/doubao.svg",
    cardIconClassName: "size-[22px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[23px]",
  },
  kling: {
    id: "kling",
    label: "kling",
    icon: "/models/providers/kling.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  minimax: {
    id: "minimax",
    label: "MiniMax",
    icon: "/models/providers/minimax.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  zhipu: {
    id: "zhipu",
    label: "Zhipu AI",
    icon: "/models/providers/zhipu-ai.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  xiaomi: {
    id: "xiaomi",
    label: "Xiaomi MiMo",
    icon: "/models/providers/xiaomi.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
  longcat: {
    id: "longcat",
    label: "美团",
    icon: "/models/providers/longcat.svg",
    cardIconClassName: "size-[21px]",
    filterIconClassName: "size-[15px]",
    drawerIconClassName: "size-[22px]",
  },
} satisfies Record<ProviderId, ProviderConfig>;

const FALLBACK: ProviderConfig = {
  id: "openai",
  label: "Unknown",
  icon: "/models/providers/openai.svg",
  cardIconClassName: "size-[20px]",
  filterIconClassName: "size-[14px]",
  drawerIconClassName: "size-[20px]",
};

/** Match TheModelToken vendor icon keys + display names → ProviderId */
const RESOLVE_RULES: [RegExp, ProviderId][] = [
  [/claude|anthropic/, "anthropic"],
  [/gemini|google/, "google"],
  [/deepseek/, "deepseek"],
  [/qwen|alibaba|阿里/, "qwen"],
  [/grok|xai/, "xai"],
  [/moonshot|kimi/, "moonshot"],
  [/doubao|字节/, "doubao"],
  [/kling|快手/, "kling"],
  [/minimax/, "minimax"],
  [/zhipu|glm|智谱/, "zhipu"],
  [/xiaomi|mimo/, "xiaomi"],
  [/longcat|美团|meituan/, "longcat"],
  [/openai/, "openai"],
];

export function resolveProviderId(
  providerIcon: string,
  providerName: string,
): ProviderId | null {
  const key = `${providerIcon} ${providerName}`.toLowerCase();
  for (const [re, id] of RESOLVE_RULES) {
    if (re.test(key)) return id;
  }
  return null;
}

export function getProviderConfig(
  providerIcon: string,
  providerName: string,
): ProviderConfig {
  const id = resolveProviderId(providerIcon, providerName);
  if (!id) {
    if (typeof console !== "undefined") {
      console.warn(
        `[providers] Missing icon mapping for "${providerName}" (${providerIcon})`,
      );
    }
    return { ...FALLBACK, label: providerName || FALLBACK.label };
  }
  return PROVIDERS[id];
}
