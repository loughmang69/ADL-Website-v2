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
      },
      animation: {
        "chevron-bounce": "chevron-bounce 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
