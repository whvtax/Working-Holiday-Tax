# WILL-04 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/handoff-reasons.ts | 657 | 1-500, 501-657 | REVIEWED |
| src/lib/will/playbook.ts | 752 | 1-250, 251-500, 501-752 | REVIEWED |
| src/lib/will/store-file.ts | 815 | 1-420, 421-815 | REVIEWED |
| src/lib/will/store-supabase.ts | 1580 | 1-400, 401-800, 801-1200, 1201-1580 | REVIEWED |
| src/lib/will/system-report.ts | 390 | 1-390 | REVIEWED |

Total 4,194 lines, all read. Files outside the unit opened only to judge a finding (short ranges or grep hits, not full reviews): `src/lib/will/store.ts` (526, 560-580), `src/lib/supabase.ts` (grep), `src/lib/will/claude.ts` (135-160, 201), `src/lib/will/service.ts` (158-176, 244-258, 998-1050), `src/lib/will/scheduler.ts` (806-824, 2215-2224, 2412-2415), `src/lib/will/engine.ts` (972, grep), `src/lib/will/mode.ts` (33-40), `src/lib/will/audit-context.ts` (40-49), `src/app/api/will/actions/route.ts` (1052, 1136-1150), `src/app/api/will/whatsapp/inbound-check/route.ts` (48-64), `src/app/api/will/webhook/route.ts` (grep hits 792, 931), `supabase/migrations/021` and `047` (grep hits).

No code was run. Nothing was modified except this report.

## Findings

### WILL-04-F01: Real customers' names, phone numbers and case facts are embedded in the system prompt sent to the model for every conversation
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359 (exposure of private personal information), CWE-200
- Files and lines: src/lib/will/playbook.ts:139-623 (examples at 157, 159, 165, 173, 271, 305, 321, 328, 339, 419, 421, 423, 433-436, 441, 508-style case notes at 590-614, and a complete phone number with a first name at 622); src/lib/will/handoff-reasons.ts:508 (first name plus complete phone number in a comment)
- Evidence: the `stable` template literal returned by `buildSystemPrompt` (playbook.ts:113-706) is the cached system prompt; `claude.ts:201` is its only caller. The text names dozens of real customers by first name, several with country code and number prefix and at least one with a full number, alongside what they asked, that they owed tax, that their ATO account was locked, who their relatives are, and what they were charged. None of this passes through `sanitize()`; it is literal source text.
- Root cause: incident notes written for the team were put inside the model instructions instead of code comments or a separate changelog.
- Attack prerequisites: none to cause the disclosure to the model provider (it happens on every `decide` call). To surface it to another customer, a customer only needs the model to quote an "example" (line 337 already records the model answering "with anything from another customer's conversation").
- Impact: personal and tax-related information of identifiable customers is sent to a third-party processor with every request for every other customer, sits in prompt caches, and can be reproduced to unrelated customers by the model. It is also in the repository for anyone with source access. The `# SECURITY` block (180-183) forbids revealing instructions, but that is a model-level control only.
- Recommended fix: remove every name, number and identifiable circumstance from the prompt text; keep the rule, drop the anecdote ("a lead asked X" instead of name plus number). Move the history to comments or a doc outside the prompt, and strip the full numbers from the source altogether (playbook.ts:622, handoff-reasons.ts:508).
- Regression test: a unit test that builds the prompt and fails on any `+<digits>` phone pattern and on any name from a deny-list of known customer first names; plus a lint rule on `src/lib/will/**` for full phone numbers.
- Limits of this verification: I did not check whether the comment at handoff-reasons.ts:508 survives into the browser bundle (the module is imported by a client component per its own line 572; minifiers normally strip comments). I did not read `will-decides.ts`, `approved-messages.ts` or `language-rules.generated.ts`, which are also concatenated into the prompt.

### WILL-04-F02: SupabaseStore reads discard the database error and report "not found / empty", so safety checks built on them fail open
- Severity: MEDIUM
- Confidence: high (that the errors are discarded); medium (downstream impact)
- Status: CONFIRMED_BY_STATIC_EVIDENCE for the swallow; REQUIRES_RUNTIME_VALIDATION for each downstream effect
- CWE: CWE-636 (not failing securely), CWE-252 (unchecked return value)
- Files and lines: src/lib/will/store-supabase.ts:687-692 (`isBlockedContact`), 452-458 (`getCustomerByWaId`), 460-477 (`findCustomerByPhone`), 479-482 (`getCustomerById`), 600-604 (`history`), 702-709 (`listMessages`), 714-720 (`listPendingOutbound`), 722-725 (`getMessageById`), 882-892 (`pendingApprovals`), 1041-1049 (`getSetting`), 1055-1063, 1201-1206, 1244-1265, 1267-1270
- Evidence: each of these destructures only `data` and never reads `error`. Examples of what follows:
  - `isBlockedContact` returns `false` on any error. The webhook uses it (webhook/route.ts:792, 931) to keep pre-existing contacts out of Will, so during a database error, or with the `will_known_contacts` table missing, a blocked contact is handled by the assistant. The health probe at whatsapp/inbound-check/route.ts:55-64 assumes this call throws when the table is missing; it cannot, so that probe is always green.
  - `listMessages` returns `[]` on error, so the model and any history-based check (duplicate reply, "already sent", the holding-line logic at scheduler.ts:807-819) run against an empty conversation.
  - `getSetting` fails safe only for the key `kill_switch` (line 1047). For `bank_details` a failed read becomes `undefined`, and `getBank` (service.ts:161-165) then returns placeholder BSB/account values instead of stopping.
  - `history` returning `[]` removes the "already paid / lodged" facts from the backstory (service.ts:1016-1041).
- Root cause: supabase-js returns `{ error }` rather than throwing, and most read helpers were written as if it threw. The file itself fixes this in some places (dueJobs, listTasks, findOpenTaskForCustomer) with comments describing the same bug.
- Attack prerequisites: a transient Supabase/PostgREST error, a missing migration, or rate limiting. An outsider cannot reliably trigger it, but volume of inbound messages raises the chance.
- Impact: blocked contacts answered automatically; replies decided without conversation history; placeholder bank details possibly sent to a customer who is about to pay; duplicate or wrong-stage messages. All silent.
- Recommended fix: read `error` in every helper and throw (the pattern already used at 941-945). For the checks that gate sending (`isBlockedContact`, `getSetting` for `bank_details`, `listMessages`) the caller should treat a throw as "do not send, raise a task". Make `getBank` refuse rather than return placeholders.
- Regression test: with a mocked client returning `{ data: null, error }`, assert `isBlockedContact`, `listMessages`, `getCustomerById`, `getSetting('bank_details')` reject; assert the webhook path does not call the model when `isBlockedContact` rejects.
- Limits of this verification: I did not trace every caller. I did not confirm where `getBank` output is sent or whether the Policy Guard rejects the placeholder values.

### WILL-04-F03: Writes whose failure is ignored, including the kill switch, report success to the operator
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-252, CWE-390
- Files and lines: src/lib/will/store-supabase.ts:1051-1053 (`setSetting`), 683-685 (`markCustomerRead`), 811-821 (`setMessageStatus`), 823-827 (`attachProviderId`), 829-841, 857-880, 554-556 (state history insert in `setState`), 671-681, 1013-1022 (`updateTemplate`, `deleteTemplate`), 1065-1072, 1305, 1407-1419 (knowledge writes), 1468-1470 (`releaseInbound`)
- Evidence: none of these inspect the result. `set_kill_switch` in actions/route.ts:1141-1146 calls `setSetting('kill_switch', …)`, then writes the audit row `kill_switch_on` and returns `{ ok: true }` with no read-back. If the upsert fails, the dashboard and the audit log both say Will is paused while he keeps sending. `setMessageStatus` failing leaves a message QUEUED/SENDING after it was really sent (the `staleOutbound` sweep at 732-740 then sees it as stranded) and `attachProviderId` failing means Meta's later "failed" callback cannot be matched to the message. A failed template edit/delete leaves the old wording live in the prompt while the Library shows the edit as saved.
- Root cause: same as F02, on the write side.
- Attack prerequisites: a failed write (transient error, RLS or schema drift).
- Impact: the emergency stop can silently not engage; delivery state and the audit trail diverge from reality; possible resend of an already delivered message.
- Recommended fix: throw on `error` in all of these (as `setJobStatus` at 1272-1279 already does). For the kill switch, read the value back before answering `ok`.
- Regression test: mocked failing upsert, assert `set_kill_switch` returns an error and writes no `kill_switch_on` audit row; mocked failing `setMessageStatus`, assert the caller records it.
- Limits of this verification: I did not read what the stranded-outbound sweep does with such a message (resend or task).

### WILL-04-F04: Customer deletion is partial, unchecked and not transactional
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-459 (incomplete cleanup), CWE-212
- Files and lines: src/lib/will/store-supabase.ts:1024-1039; src/lib/will/store-file.ts:526-536; caller src/app/api/will/actions/route.ts:1052
- Evidence: five separate deletes, no error checked, the parent row deleted last regardless of whether the child deletes worked. Not removed: `will_audit` rows that carry the customer id or number (for example `customer_created` is audited with the `waId` field at service.ts:246), `will_ai_usage.customer_id` (1070), per-customer rows in `will_settings` (for example the ABN-intake key read at service.ts:1001), `will_processed_messages`, and the lost-analysis table named at 219-224. When `customerId` is not passed, line 1028 looks up by `wa_id` alone with `maybeSingle()`; with the same number under both brands that errors and the function returns having deleted nothing. The FileStore version (528) deletes the first match of either brand.
- Root cause: deletion written as best-effort housekeeping, not as an erasure operation.
- Attack prerequisites: none; this is what an authorised delete does today.
- Impact: an erasure request leaves the phone number and conversation-derived data behind while the operator is told it succeeded; a mid-way failure leaves orphaned messages or a customer with no history.
- Recommended fix: one SQL function (transaction) that deletes or anonymises every table keyed by customer id or number and returns counts; throw on any error; require the id, never the number alone.
- Regression test: integration test that creates a customer with messages, tasks, jobs, audit, usage and a per-customer setting, deletes, and asserts no row in any `will_*` table references the id or the number.
- Limits of this verification: I did not read the migrations for cascade rules, nor the full delete action in the route beyond line 1052.

### WILL-04-F05: The prompt tells the model to treat an unverified "I paid" or any screenshot as payment and to raise no task
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-840 (business logic), CWE-345
- Files and lines: src/lib/will/playbook.ts:186, 591, 631; contradicted by 198; store effect at src/lib/will/store-supabase.ts:569 and src/lib/will/store-file.ts:263
- Evidence: line 186 "the customer's own message confirming payment … is the trigger to treat payment as made"; line 591 "treat it as proof, the service does not need a bank check … send the form link, and raise NO task"; rule 3 at 631 "Trust clear confirmations … and set the matching new_state". Line 198 says the opposite for one nudge ("do NOT confirm a payment from the word yes"). `setState` to any post-payment stage sets `paid = true`, which the comment at 560-568 says is what stops sales follow-ups. The engine only holds a PAID move when the customer did not report a payment (engine.ts:972).
- Root cause: payment confirmation is delegated to the customer's word plus the model's reading of an image.
- Attack prerequisites: any WhatsApp user who writes "paid" or sends any image described as a receipt.
- Impact: a non-payer is marked paid, receives the form link, and enters the prepared-return queue; later fee-refund and guarantee conversations (playbook 526) start from a payment that was never checked. Whether a person still checks the bank before work starts is outside these files (handoff-reasons.ts:329-333 suggests a "payment proof arrived" task exists on some paths).
- Recommended fix: keep the customer-facing acknowledgement, but make the PAID transition depend on a human or bank confirmation, or always raise the payment-proof task; remove "raise NO task" at 591.
- Regression test: simulator case "I paid" with no proof: assert a payment-verification task exists and `paid` is not set until it is resolved.
- Limits of this verification: engine.ts, service.ts payment-proof code and the Policy Guard were not read in full.

### WILL-04-F06: Conflicting business rules inside the prompt (guarantee, residency, opening message, non-standard amounts)
- Severity: LOW
- Confidence: high (the text conflicts); low (what the model then sends)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/lib/will/playbook.ts:622 and 295 (guarantee), 137, 173-178, 218 versus 275, 476, 497 (residency), 261-265 versus 284 and 302 (opening), 224-226 (amount), 116 and 123 (the prompt's own rule for conflicts)
- Evidence:
  - Guarantee: 622 tells the model to quote "the fee ($220 / $385 incl GST) with the guarantee line" to a lead whose track is unknown, and 295 gives couples "the guarantee" without the TFN-only condition. Elsewhere (186, 246, 271, 529, 563) the guarantee is TFN-only.
  - Residency: 137 and 173-178 have the model count answers and tell the customer "it looks like you may count as a tax resident"; 476 says "you cannot confirm it here … not as the assessment"; 137 says six questions with four yes, 173-175 and 218 say five.
  - Opening: 261-265 describe `[opening]` as a menu with both prices that must always be the first reply; 284 says it no longer carries prices and is skipped when the first message names a track.
  - Amount: 224-226 has the model write the bank block itself with whatever amount a team message quoted, outside the fixed price list.
- Root cause: dated instructions appended without removing the ones they replace.
- Attack prerequisites: none.
- Impact: the model can state the guarantee to an ABN customer or give a residency view, depending on which paragraph it follows; enforcement then rests entirely on the Policy Guard.
- Recommended fix: delete superseded paragraphs; state the guarantee condition at 622 and 295; pick one residency rule; route any non-list amount through an approved template rather than model-written bank details.
- Regression test: prompt lint that fails when "guarantee" appears in a sentence with `$385` without "no guarantee"/"not"; simulator cases for an ABN lead hitting the 622 scenario.
- Limits of this verification: Policy Guard not read; it may block these outputs.

### WILL-04-F07: Inbound idempotency claim fails open on any unexpected database error
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636, CWE-294
- Files and lines: src/lib/will/store-supabase.ts:1457-1466
- Evidence: `claimInbound` returns `true` for every error except unique violation 23505. The comment states the choice (at-least-once).
- Root cause: deliberate trade-off, without a second de-duplication layer in this file.
- Attack prerequisites: Meta redelivery (normal) coinciding with insert errors on `will_processed_messages` (missing table, outage).
- Impact: the same inbound message is processed more than once: duplicate stored messages, duplicate model calls and possibly duplicate replies for as long as the error lasts.
- Recommended fix: on an unexpected error, check for the stored message by its Meta id before processing, or return an error to Meta so it retries later.
- Regression test: mocked insert error, deliver the same Meta id twice, assert one stored inbound message and one reply.
- Limits of this verification: the webhook may de-duplicate again by message id; not read.

### WILL-04-F08: Read-then-write updates that lose increments under concurrency
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-362
- Files and lines: src/lib/will/store-supabase.ts:1283-1290 (`claimJob` attempts), 636-638 (unread count), 545-549 (A/B conversion counter and `credited` flag), 1013-1018 (template versions), 823-827 and 857-863 (whole `meta` object rewritten from a stale read)
- Evidence: each reads a value, computes in the application and writes it back without a condition. For `claimJob` the status flip is atomic but `attempts` is read first, so two instances can write the same number; the three-attempt dead-letter rule at 1303 then undercounts. The `meta` rewrites can drop a field written by a concurrent callback (for example `deliveredAt` overwriting `providerId` or `sendError`).
- Root cause: no SQL-side increment or JSON merge.
- Attack prerequisites: two serverless instances touching the same row.
- Impact: a failing job retried more than three times (repeat sends are otherwise guarded by status); lost delivery metadata; wrong counters.
- Recommended fix: SQL functions for `attempts = attempts + 1`, `unread_count + 1`, and `meta = meta || jsonb`.
- Regression test: concurrent `claimJob` on the same id against a test database; assert attempts increments once per successful claim.
- Limits of this verification: none beyond static reading.

### WILL-04-F09: The store is the only data boundary (service-role key) and most reads are not scoped by brand
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-639, CWE-284
- Files and lines: src/lib/will/store-supabase.ts:179 with src/lib/supabase.ts:23 (env name `SUPABASE_SERVICE_ROLE_KEY`); 400-436 (`searchCustomers`), 438-450 (`searchMessages`), 479-482, 487-497, 722-725, 882-892, 905-924, 954-958; 385-398 (`listChatPage` brand filter only when the caller passes it and the SVT line flag is on); 517-530 (`updateCustomer` accepts any field, including `paid`, `state`, `waId`); same shape in src/lib/will/store-file.ts:154-178, 203-214, 243-248
- Evidence: every query runs with the service-role client, so row-level security does not apply. Brand is applied only in `getCustomerByWaId`, `findCustomerByPhone`, `createCustomer` and optionally `listChatPage`. Searches, id lookups, tasks, approvals and the pending-approval list return WHT and SVT rows together. No method takes a caller identity.
- Root cause: authorisation and brand separation are left to every route.
- Attack prerequisites: an authenticated CRM user or route that should see one brand only, or a route that passes a client-supplied id or patch to these methods.
- Impact: cross-brand visibility of customers and messages in search and task lists; IDOR or mass assignment if any route forwards unvalidated input.
- Recommended fix: add a brand argument to the search and list methods; whitelist the fields `updateCustomer` accepts from request-driven callers.
- Regression test: with one WHT and one SVT customer sharing a name, assert a brand-scoped search returns one.
- Limits of this verification: routes were not reviewed; if the CRM has a single owner for both brands the visibility part is by design.

### WILL-04-F10: Customer-controlled text can steer what the owner's handoff cards say and link to
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-74, CWE-451
- Files and lines: src/lib/will/handoff-reasons.ts:582-594 (parser), 130, 139, 148, 155, 164, 178, 252 (unanchored patterns), 415-423; producer src/lib/will/scheduler.ts:2215-2218 and 2412-2415
- Evidence: the nightly card context is `id|name|text` per line with no escaping, and `name` is the WhatsApp display name (or the number). A display name containing `|`, a newline or `---` shifts the fields or adds a line, so `parseNightlyIssues` yields an entry with a chosen id and text. Separately, seven rules match anywhere in the reason string, and the reason can be a model-written headline (playbook.ts:642) or begin with the customer's name; text matching one of them relabels the card as a "nothing to fix" kind.
- Root cause: a text protocol built by concatenation; classification by substring.
- Attack prerequisites: a customer who sets a crafted display name or wording and is then listed on a card.
- Impact: misleading text and a wrong "open this chat" target on the owner's dashboard; a genuine handoff presented as needing no action. No server-side privilege gained.
- Recommended fix: store the nightly issues as JSON; strip `|` and line breaks from names; anchor the patterns or classify from a structured reason code.
- Regression test: `parseNightlyIssues(buildNightlyIssueContext([{ id, name: 'a|b\nX|Y|Z', text }], []))` returns exactly one entry with the original id.
- Limits of this verification: I did not read how the Dashboard renders these entries or whether the name is cleaned on intake.

### WILL-04-F11: `businessHoursBetween` iterates minute by minute over an unbounded interval
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-834 (excessive iteration), CWE-400
- Files and lines: src/lib/will/handoff-reasons.ts:620-633, 651-657; caller src/lib/will/scheduler.ts:813-819
- Evidence: one `Intl.DateTimeFormat.formatToParts` call per minute between `lastAckAt` and now. The caller passes the timestamp of the last holding message, with no upper bound; a task open for months means hundreds of thousands of calls inside the scheduler tick.
- Root cause: counting instead of calculating; no early exit once four hours are reached.
- Attack prerequisites: a customer with an old holding line and an open task writes again.
- Impact: slow ticks; other due jobs are delayed (the tick already has a time budget, see system-report.ts:266-271).
- Recommended fix: stop once the threshold is reached, or cap the interval at a few days.
- Regression test: `businessHoursBetween(oneYearAgo, now)` completes within a small time bound.
- Limits of this verification: timing not measured.

### WILL-04-F12: Prompt assembly hardening gaps
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-1427 (prompt injection), CWE-1321
- Files and lines: src/lib/will/playbook.ts:57-65, 102-112, 559-568, 587, 722, 746-749
- Evidence: (a) `LANG_NAMES[ctx.lang]` and `LANGUAGE_RULES[ctx.lang]` index plain objects with a stored string; a value such as an inherited property name is truthy and is interpolated into the prompt. (b) `sanitizeReference` removes a short English deny-list only; retrieved Library answers are otherwise placed in the prompt up to 1,200 characters each, fenced as data. (c) Library template bodies (`live`) replace the approved price, payment and guarantee messages in the cached prompt with no validation here; the only check is "not blank".
- Root cause: reliance on fencing and on whoever can edit the Library.
- Attack prerequisites: (a) a non-standard `lang` value reaching the customer row; (b) a poisoned knowledge row reaching status approved; (c) Library edit rights or a hijacked CRM session.
- Impact: altered instructions or prices in what the model treats as approved wording. The nightly bank-details check mentioned at handoff-reasons.ts:336-341 covers bank numbers only.
- Recommended fix: use `Object.hasOwn` or a `Map` for the language lookups; validate `lang` against the known codes; run price and guarantee checks on Library bodies before they enter the prompt.
- Regression test: `buildSystemPrompt({ …, lang: 'constructor' })` contains no "function"; a Library body with a wrong price is rejected or falls back.
- Limits of this verification: I did not read the language detector, the knowledge approval flow or the Library edit route.

### WILL-04-F13: FileStore replaces the whole store with seed data after any read error (development only)
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: CWE-755
- Files and lines: src/lib/will/store-file.ts:43-74, 39
- Evidence: the outer `catch` at 59 handles every failure of `readFile` or `JSON.parse` by building a seed database and persisting it over `.data/store.json` (a corrupt file is copied aside first; a permission or I/O error is not). The file holds conversations in plain text. Production use is refused in store.ts:574-576.
- Root cause: "file missing" and "file unreadable" are handled the same way.
- Attack prerequisites: development or simulator use only.
- Impact: loss of local test data; plain-text personal data on a developer machine if real data is ever loaded.
- Recommended fix: seed only on ENOENT; rethrow otherwise.
- Regression test: unreadable file leaves the file untouched and `load()` rejects.
- Limits of this verification: none.

## Checked and found sound

- Production refuses the file store: src/lib/will/store.ts:564-577.
- Kill-switch read fails safe (reports ON when the read errors): store-supabase.ts:1047.
- AI budget counter is atomic and fails closed: store-supabase.ts:1095-1104; `ai_mode` falls back to supervised on a missing value: src/lib/will/mode.ts:33-40.
- Atomic single-winner claims: `claimMessageForSend` 795-801, `claimQueuedForSend` 803-809, `claimJob` status flip 1286-1289, `setState` optimistic check 582-588.
- LIKE wildcards escaped in search and counters: 403, 441, 1058; `purgeAudit` restricts actor names before building the filter list: 1476-1479; `reclaimStaleJobs` and `dueJobs` build `.or`/`.not` strings from server constants only: 1163, 1295, 1519.
- Ambiguous phone match treated as no match: store-supabase.ts:472-476, store-file.ts:195-200.
- Customer display name and missing-document labels sanitised and fenced as data before the prompt: playbook.ts:49-51, 721, 728; the first-message quote in the backstory goes through `quoteForPrompt` (service.ts:1047; helper not read).
- The "[Sent by a human team member]" marker is added only to assistant-role turns, so a customer typing it stays in a user turn: claude.ts:145-152.
- Fixed prices in the prompt match the brief ($220, $385, $330/$495 foreign, $330/$440 review): playbook.ts:186, 246, 271, 529.
- No credentials or tokens in the five files. Environment variable names appear only as operator guidance text (handoff-reasons.ts:340, system-report.ts:174-175).
- system-report.ts is pure (no I/O); error text is truncated to 240 characters (310-317); the dollar figure is labelled an estimate (51, 67-71).

## Open questions

1. Is the business bank account meant to live in three places (prompt text at playbook.ts:130, 225, 324; operator text at handoff-reasons.ts:340; the `bank_details` setting)? A change to one leaves the others stale.
2. playbook.ts:449 and 522 say the rules are "shared by Will and Mia", but the prompt is hard-wired to Working Holiday Tax (113, 201-217, 490) and `buildSystemPrompt` has one caller. Does the Student Visa Tax assistant use a different builder? If it ever uses this one, WHT prices, links and email go to SVT customers.
3. The prompt forbids the model from saying it is an AI and has it write as "a team member" (113, 636). That is a legal and policy decision for the owner, noted here because it is enforced only in this file.
4. `applyFaultDismissals` (system-report.ts:381-390) hides a fault while the stored dismissal time is later than the fault; does the dismiss action reject a client-supplied or future timestamp and restrict the key (374)? Route not read.
5. Does any route pass request-supplied fields straight to `updateCustomer` (store-supabase.ts:517-530)?
6. After a failed `setMessageStatus`, does the stranded-outbound sweep resend the message or only raise a task?
7. `applyEditByProviderId` (865-880) overwrites the stored body of an edited message and keeps no copy of the original; is the original needed as a record (for example an edited "I paid")?
