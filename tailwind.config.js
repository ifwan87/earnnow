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
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        earnnow: {
          "primary": "#FDB913",
          "secondary": "#1A1A1A",
          "accent": "#FACC15",
          "neutral": "#0A0A0A",
          "base-100": "#0A0A0A",
          "base-200": "#1A1A1A",
          "base-300": "#262626",
          "info": "#3ABFF8",
          "success": "#10B981",
          "warning": "#FBBD23",
          "error": "#EF4444",
        },
      },
    ],
    darkTheme: "earnnow",
    base: true,
    styled: true,
    utils: true,
  },
}
