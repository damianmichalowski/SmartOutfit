/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-dark': '#EDE5D8',
        beige: '#D4B896',
        'beige-light': '#E8D9C4',
        camel: '#C4956A',
        espresso: '#3D2B1F',
        'warm-brown': '#6B4226',
        'muted-black': '#1A1A1A',
        gold: '#B8942E',
        'off-white': '#FAF7F2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
