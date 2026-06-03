import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

/** Resend instance, or null when no API key is configured. */
export const resend = apiKey ? new Resend(apiKey) : null;

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "info@adlbusinessconsulting.com";

export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
