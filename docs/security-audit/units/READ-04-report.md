# READ-04 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(site)/blog/data.ts | 5001-9771 | 5001-5700, 5701-6400, 6401-7100, 7101-7800, 7801-8500, 8501-9150, 9151-9771 | REVIEWED (every assigned line read) |
| src/lib/svt/content/long/zh/batch-04.ts | 1-829 | 1-829 | REVIEWED (every line read) |

Lines read: 5,600 of 5,600 assigned. In addition to the reading, `grep` was run over both ranges for em/en dashes, HTML tags, `javascript:`/`data:`/`http://`, emails, phone-like numbers, service prices, "guarantee", TODO/lorem/XXX.

## Findings

### READ-04-F01: $300 immediate deduction applied to ABN delivery riders, contradicting the same file's ABN rule
- Severity: MEDIUM (tax fact inconsistent inside one file)
- Confidence: medium (the contradiction is certain; which side is right could not be checked, no network)
- Files and lines: src/app/(site)/blog/data.ts:8109, 8137, 8147 (also 7986, 8791) versus 6095, 6128
- Evidence: 6095 says "The $300 immediate deduction is an employee rule; on an ABN ... write off each asset costing less than $20,000". The rider article (8103 defines the rider as "on an ABN") then says the bike "Under $300 ... deductible in full immediately. Above that it is depreciated", calls an $1,800 e-bike "depreciation", and lists "under or over the $300 immediate deduction limit" as a deciding factor.
- Recommended fix: make the rider article (and the Uber Eats list at 8791) use the same ABN rule as 6095/6128, or state clearly which rule applies to ABN riders; have the registered agent confirm.

### READ-04-F02: DASP 65% rate described two different ways
- Severity: LOW
- Confidence: medium (could not check which is correct)
- Files and lines: src/app/(site)/blog/data.ts:6526 versus 8205-8207
- Evidence: 6526: if any part comes from 417/462 contributions "the ATO applies the 65% to the whole payment". 8207: "The rate follows the visa you were on when the contributions were made", which reads as a per-contribution rate.
- Recommended fix: align 8205-8207 with 6526 (or the reverse) after checking the ATO rule.

### READ-04-F03: Casual loading "on top of" weekend penalties contradicts the award articles
- Severity: LOW
- Confidence: high (internal contradiction)
- Files and lines: src/app/(site)/blog/data.ts:8408 versus 7418-7422, 7562, 8455 (same article), 8495; similar loose wording at 8574
- Evidence: 8408: evenings, Saturdays, Sundays, public holidays "with the 25% casual loading on top of each". 7418/7562/8455 say the casual weekend and holiday rates "already include the loading, so the two are not added together".
- Recommended fix: reword 8408 (and 8574) to match.

### READ-04-F04: General Interest Charge worked example does not match "compounds daily"
- Severity: LOW
- Confidence: medium (arithmetic only; the 11.51% rate itself could not be checked)
- Files and lines: src/app/(site)/blog/data.ts:9239-9241
- Evidence: at 11.51% the text gives "roughly $115" after one year and "roughly $370" after three on $1,000. $115 is simple interest; three years compounded is about $387 (annual) to $410 (daily), not $370.
- Recommended fix: recompute both figures on a daily compounding basis, or say "roughly" with correct numbers.

### READ-04-F05: Dated or year-specific tax and wage figures that could not be verified
- Severity: LOW (verification item, not a confirmed error)
- Confidence: low (no network)
- Files and lines (data.ts): penalty unit $364 from 1 July 2026 and $1,820 cap (5269, 7688, 7694, 7706-7710, 7803, 9251); minimum wage $26.44 / casual $33.05 from 1 July 2026 (5334, 5340, 5404, 5505, 5511, 5524, 6925, 8350, 8410, 8642, 9076, 9679, 9686); cents per kilometre 91c (8051, 8055); GIC 11.51% for Oct-Dec 2026 (9239); $20,000 write-off "made permanent from 1 July 2026" (6095); $1,000 standard deduction from 2026-27 with "rules still being finalised" (8033-8068); "must lodge if taxable income $45,001 or more" (7883, 9614); early return "50 business days" (9464); SGC uplift "starts at 60%" (6673); Tourist Refund Scheme "goods over $300" (9727; I believe the rule is $300 or more, unchecked).
- Files and lines (zh/batch-04.ts): Medicare Entitlement Statement "up to 8 weeks" (695); employer must give a payment summary within 14 days on request when leaving (104, 418); Payday Super 20 business days for a new employee (792).
- Evidence: all internally consistent across the places listed ($364 x 5 = $1,820; $26.44 x 1.25 = $33.05), but each is a figure that changes by year.
- Recommended fix: one sign-off against ATO / Fair Work sources by the registered agent; 8068 itself admits the rules were not final when written.

### READ-04-F06: Dated phrases that will go stale
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(site)/blog/data.ts:7698, 7834, 7839, 9333, 9462, 9619 ("31 October 2026 ... has now passed"); 5269 ("currently $364 from 1 July 2026")
- Evidence: hard-coded "has now passed" statements are correct today and wrong again from July 2027.
- Recommended fix: date-drive these strings or add them to the yearly content checklist.

### READ-04-F07: Non-agency phone number in an article
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(site)/blog/data.ts:7262
- Evidence: a private after-hours doctor service is named with its 13-number (type: commercial service phone number). The other numbers in range are public lines: ATO identity support (5803, 5919), healthdirect (7262), emergency numbers (7260); in the zh file the ATO scam line (212, 230) and Fair Work (302).
- Recommended fix: decide whether to keep a commercial service number; remove or replace with healthdirect only.

### READ-04-F08: Service scope stated two ways (wage recovery)
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/app/(site)/blog/data.ts:9696 versus 7035; also 7887
- Evidence: 9696 (Work Rights FAQ): "our team can help you escalate through the right channels" for underpayment. 7035: "Our part is the tax and super side; wage recovery runs through Fair Work." 7887: "Working holiday tax is the only thing we do".
- Recommended fix: reword 9696 to point to the Fair Work Ombudsman.

## Notes
- Rule 1 (business as registered agent): no statement found that the business itself is a registered tax agent or accountant. Supervision wording only: data.ts 5913, 7815, 7887; zh 521. Generic mentions of registered agents elsewhere. data.ts 9504 ("A registered tax agent works from the same ATO record...") is generic but sits in a section selling the service; acceptable, flagged for awareness.
- Rule 2: no refund guarantee and no refund promise found. "Guarantee" appears only for the piece-rate wage floor and the Superannuation Guarantee. Timing statements are all attributed to the ATO, not promised by the business: data.ts 5219, 5654, 6637, 8169, 9335, 9450; zh 649, 672-683. Illustrative figures, not promises: data.ts 6494-6505 (DASP examples, labelled "not a quote"), 9440 ("about $800 on $40,000" levy value).
- Rule 3: no service prices in either range. "$330" in data.ts 7694/7803 is the old penalty unit; "$495.00" in zh 265 is net pay in a made-up payslip example.
- Rule 6: no raw HTML, script, iframe, event handlers, `javascript:`, `data:` or `http://` links, no emails, nothing shaped like a key, TFN or bank account. External links are six `https://www.ato.gov.au/...` URLs only (data.ts 7714, 7762, 7768, 7790, 7801/7803, 7809). All other links are site-relative.
- Rule 7: no em or en dashes in customer-facing text in either range (box-drawing characters appear only in code comments). No TODO/lorem/XXX. zh/batch-04.ts is Simplified Chinese throughout, with English terms in brackets only. data.ts 9130-9131 has an empty section comment ("BATCH 4: SUPER RATE UPDATE") with no articles under it: harmless leftover.
- Rule 8: not applicable (no .tsx in this unit). data.ts 9740-9771 are plain lookup helpers with no user input handling beyond a slug match.
- Internal links to other articles and pages were not checked for existence (targets are outside this unit).
- Tax and wage facts were checked only for internal consistency; nothing was verified against outside sources.
