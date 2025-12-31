/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./events-details/*.html",
    "./script.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        'ieee-blue': '#00629B',
        'ieee-blue-dark': '#004A7C'
      }
    }
  },
  plugins: []
}
