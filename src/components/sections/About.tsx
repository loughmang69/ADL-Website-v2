"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneIcon, EnvelopeIcon } from "@phosphor-icons/react/dist/ssr";
import HeadshotFrame from "@/components/ui/HeadshotFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SITE, ABOUT_BIO } from "@/data/content";

const STATS = [
  { value: "15+", label: "Years in Finance" },
  { value: "13+", label: "Years Licensed" },
  { value: "9", label: "Practice Areas" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  const variant = (fromX: number) => ({
    hidden: { opacity: 0, ...(reduce ? {} : { x: fromX }) },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE_OUT_EXPO },
    },
  });

  return (
    <section id="about" className="bg-white px-6 py-24">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center"
      >
        {/* Photo column (45%) */}
        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={variant(-40)}
        >
          <HeadshotFrame className="mx-auto max-w-sm lg:mx-0" />
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              Licensed CPA Since {SITE.cpaSince}
            </span>
            <span className="rounded-full bg-surface-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
              {SITE.locationLabel}
            </span>
          </div>
        </motion.div>

        {/* Text column (55%) */}
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={variant(40)}
        >
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
            Meet Your Advisor
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
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
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-black tracking-tight text-navy md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-tight text-navy-soft">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Contact row */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-navy transition-colors hover:text-accent"
            >
              <PhoneIcon size={20} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="inline-flex items-center gap-2 rounded-sm font-medium text-navy transition-colors hover:text-accent"
            >
              <EnvelopeIcon size={20} aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
