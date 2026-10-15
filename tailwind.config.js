/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#e1e9f2',
          200: '#c2d2e4',
          300: '#94b3d2',
          400: '#608ebc',
          500: '#3c6ea5',
          600: '#2c5688',
          700: '#23446d',
          800: '#1c2541',
          850: '#131b31',
          900: '#0b132b',
          950: '#060a17',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f6f1dc',
          200: '#ede1b6',
          300: '#e1cc8b',
          400: '#d5b560',
          500: '#c59d37',
          600: '#a87e2b',
          700: '#865f24',
          800: '#6e4c22',
          900: '#5c3f20',
          champagne: '#e9d7b4',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 19, 43, 0.12), 0 0 1px 1px rgba(11, 19, 43, 0.05)',
        'luxury-hover': '0 25px 50px -12px rgba(11, 19, 43, 0.22), 0 0 1px 1px rgba(212, 175, 55, 0.3)',
        'gold-glow': '0 0 30px -5px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 50px -5px rgba(212, 175, 55, 0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'gold-shine': 'gold-shine 3.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(1deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'gold-shine': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.65))' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
  plugins: [],
}
