import type { BlogPostListItem } from "@/lib/sanity/types";
import BlogCard from "@/components/ui/BlogCard";

export default function RelatedPosts({
  posts,
}: {
  posts: BlogPostListItem[];
}) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-2xl font-black tracking-tight text-navy-deepest"
      >
        Related Posts
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} excerptLength={120} />
        ))}
      </div>
    </section>
  );
}
