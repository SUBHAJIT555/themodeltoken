import Link from "next/link";
import { aboutTrust } from "@/data/about";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function AboutTrust() {
  return (
    <div className="space-y-8 pt-8">
      <ScrollReveal y={16}>
        <div className="space-y-2">
          <h3 className="flex flex-col text-3xl font-semibold text-zinc-900 md:flex-row md:items-baseline md:gap-3">
            <span>{aboutTrust.title}</span>
            <span className="mt-1 text-xl font-normal text-zinc-500 md:mt-0">
              {aboutTrust.titleAside}
            </span>
          </h3>
          <p className="border-b border-zinc-200 pb-4 text-lg text-zinc-600">
            {aboutTrust.intro}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05} y={20}>
        <div className="space-y-8 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          {aboutTrust.items.map((item) => (
            <div
              key={item.id}
              className="border-l-4 border-[var(--th-about-accent)] pl-6"
            >
              <h4 className="mb-2 flex flex-wrap items-center gap-3 text-xl font-semibold text-zinc-900">
                <span>{item.title}</span>
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-sm font-normal text-zinc-400">
                  {item.badge}
                </span>
              </h4>
              {"body" in item ? (
                <p className="leading-relaxed text-zinc-600">{item.body}</p>
              ) : (
                <p className="leading-relaxed text-zinc-600">
                  {item.bodyBefore}
                  <Link
                    href={siteConfig.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--th-about-accent)] transition-colors hover:text-[var(--th-about-accent-hover)] hover:underline"
                  >
                    {item.ticketLabel}
                  </Link>
                  {item.bodyAfter}
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
