import type { Config } from "tailwindcss";

const config: Config = {
  // Include .jsx/.js — every case-blocks/* component is .jsx and otherwise
  // Tailwind purges any @layer components rules that target their classes.
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#111010", 600: "#3A3840", 400: "#6E6B78", 200: "#C7C4D0" },
        purple: {
          950: "#1B103F",
          900: "#2A1B5C",
          700: "#3D2B82",
          500: "#6955B8",
          300: "#B3A6DC",
          100: "#E5DFF2",
          50: "#F3F0FA",
        },
        paper: { DEFAULT: "#F6F3EC", dark: "#E9E4D7" },
        bone: "#FDFCF8",
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Newsreader"', "Georgia", '"Times New Roman"', "serif"],
        ui: ['"Inter"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        meta: "0.18em",
        wider2: "0.22em",
        tightDisplay: "-0.025em",
        tightHero: "-0.035em",
      },
      maxWidth: { wide: "1440px", content: "1200px", prose: "65ch" },
    },
  },
  plugins: [],
};
export default config;
