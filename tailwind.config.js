/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        chakra: "#38bdf8",   // blue chakra glow
        naruto: "#f97316",   // Naruto orange
        ninja: "#020617",    // deep night
      },
      boxShadow: {
        chakra: "0 0 25px rgba(56,189,248,0.6)",
        naruto: "0 0 25px rgba(249,115,22,0.6)",
      },
    },
  },
  plugins: [],
};
