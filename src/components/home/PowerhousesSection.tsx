import { modalityCards } from "@/data/home";
import { ModalityCard } from "@/components/home/ModalityCard";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Container } from "@/components/ui/Container";

export function PowerhousesSection() {
  return (
    <section className="overflow-hidden bg-[oklch(0.9702_0_0)] px-4 py-12 sm:px-6 sm:py-16">
      <Container className="px-0 sm:px-0">
        <div className="mb-14 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <ScrollReveal>
              <div className="mb-3 font-mono text-xs font-medium uppercase tracking-normal text-[var(--th-accent)]">
                The Next-Gen Powerhouses
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="max-w-[900px] font-serif text-[clamp(36px,6vw,60px)] font-normal leading-[1.05] tracking-normal text-black">
                Four modalities, one network.
                <br />
                One bill, paid in milliseconds.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <p className="max-w-[320px] text-[15px] leading-[1.55] text-neutral-500 lg:justify-self-end">
              Text reasoning, long-context understanding, image and video
              generation. Built for complex workflows and visual creation.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-[18px] md:grid-cols-[repeat(24,minmax(0,1fr))]">
          {modalityCards.map((card) => (
            <ModalityCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
