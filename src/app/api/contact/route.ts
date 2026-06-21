import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { buildContactEmail } from "@/lib/resend/templates/contact";
import {
  resend,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from "@/lib/resend/client";
import {
  contactLimiter,
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

  // 1. Rate limit (5 / 60s per IP)
  const ip = getClientIp(request.headers);
  const { success } = await enforceRateLimit(contactLimiter, ip);
  if (!success) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Please try again in a minute or call us directly.",
      },
      { status: 429 },
    );
  }

  // Parse body
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  // 3. Honeypot: silently discard (return 200, send nothing)
  if (
    typeof record["bot-field"] === "string" &&
    record["bot-field"].length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  // 2 + 4. Validate
  const parsed = contactSchema.safeParse(record);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // 5. Send via Resend
  if (!resend) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 500 },
    );
  }

  const { subject, html, text, replyTo } = buildContactEmail(parsed.data);

  try {
    const { error } = await resend.emails.send({
      from: `ADL Website <${CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      replyTo,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("Contact form Resend error:", error.message);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error(
      "Contact form unexpected error:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 500 },
    );
  }

  // 6. Success
  return NextResponse.json({ success: true });
}
