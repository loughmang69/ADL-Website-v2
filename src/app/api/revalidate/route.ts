import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { createHash, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Constant-time, length-safe secret comparison. Hashing both sides first gives
 * timingSafeEqual two equal-length buffers (it throws otherwise) and avoids
 * leaking the secret's length, while keeping the compare resistant to timing
 * side-channels.
 */
function secretsMatch(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

/**
 * On-publish revalidation endpoint for Sanity content.
 *
 * Configure a Sanity GROQ-powered webhook (Manage → API → Webhooks) that fires
 * on any blogPost/testimonial change and POSTs here with the header
 *   Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *
 * It purges the shared "sanity" cache tag, which every read attaches via
 * sanityFetch(). That refreshes the homepage blog preview, the /blog listing,
 * each /blog/[slug] page, and the sitemap immediately — instead of waiting for
 * the 60s ISR window. Without the webhook the site still updates within 60s.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not configured." },
      { status: 500 },
    );
  }

  // Header-only: the shared secret must arrive in the Authorization header.
  // A `?secret=` query-string fallback was removed because query strings leak
  // into access logs, browser history, and analytics in a way headers do not.
  const auth = request.headers.get("authorization") ?? "";
  const provided = auth.replace(/^Bearer\s+/i, "").trim();

  if (!provided || !secretsMatch(provided, secret)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
