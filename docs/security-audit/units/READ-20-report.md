# READ-20 report

Final. 14 of 14 files read, 5,597 of 5,597 assigned lines.

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/expenses/cleaners/page.tsx | 1-337 | 1-337 | REVIEWED |
| src/app/(de)/de/expenses/page.tsx | 1-402 | 1-402 | REVIEWED |
| src/app/(es)/es/blog/chunks/04.ts | 1-427 | 1-427 | REVIEWED |
| src/app/(es)/es/blog/chunks/07.ts | 1-418 | 1-418 | REVIEWED |
| src/app/(es)/es/page.tsx | 1-373 | 1-373 | REVIEWED |
| src/app/(fr)/fr/expenses/page.tsx | 1-402 | 1-402 | REVIEWED |
| src/app/(fr)/fr/tfn/page.tsx | 1-423 | 1-423 | REVIEWED |
| src/app/(it)/it/blog/chunks/04.ts | 1-419 | 1-419 | REVIEWED |
| src/app/(it)/it/blog/chunks/07.ts | 1-395 | 1-395 | REVIEWED |
| src/app/(it)/it/tfn/page.tsx | 1-423 | 1-423 | REVIEWED |
| src/app/(ja)/ja/expenses/page.tsx | 1-401 | 1-401 | REVIEWED |
| src/app/(ja)/ja/medicare/page.tsx | 1-373 | 1-373 | REVIEWED |
| src/app/(ja)/ja/page.tsx | 1-372 | 1-372 | REVIEWED |
| src/app/(ja)/ja/tfn/page.tsx | 1-432 | 1-432 | REVIEWED |

## Findings

### READ-20-F01: Italian article says May to August "of the following year" is two financial years
- Severity: LOW
- Confidence: high
- Files and lines: src/app/(it)/it/blog/chunks/04.ts:125
- Evidence: "Arrivo a maggio, partenza ad agosto dell'anno dopo: due financial year, due tax return, una per maggio e giugno e l'altra per luglio e agosto." May to August of the next year covers three financial years. The Spanish version of the same bullet (es 04.ts:125) has no "of the following year" and is correct.
- Recommended fix: delete "dell'anno dopo".

### READ-20-F02: Italian DASP article gives its own payout time, "four to six weeks"
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(it)/it/blog/chunks/04.ts:310
- Evidence: "la risposta pratica è da quattro a sei settimane dalla prima richiesta all'ultimo pagamento". This is a timing figure in the business's own voice, not attributed to the ATO, in an article whose title and lead say 28 days. The Spanish version of the paragraph (es 04.ts:310) does not carry the figure.
- Recommended fix: remove the four to six weeks figure, as the Spanish text does.

### READ-20-F03: Italian payslip article says two backpackers can end "thousands of dollars apart"
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(it)/it/blog/chunks/07.ts:215
- Evidence: "possono finire a migliaia di dollari di distanza". A money figure on the outcome of a return. The Spanish version (es 07.ts:215) says only "resultados muy distintos".
- Recommended fix: replace with wording without an amount ("risultati molto diversi").

### READ-20-F04: Unclaimed super, same documents or different documents
- Severity: LOW
- Confidence: medium (tax fact not checked, no network)
- Files and lines: src/app/(it)/it/blog/chunks/07.ts:290 against src/app/(it)/it/blog/chunks/04.ts:379; also it 04.ts:312 and :381 against es 04.ts:312 and :387
- Evidence: it 07:290 says a claim to the ATO needs "una documentazione diversa"; it 04:379 says "Stessi documenti, stessa idoneità". The Spanish articles state that ATO-held super is paid only to an Australian bank account in the claimant's name or by cheque (es 04:312, 04:387, 07:290); the Italian articles leave that out and it 07:286 reads as if an overseas account is always possible via the fund.
- Recommended fix: align the Italian text with the Spanish: same DASP claim, paid by the ATO only to an Australian account or by cheque.

### READ-20-F05: What triggers the transfer of super to the ATO is described two ways
- Severity: LOW
- Confidence: medium
- Files and lines: es 07.ts:147, 07.ts:385, 07.ts:411 against es 04.ts:379-381; it 07.ts:147, 07.ts:362, 07.ts:388 against it 04.ts:373; es 04.ts:148 and it 04.ts:148
- Evidence: chunk 04 says the trigger for a former temporary resident is the calendar (six months after departure and visa end) and calls it separate from the lost-account rules. Chunk 07 and the year-dates article say the balance moves when the fund "lost contact" or cannot reach the member.
- Recommended fix: use the six-month rule wording in chunk 07 and in the year-dates article too.

### READ-20-F06: $300 threshold worded three ways (under / up to / from 300)
- Severity: LOW
- Confidence: medium (tax fact not checked, no network)
- Files and lines: src/app/(de)/de/expenses/cleaners/page.tsx:126, 129, 151, 273; src/app/(de)/de/expenses/page.tsx:205, 292, 338; src/app/(fr)/fr/expenses/page.tsx:205, 292, 338
- Evidence: de cleaners:126 writes off each item "bis 300 Dollar" and in the same paragraph, and in the heading at :129, depreciates a set or device "ab 300 Dollar", so exactly 300 falls on both sides. de cleaners:151 needs no written evidence "Unter 300 Dollar"; de hub:205 and :338 say "300 Dollar oder weniger" / "höchstens 300". de hub:292 "unter 300 Dollar"; fr:292 "à moins de 300 $" against fr:205 "300 $ AUD ou moins". The Japanese page is consistent (300ドル以下 / 300ドルを超えて).
- Recommended fix: "300 or less" for the immediate write-off and the no-receipt limit, "more than 300" for depreciation, everywhere.

### READ-20-F07: Text that goes stale or reads unfinished
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(fr)/fr/expenses/page.tsx:210, 212; src/app/(ja)/ja/expenses/page.tsx:184, 211; src/app/(es)/es/blog/chunks/04.ts:112; src/app/(it)/it/blog/chunks/04.ts:112; src/app/(it)/it/blog/chunks/07.ts:280
- Evidence: fr:210 label "Change au 1er juillet 2026" reads like a leftover English word (the German label is "Neu ab", the Japanese "からの変更"). fr:212 and ja:211 say the 2025-26 return is the one "most people are lodging at the moment", which is no longer true after 31 October 2026. es/it 04:112 name 2026-27 as "the current year"; it 07:280 says 31 October 2026 "has passed". ja:184 writes ローター勤務 for roster work (ロスター).
- Recommended fix: "Nouveau au 1er juillet 2026"; drop the "at the moment" clause; ロスター勤務; accept or date-stamp the "current year" sentences.

### READ-20-F08: Plain anchor used for the WhatsApp link on the Italian TFN page
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: src/app/(it)/it/tfn/page.tsx:339
- Evidence: `<a href={WA_TFN} ...>` inside body text, where every other WhatsApp link in the unit goes through WaButton or WaLink. The URL comes from waUrl(), not from user input. I did not open WaLink to see what it adds (rel, tracking).
- Recommended fix: use WaLink as on the Spanish home page (es/page.tsx:317).

### READ-20-F09: Two YouTube iframes on the Japanese Medicare page
- Severity: LOW
- Confidence: high for the location, low for the impact
- Files and lines: src/app/(ja)/ja/medicare/page.tsx:323-331 and 334-342
- Evidence: type: iframe, external non-government domain (youtube-nocookie.com embed, https). The same video is embedded twice, one block for small screens and one for larger, so both frames are in the page and only CSS hides one. No sandbox attribute; the allow list includes autoplay and clipboard-write. It is the only iframe in the unit. I did not open the CSP to see whether frame-src permits it.
- Recommended fix: one iframe with a responsive container, drop clipboard-write and autoplay from allow, and confirm the CSP frame-src lists only this host.

### READ-20-F10: Japanese Medicare page puts a dollar value on the exemption
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(ja)/ja/medicare/page.tsx:128-130, 247
- Evidence: the FAQ "how much is the exemption worth" answers "about 800 dollars on 40,000, about 1,000 on 50,000", and the same 800 figure is repeated in body text. It is the arithmetic of 2 %, but it reads as an amount the customer gets back, and the FAQ text is also emitted in the FAQPage JSON-LD.
- Recommended fix: keep "2 % of taxable income" and drop the dollar examples, or add that the result depends on the year and is decided by the ATO, as the other pages do.

### READ-20-F11: Japanese TFN page, "$7.50 per hour goes to the ATO" is the extra, not the amount
- Severity: LOW
- Confidence: high (arithmetic only)
- Files and lines: src/app/(ja)/ja/tfn/page.tsx:139
- Evidence: at 25 dollars an hour, 45 % is 11.25 and 15 % is 3.75. The sentence says about 7.50 per hour goes to the ATO instead of to the worker; 7.50 is the difference between the two rates, not what is withheld.
- Recommended fix: say "about 7.50 more per hour" (余分に約7.50ドル).

### READ-20-F12: Japanese home page figure "$18,200" has a caption that does not say what it is
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(ja)/ja/page.tsx:108-111
- Evidence: the figure is $18,200 and the caption begins "It is the tax residency classification", with no mention of the tax-free threshold. The Spanish home page caption for the same figure names it (es/page.tsx:90-91). A code comment at ja/page.tsx:102 says this block was approved on 22 Aug 2026 and must not be rewritten, so this needs the owner's decision.
- Recommended fix: name the threshold in the caption, as the Spanish page does.

## Notes
- ja/medicare/page.tsx section comments are in German (lines 240, 255, 265, 306, 353). Code comments only, not shown to customers.
- availableLanguage in the TFN Service JSON-LD differs by locale: six languages in fr/tfn:263 and ja/tfn:268, only it and en in it/tfn:249.
- ja/tfn:154 also lists the TIS National interpreter line, a government service.
- No 税理士 claim: the only occurrence is a code comment at ja/tfn:20 stating the page must not say it. ja/page:179 and ja/tfn:396 use supervision wording.
- Rule 1: no file read so far says the business is a registered tax agent. All wording is "reviewed and approved by a registered tax agent" or, it/tfn:375, "operates under the supervision of".
- Rule 2: every guarantee paragraph read carries the TFN-only limit (de cleaners:72, de hub:71, es page:164 and :289, fr expenses:71, fr tfn:381, it tfn:390, ja expenses:71, ja medicare:310, ja page:183 and :294, ja tfn:389). "Reply in about an hour" lines are reply times, not refund times. DASP "generally within 28 days" is attributed to the ATO each time.
- Rule 3: no service price in any file read so far.
- Rule 6: no en or em dash in any of the 14 files (searched). Only external link in the article bodies is one https ato.gov.au link (es 07.ts:320). Phone numbers are the two ATO public lines (es 07.ts:370, it 07.ts:350, fr tfn:163, it tfn:154). No emails, no key, TFN or account shaped strings.
- Rule 8: no params or searchParams. dangerouslySetInnerHTML only as JSON-LD through jsonLdHtml (es page:242-245, fr tfn:289-292, it tfn:275-278, ja medicare:214-217, ja page:251-254, ja tfn:294-297). I did not open src/lib/json-ld-html.ts.
- Unprefixed article links such as `](/tax-return)` in the es and it chunks are rewritten per locale by localizeBodyLinks in src/lib/locale-blog.ts (opened lines 30-64); already prefixed `/it/...` links are left alone.
- Tax facts I could not check (no network): 88 c/km and 91 c/km, $1,000 standard deduction from 2026-27, laundry $1 / 50 c and $150, GST $75,000, Payday Super seven business days from 1 July 2026, super 11 / 11.5 / 12 %, DASP 65 % and 35 / 45 %, treaty list at es 07.ts:310-316, 14 July finalisation, 15 June early lodgment and 50 business days, 30 % for unregistered employers.
