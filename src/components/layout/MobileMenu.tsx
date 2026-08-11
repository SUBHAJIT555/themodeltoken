"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { mainNavigation, secondaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onRequestCallback: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu({
  open,
  onClose,
  onRequestCallback,
}: MobileMenuProps) {
  const pathname = usePathname();
  const items = [...mainNavigation, ...secondaryNavigation];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          <motion.nav
            aria-label="Mobile"
            className="absolute inset-x-3 top-[calc(var(--th-nav-shell-top)+var(--th-nav-height)+8px)] max-h-[min(80vh,640px)] overflow-y-auto rounded-[var(--th-radius-nav)] border border-[var(--th-border)] bg-[var(--th-bg-nav)] p-5 shadow-lg backdrop-blur-xl sm:inset-x-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--th-text-primary)]">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--th-border)] text-[var(--th-text-primary)]"
              >
                <X className="size-4" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-sm transition-colors duration-200 ease-out",
                        active
                          ? "bg-black/5 text-[var(--th-text-primary)]"
                          : "text-[var(--th-text-secondary)] hover:bg-black/5 hover:text-[var(--th-text-primary)]",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 border-t border-[var(--th-border)] pt-4">
              <Button
                type="button"
                variant="signup"
                size="sm"
                className="w-full rounded-full"
                onClick={onRequestCallback}
              >
                Request CallBack
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
