"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import { ServiceIcon } from "@/components/ui/Icon";
import {
  FEATURED_SERVICE,
  STANDARD_SERVICES,
  SERVICE_CATEGORIES,
} from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TABS = ["All", ...SERVICE_CATEGORIES] as const;

function spanClass(index: number, total: number): string {
  if (total === 1) return "lg:col-span-12";
  if (index < 2) return "lg:col-span-6";
  return "lg:col-span-4";
}

export default function Services() {
  const [active, setActive] = useState<string>("All");
  // Cards must be visible without JS: the entrance animation is a
  // progressive enhancement, gated on the component having mounted on the
  // client. Before mount (SSR + first paint) we pass `initial={false}` so
  // Framer Motion renders cards in their visible "show" state instead of
  // baking `opacity:0` into the HTML — otherwise a hydration/JS failure
  // leaves the whole services grid (and its "Learn more" links) invisible.
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const visible = useMemo(
    () =>
      active === "All"
        ? STANDARD_SERVICES
        : STANDARD_SERVICES.filter((s) => s.category === active),
    [active],
  );

  const cardVariants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : { scale: 0.95 }) },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, ...(reduce ? {} : { scale: 0.95 }) },
  };

  return (
    <section id="services" className="bg-surface-soft px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-navy-soft">
          What We Do
        </span>
        <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-navy-deepest md:text-5xl">
          Services
        </h2>
        <p className="mt-4 max-w-prose text-navy-soft">
          From entity structure to bookkeeping, tax, and technology: practical
          help across the nine areas small businesses need most.
        </p>

        {/* Featured card */}
        <div className="group mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-deep to-navy-deepest p-8 text-white transition-transform duration-200 ease-out hover:scale-[1.01] md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <ServiceIcon
                  name={FEATURED_SERVICE.icon}
                  size={34}
                  weight="duotone"
                />
              </span>
              <div className="flex-1">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
                  {FEATURED_SERVICE.tag}
                </span>
                <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                  {FEATURED_SERVICE.title}
                </h3>
                <p className="mt-2 max-w-2xl text-white/70">
                  {FEATURED_SERVICE.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  href={`/services/${FEATURED_SERVICE.slug}`}
                  variant="light"
                  aria-label={`Learn more about ${FEATURED_SERVICE.title}`}
                >
                  Learn more
                </Button>
                <Button
                  href="/#contact"
                  variant="primary"
                  aria-label={`Get started with ${FEATURED_SERVICE.title}`}
                >
                  Get Started
                  <ArrowRightIcon size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-navy-deepest/10 pb-px"
          role="tablist"
          aria-label="Filter services by category"
        >
          {TABS.map((tab) => {
            const selected = active === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab)}
                className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors duration-150 active:scale-[0.97] ${
                  selected
                    ? "border-accent text-navy-deepest"
                    : "border-transparent text-navy-soft hover:text-navy-deepest"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Asymmetric grid */}
        <motion.div
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <motion.div
                key={service.id}
                layout={!reduce}
                variants={cardVariants}
                initial={mounted ? "hidden" : false}
                animate="show"
                exit="exit"
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                className={spanClass(i, visible.length)}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-navy-deepest">
            Not sure which services fit your situation? Let&rsquo;s talk through
            it.
          </p>
          <Button href="/#contact" variant="primary" className="shrink-0">
            Request a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
