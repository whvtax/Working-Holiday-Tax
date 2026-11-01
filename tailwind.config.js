const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // ── BRAND PALETTE ──────────────────────────────────────────────────
      // Forest green with a single amber. Amber is the only non green on the
      // site, which is what makes every call to action visible without any
      // extra work, and it is why it must stay rare. The contrast ratio
      // against white is noted on each value: 4.5 is the minimum for text,
      // 3.0 for a border or an icon that carries meaning.
      colors: {
        // LOCKED BRAND PALETTE (1 Nov). Ink for text, forest for brand, buttons
        // and links, amber only as a highlighter band behind words (never text,
        // never a button fill), pale green only for small strips, page white.
        forest: {
          50:  '#F2FAF7',
          100: '#F2FAF7',
          200: '#DCE0DE',
          300: '#0B5240',
          400: '#0B5240',
          500: '#0B5240',
          600: '#083D30',   // pressed and hover state of the brand green
          DEFAULT: '#0B5240',
        },
        amber: {
          50:  '#F2FAF7',
          100: '#F2B632',
          200: '#F2B632',
          300: '#F2B632',
          DEFAULT: '#F2B632',
        },
        ink: {
          DEFAULT: '#0F1A16',
          2: '#0F1A16',
        },
        body:    '#0F1A16',
        muted:   '#525A57',   // ink at 72% on white
        subtle:  '#525A57',
        border:  '#DCE0DE',   // ink at 14% on white
        border2: '#DCE0DE',
        canvas:  '#FFFFFF',
        danger:  '#9A3412',
        wa:      '#22C55E',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        sans:  ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // The six infinite float and marquee loops were removed. Motion that never
      // stops explains nothing, keeps the compositor awake and drains a phone
      // battery on a page someone reads for four minutes. Motion now only marks
      // a state change: a press, a sheet opening, an accordion.
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
}

module.exports = config
