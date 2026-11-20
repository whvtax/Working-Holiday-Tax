# READ-11 report
## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/lib/svt/content/long/en/batch-04.ts | 1-914 | 1-699, 700-914 | REVIEWED |
| src/lib/svt/content/long/vi/batch-10.ts | 1-933 | 1-470, 470-933 | REVIEWED |
| src/lib/svt/content/long/zh/batch-01.ts | 1-897 | 1-450, 450-897 | REVIEWED |
| src/lib/svt/content/long/zh/batch-06.ts | 1-907 | 1-460, 461-907 | REVIEWED |
| src/lib/svt/content/long/zh/batch-07.ts | 1-893 | 1-450, 451-893 | REVIEWED |
| src/lib/svt/content/long/zh/batch-10.ts | 1-918 | 1-460, 461-918 | REVIEWED |

Total: 5,462 of 5,462 assigned lines read. No network was used, so no tax fact was checked against a source.

## Findings

No CRITICAL, HIGH or MEDIUM findings. Nothing in these six files states that the business is a registered tax agent or accountant, promises a refund, or quotes a service price.

### READ-11-F01: Minimum wage figure and the stated award rise do not obviously agree (unverified)
- Severity: LOW
- Confidence: low
- Files and lines: vi/batch-10.ts:325, 393, 465, 545, 626, 716, 797; zh/batch-10.ts:325, 391, 460, 540, 619, 707, 782; zh/batch-06.ts:854, 884; zh/batch-07.ts:34, 36
- Evidence: every place gives the national minimum wage from 1 July 2026 as $26.44 an hour, and the vi/zh batch-10 places add that award minimums rose 4.75% from the same day. If the previous rate was $24.95 (from memory, not checked), a 4.75% rise gives about $26.14, while $26.44 is about 6%. The files are consistent with each other; the question is whether both numbers are right. Worked examples that depend on it: zh/batch-06.ts:884-887 ($33.05, $661.00, $79.32) and zh/batch-07.ts:36 ($6.44, $96.60, $966).
- Recommended fix: check both numbers against the Fair Work annual wage review decision, then correct whichever is wrong in all listed places and redo the two worked examples.

### READ-11-F02: Statements that will go out of date
- Severity: LOW
- Confidence: high
- Files and lines: zh/batch-01.ts:401, 811 (also softer forms at 589 and 886)
- Evidence: the text says the 31 October 2026 self-lodgement deadline for 2025-26 "has now passed". This is true today but becomes misleading once the next lodgement season opens. Separately, 31 October 2026 is a Saturday, so the effective due date may have been the next business day (not checked).
- Recommended fix: reword without "now", or tie these lines to the article's `updated` date and add them to the yearly content review.

### READ-11-F03: "May withhold" versus "must withhold" at the top rate when no TFN is given
- Severity: LOW
- Confidence: medium
- Files and lines: "may" in vi/batch-10.ts:651, 726 and zh/batch-10.ts:644, 717; "must" in en/batch-04.ts:31, 77, zh/batch-01.ts:509, 643, zh/batch-06.ts:866, zh/batch-07.ts:212, 508, 829
- Evidence: the same rule (no TFN within 28 days) is worded as optional in the two batch-10 files and as mandatory elsewhere. No contradiction inside a single file.
- Recommended fix: use the mandatory wording in the batch-10 files (after checking the ATO wording).

### READ-11-F04: Chinese batch-10 offers help the Vietnamese version does not, on super accounts
- Severity: LOW
- Confidence: medium
- Files and lines: zh/batch-10.ts:269, 293, 415 against vi/batch-10.ts:269, 293, 420
- Evidence: the Chinese text says the team can handle merging super funds, find missing super accounts for the reader, and help check unpaid super. The Vietnamese text of the same articles points the reader to ATO online services instead. Merging or choosing super funds may fall outside a tax return service (I could not check the service scope).
- Recommended fix: decide whether this help is actually offered; if not, bring the Chinese lines back to the wording used in the Vietnamese version.

### READ-11-F05: Tax and process facts that look new or unusual and could not be checked
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines and evidence:
  - zh/batch-06.ts:615: ATO will stop accepting credit card payments after 30 June 2027.
  - zh/batch-06.ts:84, 111: cents-per-kilometre rate of 91 cents (cap $4,550) from 2026-27. The 88-cent rate for 2025-26 is consistent across en, vi and zh files.
  - zh/batch-07.ts:286, 849: a postal address for the overseas TFN paper form (a GPO Box in Canberra), given twice and identical.
  - vi/batch-10.ts:54, 778 and zh/batch-10.ts:54, 763: the $300 written-evidence threshold ends from 2026-27, and all laundry claims need written evidence from 2026-27.
  - vi/batch-10.ts:64, 84-155 and zh/batch-10.ts:64, 84-155; zh/batch-01.ts:738: the $1,000 standard deduction from 2026-27 and its offset rules.
  - en/batch-04.ts:116, 463 and zh/batch-01.ts:437, 632, 845: an employer must give a payment summary within 14 days if asked on departure.
  - zh/batch-07.ts:771: "Ola" is listed as a current ride-sourcing app; it may no longer operate in Australia.
- Recommended fix: verify each against the ATO or Fair Work page before the next content release.

### READ-11-F06: Processing times quoted from the ATO (for the coordinator's rule-2 decision)
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: en/batch-04.ts:702, 733-734, 741-745, 804; zh/batch-01.ts:579; vi/batch-10.ts:287; zh/batch-10.ts:287
- Evidence: "most online returns are processed within 12 business days", up to 30 calendar days for manual review, 50 business days for paper, and a 28-day DASP service standard. Each is attributed to the ATO and none is worded as a promise by the business; en/batch-04.ts:715-719 says explicitly that a refund is not certain.
- Recommended fix: none needed unless the policy bans any timing figure, even when attributed.

### READ-11-F07: Contact details and third-party names present (location and type only)
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines:
  - Email address, government (ATO scam-report mailbox): zh/batch-07.ts:389. The only email in the unit.
  - Phone number of a non-government organisation (identity-theft support charity): zh/batch-07.ts:382. All other phone numbers are public lines of the ATO, the Fair Work Ombudsman and the government interpreting service (en/batch-04.ts:231, 248, 329; zh/batch-01.ts:64, 150, 164, 208; zh/batch-06.ts:729, 809, 898; zh/batch-07.ts:57, 79, 318, 355, 375, 387, 394, 398, 402, 481, 490).
  - Commercial platform names: zh/batch-07.ts:628, 754, 771-772, 815-816; zh/batch-10.ts:845.
  - Minor copy mismatch: zh/batch-10.ts:845 describes the article as organised "by month" while the body is organised by steps.
- Recommended fix: confirm the charity number is intended; fix the description at zh/batch-10.ts:845.

## Notes
- Checked and clean in all six files: no em or en dashes; no raw HTML, script, iframe, event handlers, `javascript:` or `data:` URLs; no `http://` links; no placeholder text; no TFN-, key- or bank-account-shaped strings (no digit run of 8 or more); no text in the wrong language for its file.
- Links exist only in en/batch-04.ts and all are HTTPS on ato.gov.au, fairwork.gov.au and abr.gov.au (lines 3, 80-83, 167-169, 251-254, 344-347, 427-430, 508-511, 565-568, 636-638, 722-725, 809-812, 906-911). The vi and zh files have no `sources` and no URLs. zh/batch-01.ts:96 names business.gov.au in running text only.
- Registered tax agent wording is supervision wording only: en/batch-04.ts:558; zh/batch-01.ts:567, 591; zh/batch-06.ts:529.
- Service prices: none. `$495.00` at en/batch-04.ts:292 is the net pay in a payslip example, not a price.
- Arithmetic in the worked examples was recomputed and is correct, including: en/batch-04.ts:288-293, 396-398, 473, 857; vi/batch-10.ts:60, 205, 257, 434, 504, 582, 753, 839, 916 and the same examples in zh/batch-10.ts; zh/batch-01.ts:479 (tax brackets, $4,288, $5,788), 489-491, 690; zh/batch-06.ts:111, 133-134, 204-205, 358, 689-695; zh/batch-07.ts:127, 216, 611, 722-728, 861.
- Figures that matched what I know without checking online: 2025-26 resident and foreign resident rates, low income tax offset thresholds, 12% super, 2% Medicare levy, DASP 35/45/65%, 47% no-ABN withholding, $75,000 GST threshold, two-year amendment period, five-year record keeping.
- These are `.ts` data files, not `.tsx` pages, so brief item 8 does not apply.
