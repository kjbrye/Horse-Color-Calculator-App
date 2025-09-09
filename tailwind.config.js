/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        glam: {
          bg: "#0b0f16",
          card: "#111827",
          accent: "#9AE6B4",
          soft: "#070B17"
        }
      },
      boxShadow: {
        'glow': '0 0 40px rgba(154, 230, 180, 0.25)'
      }
    },
  },
  plugins: [],
};
