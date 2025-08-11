/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdecd1',
          200: '#fbd5a3',
          300: '#f8b86b',
          400: '#f5953a',
          500: '#b96422',
          600: '#a8551c',
          700: '#8a4418',
          800: '#6f3719',
          900: '#5a2f18',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f3d4fe',
          300: '#e9d5ff',
          400: '#d8b4fe',
          500: '#c084fc',
          600: '#a855f7',
          700: '#9333ea',
          800: '#7c3aed',
          900: '#6b21a8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
