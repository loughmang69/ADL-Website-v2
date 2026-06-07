import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deepest: "#0d1f3c",
          deep: "#142b56",
          DEFAULT: "#1a3d6e",
          soft: "#1a6a8a",
        },
        accent: {
          DEFAULT: "#67cbea",
          dim: "rgba(103,203,234,0.15)",
        },
        surface: {
          soft: "#f7f9fc",
        },
        danger: "#e05a5a",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
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
