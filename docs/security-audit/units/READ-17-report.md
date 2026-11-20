# READ-17 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/abn/page.tsx | 1-489 | 1-489 | REVIEWED |
| src/app/(es)/es/blog/chunks/03.ts | 1-481 | 1-481 | REVIEWED |
| src/app/(es)/es/blog/chunks/14.ts | 1-482 | 1-482 | REVIEWED |
| src/app/(es)/es/tax-return/page.tsx | 1-490 | 1-490 | REVIEWED |
| src/app/(fr)/fr/abn/page.tsx | 1-483 | 1-483 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/03.ts | 1-490 | 1-490 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/14.ts | 1-484 | 1-484 | REVIEWED |
| src/app/(fr)/fr/tax-return/page.tsx | 1-482 | 1-482 | REVIEWED |
| src/app/(it)/it/abn/page.tsx | 1-473 | 1-473 | REVIEWED |
| src/app/(it)/it/blog/chunks/14.ts | 1-483 | 1-483 | REVIEWED |
| src/app/(it)/it/tax-return/page.tsx | 1-473 | 1-473 | REVIEWED |

Total: 5,310 of 5,310 lines read. Each file was read in one pass (all are under 700 lines).

Files opened outside the unit, only to judge a finding: `src/components/wht/Blocks.tsx` (key lines only), `src/components/blog/newLocaleDefaults.ts` (`localePath`), `src/app/(it)/it/_blog-links.ts` (`itGuideHref`), and directory listings or slug greps under `src/app/(de|es|fr|it)`.

No network was used. Every tax, wage and legal fact below is unverified against an official source.

## Findings

### READ-17-F01: Refund arrival time stated on three tax-return pages
- Severity: MEDIUM
- Confidence: high (the text is there); medium (whether the owner accepts hedged timing)
- Files and lines:
  - `src/app/(es)/es/tax-return/page.tsx`: 62 (Open Graph), 68 (Twitter), 126 (step 07, also emitted in HowTo JSON-LD), 185, 215 (FAQ, also in FAQ JSON-LD)
  - `src/app/(fr)/fr/tax-return/page.tsx`: 30 (meta description), 67, 73, 131, 190, 361 (hero lede)
  - `src/app/(it)/it/tax-return/page.tsx`: 61, 67, 125, 178, 353 (hero lede), 365
- Evidence: each says a refund "usually" arrives about 14 business days after lodgment. FR line 73 is the tightest wording ("en général sous 14 jours ouvrés"). The wording is hedged, and some lines attribute it to the ATO, but it is a timing statement in the hero, meta description and structured data.
- Recommended fix: owner decision. Either remove the day count from hero, meta and JSON-LD and leave it only in the sourced "ATO processing" row, or attribute it to the ATO everywhere with one consistent number (see F05).

### READ-17-F02: Refund amounts quoted
- Severity: MEDIUM
- Confidence: high
- Files and lines:
  - `src/app/(fr)/fr/tax-return/page.tsx`: 403
  - `src/app/(it)/it/tax-return/page.tsx`: 381
  - `src/app/(fr)/fr/blog/chunks/03.ts`: 148
- Evidence: the FR and IT pages say client refunds range "from a few hundred to several thousand dollars". Code comments at FR 137-138 and IT 131-132 say this sentence is owner-approved wording. The ES page has no such sentence. FR chunk 03 line 148 gives a worked example ending in 1 200 $ over-withheld; the arithmetic is correct and line 150 says no refund is promised.
- Recommended fix: confirm the owner approval still stands under the "no refund figure" rule. If not, drop the range sentence from both pages.

### READ-17-F03: "Do I have to lodge" rule differs between languages
- Severity: LOW
- Confidence: medium
- Files and lines:
  - `src/app/(fr)/fr/blog/chunks/03.ts`: 94
  - `src/app/(es)/es/blog/chunks/03.ts`: 94, 146, 369, 384
- Evidence: the FR article says the ATO requires a working holiday maker to lodge when taxable income reaches 45 001 $. The same article in ES says the ATO expects a return whenever any tax was withheld. Inside the ES file, line 146 says a return must be lodged with Australian income, while lines 96 and 384 say there are cases where none is needed.
- Recommended fix: check the ATO lodgment rule for the current year and use one statement in both languages.

### READ-17-F04: Early (pre-30 June) return described differently
- Severity: LOW
- Confidence: medium
- Files and lines:
  - `src/app/(fr)/fr/blog/chunks/03.ts`: 419, 456
  - `src/app/(es)/es/blog/chunks/03.ts`: 410, 447
  - `src/app/(es)/es/tax-return/page.tsx`: 189
- Evidence: FR line 456 says an early return "brings the refund forward", and line 419 says its figures come from your own payslips. ES says a self-lodged early return goes on paper with 50 business days of processing, and that the ATO warns payslips are not enough.
- Recommended fix: align the FR text with the ES text after checking the ATO page already linked at ES page line 405.

### READ-17-F05: Three different ATO processing times
- Severity: LOW
- Confidence: high
- Files and lines:
  - 10 business days: `src/app/(es)/es/tax-return/page.tsx`: 185
  - about 12 business days: `src/app/(es)/es/blog/chunks/03.ts`: 214, 451; `src/app/(fr)/fr/blog/chunks/03.ts`: 221, 460
  - about 14 business days to refund: the lines in F01
- Evidence: the FR lines give the 12 days without attributing it to the ATO; the ES lines attribute it.
- Recommended fix: pick the current ATO figure and use it in all three places.

### READ-17-F06: Finalisation date contradicts itself in the Spanish article
- Severity: LOW
- Confidence: high
- Files and lines: `src/app/(es)/es/blog/chunks/03.ts`: 251, 257
- Evidence: line 251 says employers have until 14 July to finalise. Line 257 says an income statement still in progress "after 31 July" means the employer missed the obligation. The FR version uses 14 July in both places (FR chunk 03 lines 260, 266).
- Recommended fix: change ES line 257 to 14 July.

### READ-17-F07: Visa health-cover requirement contradicts itself
- Severity: LOW
- Confidence: high
- Files and lines:
  - `src/app/(it)/it/blog/chunks/14.ts`: 342, 377, 381
  - `src/app/(fr)/fr/blog/chunks/14.ts`: 346, 379, 383
  - `src/app/(es)/es/blog/chunks/14.ts`: 377, 381
- Evidence: IT line 342 says the visa requires adequate health cover as a condition of grant, with no qualifier. IT line 381 says condition 8501 is applied case by case and is only recommended when absent. FR line 346 says it depends on the subclass. All three languages open the insurance article with "depends on the visa subclass" and then say not to rely on the subclass.
- Recommended fix: use the condition 8501 wording (ES line 342 is the cleanest) in IT 342 and FR 346, and reword the three opening sentences.

### READ-17-F08: Medicare levy basis stated differently in Italian
- Severity: LOW
- Confidence: medium
- Files and lines:
  - `src/app/(it)/it/blog/chunks/14.ts`: 269, 352, 428
  - compare `src/app/(es)/es/blog/chunks/14.ts`: 269, 348 and `src/app/(fr)/fr/blog/chunks/14.ts`: 273, 352
- Evidence: the IT text says the 2% levy "applies to those entitled to Medicare". ES and FR say it applies to tax residents, with an exemption for residents without Medicare entitlement. The IT version looks like an over-simplification.
- Recommended fix: use the ES and FR formulation in IT.

### READ-17-F09: Recording-law example names different states
- Severity: LOW
- Confidence: medium
- Files and lines: `src/app/(es)/es/blog/chunks/14.ts`: 94; `src/app/(it)/it/blog/chunks/14.ts`: 94; `src/app/(fr)/fr/blog/chunks/14.ts`: 96
- Evidence: ES and IT say a recording legal in Queensland may be illegal in Victoria. FR says one legal in Queensland or Victoria may be illegal in New South Wales.
- Recommended fix: check the state rules and use one example.

### READ-17-F10: Whether a TFN is required before an ABN
- Severity: LOW
- Confidence: medium
- Files and lines: `src/app/(de)/de/abn/page.tsx`: 108, 172, 187; `src/app/(fr)/fr/abn/page.tsx`: 122, 194; `src/app/(it)/it/abn/page.tsx`: 171, 216, 409-411
- Evidence: DE and FR say you need the TFN first. IT says the TFN is not mandatory for the ABN application but speeds identification.
- Recommended fix: check the ABR rule and align DE and FR, or IT.

### READ-17-F11: Facts that look dated or could not be checked
- Severity: LOW
- Confidence: low (no network)
- Files and lines:
  - National minimum wage "26,44" and casual "33,05" from 1 July 2026: ES chunk 14 line 127; FR chunk 14 line 131; IT chunk 14 line 127; FR abn page line 109. The two numbers are consistent with each other (25% loading).
  - 1 000 $ standard deduction from 2026-27, and the 300 $ no-receipt concession described as running "up to 2025-26": ES chunk 03 lines 313, 356; FR chunk 03 lines 322, 365.
  - Joint ATO and Fair Work Ombudsman sham-contracting announcement dated 13 March 2026: IT abn page line 352.
  - Ola and Menulog named as current platforms: ES chunk 03 lines 21, 23; FR chunk 03 lines 21, 23. I believe both have left the Australian market, but could not confirm.
  - "15% ... dal 1° luglio 2026": IT abn page line 322. This reads as if the rate started on that date; FR abn line 108 says "unchanged at 1 July 2026".
  - DASP "can be paid to an overseas account" without condition: ES page lines 165, 196; IT page lines 164, 198. FR page lines 176, 205, 430 add "if your fund offers it".
  - Agent deadline: ES chunk 03 line 445 says missing October "is rarely the problem"; line 404 of the same file says the extension applies only if you were on an agent's list before 31 October.
  - 47% no-ABN withholding stated without the 75 $ threshold: IT abn page lines 166, 218, 320. DE abn lines 118, 126, 192 include it.
- Recommended fix: verify each against the ATO, ABR and Fair Work sites and correct or date-stamp.

### READ-17-F12: Phone number of a private medical service
- Severity: LOW
- Confidence: high
- Files and lines: `src/app/(es)/es/blog/chunks/14.ts`: 440; `src/app/(fr)/fr/blog/chunks/14.ts`: 442; `src/app/(it)/it/blog/chunks/14.ts`: 441
- Evidence: type is a phone number for an after-hours home doctor service, which is a private company, not a public agency line. The same lines carry the emergency number and the government health advice line, which are fine. I could not check that the private service still operates under that number.
- Recommended fix: remove the private number, or confirm it and accept it as an exception.

### READ-17-F13: Duplicate guide link and duplicate React key on the Italian page
- Severity: LOW
- Confidence: high
- Files and lines: `src/app/(it)/it/tax-return/page.tsx`: 241, 266; `src/components/wht/Blocks.tsx`: 67
- Evidence: `GUIDES` lists the slug `late-tax-return-penalty-working-holiday` twice under two titles. `LinkRows` uses `key={it.href}`, so two rows share a key.
- Recommended fix: remove one entry or point it at a different guide.

### READ-17-F14: Fee agreed "before step 01" but step 01 is where it is agreed
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: ES page 96 vs 446; FR page 101 vs 439; IT page 95 vs 434
- Evidence: step 01 says the fee is agreed in that first WhatsApp exchange; the guarantee band says it is agreed before step 01.
- Recommended fix: say "in step 01" or "before any work starts".

### READ-17-F15: Paragraph order under the French ABN warning heading
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: `src/app/(fr)/fr/abn/page.tsx`: 366-376
- Evidence: the heading asks whether to open an ABN because an employer asks. The first paragraph says when an ABN is normal; the direct answer ("Pas avant que quelqu'un ait regardé le job") only comes in the second paragraph, so it reads as a non sequitur.
- Recommended fix: swap the two paragraphs.

## Notes

Checked and found sound across all eleven files:
- **Registered-agent claim:** no file says the business is itself a registered tax agent. All use supervision wording (for example DE abn 426-427, FR abn 420, FR page 235 and 445, IT page 208 and 440, IT abn 442-443, ES page 121 and 225).
- **Guarantee:** every guarantee statement carries the TFN-only limit (DE abn 439, FR abn 432, IT abn 418, ES page 444, FR page 437, IT page 432).
- **Prices:** the only service price is 385 $ for a return with ABN income (DE abn 439, FR abn 432, IT abn 418). The tax-return pages show no price.
- **Markup and links:** no raw HTML, iframe, event handler, `javascript:` or `data:` URL, `http://` link or email address. External links are `ato.gov.au` and `tpb.gov.au` over https with `rel="noopener noreferrer"`. Nothing shaped like a key, TFN or bank account.
- **TSX pages:** none use `params` or `searchParams`. Every `dangerouslySetInnerHTML` is JSON-LD through `jsonLdHtml`.
- **Typography and language:** no em or en dashes (grep for U+2013 and U+2014 returned nothing). No TODO, lorem or XXX. Each file is in its own language; the German insurance terms in the three chunk 14 files are intentional, and the English code comments are not customer-facing.
- **Internal links:** hardcoded links I checked resolve to existing routes or slugs (DE guide slugs, FR `abn-invoicing-requirements-australia` and `diy-tax-return-vs-tax-agent-working-holiday`, FR and IT `expenses/delivery-drivers`, the ES anchors `abroad-title` and `faq-title`). Unprefixed article links such as `/tax-return` appear to be localised by `localePath`; I did not trace the renderer.
- **Reply-time wording:** "about an hour" appears on every page (DE abn 341, 483; FR abn 339, 477; FR page 364, 476; IT abn 308, 467; IT page 356, 467). Only ES adds "in business hours" (ES page 362, 484). This is not a refund promise, so it is not raised as a finding.
