import type { Metadata } from "next";
import { AboutCommunity } from "@/components/about/AboutCommunity";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTrust } from "@/components/about/AboutTrust";
import { AboutWhy } from "@/components/about/AboutWhy";
import { ChatWidget } from "@/components/home/ChatWidget";

export const metadata: Metadata = {
  title: {
    absolute: "About Us - TheModelToken",
  },
  description:
    "Unified AI Access for High-Performance Teams. TheModelToken provides the most stable, transparent, and high-performance unified AI API gateway.",
};

export default function AboutPage() {
  return (
    <>
      <div className="relative w-full overflow-hidden bg-[var(--th-about-bg)]">
        <div className="relative z-10 w-full pt-[var(--th-header-clearance)]">
          <div className="mx-auto max-w-4xl space-y-16 px-6 py-20 text-zinc-800">
            <AboutHero />
            <AboutWhy />
            <AboutTrust />
            <AboutCommunity />
          </div>
        </div>
      </div>
      <ChatWidget />
    </>
  );
}
