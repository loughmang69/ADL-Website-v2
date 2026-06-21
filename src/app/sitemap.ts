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

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
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
