import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { BlogCategory } from "@/lib/sanity/types";
import { getServiceBySlug } from "@/data/services";
import { ServiceIcon } from "@/components/ui/Icon";

/**
 * Maps a blog post category to the most relevant service page. Categories
 * without a natural service match (e.g. Business Strategy, Personal Finance)
 * are intentionally omitted so the block only renders when it's a good fit.
 */
const CATEGORY_TO_SERVICE_SLUG: Partial<Record<BlogCategory, string>> = {
  Tax: "tax-preparation-fremont",
  Accounting: "bookkeeping-services-fremont",
  Technology: "quickbooks-setup-bay-area",
  Payroll: "payroll-setup-california",
};

export default function RelatedService({
  category,
}: {
  category?: BlogCategory;
}) {
  const slug = category ? CATEGORY_TO_SERVICE_SLUG[category] : undefined;
  const service = slug ? getServiceBySlug(slug) : undefined;
  if (!service) return null;

  return (
    <aside className="mt-14 overflow-hidden rounded-2xl border border-navy-deepest/[0.08] bg-surface-soft p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-navy">
            <ServiceIcon name={service.icon} size={24} weight="duotone" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              Related service
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-navy-deepest">
              {service.title}
            </p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-navy-soft">
              {service.heroTagline}
            </p>
          </div>
        </div>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Learn more
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
