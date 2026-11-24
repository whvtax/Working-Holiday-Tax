# r12 Refund problems (WHT EN first, SVT EN notes) 24 Nov 2026

Scope: problems that block or delay a tax refund, not myGov login (other agent). Code read only: /home/claude/v68/base20.
Web search budget ran out after 13 searches (shared limit); SERPs not checked are marked "SERP not checked".
All ATO pages below were fetched on 24 Nov 2026; "last updated" is the page's own date.

## 1. Findings

### F1 (FACT, P1 error on our site) "12 business days" is out of date everywhere except /tax-return
- ATO now says "Most returns lodged online process within 10 business days"
  (https://ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return, updated 14 Jun 2026)
  and "Most online lodgments are processed within 10 business days ... Manual processing for online lodgments generally
  takes up to 30 calendar days. The ATO can't speed this up, even by phone"
  (https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return, updated 3 Nov 2026).
- /tax-return already says 10 (src/app/(site)/tax-return/page.tsx:194, :463). Guides still say 12:
  EN src/app/(site)/blog/data.ts lines 1244, 1501, 3681, 3702 (description), 3703 (seoTitle "About 12 business days"),
  3708, 3712, 3747. SVT EN: long/en/batch-04.ts 702, 733, 734, 741, 804; batch-11.ts 541, 588; batch-01.ts 632;
  blog-en.ts 140, 143, 149, 174, 175 ("longer than 12 days?"), 181; home-en.ts 93. Other languages (grep "12 Werktag|12営業日|
  12 jours ouvr|12 giorni lavorativ|12 días hábiles|12 ngày làm việc|12个工作日"): DE data.ts 8, JA data.ts 10, FR chunks 03/08 7,
  IT chunks 03/08/18 10, ES chunks 03/08/18 6, SVT zh 15, SVT vi 15.
- Data: EN /blog/how-long-does-tax-refund-take-australia 2,756 impr, pos 12.97; JA same guide 1,317 impr, 37 clicks, pos 6.29
  (S/gsc24/wht/Pages.csv). A wrong number in the title of a page AI answers can quote is the worst place for it.
- NOT verified this pass: "paper returns up to 50 business days" (the two ATO pages fetched give no paper figure; 50 business
  days is verified only for early lodgement on the existing pages). Leave the 50 as is; do not add it to new text.

### F2 (FACT, P1 error) Closed bank account: our guide says the refund "sits as a credit ... until correct details are supplied"
- data.ts 3723 to 3725 (how-long-does-tax-refund-take-australia). ATO says: refund returned by the Reserve Bank, "can take up
  to 10 days"; update details so it is reissued; "If no updated details are provided, the refund is reissued by cheque";
  "Since January 2025, some cheque refunds are held for up to 90 days while the ATO asks for bank details"
  (https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds, updated 27 Apr 2026).

### F3 Problem by problem (fact = official URL; inference marked)
| Problem | Verified facts (URL) | SERP owners (24 Nov) | Our coverage |
|---|---|---|---|
| Income statement not tax ready / employer missing from pre-fill | Employer finalisation declaration "lodged by 14 July each year"; employees then notified their statement is tax ready; pre-fill only after year end (https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll/finalising-your-stp-data, 23 Oct 2026). Not tax ready shows a red box; ATO recommends waiting; if lodged early you may need to amend and pay more; if employer can't make it tax ready they must give a payment summary; employer no longer in business: estimate with the gross pay estimator (https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/income-statement-not-tax-ready, 5 Jun 2026). myGov inbox notification when all are tax ready; still not tax ready after 31 July: speak to the employer; non STP employers give a payment summary by 14 July (https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement, 20 Nov 2026). Statutory declaration no longer required; payslips, timesheets, bank statements; letter from employer (https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/lost-or-missing-payment-summary, 5 Jun 2026) | "not tax ready": ATO x5, community.ato x5. "employer not showing myGov income statement": community.reckon x5, community.ato x5, ATO. Weak (forums only) | Partly: what-is-an-income-statement (H2 "What if an employer is missing?", EN 70 impr pos 8.94), what-is-payg-payment-summary (H2 "What if an employer never finalised?"), past-years (missing payment summary list). No problem-led page. SVT has income-statement-tax-ready |
| Refund slow / stuck / "under review" | Statuses Processing, Balancing account, Information pending, Under review, Issued; cancelled shows 24 to 48 h, do not lodge again; 10 business days; manual up to 30 calendar days; hardship priority processing (status page above) | community.ato x6, H&R Block x3, austaxai "under review" guide, ATO status page, pvtistes, IGT. Weak to moderate | how-long-does-tax-refund-take-australia has one H2 on under review. No status explainer |
| ATO says I owe money / debt after return | NOA shows refund or amount owing, payment advice and due date on the NOA; myGov inbox; copies under My profile > Communication > History (https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment, 3 Nov 2026). Refund offset: ATO "required by law" to use refunds for tax debts incl. debts on hold; may send to other agencies (example FTB debt); remainder refunded; check statement of account; limited discretion (https://ato.gov.au/offsetting, 5 Jan 2026). Services Australia garnishee; NOA shows "Credit offset to Centrelink" (https://www.servicesaustralia.gov.au/how-we-recover-debts-tax-time, 12 Aug 2025) | "ATO says I owe money after tax return working holiday visa": community.ato x10, MoneySavingExpert forum, Yahoo, oneclicklife, wemoney, financialrights. Weak | ato-payment-plan-tax-debt-australia (why a WHM owes, EN 1,047 impr pos 29.6), ato-tax-debt-failure-to-pay-penalty. No NOA page, no offset page |
| Taxed at the wrong rate (no TFN, unregistered employer) | 2026-27: 15% to $45,000; no TFN 45%; 28 days after TFN application; unregistered employer: foreign resident rates (https://www.ato.gov.au/tax-rates-and-codes/schedule-15-tax-table-for-working-holiday-makers, Jun 2026); starting at 30% (https://ato.gov.au/whm, 3 Jun 2026). Note: "emergency tax" is not an ATO term; 47% is not the WHM no TFN rate | taxback, etax, fairworkmate, everglow, pvtistes, ITP, community.ato. Moderate (commercial) | Strong: backpacker-tax-rate-australia, what-happens-without-your-tfn (frozen), what-does-tax-withheld-mean-payslip; WHT ranks 9.7 for "no tfn withholding tax" (38 impr). No new page |
| Wrong residency status | Residency "doesn't affect the rate" for most WHMs; exception: resident from an NDA country (https://ato.gov.au/whm). Individuals generally have 2 years to amend, from the day after the NOA is sent (https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments, 24 Apr 2026) | SERP not checked | tax-residency-working-holiday-makers (EN 232 impr; JA 749 impr, 61 clicks) has "What happens if it is answered wrongly?" but no fix route |
| Australian account closed after leaving | "We can only pay refunds into an Australian bank account"; update via myGov > ATO > My profile > Financial institution details; account in your name, joint, or registered tax agent's; BSB 6 digits, account up to 9 digits; by phone with TFN (https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details, 22 Jun 2026). Refund retained up to 90 days if no valid Australian details; ATO contacts by letter, email or myGov message (https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026, 30 May 2026). No details may block myTax lodgement (https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details, 19 May 2026). Missing refunds page (F2): wrong unrelated account recovery "can take over 28 days"; known account (old, spouse, agent trust) generally cannot be retrieved | ATO missing refunds page, community.ato x6, Adelaide and Curtin uni pages, taxback blog, widen, studyaustralia. Weak | Mentions only (how-long H2 with the F2 error; past-years "Where is the refund paid?"; how-to-update-address H2). No dedicated page. SVT has bank-account-and-tax-international-students |
| ATO letter asking for more information / amended assessment | ATO may ask for information before amending; no response in time: amended assessment issued; amount due 21 days after notified; payment plan, debts up to $100,000 via online services or automated phone; shortfall interest charge may apply; review request does not extend objection time (https://www.ato.gov.au/individuals-and-families/your-tax-return/data-matching-letters/amended-assessment-from-data-matching, 18 Jun 2026). Verify: do not respond, call 1800 008 540; ATO contacts by phone, email, SMS or post; never asks for TFN, bank details or myGov login by email or SMS; calls show No Caller ID (https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam, 23 Mar 2026) | SERP not checked (budget) | amending-tax-return-australia covers amendments you make (JA 379 impr, 36 clicks, pos 5.14); appealing-ato-decision. Nothing on ATO initiated letters |
| Lost TFN | existing guide, frozen opening | (TFN agent) | how-to-find-lost-tfn (EN 2,673 impr). No action here |
| Several years not lodged | existing guide (5 Nov 2026) already cites ATO prior year, penalty, payment summary pages | | past-years-tax-returns-working-holiday. No action beyond links |
| Partner, employer issues | Spouse questions: nothing verified this pass, leave out. Employer withheld but never paid the ATO: could not verify (search budget), leave out | | No proposal |

Contact numbers verified: 13 28 61 individuals 8 am to 6 pm Mon to Fri; +61 2 6216 1111 from overseas 8 am to 5 pm AEDT
(https://www.ato.gov.au/about-ato/contact-us/, 8 Oct 2026).

GSC rows behind the demand (S/gsc24/wht/Queries.csv unless SVT): "tax refund timeline 2026" 11 impr pos 17.18; "when to expect
tax refund 2026" 7 @30.57; "how long does it take for tax refund to arrive" 8 @20.75; "tax refund leaving australia" 9 @30.56;
"how to lodge an objection" 16 @30.62; "ato effective date refund" 9 @50.67; "tax debt payment plan" 160 @27.64 (head term, ATO
owns it); SVT "tax ready" 2 @8.5, "not tax ready" 2 @40.5, "how long after notice of assessment is refund deposited" 1 @96,
"what does amend return mean" 1 @49. INFERENCE: refund problem queries are long tail with forum only SERPs, the same pattern as
the TFN questions where WHT already ranks 5 to 7.

## 2. Proposals

### P1-A Fix "12" to "10 business days" (factual error, so title/description change is allowed under IMPL_RULES)
Files and lines: see F1. EN wording (data.ts):
- 3702 description: "The ATO says most online returns are processed within 10 business days, and manual checks can take up to
  30 calendar days. What stalls a refund and why." (143 chars)
- 3703 seoTitle: "How long does a tax refund take in Australia? 10 business days" (60 chars)
- 3708: "The ATO says most returns lodged online are processed within 10 business days, and a return that needs a manual
  check generally takes up to 30 calendar days." Keep the rest of the paragraph.
- 1244, 1501, 3681, 3712, 3747: replace "about 12 business days" with "within 10 business days" (3712: "the ATO's own figure for
  most online returns" stays). Source: status page URL in F1, add as a link in 3712.
- SVT EN: same swap in all lines listed; blog-en.ts 175 question becomes "Why is my tax refund taking longer than 10 business
  days?". SVT bodies cannot hold links.
- DE/JA/FR/IT/ES/zh/vi: same number swap by the language owners (native wording), titles included where the number is in them.

### P1-B Fix the closed account paragraph in how-long-does-tax-refund-take-australia (data.ts 3723 to 3727)
Replace the H2 body with:
"A refund is paid only into an Australian bank account. If that account has been closed, the Reserve Bank returns the payment
to the ATO, which can take up to 10 days, and the ATO reissues it once you update your bank details. If no new details are
given, the ATO reissues the refund by cheque, and since January 2025 some cheque refunds are held for up to 90 days while it asks
for bank details ([missing tax return refunds](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds)).

So a refund that seems to have vanished has usually been issued, returned and is waiting. Keeping the Australian account open
until everything owed to you has landed avoids the whole problem. Our guide to [a tax refund and a closed Australian bank
account](/blog/tax-refund-closed-australian-bank-account) covers the fix step by step."
Also add after the "under review" H2: "Each status is explained in [what each ATO tax return status means](/blog/ato-tax-return-status-meaning)."

### P1-C New guides (WHT EN, src/app/(site)/blog/data.ts, category "Tax Return"; slugs checked: none exists in any language,
SVT or scratchpad plan3 slug lists). Each needs the same slug in the sitemap and related links set by the implementer.
Approved closing CTA used in all six (EN): "## Would you rather we dealt with it?\n\nYou don't need myGov for this. We deal with
the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message
us on WhatsApp with roughly where and when you worked."

#### 1. tax-refund-closed-australian-bank-account (P1)
Title: Tax refund and a closed Australian bank account (47)
Description: Closed your Australian bank account before the refund landed? The ATO pays refunds only to Australian accounts.
What happens to the money and how to fix it. (156)
Opening: The ATO pays tax refunds only into an Australian bank account, never into an overseas one. If the account you gave has
been closed, the refund goes back to the ATO and is reissued once you give current Australian bank details; without them, the
ATO reissues it by cheque. The money is not lost, but it waits until the details are fixed.
## Can the ATO pay a refund into an overseas bank account?
No. The ATO says: "We can only pay refunds into an Australian bank account" ([update your financial institution details](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details)).
The myTax instructions add that without bank details you may be unable to lodge online with myTax at all
([financial institution details](https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details)).
## What happens if the refund went to an account you closed?
The Reserve Bank returns it to the ATO, which can take up to 10 days. Update your bank details and the ATO reissues it to the new
account. If you give no new details, it is reissued by cheque, and since January 2025 some cheque refunds are held for up to 90
days while the ATO asks for bank details ([missing tax return refunds](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds)).
## What if you lodge without an Australian account?
The ATO can hold the refund for up to 90 days from when it becomes payable, and it contacts you by letter, email or myGov
message to ask for valid Australian account details. Giving those details with the return means the hold does not apply
([individual tax return instructions 2026](https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026)).
## What if the refund went into the wrong account?
It depends whose account it is. If it is an account unrelated to you, contact the ATO, which will try to recover it; the ATO
says that can take over 28 days. If it is an account you know, such as an old account of yours, a partner's account or a tax
agent's trust account, the ATO generally cannot retrieve it and recovery is a civil matter with the account holder (same ATO
page).
## How do you give the ATO new bank details?
Online through myGov: ATO, then My profile, then Financial institution details. The account must be in your name, alone or
jointly, or be your registered tax agent's account. You need a 6 digit BSB and an account number of up to 9 digits. You can also
phone the ATO with your TFN ready ([update your financial institution details](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details)):
13 28 61 in Australia, or +61 2 6216 1111 from overseas, 8 am to 5 pm AEDT on weekdays ([contact us](https://www.ato.gov.au/about-ato/contact-us/)).
## Should you keep your Australian account open after you leave?
Yes, until everything owed to you has landed. A refund for a year you worked can only arrive in Australia, and the
[super claim](/superannuation) is a separate payment you will want to track too. Our checklist of [tax after leaving
Australia](/blog/tax-obligations-after-leaving-australia) and the guide to [updating your address with the ATO](/blog/how-to-update-address-with-ato)
cover the rest. Where the return stands right now is in [what each ATO tax return status means](/blog/ato-tax-return-status-meaning).
Body link to [working holiday tax return](/tax-return) in the first H2 answer ("before your [tax return](/tax-return) goes in").
+ CTA.

#### 2. ato-tax-return-status-meaning (P1)
Title: ATO tax return status: what each one means (42)
Description: Processing, balancing account, information pending, under review, issued: what each ATO tax return status means,
how long it takes and when to act. (147)
Opening: Your tax return's status in ATO online services tells you exactly where it is: Processing, Balancing account,
Information pending, Under review or Issued. The ATO says most returns lodged online are processed within 10 business days, and
that manual processing generally takes up to 30 calendar days, which a phone call cannot speed up. Under review means a person
is checking the return before it is finalised; it is not a finding against you.
(All facts in this guide: [status of your tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return), updated 3 Nov 2026.)
## What does "In progress: Processing" mean?
The ATO has received the return and started on it. The same status shows again near the end, when the notice of assessment is
about to issue, and an estimated issue date appears when you open it.
## What does "Balancing account" mean?
The ATO is balancing your return against your accounts with it and with other Australian Government agencies. If you owe
anything there, part or all of the refund can be transferred to pay it. Our guide to a [refund smaller than expected](/blog/tax-refund-less-than-expected-offset)
explains how that offset works.
## What do "Information pending" and "Under review" mean?
Information pending: the ATO is collecting information to finish processing. Under review: the return is being checked
manually before it is finalised. In both cases the ATO says it will contact you if it needs anything, and a manual check of an
online return generally takes up to 30 calendar days. If a letter does arrive, see [what to do when the ATO asks for
information](/blog/ato-letter-asking-for-information-tax-return).
## The status says cancelled. Should you lodge again?
No. A cancelled transaction can show for 24 to 48 hours. Do not lodge again in that time, and allow up to 10 business days for
an electronically lodged return to be finalised.
## What does "Issued" mean?
Processing is finished and your notice of assessment has issued, showing a refund, nil or an amount owing. Our guide to the
[notice of assessment](/blog/notice-of-assessment-working-holiday) explains each result. If the refund shows as issued but
never reached you, check the account it went to: see [a closed Australian bank account](/blog/tax-refund-closed-australian-bank-account).
## When is it worth contacting the ATO?
When the ATO contacts you, answer by its date. If you are in financial difficulty or serious hardship, the ATO says you may be
eligible for priority processing. Otherwise the status page is as far as a phone call gets you during a manual check. Normal
timing is in [how long a tax refund takes](/blog/how-long-does-tax-refund-take-australia); the [tax return](/tax-return) page
covers how we prepare one. + CTA.

#### 3. tax-refund-less-than-expected-offset (P1)
Title: Tax refund smaller than expected? Check for an offset (53)
Description: The ATO must use your refund to pay a tax debt and may send it to another agency you owe. How to see if your refund
was offset, and what to do next. (148)
Opening: If your refund is smaller than expected, or the notice shows a refund that never arrived, the ATO may have used it to
pay a debt. The ATO says it is required by law to use refunds and credits to pay tax debts, including a debt on hold, and it may
also send a refund to another government agency you owe money to. Whatever is left once the debts are paid is refunded to you.
## Which debts can take your refund?
Any tax debt you have with the ATO, including one on hold. The ATO may also pay other Commonwealth debts from it; its own example
is a family tax benefit debt with Services Australia ([offsetting](https://ato.gov.au/offsetting)). There are limited
circumstances in which the ATO can choose not to offset.
## How do you know an offset happened?
Your statement of account or ATO online services shows it ([offsetting](https://ato.gov.au/offsetting)). When Services
Australia takes part of a refund, it sends a letter afterwards and the notice of assessment shows "Credit offset to Centrelink"
([how Services Australia recovers debts at tax time](https://www.servicesaustralia.gov.au/how-we-recover-debts-tax-time)).
## What if the refund is smaller because the result itself changed?
Then it is not an offset. Compare the [notice of assessment](/blog/notice-of-assessment-working-holiday) with your return line by
line. If your return had a mistake, individuals generally have 2 years from the day after the notice was sent to amend it
([time limits on amendments](https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments));
our guide to [amending a tax return](/blog/amending-tax-return-australia) covers how.
## What if you do not recognise the debt?
Contact the ATO with your notice of assessment and a copy of your return ready ([your notice of assessment](https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment)).
If you disagree with the decision behind the debt, the route is an objection: see [how to object to an ATO decision](/blog/appealing-ato-decision-australia).
## Why would a working holiday maker have an old tax debt?
Usually from an earlier year where some income had no tax withheld, such as ABN work; our [ATO payment plan guide](/blog/ato-payment-plan-tax-debt-australia)
explains the usual causes and how to pay what is left. Each later [tax return](/tax-return) is balanced against it first. + CTA.

#### 4. ato-letter-asking-for-information-tax-return (P1)
Title: ATO letter asking for information: what to do (45)
Description: The ATO asked for more information about your tax return? Why it happens, how to check the letter is real, the
deadline and what follows if you ignore it. (154)
Opening: A letter or message from the ATO asking for more information about your tax return usually means the data it holds
does not match what your return says. Answer by the date in the letter: the ATO says that if you do not respond in time, it
issues an amended assessment. If you are not sure the contact is genuine, do not reply to it; call the ATO on 1800 008 540 or
sign in to myGov yourself.
## Why does the ATO send these letters?
It compares your return with information from third parties, such as employers and banks, and writes when it finds an error or
omission. It may ask for more information before it amends anything ([amended assessment from data matching](https://www.ato.gov.au/individuals-and-families/your-tax-return/data-matching-letters/amended-assessment-from-data-matching)).
## How do you tell a real ATO letter from a scam?
The ATO contacts people by phone, email, SMS and post. It never asks for your TFN, bank details or myGov sign-in by email or
SMS, and its calls show as No Caller ID. If in doubt, do not respond; call 1800 008 540, or sign in to ATO online services
through myGov rather than following a link ([verify or report a scam](https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/verify-or-report-an-ato-scam)).
Our guide to [protecting your TFN](/blog/tfn-security-protect-from-fraud) covers the common scams aimed at visa holders.
## What happens if you ignore it?
The ATO issues an amended assessment. Any amount payable is due 21 days after the ATO notifies you, and a shortfall interest
charge may apply to the extra tax (same ATO data matching page).
## What if you disagree with the amended assessment?
You can ask for a review if you have documents that support your return, or information that was not available before, and you
can ask the ATO for a written explanation of the changes. A review request does not extend the time you have to object
(same page). The objection route is in [how to object to an ATO decision](/blog/appealing-ato-decision-australia), and the
difference from an amendment you make yourself is in [amending a tax return](/blog/amending-tax-return-australia).
## What if you cannot pay by the due date?
You may be able to set up a payment plan, and for debts of $100,000 or less this can be done in online services or through the
ATO's automated phone service (same page). Our [ATO payment plan guide](/blog/ato-payment-plan-tax-debt-australia) explains the
interest. 
## Does it matter that you have left Australia?
(INFERENCE, no new fact.) No. The letter still arrives through the contact details the ATO holds, so keep them current; the
steps are in [updating your address with the ATO](/blog/how-to-update-address-with-ato) and [tax after leaving Australia](/blog/tax-obligations-after-leaving-australia).
Body link to the [tax return](/tax-return) page in the first H2. + CTA.

#### 5. notice-of-assessment-working-holiday (P2)
Title: Notice of assessment: refund, nil or amount owing (49)
Description: Your notice of assessment shows a refund, nil or an amount owing. Where to find it in myGov, when a debt is due, and
what to do if the result looks wrong. (154)
Opening: Your notice of assessment is the ATO's statement of how your tax was worked out, and it shows whether you get a refund,
owe money or neither. If your ATO account is linked to myGov it arrives in your myGov inbox, and if there is an amount owing the
payment advice and due date are on the notice itself. If the result looks wrong, compare it with your return first: individuals
generally have 2 years to amend.
(Facts: [your notice of assessment](https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment); amendment limit: [time limits on amendments](https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments).)
## Where do you find your notice of assessment?
In your myGov inbox when the ATO is linked. For a copy, sign in to myGov, open the ATO, then My profile, Communication, History.
Without a linked account, a paper lodger receives it by post.
## What does each result mean?
A refund: more tax was withheld than you owed, and it is paid to your Australian account (see [a closed Australian bank
account](/blog/tax-refund-closed-australian-bank-account) if it did not land). Nil: withholding matched the tax. An amount
owing: the notice carries the payment advice and due date. A refund lower than the notice suggests may have been offset against a
debt: see [refund smaller than expected](/blog/tax-refund-less-than-expected-offset).
## Why would a working holiday maker owe money?
Usually because some income had no tax withheld, such as ABN work or cash in hand; the causes are in our [ATO payment plan
guide](/blog/ato-payment-plan-tax-debt-australia) and [cash in hand tax return](/blog/cash-in-hand-tax-return).
## What if you cannot pay by the due date?
Contact the ATO before the date; a payment plan is the usual route, and interest keeps running ([ATO payment plan guide](/blog/ato-payment-plan-tax-debt-australia)).
## What if the notice looks wrong?
Compare it with your return. If the return had an error, amend it within 2 years from the day after the notice was sent; past
that, an objection may be the route ([amending](/blog/amending-tax-return-australia), [objecting](/blog/appealing-ato-decision-australia)).
If you still see a problem, contact the ATO with the notice and a copy of the return. Link /tax-return in the opening. + CTA.
Cannibalisation check: ato-payment-plan (head term "tax debt payment plan", pos 27.6) keeps the plan detail; this page only links.

#### 6. employer-missing-from-income-statement (P2)
Title: Employer missing from your income statement? What to do (55)
Description: An employer missing or still not tax ready? Employers must finalise by 14 July. What the ATO says to do, and how to
lodge if the business has closed. (149)
Opening: Employers have until 14 July to finalise their payroll reporting for the year, and until they do your income statement
shows Not tax ready. The ATO says to wait until it is tax ready and to speak to your employer if it still is not by 31 July. If the
business no longer exists, you estimate your income and tax withheld and include them in your return; a statutory declaration is
no longer needed.
(Facts: [finalising your STP data](https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll/finalising-your-stp-data); [income statement not tax ready](https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/income-statement-not-tax-ready); [access your income statement](https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement); [lost or missing payment summary](https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/lost-or-missing-payment-summary).)
## Why is an employer missing or not tax ready?
Most often they have not finalised yet. An employer not reporting through Single Touch Payroll gives you a payment summary by 14
July instead, so that job will not appear as an income statement. The ATO sends a message to your myGov inbox when all your
income statements are tax ready. Our guide to [what an income statement is](/blog/what-is-an-income-statement) covers the other
causes.
## Should you lodge before it is tax ready?
The ATO recommends waiting, because the amounts may still change. If you lodge early and the employer finalises different
figures, you may have to amend your return and pay more tax.
## What if the employer will not finalise?
Speak to them first. If they cannot make the statement tax ready, the ATO says they need to give you a payment summary. If the
figures are wrong, the employer is the one who corrects them.
## What if the business has closed?
Estimate your income and tax withheld, with the ATO's gross pay estimator if needed, and include them in your return. Work from
payslips, timesheets and bank statements, or a letter from the employer stating income and tax withheld. Keep your workings:
the ATO may ask for written evidence of how you reached the figures.
## What if you had several employers?
Every income statement and payment summary has to be in the return. One job left out is the classic cause of an ATO letter
later: see [what to do when the ATO asks for information](/blog/ato-letter-asking-for-information-tax-return) and our guide to
[several jobs in one year](/blog/multiple-jobs-tax-return-working-holiday). Link /tax-return in the opening H2. + CTA.
Cannibalisation check: what-is-an-income-statement stays the definition page (70 impr); this one is the problem page. Add one
link between them (P2-C).

### P2 Extensions of existing guides (add below openings only; none of these are in the frozen 12 except where said)
- P2-A tax-residency-working-holiday-makers (data.ts ~3513): new H2 at the end "What if your return already went in with the
  wrong answer?": "Then the return can be corrected. Individuals generally have 2 years to amend an assessment, starting the day
  after the notice of assessment is sent ([time limits on amendments](https://www.ato.gov.au/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments)).
  Past that, an objection may be the route. See [amending a tax return](/blog/amending-tax-return-australia) and [how to object
  to an ATO decision](/blog/appealing-ato-decision-australia)." Same for JA (749 impr, 61 clicks) by the JA owner.
- P2-B amending-tax-return-australia: add H2 "What if the ATO amends it, not you?": "Then you receive an amended assessment,
  usually after a letter asking for information. Any extra amount is due 21 days after the ATO notifies you, and asking for a
  review does not extend the time to object ([amended assessment from data matching](https://www.ato.gov.au/individuals-and-families/your-tax-return/data-matching-letters/amended-assessment-from-data-matching)).
  Our guide to [an ATO letter asking for information](/blog/ato-letter-asking-for-information-tax-return) covers what to do."
- P2-C what-is-an-income-statement, end of "What if an employer is missing?": "Still not tax ready after 31 July? The ATO says to
  speak to your employer; the steps, including what to do if the business has closed, are in [employer missing from your income
  statement](/blog/employer-missing-from-income-statement)."
- P2-D ato-payment-plan-tax-debt-australia "What if you think the amount is wrong?": add links to new guides 3 and 5.
- P2-E tax-back-australia-working-holiday (frozen opening; adding allowed): one line under the 5 step list: "Refund late or
  smaller than expected? See [what each ATO status means](/blog/ato-tax-return-status-meaning) and [a closed Australian bank
  account](/blog/tax-refund-closed-australian-bank-account)."

### P3
- SVT EN equivalents only after the WHT guides index: SVT already has tax-refund-delays-international-students,
  bank-account-and-tax-international-students, income-statement-tax-ready. Before writing new SVT pages, read those three and add
  the missing ATO facts there (status meanings, closed account cheque and 90 day hold, offset). New SVT pages, if any: status
  meanings and offset (no links in bodies; related lists in long/en/links.ts). Residency always "may be" / "usually".
- Translations of guides 1 to 4 into DE/JA (JA refund timing and amendment pages already earn clicks), native wording, by the
  language agents.
- Ask the search agent, when budget resets, to check SERPs for "ATO letter asking for information", "refund offset ATO",
  "notice of assessment explained", "employer went out of business tax return".

## 3. What NOT to do
- No new page for "taxed at the wrong rate / 45% no TFN / emergency tax": at least five existing guides cover it and
  what-happens-without-your-tfn is frozen and AI cited; a new page would cannibalise it. Do not use "emergency tax" (not an ATO
  term) or 47% (the WHM no TFN rate is 45%).
- No new pages for lost TFN or unlodged years: how-to-find-lost-tfn (frozen) and past-years-tax-returns-working-holiday exist.
- No new "income statement not tax ready" definition page; guide 6 is framed as the employer problem to avoid splitting
  what-is-an-income-statement.
- Do not claim we update bank details, recover misdirected refunds, or speed up a review; the ATO says calls cannot speed up
  manual processing. "We deal with the ATO directly" is the approved limit.
- Do not state refund timing promises ("your refund in 10 days"); quote the ATO's "most" wording only. No amounts.
- Do not add the paper return "50 business days" or anything about employers who withheld tax but never paid the ATO, cheques
  sent overseas, DASP payment rules, or spouse questions: not verified in this pass.
- Do not change titles or descriptions other than the "12 business days" factual fix (P1-A).
- Do not mention Student Visa Tax on WHT pages or vice versa; no em or en dashes in any implemented text.
