module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      standard: ["Lato"],
      heading: ["Montserrat"],
    },

    extend: {
      colors: {
        primary: "#101820",
        secondary: "#e33065",
        info: "#46beea",
        warning: "#f7ac46",
        success: "#2ad03d",
        danger: "#dd173d",
        gray: "#57697B",
        "gray-8": "#F2F3F5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
