"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ensureGsapPlugins } from "@/components/animation/GsapSetup";

type GsapContextFn = (context: gsap.Context, gsapInstance: typeof gsap) => void;

/**
 * Runs a GSAP context scoped to a DOM element.
 * Plugins are registered once via ensureGsapPlugins.
 */
export function useGsap(callback: GsapContextFn, deps: unknown[] = []) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const ctx = gsap.context((self) => {
      callback(self, gsap);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);

  return scopeRef;
}
