# CONTENT-01 report

Scope note: these five files are article text plus a few lookup helpers. Two passes were made.
(1) A pattern search (GNU grep, `/usr/bin/grep`) over every line of all five files.
(2) Manual reading of the ranges listed below. Lines outside those ranges were NOT read; anything said about them comes from the pattern search only and is marked as such.
No tax figure in this report was checked against the ATO, Fair Work or any other source (no network use allowed).

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(es)/es/blog/chunks/03.ts | 481 | 1-481 | REVIEWED |
| src/lib/svt/content/blog-en.ts | 1137 | 1-1137 | REVIEWED |
| src/lib/svt/content/long/en/batch-12-deductions.ts | 1136 | 1-1136 | REVIEWED |
| src/app/(site)/blog/data.ts | 9771 | 1-1600, 9440-9771 (1,932 lines). Not read: 1601-9439 | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/blog/data.ts | 9475 | 1-240, 9425-9475 (291 lines). Not read: 241-9424 | PARTIALLY_REVIEWED |

Lines read manually: 4,977 of 22,000. Pattern search: all 22,000 lines.

### Pattern search results (all lines, all five files)
- Raw HTML tags, `<script`, `<iframe`, `<img`, `<svg`, `<a `, `<object`, `<embed`, `<style`, `on*=` handlers, `javascript:`, `vbscript:`, `data:` URLs, `dangerouslySetInnerHTML`, `innerHTML`, `eval(`, HTML entities: 0 hits in every file. The only `<` characters are TypeScript generics (es 03.ts:1; ja data.ts:77, 196).
- `http://` links: 0. All absolute links are `https://`.
- Distinct external domains: www.ato.gov.au, community.ato.gov.au, www.fairwork.gov.au, www.servicesaustralia.gov.au, www.abr.gov.au, abr.gov.au, business.gov.au. No non-government domain. Markdown links are otherwise site-relative (`/...`).
- Email addresses: 0.
- Phone numbers: only public government lines, no business or personal number. Locations: site data.ts:200, 490, 541, 609, 3565, 3571, 3735 (ATO), 5803, 5919 (ATO identity support), 7262 (healthdirect); ja data.ts:612, 883, 929, 992, 1032, 1406; blog-en.ts:836, 837, 847 (Fair Work, interpreter service).
- Key or token shapes (sk-, eyJ, AKIA, gh*_, EAA, long hex, 40+ char strings, Bearer): 0 real hits. Matches were article slugs and ATO URL paths only.
- TFN-like, ABN-like, BSB-like or account-like digit runs: 0. The three raw matches (site data.ts:2296, 9399; ja data.ts:261) are a penalty-rate percentage range and the slug "…-417-462".
- Template interpolation: only module constants `${ATO}` (blog-en.ts), `${GUIDES}` and `${SHARING}` (batch-12-deductions.ts). No user input reaches these strings.
- Business prices: no fee of the business is stated in any of the five files (search for $220, $385, $330, $495, $440, "our fee", "fixed fee", 料金, tarifa, honorario). The texts link to `/tax-return`, `/ja/tax-return` and the `pricing` slug instead. The only "$330" hits are the old ATO penalty unit (site data.ts:7694, 7803; ja data.ts:3816, 3934).

## Findings

### CONTENT-01-F01: Japanese guarantee text says "returns with TFN income", not "TFN-only returns"
- Severity: MEDIUM
- Confidence: medium (depends on how a Japanese reader takes the phrase)
- Status: CONFIRMED_BY_STATIC_EVIDENCE (wording); impact REQUIRES business confirmation
- CWE: n/a (business-logic / customer promise)
- Files and lines: src/app/(ja)/ja/blog/data.ts:239 (read in full); same sentence found by pattern search at :389, :448, :2904; :2906 points to "our guarantee" on /ja/tax-return
- Evidence: the paragraph promises to refund the difference when the ATO refund is smaller than the fee, then limits it with 「この保証の対象は、TFN所得のあるタックスリターンに限られます」, literally "limited to tax returns that have TFN income". A TFN+ABN return also "has TFN income". The English source article for line 239 (site data.ts:9510) carries no guarantee text at all, and the pattern search found no guarantee wording anywhere in the English file.
- Root cause: translation added a guarantee paragraph with looser scope wording than the rule "guarantee only for TFN-only returns".
- Attack prerequisites: none; a customer with TFN+ABN income reads the page and claims the guarantee.
- Impact: refund claims or complaints from customers outside the intended scope; the Japanese site promises more than the English one.
- Recommended fix: change to wording that means "only returns whose income is TFN wages alone (no ABN income)", in all four places, and align with the wording on /ja/tax-return.
- Regression test: content test that every occurrence of 保証 in ja blog data is followed by the approved TFN-only sentence.
- Limits of this verification: lines 389, 448, 2904, 2906 were seen only as grep fragments. /ja/tax-return was not opened.

### CONTENT-01-F02: Spanish and English versions of the same articles give different "must I lodge" rules
- Severity: LOW
- Confidence: high that they differ; unknown which is right
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(site)/blog/data.ts:1094, 1096, 1414, 1429, 9614 (read), 7883 (grep only); src/app/(es)/es/blog/chunks/03.ts:94, 369, 373, 384
- Evidence: English says "The ATO says a working holiday maker must lodge if their taxable income for the year was $45,001 or more" and that the duty "depends on how much you earned". Spanish, same slugs, says the trigger is tax having been withheld ("Si un empleador te retuvo impuesto ... la ATO espera una tax return", "Si se retuvo impuesto, aunque sea poco, corresponde presentar la declaración").
- Root cause: one language was revised and the other was not.
- Attack prerequisites: none.
- Impact: one of the two sites states the lodgment obligation wrongly, attributed to the ATO.
- Recommended fix: check the ATO lodgment rule for working holiday makers and make both languages (and ja, not read) match.
- Regression test: content check that the lodgment-threshold sentence is identical in meaning across locales for these slugs.
- Limits of this verification: the $45,001 rule could not be checked against the ATO.

### CONTENT-01-F03: Overbroad visa assurance and non-tax service offer in English work-rights FAQ
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(site)/blog/data.ts:9696; compare src/lib/svt/content/blog-en.ts:828-829
- Evidence: WHT FAQ says "our team can help you escalate through the right channels" and "your visa is protected when raising legitimate complaints". The SVT article on the same topic is narrower: Fair Work says the visa will not be cancelled for contacting it, and "there may still be consequences under the Migration Act".
- Root cause: older FAQ copy not brought to the later, sourced wording.
- Attack prerequisites: none.
- Impact: an unqualified visa-safety statement and an implied employment-dispute service from a tax business.
- Recommended fix: reuse the SVT wording; point to the Fair Work Ombudsman instead of "our team".
- Regression test: none practical beyond a wording check.
- Limits of this verification: Fair Work's current statement was not checked.

### CONTENT-01-F04: Japanese tax-return category intro leans towards a refund expectation
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(ja)/ja/blog/data.ts:121; compare src/app/(site)/blog/data.ts:9614, 9624
- Evidence: Japanese intro says most working holiday makers overpay tax during the year and a refund may arise (「多くは年間で税金を払い過ぎており、還付金が発生する場合があります」). English says only that a refund "depends on how much tax was withheld compared with what was owed". The FAQ directly below (ja:125) correctly refuses to quote an average.
- Root cause: translation not updated with the English softening.
- Attack prerequisites: none.
- Impact: mild refund expectation; not a guarantee.
- Recommended fix: mirror the English sentence.
- Regression test: wording check.
- Limits of this verification: only ja lines 1-240 and 9425-9475 were read; other refund wording in ja 241-9424 was pattern-searched only (no "average refund" or guaranteed-refund phrasing found).

### CONTENT-01-F05: Unconditional "claim the tax-free threshold" advice to students in two deduction articles
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/lib/svt/content/long/en/batch-12-deductions.ts:184, 362; compare :635 and src/lib/svt/content/blog-en.ts:37, 43
- Evidence: "Claim the tax-free threshold from one employer only" with no residency condition, while the same brand's other text says whether the threshold applies "depends on your individual facts" and line 635 adds "Where the tax-free threshold is available to you".
- Root cause: inconsistent wording rule across the batch.
- Attack prerequisites: none.
- Impact: reads as individual advice to readers who may not be entitled to the threshold.
- Recommended fix: use the line-635 wording in both places.
- Regression test: wording check for "tax-free threshold" without the conditional phrase.
- Limits of this verification: none beyond the above.

### CONTENT-01-F06: Tax and wage figures that could not be verified (some look worth a second check)
- Severity: INFORMATIONAL
- Confidence: low (no source access)
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines and evidence:
  - National minimum wage $26.44/hour, $1,004.90/week, "most awards rose 4.75%": blog-en.ts:1090, 1098, 1104, 1133; site data.ts:9679, 9686; ja data.ts:155. Arithmetic note: site data.ts:2181 gives $24.95 for 2025-26, so $26.44 is a rise of about 6.0%, not 4.75%. Both can be true only if the minimum wage and award rates rose by different amounts. Worth confirming.
  - Late-lodgment penalty unit $364 from 1 July 2026, maximum $1,820: blog-en.ts:975, 1002; site data.ts:7694, 7803 (grep); ja data.ts:3816, 3934 (grep).
  - $1,000 standard deduction from 2026-27, and end of the $300 / $150 evidence limits: blog-en.ts:404; batch-12-deductions.ts:90, 180, 268, 356, 450, 545, 639, 729, 918, 1017, 1112; es 03.ts:313, 356; site data.ts:1353, 1396.
  - Car rate 88c/km for 2025-26, 5,000 km cap: batch-12-deductions.ts:230, 430, 438, 528, 621, 805, 904, 960, 998.
  - Payday Super from 1 July 2026 (7 business days; 20 for a new employee): blog-en.ts:555, 568, 637.
  - Low income tax offset figures ($700, $37,500, $45,000, $66,667, $325): blog-en.ts:190-223.
  - Amendment period 2 years, 4 years for sole traders from 2024-25: blog-en.ts:907.
  - Working holiday rates 15% to $45,000, 30%, 37%, 45%; 45% no-TFN; 30% unregistered employer; 47% no-ABN; 65% DASP; 12% super; GST $75,000 and 21 days: site data.ts:33-67, 386, 667, 975, 1005, 1126, 1136; es 03.ts:6-31, 116.
  - Health insurance "condition 8501 ... on some working holiday visas": site data.ts:9732.
  - "Facts checked against the ATO on 26 Oct 2026" is asserted in a comment at blog-en.ts:3; not verified here.
- Root cause: n/a.
- Attack prerequisites: n/a.
- Impact: wrong figures on a tax site are a compliance and reputation risk.
- Recommended fix: have the listed figures checked once against the primary sources by the owner.
- Regression test: n/a.
- Limits of this verification: none of these were checked against the ATO or Fair Work. Worked-example arithmetic inside the read ranges was re-added and is internally correct (batch-12-deductions.ts:82, 167, 253, 434, 532, 623, 718, 810, 906, 992-998, 1101; site data.ts:45-47, 293-296, 1152).

## Checked and found sound
- No executable or markup content in article text; all five files (pattern search, all lines).
- External links are https and government domains only; all five files.
- No secrets, tokens, emails, private phone numbers, TFN or account-like numbers; all five files.
- No statement that the business itself is a registered tax agent. The wording is consistently "prepared by our team ... reviewed and signed off by a registered tax agent": site data.ts:1140, 1234, 1551-1553, 3437, 3518, 3735, 5913, 7815, 7887 (last six grep only); blog-en.ts:490, 513; ja data.ts:229 (read), 335, 448, 737, 1153, 1400, 2620 (grep only). es 03.ts refers to registered agents only generically (57, 84, 105, 210, 404, 445).
- No business price appears, so no price other than the approved ones appears; all five files (pattern search).
- No guaranteed-refund or "average refund" promise in read ranges; explicit disclaimers at es 03.ts:78, 132, 392, 414; site data.ts:302-304, 9624; ja data.ts:94, 125.
- Lookup helpers are plain array finds and object spreads with no side effects: site data.ts:9740-9771; ja data.ts:9440-9471; blog-en.ts:1137.

## Open questions
- Category slug differs by language for "Medicare & Other": `medicare` (ja data.ts:166) vs `medicare-and-other` (site data.ts:9707). Whether this breaks the Japanese category route or cross-language links depends on the route files, which are outside this unit and were not opened.
- Stale comment at ja data.ts:193 says the translation map "is currently empty"; it holds thousands of lines.
- batch-12-deductions.ts:107 uses an old-style ATO URL path (`/individuals/income-and-deductions/...`), unlike every other source link in the file. Not tested (no network).
- site data.ts 1601-9439 and ja data.ts 241-9424 (about 17,000 lines) were not read. The pattern search covers them for risky constructs, agent claims, prices and guarantee wording, but not for wrong or dated figures or subtler promises.
- Which lodgment rule in F02 is correct, and whether the guarantee is meant to appear in blog articles at all (it appears only in Japanese).
