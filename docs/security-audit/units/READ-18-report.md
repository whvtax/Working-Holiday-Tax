# READ-18 report

## Coverage
| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/tfn/page.tsx | 1-453 | 1-453 | REVIEWED |
| src/app/(es)/es/blog/chunks/01.ts | 1-448 | 1-448 | REVIEWED |
| src/app/(es)/es/blog/chunks/08.ts | 1-458 | 1-458 | REVIEWED |
| src/app/(es)/es/blog/chunks/13.ts | 1-458 | 1-458 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/01.ts | 1-446 | 1-446 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/06.ts | 1-448 | 1-448 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/08.ts | 1-459 | 1-459 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/13.ts | 1-463 | 1-463 | REVIEWED |
| src/app/(it)/it/blog/chunks/08.ts | 1-449 | 1-449 | REVIEWED |
| src/app/(it)/it/blog/chunks/13.ts | 1-459 | 1-459 | REVIEWED |
| src/app/(ja)/ja/superannuation/page.tsx | 1-465 | 1-465 | REVIEWED |
| src/lib/locale-guide-slugs.ts | 1-455 | 1-455 | REVIEWED |

Total: 5,504 lines read of 5,504 assigned. Each file was read in one pass (all are under 700 lines).

## Findings

### READ-18-F01: French, Spanish and Italian articles still describe withholding as an annualised estimate, against the flat 15 % stated beside it
- Severity: MEDIUM
- Confidence: medium (internal contradiction is certain; which side is right could not be checked, no network)
- Files and lines:
  - src/app/(fr)/fr/blog/chunks/08.ts:4, 6, 10, 12, 50 against 08.ts:30
  - src/app/(es)/es/blog/chunks/13.ts:440 against es/08.ts:10, 29
  - src/app/(it)/it/blog/chunks/13.ts:441 and it/08.ts:6 against it/08.ts:10
- Evidence: fr/08.ts says payroll withholds "comme si cette semaine se répétait pendant douze mois", that a working holiday year is "si souvent trop taxée", lists a part-year arrival as a cause, and says "trois mois taxés comme s'ils en valaient douze peuvent être surtaxés". Line 30 of the same article says "au taux de 15 %, une année partielle ne crée pas à elle seule de retenue en trop". The Spanish and Italian twins of that article were already corrected to the flat-rate wording (es/08.ts:10, it/08.ts:10), and fr/13.ts:445 states the flat-rate logic for the injury article, while es/13.ts:440 and it/13.ts:441 still say unpaid weeks mean withholding "se pasó" / "possono essere state eccessive", and es/13.ts:440 adds "puede reflejarse en una devolución mayor".
- Why it matters: the stale wording suggests a refund from a short or interrupted year that the flat rate does not produce (brief items 2 and 5).
- Recommended fix: bring fr/08.ts lines 4-12 and 50 into line with es/08.ts:6-15; bring es/13.ts:440 and it/13.ts:441 into line with fr/13.ts:445; drop "stima dei dodici mesi successivi" at it/08.ts:6.

### READ-18-F02: Spanish and Italian articles contradict each other on whether the Super Guarantee Charge is deductible
- Severity: LOW
- Confidence: medium (could not check the law)
- Files and lines: src/app/(es)/es/blog/chunks/13.ts:357 against es/08.ts:322; src/app/(it)/it/blog/chunks/13.ts:355 against it/08.ts:327
- Evidence: the "employer not paying" articles say of the charge "nada de eso es deducible" / "nulla di tutto questo deducibile", with no date limit, while describing the regime from 1 July 2026. The SGC articles in the same locales say the charge is deductible for periods from 1 July 2026 and not for earlier quarters. The French pair is consistent (fr/08.ts:323; fr/13.ts:359 makes no deductibility claim).
- Recommended fix: align es/13.ts:357 and it/13.ts:355 with the dated wording, after checking the ATO position.

### READ-18-F03: Guarantee limit reads "returns with TFN income", not "TFN-only returns"
- Severity: LOW
- Confidence: medium
- Files and lines: src/app/(de)/de/tfn/page.tsx:428; src/app/(ja)/ja/superannuation/page.tsx:426
- Evidence: German "Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen"; Japanese "この保証の対象は、TFN所得のあるタックスリターンに限られます". A TFN plus ABN return also has TFN income, so both sentences can be read as covering it. The limit is present but looser than the rule.
- Recommended fix: say the return must contain TFN income only ("ausschließlich TFN-Einkommen"; "TFN所得のみのタックスリターン").

### READ-18-F04: German and Japanese pages say the business deals with the ATO directly, without the supervision wording
- Severity: LOW
- Confidence: low (wording judgement)
- Files and lines: src/app/(de)/de/tfn/page.tsx:148-149, 394-395 (compare 92, 173, 203); src/app/(ja)/ja/superannuation/page.tsx:416 (compare 190-193, 428)
- Evidence: German "Danach muss jemand dort anrufen, und das musst nicht du sein" and "Wir regeln das direkt mit dem ATO"; Japanese "ATOとは当社が直接やり取りします". Neither page says the business itself is a registered agent, but both present it as acting before the ATO for the customer, and the registered tax agent sentence on each page (de 410-411, ja 428) is tied to tax returns. The German page also tells the reader to phone the ATO personally (203), so it is not consistent about who makes contact.
- Recommended fix: attach the "reviewed and approved by a registered tax agent" wording to these claims, or reword to "we prepare it with you" (as at de/tfn/page.tsx:64).

### READ-18-F05: French articles say wage withholding "often absorbs" the tax on ABN income
- Severity: LOW
- Confidence: medium (could not check)
- Files and lines: src/app/(fr)/fr/blog/chunks/01.ts:314; src/app/(fr)/fr/blog/chunks/06.ts:105, 115, 174
- Evidence: "la retenue côté salaires absorbe souvent l'impôt dû côté ABN", "les retenues sur ces salaires la couvrent". With wages withheld at a flat 15 % there is normally no surplus to cover untaxed ABN income; fr/08.ts:454 says ABN income makes a shortfall worse. The Spanish twin is more careful ("puede compensar en parte", es/01.ts:318).
- Recommended fix: use the Spanish wording or remove the claim.

### READ-18-F06: Same facts stated differently across locales
- Severity: INFORMATIONAL
- Confidence: low (could not check which version is right)
- Files and lines and evidence:
  - Tourism and hospitality exemption from the six-month rule: "en cualquier parte de Australia" (es/08.ts:189) and "in tutta l'Australia" (it/08.ts:194), but "selon les conditions de l'exemption" (fr/08.ts:190).
  - What the 5,000 dollar DASP threshold triggers: certified identity copies (ja/superannuation/page.tsx:122, 260, 270, 349), against a Certification of Immigration Status on paper applications, with certified copies possible at any balance (es/13.ts:129-131; fr/13.ts:127-129; it/13.ts:127).
  - DASP when another visa is planned: allowed because only the earning visa must have ended (es/13.ts:123; it/13.ts:123), against "ni tant qu'un autre visa australien est actif" (fr/13.ts:123; also it/13.ts:141).
  - Several small super balances: "plusieurs soldes peuvent être traités ensemble" (fr/08.ts:147; it/08.ts:151), against one application per account (es/08.ts:146).
- Recommended fix: pick one checked wording per fact and apply it to all locales.

### READ-18-F07: Dated figures and one unattributed timing statement that could not be checked
- Severity: INFORMATIONAL
- Confidence: low
- Files and lines: national minimum wage 26.44 and casual minimum 33.05 "from 1 July 2026" (es/08.ts:251; fr/06.ts:16, 211; fr/08.ts:252; it/08.ts:256); "Le domande vengono di solito approvate in circa 28 giorni" with no ATO attribution (it/08.ts:151), where the other locales attribute the 28 days to the ATO.
- Evidence: the wage figures agree with each other and across files; I could not confirm them. The Italian sentence is about DASP, not a tax refund.
- Recommended fix: confirm the wage figures against the annual wage review; add "secondo l'ATO" at it/08.ts:151.

## Notes
- Checked by full reading plus a byte-level search of all twelve files: no en dash, em dash or horizontal bar; no http:// link; no email address; no raw HTML, iframe, event handler, javascript: or data: URL in content; no TODO, lorem or XXX; nothing shaped like a key, TFN or bank account. The only absolute URLs are the schema.org context strings and SITE_URL templates.
- Phone numbers present are the two ATO public lines only (de/tfn/page.tsx:203; es/01.ts:161; fr/01.ts:159, 421).
- No service price appears anywhere in the unit (no 220, 385, 330, 495 or 440, and no other fee figure).
- No statement that the business is itself a registered tax agent or accountant. Supervision wording is used at es/08.ts:97, 429, 447; fr/08.ts:98, 430; it/08.ts:102, 426; de/tfn/page.tsx:410-411; ja/superannuation/page.tsx:428.
- No refund amount is promised. Refund timing is always attributed to the ATO and qualified ("no una garantía", "pas une garantie", "non una garanzia": es/08.ts:95; fr/08.ts:96; it/08.ts:100). fr/01.ts:252 states "Nous ne pouvons rien promettre".
- The two .tsx pages use no params or searchParams. Every dangerouslySetInnerHTML (de 300-303; ja 279-283) is JSON-LD passed through jsonLdHtml; I did not open src/lib/json-ld-html to confirm its escaping.
- Each file is in the language of its locale, with English tax terms kept on purpose. The ja page carries English code comments at lines 17-22 and 232 (not customer-facing).
- Internal links in the es, fr and it chunks are mostly written without a locale prefix (/tfn, /tax-return, /blog/...), with a few explicit ones (es/08.ts:55, 109; es/13.ts:49; fr/08.ts:6, 110; fr/13.ts:6; it/08.ts:6, 67; it/13.ts:6). I did not open the renderer to confirm that unprefixed links are localised at render time.
- src/lib/locale-guide-slugs.ts holds slug lists only; the fr, it and es lists looked identical on reading (145 entries each by line range), not diffed by tool.
