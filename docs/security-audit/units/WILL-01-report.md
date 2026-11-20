# WILL-01 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/channel.ts | 1030 | 1-500, 501-1030 | REVIEWED |
| src/lib/will/service.ts | 3168 | 1-500, 501-1000, 1001-1500, 1501-2000, 2001-2500, 2501-2840, 2841-3168 | REVIEWED |

Files opened outside the unit, only to judge a finding (partial reads, by grep or short range):
`src/lib/will/mode.ts` (1-40), `src/lib/will/policy-guard.ts` (1270-1296 and a grep of the guard context),
`src/lib/will/engine.ts` (grep of policyGuard call sites), `src/lib/will/scheduler.ts` (520-560, 650-668, 1672-1696, 2318-2345),
`src/lib/will/store-supabase.ts` (getSetting 1041-1053, cancelJobsFor 1342-1349, getCustomerByWaId grep),
`src/lib/will/store.ts` (status type grep), `src/lib/will/brand-context.ts` (8-27), `src/lib/will/suggest.ts` (172-185),
`src/app/api/will/webhook/route.ts` (805-830 and a grep for callers). Nothing was run.

## Findings

### WILL-01-F01: Per-customer serialisation is in-process only and one inbound path skips it
- Severity: MEDIUM
- Confidence: high (static), medium (real-world frequency)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-362, CWE-367
- Files and lines: src/lib/will/service.ts:167-192 (mutex is a module `Map`), 211-219, 2272-2303 (handleInboundNote is not queued), 2563 (calls `handleIncomingInner` directly, outside the queue), 248-252 (customer create race not caught, compare 2306-2317), 123-158 (find-open-task then add-task), 831-834, 948-950, 1989-1992, 2260-2263, 2513-2519, 2791-2796, 1660-1664 (read-then-write "once" guards in `will_settings`)
- Evidence: `chains` is a `Map` in module memory; the comment at 167-169 says "a shared store would use a row lock". On Vercel two webhook deliveries, or a webhook and the cron tick, run in different instances and share nothing. `handleInboundNote` (media, voice, reactions) never enters the queue and at 2563 runs the full reply pipeline (`handleIncomingInner`, `alreadyStored`) concurrently with a queued text for the same customer, even inside one instance. The "written before the send, so two events cannot both pass" guards are a `getSetting` followed by a `setSetting` (an upsert whose error is not checked, store-supabase.ts:1051-1053), which is not atomic. `createCustomer` in the text path has no unique-violation recovery, the note path has it.
- Root cause: mutual exclusion is implemented in process memory and with non-atomic settings reads, not with a database lock or a conditional write. Only `setState(...,'PAID')` (3033-3037) uses a compare-and-set result.
- Attack prerequisites: none beyond sending two messages close together (a photo plus a text, or a burst that Meta delivers in parallel). Any customer can do it by accident.
- Impact: duplicate holding lines, duplicate document acknowledgements, duplicate "send it as text" asks, two open tasks for one customer, two concurrent model calls and two drafts in Approval mode, a thrown unique-constraint error on first contact (the webhook then returns an error and Meta redelivers). The ABN intake flag at 948-956 can be started twice.
- Recommended fix: take a per-customer lock in the database (advisory lock or a `locked_until` conditional update) inside `queueForCustomer`, route `handleInboundNote` through the same queue, and replace each timestamp guard with one conditional update that returns whether this caller won. Catch the unique violation at 249 the same way 2306-2317 does.
- Regression test: two concurrent calls (one `handleIncoming`, one `handleInboundNote` with an image) for the same new number against a store with real concurrency; assert one customer row, one task, one acknowledgement.
- Limits of this verification: static only. I did not confirm how many instances Vercel runs or whether the webhook processes the messages of one payload sequentially.

### WILL-01-F02: Opt-out, AI pause and kill switch are checked on stale snapshots; a reply can leave after STOP
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-367, CWE-362
- Files and lines: src/lib/will/channel.ts:496-501 (`customer.optedOut` of the row passed in, no fresh read, no `aiPaused` and no kill-switch check); src/lib/will/service.ts:301-312 (opt-out handling), 509 (kill switch read once), 1249-1251 (guard built from the row loaded before the model call), 2005-2011 and 2160 (deferred reply uses the row the scheduler loaded); src/lib/will/store-supabase.ts:1342-1349 (`cancelJobsFor` cancels `SCHEDULED` rows only)
- Evidence: on opt-out the code sets `optedOut`, cancels jobs and discards drafts. `cancelJobsFor` does not touch a job already `CLAIMED`. A deferred reply that is already running holds a `CustomerRow` read before the STOP arrived; `runDeferredAutoReply` tests that stale row, `decideAndAct` passes the same stale flags to the guard, and `deliverOut` tests the same stale object. The model call in between takes many seconds. The same holds for an owner who pauses the AI for one chat or turns the kill switch on while a decision is in flight (kill switch is read at 509 or 2158, before the model call, and not again before the send at 1644).
- Root cause: the "last-resort" gate in `deliverOut` trusts the caller's copy of the customer and checks only one of the three stop conditions.
- Attack prerequisites: a STOP (or an owner pause) arriving while a reply for that customer is being generated. No privilege needed.
- Impact: a marketing or service message sent after an explicit opt-out (Spam Act and WhatsApp policy exposure), or after the owner believed Will was stopped.
- Recommended fix: in `deliverOut`, immediately before the transmit, re-read the customer by id and the `kill_switch` setting, and refuse AI-authored sends when `optedOut`, `aiPaused`, `isLegacy` or the kill switch is set (with an explicit exemption flag for the one documented holding line, see F12). Make opt-out also mark `CLAIMED` jobs so the runner can see it.
- Regression test: start a deferred reply with a store stub that flips `optedOut` to true during the engine call; assert no `sendWhatsAppText` call and a `send_blocked_opted_out` audit row.
- Limits of this verification: I did not read the scheduler's claim loop in full, so I cannot say how old the row passed as `known` (scheduler.ts:551-553) can be.

### WILL-01-F03: The 24-hour window is not enforced where free text is transmitted, and the guard is told "now"
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-841, CWE-693
- Files and lines: src/lib/will/service.ts:1273 and 1102 (`lastCustomerMsgAt: new Date()` hard-coded), 847-852 (timer armed even while the kill switch is on), 2005-2160 (no age check on the deferred timer), 1658-1672 (re-arm counter that resets each hour); src/lib/will/channel.ts:270-284 and 577-581 (free text sent with no window check), 582-605 (the window is checked only for the template-missing fallback); src/lib/will/scheduler.ts:658-667 (tick returns early on kill switch, jobs stay scheduled)
- Evidence: `decideAndAct` always tells the policy guard the customer wrote this instant. That is true on the immediate path, but the same function serves `runDeferredAutoReply`, which has no check of how long ago the burst was. Timers armed while the kill switch is on (or while the scheduler is down) stay `SCHEDULED` and fire when it is released. channel.ts:584-590 itself records that Meta accepts out-of-window free text with HTTP 200 and rejects it later by webhook, so the row is stored `SENT` and (service.ts:1676-1681) the stage and income are advanced.
- Root cause: the window rule lives in a guard input supplied by the caller instead of being computed from the stored `lastCustomerMsgAt` at the single transmission point.
- Attack prerequisites: none; needs a pause or outage longer than 24 hours (the code comments describe a 65-hour pause in September), or a chain of retryable failures.
- Impact: replies that never arrive are recorded as sent, stages move (for example to PRICE_SENT or PAID then FORM_PENDING) on a message the customer never received, and Meta quality signals degrade.
- Recommended fix: compute the window inside `deliverOut` from a fresh `lastCustomerMsgAt` for every non-template send and refuse outside it (same formula as 594-597); in `decideAndAct` pass the stored timestamp when `opts.sendNow` comes from a timer; drop or convert to a task any debounce timer older than about 23 hours.
- Regression test: arm a timer, set the stored `lastCustomerMsgAt` to 30 hours ago, run `runDeferredAutoReply`; assert no free-text send and a task.
- Limits of this verification: I did not confirm whether another part of the scheduler cancels old AUTO_REPLY timers when the kill switch is released.

### WILL-01-F04: A customer reaches PAID on an unverified claim, and a "verified" screenshot raises no human check
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-840, CWE-345
- Files and lines: src/lib/will/service.ts:1468-1522 and 2690-2707 (typed "I paid" forces `newState = 'PAID'`), 1676-1679 (state applied, form link flow starts), 2828-2836, 2883-2920 (words, or an unreadable document, are enough), 2925-2936, 3033-3039 (PAID set), 3132-3142 (task only when not verified)
- Evidence: a text that `claimsPayment` or `customerPastedPayment` accepts moves the customer to PAID and on to FORM_PENDING with only an audit row (`payment_claim_advanced_stage`); no task is opened on that path. On the media path an explicit caption overrides a picture that is not a payment (2899-2902 only clears the weak wording), and a document that cannot be read is trusted (2878-2882). When the vision model reads "our fee, our account, completed" off the image the payment is treated as verified and no task is raised at all (3132). An image is trivially edited.
- Root cause: payment confirmation is derived from customer-controlled input (words, an image interpreted by a model) and never from bank or Stripe data. This is a documented owner decision ("trust the customer"), but there is no compensating control on two of the three routes.
- Attack prerequisites: any lead in PRICE_SENT or PAYMENT_PENDING (for media also NEW_LEAD and QUALIFIED) who types "paid" or sends an edited receipt.
- Impact: the tax questionnaire link and the firm's work are obtained without payment; the paid flag also changes which automated rules apply (post-payment handling, no sales follow-ups).
- Recommended fix: keep the customer-facing flow but record PAID-on-trust separately from PAID-reconciled, and open one low-severity reconciliation task (or a daily list) for every trust-based PAID, including the "verified by picture" case, until a bank or Stripe match exists.
- Regression test: `decideAndAct` with a PRICE_SENT customer and "I've paid": assert a reconciliation task or flag exists after the state moves.
- Limits of this verification: I did not review `payment-claim.ts`, `payment-proof.ts` or the vision prompt, and do not know whether the team reconciles the bank account by another process.

### WILL-01-F05: Customer documents are sent to the model API even when Will is switched off for that chat
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359, CWE-285
- Files and lines: src/lib/will/service.ts:2442-2462 (`assessSuccessConfirmationImage`, gated only on the AI budget), 2542-2568 (`describeAttachment`, gated only on API key, mime type and budget), 2558-2560 (the description is stored as a message), 2870-2898 (`assessPaymentProofImage`; `optedOut` is checked at 2814, kill switch, `aiPaused` and `isLegacy` only after the model call at 3057-3058)
- Evidence: in `handleInboundNote` no check of `optedOut`, `aiPaused`, `isLegacy` or the kill switch precedes the download and the vision call. The gates at 2468, 2503-2516 and 3058 only stop the outgoing message. The model's description of the file (which can include what is printed on an identity document, payslip or bank statement) is then written to the thread as an inbound message authored `SYSTEM` and becomes part of later prompts.
- Root cause: the stop controls were implemented as "do not send", not "do not process".
- Attack prerequisites: none; happens for every image or PDF.
- Impact: tax file numbers, bank details and identity documents of customers who opted out, of legacy chats, and of chats the owner paused are transmitted to a third-party API and copied into the message table as text. The kill switch does not stop this data flow during an incident.
- Recommended fix: check kill switch, `optedOut`, `aiPaused` and `isLegacy` before any `fetchWaMedia` plus vision call; when blocked, go straight to the existing human task. Consider not persisting the description, or redacting number patterns in it.
- Regression test: `handleInboundNote` with an image for an opted-out customer and for kill switch on; assert `fetchWaMedia` and the vision functions are not called.
- Limits of this verification: I did not read `claude.ts`, so I do not know what the vision prompts ask for or whether they redact.

### WILL-01-F06: The "Is that you?" auto-answer ignores Approval mode
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-863
- Files and lines: src/lib/will/service.ts:683-701
- Evidence: the condition tests kill switch, `aiPaused`, `isLegacy`, `optedOut`, `paid` and the wording, but not `mode === 'FULL_AUTO'`. Every other instant answer in the function (597, 621, 706, 738, 804, 829) tests the mode. In SUPERVISED mode the line is sent with `deliverOut` and the function returns before a draft is created.
- Root cause: missing mode condition.
- Attack prerequisites: Approval mode, a paid customer, last outbound message from a person ending in the trigger phrase, customer answers yes within three days.
- Impact: an AI-authored message leaves without the owner's approval, against the rule stated in mode.ts. The text is fixed and harmless, and it is English only regardless of the customer's language.
- Recommended fix: add `mode === 'FULL_AUTO'`; in Approval mode store the line as `PENDING_APPROVAL`.
- Regression test: call `handleIncoming` in SUPERVISED mode with that thread; assert no transmit and one pending draft.
- Limits of this verification: none.

### WILL-01-F07: Many automatic sends never pass the policy guard, and guarded replies are edited after the guard ran
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-693
- Files and lines: direct `deliverOut` calls with no `policyGuard` in src/lib/will/service.ts:600, 647, 691, 714, 774, 837, 1164, 1995, 2226, 2264, 2470, 2523, 2800; post-guard edits at 1365, 1374, 1380, 1387, 1490, 1515-1517, 1620-1624, 1729; `secondCheck` guard context with `killSwitch: false` at 1100-1103; src/lib/will/channel.ts:434-727 (`deliverOut` does not call the guard)
- Evidence: `deliverOut` applies brand, link repair, scrub, opt-out and duplicate checks but not `policyGuard`. The callers listed send code constants, but also text read from the database: `paidHoldingBody` (1078-1086) and `paymentReceivedBody` (2759-2770) return Library rows edited in the CRM, and 2409 uses `suggestReply`, which can return a knowledge-library row verbatim (suggest.ts:180-183). After the engine's guard verdict the reply text is replaced or extended in the places listed, and at 1387 a URL from settings is spliced in.
- Root cause: the guard is a step inside the engine, not a property of the transmission point.
- Attack prerequisites: someone able to edit a Library row or the review link setting (CRM user), or a future code change in one of the listed branches.
- Impact: the brief's rule "nothing sent to a customer without the policy guard" is not true for these paths; a wrong price, refund promise or foreign URL in a Library row would go out unchecked.
- Recommended fix: run `policyGuard` (with `isApprovedTemplate` where appropriate) inside `deliverOut` for `author === 'AI'`, or at least on every body that originates from the database, and re-run it after each post-engine edit.
- Regression test: put a refund promise in the `handoff_holding` Library row, trigger the kill-switch holding line, assert the send is blocked and a task is raised.
- Limits of this verification: I did not review `registerLibraryBodies` in policy-guard.ts or the Library edit endpoint, which may validate rows on save.

### WILL-01-F08: The duplicate guard only sees rows already marked SENT
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-367
- Files and lines: src/lib/will/channel.ts:417-427, 514-519, 549-552, 240-247, 687; src/lib/will/service.ts:1575
- Evidence: `wasAlreadySentVerbatim` matches `status === 'SENT'` only. The outbox row is inserted as `QUEUED` (549) after the check (514) and becomes `SENT` only after Meta answers (up to 15 s). Two concurrent `deliverOut` calls with the same body both pass. A send that timed out is stored `FAILED` although channel.ts:243-246 says the message may have gone out; the raised task carries the same body as a one-click reply, and the guard does not apply to HUMAN sends.
- Root cause: check-then-insert without a uniqueness constraint; in-flight rows are excluded from the check.
- Attack prerequisites: concurrency (see F01) or a Meta timeout.
- Impact: the customer can receive the same automatic message twice.
- Recommended fix: include `QUEUED` and `SENDING` rows younger than a minute in the check, or insert the outbox row first with a unique key (customer, body hash, time bucket) and send only if the insert won. Mark timeouts with a distinct status and say so in the task.
- Regression test: two parallel `deliverOut` calls with the same AI body against a slow transmit stub; assert one transmit.
- Limits of this verification: static only.

### WILL-01-F09: Missing credentials are reported as a successful send
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636
- Files and lines: src/lib/will/channel.ts:77-90 (store error swallowed, falls back to env), 192 (`{ ok: true, skipped: true }`), 626-684 (row set `SENT`, chat marked read, stage logic runs); src/lib/will/service.ts:1676-1681 (state and income applied after `out.ok`)
- Evidence: when no token or phone id resolves, `postMessage` returns success. `deliverOut` does not look at `skipped`. `resolveWaCreds` treats a failed settings read the same as "no stored value", so a deployment whose credentials live only in the settings table loses them on a transient read error.
- Root cause: test mode and production share one code path and one return value.
- Attack prerequisites: none; a transient store error or a removed setting in production.
- Impact: messages recorded as sent that never left, stages advanced, no task and no alert.
- Recommended fix: return `ok: false` for `skipped` unless an explicit test-mode flag is set; distinguish "read failed" from "not set" in `resolveWaCreds`; record `skipped` on the message row.
- Regression test: store whose `getSetting` rejects once, env vars unset; assert `deliverOut` returns not ok and the row is not `SENT`.
- Limits of this verification: I do not know whether production also sets the env variables.

### WILL-01-F10: "Template missing" is detected with a pattern that matches unrelated errors
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-697
- Files and lines: src/lib/will/channel.ts:359, 371-385, 582
- Evidence: the test is `/does not exist|not exist|132001|template/i` on the error text. Any Meta error whose message contains the word "template" (paused template, parameter count mismatch, format error) is treated as "not created", which triggers a second attempt under another name, the English template, or a free-text send of the body.
- Root cause: string matching instead of the Meta error code.
- Attack prerequisites: none.
- Impact: a message Meta refused for a policy or format reason is re-sent through another route; inside the window as free text. Extra sends and wrong-language sends are possible.
- Recommended fix: carry the numeric Meta error code in `SendResult` and compare with 132001 only.
- Regression test: stub Meta to return a parameter-mismatch error that mentions "template"; assert no fallback send.
- Limits of this verification: I did not check the exact wording of Meta's other template errors.

### WILL-01-F11: Personal data in source comments and in audit rows
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-532, CWE-540
- Files and lines: source comments with a customer first name and a full or near-full phone number: src/lib/will/channel.ts:215; src/lib/will/service.ts:1063, 2830 (full numbers), and partial numbers with names at 617, 1264, 1465, 1566, 2049, 2054, 2067, 2118, 2182, 2376, 2392, 2486, 2974, 3079. Audit rows: service.ts:250 and 2308 (`{ waId }`, the full number, while the webhook masks it with `maskWa`), 345, 355, 781, 957 (customer text excerpts), 2896-2898 (payment details read from the receipt); channel.ts:497-499, 515-517 (message previews)
- Evidence: as listed; values are not repeated here.
- Root cause: incident notes written into code; audit payloads not minimised.
- Attack prerequisites: read access to the repository or to the audit table.
- Impact: customer identifiers exposed to anyone with repository access (contractors, AI tools, backups); message excerpts in the audit table can contain a tax file number a customer typed.
- Recommended fix: remove names and numbers from comments (keep a case id), mask `waId` in audit rows, and cap or redact previews.
- Regression test: a lint test that fails on a phone-number pattern in `src/`.
- Limits of this verification: I did not check who can read the audit table.

### WILL-01-F12: The kill switch is enforced by each caller, and one automatic message is still sent while it is on
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/will/service.ts:829-845 (holding line and template sent when `killSwitch` is true), 847-852 (timer armed anyway), 2799 (`getSetting('kill_switch').catch(() => false)`, fails open if the call throws); src/lib/will/channel.ts:434-727 (no kill-switch check)
- Evidence: documented decision of 11 Oct in the comment at 821-828. The line comes from a Library row (F07).
- Root cause: design.
- Attack prerequisites: n/a
- Impact: an operator who turns the switch on during an incident should know that one message per customer per 12 hours still leaves, and that attachments are still processed (F05).
- Recommended fix: state this in the incident checklist, or add a second "hard stop" setting checked in `deliverOut`.
- Regression test: n/a
- Limits of this verification: none.

### WILL-01-F13: WhatsApp access token stored in the settings table; bank identifiers hard-coded in a pattern
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: CWE-312
- Files and lines: src/lib/will/channel.ts:73-75, 93-99 (`saveWaCreds` writes `WA_TOKEN_KEY` through `setSetting`); src/lib/will/service.ts:711, 743 (the firm's BSB and account number inside a regular expression)
- Evidence: the token is written as a plain settings value next to ordinary configuration. The bank identifiers are the firm's own receiving account, sent to customers anyway; if the account changes, the "bank details already sent" detection stops working.
- Root cause: convenience.
- Attack prerequisites: read access to `will_settings` (service role, or any endpoint that lists settings).
- Impact: token disclosure would allow sending as the business number.
- Recommended fix: keep the token in a separate table or encrypted column that no listing endpoint reads; derive the bank pattern from the `bank_details` setting.
- Regression test: assert that the settings listing endpoint never returns the three `wa_*` keys.
- Limits of this verification: I did not review any endpoint that lists settings or the table's access policy.

## Checked and found sound

- Kill switch read fails safe (a failed read counts as ON): src/lib/will/store-supabase.ts:1041-1049, used at service.ts:509, 2158.
- Approval mode recognises only the literal `FULL_AUTO`: src/lib/will/mode.ts:35-41, used at service.ts:2157, 2222, 2259, 2469, 2512, 3006-3007.
- Brand isolation at the transmit point (leak check on the whole payload, SVT never falls back to the WHT number, SVT template twin): src/lib/will/channel.ts:185-191, 341-345, 474-478. Brand context uses AsyncLocalStorage, not a global: brand-context.ts:8-27.
- Send timeout, and timeouts classified as not retryable so they are not blindly re-sent: channel.ts:70, 202, 240-265.
- Media download: URL safety check, token sent only to Meta hosts, size ceiling before and after the read, media id URL-encoded: channel.ts:753-781. Template paging follows only Graph URLs: channel.ts:1021.
- Template parameters stripped of newlines and capped: channel.ts:309-312, 348.
- Opt-out guard at the transmit point with an audit row (subject to F02): channel.ts:496-501. Opt-out is not triggered by vision descriptions: service.ts:301.
- "Am I talking to a bot" never produces a draft, checked at ingest and again on the whole burst: service.ts:482-506, 2136-2144.
- Payment confirmation across instances uses the `setState` result as a compare-and-set: service.ts:3033-3037. Payment-proof path is serialised in process: 2745-2754.
- Supersession of concurrent timers leaves exactly one survivor by `run_at`, `created_at`, id: service.ts:1871-1913.
- Bookkeeping after a successful send cannot turn into a reported failure: channel.ts:626-684; reconcile after send is best effort: service.ts:884-894.
- Customer text quoted into the prompt is stripped of structure characters and capped: service.ts:962-963; caption sanitised at 2554.
- Model sees only the cleaned first name: service.ts:1239.
- Fee patterns in `inferIncome` match the brief ($220/$330 TFN, $385/$495 TFN+ABN): service.ts:1543-1549.

## Open questions

- channel.ts:654-657: the comment says the automatic win-back must not reopen a closed lead on send, but the condition at 657 has no such exception. I found no win-back marker in the meta passed to `deliverOut`; the win-back send path is outside this unit.
- service.ts:1658-1672: the re-arm counter resets each hour. If six attempts take longer than an hour (tick cadence plus the 1 to 5 minute delay), a persistent retryable error such as the unsettled-bill code could re-arm, and pay for a model call, indefinitely. Needs the real tick interval.
- service.ts:2272 onward: an opt-out word sent as a caption on a photo is not checked with `isOptOut`. Whether the webhook routes captions through `handleIncoming` first was not verified.
- There is no path in these two files that clears `optedOut`. Whether a customer who later asks to be contacted again can be opted back in was not verified.
- The scheduler's handling of QUEUED messages (scheduler.ts:1672-1696) re-checks `optedOut` and `aiPaused`; whether that customer row is fresh at send time belongs to the scheduler unit.
- `store.setSetting` ignores the upsert error (store-supabase.ts:1051-1053); all "once" guards in service.ts depend on it. Belongs to the store unit.
