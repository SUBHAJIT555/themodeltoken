"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { logoMarqueeBrands } from "@/data/home";

function LogoItem({ brand }: { brand: string }) {
  return (
    <li className="mr-[var(--logoloop-gap)] flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]">
      <div className="inline-flex items-center gap-2 text-[var(--th-heading)] opacity-80">
        <Image
          src={`/icons/logos/${brand}-icon.svg`}
          alt=""
          width={36}
          height={36}
          className="h-[var(--logoloop-logoHeight)] w-auto"
        />
        <Image
          src={`/icons/logos/${brand}-wordmark.svg`}
          alt={brand}
          width={120}
          height={36}
          className="h-[calc(var(--logoloop-logoHeight)*0.72)] w-auto"
        />
      </div>
    </li>
  );
}

export function LogoMarquee() {
  const loop = [...logoMarqueeBrands, ...logoMarqueeBrands, ...logoMarqueeBrands];

  return (
    <section className="overflow-hidden bg-[oklch(0.9702_0_0)] py-4 sm:py-12">
      <div
        className="relative group overflow-x-hidden"
        role="region"
        aria-label="Supported model logos"
        style={
          {
            width: "100%",
            ["--logoloop-gap" as string]: "100px",
            ["--logoloop-logoHeight" as string]: "36px",
            ["--logoloop-fadeColor" as string]: "oklch(0.9702 0 0)",
          } as CSSProperties
        }
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor)_0%,rgba(0,0,0,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor)_0%,rgba(0,0,0,0)_100%)]"
        />

        <ul className="th-logo-track relative z-0 flex w-max select-none flex-row will-change-transform motion-reduce:transform-none">
          {loop.map((brand, i) => (
            <LogoItem key={`${brand}-${i}`} brand={brand} />
          ))}
        </ul>
      </div>
    </section>
  );
}
