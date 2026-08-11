"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Volume2, X } from "lucide-react";
import { siteConfig } from "@/config/site";

function applyBannerOffset(visible: boolean) {
  const root = document.documentElement;
  root.style.setProperty("--th-banner-height", visible ? "36px" : "0px");
  root.dataset.banner = visible ? "visible" : "hidden";
}

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    applyBannerOffset(visible);
    return () => {
      applyBannerOffset(true);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="announcement-banner-wrapper relative flex h-[var(--th-banner-height)] w-full select-none items-center justify-center overflow-hidden bg-[var(--th-bg-announcement)] text-white"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
      role="region"
      aria-label="Announcement"
    >
      <div className="flex w-full items-center justify-center px-10 sm:px-12">
        <Link
          href={siteConfig.announcement.href}
          className="group flex max-w-full cursor-pointer items-center rounded-full px-2.5 py-1 text-current no-underline transition-all hover:bg-white/15 sm:px-3.5"
        >
          <Volume2
            className="mr-2 size-[15px] shrink-0 text-white"
            strokeWidth={2}
            aria-hidden
          />
          <span className="flex min-w-0 items-center text-xs font-medium tracking-wide transition-opacity duration-300 opacity-100 sm:text-sm">
            <span className="truncate">
              {siteConfig.announcement.text}
            </span>
            <ChevronRight
              className="ml-1 size-[13px] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </Link>
      </div>

      <button
        type="button"
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-3"
        onClick={() => setVisible(false)}
      >
        <X className="size-[15px]" strokeWidth={2} />
      </button>
    </div>
  );
}
