import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8edf4",
          100: "#c5d0e3",
          200: "#9fb0cf",
          300: "#7890bb",
          400: "#5a78ad",
          500: "#3c60a0",
          600: "#2d4e8a",
          700: "#1e3a6e",
          800: "#122a52",
          900: "#0A2342",
          950: "#061529",
        },
        corc: {
          blue: "#0A2342",
          gold: "#C9A84C",
          red: "#C0392B",
          green: "#1A7F5A",
          lightblue: "#EBF4FA",
          amber: "#FFF3E0",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(10,35,66,0.08)",
        "card-hover": "0 6px 24px rgba(10,35,66,0.14)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
