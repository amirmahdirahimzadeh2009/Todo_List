/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        purple: "#86469C",
        purple2: "#6420AA",
        magenta: "#BC7FCD",
        pink: "#FB9AD1",
        lightPink: "#FFCDEA",
        green: "#059212",
        red: "#FF0000",
      },
      fontFamily: {
        ComicNeue: "Comic+Neue",
      },
    },
  },
  plugins: [],
};
