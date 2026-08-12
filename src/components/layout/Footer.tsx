import Link from "next/link";
import {
  footerCompanyNavigation,
  footerSupportNavigation,
  legalNavigation,
} from "@/config/navigation";
import { siteConfig, siteMailto } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--th-bg-footer)] text-white">
      <Container className="pt-12 pb-8 sm:pt-16">
        <div className="mb-16 grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="mb-4">
              <BrandLogo inverted iconSize={28} />
            </div>
            <p className="mb-4 max-w-[280px] font-serif text-sm italic text-white/50">
              {siteConfig.tagline}
            </p>
            <div className="mb-5 max-w-[300px] space-y-1 text-sm leading-relaxed text-white/55">
              <p className="font-medium text-white/75">{siteConfig.legalEntity}</p>
              <p>Permission Number {siteConfig.address.permissionNumber}</p>
              <p>{siteConfig.address.buildingName}</p>
              <p>
                <a
                  href={siteMailto}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-white/70">
              <span className="size-2 rounded-full bg-[var(--th-status)]" />
              {siteConfig.status}
            </span>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {footerCompanyNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label === "Blogs" ? "Blog" : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {footerSupportNavigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.name}. All Rights Reserved.
          </span>
          {/* <span className="inline-flex items-center gap-1.5 text-white/40">
            Develop with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="size-4 shrink-0"
              aria-hidden
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                fill="rgba(255,255,255,0.4)"
                d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
              />
        
            </svg>
            by{" "}
            <a
              href="https://subhajit-dhali.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-white"
            >
              Subhajit
            </a>
          </span> */}
        </div>
      </Container>
    </footer>
  );
}
