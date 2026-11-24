# build2-R5: FR, IT, ES round 2 (24 Nov 2026)

Repo /home/claude/v68/base20. Owned files only: src/app/(fr|it|es)/** (not the leaving-australia folders) and
src/lib/locale-guide-slugs.ts. Edit scripts: S/plan3/r5_*.py (r5_edit.py = exact-match helper; FR new text gets the
file's NBSP before : ; ? ! %).

## Facts re-read on the official pages today (24 Nov 2026), with the page's own "last updated" date
- ATO how to track progress (10 Nov 2026): online "most ... within 10 business days"; manual "up to 30 calendar days";
  paper "up to 90 business days". https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return
- ATO lodge with a registered tax agent (24 Apr 2026): "the usual 31 October deadline"; agents "can lodge returns for their
  clients after the usual 31 October deadline"; contact before 31 October to be in the program.
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent
- ATO prior year (24 Apr 2026, r16 H7): myTax from 2016. .../lodge-a-prior-year-tax-return
- ATO lodge before leaving (15 Jun 2026, r16 H6): paper only, 50 business days. .../lodge-your-tax-return-before-leaving-australia
- ATO lodge from outside Australia (24 Apr 2026, r16 I1): Australian bank account for refunds. .../lodge-your-tax-return-from-outside-australia
- ATO About Payday Super (10 Aug 2026): from 1 July 2026 pay super each payday; "must be received by your employees' super
  funds within 7 business days after paying your employees"; exceptions e.g. new employees; SG "12% of qualifying
  earnings"; QE include OTE, all commissions, salary sacrifice and other amounts; funds have 3 business days to allocate or
  return; late = SG charge assessed by the ATO, interest compounding daily, administrative uplift.
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super
- ATO payment deadlines for Payday Super (29 Sep 2026): new employee first contribution 20 business days after payday;
  same for rehired; out of cycle: 7 business days after the next QE payment.
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/payment-deadlines-for-payday-super
- ATO unpaid super from your employer (4 Jun 2026): check fund / ATO online services; ask (previous) employer when, which
  fund, how much; report with the online tool; ATO pays super and interest into the fund, tells you by letter or email;
  may take time, not every referral collects.
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/unpaid-super-from-your-employer
- ATO DASP (21 Apr 2026): 65% WHM, 28 days, EFT AU / AUD cheque / IMT only for fund applications, 6 months transfer,
  cannot claim until left and visa ceased, start before you leave, "check with your employer that all contributions have
  been paid into your fund before submitting your application". https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- ATO-held super (11 May 2026, r16 F3): claim at any time. .../keeping-track-of-your-super/ato-held-super
- Fair Work pay slips (no page date): pay slips show super contributions and the fund; given within 1 working day of pay day.
  https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips
Note: r18 P2-1 proposed "paper: 50 business days"; NOT used (ATO now says up to 90; 50 only for early lodgment, its own row).

## (1) Real deadline and timing tables (r18 P2-1), all existing text kept
NEW src/app/(fr)/fr/_dates.tsx, src/app/(it)/it/_dates.tsx, src/app/(es)/es/_dates.tsx: `TaxDatesTable` (8 rows: self
deadline, agent program, never-lodged year, online 10, manual 30, paper 90, early lodgment 50 paper, refund AU account) and
`SuperDatesTable` (8 rows: 12% of qualifying earnings, 7 business days Payday Super, check employer before DASP, when to
claim, 28 days, 65%/0%, 6-month transfer to ATO, payment methods). Real <table> with caption, th scope, and a source cell per
row = ATO page link + its "last updated" date.
- FR flagship tax-return-australie-pvt: Section #dates-delais after the opening; 12% KEY_FIGURE now qualifying earnings +
  7 business days with source/date; WHM rates source line + ATO link (updated 1 Jun 2026); leaving link in rules section.
- /fr/tax-return: Section #dates-delais (before two-ways); dateModified 2026-11-24 added; leaving link in rules.
- IT flagship dichiarazione-redditi-australia: Section #date-tempi after the opening; 12% KEY_FIGURE updated; rules section
  gets a paragraph (DASP + leaving link).
- /it/tax-return: Section #date-tempi; dateModified 2026-11-05 -> 2026-11-24; rules paragraph with leaving link.
- ES flagship devolucion-impuestos-australia: Section #fechas-plazos after basics; dateModified -> 2026-11-24; leaving link in
  "No dejes tu super olvidada".
- /es/tax-return: existing "Plazos que conviene saber" Section gets id fechas-plazos + the table; rules paragraph with leaving link.
- Super pages: Answer #calendrier (FR) / #calendario (IT, ES) with SuperDatesTable after the key figures, linking the payday
  guide and /<l>/leaving-australia.

## (2) Native payday-super-working-holiday (EN twin in (site)/blog/data.ts, category Super)
NEW src/app/(fr|it|es)/<l>/blog/chunks/21.ts, imported as c21 in each blog/data.ts; slug added to fr/it/es in
src/lib/locale-guide-slugs.ts. Titles 53/55/51, descriptions 147/156/151, bodies 950 to 1,010 words, 8 links each (4 ATO
external, 3 internal guides, /leaving-australia, /superannuation in CTA), none in paragraph 1, question H2s, numbered steps.
Closing: "DASP needs no myGov", "we find every fund under your TFN and check the claim with you before anything is sent"
(Jo's super CTA wording), supervision line; FR/ES add the existing "Nous traitons directement avec l'ATO" / "Nosotros tratamos
con la ATO"; IT omits the ATO sentence (not on /it/superannuation, per build-E note). Not used from the EN twin (not verified
by me): overtime exclusion, "claim again" after a late contribution.

## (3) Links to /<l>/leaving-australia
Flagship, /tax-return, /superannuation (2 each on super and flagship) in every language, plus 3 guides per language
(paragraph before the last H2, link `/leaving-australia`, localised by locale-blog): how-to-lodge-tax-return-from-overseas,
how-long-does-dasp-take, early-tax-return-leaving-australia. Link counts after: max 8.

## (4) Qualifying earnings / Payday Super (r16 W5, G2, G3)
- Money pages: FR flagship + FR super 12% rows; IT flagship 12% row; IT super KEY_FIGURES row (now linked to About Payday
  Super) and who-can-claim paragraph; ES super 12% row (was the only figure without a source; doc comment updated).
- Guides (qualifier "(qualifying earnings for pay from 1 July 2026)" inserted, nothing removed): how-much-super-should-employer-pay
  opening + new paragraph after the OTE section linking the payday guide; super-for-casual opening; farm-work 12% line (08.ts);
  13.ts unpaid-super lines x2; Super category FAQ in each blog/data.ts.
- Left: descriptions (frozen) of how-much-super-should-employer-pay still say "12 % des ordinary time earnings" (FR/IT/ES);
  lists/other mentions of OTE as a concept (02.ts, 04.ts 200/246/264, 07.ts tips, 14.ts back pay) are past or definitional.

## (5) Sources and dates (r15 P2-2)
- FR/IT/ES super: r15 line under key figures with the ATO DASP link and its update date; dateModified 2026-11-24 added to
  IT and ES super WebPage schema (FR already had it).
- Every table row carries source link + date (above). FR flagship WHM rates line linked.
- FR super: "formulaire 1194" removed twice (r16 E11 UNVERIFIED), wording otherwise kept.

## Verification
- npx tsc --noEmit -p . : clean.
- jest new-locales-sitemap, locale-blog, blog-dates, brand-isolation-round2, brand-routing-26oct, supabase-schema-guards,
  src/lib/svt: 14 suites pass. Full jest: only the 8 known Will/form-start-lang suites fail.
  __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
- Dash grep (– — ―) on all FR/IT/ES files and locale-guide-slugs.ts: none. Rule grep on new text: no lodge claim, no
  usted/vosotros, no AI, no SVT, no Code Generator.

## For Jo / lead
- Frozen meta descriptions of how-much-super-should-employer-pay (FR/IT/ES) still say OTE only (accurate for pay before
  1 July 2026); change only if Jo lifts the freeze.
- /fr/tax-return and /it/tax-return OG/twitter "14 jours/giorni" remain (build-E note 3).
