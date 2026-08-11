import Image from "next/image";
import { aboutProviders } from "@/data/about";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function AboutProviders() {
  return (
    <ScrollReveal y={16}>
      <div className="flex flex-col items-center justify-center space-y-8 py-10 opacity-90">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-zinc-500">
          {aboutProviders.title}
        </p>
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-12 gap-y-10">
          {aboutProviders.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center opacity-60 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={`/about/providers/${item.id}.svg`}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
