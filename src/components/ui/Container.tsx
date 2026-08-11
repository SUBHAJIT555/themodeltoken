import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Content width: max-w-7xl (1280px)
 * Gutters: 16px → 24px (sm+)
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--th-container)] px-4 sm:px-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}
