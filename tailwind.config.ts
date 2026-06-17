import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dce7f4",
          200: "#b9cfea",
          300: "#8fb0db",
          400: "#5f8ac9",
          500: "#3d6bb8",
          600: "#2d539c",
          700: "#253f7d",
          800: "#1e3060",
          900: "#0f1f42",
          950: "#080f21",
        },
        teal: {
          50: "#f0fdfc",
          100: "#ccfbf7",
          200: "#99f6f0",
          300: "#5eede7",
          400: "#2dd4d4",
          500: "#14b8b8",
          600: "#0d9292",
          700: "#0f7474",
          800: "#115d5d",
          900: "#124d4d",
          950: "#052e2e",
        },
        chemistry: {
          blue: "#0f1f42",
          teal: "#14b8b8",
          cyan: "#22d3ee",
          light: "#f0f9ff",
          accent: "#0ea5e9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "Tahoma", "Arial", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(20, 184, 184, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(14, 165, 233, 0.12) 0%, transparent 50%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
        "section-gradient":
          "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(15, 31, 66, 0.08)",
        "card-hover": "0 12px 40px rgba(15, 31, 66, 0.16)",
        glow: "0 0 30px rgba(20, 184, 184, 0.3)",
        "glow-lg": "0 0 60px rgba(20, 184, 184, 0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [
    // Add require("@tailwindcss/typography") after: npm install @tailwindcss/typography
  ],
};

export default config;
