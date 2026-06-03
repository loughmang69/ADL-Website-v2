import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

function makeLimiter(requests: number, prefix: string): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, "60 s"),
    prefix,
    analytics: false,
  });
}

/** 5 requests / 60s per IP for the contact form. */
export const contactLimiter = makeLimiter(5, "rl:contact");

/** 3 requests / 60s per IP for testimonial submissions (more restrictive). */
export const testimonialLimiter = makeLimiter(3, "rl:testimonial");

export interface RateLimitResult {
  success: boolean;
  remaining: number;
}

/**
 * Enforce a rate limit. If Upstash is not configured the limiter is null and
 * this is a no-op that always allows the request (the build still works
 * locally without Redis credentials).
 */
export async function enforceRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<RateLimitResult> {
  if (!limiter) return { success: true, remaining: Number.POSITIVE_INFINITY };
  const { success, remaining } = await limiter.limit(identifier);
  return { success, remaining };
}

/** Best-effort client IP extraction from forwarding headers. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "127.0.0.1";
}
