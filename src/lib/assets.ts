/**
 * Cache-busting for files in /public.
 *
 * Hashed bundles under /_next/static are versioned automatically by Next.js,
 * but raw files in /public are served under a stable path — replacing one in
 * place (same filename) lets browsers and the edge keep serving the old bytes.
 *
 * Appending a version query string gives the asset a new URL on each change,
 * which forces a fresh fetch. Bump the number on the right whenever you replace
 * the underlying file.
 */
const ASSET_VERSIONS: Record<string, number> = {
  "/uploads/headshot.jpg": 1,
};

/** Returns a /public asset path with its cache-busting version appended. */
export function asset(path: string): string {
  const v = ASSET_VERSIONS[path];
  return v ? `${path}?v=${v}` : path;
}
