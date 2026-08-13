"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A stat that counts up when it scrolls into view.
 *
 * Same safety rule as Reveal: the server-rendered output is the FINAL value, so
 * a JS failure leaves the real number on the page rather than a zero or a
 * blank. The count is an enhancement applied after mount, never a prerequisite
 * for the content being correct.
 *
 * Values are passed as display strings ("15+", "CPA", "3") because not every
 * stat is numeric. Anything without a leading number renders as-is and never
 * animates.
 */
type AnimatedStatProps = {
  value: string;
  label: string;
  /** Tailwind classes for the number. */
  valueClassName?: string;
  /** Tailwind classes for the label. */
  labelClassName?: string;
};

const DURATION_MS = 1000;

/** Splits "15+" into { number: 15, suffix: "+" }. Returns null for "CPA". */
function parseValue(value: string): { number: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: Number(match[1]), suffix: match[2] };
}

export default function AnimatedStat({
  value,
  label,
  valueClassName = "",
  labelClassName = "",
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min((now - start) / DURATION_MS, 1);
        // ease-out cubic: fast first, settles gently on the real number
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${Math.round(eased * parsed.number)}${parsed.suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            run();
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
    // `parsed` is derived from `value` and is stable for a given value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div ref={ref}>
      <dt className="sr-only">{label}</dt>
      <dd>
        {/* aria-hidden on the animating number: a screen reader should not be
            read a stream of intermediate values. The accessible name comes from
            the sr-only <dt> plus the visible label below. */}
        <span className={valueClassName} aria-hidden="true">
          {display}
        </span>
        <span className="sr-only">{value}</span>
        <span className={labelClassName}>{label}</span>
      </dd>
    </div>
  );
}
