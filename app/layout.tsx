import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import site from "@/site.config";
import { brandCss, googleFontsHref } from "@/lib/brand";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Providers } from "@/components/Providers";
import "./globals.css";

const title = `${site.brand.name}: ${site.brand.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.site.url),
  title: { default: title, template: `%s · ${site.brand.name}` },
  description: site.brand.description,
  applicationName: site.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: site.brand.description,
    url: site.site.url,
    siteName: site.brand.name,
    locale: site.site.ogLocale,
    type: "website",
    images: [{ url: site.site.shareImage.src, alt: site.site.shareImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.brand.description,
    images: [site.site.shareImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: site.colors.paper,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fonts = googleFontsHref();
  return (
    <html lang={site.site.lang}>
      <head>
        {/* Colours and font stacks from site.config.ts */}
        <style dangerouslySetInnerHTML={{ __html: brandCss() }} />
        {fonts && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link rel="stylesheet" href={fonts} />
          </>
        )}
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="fixed top-2 left-2 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="relative z-10 bg-paper outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
