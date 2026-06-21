import { SITE } from "@/data/content";
import type { BlogPost } from "@/lib/sanity/types";
import type { Service, ServiceFaq } from "@/data/services";

/** Maps URL/Google Business Profile entity. Reused as @id across builders. */
const LOCAL_BUSINESS_ID = `${SITE.url}/#localbusiness`;
const MAPS_URL = "https://maps.google.com/?cid=17174186483068452930";

/** Cities ADL serves, as schema.org City objects plus a final region string. */
const AREA_SERVED: Array<Record<string, unknown> | string> = [
  { "@type": "City", name: "Fremont" },
  { "@type": "City", name: "Newark" },
  { "@type": "City", name: "Union City" },
  { "@type": "City", name: "Milpitas" },
  { "@type": "City", name: "Hayward" },
  { "@type": "City", name: "San Jose" },
  "East Bay, San Francisco Bay Area",
];

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    telephone: "+15103202724",
    email: SITE.email,
    image: `${SITE.url}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: "US",
    },
    areaServed: AREA_SERVED,
    sameAs: [
      "https://www.linkedin.com/in/garrettloughman/",
      MAPS_URL,
    ],
    hasMap: MAPS_URL,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    knowsAbout: [
      "bookkeeping",
      "small business tax",
      "entity structure",
      "payroll compliance",
      "QuickBooks",
    ],
    founder: {
      "@type": "Person",
      name: SITE.founderName,
      jobTitle: "CPA",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "CPA",
        recognizedBy: {
          "@type": "Organization",
          name: "California Board of Accountancy",
        },
      },
    },
  };
}

/** Service schema for a service detail page; provider references the LocalBusiness. */
export function serviceJsonLd(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${SITE.url}/services/${service.slug}`,
    provider: {
      "@type": ["LocalBusiness", "AccountingService"],
      "@id": LOCAL_BUSINESS_ID,
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: AREA_SERVED,
  };
}

/** FAQPage schema built from a service's FAQ list. */
export function faqJsonLd(faqs: ServiceFaq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema from an ordered list of {name, url} items. */
export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingJsonLd(
  post: BlogPost,
  imageUrl?: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    url: `${SITE.url}/blog/${post.slug.current}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    author: {
      "@type": "Person",
      name: SITE.founderName,
      jobTitle: "CPA",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    ...(post.category ? { articleSection: post.category } : {}),
  };
}
