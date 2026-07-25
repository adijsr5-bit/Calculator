import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#6D5DF6", // Primary Accent Purple
          600: "#5B46F6",
          700: "#4c35e0",
          800: "#3f2aba",
          900: "#352496",
          950: "#211469",
        },
        surface: {
          light: "#F5F3FF",
          card: "#FFFFFF",
          purpleTint: "#F0EEFF",
          purpleGradStart: "#6D5DF6",
          purpleGradEnd: "#8B7CFF",
        },
      },
      borderRadius: {
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
      },
      boxShadow: {
        glass: "0 10px 40px -10px rgba(109, 93, 246, 0.08)",
        purple: "0 10px 30px -5px rgba(109, 93, 246, 0.3)",
        purpleGlow: "0 0 50px 0 rgba(109, 93, 246, 0.15)",
        card: "0 4px 25px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
