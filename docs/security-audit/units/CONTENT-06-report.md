# CONTENT-06 report

Covers CONTENT-06 (102 files) and CONTENT-07 (38 files). Honest summary: all 38 CONTENT-07 files and 9 CONTENT-06 files were read line by line; 16 CONTENT-06 files were read in part; the remaining 77 CONTENT-06 files (mostly long locale content pages) were covered by the grep pass only and are marked NOT_STARTED.

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(de)/de/about/page.tsx | 204 | grep pass only | NOT_STARTED |
| src/app/(de)/de/blog/[slug]/page.tsx | 247 | 1-60, 195-233, 234-247 (last range via grep output); rest grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/blog/category/[slug]/page.tsx | 135 | 1-26, 95-121, 122-135 (last range via grep output); rest grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/blog/page.tsx | 135 | grep pass only | NOT_STARTED |
| src/app/(de)/de/calculator/CalculatorClient.tsx | 215 | 1-60, 150-215; 61-149 (strings) grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/calculator/page.tsx | 136 | grep pass only | NOT_STARTED |
| src/app/(de)/de/client-agreement/page.tsx | 245 | 83-92; rest grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/contact/page.tsx | 185 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/cleaners/page.tsx | 337 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/construction/page.tsx | 299 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/delivery-drivers/page.tsx | 341 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/farm-work/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/fifo/page.tsx | 291 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/hospitality/page.tsx | 284 | grep pass only | NOT_STARTED |
| src/app/(de)/de/expenses/labouring/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(de)/de/layout.tsx | 103 | 1-103 | REVIEWED |
| src/app/(de)/de/medicare/page.tsx | 330 | 274-308; rest grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/privacy/page.tsx | 137 | grep pass only | NOT_STARTED |
| src/app/(es)/es/about/page.tsx | 200 | grep pass only | NOT_STARTED |
| src/app/(es)/es/blog/[slug]/page.tsx | 157 | 1-157 (lines 81, 84, 112, 131 seen only to column 210); plus grep | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/chunks/19.ts | 79 | grep pass only | NOT_STARTED |
| src/app/(es)/es/blog/data.ts | 189 | 1-90, 130-189 (long text lines seen to column 230); rest grep only | PARTIALLY_REVIEWED |
| src/app/(es)/es/blog/page.tsx | 122 | grep pass only | NOT_STARTED |
| src/app/(es)/es/calculator/CalculatorClient.tsx | 219 | tax-scale, clamp, visa allow-list and waUrl lines via grep only (about 20 lines) | PARTIALLY_REVIEWED |
| src/app/(es)/es/calculator/page.tsx | 142 | grep pass only | NOT_STARTED |
| src/app/(es)/es/contact/page.tsx | 182 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/_shared.ts | 82 | 1-82 | REVIEWED |
| src/app/(es)/es/expenses/cleaners/page.tsx | 250 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/construction/page.tsx | 236 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/delivery-drivers/page.tsx | 255 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/farm-work/page.tsx | 222 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/fifo/page.tsx | 229 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/hospitality/page.tsx | 222 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/labouring/page.tsx | 222 | grep pass only | NOT_STARTED |
| src/app/(es)/es/expenses/page.tsx | 317 | grep pass only | NOT_STARTED |
| src/app/(es)/es/layout.tsx | 88 | 1-88 | REVIEWED |
| src/app/(es)/es/medicare/page.tsx | 259 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/_blog-links.ts | 30 | 1-30 | REVIEWED |
| src/app/(fr)/fr/about/page.tsx | 194 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/blog/[slug]/page.tsx | 157 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/blog/chunks/18.ts | 357 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/blog/data.ts | 195 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/blog/page.tsx | 116 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/calculator/CalculatorClient.tsx | 221 | tax-scale, clamp, visa allow-list and waUrl lines via grep only (about 20 lines) | PARTIALLY_REVIEWED |
| src/app/(fr)/fr/calculator/page.tsx | 140 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/contact/page.tsx | 175 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/cleaners/page.tsx | 337 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/construction/page.tsx | 299 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/delivery-drivers/page.tsx | 341 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/farm-work/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/fifo/page.tsx | 291 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/hospitality/page.tsx | 284 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/expenses/labouring/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/layout.tsx | 89 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/medicare/page.tsx | 337 | grep pass only | NOT_STARTED |
| src/app/(fr)/fr/page.tsx | 322 | grep pass only | NOT_STARTED |
| src/app/(it)/it/about/page.tsx | 204 | grep pass only | NOT_STARTED |
| src/app/(it)/it/blog/[slug]/page.tsx | 157 | grep pass only | NOT_STARTED |
| src/app/(it)/it/blog/chunks/19.ts | 79 | grep pass only | NOT_STARTED |
| src/app/(it)/it/blog/data.ts | 189 | grep pass only | NOT_STARTED |
| src/app/(it)/it/blog/page.tsx | 135 | grep pass only | NOT_STARTED |
| src/app/(it)/it/calculator/CalculatorClient.tsx | 216 | tax-scale, clamp, visa allow-list and waUrl lines via grep only (about 20 lines) | PARTIALLY_REVIEWED |
| src/app/(it)/it/calculator/page.tsx | 152 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/cleaners/page.tsx | 279 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/delivery-drivers/page.tsx | 284 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/farm-work/page.tsx | 251 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/fifo/page.tsx | 258 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/hospitality/page.tsx | 251 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/labouring/page.tsx | 251 | grep pass only | NOT_STARTED |
| src/app/(it)/it/expenses/page.tsx | 341 | grep pass only | NOT_STARTED |
| src/app/(it)/it/layout.tsx | 88 | grep pass only | NOT_STARTED |
| src/app/(it)/it/medicare/page.tsx | 248 | grep pass only | NOT_STARTED |
| src/app/(it)/it/page.tsx | 350 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/about/page.tsx | 205 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/blog/[slug]/page.tsx | 243 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/blog/category/[slug]/page.tsx | 136 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/blog/page.tsx | 162 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/calculator/CalculatorClient.tsx | 213 | tax-scale, clamp, visa allow-list and waUrl lines via grep only (about 20 lines) | PARTIALLY_REVIEWED |
| src/app/(ja)/ja/calculator/page.tsx | 145 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/client-agreement/page.tsx | 245 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/contact/page.tsx | 184 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/cleaners/page.tsx | 337 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/construction/page.tsx | 299 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/delivery-drivers/page.tsx | 341 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/farm-work/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/fifo/page.tsx | 291 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/hospitality/page.tsx | 284 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/expenses/labouring/page.tsx | 285 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/layout.tsx | 128 | 1-128 | REVIEWED |
| src/app/(ja)/ja/page.tsx | 372 | grep pass only | NOT_STARTED |
| src/app/(ja)/ja/privacy/page.tsx | 138 | grep pass only | NOT_STARTED |
| src/lib/mia/data.ts | 94 | 1-94 | REVIEWED |
| src/lib/svt/content/guides-i18n.ts | 87 | 1-87 | REVIEWED |
| src/lib/svt/content/guides-zh.ts | 311 | 20-32; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/home-en.ts | 126 | 1-126 | REVIEWED |
| src/lib/svt/content/home-vi.ts | 78 | 20-35; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/home-zh.ts | 79 | 1-45; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/en/links.ts | 90 | 1-30, 84-90; rest grep only | PARTIALLY_REVIEWED |
| src/lib/svt/content/long/library.ts | 126 | 1-126 | REVIEWED |
| src/lib/svt/content/services-en.ts | 290 | grep pass only | NOT_STARTED |
| src/lib/svt/content/services-vi.ts | 162 | grep pass only | NOT_STARTED |
| src/lib/svt/i18n.ts | 206 | 1-105, 196-206; rest grep only | PARTIALLY_REVIEWED |
| src/app/(de)/de/3cw5w5hcx/layout.tsx | 18 | 1-18 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(de)/de/3cw5w5hcx/page.tsx | 51 | 1-51 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(de)/de/link-after-payment/page.tsx | 7 | 1-7 | REVIEWED |
| src/app/(de)/de/not-found.tsx | 51 | 1-51 | REVIEWED |
| src/app/(de)/de/rh84sez58/layout.tsx | 18 | 1-18 | REVIEWED |
| src/app/(de)/de/rh84sez58/page.tsx | 51 | 1-51 | REVIEWED |
| src/app/(de)/de/start/layout.tsx | 19 | 1-19 | REVIEWED |
| src/app/(de)/de/start/page.tsx | 53 | 1-53 | REVIEWED |
| src/app/(de)/de/vukjw4byf/layout.tsx | 18 | 1-18 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(de)/de/vukjw4byf/page.tsx | 52 | 1-52 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(de)/de/y8vwp4bf7/page.tsx | 16 | 1-16 | REVIEWED |
| src/app/(de)/layout.tsx | 37 | 1-37 | REVIEWED |
| src/app/(es)/es/_blog-links.ts | 19 | 1-19 | REVIEWED |
| src/app/(es)/es/blog/category/[slug]/page.tsx | 76 | 1-76 | REVIEWED |
| src/app/(es)/layout.tsx | 37 | 1-37 | REVIEWED |
| src/app/(fr)/fr/blog/category/[slug]/page.tsx | 76 | 1-76 | REVIEWED |
| src/app/(fr)/layout.tsx | 37 | 1-37 | REVIEWED |
| src/app/(it)/it/_blog-links.ts | 40 | 1-40 | REVIEWED |
| src/app/(it)/it/blog/category/[slug]/page.tsx | 76 | 1-76 | REVIEWED |
| src/app/(it)/layout.tsx | 37 | 1-37 | REVIEWED |
| src/app/(ja)/ja/3cw5w5hcx/layout.tsx | 18 | 1-18 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(ja)/ja/3cw5w5hcx/page.tsx | 60 | 1-60 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(ja)/ja/link-after-payment/page.tsx | 7 | 1-7 | REVIEWED |
| src/app/(ja)/ja/not-found.tsx | 51 | 1-51 | REVIEWED |
| src/app/(ja)/ja/rh84sez58/layout.tsx | 18 | 1-18 | REVIEWED |
| src/app/(ja)/ja/rh84sez58/page.tsx | 60 | 1-60 | REVIEWED |
| src/app/(ja)/ja/start/layout.tsx | 19 | 1-19 | REVIEWED |
| src/app/(ja)/ja/start/page.tsx | 62 | 1-62 | REVIEWED |
| src/app/(ja)/ja/vukjw4byf/layout.tsx | 18 | 1-18 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(ja)/ja/vukjw4byf/page.tsx | 60 | 1-60 (file existed when read; no longer on disk at the end of the audit, see F04) | REVIEWED |
| src/app/(ja)/ja/y8vwp4bf7/page.tsx | 16 | 1-16 | REVIEWED |
| src/app/(ja)/layout.tsx | 37 | 1-37 | REVIEWED |
| src/lib/svt/content/blog-i18n.ts | 17 | 1-17 | REVIEWED |
| src/lib/svt/content/long/en/index.ts | 17 | 1-17 | REVIEWED |
| src/lib/svt/content/long/types.ts | 46 | 1-46 | REVIEWED |
| src/lib/svt/content/long/vi/index.ts | 17 | 1-17 | REVIEWED |
| src/lib/svt/content/long/zh/index.ts | 17 | 1-17 | REVIEWED |
| src/lib/svt/content/services-i18n.ts | 37 | 1-37 | REVIEWED |

Totals: 140 files in the two lists. REVIEWED 47 (all 2230 of their lines). PARTIALLY_REVIEWED 16. NOT_STARTED (grep pass only) 77.
Lines read directly: about 3,100 of 23,362 (2,230 in fully read files, about 885 in partial ranges). Every one of the 140 files was included in the grep pass below while it existed on disk.

Display limits: files were printed with a column cap (600, 420, 330 or 210-240 characters). A length check found no line longer than the cap in any file marked REVIEWED. The Japanese files were capped by bytes, so a Japanese line over about 140 characters could have been cut; none looked cut.

Files outside the unit opened only to judge a finding (not fully reviewed):
- src/lib/json-ld-html.ts (whole file, 7 lines)
- src/lib/will/brand-context.ts (lines 1-54)
- src/lib/will/store-supabase.ts (lines 532-590, 606-636, and grep for currentBrand)
- src/app/api/mia/send/route.ts and src/app/api/mia/move/route.ts (whole files)
- src/app/api/mia/status/route.ts and the other api/mia routes (grep for the data.ts function names only)
- src/app/api/will/actions/route.ts (grep only: line 1192)
- src/lib/locale-blog.ts (grep only: lines 22-27, 85-113)
- src/components/blog/LocaleGuidePage.tsx, LocaleCategoryPage.tsx (grep for notFound and getGuide only)
- src/components/wht/CalculatorBlocks.tsx (grep for input elements only)
- src/lib/svt/content/guides-en.ts (grep for "difference", lines 65 and 86)
- PROJECT_HANDOFF.md (lines 143, 202 by grep) and .audit-state/findings/A01-tax.md (lines 98-109 by grep)

### Grep pass (all 140 files)

- dangerouslySetInnerHTML: 94 uses, every one is `<script type="application/ld+json">` fed by `jsonLdHtml(...)` from static objects. No other use.
- Raw HTML in strings, `<script` outside JSON-LD, `innerHTML`, `eval(`, `new Function`, `document.write`, inline `on*=` handlers, `javascript:` URLs, `data:` URLs: none.
- iframe: 4, all the same fixed YouTube embed on youtube-nocookie.com (src/app/(de)/de/medicare/page.tsx:280, 291; src/app/(fr)/fr/medicare/page.tsx:287, 298), with referrerPolicy set and no sandbox attribute.
- `http://` links: none.
- External domains (distinct): schema.org (92), en.wikipedia.org (20), www.ato.gov.au (15), www.youtube-nocookie.com (4), www.servicesaustralia.gov.au (2), www.homeaffairs.gov.au (2), www.fairwork.gov.au (2), www.abr.gov.au (2), my.gov.au (2). The site's own domain is used only through SITE_URL.
- wa.me or WhatsApp API links written by hand: none (all through `waUrl`).
- Email addresses: none.
- Phone numbers: the business contact number appears in src/app/(de)/de/privacy/page.tsx:120 and src/app/(ja)/ja/privacy/page.tsx:121 (public contact detail; one in international format, one in local format).
- Key or token shaped strings, `process.env`, password, secret, bearer: none.
- `params`: used in the 10 blog `[slug]` and `category/[slug]` pages only. `searchParams`, `cookies()`, `headers()`, `fetch(`, `redirect(`, localStorage, postMessage: none in the unit.
- Prices: only $220 and $385 appear as service prices (WHT client agreements de/ja lines 85-86; SVT home, guides-zh, i18n). $330, $495 and $440 do not appear as prices in these files. Other dollar figures seen are tax examples (thresholds, levy, penalty units of 330 and 364, the $70 guarantee example).
- "Registered tax agent": every occurrence found uses the supervision wording or "reviewed and signed off by a registered tax agent". No sentence found saying the business itself is a registered tax agent.
- Refund promises: no "guaranteed refund" or "maximum refund" wording found. Every WHT refund-guarantee statement in de, es, fr, it and ja carries the TFN-only limit. The SVT statements do not (F02).

## Findings

### CONTENT-06-F01: Mia "move" and "send" act on any customer id, not only SVT customers, and "move" accepts any state text
- Severity: MEDIUM
- Confidence: high (code path), medium (whether the database rejects an unknown state)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639 (authorisation bypass through user-controlled key), CWE-20
- Files and lines: src/lib/mia/data.ts:43-45 (moveMiaCustomer), 61-66 (saveMiaDraft); src/app/api/mia/move/route.ts:11-16; src/app/api/mia/send/route.ts:12-17; src/lib/will/store-supabase.ts:532-536 and 582-583 (setState), 606-611 (addMessage)
- Evidence: the file header says everything is "scoped to brand 'svt'", and the list functions do filter `.eq('brand','svt')`. The two write functions do not. `moveMiaCustomer` wraps the call in `withBrand('svt', ...)`, but `setState` loads the row with `.eq('id', id)` only and never reads the brand. `saveMiaDraft` calls `getStore().addMessage(...)` with no brand wrapper and no ownership check at all. The move route passes `body.toState` straight through as `toState as never`; the route only checks it is a string, and `setState` writes it to `state` without an allow-list (the Will route checks `ALL_STATES.includes(...)` at api/will/actions/route.ts:1192). A post-payment state also sets `paid = true` (store-supabase.ts, inside setState).
- Root cause: brand scoping was added to reads only; the writes rely on a brand context that the store methods do not use for id lookups, and state validation was left to the caller.
- Attack prerequisites: a valid operator session (`sessionValid()`), then a request with a WHT customer id, or with an invented state.
- Impact: a WHT customer can be moved between stages (including being marked paid) from the SVT tool, with the history entry attributed to 'mia'; a draft with the SVT marker `svt_number_not_live` can be attached to a WHT conversation; an unknown state string can be stored and take the customer out of every stage list. It is an integrity and cross-brand problem, not a data leak, and it needs a logged-in operator.
- Recommended fix: in both functions read the customer first and refuse unless `brand === 'svt'`; validate `toState` against the state list in the route; wrap `saveMiaDraft` in `withBrand('svt', ...)`.
- Regression test: call POST /api/mia/move and /api/mia/send with a WHT customer id and expect 404 with no row changed; call move with `toState: 'NOPE'` and expect 400.
- Limits of this verification: I did not find or read the migrations, so I do not know whether a CHECK constraint or enum on `will_customers.state` would reject an unknown state. I did not read the Mia screens to see which ids they can send. Not run.

### CONTENT-06-F02: Student Visa Tax pages promise the refund guarantee without the TFN-only limit
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (business rule)
- Files and lines: src/lib/svt/content/home-en.ts:43-54; src/lib/svt/content/home-zh.ts:24-35; src/lib/svt/content/home-vi.ts:23-33; src/lib/svt/content/guides-zh.ts:11 and 23-27. Same wording outside the unit: src/lib/svt/content/guides-en.ts:65, 86.
- Evidence: "If your refund is smaller than our fee, we pay you the difference", terms: paid after the notice of assessment, full fee if there is no refund or tax is owed. Nothing limits it to returns with TFN income only, and the same pages sell the $385 return with ABN work. The WHT pages in this unit all add the limit (for example src/app/(es)/es/expenses/_shared.ts:15, src/app/(de)/de/client-agreement/page.tsx:88). PROJECT_HANDOFF.md:143 records "ABN = no guarantee".
- Root cause: the SVT copy was written before the ABN and foreign-income exclusion and was not updated in any of the three languages.
- Attack prerequisites: none; public pages.
- Impact: a student with ABN work reads an unconditional written promise, pays $385, and can then claim the difference. Either the business pays out against its own rule or it refuses a published promise (consumer-law exposure).
- Recommended fix: add one sentence in en, zh and vi (home and pricing guide): the guarantee covers returns with TFN jobs only. Or decide that SVT keeps it for all returns and record that decision for Mia.
- Regression test: a content test that every SVT text containing the guarantee sentence also contains the TFN-only sentence, in all three languages.
- Limits of this verification: this was already recorded as A01-5 in .audit-state/findings/A01-tax.md; I did not check whether a fix is pending elsewhere. home-vi.ts and guides-zh.ts were read only around the guarantee block; guides-vi.ts and the SVT client agreement are outside this unit and were not read.

### CONTENT-06-F03: The Mia "paused" flag reads as "not paused" on any store error, and nothing else reads it
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636 (fail open)
- Files and lines: src/lib/mia/data.ts:68-70 (getMiaPaused), 72-74 (setMiaPaused)
- Evidence: `(await getStore().getSetting(MIA_PAUSED_KEY).catch(() => null)) === true`. A failed read returns false. A grep of src/ for `mia_paused`, `MIA_PAUSED_KEY` and `getMiaPaused` finds only src/app/api/mia/status/route.ts, which shows and sets the flag.
- Root cause: error swallowed into the permissive value; the flag is not yet wired to any sending or job code.
- Attack prerequisites: none; a database error is enough.
- Impact: today, display only: the screen can show "running" while the stored value is "paused". Once the SVT line is live and something does read the flag this way, a database error would un-pause Mia.
- Recommended fix: return paused (true) or raise when the setting cannot be read; when the SVT line goes live, make the send path check the flag.
- Regression test: with getSetting rejecting, expect getMiaPaused to be true (or to throw).
- Limits of this verification: grep only for other readers; I did not read the Mia jobs or the Will scheduler.

### CONTENT-06-F04: Files in this unit were removed from disk while the audit was running
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/app/(de)/de/3cw5w5hcx/layout.tsx and page.tsx; src/app/(de)/de/vukjw4byf/layout.tsx and page.tsx; the same four under src/app/(ja)/ja/. src/app/(site)/3cw5w5hcx and src/app/(site)/vukjw4byf are also gone.
- Evidence: all eight files existed and were read at the start (they are quoted from in my notes: the ABN and TFN form pages, noindex, importing FormClient from the (site) folders). A later grep returned "No such file or directory" for exactly these eight, and `ls` confirms the folders are no longer there. The rh84sez58 and start folders are still present.
- Root cause: unknown. Nothing in this audit writes anywhere except this report, so another process or person changed the tree.
- Attack prerequisites: n/a
- Impact: the audit snapshot is not stable. Findings and coverage in other units may describe files that have since changed.
- Recommended fix: confirm who removed the ABN and TFN form routes and whether it was intended; freeze the tree or audit a copy.
- Regression test: n/a
- Limits of this verification: I cannot tell when between my first read and the later grep the files were removed.

### CONTENT-06-F05: Page keywords target "tax agent" searches although the body says "under the supervision of"
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/app/(de)/de/layout.tsx:50; src/app/(ja)/ja/layout.tsx:67-68
- Evidence: meta keywords include a German "Tax Agent Australia German" phrase and two Japanese phrases meaning "Australia registered tax agent working holiday" and "Australia tax agent Japanese". The visible text everywhere uses the supervision wording.
- Root cause: SEO keyword lists written separately from the legal wording rule.
- Attack prerequisites: none
- Impact: small; meta keywords are not shown to readers and are not a statement, but they sit next to a rule that the business must not present itself as the registered agent.
- Recommended fix: owner's call; drop or reword the three keywords if the rule is meant to cover metadata.
- Regression test: n/a
- Limits of this verification: wording judgement only; I am not a lawyer.

## Checked and found sound

- JSON-LD output is escaped: `jsonLdHtml` replaces `<`, `>` and `&` (src/lib/json-ld-html.ts:5-7); all 94 uses in the unit go through it and the data is static.
- Blog slug from the URL is validated before use: `hasGuide` uses `Object.prototype.hasOwnProperty.call` plus a match against the English guide list (src/lib/locale-blog.ts:85); an unknown slug ends in `notFound()` (src/components/blog/LocaleGuidePage.tsx:558-559; LocaleCategoryPage.tsx:139). Category slug is matched with `find` on a fixed list (src/app/(es)/es/blog/data.ts:187-189).
- SVT lookups by slug check the English list first, so an object key such as `constructor` cannot be reached from a URL (src/lib/svt/content/services-i18n.ts:23-27, 30-33; src/lib/svt/content/long/library.ts:31-41).
- SVT article body parser produces plain strings for React, no HTML (src/lib/svt/content/long/library.ts:43-88).
- Calculator: income and tax withheld are clamped, the visa value is checked against an allow-list, inputs are `type="number"` (src/app/(de)/de/calculator/CalculatorClient.tsx:175-190; src/components/wht/CalculatorBlocks.tsx:119-159). The 2025-26 tax scales and the 65% super rate are identical in de, es, fr, it and ja (lines 31-40 of each CalculatorClient).
- Form pages and the residency step are noindex (for example src/app/(de)/de/start/layout.tsx:5, src/app/(de)/de/y8vwp4bf7/page.tsx:11).
- Mia list queries fix the brand in code, not from input (src/lib/mia/data.ts:35, 80, 90), and select named columns only.
- External links in not-found pages use `rel="noopener noreferrer"` (src/app/(de)/de/not-found.tsx:40-41; ja the same).
- WHT guarantee wording carries the TFN-only limit in every locale file of the unit (checked by grep for the guarantee sentence without the limit sentence: no hit).

## Open questions

- Is the SVT guarantee meant to cover ABN returns? If not, F02 needs the one-sentence fix in three languages.
- Does `will_customers.state` have a database constraint? That decides how far the unvalidated `toState` in F01 can go.
- Who removed the 3cw5w5hcx (ABN form) and vukjw4byf (TFN form) routes during the audit, and are links to them elsewhere now broken? (Not checked.)
- 77 content files were not read line by line. The grep pass covers injection constructs, links, prices and agent wording, but not factual tax statements inside the long text. Those files need a content review if that is in scope.
- The four youtube-nocookie iframes have no `sandbox` attribute; whether the site CSP `frame-src` restricts frames to that host was not checked (CSP is outside this unit).
