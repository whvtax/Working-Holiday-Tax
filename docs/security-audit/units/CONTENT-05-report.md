# CONTENT-05 report

Scope note: this unit is 50 content/page files, 21,997 lines, about 1.86 MB of prose in German, Spanish, French, Italian and Japanese. I did NOT read all of it line by line. Every file was covered by the pattern sweeps listed under "Method"; only the files marked REVIEWED were read in full. Everything else is PARTIALLY_REVIEWED: for those files my statements rest on grep hits and the listed ranges only. Tax figures could not be checked against the ATO (no network, per the brief).

## Method (applied to all 50 files)
Pattern sweeps (grep, case-insensitive where relevant) over every file in the unit:
- `dangerouslySetInnerHTML`, `<script`, `<iframe`, `javascript:`, `data:` URLs, `srcdoc`, `eval(`, `innerHTML`, `document.write`, inline `on*=` handlers, raw HTML tags inside strings, `${` interpolation inside blog chunk bodies
- `http://` links, all `https://` hosts, `href=`/`src=` targets, markdown link targets, `target="_blank"` without `noopener`
- email addresses, `mailto:`, `tel:`, phone-shaped strings, long digit runs, 8/9/11-digit numbers, key/token shapes (`sk-`, `pk_`, `eyJ`, `AKIA`, `AIza`, `ghp_`, `xox*`, long hex/base64), `process.env`
- prices (220, 385, 330, 495, 440 and all 2-3 digit dollar amounts), guarantee/promise wording in five languages, registered-agent wording in five languages, percentages, thresholds, wage figures, tax years

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(de)/de/abn/page.tsx | 489 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(de)/de/expenses/page.tsx | 402 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(de)/de/page.tsx | 375 | 1-375 | REVIEWED |
| src/app/(de)/de/tfn/page.tsx | 453 | 420-432 + sweep hits | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/01.ts | 448 | 1-25 (lines cut at 300 chars) + sweep hits | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/02.ts | 435 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/04.ts | 427 | 1-282 + sweep hits | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/06.ts | 433 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/07.ts | 418 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/08.ts | 458 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/11.ts | 435 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/13.ts | 458 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/14.ts | 482 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/18.ts | 441 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(es)/es/page.tsx | 373 | 219-245 + sweep hits | PARTIALLY_REVIEWED |
| src/app/(es)/es/tax-return/page.tsx | 490 | 1-490 | REVIEWED |
| src/app/(fr)/fr/abn/page.tsx | 483 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/01.ts | 446 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/02.ts | 435 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/03.ts | 490 | 112-152, 318-324 + sweep hits | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/04.ts | 443 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/06.ts | 448 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/07.ts | 492 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/08.ts | 459 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/11.ts | 445 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/13.ts | 463 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/14.ts | 484 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/expenses/page.tsx | 402 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/tax-return/page.tsx | 482 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/tfn/page.tsx | 423 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/abn/page.tsx | 473 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/01.ts | 444 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/02.ts | 435 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/03.ts | 492 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/04.ts | 419 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/06.ts | 438 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/07.ts | 395 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/08.ts | 449 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/11.ts | 435 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/13.ts | 459 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/14.ts | 483 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/18.ts | 445 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/contact/page.tsx | 196 | 1-196 | REVIEWED |
| src/app/(it)/it/tax-return/page.tsx | 473 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(it)/it/tfn/page.tsx | 423 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/expenses/page.tsx | 401 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/medicare/page.tsx | 373 | 1-373 | REVIEWED |
| src/app/(ja)/ja/superannuation/page.tsx | 465 | 418-428 + sweep hits | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/tfn/page.tsx | 432 | none in sequence; sweep hits only (matched lines, often truncated) | PARTIALLY_REVIEWED |
| src/lib/locale-guide-slugs.ts | 455 | 1-455 | REVIEWED |

Totals: 5 of 50 files read in full (1,889 lines). About 350 further lines read in sequence in 5 other files. Roughly 2,240 of 21,997 lines (10%) were read as continuous text. The remaining ~90% was covered by pattern sweep only. No file was BLOCKED.

## Sweep results (all 50 files)
- `dangerouslySetInnerHTML`: 63 uses in 15 page files, every one is `<script type="application/ld+json">` fed by `jsonLdHtml(...)`. Helper opened: `src/lib/json-ld-html.ts:5-7` does `JSON.stringify` then escapes `<`, `>`, `&` to `<`, `>`, `&`. Inputs are static literals in the same file plus `SITE_URL`, `WA_NUMBER`, `EMAIL`, `AGENT_TPB` constants. No request data reaches them.
- `<iframe>`: 2, both `src/app/(ja)/ja/medicare/page.tsx:323` and `:334`, same hard-coded `https://www.youtube-nocookie.com/embed/<id>`, `referrerPolicy="strict-origin-when-cross-origin"`, no `sandbox` attribute.
- `javascript:`, `data:` URLs, `srcdoc`, `eval(`, `innerHTML`, `document.write`, inline `on*=` handlers: none.
- Raw HTML tags inside strings / blog chunk bodies: none (the only `<x` hit in chunk files is the TypeScript type `Record<string, ...>`). Chunk bodies are markdown in template literals; no `${` interpolation in any chunk.
- `http://` links: none.
- Distinct external hosts: `schema.org` (JSON-LD context, 62), `www.ato.gov.au` (3 links), `www.tpb.gov.au` (2 links, register search with `AGENT_TPB` constant), `www.youtube-nocookie.com` (2 iframes). Nothing else.
- External `<a target="_blank">`: all carry `rel="noopener noreferrer"`.
- Markdown link targets in chunks: all start with `/` or `https://`.
- Email addresses: no literal address. One `mailto:${EMAIL}` built from a constant, `src/app/(it)/it/contact/page.tsx:160`.
- Phone numbers: only public service lines (ATO domestic and international enquiry lines, healthdirect, TIS National), in prose in TFN pages and blog chunks, e.g. `src/app/(de)/de/tfn/page.tsx:203`, `src/app/(ja)/ja/tfn/page.tsx:154`, `src/app/(fr)/fr/blog/chunks/01.ts:159,421`, `src/app/(es)/es/blog/chunks/14.ts:440`. The business WhatsApp number is not a literal in this unit (`WA_NUMBER` constant, `it/contact/page.tsx:123`).
- Key/token shapes, `process.env`: none.
- TFN-like / account-like numbers: no 8-, 9- or 11-digit number anywhere in the unit. The only long digit runs are the public phone numbers above (18 locations, listed by the sweep).
- Tax agent number: not a literal here; `AGENT_TPB` imported from `src/lib/agent.ts` in `fr/tax-return/page.tsx:18` and `it/tax-return/page.tsx:19`.

## Findings

### CONTENT-05-F01: Guarantee scope worded as "returns with TFN income", not "TFN-only returns"
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (business logic / consumer-facing promise)
- Files and lines: `src/app/(de)/de/page.tsx:173,298`; `src/app/(de)/de/tfn/page.tsx:428`; `src/app/(de)/de/expenses/page.tsx:71`; `src/app/(es)/es/page.tsx:164,289`; `src/app/(es)/es/tax-return/page.tsx:444`; `src/app/(fr)/fr/expenses/page.tsx:71`; `src/app/(fr)/fr/tax-return/page.tsx:437`; `src/app/(fr)/fr/tfn/page.tsx:381`; `src/app/(it)/it/contact/page.tsx:99`; `src/app/(it)/it/tax-return/page.tsx:432`; `src/app/(it)/it/tfn/page.tsx:390`; `src/app/(ja)/ja/expenses/page.tsx:71`; `src/app/(ja)/ja/medicare/page.tsx:310`; `src/app/(ja)/ja/superannuation/page.tsx:426`; `src/app/(ja)/ja/tfn/page.tsx:389`
- Evidence: every guarantee paragraph ends with the same qualifier, e.g. "gilt nur für Steuererklärungen mit TFN-Einkommen", "cubre solo las declaraciones con ingresos con TFN", "avec revenus sous TFN", "con reddito TFN", "TFN所得のあるタックスリターンに限られます". Literally that is "returns that have TFN income". A mixed TFN+ABN return also has TFN income, so the sentence can be read as covering it. The brief's rule is: guarantee only for TFN-only returns. Only the ABN pages remove the doubt (`de/abn/page.tsx:439`, `fr/abn/page.tsx:432`, `it/abn/page.tsx:418`), and a customer reading the home, TFN, tax-return or contact page does not see those.
- Root cause: the qualifier was translated as "with TFN income" in all five languages; no word for "only/exclusively TFN income".
- Attack prerequisites: none; a customer with a TFN+ABN return ($385) and a small refund claims the difference citing the published sentence.
- Impact: refund claims outside the intended scope; a misleading-representation argument under the Australian Consumer Law. Money exposure per claim is at most the fee.
- Recommended fix: change the qualifier in every locale to "returns with TFN income only (no ABN income)" and keep one shared string per locale instead of 17 copies.
- Regression test: a content test that fails if a guarantee sentence in any locale page lacks the "only / no ABN" wording.
- Limits of this verification: I am judging translated wording; a native legal reader should confirm. I did not check the client agreement pages (not in this unit) which may define the scope precisely. Guarantee text on pages I only swept was read from grep output.

### CONTENT-05-F02: Refund guarantee band shown on pages for services that are not tax returns
- Severity: INFORMATIONAL
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: `src/app/(ja)/ja/medicare/page.tsx:307-312`; `src/app/(de)/de/tfn/page.tsx:425-430`; `src/app/(fr)/fr/tfn/page.tsx:378-381`; `src/app/(it)/it/tfn/page.tsx:388-391`; `src/app/(ja)/ja/tfn/page.tsx:389`
- Evidence: the "refund lower than our fee, we pay the difference" band sits on TFN-application and Medicare-exemption pages with no sentence saying it belongs to the tax return service. The Japanese super page does add that sentence (`ja/superannuation/page.tsx:421-423`, "this guarantee is for the tax return and does not apply to the super claim"), which shows the risk was recognised there and not elsewhere.
- Root cause: one guarantee block reused across service pages.
- Attack prerequisites: none.
- Impact: a TFN-application or Medicare-only customer may believe the guarantee applies to their fee.
- Recommended fix: add the same one-line scope sentence used on the Japanese super page to the TFN and Medicare pages, or remove the band there.
- Regression test: content test that a guarantee band on a non-tax-return page is preceded by the scope sentence.
- Limits of this verification: fr/it/ja TFN pages were not read in full; a scope sentence could sit elsewhere on those pages. de/tfn 420-432 and ja/medicare (full) were read and have none.

### CONTENT-05-F03: Wording that sits close to "we are the tax agent"; TPB number shown in only two locales
- Severity: LOW
- Confidence: low
- Status: INFORMATIONAL (needs a compliance reader, not a code fix)
- CWE: n/a
- Files and lines: `src/app/(de)/de/page.tsx:268`, `:342-343`; `src/app/(ja)/ja/medicare/page.tsx:251`; `src/app/(es)/es/blog/chunks/04.ts:6,16,22,24,32`; `src/app/(fr)/fr/tax-return/page.tsx:445-446`; `src/app/(it)/it/tax-return/page.tsx:440-441`; `src/app/(es)/es/tax-return/page.tsx` (no TPB number anywhere in the file)
- Evidence: I found NO sentence stating that the business itself is a registered tax agent. The standard wording everywhere is "reviewed and approved by a registered tax agent before lodgement" or "operates under the supervision of a registered tax agent", and several file headers record that the old claim was removed (`de/abn/page.tsx:20-22`, `de/tfn/page.tsx:23`, `fr/tfn/page.tsx:23`, `it/tfn/page.tsx:22`, `ja/tfn/page.tsx:20`, `es/tax-return/page.tsx:22`). Three softer points remain: (a) "Wir regeln das direkt mit dem ATO" / "ATOとは当社が直接やり取りします" ("we deal with the ATO directly"); (b) `de/page.tsx:342-343` "A registered tax agent never asks for your myGov login. Whoever asks is not one of us", which puts "registered tax agent" and "us" in one breath; (c) the Spanish guide says only a registered agent may charge to prepare and lodge a return (`es/04.ts:6,22,24`) and in the same article says "our team prepares your return, then a registered agent reviews and approves it" (`:16`). The guide also tells readers never to send documents to anyone who cannot give a registration number (`:32`), yet the Spanish tax-return page shows no number, while the French and Italian ones show `AGENT_TPB` with a TPB register link.
- Root cause: per-locale copy written separately.
- Attack prerequisites: none.
- Impact: regulatory/advertising exposure (TPB, ACL) if a reader or regulator takes (a)-(c) as a claim of registration or as an admission that an unregistered team prepares returns for a fee.
- Recommended fix: have the supervising agent approve one sentence describing the arrangement and use it in all locales; show the TPB number and register link on every locale's tax-return page; reword (a) and (b).
- Regression test: content test that every locale tax-return page renders `AGENT_TPB`.
- Limits of this verification: I am not a lawyer and cannot judge whether the supervision arrangement meets the Tax Agent Services Act. fr/it chunk 04 "what-is-a-tax-agent" sections were not read (only the Spanish one, lines 1-65). de and ja tax-return pages are not in this unit.

### CONTENT-05-F04: Tax and wage figures that should be re-checked against the source (not verifiable here)
- Severity: INFORMATIONAL
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION (manual check against ATO / Fair Work)
- CWE: n/a
- Files and lines and what to check:
  - National minimum wage "$26.44/hour, $33.05 casual, from 1 July 2026": 21 and 31 occurrences across fr/es/it chunks, e.g. `src/app/(fr)/fr/blog/chunks/11.ts:238`. This is about 6% above the 2025-26 figure I know ($24.95), which is a large one-year rise. Could not confirm.
  - General interest charge "11.51% for October-December 2026": `src/app/(it)/it/blog/chunks/18.ts:97`. Quarterly figure, goes stale every quarter.
  - "$1,000 standard deduction from income year 2026-27, not for 2025-26": `src/app/(fr)/fr/blog/chunks/03.ts:322`, `src/app/(fr)/fr/expenses/page.tsx:212`, and slug `1000-dollar-instant-deduction-rule-2026` in all three locales.
  - Superannuation guarantee charge: French says the administrative uplift "starts at 60% for pay since 1 July 2026" (`src/app/(fr)/fr/blog/chunks/13.ts:359`); Spanish and Italian twins still give the older description "plus an administrative component, none of it deductible" (`src/app/(es)/es/blog/chunks/13.ts:357`, `src/app/(it)/it/blog/chunks/13.ts:355`). The three languages disagree, so at least one is out of date.
  - Processing times: `src/app/(es)/es/tax-return/page.tsx:185` says most online returns are processed in 10 business days and in the same sentence that a refund usually arrives about 14 business days after lodging (also `:62,68,126,215`); `src/app/(de)/de/page.tsx:286` says "within two weeks".
  - Figures that matched what I know and looked consistent across languages (still not checked against the ATO): WHM rates 15% to $45,000, 30% to $135,000, 37% to $190,000, 45% above (`de/page.tsx:177`, `es/page.tsx:168`, `fr/03.ts:130`); 45% no-TFN withholding; 30% for an employer not registered for WHMs (`fr/03.ts:122`); 47% no-ABN withholding over $75 (`de/abn/page.tsx:118,126,135,192`, `it/abn/page.tsx:166,218,320`); GST threshold $75,000; super 11% / 11.5% / 12% and Payday Super from 1 July 2026 with 7 business days (`es/04.ts:228,238,246`); DASP 65% for WHMs, 35%/45% for other temporary residents (`ja/superannuation/page.tsx:152,258`); Medicare levy 2%; $300 immediate tool deduction; lodgement deadline 31 October.
- Evidence: as quoted above.
- Root cause: figures are hard-coded in prose, separately per language, with no shared constants in these files (the German/Italian ABN pages appear to use `ABN_FIGURES`/`TFN_FACTS` arrays local to the file).
- Attack prerequisites: n/a.
- Impact: wrong or stale tax information published under the brand; cross-language contradictions.
- Recommended fix: verify the listed figures with the supervising agent; bring the es/it SGC paragraphs in line with the fr one (or the reverse); drop the quarterly GIC figure or date-stamp it.
- Regression test: a content test comparing key figures across the fr/it/es twins of each guide.
- Limits of this verification: no network, so nothing was compared with ato.gov.au or fairwork.gov.au. Figures come from sweep tallies; I did not read every sentence containing a number.

## Checked and found sound
- Prices: the only service price printed in this unit is $385 for a return with ABN income, on `de/abn/page.tsx:439`, `fr/abn/page.tsx:432`, `it/abn/page.tsx:418`. It matches the brief. The numbers 220, 330, 495, 440 do not appear as prices anywhere in the unit. Other pages say the fee is fixed and confirmed on WhatsApp before work starts. All other dollar amounts in the sweep tally were wage/tax worked examples; I did not open each one in context.
- No refund promise or guaranteed amount found. Sweeps for first-person guarantee verbs, "maximum refund", "no refund no fee", "average refund" in five languages returned only disclaimers ("no result is guaranteed", "we promise no refund", "there is no average refund worth quoting": `fr/03.ts:150`, `es/01.ts:256`, `it/01.ts:252`, `fr/08.ts:22`, `it/08.ts:22`).
- Every guarantee statement found carries the full-fee-if-no-refund sentence and a TFN qualifier (see F01 for the wording issue).
- JSON-LD injection: `src/lib/json-ld-html.ts:5-7` escapes `<`, `>`, `&`; all inputs static.
- JSON-LD types are `Service`, `WebPage`, `FAQPage`, `HowTo`, `BreadcrumbList`, `ContactPage`; none declares the business as an accounting or tax-agent entity; the business node is referenced by `@id` only (`es/page.tsx:221-238`, `de/page.tsx:209-213`).
- No secrets, tokens, customer data, TFNs, bank numbers or private phone numbers in any of the 50 files.
- `src/lib/locale-guide-slugs.ts`: pure data; the fr, it and es lists each hold 144 slugs and are identical sets.
- External links: HTTPS only, three hosts, `rel="noopener noreferrer"` on all `_blank` anchors.
- myGov anti-phishing notices present (`de/page.tsx:341-344`, `es/tax-return/page.tsx:452-455`, `es/04.ts:30`).

## Open questions
1. Blog chunk bodies are markdown with un-prefixed internal links (`](/tax-return)` 233 times, `](/blog/...)`, `](/calculator)`). Whether the renderer localises these to `/es/...`, `/fr/...`, `/it/...` and whether it passes raw HTML through was not checked: the renderer (`src/app/(site)/blog/[slug]/GuideArticle`, used by `src/components/blog/LocaleGuidePage.tsx`) is outside this unit and I did not read it. The chunks themselves contain no raw HTML today.
2. The YouTube iframes on `ja/medicare/page.tsx:323,334` rely on the site CSP `frame-src` allowing `youtube-nocookie.com`; CSP config is outside this unit.
3. Reply-time statements ("answer in about an hour") appear without the business-hours qualifier in some places (`de/page.tsx:257,272,369`; `ja/medicare/page.tsx:234,315,367`) and with it in others (`es/tax-return/page.tsx:362`, `it/contact/page.tsx:83`). Is the unqualified version intended?
4. "The ATO pays tax refunds only into an Australian bank account" is repeated on most pages (`it/contact/page.tsx:61`, `de/page.tsx:181`, `es/tax-return/page.tsx:83,165,196`). Not verified.
5. About 90% of the unit's lines were not read as continuous text. A full human or second-pass read of the 33 blog chunk files is still needed for claims a pattern sweep cannot catch.
