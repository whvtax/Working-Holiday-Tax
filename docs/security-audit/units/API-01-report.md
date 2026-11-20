# API-01 report

## Handler table (extra focus for this unit)

| METHOD | ROUTE | Authentication | Authorisation | Input validation | Database effects | External side effects | Rate limits | Error behaviour |
|---|---|---|---|---|---|---|---|---|
| POST | /api/crm/verify-otp | None (pre-auth). Needs httpOnly `crm_preauth` cookie (48 hex) plus the 8 digit code | Single owner role; success mints `crm_session` (8 h, httpOnly, SameSite=Strict, Secure in production) | `code` must be a string of at most 32 chars; cookie regex; body parsed with `req.json()` (no explicit size cap) | Redis: read OTP hash, INCR attempt counter, DEL both on success. Store: login events, `crm_session_started` audit row | Security email on a new device (`checkNewDevice`) | 5 guesses per OTP, then OTP deleted (429). No per-IP limit in this route. Proxy cross-site guard applies (/api/crm/) | Redis missing = 500 (fails closed). Wrong code = 401. Any throw = 500 `server_error`, logged with `console.error` |
| POST | /api/tax-form | None (public). Optional signed form token `k` | None. Brand from Host header; SVT closed unless `SVT_FORMS_ENABLED` | `sanitise*` on every field, `validateIntake` (email, phone, TFN, DOB, year, marital, status), AU mobile check, file URLs limited to this brand's upload folder, arrays capped (50 URLs, 25 invoices, 5 notes, 10 failures). No explicit body cap | Reads will_settings, will_customers, crm_clients, crm_tasks. Inserts a crm_tasks row (TFN, bank details, address). Sets "token used" setting (WHT only). Via notify: customer form state, jobs, tasks, audit | WhatsApp confirmation / Medicare message to the matched customer (through form-link.ts) | 5 per 15 min per IP+person hash; 30 per 15 min per IP. Applied AFTER form parse and token lookups. Only `Sec-Fetch-Site: cross-site` refused | Validation = 400 with field list; token used = 409; limit = 429; any throw = 500 with a 6 char ref, audit row `public_form_failed`. Notify failures swallowed after the task is saved |
| POST | /api/tax-form/upload | None (public) | None. Brand prefix from Host | Content-Type allow-list, declared and real size at most 10 MB, magic bytes for the declared type, offset 0 script/exe signatures, filename reduced to `[A-Za-z0-9._-]` and 80 chars, `kind` mapped to 3 folders | None in Postgres. Writes one object to the private uploads bucket | Supabase Storage upload | 100 requests per 15 min per IP; 120 MB per 15 min per IP (degrades to in-memory when Redis is down) | 400 for type/size/content; 429; 500 `Upload failed` (details only in server log). `assertUploadsBucketPrivate` fails closed |
| GET | /api/will/export | `sessionValid()` (crm_session) | Any valid session; no brand scoping | `mode`, `format`, `hours` (clamped 0 to 2160), `all`, `since` (Date.parse), `commit` | Reads ALL customers, ALL messages, tasks, audit. Writes: data-read record, `bulk_export_downloaded` audit, and with `mode=attention&commit=1` the cursor setting (a write on GET) | None | None | 401 without session. No try/catch: a store error becomes Next's raw 500. Task and audit reads fail soft |
| GET | /api/will/health | `sessionValid()` | Any valid session | None (no input) | Reads counts and settings; clears the in-memory persist-error flag (state change on GET) | Meta Graph API calls (`verifyChannel`, `verifyTemplates`, 5 min cache per the comment) | None | 401 without session. Each check is isolated in try/catch and reported as a red check |
| GET | /api/will/knowledge | `sessionValid()` | Any valid session | None | Reads all knowledge rows | None | None | 401; store error = raw 500 |
| POST | /api/will/knowledge | `sessionValid()`; cross-site guard only through the proxy (not repeated in the route) | Any valid session | `readJson` 64 KB cap. Policy guard on `add`, `edit` (answer only), `approve`. NOT on `import` / `import_starter`. Answer capped at 4000 only on add/edit | Insert / update / status change / delete of knowledge rows. No audit row for any change | None directly (entries feed the model prompt later) | None | 400 unknown action, 413, 422 on guard violation; store error = raw 500 |
| GET | /api/will/webhook | Meta verify token, constant-time compare | n/a | `hub.mode` must be `subscribe` | None | Echoes `hub.challenge` as text/plain | None | 403 otherwise |
| POST | /api/will/webhook | HMAC SHA-256 of the raw body with the Meta app secret (`x-hub-signature-256`), constant-time | Phone number id must be one of ours (when ours is configured); brand derived from it | 256 KB cap (declared and measured), JSON parse, sender must be 6 to 20 digits, per-message try/catch | Many: audit rows, idempotency claims, customers, messages, tasks, jobs, state, settings; delivery status flips; echo mirroring; draft discards | Anthropic calls (engine, vision check, `suggestReply`), WhatsApp replies, Meta media download | Text: 40 per sender and 400 global per 15 min. Media/notes: 40 per sender, but only after the payment-proof path. None before signature check | 413, 401 (bad signature, throttled audit), 200 on bad JSON, 500 `Retry` when a message failed inside its 3-attempt budget, else 200 |
| POST | /api/will/actions | `sessionValid()` | Any valid session; 33 actions, single-tenant, no per-brand or per-role check | `readJson` 64 KB; cross-site guard in the route and in the proxy; per-action checks (ids, enums, amounts, URL protocol, 5000 char templates) | Messages, tasks, customers (including hard delete), state, jobs, templates, settings (kill switch, ai_mode, decision mode), audit with who/IP/device | WhatsApp sends (text and template), Anthropic (`suggestReply`), Google review sync, security alert email | None | 401, 403 bad origin, 4xx per action, 502 when Meta rejects, wrapper turns any throw into JSON 500 with the first 300 chars of the error |

## Coverage
| file | lines | ranges read | status |
|---|---|---|---|
| src/app/api/crm/verify-otp/route.ts | 105 | 1-105 | REVIEWED |
| src/app/api/tax-form/route.ts | 351 | 1-351 | REVIEWED |
| src/app/api/tax-form/upload/route.ts | 205 | 1-205 | REVIEWED |
| src/app/api/will/actions/route.ts | 1609 | 1-330, 330-700, 700-1030, 1030-1330, 1330-1609 | REVIEWED |
| src/app/api/will/export/route.ts | 258 | 1-258 | REVIEWED |
| src/app/api/will/health/route.ts | 255 | 1-255 | REVIEWED |
| src/app/api/will/knowledge/route.ts | 180 | 1-180 | REVIEWED |
| src/app/api/will/webhook/route.ts | 1037 | 1-420, 420-856, 855-1037 | REVIEWED |

Files opened outside the unit to judge findings (partial reads only, not reviewed): src/lib/will/auth.ts, src/lib/request-guard.ts, src/lib/public-form-guard.ts, src/lib/get-ip.ts, src/lib/will/http.ts, src/lib/rate-limit.ts, src/lib/will/brand-context.ts, src/proxy.ts, src/lib/sanitise.ts, src/lib/validate.ts (lines 5-12), src/lib/intake-validate.ts (84-92), src/lib/db.ts (141-198), src/lib/supabase.ts (130-141), src/lib/will/form-token.ts (115-170), src/lib/will/form-link.ts (369-429), src/lib/will/channel.ts (255-300, 325-584), src/lib/will/store-supabase.ts (445-480, 843-870, 1024-1050, 1457-1475), src/lib/will/service.ts (2868-2960), src/lib/will/ai-budget.ts (41-72), src/lib/will/policy-guard.ts (grep of `isApprovedTemplate` and `currentBrand` only).

## Findings

### API-01-F01: Rate-limited inbound WhatsApp messages are dropped for good, so a small flood silences every customer
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-770 / CWE-400
- Files and lines: src/app/api/will/webhook/route.ts:39-40, 785-786, 808-813
- Evidence: the idempotency claim is taken first (785). When the per-sender (40) or the global (400 per 15 min) limit is exceeded the code writes one audit row and `continue`s with the claim kept. The message body is never stored in the thread, no task is raised, and Meta's redelivery is skipped as a duplicate.
- Root cause: the limiter protects the paid engine by discarding the message instead of storing it and skipping only the model call.
- Attack prerequisites: about ten WhatsApp numbers sending 40 messages each inside 15 minutes (or one real busy quarter of an hour). No credentials.
- Impact: for the rest of the window every other customer's text (including "I paid", opt-outs and complaints) is lost with no trace in the chat and no card for the owner. Opt-out requests lost this way are a compliance problem as well.
- Recommended fix: on a rate-limit hit still store the inbound message (`handleInboundNote` style) and raise or fold one task; only skip the engine. Alert once when the global limit trips.
- Regression test: send 401 distinct text messages through the handler with a stub limiter; assert message 401 exists as an IN row and a task exists.
- Limits of this verification: `handleIncoming` was not read; I did not confirm whether opt-out detection happens only inside it (it appears to).

### API-01-F02: Owner sends (manual_reply, send_template, send_estimate, send_signature, send_lodged, send_followup fallback text) bypass the Policy Guard
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-693
- Files and lines: src/app/api/will/actions/route.ts:150-175 (`humanSend`), 856-899 (manual_reply), 901-933, 1295-1387, 1389-1444, 1446-1529; contrast 817-833 (send_task_reply, guarded on 18 Nov); src/lib/will/channel.ts:434-584 (`deliverOut` runs no guard for author HUMAN)
- Evidence: `humanSend` checks opt-out, kill switch, 24 h window, leftover placeholders, a keyword list for secrets, and length. It never calls `policyGuard`. `manual_reply` sends arbitrary typed text through it. `send_task_reply` was given the guard, with the comment that the guard "checks this text too"; the sibling action with the same free-text input was not. `send_estimate` also sends any http(s) `invoiceLink` (1318-1321) with no host allow-list, although the guard has a typed-URL rule.
- Root cause: the guard is applied per action instead of at the one transmission point.
- Attack prerequisites: a valid CRM session (owner, or a stolen session).
- Impact: breaks the rule "nothing sent to a customer without the policy guard": wrong prices, guarantee wording for non-TFN-only returns, refund promises or an arbitrary link can go out from the business number. With a stolen session this is a phishing channel to every customer inside the window.
- Recommended fix: run `policyGuard` (content rules) inside `humanSend` or `deliverOut` for every author; restrict `invoiceLink` to the invoicing provider's hosts and https.
- Regression test: POST `manual_reply` with a forbidden amount and with a foreign URL; expect 422 and no OUT row.
- Limits of this verification: whether the owner intends manual text to be exempt is a product decision; the brief states no exemption.

### API-01-F03: Public tax form merges an anonymous submission into an existing client by email or phone alone; `*` in the email acts as a wildcard
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-639 / CWE-943
- Files and lines: src/app/api/tax-form/route.ts:106-108, 140-148, 160; src/lib/db.ts:141-198 (escape at 145, `ilike` at 172-182); src/lib/validate.ts:8-9
- Evidence: `findExistingClient(email, whatsapp, brand)` is called with unauthenticated values and its result becomes the new task's `clientId` plus a "Returning client" note. The helper escapes `\ % _` but not `*`; PostgREST documents `*` as an alias of `%` in `like/ilike`, and the email validator only forbids whitespace and `@`, so an address shaped like `*@*.com*` passes validation and is sent as the pattern.
- Root cause: identity of a returning client is inferred from typed contact details; wildcard alias not escaped.
- Attack prerequisites: none (public endpoint, 5 per 15 min). Knowing a victim's email or phone works even without the wildcard.
- Impact: a forged task carrying the attacker's bank details and TFN is filed under a real client's id. Downstream "Done"/archive steps (not in this unit) may copy task data into the permanent client record; that would be a refund-redirect path.
- Recommended fix: escape `*` (and reject it in emails); only attach to an existing client when a valid form token names that customer, otherwise create a new client id and let staff merge.
- Regression test: submit with an email containing `*`; assert a fresh `CLT-` id. Submit a victim's exact email without a token; assert no merge.
- Limits of this verification: PostgREST wildcard behaviour is from its documentation, not executed here. The archive/merge code was not read.

### API-01-F04: Without an enforced token the form marks another person's questionnaire complete and messages them; the SVT path never uses or closes the token
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the exposure depends on environment values I cannot see)
- CWE: CWE-306 / CWE-294
- Files and lines: src/app/api/tax-form/route.ts:44-63, 250-276, 279-282, 306-312; src/lib/will/form-link.ts:369-429
- Evidence: (a) WHT: with no valid token and `FORM_TOKEN_ENFORCE` not `true`, `notifyFormReceived(whatsapp, ...)` matches the chat by the typed number. (b) SVT: both branches `return` at 267 and 275 before the "mark used" write at 279-282, and SVT always calls the phone-match `notifyFormReceived`, ignoring `FORM_TOKEN_ENFORCE`. (c) The "used" check (55-56) and the later write are not atomic, and a store read error is treated as "not used" (`.catch(() => null)`).
- Root cause: token enforcement is optional and was wired for one brand only.
- Attack prerequisites: the victim's WhatsApp number (WHT), or any SVT form link once (replayable until expiry).
- Impact: reminders stop for a customer who has not submitted, a "we received your questionnaire" or Medicare exemption message is sent from the business number, and staff work from a forged form. For SVT a single-use link is multi-use.
- Recommended fix: set and require `FORM_TOKEN_ENFORCE`; move the "mark used" write ahead of both SVT returns and use `notifyFormReceivedForCustomer` for SVT; claim the nonce atomically (insert with unique key) before `createTask` and release it on failure.
- Regression test: SVT submit twice with one token, expect 409 on the second; WHT submit with a typed number and no token under enforcement, expect no state change on the customer.
- Limits of this verification: env values unknown; `applyFormReceived` not read in full.

### API-01-F05: Knowledge `import` puts unreviewed text live in the model's library with no guard, no size cap and no audit row
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-693 / CWE-778
- Files and lines: src/app/api/will/knowledge/route.ts:109-141 (status at 116, weight at 133), 153-165 (edit: question and intent unchecked and uncapped), 42-180 (no `store.audit` call anywhere); guard present only at 142-150, 157-159, 168-169
- Evidence: `action:'import'` with `status:'active'` inserts every entry as active without `knowledgeViolations`, without the 4000 char cap, and with caller-chosen `weight`, `tags` and `lang`. The file's own comments say add/edit/approve were given the guard because the pack is quoted to customers and feeds the prompt.
- Root cause: the guard was added per branch and the bulk branch was missed.
- Attack prerequisites: a valid CRM session.
- Impact: prompt-injection or forbidden wording (prices, guarantee, refund promises) becomes active retrieval material with a high weight; tags decide brand use, so a WHT answer can be marked for SVT. No trace in the decision log.
- Recommended fix: run `knowledgeViolations` and the length cap on every imported entry, force `draft`, clamp weight, whitelist tags, and audit every knowledge mutation.
- Regression test: import an entry with a forbidden amount and `status:'active'`; expect it rejected or stored as draft, and an audit row.
- Limits of this verification: outbound replies are still guarded at send time (not re-read here), which limits but does not remove the impact.

### API-01-F06: JSON export returns full customer rows and unredacted bodies; no `no-store` on the bulk export
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359 / CWE-525
- Files and lines: src/app/api/will/export/route.ts:20-24 (redact), 157-164 (JSON), 199 (attachment filename), 207 (`meta.review`), 252-257 (headers); attention mode sets `no-store` at 71
- Evidence: `format=json` spreads `{customer, messages}` as stored (name, WhatsApp id, message text, task context, audit detail) with no call to `redact`. The text export redacts bodies but prints the attachment filename and the reviewer note raw. Neither response sets `cache-control: no-store`.
- Root cause: the 15 Nov "no phone numbers, emails or long digit runs" rule was applied to one format.
- Attack prerequisites: a valid session (or access to the downloaded file / a shared cache).
- Impact: a file meant for analysis carries phone numbers and whatever customers typed (TFN, bank details).
- Recommended fix: apply the same redaction and field allow-list to JSON, redact filename and notes, add `no-store`.
- Regression test: seed a message containing a 9 digit number and an email; assert neither appears in `format=json` nor in the text file.
- Limits of this verification: `buildAttentionReport` (attention mode) was not read.

### API-01-F07: Delivery-status handling is not idempotent; a repeated `failed` status queues another resend or task
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-837
- Files and lines: src/app/api/will/webhook/route.ts:380-508 (jobs at 413-418, 435-439; tasks at 421, 444, 472, 491), 742-743, 1035; src/lib/will/store-supabase.ts:843-855
- Evidence: statuses are applied before and outside the idempotency claim. `markDeliveryFailedByProviderId` returns the message again even when it is already FAILED, so each redelivery adds a `RESEND_MESSAGE` job or an URGENT task. The handler itself causes redelivery of the whole payload by answering 500 (1035).
- Root cause: no dedupe key for a status event.
- Attack prerequisites: none for the accidental case (Meta redelivery); a replay needs a captured signed body.
- Impact: duplicate cards, and possibly the same message resent more than once.
- Recommended fix: skip when the row is already FAILED with the same error, or claim `status:<id>:<status>` like inbound ids.
- Regression test: post the same failed-status payload twice; expect one job.
- Limits of this verification: the scheduler's RESEND_MESSAGE branch was not read; it may dedupe with `wasAlreadySentVerbatim`.

### API-01-F08: Media path runs the payment-proof check before the sender rate limit and the blocked-contact rule; a document can be "trusted" as payment
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-770 / CWE-840
- Files and lines: src/app/api/will/webhook/route.ts:903-904 (call), 917-938 (guards placed after it by design); src/lib/will/service.ts:2870-2918
- Evidence: every image or document from an unpaid customer in a payment-proof state reaches `handlePaymentProofMedia`, which reserves a slot of the shared daily AI budget and downloads the media, with no per-sender limit. In service.ts a document that cannot be read (budget spent, download failed, check undecided) is "taken on trust" and the customer is moved on.
- Root cause: deliberate owner rule ("we trust the customer") combined with a limiter placed after the paid call.
- Attack prerequisites: a WhatsApp number that has been quoted a price.
- Impact: one sender can spend the day's AI budget with images; a PDF sent at the right stage can reach Paid and receive the questionnaire link without payment (a verification task is said to be raised).
- Recommended fix: apply the per-sender limiter before the vision call; keep "trusted" documents in a pending-verification state rather than Paid.
- Regression test: 41 images from one sender in a window; assert at most 40 budget reservations.
- Limits of this verification: only lines 2868-2960 of service.ts were read; the preceding gates and the task raised afterwards were seen only through a grep.

### API-01-F09: `set_kill_switch` turns the kill switch OFF for any request whose `value` is not literally `true`
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636
- Files and lines: src/app/api/will/actions/route.ts:1141-1146
- Evidence: `setSetting('kill_switch', b.value === true)`; a missing, string or numeric `value` stores `false`. Other switches in the file reject unknown values (1126, 1135).
- Root cause: no type check on `value`.
- Attack prerequisites: valid session; or a client bug.
- Impact: the emergency stop is released by a malformed call.
- Recommended fix: `if (typeof b.value !== 'boolean') return bad(...)`.
- Regression test: POST without `value`; expect 400 and the setting unchanged.
- Limits of this verification: none.

### API-01-F10: Owner actions never enter the customer's brand context, so the guard and helpers run as WHT for SVT customers
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-668
- Files and lines: src/app/api/will/actions/route.ts:443-470 (no `withBrand`), 503-509, 714-719, 821-827 (guard calls), 268 and 343-345 (`FORM_LINK_RE` is the WHT link only), 521 (`suggestReply`); src/lib/will/brand-context.ts:25-27; src/lib/will/policy-guard.ts:979, 1337
- Evidence: `currentBrand()` defaults to `wht`. The guard's URL rules read it, so for an SVT draft a WHT link passes and an SVT link counts as foreign. `sendPaymentConfirmationIfMissing` looks for the WHT form link in sent messages, which an SVT thread (rebranded on send) never contains. Transmission itself uses `customer.brand` (564-570, channel.ts:474).
- Root cause: brand is ambient state set only by the webhook and scheduler.
- Attack prerequisites: none; ordinary owner use on an SVT chat.
- Impact: wrong-brand guard verdicts and helper output for SVT customers; a duplicate confirmation is probably stopped by the verbatim check in `deliverOut`.
- Recommended fix: wrap each customer-scoped action in `withBrand(customer.brand, ...)`.
- Regression test: approve an SVT draft containing the SVT form link; expect no TYPED_URL block.
- Limits of this verification: policy-guard.ts was only grepped.

### API-01-F11: Dynamic regex built from Library text is run against owner input (`libraryTemplateFor`)
- Severity: LOW
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-1333
- Files and lines: src/app/api/will/actions/route.ts:239-249, used at 816 and 879; 825 (`isApprovedTemplate: !!library`)
- Evidence: each `{{n}}` becomes `([\s\S]+?)` in an anchored pattern matched against a draft of up to 64 KB; several lazy groups can backtrack polynomially. A match also makes the guard treat the draft as an approved template although the captured parameter text is free.
- Root cause: template matching by regex.
- Attack prerequisites: valid session.
- Impact: slow request; relaxed guard rules for text placed in a template slot.
- Recommended fix: cap draft length before matching, and guard the captured parameters as free text.
- Regression test: a 60 KB near-miss draft returns within a time bound.
- Limits of this verification: not executed.

### API-01-F12: Smaller points grouped
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines and evidence:
  - src/app/api/tax-form/route.ts:131-138: the "receipts required" rule subtracts only the URLs named in `bankStatementUrl` / `selfiePassportUrl`; omitting those fields lets identity files count as receipts. Identity documents are not required server-side.
  - src/app/api/tax-form/route.ts:23-87: rate limits run after `formData()` and two store reads.
  - src/app/api/will/webhook/route.ts:792-796, 811: blocked or rate-limited messages still cost one claim row and one audit row each, unthrottled.
  - src/app/api/will/webhook/route.ts:689-691: with no Content-Length the body is buffered before the 256 KB check (platform limit applies).
  - src/app/api/will/export/route.ts:68-70 and src/app/api/will/health/route.ts:41: state changes on GET (cookie is SameSite=Strict).
  - src/app/api/will/actions/route.ts:448-455: full exception text stored in audit and 300 chars returned to the (authenticated) client.
  - src/app/api/will/actions/route.ts:553-565: if a send throws after the draft is claimed, the draft stays QUEUED.
  - src/lib/will/http.ts:11: `raw.length` counts UTF-16 units, not bytes.
- Root cause / Attack prerequisites / Impact: minor robustness and abuse-cost issues.
- Recommended fix: fix opportunistically.
- Regression test: n/a
- Limits of this verification: static reading only.

## Checked and found sound
- OTP: bound to httpOnly pre-auth cookie, lookup before any write, 5 attempts then OTP deleted, constant-time hash compare, one-time use, Redis absent fails closed (verify-otp/route.ts:26-80).
- Session cookie flags httpOnly, SameSite=Strict, Secure in production (verify-otp/route.ts:90-96).
- Webhook signature: HMAC over the raw body before parsing, constant-time, missing secret rejects (webhook/route.ts:154-165, 693-712); verify token constant-time (136-152).
- Webhook size cap, sender format check, per-message error isolation, masked numbers in audit rows (webhook/route.ts:689-692, 559, 281-284).
- Inbound idempotency by Meta id with bounded retries and dead-letter task (webhook/route.ts:785, 824-872, 84-122).
- Phone-number-id filter and brand from the receiving number (webhook/route.ts:534-535, 981-983).
- Session check on every Will route in the unit (export:41, health:15, knowledge:32 and 43, actions:460); cross-site guard in the proxy for /api/will and /api/crm (src/proxy.ts:61-65, 126) and repeated in actions:465.
- Approve path: guard re-run, stale-state check, atomic claim before send (actions/route.ts:503-554).
- Template save-time guard and 5000 char cap (actions/route.ts:1531-1544, 1576-1589); enum checks for state, mode, outcome (1126, 1135, 1192, 1287).
- Upload: allow-list, 10 MB, magic bytes, server-generated path with UUID part, private-bucket assertion, byte budget (upload/route.ts:120-182).
- File URL allow-list per brand with traversal/query rejection (tax-form/route.ts:116-124; supabase.ts:133-141).
- Rate-limit keys hash phone/email identities; limiter degrades to memory, not open (rate-limit.ts:100-134).
- No secrets or hard-coded credentials seen in the eight files.

## Open questions
- Are `FORM_TOKEN_SECRET` and `FORM_TOKEN_ENFORCE` set in production? F04 severity depends on it.
- Does the CRM "Done"/archive code copy task fields into `crm_clients` by `client_id`? That decides the real impact of F03.
- Does the scheduler's RESEND_MESSAGE job dedupe (F07)?
- upload/route.ts exports `containsDangerous`, `isHeifBrand`, `validateMagicBytes` and webhook/route.ts exports `extractEchoes`, while webhook/route.ts:290-292 states that Next fails the build on extra route exports. Not run; could be a build problem or a wrong comment.
- `claimInbound` returns true on an unexpected DB error (store-supabase.ts:1457-1466); under a DB fault duplicates may be processed. Outside this unit.
- `applyEditByProviderId` does not appear to check that the editing sender owns the target message (inbound-edit.ts, grep only).
- Does `checkNewDevice` catch its own email failure? If it throws, the OTP is already consumed and the login returns 500 (verify-otp/route.ts:80-84).
- `form_received_unmatched` audit row appears to store the full typed number (form-link.ts:408), outside this unit.
