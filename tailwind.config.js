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
        forest: {
          50:  '#F2FAF7',   // page tint
          100: '#EAF6F1',   // card tint
          200: '#C8EAE0',   // strong border
          300: '#2FA880',   // 2.99 on white. FILL AND BORDER ONLY, never text.
          400: '#16775C',   // 5.49. the accessible bright green, use for small text
          500: '#0B5240',   // 9.15. the brand
          600: '#083D30',   // 12.21. pressed and hover states on 500
          DEFAULT: '#0B5240',
        },
        amber: {
          50:  '#FDF0D5',   // callout background
          100: '#F9D88A',   // callout border
          200: '#E9A020',   // 2.21. BUTTON FILL ONLY. dark ink on top, never white
          300: '#C47E10',   // 3.31. the darker amber, for an icon or a rule
          DEFAULT: '#E9A020',
        },
        // Four levels of text, every one green tinted. That tint is why the
        // site reads as calm and as one thing, and it is deliberate.
        ink: {
          DEFAULT: '#080F0D',   // 18.9. headings
          2: '#1A2822',         // 15.1. subheadings
        },
        body:    '#2A3C34',     // 11.70. running text
        // #8AADA3 was the old subtle. It measured 2.45 on white, so it is gone
        // entirely rather than left available to reach for.
        muted:   '#4C6459',     // 6.41. captions and secondary text
        subtle:  '#587066',     // 5.35. the lightest text that still passes
        border:  '#CDE3DB',
        border2: '#E2EFE9',
        canvas:  '#F5F9F7',
        // The one colour outside the brand. Warnings and the claims that get
        // knocked back, nothing else.
        danger:  '#9A3412',     // 7.31
        // WhatsApp's own green. It belongs to their mark and is deliberately
        // not one of ours, so it is only ever used inside their icon.
        wa:      '#22C55E',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
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
