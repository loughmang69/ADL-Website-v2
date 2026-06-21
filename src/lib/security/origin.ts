/**
 * CSRF defense-in-depth: confirm a state-changing request originated from our
 * own site. We compare the `Origin` header's host against the `Host` the
 * request was actually sent to, so this works in local dev, Vercel previews,
 * and production without hardcoding a domain.
 *
 * A missing `Origin` is allowed: browsers always send it on cross-origin POSTs,
 * so its absence means a same-origin request or a non-browser caller (the
 * honeypot, rate limiting, and Zod validation cover those cases). A present but
 * mismatched or malformed `Origin` (including the literal "null" from sandboxed
 * iframes) is rejected.
 */
export function isAllowedOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return true;

  const host = headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
