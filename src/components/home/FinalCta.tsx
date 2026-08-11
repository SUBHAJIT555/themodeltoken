"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";
import { siteMailto } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  const { openCallback } = useCallbackModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--th-cta-from)] to-[var(--th-cta-to)] py-16 text-center text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-16 size-[320px] rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="mb-6 font-serif text-[clamp(36px,7vw,64px)] font-normal leading-[0.95] sm:mb-8">
            Ready to build?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.06}>
          <p className="mx-auto mb-8 max-w-[600px] font-sans text-[15px] text-white/80 sm:mb-12">
            Skip the wait. Get your API key and start calling the API instantly.
            Need higher rate limits, custom features, or volume discounts?
            Let&apos;s talk.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              type="button"
              size="lg"
              className="rounded-[var(--th-radius-button)] bg-white font-semibold text-black hover:bg-white/90"
              onClick={openCallback}
            >
              Create API Key
            </Button>
            <a
              href={siteMailto}
              className="inline-flex h-10 items-center justify-center rounded-[var(--th-radius-button)] bg-black px-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              Talk to Sales
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
