# Phase 4 — Full body expansion sweep (29 July 2026)

## What "expanded" means, concretely
~110 new content sections + 17 FAQ blocks added across all 148 EN articles, each targeting real long-tail queries: worked dollar examples, week-by-week timelines, state-by-state rules, award-specific numbers, scam warnings, pre-departure checklists. Dense internal linking within each topic cluster. readTimes updated.

Stats: median body 700 -> ~770 words; 66 posts now 800+; every post has at least one substantive addition; top-traffic posts have 2-3.

## Blog hero (index page) retitled in 3 languages
EN: "Working holiday tax guides: TFN, tax returns, super and ABN"
DE: "Steuern zurück aus Australien: TFN, Tax Return, Super und ABN"
JA: "ワーホリの税金ガイド：タックスリターン・スーパー・TFN・ABN"
(File: src/app/blog/BlogClient.tsx + de/ja blog data UI strings)

## Language coverage — IMPORTANT
Body expansions are ENGLISH ONLY. DE/JA retain their original full translated bodies plus all title/description/hero/wage updates from earlier phases. Translating the new sections into DE/JA is the next work block (prioritize by DE/JA traffic).

## Verified
- Full tsc --noEmit passes (real typescript binary)
- 154 slugs intact, no URL changes
- Files changed across ALL phases: src/app/blog/data.ts, src/app/de/blog/data.ts, src/app/ja/blog/data.ts, src/app/blog/BlogClient.tsx, public/llms-full.txt

---

# E-E-A-T additions (29 July 2026)
- "Last updated:" label added before the article date in all 3 languages (EN / "Zuletzt aktualisiert:" / "最終更新：") — files: src/app/blog/[slug]/page.tsx, src/app/de/blog/[slug]/page.tsx, src/app/ja/blog/[slug]/page.tsx
- Author line "Written by Working Holiday Tax" added after every article body, before the related-articles block, all 3 languages
- Note: a related-articles block ("Read also" / "Auch lesenswert") already existed natively in all languages — no change needed
- NOTE: changed files now include the three [slug]/page.tsx files (blog folder only)

---

# Card art + OG images (29 July 2026)
- CategoryHero.tsx: per-article deterministic variation (rotation/scale/offset from title hash + accent ring) - no two cards in the same category look identical. Serves index, category pages, article heroes, all 3 languages.
- 6 per-category OG images generated (public/assets/og/og-*.png, 1200x630, brand palette per category).
- All 3 article page.tsx files: og:image, twitter image and schema primaryImageOfPage now category-specific (ogForCategory helper). Fallback to /og-image.png.
- Verified: tsc --noEmit clean.
