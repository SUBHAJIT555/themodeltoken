import Image from "next/image";
import {
  getModalityConfig,
  type ModelModality,
} from "@/config/modalities";
import { cn } from "@/lib/cn";

type Size = "filter" | "inline";

type Props = {
  modality: ModelModality;
  size?: Size;
  /** Invert for black selected pills */
  invert?: boolean;
  className?: string;
};

const SIZE_CLASS: Record<Size, string> = {
  filter: "size-4",
  inline: "size-4",
};

export function ModalityIcon({
  modality,
  size = "inline",
  invert = false,
  className,
}: Props) {
  const config = getModalityConfig(modality);

  return (
    <Image
      src={config.icon}
      alt=""
      width={16}
      height={16}
      className={cn(
        "block shrink-0 object-contain",
        SIZE_CLASS[size],
        invert && "invert",
        className,
      )}
    />
  );
}
