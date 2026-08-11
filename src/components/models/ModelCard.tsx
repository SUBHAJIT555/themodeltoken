"use client";

import type { MouseEvent } from "react";
import {
  Brain,
  Code2,
  Copy,
  Layers3,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  formatUsd,
  formatUsdPerM,
  type ModelItem,
  type ModelModality,
} from "@/data/models";
import { ModalityIcon } from "@/components/models/ModalityIcon";
import { ProviderIcon } from "@/components/models/ProviderIcon";
import { cn } from "@/lib/cn";

function capabilityIcon(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("reason")) return Brain;
  if (t.includes("tool") || t.includes("function")) return Wrench;
  if (t.includes("long") || t.includes("context")) return Layers3;
  if (t.includes("structur")) return Code2;
  if (t.includes("search") || t.includes("web")) return Search;
  return Sparkles;
}

function ModalityIcons({
  label,
  types,
}: {
  label: string;
  types: ModelModality[];
}) {
  if (!types.length) return null;
  return (
    <div className="th-models-card-mod">
      <span className="th-models-card-mod-label">{label}</span>
      <div className="th-models-card-mod-icons">
        {types.map((mod) => (
          <ModalityIcon key={mod} modality={mod} size="inline" />
        ))}
      </div>
    </div>
  );
}

function PriceCols({ model }: { model: ModelItem }) {
  if (model.pricing.type === "request") {
    return (
      <div className="th-models-card-prices">
        <div className="th-models-card-price">
          <span className="th-models-card-price-label">PER REQ</span>
          <span className="th-models-card-price-value">
            {formatUsd(model.pricing.perRequest)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="th-models-card-prices">
      {model.contextLabel ? (
        <div className="th-models-card-price">
          <span className="th-models-card-price-label">CONTEXT</span>
          <span className="th-models-card-price-value">{model.contextLabel}</span>
        </div>
      ) : null}
      <div className="th-models-card-price">
        <span className="th-models-card-price-label">INPUT</span>
        <span className="th-models-card-price-value">
          {formatUsdPerM(model.pricing.input)}
        </span>
      </div>
      <div className="th-models-card-price">
        <span className="th-models-card-price-label">OUTPUT</span>
        <span className="th-models-card-price-value">
          {formatUsdPerM(model.pricing.output)}
        </span>
      </div>
    </div>
  );
}

type Props = {
  model: ModelItem;
  selected?: boolean;
  onSelect: () => void;
};

export function ModelCard({ model, selected, onSelect }: Props) {
  const copyName = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(model.name);
    } catch {
      /* ignore */
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn("th-models-card", selected && "is-selected")}
    >
      <div className="th-models-card-header">
        <div className="th-models-card-identity">
          <ProviderIcon
            providerIcon={model.providerIcon}
            providerName={model.provider}
            size="card"
          />
          <div className="th-models-card-titles">
            <div className="th-models-card-name-row">
              <h3 className="th-models-card-name" translate="no">
                {model.name}
              </h3>
              <button
                type="button"
                aria-label={`Copy ${model.name}`}
                onClick={copyName}
                className="th-models-card-copy"
              >
                <Copy className="size-3.5" />
              </button>
            </div>
            <p className="th-models-card-provider">{model.provider}</p>
          </div>
        </div>
        <PriceCols model={model} />
      </div>

      <p className="th-models-card-desc">{model.description}</p>

      <div className="th-models-card-mods">
        <ModalityIcons label="Input Type:" types={model.inputTypes} />
        <ModalityIcons label="Output Type:" types={model.outputTypes} />
      </div>

      {model.capabilities.length ? (
        <div className="th-models-card-tags">
          {model.capabilities.map((tag) => {
            const Icon = capabilityIcon(tag);
            return (
              <span key={tag} className="th-models-card-tag">
                <Icon className="size-3 opacity-60" aria-hidden />
                {tag}
              </span>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}
