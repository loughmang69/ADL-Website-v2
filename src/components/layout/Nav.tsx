"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="rounded-sm text-lg font-black leading-none tracking-tighter"
      aria-label="ADL Business Consulting — home"
    >
      <span className="text-navy">ADL</span>{" "}
      <span className="text-navy-deepest">Business Consulting</span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /**
   * While the mobile menu is open it behaves like a modal surface: Escape
   * closes it and returns focus to the toggle, and Tab is contained within it
   * so focus cannot wander into the page behind. Without this a keyboard user
   * who opened the menu would tab straight past it into content they cannot
   * see.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = menuRef.current?.querySelectorAll<HTMLElement>("a[href]");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const toggle = toggleRef.current;

      // The toggle sits outside the panel but is part of the same widget, so
      // the cycle runs: toggle -> links -> back to toggle.
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        toggle?.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        toggle?.focus();
      } else if (e.shiftKey && document.activeElement === toggle) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === toggle) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /**
   * The header used to flip between transparent and solid at a `scrollY > 40`
   * boolean, driven by a `window.addEventListener("scroll")`. Two problems:
   * the flip snapped, and it inverted the link colour to white on the
   * assumption of a dark hero behind it. The hero is now a light surface, so
   * the text stays dark at every scroll position and only the *backdrop*
   * animates in.
   *
   * The backdrop is a sibling layer whose opacity is interpolated from scroll
   * position, so nothing but `opacity` is animated and the text never reflows.
   */
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Backdrop layer. Purely decorative, so it is hidden from the a11y tree
          and never intercepts pointer events. */}
      <motion.div
        style={{ opacity: open ? 1 : backdrop }}
        className="pointer-events-none absolute inset-0 border-b border-navy-deepest/10 bg-white/95 shadow-sm backdrop-blur-md"
        aria-hidden="true"
      />

      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-navy-deepest transition-colors duration-150 hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/#contact" variant="primary" className="px-5 py-2.5">
            Free Consultation
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          type="button"
          className="relative h-10 w-10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-navy-deepest transition-transform duration-300 ease-out ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-navy-deepest transition-opacity duration-200 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-navy-deepest transition-transform duration-300 ease-out ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile slide-down menu.

          `inert` is what keeps the collapsed menu out of the keyboard tab order.
          Previously the panel was hidden with `max-h-0 overflow-hidden`, which
          hides it visually but leaves every link focusable, so a keyboard user
          tabbing through the page fell into an invisible menu. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        inert={!open}
        className={`relative overflow-hidden bg-white transition-[max-height] duration-300 ease-out lg:hidden ${
          open ? "max-h-96 border-b border-navy-deepest/10" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {[...NAV_LINKS, { label: "Contact", href: "/#contact" }].map(
            (link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-navy-deepest transition-colors hover:bg-surface-soft hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </header>
  );
}
