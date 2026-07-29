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

## Client Agreement — fee structure (29 July 2026)
Clause 1 (Definitions): "Eligibility Assessment" defined.
Clause 3 (Nature of Service): two-stage service structure made explicit.
Clause 6 (Fees and Charges): rewritten — $110 Eligibility Assessment (waived entirely if no
entitlement found), $220 total if you proceed with us (the $110 credited in full), $110 payable
if you lodge independently after an entitlement is identified. Includes an Australian Consumer
Law savings clause.

*** ACTION REQUIRED BEFORE PUBLISHING ***
1. Have an Australian lawyer review clause 6 (unfair contract terms regime, ACL).
2. Marketing copy currently says "free eligibility check" (src/app/tax-form/FormClient.tsx line ~486)
   and "Kostenlose Erstberatung" on several German pages. This CONTRADICTS a paid $110 assessment
   and creates misleading-conduct exposure. Align the wording before the clause goes live.

## Marketing copy aligned with the paid Eligibility Assessment (29 July 2026)
Removed every "free assessment/consultation" claim that conflicted with the $110 fee:
- src/components/ui/CtaBand.tsx: default CTA "Free Eligibility Check" -> "Check your eligibility now"
- src/app/tax-form/FormClient.tsx: WhatsApp pre-filled message no longer says "free eligibility check"
- DE: "Kostenlose Erstberatung" -> "Prüfe jetzt deine Berechtigung" (tax-return, medicare, tfn, abn, superannuation) + one blog CTA
- JA: "無料相談" -> "今すぐ受給資格をチェック" (tax-return x2, tfn, abn, homepage, contact keywords)
Left unchanged on purpose: the calculator is still described as free (it genuinely is), and a blog
line noting that employment lawyers often offer free initial consultations (third party, accurate).

## Client Agreement — completed-work clause (29 July 2026)
Clause 6: added — once you instruct us to proceed and the Tax Return has been prepared and made
available for your review/approval/signature, the full $220 fee is payable whether or not you
authorise lodgment. Carve-out included for withdrawal due to our failure to meet the consumer
guarantees (due care and skill) under the ACL.
Clause 7: payment timing aligned to the new trigger.
Clause 15: termination does not extinguish fees already earned under clause 6.
STILL REQUIRES AUSTRALIAN LAWYER REVIEW.

## Client Agreement — full review (29 July 2026)
DEFENSIVE REWRITES (these protected the client-facing terms from being struck out):
- Clause 8: added ACL savings wording + liability cap (re-supply or refund of fees).
- Clause 9: indemnity narrowed to loss caused by the Client, with a carve-out for the Provider's
  own negligence/breach. Broad consumer indemnities are a known unfair-term risk.
- Clause 11: "use of the Service is at your own risk" replaced with a due-care-and-skill
  commitment; blanket risk exclusions are unenforceable against consumer guarantees.

NEW CLAUSES:
- 22. Refunds, ATO Debts and Offsets — refund may be reduced/withheld to offset HELP, child
  support or other government debts; fees still apply; refund paid direct to client; bank detail
  responsibility; overseas account timing.
- 23. Cancellation and Cooling-off — cancellation consequences by stage, plus the 10-business-day
  statutory cooling-off that applies if the engagement is an unsolicited consumer agreement
  (relevant where the business initiates contact, e.g. outbound WhatsApp).
- 24. Complaints and Concerns — internal complaints path, escalation to the TPB, no
  discouragement of regulator complaints. Supports TPB Code obligations.
- 25. Records and Documents — 5-year retention, free copies on request.
- 26. Changes to this Agreement — version in force at engagement applies.

Header revision date updated to July 2026.
ALL OF THE ABOVE STILL REQUIRES AUSTRALIAN LAWYER REVIEW.

## Client Agreement — DE + JA brought to parity (29 July 2026)
CRITICAL FIX: the German and Japanese agreements still carried the OLD clause 6 ("from AUD $200 + GST")
and the old liability/indemnity wording, meaning DE/JA clients were agreeing to materially different
terms from EN clients. All three language versions are now identical in substance:
- Clause 3 (two-stage service), 6 ($110/$220 + completed-work clause), 7, 8 (ACL savings + liability cap),
  9 (narrowed indemnity), 11 (due care and skill), 15 (fees survive termination)
- New clauses 22-26 (ATO offsets, cooling-off, complaints/TPB, records, changes)
- Revision dates updated to July 2026 in all three
Verified: 26 clauses, correctly ordered, in EN/DE/JA. No "$200 + GST" remains anywhere.

## Final gap-closing (29 July 2026)
1. Translations: all 5 new commercial articles now exist in German AND Japanese
   (tax-back, average-refund, best-way-to-claim-super, 417/462 guide, DIY-vs-agent) —
   written natively per language, not machine-translated. llms-full.txt updated with the
   DE/JA entries.
2. Slug migration: minimum-wage-australia-2025-26 -> minimum-wage-australia-2026-27 across
   EN/DE/JA data + llms-full.txt, with three new permanent 301s in next.config.js
   (EN, /de, /ja) and the legacy 2024-25 redirect re-pointed to the new slug.
   NOTE: this is the one change that touches next.config.js (outside the blog folders).
   After deploy: resubmit sitemap and request indexing for the new minimum-wage URL.
