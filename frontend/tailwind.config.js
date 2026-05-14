/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#1E1E1E",
          graphite: "#50525F",
          gold: "#EFA12D",
          "gold-light": "#f8c36d",
          paper: "#F4F1EA",
          night: "#080810",
          panel: "#101018",
          panel2: "#151522",
        },
        accent: {
          DEFAULT: "#EFA12D",
          light: "#f8c36d",
          dark: "#B9781E",
        },
        surface: {
          DEFAULT: "#080810",
          card: "#101018",
          raised: "#151522",
          border: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 60px rgba(239, 161, 45, 0.14)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.28)",
      },
      backgroundImage: {
        "brand-radial": "radial-gradient(circle at 20% 20%, rgba(239,161,45,0.18), transparent 30%)",
        "gold-line": "linear-gradient(90deg, transparent, rgba(239,161,45,0.8), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
