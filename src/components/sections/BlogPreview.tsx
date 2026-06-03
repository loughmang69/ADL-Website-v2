import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch } from "@/lib/sanity/client";
import { LATEST_3_POSTS_QUERY } from "@/lib/sanity/queries";
import type { BlogPostListItem } from "@/lib/sanity/types";
import BlogCard from "@/components/ui/BlogCard";

export default async function BlogPreview() {
  const posts = await sanityFetch<BlogPostListItem[]>(
    LATEST_3_POSTS_QUERY,
    {},
    [],
  );

  // No posts yet -> render nothing (no empty state needed).
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-surface-soft px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              Insights
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
              From the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy transition-colors hover:text-accent"
          >
            View all posts
            <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} excerptLength={120} />
          ))}
        </div>
      </div>
    </section>
  );
}
