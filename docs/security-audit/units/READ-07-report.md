# READ-07 report

## Coverage

| file | range assigned | range read | status |
|---|---|---|---|
| src/lib/svt/content/long/en/batch-00.ts | 1-1128 | 1-1128 (1-700, 700-1128) | REVIEWED |
| src/lib/svt/content/long/en/batch-03.ts | 1-1091 | 1-1091 (1-600, 601-1091) | REVIEWED |
| src/lib/svt/content/long/en/batch-09.ts | 1-1049 | 1-1049 (1-530, 531-1049) | REVIEWED |
| src/lib/svt/content/long/en/batch-12-deductions.ts | 1-1136 | 1-1136 (1-570, 571-1136) | REVIEWED |
| src/lib/svt/content/long/vi/batch-12-deductions.ts | 1-1048 | 1-1048 (1-530, 531-1048) | REVIEWED |

Total: 5,452 / 5,452 lines read. No network was used, so no tax, wage or health figure below was checked against a source; "could not check" means exactly that. Worked-example arithmetic was re-added by hand.

## Findings

### READ-07-F01: Vietnamese deductions file gives dollar tax-saving figures at the resident 16% rate; the English original deliberately does not
- Severity: MEDIUM
- Confidence: high (the divergence is certain; whether it breaches policy is the coordinator's call)
- Files and lines: src/lib/svt/content/long/vi/batch-12-deductions.ts:152, 313, 396, 488, 662, 748, 838. English counterparts with no figure: en/batch-12-deductions.ts:86, 345 (and no equivalent sentence in the Arjun, Ravi, Grace, Kenji, Amara, Hana examples).
- Evidence: seven Vietnamese worked examples end with "the deduction reduces income tax by about $38 / $34 / $205 / $278 / $91 / $92 / $96 (16% for 2025-26)" if taxable income is $18,201 to $45,000. That band and rate are the resident scale. The English text says only that the value "depends on the tax rate that applies", "on tax residency and total income". Lines 313 and 748 also say a deduction "usually changes nothing" under $18,200, which is again resident-only. The figures are conditional and are tax reductions, not refund promises, but they are the closest thing in this unit to a "refund figure" (brief item 2) and they presume residency, which the rest of the site refuses to do.
- Also: line 396 rounds $1,284.80 x 16% = $205.57 down to "$205" (should be about $206). The other six round correctly.
- Recommended fix: remove the seven sentences so the Vietnamese matches the English, or add the same residency caveat to each. Fix the $205 rounding if kept.

### READ-07-F02: Vietnamese deductions file presumes residency and differs from English in several other places
- Severity: LOW
- Confidence: high
- Files and lines: vi/batch-12-deductions.ts:143 ("He may be an Australian tax resident", absent in en:160); 585 ("If you may be a tax resident, claim the threshold from one employer", en:635 says "Where the tax-free threshold is available to you"); 82, 589, 1029 (state flatly that foreign residents cannot use the $1,000 standard deduction; en:90 says "Whether it applies to you depends on your circumstances"); 163 ("instead of the $300 and $150 limits", en:180 says the limits "no longer apply to anyone"); 72 (Mei example omits the laundry sentence present at en:82, so the Vietnamese says written evidence is needed for "all of it" while English carves out laundry of $150 or less); 76 (adds "our team reviews this" where en:86 has a different sentence).
- Evidence: translation is not a faithful copy; the two languages give different statements of the same rule.
- Recommended fix: re-sync the Vietnamese file to the current English text.

### READ-07-F03: Substantiation rule stated three different ways inside the English deductions file
- Severity: LOW
- Confidence: medium
- Files and lines: en/batch-12-deductions.ts:68 and 446, 631, 727, 819, 916 ("not counting car expenses"); 178, 354, 1110 (no car carve-out); 82 (laundry of $150 or less needs no written evidence even when the total exceeds $300) against 178 and 1110 (written evidence for "all of them" / "the whole amount", then the laundry rule in the next sentence).
- Evidence: the same $300 rule is given with and without the car-expense exclusion, and line 82 reads as contradicting "written evidence for all of it" in the same paragraph.
- Recommended fix: use one wording everywhere (total excluding car, laundry test stated once).

### READ-07-F04: 2026-27 "$1,000 standard deduction" and abolition of the $300/$150 limits are stated as settled fact
- Severity: LOW
- Confidence: low (could not check; no network)
- Files and lines: en/batch-12-deductions.ts:90, 180, 268, 356, 450, 545, 639, 729, 918, 1017, 1112; vi/batch-12-deductions.ts:82, 163, 245, 324, 412, 501, 589, 673, 850, 941, 1029.
- Evidence: "the ATO will apply a standard deduction of up to $1,000", "the $300 and $150 limits no longer apply to anyone", "does not apply if your only income is business income". I could not confirm that this is enacted law or that these details are final.
- Recommended fix: confirm against the ATO page already linked (STANDARD constant, en line 7); if not yet law, soften to "is planned".

### READ-07-F05: Dated or unverifiable figures to confirm
- Severity: LOW
- Confidence: low (could not check any of these)
- Files and lines and evidence:
  - en/batch-09.ts:815, 816, 834, 838-842, 857, 887, 888, 914: penalty unit "$364 from 1 July 2026", cap "$1,820". Arithmetic is internally consistent; the unit value itself is unchecked.
  - en/batch-03.ts:113, 205, 284 and en/batch-09.ts:479, 556: national minimum wage "$26.44 an hour", "$1,004.90" a week, awards "rose by 4.75%". $26.44 x 38 = $1,004.72, not $1,004.90 (consistent only if the weekly figure is primary). A 4.75% rise on the prior rate I remember ($24.95) would give about $26.14, so either the prior rate, the percentage or the new rate may be off. Derived examples ($33.05, $165.25, $231.35, $51.35 at batch-09:480-481, 557-560) are arithmetically right.
  - en/batch-03.ts:765 and en/batch-09.ts:113, 208, 290, 386: OSHC medicines "$50 per item, up to $500 a year single, $1,000 family". Consistent across all five places; my recollection is a lower annual cap, so please confirm on the linked privatehealth.gov.au page.
  - en/batch-09.ts:821, 834, 854-856, 908, 944: deadline "31 October 2026" and "late from 1 November 2026". 31 October 2026 is a Saturday; if the next-business-day rule applies, the late date and Hana's "about 76 days" shift by two days (still 3 periods).
  - en/batch-09.ts:1003-1004: "16% band" for 2025-26. Believed correct; batch-00 uses 45% + 2% for 2026-27, no conflict.
- Recommended fix: verify each against the already-cited government pages.

### READ-07-F06: Legacy ATO URL in sources
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: en/batch-12-deductions.ts:107
- Evidence: source href uses the old path `/individuals/income-and-deductions/occupation-and-industry-specific-guides/` while the file's own GUIDES constant (line 3) holds the current path. Likely a redirect or dead link; not checked.
- Recommended fix: use `GUIDES`.

### READ-07-F07: Small text defects
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines:
  - en/batch-03.ts:600: "You either get some tax back, if any too much was taken, or you have an amount to pay." Garbled clause.
  - en/batch-12-deductions.ts:637-639 and vi:587-589: the "Checklist before you lodge" heading is followed by the standard-deduction paragraph before the list; reads as misplaced.
  - en/batch-09.ts:464 and 631: nightclubs are listed under both the Hospitality Award and the Restaurant Award coverage. May match the two Fair Work summaries, but reads as a contradiction to a student.
- Recommended fix: reword line 600; move the paragraph above the heading; add a clarifying clause for nightclubs.

## Notes

Checked against the brief and found clean in all five files:
1. No claim that the business is a registered tax agent, accountant or 税理士. "Registered tax agent" appears only generically (batch-00:742, 781, 877, 917; batch-09:823, 894, 910, 949) and once as supervision wording, "a registered tax agent signs it off before it is lodged" (batch-09:927), which is allowed.
2. No refund guarantee, no refund amount, no refund timing promise. Refund wording is always conditional ("if any", "depends on", "may wait longer"): batch-09:859, 863, 914, 922; batch-03:551, 600, 1065. See F01 for the Vietnamese tax-saving figures.
3. No service prices at all. "$330" at batch-03:50 is a wage example and at batch-09:834 is the old penalty unit.
6. No raw HTML, script, iframe, event handler, `javascript:` or `data:` URL, no `http://` link, no email address. All link hosts are government: ato.gov.au, abr.gov.au, abr.business.gov.au, fairwork.gov.au (incl. awards. and horticulture. subdomains), privatehealth.gov.au, servicesaustralia.gov.au, studyaustralia.gov.au, immi.homeaffairs.gov.au, acma.gov.au. Phone numbers are public agency lines only: ATO Client Identity Support Centre (batch-00:884), Fair Work 13 13 94 and TIS 13 14 50 (batch-03 and batch-09, many lines), 000 and 112 (batch-09:277-279, 339, 348). Nothing shaped like a key, TFN or bank account. The Vietnamese file has no links.
   Commercial names without links: "Uber" (batch-03:482) and six OSHC insurers (batch-09:189). Informational only.
7. No em or en dashes (grep and reading). No TODO, lorem or XXX. English files are English; the Vietnamese file is Vietnamese with English terms in brackets, which looks intended.
8. Not applicable; no .tsx files in this unit.

All worked-example sums in batch-00, batch-03, batch-09 and both batch-12 files were re-added and are correct, apart from the rounding in F01.
