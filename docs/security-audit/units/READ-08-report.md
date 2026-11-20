# READ-08 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(fr)/fr/blog/chunks/07.ts | 1-492 | 1-492 | REVIEWED |
| src/lib/svt/content/long/en/batch-06.ts | 1-1034 | 1-520, 520-1034 | REVIEWED |
| src/lib/svt/content/long/en/batch-10.ts | 1-1023 | 1-520, 520-1023 | REVIEWED |
| src/lib/svt/content/long/zh/batch-00.ts | 1-1001 | 1-500, 500-1001 | REVIEWED |
| src/lib/svt/content/long/zh/batch-03.ts | 1-1002 | 1-500, 500-1002 | REVIEWED |
| src/lib/svt/content/long/zh/batch-12-deductions.ts | 1-1046 | 1-520, 520-1046 | REVIEWED |

Total: 5,598 of 5,598 assigned lines read.

Mechanical scans (grep) over all six files, in addition to reading: no em or en dashes, no TODO/lorem/XXX/FIXME, no HTML tags, script, iframe, event handlers, javascript: or data: URLs, no http:// links, no email addresses, nothing shaped like a key, TFN or bank account. All absolute URLs are on ato.gov.au, abr.gov.au, fairwork.gov.au, horticulture.fairwork.gov.au and austrac.gov.au.

Other files opened to judge a finding: src/app/(fr)/fr/_blog-links.ts (lines 1-30), and grep hits in src/lib/svt/content/long/en/batch-00.ts, batch-03.ts and batch-09.ts.

## Findings

### READ-08-F01: National minimum wage rise and award rise do not obviously agree (could not check)
- Severity: LOW
- Confidence: low
- Files and lines: src/lib/svt/content/long/en/batch-10.ts:364, 439, 517, 605, 693, 789, 872; src/lib/svt/content/long/en/batch-06.ts:974, 1006; src/lib/svt/content/long/zh/batch-03.ts:99, 181, 250
- Evidence: the text gives a national minimum wage of $26.44 an hour ($1,004.90 a week at zh/batch-03.ts:181) from 1 July 2026 and says award minimum wages rose by 4.75% from the same date. The hourly and weekly figures agree with each other (1,004.90 / 38 = 26.44). If the previous figures were $24.95 and $948.00 (my recollection, not checked), the national minimum wage rose by about 6%, not 4.75%. Both can be true only if the national minimum wage was raised by more than award wages. No network, so not verified.
- Recommended fix: check both numbers against the Fair Work 1 July 2026 release cited at en/batch-10.ts:497. If the two rises differ, say so in one place so the pair does not read as an error. The worked example at en/batch-06.ts:1006-1009 depends on the same figure.

### READ-08-F02: Two worked examples in one article use different tax bases without saying so
- Severity: LOW
- Confidence: high
- Files and lines: src/lib/svt/content/long/en/batch-06.ts:222-224, 230-232, 240
- Evidence: Example 1 uses $1,888 tax on $30,000 (resident rates; matches line 470 of the same file). Example 2 uses $6,000 tax on $20,000 and "30% of $500", which is the foreign resident rate. Each is labelled an illustration and the arithmetic inside each is right, but a reader sees $20,000 taxed more than three times as heavily as $30,000 with no explanation.
- Recommended fix: state in Example 2 which residency the illustration assumes, or use one basis for both.

### READ-08-F03: Written-evidence rule from 2026-27 is stated in ways that conflict (could not check)
- Severity: LOW
- Confidence: medium
- Files and lines: src/lib/svt/content/long/en/batch-10.ts:60, 140, 845; src/lib/svt/content/long/zh/batch-12-deductions.ts:161
- Evidence: en/batch-10.ts:60 says that from 2026-27 claims above the standard deduction amount need written evidence, and line 140 says expenses under $1,000 need no records. zh/batch-12-deductions.ts:161 says the standard deduction replaces both the $300 and the $150 (laundry) limits. The FAQ at en/batch-10.ts:845 says that from 2026-27 the ATO asks for written evidence for all laundry claims.
- Recommended fix: check the ATO standard deduction and laundry pages and make the four statements agree.

### READ-08-F04: No-TFN withholding given as a flat 47% in the body, 45% for foreign residents in one FAQ
- Severity: LOW
- Confidence: high
- Files and lines: src/lib/svt/content/long/zh/batch-00.ts:33, 151, 295, 303-304, 341, 348, 354-358, 372-375, 541, 556, 634, 644, 800 against 414
- Evidence: the articles, their worked examples and one title (line 339) say an employer without a TFN must withhold 47%. The FAQ at line 414 says the rate for foreign residents is generally 45% with no Medicare levy, and 47% is for residents. The same articles tell students their residency is undecided, so the 47% examples may not apply to many readers. The FAQ wording could not be checked against the ATO.
- Recommended fix: add the foreign-resident qualifier once in each article body, or word the examples as "up to 47%".

### READ-08-F05: Chinese deduction examples infer likely residency from course length
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/zh/batch-12-deductions.ts:65, 303, 386, 478, 650, 737, 827, 908 (and 141 without the "so")
- Evidence: examples say a student is on a two-year master's, an 18-month diploma or a three-year degree, "so she may be an Australian tax resident", then quote a tax saving at 16%. The wording is hedged, but every other article in this unit says residency cannot be assumed and is decided on individual facts (for example zh/batch-00.ts:43, 50; zh/batch-03.ts:948-952; en/batch-06.ts:443, 480). A reader can take course length as a rule of thumb.
- Recommended fix: replace "so she may be a resident" with "assume for this example that she is treated as a resident".

### READ-08-F06: Statement that a deadline "has already passed" will go stale
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/zh/batch-03.ts:890
- Evidence: the text says the 31 October self-lodgment deadline for 2025-26 has already passed and a late return can still be lodged. The English articles in this unit are dated 2026-10-27, before that date. The sentence is tied to a moment and will be wrong for the next tax year.
- Recommended fix: reword without a time reference ("if the 31 October deadline has passed, a return can still be lodged").

### READ-08-F07: French article says refunds go only to an Australian account, another says "in almost all cases"
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(fr)/fr/blog/chunks/07.ts:379, 387 against 453
- Evidence: line 379 says the ATO pays refunds to an Australian bank account and nowhere else; line 453 (a different article in the same file) says refunds go to an Australian account in almost all cases.
- Recommended fix: use one wording in both places.

### READ-08-F08: Chinese text says the business will arrange the Medicare Entitlement Statement; English says "tell us early"
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/lib/svt/content/long/zh/batch-03.ts:725, 747, 825, 912 against src/lib/svt/content/long/en/batch-10.ts:574, 659, 752, 839, 1002
- Evidence: the Chinese articles say "tell us and we will arrange the MES for you". The English articles only say to tell the team early. The statement is issued by Services Australia to the individual. Whether the service really includes this was not checkable from these files.
- Recommended fix: confirm the service scope and align the two languages.

### READ-08-F09: Tax and insurance facts that could not be checked
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines: en/batch-06.ts:711 (credit cards not accepted by the ATO after 30 June 2027); en/batch-06.ts:246, 608, 622 (4-year amendment period for sole traders from 2024-25); en/batch-10.ts:60, 70-72, 101-170, 240, 558, 822, 916 and zh/batch-12-deductions.ts:80, 161, 243, 322, 410, 499, 587, 671, 848, 939 ($1,000 standard deduction from 2026-27 and its rules, attributed to the ATO); en/batch-10.ts:574, 1002 and zh/batch-03.ts:719, 883 (Medicare Entitlement Statement applications open 1 July); zh/batch-03.ts:694 (OSHC medicine limits of $50 per item, $500 single, $1,000 family: I recall lower annual limits, not checked; the same figures appear in en/batch-03.ts:765 and en/batch-09.ts:113, 208, 290, 386, outside this unit); fr 07.ts:337, 397 (15 June agent cut-off for early returns); fr 07.ts:296, 349, 398 (50 business days for early paper returns)
- Evidence: these are consistent within the files but no network was available to confirm them.
- Recommended fix: one pass against the cited government pages before the next publish.

## Notes
- Rule 1 (agent claims): no statement that the business is a registered tax agent, accountant or 税理士. Supervision wording only: fr 07.ts:333, 409, 429; en/batch-06.ts:615. Other mentions are of registered agents in general (fr 07.ts:280, 362; en/batch-06.ts:551, 708; zh/batch-00.ts:659, 689, 775, 815).
- Rule 2 (refunds): no guarantee and no refund promise in any of the six files. "Guarantee" appears only as super guarantee or the piecework minimum guarantee. Timing figures are attributed to the ATO or Services Australia, not promised by the business (fr 07.ts:286, 296, 349; en/batch-10.ts:318; en/batch-06.ts:631; zh/batch-00.ts:85, 136; zh/batch-03.ts:720). Dollar figures in zh/batch-12-deductions.ts:150, 311, 394, 486, 660, 746, 836 are conditional tax savings from a deduction, not refund figures.
- Rule 3 (prices): no service prices appear in any of the six files.
- Rule 6: phone numbers are public agency lines only: ATO (fr 07.ts:444), ATO Client Identity Support Centre (zh/batch-00.ts:782), Fair Work and the interpreter service (en/batch-06.ts:833, 921, 1020; zh/batch-03.ts:71, 158, 219-220, 306-307, 409, 632). One commercial brand is named as an example of a ride app (zh/batch-03.ts:432); no link.
- Rule 7: each file is in its own language. The French file keeps English tax terms on purpose and quotes one ATO sentence in English with a French gloss (line 345). Its internal links mix /fr/tax-return-australie-pvt with unprefixed paths (/tax-return, /calculator, /superannuation, /abn, /contact, /blog/...). The repo has a helper, src/app/(fr)/fr/_blog-links.ts, that points French link rows at /fr/blog only when a French guide exists; I did not check whether inline links inside chunk bodies get the same treatment, so some may land on English pages.
- Rule 8: not applicable, no .tsx files in this unit.
- Slug and title of zh/batch-00.ts:826-827 look mismatched ("what-is-an-abn" with a title about how ABN income is taxed) but match the English original at en/batch-00.ts:935-938.
- zh/batch-12-deductions.ts:386-392: the example cleans private homes (described at 353 as ABN work) but applies the employee $300 rule to a $260 vacuum; the same file says at 202 that the $300 rule does not apply to ABN assets. The result is the same under either rule.
- Arithmetic in all worked examples was recomputed and is right: en/batch-06.ts 145-146, 224, 232, 240, 468-474, 795-799, 1006-1009; en/batch-10.ts 66, 143-145, 228, 288, 477, 556, 640, 820, 914, 1000; zh/batch-00.ts 303-304, 356-358, 374-375, 644; zh/batch-03.ts 40-44, 279-281, 380-381, 466, 640-641, 868-870; zh/batch-12-deductions.ts 72, 148-150, 223-226, 309-311, 388-394, 480-486, 567-569, 658-660, 739-746, 831-836, 914, 920, 1014.
