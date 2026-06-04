import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch, urlForImage } from "@/lib/sanity/client";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/lib/sanity/queries";
import type { BlogPost, BlogPostListItem } from "@/lib/sanity/types";
import { SITE } from "@/data/content";
import { blogPostingJsonLd } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import PostHeader from "@/components/blog/PostHeader";
import PostBody from "@/components/blog/PostBody";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedService from "@/components/blog/RelatedService";
import RelatedPosts from "@/components/blog/RelatedPosts";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await sanityFetch<string[]>(POST_SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(POST_BY_SLUG_QUERY, { slug }, null);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription ||
    post.excerpt ||
    `An article from ${SITE.name} on ${post.category ?? "small business finance"}.`;
  const ogImage = post.featuredImage
    ? urlForImage(post.featuredImage).width(1200).height(630).fit("crop").url()
    : "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = post.category
    ? await sanityFetch<BlogPostListItem[]>(
        RELATED_POSTS_QUERY,
        { category: post.category, slug },
        [],
      )
    : [];

  const ogImage = post.featuredImage
    ? urlForImage(post.featuredImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return (
    <article className="bg-white px-6 pb-24 pt-32">
      <JsonLd data={blogPostingJsonLd(post, ogImage)} />
      <div className="mx-auto max-w-prose">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-navy-soft transition-colors hover:text-accent"
        >
          <ArrowLeftIcon size={16} aria-hidden="true" />
          All posts
        </Link>
        <PostHeader post={post} />
        <div className="mt-8">
          <DisclaimerBanner />
        </div>
        {post.body && post.body.length > 0 && (
          <div className="mt-8">
            <PostBody value={post.body} />
          </div>
        )}
        <RelatedService category={post.category} />
        <AuthorBio />
      </div>
      <div className="mx-auto mt-4 max-w-7xl">
        <RelatedPosts posts={related} />
      </div>
    </article>
  );
}
