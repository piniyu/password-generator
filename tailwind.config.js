const typography = require('@tailwindcss/typography');
const daisyui = require('daisyui');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: ['black'],
  },
  plugins: [typography, daisyui],
};
