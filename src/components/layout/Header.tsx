"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { mainNavigation } from "@/config/navigation";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useCallbackModal } from "@/components/layout/CallbackModalProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCallback } = useCallbackModal();

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleRequestCallback = useCallback(() => {
    setMobileOpen(false);
    openCallback();
  }, [openCallback]);

  return (
    <>
      <AnnouncementBanner />

      <div className="pointer-events-none fixed inset-x-0 top-[var(--th-nav-shell-top)] z-50 mx-auto w-full max-w-[var(--th-nav-max)] px-3 transition-[top,padding] duration-500 ease-in-out sm:px-5 md:top-[var(--th-nav-top)]">
        <nav
          aria-label="Primary"
          className="pointer-events-auto mx-auto flex h-[var(--th-nav-height)] max-w-[var(--th-navbar-max)] items-center overflow-visible rounded-[var(--th-radius-nav)] border border-black/10 bg-white/90 text-[var(--th-heading)] shadow-none backdrop-blur-xl transition-[height] duration-500 ease-in-out"
        >
          <header className="flex h-[var(--th-nav-header-height)] w-full items-center justify-between gap-3 px-3 transition-[height,padding] duration-500 ease-in-out sm:px-5">
            <BrandLogo
              className="max-w-[148px] sm:max-w-none [&_svg]:size-6 sm:[&_svg]:size-7"
              iconSize={28}
            />

            <div className="hidden items-center lg:flex">
              {mainNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm transition-colors duration-200 ease-out",
                      active
                        ? "text-[rgb(33,37,41)]"
                        : "text-[rgba(33,37,41,0.8)] hover:text-[rgb(33,37,41)]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center lg:flex">
              <Button
                type="button"
                variant="signup"
                size="sm"
                className="rounded-full"
                onClick={handleRequestCallback}
              >
                Request CallBack
              </Button>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 text-[var(--th-text-primary)] lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4" />
            </button>
          </header>
        </nav>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobileMenu}
        onRequestCallback={handleRequestCallback}
      />
    </>
  );
}
