# Round 5, 6 November 2026: completing round 4

## Done
- WHT guides, all six languages: early links to the superannuation page from every super/DASP guide, DASP facts corrected against the ATO (28 days from a completed application; 65% of the taxable component, taxed and untaxed, for 417/462; ATO-held super only to an Australian account or by cheque; $5,000 rule = Home Affairs certificate on paper applications; one application per fund account; no claim before leaving), intent split between the two 65% guides, "who may lodge for you" section in what-is-a-tax-agent (no "we"), casual shift guide notice section, early-return and part-year over-withholding claims corrected.
- New guide early-tax-return-leaving-australia in EN, DE, JA, FR, IT, ES, linked from related guides.
- FR and ES service pages completed (all four services).
- SVT: new English TFN hub (/tfn); /superannuation rebuilt (answer first, "tax on departing Australia superannuation payment", ATO rates, 28 days, steps, FAQ); home answer block linking all four services; contact pages in zh and vi no longer imply SVT deals with the ATO as the agent; English, Chinese and Vietnamese guides: agent wording, 65% DASP (taxable component only), Medicare exemption depends on entitlement (not OSHC), 2026-27 rates, 48 hours a fortnight, past-tense deadline; long articles now link to their service page.
- Will: a WhatsApp chat whose customer writes "Student Visa Tax" (all SVT site links prefill it) is handed to a person with no suggested reply, and no automated message is sent in it (auto-reply, follow-ups, win-back) while the number is shared. Files: src/lib/will/svt-enquiry.ts, service.ts, scheduler.ts, handoff-reasons.ts; tests src/lib/will/__tests__/svt-enquiry-6nov.test.ts.
- Keyword maps for both sites in every language: docs/keywords/ (evidence marked GSC, SERP or native phrasing; no invented volumes).

## Verification
- tsc clean, eslint clean, jest 455 suites: 6,195 passed, 2 skipped, 0 failed.
- Production build passed; real font imports restored; llms files regenerated (1,007 URLs).
- WHT crawl, 1,007 URLs: 0 errors (1 warning: one DE description 177 characters).
- SVT crawl through its domain, 559 URLs and 565 internal links: 0 errors; compliance hits only "your tax agent" (someone else).
- Scan of every line added this round: 0 agent claims, refund promises, AI mentions, LocalBusiness types, dashes, or cross-brand names.
- SVT in a phone-size browser (/, /tfn, /superannuation, /zh, /vi, /contact): one H1, no overflow, WhatsApp prefill names Student Visa Tax in each language, axe 0 violations.

## Still open
- SVT zh and vi versions of the new TFN hub and the rebuilt /superannuation; SVT guide FAQs (needs en, zh, vi together).
- Decisions for Jo: client agreement "authorised agent" wording; TPB symbol in the SVT footer; EN/DE/JA home myGov line.
- SVT own WhatsApp number: when it exists, replace it in src/lib/svt/brand-public.ts and restore the tests marked "5 Nov 2026 (Jo)".

## After deploy
1. Search Console, both domains: resubmit sitemap.xml; Request Indexing for the service pages, /fr /it /es home pages and the new guide.
2. `npm run indexnow`.
3. Vercel: redirect www.studentvisatax.com.au to the apex domain.
