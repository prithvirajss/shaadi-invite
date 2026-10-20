import type { Metadata, Viewport } from "next";
import { Yatra_One, Mukta, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { config, siteMeta } from "@/content";

const hindiHeading = Yatra_One({
  variable: "--font-hindi-heading",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
});

const hindiBody = Mukta({
  variable: "--font-hindi-body",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const englishFont = Cormorant_Garamond({
  variable: "--font-english",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B0F1A",
};

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: siteMeta.titleHi,
  description: siteMeta.ogDescription,
  openGraph: {
    title: siteMeta.ogTitle,
    description: siteMeta.ogDescription,
    url: config.siteUrl,
    siteName: siteMeta.titleHi,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteMeta.ogTitle,
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.ogTitle,
    description: siteMeta.ogDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="hi"
      className={`${hindiHeading.variable} ${hindiBody.variable} ${englishFont.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-hindi-body bg-royal-texture antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
