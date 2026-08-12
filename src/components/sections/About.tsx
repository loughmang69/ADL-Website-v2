import { PhoneIcon, EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import HeadshotFrame from "@/components/ui/HeadshotFrame";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { SITE, ABOUT_BIO } from "@/data/content";

// Unlike the Hero's third stat, these are not derived from SERVICES.length.
// They are biographical, so they are stated directly.
const STATS = [
  { value: "15+", label: "Years in Finance" },
  { value: "13+", label: "Years Licensed" },
  { value: "3", label: "Core Services" },
];

export default function About() {
  return (
    <section id="about" className="bg-surface-soft px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
        {/* Photo column (45%) */}
        <div className="animate-fade-in-up motion-reduce:animate-none lg:col-span-5">
          <HeadshotFrame className="mx-auto max-w-sm lg:mx-0" />
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              Licensed CPA Since {SITE.cpaSince}
            </span>
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              {SITE.locationLabel}
            </span>
          </div>
        </div>

        {/* Text column (55%) */}
        <div className="animate-fade-in-up motion-reduce:animate-none [animation-delay:120ms] lg:col-span-7">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Meet Your Advisor
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-deepest md:text-5xl">
            {SITE.founderTitle}
          </h2>
          <div className="mt-6 space-y-4 text-navy-soft">
            {ABOUT_BIO.map((para, i) => (
              <p key={i} className="max-w-prose leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Stats */}
          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-navy-deepest/10 pt-6">
            {STATS.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                valueClassName="block text-2xl font-black tracking-tight text-navy md:text-3xl"
                labelClassName="mt-1 block text-xs leading-tight text-navy-soft"
              />
            ))}
          </dl>

          {/* Contact row */}
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Talk directly with your CPA
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-navy transition-colors hover:text-navy-deep"
            >
              <PhoneIcon size={20} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-navy transition-colors hover:text-navy-deep"
            >
              <EnvelopeIcon size={20} aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
