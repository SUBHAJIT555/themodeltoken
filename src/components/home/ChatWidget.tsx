"use client";

import { BrandIcon } from "@/components/brand/BrandIcon";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";

/**
 * Floating support entry — opens Request Callback modal.
 */
export function ChatWidget() {
  const { openCallback } = useCallbackModal();

  return (
    <button
      type="button"
      onClick={openCallback}
      aria-label="Request a callback"
      className="fixed bottom-5 right-4 z-50 flex size-11 items-center justify-center text-[var(--th-accent)] transition-transform hover:scale-110 active:scale-95 sm:bottom-7 sm:right-9 sm:size-12"
    >
      <BrandIcon size={44} className="drop-shadow-md" title="TheModelToken" />
    </button>
  );
}
