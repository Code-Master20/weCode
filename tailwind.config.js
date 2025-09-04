// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "wind-flow": "wind-flow 3s linear infinite",
      },
      keyframes: {
        "wind-flow": {
          "0%": {
            "background-position": "100% 50%", // Start from right
          },
          "100%": {
            "background-position": "0% 50%", // Smoothly move to left
          },
        },
      },
    },
  },
  plugins: [],
};
