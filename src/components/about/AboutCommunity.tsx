"use client";

import { ChevronRight } from "lucide-react";
import { aboutCommunity } from "@/data/about";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";

export function AboutCommunity() {
  const { docs, discord, start } = aboutCommunity.links;
  const { openCallback } = useCallbackModal();

  return (
    <ScrollReveal y={22}>
      <div className="relative mt-12 space-y-8 overflow-hidden rounded-3xl bg-zinc-900 p-10 text-center text-white shadow-xl md:p-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--th-about-accent),#18181b_55%,#18181b)] opacity-20"
        />
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-semibold">{aboutCommunity.title}</h3>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
            {aboutCommunity.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={openCallback}
              className="rounded-full border border-zinc-700 bg-zinc-800 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:border-zinc-600 hover:bg-zinc-700"
            >
              {docs.label}
            </button>
            <a
              href={discord.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--th-about-discord)] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[var(--th-about-discord-hover)]"
            >
              {discord.label}
            </a>
            <button
              type="button"
              onClick={openCallback}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--th-about-accent)] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[var(--th-about-accent-hover)]"
            >
              {start.label}
              <ChevronRight className="size-[18px]" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
