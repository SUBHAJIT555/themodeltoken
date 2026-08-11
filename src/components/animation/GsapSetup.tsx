"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

export function ensureGsapPlugins() {
  if (typeof window === "undefined" || pluginsRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
}

type GsapSetupProps = {
  children: ReactNode;
};

/** Registers GSAP + ScrollTrigger once on the client. */
export function GsapSetup({ children }: GsapSetupProps) {
  useEffect(() => {
    ensureGsapPlugins();
  }, []);

  return children;
}

/** @deprecated Prefer GsapSetup */
export const GsapProvider = GsapSetup;
