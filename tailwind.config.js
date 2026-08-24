/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D5E5E", // Dark Teal
          light: "#14A9A6", // Teal
        },
        accent: "#F59E0B", // Orange
        surface: "#F3F4F6",
        ink: "#111827",
        muted: "#687280",
      },
      fontFamily: {
        heading: ["Poppins", "Tajawal", "sans-serif"],
        body: ["Poppins", "Tajawal", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
