import type { MetadataRoute } from "next";
import { SITE } from "@/data/content";

/**
 * Generates /robots.txt. Allows everything except the Sanity Studio SPA at
 * /studio (already noindex'd via its layout) and explicitly declares the
 * sitemap so crawlers discover it immediately.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
