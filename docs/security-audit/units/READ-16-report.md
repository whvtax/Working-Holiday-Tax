# READ-16 report

Status: COMPLETE. 5,588 of 5,588 assigned lines read.

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/superannuation/page.tsx | 1-513 | 1-513 | REVIEWED |
| src/app/(es)/es/abn/page.tsx | 1-502 | 1-502 | REVIEWED |
| src/app/(es)/es/blog/chunks/09.ts | 1-512 | 1-512 | REVIEWED |
| src/app/(es)/es/blog/chunks/12.ts | 1-510 | 1-510 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/10.ts | 1-512 | 1-512 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/12.ts | 1-512 | 1-512 | REVIEWED |
| src/app/(it)/it/blog/chunks/03.ts | 1-492 | 1-492 | REVIEWED |
| src/app/(it)/it/blog/chunks/09.ts | 1-513 | 1-513 | REVIEWED |
| src/app/(it)/it/blog/chunks/10.ts | 1-514 | 1-514 | REVIEWED |
| src/app/(it)/it/blog/chunks/12.ts | 1-508 | 1-508 | REVIEWED |
| src/app/(ja)/ja/abn/page.tsx | 1-500 | 1-500 | REVIEWED |

Every file was read in one range (none exceeds 700 lines). No line was cut off (longest line 703 characters).

None of the tax facts below could be checked against a source (no network). Where two locale versions of the same article disagree, at least one of them is wrong; I say which one looks newer where the text shows it.

## Findings

### READ-16-F01: Spanish ABN deductions article is out of step with the Italian and French versions (the $300 rule and the $1,000 standard deduction)
- Severity: MEDIUM / Confidence: medium
- Files and lines: src/app/(es)/es/blog/chunks/12.ts:341, 374-375 versus src/app/(it)/it/blog/chunks/12.ts:339, 372-373 and src/app/(fr)/fr/blog/chunks/12.ts:343, 376-377
- Evidence: ES says an item of 300 AUD or less is deducted in full, and lists the $1,000 standard deduction as something that may "apply to your case and beat itemising" in an article about ABN expenses. IT says the $300 rule is for non-business items, that ABN assets follow small-business depreciation and the instant asset write-off, and that the $1,000 deduction covers salary expenses of tax residents only, "never ABN expenses". FR says the same as IT. IT keeps one leftover bullet (12.ts:372) that still uses the $300 line for ABN items.
- Recommended fix: bring ES 12.ts:341 and 374-375 in line with the IT/FR wording; fix the leftover bullet at IT 12.ts:372.

### READ-16-F02: First White Card / first RSA: "not deductible" in one article, listed as deductible in another
- Severity: MEDIUM / Confidence: high that the texts conflict
- Files and lines: src/app/(es)/es/blog/chunks/12.ts:331 and src/app/(fr)/fr/blog/chunks/12.ts:333 ("licences the work requires, such as a White Card or an RSA") versus src/app/(es)/es/blog/chunks/09.ts:34, 57, 95 and src/app/(it)/it/blog/chunks/09.ts:34, 96 (first card or course is not deductible); src/app/(it)/it/blog/chunks/12.ts:329 has the corrected wording (renewals only, "not the first course")
- Evidence: the same site tells a reader in one article that the first White Card or RSA is not deductible and in another lists them as deductible ABN expenses without the limit.
- Recommended fix: copy the IT 12.ts:329 wording into ES 12.ts:331 and FR 12.ts:333.

### READ-16-F03: RSA validity periods differ between the Spanish and Italian versions
- Severity: MEDIUM / Confidence: high that the texts conflict
- Files and lines: src/app/(es)/es/blog/chunks/09.ts:87-89 versus src/app/(it)/it/blog/chunks/09.ts:87-90
- Evidence: ES: Victoria, Queensland, Tasmania, ACT and NT three years; WA and SA no expiry. IT: Victoria and ACT three years; Queensland, SA, WA and Tasmania no expiry; NT "check with NT Licensing". Queensland, Tasmania and NT are stated differently.
- Recommended fix: verify per state and use one list in every locale.

### READ-16-F04: Vehicle logbook after changing cars: French says it carries over, Italian says it does not
- Severity: MEDIUM / Confidence: high that the texts conflict
- Files and lines: src/app/(fr)/fr/blog/chunks/10.ts:100-102 versus src/app/(it)/it/blog/chunks/10.ts:100-102
- Evidence: FR: the business-use percentage "generally still applies after a change of car", twelve weeks "need not be redone". IT: "as a rule no, the logbook is tied to the vehicle", a new twelve-week period is usually needed.
- Recommended fix: verify and align; the two readers get opposite instructions.

### READ-16-F05: Smaller cross-locale contradictions in the same articles
- Severity: LOW / Confidence: high that the texts conflict
- Files and lines and evidence:
  - Cleaning Services Award minimum engagement: "3 hours" at src/app/(es)/es/blog/chunks/09.ts:265; "depends on the area cleaned, not a fixed number" at src/app/(it)/it/blog/chunks/09.ts:266.
  - Tourist Refund Scheme, when to arrive: "at least three hours ahead" at es/blog/chunks/09.ts:481; "90 minutes before the flight instead of the usual 60" at it/blog/chunks/09.ts:482. ES also says the scheme refunds wine tax (09.ts:455); IT does not.
  - Objection decision time: "about 60 days" at src/app/(fr)/fr/blog/chunks/10.ts:436; "within a few weeks" at src/app/(it)/it/blog/chunks/10.ts:438.
  - TFN before an ABN: "you need the TFN first, the ABN application is matched against it" at src/app/(es)/es/abn/page.tsx:142, 197, 332, 446; "recommended, it makes the identity check faster" at src/app/(ja)/ja/abn/page.tsx:169, 235, 439.
  - Small business offset cap: "above [30,000]: capped at 1,000" at fr/blog/chunks/10.ts:143; "from about 42,000" at it/blog/chunks/10.ts:143 (the IT figure matches the arithmetic in the article).
  - The $300 limit: "under 300" at es/blog/chunks/09.ts:38 and it/blog/chunks/09.ts:38; "300 or less" at it/blog/chunks/03.ts:324 and es/blog/chunks/12.ts:341.
  - PSI 80 % test: "80 % or more" at fr/blog/chunks/10.ts:286; "more than 80 %" at fr/blog/chunks/10.ts:328 (same file).
- Recommended fix: verify each and use one statement in all locales.

### READ-16-F06: TFN service described as using the business's "verified address" in Spanish and Italian, but not in French
- Severity: LOW / Confidence: high that the texts say so
- Files and lines: src/app/(es)/es/blog/chunks/12.ts:245 and src/app/(it)/it/blog/chunks/12.ts:243 versus src/app/(fr)/fr/blog/chunks/12.ts:245
- Evidence: ES and IT: "we handle TFN applications with a verified address that holds the mail for the whole process and confirm the number directly to the client". FR: the service "settles the address question with you" and chases the ATO. One of the two descriptions of the service is not what the business does.
- Recommended fix: owner to confirm which is true and permitted, then align the three.

### READ-16-F07: Refund timing and a refund figure stated in articles
- Severity: LOW / Confidence: high that the text is there; whether it breaches the house rule is the owner's call
- Files and lines: src/app/(it)/it/blog/chunks/03.ts:225 and 460-462 (ATO processes most online returns in "about 12 business days"; heading "How long does the refund take?"); src/app/(fr)/fr/blog/chunks/10.ts:489 (extra refund "within a few weeks to one or two months"); src/app/(it)/it/blog/chunks/03.ts:150 (worked example: 1,200 "is what the return can recover")
- Evidence: all three are framed as ATO processing or a hypothetical, not as a promise by the business, and each article says elsewhere that no outcome is guaranteed. They are still a timing statement and a refund figure.
- Recommended fix: keep only if attributed to the ATO in the same sentence (IT 03.ts:462 is not); soften IT 03.ts:150 to "may".

### READ-16-F08: Facts that look dated or doubtful (not checked)
- Severity: LOW / Confidence: low
- Files and lines and evidence:
  - src/app/(es)/es/abn/page.tsx:162: the 15 % working holiday rate is labelled "in force since 1 July 2026"; the rate is much older, so the date reads as if it were new. JA words it as the 2026-27 year (ja/abn/page.tsx:397).
  - src/app/(es)/es/abn/page.tsx:386-387: worked example adds a 2 % Medicare levy (340) on a taxable income of 17,000; as far as I know the levy has a low-income threshold above that amount.
  - Cents per kilometre "91 cents, 5,000 km, cap 4,550" at fr/blog/chunks/10.ts:62, 74, it/blog/chunks/10.ts:62, 74 and es/blog/chunks/12.ts:414: consistent across the unit, but the rate I know for earlier years is 88 cents and no year is named.
  - Lodgment threshold "45,001" for visa 417/462 holders and the non-lodgment advice exemption at it/blog/chunks/03.ts:94, 380, 395-397.
  - Small business income tax offset described as often available to working holiday makers at fr/blog/chunks/10.ts:120-132 and it/blog/chunks/10.ts:120-132, while the same files say the low income offset is for residents only; whether the small business offset has a residency condition was not checked.
- Recommended fix: verify each against the ATO and name the income year next to every rate.

### READ-16-F09: Stale code comments say "no price on this page" while the page shows 385
- Severity: INFORMATIONAL / Confidence: high
- Files and lines: src/app/(es)/es/abn/page.tsx:20-21 versus 454; src/app/(ja)/ja/abn/page.tsx:21-23 versus 455
- Evidence: comments only, not customer-facing. The price shown (385) is an allowed price and carries the TFN-only limit on the guarantee.
- Recommended fix: correct the comments.

## Notes
- Rule 1 (registered agent): no statement that the business itself is a registered agent, accountant or 税理士. Supervision wording only: de/superannuation:478, ja/abn:465, es chunks/12.ts:173, fr chunks/12.ts:125, 175, it chunks/03.ts:221, it chunks/12.ts:173.
- Rule 2 (guarantee): the guarantee appears at de/superannuation:471-473, es/abn:454 and ja/abn:455, each with the TFN-only limit. No guarantee text in the blog chunks. See F07 for timing and figure statements.
- Rule 3 (prices): only 385 appears (es/abn:454, ja/abn:455). No other service price in the unit.
- Rule 6: no raw HTML, iframe, event handler, javascript: or data: URL, http:// link, email address, or anything shaped like a key, TFN or bank account in any file. The only script tags are the JSON-LD blocks in the three .tsx pages. External links: ato.gov.au only (de/superannuation:217, 382; es/abn:398). Phone number: the ATO Client Identity Support Centre public line only (es chunks/12.ts:102, 179; fr chunks/12.ts:70, 181; it chunks/12.ts:102, 179).
- Rule 7: no em or en dashes in any file (grep for U+2013, U+2014, U+2015: no hits). No placeholder text (the "todo" hits are the Spanish and Italian words). Language matches the file in all eleven; English terms kept are tax and work terms (tax return, award, logbook and so on).
- Rule 8: the three .tsx pages do not use params or searchParams. Every dangerouslySetInnerHTML is a JSON-LD block passed through jsonLdHtml (de/superannuation:269-273, es/abn:310-313, ja/abn:340-343). The helper itself is outside this unit and was not opened.
- Blog chunk links are written without a locale prefix (/tax-return, /blog/...). I opened src/lib/locale-blog.ts (lines 34-49 only) and it rewrites internal markdown links, so this is not a finding.
- "Reply in about an hour" appears on the three pages (de/superannuation:289, 412, 482, 507; es/abn:338, 496; ja/abn:364, 494). It is a response-time statement, not a refund timing promise. The DASP "usually within 28 days" on the German page is attributed to the ATO.
- All three pages say the client never logs in to myGov and that the business deals with the ATO directly (de/superannuation:298, es/abn:442, ja/abn:434). Not judged here; it is a service claim for the owner to confirm.
- Minor: stray trailing space at es chunks/09.ts:455; odd indentation at de/superannuation:469; a near-duplicate sentence at fr chunks/12.ts:476.
