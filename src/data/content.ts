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
  "After years advising larger organizations, Garrett kept seeing the same gap: small businesses making major financial decisions without the guidance bigger companies take for granted. ADL exists to close that gap with hands-on, practical advice, not just at tax time but year-round.",
  "Today he works directly with every client across entity structure, bookkeeping, tax, payroll, and technology, so owners spend less time wrestling with their financials and more time growing what they built.",
];

/**
 * Static fallback Google reviews — the exact, verbatim text of the live Google
 * reviews. Used only when the Places API is not configured (see
 * `getGoogleReviews()`); when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set,
 * the Reviews section pulls reviews live instead.
 */
export const GOOGLE_REVIEWS = [
  {
    author: "shiva afshar",
    stars: 5,
    text: `I spent thirty years in finance. I know how to close books. But when you're retired, with grandkids to visit and trips to plan, the last thing you want is nine entities sitting in the back of your head.

That was my situation. Five LLCs, two partnerships, two trusts. I'd put the bookkeeping off for a month, then two, and eventually it would pile up and I'd lose a week grinding through it right before a deadline. I knew how to do it. I just didn't want to anymore.

A friend suggested Garrett at ADL. Handing this kind of work off to someone else isn't straightforward when you've spent your career being the one who does it. You have a standard, and you want to know the person on the other end actually understands what they're looking at. Garrett does. He got up to speed on all nine entities quickly, asked the right questions, and took it from there without a lot of back and forth.

I haven't thought about my books in months. That's the whole point.

Five stars, without hesitation. If you're looking for someone who is sharp, organized, and will actually take things off your plate, Garrett at ADL is your person. I can't recommend him highly enough!`,
    source: "Verified Google Review",
  },
  {
    author: "Valerie L",
    stars: 5,
    text: `Completely transformed my business — I can't recommend ADL enough.

Before working with Garrett at ADL Business Consulting, I was running Excel Cleaning as a sole proprietor, doing everything manually and honestly just hoping for the best when tax season rolled around. I had no real back office, no structure, and no idea how much it was costing me.

Garrett changed all of that. He walked me through the real benefits of forming an LLC, including liability protection, tax flexibility, and credibility with clients, and then coordinated directly with my attorneys to make it happen. From there, it snowballed in the best way. He helped me redesign my logo and branding, overhauled my entire accounting process, and set me up with a new payroll provider that saves me money while giving me more services than I had before.

What really sets Garrett apart is how thorough he is. He handles my monthly bookkeeping, tracks my federal, state, and local tax obligations so I'm never caught off guard with a big tax bill, and even remits my sales taxes for me every month. He built out over two dozen operational templates that have made running the day-to-day so much smoother. And he's always looking for ways to cut costs without cutting corners, finding savings I never would have noticed on my own.

On top of all of it, he took the time to actually educate me on personal finance and how to use my business strategically for tax savings. I feel like I finally understand my own finances.

If you're a small business owner who feels like you're just figuring it out as you go, Garrett is exactly who you need in your corner. ADL Business Consulting didn't just help me, they transformed the way I operate.

— Excel Cleaning, LLC`,
    source: "Verified Google Review",
  },
] as const;

/** Contact form "What can we help you with?" options. */
export const HELP_OPTIONS: string[] = [
  "Entity Structure Review",
  "Accounting & Bookkeeping",
  "Tax Preparation & Return Review",
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
