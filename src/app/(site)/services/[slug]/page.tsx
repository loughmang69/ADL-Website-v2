import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaretRightIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  SERVICES,
  getServiceBySlug,
  type Service,
} from "@/data/services";
import { SITE } from "@/data/content";
import { sanityFetch } from "@/lib/sanity/client";
import { POSTS_BY_CATEGORIES_QUERY } from "@/lib/sanity/queries";
import type { BlogPostListItem } from "@/lib/sanity/types";
import {
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/Icon";
import RelatedPosts from "@/components/blog/RelatedPosts";

export const revalidate = 60;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/** The visible H1: the keyword-first half of the meta title (before the brand). */
function pageHeading(service: Service): string {
  return service.metaTitle.split("|")[0].trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  const url = `${SITE.url}/services/${service.slug}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const heading = pageHeading(service);
  const url = `${SITE.url}/services/${service.slug}`;

  const related = service.relatedCategorySlugs?.length
    ? await sanityFetch<BlogPostListItem[]>(
        POSTS_BY_CATEGORIES_QUERY,
        { categories: service.relatedCategorySlugs },
        [],
      )
    : [];

  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Services", url: `${SITE.url}/services` },
    { name: heading, url },
  ];

  return (
    <article className="bg-white pb-24 pt-32">
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faqs)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-3xl px-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-soft">
            <li>
              <Link
                href="/"
                className="rounded-sm transition-colors hover:text-accent"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <CaretRightIcon size={14} />
            </li>
            <li>
              <Link
                href="/services"
                className="rounded-sm transition-colors hover:text-accent"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">
              <CaretRightIcon size={14} />
            </li>
            <li className="font-semibold text-navy-deepest" aria-current="page">
              {heading}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <header className="mx-auto mt-8 max-w-3xl px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          <ServiceIcon name={service.icon} size={16} weight="duotone" />
          {service.tag}
        </span>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-navy-deepest md:text-5xl">
          {heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-soft">
          {service.heroTagline}
        </p>
        <div className="mt-8">
          <Button href="/#contact" variant="primary">
            Request a Free Consultation
            <ArrowRightIcon size={18} aria-hidden="true" />
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto mt-14 max-w-3xl px-6">
        {service.body.map((section) => (
          <section key={section.heading} className="mt-10 first:mt-0">
            <h2 className="text-2xl font-black tracking-tight text-navy-deepest">
              {section.heading}
            </h2>
            {section.paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-4 text-base leading-relaxed text-navy-soft"
              >
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <div className="mx-auto mt-16 max-w-3xl px-6">
          <h2 className="text-2xl font-black tracking-tight text-navy-deepest">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 divide-y divide-navy-deepest/[0.08] border-y border-navy-deepest/[0.08]">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="text-lg font-bold tracking-tight text-navy-deepest">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-navy-soft">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-3xl px-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-navy-deep to-navy-deepest p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">
              Ready to talk it through?
            </p>
            <p className="mt-1 max-w-md text-white/70">
              No cost, no commitment: just a clear next step for your business.
            </p>
          </div>
          <Button href="/#contact" variant="primary" className="shrink-0">
            Request a Free Consultation
          </Button>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-6">
          <RelatedPosts posts={related} />
        </div>
      )}
    </article>
  );
}
