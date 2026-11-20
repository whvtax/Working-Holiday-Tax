# READ-09 report

(Complete. All six files read in full.)

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(fr)/fr/blog/chunks/15.ts | 1-612 | 1-612 | REVIEWED |
| src/lib/svt/content/long/en/batch-07.ts | 1-981 | 1-981 | REVIEWED |
| src/lib/svt/content/long/vi/batch-00.ts | 1-998 | 1-998 | REVIEWED |
| src/lib/svt/content/long/vi/batch-03.ts | 1-993 | 1-993 | REVIEWED |
| src/lib/svt/content/long/vi/batch-08.ts | 1-996 | 1-996 | REVIEWED |
| src/lib/svt/content/long/zh/batch-08.ts | 1-989 | 1-989 | REVIEWED |

Total: 5,569 lines read of 5,569 assigned.

Mechanical scans (grep, all six files, whole length): no em or en dashes; no HTML tags, script, iframe, event handlers, javascript: or data: URLs; no http:// links; no TODO / lorem / XXX; all absolute links go to ato.gov.au, fairwork.gov.au, abr.gov.au; no service prices at all (no $220/$385/$330/$495/$440 as a fee; "$330" in fr/15 is the old ATO penalty unit); no dangerouslySetInnerHTML, params or searchParams (files are data modules, not pages).

## Findings

### READ-09-F01: French wording reverses the meaning of the non-lodgment advice year range
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(fr)/fr/blog/chunks/15.ts:443
- Evidence: "c'est possible en ligne pour les années de revenus jusqu'à 2000" reads as "for income years up to 2000". The intended meaning is almost certainly "back to 2000" (online for years from 2000 onward). Could not check the ATO page (no network).
- Recommended fix: reword to "en remontant jusqu'à l'année 2000" or "à partir de l'année de revenus 2000", after checking the ATO page.

### READ-09-F02: Postal address for the overseas TFN paper form could not be verified
- Severity: LOW
- Confidence: low
- Files and lines: src/lib/svt/content/long/en/batch-07.ts:314, 931
- Evidence: both articles tell the reader to post the form, with certified identity copies, to an ATO GPO Box in Canberra. A wrong address would send identity documents astray. I could not check it against the current ATO form (no network).
- Recommended fix: confirm against the current ATO form "TFN application for individuals living outside Australia"; or replace the address with "the address printed on the form".

### READ-09-F03: Contact details present in article text (all public, listed for completeness)
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/en/batch-07.ts:424 (email address, ato.gov.au scam-report mailbox); :417 (phone, IDCARE, a non-government support charity); :62, 84, 410 (Fair Work and interpreter short numbers); :353, 390, 410, 422, 429, 433, 437, 524, 533 (ATO 1800 lines); src/lib/svt/content/long/vi/batch-00.ts:779 (ATO 1800 line, to be read in context)
- Evidence: type only: one government email address, public agency phone lines, one non-government helpline. No private email, no private phone, nothing shaped like a TFN, key or bank account.
- Recommended fix: none needed; confirm the IDCARE number and the ATO lines are current before publishing.

### READ-09-F04: Speculative statements about visa consequences of tax non-compliance
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(fr)/fr/blog/chunks/15.ts:398, 589
- Evidence: the text says an unresolved tax position "can lead Home Affairs to look more closely" at a second or third year visa application, and that Home Affairs "can see" it. This is migration-related assertion with no source in the file. Could not check.
- Recommended fix: remove or soften to "for visa questions, check with Home Affairs", as the SVT articles do.

### READ-09-F05: 31 October 2026 falls on a Saturday (dated fact, could not check)
- Severity: LOW
- Confidence: low
- Files and lines: src/app/(fr)/fr/blog/chunks/15.ts:362, 494, 500-502, 520; src/lib/svt/content/long/en/batch-07.ts:957
- Evidence: the text states the 2025-26 return "was due 31 October 2026". When a due date falls on a weekend the ATO normally treats the next business day as the due date. The practical effect now is nil (the date has passed), but the penalty-day arithmetic at fr/15:370-374 counts from it.
- Recommended fix: verify and, if needed, say "31 October (the next business day when it falls on a weekend)".

### READ-09-F06: OSHC medicine benefit limits look wrong (could not check)
- Severity: LOW
- Confidence: medium
- Files and lines: src/lib/svt/content/long/vi/batch-03.ts:698
- Evidence: the article attributes to the Australian Government private health insurance site a medicine benefit of up to $50 per item, capped at $500 a year for a single policy and $1,000 for a family policy. My recollection of that site is $300 single and $600 family. No network, so not verified; the same figures should be checked in the English, Chinese and other versions of this article (not in this unit).
- Recommended fix: check against the government OSHC page and correct in every language, or drop the yearly caps.

### READ-09-F07: Advice on storing a TFN differs between articles
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/vi/batch-00.ts:802 versus src/lib/svt/content/long/en/batch-07.ts:402
- Evidence: the Vietnamese article tells the reader to keep the TFN in a password manager app; the English article, quoting ATO tips, says not to store it on your phone. A reader of both gets opposite advice.
- Recommended fix: align on the ATO wording.

### READ-09-F08: Chinese batch-08 still states residency outcomes and tax rates that the Vietnamese and English versions removed
- Severity: MEDIUM
- Confidence: high (that the versions differ); medium (that the Chinese one is the stale one)
- Files and lines: src/lib/svt/content/long/zh/batch-08.ts:30, 34, 36, 40, 109, 113-116, 148, 697; compare src/lib/svt/content/long/vi/batch-08.ts:30, 34, 38, 108-112, 144 (same slugs "multiple-jobs-tax-return-student-visa" and "student-to-graduate-visa-485-tax")
- Evidence: the Chinese text says a student "may be a tax resident" with a $18,200 tax-free threshold, works a full example at 16% ($1,888) plus the low income tax offset ($700 up to $37,500), sets out the complete 2025-26 resident and foreign resident rate tables, says a foreign resident has no threshold, and cites the ATO for "students enrolled in a course of 6 months or more may be Australian tax residents". The Vietnamese version of the same two articles has none of this: it says residency depends on the person's facts, the ATO decides, and the team reviews it. A grep of the English source (en/batch-08.ts, opened only for this check) finds no "6 months or more", no "$1,888" and no "foreign resident", only the $18,200 FAQ at line 88. So the Chinese file appears to have missed a compliance rewrite. The rates themselves look right for 2025-26; I could not check them.
- Recommended fix: re-translate these two Chinese articles from the current English source so that all languages give the same, non-committal residency wording.

### READ-09-F09: 2026-27 laundry evidence rule and $1,000 standard deduction: unverified, and worded differently across languages
- Severity: LOW
- Confidence: low
- Files and lines: src/lib/svt/content/long/vi/batch-08.ts:975, 979; src/lib/svt/content/long/zh/batch-08.ts:968, 972
- Evidence: both say that from 2026-27 every laundry claim needs written evidence, that a standard deduction of up to $1,000 is available, and that it is reduced dollar for dollar by separately claimed work expenses. Both limit it to "tax residents with labour income"; the English source (en/batch-08.ts:1079) says "eligible individuals" and that it depends on individual facts. I could not check any of this (no network), and the "reduced dollar for dollar" mechanic in particular should be confirmed.
- Recommended fix: verify against the ATO page for 2026-27 and bring vi and zh into line with the English wording.

## Notes
- vi-08 and zh-08: each is in its own language throughout. No fee, no guarantee, no refund figure or timing promise ("28 days" at vi-08:189, 470 and zh-08:193, 463 is the ATO service standard for DASP, attributed to the ATO). DASP rates (0% / 35% / 45% / 65%), the worked examples ($6,000 gives $2,100 tax; $10,000 mixed gives $6,500 tax), the 6-month transfer to the ATO, $5,000 paper threshold, Payday Super dates, 21-day dismissal limit, 6 and 12 month minimum employment, under-15-employee small business, $26.44 x 6 = $158.64, and laundry $1 / 50 cents are identical in both languages and consistent inside each file.
- vi-08:231-235 has a section on receiving super in Vietnam that the Chinese version lacks; this is localisation, not an error. zh-08:164 lacks the pointer to the companion article that vi-08:160 has.
- vi-08:397 and zh-08:390 say anyone charging for tax services must be registered with the Tax Practitioners Board. This is a general statement, not a claim about the business; note that it invites the reader to look the business up on the register.
- vi-00 and vi-03: Vietnamese throughout; English only as glossed terms. "đại lý thuế đã đăng ký" appears only about a third-party agent the reader may have used (vi-00:657, 686, 772, 812). No fee, no guarantee, no refund figure or timing promise; refund outcomes are always worded as depending on the ATO assessment. Worked-example amounts ($330.00 at vi-03:44 is a wage total) are not service prices.
- vi-00 and vi-03 figures are internally consistent and match en-07: no-TFN withholding 47% for residents and 45% for foreign residents (vi-00:33, 294, 346, 412), 28 days, super 12%, minimum wage $26.44 and $1,004.90 a week, award rise 4.75% from 1 July 2026 (vi-03:100, 183, 253), GST $75,000 / $82.50 / $1,000, no-ABN 47%, Medicare levy 2%, MES up to 8 weeks, 2-year amendment period. Could not check the 2026 figures.
- vi-00:823 has the slug "what-is-an-abn-international-students" with a title about how ABN income is taxed; this matches the English source (en/batch-00.ts:938, opened only to confirm), so it is not a translation slip.
- fr/15: "agent fiscal enregistré" is used only as supervision wording ("vérifiée et validée par un agent fiscal enregistré", lines 474, 544) or generically about agents. No statement that the business itself is a registered agent. No guarantee, no refund figure, no timing promise ("rien n'est acquis tant que l'ATO n'a pas établi l'avis", line 470). "estimer votre remboursement d'impôt" is a calculator link label (lines 80, 143, 278, 351), not a promise.
- fr/15: internal links are mixed: two use the French path /fr/tax-return-australie-pvt (lines 358, 494), all others use /tax-return, /calculator, /superannuation, /medicare, /blog/... without a /fr prefix. Not a security issue; check that the unprefixed paths resolve to French pages.
- fr/15:97 says the Hospitality Award has "six niveaux" and then describes Introductory plus Levels 1-3; fr/15:232 says the same for the Restaurant Award and lists Introductory plus Levels 1-6 (seven). Minor internal looseness, could not check against the awards.
- fr/15: penalty unit figures are consistent inside the file ($364 from 1 July 2026, $330 before; 5 units = $1,820) at lines 356-374, 462, 514. The two-year amendment period is stated the same way at 410 and 607. Could not check the $364 figure.
- en-07: national minimum wage $26.44 from 1 July 2026 (line 39), Payday Super 7 business days (118), super 12%, no-ABN withholding 47% (664), no-TFN withholding "45% plus Medicare levy" (233, 237, 911, 943), GST $75,000, $82.50, $1,000 thresholds: internally consistent; could not check the 2026 figures.
- en-07: "tax agent" appears only generically (381, 466, 754, 756). The business speaks as "we/us/our team" without claiming registration. "Keep an Australian bank account open for your refund" (953) presupposes a refund but promises nothing.
- English terms inside the French and Vietnamese text (TFN, super, casual, payslip, award names, one quoted ATO sentence at fr/15:468) are deliberate glosses, not wrong-language text.
