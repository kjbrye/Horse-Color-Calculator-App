/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        glam: {
          bg: "#f9fafb",
          card: "#ffffff",
          accent: "#9AE6B4",
          soft: "#1a202c"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 40px rgba(154, 230, 180, 0.25)'
      }
    },
  },
  plugins: [],
};
