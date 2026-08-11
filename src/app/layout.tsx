import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono, Inter } from "next/font/google";
import { FooterGate } from "@/components/layout/FooterGate";
import { Header } from "@/components/layout/Header";
import { CallbackModalProvider } from "@/components/layout/CallbackModalProvider";
import { GsapSetup } from "@/components/animation/GsapSetup";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
    images: [{ url: siteConfig.logo.og, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.logo.og],
  },
  icons: {
    icon: [{ url: "/brand/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalEntity,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.icon}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line,
      addressCountry: "AE",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ebGaramond.variable} ${geistMono.variable} h-full overflow-x-hidden`}
    >
      <body className="relative flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GsapSetup>
          <CallbackModalProvider>
            <Header />
            <main className="relative z-10 flex-1">{children}</main>
            <FooterGate />
          </CallbackModalProvider>
        </GsapSetup>
      </body>
    </html>
  );
}
