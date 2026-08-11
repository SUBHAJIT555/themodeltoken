import { cn } from "@/lib/cn";

type BrandIconProps = {
  className?: string;
  size?: number | string;
  title?: string;
};

/**
 * TheModelToken mark — hexagonal token head + AI nodes + antenna.
 * Uses currentColor for black / white / accent contexts.
 */
export function BrandIcon({ className, size = 24, title }: BrandIconProps) {
  const dim = typeof size === "number" ? size : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      width={dim ?? size}
      height={dim ?? size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* Antenna stem + node */}
      <path
        d="M12 4.2V6.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="3.2" r="1.15" fill="currentColor" />

      {/* Token / hex head */}
      <path
        d="M12 6.6 17.4 9.7v6.2L12 19 6.6 15.9V9.7L12 6.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Eye nodes */}
      <circle cx="9.7" cy="12.1" r="1.05" fill="currentColor" />
      <circle cx="14.3" cy="12.1" r="1.05" fill="currentColor" />

      {/* Inner token diamond */}
      <path
        d="M12 13.35 13.35 14.7 12 16.05 10.65 14.7Z"
        fill="currentColor"
      />

      {/* Model connection notch */}
      <path
        d="M10.35 18.55 12 20.8 13.65 18.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
