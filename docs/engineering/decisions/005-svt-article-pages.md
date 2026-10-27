# 005: Article and guide pages for Student Visa Tax (answer first, library, light imagery)

Date: 26 Oct 2026. Status: ACCEPTED (Jo chose "the recommended combination" after ten
design concepts; mocks and notes in the session scratchpad `design/01..10`).

## Problem
31 pages (10 guides, 21 articles) x 3 languages share one plain template. Jo: they read like
a pile of blogs, visually flat. Also (Jo): not too busy, and not too black and white.

## What we take from the ten concepts
- **Short answer first** (03, styled as a docket from 02): every page opens with the one
  rule in a pale-lime docket card with a zigzag edge, the key words highlighted, and the
  official source. Optional inside it: a ticked form ("yes / no" rows, from 04) or up to
  three key figures in IBM Plex Mono (from 09, e.g. "$18,200 tax-free", "28 days").
- **Library wayfinding** (08): topic and position ("TFN · 2 of 3"), reading time, contents
  on desktop, and an end-of-page path: next in this topic, then the price docket and
  WhatsApp, then the related pages.
- **Rhythm** (10): larger gaps between sections than inside them; compact language links in
  the meta row; one highlight per screen.
- **Photos**: at most one per page, from a shared library of scenes by topic, placed after the
  short answer. Not two per page: 62 generated photos start to look alike, slow phones and
  add no information on a tax page (05 and 10). The library slots show nothing until their
  files exist (the ImageSlot rule from M8), so pages are complete without them.
- Rejected: the example WhatsApp chat (06, a staged chat costs trust); the interactive
  checker (07) only later, on two or three flagship pages, after the rest is live.

## Colour (Jo: not black and white)
Pale lime #F5FAE3 carries the docket and figures; mist and line greys for structure; ink for
text and the main button; lime #D6FF3D only as a highlighter. Photos add the colour.
No large ink blocks on article pages.

## Data
- `short` per page and language: `{ answer, mark?, source? }` plus optional `form` rows
  `{ label, sub?, answer: 'yes' | 'no' }` with a question, or `facts` `[{ figure, label }]`
  (max 3). Written natively per language like all copy; `checkTexts` proves the shape matches
  English (same number of rows/facts, same yes/no answers, figures identical).
- Topics and order: one list in `src/lib/svt/library.ts` (topic, ordered slugs, guides and
  articles together). Position, previous/next and reading time are computed.
- Image per page: `image?: 'IMG-1x'` from the library list in `images.ts`.

## Tests
Shape parity across languages, every page has a short answer, figures identical across
languages, the answer contains no dash and passes the wording rules, every page belongs to
exactly one topic, axe and e2e on all pages.
