# build-E: French and Italian (24 Nov 2026)

Repo /home/claude/v68/base20. Owned: src/app/(fr)/, src/app/(it)/ (+ IT nav/footer label, task brief). Helper scripts and
pre-edit copies of both blogs: S/plan3/buildE/ (fix_chunks.py, fix_pages.py, fr_blog_before/, it_blog_before/).

## For the lead: LOCALE_GUIDE_SLUGS (not edited by me)
new-locales-sitemap fails only on the slug lists. Add to `fr` AND to `it` in src/lib/locale-guide-slugs.ts:
```
'claim-super-without-mygov',
'mygov-account-locked-out',
'mygov-sms-code-not-received-overseas',
'tax-refund-closed-australian-bank-account',
'tax-return-without-mygov',
```
(The `es` failure in the same test is the ES agent's chunks.) EN twins exist (data-mygov.ts, data-problems.ts), so all 5
FR and 5 IT guides render now.

## For Jo
1. IT "We deal with the ATO directly": no IT translation existed. Used the closest approved IT sentence already live on
   /it (src/app/(it)/it/page.tsx line 254): "Ce la vediamo direttamente noi con l'ATO." It now appears in the 4 IT
   tax-return guides' closings, the new IT flagship myGov section and FAQ. Please confirm (r06 proposed "Trattiamo
   direttamente con l'ATO", NOT used).
2. IT claim-super-without-mygov closing: per BUILD, only wording already on /it/superannuation ("La domanda di DASP in sé
   non richiede myGov...", "Quello che ci affidi è...") plus the supervision line; "Ce la vediamo direttamente noi con
   l'ATO" is NOT used there because /it/superannuation does not say it. FR super closing uses "Nous traitons directement
   avec l'ATO" (it is on /fr/superannuation line 312).
3. Frozen metadata still says "14 jours ouvrés / 14 giorni lavorativi" (refund timing, unverified per r16 H9): /fr/tax-return
   description + OG + twitter (lines 34, 71, 77); /it/tax-return OG + twitter (61, 67). Left (description freeze); body text
   now uses the ATO's 10 business days.
4. Not in my brief, left as is: FR 15.ts past-years "non-lodgment advice" WHM exception (r05 P3-8); "formulaire 1194" on
   /fr/superannuation (r16 W7, unverified); FR 15.ts 589 / IT twin "DASP offset" sentence (r14 F4.5 unsourced in EN);
   "12 % des ordinary time earnings" present tense (r16 W5); /fr/tax-return myGov FAQ + GUIDES (r05 P1-3b); inbound link
   sentences from 03/05/12/13.ts (r05 P3-10, r06 P2-4).

## New guides (category/date from EN twin; FR vous, IT tu; links per r17: money page once, siblings, EN hub as "(en anglais)/(in inglese)")
- src/app/(fr)/fr/blog/chunks/20.ts (new) and src/app/(it)/it/blog/chunks/20.ts (new); imported as c20 in each blog/data.ts.
- Slugs: tax-return-without-mygov, mygov-sms-code-not-received-overseas, mygov-account-locked-out, claim-super-without-mygov,
  tax-refund-closed-australian-bank-account. Titles 43 to 57 chars, descriptions 142 to 155, 559 to 756 words, 6 to 8 body
  links, none in paragraph 1 or in the first paragraph under an H2, 7 to 9 question H2s, numbered steps where useful (the
  guide renderer has no tables). Closings: FR "Vous n'aurez jamais à vous connecter à myGov... Nous traitons directement
  avec l'ATO" + "vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO" + WhatsApp; IT
  "Non devi mai entrare in myGov... Ce la vediamo direttamente noi con l'ATO" + "rivista e approvata da un agente fiscale
  registrato prima di essere presentata all'ATO" + WhatsApp; super guides: supervision line + existing super-page service text.
- Facts and sources (all verified in r16 or with URL in r05/r06/r11/r12/r13):
  - SMS only to registered number, roaming, change in Account settings/Contact details, new account, email release:
    https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
  - Sign-in help, lock/unlock steps, username 2 letters 6 numbers, unusual activity, secret questions, Code Generator retires
    28 Feb 2027 (warning only, never a fix): https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
  - Helpdesk +61 1300 169 468 option 1, hours: https://my.gov.au/en/about/help/contact
  - ATO SMS needs Australian mobile; overseas use myID/passkey/authenticator; secret questions not accepted for ATO:
    https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
  - Recovery with Digital ID needs Strong myID (name, DOB, email match): https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id
  - Strong needs e.g. Australian passport + photo; visa cannot be verified from outside Australia: https://www.myid.gov.au/verifying-your-id-in-myid
  - ATO online errors (002, A927.06, data breach / protective measures): https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
  - ATO +61 2 6216 1111 8 am to 5 pm AEDT; TIS +61 3 9268 8332: https://www.ato.gov.au/about-ato/contact-us
  - Three ways to lodge: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return ;
    paper GPO Box 9845 (r11 F15): https://www.ato.gov.au/Individuals/Your-tax-return/How-to-lodge-your-tax-return/Lodge-a-paper-tax-return/ ;
    paper up to 90 business days, online 10: https://ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return
  - DASP online (no myGov login, secret question, TFN optional, ABN, Add application, passport exactly as first time, VEVO,
    DASPmail@ato.gov.au): https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
  - DASP eligibility, 28 days, payment methods (ATO-held only AU account or cheque, IMT only from funds that offer it):
    https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
  - Refund only to AU account, update details, BSB 6 / account up to 9: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details
  - Closed account: Reserve Bank return up to 10 days, reissue, cheque, some cheques held up to 90 days, wrong account >28 days:
    https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
  - Lodged without AU account, held up to 90 days: https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026

## Money pages
- src/app/(fr)/fr/tax-return-australie-pvt/page.tsx: r05 P1-3a Section "Plus d'accès à myGov ? Vous n'en avez pas besoin"
  after how-it-works, with MYGOV_GUIDES (FR guides: without myGov, SMS, locked; r05's cant-link has no FR guide); two FAQs
  after the France FAQ (SMS code; ATO will not link); GUIDES + tax-back, amending, after-leaving (r17 P1-3 FR labels);
  14 days -> ATO 10 business days in KEY_FIGURES (label + body, adds 30 calendar / 90 paper), FAQ and hero note;
  dateModified 2026-11-24. Title/description/H1 untouched.
- src/app/(fr)/fr/superannuation/page.tsx: r05 P1-3c FAQ "Je n'ai plus accès à myGov..." after the TFN FAQ; GUIDES +
  super-for-casual, check-balance (r17 labels), claim-super-without-mygov; dateModified 2026-11-24.
- src/app/(fr)/fr/tax-return/page.tsx: 14 -> ATO 10 in hero Lead, step body, FAQ (metadata left, see Jo 3).
- src/app/(it)/it/dichiarazione-redditi-australia/page.tsx: r06 P1-3a Section after two-ways (uses "Ce la vediamo
  direttamente noi con l'ATO"); P1-3b FAQ after "Mi serve un account myGov?"; GUIDES + tax-back, amending, after-leaving
  (r17 IT labels) + tax-return-without-mygov; 14 -> 10 in hero, FAQ, how-it-works; DASP overseas qualified "se il fondo lo
  prevede" (RULES, FAQ); dateModified 2026-11-24.
- src/app/(it)/it/superannuation/page.tsx: r06 P1-4a FAQ "Serve myGov per richiedere la super?" (visa screen wording kept
  to "dati sbagliati", per ATO help page); GUIDES + super-for-casual, check-balance, claim-super-without-mygov, SMS guide.
- src/app/(it)/it/tax-return/page.tsx: 14 -> 10 (hero, step, FAQ, what-lede); DASP overseas qualified (2 places).

## Fact fixes in chunks (source r16 H4/H5/I2/I3/E9, r14 V1/V3/V4)
- Refund timing 12/14 -> 10 business days (+30 calendar manual, paper 90; early-lodgment 50 untouched):
  FR 08.ts (lines 42, description 61, opening 63 rewritten per r14 incl. removing the unverified "le délai démarre quand"
  clause, 67, 98 "28 jours" -> "30 jours calendaires", 102), 03.ts 221, 462, 18.ts 168, 199, data.ts 127 (category FAQ).
  IT 08.ts (42, description 65, opening 67 per r14, 71, H2 98 "dopo 10 giorni lavorativi", 100, 102 -> 30 di calendario,
  106), 03.ts 225, 464, 18.ts 168, 198. Description edits change only the number (factual-error exception).
- Closed account ("stays as a credit" was wrong): FR 08.ts 84 (+ link to the new guide in the next paragraph), 02.ts 32,
  07.ts 480 (how-to-update-address, not the opening); IT 08.ts 88 (+ link), 02.ts 32, 07.ts 387.
- DASP payment: FR 15.ts 528, IT 15.ts 455, IT 08.ts 48 now say overseas only if the fund offers it, ATO-held super only
  to an AU account or cheque; flagship/tax-return pages as above.
- "Following May" agent line -> ATO wording (agents can lodge after 31 October if contacted before; no client promise):
  FR 18.ts 197, 315; 15.ts 364; 15.ts 508 section replaced with r14 P1-3 FR text; 07.ts 280; 03.ts 415.
  IT 18.ts 196, 313; 15.ts 368; 15.ts 435 section replaced with r14 P1-3 IT text; 07.ts 284; 03.ts 417.

## r17 P1-6/P1-7 anchors and nav
- FR: all 28 `[tax return en PVT](/tax-return)` in chunks now point to /fr/tax-return-australie-pvt (same words).
- IT: the 5 `[tax return](/it/dichiarazione-redditi-australia)` now point to /tax-return (localised to /it/tax-return)
  (12.ts, 13.ts, 08.ts x2 incl. the rewritten refund opening, 03.ts).
- src/components/layout/Nav.tsx (Services label line 103, top bar line 201, comment) and src/components/layout/Footer.tsx
  line 74: IT label of /it/tax-return "Dichiarazione dei redditi"/"Dichiarazione" -> "Tax return". Re-read before edit;
  only those strings changed.

## Verification
- `npx tsc --noEmit -p .`: clean.
- jest src/lib/__tests__ + src/components + src/lib/svt: only failures are new-locales-sitemap (slug lists fr/it/es, see
  top) and the pre-existing form-start-lang-18nov. __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
- Dash grep (U+2013, U+2014, U+2015) on all FR/IT files and Nav/Footer: none. Rule grep (nous déposons, expert-comptable,
  presentiamo noi, commercialista, Student Visa Tax, AI, linking code, Microsoft): none in new text. Code Generator only as
  "do not count on it, retires 28 Feb 2027".
