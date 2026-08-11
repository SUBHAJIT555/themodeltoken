"use client";

import { RotateCcw, X } from "lucide-react";
import {
  CONTEXT_LABEL_INDICES,
  CONTEXT_STOPS,
  INPUT_MODALITIES,
  OUTPUT_MODALITIES,
  modelProviders,
  type ModelModality,
} from "@/data/models";
import { ModalityIcon } from "@/components/models/ModalityIcon";
import { ProviderIcon } from "@/components/models/ProviderIcon";
import { cn } from "@/lib/cn";

export type ModelsFilterState = {
  inputs: ModelModality[];
  outputs: ModelModality[];
  providers: string[];
  contextIndex: number;
  search: string;
};

type Props = {
  value: ModelsFilterState;
  onChange: (next: ModelsFilterState) => void;
  onReset: () => void;
  modelCount: number;
  mobile?: boolean;
  onCloseMobile?: () => void;
};

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function ModalityButtons({
  items,
  selected,
  onToggle,
}: {
  items: { id: ModelModality; label: string }[];
  selected: ModelModality[];
  onToggle: (id: ModelModality) => void;
}) {
  return (
    <div className="th-models-modality-grid">
      {items.map((item) => {
        const active = selected.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={cn(
              "th-models-modality-btn",
              active && "is-active",
            )}
          >
            <ModalityIcon
              modality={item.id}
              size="filter"
              invert={active}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionDivider() {
  return <div className="mx-4 h-px shrink-0 bg-[#e5e5e5]" />;
}

export function ModelsFilters({
  value,
  onChange,
  onReset,
  modelCount,
  mobile,
  onCloseMobile,
}: Props) {
  const fillPct = (value.contextIndex / (CONTEXT_STOPS.length - 1)) * 100;

  return (
    <div
      className={cn(
        "th-models-sidebar",
        mobile && "relative h-full min-w-0 rounded-none border-0 shadow-none",
      )}
    >
      {mobile ? (
        <button
          type="button"
          aria-label="Close filters"
          onClick={onCloseMobile}
          className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-lg border border-[#e5e5e5] bg-white"
        >
          <X className="size-4" />
        </button>
      ) : null}

      <div className="th-models-sidebar-content">
        <div className={cn("px-4 pb-3 pt-4", mobile && "pr-12")}>
          <h1 className="m-0 text-[22px] font-medium leading-7 text-black sm:text-[26px] sm:leading-8">
            Models
          </h1>
          <p className="m-0 mt-0.5 text-[13px] text-black/45">
            {modelCount} models
          </p>
        </div>

        <SectionDivider />

        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-[12px] font-semibold tracking-[0.08em] text-black/45">
            FILTERS
          </span>
          <button
            type="button"
            aria-label="Reset Filters"
            title="Reset"
            onClick={onReset}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] text-black/45 transition-colors hover:border-[#aaa] hover:text-black"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>

        <SectionDivider />

        <div className="flex min-w-0 flex-col gap-4 px-4 py-6">
          <p className="m-0 text-[13px] font-medium text-black">
            Input Modalities
          </p>
          <ModalityButtons
            items={INPUT_MODALITIES}
            selected={value.inputs}
            onToggle={(id) =>
              onChange({ ...value, inputs: toggle(value.inputs, id) })
            }
          />
        </div>

        <SectionDivider />

        <div className="flex min-w-0 flex-col gap-4 px-4 py-6">
          <p className="m-0 text-[13px] font-medium text-black">
            Output Modalities
          </p>
          <ModalityButtons
            items={OUTPUT_MODALITIES}
            selected={value.outputs}
            onToggle={(id) =>
              onChange({ ...value, outputs: toggle(value.outputs, id) })
            }
          />
        </div>

        <SectionDivider />

        <div className="flex min-w-0 flex-col gap-4 px-4 py-6">
          <p className="m-0 text-[13px] font-medium text-black">Providers</p>
          <div className="th-models-provider-grid">
            {modelProviders.map((provider) => {
              const active = value.providers.includes(provider.name);
              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      providers: toggle(value.providers, provider.name),
                    })
                  }
                  className={cn(
                    "th-models-provider-btn",
                    active && "is-active",
                  )}
                >
                  <ProviderIcon
                    providerIcon={provider.icon}
                    providerName={provider.name}
                    size="filter"
                    invert={active}
                  />
                  <span>{provider.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <SectionDivider />

        <div className="flex min-w-0 flex-col gap-4 px-4 py-6">
          <p className="m-0 text-[13px] font-medium text-black">Context Length</p>
          <div className="th-models-ctx">
            <div className="th-models-ctx-slider-wrap">
              <div className="th-models-ctx-track-inner" aria-hidden>
                <div className="th-models-ctx-track-bg" />
                <div
                  className="th-models-ctx-track-fill"
                  style={{ width: `${fillPct}%` }}
                />
                <div className="th-models-ctx-ticks">
                  {CONTEXT_STOPS.map((stop, i) => (
                    <span
                      key={stop.label}
                      className={cn(
                        "th-models-ctx-tick",
                        i <= value.contextIndex && "is-active",
                      )}
                    />
                  ))}
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={CONTEXT_STOPS.length - 1}
                step={1}
                value={value.contextIndex}
                onChange={(e) =>
                  onChange({
                    ...value,
                    contextIndex: Number(e.target.value),
                  })
                }
                className="th-models-ctx-slider"
                aria-label="Minimum context length"
              />
            </div>
            <div className="th-models-ctx-labels" aria-hidden>
              {CONTEXT_STOPS.map((stop, i) => {
                const show =
                  CONTEXT_LABEL_INDICES.has(i) || i === value.contextIndex;
                return (
                  <span key={stop.label} className="th-models-ctx-label">
                    {show ? stop.label : ""}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
