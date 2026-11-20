# READ-12 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(it)/it/page.tsx | 1-350 | 1-350 | REVIEWED |
| src/lib/svt/content/long/en/batch-05.ts | 1-889 | 1-450, 451-889 | REVIEWED |
| src/lib/svt/content/long/en/batch-11.ts | 1-860 | 1-430, 431-860 | REVIEWED |
| src/lib/svt/content/long/vi/batch-01.ts | 1-892 | 1-400, 401-892 | REVIEWED |
| src/lib/svt/content/long/vi/batch-02.ts | 1-865 | 1-435, 436-865 | REVIEWED |
| src/lib/svt/content/long/vi/batch-07.ts | 1-885 | 1-445, 446-885 | REVIEWED |
| src/lib/svt/content/long/zh/batch-02.ts | 1-856 | 1-429, 430-856 | REVIEWED |

Total: 5,597 lines read of 5,597 assigned.

## Findings

### READ-12-F01: Minimum wage figures do not agree with the stated 4.75% rise (could not check)
- Severity: MEDIUM
- Confidence: low (no network; the comparison uses the 2025-26 rate from memory)
- Files and lines: src/lib/svt/content/long/vi/batch-02.ts:777-778, 785-787, 797, 832, 847, 851, 860; src/lib/svt/content/long/zh/batch-02.ts:767-769, 776-778, 788, 823, 838, 842, 851; src/lib/svt/content/long/en/batch-05.ts:25; src/lib/svt/content/long/en/batch-11.ts:125, 298; src/lib/svt/content/long/vi/batch-07.ts:34, 36
- Evidence: the articles give a national minimum wage of $26.44 an hour and $1,004.90 a week from 1 July 2026, and in the same list say award minimum wages rose 4.75%. If the 2025-26 rate was $24.95 an hour and $948 a week (from memory, not checked), a 4.75% rise gives about $26.14 and $993, and $26.44 is a rise of about 6%. Either the national rate rose by a different percentage than awards, or one of the figures is wrong. The derived figures ($33.05 casual rate, $495.75, $396.60, $19,830, about $2,380 super, and the $6.44, $96.60 and $966 underpayment example) are arithmetically consistent with $26.44, so an error in the base figure would carry through all of them.
- Recommended fix: check $26.44, $1,004.90 and 4.75% against the Fair Work Commission 2026 annual wage review. If the base changes, recompute every derived figure in the lines listed.

### READ-12-F02: Article text says the 31 October 2026 deadline "has now passed" but the article is dated 27 October 2026
- Severity: LOW
- Confidence: high
- Files and lines: src/lib/svt/content/long/en/batch-11.ts:551, 596, 734, 755, 787 (text) against `published`/`updated` at lines 528, 684, 775
- Evidence: three articles carry `published: '2026-10-27', updated: '2026-10-27'` while the body says the 2025-26 self-lodger deadline of 31 October 2026 "has now passed". The date and the text in the same file contradict each other.
- Recommended fix: set `updated` to the date the wording changed, or word the deadline without "has now passed".

### READ-12-F03: Italian home page dates the 15% working holiday rate from 1 July 2025
- Severity: LOW
- Confidence: medium (could not check)
- Files and lines: src/app/(it)/it/page.tsx:96, compare line 168
- Evidence: the figure card says the 15% rate on the first 45,000 $ applies "dal 1° luglio 2025". The FAQ at line 168 calls the same rates "le aliquote del 2025-26". The 15% rate on the first $45,000 looks older than 1 July 2025, so the start date reads as wrong.
- Recommended fix: drop the start date, or write "per il 2025-26, invariata per il 2026-27".

### READ-12-F04: Timing figures for refunds and payments in article text
- Severity: LOW
- Confidence: medium (each is attributed to the ATO, not promised by the business; listed because the brief asks for any timing promise)
- Files and lines: src/lib/svt/content/long/en/batch-11.ts:578 and src/lib/svt/content/long/vi/batch-01.ts:585 (tax return processing: 12 business days, 30 calendar days, 50 business days); src/lib/svt/content/long/vi/batch-02.ts:383-384, 413, 447, 524, 581 and src/lib/svt/content/long/zh/batch-02.ts:379-380, 409, 443, 519, 575 (DASP paid within 28 days); src/lib/svt/content/long/en/batch-05.ts:857 (Tourist Refund Scheme within 60 days)
- Evidence: all are worded as what the ATO says and none is a promise about the service. Figures not checked.
- Recommended fix: owner to confirm attributed agency processing times are acceptable. Keep the "ATO says" attribution on every one.

### READ-12-F05: Conditional statements that over-withheld tax is paid back
- Severity: LOW
- Confidence: medium
- Files and lines: src/lib/svt/content/long/vi/batch-07.ts:214, 814
- Evidence: line 214 says the extra tax withheld "will be paid back through the tax return, if it is more than her real tax for the year". Line 814 says the amount withheld above the real tax "is refunded, if any". Both are conditional, but they are the closest wording to a refund promise in this unit. The English articles use the more careful "is counted in your tax return" (en/batch-05.ts:205, 209, 236).
- Recommended fix: align both lines with the "is counted in your return, the result depends on your year" wording.

### READ-12-F06: Postal address for the overseas TFN paper form could not be checked
- Severity: LOW
- Confidence: low
- Files and lines: src/lib/svt/content/long/vi/batch-07.ts:283, 839
- Evidence: readers are told to post certified identity copies to an ATO GPO Box in Canberra. I could not confirm this is the address printed on the current form. A wrong address would send identity documents to the wrong place.
- Recommended fix: check against the current ATO form for individuals living outside Australia, or replace the address with "the address on the form".

### READ-12-F07: Chinese description says 35% applies to the taxable component
- Severity: LOW
- Confidence: medium
- Files and lines: src/lib/svt/content/long/zh/batch-02.ts:454, compare lines 455 and 463-464
- Evidence: the description says the DASP rate on the taxable component (应税部分) is 35%. The answer and body of the same article say 35% applies to the taxed element and 45% to the untaxed element, both inside the taxable component. The Vietnamese version (vi/batch-02.ts:459) says taxed element.
- Recommended fix: change 应税部分 to 已税部分 in the description.

### READ-12-F08: Standard $1,000 work deduction attributed to the ATO (could not check)
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines: src/lib/svt/content/long/vi/batch-01.ts:747
- Evidence: says that from 2026-27 the ATO has announced a standard deduction of up to $1,000 for work-related expenses. I could not confirm this is law or that the ATO, not the government, announced it. No other file in this unit mentions it.
- Recommended fix: verify, and if it is not yet law say so or remove it.

### READ-12-F09: Wording differences between files on the same rule
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/lib/svt/content/long/en/batch-11.ts:241 against src/lib/svt/content/long/en/batch-05.ts:423-425; src/lib/svt/content/long/vi/batch-02.ts:313 and src/lib/svt/content/long/zh/batch-02.ts:309 against src/lib/svt/content/long/en/batch-05.ts:54, 97 and src/lib/svt/content/long/en/batch-11.ts:157, 247
- Evidence: (a) en/batch-05 says a first RSA certificate is not claimable and only renewals are, while en/batch-11 lists an RSA course as claimable "for a liquor role you already have". (b) The vi and zh batch-02 articles say super is 12% of "qualifying earnings", the new term from 1 July 2026, while the English articles still say "ordinary time earnings" for the same period. Neither is a contradiction inside one file.
- Recommended fix: align the RSA line with the batch-05 wording, and pick one earnings term for periods after 1 July 2026.

### READ-12-F10: One email address and one non-government helpline in article text
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/vi/batch-07.ts:385 (email, ato.gov.au scam-report mailbox); src/lib/svt/content/long/vi/batch-07.ts:378 (phone, IDCARE identity support line)
- Evidence: the only email in the unit is a government mailbox. IDCARE is a public support service but not a government agency line. Both look intended.
- Recommended fix: none needed if intended. Verify both are current.

## Notes
- No statement in this unit says the business itself is a registered tax agent, accountant or 税理士. Supervision wording only: it/page.tsx:124, 309; en/batch-11.ts:847; vi/batch-01.ts:540, 573, 597; vi/batch-02.ts:76; zh/batch-02.ts:76.
- Guarantee appears only in it/page.tsx:164 and 269, both with the TFN-only limit. No refund figure promised to a customer anywhere. Dollar examples in articles are worked illustrations.
- Service prices: only $220 and $385 (en/batch-11.ts:847). The $495.75 in vi/batch-02.ts:832 and zh/batch-02.ts:823 is a wage example, not a price. No price on the Italian page.
- it/page.tsx: no params or searchParams. The four dangerouslySetInnerHTML uses (lines 226-229) are JSON-LD through `jsonLdHtml`; I did not open that helper. "Risposta in circa un'ora" is a reply time, not a refund time. ImageSlot `subject` props are English (lines 239, 305); I did not check whether they are rendered to visitors.
- No em or en dashes, no raw HTML, script, iframe, event handlers, javascript: or data: URLs, no http:// links, no TODO/lorem/XXX in any file (read and confirmed by grep).
- All 49 links in the article files are .gov.au hosts: ato, fairwork, horticulture.fairwork, fwc, service.nsw, safework.sa, austrac, abr, studyaustralia, china.embassy.
- Phone numbers are public lines only: Fair Work, interpreter service, ATO scam line, ATO identity support, IDCARE. Nothing shaped like a key, TFN or bank account.
- Language is correct for each file. English terms in brackets after the local term are deliberate glosses.
- Arithmetic checked and correct: resident and foreign resident tax tables and the $50,000 examples (vi/batch-01.ts:475-503), the $19.20 deduction example (699), super examples (vi/zh batch-02 $960; vi/batch-07.ts:126), DASP examples ($6,500, $3,500, $1,300, $2,600), TRS GST example (en/batch-05.ts:843-845), 47% withholding example (vi/batch-07.ts:604).
- Tax facts I could not check (no network) beyond those in findings: Tax Help income limit of about $70,000; Payday Super 7 and 20 business days; SGC parts (60% uplift, 25% choice loading capped at $1,200); payment plan limit of $200,000; 48 hours a fortnight work limit; 16% to 15% resident rate change from 1 July 2026. These are consistent across the files read.
- vi/batch-07.ts:762 names Ola as a current rideshare app; this may be dated.
