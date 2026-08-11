import { siteConfig } from "@/config/site";

/**
 * Centralized legal/business details for Terms & Privacy.
 * Prefer known site values; leave unresolved fields null until confirmed.
 */
export const legalConfig = {
  brandName: siteConfig.name,
  domain: "themodeltoken.com",
  website: siteConfig.url,

  supportEmail: siteConfig.email,
  privacyEmail: siteConfig.email,

  legalEntityName: siteConfig.legalEntity,
  registeredAddress: siteConfig.address.line,
  /** Set once counsel confirms governing jurisdiction. */
  jurisdiction: null as string | null,

  termsUpdatedAt: "August 11, 2026",
  privacyEffectiveAt: "August 11, 2026",
} as const;

export const legalMailto = {
  support: `mailto:${legalConfig.supportEmail}`,
  privacy: `mailto:${legalConfig.privacyEmail}`,
} as const;
