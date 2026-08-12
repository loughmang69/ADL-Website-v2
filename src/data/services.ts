export type ServiceCategory = "Tax" | "Accounting" | "Advisory";

/** A structured long-form content block on a service detail page. */
export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  tag: string;
  description: string;
  icon: string; // Phosphor icon component name (e.g. 'Buildings', 'Receipt')

  // --- SEO service-detail-page fields ---
  slug: string; // e.g. "bookkeeping-services-fremont"
  metaTitle: string; // used as-is (absolute), keyword first, ~60 chars
  metaDescription: string; // <= 155 chars
  heroTagline: string; // one-line value statement for the page hero
  body: ServiceSection[]; // structured long-form content, 500-800 words total
  faqs: ServiceFaq[]; // 4-6 per service
  relatedCategorySlugs?: string[]; // blog categories to pull related posts from
}

/**
 * The three front-facing services. Narrowed from nine as part of the CPA-first
 * repositioning: entity structure, payroll, technology, and process work all
 * still happen, they now live inside Business Advisory rather than standing as
 * separate front-door services. Removed slugs 301 to their new homes, see the
 * `redirects()` block in next.config.ts.
 *
 * The two surviving slugs are unchanged on purpose, to preserve existing
 * search equity.
 */
export const SERVICES: Service[] = [
  {
    id: "tax-preparation",
    title: "Tax Preparation & Return Review",
    category: "Tax",
    tag: "Tax",
    description:
      "Accurate business and individual returns, plus a second look at what you've already filed, prepared or reviewed personally by your CPA.",
    icon: "FileMagnifyingGlass",
    slug: "tax-preparation-fremont",
    metaTitle:
      "Tax Preparation & Review in Fremont, CA | ADL Business Consulting",
    metaDescription:
      "Business and individual tax preparation and return review in Fremont, CA, prepared and reviewed directly by a licensed CPA, not outsourced.",
    heroTagline:
      "Every return prepared or reviewed personally by a California-licensed CPA, not outsourced to a preparer you have never spoken with.",
    relatedCategorySlugs: ["Tax"],
    body: [
      {
        heading: "Filing done right the first time",
        paragraphs: [
          "Whether you're a single-member LLC filing a Schedule C, an S-corp balancing reasonable compensation against distributions, or an individual with a straightforward W-2, your return should reflect what's actually happening in your business and your life, not a generic template. Garrett prepares every return personally, working from your actual books and financial activity, so what gets filed matches reality and holds up if it's ever questioned.",
        ],
      },
      {
        heading: "A second opinion when something feels off",
        paragraphs: [
          "If someone else prepared last year's return and something about it doesn't sit right, whether that's a refund that seemed too small, a deduction you're fairly sure you qualified for but didn't see, or just general uncertainty about whether it was done correctly, a return review is a focused, lower-cost engagement to check the work. You'll get a clear answer on whether it was handled well, and if it wasn't, a path to amend it.",
        ],
      },
      {
        heading: "Built around the deadlines that actually matter",
        paragraphs: [
          "Tax prep isn't a once-a-year event here. Quarterly estimated payments, the 75-day S-corp election window, your filing deadline, and extension planning all get tracked proactively, with a heads-up before each one rather than a scramble when it arrives.",
          "The 75-day window matters more than the date most people quote. An S-corp election is due two months and fifteen days after the start of your tax year, so if your business doesn't run on a calendar year, the widely repeated March 15 deadline simply isn't yours.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you prepare both business and personal returns?",
        answer:
          "Yes. Most clients have both, and having one CPA handle both means nothing falls through the cracks between the two.",
      },
      {
        question:
          "What if someone else prepared my return last year and I think it might be wrong?",
        answer:
          "That's exactly what the return review service is for. Send over last year's return and Garrett will tell you plainly whether it looks right, and what to do next if it doesn't.",
      },
      {
        question: "Do you only work with S-corps?",
        answer:
          "No. LLCs, sole proprietors filing Schedule C, partnerships, and individuals are all common clients. The entity structure work happens on the advisory side if you're not sure which structure fits.",
      },
      {
        question: "When should I reach out before tax season?",
        answer:
          "Ideally a few months before your filing deadline, especially if you also want quarterly estimates set up or your books cleaned up first. Reaching out in April with a mess to sort through is still fine, just tighter.",
      },
      {
        question: "Do you handle quarterly estimated taxes?",
        answer:
          "Yes, as part of an ongoing engagement, so you're not surprised by a large balance due at filing time.",
      },
    ],
  },
  {
    id: "bookkeeping",
    title: "Bookkeeping & Cleanup",
    category: "Accounting",
    tag: "Accounting",
    description:
      "Monthly bookkeeping that stays current, and one-time cleanup projects for books that have fallen behind.",
    icon: "ChartLineUp",
    slug: "bookkeeping-services-fremont",
    metaTitle:
      "Bookkeeping & Cleanup Services in Fremont, CA | ADL Business Consulting",
    metaDescription:
      "Monthly bookkeeping and one-time cleanup projects for Fremont, CA small businesses: reconciled, categorized, and ready for tax time.",
    heroTagline:
      "Clean, current books every month, and a clear path back to accurate if yours have gotten away from you.",
    relatedCategorySlugs: ["Accounting"],
    body: [
      {
        heading: "Monthly bookkeeping that doesn't fall behind",
        paragraphs: [
          "Ongoing reconciliation, categorization, and financial reporting, built around QuickBooks and delivered on a monthly cadence, so you always have an accurate picture of where the business stands, and so tax season isn't a scramble to reconstruct a year's worth of transactions.",
        ],
      },
      {
        heading: "Cleanup projects, for when books have gotten away from you",
        paragraphs: [
          "If your bookkeeping has fallen months or longer behind, with unreconciled accounts, miscategorized expenses, or a bookkeeper who didn't work out, a cleanup project gets you caught up to accurate. That might be needed before filing, before a lender or buyer needs clean financials, or just for your own peace of mind.",
        ],
      },
      {
        heading: "Books built for decisions, not just filing",
        paragraphs: [
          "Bookkeeping done well isn't only a compliance requirement. Clean, current financials are what make it possible to answer real questions with confidence: can you afford to hire, is a price increase actually working, where is cash actually going.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between monthly bookkeeping and a cleanup project?",
        answer:
          "Monthly bookkeeping is ongoing, so your books stay current every month. A cleanup project is a one-time engagement to bring books that have fallen behind back to accurate, after which many clients move to a monthly plan.",
      },
      {
        question: "How far behind can my books be before cleanup is needed?",
        answer:
          "There's no real limit. A few months behind or a few years behind both start the same way: a review of what exists and a plan to reconstruct the rest.",
      },
      {
        question:
          "Do you use QuickBooks, or can you work with what I already have?",
        answer:
          "QuickBooks is the standard setup, but existing systems can usually be assessed and either kept or migrated as part of getting started.",
      },
      {
        question:
          "Will my bookkeeping and tax prep be handled by the same person?",
        answer:
          "Yes, and that's the point. One CPA doing both means your books are already built the way your tax return needs them, instead of two separate people reconciling different pictures at year-end.",
      },
      {
        question: "How often will I actually hear from you?",
        answer:
          "Monthly financials at minimum, plus direct access by phone or email whenever something comes up, not just at tax time.",
      },
    ],
  },
  {
    id: "business-advisory",
    title: "Business Advisory & Consulting",
    category: "Advisory",
    tag: "Advisory",
    description:
      "Entity structure, systems, and the decisions that shape where your business is headed: the advisor conversations most small businesses don't get access to.",
    icon: "Buildings",
    slug: "business-advisory-fremont",
    metaTitle:
      "Business Advisory & Consulting in Fremont, CA | ADL Business Consulting",
    metaDescription:
      "CPA-led business advisory for Fremont, CA small businesses: entity structure, systems, payroll, and growth planning, from your actual accountant.",
    heroTagline:
      "The advisor conversations most small businesses only get access to once they're big enough to have a CFO.",
    relatedCategorySlugs: ["Business Strategy", "Payroll", "Technology"],
    body: [
      {
        heading: "Entity structure & tax elections",
        paragraphs: [
          "LLC, S-corp, or C-corp: the right structure depends on your income, your growth plans, and how much administrative overhead you're willing to take on. This covers first-time entity selection, evaluating whether an S-corp election still makes sense as the business changes, and restructuring an existing entity that was set up without this kind of review.",
        ],
      },
      {
        heading: "Systems, payroll & process",
        paragraphs: [
          "Selecting and implementing the right payroll provider and staying compliant with California payroll requirements, setting up QuickBooks or point-of-sale systems correctly from day one, and finding the operational bottlenecks that are quietly costing time or money. All handled as part of the same relationship that already knows your books and your taxes, instead of a separate vendor with no context.",
        ],
      },
      {
        heading: "Planning for what's next",
        paragraphs: [
          "Beyond any single project, this is the ongoing conversation: can I afford to hire, should I take on this debt, what does the next 12 months actually look like. It's the kind of advisory access that's normally reserved for businesses large enough to have their own CFO.",
        ],
      },
    ],
    faqs: [
      {
        question: "I'm just starting out. Is this still for me?",
        answer:
          "Yes. Entity structure and initial setup decisions are often most valuable early, before a wrong choice compounds for a few years.",
      },
      {
        question: "What's the difference between this and just tax prep?",
        answer:
          "Tax prep is annual and backward-looking, reporting what already happened. Advisory is forward-looking and ongoing, and it's the conversation about what to do next.",
      },
      {
        question: "Can you help pick and set up a payroll provider?",
        answer:
          "Yes, including evaluating options against your team size and making sure California-specific requirements are handled correctly from the start.",
      },
      {
        question: "Do you do one-time projects or ongoing advisory?",
        answer:
          "Both. Some engagements are a single focused project, such as an entity restructure or a payroll setup. Others are an ongoing relationship with regular check-ins.",
      },
      {
        question:
          "I already have someone doing my taxes. Can you just do advisory?",
        answer:
          "That's workable, though most clients find it's more effective when one CPA has visibility into both the books and the advisory conversation. Worth a call to talk through your specific setup.",
      },
    ],
  },
];

/** The service slugs linked from the footer, in declared order. */
export const FOOTER_SERVICE_SLUGS = SERVICES.map((s) => s.slug);

/** Lookup a service by its URL slug. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
