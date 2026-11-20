# READ-05 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(ja)/ja/blog/data.ts | 5001-9475 | 5001-5700, 5701-6400, 6401-7100, 7101-7800, 7801-8400, 8401-8960, 8961-9475 | REVIEWED (every assigned line read) |
| src/lib/svt/content/long/en/batch-08.ts | 1-1102 | 1-560, 561-1102 (file ends at 1102) | REVIEWED (every line read) |

Lines read: 5,577 of 5,577 assigned.

Mechanical scans (grep, UTF-8 locale) over both ranges, in addition to the reading: no em or en dashes, no HTML tags, no script/iframe/event handlers, no javascript: or data: URLs, no http:// links, no email addresses, no TODO/lorem/XXX, nothing shaped like a key, TFN or bank account. data.ts 5001-9475 contains no absolute URLs at all (internal /ja/... links only). batch-08.ts builds every external link from two constants, both https government hosts (ato.gov.au, fairwork.gov.au).

## Findings

### READ-05-F01: Piece-rate minimum guarantee described two contradictory ways
- Severity: MEDIUM
- Confidence: medium (the contradiction is certain; which side is right could not be checked, no network)
- Files and lines: src/app/(ja)/ja/blog/data.ts:6576 versus :7195 and :7397
- Evidence: line 6576 says the guarantee is calculated per pay period, not per day, so a fast Friday can offset a slow Tuesday. Line 7397 says that since the 28 April 2022 award change the minimum hourly rate is guaranteed for each day, and line 7195 also frames the top-up per day of picking. The worked example at 6582 is computed over a period.
- Recommended fix: make all three places agree. From memory the Horticulture Award guarantee is per day, which would make 6576 (and the framing of the example at 6582) the wrong one; verify against the current award before editing.

### READ-05-F02: Deductions from wages for till shortages and breakages stated as never lawful in Japanese, with an award exception in English
- Severity: LOW
- Confidence: medium (could not check the award, no network)
- Files and lines: src/app/(ja)/ja/blog/data.ts:7037, :7055, :7059-7068 versus src/lib/svt/content/long/en/batch-08.ts:1039
- Evidence: the Japanese article says uniform, laundry, breakage and till-shortage deductions never pass the test and a contract clause cannot make them lawful. The English SVT article says the Hospitality Award allows breakage or till-shortage deductions without agreement in narrow cases (wilful misconduct, employee 18 or over, reasonable amount). Other Japanese lines soften this to "generally unlawful" (7582, 7665, 7744).
- Recommended fix: change the absolute wording at 7037 to "generally" and mention the narrow award exception, or confirm the exception no longer exists and remove it from the English file.

### READ-05-F03: RSA course cost called deductible outright, then restricted later in the same article
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(ja)/ja/blog/data.ts:6229 versus :6269 (also :7752, :7566)
- Evidence: the intro of the RSA article ends with a flat "the cost is deductible". Line 6269 of the same article says a first course taken to get a job is not deductible; 7752 repeats that. The construction article has the same pattern: 7874 lists the White Card course fee as a work-related expense, while 7839 and 6205 say the first card is not deductible.
- Recommended fix: use the conditional form from 6269 in the intro at 6229, and qualify the White Card item at 7874.

### READ-05-F04: Private health insurance article description contradicts its body
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(ja)/ja/blog/data.ts:9223 versus :9225-9231
- Evidence: the meta description says private health insurance is not mandatory on a working holiday visa. The body says condition 8501 may be attached to the grant and then maintaining adequate cover is a visa condition.
- Recommended fix: reword the description to match the body ("may be a visa condition; check the grant letter").

### READ-05-F05: Phone number of a private medical service in article text
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(ja)/ja/blog/data.ts:9301
- Evidence: the line gives two numbers. One is the healthdirect government helpline (public agency line, allowed). The other is the 13-prefix number of a private after-hours home doctor company, given in both its word and digit forms. Type: phone number of a non-government business. All other numbers in both files are 000, the Fair Work Ombudsman line and the government interpreter line.
- Recommended fix: remove the private service's number and name, or replace with "an after-hours home doctor service".

### READ-05-F06: First-person statements that the business prepares returns and pulls ATO records, without supervision wording nearby
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(ja)/ja/blog/data.ts:7093, :7242, :7531, :8551; src/lib/svt/content/long/en/batch-08.ts:82, 113, 253, 340, 359, 585
- Evidence: "when we prepare the tax return we compare...", "we first pull the full list from the ATO system", "ask us to prepare your DASP claims". Neither file says the business is a registered tax agent, accountant or 税理士. Supervision wording is present and correct at data.ts 8278, 8383 and 8809 ("a registered tax agent reviews and signs before lodgement"). Lines 5148, 5273 and batch-08 438 tell readers that anyone charging for tax services must be TPB-registered.
- Recommended fix: none required by rule 1. Consider repeating the approved supervision sentence in articles that say "we prepare" or "we pull from the ATO system", so the claim is not left implied.

### READ-05-F07: Dated or uncheckable facts (could not verify, no network)
- Severity: LOW
- Confidence: low
- Files and lines and evidence:
  - data.ts:5392, :5402 and batch-08.ts:940: 2026-27 national minimum wage 26.44 per hour, casual 33.05, "national minimum up 6%, award minimums up 4.75%". Internally consistent everywhere it appears (26.44 x 1.25 = 33.05; 6 hours = 158.64), but after my knowledge.
  - data.ts:6259-6261: RSA validity by state. The Queensland and Tasmania entries do not match my recollection.
  - data.ts:6982 ("usually under one hour") and :7648 ("minutes, not hours") versus batch-08.ts:920, :996 ("an hour up to one shift", attributed to the Fair Work Ombudsman): three different lengths for a lawful unpaid trial.
  - data.ts:7531, :7591, :7876, :8200 and batch-08.ts:1079: 1,000 dollar standard deduction from 2026-27 presented as in force; batch-08.ts:1075 says all laundry claims need written evidence from 2026-27.
  - data.ts:8358: Medicare levy low-income threshold 28,011 for 2025-26.
  - data.ts:8899-8901: superannuation guarantee charge make-up from 1 July 2026 (uplift up to 60%, now deductible).
  - data.ts:9055: Tourist Refund Scheme card refunds "usually about 5 business days". This is a government payment timing, not the business's own refund, but it reads shorter than I recall.
  - data.ts:8757: "the 2025-26 deadline has passed" is hard-coded and will go stale each year.
  - data.ts:8240 says reciprocal-agreement nationals are covered while the visa is valid; :8314 and :8366 say the Italy and Malta agreements are limited to six months.
- Recommended fix: check each against the Fair Work, ATO, Services Australia, Border Force and state regulator pages before the next publish; align the trial-length wording across both sites.

## Notes
- Rule 1: no statement in either range that the business is a registered tax agent, accountant or 税理士.
- Rule 2: no refund guarantee, refund promise or refund timing promise by the business. Dollar results shown are worked examples of tax, super and DASP withholding. Processing times quoted are attributed to the ATO (28-day DASP standard, 50 business days for early paper returns). Calculator links are worded as estimates.
- Rule 3: no service price appears in either range, so nothing outside the allowed list.
- Rule 7: data.ts text is Japanese with English proper nouns for awards, forms and agencies; batch-08.ts is English. One description (data.ts:9293) promises "cases Japanese travellers often face" that the body does not contain; the body at 9299 compares 000 with the UK and German emergency numbers, which reads as translated for a different audience.
- Rule 8: neither file is a .tsx page. The helper functions at data.ts:9440-9475 take a slug argument and do plain lookups; no params/searchParams and no dangerouslySetInnerHTML.
- No files other than the two listed and the two briefs were opened. Only commands used: wc, grep, sed/awk for printing and counting.
