# READ-13 report

Complete: 5,332 of 5,332 assigned lines read.

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(es)/es/devolucion-impuestos-australia/page.tsx | 1-648 | 1-648 | REVIEWED |
| src/lib/svt/content/blog-vi.ts | 1-733 | 1-733 | REVIEWED |
| src/lib/svt/content/blog-zh.ts | 1-731 | 1-731 | REVIEWED |
| src/lib/svt/content/long/vi/batch-04.ts | 1-818 | 1-818 | REVIEWED |
| src/lib/svt/content/long/vi/batch-11.ts | 1-805 | 1-805 | REVIEWED |
| src/lib/svt/content/long/zh/batch-05.ts | 1-812 | 1-812 | REVIEWED |
| src/lib/svt/content/long/zh/batch-11.ts | 1-785 | 1-785 | REVIEWED |

## Findings

### READ-13-F01: Refund timing figures on the Spanish tax-return page (10 vs 14 business days, and 12 business days elsewhere)
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(es)/es/devolucion-impuestos-australia/page.tsx:126-127, 216-218; compare src/lib/svt/content/blog-vi.ts:86-114 and src/lib/svt/content/blog-zh.ts:85-113
- Evidence: KEY_FIGURES says most online returns are processed in "10 días hábiles" and, in the same body, that a refund "suele llegar unos 14 días hábiles después de presentar"; the FAQ repeats the 14 business days. The SVT blog files give "12 business days" for the same ATO processing standard. All are attributed to the ATO, not promised by the business, but they are refund timing statements and the three numbers do not agree.
- Recommended fix: Pick the one figure the ATO page currently states, use it everywhere, and keep the "ATO says / usually" attribution. Could not check the ATO page (no network).

### READ-13-F02: Minimum wage figure and percentage increase do not reconcile
- Severity: LOW
- Confidence: low
- Files and lines: src/lib/svt/content/blog-vi.ts:658, 671, 679, 719-728; src/lib/svt/content/blog-zh.ts:656-657, 663, 669, 677, 717-726
- Evidence: National minimum wage stated as $26.44/hour ($1,004.90 per 38-hour week) from 1 July 2026, with "most award rates rose 4.75%". The previous rate I know of ($24.95) plus 4.75% gives about $26.14, not $26.44. One of the two numbers may be wrong, or the base differs.
- Recommended fix: Verify both figures against the Fair Work Ombudsman announcement of 1 July 2026. Could not check (no network).

### READ-13-F03: Duplicate sentence in the price panel (Spanish page)
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(es)/es/devolucion-impuestos-australia/page.tsx:596-597
- Evidence: "De lo que paga la ATO nunca se descuenta nada." appears at the end of two consecutive paragraphs in the same panel; reads as unfinished editing.
- Recommended fix: Remove one of the two paragraphs' closing sentence (or merge the paragraphs).

### READ-13-F04: "31 October 2026" self-lodge deadline fell on a Saturday
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines: src/app/(es)/es/devolucion-impuestos-australia/page.tsx:123, 193, 402, 537; src/lib/svt/content/blog-vi.ts:569-574, 601, 604; src/lib/svt/content/blog-zh.ts:568-573, 600, 603
- Evidence: All state the 2025-26 self-lodge deadline as 31 October 2026 (the blogs add "11:59 pm local time"). 31 October 2026 is a Saturday; ATO due dates on a weekend normally move to the next business day. The blogs cite an ATO media item dated 19 October 2026, so the text may match what the ATO published.
- Recommended fix: Confirm against the cited ATO item; no change if it says 31 October. Could not check (no network).

### READ-13-F05: "$300 or less" written as "under $300" in one place
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/lib/svt/content/long/vi/batch-11.ts:687 (compare 141 and 297 in the same file); src/lib/svt/content/long/zh/batch-11.ts:667 ("$300 以下"; compare 141 and 297, "$300 或以下")
- Evidence: Lines 141 and 297 say tools costing "từ $300 trở xuống" ($300 or less) are deductible at once; line 687 says "dụng cụ dưới $300" (under $300). The ATO threshold is $300 or less, so line 687 is the odd one.
- Recommended fix: Change vi line 687 to "từ $300 trở xuống" and zh line 667 to "$300 或以下".

### READ-13-F06: Chinese 500/485 guide announces "2025-26 tax rates" but contains none
- Severity: LOW
- Confidence: high
- Files and lines: src/lib/svt/content/long/zh/batch-11.ts:623 (description), 631 (heading), 633-639 (section body); compare src/lib/svt/content/long/vi/batch-11.ts:621, 629-659
- Evidence: The zh description lists "2025-26 税率" and the section heading is "税务居民身份和 2025-26 税率", but the section only says residents and foreign residents use different rate tables; no rate or bracket appears. The Vietnamese version of the same article has the full resident tables for 2025-26 and 2026-27, the non-resident table and the LITO figures. The zh version also omits the 48-hours-per-fortnight work limit that the vi version states (vi 627, zh 629).
- Recommended fix: Either add the rate tables to the zh article (same figures as vi) or drop "2025-26 税率" from the zh description and heading.

### READ-13-F07: Chinese 500/485 guide offers to handle the TFN application
- Severity: INFORMATIONAL
- Confidence: medium
- Files and lines: src/lib/svt/content/long/zh/batch-11.ts:643
- Evidence: "TFN 是免费的 ... 如果需要，我们可以帮你处理" (if needed, we can handle it for you). The Vietnamese version of the same paragraph (vi/batch-11.ts:663) has no such offer, and other articles in this unit tell readers not to pay anyone to apply for a TFN (blog-zh.ts:63, vi/batch-04.ts:227). No price is attached, so it is not a price breach, but it reads as an unpriced extra service.
- Recommended fix: Confirm whether TFN help is a real service; if not, remove the clause so zh matches vi.

## Notes
- zh/batch-05.ts: no service prices, no refund promises, no claim to be a registered agent. "$1,650" and "$1,705" (lines 771-773) are a Tourist Refund Scheme shopping example; the GST arithmetic ($1,705 / 11 = $155) is right. "Mai" (line 686) is a fictional example name. Phones: 13 13 94, 13 14 50, 1800 008 540, all public agency lines. SGC component figures (60% uplift, 25% choice loading capped at $1,200, lines 104-107) and TRS cut-off times (line 781) could not be checked offline.
- zh/batch-11.ts: service prices $220 and $385 only (line 777), supervision wording only (777). Refund language is hedged throughout ("如果有退税").
- Cross-file check on the late-lodgment maximum: only the two blog files give a dollar figure ($1,820); the long-form batches give "5 penalty units" with no dollar amount, so there is no conflict inside this unit. The dollar figure itself could not be checked offline.
- vi/batch-04.ts: no findings. "$495.00" at line 263 is net pay in a worked payslip example, not a service price. Phone numbers: 1800 008 540 (ATO scam check line, lines 210, 228) and 13 13 94 (line 300), both public agency lines. "BSB" is mentioned at line 706 with no number. Supervision wording only (507, 651).
- vi/batch-11.ts: service prices $220 and $385 only (line 797), supervision wording only (527, 539, 797). Brand names (Uber, Coles, Woolworths) appear as article subjects, no links. Evergreen lines "lodge before 31 October" (500, 547, 695, 716) sit beside line 738, which says the 2026 deadline has passed; not a contradiction, but the checklists read as if the date is still ahead.
- vi/batch-11.ts tax facts not checkable offline but internally consistent: resident rates 2025-26 (16% second bracket) and 2026-27 (15%), non-resident 30/37/45, DASP 35% / 65%, cents-per-km 5,000 km cap, GST $75,000 threshold and ride-sourcing from first trip, 48 hours per fortnight, Tax Help about $70,000, GIC not deductible from 1 July 2025.
- page.tsx: no params/searchParams. Four dangerouslySetInnerHTML uses (lines 386-389), all JSON-LD through `jsonLdHtml` (helper file not opened in this unit). External links are ato.gov.au only, all https, with rel="noopener noreferrer".
- page.tsx: no claim that the business is a registered agent; wording is "bajo la supervisión de un agente fiscal registrado" (lines 67, 278, 357, 524, 613). Prices are 220 and 385 only (238, 594-595). Guarantee carries the TFN-only limit (238, 603). "No podemos prometerte una devolución" present (228, 268, 500, 605).
- blog-vi.ts / blog-zh.ts: no prices for the service, no refund promises; supervision wording only (vi 296, 312; zh 295, 311, 582). Phone numbers are 13 13 94 and 13 14 50 (public agency lines). No URLs, HTML, emails or key-shaped strings (grep and reading). No em or en dashes in any of the seven files (grep for U+2013/U+2014 returned nothing).
- Tax facts that I could not check offline but that are internally consistent: LITO $700 / $37,500 / $45,000 / $66,667; super guarantee 12%; Payday Super 7 business days (20 for a new employee's first payment); $1,000 standard deduction from 2026-27; 4-year amendment period for sole traders from 2024-25.
