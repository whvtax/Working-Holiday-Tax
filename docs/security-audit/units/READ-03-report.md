# READ-03 report
## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/blog/data.ts | 1-5000 | 1-5000 (read in consecutive ranges: 1-400, 401-850, 851-1300, 1301-1750, 1751-2200, 2201-2650, 2651-3100, 3101-3550, 3551-4000, 4001-4450, 4451-4730, 4731-5000) | REVIEWED (assigned range; file has 9167 lines, 5001-9167 not in this unit) |
| src/app/(es)/es/superannuation/page.tsx | 1-580 | 1-580 | REVIEWED |

Lines read: 5580 of 5580 assigned.

## Findings

### READ-03-F01: Broken sentence in the opening paragraph of a super article
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:2187
- Evidence: the first sentence of 'how-much-super-should-employer-pay' says the employer must pay 12 % "in einen Superfonds zahlen, seit dem 1. Juli 2026 mit Payday Super in der Regel innerhalb von sieben Werktagen nach jedem Zahltag in einen Superfonds gezahlt (davor quartalsweise)". Two edits were merged: "in einen Superfonds" appears twice and the verb form does not fit. The next sentence ("So ist der Satz seit dem 1. Juli 2025") then refers to the wrong date. The same paragraph still gives a quarterly example ("8.000 $ im Quartal ... 960 $").
- Recommended fix: rewrite the paragraph as separate sentences: the 12 % rate (since 1 July 2025), then the Payday Super timing (since 1 July 2026).

### READ-03-F02: Reporting of overseas transfers described two ways in the same article
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:2088 against 2119
- Evidence: line 2088 says transfers are reported at any amount and there is no threshold; line 2119 says the transfer "is reported at the usual thresholds".
- Recommended fix: change 2119 to match 2088 (transfers reported regardless of amount; the 10.000 $ figure applies to cash only).

### READ-03-F03: Medicare levy basis described two ways in the same file
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:274 against 1193
- Evidence: line 274 says the levy is charged to people entitled to Medicare, "not residents as such"; line 1193 says the levy "follows tax residency" and a foreign resident does not pay it at all. The reader gets two different tests.
- Recommended fix: one wording in both places (residency first, then Medicare entitlement for the exemption).

### READ-03-F04: "Every employer opened another account" against the stapling rule
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:284, 4130, 4313 against 2209, 4222
- Evidence: lines 284, 4130 and 4313 state as fact that each employer who was not given a fund opened a further account. Lines 2209 and 4222 explain that since November 2021 a new employer must first pay into the stapled fund. Line 2214 softens it ("not always updated in time"), the other three do not.
- Recommended fix: use "can have opened" in the three absolute places.

### READ-03-F05: Minimum wage figures for 2026/27 could not be checked
- Severity: LOW
- Confidence: low (no network)
- Files and lines: src/app/(de)/de/blog/data.ts:149, 1246-1249, 1255, 1265, 1271, 2686, 4853, 4989
- Evidence: national minimum wage 26,44 $ per hour from 1 July 2026 (casual 33,05 $, 1.004,90 $ per week), up from 24,95 $. The figures agree with each other in all eight places, but the rise is about 6 percent, larger than recent annual reviews.
- Recommended fix: check against the Fair Work Commission decision; correct all places together if it differs.

### READ-03-F06: Deduction rules for 2026/27 stated as settled law, could not be checked
- Severity: LOW
- Confidence: low (no network)
- Files and lines: src/app/(de)/de/blog/data.ts:1404, 1447, 3965, 4005, 4014
- Evidence: a flat 1.000 $ deduction "from income year 2026/27" is stated as existing, and the 300 $ no-receipt relief is described as applying "up to and including 2025/26".
- Recommended fix: confirm the measure is enacted and whether the 300 $ rule ends; otherwise word as planned.

### READ-03-F07: Other figures that could not be checked
- Severity: INFORMATIONAL
- Confidence: low (no network)
- Files and lines: src/app/(de)/de/blog/data.ts:1214 (Medicare levy low-income thresholds 28.011 $ and 35.013 $ for 2025/26); 3687, 3847, 3859-3863, 3927 (penalty unit 364 $ since 1 July 2026, maximum 1.820 $, previously 330 $); 1605, 1818, 4615 (early return through a tax agent electronically until 15 June); 1162, 4740 (visa condition 8501 health insurance on a 417/462 visa, hedged in the text); 2259 (departure recorded within 7 to 14 days)
- Evidence: each figure is used consistently inside the file; none could be compared with a government source.
- Recommended fix: verify against ato.gov.au and homeaffairs.gov.au.

### READ-03-F08: Refund timing given in day ranges without attribution
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:2025 (also 2054, 2056)
- Evidence: "most refunds are released between day 7 and day 14, the slower ones between day 14 and day 21" and "from day 28 something concrete is holding it" are stated in the site's own voice. Elsewhere (377, 1494, 1649, 1999, 2021, 2060) the "about 12 business days" figure is attributed to the ATO, and line 2054 says it is not a promise. No refund amount is promised anywhere in the range.
- Recommended fix: attribute the day ranges to the ATO or mark them as typical experience.

### READ-03-F09: Sentences that are tied to today's date
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:296, 375, 1342, 1792, 1814, 3851, 3904-3915; src/app/(es)/es/superannuation/page.tsx:562-564
- Evidence: "the 31 October 2026 deadline has passed", "the current year 2026/27". Correct now, wrong after 30 June 2027. The article at 3903-3958 is written entirely around the 2025/26 deadline.
- Recommended fix: put these lines on the yearly content refresh list.

### READ-03-F10: Response-time promise on the Spanish super page
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(es)/es/superannuation/page.tsx:331, 547, 574
- Evidence: "we reply in about an hour" appears three times with no condition (a service promise, not a refund promise).
- Recommended fix: confirm it holds at night and on weekends, or add "in business hours".

## Notes
- No finding under items 1, 3, 6, 7 or 8 of the brief:
  - Item 1: every mention of the business and a tax agent is supervision wording (team prepares, a registered Australian tax agent reviews and approves): de data.ts 226, 1694, 1912, 1955, 2854, 3115, 3957; es page 537-539.
  - Item 2: the only guarantee text is es page 533, and it carries the "TFN income only" limit. No guarantee wording in the German range (grep for "garant" returned only work-rights uses).
  - Item 3: no service prices in either file. Dollar amounts are tax examples, wages, bank fees and ASIC fees.
  - Item 6: de data.ts 1-5000 has no URL, no HTML tag, no script, no email (grep and reading). Phone numbers at 549, 812, 858, 921 are the two ATO public lines. Line 1708 quotes one English sentence from the Tax Practitioners Board, marked as a quote. es page: external links are ato.gov.au only, https, with rel="noopener noreferrer". Nothing shaped like a key, TFN or account number.
  - Item 7: no en or em dashes in either file (grep with UTF-8 locale and reading). No TODO, lorem or XXX. German file is German; Spanish page is Spanish; English terms are tax terms kept on purpose. Box-drawing characters at lines 14, 64, 175 and others are in code comments only.
  - Item 8: es page uses no params or searchParams; the four dangerouslySetInnerHTML uses (308-311) all go through jsonLdHtml. That helper (src/lib/json-ld-html) was not opened.
- Tax facts that agree across both files: 15 % to 45.000 $, 30/37/45 % above; 45 % without TFN; 30 % for an unregistered employer; 47 % without ABN; super 12 % since 1 July 2025; Payday Super from 1 July 2026; DASP 65 %; 28 days per the ATO; transfer to the ATO after six months; ATO-held super paid only to an Australian account or by cheque; eleven agreement countries.
- Small difference, not raised as a finding: how long to keep the Australian bank account open is "four to six weeks after lodging" at 2001 and 2044 and "three to four months after departure" at 4623 and 4688. The two start from different dates.
- The header comment at line 1459 ("title/description-only translations") is out of date, since the posts below it carry full bodies. Code comment only.
- es page line 359-360: the heading says the claim form has one box for one fund and "two of those accounts were opened without you choosing", while row 1 of the table (line 90) says the online application finds all accounts by TFN. Marketing wording, noted only.
