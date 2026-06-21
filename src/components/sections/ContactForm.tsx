"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { SITE, HELP_OPTIONS } from "@/data/content";

const VALUE_PROPS = [
  "No-cost, no-commitment consultation",
  "Response within 2 business days",
  "Available by phone, video, or email",
  "Fremont, CA and surrounding Bay Area",
];

type ContactMethod = "Email" | "Phone";
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<string, string[]>>;

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-navy-deepest placeholder:text-navy-soft/50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 transition-colors";

function fieldClass(hasError: boolean): string {
  return `${inputBase} ${hasError ? "border-danger" : "border-navy-deepest/15"}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [method, setMethod] = useState<ContactMethod>("Email");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      businessType: String(data.get("businessType") ?? "").trim(),
      helpWith: String(data.get("helpWith") ?? ""),
      notes: String(data.get("notes") ?? "").trim(),
      contactMethod: method,
      "bot-field": String(data.get("bot-field") ?? ""),
    };

    // Client-side validation
    const next: FieldErrors = {};
    if (!payload.name) next.name = ["Please enter your name"];
    if (!payload.email) next.email = ["Please enter your email"];
    else if (!EMAIL_RE.test(payload.email))
      next.email = ["Enter a valid email address"];
    if (payload.notes.length > 2000)
      next.notes = ["Please keep notes under 2000 characters"];
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("loading");
    setBanner(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 400) {
        const body = (await res.json().catch(() => ({}))) as {
          errors?: FieldErrors;
        };
        setErrors(body.errors ?? {});
        setStatus("error");
        setBanner("Please correct the highlighted fields and try again.");
        return;
      }
      if (res.status === 429) {
        setStatus("error");
        setBanner(
          "Too many requests. Please try again in a minute or call us directly.",
        );
        return;
      }
      setStatus("error");
      setBanner(
        "Something went wrong sending your message. Please email or call us directly.",
      );
    } catch {
      setStatus("error");
      setBanner(
        "Something went wrong sending your message. Please email or call us directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-navy-deep to-navy-deepest px-6 py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left column */}
        <div className="text-white">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-accent">
            Get In Touch
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
            Let&rsquo;s Talk About Your Business
          </h2>
          <p className="mt-4 max-w-prose text-white/70">
            Tell us a little about your situation and we&rsquo;ll get back to you
            with next steps. No cost, no commitment.
          </p>

          <ul className="mt-8 space-y-3">
            {VALUE_PROPS.map((prop) => (
              <li key={prop} className="flex items-center gap-3 text-white/90">
                <CheckCircleIcon
                  size={22}
                  weight="fill"
                  className="shrink-0 text-accent"
                  aria-hidden="true"
                />
                {prop}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-white transition-colors hover:text-accent"
            >
              <PhoneIcon size={20} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-white transition-colors hover:text-accent"
            >
              <EnvelopeIcon size={20} aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Right column — form card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircleIcon
                size={56}
                weight="fill"
                className="text-accent"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-2xl font-black tracking-tight text-navy-deepest">
                Thank you!
              </h3>
              <p className="mt-2 max-w-sm text-navy-soft">
                Your message is on its way. We&rsquo;ll be in touch within two
                business days. Need something sooner?
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-sm font-semibold text-navy transition-colors hover:text-accent"
                >
                  <PhoneIcon size={18} aria-hidden="true" />
                  {SITE.phone}
                </a>
                <a
                  href={SITE.emailHref}
                  className="inline-flex items-center gap-2 rounded-sm font-semibold text-navy transition-colors hover:text-accent"
                >
                  <EnvelopeIcon size={18} aria-hidden="true" />
                  {SITE.email}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div
                className="absolute -left-[9999px]"
                aria-hidden="true"
              >
                <label>
                  Do not fill this out
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {banner && (
                <p
                  role="alert"
                  className="mb-5 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
                >
                  {banner}
                </p>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-danger">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-danger">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={fieldClass(!!errors.phone)}
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="mt-1 text-sm text-danger">
                      {errors.phone[0]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="businessType"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    Business Type or Industry
                  </label>
                  <input
                    id="businessType"
                    name="businessType"
                    type="text"
                    className={fieldClass(false)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="helpWith"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    What can we help you with?
                  </label>
                  <select
                    id="helpWith"
                    name="helpWith"
                    defaultValue=""
                    className={fieldClass(false)}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {HELP_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-sm font-semibold text-navy-deepest"
                  >
                    Additional notes or context
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    maxLength={2000}
                    aria-invalid={!!errors.notes}
                    aria-describedby={errors.notes ? "notes-error" : undefined}
                    className={`${fieldClass(!!errors.notes)} resize-y`}
                  />
                  {errors.notes && (
                    <p id="notes-error" role="alert" className="mt-1 text-sm text-danger">
                      {errors.notes[0]}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-navy-deepest">
                    Preferred Contact Method
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Preferred contact method"
                    className="inline-flex rounded-lg border border-navy-deepest/15 p-1"
                  >
                    {(["Email", "Phone"] as ContactMethod[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={method === m}
                        onClick={() => setMethod(m)}
                        className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors duration-150 active:scale-[0.97] ${
                          method === m
                            ? "bg-navy text-white"
                            : "text-navy-soft hover:text-navy"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-navy-deepest transition-[transform,background-color] duration-150 ease-out hover:bg-accent/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60"
              >
                {status === "loading" && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-navy-deepest/30 border-t-navy-deepest"
                    aria-hidden="true"
                  />
                )}
                {status === "loading" ? "Sending..." : "Request a Free Consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
