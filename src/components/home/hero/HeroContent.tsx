"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { ensureGsapPlugins } from "@/components/animation/GsapSetup";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";

function HeroCtas() {
  const { openCallback } = useCallbackModal();

  return (
    <div
      data-hero-reveal
      className="pointer-events-auto flex w-full max-w-md flex-col justify-start gap-3 sm:max-w-none sm:flex-row sm:gap-4"
    >
      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        onClick={openCallback}
      >
        Generate API Key
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={openCallback}
      >
        View Docs
      </Button>
    </div>
  );
}

function LightningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-1 size-3.5 shrink-0 text-[var(--th-heading)]"
      style={{ transform: "scaleX(0.95)", transformOrigin: "center" }}
      aria-hidden
      width={14}
      height={14}
    >
      <path d="M13 2l-2 0a1 1 0 0 0 -.8 .4l-6 8a1 1 0 0 0 .8 1.6l4.2 0l-1.6 9a1 1 0 0 0 1.7 .8l8 -11a1 1 0 0 0 -.8 -1.6l-4.7 0l2.4 -6.8a1 1 0 0 0 -.8 -1.2z" />
    </svg>
  );
}

export function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = root.querySelectorAll<HTMLElement>("[data-hero-reveal]");

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.05,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-10 max-w-[760px] will-change-transform lg:ml-[max(0px,calc(640px-34.5vw))]"
    >
      {/* Announcement stays put; ~30px gap before headline group (no negative pull-up). */}
      <div data-hero-reveal className="mb-5 inline-flex max-w-full sm:mb-[30px]">
        <div
          className="relative flex max-w-full items-center justify-center border border-black/8 bg-white/80 px-3 py-2 text-[11px] font-semibold tracking-wide text-[rgba(33,37,41,0.75)] antialiased backdrop-blur-sm sm:px-4 sm:text-xs"
          style={{ borderRadius: 999 }}
        >
          <LightningIcon />
          <span className="min-w-0 leading-snug">
            <span className="sm:hidden">1.8s Ultra-Low Latency</span>
            <span className="hidden sm:inline">
              1.8s Ultra-Low Latency via Dedicated Enterprise Lines
            </span>
          </span>
        </div>
      </div>

      <div>
        <h1
          data-hero-reveal
          className="mb-2 font-serif font-medium leading-tight tracking-normal text-[var(--th-heading)]"
          style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
        >
          <span className="block text-[clamp(32px,5vw,56px)] font-[500] italic">
            Frontier Intelligence.
          </span>
          <span
            className="mt-1 inline-block font-sans text-[clamp(40px,9vw,88px)] font-bold leading-[1.1]"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #FA5902 0%, #FA5902 50%, #FA5902 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Without the
            <br />
            Frontier Price.
          </span>
        </h1>

        <p
          data-hero-reveal
          className="mb-6 max-w-[600px] text-base leading-relaxed text-[rgba(33,37,41,0.7)]"
        >
          Access OpenAI and Claude models from one unified endpoint. Or, slash
          your API bills by 90% by dropping in top-tier alternatives like
          DeepSeek—with zero code changes.
        </p>

        <HeroCtas />
      </div>
    </div>
  );
}
