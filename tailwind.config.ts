import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FC72FF",
        default: "#FC72FF",
        secondary: "#FEF4FF",
        neutral1: {
          DEFAULT: "#222222",
          hover: "#131313",
        },
        neutral2: {
          DEFAULT: "#7d7d7d",
          hover: "#6b6b6b",
        },
        neutral3: {
          DEFAULT: "#bfbfbf",
          hover: "#adadad",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#FC72FF",
            default: "#FC72FF",
            secondary: "#FEF4FF",
          },
        },
      },
    }),
  ],
} satisfies Config;
