import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0E0C',
          soft: '#1A1A17',
          muted: '#5C5C57',
        },
        cream: {
          50: '#FBF7F0',
          100: '#F7F1E8',
          200: '#EFE6D6',
          300: '#E5D8C2',
        },
        gold: {
          50: '#F8EFDC',
          100: '#EBD9B4',
          200: '#D9BE85',
          300: '#C9A96E',
          400: '#B4924F',
          500: '#A98841',
          600: '#8C6E33',
        },
        nude: {
          100: '#F6E5DD',
          200: '#EBD8D0',
          300: '#D9BBB1',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
        wider2: '0.24em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        soft: '0 30px 60px -30px rgba(20, 16, 10, 0.18)',
        gold: '0 20px 50px -20px rgba(169, 136, 65, 0.45)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
