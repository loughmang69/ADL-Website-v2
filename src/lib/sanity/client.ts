import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/** True only when a Sanity project is actually configured. */
export const sanityConfigured = projectId.length > 0;

/** Read-only client used by Server Components and ISR data fetching. */
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Write-enabled client for server-side mutations (testimonial submissions).
 * Returns null if no token is configured so callers can fail gracefully.
 * NEVER import this into a Client Component — it reads a server-only secret.
 */
export function getWriteClient(): SanityClient | null {
  const token = process.env.SANITY_API_TOKEN;
  if (!token || !sanityConfigured) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

/**
 * Read query helper that fails soft: returns `fallback` when Sanity is not
 * configured or the request errors, so pages still render (and the build
 * succeeds) without a populated dataset.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      // Time-based fallback (60s) plus a shared "sanity" cache tag so the
      // /api/revalidate webhook can purge every Sanity-backed page instantly
      // when content is published or edited in the Studio.
      next: { revalidate: 60, tags: ["sanity"] },
    });
  } catch (err) {
    console.error(
      "Sanity fetch failed:",
      err instanceof Error ? err.message : "unknown",
    );
    return fallback;
  }
}

const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/** Parse intrinsic dimensions encoded in a Sanity image asset _ref. */
export function imageRefDimensions(
  ref?: string,
): { width: number; height: number } | null {
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
