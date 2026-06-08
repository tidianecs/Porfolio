/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: "#3ecf8e", dark: "#2eb87d" },
        bg: { DEFAULT: "#0a0a0a", card: "#0d0d0d", hover: "#0f1f0f" },
        border: { DEFAULT: "#1a1a1a", green: "#3ecf8e" },
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

