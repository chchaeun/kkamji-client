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
    },
  },
  plugins: [],
};
