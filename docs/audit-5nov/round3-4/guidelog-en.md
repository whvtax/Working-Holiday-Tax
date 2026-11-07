# Round 4 guide log: EN (`src/app/(site)/blog/data.ts` only)

An earlier agent was stopped part way. Its edits (diff against `round4/en-data.ts.bak`) were kept and not repeated.
This run added only what was still missing. Script: `round4/en_guides4_apply.py` (each replacement asserts exactly one match).

## Already applied by the earlier run (checked, not duplicated)
- DASP bridges placed early: how-long-does-dasp-take, dasp-vs-leaving (retitled "Leave super in Australia or claim it? What waiting costs"), dasp-rejected, dasp-tax-rate, what-happens-to-unclaimed-super, tax-on-super-withdrawal-backpacker (retargeted by intent to "after the 65%": tax return, home country, timing; slug unchanged), dasp-documents-required.
- DASP fact fixes: 28 days from a complete application; 65% on taxed and untaxed element; $5,000 = Home Affairs certificate on paper applications; one application per account; cannot claim before leaving (can start and save); 6 month transfer rule; interest and "fee free" claims removed.
- Bare "super" lead links removed (SGC, consolidation, employer-not-paying); check-balance trimmed with link to find-lost; find-lost "Where exactly do you search?" section.
- what-is-a-tax-agent "Who is allowed to lodge an Australian return for you?" section; casual shift guide notice section moved up and retitled; tax-obligations payslip fix.

## Applied in this run
- NEW guide `early-tax-return-leaving-australia` (Tax Return, 5 November 2026, 7 min), inserted after tax-obligations-after-leaving-australia. Title/description/opening per new-guides.json; all 10 planned H2s; required links: /tax-return x2 (anchor "working holiday tax return", agent section and close), /superannuation ("claim your super after leaving Australia"), tax-obligations ("what is still outstanding after you leave"), how-to-lodge-tax-return-from-overseas ("lodging from overseas after 1 July"), how-to-cancel-your-abn ("cancel your ABN before you fly"), plus tax-residency guide. Agent described only as a third party; approved sign-off sentence used once; no refund promise.
- Inbound links to the new guide: tax-obligations-after-leaving-australia (was linking the phrase to /tax-return, now /blog/early-tax-return-leaving-australia, H2 kept to two sentences), australian-financial-year-dates, do-you-need-to-lodge-tax-return-short-stay (also removed "figures come from your own payslips"), how-to-lodge-tax-return-working-holiday ("has its own rules" sentence turned into link + 50 business days; the plan placed it in how-long-does-tax-refund-take-australia, but the sentence lives here), how-to-lodge-tax-return-from-overseas (one line for readers who have not left; dropped "brings the refund forward"), how-to-cancel-your-abn, working-holiday-visa-tax-guide-417-462 (dropped "brings the outcome forward by months").
- ATO-held super paid only by EFT to an Australian account in your name or AUD cheque: added to what-happens-to-unclaimed-super, how-long-does-dasp-take (arrival section), dasp-vs-leaving-super (ATO paragraph; "$1,750 into an overseas account" now "if your fund offers that"), tax-obligations-after-leaving-australia.
- Leftover WHM over-withholding claim: do-you-need-to-lodge-tax-return-short-stay opening "withholding can assume a full year that never happened" replaced with 45% before TFN / second job without a declaration. Other part-year passages already state the flat 15% rule.

## Skipped
- Redirects/merges/slug changes (forbidden). Service pages (not ours).

## Handoffs (files outside data.ts)
- `public/llms.txt`, `public/llms-full.txt`, `public/sitemap-llms.xml`: regenerate with `npm run generate:llms` so the new guide is listed (generator reads data.ts; not run here).
- Optional: `src/app/(site)/blog/[slug]/CategoryHero.tsx` ARTICLE_EMOJI entry for the new slug (falls back to the Tax Return emoji now); DECISION_GUIDES in `[slug]/page.tsx` and `LocaleGuidePage.tsx` if it should rank in the Tax Return list.
- Sitemap (`src/app/sitemap.ts`) reads data.ts directly: EN URL is live automatically. DE/JA show it untranslated (noindexed, not in sitemap) until those agents add bodies; FR/IT/ES not affected (`locale-guide-slugs.ts` unchanged, test passes).

## Facts and sources (fetched 5 Nov 2026)
- Early lodgement conditions, exclusions (not permanent, other Australian income, HELP/AASL/VSL), paper form, mark year in bold, post to address on form, NOA to the postal address given, "Payslips aren't sufficient...", payment summary / STP income statement, 50 business days, hardship priority processing, myTax from overseas needs myGov sign-in and Australian bank account: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia
- Agent electronic early lodgement up to and including 15 June (Friday before on a maintenance weekend), SBR software, pre-fill generally not available: https://www.ato.gov.au/tax-and-super-professionals/digital-services/practitioner-lodgment-service/practitioner-lodgment-service-user-guide/lodging-forms-and-schedules/future-year-lodgments
- ATO-held super: "you can only choose EFT to an Australian bank account in your name or a cheque"; IMT only for fund applications; DASP eligibility; 28 days: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- Refund only to an Australian bank account: dasp-plan F10. 15% to $45,000, no tax-free threshold: public/llms.txt Key facts.

## Verify
- `npx tsc --noEmit -p .` clean. Jest: compliance + new-locales-sitemap + all 15 blog/guide suites pass (992 passed, 2 skipped). U+2013/U+2014 in data.ts: 0.
