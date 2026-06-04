import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  themeColor: "#0d1f3c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
