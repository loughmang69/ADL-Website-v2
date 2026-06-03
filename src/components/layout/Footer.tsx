import Link from "next/link";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { SITE, DISCLAIMER_FOOTER_SENTENCE } from "@/data/content";

const NAV = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deepest text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-black tracking-tighter text-lg">
              <span className="text-accent">ADL</span>{" "}
              <span className="text-white">Business Consulting</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              {SITE.tagline}
            </p>
            <p className="mt-5 text-sm text-white/80">
              {SITE.founderName}, CPA — {SITE.license}
            </p>
            <p className="mt-1 text-sm text-white/50">
              © 2026 {SITE.name}. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-white/50">
              Navigation
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-white/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-white/50">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-sm text-white/80 transition-colors hover:text-accent"
                >
                  <PhoneIcon size={18} aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="inline-flex items-center gap-2 rounded-sm text-white/80 transition-colors hover:text-accent"
                >
                  <EnvelopeIcon size={18} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/80">
                <MapPinIcon size={18} aria-hidden="true" />
                {SITE.locationLabel}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/50">
            {DISCLAIMER_FOOTER_SENTENCE}{" "}
            <Link
              href="/disclaimer"
              className="rounded-sm font-semibold text-white/70 underline underline-offset-2 transition-colors hover:text-accent"
            >
              Full Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
