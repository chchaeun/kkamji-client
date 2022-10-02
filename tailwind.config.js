const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      summer: ["HSSummer"],
    },
    extend: {
      colors: {
        pblue: "#5c3cde",
      },
    },
    screens: {
      sm: { min: "300px", max: "1000px" },
      lg: { min: "1000px" },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5c3cde",
          secondary: "#ebebeb",
          info: "#000000",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
};
