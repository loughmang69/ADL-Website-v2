"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link
      href="/"
      className="font-black tracking-tighter text-lg leading-none"
      aria-label="ADL Business Consulting — home"
    >
      <span className="text-accent">ADL</span>{" "}
      <span className={light ? "text-white" : "text-navy"}>
        Business Consulting
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid header whenever scrolled OR the mobile menu is open.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-navy-deepest/10 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Logo light={!solid} />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-sm transition-colors hover:text-accent ${
                    solid ? "text-navy" : "text-white/90"
                  }`}
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
          type="button"
          className="relative h-10 w-10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all duration-300 ${
              solid ? "bg-navy" : "bg-white"
            } ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
              solid ? "bg-navy" : "bg-white"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transition-all duration-300 ${
              solid ? "bg-navy" : "bg-white"
            } ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-white lg:hidden transition-[max-height] duration-300 ease-out ${
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
                  className="block rounded-lg px-3 py-3 text-base font-medium text-navy transition-colors hover:bg-surface-soft hover:text-accent"
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
