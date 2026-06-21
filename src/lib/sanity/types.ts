import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanitySlug {
  current: string;
  _type?: "slug";
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export type BlogCategory =
  | "Tax"
  | "Accounting"
  | "Payroll"
  | "Technology"
  | "Business Strategy"
  | "Personal Finance";

/** Shape returned by ALL_POSTS_QUERY / LATEST_3_POSTS_QUERY (card view). */
export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  category?: BlogCategory;
  excerpt?: string;
  featuredImage?: SanityImage;
  estimatedReadingTime?: number;
}

/** Shape returned by POST_BY_SLUG_QUERY (full post). */
export interface BlogPost extends BlogPostListItem {
  _updatedAt: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

/** Shape returned by POST_SITEMAP_QUERY (slug + last-modified, for the sitemap). */
export interface BlogPostSitemapItem {
  slug: string;
  _updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  stars?: number;
  text: string;
}

/** Helper alias re-exported for image builder consumers. */
export type { SanityImageSource };
