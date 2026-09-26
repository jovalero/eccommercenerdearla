/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        holux: {
          dark: '#141817',
          black: '#0C0E0E',
          card: '#1B2320',
          cardHover: '#232D29',
          border: '#2A3632',
          light: '#F8F6F2',
          cream: '#EFECE6',
          muted: '#A5A196',
          teal: '#3C6E71',
          tealDark: '#284B4D',
          rust: '#B85C38',
          gold: '#D4AF37',
          goldLight: '#ECD88C',
          goldDark: '#A6841E',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.35)',
        'modal': '0 25px 60px -12px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
};
