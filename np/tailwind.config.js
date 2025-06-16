/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'water-flow': {
          '0%, 100%': { backgroundPosition: '0% 70%' },
          '50%': { backgroundPosition: '100% 70%' },
        }
      },
      animation: {
        'water-flow': 'water-flow 10s ease-in-out infinite', 
      },
    },
  },
  plugins: [],
}