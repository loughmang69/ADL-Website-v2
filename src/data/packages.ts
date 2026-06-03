export interface Package {
  id: string;
  name: string; // e.g. "Starter", "Growth", "Professional"
  monthlyPrice?: number; // if undefined, renders "Custom pricing" instead of a dollar amount
  priceNote?: string; // optional qualifier, e.g. "per month, billed monthly"
  description: string; // 1-2 sentence pitch for this tier
  includes: string[]; // bullet list of what's included
  highlight?: boolean; // true = visually featured/recommended tier ("Most Popular" badge)
  ctaLabel?: string; // button text, defaults to "Get Started"
  ctaHref?: string; // defaults to "#contact"
}

// Empty until Garrett decides on pricing strategy.
// To launch pricing: add Package objects to this array and deploy.
export const PACKAGES: Package[] = [];
