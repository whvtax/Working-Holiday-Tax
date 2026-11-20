# READ-06 report

## Coverage

| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/blog/data.ts | 5001-9167 | 5001-9167 (chunks 5001-5500, 5501-6000, 6001-6500, 6501-7000, 7001-7500, 7501-8000, 8001-8500, 8501-8920, 8921-9167) | REVIEWED, every line read |
| src/lib/svt/content/blog-en.ts | 1-1137 | 1-1137 (chunks 1-400, 401-770, 771-1137) | REVIEWED, every line read |

Lines read: 5,304 of 5,304 assigned. In addition to reading, both ranges were pattern-searched (grep only) for dashes, markup, script and URL schemes, external domains, emails, phone-shaped and long digit strings, prices, and guarantee or profession wording.

## Findings

No CRITICAL, HIGH or MEDIUM findings. 8 LOW, 3 INFORMATIONAL. Tax and wage facts could not be checked against any source (no network); where a finding says "looks wrong", that is from internal arithmetic or internal contradiction only.

### READ-06-F01: RSA article says the fee is deductible, then says the first RSA is not
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:5078 against 5076, 5116, 5124, 5182, 8138, 8321
- Evidence: the opening paragraph ends "und die Gebühr ist absetzbar". The description of the same article, its own deduction section and three other articles say the first RSA is a private cost and only a renewal for a job already held is deductible.
- Recommended fix: reword the end of line 5078 to match (only a renewal is deductible).

### READ-06-F02: White Card and RSA listed as deductible ABN expenses without the "first card" limit
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:6376 against 5054-5056, 5116, 8419, 8454
- Evidence: the ABN expenses list includes "Lizenzen und Karten, die die Arbeit verlangt, etwa White Card oder RSA" with no qualification, while the dedicated articles say the first card is not deductible.
- Recommended fix: add "bei Verlängerung" or drop the two examples.

### READ-06-F03: White Card described two ways (course length, validity)
- Severity: LOW
- Confidence: high (contradiction), not checked (which is right)
- Files and lines: src/app/(de)/de/blog/data.ts:5026, 5042, 5048 against 8417, 8419
- Evidence: the White Card article says a course of a few hours, no expiry, at most a refresher after a long break. The construction article says a full day in person or online equivalent, and that the card lapses after two years without construction work.
- Recommended fix: check the regulator wording and align both articles.

### READ-06-F04: Superannuation guarantee charge deductibility stated two ways
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:5459-5461 against 6753
- Evidence: 5461 says the core charge is deductible since July 2026 and only penalties and interest are not. 6753 says the charge is "gegen die Steuer des Arbeitgebers nicht absetzbar", with no date limit, in an article that otherwise describes the post July 2026 rules.
- Recommended fix: check the ATO source, then align 6753 with 5459-5461.

### READ-06-F05: $300 immediate deduction applied to an ABN rider's bicycle, contradicting the ABN expenses article
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/blog/data.ts:7802 and 7868 against 6386 and 6419
- Evidence: 6386 says ABN business assets go through small business depreciation or the instant asset write-off, "nicht über die 300-$-Regel, die nur für nicht betriebliche Gegenstände gilt". 7802, in a section about an ABN delivery rider, says a bike under $300 is immediately deductible and anything above is depreciated over three to five years. 6419 in the same article as 6386 also uses the $300 line as the test.
- Recommended fix: decide which rule the site states for ABN assets and use it in all three places.

### READ-06-F06: DASP rate history given as "from 35 %" in one place and "from 38 %" in another
- Severity: LOW
- Confidence: high (contradiction)
- Files and lines: src/app/(de)/de/blog/data.ts:6324 against 6571
- Evidence: 6324 says the rate rose from 38 % (35 % plus the temporary levy) to 65 %; 6571 says from 35 % to 65 %.
- Recommended fix: use one wording.

### READ-06-F07: Minimum wage figure and the stated award rise do not look consistent
- Severity: LOW
- Confidence: low (could not check; no network)
- Files and lines: src/lib/svt/content/blog-en.ts:1098, 1104, 1133; same wage figure in src/app/(de)/de/blog/data.ts:5388, 6081, 6240, 6246, 6987, 8079, 8353, 8752
- Evidence: the article gives $26.44 an hour and $1,004.90 a week from 1 July 2026 and says most award rates rose 4.75 % from the same date. If the previous national minimum was $24.95 an hour ($948.00 a week), as I recall but could not confirm, $26.44 is a rise of about 6 %, not 4.75 %. Either the wage figure, the percentage, or my recollection of the earlier rate is off. The internal sums are fine: 26.44 x 1.25 = 33.05, and 1,004.90 / 38 rounds to 26.44.
- Recommended fix: re-check both figures against the Fair Work release cited at line 1129.

### READ-06-F08: Refund and payout timing statements (all attributed to the agency, none promised by the business)
- Severity: LOW
- Confidence: high (they exist); a policy call whether they are acceptable
- Files and lines: src/lib/svt/content/blog-en.ts:140, 143, 149-151, 174-175, 181 (ATO return processing: 12 business days, 30 calendar days, 50 business days); 699, 717 (DASP 28 day service standard); 131 (TFN "arrives by post within 28 days", stated flatly, whereas 111 and 124 say "The ATO says you should receive"). src/app/(de)/de/blog/data.ts:7884 (DASP "laut ATO in der Regel innerhalb von 28 Tagen"), 8998 and 9047 (50 Werktage for early returns), 5752 (TRS within 60 days per Border Force).
- Evidence: these are processing times of the ATO, a fund or Border Force, mostly worded "The ATO says" or "laut ATO". The meta description at blog-en.ts:140 and the short answers at 131 and 181 state the time as fact, without "most" or "says".
- Recommended fix: if the brief's "no timing promise" rule covers agency timings, soften 131, 140 and 181 to the hedged wording used in the body. Otherwise no change.

### READ-06-F09: German helper falls back to the English article body
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:9132-9158
- Evidence: `getGermanGuide` and `getGermanGuides` return `translation.body ?? enGuide.body`, and the untranslated English guide when no translation entry exists. A slug without a German body would show English text on a /de page. Whether any slug is in that state depends on lines outside my range; every entry I read (5001-9129) has a German body.
- Recommended fix: none needed if all slugs are translated; a test that every English slug has a German body would close it.

### READ-06-F10: One phone number that is not a government line
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:7247
- Evidence: besides Triple Zero and the healthdirect line (government funded), the line gives the number of the National Home Doctor Service ("13 SICK"), a private after-hours provider. All other numbers in the unit are agency lines: Fair Work Ombudsman and the national interpreter service at blog-en.ts:836, 837, 847.
- Recommended fix: keep or remove by policy; it is a public service number, not a personal one.

### READ-06-F11: Untranslated English quotation in German text
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(de)/de/blog/data.ts:5570
- Evidence: two Fair Work phrases are quoted in English inside a German sentence without a German rendering. The other English quotes in the range (8994, 9107) are followed by a German paraphrase.
- Recommended fix: add a short German paraphrase, as done at 8994.

## Notes

Checked and found clean in both ranges:
- Item 1: no statement that the business is a registered tax agent, accountant or Steuerberater. The only mentions are supervision wording ("reviewed and signed off by a registered tax agent" at blog-en.ts:490, 513; "von einem registrierten australischen Tax Agent geprüft und freigegeben" at data.ts:8982, 9113) and generic references to tax agents and the TPB register (data.ts:6664, 6785, 8556, 8920, 8980-8986, 9011, 9060, 9066; blog-en.ts:508, 964-967).
- Item 2: no refund guarantee, no refund promise and no refund amount promised to a customer. Refund outcomes are hedged throughout ("hängt von deinem Jahr ab", "If the ATO assesses a refund"). "Up to $700 off your tax" (blog-en.ts:190, 192, 223) is the low income tax offset, described as not paid out as cash. Worked examples (TRS, DASP, small business offset) are labelled as arithmetic.
- Item 3: no service prices at all in either range. No $220, $385, $330, $495 or $440, and no other fee for the service.
- Item 6: no raw HTML tags, script, iframe, event handlers, `javascript:` or `data:` URLs, and no `http://` links. External domains are all government: ato.gov.au, community.ato.gov.au, fairwork.gov.au, abr.gov.au, business.gov.au. No email addresses. Nothing shaped like a key, TFN or bank account.
- Item 7: no em or en dashes in either range (code comments use box-drawing characters only, not shown to customers). No TODO, lorem, XXX or FIXME. German file is German apart from Australian terms of art and F11; the SVT file is English.
- Item 8: neither file is a .tsx page; no params, searchParams or dangerouslySetInnerHTML.

Arithmetic I verified by hand: TRS one-eleventh examples (data.ts:5718, 5758-5762); small business offset (5858, 5870-5872); piece-rate top-up (6087); DASP examples (6561, 6579-6582, 7884, 8928); penalty tiers (7685); late lodgment maximum $1,820 = 5 x $364 (blog-en.ts:975, 1002 against data.ts:8914, 9101); cents per kilometre caps (5791, 5803); low income tax offset steps (blog-en.ts:205-207).

Minor points not raised as findings:
- data.ts:8904 says a $1,000 debt grows by about $370 over three years at 11.51 %; yearly compounding gives about $387 and daily compounding more. The one-year figure of $115 is fine.
- data.ts:8920 says BAS debts fall due "28 Tage nach Quartalsende" for most, while 8554 correctly gives 28 February for the December quarter.
- data.ts:5901 and 5914 give a two-year amendment window in an article about ABN income, while blog-en.ts:907 says sole traders have four years from 2024-25. Different files, so outside item 5, but the two brands disagree.
- data.ts:6047 gives "etwa 60 Werktage" for an objection decision; not checked.

Facts I could not check and that are date-sensitive (all post-June 2026 rules): Payday Super timing and the new charge structure (data.ts:5450-5461, 6741-6761; blog-en.ts:555, 637), the 91 cent per kilometre rate from 2026-27 (5791, 5803, 7749, 7814, 8491), the $1,000 standard deduction from 2026-27 (6386, 7731-7782; blog-en.ts:404), the general interest charge rate for October to December 2026 (8902), the penalty unit of $364 from 1 July 2026 (8914, 9101), and the ATO page update date quoted at 6346.
