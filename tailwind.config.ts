import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — driven by the official logo (gold rings + garnet
        // wordmark on deep navy/black). Confirm with the team before final
        // launch; this is the working system per the design brief.
        ink: {
          // Warm charcoal/near-black family — previously a navy-black
          // (blue channel higher than red/green), which is what read as a
          // blue color cast on the hero/footer. Rebalanced warm so R >= B.
          DEFAULT: "#211C1A",
          light: "#332B27",
          deep: "#120F0D", // near-black, used for the richest hero/footer moments
        },
        moon: {
          DEFAULT: "#C7D2E8", // soft moonlight blue-grey — breathing space between sections
          light: "#EEF1F8",
          dark: "#8B9AC4",
        },
        gold: {
          DEFAULT: "#C9982E", // primary logo gold, muted for web/text use
          light: "#E7C878",
          dark: "#9C731C",
        },
        garnet: {
          DEFAULT: "#9B2C3E", // logo's red wordmark, deepened for legibility as an accent
          light: "#C24A5C",
        },
        accent: {
          DEFAULT: "#C9982E", // alias of gold — kept so existing utility classes stay valid
          light: "#E7C878",
        },
        canvas: "#FBF7EE", // warm ivory, slightly richer than plain white to sit with the gold
        ivory: "#F7F1E6", // same warm-cream family as canvas, used for text sitting on dark hero scenes
        charcoal: "#241D1A", // warm near-black (brown, not navy) — body text on light/champagne surfaces
      },
      fontFamily: {
        // var(--font-serif) / var(--font-sans) are set by next/font in
        // layout.tsx (Playfair Display + Inter); the old system-font stacks
        // stay as a fallback only, in case a page ever renders outside that
        // root layout.
        serif: [
          "var(--font-serif)",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
