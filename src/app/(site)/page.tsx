import type { Metadata } from "next";
import { SITE } from "@/data/content";
import JsonLd from "@/components/ui/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import About from "@/components/sections/About";
import Packages from "@/components/sections/Packages";
import Testimonials from "@/components/sections/Testimonials";
import Reviews from "@/components/sections/Reviews";
import ContactForm from "@/components/sections/ContactForm";
import BlogPreview from "@/components/sections/BlogPreview";

const description =
  "Bay Area CPA and business consultant serving small business owners in Fremont, CA. Accounting, bookkeeping, tax, payroll, and advisory services.";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Bay Area CPA & Business Advisor` },
  description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} | Bay Area CPA & Business Advisor`,
    description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Bay Area CPA & Business Advisor`,
    description,
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <Services />
      <HowItWorks />
      <About />
      <Packages />
      <Testimonials />
      <Reviews />
      <ContactForm />
      <BlogPreview />
    </>
  );
}
