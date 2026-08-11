import Image from "next/image";
import type { HeroModelCard as HeroModelCardData } from "@/components/home/hero/hero.data";
import { HERO_CARD } from "@/components/home/hero/hero.data";

type HeroModelCardProps = {
  card: HeroModelCardData;
  cardRef: (el: HTMLDivElement | null) => void;
};

export function HeroModelCard({ card, cardRef }: HeroModelCardProps) {
  return (
    <div
      ref={cardRef}
      data-hero-model={card.id}
      className="absolute left-1/2 top-1/2 overflow-hidden border-0 p-6 text-left text-white will-change-transform"
      style={{
        width: HERO_CARD.width,
        height: HERO_CARD.height,
        borderRadius: 12,
        backgroundImage: card.background,
        transformOrigin: "50% 50%",
      }}
    >
      <div className="relative z-10 flex items-center gap-2">
        <Image
          src={card.icon}
          alt=""
          width={32}
          height={32}
          className="size-8 brightness-0 invert"
          draggable={false}
        />
        <span className="text-[24px] font-medium tracking-tight text-white">
          {card.label}
        </span>
      </div>
    </div>
  );
}
