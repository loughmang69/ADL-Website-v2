import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/Icon";
import { SERVICES, type ServiceCategory } from "@/data/services";

/** Category-tinted icon containers, so no two rows read identically. */
const ICON_TINTS: Record<ServiceCategory, string> = {
  Tax: "bg-navy/[0.07] text-navy",
  Accounting: "bg-accent/25 text-navy-deep",
  Advisory: "bg-navy-deep/[0.09] text-navy-deep",
};

/**
 * Three services, as rows rather than cards.
 *
 * The filter tabs are gone: filtering three items is friction with no payoff,
 * and the tablist they were built on had no keyboard handling. The full-width
 * featured card is gone too, since singling one of three out reads as arbitrary
 * rather than deliberate.
 *
 * Deliberately NOT numbered. Services are a set, not a sequence, so numbering
 * them would be decoration imitating structure. The one numbered section on the
 * site is The ADL Approach, where order genuinely carries meaning.
 *
 * Now a server component: with no filter state there is nothing to hydrate
 * beyond the reveals.
 */
export default function Services() {
  return (
    <section id="services" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            What We Do
          </span>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
            Three things, done properly
          </h2>
          <p className="mt-4 max-w-prose text-navy-soft">
            Tax, books, and the decisions in between. Narrow on purpose, so each
            one is handled by the person you actually hired.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-surface-line">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <article className="group grid grid-cols-1 items-start gap-x-8 gap-y-4 border-b border-surface-line py-9 lg:grid-cols-[4rem_16rem_1fr_auto] lg:items-center">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${ICON_TINTS[service.category]}`}
                >
                  <ServiceIcon name={service.icon} size={28} weight="duotone" />
                </span>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-soft">
                    {service.tag}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold tracking-tight text-navy-deepest">
                    {service.title}
                  </h3>
                </div>

                <p className="max-w-prose leading-relaxed text-navy-soft">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-semibold text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn more
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-surface-soft p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-navy-deepest">
              Not sure where to start? Every engagement starts with a free
              conversation, not a sales pitch.
            </p>
            <Button href="/#contact" variant="primary" className="shrink-0">
              Request a Free Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
