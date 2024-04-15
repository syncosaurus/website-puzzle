/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        syncoBlue: '#1D3370',
        syncoGreen: '#7ED348',
      },
    },
  },
  plugins: [],
}
