import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E89C31',
        secondary: '#FDF6E9',
        dark: '#1A242F',
        accent: '#F3A63B',
        'brand-orange': '#e6912d',
        'brand-cream': '#fffcf2',
        'brand-footer': '#0b1626',
        'brand-gray': '#f4f4f4',
      },
      fontFamily: {
        myanmar: ['Georgia', 'serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}
