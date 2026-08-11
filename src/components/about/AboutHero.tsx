import { aboutHero } from "@/data/about";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function AboutHero() {
  return (
    <ScrollReveal y={18}>
      <div className="space-y-6 text-center">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          {aboutHero.title}
        </h1>
        <h2 className="text-xl font-medium text-zinc-600 md:text-2xl">
          {aboutHero.subtitle}
        </h2>
        <p className="mx-auto max-w-3xl pt-2 text-lg leading-relaxed text-zinc-600">
          {aboutHero.body}
        </p>
      </div>
    </ScrollReveal>
  );
}
