import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { POST_SITEMAP_QUERY } from "@/lib/sanity/queries";
import type { BlogPostSitemapItem } from "@/lib/sanity/types";
import { SITE } from "@/data/content";
import { SERVICES } from "@/data/services";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<BlogPostSitemapItem[]>(
    POST_SITEMAP_QUERY,
    {},
    [],
  );

  /**
   * The listing at /blog is a view over the posts, so the newest post
   * _updatedAt is a real modification date for it rather than a guess.
   * (A deleted post is the one case this would not move; adds and edits both
   * do.) _updatedAt is an ISO-8601 UTC string, so a lexicographic max is
   * also the chronological one.
   *
   * The other static routes deliberately keep no lastModified. Their content
   * lives in source files, and nothing at runtime knows when those last
   * changed: build time would churn the date on every unrelated deploy, and
   * anything else would be hardcoded. No lastmod is better than a wrong one.
   */
  const latestPostUpdate = posts.reduce<string | undefined>(
    (latest, post) =>
      !latest || post._updatedAt > latest ? post._updatedAt : latest,
    undefined,
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE.url}/blog`,
      lastModified: latestPostUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
