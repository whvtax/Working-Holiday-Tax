# build2-JA2 (Japanese, round 2), 24 Nov 2026

Owner: src/app/(ja)/ except ja/leaving-australia and the client agreement (neither touched).
Files changed: ja/blog/data.ts, ja/tax-return/page.tsx, ja/superannuation/page.tsx, ja/page.tsx,
ja/blog/[slug]/page.tsx, ja/blog/category/[slug]/page.tsx.

## Sources (checked 24 Nov 2026)
- P1 ATO How Payday Super works (upd 10 Aug 2026): https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super (from 1 Jul 2026 pay for each payday; received by fund within 7 business days; 12% of qualifying earnings; funds 3 business days to allocate or return)
- P2 ATO What payments are qualifying earnings (upd 2 Sep 2026): https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/what-payments-are-qualifying-earnings (OTE + all commissions + salary sacrifice; overtime excluded if clearly identified; fringe benefits, reimbursements, overpayments excluded; earnings paid from 1 Jul 2026)
- P3 ATO Payment deadlines for Payday Super (upd 29 Sep 2026): https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/payment-deadlines-for-payday-super (new employee or new fund: 20 business days; out of cycle: 7 business days after next regular payday; late = SG charge)
- P4 ATO Super from your employer (upd 1 Jul 2026): https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/super-from-your-employer (any earnings; under 18 only if more than 30 hours a week)
- S1 ATO DASP page (upd 21 Apr 2026): eligibility, "any other active Australian visa", bridging visa WHM rate, "Claiming a DASP will not affect any future visa applications", certifying much easier in Australia, Home Affairs cancel-a-visa link
- S2 ATO DASP online help (r16 E10): VEVO, DASPmail@ato.gov.au; S3 DASP form instructions (certifier order and certified copy wording): https://www.ato.gov.au/forms-and-instructions/departing-australia-super-payment-application/how-do-i-complete-this-form
- S4 ATO DASP for funds, receiving and processing claims (online under $5,000 no ID procedures; paper any value)
- T1 ATO Status of your tax return (upd 3 Nov 2026); T2 How to track (r16 H5); T3 Offsetting (upd 5 Jan 2026, example: child support to Services Australia); T4 Amended assessment from data matching (upd 18 Jun 2026: 21 days, SIC, review does not extend objection time, plans for debts up to $100,000); T5 Verify or report an ATO scam (upd 23 Mar 2026: 1800 008 540, No Caller ID, never TFN/bank/myGov login by email); T6 Your notice of assessment (upd 3 Nov 2026: myGov inbox, My profile > Communication > History, posted to paper lodgers); T7 Time limits on amendments (2 years, as cited by the EN twin); r16 J11 (NOA last 5 years as identity record), r16 D2/C3 (Medicare).

## (1) EN guides that rendered in English on /ja (all 7 found) now translated, priority order
1. ato-tax-return-status-meaning  2. notice-of-assessment-working-holiday  3. tax-refund-less-than-expected-offset
4. visa-still-active-cant-claim-super  5. claim-super-if-coming-back-to-australia  6. certify-documents-overseas-super-claim
7. ato-letter-asking-for-information-tax-return.
(List built by comparing guides in src/app/(site)/blog/data.ts with jaPostTranslations bodies; no other untranslated EN guide exists.)
Native Japanese, not word for word; answer first; question H2s; no link in paragraph 1 or in the first paragraph under any H2;
5 to 8 body links; titles 27 to 39 chars; descriptions 121 to 145 chars; no tables in guide bodies (the guide renderer has no
markdown table support, so lists/numbered steps instead). Unverified EN claims left out: "phone call cannot speed up a manual
check", "written explanation of changes", name change evidence "whatever the amount" (softened to "may be asked, check with fund"),
offset example changed to the one on the ATO page (child support). Closings: tax return = approved JA sign-off wording;
super = existing /ja/superannuation wording + Jo's "申請書類を一緒に確認します" (from GuideCta JA), never that we submit.

## (2) payday-super-working-holiday (JA): new, Super guide, sources P1 to P4 + existing JA facts. EN twin now exists.

## (3) Tables
- /ja/tax-return: KEY_FIGURES rendered as a real <table> (caption, th scope row/col, same cellStyle as EN), every string kept.
  Medicare row: one sentence added before the existing text (most WHMs are foreign residents, no levy, exemption claimed in the
  return; MES is for residents not entitled to Medicare), r16 W3/D2/C3, matching the EN fix.
- /ja/superannuation: KEY_FIGURES as a <table> under #key-figures (speakable selector unchanged), all text kept except the
  employer row (task 5 below). H1/title/description untouched.

## (4) Links to /ja/leaving-australia
/ja/tax-return (after-return section sentence + GUIDES card), /ja/superannuation (before-you-leave section, with Payday Super
guide link), /ja (GUIDES first row), guides: tax-refund-closed-australian-bank-account, early-tax-return-leaving-australia,
dasp-vs-leaving-super-in-australia-pros-cons (each one sentence, not a first paragraph, all <= 8 links).
/ja/superannuation GUIDES also gets the 4 new super guides.

## (5) Qualifying earnings / Payday Super (JA)
- /ja/superannuation KEY_FIGURES employer row and BEFORE_YOU_LEAVE row: "多くの雇用主は給料日から数日以内" replaced by the ATO rule
  (received by fund within 7 business days; 20 for new employee/fund) and qualifying earnings (P1 to P3).
- FAQ "将来のビザ" on /ja/superannuation: now quotes ATO S1 ("will not affect any future visa applications").
- data.ts: Super category FAQ (税引前給与の12% -> qualifying earnings), employee-vs-contractor list, how-much-super-should-employer-pay
  (opening, H2 + new QE paragraph with ATO link, timing paragraph, check ratio), super-for-casual-and-part-time-workers (2 places),
  super-employer-not-paying-what-to-do (2), fair-work-act list, farm-work-rights, tax-on-casual pay explainer (8669), SG charge list.
  Blog category page Super intro: one sentence added.
- Jo decision fixes: /ja SERVICES super ("帰国時にDASPを申請します") and guide page Super blurb ("一度に申請します") now
  "TFNからすべてのファンドを探し、申請書類を一緒に確認します".

## Verify
- tsc clean. Full jest: 9 failed suites = 8 known Will/form-start-lang + new-locales-sitemap, which fails only on
  "every /es allowlisted route has a page file" (ES leaving-australia page by another agent, not yet created). JA suites pass.
- Dash check (U+2013/2014/2015) on all added lines: 0. 税理士: no new occurrence. No prices, no refund promises.

## Flags (not changed)
- /ja/superannuation "ATOへ提出する前に、登録タックスエージェントが確認・承認します。" sits in the super with-us section (it refers
  to the tax return guarantee); Service schema name "スーパー受取（DASP）代行サービス" says 代行. Jo to decide under the super CTA rule.
- early-tax-return-leaving-australia still states the unverified "6月15日" agent cut-off (r16 W7); "おおむね14営業日" kept per Jo.
