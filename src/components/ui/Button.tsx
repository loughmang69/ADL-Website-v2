import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "light" | "ghost";

/**
 * Each variant carries its own focus ring, because the correct ring colour
 * depends on the surface the button sits on. `navy` is 8.65:1 on white but only
 * 1.97:1 on `navy-deepest`; `accent` is the inverse. A single global ring cannot
 * satisfy both, and the previous shared `ring-accent` was invalid on every light
 * surface in the site.
 */
const VARIANTS: Record<Variant, string> = {
  // Solid brand fill. Sits on light grounds, so the ring is the accent, which
  // reads against both the button fill and the light surface around it.
  primary:
    "bg-navy text-white hover:bg-navy-deep " +
    "focus-visible:ring-navy focus-visible:ring-offset-2",
  // The primary CTA when it sits ON a dark panel (contact band, footer), where
  // `bg-navy` would be only 1.97:1 against the surface behind it.
  accent:
    "bg-accent text-navy-deepest hover:bg-accent/90 " +
    "focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep",
  secondary:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.04] " +
    "focus-visible:ring-navy focus-visible:ring-offset-2",
  // The only variant intended for dark surfaces.
  light:
    "border border-white/30 text-white hover:bg-white/10 " +
    "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep",
  ghost:
    "text-navy hover:text-navy-deepest " +
    "focus-visible:ring-navy focus-visible:ring-offset-2",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-out " +
  "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 " +
  "disabled:opacity-60 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
}

interface NativeButtonProps extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const ariaLabel = props["aria-label"];

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
