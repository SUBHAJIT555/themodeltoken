export type HeroModelCard = {
  id: string;
  label: string;
  /**
   * CSS background approximating grainient canvases.
   * Colors sampled from live React props: color1 / color2 / color3.
   */
  background: string;
  icon: string;
};

/**
 * Initial front→back order observed on themodeltoken.com.
 * Cards cycle: front recycles to back.
 */
export const heroModelCards: HeroModelCard[] = [
  {
    id: "claude",
    label: "Claude",
    background:
      "radial-gradient(120% 90% at 18% 12%, #D58C5D 0%, transparent 55%), radial-gradient(90% 80% at 82% 78%, #604034 0%, transparent 50%), linear-gradient(145deg, #D58C5D 0%, #A65E3E 48%, #604034 100%)",
    icon: "/icons/logos/claude-icon.svg",
  },
  {
    id: "qwen",
    label: "Qwen",
    background:
      "radial-gradient(110% 85% at 20% 15%, #6A9FD6 0%, transparent 55%), radial-gradient(90% 80% at 85% 80%, #2F3E83 0%, transparent 52%), linear-gradient(145deg, #6A9FD6 0%, #486CC7 52%, #2F3E83 100%)",
    icon: "/icons/logos/qwen-icon.svg",
  },
  {
    id: "doubao",
    label: "Doubao",
    background:
      "radial-gradient(110% 85% at 22% 18%, #D66F9B 0%, transparent 55%), radial-gradient(90% 80% at 84% 78%, #5B3E7B 0%, transparent 52%), linear-gradient(145deg, #D66F9B 0%, #9E55A5 50%, #5B3E7B 100%)",
    icon: "/icons/logos/doubao-icon.svg",
  },
  {
    id: "deepseek",
    label: "deepseek",
    background:
      "radial-gradient(110% 85% at 18% 20%, #5FB7CF 0%, transparent 50%), radial-gradient(90% 80% at 86% 75%, #34337F 0%, transparent 55%), linear-gradient(145deg, #5FB7CF 0%, #4B70C5 55%, #34337F 100%)",
    icon: "/icons/logos/deepseek-icon.svg",
  },
  {
    id: "suno",
    label: "Suno",
    background:
      "radial-gradient(115% 90% at 16% 18%, #D8A84A 0%, transparent 52%), radial-gradient(95% 85% at 88% 78%, #74412A 0%, transparent 55%), linear-gradient(145deg, #D8A84A 0%, #C46A3A 48%, #74412A 100%)",
    icon: "/icons/logos/suno-icon.svg",
  },
  {
    id: "gemini",
    label: "Gemini",
    background:
      "radial-gradient(115% 90% at 15% 16%, #D878C5 0%, transparent 52%), radial-gradient(95% 85% at 86% 80%, #6652C7 0%, transparent 55%), linear-gradient(145deg, #D878C5 0%, #7E64C8 45%, #6652C7 100%)",
    icon: "/icons/logos/gemini-icon.svg",
  },
  {
    id: "openai",
    label: "OpenAI",
    background:
      "radial-gradient(110% 85% at 22% 18%, #4A5568 0%, transparent 55%), radial-gradient(90% 80% at 80% 82%, #030712 0%, transparent 50%), linear-gradient(145deg, #4A5568 0%, #111827 50%, #030712 100%)",
    icon: "/icons/logos/openai-icon.svg",
  },
];

/**
 * Tuned against herosection.mp4 @ 1888×772 and live CardSwap props:
 * - cardDistance / verticalDistance: 76 (slightly tighter after 5% scale-down)
 * - delay: 3000ms between advances
 * - skewAmount: 12
 */
export const HERO_CARD = {
  width: 530,
  height: 424,
  skewY: 12,
  step: 70,
  /** Transition duration per stack advance */
  duration: 1.35,
  /**
   * Time between advance starts (includes transition + dwell).
   * Homepage uses delay: 3000; slowed further for calmer premium pace.
   */
  interval: 3.6,
} as const;

export function getHeroSlot(index: number) {
  const { step } = HERO_CARD;
  return {
    x: index * step,
    y: index * -step,
    zIndex: heroModelCards.length - index,
  };
}
