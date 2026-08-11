import type { NavItem } from "@/types";
import { siteConfig, siteMailto } from "@/config/site";

/** Primary header navigation. */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Models", href: "/models" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

/** Extra app routes (footer / secondary surfaces). */
export const secondaryNavigation: NavItem[] = [];

export const footerCompanyNavigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

export const footerSupportNavigation: NavItem[] = [
  { label: "Support", href: siteMailto },
  { label: siteConfig.email, href: siteMailto },
];

export const legalNavigation: NavItem[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];
