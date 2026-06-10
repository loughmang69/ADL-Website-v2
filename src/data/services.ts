export type ServiceCategory =
  | "Tax"
  | "Accounting"
  | "Operations"
  | "Tech"
  | "Consulting"
  | "Education"
  | "Innovation";

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
  featured?: boolean; // renders in the full-width featured card slot
  icon: string; // Phosphor icon component name (e.g. 'Buildings', 'Receipt')
  comingSoon?: boolean; // renders card with a "Coming Soon" badge, disabled state

  // --- SEO service-detail-page fields ---
  slug: string; // e.g. "bookkeeping-services-fremont"
  metaTitle: string; // used as-is (absolute), keyword first, ~60 chars
  metaDescription: string; // <= 155 chars
  heroTagline: string; // one-line value statement for the page hero
  body: ServiceSection[]; // structured long-form content, 500-800 words total
  faqs: ServiceFaq[]; // 4-6 per service
  relatedCategorySlugs?: string[]; // blog categories to pull related posts from
}

export const SERVICES: Service[] = [
  {
    id: "entity-structure",
    title: "Entity Structure Review",
    category: "Tax",
    tag: "Tax Strategy",
    description:
      "Determine the optimal business structure (LLC, S-Corp, or C-Corp) from a tax efficiency standpoint. Avoid costly mistakes before they happen.",
    featured: true,
    icon: "Buildings",
    slug: "entity-structure-review",
    metaTitle: "LLC vs S-Corp Entity Structure Review | Fremont, CA CPA",
    metaDescription:
      "LLC vs S-Corp vs C-Corp? A Fremont, CA CPA reviews your entity structure for tax efficiency, reasonable-comp rules, and California's $800 franchise tax.",
    heroTagline:
      "Pick the structure that fits your numbers, not a template you found online.",
    relatedCategorySlugs: ["Tax", "Business Strategy"],
    body: [
      {
        heading: "The structure you chose at the start is rarely the one that fits today",
        paragraphs: [
          "Most owners pick an entity type once (usually a single-member LLC, filed online in an afternoon) and never revisit it. That's fine until your profit grows. Once a business is consistently netting real money, the wrong structure quietly costs you thousands a year in self-employment tax you didn't have to pay.",
          "An entity structure review looks at where your business actually is now: your net profit, how you pay yourself, your growth plans, and whether you have partners or outside investors on the horizon. Then it answers one practical question: is your current structure still the cheapest legal way to operate, or is it time to elect something different?",
        ],
      },
      {
        heading: "LLC, S-Corp, or C-Corp: what actually drives the decision",
        paragraphs: [
          "An LLC is simple and flexible, but by default its profit is all subject to self-employment tax. Once net profit climbs into the five figures, an S-Corp election often saves money: you pay yourself a reasonable salary (subject to payroll taxes) and take the rest as a distribution that isn't. The savings are real, but only if your salary is genuinely reasonable; the IRS scrutinizes owners who pay themselves too little.",
          "A C-Corp rarely makes sense for a typical Bay Area small business because of double taxation, but it can be the right call if you're raising venture capital or planning to retain significant earnings inside the company. The point is that none of this is one-size-fits-all. The right answer depends on your numbers, and it changes as those numbers change.",
        ],
      },
      {
        heading: "California-specific costs that the online guides skip",
        paragraphs: [
          "California adds wrinkles that generic advice ignores. Every LLC and corporation pays the $800 minimum franchise tax to the Franchise Tax Board each year, regardless of profit. LLCs above certain revenue thresholds owe an additional gross-receipts fee on top of that. An S-Corp election doesn't escape California either: the state levies a 1.5% tax on S-Corp net income.",
          "These costs don't make any single structure wrong, but they do change the math. A federal-only analysis can point you toward an election that looks great on paper and then gets eaten up by California's add-ons. The review accounts for both layers so the recommendation holds up when you actually file.",
        ],
      },
      {
        heading: "What you walk away with",
        paragraphs: [
          "You get a clear recommendation in layman's terms: keep your current structure, or make a specific election, with the dollar impact spelled out and the filing steps and deadlines laid out. If an S-Corp election makes sense, we cover the reasonable-compensation question directly so you're not guessing, and not exposed.",
          "This is a low-stakes, high-leverage place to start. Getting the structure right once pays off every year afterward.",
        ],
      },
    ],
    faqs: [
      {
        question: "When does an S-Corp election actually start saving me money?",
        answer:
          "It depends on your net profit and a reasonable salary for your role, but the savings generally start to outweigh the added payroll and filing costs once a business is consistently netting roughly $40,000–$80,000 or more. We run your actual numbers rather than relying on a rule of thumb.",
      },
      {
        question: "Does electing an S-Corp get me out of California's franchise tax?",
        answer:
          "No. California still charges the $800 minimum franchise tax and adds a 1.5% tax on S-Corp net income. A good analysis weighs the federal self-employment-tax savings against these California-specific costs.",
      },
      {
        question: "I already formed an LLC. Is it too late to change?",
        answer:
          "Not at all. An existing LLC can elect to be taxed as an S-Corp without dissolving and re-forming. There are timing rules for when the election takes effect, which we'll map to your situation.",
      },
      {
        question: "What is \"reasonable compensation\" and why does it matter?",
        answer:
          "If you elect S-Corp status, the IRS requires you to pay yourself a reasonable salary for the work you do before taking tax-advantaged distributions. Paying yourself too little is a common audit trigger. We help you set a defensible number.",
      },
      {
        question: "Can you handle the filing, or just the advice?",
        answer:
          "Both. We can give you a recommendation and the steps to file it yourself, or prepare and submit the elections for you. Either way you'll know exactly what's being filed and why.",
      },
    ],
  },
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    category: "Accounting",
    tag: "Accounting",
    description:
      "Keep your books clean, accurate, and audit-ready. Monthly reconciliation, categorization, and financial reporting tailored to your business.",
    icon: "ChartLineUp",
    slug: "bookkeeping-services-fremont",
    metaTitle: "Bookkeeping Services in Fremont, CA | ADL Business Consulting",
    metaDescription:
      "Monthly bookkeeping for Fremont, CA small businesses: clean reconciliations, accurate categorization, and reports you can actually use, from a licensed CPA.",
    heroTagline:
      "Books you can trust, closed every month, by a CPA who reads them too.",
    relatedCategorySlugs: ["Accounting"],
    body: [
      {
        heading: "Clean books are the foundation everything else sits on",
        paragraphs: [
          "When your books are accurate and current, every other financial decision gets easier. You know what you can spend, what you owe, and whether last month was actually profitable. When they're behind or disorganized, you're flying blind, and tax season turns into an expensive scramble to reconstruct a year you already lived through.",
          "ADL keeps your books clean, categorized, and reconciled every month so the numbers are ready whenever you need them: for a loan application, a tax return, a pricing decision, or just a clear-eyed look at how the business is doing.",
        ],
      },
      {
        heading: "What monthly bookkeeping actually includes",
        paragraphs: [
          "Every month we reconcile your bank and credit-card accounts with the utmost precision, categorize transactions correctly, and review for the small errors that compound: duplicate entries, miscategorized owner draws, transfers double-counted as income. We keep your chart of accounts sane instead of letting it sprawl into hundreds of categories nobody uses.",
          "You get a clean set of financials (profit and loss, balance sheet, and cash position) delivered on a predictable schedule. More importantly, because a CPA is the one reviewing them, you get a heads-up when something looks off: margins slipping, a vendor cost creeping up, sales tax that's accruing faster than you expected.",
        ],
      },
      {
        heading: "A CPA reading your books, not just recording them",
        paragraphs: [
          "Plenty of services will record transactions. The difference here is that the person keeping your books understands what they mean for your taxes and your business. Categorization isn't just tidiness; it determines your deductions, your taxable income, and how defensible your return is if anyone ever asks questions.",
          "That's especially true for California businesses juggling sales-and-use tax, 1099 contractor tracking, and the documentation the FTB and IRS expect. Getting it right monthly means there's nothing to untangle in April.",
        ],
      },
      {
        heading: "Built to hand off cleanly at tax time",
        paragraphs: [
          "Because the same practice handles your bookkeeping and understands tax, your year-end hand-off is seamless. No separate bookkeeper-to-preparer translation, no surprise adjustments, no \"we'll need to redo Q1.\" The books are already built the way the return needs them.",
          "Whether you're a sole proprietor who's fallen behind or an established LLC that wants a steady monthly close, we'll meet you where you are, including cleaning up a backlog before we start the regular cadence.",
        ],
      },
    ],
    faqs: [
      {
        question: "My books are months behind. Can you still help?",
        answer:
          "Yes. Catch-up and clean-up work is common. We'll get prior months reconciled and corrected first, then move you onto a steady monthly close so you don't fall behind again.",
      },
      {
        question: "Do you work in QuickBooks, or your own system?",
        answer:
          "It depends on the complexity of your business. A small coffee shop that runs everything through a standalone POS system, for example, may not need QuickBooks at all; simple monthly tracking might be plenty. A manufacturing company with multiple employees, fixed assets, purchase orders, and invoicing is a different story: that business will likely need dedicated accounting software like QuickBooks or a comparable platform. We look at how you actually operate and recommend what fits, rather than defaulting to one tool for everyone.",
      },
      {
        question: "What's the difference between bookkeeping and what my tax preparer does?",
        answer:
          "Bookkeeping is the year-round recording and reconciling that produces accurate financials; tax preparation uses those financials to file your return. Having both handled by one CPA practice means nothing gets lost in translation.",
      },
      {
        question: "Will you handle sales tax and 1099s?",
        answer:
          "We track the data you need for California sales-and-use tax and for year-end 1099 filing as part of keeping your books accurate, and we'll flag deadlines so nothing slips.",
      },
      {
        question: "How do I get my information to you each month?",
        answer:
          "Most clients connect their bank and card feeds so transactions flow in automatically, and share receipts and documents digitally. We keep the monthly lift on your side as light as possible.",
      },
    ],
  },
  {
    id: "tax-return-review",
    title: "Tax Preparation & Return Review",
    category: "Tax",
    tag: "Tax",
    description:
      "Full preparation of business and personal returns, plus review of previously filed returns to find missed deductions, credits, and savings you may still be able to recover.",
    icon: "FileMagnifyingGlass",
    slug: "tax-preparation-fremont",
    metaTitle: "Tax Preparation & Return Review in Fremont, CA | ADL",
    metaDescription:
      "Fremont, CA CPA preparing federal & California returns for individuals, partnerships, LLCs, S-Corps, and C-Corps, plus prior-year return reviews to recover missed savings.",
    heroTagline:
      "Prepare this year's return right, and find what last year's left on the table.",
    relatedCategorySlugs: ["Tax"],
    body: [
      {
        heading: "Two ways to work with us on taxes",
        paragraphs: [
          "ADL handles tax on both ends. We prepare and file new returns, and we review returns you've already filed to find money that may still be recoverable. Most owners start with one and come back for the other. Whichever fits your situation, you're working with a licensed California CPA and IRS-credentialed preparer, not seasonal help.",
        ],
      },
      {
        heading: "Prior-Year Tax Return Review",
        paragraphs: [
          "If you've already filed, this is the low-risk place to start: you're not committing to anything beyond finding out what was missed. Garrett reviews your previously filed business and personal returns to identify deductions, credits, and elections that were overlooked, and quantifies the savings that may still be recoverable through amended returns.",
          "Returns prepared in a hurry, or by software that doesn't know your business, routinely leave money behind: a missed home-office or vehicle allocation, depreciation that wasn't optimized, an election that was never made, credits the preparer didn't ask about. As a general rule, amended returns can reach back within three years of filing, so the question of whether it's worth a look has a time limit. (That three-year window is a general rule, not advice on your specific return; we'll confirm what applies to you.)",
          "You already did the hard part by filing. The review tells you what was left on the table and whether it's worth recovering.",
        ],
      },
      {
        heading: "Tax Return Preparation",
        paragraphs: [
          "On the preparation side, ADL handles full preparation and filing of new business and personal returns. Garrett is an IRS-credentialed preparer with an EFIN and PTIN and a licensed California CPA, so the same person who understands your books and your entity structure is the one signing your return.",
          "We prepare both federal and California returns for individuals, partnerships, LLCs, S-Corps, and C-Corps. Because we work year-round, not just in filing season, preparation isn't a once-a-year data dump. The structure decisions, the bookkeeping, and the return all line up, which is how you actually keep your tax bill down rather than just reporting it accurately after the fact.",
        ],
      },
      {
        heading: "California and federal, handled together",
        paragraphs: [
          "California's rules don't always track the federal code, and the mismatches are where returns go wrong: conformity differences, the franchise tax, S-Corp state-level tax, pass-through entity elections. Preparing both returns together means those interactions are handled deliberately instead of patched at the end.",
          "Whether you need this year's return done right or last year's checked for missed savings, you'll know exactly what's being filed and why.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you review a tax return I already filed?",
        answer:
          "Yes. A prior-year review examines returns you've already filed to find missed deductions, credits, and elections, and tells you whether the savings are worth recovering through an amended return. It's a low-risk way to find out what was left on the table.",
      },
      {
        question: "How far back can amended returns recover missed savings?",
        answer:
          "As a general rule, amended returns can be filed within three years of the original filing date (or two years from when the tax was paid, if later). That's a general guideline rather than advice on your specific return; we'll confirm exactly what applies to your situation.",
      },
      {
        question: "Do you prepare both business and personal returns?",
        answer:
          "Yes. We prepare federal and California returns for individuals as well as partnerships, LLCs, S-Corps, and C-Corps. Handling the business and personal sides together is often where the real planning happens.",
      },
      {
        question: "What do you charge for tax preparation?",
        answer:
          "Pricing depends on the entity type and the complexity of the return: a single-member LLC is very different from a multi-owner S-Corp with payroll. We'll give you a clear quote up front after a short conversation about your situation, with no surprise fees.",
      },
      {
        question: "Are you credentialed to file returns?",
        answer:
          "Yes. Garrett is a licensed California CPA and an IRS-credentialed preparer with an EFIN and PTIN, authorized to prepare and electronically file federal and state returns.",
      },
      {
        question: "Can you both prepare this year and review last year?",
        answer:
          "Absolutely, many clients do both. We'll often review a prior return while preparing the current one, since the same look at your situation surfaces opportunities in both directions.",
      },
    ],
  },
  {
    id: "payroll-implementation",
    title: "Payroll Implementation",
    category: "Operations",
    tag: "Operations",
    description:
      "Select, configure, and launch the right payroll provider for your team size and structure, and stay compliant with California payroll regulations.",
    icon: "UsersThree",
    slug: "payroll-setup-california",
    metaTitle: "Payroll Provider Setup for California Small Businesses | ADL",
    metaDescription:
      "Set up payroll the right way for your California small business: provider selection, EDD registration, and compliance with state payroll rules, guided by a CPA.",
    heroTagline:
      "Run payroll that's compliant with California's rules from the first check.",
    relatedCategorySlugs: ["Payroll"],
    body: [
      {
        heading: "Payroll is where compliance mistakes get expensive fast",
        paragraphs: [
          "Payroll feels like a solved problem until you're the one responsible for it. Misclassify an employee as a contractor, miss an EDD deposit, or set up withholding wrong, and the penalties stack up quickly, and in California, the rules are stricter than most owners expect.",
          "ADL helps you select, configure, and launch payroll correctly the first time, so you're compliant from the first check instead of cleaning up after a notice arrives.",
        ],
      },
      {
        heading: "Choosing the right provider for your team",
        paragraphs: [
          "There's no single best payroll provider; the right one depends on your team size, whether you have hourly or salaried staff, contractors, multiple states, or benefits to administer. We help you cut through the sales pitches and pick the platform that fits how you actually operate, then configure it correctly rather than leaving you with a half-finished setup.",
          "That includes the unglamorous but critical parts: pay schedules, deductions, benefit and retirement contributions, and the workflows so running payroll takes minutes, not an afternoon of second-guessing.",
        ],
      },
      {
        heading: "California payroll compliance, specifically",
        paragraphs: [
          "California adds layers most payroll setups get wrong. You need to register with the EDD and handle state payroll taxes (UI, ETT, SDI) on top of federal withholding and FICA. Worker classification is heavily enforced under California's ABC test, and getting it wrong is one of the most expensive mistakes a small employer can make.",
          "Then there are the details: itemized wage-statement requirements, sick-leave accrual, final-paycheck timing rules, and new-hire reporting. We make sure your system and your process satisfy these so you're not exposed. The goal isn't just software that runs payroll; it's a setup that keeps you on the right side of California's labor and tax agencies.",
        ],
      },
      {
        heading: "Set up to run cleanly, with backup when you need it",
        paragraphs: [
          "Once payroll is live, it should be boring, and that's the point. We get the foundation right so the recurring runs are routine, and we make sure payroll data flows cleanly into your books so it's not a separate reconciliation headache every quarter.",
          "Because ADL also handles bookkeeping and tax, your payroll, your financials, and your returns all reconcile. If a question or a notice ever does come up, you have a CPA who already understands your setup.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which payroll provider should I use?",
        answer:
          "It depends on your team and how you operate: number of employees, hourly vs. salaried, contractors, benefits, and whether you run in more than one state. We help you choose based on your actual needs rather than steering you to one platform.",
      },
      {
        question: "What do I have to register for to run payroll in California?",
        answer:
          "California employers generally register with the EDD and handle state payroll taxes (UI, ETT, SDI) alongside federal withholding and FICA. We make sure registrations and your provider settings are in place before your first run.",
      },
      {
        question: "How do I know if someone should be a W-2 employee or a 1099 contractor?",
        answer:
          "California uses the strict ABC test, and misclassification carries serious penalties. We'll walk through how your workers are engaged and help you classify them defensibly rather than guessing.",
      },
      {
        question: "Can you fix a payroll setup that's already a mess?",
        answer:
          "Yes. We regularly clean up existing setups (wrong tax settings, missed registrations, payroll that doesn't reconcile to the books) and get you onto a compliant, repeatable process.",
      },
      {
        question: "Does payroll connect to my bookkeeping?",
        answer:
          "It should, and we set it up that way. Clean payroll data flowing into your books means your financials and tax filings reconcile without a separate quarterly scramble.",
      },
    ],
  },
  {
    id: "technology-implementations",
    title: "Technology Implementations",
    category: "Tech",
    tag: "Tech",
    description:
      "QuickBooks setup, point-of-sale systems, and other small business tools, configured correctly from day one so you get the data you actually need.",
    icon: "Desktop",
    slug: "quickbooks-setup-bay-area",
    metaTitle: "QuickBooks Setup & Cleanup, Bay Area | ADL Business Consulting",
    metaDescription:
      "QuickBooks setup and cleanup for Bay Area small businesses, configured by a CPA so your chart of accounts and reports give you data you can actually use.",
    heroTagline:
      "Set up QuickBooks the way a CPA reads it, so the reports actually mean something.",
    relatedCategorySlugs: ["Technology"],
    body: [
      {
        heading: "Software is only as good as the way it's set up",
        paragraphs: [
          "QuickBooks, a point-of-sale system, an inventory tool: none of it helps if it's configured wrong. The most common reason small business owners don't trust their own numbers is that the system was set up in a rush, by someone following default settings instead of thinking about what the business actually needs to see.",
          "ADL configures your tools correctly from day one, so the data coming out the other end is something you can act on, and something your accountant and tax preparer can rely on without redoing it.",
        ],
      },
      {
        heading: "QuickBooks setup and cleanup, done by a CPA",
        paragraphs: [
          "The difference between QuickBooks set up by a CPA and QuickBooks set up by a generalist shows up in the chart of accounts. Set up well, it maps cleanly to how you make decisions and how your tax return is built. Set up poorly, it sprawls into hundreds of overlapping categories, mixes personal and business spending, and produces reports nobody trusts.",
          "Whether you're starting fresh or staring at a file that's become a mess, we'll build or rebuild it properly: a sensible chart of accounts, connected bank and card feeds, correct opening balances, and the recurring transactions and rules that keep day-to-day entry fast and accurate. If you've got a tangled existing file, cleanup often pays for itself the first time you produce a report you can actually believe.",
        ],
      },
      {
        heading: "The rest of your small business stack",
        paragraphs: [
          "Beyond QuickBooks, most businesses run a handful of other tools: a point-of-sale system, invoicing, expense capture, time tracking, maybe inventory. The value isn't any single app; it's making them talk to each other so data flows automatically instead of being re-keyed by hand, where errors creep in.",
          "We help you choose tools that fit your size and budget (not the enterprise package a salesperson pushed), configure them, and connect them so your financial picture stays current without constant manual work. The aim is a stack that runs quietly in the background and feeds you accurate numbers.",
        ],
      },
      {
        heading: "Tools chosen for the data you actually need",
        paragraphs: [
          "Because the same practice handles your books and your taxes, technology decisions are made with the end in mind: clean financials, an easy tax season, and reports that answer the questions you actually ask. You won't end up with an impressive-looking system that produces numbers you can't use.",
          "Set it up right once, and the software does what it was supposed to do: give you back time and give you data you trust.",
        ],
      },
    ],
    faqs: [
      {
        question: "My QuickBooks file is a mess. Is it worth cleaning up or should I start over?",
        answer:
          "Usually cleanup is faster and preserves your history, but it depends on how tangled the file is. We'll assess it and recommend the path that gets you to trustworthy reports with the least disruption.",
      },
      {
        question: "QuickBooks Online or Desktop?",
        answer:
          "For most small businesses we recommend QuickBooks Online for its bank feeds, accessibility, and integrations, but the right answer depends on your workflow. We'll help you decide and set it up accordingly.",
      },
      {
        question: "Why does a CPA set up QuickBooks differently?",
        answer:
          "A CPA builds the chart of accounts so it maps to how your tax return and decisions work, not just to record transactions. That's the difference between reports you trust and a file that has to be reworked at tax time.",
      },
      {
        question: "Can you connect QuickBooks to my other tools?",
        answer:
          "Yes. We help connect point-of-sale, invoicing, expense, and similar tools so data flows automatically instead of being entered twice, which is where errors and wasted time come from.",
      },
      {
        question: "Do you provide training once it's set up?",
        answer:
          "We make sure you and your team know how to run the day-to-day (entering transactions, invoicing, pulling reports) so the system stays clean after we hand it off.",
      },
    ],
  },
  {
    id: "business-process-optimization",
    title: "Business Process Optimization",
    category: "Consulting",
    tag: "Consulting",
    description:
      "Identify inefficiencies, reduce operational costs, and build scalable workflows, from back-office finance to customer-facing processes.",
    icon: "ArrowsClockwise",
    slug: "business-process-optimization",
    metaTitle: "Business Process Optimization for Small Businesses | ADL",
    metaDescription:
      "A CPA's outside look at where your small business loses time and money, from back-office finance to customer-facing workflows, with practical fixes.",
    heroTagline:
      "Find where the business leaks time and money, then fix the workflow.",
    relatedCategorySlugs: ["Business Strategy"],
    body: [
      {
        heading: "Growth hides inefficiency until it doesn't",
        paragraphs: [
          "Most small businesses grow by adding effort, not by improving process. That works until the manual workarounds, the double data entry, and the \"that's just how we've always done it\" steps start eating real money and real hours. By then the waste is baked into the routine and hard to see from the inside.",
          "ADL brings an outside, numbers-first perspective to find where your business actually loses time and margin, then helps you build workflows that scale instead of strain.",
        ],
      },
      {
        heading: "Where the money leaks",
        paragraphs: [
          "The leaks are usually mundane: an invoicing process that lets receivables age, manual re-keying between systems that introduces errors, approval steps that exist for no reason, vendor costs nobody has reviewed in years. None of them feel urgent on their own, but together they quietly compress your margin.",
          "We start by understanding how work actually flows (not the org chart version, the real one) and follow the money and the time. Because the analysis is grounded in your financials, the recommendations are concrete and prioritized by impact, not a generic list of best practices.",
        ],
      },
      {
        heading: "Practical fixes that stick",
        paragraphs: [
          "The goal isn't a binder of recommendations you'll never implement. It's a short list of changes that pay off, sequenced so you can actually do them: tighten the back-office finance workflow, automate the steps worth automating, renegotiate or cut costs that don't earn their keep, and build repeatable processes so the business depends less on any one person holding it together.",
          "Because the same practice understands your books and your taxes, the improvements reinforce each other: cleaner operations feed cleaner financials feed an easier tax season.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is this different from general business consulting?",
        answer:
          "It's grounded in your actual financials. Rather than abstract strategy, we follow where time and money go and prioritize fixes by their measurable impact on your margin and your workload.",
      },
      {
        question: "Do I need to be a certain size for this to be worth it?",
        answer:
          "No. Even a small team usually has a few processes quietly costing more than they should. We scope the work to your size so the effort is proportional to the payoff.",
      },
      {
        question: "Will this disrupt how my team currently works?",
        answer:
          "We sequence changes so they're adoptable, starting with the highest-impact, lowest-disruption fixes. The point is to make work easier, not to impose a system nobody follows.",
      },
      {
        question: "Can you help implement the changes, not just recommend them?",
        answer:
          "Yes. We can stay involved through implementation (setting up the tools, rebuilding the workflow, and confirming the change actually took) rather than handing you a report and walking away.",
      },
    ],
  },
  {
    id: "personal-finance-education",
    title: "Personal Finance Education",
    category: "Education",
    tag: "Education",
    description:
      "Practical guidance on budgeting, debt management, retirement planning, and building wealth, designed for individuals and small business owners.",
    icon: "GraduationCap",
    slug: "personal-finance-education",
    metaTitle: "Personal Finance Education & Coaching | ADL Business Consulting",
    metaDescription:
      "Personal finance guidance from a CPA, in layman's terms: budgeting, debt, retirement, and wealth-building for individuals and small business owners.",
    heroTagline:
      "Understand your own money the way a CPA does, in layman's terms.",
    relatedCategorySlugs: ["Personal Finance"],
    body: [
      {
        heading: "Most people were never taught this, and it shows",
        paragraphs: [
          "Budgeting, debt, retirement, taxes: almost nobody gets a real education in any of it, and the financial industry often benefits from keeping it confusing. The result is smart, capable people making big money decisions on instinct and hoping it works out.",
          "ADL's personal finance education is the opposite of a sales pitch. It's straightforward, jargon-free guidance from a CPA whose job is to explain, not to sell you a product. The goal is for you to understand your own money well enough to make confident decisions.",
        ],
      },
      {
        heading: "The fundamentals, made usable",
        paragraphs: [
          "We cover the things that actually move the needle: building a budget you'll keep, paying down debt in the order that costs you least, setting up the right savings and retirement accounts, and understanding how your decisions interact with your taxes. For business owners, that includes the blurry line between personal and business finances and how to keep it clean.",
          "This isn't theory. It's tailored to your situation, your income, and your goals, in language that finally makes the moving parts make sense.",
        ],
      },
      {
        heading: "Especially valuable for small business owners",
        paragraphs: [
          "When you own a business, your personal and business finances are deeply intertwined: how you pay yourself, how you save for retirement through the business, how your entity choice affects your personal taxes. Generic personal-finance advice misses all of that. Working with a CPA who sees both sides means the guidance actually fits an owner's reality.",
          "You walk away understanding not just what to do, but why, so you can keep making good decisions long after our conversation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this financial advising or selling me products?",
        answer:
          "Education, not product sales. The goal is to help you understand your own finances and make confident decisions; there's nothing being sold to you on commission.",
      },
      {
        question: "Who is this for?",
        answer:
          "Individuals who want to finally understand budgeting, debt, and retirement, and small business owners whose personal and business finances are intertwined. We tailor the guidance to your situation.",
      },
      {
        question: "Can you help me with retirement savings as a business owner?",
        answer:
          "Yes, understanding the retirement-savings options available through your business and how they interact with your taxes is one of the most valuable areas for owners, and one generic advice usually misses.",
      },
      {
        question: "Do you give specific investment recommendations?",
        answer:
          "Our focus is education and the tax-aware side of personal finance rather than recommending specific securities. We'll help you understand the landscape so you can make informed choices and ask the right questions of any investment professional.",
      },
    ],
  },
  {
    id: "website-app-development",
    title: "Website & App Development",
    category: "Tech",
    tag: "Tech",
    description:
      "Modern, responsive websites and web apps for your business, built and maintained so your online presence is always working for you.",
    icon: "Code",
    slug: "website-app-development",
    metaTitle: "Website & App Development for Small Businesses | ADL",
    metaDescription:
      "Modern, fast, responsive websites and web apps for small businesses, built and maintained so your online presence keeps working for you.",
    heroTagline:
      "A fast, modern site that actually brings in business, and stays maintained.",
    relatedCategorySlugs: ["Technology"],
    body: [
      {
        heading: "Your website should earn its keep",
        paragraphs: [
          "For a lot of small businesses, the website is an afterthought: built once, never updated, slow, and quietly turning away the customers it was supposed to attract. A good site does the opposite: it loads fast, looks credible, works on a phone, and makes it easy for someone to become a customer.",
          "ADL builds modern, responsive websites and web apps and keeps them maintained, so your online presence is an asset that works for you rather than a box you checked years ago.",
        ],
      },
      {
        heading: "Built modern, built to last",
        paragraphs: [
          "We build with current tools and best practices: fast load times, mobile-first responsive design, sensible structure for search visibility, and clean code that won't be a liability to update later. The result is a site that's quick, accessible, and easy to keep current, not a fragile template that breaks the moment you need a change.",
          "Whether you need a straightforward marketing site, a blog, or a more involved web app with custom functionality, we scope it to what your business actually needs rather than overbuilding.",
        ],
      },
      {
        heading: "Maintained, not abandoned",
        paragraphs: [
          "The reason most small business sites go stale is that there's no plan to maintain them. We build yours so updates are easy and, where it makes sense, handle the ongoing maintenance so it stays fast, secure, and current. A site that's kept up to date keeps working; one that's left untouched becomes a liability.",
          "And because ADL understands the business behind the website, the work is oriented around results (bringing in inquiries and customers), not just shipping something that looks nice.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build from a template or from scratch?",
        answer:
          "It depends on what you need. For many businesses a well-built, customized site is the right balance of cost and quality; for more involved web apps we build custom functionality. We scope it to your needs rather than over- or under-building.",
      },
      {
        question: "Will my site work well on phones and load fast?",
        answer:
          "Yes, mobile-first responsive design and fast load times are baseline, not extras. Most of your visitors are on a phone, and speed directly affects whether they stay.",
      },
      {
        question: "Can you maintain the site after it launches?",
        answer:
          "Yes. We can build it so updates are easy for you, handle ongoing maintenance ourselves, or a mix of both, so the site stays fast, secure, and current instead of going stale.",
      },
      {
        question: "Can you also handle the blog or content setup?",
        answer:
          "We can set up a content system that's easy to publish to, so your team can keep the site fresh without needing a developer for every change.",
      },
    ],
  },
  {
    id: "ai-agent-implementation",
    title: "AI Agent Implementation",
    category: "Innovation",
    tag: "Innovation",
    description:
      "Deploy AI-powered tools and automations tailored to your workflows, from customer service to intelligent financial reporting assistants.",
    icon: "Robot",
    slug: "ai-agent-implementation",
    metaTitle: "AI Agent Implementation for Small Businesses | ADL",
    metaDescription:
      "Practical AI automation for small businesses: customer service, admin, and financial reporting assistants tailored to your workflows by a CPA-led team.",
    heroTagline:
      "Put AI to work on the busywork: practically, and tied to real results.",
    relatedCategorySlugs: ["Technology"],
    body: [
      {
        heading: "AI for small businesses, minus the hype",
        paragraphs: [
          "AI is genuinely useful for small businesses, but most of the conversation around it is either breathless hype or vague fear. The practical reality is more grounded: there are specific, repetitive tasks in every business that AI tools can now handle well, freeing you and your team for the work that actually needs a human.",
          "ADL helps you cut through the noise and deploy AI where it earns its keep, tailored to your workflows, tied to real outcomes, not adopting technology for its own sake.",
        ],
      },
      {
        heading: "Where AI actually helps right now",
        paragraphs: [
          "The wins tend to be concrete: an assistant that handles routine customer inquiries so they're answered instantly, automations that take care of repetitive admin and data entry, and tools that help summarize and surface insights from your financial reporting. The common thread is offloading the predictable, time-consuming work that doesn't need your judgment.",
          "We start from your workflows and find the spots where AI removes a real bottleneck, rather than bolting on a chatbot because everyone else has one. The aim is measurable time saved and fewer misses.",
        ],
      },
      {
        heading: "Implemented responsibly, with a CPA's eye on the numbers",
        paragraphs: [
          "Anything touching your financial data has to be handled carefully; accuracy and privacy aren't optional. Because ADL approaches this with a CPA's standards, AI tools that touch your numbers are implemented with appropriate guardrails and human review, not blind trust in an output.",
          "You get practical automation that fits how you actually work, set up by someone who understands both the technology and the business it's serving.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is AI actually useful for a business my size?",
        answer:
          "Often, yes: the best uses are narrow and practical, like handling routine inquiries or repetitive admin. We focus on specific tasks where AI clearly saves time rather than adopting it for its own sake.",
      },
      {
        question: "Where do most small businesses see the quickest win?",
        answer:
          "Usually in offloading predictable, repetitive work: routine customer questions, data entry, and summarizing reports. We look at your workflows to find the bottleneck worth automating first.",
      },
      {
        question: "Is it safe to let AI near my financial data?",
        answer:
          "Only with the right guardrails. We implement anything touching your numbers with appropriate controls and human review, applying a CPA's standards for accuracy and privacy rather than blind trust in an output.",
      },
      {
        question: "Do I need technical staff to use what you set up?",
        answer:
          "No. We set up automations to fit how your team already works and make sure they're usable day-to-day without needing a developer on hand.",
      },
    ],
  },
];

/** The single featured service: the one flagged `featured`, else the first. */
export const FEATURED_SERVICE: Service =
  SERVICES.find((s) => s.featured) ?? SERVICES[0];

/** Services that are not the featured one, in declared order. */
export const STANDARD_SERVICES: Service[] = SERVICES.filter(
  (s) => s !== FEATURED_SERVICE,
);

/** Filter-tab categories derived dynamically from the data (never hardcoded). */
export const SERVICE_CATEGORIES: ServiceCategory[] = Array.from(
  new Set(SERVICES.map((s) => s.category)),
);

/** The five priority pages for footer/nav linking, in declared spec order. */
export const PRIORITY_SERVICE_SLUGS = [
  "bookkeeping-services-fremont",
  "tax-preparation-fremont",
  "entity-structure-review",
  "payroll-setup-california",
  "quickbooks-setup-bay-area",
] as const;

/** Lookup a service by its URL slug. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
