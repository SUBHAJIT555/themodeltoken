import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type LegalPageLayoutProps = {
  title: string;
  dateLabel: string;
  dateValue: string;
  children: ReactNode;
  className?: string;
};

export function LegalPageLayout({
  title,
  dateLabel,
  dateValue,
  children,
  className,
}: LegalPageLayoutProps) {
  return (
    <div
      className={cn(
        "relative bg-white pt-[var(--th-header-clearance)] pb-16 md:pb-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[680px] px-5 pt-7 sm:px-6 md:px-8">
        <header className="mb-4">
          <h1 className="text-[32px] font-semibold leading-10 tracking-normal text-[#344054]">
            {title}
          </h1>
        </header>

        <div className="legal-content text-base font-normal leading-7 text-[#344054]">
          <p className="mb-4">
            <strong className="font-semibold">{dateLabel}</strong> {dateValue}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
