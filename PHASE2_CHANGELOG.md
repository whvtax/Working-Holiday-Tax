# Phase 2 — New commercial content + JA/DE money pages (July 2026)

Blog files only. Builds on Phase 1 (include those files too if not yet deployed).

## New English articles (5) — in src/app/blog/data.ts
1. /blog/tax-back-australia-working-holiday — "Tax Back in Australia: Working Holiday Refund Guide (2026)"
2. /blog/average-tax-refund-working-holiday — worked refund examples per scenario
3. /blog/best-way-to-claim-super-leaving-australia — DASP options compared
4. /blog/working-holiday-visa-tax-guide-417-462 — full WHM tax pillar
5. /blog/diy-tax-return-vs-tax-agent-working-holiday — honest comparison (trust play)

All: answer-first opening, FAQ, internal links to /tax-return /superannuation /calculator /contact, sourced figures (15% to $45k, 12% super, 65% DASP, 2% levy).

## Japanese — src/app/ja/blog/data.ts
- what-is-a-tax-agent fully rewritten as the 代行 money page: 「タックスリターン代行はワーホリの味方！税理士の選び方と料金（2026年版）」 — targets オーストラリア タックスリターン 代行 / 税理士 安い (your highest-CTR queries), with pricing transparency, process steps, FAQ.

## German — src/app/de/blog/data.ts
- Full German version of the tax-back article targeting "Steuern zurück Australien" / "Steuererklärung Australien" (GSC gap: you ranked 18-47 on these). Indexed at /de/blog/tax-back-australia-working-holiday.

## Also updated
- public/llms-full.txt — 6 new entries + JA entry updated

## Notes
- New EN articles appear under /de and /ja as noindex until translated (by design in your code). DE translation done for the tax-back article; remaining translations = next batch.
- Sitemap picks up new slugs automatically.
- Verified: tsc --noEmit passes; 154 EN posts total.

## Deploy
Copy the 4 changed files (same paths), commit, push to main.
