import Link from "next/link";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
  href?: string | null;
  /** Show wordmark beside the icon (default true). */
  showWordmark?: boolean;
  /** Icon size in px */
  iconSize?: number;
  /** Invert colors for dark surfaces (footer). */
  inverted?: boolean;
};

/**
 * Horizontal brand lockup: [icon] + lowercase wordmark
 */
export function BrandLogo({
  className,
  href = "/",
  showWordmark = true,
  iconSize = 24,
  inverted = false,
}: BrandLogoProps) {
  const wordmark = "the" + "model" + "token";
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-[8px]",
        inverted ? "text-white" : "text-[var(--th-heading)]",
        className,
      )}
    >
      <BrandIcon size={iconSize} />
      {showWordmark ? (
        <span className="hidden truncate text-[15px] font-semibold leading-none tracking-[-0.02em] min-[400px]:inline sm:text-[17px]">
          {wordmark}
        </span>
      ) : null}
    </span>
  );

  if (href === null) {
    return content;
  }

  return (
    <Link
      href={href}
      className="inline-flex min-w-0 shrink-0 items-center no-underline"
      aria-label="TheModelToken"
    >
      {content}
    </Link>
  );
}
