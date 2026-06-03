/**
 * Centralised site copy and constants.
 *
 * NAP (name / address / phone) and credentials are sourced from the spec and
 * are considered stable (assumption 5). Items marked TODO(verbatim) are
 * professional placeholders standing in for copy on the current live site,
 * which is a client-rendered SPA and could not be scraped. Garrett: replace
 * the TODO blocks with the exact existing copy.
 */

export const SITE = {
  name: "ADL Business Consulting, PC",
  shortName: "ADL Business Consulting",
  tagline: "Big-firm expertise. Small business focus.",
  url: "https://www.adlbusinessconsulting.com",
  phone: "510-320-2724",
  phoneHref: "tel:+15103202724",
  email: "info@adlbusinessconsulting.com",
  emailHref: "mailto:info@adlbusinessconsulting.com",
  locality: "Fremont",
  region: "CA",
  regionLong: "California",
  locationLabel: "Fremont, California",
  license: "CA License #150109",
  licenseNumber: "150109",
  ein: "42-2067797",
  founderName: "Garrett Loughman",
  founderTitle: "Garrett Loughman, CPA, MBA",
  cpaSince: "2013",
  googleReviewUrl: "https://g.page/r/CUJAnBWd91buEAE/review",
  googleProfileUrl:
    "https://www.google.com/search?q=ADL+Business+Consulting+PC+Garrett+Loughman+CPA+Fremont+CA",
} as const;

/** About-section bio (three paragraphs). */
export const ABOUT_BIO: string[] = [
  "Garrett Loughman is a California-licensed CPA (License #150109) with more than 15 years of experience across accounting, finance, consulting, finance transformation, and both internal and external audit. He founded ADL Business Consulting, PC to bring big-firm expertise directly to the small business owners who need it most.",
  "After years advising larger organizations, Garrett kept seeing the same gap: small businesses making major financial decisions without the guidance bigger companies take for granted. ADL exists to close that gap with hands-on, practical advice — not just at tax time, but year-round.",
  "Today he works directly with every client across entity structure, bookkeeping, tax, payroll, and technology, so owners spend less time wrestling with their financials and more time growing what they built.",
];

/**
 * Static Google review (assumption 3 — kept hardcoded until enough reviews
 * accumulate to warrant a dynamic embed).
 * TODO(verbatim): replace title/body with the exact review text from Google.
 */
export const GOOGLE_REVIEW = {
  author: "Valerie L.",
  stars: 5,
  title: "Knowledgeable, responsive, and genuinely invested",
  body: "Garrett took the time to understand my business and gave clear, actionable advice that saved me money and headaches. He explains things in plain language and is always responsive. I would recommend ADL Business Consulting to any small business owner looking for a trustworthy CPA.",
  source: "Verified Google Review",
} as const;

/** Contact form "What can we help you with?" options. */
export const HELP_OPTIONS: string[] = [
  "Entity Structure Review",
  "Accounting & Bookkeeping",
  "Tax Return Review",
  "Payroll Implementation",
  "Technology Implementations",
  "Business Process Optimization",
  "Personal Finance Education",
  "Website & App Development",
  "AI Agent Implementation",
  "Something else / Not sure yet",
];

export const DISCLAIMER_FOOTER_SENTENCE =
  "ADL Business Consulting, PC provides general consulting and bookkeeping services. Content on this site is informational only and does not constitute legal, tax, or financial advice.";

export const DISCLAIMER_BANNER_TEXT =
  "General information only. This post is not tax, legal, or financial advice. Consult a professional for advice specific to your situation.";
