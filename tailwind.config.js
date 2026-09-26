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
        'holux-dark': '#1C2321',
        'holux-light': '#F2EFE9',
        'holux-teal': '#3C6E71',
        'holux-rust': '#B85C38',
        holux: {
          dark: '#1C2321',
          black: '#121716',
          card: '#FFFFFF',
          cardDark: '#1C2321',
          border: '#E5E2DA',
          light: '#F2EFE9',
          cream: '#F8F7F5',
          muted: '#6B7280',
          teal: '#3C6E71',
          tealDark: '#284B4D',
          rust: '#B85C38',
          gold: '#D4AF37',
          goldLight: '#ECD88C',
          goldDark: '#A6841E',
        },
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        'holux': '0 4px 20px -2px rgba(28, 35, 33, 0.08)',
        'luxury': '0 20px 40px -15px rgba(28, 35, 33, 0.15)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.35)',
        'modal': '0 25px 60px -12px rgba(28, 35, 33, 0.35)',
      },
    },
  },
  plugins: [],
};
