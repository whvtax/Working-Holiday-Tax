# impl-de: German (WHT, du) Phase 1 content pass, 24 Nov 2026

Owned files touched: src/app/(de)/de/medicare/page.tsx, src/app/(de)/de/tax-return/page.tsx,
src/app/(de)/de/superannuation/page.tsx, src/app/(de)/de/blog/data.ts. No titles, meta descriptions, slugs, existing H2s
or the /de/superannuation H1 changed. No prices added. No dashes added (checked U+2013/2014/2015 on all four files).

## 1. Jo-decision wording fixes (T2): 7 fixes
Medicare Entitlement Statement: we explain how to apply to Services Australia, we do not arrange it.
- medicare/page.tsx MYGOV row 3 "Wir kümmern uns um den Nachweis, warten ihn ab" -> "Wir erklären dir, wie du den Nachweis bei Services Australia beantragst, und sorgen dafür ..."
- medicare/page.tsx MYGOV row 4 "Wir beantragen sie nur mit dem Nachweis" -> "Wir tragen die Befreiung nur mit dem Nachweis dahinter ein" (was ambiguous: read as us applying)
- medicare/page.tsx FAQ "Was ist ein Medicare Entitlement Statement": "deshalb erledigen wir es als Teil deiner Erklärung" -> "Beantragen musst du es selbst bei Services Australia, und wir erklären dir, wie das geht." (FAQ schema follows automatically, same array)
- medicare/page.tsx FAQ "Wie beantragt man ...": "gehört das Statement bei uns an den Anfang" -> "erklären wir dir gleich zu Beginn, wie du es beantragst"
- medicare/page.tsx Service JSON-LD description "inklusive Medicare Entitlement Statement" -> "mit einer Erklärung, wie du das Medicare Entitlement Statement bei Services Australia beantragst"
- blog/data.ts medicare-levy-working-holiday-makers: "Bei uns gehört die Beschaffung des Nachweises zur Vorbereitung" -> you apply yourself, we explain how (below the frozen opening)
- blog/data.ts german-european-health-insurance-australia-working-holiday "Sprich uns beim Statement früh an." -> "Kümmere dich früh um das Statement, wir erklären dir, wie du es bei Services Australia beantragst."
Checked, nothing to fix in DE: TFN mail-holding address (DE TFN page/guides only advise choosing an address that still takes mail), super consolidation (WHT, guides only describe the process), ATO address update kept.

## 2. Money pages (T6)
/de/tax-return (H1 already contains "Steuererklärung Australien für Work and Travel" in the kicker, so unchanged):
- Hero lede now answers in the first 40 words: lodged after 30 June, also from Germany, overpaid tax only comes back via the return (then the existing no payslips / 14 Werktage line).
- New H2 "Kann ich die Steuererklärung für Australien nachträglich machen?" (missed 31 Oct / never lodged; 50 word answer; links past-years-tax-returns-working-holiday and late-tax-return-penalty-working-holiday; ATO "Lodge a prior year tax return" source). Facts from the page's own FAQ.
- New H2 "Wie mache ich die Steuererklärung für Australien von Deutschland aus?" (47 words; DE cluster "Steuererklärung Australien von Deutschland aus / nachträglich" p4 3.0; links tax-obligations-after-leaving-australia; ATO "Lodge from outside Australia").
- New H2 "Wie bekomme ich meine Steuer aus Australien zurück?" (48 words + 5 Steps; Bing "how to get a tax refund if i am on a working holiday visa" 110 cit.; GSC "steuererklärung australien" cluster; links tax-back guide). Facts: 14 July tax ready, end of July, 10 business days, AU account only (all already in KEY_FIGURES, ATO).
- FAQ (14 items) and FAQ schema untouched. Social title/description already approved wording (no "Lodge your"). dateModified 2026-11-24.
/de/superannuation (H1 unchanged):
- Hero: answer paragraph moved into the Lead so the first words answer "superannuation zurück" (35@13.17, "...zurück bekommen" 34@4.59); the employer sentence follows it.
- New H2 "Superannuation aus Australien zurückbekommen: Schritt für Schritt" (B3; 52 word answer, then the five existing HowTo schema steps rendered visibly from the same array, so HowTo = visible; links how-long-does-dasp-take). Tones of following sections flipped to keep alternation; no H2 text changed.
- "Was kommt als Nächstes" section: added the missed-31-Oct sentence with link to past-years-tax-returns-working-holiday.
- dateModified 2026-11-24. FAQ (14) untouched.

## 3. Internal links (T5)
- Baseline: 143 of 144 DE guides already linked /de/tax-return (only bullying-harassment, off topic, does not); all 15 Super guides already link /de/superannuation. TFN/ABN guides all already link on to /de/tax-return, so no extra sentence was needed there.
- Added /de/superannuation links in 4 tax/payslip guides: how-to-lodge-tax-return-from-overseas, gross-pay-vs-net-pay-australia, how-to-read-a-payslip-australia-working-holiday, cash-in-hand-tax-return.
- tax-back-australia-working-holiday (DE): new H2 "Wie bekommst du deine Steuer aus Australien zurück?" right after the (unchanged) opening, 5 numbered ATO-fact steps and a link to /de/tax-return.
- Crawled-not-indexed: all 48 /de/blog URLs in wht-crawled-not-indexed-1124.xlsx now have >= 2 contextual links from DE guides that have GSC impressions (Pages.csv) and are NOT themselves in the not-indexed list (stricter than the brief). 71 new links for this, each a single appended sentence in a topical paragraph below the opening, varied descriptive anchors, max 3 new links per source guide. Verified by script (S/de_lib.py, S/de_links.py).
- Note: 3 not-indexed targets have no German translation and render the English body with the notice (super-stapling-rule-australia, what-is-superannuation, super-rate-12-percent-2025-2026-increase); their anchors say "(bisher auf Englisch)". These are likely not indexed because they duplicate EN; translating them is the real fix (not done: no new content pass allowed). /de/tax-residency in the list has no (de) route in this repo; not touched.

New links (source -> target):
- how-to-find-lost-superannuation -> /de/blog/dasp-tax-rate-65-percent-explained (anchor "DASP-Steuer von 65 %")
- dasp-vs-leaving-super-in-australia-pros-cons -> /de/blog/dasp-tax-rate-65-percent-explained (anchor "warum auf die DASP 65 % Steuer fällig werden")
- average-tax-refund-working-holiday -> /de/blog/what-is-payg-payment-summary (anchor "PAYG Payment Summary")
- what-is-a-tax-refund-australia -> /de/blog/what-is-payg-payment-summary (anchor "PAYG Summary lesen")
- what-is-medicare-working-holiday-makers -> /de/blog/german-european-health-insurance-australia-working-holiday (anchor "Krankenversicherung für deutsche Backpacker")
- tfn-application-delayed -> /de/blog/can-you-start-work-without-a-tfn (anchor "Arbeiten ohne TFN")
- apply-for-tfn-before-arriving -> /de/blog/can-you-start-work-without-a-tfn (anchor "kannst du ohne TFN anfangen zu arbeiten")
- horticulture-award-working-holiday-makers -> /de/blog/farm-hand-jobs-working-holiday-australia (anchor "Farmhand-Jobs mit Working Holiday Visum")
- farm-work-rights-working-holiday-australia -> /de/blog/farm-hand-jobs-working-holiday-australia (anchor "Jobs als Farmhelfer")
- six-month-employer-rule-working-holiday-visa -> /de/blog/employer-asking-you-to-work-more-than-visa-allows (anchor "wenn der Arbeitgeber mehr verlangt, als dein Visum erlaubt")
- can-you-work-for-multiple-employers -> /de/blog/employer-asking-you-to-work-more-than-visa-allows (anchor "mehr arbeiten, als dein Visum erlaubt")
- gross-pay-vs-net-pay-australia -> /de/blog/what-does-tax-withheld-mean-payslip (anchor "Tax Withheld auf dem Payslip")
- backpacker-tax-rate-australia -> /de/blog/what-does-tax-withheld-mean-payslip (anchor "was Tax Withheld auf dem Payslip bedeutet")
- tax-free-threshold-working-holiday-visa -> /de/blog/how-does-payg-withholding-work (anchor "PAYG Withholding")
- working-holiday-visa-tax-guide-417-462 -> /de/blog/how-does-payg-withholding-work (anchor "wie PAYG Withholding funktioniert")
- six-month-employer-rule-working-holiday-visa -> /de/blog/how-many-hours-can-you-work-on-whv (anchor "wie viele Stunden du mit WHV arbeiten darfst")
- full-time-part-time-casual-australia -> /de/blog/how-many-hours-can-you-work-on-whv (anchor "Arbeitsstunden mit WHV")
- full-time-part-time-casual-australia -> /de/blog/leave-entitlements-working-holiday-visa (anchor "Urlaub und Krankheitstagen mit WHV")
- penalty-rates-australia -> /de/blog/leave-entitlements-working-holiday-visa (anchor "Urlaubsansprüchen mit Working Holiday Visum")
- opening-bank-account-australia-working-holiday -> /de/blog/bringing-money-into-australia-10000-reporting-threshold (anchor "Bargeld nach Australien einführen")
- transferring-money-overseas-australia-tax -> /de/blog/bringing-money-into-australia-10000-reporting-threshold (anchor "Meldegrenze von 10.000 $")
- how-long-does-dasp-take -> /de/blog/dasp-documents-required (anchor "DASP-Dokumenten")
- dasp-rejected-what-to-do -> /de/blog/dasp-documents-required (anchor "Unterlagen für den DASP-Antrag")
- how-much-super-should-employer-pay -> /de/blog/super-stapling-rule-australia (anchor "Stapling-Regel bei der Super")
- what-happens-to-unclaimed-super -> /de/blog/super-stapling-rule-australia (anchor "Super-Stapling-Regel")
- dasp-vs-leaving-super-in-australia-pros-cons -> /de/blog/tax-on-super-withdrawal-backpacker (anchor "Super-Steuer nach der Ausreise")
- how-long-does-dasp-take -> /de/blog/tax-on-super-withdrawal-backpacker (anchor "Steuer auf die Super-Auszahlung für Backpacker")
- how-much-super-should-employer-pay -> /de/blog/how-to-choose-super-fund (anchor "Superfonds wählen")
- how-to-find-lost-superannuation -> /de/blog/how-to-choose-super-fund (anchor "wie du einen Superfonds auswählst")
- employer-not-paying-correctly -> /de/blog/what-is-superannuation-guarantee-charge (anchor "Superannuation Guarantee Charge")
- working-holiday-visa-tax-guide-417-462 -> /de/blog/backpacker-tax-history-australia (anchor "Geschichte der Backpacker Tax")
- what-is-a-tax-refund-australia -> /de/blog/do-you-need-to-lodge-tax-return-short-stay (anchor "Steuererklärung nach kurzem Aufenthalt")
- late-tax-return-penalty-working-holiday -> /de/blog/do-you-need-to-lodge-tax-return-short-stay (anchor "Abgabepflicht bei kurzem Aufenthalt")
- abn-invoicing-requirements-australia -> /de/blog/what-is-a-tax-invoice (anchor "was eine Tax Invoice ist")
- gst-and-abn-for-working-holiday-makers -> /de/blog/what-is-a-tax-invoice (anchor "Tax Invoice")
- late-tax-return-penalty-working-holiday -> /de/blog/understating-income-ato-penalty-working-holiday (anchor "ATO-Strafen bei zu niedrig angegebenem Einkommen")
- what-is-a-tfn -> /de/blog/how-to-apply-for-a-tfn (anchor "TFN beantragen ohne Fehler")
- tfn-identity-documents-required -> /de/blog/how-to-apply-for-a-tfn (anchor "TFN-Antrag")
- can-you-have-tfn-and-abn -> /de/blog/what-is-an-abn (anchor "was ist eine ABN")
- farm-work-rights-working-holiday-australia -> /de/blog/station-hand-cattle-station-working-holiday-australia (anchor "Station-Hand-Jobs")
- farm-work-and-abns -> /de/blog/station-hand-cattle-station-working-holiday-australia (anchor "Station-Hand-Jobs im Outback")
- countries-with-medicare-agreement-australia -> /de/blog/emergency-medical-care-working-holiday-no-medicare (anchor "Notfallversorgung ohne Medicare")
- medicare-levy-working-holiday-makers -> /de/blog/emergency-medical-care-working-holiday-no-medicare (anchor "Notfall ohne Medicare")
- amending-tax-return-australia -> /de/blog/what-is-an-income-statement (anchor "Income Statement")
- multiple-jobs-tax-return-working-holiday -> /de/blog/what-is-an-income-statement (anchor "was das Income Statement zeigt")
- uber-doordash-rideshare-abn-working-holiday -> /de/blog/abn-deductions-business-expenses (anchor "Abzügen mit ABN")
- how-to-find-lost-superannuation -> /de/blog/how-to-check-super-balance-working-holiday (anchor "Superguthaben prüfen")
- super-employer-not-paying-what-to-do -> /de/blog/how-to-check-super-balance-working-holiday (anchor "Superguthaben prüfst")
- full-time-part-time-casual-australia -> /de/blog/what-is-superannuation (anchor "Was ist Superannuation")
- can-you-work-for-multiple-employers -> /de/blog/what-is-superannuation (anchor "Was ist Superannuation")
- penalty-rates-australia -> /de/blog/award-classifications-working-holiday-australia (anchor "Award-Klassifizierungen")
- sole-trader-vs-company-australia-working-holiday -> /de/blog/profit-loss-vs-personal-services-income-australia (anchor "Personal Services Income oder Business")
- small-business-tax-offset-working-holiday-abn -> /de/blog/profit-loss-vs-personal-services-income-australia (anchor "PSI oder Business")
- countries-with-medicare-agreement-australia -> /de/blog/private-health-insurance-working-holiday-australia (anchor "privaten Krankenversicherung mit WHV")
- what-is-medicare-working-holiday-makers -> /de/blog/private-health-insurance-working-holiday-australia (anchor "Krankenversicherung mit 417- oder 462-Visum")
- how-long-does-tax-refund-take-australia -> /de/blog/how-does-australian-tax-year-work (anchor "wie das australische Steuerjahr funktioniert")
- how-much-super-should-employer-pay -> /de/blog/super-rate-12-percent-2025-2026-increase (anchor "Erhöhung auf 12 % Super")
- minimum-wage-australia-2026-27 -> /de/blog/super-rate-12-percent-2025-2026-increase (anchor "Super-Erhöhung auf 12 %")
- piece-rates-farm-work-working-holiday -> /de/blog/fruit-picking-jobs-working-holiday-australia (anchor "Obstpflücken mit Working Holiday Visum")
- horticulture-award-working-holiday-makers -> /de/blog/fruit-picking-jobs-working-holiday-australia (anchor "Obstpflücken in Australien")
- barista-coffee-shop-working-holiday-australia -> /de/blog/waiter-waitress-working-holiday-australia (anchor "Kellnerjobs in Australien")
- bartender-jobs-working-holiday-australia -> /de/blog/waiter-waitress-working-holiday-australia (anchor "Jobs als Kellner oder Kellnerin")
- gross-pay-vs-net-pay-australia -> /de/blog/do-working-holiday-makers-pay-tax-on-tips (anchor "Trinkgeld und Steuern in Australien")
- medicare-levy-working-holiday-makers -> /de/blog/travel-insurance-vs-health-insurance-working-holiday (anchor "Reiseversicherung oder Krankenversicherung")
- ski-resort-jobs-working-holiday-australia -> /de/blog/travel-insurance-vs-health-insurance-working-holiday (anchor "Reiseversicherung oder Krankenversicherung")
- casual-shift-cancellation-rules-australia -> /de/blog/unfair-dismissal-working-holiday-australia (anchor "Unfair Dismissal")
- fair-work-act-working-holiday-makers -> /de/blog/unfair-dismissal-working-holiday-australia (anchor "Unfair Dismissal mit Working Holiday Visum")
- penalty-rates-australia -> /de/blog/public-holidays-australia-working-holiday (anchor "Feiertagen in Australien")
- minimum-wage-australia-2026-27 -> /de/blog/public-holidays-australia-working-holiday (anchor "Feiertagslohn in Australien")
- do-you-need-new-tfn-second-visa -> /de/blog/second-third-year-visa-tax-implications (anchor "Steuerfolgen beim zweiten Visum")
- working-holiday-visa-tax-guide-417-462 -> /de/blog/second-third-year-visa-tax-implications (anchor "zweiten und dritten Working Holiday Visum")
- how-to-lodge-tax-return-from-overseas -> /de/superannuation (anchor "Superannuation-Rückzahlung")
- gross-pay-vs-net-pay-australia -> /de/superannuation (anchor "Super aus Australien zurückholen")
- how-to-read-a-payslip-australia-working-holiday -> /de/superannuation (anchor "Superannuation zurückholen")
- cash-in-hand-tax-return -> /de/superannuation (anchor "zurückholen kannst")

## 4. December items (p4 / p1-keywords DE)
- B3 DASP Schritt für Schritt on /de/superannuation: done (above). Row 50 "H1 Superannuation zurückholen": not done, H1 frozen.
- /de/tax-return question bank (nachträglich, von Deutschland aus, Steuer zurück): done as new H2s, FAQ kept at 14.
- ABN beantragen, White Card, Mindestlohn: not core, left for January per Jo's priority.

## Verification
- npx tsc --noEmit -p . : exit 0.
- npx jest on frontend-security, new-locales-sitemap, locale-blog, whatsapp-click-23nov, page-photo-priority, brand-separation-26oct, round2-frontend-security, src/lib/svt: 992/992 pass. (__tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.)
- Full npx jest: 7 failed tests in 8 suites, all Will + form-start-lang (the known pre-existing set); 6886 pass.
