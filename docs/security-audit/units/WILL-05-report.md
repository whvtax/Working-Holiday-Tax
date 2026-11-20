# WILL-05 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/approved-messages.ts | 438 | 1-438 | REVIEWED |
| src/lib/will/daily-digest.ts | 264 | 1-264 | REVIEWED |
| src/lib/will/followup-gate-30oct.ts | 299 | 1-299 | REVIEWED |
| src/lib/will/form-link.ts | 439 | 1-439 | REVIEWED |
| src/lib/will/instant-choice.ts | 270 | 1-270 | REVIEWED |
| src/lib/will/knowledge.ts | 315 | 1-315 | REVIEWED |
| src/lib/will/payment-claim.ts | 350 | 1-350 | REVIEWED |
| src/lib/will/payment-proof.ts | 346 | 1-346 | REVIEWED |
| src/lib/will/review-asks.ts | 269 | 1-269 | REVIEWED |
| src/lib/will/reviewer.ts | 225 | 1-225 | REVIEWED |
| src/lib/will/seed.ts | 502 | 1-502 | REVIEWED |
| src/lib/will/text-normalize.ts | 483 | 1-483 | REVIEWED |

Total: 12 of 12 files, 4,200 lines.

Files outside the unit opened in part, only to judge a finding (not reviewed as a whole):
- src/lib/will/service.ts: lines 1075-1135, 1278-1290, 2700-2708, 2762-2790, 2895-3050
- src/app/api/tax-form/route.ts: lines 245-315
- src/app/api/crm/tasks/route.ts: lines 60-90
- src/app/api/will/seed/route.ts: lines 1-70
- src/lib/will/store.ts: lines 570-578; src/lib/will/store-file.ts: lines 50-66
- src/lib/will/digest.ts: lines 8-33; src/lib/will/tasks.ts: lines 114-128; src/lib/will/claude.ts: lines 595-625
- src/lib/will/approved-es.ts: lines 8-17 and 29-51 (grep output)
- grep-only hits in engine.ts, scheduler.ts, will-decides.ts, playbook.ts (line numbers cited below come from grep output, the surrounding code was not read)

## Findings

### WILL-05-F01: A website form carrying someone else's phone number changes that customer's record and triggers messages to them
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639 (authorisation bypass through user-controlled key), CWE-306
- Files and lines: src/lib/will/form-link.ts:138-142, 159-189, 202-253, 258-266, 294-310, 369-438; callers src/app/api/tax-form/route.ts:250-262 and 304-312
- Evidence:
  - `notifyFormReceived` finds the customer by the phone number typed into the public, unauthenticated form (`findCustomerByPhone(waNumber)`, line 395) and passes it to `applyFormReceived`.
  - In `applyFormReceived` the income track is rewritten to `TFN_ABN` when `opts.hasAbnIncome` is true (lines 138-142). This runs BEFORE the state gate at line 159, so it applies to a customer in any state, including leads who have not been quoted yet and customers already lodged.
  - For a lead state it sets `formComplete: true` and stores the `medicare_no:` and `residency_check_pending:` settings (lines 165-183). For `PAID` / `FORM_PENDING` it queues `FORM_RECEIVED` (form complete, reminders cancelled, confirmation sent), `MEDICARE_INFO` (the Medicare exemption message, 15 minutes later) and `RESIDENCY_CHECK` (lines 213-266).
  - The code comment at lines 144-158 states the weakness itself and names the completion token as the fix. The token path exists (`notifyFormReceivedForCustomer`, lines 339-355) but the phone path stays live unless `FORM_TOKEN_ENFORCE === 'true'` (tax-form/route.ts:308-311). The Student Visa Tax branch (tax-form/route.ts:250-262) always uses the phone match; it returns before the token logic.
  - `resolvePendingFormLinkOnNewCustomer` (lines 294-310) replays any open unmatched-form task against a brand-new customer using `samePhone` (last 9 digits, lines 72-75). A form submitted with a number that has no chat yet is applied automatically the moment that number first writes in. The task list it scans (`openSystemTasks`, tasks.ts:114-117) is not filtered by brand.
- Root cause: a phone number is treated as proof of identity for a state-changing operation. The income change sits outside even the partial state gate.
- Attack prerequisites: knowledge of a customer's WhatsApp number (or the number of someone about to contact the business). No login. `FORM_TOKEN_ENFORCE` not set to `true`, or the SVT line enabled.
- Impact: a third party can (a) move a customer onto the dearer TFN + ABN track, which drives the fee the payment check expects and the messages they get; (b) mark the questionnaire complete so reminders stop and, after payment, the customer is never asked for the form; (c) cause the Medicare exemption message, the residency check and the "questionnaire received" confirmation to be sent to a customer who submitted nothing; (d) pre-seed these flags for a person before their first message. Integrity of the customer file and unsolicited tax-related messages; no direct data disclosure found.
- Recommended fix: move the `income` update below the state gate and apply it only on the token path; set `FORM_TOKEN_ENFORCE=true` in production; give the SVT branch the same token check; make `resolvePendingFormLinkOnNewCustomer` raise a task for a person instead of applying automatically, and scope it to the customer's brand.
- Regression test: call `notifyFormReceived` with a number matching a `LODGED` customer and `hasAbnIncome=true`; assert `income` is unchanged. Call it for a `FORM_PENDING` customer without a token while enforcement is on; assert no job is queued. Create a customer whose number matches an open unmatched task; assert nothing is applied without a person.
- Limits of this verification: the value of `FORM_TOKEN_ENFORCE` in production is unknown. `store.findCustomerByPhone` and the token verification (`form-token.ts`) were not read. The scheduler handlers for the queued jobs were not read, so whether a further gate stops the messages is unverified.

### WILL-05-F02: The payment amount check accepts an underpayment whenever the amount equals any other fee, and never knows about foreign income, review or multi-year fees
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-840 (business logic error)
- Files and lines: src/lib/will/payment-proof.ts:23, 76-79, 108-110, 202-209, 231-243, 253-255; callers src/lib/will/service.ts:2773-2785 and 2978-2982
- Evidence:
  - `expectedFeeAud` accepts `foreignIncome` and `years` (lines 202-209) but the only caller passes `expectedFeeAud({ income })` (service.ts:2784). The expected fee is therefore always 220 or 385. It has no notion of the review fees (330 / 440) at all.
  - `amountMatchesFee` is true for any of the five fees within a tolerance of 15 (lines 76-79). service.ts:2979 skips the short-payment branch when `amountMatchesFee(verdict.paid)` is true. A customer on the TFN + ABN track (expected 385) who shows a 220 receipt is `short`, but 220 is "a fee", so the stage moves to Paid and "payment received" goes out.
  - A customer quoted 330 (foreign income, or a TFN review) or 495 / 440 who pays 220 or 385 gets verdict `match` against the base fee.
  - `pictureConfirmsPayment` (lines 108-110) confirms on "any fee, and the recipient is not shown to be someone else"; an unreadable recipient and an unknown status still confirm.
  - With unknown income, any amount of 205 or more is `unknown` and `amountAllowsConfirmation` returns true (lines 235-239, 253-255).
  - `incomeFromAmount` (lines 67-74) maps 440 to `TFN_ABN` although 440 is also two TFN years, and sets the customer's income from a number read off a customer-supplied picture (service.ts:2994).
- Root cause: "is this one of our fees" is used where "is this the fee this customer was quoted" is needed, and the quote (foreign income, review, years) is not passed to the comparison.
- Attack prerequisites: a customer with a quoted fee above $220; a receipt or pasted text showing a lower fee amount. No special access.
- Impact: service delivered for $110 to $275 less than the quoted fee per return, with no task raised (the over-payment branch raises one, the under-payment branch does not in these cases).
- Recommended fix: pass `foreignIncome`, the number of years and a review flag into `expectedFeeAud`; drop the `!amountMatchesFee(verdict.paid)` escape for `short`, or raise a REVIEW task whenever the paid fee differs from the quoted one.
- Regression test: customer with `income: 'TFN_ABN'`, proof amount 220: assert no transition to Paid and a remainder request. Customer flagged foreign income, proof 220: same.
- Limits of this verification: only service.ts 2762-2790 and 2895-3050 were read. Where the foreign-income, review and years facts are stored on the customer was not traced, and a later reconciliation step may exist elsewhere.

### WILL-05-F03: Payment confirmation fails open when the proof check cannot run, on conditions the sender controls
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the trust rule itself is a documented owner decision)
- CWE: CWE-636 (not failing securely), CWE-345
- Files and lines: src/lib/will/payment-proof.ts:165-169, 173-180, 314-318; src/lib/will/payment-claim.ts:31-58, 257-266, 271-289, 298-350; caller src/lib/will/service.ts:2916-2918
- Evidence:
  - `checkWasUndecided` returns true for reasons starting with "unsupported file type", "attachment too large", "daily ai budget", "media expired", "timeout" and others (line 168). service.ts:2916-2918 then treats the attachment as a trusted payment. A customer who has the bank details and sends any oversized or unsupported document is moved toward Paid and receives the form link. Once the daily AI budget is spent, every document counts as a payment.
  - `claimsPayment` accepts the customer's words ("paid", "done", "sent" in a message of five words or fewer, lines 339-345) and any text shaped like a pasted receipt (`looksLikePastedReceipt`, lines 257-266). `collectPastedPayments` adds up amounts typed by the customer; a new "receipt number" makes the same amount count again (line 282).
  - The file header (payment-claim.ts:17-22) records that this trust is a deliberate decision and that nothing here is connected to a bank.
- Root cause: no independent source of truth for payments, plus a fallback that turns "could not check" into "paid".
- Attack prerequisites: any WhatsApp sender who has reached the price stage. In FULL_AUTO mode no person is involved; in SUPERVISED mode a draft waits for approval (service.ts:3005-3024).
- Impact: Paid state, the questionnaire link and downstream work without payment. Bounded by the owner's stated exposure of one return's work, but automatable at volume, and the budget case makes it systematic.
- Recommended fix: keep trust for typed claims if the owner wants it, but for an undecided check create the task without moving the stage when the reason is "daily ai budget", "attachment too large" or "unsupported file type"; reconcile Paid customers against the bank statement before work starts.
- Regression test: `checkWasUndecided('daily ai budget reached')` path: assert the customer stays in the pre-payment state and a task exists.
- Limits of this verification: `trustUnreadable` and the code before service.ts:2895 were not read; additional conditions (for example "bank details were sent first") may narrow this. Not run.

### WILL-05-F04: The review-ask register can be wiped or lose entries, defeating the "one ask per customer, ever" rule
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-362 (race, lost update), CWE-755
- Files and lines: src/lib/will/review-asks.ts:47-55
- Evidence: `readReviewAsks` turns any `getSetting` error into an empty object (`.catch(() => null)` then `{}`). `patchReviewAsk` calls it, adds one customer and writes the whole object back with `setSetting`. A single failed read followed by a successful write replaces every customer's record with one entry. Independently, all customers share one settings value that is read, changed and written without a lock or version check, so two concurrent patches (webhook and scheduler, or two serverless instances) drop one of them. Grep shows writers in service.ts (1367, 1388) and scheduler.ts (973, 994, 1606, 1635, 1643, 1649, 2675).
- Root cause: per-customer state stored in one shared JSON setting, with a read error treated as "no data".
- Attack prerequisites: none for the fault itself; a transient database error or two events close together. Not attacker-driven.
- Impact: `askedAt`, `skippedAt` and `checkins` are lost, so customers who were asked, or who were deliberately skipped (tax payable, complaint), can be asked again; the refund check-in counter restarts. This is the Meta quality problem the file was written to stop. scheduler.ts:1604 also checks the chat (`reviewAskAlreadySent`), which limits repeat asks on that path only.
- Recommended fix: let a read error propagate out of `patchReviewAsk` (do not write after a failed read); store one row or one setting key per customer, or use an atomic JSON merge in the database.
- Regression test: store whose `getSetting` rejects once: assert `patchReviewAsk` rejects and `setSetting` is not called. Two interleaved patches for different customers: assert both records exist.
- Limits of this verification: whether the Supabase `getSetting` throws or returns null on a database error was not read. Concurrency was not exercised.

### WILL-05-F05: Sensitive customer text goes to the model without redaction in the reviewer; the digest redaction is narrow
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359 (exposure of private information), CWE-201
- Files and lines: src/lib/will/reviewer.ts:142-159, 181-190; src/lib/will/daily-digest.ts:159-164, 226-237; src/lib/will/digest.ts:13-25 (opened)
- Evidence: `reviewMessages` joins the last 16 turns of the chat verbatim, with stage, paid flag and language, into the request body sent through `anthropicMessages`. The history comes from `m.body` unchanged (service.ts:1127-1131). The codebase records that customers post tax file numbers in chat (instant-choice.ts:97-99, comment). A grep for redaction helpers in service.ts, claude.ts and engine.ts returned nothing. The nightly mining does redact (`redactSensitive`), but only email addresses and runs of seven or more digits; names, street addresses, dates of birth written with slashes or dots, and employer names pass through to the mining model and can be stored in Library drafts.
- Root cause: no redaction step in front of the reviewer call; a digits-only redaction rule for mining.
- Attack prerequisites: none. Happens whenever a customer types an identifier in the chat and the second check runs (`willMode`, or `WILL_REVIEWER=on`).
- Impact: tax file numbers, bank account numbers and identity details leave the system to a third-party processor beyond what the task needs, and mined Library drafts can retain personal details.
- Recommended fix: apply `redactSensitive` (extended to dates of birth and labelled identifiers) to every history turn in `reviewMessages`; the reviewer judges the draft, not the customer's numbers.
- Regression test: history containing a nine-digit number and an email; assert the serialised body passed to `anthropicMessages` contains neither.
- Limits of this verification: `llm-transport.ts` was not read, so a redaction inside the transport cannot be excluded. The main reply-generation call was not reviewed here.

### WILL-05-F06: Follow-up gates read "chat could not be loaded" as "no evidence" and let automatic messages go
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636
- Files and lines: src/lib/will/followup-gate-30oct.ts:250-254, 173-202, 117-121, 243-248
- Evidence: `messagesOf` returns `[]` when `listMessages` throws (the comment says unreadable means "no evidence"). With an empty list: `unansweredRun` is 0 (the cap of three is not applied), `declinedInChat` and `openCustomerQuestion` are null, `paymentConfirmedInChat` and `formSubmittedInChat` are false, `reviewAskAlreadySent` is false, and `lodgedVariant` returns `refund` for a customer whose only "payable" evidence is in the chat. `followUpBlock` then returns null and the nudge goes.
- Root cause: every gate is written as "block on evidence", and the loader hides the difference between an empty chat and a failed read.
- Attack prerequisites: a database read error at send time; not attacker-driven.
- Impact: a sales nudge to someone who declined or already paid, a fourth unanswered message, a repeat review ask, or refund wording to a customer who owes tax. `refundCheckinBlock` is safe in this case (it needs positive evidence, lines 235-237).
- Recommended fix: have `messagesOf` signal failure (null or throw) and have the scheduler skip or retry the job instead of sending.
- Regression test: store whose `listMessages` rejects; assert the scheduled follow-up is not sent and is rescheduled.
- Limits of this verification: the scheduler call sites (scheduler.ts:959, 1026, 1353, 1595, 1604, 1634, 1849) were seen in grep output only.

### WILL-05-F07: The full phone number from an unmatched form is written to the audit log and a task
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-532
- Files and lines: src/lib/will/form-link.ts:408, 415-421 (compare 268-274)
- Evidence: `store.audit('system', 'form_received_unmatched', { waNumber, formKind })` stores the number as typed. The matched path masks the email for the same log, with the comment that the audit log is readable in the CRM and holds a third party's contact detail (lines 270-272). The unmatched task context carries the number, email and Medicare answer (`unmatchedFormTaskContext`). The value is attacker-supplied text from a public form.
- Root cause: masking applied on one path only.
- Attack prerequisites: none; any form submission with an unknown number.
- Impact: full phone numbers of non-customers kept in the audit trail; an unauthenticated sender can write arbitrary strings into it.
- Recommended fix: store the last three or four digits in the audit row; keep the full number only in the task that needs it, and bound its length and character set.
- Regression test: unmatched submission; assert the audit payload does not contain the full number.
- Limits of this verification: sanitising of `whatsapp` in the form routes was not read; `form-link-task.ts` was not read.

### WILL-05-F08: Broad "leaving" phrases close a lead and cancel its follow-ups on ordinary sentences
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: n/a (business logic)
- Files and lines: src/lib/will/text-normalize.ts:455-474; src/lib/will/followup-gate-30oct.ts:35-47, 53-61, 194-198
- Evidence: `LEAVING_RE` contains fragments such as `decided (?:to|not)`, `go(?:ing)? with`, `my (?:own )?accountant`, `entschieden`, `自分で`, `キャンセル`. `saysLeaving` excludes questions and a short list of buying signals (`BUYING_SIGNAL` covers "pay now" and "ready to pay", not "decided to pay tomorrow" or "decided to do it"). A match on the pre-payment flow returns `closeLead: true`, and the caller closes the lead and cancels queued messages.
- Root cause: substring matching on customer free text drives an irreversible-looking state change.
- Attack prerequisites: none; an ordinary customer sentence.
- Impact: a live lead is closed and receives no further contact; revenue loss, not a data risk. A later real message reopens it (`declinedInChat`, line 58).
- Recommended fix: require the phrase to stand without a payment or intent word, or raise a task instead of closing on the weaker fragments.
- Regression test: "I decided to pay tomorrow", "I filled it in 自分で": assert `saysLeaving` is false.
- Limits of this verification: the caller that acts on `closeLead` was not read. Regex behaviour was reasoned, not executed.

### WILL-05-F09: Library entries learned from Working Holiday Tax chats are usable by the Student Visa Tax assistant
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-668
- Files and lines: src/lib/will/knowledge.ts:15-26, 257; src/lib/will/daily-digest.ts:218-220, 246
- Evidence: `usableFor` treats an entry with no `brand:` tag as valid for both brands. Drafts mined from WHT chats are saved untagged (line 246 tags only SVT). Once approved, a WHT answer that names WHT prices, the WHT form link or the WHT brand is retrieved for an SVT customer. The comment calls this intended (decision 004).
- Root cause: default-shared instead of default-scoped.
- Attack prerequisites: none; depends on what the owner approves.
- Impact: WHT wording, links or prices shown to SVT customers, if the two brands differ on those points.
- Recommended fix: tag WHT-mined drafts `brand:wht` by default and let the owner widen an entry on approval.
- Regression test: mine a WHT conversation; assert the draft carries `brand:wht` and `retrieveKnowledge` under `withBrand('svt')` does not return it.
- Limits of this verification: whether SVT prices and links differ from WHT was not checked. `knowledge-seed.ts` and `brand-context.ts` were not read.

### WILL-05-F10: The reviewer is fail-open and reads customer text as part of its prompt
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: CWE-636
- Files and lines: src/lib/will/reviewer.ts:21-23, 142-159, 175-179, 200-224
- Evidence: any missing key, non-200 status, timeout, malformed tool output or exception returns `pass`. Customer messages are placed in the same user message as the draft, so a customer can try to steer the verdict. A `revise` text is re-run through the policy guard before use (service.ts:1100-1107), so the reviewer cannot push unguarded text out. The system prompt is written for Working Holiday Tax only (prices, business identifiers).
- Root cause: by design; the deterministic guard is the control.
- Attack prerequisites: none.
- Impact: the second check gives no protection when it is unavailable or manipulated; it must not be counted as a control.
- Recommended fix: none required beyond not relying on it; log the fail-open cases distinctly from a real `pass` (today both audit as `pass`).
- Regression test: reviewer transport throws; assert the audit row records "unavailable", not "pass".
- Limits of this verification: whether the second check runs for SVT chats (and so applies WHT rules to Mia) was not determined.

## Checked and found sound

- Prices in the approved English wording match the brief: 220, 385, 330 and 495 with foreign income, 330 and 440 review (approved-messages.ts:51, 60, 70, 77, 103, 112; instant-choice.ts:182, 233, 263).
- Guarantee sentence only in the TFN-only price message; absent from TFN + ABN, foreign income and review wording (approved-messages.ts:56 against 60-117; instant-choice.ts:159, 267-269; approved-es.ts:16, 29-48).
- A bare "yes" to a review quote is not read as a track choice (instant-choice.ts:114); a message with a question mark, a number or over 90 characters is never an instant choice (instant-choice.ts:107-110).
- "No to Medicare" needs an explicit "no"; empty or unknown values send nothing (form-link.ts:34-36).
- Email masked in the matched-form audit row (form-link.ts:272).
- Google review link setting is validated against two fixed URL shapes or a place-id pattern before use (review-asks.ts:126-132).
- Reviewer output: verdict checked against an enum, revised text capped at 4,000 characters, note at 300 (reviewer.ts:210-217); revised text re-guarded by the caller (service.ts:1100-1107).
- Model output for payment proof is coerced field by field; anything unexpected becomes "unknown" (payment-proof.ts:131-146). A shown different recipient or a failed transfer never confirms on the picture alone (payment-proof.ts:85-87).
- Trouble, question, future and conditional wording are checked before any payment keyword (payment-claim.ts:311-328).
- Customer name is regex-escaped before being built into a pattern (text-normalize.ts:227, 235); first names are restricted to letters, 2 to 20 characters (text-normalize.ts:188-202).
- Stash sentinels in `stripDashes` are private-use characters, confirmed by grep (text-normalize.ts:54-55), so restored numbers cannot collide.
- Mined entries are saved as `draft` and need approval (daily-digest.ts:246); knowledge retrieval returns nothing on a store error (knowledge.ts:256-260).
- Template overwrite from code sits behind `sessionValid` and is audited (src/app/api/will/seed/route.ts:24, 53-55).
- Demo customers are seeded only by the file store, which refuses to start in production (store-file.ts:60-61; store.ts:574-576).
- No secrets, API keys or tokens in the twelve files. The bank details and business identifiers present are the ones sent to customers.
- Regular expressions applied to customer text use bounded gaps (`{0,40}` style); no unbounded nested repetition found by reading.

## Open questions

1. Is `FORM_TOKEN_ENFORCE=true` set in production, and does the SVT form flow issue a completion token at all? (F01)
2. service.ts:745-762: when the customer answers "yes" to a $330 foreign-income quote, `detectChoice` returns `TFN` (instant-choice.ts:115-117). The caller's `foreign` flag was seen but its source was not traced; if it is false here the $220 message with the guarantee would go out.
3. The objection scripts o1, o2, o3, o5, o6, o9 and o14 carry the guarantee unconditionally (approved-messages.ts:120-147) and claude.ts:760-763 returns two of them directly. engine.ts:538-540 and 1317 strip the guarantee for ABN and foreign-income customers (grep only). Not verified: that every send path, including a person pressing a Library entry, passes through that strip, and that review customers are covered.
4. Does `getSetting` in the Supabase store throw on a database error or return null? This decides how easily F04's wipe occurs.
5. Does the second check (`decisionMode === 'will'`) run on SVT chats? The reviewer prompt is WHT-only.
6. `refundCheckinMessage` and `reviewAskShortMessage` use `String.replace` with a replacement string (review-asks.ts:165, 169); a `$&` or `$1` in the first name would be interpreted. Callers appear to pass a cleaned first name; not traced.
7. src/app/api/crm/tasks/route.ts: no authentication call was visible in lines 34-90 by grep; it calls `notifyFormReceived` (line 81). Authentication may be in middleware; out of this unit, flagged for the owner of that file.
8. daily-digest.ts:256-258 writes the day key after a mining failure, so that day is never mined again. Data completeness only, noted for the owner.
