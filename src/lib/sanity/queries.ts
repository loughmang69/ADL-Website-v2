export const ALL_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, category, excerpt, featuredImage, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, category, excerpt, featuredImage, body, seoTitle, seoDescription,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
}`;

export const POST_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)].slug.current`;

export const LATEST_3_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0..2] {
  _id, title, slug, publishedAt, category, excerpt, featuredImage,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
}`;

export const RELATED_POSTS_QUERY = `*[_type == "blogPost" && category == $category && slug.current != $slug] | order(publishedAt desc) [0..2] {
  _id, title, slug, publishedAt, category, excerpt, featuredImage,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
}`;

/** Latest posts in any of the given categories (used by service detail pages). */
export const POSTS_BY_CATEGORIES_QUERY = `*[_type == "blogPost" && category in $categories] | order(publishedAt desc) [0..2] {
  _id, title, slug, publishedAt, category, excerpt, featuredImage,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
}`;

export const APPROVED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && approved == true] | order(_createdAt desc) {
  _id, name, role, stars, text
}`;
