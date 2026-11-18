/**
 * Cloudflare Turnstile: server-side token verification for the contact form.
 *
 * The widget runs in the browser and hands back a short-lived token. This
 * module checks that token with Cloudflare's Siteverify API before the form
 * is allowed to send any email. It stops automated form fillers; people who
 * type a pitch by hand still get through and are handled by `screen.ts`.
 *
 * Keys by environment:
 * - Production (VERCEL_ENV === "production"): the real secret from the
 *   TURNSTILE_SECRET_KEY env var, and the returned hostname must be ours.
 * - Previews and local dev: Cloudflare's documented always-pass test keys, so
 *   the flow can be exercised on *.vercel.app and localhost, which are not
 *   allowed hostnames on the real widget.
 *
 * The site key for each environment is picked in next.config.ts and exposed as
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY.
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Cloudflare's documented test secret: always passes validation. */
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

const PRODUCTION_HOSTNAMES = new Set([
  "adlbusinessconsulting.com",
  "www.adlbusinessconsulting.com",
]);

const isProduction = process.env.VERCEL_ENV === "production";

export type TurnstileResult =
  | { ok: true }
  /** The token was missing, invalid, expired, or for another site. */
  | { ok: false; reason: "failed" }
  /** Cloudflare could not be reached, or the secret is not configured. */
  | { ok: false; reason: "unavailable" };

interface SiteverifyResponse {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstile(
  token: unknown,
  remoteIp: string | null,
): Promise<TurnstileResult> {
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { ok: false, reason: "failed" };
  }

  const secret = isProduction
    ? process.env.TURNSTILE_SECRET_KEY
    : TEST_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile: TURNSTILE_SECRET_KEY is not configured.");
    return { ok: false, reason: "unavailable" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let result: SiteverifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`Turnstile: Siteverify returned HTTP ${res.status}.`);
      return { ok: false, reason: "unavailable" };
    }
    result = (await res.json()) as SiteverifyResponse;
  } catch (err) {
    console.error(
      "Turnstile: Siteverify request failed:",
      err instanceof Error ? err.message : "unknown",
    );
    return { ok: false, reason: "unavailable" };
  }

  if (!result.success) {
    const codes = result["error-codes"] ?? [];
    // A bad or missing secret is our configuration problem, not the visitor's.
    if (codes.includes("invalid-input-secret") || codes.includes("missing-input-secret")) {
      console.error("Turnstile: secret key rejected by Cloudflare.");
      return { ok: false, reason: "unavailable" };
    }
    return { ok: false, reason: "failed" };
  }

  if (isProduction && !PRODUCTION_HOSTNAMES.has(result.hostname ?? "")) {
    return { ok: false, reason: "failed" };
  }

  return { ok: true };
}
