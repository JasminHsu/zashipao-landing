import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2",
          d: "#F0EBE0",
          dd: "#E5DED3"
        },
        border: {
          DEFAULT: "#DDD6CB",
          d: "#C8C0B4"
        },
        ink: "#1C1917",
        muted: "#6B6258",
        light: "#A89E95",
        terracotta: {
          DEFAULT: "#C4603A",
          d: "#A84E2E",
          lt: "#F5E8E2"
        },
        forest: {
          DEFAULT: "#4A7260",
          lt: "#DFF0E9"
        },
        lavender: {
          DEFAULT: "#7062A3",
          lt: "#EEEAF8"
        },
        amberish: {
          DEFAULT: "#B87C20",
          lt: "#F7EDD8"
        }
      },
      boxShadow: {
        soft: "0 2px 16px rgba(28,25,23,.08)",
        lift: "0 6px 32px rgba(28,25,23,.12)"
      },
      spacing: {
        "22": "5.5rem"
      },
      borderRadius: {
        xl2: "28px"
      },
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
        serif: ["Noto Serif TC", "serif"]
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".4", transform: "scale(.75)" }
        },
        tick: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        tick: "tick 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
