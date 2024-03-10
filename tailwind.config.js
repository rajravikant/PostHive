/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:'class', 
  theme: {
   
    extend: {
      colors:{
        'primary' : "#00ADB5",
        'dark' : '#222831',
        'darkL' : '#31363F',
      },
    },
    fontFamily: {
      pop: ["Poppins"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
