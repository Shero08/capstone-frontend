/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '30%': '30%',
      '16': '4rem',
    },
    extend: {
      colors: {
        'capstone-bg': '#EDF2F9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}