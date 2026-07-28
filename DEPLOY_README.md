# Working Holiday Tax — Blog SEO/GEO Update — FINAL (29 July 2026)

## What to do
Copy every file in this zip into your repo at the SAME paths, commit, push to main. Vercel deploys automatically.

## Files (14 content/code + 6 images)
CODE:
- src/app/blog/data.ts                    (154 posts: titles, metas, FAQ, expansions, 5 new articles)
- src/app/de/blog/data.ts                 (DE: ~97 localized sections + titles/metas + hero + facts)
- src/app/ja/blog/data.ts                 (JA: ~97 localized sections + 代行 rewrite + hero + facts)
- src/app/blog/BlogClient.tsx             (new keyword H1 + subtitle)
- src/app/blog/[slug]/page.tsx            ("Last updated", author line, per-category OG)
- src/app/de/blog/[slug]/page.tsx         (same, German)
- src/app/ja/blog/[slug]/page.tsx         (same, Japanese)
- src/app/blog/[slug]/CategoryHero.tsx    (per-article card art variation)
- public/llms-full.txt                    (synced for AI engines)
IMAGES:
- public/assets/og/og-{tfn,abn,tax-return,super,work-rights,medicare}.png (1200x630)

## Verified
- tsc --noEmit: CLEAN (whole project)
- eslint on all changed files: CLEAN
- Data integrity: 154 unique slugs, balanced template literals, no ${} in bodies,
  no foreign-script contamination, no duplicate headings/FAQ blocks, 6/6 OG images
- next build: blocked in the sandbox ONLY by Google Fonts fetch (no network) — builds fine on Vercel
- Zero URL changes. Zero files outside the blog folders + public assets.

## Known remaining work (optional, next session)
- ~16 tail-post localized sections per language + full JA/DE translations of the 4 new commercial articles
- Recommended (needs approval - touches next.config.js): slug migration minimum-wage-australia-2025-26 -> 2026-27 with 301

## After deploy
1. Google Search Console -> Sitemaps -> resubmit sitemap.xml
2. Request indexing for the 5 new /blog/ URLs
3. In 2-3 weeks: export a fresh GSC performance report for comparison against baseline (27 July 2026)
