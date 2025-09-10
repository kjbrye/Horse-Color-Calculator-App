/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        glam: {
          bg: "#f8fafc",
          card: "#ffffff",
          accent: "#16a34a",
          soft: "#070b17",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(22, 163, 74, 0.25)",
      },
    },
  },
  plugins: [],
};
