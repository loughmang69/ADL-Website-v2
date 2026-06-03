import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const auth = request.headers.get("authorization");
  const provided =
    auth?.replace(/^Bearer\s+/i, "").trim() ??
    request.nextUrl.searchParams.get("secret") ??
    "";

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
