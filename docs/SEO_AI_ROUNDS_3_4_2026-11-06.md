# Rounds 3 and 4, 5 to 6 November 2026

Base: everything in docs/SEO_AI_UPDATE_2026-11-05.md and docs/SEO_AI_AUDIT_FIXES_2026-11-05.md.
Plans, audits and logs: docs/audit-5nov/round3-4/.

## Done
- Native-language review of all text written on 5 Nov (DE, JA, FR, IT, ES): about 200 edits for natural wording, register, gender and repeated bridge sentences.
- Research: DASP plan for six languages (ATO-sourced), content-gap study (one new guide topic found; the rest handled as sections), competitor and query plans for the 24 WHT service pages (TFN, ABN, tax return, super x 6 languages), SVT audit (pages, guides, technical, strategy in en/zh/vi).
- WHT service pages rewritten from those plans in EN, DE, JA, IT (all four services) and in large part FR and ES: answer-first openings, dated key figures with official sources, step-by-step sections, new FAQs (FAQ schema generated from the visible list), WhatsApp buttons mid-page, links between the four services. Facts corrected against the ATO: TFN 28-day rule, DASP 28 days from a completed application, 65% also on the untaxed element, ATO-held super paid only to an Australian account or by cheque, ABN does not require a TFN first. "We lodge" wording replaced by "we prepare" or the approved sign-off sentence.
- SVT: Chinese guides partly fixed (P0 "we lodge for you" sentences removed).
- SVT WhatsApp (Jo, 5 Nov): SVT temporarily uses the business number 61424513998. Every SVT prefilled message names "Student Visa Tax". The number is kept out of SVT structured data. Will's send guard no longer treats the shared number as the other brand's mark (name and domain checks unchanged). Tests updated accordingly; restore them when SVT has its own number (search "5 Nov 2026 (Jo)").

## Not done (agents were stopped before finishing)
- WHT guide round 4 (DASP bridges in guides, "who may lodge for you" sections, casual shift notice section) in all languages; the new guide early-tax-return-leaving-australia was not created (the one link to it now points to /tax-return).
- FR and ES service pages: partly applied.
- SVT: core pages and new TFN hub, English and Vietnamese guide fixes, zh/vi home pages.
- Keyword map agents (9).

## Decisions waiting for Jo
1. Client agreement (both brands): "you appoint the Provider as your authorised agent to prepare and lodge".
2. SVT footer: TPB registered practitioner symbol inside the Student Visa Tax block.
3. EN/DE/JA home: "A tax agent will never ask for your myGov ... not us".
4. Will: route WhatsApp messages that start with "Student Visa Tax" to a person instead of an automatic WHT reply.

## Verification (6 Nov)
- tsc clean, eslint clean, jest 454 suites: 6,182 passed, 2 skipped, 0 failed.
- Production build passed (scripts/build-offline.sh), real font imports restored.
- WHT crawl, 1,007 URLs: 0 errors (1 warning: /es/abn title 71 characters with the brand suffix). Compliance scan of rendered text and JSON-LD: clean.
- SVT crawl through its domain, 558 URLs and 564 internal links: 0 errors; compliance hits were all "your tax agent" (someone else), not claims.
- Scan of every line added in rounds 3 and 4 for agent claims, refund promises, AI, LocalBusiness types and dashes: clean.
- Playwright phone viewport, 16 service pages in 6 languages: no overflow, one H1, WhatsApp links, axe 0 violations.

## After deploy
1. Search Console for both domains: resubmit sitemap.xml; Request Indexing for the four service pages per language.
2. `npm run indexnow`.
3. Vercel: redirect www.studentvisatax.com.au to the apex domain.
