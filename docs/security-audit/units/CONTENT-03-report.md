# CONTENT-03 report

Scope: 25 files, 21,994 lines, about 1.98 MB of static content (1 Italian WHT page, 24 SVT long-article batches in en/vi/zh).
Method: (1) pattern search over ALL 25 files (every line was matched against the patterns listed under "Checked and found sound"); (2) consecutive reading of as much as fitted; (3) number-set comparison between English and translated batches 01, 02, 04, 05, 07.
Honest limit: only about 2,170 of 21,994 lines (about 10%) were read line by line. The Vietnamese and Chinese files were almost entirely checked by pattern search only. Tax and wage figures could NOT be checked against ato.gov.au or fairwork.gov.au (no network allowed).

Other files opened to judge findings: `src/lib/svt/content/long/types.ts` (lines 1-48), `src/components/svt/pages/blog-route.tsx` (all 53 lines).

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(it)/it/expenses/construction/page.tsx | 265 | 1-265 | REVIEWED |
| src/lib/svt/content/long/en/batch-01.ts | 977 | 1-59 (each line clipped at 600 characters), 60-977 in full | PARTIALLY_REVIEWED (only the tails of any line over 600 characters in 1-59 are unread) |
| src/lib/svt/content/long/en/batch-02.ts | 953 | 1-100, 850-953 | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-04.ts | 914 | 270-330 | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-05.ts | 889 | 87-160 | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/batch-07.ts | 981 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/en/batch-11.ts | 860 | 1-352, 600-720, 780-860 | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-01.ts | 892 | 1-12 (clipped at 500 characters) | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-02.ts | 865 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-03.ts | 993 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-04.ts | 818 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-05.ts | 806 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-06.ts | 939 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-07.ts | 885 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/vi/batch-09.ts | 950 | 750-762 (clipped at 900 characters) | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/vi/batch-10.ts | 933 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-01.ts | 897 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-02.ts | 856 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-04.ts | 829 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-05.ts | 812 | 1-14 (clipped at 700 characters) | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/zh/batch-06.ts | 907 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-07.ts | 893 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-08.ts | 989 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-09.ts | 973 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |
| src/lib/svt/content/long/zh/batch-10.ts | 918 | none (pattern search only) | PARTIALLY_REVIEWED (0 lines read) |

Single lines seen through pattern-search output (not counted as "read"): every line containing a dollar amount of $220/$330/$385/$440/$495, a registered-agent phrase, a guarantee/promise word, a fee word, 4.75%, $364, $37,500, $66,667, an email address or a phone-shaped number.

## Findings

### CONTENT-03-F01: Minimum wage figures for 2026-27 do not agree with each other (as far as I can check offline)
- Severity: LOW
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION (needs a check against fairwork.gov.au)
- CWE: n/a
- Files and lines: en/batch-02.ts:858-859, 867-869, 879, 914, 933, 942; en/batch-11.ts:125, 298; the 4.75% figure at en/batch-02.ts:869, vi/batch-02.ts:787, vi/batch-03.ts:183, 253, vi/batch-09.ts:430, 593, vi/batch-10.ts:325, 393, 465, 545, 626, 716, 797, zh/batch-02.ts:778, zh/batch-09.ts:434, 597, zh/batch-10.ts:325, 391, 460, 540, 619, 707, 782
- Evidence: the content states a national minimum wage of $26.44 an hour and $1,004.90 a week from 1 July 2026, and that award wages "rose by 4.75%". From memory the 2025-26 national minimum wage was $24.95 an hour ($948.00 a week). $948.00 plus 4.75% is about $993, not $1,004.90; $1,004.90 is about 6% above $948.00. The derived casual figure $33.05 (x1.25) and the worked examples ($495.75, $396.60, $19,830, $2,380) are arithmetically consistent with $26.44.
- Root cause: either the hourly figure, or the percentage, is wrong, or the minimum wage and award increases were different in 2026 (possible, it happened in 2023). I could not check.
- Attack prerequisites: none (content accuracy).
- Impact: a student could compare a payslip against a wrong legal minimum; figure is repeated in 3 languages.
- Recommended fix: verify $26.44, $1,004.90 and 4.75% against the Fair Work media release cited at en/batch-02.ts:947; correct all listed lines together.
- Regression test: a test that holds the minimum-wage constants in one place and asserts every article figure is derived from them.
- Limits of this verification: no network; my 2025-26 base figure is from memory; the 2026 decision is not known to me.

### CONTENT-03-F02: Italian construction page puts an item costing exactly $300 on both sides of the threshold
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the contradiction); the ATO wording itself was not checked
- CWE: n/a
- Files and lines: src/app/(it)/it/expenses/construction/page.tsx:98-99, 102-103, 212
- Evidence: line 98 heading "sotto i 300 $" (under $300), line 99 body "da 300 $ o meno" (deductible in full), line 102 heading "da 300 $ o più" (spread over useful life), line 103 and 212 "set da 300 $ o più" is one asset. An item of exactly $300 is in both groups. The SVT articles in this unit say "$300 or less" immediately and "over $300" over several years (en/batch-01.ts:792).
- Root cause: translation wording ("o più" instead of "più di").
- Attack prerequisites: none.
- Impact: wrong tax information at the boundary; inconsistent with the other brand's text.
- Recommended fix: use "300 $ o meno" and "più di 300 $" throughout; check the set rule wording against the ATO page.
- Regression test: content test that rejects "300 $ o più" / "300 or more" on expenses pages.
- Limits of this verification: not checked against the ATO; the other language versions of this page are outside this unit.

### CONTENT-03-F03: The "$300 without written evidence" rule is stated without a year on the WHT page, while SVT articles say it ends on 1 July 2026
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the inconsistency); which statement is right was not checked
- CWE: n/a
- Files and lines: src/app/(it)/it/expenses/construction/page.tsx:132; en/batch-01.ts:796, 810, 824; vi/batch-10.ts:88; zh/batch-10.ts:88
- Evidence: page.tsx:132 says, with no year, that if all work expenses total $300 or less no written proof is needed. en/batch-01.ts:796 says the rule applies "up to 2025-26" and "no longer applies from 1 July 2026", and line 810 describes a $1,000 standard deduction from 2026-27 for resident wage earners.
- Root cause: two content sets maintained separately; one is dated or the other is wrong.
- Attack prerequisites: none.
- Impact: contradictory tax statements on the two brands; one becomes wrong for 2026-27 returns.
- Recommended fix: verify with the ATO whether the $300 rule ends and whether the $1,000 standard deduction is law; then add the year to page.tsx:132 or correct the SVT text.
- Regression test: n/a (content review item).
- Limits of this verification: could not check the ATO; the $1,000 standard deduction was a proposal when my knowledge ends, so its legal status is unknown to me.

### CONTENT-03-F04: Dated and forward-looking figures that need an ATO check before the next tax year
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: penalty unit $364 from 1 July 2026 (vi/batch-09.ts:738, 739, 757, 761, 780, 810, 811; zh/batch-09.ts:742, 743, 761, 765, 784, 814, 815); resident rates "2025-26" with 16% (en/batch-01.ts:527-532, vi/batch-01.ts:491-495, plus vi/batch-06, vi/batch-09, zh/batch-01, zh/batch-06, zh/batch-08, zh/batch-09); "31 October 2026 has now passed" (en/batch-01.ts:447, 876, 946; en/batch-11.ts:551, 787); all 66 articles carry published/updated 2026-10-27
- Evidence: the figures I could recompute are arithmetically right: $4,288 and $5,788 at 16% (en/batch-01.ts:532), foreign resident $40,500 and $60,850 (en/batch-01.ts:541-542), the Vietnamese 2026-27 table at 15% ($4,020, $31,020, $51,370, $5,520), LITO $700/$37,500/$66,667 and the $42,000 example (vi/batch-06.ts:411-432), payslip example (en/batch-04.ts:288-293), super 12%. The $364 penalty unit and the 2026 start dates could not be verified.
- Root cause: year-specific numbers are written into prose in three languages.
- Attack prerequisites: none.
- Impact: content goes stale on 1 July 2027 (16%/15% rates, minimum wage, "has now passed" wording).
- Recommended fix: verify $364 with the ATO; keep a dated list of year-specific figures to update each July.
- Regression test: n/a.
- Limits of this verification: nothing checked against the ATO; only the lines listed were seen in the vi/zh files.

### CONTENT-03-F05: Stray sentence in the 500/485 guide
- Severity: INFORMATIONAL
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/lib/svt/content/long/en/batch-11.ts:781
- Evidence: "This guide helps you decide based on what happened in your year." stands alone at the end of the Medicare section, before "Can you lodge your own return?". It reads like the opening of a different article merged in ("How to decide" follows later).
- Root cause: two articles merged.
- Attack prerequisites: none.
- Impact: cosmetic.
- Recommended fix: delete or move the sentence. Check the vi/zh versions (vi/batch-11.ts:619, zh/batch-11.ts:621, not in this unit).
- Regression test: n/a.
- Limits of this verification: translations not in this unit.

### CONTENT-03-F06: Illustrative casual rate below the stated legal minimum; fee line lists only two of the prices
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: en/batch-04.ts:288 (and vi/batch-04.ts:263, zh/batch-04.ts:265 for the same example); en/batch-11.ts:847
- Evidence: (a) the made-up casual payslip uses $30.00 an hour, while the same library says the lowest casual rate from 1 July 2026 is $33.05; the text does say the rates are only an example. (b) "Fees are $220 per return for TFN jobs, or $385 with ABN work, GST included" matches the price list, but does not mention the foreign-income prices ($330, $495). No other price appears in the 24 SVT files; the other "$330" and "$495" hits are a wage example, a net-pay example and the old penalty unit.
- Root cause: example written before the 2026 rate; short fee sentence.
- Attack prerequisites: none.
- Impact: minor confusion; a customer with foreign income may read $220 as the full price.
- Recommended fix: raise the example rate above $33.05; add "from" or the foreign-income prices to the fee sentence.
- Regression test: existing price tests could assert that any "$220" sentence in content also carries the foreign-income note.
- Limits of this verification: the vi/zh version of the fee sentence is in batch-11 of those languages, outside this unit.

### CONTENT-03-F07: Absolute marketing claims on the Italian page that cannot be checked from code
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/app/(it)/it/expenses/construction/page.tsx:57, 59
- Evidence: "Rispondiamo in circa un'ora" (reply in about an hour) and "ogni cliente ha un visto 417 o 462" (every client holds a 417 or 462 visa).
- Root cause: marketing copy.
- Attack prerequisites: none.
- Impact: possible misleading-conduct exposure if untrue.
- Recommended fix: confirm with the business or soften.
- Regression test: n/a.
- Limits of this verification: business facts are not in the repository.

## Checked and found sound
- No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` in any of the 25 files (pattern search, all lines).
- No `<` character in any of the 24 content files apart from TypeScript generics on line 1-5; no `script`, `iframe`, `on*=` handlers, `javascript:`, `data:` or `vbscript:` URLs; no Markdown links in bodies; the only template interpolation is `${ATO}` (159 uses), a constant defined on line 3 of each English file.
- No `http://` link. Distinct external hosts (all https, all government): www.ato.gov.au, ato.gov.au, www.fairwork.gov.au, horticulture.fairwork.gov.au, fwc.gov.au, www.abr.gov.au, abr.gov.au, business.gov.au, www.studyaustralia.gov.au, www.service.nsw.gov.au, www.austrac.gov.au, safework.sa.gov.au, china.embassy.gov.au. Source links exist only in the 6 English files (234 `href:` entries); vi/zh files have none.
- Email addresses: one, an ATO scam-reporting mailbox (en/batch-07.ts:424, vi/batch-07.ts:385, zh/batch-07.ts:389). No business or personal email.
- Phone-shaped numbers: 4 distinct, all public government or support hotlines (Fair Work, interpreter service, ATO identity support, IDCARE) by the labels next to them; no mobile numbers. Locations include en/batch-01.ts:69, 164; en/batch-07.ts:62 and 1800-numbers in the scam/TFN articles of batch-07 in all three languages.
- Nothing shaped like a key, token or password value; the words "password"/"secret" appear only in advice text (en/batch-07.ts:371, 404, 532; en/batch-02.ts:55, 86; en/batch-11.ts:66).
- No TFN-like or account-like digit runs. The two 8+ digit hits are a date inside a Fair Work URL (en/batch-02.ts:947) and a false match (en/batch-11.ts:682).
- Registered tax agent status: no file says the business itself is a registered tax agent. Wording is "operates under the supervision of a registered tax agent" and "reviewed and signed off by a registered tax agent" (en/batch-02.ts:83; en/batch-11.ts:847; en/batch-01.ts:587-588, 620, 644; en/batch-04.ts:558; vi/batch-01.ts:540; vi/batch-04.ts:507; zh/batch-01.ts and zh/batch-02.ts, one line each; page.tsx:59).
- Guarantee: the only service guarantee is page.tsx:58, limited to returns with TFN income and stating the full fee applies when there is no refund. No refund promise in the SVT files; en/batch-11.ts (average refund article) and en/batch-02.ts:56 explicitly warn against promised refund amounts.
- Prices: only $220 and $385 appear as fees (en/batch-11.ts:847).
- English and translated batches 01, 02, 04, 05, 07 contain the same slugs (12/11/11/11/11); dollar and percent sets differ only by punctuation and by extra, arithmetically correct, tables in the translations.
- Rendering (from types.ts and blog-route.tsx): bodies are a restricted Markdown subset turned into a guide object by `longToGuide` and rendered by `GuidePage`; neither of those was reviewed in this unit.

## Open questions
- About 90% of the lines (nearly all Vietnamese and Chinese text) were not read line by line. A reader of those languages should review them; pattern search cannot catch a wrong sentence.
- Are $26.44, $1,004.90 and 4.75% all correct for 2026-27 (F01)? Is the penalty unit $364 from 1 July 2026 (F04)?
- Is the $1,000 standard deduction and the end of the $300 no-receipt rule enacted law (F03)?
- "We prepare your return... a registered tax agent reviews and signs it off" next to "registered tax agents are the only people who can charge a fee to prepare and lodge" (en/batch-02.ts:17, 83): is the supervised-preparation arrangement confirmed as compliant with the Tax Agent Services Act by the supervising agent? Not a code question.
- Does `longToGuide`/`GuidePage` escape body text and JSON-LD output (`</script>` breakout)? The content has no `<`, so there is no live issue, but the control lives in another unit.
