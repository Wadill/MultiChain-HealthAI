/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: { 500: '#22C55E' },
        yellow: { 500: '#F59E0B' },
        red: { 500: '#EF4444' },
        purple: { 500: '#8B5CF6', 600: '#7C3AED' },
      },
    },
  },
  plugins: [],
};