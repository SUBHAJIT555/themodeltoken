import { HeroContent } from "@/components/home/hero/HeroContent";
import { HeroModelStack } from "@/components/home/hero/HeroModelStack";

export function Hero() {
  return (
    <section className="relative min-h-[550px] overflow-hidden bg-[#f7f7f7] bg-[oklch(0.9702_0_0)] px-4 pb-16 pt-[var(--th-header-clearance)] text-left text-[oklch(0.2103_0.0059_285.89)] sm:min-h-[900px] sm:px-6 sm:pb-20 lg:pt-[180px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.07)_1px,transparent_0)] bg-[length:20px_20px]"
      />

      <HeroModelStack />

      <div className="pointer-events-none relative z-10 mx-auto max-w-[var(--th-container)]">
        <HeroContent />
      </div>
    </section>
  );
}
