"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

/** Button that opens the shared Request Callback modal. */
export function CallbackAction({ children, className, ...props }: Props) {
  const { openCallback } = useCallbackModal();

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={openCallback}
      {...props}
    >
      {children}
    </button>
  );
}
