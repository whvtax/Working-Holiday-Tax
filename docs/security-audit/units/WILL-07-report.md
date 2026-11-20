# WILL-07 report

Covers WILL-07 (52 files, 4,192 lines) and WILL-08 (4 files, 104 lines). All paths are under `src/lib/will/`. Static reading only; no code was run.

Files opened outside the unit to judge a finding (partial reads, ranges given): `src/lib/will/knowledge.ts` 195-225; `src/lib/will/service.ts` 745-756, 2540-2552, 2866-2876; `src/lib/will/engine.ts` 460-475, 507-514, 740-750, 758-766; `src/lib/will/scheduler.ts` 640-656, 700-716, 738-748; `src/lib/will/channel.ts` 77-90, 176-200, 270-280, 336-346; `src/lib/will/store-supabase.ts` 448-476; `src/lib/will/suggest.ts` 198-212; `src/lib/will/form-link.ts` 400-422; `src/lib/crm-store.ts` 112-161; `src/app/api/will/tick/route.ts` 1-40; `src/app/api/will/webhook/route.ts` 520-545 and grep hits; `src/app/api/crm/expense-pdf/from-task/route.ts` 1-78.

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| abn-income.ts | 70 | 1-70 | REVIEWED |
| abn-intake.ts | 77 | 1-77 | REVIEWED |
| access-log.ts | 115 | 1-115 | REVIEWED |
| account-name.ts | 78 | 1-78 | REVIEWED |
| after-reply.ts | 133 | 1-133 | REVIEWED |
| ai-budget.ts | 72 | 1-72 | REVIEWED |
| approved-es.ts | 71 | 1-71 | REVIEWED |
| approved-fr.ts | 67 | 1-67 | REVIEWED |
| approved-it.ts | 68 | 1-68 | REVIEWED |
| approved-pt.ts | 63 | 1-63 | REVIEWED |
| audit-config.ts | 91 | 1-91 | REVIEWED |
| audit-context.ts | 67 | 1-67 | REVIEWED |
| auth.ts | 50 | 1-50 | REVIEWED |
| brand-context.ts | 54 | 1-54 | REVIEWED |
| cost-report.ts | 78 | 1-78 | REVIEWED |
| demo-data.ts | 40 | 1-40 | REVIEWED |
| estimate-send.ts | 123 | 1-123 | REVIEWED |
| evals/behaviour-cases.ts | 131 | 1-131 | REVIEWED |
| expense-from-task.ts | 44 | 1-44 | REVIEWED |
| expenses-intake.ts | 71 | 1-71 | REVIEWED |
| foreign-income.ts | 58 | 1-58 | REVIEWED |
| free-advice-seeker.ts | 47 | 1-47 | REVIEWED |
| http.ts | 17 | 1-17 | REVIEWED |
| identity-question.ts | 135 | 1-135 | REVIEWED |
| inbound-edit.ts | 114 | 1-114 | REVIEWED |
| invoice-extract.ts | 120 | 1-120 | REVIEWED |
| judgement.ts | 117 | 1-117 | REVIEWED |
| knowledge-i18n.ts | 145 | 1-145 | REVIEWED |
| later-plan.ts | 82 | 1-82 | REVIEWED |
| layout.ts | 114 | 1-114 | REVIEWED |
| llm-transport.ts | 40 | 1-40 | REVIEWED |
| long-message.ts | 73 | 1-73 | REVIEWED |
| lost-analysis.ts | 92 | 1-92 | REVIEWED |
| medicare-gate.ts | 68 | 1-68 | REVIEWED |
| metrics.ts | 68 | 1-68 | REVIEWED |
| mode.ts | 40 | 1-40 | REVIEWED |
| morning-report.ts | 123 | 1-123 | REVIEWED |
| payable-followup-30oct.ts | 64 | 1-64 | REVIEWED |
| phone-candidates.ts | 113 | 1-113 | REVIEWED |
| price-flow-variant.ts | 69 | 1-69 | REVIEWED |
| promised-date.ts | 97 | 1-97 | REVIEWED |
| quotes.ts | 50 | 1-50 | REVIEWED |
| security-alerts.ts | 94 | 1-94 | REVIEWED |
| send-errors.ts | 107 | 1-107 | REVIEWED |
| svt-enquiry.ts | 34 | 1-34 | REVIEWED |
| svt-fixed-texts.ts | 89 | 1-89 | REVIEWED |
| system-message-guard.ts | 96 | 1-96 | REVIEWED |
| tax-calendar.ts | 61 | 1-61 | REVIEWED |
| template-free-text.ts | 58 | 1-58 | REVIEWED |
| text-only-reply.ts | 46 | 1-46 | REVIEWED |
| text.ts | 53 | 1-53 | REVIEWED |
| will-decides.ts | 145 | 1-145 | REVIEWED |
| digest.ts (WILL-08) | 33 | 1-33 | REVIEWED |
| form-link-task.ts (WILL-08) | 26 | 1-26 | REVIEWED |
| google-reviews.ts (WILL-08) | 29 | 1-29 | REVIEWED |
| guarantee-barred.ts (WILL-08) | 16 | 1-16 | REVIEWED |

## Findings

### WILL-07-F01: Brand falls back to WHT when the context is missing or the brand lookup fails, which switches off the Student Visa Tax safeguards
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-636 (not failing securely)
- Files and lines: src/lib/will/brand-context.ts:14-16, 21-23, 25-27; src/lib/will/llm-transport.ts:15-16; consumers read: src/lib/will/scheduler.ts:648-651, 744; src/lib/will/engine.ts:469, 745-746
- Evidence: `currentBrand()` returns `als.getStore() ?? 'wht'`; `withBrand` and `enterBrand` turn any non-brand value into `'wht'`. `jobBrand` in scheduler.ts returns `'wht'` from its `catch` when `getCustomerById` throws. `brandBody` (llm-transport.ts:16) returns the request unchanged unless the brand is `'svt'`, so the SVT prompt rebrand and student rules are skipped. engine.ts:469 holds Chinese and Vietnamese free text for approval only when `currentBrand() === 'svt'`.
- Root cause: the "unknown" state is mapped to one of the two brands instead of to a refusal.
- Attack prerequisites: none for an attacker; it needs the SVT line enabled, Autopilot (`FULL_AUTO`), and a transient store error while a job for an SVT customer is claimed, or any model call for an SVT customer made outside `withBrand`.
- Impact: a student's job is decided with the WHT system prompt and WHT knowledge, and the "hold zh/vi free text for a person" rule does not apply, so an unreviewed reply can go out on Autopilot. The send itself still uses the customer's stored brand (channel.ts:474, 190-191), so the number and the brand-leak check stay correct; the content rules do not.
- Recommended fix: in `jobBrand`, do not swallow the error: skip or re-schedule the job when the brand cannot be read. Longer term, pass the customer's stored brand explicitly to the model transport and the engine gate, as channel.ts already does for sends.
- Regression test: a store whose `getCustomerById` throws for an SVT customer's AUTO_REPLY job; assert the job is not processed as WHT (no model call with the WHT prompt, nothing queued).
- Limits of this verification: static only. I did not read all of scheduler.ts or engine.ts, so another check may catch this case; I did not enumerate every model call made outside `withBrand`.

### WILL-07-F02: A customer message containing the word "constructor" makes knowledge retrieval throw
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-1321 / CWE-754
- Files and lines: src/lib/will/knowledge-i18n.ts:21, 138-142 (same pattern in src/lib/will/knowledge.ts:199-201, outside this unit)
- Evidence: `BRIDGE` is a plain object literal and is indexed with customer words: `BRIDGE[w] ?? ...`. For `w === 'constructor'` (or "constructors", which the stem reduces to it) the lookup returns the inherited `Object` function, which is truthy, and `hits.forEach` is not a function, so a TypeError is thrown.
- Root cause: dictionary lookup on an object with a prototype, keyed by untrusted text.
- Attack prerequisites: any WhatsApp sender; also happens by accident (non-native speakers write "constructor" for a construction job).
- Impact: `retrieveKnowledge` rejects. The callers I read catch it (service.ts:1228 `.catch(() => [])`, suggest.ts:204-210, daily-digest.ts:157), so the reply is written with no Library answers for that message. Reduced answer quality, no crash seen in the callers read.
- Recommended fix: build `BRIDGE` (and `EXTRA_BRIDGE`) as a `Map`, or use `Object.create(null)` / `Object.hasOwn` before use.
- Regression test: `bridgeTokens('I work as a constructor')` returns an array and does not throw; same for "constructors".
- Limits of this verification: reasoned from the code, not executed. Other callers of `retrieveKnowledge` beyond the three found by grep were not searched for in non-`.ts` files.

### WILL-07-F03: A question that only mentions foreign income is treated as having foreign income (price +$110, guarantee withheld)
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: n/a (business logic)
- Files and lines: src/lib/will/foreign-income.ts:16-29, 32, 36-45; used at src/lib/will/service.ts:751, src/lib/will/engine.ts:511, 762, 806; src/lib/will/guarantee-barred.ts:13
- Evidence: `mentionsForeignIncome` tests the whole message against `FOREIGN_INCOME_RE` and only excludes a short list of negations. It has no question handling, unlike `hasAbnIncome` (abn-income.ts:41), which skips sentences ending in a question mark. "Do I need to report foreign income?" matches `report ... foreign income` and no negation.
- Root cause: statement and question are not told apart.
- Attack prerequisites: none; an ordinary customer question.
- Impact: the instant price path (service.ts:751) sets `foreign = true`, so a TFN-only customer can be quoted $330 instead of $220 and lose the guarantee for the rest of the conversation (the check runs over all customer texts).
- Recommended fix: apply the same sentence split and question skip that `hasAbnIncome` uses, and add tests for question forms.
- Regression test: `hasForeignIncome(['Do I need to report foreign income?'])` is false; `hasForeignIncome(['I also need to report foreign income.'])` stays true.
- Limits of this verification: not executed. I read only lines 745-756 of the price path, so a later step may correct the quote.

### WILL-07-F04: ABN income stated inside a question sentence is not detected, so the guarantee bar can miss it
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: n/a (business logic)
- Files and lines: src/lib/will/abn-income.ts:39-41; src/lib/will/guarantee-barred.ts:12-16
- Evidence: every sentence that ends in `?` is skipped whole. "I have an ABN, is that more expensive?" is one sentence, so `hasAbnIncome` returns false. The trigger list also has no Italian, Chinese or Vietnamese words for self-employment (line 19-21), so those chats rely on the literal token "ABN".
- Root cause: the question filter works per sentence, not per clause.
- Attack prerequisites: none.
- Impact: `guaranteeBarredFor` returns false for a customer who has said they have an ABN, so a draft carrying the TFN guarantee is not stopped by this rule. engine.ts:512-514 says other signals exist (profile, an ABN price in the reply), which I did not read in full.
- Recommended fix: split on clauses before the question test, or treat "I have / I've got / with an ABN" as a statement even when the sentence ends in a question.
- Regression test: `hasAbnIncome(['I have an ABN, is that more expensive?'])` is true; `hasAbnIncome(['Do I need an ABN?'])` stays false.
- Limits of this verification: not executed; the other guarantee signals in engine.ts were not reviewed.

### WILL-07-F05: Customer first names with full or partial phone numbers are written in source comments
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-615 / CWE-359
- Files and lines: full number with a first name: src/lib/will/long-message.ts:4; src/lib/will/identity-question.ts:115. First name with country code and number prefix: src/lib/will/abn-income.ts:2; account-name.ts:46; free-advice-seeker.ts:2; identity-question.ts:120; later-plan.ts:2; promised-date.ts:4; quotes.ts:5; will-decides.ts:131. Many more comments carry customer first names with a paraphrase of their case.
- Evidence: the comment headers name the customer and give the number as the example that led to the rule.
- Root cause: incident notes kept in code comments.
- Attack prerequisites: read access to the repository, a build artefact with comments, or any copy of the source.
- Impact: personal information (name, phone number, tax situation) of real customers is disclosed to everyone with repository access and survives in history. `evals/behaviour-cases.ts:1-6` states that no customer data is stored, which is true for that file only.
- Recommended fix: replace names and numbers in comments with case ids; keep the mapping in the CRM.
- Regression test: a lint or grep check in CI that fails on a `+` followed by 8 or more digits in `src/`.
- Limits of this verification: I only list the files of this unit; I did not check whether the names are real.

### WILL-07-F06: Invoice reading by the model has no spend check, no file-size limit and ignores the kill switch for spending
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-770
- Files and lines: src/lib/will/invoice-extract.ts:56-58, 78-103; src/lib/will/expense-from-task.ts:20-21; caller src/app/api/crm/expense-pdf/from-task/route.ts:15, 49-62
- Evidence: `extractInvoice` calls the model once per file and never calls `aiBudgetExhausted`. `buildExtractBody` base64-encodes the whole file with no size check. The route allows 50 files per request. ai-budget.ts:39-43 documents a budget of 0 as the off switch; this path does not consult it.
- Root cause: the new path (15 Nov) was not wired to the shared budget.
- Attack prerequisites: a valid CRM session (one shared password per audit-context.ts:1-3), or a stolen one.
- Impact: unmetered paid calls and large request bodies; whole customer documents (which can include bank statements) are sent to the model even when the owner has set the budget to 0.
- Recommended fix: call `aiBudgetExhausted()` before each file, cap the bytes per file, and return the file as "unread" when over either limit.
- Regression test: with `ai_daily_budget = 0`, `extractInvoice` makes no network call and returns null.
- Limits of this verification: I did not read `expense-pdf.ts` or the upload limits that apply when the files are first stored.

### WILL-07-F07: The read-audit whitelist silently drops the details of the "expense PDF from task" read
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-778
- Files and lines: src/lib/will/access-log.ts:34-42, 78-87; caller src/app/api/crm/expense-pdf/from-task/route.ts:68
- Evidence: `ALLOWED.crm_file` is `['pathHash']`. The route passes `action`, `taskHash` and `built`, none of which is on the list, so `clean()` returns an empty object and the row says only `route: 'crm_file'`.
- Root cause: the whitelist was not extended for the new caller; unknown keys are dropped without an error.
- Attack prerequisites: none; it is a logging gap.
- Impact: after an incident the log cannot show which task's customer files were read and sent to the model. It also does not tell this action apart from an ordinary file view.
- Recommended fix: add `taskHash`, `action` and `built` to the `crm_file` list (they match the safe shapes), or add a route `expense_pdf`; make `clean()` report dropped keys in tests.
- Regression test: `recordDataRead(req, 'crm_file', { taskHash: 'abc', built: 2 })` writes a row that contains both values.
- Limits of this verification: other callers of `recordDataRead` were not checked for the same mismatch.

### WILL-07-F08: Security alerts are all off unless an env variable is set, and a failed alert email is not retried for 15 minutes
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-778 / CWE-1188
- Files and lines: src/lib/will/audit-config.ts:70-81; src/lib/will/security-alerts.ts:42-47, 63-72; src/lib/will/access-log.ts:107-113
- Evidence: `alertEnabled` is true only for exactly "1" or "true"; with the four `SECURITY_ALERT_*` variables unset, a bulk export, a kill-switch change, a burst of forged webhook signatures and a dead cron raise nothing. In `raiseAlert`, `lastSent.set(kind, now)` runs before the send, so a send that throws still starts the 15-minute throttle. In `recordDataRead` the export alert is raised only after the audit write succeeds; if the audit write throws, the read goes ahead with no row and no alert.
- Root cause: opt-in defaults and throttle state written before success.
- Attack prerequisites: a stolen CRM session, on a deployment where the variables were never set.
- Impact: a bulk export of all conversations is not pushed to the owner; it is visible only if someone reads the audit log (kept 90 days by default, audit-config.ts:16).
- Recommended fix: default `bulk_export` and `signature_burst` to on when `CRM_ADMIN_EMAIL` is configured; set the throttle time only after the sender resolves; for the export route, refuse the export when the audit row cannot be written.
- Regression test: with no env set, an export raises the alert; a sender that throws once is called again on the next event.
- Limits of this verification: I did not read `sendSecurityEmail` or check which variables are set in Vercel.

### WILL-07-F09: readJson buffers the whole body before its size check when Content-Length is absent, and counts characters instead of bytes
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-770
- Files and lines: src/lib/will/http.ts:8-11
- Evidence: the early rejection uses the `content-length` header only. A chunked request has no such header, so `await req.text()` reads everything first. The second check compares `raw.length` (UTF-16 units) with a byte limit, so a body of multi-byte characters up to about three times 64 KB passes.
- Root cause: the limit is applied after buffering.
- Attack prerequisites: for the two routes that use it (`api/will/actions`, `api/will/knowledge`) the caller still has to reach the handler; whether the session check runs before `readJson` was not verified.
- Impact: memory use up to the platform's own request limit per call; small in practice on Vercel.
- Recommended fix: read the stream with a running byte count and stop at the limit; compare `Buffer.byteLength(raw)`.
- Regression test: a streamed body of 200 KB without Content-Length returns 413 without the full body being read.
- Limits of this verification: the platform body limit and the order of auth and parsing in the two routes were not checked. Only 2 route files import `readJson`; the other routes use `req.json()` with no limit of their own (seen in `expense-pdf/from-task/route.ts:31`).

### WILL-07-F10: The inbound phone-number filter accepts every delivery when the WHT number id is not configured or the delivery carries no number id
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-636
- Files and lines: src/lib/will/brand-context.ts:46-54; caller src/app/api/will/webhook/route.ts:534, 718
- Evidence: line 52 returns `null` (drop) only when both `whtPhoneId` and `arrivedOn` are present and differ. With `whtPhoneId` undefined, or with `metadata.phone_number_id` missing, the function returns `'wht'`.
- Root cause: the "not ours" rule is written as a negative match with a permissive default (kept from the pre-SVT behaviour, per the comment on line 43-44).
- Attack prerequisites: the webhook signature must still pass (not in this unit). It matters if the Meta app has more than one number, or the stored and env phone ids are both empty (`resolveWaCreds`, channel.ts:77-90).
- Impact: messages for another number on the same Meta app would be processed as WHT customers.
- Recommended fix: when a token is configured, require a configured phone id and drop deliveries with no `phone_number_id`.
- Regression test: `brandForPhoneNumberId(undefined, 'X')` and `brandForPhoneNumberId('Y', undefined)` return null in production mode.
- Limits of this verification: I did not read the signature check or the test-mode handling in the webhook route.

### WILL-07-F11: The redaction used before transcripts go to the model and into stored reports misses several identifier shapes
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359
- Files and lines: src/lib/will/digest.ts:13-14, 17-25; used at src/lib/will/lost-analysis.ts:69, 82
- Evidence: `LONG_DIGITS` needs 7 or more digits joined only by spaces or hyphens. A number written with dots or slashes, a 6-digit BSB, a date of birth, a street address and an alphanumeric passport number pass through. `shortLabel` keeps the customer's first name and the last three digits of the number.
- Root cause: redaction by one digit-run pattern.
- Attack prerequisites: none; it depends on what customers type.
- Impact: such values reach the model prompt and the stored evidence text; the comment at lost-analysis.ts:46-48 promises that they do not.
- Recommended fix: allow `.` and `/` as separators, redact 6-digit groups next to "BSB", and add date and letter-plus-digits passport patterns; state the remaining limits in the comment.
- Regression test: `redactSensitive('TFN 123.456.782')` and `redactSensitive('BSB 123456')` contain no digits.
- Limits of this verification: I did not read daily-digest.ts or claude.ts to see what else is sent with the transcript.

### WILL-07-F12: The payee bank details are repeated as literals in many files
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/will/account-name.ts:15, 18-24; price-flow-variant.ts:66-67; svt-fixed-texts.ts:17-22, 29-32, 58-63, 70-73; approved-es.ts:22-23 and five more blocks; approved-fr.ts:12-13; approved-it.ts:19-20 and five more blocks; approved-pt.ts:14-15 and five more blocks; send-errors.ts:75
- Evidence: the account name, BSB and account number are typed out in each message instead of coming from one constant. They are the business's own receiving account and are meant to be sent to customers, so this is not a leaked secret.
- Root cause: copied wording per language.
- Attack prerequisites: n/a.
- Impact: integrity risk on change: an edit that misses one copy sends customers a different account. The guard code `WRONG_BANK_DETAILS` exists (send-errors.ts:75), but I did not read the guard itself.
- Recommended fix: one exported constant used by every message, and a test that no other BSB or account literal exists under `src/lib/will/`.
- Regression test: as above.
- Limits of this verification: policy-guard.ts was not read.

## Checked and found sound

- Constant-time compare for cron secrets, false on empty or missing values: auth.ts:9-13.
- Cron auth fails closed when `CRON_SECRET` / `WILL_CRON_SECRET` are unset (no match on an empty secret); falls through to the session check only: auth.ts:25-33, 41-50.
- Session check refreshes the revocation list before validating: auth.ts:17-20 (with crm-store.ts:112-161).
- Autopilot needs the exact string `FULL_AUTO`; everything else is Approval mode: mode.ts:33-40.
- Decision mode and price-flow settings fall back to a fixed value on unknown input: will-decides.ts:32-34; price-flow-variant.ts:29-31.
- AI budget: explicit 0 is honoured, garbage falls back to the default, counter is atomic where the store supports it: ai-budget.ts:44-49, 53-66.
- Audit retention is clamped to 30..3650 days and security rows are never kept for less time than ordinary rows: audit-config.ts:31-44.
- Read-audit detail is whitelisted per route and limited to safe value shapes; ids are hashed; no search text is stored: access-log.ts:34-55, 78-87.
- Session tag in the audit log is a hash of the `sid`, never the `sid`: audit-context.ts:58-67.
- Alert email body strips HTML characters from the session, IP and device values: security-alerts.ts:27-32.
- Signature-failure window is bounded in memory: security-alerts.ts:65-67.
- Model output for invoices is validated field by field before use; unsupported MIME types are refused: invoice-extract.ts:39-53, 56-66.
- Prices in every language file match the fixed list ($220, $385, $330 and $495 with foreign income, $330 and $440 review) and the guarantee sentence appears only in the TFN-only price text: approved-es.ts, approved-fr.ts, approved-it.ts, approved-pt.ts, svt-fixed-texts.ts:19-22, 29-32, 60-63, 70-73, price-flow-variant.ts:42-61, quotes.ts:17-18, foreign-income.ts:10-11.
- One guarantee rule for all send paths (foreign income, ABN income, already lodged): guarantee-barred.ts:12-16.
- Estimate can only be sent in the listed states; pending documents hold it unless explicitly overridden: estimate-send.ts:27-37, 113-123.
- Duplicate "payment received" / "questionnaire received" detection and the repair scan are pure and bounded by time windows: system-message-guard.ts:53-60, 77-96.
- A draft is discarded only if it is still a live draft; nothing in the after-reply path can throw: after-reply.ts:58-66, 77-98.
- Inbound edits never overwrite text with a guess and never fail the delivery: inbound-edit.ts:82-114.
- Phone candidates are exact-match values only; the store treats two matches as no match: phone-candidates.ts:70-107 (with store-supabase.ts:460-476).
- The WHT form URL in later-plan.ts:45 is rebranded or blocked for SVT at send time: channel.ts:185-186, 276, 474-478.
- Medicare script gate defaults to "do not send" on unknown visa or unknown form answer: medicare-gate.ts:37-49.
- Cost report: key is read from env, sent only to the fixed Anthropic host, with a timeout and a page cap: cost-report.ts:45-58.
- Google reviews: fixed host, timeout, empty list on any error; the fallback widget id is a public identifier, not a credential: google-reviews.ts:10-28.
- No secrets, tokens or passwords found in any file of the unit.
- No SQL, PostgREST filter, HTML rendering, redirect or file-path handling in the unit.

## Open questions

1. Which model calls for SVT customers run outside `withBrand`? Only the webhook, the scheduler, `tax-form`, `mia/form-link` and `will/link` set it. CRM routes that look customers up by phone (`api/crm/tasks/[id]/route.ts`) run as WHT, so with the SVT line on they would not find an SVT customer (a miss, not a leak). Not verified further.
2. `api/will/tick` is a GET that accepts the CRM session cookie (auth.ts:32). A cross-site GET could trigger a scheduler run if the cookie's SameSite setting allows it. The run is described as idempotent; the cookie attributes are outside this unit.
3. `ensureRevocationFresh` (crm-store.ts:112-124) resolves after a timeout even if the revocation list was not refreshed, so a revoked session may be accepted during a Redis outage. Outside this unit; flagged for the LIB reviewer.
4. service.ts:2547 and 2871 treat a throw from `aiBudgetExhausted` as "not exhausted" (documented as deliberate). Whether lines 1206 and 2445 handle a throw was not checked.
5. form-link-task.ts:11-15 embeds the phone number and email from the public questionnaire into task text without removing quotes, and line 22 parses it back with a pattern. Whether form-link.ts cleans `waNumber` and `email` before this call was not checked; the visible effect would be limited to what the "Link to chat" control shows.
6. `svt-enquiry.ts:21-31`: any customer who writes the three words of the other brand's name stops all automation in their own chat. Self-inflicted only; noted for completeness.
7. `multiYearLine` (quotes.ts:46-50) writes a total such as two times the fee. Whether the policy guard's fixed-amount rule accepts that total was not checked.
8. The Spanish, French, Italian and Portuguese price texts say in their headers that no native speaker has checked them (approved-es.ts:5, approved-fr.ts:9, approved-it.ts:10, approved-pt.ts:1). A compliance point, not a code defect.
