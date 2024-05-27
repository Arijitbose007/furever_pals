/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
        colors:{
          cardColor:"#e8d3a7",
          blue: "#1fb6ff",
          splBlack: "#131c2b",
          purple: "#8b505f",
          pink: "#ff49db",
          orange: "#ff7849",
          green: "#13ce66",
          yellow: "#ffc82c",
          graydark: "#273444",
          gray: "#8492a6",
          graylight: "#d3dce6",
          customPurple: '#702739',
        },
      },
  },
  plugins: [],
}

