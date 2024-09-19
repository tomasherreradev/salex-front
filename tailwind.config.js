/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        small: '-1px -35px 16px 39px rgba(0,0,0,0.09)',
      },
    },
  },
  plugins: [],
}
