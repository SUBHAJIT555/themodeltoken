"use client";

import { useMemo, useState } from "react";
import { apiCodeTabs } from "@/data/home";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { cn } from "@/lib/cn";

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 16 16"
      aria-hidden
      className="size-3.5"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2.5H8A1.5 1.5 0 0 0 6.5 4v1H8a3 3 0 0 1 3 3v1.5h1A1.5 1.5 0 0 0 13.5 8V4A1.5 1.5 0 0 0 12 2.5M11 11h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3zM4 6.5h4A1.5 1.5 0 0 1 9.5 8v4A1.5 1.5 0 0 1 8 13.5H4A1.5 1.5 0 0 1 2.5 12V8A1.5 1.5 0 0 1 4 6.5"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ApiSection() {
  const [active, setActive] = useState(apiCodeTabs[0].id);
  const [copied, setCopied] = useState(false);

  const tab = useMemo(
    () => apiCodeTabs.find((t) => t.id === active) ?? apiCodeTabs[0],
    [active],
  );

  const plainText = useMemo(
    () => tab.lines.map((line) => line.map((t) => t.text).join("")).join("\n"),
    [tab],
  );

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="th-dot-grid pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-10 mx-auto mb-12 max-w-[var(--th-container)] px-4 text-center sm:mb-16 sm:px-6">
        <ScrollReveal>
          <div className="mb-3 font-mono text-xs font-medium uppercase tracking-normal text-[var(--th-accent)]">
            OpenAI SDK Compatible
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="mb-3 font-serif text-[clamp(36px,6vw,60px)] font-normal leading-[1.05] tracking-normal text-black">
            One Endpoint. All Modalities.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-[15px] text-neutral-500">
            Fully compatible with standard OpenAI SDKs for Text, Video, Vision,
            and TTS.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12}>
        <div className="relative z-10 mx-auto max-w-[800px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--th-card-code)] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex flex-1 gap-1.5 overflow-x-auto">
                {apiCodeTabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "h-7 shrink-0 rounded-lg px-2.5 font-mono text-xs font-medium shadow-none transition-colors",
                      active === item.id
                        ? "bg-white/10 text-white"
                        : "text-white/35 hover:bg-white/6 hover:text-white/60",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label={`Copy ${tab.label} code`}
                onClick={onCopy}
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/8 hover:text-white/70"
              >
                <CopyIcon />
              </button>
              {copied ? (
                <span className="font-mono text-xs text-white/50">Copied</span>
              ) : null}
            </div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 font-mono text-[12px] font-normal leading-5 sm:text-[14px]">
                {tab.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="contents">
                    <span className="select-none text-right text-white/20">
                      {lineIndex + 1}
                    </span>
                    <span className="whitespace-pre text-[var(--th-code-fg)]">
                      {line.map((token, tokenIndex) => (
                        <span
                          key={tokenIndex}
                          className={cn(
                            token.type === "keyword" &&
                              "text-[var(--th-code-keyword)]",
                            token.type === "string" &&
                              "text-[var(--th-code-string)]",
                          )}
                        >
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
