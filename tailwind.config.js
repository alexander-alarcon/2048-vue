/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        board: '#bbaaaa',
        cell: '#ddccbb',
      },
    },
  },
  plugins: [],
};
