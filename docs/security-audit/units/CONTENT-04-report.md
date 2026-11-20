# CONTENT-04 report

Scope: 40 content and page files, 21,997 lines (1.87 MB). Method: (1) grep pass over ALL 40 files for risky constructs; (2) line-by-line reading of as much as fitted; (3) targeted grep over ALL 40 files for agent claims, prices, guarantee wording and tax rates, with the hits read in context.

Honest coverage statement: 6 files were read in full (2,982 lines). 7 more were read in the short ranges listed (306 lines). About 3,290 of 21,997 lines (15%) were read line by line. The other 27 files were covered by grep only: no consecutive range was read, so prose in them that the grep patterns do not match was NOT reviewed. Tax figures could not be checked against the ATO (no network).

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(de)/de/superannuation/page.tsx | 513 | none (grep only; grep hits at 136-138, 217, 263, 269-273, 338, 342, 382, 437, 472-478 seen as single lines) | PARTIALLY_REVIEWED |
| src/app/(de)/de/tax-return/page.tsx | 537 | 262-282, 396-537 | PARTIALLY_REVIEWED |
| src/app/(es)/es/abn/page.tsx | 502 | 1-502 | REVIEWED |
| src/app/(es)/es/blog/chunks/05.ts | 517 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/09.ts | 512 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/10.ts | 514 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/12.ts | 510 | 96-104 | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/15.ts | 535 | 352-366, 413-470 | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/16.ts | 541 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/17.ts | 529 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/devolucion-impuestos-australia/page.tsx | 648 | none (grep only; hits at 27, 67, 238, 278, 357, 386-389, 429, 524, 601-603, 613 seen as single lines) | PARTIALLY_REVIEWED |
| src/app/(es)/es/superannuation/page.tsx | 580 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(es)/es/tfn/page.tsx | 516 | none (grep only; hits at 195-197, 336-339, 455, 494-498) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/05.ts | 523 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/09.ts | 514 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/10.ts | 512 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/12.ts | 512 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/15.ts | 612 | 455-476 | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/16.ts | 545 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/blog/chunks/17.ts | 533 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/superannuation/page.tsx | 515 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/tax-return-australie-pvt/page.tsx | 563 | 1-563 | REVIEWED |
| src/app/(it)/it/blog/chunks/05.ts | 521 | 262-270 | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/09.ts | 513 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/10.ts | 514 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/12.ts | 508 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/15.ts | 539 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/16.ts | 541 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/blog/chunks/17.ts | 537 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(it)/it/dichiarazione-redditi-australia/page.tsx | 585 | 1-585 | REVIEWED |
| src/app/(it)/it/superannuation/page.tsx | 545 | none (grep only) | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/abn/page.tsx | 500 | none (grep only; hits at 22, 49, 340-343, 452-455) | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/tax-return/page.tsx | 525 | none (grep only; hits at 22, 221, 241, 374-378, 436, 481-487) | PARTIALLY_REVIEWED |
| src/lib/formStrings.ts | 589 | 1-589 | REVIEWED |
| src/lib/svt/content/blog-vi.ts | 733 | none (grep only) | PARTIALLY_REVIEWED |
| src/lib/svt/content/blog-zh.ts | 731 | none (grep only) | PARTIALLY_REVIEWED |
| src/lib/svt/content/guides-en.ts | 574 | 1-574 | REVIEWED |
| src/lib/svt/content/long/vi/batch-11.ts | 805 | 630-648 | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/zh/batch-11.ts | 785 | 615-625 | PARTIALLY_REVIEWED |
| src/lib/svt/content/services-zh.ts | 169 | 1-169 | REVIEWED |

Files opened outside the unit to judge a finding (a few lines each, not reviewed): src/lib/json-ld-html.ts:5-7, src/lib/svt/content/home-en.ts:43-56, src/lib/legal/legal-text.ts (grep hits at 43, 67, 70-72, 79, 83, 88, each cut at 300 characters), CLAUDE.md:33-38, src/lib/__tests__/mark-task-done-erases.test.ts:28,35, src/app/(site)/crm/dashboard/DashboardClient.tsx:2055,2060.

### Grep pass results (all 40 files)
- `dangerouslySetInnerHTML`: 52 uses in 12 page files, every one of the form `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(x) }} />` over objects built from static constants in the same file. `jsonLdHtml` (src/lib/json-ld-html.ts:5-7) escapes `<`, `>` and `&`. No other use.
- `<script` other than JSON-LD, `<iframe`, `javascript:`, `data:` URLs, `innerHTML`, `eval(`, `new Function`, inline `on*=` handlers: none.
- `http://` links: none.
- Raw HTML tags inside the `.ts` content strings (blog chunks, SVT content): none found (only TypeScript generics matched). JSX tags in the 12 `page.tsx` files are ordinary markup.
- Markdown link targets in blog bodies: only relative (`/…`) or `https://www.ato.gov.au/…`. No other scheme.
- External domains with a scheme: schema.org (52), www.ato.gov.au (41), www.tpb.gov.au (3), www.servicesaustralia.gov.au (1). Named in prose without a link: business.gov.au, abr.gov.au, impots.gouv.fr.
- `target="_blank"`: present in 6 files, every occurrence carries `rel="noopener noreferrer"`.
- Email addresses: placeholders only (formStrings.ts:496-500, 523), on example/email-style domains.
- Phone numbers: placeholders in formStrings.ts:141, 142, 489-493, 524; public helplines in es/blog/chunks/12.ts:102,179, it/blog/chunks/12.ts:102,179, svt/content/blog-zh.ts:491,502,503,509, blog-vi.ts:503,504,510, long/zh/batch-11.ts:308, long/vi/batch-11.ts:308. No personal number found.
- Key or token shapes (sk-, eyJ, AKIA, EAA, long hex, `api_key`, `secret`, `token`, `password`, `Bearer`): none. Long matches were URL slugs only.
- TFN-like or account-like numbers: none. One 8-digit number is a tax agent registration number in a public-register link (src/lib/svt/content/guides-en.ts:567).
- `'use client'`, `process.env`, `fetch(`, `cookies(`, `headers(`, `searchParams`, `localStorage`, `window.`, `document.`: none in the unit. All 12 pages are static server components.

## Findings

### CONTENT-04-F01: Student Visa Tax pricing guide states the fee-difference guarantee without the TFN-only limit
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (that the limit is absent from the text); REQUIRES_RUNTIME_VALIDATION (whether the business honours it for $385 returns)
- CWE: n/a (business-logic / misleading representation)
- Files and lines: src/lib/svt/content/guides-en.ts:65, 83-90 (also seen outside the unit: src/lib/svt/content/home-en.ts:43-53, CLAUDE.md:35-37)
- Evidence: the meta description (line 65) lists both prices, "$220 … $385 with ABN work", and then says "If your refund is smaller than our fee, we pay you the difference". The `guarantee` section (lines 83-90) repeats it with no exclusion for returns with ABN work. Every Working Holiday Tax page in this unit that states the guarantee adds the limit, for example fr/tax-return-australie-pvt/page.tsx:474, it/dichiarazione-redditi-australia/page.tsx:225 and 526, de/tax-return/page.tsx:275 and 500, es/abn/page.tsx:454, ja/abn/page.tsx:455, ja/tax-return/page.tsx:241.
- Root cause: the SVT copy rule in CLAUDE.md:35-37 describes the guarantee without the TFN-only condition, so SVT text was written without it.
- Attack prerequisites: none. Any customer who paid $385 can rely on the published wording.
- Impact: a customer with ABN income can claim the difference under the published promise. Either the business pays out where the audit brief says it should not, or it refuses and the page is a misleading representation.
- Recommended fix: add "The guarantee applies only to returns with TFN income" (or the agreed wording) to lines 65 and 86-88, to home-en.ts and its zh/vi counterparts, and to the rule in CLAUDE.md.
- Regression test: a content test that every SVT string matching /pay you the difference|difference/ in a guarantee context also contains the TFN-only sentence, in en, zh and vi.
- Limits of this verification: I did not read guides-zh.ts, guides-vi.ts or the other SVT content files; a grep for the Chinese and Vietnamese words for "difference" in guides-zh.ts and guides-vi.ts returned nothing, which I did not investigate. legal-text.ts:70 was seen cut at 300 characters, so I do not know whether the Client Agreement itself limits the guarantee.

### CONTENT-04-F02: Form tells the customer the passport selfie is "deleted immediately after verification"; code seen suggests otherwise
- Severity: LOW
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: n/a (privacy representation; nearest CWE-359)
- Files and lines: src/lib/formStrings.ts:397-401 (`selfieHint`, en/de/ja)
- Evidence: the hint promises the photo is "deleted immediately after verification". Outside the unit, the CRM dashboard lists a stored file under `/tax-form/selfie/` as "Selfie with passport" (DashboardClient.tsx:2060), and a test deletes selfie files when a task is marked done (mark-task-done-erases.test.ts:35). That points to retention until the job is closed, not deletion straight after an identity check.
- Root cause: copy written before, or independently of, the retention logic.
- Attack prerequisites: none.
- Impact: a privacy statement about an identity document that may be untrue; exposure under the Privacy Act and consumer law, and a longer retention window for a passport selfie than the customer was told.
- Recommended fix: either delete the selfie when verification is recorded, or change the hint to the real retention rule.
- Regression test: a test that the stored selfie object is gone after the verification step that the hint names.
- Limits of this verification: I read only the two outside lines cited. I did not trace the deletion code path, so the claim may be met by code I did not open.

### CONTENT-04-F03: Spanish ABN page dates the working holiday maker rate as "in force since 1 July 2026"
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: n/a
- Files and lines: src/app/(es)/es/abn/page.tsx:162
- Evidence: `ABN_FIGURES` says the 15% rate up to 45,000 is "Vigente desde el 1 de julio de 2026". The other pages in the unit describe the same rate as the 2025-26 rate, unchanged in 2026-27 (fr/tax-return-australie-pvt/page.tsx:106, it/dichiarazione-redditi-australia/page.tsx:129). The line reads as if the rate began in July 2026.
- Root cause: a "checked on" date written as a "valid from" date.
- Attack prerequisites: n/a.
- Impact: wrong tax information for a reader with 2025-26 income; inconsistent with sister pages.
- Recommended fix: use the same wording as the French and Italian pages.
- Regression test: content test that the WHM rate line carries the same year label in every locale.
- Limits of this verification: not checked against the ATO.

### CONTENT-04-F04: Inconsistent statements between pages and brands
- Severity: INFORMATIONAL
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines:
  - Refund timing: "about 14 business days" on Working Holiday Tax pages (fr/tax-return-australie-pvt/page.tsx:133, 191, 347; it/dichiarazione-redditi-australia/page.tsx:210, 383, 489; de/tax-return/page.tsx:408) against "12 business days" attributed to the ATO in Student Visa Tax content (src/lib/svt/content/long/zh/batch-11.ts:529).
  - Duty to lodge: es/blog/chunks/15.ts:466 answers "in most cases, yes" to "do you really need to lodge", while the pages say a return is not required under 45,001 of taxable income with only working holiday wages (fr/tax-return-australie-pvt/page.tsx:110, 156; it/dichiarazione-redditi-australia/page.tsx:125, 190). de/tax-return/page.tsx:421 also says a return must "in der Regel" be lodged when tax was withheld.
  - File-header comments say the page carries no price (ja/abn/page.tsx:22, es/abn/page.tsx:21 for the title) while the page body states 385 (ja/abn/page.tsx:455, es/abn/page.tsx:454). Comments only; the visible price is a correct one.
- Evidence: as quoted.
- Root cause: locale pages written at different times from different English sources.
- Attack prerequisites: n/a.
- Impact: content accuracy only.
- Recommended fix: pick one figure per fact in the facts file and align the locales.
- Regression test: a shared constants file for these figures, with a test that no locale hard-codes a different number.
- Limits of this verification: the blog chunk statements were read only in the ranges listed under Coverage.

### CONTENT-04-F05: Tax figures present in the unit that could not be checked against the ATO
- Severity: INFORMATIONAL
- Confidence: low
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines:
  - Penalty unit 364 from 1 July 2026 (330 before), maximum 1,820: es/blog/chunks/15.ts:356, 358, 442; fr/blog/chunks/15.ts:358, 462; it/blog/chunks/15.ts:358.
  - Medicare levy low-income threshold 28,011 for 2025-26: fr/tax-return-australie-pvt/page.tsx:122.
  - Resident rate 16% for 2025-26 and 15% from 1 July 2026: src/lib/svt/content/long/vi/batch-11.ts:638-647.
  - Super guarantee 12% and Payday Super from 1 July 2026: fr/tax-return-australie-pvt/page.tsx:126; it/dichiarazione-redditi-australia/page.tsx:145; de/superannuation/page.tsx:342; fr/superannuation/page.tsx:243.
  - Wage review 6% national minimum and 4.75% awards: it/blog/chunks/05.ts:150; svt/content/blog-vi.ts:679, 727; blog-zh.ts:677, 725.
  - Low income tax offset step (325 less 1.5 cents): svt/content/blog-vi.ts:129; blog-zh.ts:128.
  - Tax Help income limit "around $70,000": src/lib/svt/content/guides-en.ts:102, 372.
  - DASP rates 65% / 35% / 45%, WHM 15/30/37/45, no-ABN withholding 47%, GST threshold 75,000, small business offset 16% capped at 1,000 (it/blog/chunks/10.ts:122-128): these match what I know, but were not checked either.
- Evidence: figures as written. No obviously dated rate was found: a grep for 19%, 32.5%, 11%, 11.5%, 10.5%, 9.5% and 313 over all 40 files returned nothing.
- Root cause: n/a.
- Attack prerequisites: n/a.
- Impact: none known.
- Recommended fix: have the facts-file owner confirm the first five items against ato.gov.au and fairwork.gov.au.
- Regression test: n/a.
- Limits of this verification: no network; nothing was confirmed.

## Checked and found sound
- JSON-LD injection: all 52 `dangerouslySetInnerHTML` uses pass static objects through `jsonLdHtml`, which escapes `<`, `>`, `&` (src/lib/json-ld-html.ts:6). Read in full at fr/tax-return-australie-pvt/page.tsx:277-333, es/abn/page.tsx:259-313, it/dichiarazione-redditi-australia/page.tsx:316-370; the other 9 pages by grep.
- External links: `target="_blank"` always with `rel="noopener noreferrer"` (e.g. fr/tax-return-australie-pvt/page.tsx:528, it/dichiarazione-redditi-australia/page.tsx:550, es/abn/page.tsx:398). The only interpolated external URL uses the constant `AGENT_TPB`, not user input.
- No statement that the business is itself a registered tax agent was found in any of the 40 files. The grep hits (25 files) use "operates under the supervision of a registered tax agent" or "reviewed and signed off / approved by a registered tax agent" (e.g. guides-en.ts:561, it/dichiarazione-redditi-australia/page.tsx:215, 549, fr/tax-return-australie-pvt/page.tsx:524-527, de/tax-return/page.tsx:506, formStrings.ts:97). formStrings.ts:98 has a key named `registeredTaxAgent` whose value is "Working holiday specialists", so the visible text is fine.
- Prices: the only service prices in the 40 files are 220 and 385 (fr/tax-return-australie-pvt/page.tsx:462, 466; it/dichiarazione-redditi-australia/page.tsx:225, 512, 517; es/abn/page.tsx:454; es/devolucion-impuestos-australia/page.tsx:238; ja/abn/page.tsx:455; guides-en.ts:64-76, 101, 108, 318; long/zh/batch-11.ts:777; long/vi/batch-11.ts:797). 330 appears only as the old penalty unit, 325 only as a tax offset. No 495 or 440 and no other fee.
- Refund promises: none found. The pages repeat that the ATO decides and no refund is promised (fr/tax-return-australie-pvt/page.tsx:206, 236, 476; it/dichiarazione-redditi-australia/page.tsx:175, 528; de/tax-return/page.tsx:270; guides-en.ts:379). Working Holiday Tax guarantee text carries the TFN-only limit wherever it appears in the unit.
- myGov password: pages state it is never requested (guides-en.ts:96, 562; fr/tax-return-australie-pvt/page.tsx:532; it/dichiarazione-redditi-australia/page.tsx:245, 554; de/tax-return/page.tsx:508).
- formStrings.ts: static dictionary, no user data, no HTML; `{name}` and `{reason}` placeholders (lines 553-560) are filled elsewhere and I did not see the renderer.

## Open questions
1. Is the Student Visa Tax guarantee meant to cover $385 returns? CLAUDE.md:35-37 has no TFN-only condition; the audit brief and the Working Holiday Tax pages do (F01).
2. What is the real retention rule for the passport selfie (F02)?
3. guides-en.ts:95 and 127 tell customers to pay by bank transfer and send a screenshot as proof. Whether a screenshot alone starts work is outside this unit; a screenshot is easy to forge.
4. guides-en.ts:567 hard-codes the tax agent registration number in a URL, while the Working Holiday Tax pages use the `AGENT_TPB` constant. Not secret, but the two can drift.
5. es/abn/page.tsx:442 says "Nos entendemos con la ATO directamente" ("we deal with the ATO directly"). It is not a claim to be a registered agent, but the owner may want it worded like the other pages.
6. de/tax-return/page.tsx:458 section title says working holiday makers "oft" (often) get a refund. Not a promise, but stronger than the other locales.
7. 27 files were covered by grep only, and 7 more only in short ranges. Their prose needs a human or a further pass for anything the patterns do not catch, especially the 21 blog chunks and the four SVT zh/vi files.
