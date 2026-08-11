import catalog from "@/data/models.catalog.json";
import { getProviderConfig, resolveProviderId } from "@/config/providers";
import {
  INPUT_MODALITIES,
  OUTPUT_MODALITIES,
  type ModelModality,
} from "@/config/modalities";

export type { ModelModality };
export { INPUT_MODALITIES, OUTPUT_MODALITIES };

export type ModelPricing =
  | { type: "token"; input: number; output: number; cacheRead?: number }
  | { type: "request"; perRequest: number };

export type ModelItem = {
  id: string;
  name: string;
  provider: string;
  providerId: number;
  providerIcon: string;
  description: string;
  contextLabel: string | null;
  contextTokens: number;
  pricing: ModelPricing;
  inputTypes: ModelModality[];
  outputTypes: ModelModality[];
  capabilities: string[];
};

export type ModelProvider = {
  id: number;
  name: string;
  icon: string;
};

/** TheModelToken context slider stops (labels shown for 4k / 64k / 1M + active). */
export const CONTEXT_STOPS = [
  { label: "4k", tokens: 4_000 },
  { label: "16k", tokens: 16_000 },
  { label: "32k", tokens: 32_000 },
  { label: "64k", tokens: 64_000 },
  { label: "128k", tokens: 128_000 },
  { label: "256k", tokens: 256_000 },
  { label: "1M", tokens: 1_000_000 },
] as const;

/** Indices that always show a label under the tick row. */
export const CONTEXT_LABEL_INDICES = new Set([0, 3, 6]);

export const modelsCatalog = catalog.models as ModelItem[];
export const modelProviders = catalog.providers as ModelProvider[];

export function modalityIconSrc(mod: ModelModality): string {
  if (mod === "file") return "/models/modalities/docs.svg";
  return `/models/modalities/${mod}.svg`;
}

/** Prefer `<ProviderIcon />` in UI; kept for any non-component callers. */
export function providerLogoSrc(icon: string, provider: string): string | null {
  if (!resolveProviderId(icon, provider)) return null;
  return getProviderConfig(icon, provider).icon;
}

export function formatUsd(value: number): string {
  if (value < 0.01) return `$${value.toFixed(6)}`;
  return `$${value.toFixed(4)}`;
}

export function formatUsdPerM(value: number): string {
  return `${formatUsd(value)}/M`;
}
