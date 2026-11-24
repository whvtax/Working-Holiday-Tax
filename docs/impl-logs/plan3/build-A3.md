# build-A3: src/app/(site)/blog/data.ts (EN WHT guides)

Only file edited: src/app/(site)/blog/data.ts. Scripts: S/plan3/a3/edit1.py (fact fixes), edit2.py (links).

## 1. Wiring
- `import { mygovGuides } from './data-mygov'` at top; `...mygovGuides` spread at the end of `guides`.
  data-mygov.ts uses `import type { Guide } from './data'` only, so no runtime cycle.
- `import { problemGuides } from './data-problems'` and `...problemGuides` after mygovGuides (file appeared mid-task, 10 slugs;
  also `import type` only). No duplicate slugs across the three files.

## 2. Fact fixes
Refund timing (r16 W1/W2, H4/H5; https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return
and .../check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return):
- how-to-lodge-tax-return-working-holiday: "about 12 business days" -> ATO: most online returns processed within 10 business days.
- how-to-lodge-tax-return-from-overseas: same, plus "manual check up to 30 calendar days" (was "considerably slower").
- what-is-a-tax-refund-australia: 12 -> within 10.
- how-long-does-tax-refund-take-australia: description 12/50 -> 10/90 (140 chars); seoTitle number only 12 -> 10
  (factual-error exception; title unchanged); opening sentence 12 -> 10, paper 50 -> 90, added manual 30 calendar days, removed
  unsourced "counted from when it can match them against the income data" and "clock does not start" (r14 F4.4);
  H2 timeline paragraph 12 -> 10 and "a week or more" -> manual up to 30 calendar days; "Past 28 days" -> "Past 30 calendar days,
  the longest the ATO gives for a return it processes by hand" (r14 P1-1); leaving-Australia paragraph 12 -> 10.
- tax-back-australia-working-holiday (FROZEN page, body below opening, not opening/title/description): "in about 12" ->
  "within 10" in one sentence. Flag: minimal factual-number fix, not an addition. Revert if the freeze is read strictly.
- Early-lodgment 50 business days left untouched (H6) in how-to-lodge..., do-you-need-to-lodge..., early-tax-return..., working-holiday-visa-tax-guide.
Closed bank account (r12 P1-B, r16 I2/I3; https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds):
- how-long-does-tax-refund-take-australia H2 "Why does an incorrect bank account...": "bounces back and sits as a credit" ->
  Reserve Bank returns it (up to 10 days), reissued on new details, else cheque, some cheques held up to 90 days since Jan 2025.
- do-you-need-new-tfn-second-visa, how-to-lodge-tax-return-from-overseas ("sits assessed but undelivered"),
  amending-tax-return-australia ("alternative payment route"): same facts.
- how-to-update-address-with-ato (FROZEN page, body H2 "Does your address matter once you have left Australia?", not the
  opening): "becomes a credit ... until someone tells the ATO" replaced with the same facts. Flag as above.
DASP payment destination (r16 E9; DASP page https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp):
- tax-return-deadline-31-october: "DASP can be paid overseas" -> only if the fund offers an international transfer, not ATO-held super.
- bank account guide (When should you close the account?): "both pay into an Australian account" -> refund AU only; ATO-held super AU only; fund overseas only if offered.
Who must lodge (r16 C1/C2, W4; https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/working-holiday-makers):
- how-does-australian-tax-year-work, tax-return-deadline-31-october ("Do you even need to lodge?"), Tax Return categoryMeta
  intro: "$45,001 or more" -> both conditions (only WHM salary/wages AND under $45,001; other income or deductions mean lodging).
Agent program "into the following May" (r14 P1-3, V3/V4; https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent ,
https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program/due-dates-by-month/october-2026):
- do-you-need-to-lodge-tax-return-short-stay, tax-obligations-after-leaving-australia, late-tax-return-penalty (one-sentence
  r14 version), tax-return-deadline-31-october (H2 body replaced with r14 P1-3 EN two paragraphs incl. prior-year exception),
  tax-back-australia-working-holiday (FROZEN page body, flag as above), working-holiday-visa-tax-guide-417-462:
  "May" removed; generic ATO wording, no implication our clients get extra time.
Saturday note (r14 P1-2, V2 https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now):
- tax-return-deadline-31-october, end of first H2 section: 31 Oct 2026 Saturday, accepted to 11:59 pm Mon 2 Nov; 2027 is a Sunday.
Unsourced claims softened/removed:
- r14/r16 H8 "15 June" agent cut-off: early-tax-return-leaving-australia (route paragraph, H2 answer, checklist bullet) and
  australian-financial-year-dates: now "before the financial year ends on 30 June; ask the agent for its last date". H2 wording unchanged.
- r14 P2-2 bank clearing days in how-long-does-dasp-take: replaced with "depends on your bank and on whether the fund offers an international transfer".
- r14 P2-3 late-tax-return-penalty: removed "offset against a DASP payment" and "Home Affairs to look more closely"; kept
  refund offset, sourced: ATO "required by law" to use refunds for tax debts (https://ato.gov.au/offsetting, per r12 F3).
- r02 F11 / r13 1.4 dasp-rejected-what-to-do: "7 to 14 days", "the day after expiry", "within a fortnight" -> "can take some days".
  NOT changed (Jo decides, r02 P3-1): "If more than 30 days have passed ... raising with Home Affairs, which is part of what we handle".
- r13 1.4 dasp-documents-required: "whatever the balance, online or on paper" -> paper any balance; online under $5,000 the ATO does
  not require the fund's ID checks (r16 E5/E6, https://www.ato.gov.au/tax-and-super-professionals/for-superannuation-professionals/apra-regulated-funds/paying-benefits/departing-australia-superannuation-payment/receiving-and-processing-claims).
- Left (verified in r16 F2): "31 October and 30 April" fund reporting.

## 3. Links (body link counts kept at or under 8; none in a first paragraph or first paragraph under an H2)
r17 P1-4 wraps: super-for-casual + how-to-check-super-balance "within 28 days" -> how-long-does-dasp-take; how-long-does-dasp-take
"certified documents" -> dasp-documents-required; dasp-vs-leaving + super-multiple-funds "unclaimed super" -> what-happens-to-unclaimed-super;
what-is-a-tax-refund "average refund", "without a TFN", "several employers" -> average-tax-refund, tax-return-without-tfn,
multiple-jobs; tax-return-deadline "tax refund" -> what-is-a-tax-refund (8 links).
r17 P1-5: (A) dasp-rejected sentence in how-long-does-dasp-take; (B) dasp-vs-leaving sentence in dasp-tax-rate-65; (C) tax-back sentence
at end of how-long-does-tax-refund-take.
r02 P1-4: how-long-does-it-take-to-get-a-tfn (frozen, closing line added at end) -> /superannuation; casual-shift-cancellation
(after payslip paragraph) -> super-for-casual-and-part-time-workers + /superannuation (source F9 ATO employer course); countries-with-medicare
(frozen, closing line added) -> /superannuation ("tax return" left unlinked: page already links /tax-return twice, cap 8).
New-guide parents (r17 P1-2, r13 P2-D, r02 P2-4): how-to-find-lost-superannuation and dasp-rejected-what-to-do -> claim-super-without-mygov.
Problem guides from their parents (r17 P1-2/P1-1, r12 P1-B, r13 P2-D, r14 P2-1/P2-2), all appended sentences, not first paragraphs:
- how-long-does-tax-refund-take-australia -> tax-refund-closed-australian-bank-account, ato-tax-return-status-meaning,
  tax-refund-less-than-expected-offset (8 links, cap reached).
- what-is-a-tax-refund-australia -> notice-of-assessment-working-holiday (8). amending-tax-return-australia -> ato-letter-asking-for-information-tax-return.
- dasp-rejected-what-to-do -> visa-still-active-cant-claim-super, dasp-online-application-problems, claim-super-without-mygov (8).
- dasp-documents-required -> certify-documents-overseas-super-claim. how-long-does-dasp-take -> dasp-online-application-problems,
  tax-and-super-timeline-working-holiday. australian-financial-year-dates -> timeline. dasp-vs-leaving -> claim-super-if-coming-back-to-australia.
- Not linked: deadline guide -> timeline (cap 8 reached with r17 P1-4 link).

## Verify
- tsc: only errors are TS6133 unused imports in src/lib/__tests__/whatsapp-click-23nov.test.ts (another agent's file, in progress).
- jest: frontend-security, new-locales-sitemap, locale-blog, analytics-privacy, whatsapp-click-23nov, src/lib/svt: 12 pass;
  1 fail src/lib/svt/__tests__/i18n-rules-26oct.test.ts (SVT structure, another agent's SVT files). __tests__/wht-copy-compliance-6-languages.test.ts does not exist in the repo.
- Dash grep data.ts: 0. No new prices, no agent/lodging claims, no SVT mention.

## For Jo
- dasp-rejected "30 days ... part of what we handle" service claim left as is (r02 P3-1).
- Frozen-page body edits (below the opening, factual only): tax-back-australia-working-holiday (12 -> 10; May line),
  how-to-update-address-with-ato (closed account). Appends only: how-long-does-it-take-to-get-a-tfn, countries-with-medicare.
