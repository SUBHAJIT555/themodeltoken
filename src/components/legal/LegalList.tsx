import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type LegalListProps = {
  items: ReactNode[];
  ordered?: boolean;
  className?: string;
};

export function LegalList({ items, ordered = false, className }: LegalListProps) {
  const List = ordered ? "ol" : "ul";

  return (
    <List
      className={cn(
        "my-2 list-outside space-y-2 pl-6 text-base leading-7 text-[#344054]",
        ordered ? "list-decimal" : "list-disc",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </List>
  );
}
