# CONTENT-02 report

Scope: 15 content files, 21,998 lines. Static review only (grep, `sed -n`, file reads). No code run, no network.
Honest summary of coverage: every file was grepped in full for the risky constructs listed below. Only about 2,180 lines (about 10%) were read line by line. Thirteen of the fifteen files are therefore PARTIALLY_REVIEWED. Tax figures could not be checked against the ATO (no network).

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(de)/de/blog/data.ts | 9167 | 1-64, 9128-9167 read; rest grep only (single lines seen in grep output: 83, 117, 226, 549, 610, 1587, 3847, 4989, 9101 and others) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/19.ts | 1 | 1 | REVIEWED (exports an empty record) |
| src/lib/svt/content/guides-vi.ts | 312 | 1-312 | REVIEWED |
| src/lib/svt/content/long/en/batch-00.ts | 1128 | 1-800, 801-1128 | REVIEWED |
| src/lib/svt/content/long/en/batch-03.ts | 1091 | 1-8 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-06.ts | 1034 | 1-204, 205-245, 246-625 read; 626-1034 grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-08.ts | 1102 | 1-8 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-09.ts | 1049 | 1-8, 826-836 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-10.ts | 1023 | 1-8 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-00.ts | 998 | 1-6 read (line 7 truncated); rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-08.ts | 996 | 1-6 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-12-deductions.ts | 1048 | 1-6 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/zh/batch-00.ts | 1001 | 1-6 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/zh/batch-03.ts | 1002 | 1-6 read; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/zh/batch-12-deductions.ts | 1046 | 1-6 read; rest grep only | PARTIALLY_REVIEWED |

Files opened outside the unit, to judge F01 only: src/lib/svt/content/guides-en.ts (lines 80-92), src/lib/svt/content/home-en.ts (lines 43-52), src/lib/svt/content/guides-zh.ts (grep hits at 35, 194).

### Grep results over all 15 files (full-file coverage)
- Raw HTML tags: none. The only `<...` matches are TypeScript generics (`Record<string, ...>`).
- `<script`, `<iframe`, `<object`, `<embed`, `<svg`, `<style`, `<form`, `<img`, `on*=` handlers, `javascript:`, `data:` URLs, `dangerouslySetInnerHTML`, `eval(`, `window.`: none. One `document.` match in en/batch-08.ts is ordinary prose.
- `http://` links: none. All absolute links are `https://`.
- Distinct external domains (all Australian government): www.ato.gov.au, www.fairwork.gov.au, horticulture.fairwork.gov.au, awards.fairwork.gov.au, www.privatehealth.gov.au, www.abr.gov.au, abr.gov.au, abr.business.gov.au, immi.homeaffairs.gov.au, www.studyaustralia.gov.au, www.servicesaustralia.gov.au, www.austrac.gov.au, www.acma.gov.au.
- Markdown links in the German file: 610 internal links, all under `/de/...`; 7 external (6 ATO, 1 Fair Work). No other targets.
- Email addresses: none.
- Phone numbers: public agency lines only, no private or business numbers. Locations: de/blog/data.ts 549, 812, 858, 921, 7247; en/batch-00.ts 884; en/batch-03.ts 77, 172, 243, 244, 263, 340, 341, 362, 451, 697; en/batch-06.ts 833, 921, 1020; en/batch-08.ts 595, 677, 770, 863, 976, 997, 1052; en/batch-09.ts 327, 513, 602; vi/batch-08.ts 538, 611, 696, 781, 885, 906, 952; zh/batch-00.ts 782. No `wa.me` links.
- Key or token shapes: none. Every 40+ character match is a URL path or an article slug.
- TFN-like or account-like numbers: none. The four matches (en/batch-03.ts 267, en/batch-08.ts 1001, en/batch-10.ts 497, de/blog/data.ts 235) are a date inside a Fair Work URL and a number range in prose.
- Cross-brand: no "Student Visa Tax" or "Mia" in the German Working Holiday file; no "Working Holiday Tax" in the six English SVT batches.

## Findings

### CONTENT-02-F01: Refund guarantee is published without the "TFN-only returns" limit (Vietnamese pricing guide)
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the wording); whether it breaks the business rule depends on the rule in the brief
- CWE: n/a (business-logic / misleading representation)
- Files and lines: src/lib/svt/content/guides-vi.ts:12, :24-27
- Evidence: The page meta description (line 12) lists both prices, "$220 ... $385 nếu có việc ABN", and then says that if the refund is lower than the fee "chúng tôi trả lại phần chênh lệch" (we pay back the difference). The guarantee section (lines 24-27) repeats the promise with a $220 example. Nothing says it applies only to TFN-only returns. The only stated limit is the note at line 27: no refund or tax owing means the full fee applies.
- Root cause: The Vietnamese text mirrors the English source, which has the same unrestricted wording (guides-en.ts:83-88, home-en.ts:43-52, both outside this unit).
- Attack prerequisites: none. A customer with an ABN return ($385) reads the page and claims the difference.
- Impact: A promise wider than the business intends, in public marketing copy and in the page's meta description. Risk of customer disputes and of a misleading-conduct complaint.
- Recommended fix: State in the guarantee section and in the meta description that the guarantee covers TFN-only returns ($220), in all three languages and in the English source.
- Regression test: A content test that fails when a guarantee block or a meta description mentions the guarantee without the TFN-only wording.
- Limits of this verification: I did not read the Chinese guide or the home pages in full. I did not check whether another page (terms, FAQ) carries the limit.

### CONTENT-02-F02: Worked example uses a tax figure that contradicts the same file's own rates
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/lib/svt/content/long/en/batch-06.ts:229-231, :240 (compare :223 and :468)
- Evidence: Example 2 says, for a taxable income of $20,000, "say the tax on that income works out at $6,000", and line 240 values an extra $500 deduction at "30% of $500". Example 1 (line 223) uses resident rates ($1,888 on $30,000), and line 468 of the same file gives $288 of tax on $20,000 at resident rates. $6,000 on $20,000 is a flat 30%, which is the foreign resident rate, but the text does not say so.
- Root cause: Two illustrations in one article use different residency assumptions without saying it.
- Attack prerequisites: none.
- Impact: A reader can take away a small business offset ($384) and a deduction value (30%) that are far too high for a resident student. The same figures may exist in the Vietnamese and Chinese translations of this article (not in this unit, not checked).
- Recommended fix: State the residency assumption in Example 2, or use resident figures consistent with Example 1.
- Regression test: n/a (editorial review).
- Limits of this verification: Arithmetic checked against the rates quoted in the file itself, not against the ATO.

### CONTENT-02-F03: Tax and wage figures that could not be checked against the ATO or Fair Work
- Severity: INFORMATIONAL
- Confidence: low
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines:
  - National minimum wage $26.44 an hour from 1 July 2026, casual $33.05: en/batch-03.ts:113, :284; en/batch-06.ts:974; de/blog/data.ts:4989
  - Penalty unit $364 from 1 July 2026 ($330 before), cap $1,820: en/batch-09.ts:815, :816, :834, :887; de/blog/data.ts:3847, :9101
  - Tax Help income limit "about $70,000": guides-vi.ts:36, :195
  - Car rate 88 cents per km for 2025-26, 5,000 km cap: en/batch-06.ts:96, :123; en/batch-10.ts:228
  - No-TFN withholding 47% (45% plus 2%) "for 2026-27": en/batch-00.ts:51, :340, :395, :402, :466, :615, :717, :902
  - 2025-26 resident rates (16% and 30% bands) and low income tax offset thresholds ($700, $37,500, $45,000, $66,667): en/batch-06.ts:438-476
  - Small business income tax offset 16%, cap $1,000: en/batch-06.ts:190-202
  - Amendment period "4 years for sole traders from 2024-25": en/batch-06.ts:246, :608, :622
  - ATO payment plan limit $200,000: en/batch-06.ts:685, :750; en/batch-09.ts:875
  - "From 2026-27, you need written evidence for all ..." (rule change for work expenses): en/batch-08.ts:1075
  - Tax-free threshold $18,200 for 2025-26, Medicare levy 2%, GST threshold $75,000, DASP rates 35% / 45% / 65%, DASP paid within 28 days, MES processing up to 8 weeks: guides-vi.ts:86, :103, :112, :119, :159, :266, :277-278
  - Working holiday maker rate 15% to $45,000, foreign resident 30%, super 12%: de/blog/data.ts:83, :610, :1587, :6565
- Evidence: Figures are stated as current facts. None looked plainly wrong to me, and the German and English files agree with each other on the shared figures. I could not confirm any of them.
- Root cause: n/a
- Attack prerequisites: n/a
- Impact: If any figure is wrong or goes out of date, it is repeated across languages.
- Recommended fix: Check the list against the ATO and Fair Work pages cited in each article, and against docs/content/svt-facts-2026-10.md (named in guides-vi.ts:3, not opened).
- Regression test: A test that compares figures in content with one facts file.
- Limits of this verification: No network. The list comes mostly from grep, so figures in unread ranges may be missing from it.

## Checked and found sound
- No statement that the business itself is a registered tax agent. The wording is "supervised by a registered tax agent" and "reviewed and signed off by a registered tax agent": guides-vi.ts:43, 54, 72, 218, 296, 305, 310; en/batch-06.ts:615; en/batch-09.ts:927; de/blog/data.ts:226. Other mentions are generic (grep over all 15 files, 138 hits by file count; first-person patterns such as "we are", "wir sind", "our tax agent" returned nothing relevant).
- Prices: only $220 and $385 appear as service prices (guides-vi.ts:12, 18, 19, 25, 35, 39, 141, 163, 173). No service price in the long articles or in the German file. The "$330" hits in de/blog/data.ts:3847, 9101 and en/batch-09.ts:834 are the old penalty unit, not a price.
- No refund promise or guarantee in the long articles or the German file (grep for guarantee, garantie, money-back, bảo đảm, cam kết, 保证 and similar over all files: only super guarantee and minimum wage guarantee). guides-vi.ts:201 says a refund is not certain.
- guides-vi.ts:31, 306 say the business never asks for a myGov password and never takes the fee from the refund.
- No raw HTML, script, handler, `javascript:` or `data:` content in any file; all external links are https to government domains.
- de/blog/data.ts:9132-9164: helper functions only look up by slug in static arrays; no user input reaches HTML here.

## Open questions
- About 90% of the lines were not read line by line (see Coverage). A full read of de/blog/data.ts (9,167 lines), the five other English batches and the six Vietnamese and Chinese batches is still needed for the tax-figure and wording checks.
- How article `body` Markdown is turned into HTML was not reviewed (renderer is outside this unit). The content here holds no HTML, so the risk depends on the renderer only.
- guides-vi.ts:30 and :50 name the payee as "The Accounting Academy", while :305 names the agent as "The Accounting Academy Services Pty Limited". Confirm which name customers should see on the bank transfer.
- guides-vi.ts:22, 216, 284: prices for past years and for DASP are "confirmed on WhatsApp" and not stated. Confirm these always resolve to the approved price list.
