# 012: WHT adopts the Student Visa Tax layout system

Date: 1 Nov 2026. Decided by Jo: "adapt the old site's design like the new one, all pages, all languages, including images".

## Decision
Working Holiday Tax keeps its locked colours (forest #0B5240, amber #F2B632 as a highlighter only, ink #0F1A16, pale #F2FAF7) and fonts (Be Vietnam Pro, IBM Plex Mono, Noto Sans JP for ja), and takes the Student Visa Tax layout: left aligned split hero with a photo, sections with the heading column on the left and content on the right from 1024px, tone bands (white, pale, amber, forest), pill buttons, pale accordion, pale footer with columns, photo slots.

## How
- New own layer, no import from `src/components/svt`: `src/components/wht/` (Section, Hero, Type, Button, ImageSlot, PagePhoto) and `src/lib/wht/` (images registry). Tokens `--wht-*` in `globals.css`. The brands share nothing at runtime that a customer could see.
- Page copy, SEO metadata, schema and approved wording stay verbatim. Only layout and markup change.
- Photos: slots with placeholders until files exist in `public/wht-assets/img/`. Script: `docs/design/WHT_IMAGE_SCRIPT.md`.
- Applies to en, /de and /ja.

## Not changed
Tax form, CRM, Will, URLs, metadata, hreflang, analytics events (`data-wa-pos`), compliance sentences.
