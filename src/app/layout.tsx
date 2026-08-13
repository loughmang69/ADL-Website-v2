import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE } from "@/data/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display face, used only for the hero h1 and section h2s via `font-display`.
 * Geist still carries all body, UI, and navigation text. Loading it here (not
 * per-component) keeps it in the same `next/font` pipeline as Geist, so it is
 * self-hosted and preloaded rather than fetched from a font CDN at runtime.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Fremont, CA CPA for Small Businesses | ADL Business Consulting",
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "Fremont, CA CPA and business consultant for small business owners across the East Bay. Accounting, bookkeeping, tax, payroll, and advisory services.",
  applicationName: SITE.name,
  authors: [{ name: SITE.founderName }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches the new page ground. The site no longer opens on a dark surface.
  themeColor: "#EEF3FC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
