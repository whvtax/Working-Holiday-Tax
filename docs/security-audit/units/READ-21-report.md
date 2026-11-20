# READ-21 report

## Coverage

| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/expenses/delivery-drivers/page.tsx | 1-341 | 1-341 | REVIEWED |
| src/app/(es)/es/expenses/page.tsx | 1-317 | 1-317 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/18.ts | 1-357 | 1-357 | REVIEWED |
| src/app/(fr)/fr/expenses/cleaners/page.tsx | 1-337 | 1-337 | REVIEWED |
| src/app/(fr)/fr/expenses/delivery-drivers/page.tsx | 1-341 | 1-341 | REVIEWED |
| src/app/(fr)/fr/medicare/page.tsx | 1-337 | 1-337 | REVIEWED |
| src/app/(fr)/fr/page.tsx | 1-322 | 1-322 | REVIEWED |
| src/app/(it)/it/expenses/page.tsx | 1-341 | 1-341 | REVIEWED |
| src/app/(ja)/ja/expenses/cleaners/page.tsx | 1-337 | 1-337 | REVIEWED |
| src/app/(ja)/ja/expenses/delivery-drivers/page.tsx | 1-341 | 1-341 | REVIEWED |
| src/lib/svt/content/guides-vi.ts | 1-312 | 1-312 | REVIEWED |
| src/lib/svt/content/guides-zh.ts | 1-311 | 1-311 | REVIEWED |

Total: 4,023 lines read of 4,023 assigned. All 12 files exist (none removed).

## Findings

### READ-21-F01: Student Visa Tax guarantee text has no "TFN-only returns" limit (Vietnamese and Chinese)
- Severity: MEDIUM
- Confidence: high (the text is as described); medium on intent (the brief says the guarantee is for TFN-only returns; I did not find a separate SVT policy)
- Files and lines:
  - src/lib/svt/content/guides-vi.ts:12 (meta description), 24-27 (guarantee section)
  - src/lib/svt/content/guides-zh.ts:11 (meta description), 23-26 (guarantee section)
- Evidence: the pricing guide says "if the refund is lower than our fee, we pay back the difference", with the $220 worked example, and adds only the "no refund or tax to pay = full fee" note. Nothing limits it to TFN-only returns. The meta description puts the promise in the same sentence as the $385 ABN price, so it reads as covering ABN returns too. The WHT pages in this unit (de, fr, it, ja) all carry the limit sentence. The English source (src/lib/svt/content/guides-en.ts:65, 86, opened only to compare) has the same gap, so this is a source problem, not a translation slip.
- Recommended fix: add the "applies only to returns with TFN income" sentence to the guarantee section and the meta description in en, vi and zh, or drop the guarantee from the meta description that also quotes $385.

### READ-21-F02: Refund and payout timing statements in French blog chunk 18
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(fr)/fr/blog/chunks/18.ts:189, 293, 307
- Evidence: line 189 says refunds are "generally paid about 14 business days after lodgment, later in the July to September peak" (stated as fact, no ATO attribution). Line 293 says the DASP is "generally paid within 28 days of a complete application". Line 307 says early lodgment "brings the refund forward by several months". These are hedged, but they are timing figures for a refund.
- Recommended fix: remove the 14-day figure or attribute it to the ATO as an ATO processing standard and not a promise; soften line 307.
- Related, lower: guides-vi.ts:266 and 292 quote "ATO says complete applications are usually paid within 28 days" for DASP (attributed to ATO; the zh version does not carry it).

### READ-21-F03: Tax figures I could not check (no network), possibly dated
- Severity: LOW
- Confidence: low (unverified, not known wrong)
- Files and lines:
  - src/app/(fr)/fr/blog/chunks/18.ts:97 (General Interest Charge "11.51 % October to December 2026" and "over 11 % in 2026-27"), 99 (worked interest amounts, internally consistent with that rate)
  - src/app/(fr)/fr/blog/chunks/18.ts:109 (Failure to Lodge penalty "364 $ per 28-day period, up to five units"; the penalty unit I know of is $330, so this depends on a July 2026 indexation I cannot confirm)
  - src/app/(fr)/fr/blog/chunks/18.ts:115-117 (payment due "21 days after the notice of assessment" for agent-lodged returns and "21 November" for self-lodgers; simplified)
  - src/app/(fr)/fr/medicare/page.tsx:101 (Medicare levy low-income threshold "28 011 $ single, 2025-26, per ATO")
  - cents per kilometre "91 cents from 2026-27": de delivery-drivers:158-159, es expenses:157, fr cleaners:167-168, fr delivery-drivers:158-159, it expenses:198, ja cleaners:167-168, ja delivery-drivers:158-159
  - "$1,000 standard deduction from 2026-27" presented as existing ATO rule: es expenses:144-146, 279; it expenses:185-187, 314
- Recommended fix: verify each against the ATO before the next release; keep them in the central facts file so one change updates all languages.

### READ-21-F04: The two $300 rules are worded inconsistently inside the same file
- Severity: LOW
- Confidence: high
- Files and lines:
  - fr cleaners: 118 ("less than 300"), 126 ("300 or less" immediate, then kit "for 300 or more" is one asset), 129 ("300 or more" heading), 151 ("under 300" for no written evidence), 273 ("300 or less" / "more than 300")
  - ja cleaners: 126 ("300 or less" immediate, but set "totalling 300 or more"), 129 ("over 300")
  - es expenses: 139 and 252 ("300 or less") vs 202 ("less than 300")
  - it expenses: 180 ("do not exceed 300") vs 243 and 289 ("under 300")
- Evidence: an item of exactly $300 falls on different sides of the line depending on the sentence. The fr delivery-drivers, de and ja delivery-drivers pages are consistent ("300 or less").
- Recommended fix: use "300 or less" for the immediate deduction and the no-written-evidence concession, and "more than 300" for depreciation, everywhere.

### READ-21-F05: Employee-only rules applied to ABN workers without saying so
- Severity: LOW
- Confidence: medium (could not check against ATO)
- Files and lines: de delivery-drivers:137, 200; fr delivery-drivers:137, 200; ja delivery-drivers:137, 200; fr cleaners:118, 126, 151; ja cleaners:118, 126, 151
- Evidence: these pages say platform delivery and private cleaning are ABN (business) income, then apply the "$300 total, no written evidence" concession and the "$300 per item immediate deduction", which as far as I know are employee work-related expense rules. Business expenses follow other substantiation and write-off rules.
- Recommended fix: have the supervising agent confirm; if confirmed, say the $300 rules apply to the employee (TFN) part of the year.

### READ-21-F06: Third-party iframe on the French Medicare page
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(fr)/fr/medicare/page.tsx:287-295, 298-306
- Evidence: two iframes to the youtube-nocookie.com embed domain (https, lazy loaded, strict-origin-when-cross-origin referrer). Non-government external domain; no sandbox attribute. The same video is loaded twice (mobile and desktop wrappers), hidden by CSS only.
- Recommended fix: confirm the CSP frame-src allows only this host; render one iframe.

### READ-21-F07: Vietnamese and Chinese guides differ although both say they match the English facts
- Severity: LOW
- Confidence: high
- Files and lines:
  - guides-vi.ts:118 says the Medicare Entitlement Statement is applied for "online through your myGov account"; guides-zh.ts:117 says only "apply to Services Australia". The same vi guide (lines 31, 45, 306) stresses that the customer never needs to hand over myGov; not a contradiction, but worth a check that the myGov route is correct.
  - guides-zh.ts:189 has a dated sentence ("31 October 2026 ... has now passed"); guides-vi.ts:190 does not. The zh sentence will go stale and needs a yearly edit.
  - guides-vi.ts:141-143, 156 covers cleaning, tutoring and nail work under ABN; guides-zh.ts:140-142, 155 covers delivery only.
  - guides-zh.ts:301 lists the languages as "English、中文或 Tiếng Việt" (mixed scripts in a Chinese sentence; line 309 uses Chinese names).
- Recommended fix: align both with guides-en.ts; move the dated sentence to a date-driven helper.

### READ-21-F08: Response-time and turnaround statements (not refund timing)
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: de delivery-drivers:70; fr cleaners:71; fr delivery-drivers:70; fr medicare:201, 279, 331; fr page:157, 219, 234, 316; it expenses:57; ja cleaners:71; ja delivery-drivers:70; guides-vi.ts:52, 67, 72; guides-zh.ts:51, 66, 71
- Evidence: "reply in about an hour" (de, it, ja state it flatly; fr says "in general"; fr page:157 limits it to business hours) and "we review your form in about 24 hours" (SVT). Not refund promises, so outside rule 2, listed because the flat wording in de, it and ja is firmer than the French.
- Recommended fix: use the hedged, business-hours wording in all languages.

## Notes

- Rule 1 (registered agent claims): none found. Every page uses "reviewed and approved by a registered tax agent" or "operates under the supervision of" wording (for example fr page:105, 285; guides-vi.ts:305; guides-zh.ts:304). guides-vi.ts:30, 50, 305 and guides-zh.ts:29, 49, 304 name the supervising company as payee and supervisor; that is a business name, not personal data.
- Rule 2: all WHT guarantee texts in this unit carry the TFN-income limit (de delivery:71; fr cleaners:72; fr delivery:71; fr medicare:274; fr page:145, 245; it expenses:58; ja cleaners:72; ja delivery:71). es expenses takes its guarantee heading from `./_shared` (UI_BASE), which is outside this unit and was not opened. No refund amounts promised; fr chunk 18 lines 181 and 208 explicitly refuse to quote an average.
- Rule 3: only $220 and $385 appear (guides-vi.ts:12, 18-19, 25, 35, 39, 141, 163, 173; guides-zh.ts:11, 17-18, 24, 34, 38, 140, 162, 172). The $150 / $70 figures are the worked guarantee example. No prices on the WHT pages.
- Rule 6: no http:// links, emails, phone numbers, keys, TFNs or account numbers. No raw HTML or script inside content strings. External hosts are schema.org (JSON-LD context) and youtube-nocookie.com only.
- Rule 7: no em or en dashes in any of the 12 files (pattern search for U+2013 and U+2014 returned nothing). No TODO, lorem or XXX. Language is correct per file; English tax terms (logbook, cents per kilometre, tax return) are used as terms. Image `subject` strings in English (es expenses:311, it expenses:337, fr page:215, 281) look like internal image-slot briefs; I did not check whether ImageSlot renders them to visitors.
- Rule 8: no page in this unit reads params or searchParams. dangerouslySetInnerHTML appears only in fr medicare:182-185 and fr page:203-205, always through `jsonLdHtml(...)` for JSON-LD.
- Markdown links inside fr chunk 18 point to unprefixed paths (/blog/..., /tax-return, /calculator, /superannuation, /tfn, /blog/category/abn; lines 20, 52, 75, 93, 111, 154, 183, 201, 222, 231, 235, 243, 267, 279, 287, 293, 301, 307, 330, 348, 352). A helper file src/lib/locale-blog.ts exists and may localise them; I did not read it, so whether a French reader lands on English pages is unverified.
- Internal consistency of fr chunk 18 checked and found sound: 45 % / 30 % / 15 % withholding rates (173-174, 218-223, 271, 277), WHM brackets (258-261) match fr page:149, super 12 % (199, 231, 291), DASP 65 % and the $4,000 example (123, 201, 243, 293), lodgment dates (187, 305).
- No commands other than file reads, wc and grep were run. No network use.
