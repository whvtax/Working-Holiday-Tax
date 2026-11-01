# Student Visa Tax design, extracted from the code (1 Nov)

Source of truth: `src/app/(svt)/tokens.css`, `src/app/(svt)/svt.css`, `src/components/svt/*.module.css`.
Rules in CLAUDE.md win if anything here disagrees.

## Idea
A "docket on white": a receipt-like, plain, trustworthy page. Ink text on white, ONE highlighter colour used as a
band behind words, never as text colour. Mono type for figures and small labels, so numbers feel like a receipt.

## Colour
| Token | Value | Use |
|---|---|---|
| ink | #12161F | text, buttons, logo |
| ink-2 | #3C4350 | body copy, leads |
| paper | #FFFFFF | page |
| lime | #D6FF3D | highlighter band, chips, small accents |
| lime-pale | #F5FAE3 | soft section and footer background |
| line | #DDE1DF | hairlines |
| mist / mist-2 | #F3F5F4 / #C9CED6 | quiet fills |

## Type
- Sans: Be Vietnam Pro (CJK fallbacks PingFang SC, Noto Sans CJK SC). Mono: IBM Plex Mono.
- Body 16px (lead 17px, small 14px). Lead line-height 1.55, colour ink-2.
- H1 38px, 48px (tablet), 60px (desktop). Weight 700, line-height 1.06, letter-spacing -0.025em.
- H2 26px, 32px, 36px. Headings use `text-wrap: balance`.
- Mono is for: prices, figures, small uppercase labels (11px, weight 600, letter-spacing 0.14em), the docket, receipts.
- Highlighter: `linear-gradient(transparent 62%, lime 62%, lime 92%, transparent 92%)`, 2px side padding.
- Chinese: no letter-spacing, line-height 1.3, highlight kept on one line.

## Shape and space
- Max width 1120px, reading measure 640px, gutter 20px (32px tablet). Section padding 36px, 56px, 72px.
- Buttons are pills (999px), minimum tap size 48px. Cards 10px radius, bubbles 14px, pills 24px.
- Focus ring: 3px paper then 2px ink (clearly visible on white).

## Motion (added 1 Nov)
Opacity and transform only, once per element, armed by `data-motion`, off under `prefers-reduced-motion`.
Chat thread bubbles, docket rows, sticky WhatsApp button reveal.

## What carries to Working Holiday Tax if only the type is borrowed
Be Vietnam Pro for headings and body, IBM Plex Mono for prices and small labels, heading scale and tracking above.
WHT keeps its own colours. Japanese keeps a Japanese font (Be Vietnam Pro has no kana or kanji).
