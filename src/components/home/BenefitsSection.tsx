"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { benefitCards } from "@/data/home";
import { ensureGsapPlugins } from "@/components/animation/GsapSetup";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function BenefitsSection() {
  const { openCallback } = useCallbackModal();
  const sectionRef = useRef<HTMLElement>(null);
  const latencyIconRef = useRef<HTMLDivElement>(null);
  const walletIconRef = useRef<HTMLDivElement>(null);
  const kycIconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsapPlugins();
    const section = sectionRef.current;
    const target = latencyIconRef.current;
    const wallet = walletIconRef.current;
    const card = kycIconRef.current;
    if (!section || !target || !wallet || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([target, wallet, card], {
        transformOrigin: "center center",
        force3D: true,
      });

      const targetTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "sine.inOut" },
      });
      targetTl
        .to(target, { y: -7, rotate: 1.5, x: 1.5, duration: 1.4 })
        .to(target, { y: 0, rotate: -0.5, x: -0.5, duration: 1.0 })
        .to(target, { y: 3, rotate: -1, x: -1.5, duration: 0.9 })
        .to(target, { y: 0, rotate: 0, x: 0, duration: 0.7 });

      const walletTl = gsap.timeline({
        repeat: -1,
        delay: 0.6,
        defaults: { ease: "sine.inOut" },
      });
      walletTl
        .to(wallet, { y: -9, rotate: -1.2, x: -2, duration: 1.55 })
        .to(wallet, { y: 1, rotate: 1, x: 2, duration: 1.25 })
        .to(wallet, { y: -3, rotate: 0.5, x: -1, duration: 0.95 })
        .to(wallet, { y: 0, rotate: 0, x: 0, duration: 0.75 });

      const cardTl = gsap.timeline({
        repeat: -1,
        delay: 1.1,
        defaults: { ease: "sine.inOut" },
      });
      cardTl
        .to(card, { y: -6, rotate: 1, x: 1.5, duration: 1.5 })
        .to(card, { y: 3, rotate: -0.8, x: -2, duration: 1.35 })
        .to(card, { y: 0, rotate: 0, x: 0, duration: 1.05 });
    }, section);

    return () => ctx.revert();
  }, []);

  const iconRefs = [latencyIconRef, walletIconRef, kycIconRef] as const;

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[oklch(0.9702_0_0)] px-4 py-16 text-center text-[var(--th-heading)] sm:px-6 sm:py-24"
    >
      <Container>
        <div className="mx-auto mb-10 max-w-6xl text-center">
          <ScrollReveal>
            <div className="mb-6 font-mono text-xs font-medium uppercase tracking-normal text-[var(--th-accent)]">
              Instant Access, Simple Pricing
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mb-5 font-serif text-[clamp(36px,6vw,60px)] font-normal leading-[1.05] tracking-normal text-black">
              Stop overpaying. Start building today.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto max-w-[820px] text-[15px] leading-[1.45] text-neutral-500">
              Launch with enterprise-grade latency, flexible billing, and instant
              account provisioning from one unified API.
            </p>
          </ScrollReveal>
        </div>

        <div className="mb-12 grid gap-4 text-center sm:gap-5 md:grid-cols-3">
          {benefitCards.map((card, index) => (
            <ScrollReveal key={card.id} delay={0.08 + index * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="relative overflow-hidden rounded-[24px] border border-black/10 p-4 text-[var(--th-heading)]"
                style={{ background: card.bg }}
              >
                <div className="grid h-40 place-items-center rounded-[22px]">
                  <div
                    ref={iconRefs[index]}
                    className="feature-icon will-change-transform"
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={140}
                      height={140}
                      className="size-[140px] translate-y-3 object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.28)]"
                    />
                  </div>
                </div>
                <div className="px-3 pb-4 pt-6">
                  <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-black/55">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="rounded-full"
            onClick={openCallback}
          >
            Get Your API Key Now
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
