import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type LegalSectionProps = {
  id?: string;
  title: string;
  level?: 2 | 3;
  children: ReactNode;
  className?: string;
};

export function LegalSection({
  id,
  title,
  level = 3,
  children,
  className,
}: LegalSectionProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <section id={id} className={cn(className)}>
      <Heading
        className={cn(
          "font-semibold text-[#344054]",
          level === 2
            ? "mt-12 mb-4 text-2xl leading-[30px]"
            : "mt-8 mb-4 text-xl leading-[25px]",
        )}
      >
        {title}
      </Heading>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type LegalSubheadingProps = {
  children: ReactNode;
  className?: string;
};

export function LegalSubheading({ children, className }: LegalSubheadingProps) {
  return (
    <p className={cn("font-semibold text-[#344054]", className)}>{children}</p>
  );
}
