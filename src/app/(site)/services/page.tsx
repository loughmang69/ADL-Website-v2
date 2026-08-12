import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/content";
import { ServiceIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: { absolute: "Services for Fremont, CA Small Businesses | ADL" },
  description:
    "Tax preparation and review, bookkeeping and cleanup, and business advisory for Fremont, CA and East Bay small businesses, from a licensed CPA.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: `Services | ${SITE.shortName}`,
    description:
      "Tax preparation and review, bookkeeping and cleanup, and business advisory for Fremont, CA and East Bay small businesses.",
    url: `${SITE.url}/services`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-white px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          What We Do
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-navy-deepest md:text-6xl">
          Services
        </h1>
        <p className="mt-4 max-w-prose text-navy-soft">
          Three services for small businesses in Fremont and the East Bay: tax
          preparation and review, bookkeeping and cleanup, and business
          advisory, all handled directly by {SITE.founderName}, CPA. Entity
          structure, payroll, and systems work sits inside advisory. Explore a
          service to see how it works.
        </p>

        {/* Rows, matching the homepage. A three-up card grid for exactly three
            items is the pattern the redesign removed, and having the index
            contradict the section it mirrors would undo the point. */}
        <ul className="mt-12 border-t border-surface-line">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid grid-cols-1 items-start gap-x-8 gap-y-4 border-b border-surface-line py-9 transition-colors duration-200 ease-out hover:bg-surface-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 lg:grid-cols-[4rem_16rem_1fr_auto] lg:items-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-soft text-navy">
                  <ServiceIcon name={service.icon} size={28} weight="duotone" />
                </span>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-soft">
                    {service.tag}
                  </span>
                  <h2 className="mt-1.5 text-xl font-bold tracking-tight text-navy-deepest">
                    {service.title}
                  </h2>
                </div>

                <p className="max-w-prose leading-relaxed text-navy-soft">
                  {service.description}
                </p>

                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-navy-deep">
                  Learn more
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
