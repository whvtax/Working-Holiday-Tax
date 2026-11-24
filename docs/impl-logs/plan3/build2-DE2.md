# build2-DE2 (German, WHT /de), 24 Nov 2026

Files changed (DE only): src/app/(de)/de/blog/data.ts, src/app/(de)/de/tax-return/page.tsx,
src/app/(de)/de/superannuation/page.tsx. Not touched: src/app/(de)/de/leaving-australia (other agent), titles,
descriptions, H1s, legal, Will. Scripts and pre-edit copies: S/plan3/de2/ (g/*.md drafts, check.py, insert.py,
links_edit.py, qe_edit.py, tr_edit.py, su_edit.py, *.before).

## 1. EN guides rendering in German with the English fallback (englishOnlyNotice)
Method: tsx script S/plan3/de2/list.ts = EN `guides` minus `dePostTranslations[slug].body`.
Before: 8 guides (all new round-1 problem-set guides, so 0 rows for any of them in gsc24/wht/Pages.csv; no impression
order exists, ordered by topic: timeline hub first, then tax return/refund, then super):
| slug | cat | done |
|---|---|---|
| tax-and-super-timeline-working-holiday | Tax Return | translated |
| ato-tax-return-status-meaning | Tax Return | translated |
| notice-of-assessment-working-holiday | Tax Return | translated |
| tax-refund-less-than-expected-offset | Tax Return | translated |
| ato-letter-asking-for-information-tax-return | Tax Return | translated |
| visa-still-active-cant-claim-super | Super | translated |
| certify-documents-overseas-super-claim | Super | translated |
| tax-return-without-mygov | Tax Return | NOT translated on purpose: r17 section 3 and BUILD ("DE = myGov set minus tax-return-without-mygov"): /de/tax-return owns "ohne myGov". The English fallback stays noindex + canonical to EN (LocaleGuidePage robots index: isTranslated) and out of the DE sitemap. |
After (EN twin payday-super-working-holiday now exists, 162 EN guides): only tax-return-without-mygov falls back.

All new DE guides: native German, du, answer in sentence 1, no link in paragraph 1, question H2s, lists/steps, 6 to 8
body links (checked by check.py), title <= 60, description 120 to 160, ~700 to 980 words. Closings use only existing
approved DE strings: tax return = "Für die Erklärung mit uns brauchst du kein myGov-Konto. Wir regeln das direkt mit dem
ATO, und jede Erklärung wird von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht
wird." (+ "ohne deine Unterschrift geht nichts raus" from /de/tax-return FAQ); super = "Mit uns musst du dich nie bei
myGov einloggen ... Wir regeln das direkt mit dem ATO" + /de/superannuation service lines (prüfen alle drei
Voraussetzungen vorher, suchen jedes Konto, das mit deiner TFN verknüpft ist) + "Working Holiday Tax ist unter der
Aufsicht eines registrierten australischen Tax Agent tätig." No lodging/submit claim for super, no price, no amount.
Facts = the EN twins' facts (sources in build-A2.md: ATO status, track progress, offsetting, time limits on amendments,
NOA, data matching, scam check, DASP page, DASP online help, DASP form instructions, funds' DASP processing page,
FTL penalty and penalty units, agent lodgment program, 2 Nov 2026 cut-off, early lodgment 50 business days).

## 2. payday-super-working-holiday (DE, category from EN twin: Super)
Title "Payday Super: was sich für Work and Travel ändert" (49), description 154. Facts verified today myself:
- 7 business days after payday, from 1 July 2026; exceptions such as new employees; SG charge if late; SG still 12%;
  quarterly before (28 Oct, 28 Jan, 28 Apr, 28 Jul): https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super (updated 10 Aug 2026)
- Qualifying earnings = OTE, all commissions, salary sacrifice, other amounts previously salary or wages for SG;
  casual loading in, overtime out where ordinary hours are clearly identified, reimbursements out:
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/what-payments-are-qualifying-earnings (updated 2 Sep 2026)
- Check the fund after each pay, payslip alone not enough, myGov linked to ATO shows all accounts; if missing: check
  fund, ask employer, then ATO (can investigate and recover; report tool): https://moneysmart.gov.au/how-super-works/what-is-payday-super
Links: 2 ATO, Moneysmart, how-much-super, check-balance, employer-not-paying, /de/leaving-australia, /de/superannuation (8).

## 3. Real tables (r18 P2-1 table conversion; r18 P2-2 source check)
- /de/tax-return "Die Eckdaten auf einen Blick": PlainRows -> <table> (caption, Was / Wert / Quelle, scrollable region,
  same markup as EN). Texts kept; the "Quelle: ATO." tails moved into the Quelle column. Two fact fixes in the rows:
  rates label now "2025/26, im Einbehalt ab 1. Juli 2026 unverändert" (r16 A3, schedule 15 URL in r16 A2);
  Medicare row = EN wording (foreign residents, most WHMs, do not pay it and claim in the return; MES only for residents
  without Medicare entitlement), r16 W3/D2 https://ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/foreign-residents-exemption-from-medicare-levy .
  The REFUND_SOURCES Medicare card said the same misleading thing and was aligned (same source).
  r18 P2-2: the DE "refund only to Australian account" claim already cites the lodge-from-outside-Australia page in
  #aus-deutschland; no change needed.
- /de/superannuation "Die wichtigsten DASP-Zahlen auf einen Blick": numbered rows -> <table> (DASP_FIGURES), texts kept,
  sources in a column. Row 5 updated (task 5): qualifying earnings for pay from 1 July 2026; Payday Super = 7 business
  days after payday, exceptions such as new employees (was "wenige Tage"). Source: about-payday-super above.
  "Formular 1194" kept (task said keep all text) but r16 E11 marks it UNVERIFIED: flag for Jo.

## 4. Links to /de/leaving-australia
- /de/tax-return: GUIDES row "Australien verlassen: Steuer und Super" + sentence in #aus-deutschland.
- /de/superannuation: GUIDES rows (payday-super guide, leaving-australia) + sentence at end of #from-overseas.
- Guides (3): payday-super-working-holiday (new); early-tax-return-leaving-australia (replaced the duplicate second
  /de/tax-return link in the last line, stays at 8 links); how-to-lodge-tax-return-from-overseas (last line, 6 -> 7).
  tax-obligations-after-leaving-australia and how-long-does-dasp-take not linked (already 8 links).

## 5. Qualifying earnings / Payday Super in existing German text (data.ts)
"12 % der Ordinary Time Earnings" now adds "(für Lohn ab dem 1. Juli 2026: der Qualifying Earnings)" in:
how-much-super-should-employer-pay (opening sentence rewritten with both bases and "beim Fonds"; "Was zählt als OTE"
section gets the ATO qualifying-earnings definition and overtime rule), payslip list item, employee-vs-contractor
list item, super-for-casual (two answers), farm work, SG charge list item, super-employer-not-paying (opening and
"wozu ist der Arbeitgeber verpflichtet"), category FAQ "Wie viel Super zahlt mein Arbeitgeber" ("Bruttolohn" ->
regulärer Lohn / qualifying earnings). Payday Super 7-day wording was already present everywhere else (round 1).
Sources: the two ATO Payday Super URLs above. Frozen descriptions untouched.

## Verification
- npx tsc --noEmit -p . : clean.
- jest: frontend-security, brand-isolation-round2, brand-routing-26oct, blog-dates, brand-separation-26oct,
  new-locales-sitemap, locale-blog, whatsapp-click-23nov, round2-frontend-security, launch-gate: 10/10 suites pass
  (414 passed, 2 skipped). __tests__/wht-copy-compliance-6-languages.test.ts does not exist. SVT not touched.
- Dash grep (U+2013, U+2014, U+2015, "——") on the 3 files: 0. Rule grep: "Steuerberater" only in pre-existing lines
  about German advisers / a code comment; no "wir reichen ein", Student Visa, Code Generator, Microsoft, AI wording.

## For Jo
- "Formular 1194" on /de/superannuation (table row, paper section, FAQ) is unverified (r16 E11).
- tax-return-without-mygov stays English-only in DE by design (noindex).
