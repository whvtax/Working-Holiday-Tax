# Phase 1 — Blog SEO/GEO update (July 2026)

Only 4 files changed. Blog content only — nothing else touched.

## Changed files
- `src/app/blog/data.ts` — 13 P1 posts: CTR-optimized titles + meta descriptions, FAQ sections added to top 6 posts, dates refreshed to 20 July 2026
- `src/app/de/blog/data.ts` — same 13 posts: German titles + descriptions updated
- `src/app/ja/blog/data.ts` — same 13 posts: Japanese titles + descriptions updated
- `public/llms-full.txt` — 39 entries (13 posts x 3 languages) updated to match

## The 13 rewritten posts (by 90-day impressions)
casual-shift-cancellation-rules-australia (4,384) · how-long-does-it-take-to-get-a-tfn (3,638) · can-you-start-work-without-a-tfn (3,395) · what-happens-without-your-tfn (3,263) · tfn-application-delayed (2,860) · medicare-levy-working-holiday-makers (1,648) · can-you-have-tfn-and-abn (1,611) · what-does-tax-withheld-mean-payslip (1,532) · how-to-update-address-with-ato (1,188) · apply-for-tfn-before-arriving (1,126) · do-you-need-new-tfn-second-visa (1,044) · how-long-does-dasp-take (1,029) · what-is-medicare-working-holiday-makers (844)

## Verified
- esbuild syntax check: all 3 data files OK
- `tsc --noEmit`: full project passes
- 149 posts intact, no slugs changed, no URLs changed

## Deploy
Copy these 4 files into your repo (same paths), commit, push to main — Vercel auto-deploys.
