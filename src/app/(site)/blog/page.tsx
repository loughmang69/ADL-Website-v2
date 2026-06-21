import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_POSTS_QUERY } from "@/lib/sanity/queries";
import type { BlogPostListItem } from "@/lib/sanity/types";
import BlogCard from "@/components/ui/BlogCard";
import { SITE } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights & Resources",
  description:
    "Practical articles on tax strategy, bookkeeping, California payroll, and small business finance from a Fremont, CA CPA.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: `Insights & Resources | ${SITE.shortName}`,
    description:
      "Practical articles on tax strategy, bookkeeping, California payroll, and small business finance from a Fremont, CA CPA.",
    url: `${SITE.url}/blog`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default async function BlogListingPage() {
  const posts = await sanityFetch<BlogPostListItem[]>(ALL_POSTS_QUERY, {}, []);

  return (
    <div className="bg-white px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          From the Blog
        </span>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-navy-deepest md:text-6xl">
          Insights &amp; Resources
        </h1>
        <p className="mt-4 max-w-prose text-navy-soft">
          Practical guidance on tax, accounting, payroll, technology, and small
          business finance, written by {SITE.founderName}, CPA.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-navy-soft">
            New articles are on the way. Check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} excerptLength={140} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
