# READ-19 report

## Coverage

| file | range assigned | range read | status |
|---|---|---|---|
| src/app/(de)/de/medicare/page.tsx | 1-330 | 1-330 | REVIEWED |
| src/app/(es)/es/blog/chunks/02.ts | 1-435 | 1-435 | REVIEWED |
| src/app/(es)/es/blog/chunks/06.ts | 1-433 | 1-433 | REVIEWED |
| src/app/(es)/es/blog/chunks/11.ts | 1-435 | 1-435 | REVIEWED |
| src/app/(es)/es/blog/chunks/18.ts | 1-441 | 1-441 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/02.ts | 1-435 | 1-435 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/04.ts | 1-443 | 1-443 | REVIEWED |
| src/app/(fr)/fr/blog/chunks/11.ts | 1-445 | 1-445 | REVIEWED |
| src/app/(it)/it/blog/chunks/01.ts | 1-444 | 1-444 | REVIEWED |
| src/app/(it)/it/blog/chunks/02.ts | 1-435 | 1-435 | REVIEWED |
| src/app/(it)/it/blog/chunks/06.ts | 1-438 | 1-438 | REVIEWED |
| src/app/(it)/it/blog/chunks/11.ts | 1-435 | 1-435 | REVIEWED |
| src/app/(it)/it/blog/chunks/18.ts | 1-445 | 1-445 | REVIEWED |

Total: 5,594 of 5,594 assigned lines read. Each file was read in one pass (all are under 700 lines). Other files opened to judge findings: `src/lib/json-ld-html.ts` (the escaping helper) and directory listings under `src/app` to confirm that linked routes exist.

## Findings

### READ-19-F01: Tax statements that contradict each other inside the same file or between language versions of the same article

- Severity: MEDIUM
- Confidence: high that the contradictions exist; medium on which side is right (no network, facts not checked against the ATO)
- Files and lines:
  - `src/app/(es)/es/blog/chunks/18.ts:178` says that leaving before 30 June does not by itself create over-withholding at the flat 15%; `:330` in the same file lists "un vuelo de regreso en marzo" among the things that move the figure.
  - `src/app/(it)/it/blog/chunks/18.ts:167` lists "una partenza anticipata" as a cause of over-withholding and `:334` repeats the March flight; the same file at `:423` says the 15% is flat and an early return does not change the rates. `src/app/(fr)/fr/blog/chunks/04.ts:118` states the opposite of `:167` ("Une année partielle ne crée pas à elle seule de retenue en trop").
  - `src/app/(it)/it/blog/chunks/06.ts:228` says a casual with uneven pay can be over-withheld "perché ogni pay run è tassata come se fosse tipica"; the Spanish version of the same paragraph, `src/app/(es)/es/blog/chunks/06.ts:228`, says the flat 15% means uneven pay does not change what is withheld.
  - `src/app/(it)/it/blog/chunks/18.ts:99` gives about 115 and about 390 for a 1,000 debt after one and three years at 11.51%; `src/app/(es)/es/blog/chunks/18.ts:99` gives about 120 and about 410 for the same rate. Daily compounding at 11.51% gives roughly 122 and 412, so the Italian figures look wrong.
  - `src/app/(it)/it/blog/chunks/18.ts:305` says an early return "anticipa i tempi di mesi"; `:391` in the same file says 50 business days of processing and "non per forza l'esito".
  - `src/app/(es)/es/blog/chunks/02.ts:330` and `src/app/(it)/it/blog/chunks/02.ts:330` say a TFN is required to register an ABN; `:186` in both files says only that an application without a TFN is more likely to go to manual review. The French version (`fr/blog/chunks/02.ts:330`) uses the softer wording.
  - `src/app/(es)/es/blog/chunks/06.ts:345` opens with "Normalmente los working holiday makers no pagan el Medicare levy", while its own description (`:343`) and the rest of the Spanish Medicare articles say it depends on the individual case and nothing should be assumed.
  - `src/app/(it)/it/blog/chunks/18.ts:263` states flatly that the tax-free threshold exception applies only to citizens of a few treaty countries and that Italy is not one; `src/app/(it)/it/blog/chunks/11.ts:301` says whether the threshold applies "varia da persona a persona". The Spanish and French versions avoid the country-specific claim. Not checked.
- Evidence: resident-style withholding logic (partial year, annualised pay runs) survives in some paragraphs of working holiday maker articles that elsewhere state a flat 15%.
- Recommended fix: pick one position per fact and align all language versions; remove "partenza anticipata" and the March-flight item as causes of over-withholding, or explain the case in which they apply; correct the Italian interest figures; drop "anticipa i tempi di mesi".

### READ-19-F02: Refund and timing statements that are not hedged or not attributed

- Severity: MEDIUM
- Confidence: medium (wording judgement against rule 2 of the brief)
- Files and lines:
  - Payment timing stated as the site's own fact, without "the ATO says": `src/app/(it)/it/blog/chunks/02.ts:419` and `src/app/(it)/it/blog/chunks/18.ts:291` (DASP approved "in circa 28 giorni"); `src/app/(it)/it/blog/chunks/18.ts:188` (most online returns processed "in circa 12 giorni lavorativi"). The Spanish and French versions attribute both to the ATO (`es/blog/chunks/18.ts:190`, `es/blog/chunks/02.ts:419`, `fr/blog/chunks/02.ts:419`).
  - Timing in a headline: `src/app/(fr)/fr/blog/chunks/04.ts:285-286` ("Délai du DASP : versé en général sous 28 jours"), attributed to the ATO only in the description and body.
  - Unhedged "you recover it" wording: `src/app/(it)/it/blog/chunks/01.ts:97` ("la tax return che recupera le imposte trattenute in eccesso"), `:173` ("puoi ancora reclamare la ritenuta in eccesso"); `src/app/(it)/it/blog/chunks/02.ts:200` ("l'eccedenza si recupera"); `src/app/(it)/it/blog/chunks/11.ts:430`; `src/app/(es)/es/blog/chunks/18.ts:32` and `src/app/(it)/it/blog/chunks/18.ts:32` (bank withholding "se recupera"). `src/app/(it)/it/blog/chunks/01.ts:252` says many people "vedono un conguaglio consistente", then adds that no outcome is guaranteed.
  - `src/app/(es)/es/blog/chunks/11.ts:334` ("Para muchas personas, la devolución viene de lo retenido de más y de la exención del Medicare levy") implies a refund is usual.
  - `src/app/(de)/de/medicare/page.tsx:205, 272, 324`: "Antwort in etwa einer Stunde" is a response-time promise (not a refund-time promise). `:94` and `:218` give dollar sizes of the levy (about 800 at 40,000), which read as an implied saving.
- Evidence: most of the unit uses careful wording ("puede", "dépend de votre année", "decide l'ATO"); the lines above are the exceptions.
- Recommended fix: attribute every processing time to the ATO in all languages, replace "si recupera / recupera" with the conditional form used elsewhere, and decide whether the one-hour reply claim is one the business can keep.

### READ-19-F03: Wording about who must be registered sits awkwardly with the supervision model

- Severity: LOW
- Confidence: medium
- Files and lines: `src/app/(fr)/fr/blog/chunks/04.ts:6` ("Quiconque facture un travail fiscal doit détenir cet enregistrement"), `:26`, `:30`; `src/app/(es)/es/blog/chunks/11.ts:419`; `src/app/(fr)/fr/blog/chunks/11.ts:427`; `src/app/(it)/it/blog/chunks/11.ts:419`; `src/app/(de)/de/medicare/page.tsx:223-224` ("Wir regeln das direkt mit dem ATO").
- Evidence: no line in the unit says the business is itself a registered tax agent or accountant. All direct descriptions use the allowed supervision wording (`de/medicare/page.tsx:269`, `fr/blog/chunks/04.ts:16`, `es/blog/chunks/06.ts:377`, `it/blog/chunks/06.ts:377`, `es/blog/chunks/18.ts:371`, `it/blog/chunks/18.ts:233` and `:375`). The listed lines, though, tell readers that anyone charging for tax work must hold the registration and that documents should not go to anyone who cannot show one, and the German page says "we" deal directly with the ATO. A reader can take these together as a claim that the business is the registered party.
- Recommended fix: where these warnings appear, add the same sentence used elsewhere (prepared by the team, reviewed and approved by a registered tax agent whose registration can be looked up), and reword the German line so the agent, not "wir", deals with the ATO.

### READ-19-F04: Date-bound figures and phrases that will go stale, and figures that could not be checked

- Severity: LOW
- Confidence: high that they are date-bound; not checked for accuracy (no network)
- Files and lines:
  - "The 2026 deadline has just passed": `es/blog/chunks/18.ts:188`, `:299`; `it/blog/chunks/18.ts:186`, `:303`; `fr/blog/chunks/02.ts:44` ("pour 2025-26, elle est passée"). The Spanish and Italian versions of that last article (`es/blog/chunks/02.ts:44`, `it/blog/chunks/02.ts:44`) do not carry the note.
  - "Current year 2026-27": `fr/blog/chunks/04.ts:112`.
  - General Interest Charge "11.51% for October to December 2026": `es/blog/chunks/18.ts:97`, `it/blog/chunks/18.ts:97`.
  - Penalty unit 364 and cap 1,820 "from 1 July 2026": `es/blog/chunks/11.ts:24`, `fr/blog/chunks/11.ts:24`, `it/blog/chunks/11.ts:24`, `es/blog/chunks/18.ts:109`, `it/blog/chunks/18.ts:109`.
  - Minimum wage 26.44 and casual 33.05 "from 1 July 2026": `es/blog/chunks/06.ts:16`, `:211`; `it/blog/chunks/06.ts:16`, `:211`; `es/blog/chunks/11.ts:81`, `:146`, `:236`, `:242`; `fr/blog/chunks/11.ts:81`, `:146`, `:238`, `:244`; `it/blog/chunks/11.ts:81`, `:146`, `:236`, `:242`.
- Evidence: these figures are consistent with each other across the unit (26.44 × 1.25 = 33.05; 5 × 364 = 1,820). Their accuracy was not verified.
- Recommended fix: verify each figure against the source agency, and move date-bound phrases to wording that does not expire or to one shared constant.

### READ-19-F05: French article gives a firmer assurance on visa consequences than the other languages

- Severity: LOW
- Confidence: medium
- Files and lines: `src/app/(fr)/fr/blog/chunks/11.ts:269-271` ("En principe, non"; a good-faith complaint "n'est pas un motif de réexamen de votre visa"). Compare `es/blog/chunks/11.ts:267-269` ("no debería") and `it/blog/chunks/11.ts:267-269`, which sends the reader to a registered migration adviser.
- Evidence: the French text reads as migration advice stated as fact.
- Recommended fix: align the French text with the Italian version.

### READ-19-F06: Embedded third-party iframe on the German Medicare page

- Severity: INFORMATIONAL
- Confidence: high
- Files and lines: `src/app/(de)/de/medicare/page.tsx:280-288` and `:291-299` (two iframes, `youtube-nocookie.com` embed, a non-government external domain).
- Evidence: fixed `https` URL written in the source, `referrerPolicy` set, no `sandbox` attribute. Not user-controlled.
- Recommended fix: none required if the content security policy allows only this frame source; confirm it does.

## Notes

- No statement that the business is a registered tax agent, accountant or 税理士 was found.
- Guarantee: the only guarantee text in the unit is `de/medicare/page.tsx:267`, and it carries the TFN-only limit. Other uses of "garantizado / garanti / garantito" refer to award minimums and rosters.
- Prices: no service price appears anywhere in the unit. Dollar amounts are wages, thresholds, penalties and worked examples.
- Em and en dashes: none in any of the 13 files (searched by pattern as well as read).
- Raw HTML, script, event handlers, `javascript:` or `data:` URLs, `http://` links, emails: none in the 12 chunk files. All links in article bodies are relative Markdown links. The only absolute URLs are in the .tsx page (`schema.org` context strings and the embed in F06).
- Phone numbers: only the ATO public lines appear (`es/blog/chunks/02.ts:24`, `:85`; `fr/blog/chunks/02.ts:24`, `:85`; `it/blog/chunks/01.ts:159`, `:421`; `it/blog/chunks/02.ts:24`, `:85`). Nothing shaped like a key, TFN or bank account.
- Placeholder text (TODO, lorem, XXX): none.
- Language: each file is in its own language. English terms (payslip, award, casual, tax return) are used on purpose throughout. `es/blog/chunks/18.ts:383` quotes one ATO sentence in English and translates it straight after; not flagged.
- .tsx checks for `de/medicare/page.tsx`: no `params` or `searchParams`; the four `dangerouslySetInnerHTML` uses (`:183-186`) are JSON-LD passed through `jsonLdHtml`, which escapes `<`, `>` and `&` (`src/lib/json-ld-html.ts`).
- Internal link targets that looked unusual were checked by directory listing only and exist: `/contact`, `/expenses/labouring`, `/blog/category`, `/es/devolucion-impuestos-australia`, `/it/dichiarazione-redditi-australia`, `/fr/tax-return-australie-pvt`. Most body links are unprefixed (`/tax-return`) while a few carry a locale prefix; how unprefixed links are localised at render time was not examined.
- Tax facts that read as consistent across the unit but were not checked against a source: 15% to 45,000 then 30/37/45%; 45% without a TFN; 30% for an unregistered employer; 47% without an ABN; GST threshold 75,000; super 12% from 1 July 2025; Payday Super from 1 July 2026; DASP 65%; eleven reciprocal health care countries; Italy and Malta limited to six months; early lodgment cut-off 15 June and 50 business days.
