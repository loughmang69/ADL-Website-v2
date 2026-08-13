import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import HeadshotFrame from "@/components/ui/HeadshotFrame";
import AnimatedStat from "@/components/ui/AnimatedStat";
import { SERVICES } from "@/data/services";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "CPA", label: "CA License #150109" },
  { value: String(SERVICES.length), label: "Core Services" },
];

/**
 * Split hero on the brand ground.
 *
 * The dark navy slab is deliberately gone. Every firm in this category opens on
 * one, so keeping it would have made the redesign land on the category default;
 * the weight now comes from typography and space instead. The split structure
 * stays, since a centred hero is banned outright.
 *
 * Above the fold, so no scroll reveal: the CSS keyframe entrance always
 * finishes visible and never depends on JS.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-surface-soft pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center">
        {/* Left column */}
        <div className="animate-fade-in-up motion-reduce:animate-none lg:col-span-7">
          <span className="inline-block rounded-full border border-navy/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-navy">
            Fremont, CA · CPA Since 2013
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-deepest md:text-6xl">
            Taxes handled. Books clean.{" "}
            <span className="text-navy">Business clear.</span>
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-navy-soft md:text-lg">
            ADL Business Consulting, PC is a Fremont, CA CPA firm built around
            three
            things small business owners actually need: accurate tax
            preparation, bookkeeping that stays current, and straight answers on
            the decisions that shape your business. All handled directly by
            Garrett Loughman, CPA, not passed down a chain of associates. We
            also work with individuals who want that same direct approach to
            their taxes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#contact" variant="primary">
              Request a Free Consultation
            </Button>
            <Button href="/#services" variant="secondary">
              See How We Help
            </Button>
          </div>

          {/* Trust bar */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-deepest/15 pt-6">
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
        </div>

        {/* Single headshot: centred below the copy on mobile, right column on
            desktop. One <Image> render (responsive sizes) avoids a duplicate
            request while preserving the layout at every breakpoint. */}
        <div className="animate-fade-in-up motion-reduce:animate-none lg:col-span-5 lg:[animation-delay:150ms]">
          <HeadshotFrame
            className="mx-auto max-w-xs lg:ml-auto lg:mr-0 lg:max-w-sm"
            priority
          />
        </div>
      </div>

      {/* Scroll indicator. Retinted for the light ground; it was white/40 when
          this section was a dark slab. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <CaretDownIcon
          size={28}
          className="animate-chevron-bounce text-navy/30"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
