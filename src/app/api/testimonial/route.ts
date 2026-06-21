import { NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/validations/testimonial";
import { buildTestimonialEmail } from "@/lib/resend/templates/testimonial";
import {
  resend,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from "@/lib/resend/client";
import { getWriteClient } from "@/lib/sanity/client";
import { SITE } from "@/data/content";
import {
  testimonialLimiter,
  enforceRateLimit,
  getClientIp,
} from "@/lib/ratelimit";
import { isAllowedOrigin } from "@/lib/security/origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // 0. CSRF origin check: reject cross-site form submissions.
  if (!isAllowedOrigin(request.headers)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 1. Rate limit (3 / 60s per IP)
  const ip = getClientIp(request.headers);
  const { success } = await enforceRateLimit(testimonialLimiter, ip);
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again in a minute.",
      },
      { status: 429 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  // 3. Honeypot: silently discard
  if (
    typeof record["bot-field"] === "string" &&
    record["bot-field"].length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  // 2. Validate
  const parsed = testimonialSchema.safeParse(record);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // 4. Save to Sanity with the write client
  const writeClient = getWriteClient();
  if (!writeClient) {
    console.error("Testimonial: SANITY_API_TOKEN is not configured.");
    return NextResponse.json(
      { error: "Submission failed. Please try again later." },
      { status: 500 },
    );
  }

  try {
    await writeClient.create({
      _type: "testimonial",
      name: parsed.data.name,
      role: parsed.data.role || undefined,
      stars: parsed.data.stars,
      text: parsed.data.text,
      approved: false,
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(
      "Testimonial Sanity write error:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: "Submission failed. Please try again later." },
      { status: 500 },
    );
  }

  // 5. Notify Garrett (best effort — submission is already saved, so an email
  // failure must NOT surface as an error to the user or they may resubmit).
  if (resend) {
    const { subject, html, text } = buildTestimonialEmail(
      parsed.data,
      `${SITE.url}/studio`,
    );
    try {
      const { error } = await resend.emails.send({
        from: `ADL Website <${CONTACT_FROM_EMAIL}>`,
        to: [CONTACT_TO_EMAIL],
        subject,
        html,
        text,
      });
      if (error) {
        console.error("Testimonial Resend error:", error.message);
      }
    } catch (err) {
      console.error(
        "Testimonial email unexpected error:",
        err instanceof Error ? err.message : "unknown",
      );
    }
  }

  // 6. Success — the testimonial is persisted regardless of email outcome.
  return NextResponse.json({ success: true });
}
