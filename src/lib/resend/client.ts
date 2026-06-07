import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

/** Resend instance, or null when no API key is configured. */
export const resend = apiKey ? new Resend(apiKey) : null;

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "info@adlbusinessconsulting.com";

// Verified Resend sender domain. Overridable via env, but the default is the
// real verified address so production sends from it even if the env var is
// unset (the old "onboarding@resend.dev" sandbox sender hurt deliverability).
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "info@adlbusinessconsulting.com";
