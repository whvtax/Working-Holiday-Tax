# READ-02 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(it)/it/dichiarazione-redditi-australia/page.tsx | 1-585 | 1-585 (one pass) | REVIEWED |
| src/app/(site)/blog/data.ts | 1-5000 | 1-700, 701-1400, 1401-2100, 2100-2799, 2799-3498, 3499-4248, 4249-5000 | REVIEWED (assigned range only; file has 9771 lines, 5001-9771 not read) |

Lines read: 5585 of 5585 assigned. No network, no code run. Tax facts below could not be checked against the ATO, Fair Work or Home Affairs; they are flagged from internal comparison only.

## Findings

### READ-02-F01: Refund timing stated three different ways (14 business days, 12 business days, two weeks)
- Severity: MEDIUM
- Confidence: high (that the texts disagree); low (which figure is right)
- Files and lines: page.tsx:210, 383, 489 ("circa 14 giorni lavorativi", in the hero lead, the FAQ and the how-it-works section, and therefore also in the FAQ JSON-LD); data.ts:1244, 1501, 3673, 3694, 3695 (seoTitle), 3700, 3704, 3739 ("about 12 business days", attributed to the ATO); data.ts:3731-3733 ("Two weeks is typical, not a guarantee").
- Evidence: the Italian page tells the reader the ATO usually pays about 14 business days after lodgement; the blog says the ATO's own figure is about 12 business days. Both are hedged ("di solito", "usually", "most") and attributed to the ATO, so neither is a promise by the business, but the brief lists any refund timing statement as flaggable and the hero lead puts it next to the call to action.
- Recommended fix: pick the ATO's current published figure, use it everywhere, and keep the attribution and the hedge. Consider removing the timing from the hero lead (page.tsx:383) and keeping it only in the FAQ.

### READ-02-F02: "Non-lodgment advice" described in opposite ways
- Severity: MEDIUM
- Confidence: medium
- Files and lines: page.tsx:125 (KEY_FIGURES: below $45,001 of WHM wages "l'ATO non chiede né la tax return né il non-lodgment advice"); data.ts:1096 ("the ATO usually expects a non-lodgment advice instead"); data.ts:1429 ("the ATO may ask for a non-lodgment advice instead"); data.ts:1431 ("A non lodgement advice is a formal statement to the ATO").
- Evidence: the Italian page says no non-lodgment advice is needed; two blog articles say one is usually or possibly expected. Related: data.ts:1414 opens "Often yes" on whether a short stay must lodge, and data.ts:561 and 1057 say a return is lodged "for any year in which you earned Australian income", which reads as stricter than the $45,001 rule at data.ts:1094 and page.tsx:125, 190, 411-413.
- Recommended fix: verify the ATO rule for working holiday makers under $45,001 and align all four places.

### READ-02-F03: Tax agent deadline extension stated with and without its condition
- Severity: LOW
- Confidence: high
- Files and lines: with the condition (only if on the agent's client list before 31 October): data.ts:1057, 1449, 3379; page.tsx:137, 230. Without it: data.ts:1084, 1495, 1541 (partly: "if you engage them before 31 October"), 1571, 1678 ("a tax agent extends it").
- Evidence: data.ts:1495 says a missed October deadline "is rarely the problem it appears" because agent returns get a later date; the Italian page says the opposite for anyone who arrives after 31 October. Published mid-November 2026, the unconditional versions are the misleading ones.
- Recommended fix: add the condition to data.ts:1084, 1495, 1571 and 1678.

### READ-02-F04: Unclaimed super: "fund lost contact" versus the six-month rule
- Severity: LOW
- Confidence: high
- Files and lines: six-month rule, with "Nothing about it depends on your fund losing contact with you": data.ts:1957-1959, 1877, 1932, 2025, 3389. Lost-contact or inactivity wording: data.ts:557, 1692, 2019, 3232, 3593, 3619.
- Evidence: data.ts:2019 and 2025 give both explanations inside the same article.
- Recommended fix: use the six-month rule wording throughout for former temporary residents.

### READ-02-F05: How long to keep the Australian bank account open: two answers
- Severity: LOW
- Confidence: high
- Files and lines: "three to four months after departure": data.ts:3401, 4598, 4601. "at least four to six weeks after lodgement": data.ts:3675, 3723.
- Recommended fix: one figure, or state clearly that one is for the refund alone and the other covers the super payment too.

### READ-02-F06: Amendment window described two ways
- Severity: LOW
- Confidence: medium
- Files and lines: data.ts:2881 ("within two years of the original lodgement"); data.ts:2987 and 4871 ("two years from the date the original assessment issued"); data.ts:3000, 3178, 4884 ("within two years", no start point).
- Recommended fix: use the assessment-date wording everywhere after checking it.

### READ-02-F07: Dated or unverifiable figures to confirm before relying on them
- Severity: INFORMATIONAL
- Confidence: low (could not check; no network)
- Files and lines:
  - data.ts:2164, 2169, 2179, 2459, 2588, 2797, 3904: national minimum wage $26.44 from 1 July 2026, "rose 6%", awards 4.75%. Arithmetic is self-consistent ($24.95 prior year, $33.05 casual, $1,004.90 a week), but a 6% rise with a different award rate is unusual and should be confirmed.
  - data.ts:2975: Medicare levy low-income threshold $28,011 for 2025-26.
  - data.ts:4757, 4769: cents per kilometre 91 cents and $4,550 for 2026-27 (88 cents for 2025-26).
  - data.ts:1353, 1396: $1,000 standard deduction "starts with the 2026-27 income year".
  - data.ts:3981-3983: new Superannuation Guarantee Charge make-up (60% uplift, now deductible).
  - data.ts:2252-2257, 3838-3842, 4510-4516: Home Affairs six-month exemption list (the text itself tells the reader to confirm it).
  - data.ts:4227, 4233-4235: RSA recognition and validity by state; data.ts:4295: WWCC validity.
  - data.ts:4336-4338: "Seven are observed nationally", then the King's Birthday is described separately as national.
  - Article dates: data.ts:30 ("1 July 2024"), 345, 648, 708, 754, 813, 932, 996, 1054 and others carry 2024 or 2025 dates while the bodies quote 12% super, Payday Super from 1 July 2026 and 2026-27 figures. The visible date is older than the content.
- Recommended fix: verify each against the source and refresh the article dates where the body was updated.

### READ-02-F08: Editorial slips
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines:
  - data.ts:1103 and 1104: two bullets saying the same thing (weeks at 45% before the TFN reached the employer).
  - data.ts:1124: "Three conditions" directly after data.ts:1120 "depends on two things being in place, not one".
  - data.ts:1220: a list of what the reader needs for a do-it-yourself lodgement says "so we can review the levy as part of your return".
  - data.ts:1431: "non lodgement advice" spelled differently from "non-lodgment advice" at 1096, 1409, 1429.
  - data.ts:260: "turns on five facts" (five bullets follow, fine); data.ts:316 "Four things" (four follow, fine). Checked, no error.

## Checked and found sound
- Agent status: no statement that the business is itself a registered tax agent or accountant. Supervision wording only: page.tsx:59, 215, 309, 338, 489, 547, 549; data.ts:1140, 1234, 1551-1553, 3437, 3518, 3555, 3735. data.ts:1565 quotes the Tax Practitioners Board rule and places the business under "supervision and control".
- Prices: page.tsx:225, 512, 517 show only $220 and $385 AUD. No service price appears in data.ts 1-5000.
- Guarantee: page.tsx:225 and 526 both carry "La garanzia vale solo per le dichiarazioni con reddito TFN". No guarantee wording in data.ts 1-5000 (all "guarantee" hits are the superannuation guarantee or award terms).
- Refund promises: none. page.tsx:174-175, 195, 528 and data.ts:302, 3653 state that the ATO decides and no average is quoted. Dollar figures are worked examples of withholding or levy (page.tsx:76; data.ts:45-47, 293-296, 1152, 2863, 2971-2973), not promised refunds.
- HTML and links: no raw HTML, script, iframe, event handler, javascript: or data: URL, http:// link, email address or mailto in either range. External links are government only: ato.gov.au (data.ts:170, 232, 3581), servicesaustralia.gov.au (data.ts:2900), fairwork.gov.au (data.ts:4425), tpb.gov.au (page.tsx:550, with rel="noopener noreferrer").
- Phone numbers: only the ATO public lines, 13 28 61 and the overseas line (data.ts:200, 490, 541, 609, 3565, 3571, 3578, 3735). No TFN, bank account or key-shaped strings.
- Language and typography: page.tsx is Italian throughout, data.ts 1-5000 English throughout. No en or em dashes in either range (spaced hyphens are used in data.ts:811, 994, 4260, 4752, 4893). No TODO, lorem, XXX or placeholder text.
- page.tsx code: no params or searchParams. Four dangerouslySetInnerHTML uses (page.tsx:367-370), all JSON-LD passed through jsonLdHtml from @/lib/json-ld-html (helper not opened; it is outside this unit). The only interpolated value in an href is AGENT_TPB (page.tsx:550), a constant from @/lib/agent.

## Notes
- page.tsx:386 and 576 say "Di solito rispondiamo entro un'ora". This is a reply-time claim for WhatsApp, not a refund timing claim; noted only so the owner can confirm it is still true.
- page.tsx:578 links the Italian reader to /start with the text that the questionnaire is English only. Intentional by its wording.
- Tax rates in the two files agree with each other: 15% to $45,000, 30%, 37%, 45%; 45% without a TFN; 30% for an unregistered employer; 47% with no ABN; 12% super; 65% DASP; GST at $75,000; 11 reciprocal health care countries with Italy limited to six months.
- data.ts 5001-9771 is outside this unit and was not read.
