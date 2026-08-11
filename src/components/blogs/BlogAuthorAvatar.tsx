import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  className?: string;
};

/** Circular author mark using the current BrandIcon (not legacy flame art). */
export function BlogAuthorAvatar({ size = 32, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[var(--brand-accent,#fa5902)]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <BrandIcon size={Math.round(size * 0.62)} />
    </span>
  );
}
