# build-A1: 7 EN WHT myGov-set guides (24 Nov 2026)

## File (only file touched)
NEW src/app/(site)/blog/data-mygov.ts: `import type { Guide } from './data'`, `export const mygovGuides: Guide[]` (7 guides).
Not spread into data.ts (A3 owns that). data.ts untouched.

| slug | category | title chars | desc chars | body words | body links |
|---|---|---|---|---|---|
| mygov-problems-tax-return-super (hub) | Tax Return | 54 | 147 | 883 | 8 |
| mygov-sms-code-not-received-overseas | Tax Return | 48 | 152 | 808 | 8 |
| mygov-account-locked-out | Tax Return | 49 | 153 | 761 | 8 |
| cant-link-ato-to-mygov | Tax Return | 45 | 156 | 765 | 7 |
| myid-foreign-passport-working-holiday | Tax Return | 47 | 158 | 687 | 8 |
| tax-return-without-mygov | Tax Return | 50 | 153 | 703 | 7 |
| claim-super-without-mygov | Super | 50 | 150 | 784 | 8 |

All: date "24 November 2026", readTime 5, no seoTitle, answer in sentence one, every H2 a question, no link in
paragraph 1, max 8 body links (official links counted), /tax-return or /superannuation once (in the CTA), hub once,
1 to 2 siblings. Numbered steps / bullet lists instead of tables: the EN guide renderer (blog/[slug]/GuideArticle.tsx
parseBody) has no table support and data.ts has no markdown tables, so a `|` table would render as raw text.
Each guide has a visible "Sources: ..., checked November 2026" line (r15 citation element).

## Deviations from r11 drafts (and why)
- Slug claim-super-without-mygov (BUILD/r17 registry), not r11's -dasp. Hub link to the Code Generator guide removed
  (not in BUILD set). Code Generator mentioned only as retiring / not downloadable, never as a fix (BUILD, r16 J3).
- Microsoft Authenticator not named (r16 section 4).
- Paper return timing: "may take up to 90 business days" (r16 H5), not r11's 50 (BUILD fact fix). 50 kept only for
  early lodgment before leaving (r16 H6). Online: "most ... within 10 business days" (r16 H4).
- myID Strong: photo check against an Australian passport or WA driver licence (r16 J8); "foreign passport cannot be
  used for it, so most WHMs cannot reach Strong". Never says Strong is reachable with a foreign passport (BUILD).
- No phone linking code, no foreign mobile for ATO SMS, no overseas refund account (BUILD never-list).
- DASP: "a myGov sign in is not on that list" (fact: ATO help page lists requirements without myGov, r13 F3), instead
  of r02's unverified "separate system / no myGov login".
- Closed account wording per r16 I2/I3 (Reserve Bank return, new details or cheque, some cheques held up to 90 days).
  ATO-held super only to an Australian account or cheque; a fund may pay by international transfer (r16 E9).
- Super CTA uses only /superannuation page wording ("We prepare each application and chase the fund that goes
  quiet", "We deal with the ATO directly") plus supervision wording from /tax-return ("Working Holiday Tax operates
  under the supervision of a registered tax agent") and the approved sign-off sentence. Tax CTA: r11 2.1 with
  "You do not need myGov for us to help".
- Removed r11 "Five problems account for almost every message we get" style claims (unverifiable).

## Facts and sources (all checked per r11 1.1 / r16, Nov 2026)
- SMS to registered number, roaming on same AU number; edit number in Contact details:
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms (r11 F2)
- Sign in help: unlock steps, forgot password/username (2 letters 6 numbers), SMS checklist, locked blocks Digital ID,
  passkey, app; Code Generator retiring 28 Feb 2027, not downloadable:
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help (r11 F3, r16 J3, J5, J6)
- myGov helpdesk 132 307 / +61 1300 169 468 option 1, hours: https://my.gov.au/en/about/help/contact (r16 J12)
- Authenticators (Google Authenticator, Apple Passwords, 1Password), clock:
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator (r16 J4)
- Digital ID recovery needs Strong myID, matching name, DOB, email:
  https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id (r16 J7)
- ATO sign-in methods, SMS needs AU mobile, no secret questions:
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato (r16 J1)
- When you can't sign in (recovery, new account, Standard myID simplifies linking):
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account (r11 F7)
- Linking questions: .../create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato (r16 J11)
- Error codes: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals (r11 F11)
- ATO phones 13 28 61, +61 2 6216 1111, TIS +61 3 9268 8332: https://www.ato.gov.au/About-ATO/Contact-us/phone-us/ (r11 F13)
- myID documents, visa via foreign passport, Medicare after one other, Strong photo, visa not verifiable from outside
  Australia: https://www.myid.gov.au/verifying-your-id-in-myid ; https://www.myid.gov.au/set-up (r16 J8, J9; r11 F12)
- myID not tied to a phone: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid (r16 J10)
- Lodging from outside Australia, myTax needs myGov linked, agent/paper, AU bank account:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia (r16 I1, r01 F8)
- Only registered agents may charge: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return (r11 F14)
- Paper pack, GPO Box 9845 SYDNEY NSW 2001: https://www.ato.gov.au/Individuals/Your-tax-return/How-to-lodge-your-tax-return/Lodge-a-paper-tax-return/ (r11 F15)
- 10 business days online: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return (r16 H4)
- Paper up to 90 business days, up to 7 weeks to show: .../check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return (r16 H5)
- Early lodgment paper, 50 business days: .../lodge-your-tax-return-before-leaving-australia (r16 H6)
- Closed account refund: .../check-the-progress-of-your-tax-return/missing-tax-return-refunds (r16 I2, I3)
- DASP eligibility, free, start before leaving, $5,000 certified ID, CoIS fee on paper, 28 days, payment methods, agent
  with written authority: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp (r16 E2, E4, E6, E8, E9)
- DASP online requirements, TFN optional, Add application with ABN, shared secret 3 attempts, passport details exact,
  VEVO, DASPmail@ato.gov.au, ATO-held super labels, +61 2 6216 1111 ask for 13 10 20:
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system (r16 E10, r02 F7, r13 F3 to F7)
- Online claims checked with Home Affairs: r16 E5 / r13 F8.

## Checks
- `npx tsc --noEmit -p .`: clean.
- Dash grep (– — ― ——) on data-mygov.ts: none. No AI/bot, no "we lodge", no tax agent claim for us, no prices, no
  refund amounts, no Student Visa Tax. All H2s are questions, sentence case.
- jest new-locales-sitemap, frontend-security, locale-blog, src/lib/svt: 747 pass, 1 fail in
  src/lib/svt/__tests__/i18n-rules-26oct.test.ts ("every guide matches the English sections..."): SVT content edited by
  another agent, not this file (data-mygov.ts is not imported by any test until A3 spreads it).
  __tests__/wht-copy-compliance-6-languages.test.ts does not exist in base20 (find returned nothing).
- For A3: after spreading, frontend-security renders every guide line; the bodies use only **bold** and [text](url)
  with no parentheses inside URLs, same as data.ts.
