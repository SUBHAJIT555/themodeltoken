import type { Metadata } from "next";
import { ApiSection } from "@/components/home/ApiSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ChatWidget } from "@/components/home/ChatWidget";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/hero/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { PowerhousesSection } from "@/components/home/PowerhousesSection";

export const metadata: Metadata = {
  title: {
    absolute: "TheModelToken – Unified LLM API Gateway",
  },
  description:
    "Better price, better stability. The unified LLM API gateway supporting OpenAI, Claude, Gemini, DeepSeek and 30+ providers.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PowerhousesSection />
      <ApiSection />
      <BenefitsSection />
      <FinalCta />
      <ChatWidget />
    </>
  );
}
