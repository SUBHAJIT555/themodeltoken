"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import {
  formatUsd,
  formatUsdPerM,
  type ModelItem,
  type ModelModality,
} from "@/data/models";
import { ModalityIcon } from "@/components/models/ModalityIcon";
import { ProviderIcon } from "@/components/models/ProviderIcon";

const emptySubscribe = () => () => {};

type Props = {
  model: ModelItem | null;
  open: boolean;
  onClose: () => void;
};

function ModRow({ label, types }: { label: string; types: ModelModality[] }) {
  if (!types.length) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-black/45">{label}</span>
      <div className="flex items-center gap-1.5">
        {types.map((mod) => (
          <ModalityIcon key={mod} modality={mod} size="inline" />
        ))}
      </div>
    </div>
  );
}

export function ModelDetailsDrawer({ model, open, onClose }: Props) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && model ? (
        <motion.div
          className="fixed inset-0 z-[200] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close model details"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${model.name} details`}
            className="relative z-10 flex h-full w-full max-w-[500px] flex-col bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.18)] max-sm:max-w-none lg:w-[min(500px,42vw)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-black/5 hover:text-black"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
              <div className="mb-4 flex items-center gap-3">
                <ProviderIcon
                  providerIcon={model.providerIcon}
                  providerName={model.provider}
                  size="drawer"
                />
                <div className="min-w-0">
                  <h2
                    className="truncate text-lg font-semibold text-black sm:text-xl"
                    translate="no"
                  >
                    {model.name}
                  </h2>
                  <p className="text-sm text-black/45">{model.provider}</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-black/65 sm:text-[15px]">
                {model.description}
              </p>

              <div className="mb-6 flex flex-col gap-2.5">
                <ModRow label="Input:" types={model.inputTypes} />
                <ModRow label="Output:" types={model.outputTypes} />
              </div>

              <div className="mb-3 h-px bg-[#ebebeb]" />

              <h3 className="mb-3 text-base font-semibold text-black">
                Group price
              </h3>

              <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
                <div className="border-b border-[#ebebeb] bg-[#fafafa] px-4 py-2.5 text-sm font-medium text-black/70">
                  default
                </div>

                {model.pricing.type === "request" ? (
                  <div className="px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-black/55">Per Request</span>
                      <span className="text-sm font-semibold tabular-nums text-black">
                        {formatUsd(model.pricing.perRequest)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-black/55">Standard Rate</span>
                      <div className="flex gap-6 text-right">
                        <div>
                          <div className="mb-1 text-[11px] uppercase tracking-wide text-black/40">
                            Input
                          </div>
                          <div className="text-sm font-semibold tabular-nums">
                            {formatUsdPerM(model.pricing.input)}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 text-[11px] uppercase tracking-wide text-black/40">
                            Completion
                          </div>
                          <div className="text-sm font-semibold tabular-nums">
                            {formatUsdPerM(model.pricing.output)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {model.pricing.cacheRead != null ? (
                      <div className="flex items-start justify-between gap-4 border-t border-[#f0f0f0] pt-4">
                        <span className="text-sm text-black/55">Cache Read</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold tabular-nums">
                            {formatUsdPerM(model.pricing.cacheRead)}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
