import type { Metadata } from "next";
import { ModelsExplorer } from "@/components/models/ModelsExplorer";
import { ChatWidget } from "@/components/home/ChatWidget";

export const metadata: Metadata = {
  title: {
    absolute: "Model Pricing – LLM API Price Comparison | TheModelToken",
  },
  description:
    "Browse all supported LLM model prices including input/output token rates from OpenAI, Claude, Gemini, DeepSeek, and 30+ providers.",
};

export default function ModelsPage() {
  return (
    <>
      <ModelsExplorer />
      <ChatWidget />
    </>
  );
}
