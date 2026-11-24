# build-C (German, WHT /de), 24 Nov 2026

Files changed (only DE files): src/app/(de)/de/blog/data.ts, src/app/(de)/de/tax-return/page.tsx,
src/app/(de)/de/superannuation/page.tsx, src/app/(de)/de/page.tsx, src/app/(de)/de/contact/page.tsx.
DE has no separate slug list: dePostTranslations is the registry (guide-alternates/sitemap read it).
Guide drafts kept at S/plan3/buildC/de-guides.ts.txt; data edits scripted in S/plan3/buildC/edit_data.py (all exact
single-match replacements with asserts).

## 1. New DE guides (data.ts, dePostTranslations, appended after past-years-tax-returns-working-holiday)
Slugs exactly per r17 P1-1 / BUILD. Each renders only when the EN twin with the same slug exists (getGermanGuide);
date comes from the EN twin. Native German, du, sentence case, question H2s, answer in sentence 1, no link in
paragraph 1, at most 8 body links, numbered steps or lists instead of tables (the guide renderer has no table support:
GuideArticle.parseBody renders "|" lines as text). Each paragraph is one line (parseBody makes one <p> per line).
Closing: tax-return guides = "Wir regeln das direkt mit dem ATO" + approved DE sign-off + WhatsApp + /de/tax-return;
super guides = only claims already on /de/superannuation (never log in to myGov, we deal with the ATO directly, we
search every account under your TFN incl. ATO-held, chase each fund, check the three conditions first) + the DE
supervision sentence from /de/client-agreement ("Working Holiday Tax ist unter der Aufsicht eines registrierten
australischen Tax Agent tätig") + /de/superannuation.

| slug | cat | title (chars) | desc | links | words |
|---|---|---|---|---|---|
| mygov-problems-tax-return-super (hub) | Tax Return | 53 | 148 | 8 | 545 |
| mygov-sms-code-not-received-overseas | Tax Return | 55 | 159 | 8 | 546 |
| mygov-account-locked-out | Tax Return | 58 | 157 | 8 | 479 |
| cant-link-ato-to-mygov | Tax Return | 52 | 156 | 8 | 566 |
| myid-foreign-passport-working-holiday | Tax Return | 43 | 158 | 8 | 454 |
| claim-super-without-mygov | Super | 53 | 158 | 7 | 533 |
| tax-refund-closed-australian-bank-account | Tax Return | 54 | 155 | 8 | 581 |
| dasp-online-application-problems | Super | 54 | 156 | 7 | 555 |
| claim-super-if-coming-back-to-australia | Super | 46 | 155 | 6 | 486 |
(tax-return-without-mygov deliberately not built in DE: r17 section 3, /de/tax-return owns "ohne myGov".)

Facts and sources (all VERIFIED in r16 or verified with URL in r03/r11/r12/r13/r20):
- SMS code only to the number on the account, roaming on that AU number; ATO SMS needs an Australian mobile; ATO
  recommends myID, passkey or authenticator overseas: r16 J1, r11 F2, F9.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms ;
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
- SMS checklist, unlock steps, username 2 letters + 6 digits, locked = no Digital ID/passkey/app, new account and
  helpdesk releases email: r16 J5, J6, r11 F3. https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- Overseas: no change needed with app/passkey/Digital ID/secret questions: r11 F1.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
- Authenticators Google Authenticator, Apple Passwords, 1Password; set up only while signed in: r16 J4.
  (Microsoft Authenticator and the Code Generator are NOT mentioned anywhere.)
- Recovery with Strong myID, matching name/DOB/email, "I didn't get my code" > "Continue with Digital ID"; else new
  account: r16 J7, r11 F7. https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- myGov helpdesk 132 307 / +61 1300 169 468 option 1, hours: r16 J12. https://my.gov.au/en/about/help/contact
- myID Standard list, Medicare after one other, Basic with one: r11 F12 https://www.myid.gov.au/set-up ; Strong needs
  Australian documents and photo check (AU passport or WA licence): r16 J8; visa cannot be verified expired/cancelled
  or from outside Australia: r16 J9 https://www.myid.gov.au/verifying-your-id-in-myid ; myID usable overseas/new
  number: r16 J10 https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid
- Linking questions list, skipping all = failed attempt: r16 J11, r11 F10.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
- Error codes, View and link services: r11 F11. https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
- ATO 13 28 61 / +61 2 6216 1111 8 to 5 AET, TIS +61 3 9268 8332, ask for 13 10 20: r11 F13, r13 F7, r12.
  https://www.ato.gov.au/about-ato/contact-us/
- DASP online: no myGov on the help page, TFN optional, fund ABN/member number, Add application, shared secret 1 to 20
  chars, 3 tries, cannot change after submit, statuses, no processing status, VEVO, DASPmail@ato.gov.au, details
  differ = cannot see old applications: r13 F3 to F6, r16 E10.
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- DASP eligibility, 28 days, 6 month transfer, ATO-held super only AU account or cheque, fund IMT only if offered,
  "Claiming a DASP will not affect any future visa applications": r16 E2, E8, E9, F1 to F3; r20 F5.
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- Refunds only to AU accounts, details via myGov My profile, BSB 6 / account up to 9 digits, phone with TFN: r12 F3.
  https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details ;
  no bank details may block myTax: https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details
- Closed account: RBA returns (up to 10 days), reissue on new details, else cheque, some cheques held up to 90 days
  since Jan 2025; wrong account recovery over 28 days: r16 I2 to I4.
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
- Lodging without AU account: refund held up to 90 days, contact by letter/email/myGov: r12 F3.
  https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026
- Second WHV granted = other active visa (direct application of the ATO rule; r13 P1-B cites [D]); ETA/eVisitor not
  named (r20). No linking code by phone, no foreign passport Strong claim, no overseas refund.

## 2. /de/tax-return (r03 P1-2, r17 P1-3, fact fix)
- FAQS: new FAQ after "Geht das auch, wenn ich Australien schon verlassen habe?": "Ich komme nicht mehr in mein
  myGov-Konto. Geht die Steuererklärung trotzdem?" (r03 text). Source: ATO can't-sign-in page, r16 J7/J8.
- GUIDES: added mygov-problems-tax-return-super (first), tax-refund-closed-australian-bank-account, tax-back
  ("Steuern zurückholen, Schritt für Schritt"), tax-obligations-after-leaving ("Was nach der Abreise noch offen
  ist"). Amending already present.
- DASP payment fix: RULES card and FAQ "Geht das auch..." said DASP "kann auf ein Konto im Ausland gehen" -> a fund can
  transfer abroad if it offers it (r16 E9, DASP page).
- Title, description, H1, lead, existing H2s untouched.

## 3. /de/superannuation (r03 P1-3, r17 P1-3, fact fixes)
- FAQ "Brauche ich myGov für den DASP-Antrag?" after the TFN FAQ (r03 text; source DASP help page).
- how-to-apply: after the first paragraph, "So läuft der Online-Antrag laut ATO ab:" + 5 numbered steps
  (DASP_ONLINE_STEPS) + source line to the DASP help page.
- GUIDES: + claim-super-without-mygov, dasp-online-application-problems, mygov hub (r03 label), coming-back,
  super-for-casual ("Super bei Casual- und Teilzeitjobs"), check balance ("Guthaben prüfen, bevor du beantragst").
- DASP payment fix (r16 E9): FAQ 417/462, FAQ "deutsches Konto" (+ not all funds, fees and conversion may apply),
  serviceSchema description, HowTo step 5, from-overseas section: "if the fund offers it".
- H1, title, description, hero untouched.

## 4. /de (home) and /de/contact: same DASP payment fix in one FAQ each ("auch ins Ausland" -> a fund can transfer
abroad if it offers it). Source r16 E9.

## 5. data.ts fact fixes in existing guides
Refund timing 12 -> 10 Arbeitstage (r16 H4, r14 V1, "Arbeitstage" per r14; source
https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return):
- tax-back (lower section only, opening untouched), how-to-lodge-tax-return-working-holiday (same sentence, 2 hits),
  how-to-lodge-tax-return-from-overseas ("Wie lange dauert die Erstattung?" + 30 Kalendertage manual),
  what-is-a-tax-refund, how-long-does-tax-refund-take-australia: description (number only: "innerhalb von 10
  Arbeitstagen", factual-error exception), opening = r14 DE text (10 / 30 Kalendertage / Papier 90 Arbeitstage,
  r16 H5 https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return),
  "Rund 10 Arbeitstage", "Ab Tag 28" -> "Nach 30 Kalendertagen ...", "dieselben 10 Arbeitstage".
- Paper 50 -> 90 only in that opening. Early lodgment 50 kept (working-holiday-visa-tax-guide 298, tax-obligations
  4629, early-tax-return 9012, 9061).
Closed account (r16 I2/I3, missing refunds URL above):
- how-long-does-tax-refund-take: bank H2 rewritten (RBA, 10 days, reissue, cheque, 90 day hold, source link) and
  link to the new closed-account guide; removed "internationale Überweisungen macht das ATO nur ungern".
- do-you-need-new-tfn-second-visa and how-to-update-address-with-ato (frozen page, body below opening, factual fix
  only): "prallt zurück und liegt als Guthaben" -> returned via the Reserve Bank, reissued on new details, else cheque.
DASP payment: how-long-does-dasp-take opening "die internationale Überweisung kommt obendrauf" -> "eine
Auslandsüberweisung, sofern dein Fonds sie anbietet"; deadline guide "kann ins Ausland gezahlt werden" -> fund may
transfer abroad if it offers it.
May line (r14 P1-3, V3/V4, https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent):
working-holiday-visa-tax-guide, tax-back, how-to-lodge-from-overseas, late-tax-return-penalty, tax-obligations-after-
leaving: "bis in den Mai des Folgejahres" replaced by the ATO wording (agents may lodge for clients after 31 Oct if
you contacted them before 31 Oct; your date depends on your situation). Deadline guide agent section replaced by the
r14 DE text (incl. prior-year exception), existing what-is-a-tax-agent link kept. No implication our clients get time.
2 November note (r14 P1-2, V2 https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now):
added at the end of the first H2 section of the DE deadline guide (opening untouched).

## 6. German link additions (r17 P1-4, P1-5; r03/r11/r13 inbound)
- P1-4 wraps: what-is-a-tax-refund "durchschnittliche Erstattung" -> average-tax-refund; deadline guide
  "Steuererstattung" -> what-is-a-tax-refund; super-for-casual "binnen 28 Tagen" and check-balance "die 28 Tage" ->
  how-long-does-dasp-take; dasp-vs-leaving and super-multiple-funds "unclaimed super" -> what-happens-to-unclaimed-super.
  (how-long-does-dasp-take already links dasp-documents-required, wrap skipped.)
- P1-5: (A) dasp-rejected sentence in how-long-does-dasp-take after the certified documents paragraph; (B) dasp-vs-
  leaving sentence in dasp-tax-rate-65-percent-explained last paragraph; (C) tax-back sentence in how-long-does-tax-
  refund-take last paragraph.
- Inbound to new guides: how-to-lodge-tax-return-from-overseas and how-to-lodge-tax-return-working-holiday -> hub;
  tfn-security bullet and early-tax-return bullet -> SMS guide; how-to-find-lost-superannuation ->
  claim-super-without-mygov; how-long-does-dasp-take -> dasp-online-application-problems; dasp-vs-leaving ->
  coming-back guide; how-long-does-tax-refund-take -> closed-account guide.
- All touched guides stay at max 8 body links (checked by script). past-years-tax-returns-working-holiday NOT linked
  (already 11 links, over the cap).

## 7. Not done / for Jo
- EN twins required: all nine DE URLs 404 and stay out of the sitemap until the EN agents ship the same slugs.
- W3 Medicare row on /de/tax-return (KEY_FIGURES and REFUND_SOURCES say DE/AT/CH residents claim the exemption with an
  MES; most WHMs are foreign residents who need none, r16 D2): not in my fact-fix list, left; needs a decision.
- "etwa 14 Werktage" payout on /de/tax-return (r16 W7 unverified; r15 says approved own observation; also in frozen
  OG description): left.
- r15 refund-problem table and DASP blocker table on the DE money pages, r19 prefills/CTA copy (shared components):
  not in my files / scope.
- /de/superannuation FAQ "65 % für alle, die je ein 417- oder 462-Visum hatten" (r13 1.4 nuance) and "Formular 1194"
  (r16 E11): left.

## 8. Verification
- npx tsc --noEmit -p . : clean.
- jest: new-locales-sitemap, page-photo-priority, round2-frontend-security, blog-dates, brand-separation-26oct,
  whatsapp-click-23nov, src/lib/svt: 13 suites pass; new-locales-sitemap fails 3 tests on LOCALE_GUIDE_SLUGS fr/it/es
  vs chunk data (FR/IT/ES agents adding guides; not a DE file). __tests__/wht-copy-compliance-6-languages.test.ts
  does not exist in this repo.
- Dash grep (U+2013, U+2014, U+2015, "——") on all 5 changed files: 0. Rule grep on new text (Steuerberater for us,
  "wir reichen ein", garantiert, Student Visa, AI/KI, Code Generator, Microsoft, linking code): 0.
