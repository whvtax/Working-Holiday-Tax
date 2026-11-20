# READ-15 report
## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/page.tsx | 1-375 | 1-375 | REVIEWED |
| src/app/(es)/es/blog/chunks/05.ts | 1-517 | 1-517 | REVIEWED |
| src/app/(es)/es/blog/chunks/10.ts | 1-514 | 1-514 | REVIEWED |
| src/app/(es)/es/blog/chunks/17.ts | 1-529 | 1-529 | REVIEWED |
| src/app/(es)/es/tfn/page.tsx | 1-516 | 1-516 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/05.ts | 1-523 | 1-523 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/09.ts | 1-514 | 1-514 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/17.ts | 1-533 | 1-533 | REVIEWED |
| src/app/(fr)/fr/superannuation/page.tsx | 1-515 | 1-515 | REVIEWED |
| src/app/(it)/it/blog/chunks/05.ts | 1-521 | 1-521 | REVIEWED |
| src/app/(ja)/ja/tax-return/page.tsx | 1-525 | 1-525 | REVIEWED |

Total: 5582 lines assigned, 5582 read (each file read in one pass, all under 700 lines).

## Findings

### READ-15-F01: Refund timing stated on the Japanese tax return page, including hero and social description
- Severity: MEDIUM
- Confidence: high (that the text is there); medium (that it breaches the rule, since it is worded as what the ATO usually does)
- Files and lines: src/app/(ja)/ja/tax-return/page.tsx:66 (openGraph description), :130 (step 07), :186 (FAQ answer), :391 (hero lead). Related: src/app/(de)/de/page.tsx:286.
- Evidence: the Japanese page says four times that, where there is a refund, the ATO pays in roughly 14 business days from lodgment. Lines 66 and 391 give it as a plain guide figure ("目安") with no "according to the ATO". The German home page gives a different figure for the same thing: "meist innerhalb von zwei Wochen" (attributed to the ATO). 14 business days and two weeks are not the same.
- Recommended fix: remove the refund timing from the hero and the openGraph description; where it stays, attribute it to the ATO, say it is not a promise, and use one figure on every language page.

### READ-15-F02: Guarantee limit says "returns with TFN income", not "TFN-only returns"
- Severity: MEDIUM
- Confidence: medium (wording judgement; I am not a native reviewer of all four languages)
- Files and lines: src/app/(de)/de/page.tsx:173 and :298; src/app/(es)/es/tfn/page.tsx:498; src/app/(fr)/fr/superannuation/page.tsx:469; src/app/(ja)/ja/tax-return/page.tsx:241 and :487.
- Evidence: de "nur für Steuererklärungen mit TFN-Einkommen"; es "solo las declaraciones con ingresos con TFN"; fr "qu'aux déclarations avec revenus sous TFN"; ja "TFN所得のあるタックスリターンに限られます". Each reads as "returns that have TFN income". A TFN plus ABN return also has TFN income, so a customer can read the guarantee as covering it.
- Recommended fix: word it as returns with TFN income only (no ABN income) in each language, and use the same sentence everywhere the guarantee appears.

### READ-15-F03: French job guides say the first White Card (and similar first certificates) is deductible; other guides say it is not
- Severity: MEDIUM
- Confidence: high (contradiction is in the text); the underlying tax rule was not checked (no network)
- Files and lines: src/app/(fr)/fr/blog/chunks/17.ts:150 ("Ce coût est déductible comme frais professionnel") and :185 (course price listed among deductible expenses), against src/app/(fr)/fr/blog/chunks/09.ts:34-36 and src/app/(es)/es/blog/chunks/17.ts:150 (first card not deductible, renewal is). Same pattern, weaker: fr/17.ts:398 (instructor qualification training deductible, without the "not the initial course" limit that es/17.ts:396 has) and fr/17.ts:451 (RSA cost deductible, where es/17.ts:449 says renewal only and fr/09.ts:57, :97 say a first RSA is not).
- Evidence: the same site tells a French reader two opposite things about the same expense, and the French text differs from the Spanish text of the same article.
- Recommended fix: align fr/17.ts lines 150, 185, 398 and 451 with fr/09.ts and the Spanish version (first certificate to get the job is not deductible; renewal or upgrade for a job already held is).

### READ-15-F04: Smaller contradictions between files on the same fact
- Severity: LOW
- Confidence: medium
- Files and lines:
  - White Card expiry: fr/09.ts:6 and :28 ("n'expire pas", issued for life) against es/17.ts:150 and fr/17.ts:150 (lapses after two years without construction work).
  - Casual loading and public holiday rate: fr/09.ts:201 ("elles ne s'additionnent pas simplement") against fr/05.ts:298 ("Elles s'additionnent").
  - Six-month rule exemption for tourism and hospitality: fr/09.ts:353 and :360 ("selon les conditions de l'exemption") against fr/05.ts:227, es/05.ts:221, it/05.ts:225 (anywhere in Australia).
  - Unclaimed super transfer: it/05.ts:18 ("dopo un periodo di inattività") against es/05.ts:12 and fr/05.ts:12 (six months after departure and visa end).
  - PAYG rate in the cash-in-hand guide: fr/05.ts:336 and it/05.ts:334 state 15 % flatly; es/05.ts:330 says "según la tasa que corresponda".
- Recommended fix: pick one statement per fact and apply it to every language.

### READ-15-F05: Other timing and refund-expectation wording
- Severity: LOW
- Confidence: medium
- Files and lines:
  - DASP "within 28 days" without ATO attribution: fr/superannuation/page.tsx:35 (meta description), :222; fr/05.ts:104; it/05.ts:104. (Attributed versions at es/05.ts:48, :100; fr/05.ts:52; it/05.ts:52; fr/superannuation/page.tsx:240, :286, :377 look acceptable.)
  - Refund wait implied as two weeks: es/10.ts:37 ("una espera de dos semanas"), fr/09.ts:440 ("une attente de deux semaines"). Amended refund "unas semanas o un par de meses": es/10.ts:491.
  - Refund expectation: es/10.ts:463 ("muchas enmiendas ... terminan en una devolución mayor"); ja/tax-return/page.tsx:216 (owing tax described as rare) and :417 (section title says refunds arise often).
- Recommended fix: attribute each time to the agency, or remove it; soften the expectation wording.

### READ-15-F06: Tax and wage facts that look dated or doubtful (not checked, no network)
- Severity: LOW
- Confidence: low
- Files and lines:
  - es/tfn/page.tsx:379: the 15 % working holiday maker rate is described as "vigente desde el 1 de julio de 2026". The rate is older than that date; the text reads as if it began then.
  - fr/09.ts:487: Tourist Refund Scheme payment to a card "sous environ cinq jours ouvrables". I recall a much longer official period; could not check.
  - fr/17.ts:415: a named supermarket chain "applique l'award plus directement". Not in the Spanish version (es/17.ts:413); could not check.
  - fr/09.ts:87-89: RSA validity by state; fr/09.ts:265-268: minimum engagement hours by award; es/17.ts:290 and fr/17.ts:292: state rideshare authorisation names; es/tfn/page.tsx:153: visa condition numbers; fr/superannuation/page.tsx:157: paper form numbers. None could be checked.
  - Figures for 2026-27 that are internally consistent across files but could not be checked: national minimum wage 26.44 and casual 33.05, 6 % and 4.75 % (es/05.ts:134-154, fr/05.ts:140-160, it/05.ts:138-158, es/17.ts:86, :476, fr/17.ts:86, :480); cents per kilometre 91c for 2026-27 and 88c for 2025-26 (es/10.ts:62, :74); 1000 dollar standard deduction from 2026-27 (es/17.ts:112, :187, :500; fr/17.ts:112, :187, :504).
- Recommended fix: have each figure checked against the agency source and corrected or dated.

### READ-15-F07: Unfinished or misplaced text
- Severity: INFORMATIONAL
- Confidence: high
- Files and lines:
  - it/05.ts:358: "è una posizione molto migliore, e di solito è una posizione molto più solida" repeats itself; looks like a half-finished edit (customer-facing).
  - ja/tax-return/page.tsx:134: a comment about the two rules sits above REFUND_SOURCES, not RULES; :135-141: comment says the lede holds an "owner-approved" range sentence, but the lede has none (code comments only).
  - ja/tax-return/page.tsx:381: breadcrumb label is the English word "Breadcrumb" on a Japanese page (the French page uses a French label at fr/superannuation/page.tsx:279).
  - es/tfn/page.tsx:379 writes "45.000 AUD" while the Spanish articles write "45 000 AUD".
- Recommended fix: tidy the sentence, move or delete the comments, translate the label, use one number format.

## Notes
- Check 1 (business described as a registered tax agent): no hit. All pages use supervision or "reviewed and approved by a registered tax agent" wording (de/page.tsx:136, :338; es/tfn/page.tsx:454-455; fr/superannuation/page.tsx:473; ja/tax-return/page.tsx:29, :125, :221, :436-437).
- Check 3 (service prices): no service price appears in any file. Dollar amounts found are tax thresholds, wage rates, third-party course costs and worked examples.
- Check 6: no script, iframe, event handler, javascript: or data: URL, http:// link, email address, phone number, key, TFN or bank account pattern. External links are ato.gov.au only (es/tfn/page.tsx:286, :291, :394, :465, :469) plus schema.org context strings. Article bodies are Markdown with relative links only.
- Check 7: no em or en dash in any of the eleven files (pattern search). Box-drawing characters appear only in code comments. Each file is in its own language; English terms kept on purpose (award, payslip, TFN and so on).
- Check 8: the four .tsx pages do not use params or searchParams. Every dangerouslySetInnerHTML is JSON-LD passed through jsonLdHtml; I opened src/lib/json-ld-html.ts and it escapes <, > and &.
- Article links are written without a language prefix (for example /blog/..., /tax-return). I saw a localePath helper imported in src/app/(fr)/fr/blog/data.ts but did not trace it, so I cannot confirm the prefix is added. The page routes linked from the .tsx files exist as folders (fr/expenses/hospitality, fr/expenses/construction, fr/tax-return-australie-pvt, es/devolucion-impuestos-australia).
- No tax fact was checked against a source: no network. Items in F06 are flagged from memory or from disagreement between files only.
