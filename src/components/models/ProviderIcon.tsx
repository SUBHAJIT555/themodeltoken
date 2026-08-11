import Image from "next/image";
import {
  getProviderConfig,
  resolveProviderId,
  type ProviderConfig,
} from "@/config/providers";
import { cn } from "@/lib/cn";

type Size = "card" | "filter" | "drawer";

type Props = {
  providerIcon: string;
  providerName: string;
  size?: Size;
  /** Invert for dark/active filter pills */
  invert?: boolean;
  className?: string;
};

function iconClassFor(config: ProviderConfig, size: Size) {
  if (size === "filter") return config.filterIconClassName;
  if (size === "drawer") return config.drawerIconClassName;
  return config.cardIconClassName;
}

function wrapperClassFor(size: Size) {
  if (size === "filter") return null;
  if (size === "drawer") {
    return "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e7e7e7] bg-white";
  }
  // card: ~40px circular badge
  return "grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#e7e7e7] bg-white";
}

export function ProviderIcon({
  providerIcon,
  providerName,
  size = "card",
  invert = false,
  className,
}: Props) {
  const known = resolveProviderId(providerIcon, providerName);
  const config = getProviderConfig(providerIcon, providerName);
  const iconClass = iconClassFor(config, size);
  const wrap = wrapperClassFor(size);
  const initial = Array.from(providerName)[0] ?? "?";

  const content = known ? (
    <Image
      src={config.icon}
      alt=""
      width={40}
      height={40}
      className={cn(
        "object-contain",
        iconClass,
        invert && "brightness-0 invert",
      )}
    />
  ) : (
    <span
      className={cn(
        "text-[10px] font-semibold text-black/45",
        size === "filter" && "text-[9px]",
        invert && "text-white/80",
      )}
    >
      {initial}
    </span>
  );

  if (!wrap) {
    return (
      <span
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center",
          className,
        )}
      >
        {content}
      </span>
    );
  }

  return <div className={cn(wrap, className)}>{content}</div>;
}
