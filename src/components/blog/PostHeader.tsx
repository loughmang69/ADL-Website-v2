import type { BlogPost } from "@/lib/sanity/types";
import { SITE } from "@/data/content";
import { formatDate, readTimeLabel, initials } from "@/lib/utils";

export default function PostHeader({ post }: { post: BlogPost }) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-soft">
        {post.category && (
          <span className="rounded-full bg-accent-dim px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy">
            {post.category}
          </span>
        )}
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{readTimeLabel(post.estimatedReadingTime)}</span>
      </div>

      <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-navy-deepest md:text-5xl">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials(SITE.founderName)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-navy-deepest">
            {SITE.founderName}, CPA
          </span>
          <span className="block text-navy-soft">{SITE.shortName}</span>
        </span>
      </div>
    </header>
  );
}
