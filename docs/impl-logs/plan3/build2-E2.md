# build2-E2 (24 Nov 2026): EN WHT guide data + llms files

Owned/edited: src/app/(site)/blog/data.ts, src/app/(site)/blog/data-problems.ts, public/llms.txt, public/llms-full.txt.
data-mygov.ts: read, no change needed (review M1/L1 to L3 already fixed in round 1).
Pre-edit copies + scripts: S/plan3/e2/ (data.ts.before, data-problems.ts.before, llms*.before, edit_data.py,
sync_full.py, final_full.py, cmp.py, count.py, dump.ts).

## Facts verified today (official URLs)
- 7 business days, received by the fund; exceptions exist; SGC from 1 Jul 2026 assessed by the ATO, on qualifying earnings,
  GIC interest compounding daily, administrative uplift: https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super (updated 10 Aug 2026)
- New employee first contribution and rehired/recommenced: 20 business days; out of cycle payments due 7 business days after
  the next regular payday; pay up to 30 June 2026 follows quarterly rules:
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/payment-deadlines-for-payday-super (29 Sep 2026)
- Qualifying earnings = OTE + all commissions + salary sacrifice that would have qualified (+ some contractor payments); overtime
  excluded where ordinary hours identified; SG = 12% of qualifying earnings for the pay period:
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/what-payments-are-qualifying-earnings (2 Sep 2026)
- Fund has 3 business days to allocate or reject: https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/payday-super-resources/paying-super-for-your-employees
- Payslip shows super for each pay; check employer has right fund details: https://www.ato.gov.au/about-ato/using-our-website/easier-to-read-information/payday-super-easier-to-read
- Do not rely on payslip alone, fund shows arrival; myGov linked to ATO shows all super accounts; ask employer when/which fund/how much;
  ATO can investigate and recover: https://moneysmart.gov.au/how-super-works/what-is-payday-super
- Report via online tool; ATO tells you by letter or email if it can collect; collected super paid to your fund:
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/unpaid-super-from-your-employer (4 Jun 2026)
- Amendment 2 years from day after NOA; out of time: objection: https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments (24 Apr 2026)
- DASP start/submit, 65%: r13 [D]. r12 facts (data matching 21 days, SIC, review; not tax ready 31 July, payment summary, closed business
  estimate, no stat dec): URLs in r12 F3 and in the body links.

## (1) New guide payday-super-working-holiday (data.ts, Super section after super-employer-not-paying-what-to-do)
Title "Payday Super on a working holiday: check your super" (51); description 155; date 24 November 2026; ~1,050 words;
8 body links (3 ATO, how-to-check-super-balance, how-much-super (parent), super-employer-not-paying, tax-and-super-timeline,
/superannuation once); none in paragraph 1 or first paragraph under an H2; question H2s; numbered steps.
Closing (Jo 24 Nov super CTA style): "You do not need myGov for us to help ... we find every fund under your TFN and check the
claim with you before anything is sent. We deal with the ATO directly, and Working Holiday Tax operates under the supervision of a
registered tax agent." No lodge/submit claim, no amounts.
Inbound links added: how-much-super-should-employer-pay, super-employer-not-paying-what-to-do, how-to-choose-super-fund (Payday H2).

## (2) Qualifying earnings (current-rule lines only; historic statements kept)
employee-vs-contractor (super bullet), cash-in-hand (parenthetical), how-much-super (opening, H2 "What counts as qualifying
earnings?", new paragraph + ATO QE link, 0.12 check, payroll request), fair-work-act bullet, gross-pay-vs-net-pay, tips,
super-for-casual (opening, minimum section, "calculated on" answer, WHV answer, bullet), farm-work-rights, SGC bullet,
super-employer-not-paying (opening + obligation), unpaid-trial-shifts, Super category FAQ (data.ts categoryMeta).
NOT changed: description of how-much-super-should-employer-pay ("12% of ordinary time earnings...", description freeze).

## (3) r12 P2 + r13 P2
- P2-A tax-residency-working-holiday-makers: new H2 "What if your return already went in with the wrong answer?" (2 years, objection if out of time).
- P2-B amending-tax-return-australia: new H2 "What if the ATO amends it, not you?" (21 days, SIC, review does not extend objection time).
- P2-C what-is-an-income-statement: "Still not tax ready after 31 July?" paragraph with ATO link. Link to employer-missing-from-income-statement
  NOT added: that guide does not exist (not in the slug registry).
- P2-D ato-payment-plan-tax-debt-australia: links to tax-refund-less-than-expected-offset and notice-of-assessment-working-holiday.
- P2-E tax-back-australia-working-holiday (frozen; add-only below the step list): status + closed account line.
- r13 P2-D/P2-E: already done in round 1 (A3). super-payment-overseas-bank-account link skipped (guide not in registry).

## (4) /leaving-australia links (6 guides)
tax-obligations-after-leaving-australia (link added, duplicate /superannuation link unlinked so count stays 10, pre-existing over cap),
early-tax-return-leaving-australia (8), what-happens-to-unclaimed-super (5), dasp-vs-leaving-super-in-australia-pros-cons (7),
dasp-documents-required (6), data-problems tax-refund-closed-australian-bank-account (8). All appended to last paragraphs.

## (5) llms files
llms.txt: SG key fact now "7 business days after payday ... 20 for a new employee's first contribution" (dated); two common-problem
lines (payday super, leaving Australia); Leaving Australia in main pages; Guides 162, Super 21 + payday entry; leaving link in DE/JA/FR/IT/ES
lists; "Other languages" counts made accurate (162 EN, 161 DE, 162 JA, 149 FR/IT/ES).
llms-full.txt: resynced against live data (script): EN payday entry; DE +17, JA +18 entries (round 1 problem guides + round 2 guides incl.
payday twins), FR/IT/ES +5 each; DE summary "Werktagen" -> "Arbeitstagen" and JA title "目安約10営業日" now match data; category and
section counts recomputed; Leaving Australia service entry (all 6 URLs) and FR/IT/ES page-list lines. cmp.py: 0 mismatches, 0 missing.
If FR/IT/ES add payday twins after this, rerun: dump.ts -> sync_full.py -> final_full.py (idempotent), and update llms.txt counts.

## Verify
- tsc clean (one transient error came from src/lib/svt/content/services-en.ts mid-edit by another agent; clean on rerun).
- jest frontend-security, locale-blog, src/lib/svt: pass. new-locales-sitemap: 1 fail "every /es allowlisted route has a page file"
  (/es/leaving-australia page not yet created by its owner); not my file.
- Dash grep on all four files: none. No lodge/agent claim, no prices, no SVT mention, no amounts promised.

## For Jo / lead
- /superannuation key figure (line ~329) still "12% of ordinary time earnings since 1 July 2025" (not my file).
- how-much-super-should-employer-pay description still says "12% of ordinary time earnings" (frozen description).
- Add payday-super-working-holiday to /superannuation GUIDES, blog/[slug] curated Super list and guide-wa-topic map (not my files).
- tax-obligations-after-leaving-australia has 10 body links (pre-existing; incl. /uk and /german passport pages).
