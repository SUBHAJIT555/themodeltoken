import { aboutWhy } from "@/data/about";
import { AboutProviders } from "@/components/about/AboutProviders";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function AboutWhy() {
  return (
    <div className="space-y-8 pt-8">
      <ScrollReveal y={16}>
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold text-zinc-900">
            {aboutWhy.title}
          </h3>
          <p className="border-b border-zinc-200 pb-4 text-lg text-zinc-600">
            {aboutWhy.intro}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-8 md:grid-cols-2">
        {aboutWhy.cards.map((card, index) => (
          <ScrollReveal key={card.id} delay={0.04 * index} y={20} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h4 className="mb-3 flex items-start justify-between gap-4 text-xl font-semibold leading-snug text-zinc-900">
                <span className="min-w-0 flex-1">{card.title}</span>
                <span className="max-w-[42%] text-right text-sm font-normal leading-snug text-zinc-400">
                  {card.label}
                </span>
              </h4>
              <p className="text-sm leading-relaxed text-zinc-600 md:text-base">
                {card.body}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <AboutProviders />
    </div>
  );
}
