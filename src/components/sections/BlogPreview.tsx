import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch } from "@/lib/sanity/client";
import { LATEST_3_POSTS_QUERY } from "@/lib/sanity/queries";
import type { BlogPostListItem } from "@/lib/sanity/types";
import BlogCard from "@/components/ui/BlogCard";
import Reveal from "@/components/ui/Reveal";

export default async function BlogPreview() {
  const posts = await sanityFetch<BlogPostListItem[]>(
    LATEST_3_POSTS_QUERY,
    {},
    [],
  );

  // No posts yet -> render nothing (no empty state needed).
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
                Insights
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
                From the Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy transition-colors hover:text-navy-deep"
            >
              View all posts
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* Asymmetric: the most recent post takes two thirds with a longer
            excerpt, the next two stack beside it. Avoids a third identical
            three-up grid on a page that already had two. Falls back to a plain
            stack below lg, and to a single column if only one post exists. */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className={featured ? "lg:col-span-2" : undefined}>
            <BlogCard post={featured} excerptLength={220} />
          </Reveal>
          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              {rest.map((post, i) => (
                <Reveal key={post._id} delay={(i + 1) * 70} className="h-full">
                  <BlogCard post={post} excerptLength={100} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
