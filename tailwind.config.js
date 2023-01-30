/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-craftworksans)'],
      },
      screens: {
        'tablet': '900px'
      },
      colors: {
        'hyper-blue-primary': '#2C58C9',
        'hyper-blue-secondary': '#5684F9',
        'hyper-blue-light': '#BFD1FF',
        'hyper-purple-primary': '#2C33C9',
      }
    },
  },
  plugins: [],
}
