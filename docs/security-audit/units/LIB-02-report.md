# LIB-02 report

## Coverage

37 of 37 files read in full, 2,293 lines. No file is over 600 lines.

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/agent.ts | 6 | 1-6 | REVIEWED |
| src/lib/analytics.ts | 128 | 1-128 | REVIEWED |
| src/lib/atlas/actions.ts | 51 | 1-51 | REVIEWED |
| src/lib/atlas/load-report.ts | 38 | 1-38 | REVIEWED |
| src/lib/atlas/lookup.ts | 120 | 1-120 | REVIEWED |
| src/lib/atlas/redact.ts | 44 | 1-44 | REVIEWED |
| src/lib/atlas/run-tool.ts | 30 | 1-30 | REVIEWED |
| src/lib/brand.ts | 83 | 1-83 | REVIEWED |
| src/lib/category-labels.ts | 64 | 1-64 | REVIEWED |
| src/lib/compress-image.ts | 127 | 1-127 | REVIEWED |
| src/lib/constants.ts | 6 | 1-6 | REVIEWED |
| src/lib/csv.ts | 21 | 1-21 | REVIEWED |
| src/lib/fb-origin.ts | 15 | 1-15 | REVIEWED |
| src/lib/field-seal.ts | 57 | 1-57 | REVIEWED |
| src/lib/googleSummary.ts | 64 | 1-64 | REVIEWED |
| src/lib/guide-alternates.ts | 30 | 1-30 | REVIEWED |
| src/lib/heic-guard.ts | 39 | 1-39 | REVIEWED |
| src/lib/intake-validate.ts | 115 | 1-115 | REVIEWED |
| src/lib/json-ld-html.ts | 7 | 1-7 | REVIEWED |
| src/lib/leads.ts | 105 | 1-105 | REVIEWED |
| src/lib/legal/brands.ts | 20 | 1-20 | REVIEWED |
| src/lib/locale-blog.ts | 122 | 1-122 | REVIEWED |
| src/lib/locale-pages.ts | 83 | 1-83 | REVIEWED |
| src/lib/log-safe.ts | 43 | 1-43 | REVIEWED |
| src/lib/nda-countries.ts | 99 | 1-99 | REVIEWED |
| src/lib/orphan-sweep-run.ts | 71 | 1-71 | REVIEWED |
| src/lib/orphan-uploads.ts | 78 | 1-78 | REVIEWED |
| src/lib/public-form-guard.ts | 21 | 1-21 | REVIEWED |
| src/lib/render-inline.ts | 34 | 1-34 | REVIEWED |
| src/lib/request-guard.ts | 47 | 1-47 | REVIEWED |
| src/lib/sanitise.ts | 47 | 1-47 | REVIEWED |
| src/lib/tax-form-handoff.ts | 85 | 1-85 | REVIEWED |
| src/lib/tax-year.ts | 66 | 1-66 | REVIEWED |
| src/lib/validate.ts | 66 | 1-66 | REVIEWED |
| src/lib/wht/images-server.ts | 18 | 1-18 | REVIEWED |
| src/lib/wht/images.ts | 116 | 1-116 | REVIEWED |
| src/proxy.ts | 127 | 1-127 | REVIEWED |

Files outside the unit that were opened in part, only to judge a finding (not reviewed as a whole):
src/app/api/mia/send/route.ts (1-23), grep of the other src/app/api/mia routes, src/app/api/atlas/action/route.ts (1-45),
src/app/api/will/actions/route.ts (455-470), src/app/api/will/orphan-sweep/route.ts (1-15), src/app/api/crm/file/route.ts (100-140),
src/lib/db.ts (86-110, 228-256, 306-314, 762-800), src/lib/atlas/ask.ts (136-150 and grep), src/lib/field-crypto.ts (grep of exports and throws),
src/lib/supabase.ts (grep), scripts/seal-legacy-task-fields.mjs (grep), supabase/migrations/015_two_stage_intake.sql (44-58),
src/components/layout/Analytics.tsx (15-45, 150-172).

The unit holds no session helper, no rate limiter and no IP-derivation code. Those live in other files (for example src/lib/will/auth.ts) and were not reviewed here.

## Findings

### LIB-02-F01: The cross-site guard never runs for /api/mia, because the proxy matcher leaves it out
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-352
- Files and lines: src/proxy.ts:126 (matcher); src/lib/request-guard.ts:43 (GUARDED_API_PREFIXES lists `/api/mia/`); src/app/api/mia/send/route.ts:9, src/app/api/mia/move/route.ts:9, src/app/api/mia/status/route.ts:13, src/app/api/mia/form-link/route.ts:14
- Evidence: `isGuardedApiPath` returns true for `/api/mia/...`, but `config.matcher` holds only `/crm`, `/atlas`, `/api/crm`, `/api/will` and `/api/atlas`. Next only invokes the proxy for matched paths, so the guard at proxy.ts:61-65 is never reached for Mia. The four Mia POST handlers check `sessionValid()` and nothing else: a search for `crossSiteMutationReason`, `origin` and `sec-fetch` found no hit in src/app/api/mia. The existing test (src/lib/__tests__/request-guard-mia-17nov.test.ts) checks the prefix list, not the matcher, so it passes while the guard is off.
- Root cause: the prefix list and the matcher are two separate lists, and only one was updated when Mia was added.
- Attack prerequisites: a signed-in staff browser, and a page on a sibling subdomain of the brand's registrable domain (the case the guard was written for, request-guard.ts:5-7; SameSite=Strict does not stop it). The handlers parse the body with `req.json()` whatever the content type, so a plain form POST with no preflight is enough.
- Impact: a hostile same-site page can save Mia drafts, move customers in the pipeline, change status and create form links as the staff member.
- Recommended fix: add `'/api/mia/:path*'` to the matcher. Better, build the matcher from `GUARDED_API_PREFIXES`, and call `crossSiteMutationReason(req)` inside each Mia POST handler as /api/will/actions does (route.ts:461-465).
- Regression test: assert that every entry of `GUARDED_API_PREFIXES` has a matching entry in `config.matcher`; a route test posting to `/api/mia/send` with `Sec-Fetch-Site: same-site` expects 403.
- Limits of this verification: static only. Only mia/send was read in full; the other Mia routes were checked by grep. The session cookie's domain scope was not checked.

### LIB-02-F02: A plain-text copy of the TFN (`tfn_norm`) sits outside field sealing and outside the Done scrub
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-312
- Files and lines: src/lib/field-seal.ts:39-57 (covers `tfn` and `bank_details` only); supabase/migrations/015_two_stage_intake.sql:49-55; src/lib/db.ts:308-310; scripts/seal-legacy-task-fields.mjs:49-57
- Evidence: migration 015 adds `crm_tasks.tfn_norm` and backfills it with the digits of `tfn` for every row that existed then. No application code reads or writes the column now (the only source hit is a comment in intake-validate.ts:12). `markTaskDone` blanks `tfn` and `bank_details` but not `tfn_norm`. The seal script re-encrypts one named column at a time and does not touch `tfn_norm`. No later migration mentioning the column was found.
- Root cause: the sealing work was scoped to two columns, and a derived copy from the removed two-stage intake was left behind.
- Attack prerequisites: read access to the database or a backup (the same threat sealing is meant to answer).
- Impact: for rows that existed when migration 015 ran, the TFN stays readable after the task is marked Done and after the legacy seal script has run.
- Recommended fix: set `tfn_norm` to NULL for all rows and drop the column and its index. If duplicate detection is wanted again, use `blindIndex` from field-crypto.ts.
- Regression test: a schema test that fails if `crm_tasks` has a `tfn_norm` column; a `markTaskDone` test asserting no column of the row holds the TFN digits.
- Limits of this verification: the live database was not inspected. Whether the column exists in production, and how many rows are filled, is unknown.

### LIB-02-F03: Sealing fails open: with no keys set, TFN and bank details are stored unencrypted
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-311, CWE-636
- Files and lines: src/lib/field-seal.ts:23-36, 39-44
- Evidence: when `keyRingFromEnv` throws `no_key`, `ringOrNull` returns null and `sealField` returns the plain value. The only signal is one `console.warn` per server instance. A missing or mistyped `FIELD_ENC_KEYS` / `FIELD_ENC_ACTIVE` in one environment therefore turns encryption off silently, and submissions still succeed.
- Root cause: a deliberate rollout choice (comment lines 8-11) with no end date and no hard switch.
- Attack prerequisites: none for the weakness itself; it needs a configuration slip, then database or backup access to exploit.
- Impact: TFNs and bank details at rest in plain text with nothing stopping it.
- Recommended fix: once keys are set in production, add a flag (for example `FIELD_ENC_REQUIRED=true`) that makes `sealField` throw when no ring is available, and surface the state in a health check.
- Regression test: with the flag set and keys unset, `sealField('x', 'tfn', 'id')` throws; with keys set the output passes `isEncrypted`.
- Limits of this verification: whether the keys are set in production was not checked. field-crypto.ts was only skimmed (exports and error paths).

### LIB-02-F04: Atlas redaction misses several identifier shapes before text goes to the model
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359
- Files and lines: src/lib/atlas/redact.ts:11-21, 24-30; callers src/lib/atlas/ask.ts:146, 179; src/lib/atlas/lookup.ts:36-46
- Evidence: `get_customer_messages` returns up to 50 message bodies of 500 characters, and `redactText` is the only filter. By reading the patterns: (a) a digit run is removed only at 8 or more digits, so a 6 or 7 digit bank account number and a BSB written without a hyphen pass; (b) digits split by dots or words are not one run; (c) `DATE_LIKE` has no range check, so an 8-digit number typed as 4-2-2 or 2-2-4 groups with hyphens is kept as a "date"; (d) `PASSPORT_LIKE` needs upper-case letters followed by 6-8 digits, so lower-case or mixed letter-digit passport numbers pass; (e) street addresses and dates of birth in free text pass. The user's question and the chat history are not redacted at all (ask.ts:145-146).
- Root cause: pattern-based redaction of free text.
- Attack prerequisites: none; this is exposure to a third-party processor during normal staff use.
- Impact: identifiers a customer typed into WhatsApp can reach the model provider despite the stated rule in redact.ts:1.
- Recommended fix: lower the digit threshold to 6 for message bodies, validate date ranges in `DATE_LIKE`, make the passport pattern case-insensitive and allow mixed forms, and redact the question and history the same way.
- Regression test: unit cases for a 6-digit and 7-digit account number, an unhyphenated BSB, an 8-digit number in 4-2-2 form and a lower-case passport number, each expecting `[removed]`.
- Limits of this verification: patterns were reasoned about by reading, not executed. ask.ts was read only around the two call sites.

### LIB-02-F05: The HEIC size guard can be sidestepped, so an oversized image is still decoded
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-400, CWE-409
- Files and lines: src/lib/heic-guard.ts:19-33, 36-39; caller src/app/api/crm/file/route.ts:124
- Evidence: only the first 256 KB are scanned for an `ispe` box, and when none is found the function returns null and the caller decodes. A file whose metadata sits after 256 KB of padding therefore skips the check. The guard also trusts the declared `ispe` figure; whether the decoder allocates from that figure or from the coded stream was not verified.
- Root cause: fail-open on "no box found", and a fixed scan window.
- Attack prerequisites: the attacker uploads a crafted HEIC through a public form and a staff member opens it in the CRM.
- Impact: memory or time exhaustion of one serverless invocation when the document is opened; repeated files make documents hard to view.
- Recommended fix: treat "no `ispe` found" as too large to decode (serve the original bytes), or parse the box tree properly and scan the whole file.
- Regression test: a buffer with 300 KB of filler before an `ispe` declaring 60000 x 60000 must return true from `heicTooLargeToDecode`; a buffer with no `ispe` must return true.
- Limits of this verification: not executed; no crafted file was built. The upload route's own type and size checks were not read.

### LIB-02-F06: The orphan sweep treats an unreadable `file_urls` row as "no references"
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636
- Files and lines: src/lib/orphan-sweep-run.ts:51, 58-70; src/lib/orphan-uploads.ts:58-66
- Evidence: a `JSON.parse` failure on one task's `file_urls` is swallowed, so that task contributes no protected paths and its documents under `tax-form/` or `svt/tax-form/` become deletion candidates once three days old. The file header says the sweep stops if any read fails; this path does not. References are taken from `crm_tasks.file_urls` only. The read of references and the delete are not atomic.
- Root cause: per-row error handling that contradicts the stop-on-failure rule.
- Attack prerequisites: none; it needs one corrupt row and `ORPHAN_UPLOAD_DELETE=true`.
- Impact: permanent loss of a customer's identity documents that are still linked to an open task.
- Recommended fix: throw on an unparseable row so the whole run deletes nothing; also treat a URL that `storagePathFromUrl` cannot parse as a reason to stop.
- Regression test: with one task row holding invalid JSON, `runOrphanSweep` returns an error and `deleted: 0`.
- Limits of this verification: whether any other table stores links to objects under these prefixes was not fully established (see Open questions).

### LIB-02-F07: `sanitiseField` silently drops everything after a bare "<", and the 💵 strip can be rebuilt from split halves
- Severity: LOW
- Confidence: high for the truncation, medium for the rebuild
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-20, CWE-182
- Files and lines: src/lib/sanitise.ts:18, 37-43; reader src/lib/db.ts:398
- Evidence: (a) the pattern `<[^>]*(?:>|$)` removes from any "<" to the end of the string when no ">" follows, so a customer answer such as "income < 18200, then ..." loses its tail with no error. (b) `.replace(/💵/g, '')` runs once; a string holding a lone high half, the full glyph, then a lone low half becomes the glyph again after the strip, which is the label `db.ts:398` reads the refund figure from. The four current callers read multipart form data, where lone halves cannot arrive, so (b) is not reachable today; it becomes reachable if `sanitiseNote` is ever applied to a JSON body.
- Root cause: single-pass removal, and a tag pattern that treats every "<" as a tag start.
- Attack prerequisites: (a) none, ordinary input. (b) a future JSON caller.
- Impact: (a) lost customer information on intake. (b) a forged refund label in task notes.
- Recommended fix: (a) strip only when "<" is followed by a letter, "/" or "!". (b) remove lone surrogates in `CONTROL_CHARS`, or loop the strip until the string stops changing.
- Regression test: `sanitiseField('a < b and c')` keeps "and c"; `sanitiseNote` of the split-halves string contains no 💵.
- Limits of this verification: reasoned from the code; not executed.

### LIB-02-F08: `isPlausibleDob` accepts anything the JavaScript date parser accepts, and the raw text is stored
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-20
- Files and lines: src/lib/validate.ts:21-28; src/lib/intake-validate.ts:65-67
- Evidence: the check is `new Date(v)` plus a year and age range. The engine's lenient parser accepts bare years, month names and other loose forms, and the server keeps the original string rather than a normalised date.
- Root cause: parsing with `Date` and no fixed format.
- Attack prerequisites: a direct POST to a public form.
- Impact: untidy or misleading dates of birth on the staff record; no direct confidentiality impact.
- Recommended fix: require `YYYY-MM-DD` by pattern, then confirm the parsed date round-trips to the same string.
- Regression test: "2000", "Jan 2000" and "2000-02-31" are rejected; "2000-02-29" is accepted.
- Limits of this verification: parser behaviour was not executed here.

### LIB-02-F09: CRM content policy allows every Supabase project host; some comments are out of date
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/proxy.ts:40, 44 (wildcard `*.supabase.co` / `*.supabase.in` in `img-src` and `connect-src`); src/proxy.ts:9-10 (two contradictory sentences on the default); src/lib/orphan-uploads.ts:10-13, 31 (says nothing imports the planner and the default is 14 days; the runner imports it and passes 3)
- Evidence: as cited.
- Root cause: wildcard kept for convenience; comments not updated after later changes.
- Attack prerequisites: an existing script injection in the CRM.
- Impact: any Supabase project could serve as a destination for data sent out of a CRM page; the stale comments can mislead a maintainer about what deletes files.
- Recommended fix: name the project's own Supabase host in the policy; correct the comments.
- Regression test: assert the built policy contains no `*.supabase` wildcard.
- Limits of this verification: the static policy in next.config.js was not read.

### LIB-02-F10: Server-only modules carry no `server-only` marker
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/field-seal.ts:1-18; src/lib/leads.ts:15; src/lib/atlas/run-tool.ts:1-2; src/lib/atlas/load-report.ts:1-4; src/lib/orphan-sweep-run.ts:8
- Evidence: each says "server only" in a comment, and none imports `server-only`. A search found no client component importing them today (importers: db.ts, API routes, one server page).
- Root cause: convention by comment.
- Attack prerequisites: a future mistaken import from a client component.
- Impact: none today; the marker would turn such a mistake into a build error.
- Recommended fix: add `import 'server-only'` to these files.
- Regression test: none needed beyond the build.
- Limits of this verification: importers found by grep on path strings only.

## Checked and found sound

- Cross-site guard logic fails closed on an unparseable or literal `null` Origin, refuses `same-site`, compares against the request host: src/lib/request-guard.ts:20-40
- /api/will/actions repeats the guard in the route itself: src/app/api/will/actions/route.ts:461-465
- Nonce is per request from `crypto.randomUUID()`, policy uses `strict-dynamic`, `object-src 'none'`, `frame-ancestors 'none'`: src/proxy.ts:27-52, 107-113
- Brand is derived from the Host header only, never from the body or query; unknown hosts fall to WHT: src/lib/brand.ts:65-72
- Facebook origin check requires https and an exact or dot-bounded host, never throws: src/lib/fb-origin.ts:10-15
- CSV formula injection guard and quote doubling: src/lib/csv.ts:12-17
- JSON-LD output escapes `<`, `>`, `&`: src/lib/json-ld-html.ts:5-7
- Inline markdown escapes angle brackets and limits links to internal, https and mailto targets with no quotes or backslashes: src/lib/render-inline.ts:19-33
- `safeErr` never returns details, hint or stack, and masks row contents, key values, digit runs and emails: src/lib/log-safe.ts:19-43
- `openField` logs column and row id only and returns an empty string on failure; the row id is bound into the ciphertext: src/lib/field-seal.ts:47-56
- `safeAmount` rejects non-numeric, negative and oversized values: src/lib/intake-validate.ts:106-115
- Atlas proposals are limited to three kinds, capped in length, state checked against `ALL_STATES`, and run only through the CRM handler after a session check: src/lib/atlas/actions.ts:24-51; src/app/api/atlas/action/route.ts:12-17
- Atlas lookups omit the phone number (`waId`) and cap list sizes: src/lib/atlas/lookup.ts:18-120
- Orphan planner keeps objects outside the two prefixes, unknown-age objects, referenced objects, and caps each run at 200; the runner is dry-run unless the flag is set and the route needs cron or session auth: src/lib/orphan-uploads.ts:58-78; src/lib/orphan-sweep-run.ts:59; src/app/api/will/orphan-sweep/route.ts:11
- The tax form hand-off keeps the TFN in memory only, never in browser storage, with a two-hour expiry: src/lib/tax-form-handoff.ts:49-65
- Analytics helpers send path, language and placement only, no form values: src/lib/analytics.ts:64-128
- `readyImage` / `readyScene` look ids up in constant tables, so no caller-controlled path reaches the disk check: src/lib/wht/images-server.ts:7-18
- No secret, key or token is hard-coded in any of the 37 files. constants.ts, brand.ts and agent.ts hold public contact details and public registration numbers only.

## Open questions

1. Does the production database still have `crm_tasks.tfn_norm`, and how many rows are filled? (F02)
2. Are `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` set in every deployed environment? (F03)
3. Does any table other than `crm_tasks` hold links to objects under `tax-form/` or `svt/tax-form/` (archives, partner or expense records)? If so the sweep would not protect them. (F06)
4. The form link carries a token in the `k` query parameter (src/app/api/tax-form/link/route.ts:25). Analytics.tsx says the tag sends the full URL as the page location and excludes `/complete` for that reason. Whether a `/tax-form?k=...` page is tagged was not established; that component is outside this unit.
5. Does the Atlas approval screen show the full reply body and target customer, or only the model-written `summary`? If only the summary, a customer message could steer the model into a proposal whose summary does not match its body. (UI outside this unit.)
6. Does the public upload route accept HEIC, and what limits does it apply before storage? (F05)
7. Session helpers, rate limiting and IP derivation are not in this unit's file list and were not assessed.
