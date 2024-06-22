/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //this will overwrite default tailwind css
    fontFamily: {
      sans:"Roboto Mono , monospace",
      serif:"Roboto Mono , monospace",
    },

    extend: {
      //this will extend new propety to tail wind
      colors: {
        pizza: "#457999",
      },
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
