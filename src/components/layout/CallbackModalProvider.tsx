"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { RequestCallbackModal } from "@/components/layout/RequestCallbackModal";

type CallbackModalContextValue = {
  openCallback: () => void;
  closeCallback: () => void;
};

const CallbackModalContext = createContext<CallbackModalContextValue | null>(
  null,
);

export function CallbackModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openCallback = useCallback(() => setOpen(true), []);
  const closeCallback = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openCallback, closeCallback }),
    [openCallback, closeCallback],
  );

  return (
    <CallbackModalContext.Provider value={value}>
      {children}
      <RequestCallbackModal open={open} onClose={closeCallback} />
    </CallbackModalContext.Provider>
  );
}

export function useCallbackModal() {
  const ctx = useContext(CallbackModalContext);
  if (!ctx) {
    throw new Error("useCallbackModal must be used within CallbackModalProvider");
  }
  return ctx;
}

/** Routes that should open the Request Callback modal instead of navigating. */
export function isCallbackActionHref(href: string) {
  return href === "/console" || href === "/documentation";
}
