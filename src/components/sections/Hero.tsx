"use client";

import { motion, type Variants } from "framer-motion";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import HeadshotFrame from "@/components/ui/HeadshotFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "CPA", label: "CA License #150109" },
  { value: "9", label: "Practice Areas" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const fade = (y: number, delay = 0): Variants => ({
    hidden: { opacity: 0, ...(reduce ? {} : { y }) },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
    },
  });

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-deepest pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center">
        {/* Left column */}
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="show"
          variants={fade(20)}
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-accent">
            Bay Area, California · CPA Since 2013
          </span>
          <h1 className="mt-6 text-4xl font-black leading-none tracking-tightest text-white md:text-6xl">
            Big-firm expertise.{" "}
            <span className="text-accent">Small business focus.</span>
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-white/70 md:text-lg">
            ADL Business Consulting pairs deep CPA expertise with hands-on
            consulting so you spend less time on financials and more time
            growing what you built.
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
          <motion.dl
            className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
            }}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fade(10)}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-black tracking-tight text-accent md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-tight text-white/60">
                    {stat.label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* Mobile headshot (hidden on lg, where the right column shows it) */}
          <div className="mt-12 lg:hidden">
            <HeadshotFrame className="mx-auto max-w-xs" />
          </div>
        </motion.div>

        {/* Right column (desktop only) */}
        <motion.div
          className="hidden lg:col-span-5 lg:block"
          initial="hidden"
          animate="show"
          variants={fade(30, 0.2)}
        >
          <HeadshotFrame className="ml-auto max-w-sm" />
        </motion.div>
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
