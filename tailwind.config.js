/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'earnnow-yellow': '#FDB913',
        'earnnow-black': '#0A0A0A',
        'earnnow-gray': '#1A1A1A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
