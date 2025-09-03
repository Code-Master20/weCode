// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wind: {
          // "0%, 102%": { backgroundPosition: "0% 20%" },
          "50%": { backgroundPosition: "100% 10%" },
        },
      },
      animation: {
        wind: "wind linear infinite",
      },
    },
  },
  plugins: [],
}
