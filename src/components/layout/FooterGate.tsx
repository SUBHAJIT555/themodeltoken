"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

/** Hide marketing footer on dense catalog surfaces like /models. */
export function FooterGate() {
  const pathname = usePathname();
  if (pathname === "/models") return null;
  return <Footer />;
}
