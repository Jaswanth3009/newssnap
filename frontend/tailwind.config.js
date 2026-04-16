/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0F172A',
        accent: '#F59E0B',
        surface: '#1E293B',
      },
    },
  },
  plugins: [],
}
