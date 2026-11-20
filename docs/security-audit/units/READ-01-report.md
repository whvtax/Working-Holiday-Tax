# READ-01 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/lib/formStrings.ts | 1-589 | 1-589 (one pass) | REVIEWED |
| src/app/(ja)/ja/blog/data.ts | 1-5000 | 1-600, 601-1200, 1201-1800, 1801-2400, 2401-3000, 3001-3600, 3601-4200, 4201-4700, 4701-5000 | REVIEWED (every assigned line read; lines 5001-9475 are outside this unit and were NOT read) |

Lines read: 5,589 of 5,589 assigned. Read-only `grep` passes over the same ranges were used as a second check for dashes, HTML, URLs, emails, digit runs, prices and guarantee wording.

## Findings

### READ-01-F01: The file contradicts itself on whether a TFN can be obtained after leaving Australia
- Severity: MEDIUM / Confidence: high (contradiction), low (which side is right; not checked, no network)
- Files and lines: src/app/(ja)/ja/blog/data.ts:3628 and 3640, against 294, 477, 517, 800-806
- Evidence: 3628 says a TFN "can be obtained after leaving" and 3640 says the business will run the TFN process. 294, 477, 800 and 806 say the application requires the person to be in Australia now.
- Recommended fix: Decide which statement is correct (an overseas paper route may exist; I could not check) and make both places say the same thing. At 3628 name the route and its limits.

### READ-01-F02: Refund timing statements, one of them unattributed and inconsistent with the rest
- Severity: MEDIUM / Confidence: medium
- Files and lines: data.ts:423 (unattributed "most online returns are processed in about two weeks"); 2593, 2845, 3172, 3191-3192, 3194, 3198, 3237 ("about 12 business days", attributed to the ATO); 3289 ("a two-week wait")
- Evidence: Rule 2 flags any refund timing promise. Most instances are attributed to the ATO, and 3231 states that 12 business days is a guide and not a guarantee. Line 423 gives a different figure with no attribution and no caveat. The article title at 3191 puts the figure in the headline.
- Recommended fix: Align 423 and 3289 with the attributed "about 12 business days" wording and add the "guide, not a guarantee" caveat wherever the figure appears. Owner to decide whether attributed ATO processing times are acceptable under the no-timing rule.

### READ-01-F03: Illustrative refund amounts, one worded as a recovery
- Severity: LOW / Confidence: medium
- Files and lines: data.ts:2505 (worked example ending "that is the amount the return recovers"); 356-357 (differences of 1,200 and 1,500 dollars); 213 and 298 (about 800 dollars for the Medicare levy); 3628 and 3634 ("the return with the largest difference"); 3711 ("a sizeable refund can arise")
- Evidence: These are worked examples of over-withholding, mostly hedged with "depends on the year". Line 2505 is unhedged and reads as a stated refund figure.
- Recommended fix: Add the standard hedge to 2505 ("the outcome depends on the year; the ATO decides") or reword it as the over-withheld amount, not as money recovered.

### READ-01-F04: Dated tax facts that could not be checked (no network)
- Severity: LOW / Confidence: low (cannot verify either way)
- Files and lines and facts:
  - data.ts:155: national minimum wage 26.44 dollars "as at 1 July 2026"
  - 1916, 1928, 4195, 4199, 4235, 4273, 4307: cents per kilometre 91 cents for 2026-27 (88 cents for 2025-26), cap 4,550 dollars
  - 444, 2298, 2332, 2707, 4104, 4144, 4165, 4174-4212, 4305: 1,000 dollar standard deduction from 2026-27, residents with employment income only
  - 3524, 3814, 3816, 3828-3832, 3934, 3987, 4446: penalty unit 364 dollars from 1 July 2026 (330 before)
  - 4434: General Interest Charge 11.51% for October to December 2026
  - 2779, 3305: working holiday makers must lodge only at taxable income of 45,001 dollars or more
  - 3017: 15 June cut-off for early lodgment; 2801: 50 business days for paper early returns
  - 3889, 3905-3909, 3915: myTax accepts prior years from 2016, non-lodgment advice back to 2000
  - 2065: ASIC company registration about 600 dollars
- Evidence: All are internally consistent within lines 1-5000 (arithmetic checked: 5 x 364 = 1,820; 5,000 x 0.91 = 4,550; offset and levy examples add up). None could be checked against a source.
- Recommended fix: Verify each against the ATO, Fair Work and ASIC pages before the next release; the quarterly GIC rate at 4434 will go stale on 1 January 2027.

### READ-01-F05: Smaller internal inconsistencies
- Severity: LOW / Confidence: high
- Files and lines:
  - data.ts:2211 and 2354 say the GST threshold is measured over the "financial year"; 1855-1857 say any 12-month period, looking forward as well. 2211 and 2354 say "exceeds", 1851 and 1860 say "reaches".
  - 2764 says lodging is "needed in most cases" and 4013 "in most cases, yes"; 2779 and 3305 say it is required only from 45,001 dollars.
  - 4843 and 4935 say old quarterly super could be invisible for "up to 3 months"; 4968 says "up to 4 months".
  - 1151 translates High Court as 高等裁判所; 3570, 3595, 3597, 3599, 3767 use 最高裁.
  - 2470: title says "2025-26" while 2989 names 2026-27 as the current year.
  - 4303 and link labels at 2298, 2707, 4144, 4307 call the 2026-27 measure an "instant deduction"; the article itself (4174) calls it a standard (flat) deduction.
- Recommended fix: Pick one wording per fact and apply it across the file.

### READ-01-F06: Service claims that need a check against real practice
- Severity: LOW / Confidence: low (REQUIRES_RUNTIME_VALIDATION)
- Files and lines:
  - src/lib/formStrings.ts:398-400 (`selfieHint`, en/de/ja): the identity photo is "deleted immediately after verification".
  - data.ts:1476: for TFN applications the business uses "a verified address that can hold mail for the whole application period" and passes the number to the customer.
  - formStrings.ts:183 (`etaLabel`): "we usually message you within 24 hours" (contact timing, not refund timing).
- Evidence: These are promises about data deletion, mail handling and response time. I did not open the storage or retention code, so I cannot say whether they hold.
- Recommended fix: Confirm against the retention job and the TFN process; soften the wording if deletion is not immediate.

### READ-01-F07: Example phone numbers and emails that may belong to real people or domains
- Severity: INFORMATIONAL / Confidence: medium
- Files and lines: formStrings.ts:141 (`invalidAuPhone`, Australian mobile example), 142 (`invalidPhone`, de and ja examples), 524 (`phWaNumberEg`, de and ja); 496-497 (`phEmail` en, de), 523 (`phEmailEg`, all three)
- Evidence: Type only: sample mobile numbers in ordinary allocatable ranges, and sample emails on real third-party domains. The en example at 142/524 looks like a reserved fiction range; 498-500 use example domains correctly.
- Recommended fix: Use reserved ranges and example.com style domains throughout.

## Notes
- Rule 1 (business as registered agent / 税理士): no hit. 税理士 appears only at data.ts:233 and 2874, describing registered tax agents in general. Supervision wording ("our team prepares, a registered tax agent reviews and signs") is used at 229, 335, 448, 737, 1153, 2620, 2884, 3109, 3233, 3620, 3946, 4017. formStrings.ts:97 uses "supervising registered tax agent"; the key named `registeredTaxAgent` (98) holds "Working holiday specialists".
- Rule 2 (guarantee): the refund-less-than-fee guarantee appears 4 times (239, 389, 448, 2904), each followed by the "TFN-income returns only" limit. 2906 mentions "our guarantee" two sentences after the limited statement.
- Rule 3 (prices): no service price appears in either range.
- Rule 6: no raw HTML, script, iframe, event handler, javascript: or data: URL, http:// link or email in data.ts 1-5000. External links are 6, all https://www.ato.gov.au (3893, 3899, 3921, 3932, 3934, 3940). Phone numbers are ATO public lines only (612, 883, 929, 992, 1032, 1406). Nothing shaped like a key, TFN or bank account.
- Rule 7: no em or en dashes in either range. No TODO, lorem or unfinished text; the X characters at formStrings.ts:489-493 are an intended number mask. One English sentence at data.ts:3940 is a marked quotation from the ATO. Developer comments at data.ts:9 and 193-194 say the translation map is "currently empty", which is stale but not customer-facing.
- Rule 8: neither file is a .tsx page; no params, searchParams or dangerouslySetInnerHTML.
- Checked and consistent: working holiday rates (15/30/37/45), 45% no-TFN and 47% no-ABN withholding, 30% unregistered employer, 12% super and its 11/11.5/12 history, Payday Super from 1 July 2026, DASP 65% (35/45 for others), six-month transfer to the ATO, 11 reciprocal health care countries, two-year amendment period, 75,000 dollar GST threshold, small business offset 16% capped at 1,000 dollars, LITO 700 dollars.
- Not done: no fact was checked against an outside source; no other file was opened.
