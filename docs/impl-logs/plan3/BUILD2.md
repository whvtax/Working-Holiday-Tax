# BUILD round 2 (24 Nov 2026, Jo: "make the decisions, deliver a final zip with nothing left to improve")

Read S/plan3/BUILD.md (all rules there still apply: file ownership, facts only from r16 or official pages with URL,
approved wording, no dashes, title up to 60 / description 120 to 160 for NEW pages, existing titles/descriptions frozen,
no commit/build/server). S = /tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad
Repository: /home/claude/v68/base20 (round 1 is committed; build on it).

## Jo's decisions taken today (do not contradict)
- The WEBSITE offers super (DASP) help. WhatsApp bots (src/lib/will/**, Mia, CRM, anything WhatsApp-side) are NOT touched.
- Super CTAs never say we lodge/submit: "we find every fund under your TFN and check the claim with you" style.
- "About 14 business days" for the refund to LAND stays (our observed timing); ATO processing = 10 business days.
- Legal text: only the overseas-account refund line was corrected; do not touch legal pages.

## New shared facts to verify yourself (official URL each)
- Payday Super from 1 July 2026: employers pay super with each payday (verify the exact rule and days on ato.gov.au), and
  the super guarantee base becomes "qualifying earnings" (verify). SG rate 12%.

## Round 2 tasks (owner ids in your prompt)
Fixed new URLs: WHT /leaving-australia and /de|ja|fr|it|es/leaving-australia (one page per language: before and after
leaving, tax return + super/DASP + what to do in which order; hub that links the money pages and the problem guides).
Payday Super guide slug (WHT, EN twin required for locales): payday-super-working-holiday.
Log to S/plan3/build2-<id>.md. Verify: tsc clean, jest suites touching your files, new-locales-sitemap test, src/lib/svt
tests if you touched SVT; only the 8 known Will/form-start-lang suites may fail. Reply in 5 lines.
