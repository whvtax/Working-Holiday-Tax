# READ-10 report

Status: COMPLETE. 5,598 of 5,598 assigned lines read (6 of 6 files).

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/lib/svt/content/long/en/batch-01.ts | 1-977 | 1-977 | REVIEWED |
| src/lib/svt/content/long/en/batch-02.ts | 1-953 | 1-953 | REVIEWED |
| src/lib/svt/content/long/vi/batch-05.ts | 1-806 | 1-806 | REVIEWED |
| src/lib/svt/content/long/vi/batch-06.ts | 1-939 | 1-939 | REVIEWED |
| src/lib/svt/content/long/vi/batch-09.ts | 1-950 | 1-950 | REVIEWED |
| src/lib/svt/content/long/zh/batch-09.ts | 1-973 | 1-973 | REVIEWED |

## Findings

### READ-10-F01: Minimum wage figure and percentage increase do not reconcile (could not check)
- Severity: LOW
- Confidence: low (no network; cannot verify the 2026-27 decision)
- Files and lines: src/lib/svt/content/long/en/batch-02.ts:859-860, 867-869, 933; src/lib/svt/content/long/vi/batch-05.ts:20; src/lib/svt/content/long/vi/batch-06.ts:886, 916; src/lib/svt/content/long/vi/batch-09.ts:430, 434, 503, 593; src/lib/svt/content/long/zh/batch-09.ts:434, 438, 507, 597
- Evidence: text gives the national minimum wage as $26.44/hour and $1,004.90/week from 1 July 2026 and says award wages rose 4.75%. Internal arithmetic is consistent ($1,004.90 / 38 = $26.44; x 1.25 = $33.05; 15 x $33.05 = $495.75). But if the 2025-26 figure was $24.95/hour ($948.00/week, from memory, unverified), a 4.75% rise gives about $26.14, not $26.44; $26.44 would be about a 6% rise. One of the two numbers may be wrong, or the national minimum wage and award increases differed.
- Recommended fix: verify both numbers against the Fair Work media release cited at en/batch-02.ts:947 and correct whichever is wrong in every language file.

### READ-10-F02: "31 October 2026 has now passed" in articles dated 27 October 2026
- Severity: LOW
- Confidence: high (internal contradiction with the file's own dates)
- Files and lines: src/lib/svt/content/long/en/batch-01.ts:447, 876, 946 (published/updated 2026-10-27 at lines 432, 836, 901); the same articles still say "Before 31 October: lodge yourself" at 493 and "Remember that 31 October is the usual deadline" at 642, 960
- Evidence: body says the 31 October 2026 date "has now passed" while the article's published and updated dates are four days before it.
- Recommended fix: either set `updated` to the date the sentence was added (after 31 October 2026) or reword to a date-neutral sentence.

### READ-10-F03: Two different ATO URLs for the same "Access your income statement" page
- Severity: LOW
- Confidence: medium (cannot test links; no network)
- Files and lines: src/lib/svt/content/long/en/batch-02.ts:255 versus src/lib/svt/content/long/en/batch-01.ts:505, 651, 737
- Evidence: batch-02 uses `.../working-as-an-employee/access-your-income-statement`; batch-01 uses `.../working-as-an-employee/income-statements/access-your-income-statement` three times. One path is probably a dead link.
- Recommended fix: check the live ATO path and make all sources use it.

### READ-10-F04: Forward-looking tax facts that could not be checked (2026-27 changes)
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines: src/lib/svt/content/long/en/batch-01.ts:796, 810, 824 ($300 no-receipt rule "no longer applies from 1 July 2026"; $1,000 standard work deduction from 2026-27 attributed to "the ATO says"); en/batch-01.ts:532 (16% rate falls to 15% for 2026-27); vi/batch-05.ts:102-115 (new super guarantee charge parts: 60% administrative uplift, 25% choice loading capped at $1,200, 28-day Notice to Pay); vi/batch-06.ts:647 (ATO stops accepting credit cards after 30 June 2027); vi/batch-06.ts:552, 566 (4-year amendment period for sole traders from 2024-25); vi/batch-09.ts:738-739, 757-765, 810-811, 829 and zh/batch-09.ts:742-743, 761-769, 814-815, 869 (penalty unit $364 from 1 July 2026, maximum $1,820; the multiples 728/1,092/1,456/1,820 are arithmetically right)
- Evidence: specific figures and "the ATO says" attributions for rules that start on or after 1 July 2026. Not contradicted inside the files, but I could not verify them.
- Recommended fix: confirm each against the current ATO page before relying on the "ATO says" wording.

### READ-10-F05: Super base named differently for the same period (ordinary time earnings vs qualifying earnings)
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/lib/svt/content/long/en/batch-02.ts:345, 352, 416 ("qualifying earnings", described as the new ATO name from 1 July 2026); src/lib/svt/content/long/en/batch-01.ts:56 ("12% of ordinary earnings"); src/lib/svt/content/long/vi/batch-05.ts:49, 84, 551 and vi/batch-06.ts:910 ("ordinary time earnings"); vi/batch-09.ts:454, 540, 621, 717 ("thu nhập thông thường") in text that also describes the post 1 July 2026 Payday Super rules
- Evidence: cross-file terminology difference, not a contradiction inside one file.
- Recommended fix: use one term for post 1 July 2026 periods across languages.

### READ-10-F06: Chinese batch still states the "course of 6 months or more" residency rule that the Vietnamese version removed
- Severity: LOW
- Confidence: high that the two language versions differ; the tax statement itself is hedged ("可能") and I could not check it
- Files and lines: src/lib/svt/content/long/zh/batch-09.ts:40, 46, 114, 133, 217, 308, 384, 723 (and resident income tax worked out at 48, 135); compare the same slugs in src/lib/svt/content/long/vi/batch-09.ts:40, 46, 111, 130, 213, 304, 380, 719, which say only that residency depends on individual facts and the ATO decides
- Evidence: zh repeats "students enrolled in a course of 6 months or more may be treated as Australian tax residents" and "so she may be a resident"; line 723 adds "the first $18,200 is tax free" in the same sentence. The same file says at 845-847 that residency "is not automatic" and must not be judged by feel, and at 464 and 627 uses the neutral wording. So the file is uneven inside itself and out of step with vi (and with the English batches read here, e.g. en/batch-01.ts:467, 520).
- Recommended fix: bring the eight zh passages into line with the neutral wording used at zh/batch-09.ts:464, 627, 845 and in the vi file; drop the $3,488 resident calculation at 48 and 135 or mark it as an assumption as vi does.

### READ-10-F07: Wrong day count in the Chinese late-lodgment example
- Severity: LOW
- Confidence: high
- Files and lines: src/lib/svt/content/long/zh/batch-09.ts:781, 783; compare src/lib/svt/content/long/vi/batch-09.ts:777, 779
- Evidence: 31 October 2026 to 15 January 2027 is 76 days (about 11 weeks). zh says "about 10 weeks" and "about 74 days"; vi says 11 weeks and 76 days. The result (3 penalty units, $1,092) is the same either way.
- Recommended fix: change zh to 11 weeks and 76 days.

### READ-10-F08: Chinese intro overstates the ATO's no-penalty practice
- Severity: LOW
- Confidence: medium
- Files and lines: src/lib/svt/content/long/zh/batch-09.ts:744; compare 743, 773 in the same file and src/lib/svt/content/long/vi/batch-09.ts:740
- Evidence: the intro promises to explain why "most students who lodge soon after the deadline will not be penalised at all". The rest of the article, and the vi version, only say the ATO "generally" does not penalise an isolated late lodgment.
- Recommended fix: reword line 744 to the "generally does not apply a penalty in isolated cases" wording.

## Notes
- Mechanical greps over all six files (run once, whole files): no em or en dashes; no HTML tags, script, iframe, event handlers, javascript: or data: URLs; no http:// links; no email addresses; no TODO/lorem/XXX. Only `<` hits are TypeScript generics on line 3 of the vi/zh files.
- External domains in the two English files (the vi/zh files carry no URLs): ato.gov.au, abr.gov.au, business.gov.au, fairwork.gov.au, horticulture.fairwork.gov.au. All government.
- Phone numbers: 13 13 94 (Fair Work), 13 14 50 (interpreter service), 1800 008 540 (ATO scam line, vi/batch-05.ts:694), 000 and 112 (emergency, vi/batch-09.ts:248-250, zh/batch-09.ts:252-254). All public lines. No TFN, key or bank-account shaped strings.
- Rule 1 (registered agent claims): none. Wording is supervision only, e.g. en/batch-02.ts:83, en/batch-01.ts:587, 620, 644, vi/batch-09.ts:842, zh/batch-09.ts:865, 940.
- Rule 2 (refund promises): no guarantee and no service refund promise found. Refund mentions are hedged ("if any", "nếu có"). Agency processing times are attributed to the ATO, not promised by the business: en/batch-01.ts:632 (12 business days / 30 days / 50 business days), en/batch-02.ts:431, 460 (DASP 28 days), vi/batch-05.ts:777 (TRS 60 days). Worked DASP examples give dollar payouts (en/batch-02.ts:514, 544, 572, 647); these are super withholding arithmetic, not tax refund figures.
- Rule 3 (prices): no service prices appear anywhere in the six files.
- Arithmetic checked and correct: en/batch-01.ts:532, 541-542, 762; en/batch-02.ts:367, 543-556, 879, 914, 929; vi/batch-05.ts:765; vi/batch-06.ts:111, 133-134, 205, 215, 223, 426-434, 723-727, 916-919; vi/batch-09.ts:48, 132, 382, 435-436, 504-507, 761-765, 780, 910-911; zh/batch-09.ts:48-49, 135-136, 386, 439-440, 508-511, 765-769, 784, 933-934.
- Language: vi files are Vietnamese and the zh file is Simplified Chinese, each with English terms glossed in brackets; no wrong-language passages.
- Commercial names without links: six OSHC insurers are listed by name, attributed to the government private health insurance site (vi/batch-09.ts:168, zh/batch-09.ts:172). No URLs, so not a rule 6 hit; noted only.
- Quote style differs between vi files (curly quotes in batch-05 and batch-09, straight quotes in batch-06, e.g. vi/batch-06.ts:313, 581). Cosmetic.
- The vi and zh files carry no published/updated dates, so the "31 October 2026 has now passed" wording there (vi/batch-09.ts:744, 818-819; zh/batch-09.ts:748, 822-827) could not be checked against a date; see F02 for the English file.
- Nothing was run except wc and grep. No file other than this report was written.
