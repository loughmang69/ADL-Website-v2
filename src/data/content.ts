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

/**
 * About-section bio. Three paragraphs, reused verbatim from the current site.
 * TODO(verbatim): replace with the exact existing bio copy.
 */
export const ABOUT_BIO: string[] = [
  "Garrett Loughman is a licensed California CPA who has spent more than fifteen years in accounting, finance, consulting, finance transformation, and both internal and external audit. He founded ADL Business Consulting to bring the rigor and quality of large-firm engagements directly to the small business owners who need it most.",
  "After years advising large organizations, Garrett saw the same gap again and again: small businesses make consequential financial decisions without access to the kind of expertise that bigger companies take for granted. ADL exists to close that gap with hands-on, practical guidance.",
  "Today Garrett works directly with each client, from entity structure and bookkeeping to tax review and technology, so owners spend less time wrestling with their financials and more time growing what they built.",
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

/**
 * Contact form "What can we help you with?" options.
 * TODO(verbatim): confirm these match the 10 options on the current site.
 */
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
