/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:      '#F4EFE6',
        'cream-soft': '#FAF7F2',
        'cream-dark': '#EDE5D5',
        sand:       '#E8DBCA',
        beige:      '#D4B896',
        'beige-light': '#EAD9C3',
        camel:      '#B8845A',
        'camel-dark': '#9A6B42',
        espresso:   '#1A0F09',
        'brown-deep': '#3D2212',
        'brown-mid': '#6B4226',
        'brown-muted': '#8B6651',
        gold:       '#C4963E',
        'gold-light': '#D4A84E',
        'off-white': '#FDFAF6',
        'ink':      '#0E0A06',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem', { lineHeight: '1.1' }],
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-3': '0.3em',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(26, 15, 9, 0.08)',
        'luxury-sm': '0 2px 16px rgba(26, 15, 9, 0.06)',
        'luxury-lg': '0 8px 60px rgba(26, 15, 9, 0.12)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
