import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "relative pt-[var(--th-header-clearance)] pb-16 md:pb-24",
        className,
      )}
    >
      <div className="th-dot-grid pointer-events-none absolute inset-0 z-0 opacity-100" />
      <Container className="relative z-10">
        <div className="mb-10 max-w-3xl space-y-3">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--th-text-muted-theme)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-serif text-[clamp(36px,6vw,60px)] font-normal leading-[1.05] tracking-normal text-[var(--th-heading)]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-[600px] text-base leading-relaxed text-[var(--th-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </div>
  );
}
