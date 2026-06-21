import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/content";
import { ServiceIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: { absolute: "Services for Fremont, CA Small Businesses | ADL" },
  description:
    "Accounting, bookkeeping, tax preparation, entity structure, payroll, and QuickBooks setup for Fremont, CA and East Bay small businesses, from a licensed CPA.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: `Services | ${SITE.shortName}`,
    description:
      "Accounting, bookkeeping, tax, entity structure, payroll, and technology services for Fremont, CA and East Bay small businesses.",
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
        <h1 className="mt-2 text-4xl font-black tracking-tight text-navy-deepest md:text-6xl">
          Services
        </h1>
        <p className="mt-4 max-w-prose text-navy-soft">
          Practical help across the areas small businesses in Fremont and the
          East Bay need most: accounting, tax, entity structure, payroll, and
          technology, from {SITE.founderName}, CPA. Explore a service to see how
          it works.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-deepest/[0.08] bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:border-accent hover:shadow-xl hover:shadow-navy/5"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-surface-soft text-navy">
                    <ServiceIcon
                      name={service.icon}
                      size={26}
                      weight="duotone"
                    />
                  </span>
                  <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
                    {service.tag}
                  </span>
                </div>
                <h2 className="text-lg font-bold tracking-tight text-navy-deepest">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-soft">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-accent">
                  Learn more
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
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
