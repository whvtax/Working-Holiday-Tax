import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#F2FAF7',
          100: '#EAF6F1',
          200: '#C8EAE0',
          300: '#2FA880',
          400: '#16775C',
          500: '#0B5240',
          600: '#083D30',
          DEFAULT: '#0B5240',
        },
        amber: {
          50:  '#FDF0D5',
          100: '#F9D88A',
          200: '#E9A020',
          300: '#C47E10',
          DEFAULT: '#E9A020',
        },
        ink: {
          DEFAULT: '#080F0D',
          2: '#1A2822',
        },
        body:    '#2A3C34',
        muted:   '#587066',
        subtle:  '#8AADA3',
        border:  '#CDE3DB',
        border2: '#E2EFE9',
        canvas:  '#F5F9F7',
        wa:      '#22C55E',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'pulse-dot':  { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.5', transform: 'scale(0.7)' } },
        'card-float': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'chip-float': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        'marquee':    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'fp-float':   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
      },
      animation: {
        'pulse-dot':    'pulse-dot 2.4s ease-in-out infinite',
        'card-float':   'card-float 9s ease-in-out infinite',
        'chip-float':   'chip-float 7s ease-in-out infinite 1s',
        'chip-float-2': 'chip-float 8s ease-in-out infinite 2.5s',
        'marquee':      'marquee 28s linear infinite',
        'fp-float':     'fp-float 6s ease-in-out infinite',
        'fp-float-2':   'fp-float 8s ease-in-out infinite 1.5s',
      },
    },
  },
  plugins: [],
}

export default config
