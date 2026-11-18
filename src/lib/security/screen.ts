import type { ContactInput } from "@/lib/validations/contact";

/**
 * Flags contact-form submissions that look like sales solicitations rather
 * than prospective clients.
 *
 * Screening never drops a submission. A flagged submission is still emailed,
 * with "[Screened]" in the subject and the reasons listed in the body, so a
 * real client caught by mistake is never lost. The honeypot and rate limiter
 * stop bots; this targets people and outreach tools that fill the form in
 * properly but are pitching something.
 *
 * Patterns are deliberately narrow. Each was checked against the real client
 * inquiries received so far so that none of them would have been flagged.
 */

interface Rule {
  reason: string;
  pattern: RegExp;
}

const URL_RULE: Rule = {
  reason: "Contains a link",
  pattern: /(https?:\/\/|www\.)\S+/i,
};

const PHRASE_RULES: Rule[] = [
  { reason: "Favor request", pattern: /\bquick favou?r\b/i },
  {
    reason: "Introducing a product or service",
    pattern: /\b(we('| a)re|we are|i('| a)m|i am) (introducing|reaching out to introduce)\b/i,
  },
  {
    reason: "Offer to buy the practice",
    pattern:
      /\b(buy(ing)?|acquir(e|ing)|acquisition of) (your|accounting|tax|cpa) (practice|firm|business)|\bpractice acquisition\b|\bfirm acquisition\b/i,
  },
  { reason: "Addressed to 'the owner'", pattern: /\b(for|to) the owner of\b/i },
  {
    reason: "SEO or ranking pitch",
    pattern:
      /\bseo\b|\bsearch rankings?\b|\bgoogle rankings?\b|\bbacklinks?\b|\bguest posts?\b|\branked\b|\brank (higher|first|#?1)\b/i,
  },
  {
    reason: "Lead generation pitch",
    pattern: /\blead gen(eration)?\b|\b(more|qualified|new) leads\b|\bappointment setting\b/i,
  },
  {
    reason: "Staffing or outsourcing pitch",
    pattern: /\bvirtual assistants?\b|\bwhite[- ]label\b|\boffshore (team|staff|accountants?|bookkeepers?)\b/i,
  },
  {
    reason: "Marketing or web services pitch",
    pattern:
      /\bweb(site)? (re)?design\b|\bdigital marketing\b|\bmarketing agency\b|\bsocial media management\b/i,
  },
  {
    reason: "Partnership pitch",
    pattern: /\bpartnership opportunit(y|ies)\b|\bpartner with you\b|\bcollaboration opportunit(y|ies)\b/i,
  },
  {
    reason: "Listing or award pitch",
    pattern: /\bfeatured (in|on) our\b|\bdirectory listing\b|\btop[- ]rated \w+ list\b/i,
  },
  {
    reason: "Mass-outreach opt-out language",
    pattern: /\bunsubscribe\b|\bopt[- ]out\b|\bnot interested,? (just )?(reply|respond)\b|\bwill not contact you again\b/i,
  },
  { reason: "Demo or trial offer", pattern: /\b(book|schedule) a demo\b|\bfree trial\b/i },
];

export interface ScreenResult {
  flagged: boolean;
  reasons: string[];
}

export function screenSubmission(data: ContactInput): ScreenResult {
  const text = [data.name, data.businessType, data.notes]
    .filter((v): v is string => typeof v === "string" && v.length > 0)
    .join("\n");

  const reasons: string[] = [];
  for (const rule of [URL_RULE, ...PHRASE_RULES]) {
    if (rule.pattern.test(text)) reasons.push(rule.reason);
  }
  return { flagged: reasons.length > 0, reasons };
}
