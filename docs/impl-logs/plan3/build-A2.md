# build-A2: WHT EN problem-set guides (24 Nov 2026)

## File (new, owned by A2 only)
/home/claude/v68/base20/src/app/(site)/blog/data-problems.ts
`import type { Guide } from './data'`; `export const problemGuides: Guide[]` (10 guides). Not yet spread into
`guides`: agent A3 does that in data.ts. No other file touched.

All guides: date "24 November 2026", answer-first opening (no links in paragraph 1), question H2s in sentence case,
numbered steps or bullet lists where they help (the guide renderer has no table support, so no markdown tables),
no link in the first paragraph under any H2, hub money page linked once, parent once, at most 2 sibling guides,
5 to 8 body links in total (ATO sources included). Closing section in approved wording.

| slug | cat | title chars | desc chars | words | links | hub | parent | siblings |
|---|---|---|---|---|---|---|---|---|
| tax-refund-closed-australian-bank-account | Tax Return | 47 | 156 | 887 | 7 | /tax-return | how-long-does-tax-refund-take-australia | how-to-update-address-with-ato, ato-tax-return-status-meaning |
| ato-tax-return-status-meaning | Tax Return | 42 | 147 | 788 | 6 | /tax-return | how-long-does-tax-refund-take-australia | tax-refund-less-than-expected-offset, ato-letter-asking-for-information-tax-return |
| tax-refund-less-than-expected-offset | Tax Return | 53 | 148 | 793 | 6 | /tax-return | how-long | notice-of-assessment-working-holiday, amending-tax-return-australia |
| ato-letter-asking-for-information-tax-return | Tax Return | 45 | 154 | ~720 | 6 | /tax-return | how-long | appealing-ato-decision-australia, amending-tax-return-australia |
| notice-of-assessment-working-holiday | Tax Return | 49 | 154 | ~735 | 6 | /tax-return | how-long | tax-refund-less-than-expected-offset, ato-payment-plan-tax-debt-australia |
| dasp-online-application-problems | Super | 49 | 152 | 806 | 6 | /superannuation | dasp-rejected-what-to-do | visa-still-active-cant-claim-super, how-long-does-dasp-take |
| visa-still-active-cant-claim-super | Super | 54 | 154 | 777 | 6 | /superannuation | dasp-rejected-what-to-do | what-happens-to-unclaimed-super, dasp-online-application-problems |
| certify-documents-overseas-super-claim | Super | 48 | 152 | 793 | 6 | /superannuation | dasp-documents-required | dasp-rejected-what-to-do, how-long-does-dasp-take |
| claim-super-if-coming-back-to-australia | Super | 52 | 157 | 826 | 5 | /superannuation | dasp-vs-leaving-super-in-australia-pros-cons (not in r17 registry; chosen as the claim-or-wait parent) | visa-still-active-cant-claim-super, what-happens-to-unclaimed-super |
| tax-and-super-timeline-working-holiday | Tax Return | 57 | 157 | ~1020 | 8 | /tax-return and /superannuation | tax-return-deadline-31-october-working-holiday | financial-year, late penalty, refund time, DASP time, unclaimed super (it is the timeline hub, r14 P2-1) |

All link targets exist in data.ts or in this file (checked by a throwaway jest script, removed).

## Closing wording (approved strings only)
- Tax return guides: "You do not need myGov for us to help. We deal with the ATO directly, and your return / every
  return is reviewed and signed off by a registered tax agent before it is lodged with the ATO." + WhatsApp line.
  ("every return is reviewed and signed off ..." is the /tax-return FAQ wording, page.tsx 286.)
- Super guides: "You do not need myGov for us to help: the DASP application does not use it. We deal with the ATO
  directly, and Working Holiday Tax operates under the supervision of a registered tax agent." plus only
  /superannuation service lines: "We prepare each application and chase the fund that goes quiet." / "We check what
  each fund needs before you leave, while certifying is still easy." / "Send us the names of the places you worked and
  roughly when ... we will tell you which funds to expect and what each one will ask for before you apply." /
  "If you also have a return to lodge, it is reviewed and signed off ..." (superannuation/page.tsx 103, 111, 538, 540;
  supervision sentence from tax-return/page.tsx 286, IMPL_RULES approved).
- Timeline: deadline guide CTA wording (data.ts 7905: "nothing is lodged until you have read it and signed").
No prices, no guarantee, no refund amount or date promise, no "we lodge", no Code Generator, no linking code by phone,
no refund to an overseas account, no Student Visa Tax, no AI wording. Dash grep (U+2013, U+2014, U+2015, "——"): 0.

## Facts used and sources (all fetched 24 Nov 2026 by r12/r13/r14/r15/r16/r20)
- Refunds only to an Australian account ("We can only pay refunds into an Australian bank account"); update via myGov >
  ATO > My profile > Financial institution details; own or joint account; BSB 6 digits, account up to 9; by phone, you
  or a nominated representative: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details (r12, r20 F6; r16 I1, I5)
- Closed account: RBA returns it, up to 10 days; reissue on new details, else cheque; some cheques held up to 90 days
  since Jan 2025; wrong unrelated account recovery over 28 days; known account generally not retrievable:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds (r16 I2 to I4)
- Lodged without AU account: held up to 90 days, contact by letter, email or myGov message:
  https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026 (r12)
- No bank details may block myTax lodgment: myTax financial institution details instructions (r12; text only, no link)
- ATO phone 13 28 61; +61 2 6216 1111 from overseas, 8 am to 5 pm Mon to Fri AEST/AEDT: https://www.ato.gov.au/about-ato/contact-us (r12, r15)
- Statuses, 10 business days, manual up to 30 calendar days, cancelled 24 to 48 h, hardship priority:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return (r12)
- Track via online services, ATO app, 13 28 65; paper up to 90 business days, up to 7 weeks to show:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return (r16 H5, r14 V1)
- Offsetting required by law incl. debts on hold, other Commonwealth debts (FTB example), limited discretion, statement
  of account: https://ato.gov.au/offsetting (r12)
- Amendment 2 years from day after NOA: https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments (r12)
- NOA in myGov inbox, copy under My profile > Communication > History, payment advice and due date on NOA:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment (r12)
- NOA usable as identity record when linking myGov: r16 J11 (information-you-need-to-link-mygov-to-the-ato)
- Data matching letters, amended assessment if no reply, due 21 days, shortfall interest, review does not extend
  objection time, payment plan up to $100,000 online or automated phone:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/data-matching-letters/amended-assessment-from-data-matching (r12)
- Scam check, 1800 008 540, No Caller ID, never asks TFN/bank/myGov by email or SMS:
  https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam (r12)
- DASP eligibility, no other active visa, 28 days, 6 month transfer, ATO-held super only AU account or cheque, IMT only
  from funds, 65% WHM incl. bridging visa linked to 417/462 and whole payment, each fund sets its rate, $5,000 certified
  copies, easier to certify in Australia, "Claiming a DASP will not affect any future visa applications", Home Affairs
  cancel link: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp (r13 F1, F8, F13 to F15; r16 E1 to E9, F1, F3; r20 F5)
- DASP online help: VEVO, DASPmail@ato.gov.au, Add application with ABN, TFN optional, shared secret 3 attempts,
  submitted cannot be changed, status names, does not show fund processing, same passport number and country even if
  expired, +61 2 6216 1111 ask for 13 10 20, TIS +61 3 9268 8332:
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system (r13 F3 to F7; r15 F7)
- Certifiers outside Australia and what the copy shows; name change evidence whatever the amount:
  https://www.ato.gov.au/forms-and-instructions/departing-australia-super-payment-application/how-do-i-complete-this-form (r13 F10, F11)
- Online claims under $5,000 no standard identification; paper any value; 28 days for funds:
  https://www.ato.gov.au/tax-and-super-professionals/for-superannuation-professionals/apra-regulated-funds/paying-benefits/departing-australia-superannuation-payment/receiving-and-processing-claims (r13 F9, r16 E5)
- Fund-specific certification rules (12 months, no fax/email, accredited translation; foreign notary yes, other foreign
  certifiers no): Hostplus DASP form (r13 F17), written without naming the fund.
- Timeline: Payday Super 7 business days (https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super);
  2 Nov 2026 cut-off (https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now);
  agent program ATO wording (https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent);
  early lodgment paper, 50 business days, myTax from overseas (https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia);
  FTL penalty and $364 / $1,820 (failure-to-lodge-on-time-penalty, penalty-units pages); 31 Oct 2027 is a Sunday (computed). (r14 V1 to V12, r16 H, K)
- From existing site copy (/superannuation): Home Affairs can cancel the remaining visa after you leave, which usually
  brings the claim forward; no early release on a WHV; accounts close after a DASP; fees and insurance on small balances.

## Left out on purpose (unverified or ruled out)
Form 1194 (r16 E11), status meanings for "Not to be forwarded"/"Transferred" (names only listed), "into the following
May", $45,001 threshold, 15 June cut-off, fund reporting dates, interest on unclaimed super, ETA/eVisitor named,
tax agent trust account as refund destination, refund timing promises, Services Australia "Credit offset to Centrelink".

## Inferences to flag for Jo
- claim-super-if-coming-back and visa-still-active: "a second or third year working holiday visa already granted, or a
  visitor visa granted for a later trip, is another active visa that blocks the claim" applies the ATO's "any other
  active Australian visa" rule (r20 asked for Jo to confirm this wording).
- Closed-account guide: a reissued cheque "has to reach you by post, so keep the postal address current" (the ATO page
  says cheque; the postal step is inference).

## Verification
- `npx tsc --noEmit -p .`: no errors in my file; only TS6133 unused-import errors in
  src/lib/__tests__/whatsapp-click-23nov.test.ts (another agent's file, modified 01:39).
- jest new-locales-sitemap, locale-blog, frontend-security, brand-separation-26oct, src/lib/svt: 11 suites pass;
  1 fail in src/lib/svt/__tests__/i18n-rules-26oct.test.ts ("short answer figures differ" for blog-zh
  how-long-does-a-tax-refund-take and tax-return-deadline-31-october): caused by another agent's in-progress SVT zh/en
  fact fixes, not by this file. __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
- problemGuides is not yet in `guides`, so guide-level suites only cover it once A3 spreads it.
