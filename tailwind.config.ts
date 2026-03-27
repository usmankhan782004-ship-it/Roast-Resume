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
        brand: {
          DEFAULT: "#ff4500",
          dark: "#cc3700",
          light: "#ff6633",
          glow: "rgba(255,69,0,0.35)",
        },
        dark: {
          DEFAULT: "#0a0a0a",
          card: "#141414",
          border: "#222222",
          muted: "#1a1a1a",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        brand: "0 0 30px rgba(255,69,0,0.4), 0 0 60px rgba(255,69,0,0.15)",
        "brand-sm": "0 0 15px rgba(255,69,0,0.3)",
        card: "0 4px 24px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(255,69,0,0.12) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(135deg, #141414 0%, #0f0f0f 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
