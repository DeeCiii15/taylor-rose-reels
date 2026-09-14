import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Corinthia, Lora } from "next/font/google";
import "./globals.css";
import ContactRibbon from "./components/ContactRibbon";
import SiteJsonLd from "./components/SiteJsonLd";
import { pageShareMeta } from "@/lib/shareMeta";
import {
  CANONICAL_SITE_URL,
  getSiteUrl,
  LOCAL_KEYWORDS,
  PHOTOGRAPHER_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/siteConfig";

/** Formal calligraphy script — headlines, brand name, and decorative UI */
const signatureScript = Corinthia({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

/** Warm readable serif — body, forms, eyebrows */
const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();
const favicon = (path: string) => `${CANONICAL_SITE_URL}${path}`;

const HOME_PAGE_TITLE = `Florence, SC Photographer | Weddings & Portraits | ${SITE_NAME}`;
const homeShare = pageShareMeta({
  title: HOME_PAGE_TITLE,
  description: SITE_DESCRIPTION,
  url: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: HOME_PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...LOCAL_KEYWORDS],
  authors: [{ name: PHOTOGRAPHER_NAME, url: siteUrl }],
  creator: PHOTOGRAPHER_NAME,
  openGraph: homeShare.openGraph,
  twitter: homeShare.twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: favicon('/favicon-48x48.png'), sizes: '48x48', type: 'image/png' },
      { url: favicon('/favicon-96x96.png'), sizes: '96x96', type: 'image/png' },
      { url: favicon('/favicon-144x144.png'), sizes: '144x144', type: 'image/png' },
      { url: favicon('/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { url: favicon('/favicon.ico'), sizes: '48x48', type: 'image/x-icon' },
      { url: favicon('/favicon-32x32.png'), sizes: '32x32', type: 'image/png' },
      { url: favicon('/favicon-16x16.png'), sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      {
        url: favicon('/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: favicon('/favicon-48x48.png'),
  },
  manifest: favicon('/site.webmanifest'),
  formatDetection: {
    telephone: false,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${signatureScript.variable} antialiased`}
      >
        <SiteJsonLd />
        <div className="relative z-10 min-h-dvh overflow-x-clip max-sm:pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))]">
          {children}
          <ContactRibbon />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
