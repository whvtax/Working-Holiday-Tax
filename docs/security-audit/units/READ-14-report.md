# READ-14 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/tax-return/page.tsx | 1-537 | 1-537 | REVIEWED |
| src/app/(es)/es/blog/chunks/15.ts | 1-535 | 1-535 | REVIEWED |
| src/app/(es)/es/blog/chunks/16.ts | 1-541 | 1-541 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/16.ts | 1-545 | 1-545 | REVIEWED |
| src/app/(fr)/fr/tax-return-australie-pvt/page.tsx | 1-563 | 1-563 | REVIEWED |
| src/app/(it)/it/blog/chunks/15.ts | 1-539 | 1-539 | REVIEWED |
| src/app/(it)/it/blog/chunks/16.ts | 1-541 | 1-541 | REVIEWED |
| src/app/(it)/it/blog/chunks/17.ts | 1-537 | 1-537 | REVIEWED |
| src/app/(it)/it/superannuation/page.tsx | 1-545 | 1-545 | REVIEWED |
| src/lib/svt/content/guides-en.ts | 1-574 | 1-574 | REVIEWED |

10 of 10 files, 5,457 of 5,457 lines read. Each file was read in one pass (all are under 600 lines).

## Findings

### READ-14-F01: SVT pricing guide states the refund guarantee with no "TFN-only returns" limit
- Severity: MEDIUM
- Confidence: high
- Files and lines: src/lib/svt/content/guides-en.ts:65 (meta description), :84-88 (section "If your refund is smaller than our fee")
- Evidence: the meta description lists both the $220 and the $385 product and then says "If your refund is smaller than our fee, we pay you the difference." The guarantee section repeats "We pay you the difference" and its only conditions are no refund / tax owing. Nothing limits it to TFN-only returns, so it reads as covering the $385 ABN return. The worked example happens to use $220 but does not state the limit.
- Recommended fix: add "The guarantee applies to TFN-only returns" to the section and to the meta description (or drop the guarantee sentence from the description).

### READ-14-F02: Guarantee limit worded "returns with TFN income", not "TFN-only returns"
- Severity: MEDIUM
- Confidence: medium
- Files and lines: src/app/(de)/de/tax-return/page.tsx:275, 500; src/app/(fr)/fr/tax-return-australie-pvt/page.tsx:474; src/app/(it)/it/superannuation/page.tsx:503
- Evidence: "nur für Steuererklärungen mit TFN-Einkommen" / "qu'aux déclarations avec revenus sous TFN" / "solo per le dichiarazioni con reddito TFN". A TFN+ABN return also contains TFN income, so the sentence can be read as covering the $385 product.
- Recommended fix: say "only TFN income" in each language (ausschließlich / uniquement / solo reddito TFN).

### READ-14-F03: Refund timing "about 14 working days" in hero and social metadata, and it contradicts "10 working days" in the same file
- Severity: MEDIUM
- Confidence: high that the text is there; medium on whether the wording is owner-approved
- Files and lines: de/tax-return/page.tsx:67, 73, 131, 225, 408 (14 Werktage) versus :184 (10 Arbeitstage); HowTo `totalTime: 'P14D'` at :360. fr/tax-return-australie-pvt/page.tsx:133, 191, 347.
- Evidence: hedged ("meist", "en général") and attributed to the ATO, but it is a refund timing statement placed in the hero, the OG and Twitter descriptions and the HowTo schema. The DE key-figures row gives a different ATO figure.
- Recommended fix: one figure everywhere, matching the ATO's published wording; remove it from hero/OG text; align `totalTime`. Could not check the ATO figure (no network).

### READ-14-F04: Same-file contradictions on deductibility of the RSA course and on who gets the 1,000 AUD standard deduction
- Severity: LOW
- Confidence: medium
- Files and lines:
  - it/blog/chunks/16.ts:413 ("if you paid it for the work you do, the cost is deductible") versus :436 (first course not deductible, renewal only).
  - it/blog/chunks/17.ts:456 (RSA cost deductible for liquor work) versus :56 (first RSA not deductible).
  - fr/blog/chunks/16.ts:415, 438 (RSA course deductible, no first-certificate caveat); ES 16.ts:413 has the caveat.
  - fr/blog/chunks/16.ts:66 (standard deduction is for Australian tax residents, ATO decides) versus :382 ("for many farm hands the flat amount is the reasonable choice", no caveat).
  - es/blog/chunks/16.ts:6 (deduction "exists") versus :66 ("is planned") and :101 ("rules still being finalised"); it 16.ts:6, 66 and :101 same pattern.
- Recommended fix: carry the ES caveats into FR and IT; pick one tense for the deduction.

### READ-14-F05: "Must I lodge?" answered differently across pages
- Severity: LOW
- Confidence: medium
- Files and lines: fr/tax-return-australie-pvt/page.tsx:110, 156, 206, 346, 362, 374 (no lodgment needed under 45,001 AUD with only WHM wages, cites an ATO page updated 3 June 2026) versus de/tax-return/page.tsx:215, 421 (tax withheld means you generally must lodge), es 15.ts:463 and it 15.ts:467 ("in most cases, yes").
- Recommended fix: confirm the threshold on ato.gov.au and align DE, ES, IT. Could not check.

### READ-14-F06: Figures that look dated or that I could not verify (no network)
- Severity: LOW
- Confidence: low
- Files and lines:
  - Penalty unit 364 AUD from 1 July 2026 (was 330): es 15.ts:358, 370-374, 437; it 15.ts:358, 374-378, 441.
  - National minimum wage 26.44 and casual 33.05 from 1 July 2026 (about 6% above the previous year, looks high): es 16.ts:356, 407; fr 16.ts:356, 409; it 15.ts:150; it 16.ts:246, 337, 356, 407; it 17.ts:88, 484.
  - 91 cents per km from 1 July 2026: es 16.ts:84, 88; fr 16.ts:84, 88, 148; it 16.ts:84, 88.
  - Draft ruling "LCR 2026/D5": es 16.ts:66. Medicare low-income threshold 28,011 for 2025-26: fr page :122.
  - State ride-share authorisation names: it 17.ts:295. MES processing "up to 8 weeks": guides-en.ts:241, 272.
- Recommended fix: verify each against ato.gov.au, fairwork.gov.au and Services Australia.

### READ-14-F07: Translations of the same article disagree
- Severity: LOW
- Confidence: medium
- Files and lines:
  - 88-day counting: es 16.ts:272 (calendar days, weekends included) versus fr 16.ts:272 and it 16.ts:246, 272 (standard full working days; short days add up).
  - Late penalty with a refund: es 15.ts:358 (ATO generally does not issue it) versus it 15.ts:358 ("can apply even when the ATO owes you money").
  - ABN bike purchase: es 16.ts:136 separates employee (300 AUD) from ABN (instant asset write-off); fr 16.ts:136 and it 16.ts:136 do not.
- Recommended fix: align to one source text. Could not check which is right.

### READ-14-F08: Wording that leans towards an outcome promise
- Severity: INFORMATIONAL
- Files and lines: it/superannuation/page.tsx:93 ("we chase every fund until it pays"); it 16.ts:237 (the last-year return is "separate money and usually better news"); fr 16.ts:498 ("cafés are the worst offenders in Australia"; ES :496 and IT :496 are softer); service-time statements "about 24 hours" (guides-en.ts:129, 152, 161) and "reply in about an hour" (de :411, 531; fr :350, 554; it super :299, 513, 539).
- Recommended fix: soften the first three; confirm the response-time statements are intended.

## Notes
- Mechanical scan of all ten files: no em or en dashes; no http:// links; external domains are only ato.gov.au, servicesaustralia.gov.au, schema.org and tpb.gov.au (fr page :528, guides-en.ts:567); no iframe, event handler, javascript: or data: URL; no email address or phone number; no TODO/lorem/XXX; nothing shaped like a key, TFN or bank account.
- .tsx pages: no use of params or searchParams. Every dangerouslySetInnerHTML (de :391-395, fr :329-333, it superannuation :266-269) is JSON-LD passed through `jsonLdHtml`. External anchors carry rel="noopener noreferrer".
- No statement that the business itself is a registered tax agent. Wording is "reviewed and approved/signed off by" or "under the supervision of" a registered tax agent (de :126, 194, 245, 506; fr :481, 524, 527; es 15.ts:467; it 15.ts:471; it super :507; guides-en.ts:131, 409, 561).
- Prices found: 220 and 385 only (fr page :462, 466; guides-en.ts:65, 75-76, 86, 101, 108, 280, 318, 334). No other service price.
- guides-en.ts:567 hard-codes the TPB registration number as a literal (a public register number, type only noted) while fr page :527-528 uses the `AGENT_TPB` constant; two places to keep in step. guides-en.ts:95, 127, 561 name the supervising entity as payee, public business name only.
- it/superannuation/page.tsx:360-365 shows net DASP amounts (65% withheld) labelled as illustrations, not a quote; these are super figures, not tax refund figures.
- guides-en.ts:554 contains two language names in their own script inside an English file; intentional.
- Article bodies in ES, FR and IT link to unprefixed paths (/tax-return, /blog/..., /calculator), while es 15.ts:410, 463 and it 15.ts:358, 421 use /es/... and /it/...; I did not open the renderer to see whether a locale prefix is added.
- fr page :331 is a whitespace-only line where a JSON-LD block was removed (cosmetic).
- No text in the wrong language for its file. No instruction-like text found in any file.
