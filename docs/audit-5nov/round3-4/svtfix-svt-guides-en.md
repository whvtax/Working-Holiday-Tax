# svtfix: svt-guides-en

Files: src/lib/svt/content/guides-en.ts, blog-en.ts, long/en/batch-*.ts, new long/en/links.ts, plus a small change to long/library.ts (relatedOf; no other bucket owns long/library.ts).
The earlier agent left no edits (all files had pre-round-4 mtimes, no log), so everything below is new. Nothing duplicated.

## Implemented
P0, implies SVT is the agent / lodges (GEN-01, GEN-02 and extra hits found by grep)
- blog-en lodge-from-overseas: "...so ask us about yours." removed.
- blog-en tax-return-deadline-31-october: "lets them lodge for their clients" reworded neutral; "Ask us about your own position." replaced by "lodge as soon as you can".
- blog-en how-long-does-a-tax-refund-take: "We lodge once your income statements..." -> "A return is best lodged once...".
- blog-en amend-tax-return: "If we lodged it" -> "If your return was prepared with us".
- guides-en tax-residency: "before we lodge anything" -> "before anything is lodged".
- guides-en do-i-need-to-lodge: "Tell us about every year you worked." after the agent-program paragraph -> pointer to past years page.
- batch-09 (late penalty, deadline checklist): both "Ask us about your own situation/position." removed.
- batch-01 how-to-lodge: "how we handle the lodging" / "we take care of the lodging" -> "we prepare the return with you before a registered tax agent reviews and signs it off".
- batch-01 income statement: "When we prepare your return, we check..." (after agent-access sentence) -> neutral.
- batch-04 refund status: "If you are our client, we can check where it is up to" -> "If your return was prepared with us, message us...".
- batch-02 what-is-a-tax-agent: new H2 "How Student Visa Tax fits in" bridge; approved wording; points to the TPB register link on About.
- batch-11 DIY vs agent: "a review by a registered tax agent may help" -> "worth having your return checked"; new H2 "Getting help from us"; "What to have ready for us" -> "Whoever prepares your return, have these ready".
Facts
- DASP 65% (GEN-03, 13 places in guides-en superannuation note, batch-02, batch-08, batch-10, batch-11): now "whole taxable component (taxed and untaxed elements); tax-free stays 0%". Verified on ato.gov.au DASP page (table: tax-free nil/nil; taxed 35/65; untaxed 45/65). Worked examples say the balance is all taxed element.
- Medicare/OSHC causal error "not entitled to Medicare because they have OSHC" fixed in 11 places (batch-01, 02, 06, 07, 11); guides-en medicare meta description + MES paragraph now say entitlement, not OSHC, decides.
- guides-en tax-residency: "A second job is taxed at a higher rate" -> threshold explanation (pe-08); "Probably not" -> "Usually not ... the ATO makes the final decision" (pe-10).
- Work hours (GEN-09): 48 hours a fortnight in session, unlimited in scheduled breaks, added to student-visa-tax-guide-500-485 and workplace-rights with source studyaustralia.gov.au (Australian Government; immi.homeaffairs.gov.au not fetchable from here; text says check VEVO/Home Affairs).
- 2026-27 resident rates: none stated in my files (only 2025-26 rates, labelled as such). Nothing to remove.
- 31 Oct 2026 deadline: already past tense everywhere; generic "31 October" yearly wording kept.
Cannibalization, without merges/301/slug changes (GEN-04, GEN-05)
- Retitled to separate intents: tax-on-super-withdrawal -> "How much super you get back after leaving: DASP tax in dollars" (new description, answer with $10,000 example); dasp-documents-checklist -> paper claims and certified copies; report-unpaid-super -> "How to report unpaid super to the ATO"; several-jobs-in-one-year -> "Starting another job mid-year: TFN declarations and super"; australian-financial-year-dates -> arriving/leaving mid-year; invoices-with-an-abn -> "Invoice or tax invoice?".
- Cross-links both ways: long/en/links.ts LONG_ALSO (pairs, DASP spokes) + blog-en related arrays (dasp-documents-and-timing, employer-not-paying-super, what-is-an-abn-students, unpaid-trial-shifts, minimum-wage-students, amend-tax-return, apply-for-tfn, tfn-declaration-two-jobs, how-much-super-employer-pays, late-lodgment) + guides-en superannuation and abn-delivery related.
Links to service pages (GEN-06)
- relatedOf() now puts the topic's service page first (Super -> superannuation, ABN -> abn-delivery, Tax return -> pricing / how-it-works alternating, Deductions -> pricing / work deductions, Work -> pricing / payslip, Medicare -> medicare, TFN -> 'tfn' when it exists in GUIDES_EN, else blog/apply-for-tfn-student-visa), then LONG_ALSO, then siblings; max 6. Applies to zh/vi long pages too (unknown slugs drop).
Answer boxes and descriptions (GEN-10)
- Shortened 9 answers over 300 chars (DASP rate, DASP net, deadline checklist, late penalty, understating, restaurant award, European students, DASP or leave, standard deduction); 6 descriptions brought into 140-170.

## Not done / handoffs
- GEN-08 FAQs on guides/blog hubs and pe-11: NOT added. i18n-rules-26oct.test enforces identical blocks/FAQ counts between en and zh/vi guides and blog, so en-only FAQs fail the build. Needs a joint wave with svt-guides-zh and svt-guides-vi.
- /superannuation restructure (title, H1, answer block, rate table) and the TFN hub: assigned to svt-core, but the content lives in guides-en.ts (my file). I changed only the 65% note and related list there. If svt-core adds the TFN hub as a GUIDES_EN entry with slug 'tfn', long TFN articles link to it automatically; if it is built another way, update LONG_SERVICE.TFN in long/en/links.ts.
- zh/vi: same P0/65%/OSHC fixes needed in long/zh, long/vi, blog-zh/vi (their buckets). zh/vi long titles were not changed.
- pe-09 (MES via myGov or Services Australia online form): not verified on servicesaustralia.gov.au from here; left unchanged.
- GEN-11 timeless deadline wording: not changed (lead decision: past tense).
- Owner pending, untouched: TPB symbol, WhatsApp number. The batch-02 bridge refers to the TPB register link already on About.

## Verified
- npx tsc --noEmit -p . : clean.
- npx jest src/lib/svt src/lib/__tests__/brand-routing-26oct.test.ts : 9 suites, 715 passed.
- npx jest brand-separation-26oct, launch-gate : 177 passed, 2 skipped.
- eslint on library.ts and links.ts: clean.
- No U+2013, U+2014, U+2015 or "——" in my files.
- Not tested: real-browser check of the related lists.
