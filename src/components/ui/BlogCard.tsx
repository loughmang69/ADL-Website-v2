import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { BlogPostListItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/client";
import { formatDate, truncate, readTimeLabel } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostListItem;
  /** Max characters for the excerpt (140 on listing, 120 in preview). */
  excerptLength?: number;
}

export default function BlogCard({ post, excerptLength = 140 }: BlogCardProps) {
  const href = `/blog/${post.slug.current}`;
  const imageUrl = post.featuredImage
    ? urlForImage(post.featuredImage).width(800).height(450).fit("crop").url()
    : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-deepest/[0.08] bg-white transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:border-accent hover:shadow-xl hover:shadow-navy/5 focus-within:border-accent">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-deepest">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-deep to-navy-deepest">
            <span className="text-3xl font-black tracking-tighter text-accent">
              ADL
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-soft">
          {post.category && (
            <span className="rounded-full bg-accent-dim px-3 py-1 font-bold uppercase tracking-[0.1em] text-navy">
              {post.category}
            </span>
          )}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{readTimeLabel(post.estimatedReadingTime)}</span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-navy-deepest">
          <Link
            href={href}
            className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            {truncate(post.excerpt, excerptLength)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-soft transition-[gap] duration-150 group-hover:gap-2.5">
          Read more
          <ArrowRightIcon size={16} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
