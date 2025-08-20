/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // 👈 rất quan trọng
  ],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: []
}
