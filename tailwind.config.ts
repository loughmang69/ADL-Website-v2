import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      /**
       * "Daylight" palette. Realigned to the brand kit exactly (`navy.DEFAULT`,
       * `accent`, and `surface.soft` are the documented logo/collateral values)
       * and rebalanced so the site no longer opens on a dark navy slab.
       *
       * CONTRAST RULE, do not break it: `accent` (#99CCFF) is 1.69:1 on white.
       * It is a DARK-SURFACE-ONLY colour, valid on `navy.deep`/`navy.DEFAULT`
       * grounds. Every interactive affordance on a light surface (link, hover,
       * focus ring) uses `navy.DEFAULT`, which is 8.65:1 on white. The previous
       * palette used `accent` for exactly that and shipped a 1.86:1 hover state
       * plus a focus ring that failed WCAG 2.2 SC 1.4.11.
       */
      colors: {
        navy: {
          deepest: "#101C2E", // ink: headings and body text
          deep: "#123259", // deep panel surface (contact band, footer)
          DEFAULT: "#1A4B8C", // brand primary, and ALL interactive text on light
          soft: "#4A5A72", // muted body text, 7.01:1 on white
        },
        accent: {
          DEFAULT: "#99CCFF", // brand accent — dark surfaces only, never text on light
          dim: "rgba(153,204,255,0.18)",
        },
        surface: {
          soft: "#EEF3FC", // page ground, == brand background
          line: "#D3DEEE", // hairline rules
        },
        danger: "#C2342F", // 5.49:1 on white; the old #e05a5a was 3.63:1 and failed
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "65ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      keyframes: {
        "chevron-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        // Entrance reveals are CSS-driven (not JS) so content is never hidden
        // behind hydration: keyframes always finish at the visible state, and
        // if the stylesheet fails to load the element keeps its default
        // (visible) opacity. Disable under prefers-reduced-motion via the
        // `motion-reduce:animate-none` utility at the call site.
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "chevron-bounce": "chevron-bounce 1.8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
