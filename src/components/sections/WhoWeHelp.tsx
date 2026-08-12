import Reveal from "@/components/ui/Reveal";
import { WHO_WE_HELP } from "@/data/content";

/**
 * Qualifies a visitor before they reach the services, in their own words.
 *
 * Laid out as stacked rows with a hanging label rather than a three-up card
 * grid: an identical icon-heading-text card grid is the single most generic
 * pattern available here, and this section sits directly above Services, so
 * two card grids in a row would read as a template.
 */
export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            {WHO_WE_HELP.eyebrow}
          </span>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
            {WHO_WE_HELP.heading}
          </h2>
        </Reveal>

        <dl className="mt-12 border-t border-navy-deepest/10">
          {WHO_WE_HELP.audiences.map((audience, i) => (
            <Reveal key={audience.title} delay={i * 70}>
              <div className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-navy-deepest/10 py-8 lg:grid-cols-[20rem_1fr]">
                <dt className="text-lg font-bold tracking-tight text-navy-deepest">
                  {audience.title}
                </dt>
                <dd className="max-w-prose leading-relaxed text-navy-soft">
                  {audience.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
