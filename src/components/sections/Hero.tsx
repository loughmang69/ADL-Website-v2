import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import HeadshotFrame from "@/components/ui/HeadshotFrame";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "CPA", label: "CA License #150109" },
  { value: "9", label: "Practice Areas" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-deepest pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center">
        {/* Left column */}
        <div className="animate-fade-in-up motion-reduce:animate-none lg:col-span-7">
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-accent">
            Fremont, CA · CPA Since 2013
          </span>
          <h1 className="mt-6 text-4xl font-black leading-none tracking-tightest text-white md:text-6xl">
            Big-firm expertise.{" "}
            <span className="text-accent">Small business focus.</span>
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-white/70 md:text-lg">
            ADL Business Consulting is a Fremont, CA CPA firm that pairs deep
            accounting expertise with hands-on consulting, so you spend less time
            on financials and more time growing what you built.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#contact" variant="primary">
              Request a Free Consultation
            </Button>
            <Button href="/#services" variant="light">
              View Services
            </Button>
          </div>

          {/* Trust bar */}
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-black tracking-tight text-accent md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-tight text-white/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Mobile headshot (hidden on lg, where the right column shows it) */}
          <div className="mt-12 lg:hidden">
            <HeadshotFrame className="mx-auto max-w-xs" />
          </div>
        </div>

        {/* Right column (desktop only) */}
        <div className="hidden animate-fade-in-up motion-reduce:animate-none [animation-delay:150ms] lg:col-span-5 lg:block">
          <HeadshotFrame className="ml-auto max-w-sm" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <CaretDownIcon
          size={28}
          className="animate-chevron-bounce text-white/40"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
