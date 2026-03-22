import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Jost'", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#faf8f5",
        gold: "#c9a96e",
        "gold-light": "#e8d5b0",
        "gold-dark": "#a07840",
        charcoal: "#2c2c2c",
        muted: "#8a8a8a",
      },
      letterSpacing: {
        widest: "0.25em",
        "ultra-wide": "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
