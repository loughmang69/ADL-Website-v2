import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { createHash, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

/** Constant-time, length-safe secret comparison (mirrors /api/revalidate). */
function secretsMatch(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

/**
 * Heartbeat / health-check endpoint.
 *
 * A Vercel cron (see vercel.json) hits this once a day. The single Redis write
 * is enough to count as "traffic" on the Upstash free tier, which otherwise
 * archives databases that sit idle for a few weeks. The rate limiter only
 * touches Redis when someone submits a form, so on a low-traffic site this
 * keep-alive prevents the DB from being archived.
 *
 * If CRON_SECRET is set, Vercel sends it as `Authorization: Bearer <secret>`
 * and we require a match — so the endpoint can't be spammed publicly. Without
 * the env var (e.g. local dev) the check is skipped.
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization") ?? "";
    const provided = auth.replace(/^Bearer\s+/i, "").trim();
    if (!provided || !secretsMatch(provided, cronSecret)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  if (!redis) {
    // Fail soft: no Redis configured (matches the rate limiter's behaviour).
    return NextResponse.json({ ok: true, redis: "not-configured" });
  }

  const now = Date.now();
  try {
    await redis.set("health:heartbeat", now);
    return NextResponse.json({ ok: true, redis: "alive", now });
  } catch (err) {
    return NextResponse.json(
      { ok: false, redis: "error", message: (err as Error).message },
      { status: 500 },
    );
  }
}
