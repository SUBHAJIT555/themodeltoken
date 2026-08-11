"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  HERO_CARD,
  getHeroSlot,
  heroModelCards,
} from "@/components/home/hero/hero.data";
import { HeroModelCard } from "@/components/home/hero/HeroModelCard";
import { ensureGsapPlugins } from "@/components/animation/GsapSetup";

const REAR_SLOT = heroModelCards.length - 1;

/** Choreography only — settled slot geometry stays in hero.data / getHeroSlot. */
const CHOREO = {
  /** Front card starts peeling before the deck advances */
  frontLead: 0.09,
  /** Front peel: mostly downward, slight left */
  exitX: -32,
  exitY: 420,
  /**
   * Exit runs until recycle; then the card is parked on a hidden pre-rear step
   * (one diagonal step past the visible rear) while still clipped/covered.
   */
  exitDuration: 0.48,
  recycleAt: 0.48,
  /** Begin sliding pre-rear → rear while still mostly covered by the deck */
  rearEntryAt: 0.5,
  rearEntryDuration: 0.62,
  /** Remaining cards: one-slot diagonal advance */
  advanceDuration: 0.72,
  advanceStagger: 0.02,
  ease: "power2.inOut",
} as const;

/** One extra diagonal step past the visible rear — obscured by the stack. */
function getPreRearSlot() {
  const rear = getHeroSlot(REAR_SLOT);
  const { step } = HERO_CARD;
  return {
    x: rear.x + step,
    y: rear.y - step,
    zIndex: Math.max(0, rear.zIndex - 1),
  };
}

/**
 * Hero card-swap stack.
 * Settled slots unchanged; transitions use peel → advance → recycle choreography.
 */
export function HeroModelStack() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** Current front→back order as indices into heroModelCards */
  const orderRef = useRef(heroModelCards.map((_, i) => i));

  useLayoutEffect(() => {
    ensureGsapPlugins();
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== heroModelCards.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applySlot = (el: HTMLDivElement, slotIndex: number) => {
      const slot = getHeroSlot(slotIndex);
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        xPercent: -50,
        yPercent: -50,
        skewY: HERO_CARD.skewY,
        zIndex: slot.zIndex,
        opacity: 1,
        force3D: true,
      });
    };

    orderRef.current.forEach((cardIndex, slotIndex) => {
      const el = cards[cardIndex];
      if (el) applySlot(el, slotIndex);
    });

    if (reduced) return;

    let alive = true;
    let cycleTl: gsap.core.Timeline | null = null;
    const timers: number[] = [];

    const advance = () => {
      if (!alive) return;

      const order = orderRef.current;
      const outgoingIndex = order[0];
      const outgoing = cards[outgoingIndex];
      const remaining = order.slice(1);

      if (!outgoing) return;

      const frontSlot = getHeroSlot(0);
      const rearSlot = getHeroSlot(REAR_SLOT);
      const preRearSlot = getPreRearSlot();

      // Preserve overall cadence: next cycle from this transition's start
      const nextId = window.setTimeout(advance, HERO_CARD.interval * 1000);
      timers.push(nextId);

      cycleTl?.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          if (!alive) return;
          orderRef.current = [...remaining, outgoingIndex];
          orderRef.current.forEach((cardIndex, slotIndex) => {
            const el = cards[cardIndex];
            if (el) applySlot(el, slotIndex);
          });
        },
      });
      cycleTl = tl;

      // 1) Front card peels downward first (keeps front z-index, opacity 1)
      tl.to(
        outgoing,
        {
          x: frontSlot.x + CHOREO.exitX,
          y: frontSlot.y + CHOREO.exitY,
          xPercent: -50,
          yPercent: -50,
          skewY: HERO_CARD.skewY,
          zIndex: frontSlot.zIndex,
          opacity: 1,
          duration: CHOREO.exitDuration,
          ease: CHOREO.ease,
          force3D: true,
        },
        0,
      );

      // 2) Remaining deck advances one slot with a tiny cascade (overlaps exit)
      remaining.forEach((cardIndex, i) => {
        const el = cards[cardIndex];
        if (!el) return;
        // Was at slot i+1 → moves to slot i (toward front / bottom-left)
        const target = getHeroSlot(i);
        tl.to(
          el,
          {
            x: target.x,
            y: target.y,
            xPercent: -50,
            yPercent: -50,
            skewY: HERO_CARD.skewY,
            zIndex: target.zIndex,
            opacity: 1,
            duration: CHOREO.advanceDuration,
            ease: CHOREO.ease,
            force3D: true,
          },
          CHOREO.frontLead + i * CHOREO.advanceStagger,
        );
      });

      // 3) Once clipped: park on hidden pre-rear (farther top-right, lowest z)
      tl.set(
        outgoing,
        {
          x: preRearSlot.x,
          y: preRearSlot.y,
          xPercent: -50,
          yPercent: -50,
          skewY: HERO_CARD.skewY,
          zIndex: preRearSlot.zIndex,
          opacity: 1,
          force3D: true,
        },
        CHOREO.recycleAt,
      );

      // 4) Slide into the visible rear slot while still covered — no opacity/scale.
      //    Keep z-index lowest during travel so it stays masked by the deck;
      //    promote to rear z only after arrival.
      tl.to(
        outgoing,
        {
          x: rearSlot.x,
          y: rearSlot.y,
          xPercent: -50,
          yPercent: -50,
          skewY: HERO_CARD.skewY,
          opacity: 1,
          duration: CHOREO.rearEntryDuration,
          ease: CHOREO.ease,
          force3D: true,
        },
        CHOREO.rearEntryAt,
      );
      tl.set(
        outgoing,
        { zIndex: rearSlot.zIndex },
        CHOREO.rearEntryAt + CHOREO.rearEntryDuration,
      );
    };

    const startId = window.setTimeout(advance, HERO_CARD.interval * 1000);
    timers.push(startId);

    return () => {
      alive = false;
      timers.forEach((id) => window.clearTimeout(id));
      cycleTl?.kill();
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 z-[2] -bottom-16 ml-[-500px] hidden h-[720px] w-[680px] origin-bottom scale-75 opacity-100 sm:block sm:-bottom-40 sm:ml-[-340px] sm:scale-100 lg:-bottom-53 lg:ml-[-190px]"
    >
      <div
        className="card-swap-container absolute left-1/2 top-[362px] -translate-x-1/2"
        style={{ width: HERO_CARD.width, height: HERO_CARD.height }}
      >
        {heroModelCards.map((card, index) => (
          <HeroModelCard
            key={card.id}
            card={card}
            cardRef={(el) => {
              cardRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
