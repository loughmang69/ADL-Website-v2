export type ServiceCategory =
  | "Tax"
  | "Accounting"
  | "Operations"
  | "Tech"
  | "Consulting"
  | "Education"
  | "Innovation";

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  tag: string;
  description: string;
  featured?: boolean; // renders in the full-width featured card slot
  icon: string; // Phosphor icon component name (e.g. 'Buildings', 'Receipt')
  comingSoon?: boolean; // renders card with a "Coming Soon" badge, disabled state
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
  },
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    category: "Accounting",
    tag: "Accounting",
    description:
      "Keep your books clean, accurate, and audit-ready. Monthly reconciliation, categorization, and financial reporting tailored to your business.",
    icon: "ChartLineUp",
  },
  {
    id: "tax-return-review",
    title: "Tax Return Review",
    category: "Tax",
    tag: "Tax",
    description:
      "Comprehensive review of your business and personal tax returns to ensure accuracy, maximize deductions, and minimize your tax liability.",
    icon: "FileMagnifyingGlass",
  },
  {
    id: "payroll-implementation",
    title: "Payroll Implementation",
    category: "Operations",
    tag: "Operations",
    description:
      "Select, configure, and launch the right payroll provider for your team size and structure, and stay compliant with California payroll regulations.",
    icon: "UsersThree",
  },
  {
    id: "technology-implementations",
    title: "Technology Implementations",
    category: "Tech",
    tag: "Tech",
    description:
      "QuickBooks setup, point-of-sale systems, and other small business tools, configured correctly from day one so you get the data you actually need.",
    icon: "Desktop",
  },
  {
    id: "business-process-optimization",
    title: "Business Process Optimization",
    category: "Consulting",
    tag: "Consulting",
    description:
      "Identify inefficiencies, reduce operational costs, and build scalable workflows — from back-office finance to customer-facing processes.",
    icon: "ArrowsClockwise",
  },
  {
    id: "personal-finance-education",
    title: "Personal Finance Education",
    category: "Education",
    tag: "Education",
    description:
      "Practical guidance on budgeting, debt management, retirement planning, and building wealth — designed for individuals and small business owners.",
    icon: "GraduationCap",
  },
  {
    id: "website-app-development",
    title: "Website & App Development",
    category: "Tech",
    tag: "Tech",
    description:
      "Modern, responsive websites and web apps for your business, built and maintained so your online presence is always working for you.",
    icon: "Code",
  },
  {
    id: "ai-agent-implementation",
    title: "AI Agent Implementation",
    category: "Innovation",
    tag: "Innovation",
    description:
      "Deploy AI-powered tools and automations tailored to your workflows — from customer service to intelligent financial reporting assistants.",
    icon: "Robot",
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
