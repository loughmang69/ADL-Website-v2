"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered reveal.
 *
 * The site has been burned before by entrance animations that baked
 * `opacity: 0` into the server-rendered HTML: a hydration or JS failure left
 * whole sections permanently invisible, including the service links inside
 * them (see commits fc2e251 and 663900e). This component is built so that
 * cannot happen.
 *
 * Three states:
 *   idle   the SSR and first-paint state. Fully visible, no transform, no
 *          transition. If JS never runs, the element simply stays here and the
 *          content is readable.
 *   hidden entered only from JS, and only for elements that are currently below
 *          the fold. Applied without a transition, so there is no visible
 *          fade-out; the user cannot see it happen because it is off-screen.
 *   shown  transitions in when the element scrolls into view.
 *
 * Elements already within the viewport at mount skip straight to `shown`, so
 * above-the-fold content never flashes.
 */
type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms. Keep between 60 and 80 per item within a group. */
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: render the final state, never animate position.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }

    // Already on screen: do not hide it just to animate it back in.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setState("shown");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motionClass =
    state === "hidden"
      ? "translate-y-6 opacity-0"
      : state === "shown"
        ? "translate-y-0 opacity-100 transition-[opacity,transform] duration-[600ms] ease-out-expo"
        : "";

  return (
    <div
      ref={ref}
      className={`${motionClass} ${className}`}
      style={state === "shown" && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
