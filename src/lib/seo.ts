import { SITE } from "@/data/content";
import type { BlogPost } from "@/lib/sanity/types";

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService"],
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
    areaServed: "San Francisco Bay Area",
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
