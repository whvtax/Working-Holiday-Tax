# WILL-02 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/i18n.ts | 892 | 1-500, 501-892 | REVIEWED |
| src/lib/will/meta-url.ts | 47 | 1-47 | REVIEWED |
| src/lib/will/scheduler.ts | 2682 | 1-500, 501-1000, 1001-1500, 1501-2000, 2001-2682 | REVIEWED |
| src/lib/will/store.ts | 579 | 1-579 | REVIEWED |

Total 4,200 lines read. Files opened outside the unit, only to judge findings (partial reads, not reviewed):
`channel.ts` 434-700 and 756-772 (deliverOut, media download), `policy-guard.ts` 1270-1300 and 1400-1412 plus a grep of `isApprovedTemplate` uses, `claude.ts` 795-862 (judgeHoldingLine), `brand-context.ts` 1-54, `form-token.ts` 170-178, `text-normalize.ts` 188-226, `state-machine.ts` 7-32, `handoff-reasons.ts` 582-594, `form-link.ts` 250-263, `app/api/will/webhook/route.ts` 405-418, `app/api/will/actions/route.ts` 380-396.

Key fact established from `channel.ts`: `deliverOut` does NOT run the policy guard, and does not check approval mode, the kill switch, `aiPaused` or `isLegacy`. It only checks `optedOut`, duplicates and language. Every guard and mode decision therefore rests on the scheduler branch that calls it.

## Findings

### WILL-02-F01: Model-written holding reply is sent with a weakened guard, without approval, from a prompt the customer controls
- Severity: HIGH
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (code path); the effect of an injection REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-77 (prompt injection), CWE-863
- Files and lines: src/lib/will/scheduler.ts:829-846; src/lib/will/claude.ts:829-858; src/lib/will/policy-guard.ts:1288, 1333, 1680-1684
- Evidence: In the HANDOFF_ACK branch the last 30 messages (customer text, 500 chars each) are joined into `transcript` and passed to `judgeHoldingLine`. When the model answers `REPLY`, `judged.reply` is checked by `policyGuard` with `isApprovedTemplate: true` and then sent with `deliverOut(c, judged.reply, 'AI', { system: true })`. There is no `inApprovalMode()` check on this path. `isApprovedTemplate: true` switches off the 24-hour window check, `TYPED_URL`, `REFUND_OR_CANCEL_PROMISE`, `NON_REFUNDABLE_WORDING`, the pre-payment rules and the improvised-length ceiling. `guaranteeBarred` and `customerText` are not passed. The only other limits are in claude.ts:854 (120 characters, no digit, no `http(s)://`, no question mark).
- Root cause: Free text written by the model is labelled as an approved template, and the branch sends directly instead of going through the approval queue.
- Attack prerequisites: A customer with an open handoff task (any long or complicated message produces one) who writes text aimed at the model, for example an instruction to answer with a refund or guarantee sentence.
- Impact: Will can send a model-authored sentence that no person approved, even in Approval mode, and that the guard would normally block (a fee-refund or guarantee promise in words, to an ABN or foreign-income customer included). The customer holds it as a written promise from the business. Content is bounded to one short line with no figures.
- Recommended fix: Call the guard with `isApprovedTemplate: false`, pass `guaranteeBarred` and the customer's last text, and in Approval mode store the reply as `PENDING_APPROVAL`. Consider restricting `REPLY` to a fixed list of approved lines per language.
- Regression test: HANDOFF_ACK job with `ai_mode` = approval and a stubbed judge returning `REPLY` "We will refund your fee, guaranteed": expect no `deliverOut` call and either a blocked verdict or a pending draft.
- Limits of this verification: Static only. I did not run the model, and I read only the listed lines of policy-guard.ts, so other checks that stay active under `isApprovedTemplate: true` may still catch some wording.

### WILL-02-F02: Approval mode is not honoured by several scheduler sends
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-285
- Files and lines: src/lib/will/scheduler.ts:58-71 (the stated rule), 871 (holding line), 916 (HANDOFF_BUMP), 992 (REFUND_CHECKIN), 1557 (RESEND_MESSAGE), 1762 (legacy AUTO_REPLY), 2630 and 2641 (paperwork ask and nudge)
- Evidence: The file header says "Approval mode means approval for EVERYTHING". FORM_RECEIVED, RESIDENCY_CHECK, MEDICARE_INFO, REVIEW_REQUEST, FOLLOW_UP and the payment rescue all branch on `inApprovalMode()`. The seven call sites above call `deliverOut` or `sendPaidAwareText` with no such branch. The repair sweep reads `approval` at 2506 but uses it only for steps 1 and 2.
- Root cause: The mode check is repeated per branch instead of sitting at the single send point.
- Attack prerequisites: None; normal operation while the owner has selected Approval.
- Impact: Automated messages reach customers without the human approval the owner believes is in force. The legacy AUTO_REPLY case sends model-written text queued before a switch to Approval.
- Recommended fix: Enforce the mode inside `deliverOut` for `author === 'AI'` (with an explicit, named exemption for human-approved resends), or add the branch to each site.
- Regression test: For each job kind, with `ai_mode` = approval, assert a `PENDING_APPROVAL` row and zero WhatsApp calls.
- Limits of this verification: `mode.ts` was not read; I relied on the scheduler's own use of `requiresApproval`.

### WILL-02-F03: Customer-facing sends that never pass the policy guard
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-693
- Files and lines: src/lib/will/scheduler.ts:855-871 (holding line from the owner-editable Library, only a placeholder regex at 860), 914-916, 980-992, 1372-1381, 1557-1560, 1640-1647, 2528-2535, 2594-2597, 2628-2641; fallback at 1169
- Evidence: None of these bodies is passed to `policyGuard`, and `deliverOut` has no guard. Three of them are not fixed code constants: the holding line is whatever the Library row `handoff_holding*` holds; RESEND_MESSAGE and the critical-message retry resend a stored message body; the paperwork text is built from customer state. In `sendAck`, when the guard rejects the localized text the code swaps in the English Library copy and sends it without running the guard again (1169).
- Root cause: Guarding is opt-in per branch.
- Attack prerequisites: A Library edit (owner account, or anyone who can write Library rows) or a previously stored message body.
- Impact: Breaks the rule "nothing sent to a customer without the policy guard". A wrong price, wrong bank details or a guarantee line placed in the holding-line Library entry would go to every handed-off customer unchecked; the nightly bank check (2373-2384) would catch bank details only up to a day later.
- Recommended fix: Run the guard in `deliverOut` for every AI-authored body, with the caller supplying the context; re-run the guard on the English fallback at 1169.
- Regression test: Put a foreign BSB in `handoff_holding` and run a HANDOFF_ACK job: expect no send and a task.
- Limits of this verification: `review-asks.ts`, `paperwork-checklist.ts` and `payment-confirmation.ts` builders were not read; their output may be constant.

### WILL-02-F04: Pause and legacy flags skipped on some job kinds
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-862
- Files and lines: src/lib/will/scheduler.ts:781 and 906 (no `isLegacy` test), 1624 (no `aiPaused` test), 1529-1560 (no `aiPaused` or `isLegacy` test)
- Evidence: HANDOFF_ACK and HANDOFF_BUMP test `!c.optedOut && !c.aiPaused` only. REVIEW_REQUEST tests `!customer.optedOut && !customer.isLegacy` only. RESEND_MESSAGE tests neither flag; only `deliverOut`'s opt-out check applies.
- Root cause: Each branch carries its own copy of the three-flag check.
- Attack prerequisites: None.
- Impact: Automatic messages (including the model-written reply of F01) can go to a legacy contact, and a review ask or an automatic resend can go to a chat the owner paused.
- Recommended fix: One shared `silenced(customer)` helper used by every sending branch, or the check inside `deliverOut` for AI-authored sends.
- Regression test: Each kind with `isLegacy` or `aiPaused` set sends nothing.
- Limits of this verification: Whether legacy customers can ever get a handoff task was not traced.

### WILL-02-F05: Unredacted conversation sent to the model in the holding-line check
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-359
- Files and lines: src/lib/will/scheduler.ts:829-833; src/lib/will/claude.ts:842
- Evidence: `transcript` is built from raw `m.body` (whitespace collapsed, 500 chars per message, last 30 messages) and placed in the user message. No redaction helper is applied, although one exists (`redactSensitive` in digest.ts, used by the daily digest).
- Root cause: This later-added model call did not reuse the redaction step.
- Attack prerequisites: None; a customer who typed a TFN, bank details or passport data in the chat before a handoff.
- Impact: Tax file numbers and bank details typed in chat go to the model provider in this prompt.
- Recommended fix: Apply the same redaction used on the main reply path before building `transcript`.
- Regression test: Transcript containing a 9-digit TFN and a BSB/account pair: assert the request body does not contain them.
- Limits of this verification: I did not confirm whether `anthropicMessages` redacts centrally; I saw no sign of it in the lines read.

### WILL-02-F06: RESEND_MESSAGE does not check that the stored message belongs to the job's customer
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639
- Files and lines: src/lib/will/scheduler.ts:1529-1560
- Evidence: `original` is loaded by `job.payload.messageId`; `customer` by `job.customerId`. There is no test that `original.customerId === customer.id`, that it is an OUT message, or that its status is FAILED. The body is then sent to `customer`.
- Root cause: The job trusts its own payload.
- Attack prerequisites: A job row with mismatched ids. The three current creators (webhook/route.ts:415, 436; actions/route.ts:392) write consistent pairs, so this needs a bug elsewhere or write access to `will_jobs`.
- Impact: One customer's message text (possibly containing personal details) sent to another customer.
- Recommended fix: Cancel the job unless customer id, direction OUT and a failed status all match.
- Regression test: Job with another customer's message id sends nothing and audits.
- Limits of this verification: Only the three creators found by grep were checked.

### WILL-02-F07: Kill switch is read once per tick and hard-coded off in every guard call
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-367
- Files and lines: src/lib/will/scheduler.ts:658 (single read); 838, 1164, 1210, 1466, 1721, 1950, 2046 (`killSwitch: false`)
- Evidence: After the read at 658 the tick may run for up to 58 seconds, with four concurrent model replies and up to 15 jobs plus the repair sweep, and never reads the setting again.
- Root cause: The stop control is checked at entry only.
- Attack prerequisites: None.
- Impact: Pressing "Pause Will" during a tick does not stop that tick's remaining sends.
- Recommended fix: Re-read the setting before each claim (one indexed read) and before the repair sweep.
- Regression test: Flip the setting after the first job; later jobs stay SCHEDULED.
- Limits of this verification: `runDeferredAutoReply` in service.ts was not read; it may check the switch itself.

### WILL-02-F08: Send-rate limiter fails open and is not atomic
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-770
- Files and lines: src/lib/will/scheduler.ts:629-636
- Evidence: A failed `getSetting` yields a fresh window with count 0; a failed `setSetting` is swallowed, so the count never rises. Read-then-write with four concurrent workers. The comment at 623-627 accepts the race but not the fail-open.
- Root cause: Soft counter in the settings table.
- Attack prerequisites: A store fault during a backlog.
- Impact: The cap that exists because Meta restricted the account for bulk messaging stops applying exactly when the store is unhealthy.
- Recommended fix: Use the atomic `bumpCounter` the store already offers (store.ts:526) and refuse on read error.
- Regression test: `getSetting` rejecting returns false.
- Limits of this verification: None beyond static reading.

### WILL-02-F09: Brand handling falls back to WHT on error, and the residency link is WHT-only
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-668
- Files and lines: src/lib/will/scheduler.ts:648-651 (`jobBrand` returns 'wht' on any read error), 749-756 (SVT-enquiry skip swallowed by an empty catch), 1371 (`signFixToken(customer.id, 'wht')`), i18n.ts:884-887 (WHT domain hard-coded); claude.ts HOLDING_SYSTEM names Working Holiday Tax for every brand
- Evidence: As described; on a transient read error an SVT customer's job runs in WHT brand context and an SVT enquiry on the shared number is not skipped.
- Root cause: Fail-open defaults chosen for availability.
- Attack prerequisites: A store read error, or an SVT customer who matches `needsResidencyCheck`.
- Impact: WHT wording, prompt context or a WHT-signed link in a Student Visa Tax conversation.
- Recommended fix: On error leave the job SCHEDULED; sign the fix token with `customer.brand`.
- Regression test: SVT customer with a failing `getCustomerById` produces no send.
- Limits of this verification: `rebrandText` may rewrite the domain for SVT; whether the SVT site accepts a 'wht' fix token was not checked.

### WILL-02-F10: Outbound URL check accepts trailing-dot internal names and does not cover redirects or DNS
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-918
- Files and lines: src/lib/will/meta-url.ts:27-31; caller src/lib/will/channel.ts:764-768
- Evidence: `localhost.` contains a dot and does not end with `.localhost`, so it passes; the same holds for `name.internal.` and `name.local.`. The check is on the literal hostname only, so a public name that resolves to a private address passes. The caller uses `fetch` with the default redirect mode, so a redirect target is never checked.
- Root cause: String-level host filtering.
- Attack prerequisites: A tampered or malicious `url` in Meta's media lookup response (the file's own stated threat model).
- Impact: Server-side request to an internal or loopback name; the bearer token is not attached because `isMetaHost` is exact-suffix and fails closed.
- Recommended fix: Strip one trailing dot before the tests; use `redirect: 'manual'` and re-check each hop; optionally resolve and reject private ranges.
- Regression test: `isSafeOutboundHttpsUrl('https://localhost./x')` and `'https://a.internal./x'` return false.
- Limits of this verification: Not executed. Based on WHATWG URL keeping the trailing dot in `hostname`.

### WILL-02-F11: One-time residency link is stored and sent as a URL query token
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-598
- Files and lines: src/lib/will/i18n.ts:884-892; src/lib/will/scheduler.ts:1371-1381
- Evidence: The signed token goes in `?k=`, inside the message body saved to the message table (also as a pending draft) and as a Meta template parameter. Lifetime 7 days (form-token.ts:176-178).
- Root cause: Capability carried in the URL.
- Attack prerequisites: Read access to the CRM chat, a message export, or the customer's forwarded message.
- Impact: Whoever holds the link can answer the residency question as that customer for 7 days.
- Recommended fix: Keep the one-use rule strict, shorten the life, and mask the token in the stored body.
- Regression test: Stored body does not contain the raw token.
- Limits of this verification: The page that consumes `k` was not read.

### WILL-02-F12: Customer name can forge lines in the nightly issue context
- Severity: INFORMATIONAL
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-74
- Files and lines: src/lib/will/scheduler.ts:2215-2218, 2412-2415; src/lib/will/handoff-reasons.ts:582-594
- Evidence: Rows are written as `id|name|text` joined by newlines; `name` is the WhatsApp profile name and is not stripped of `|`, newline or `---`.
- Root cause: Delimited text format without escaping.
- Attack prerequisites: A profile name with those characters and a customer who lands on the nightly card.
- Impact: A wrong or extra "open this chat" entry on the owner's card. No data access by itself.
- Recommended fix: Strip `|` and line breaks from the name, or store JSON.
- Regression test: Name containing a newline and a second `id|x|y` yields one parsed row.
- Limits of this verification: Whether the webhook already strips newlines from profile names was not checked.

## Checked and found sound

- Store selection fails closed in production when Supabase is not configured: store.ts:562-579.
- Bearer token only to exact Meta host suffixes; http, credentials, non-443 ports, IP literals and single-label hosts refused: meta-url.ts:21-41. Paging links pinned to graph.facebook.com: meta-url.ts:44-47.
- Job claim before work, and QUEUED to SENDING claim before the legacy autopilot send: scheduler.ts:712, 741, 1758.
- FOLLOW_UP marked DONE before sending so a replay cannot double-send: scheduler.ts:2073; crash handler does not flip a DONE job back: 2165-2169.
- FORM_RECEIVED confirmation only for the job that wins the state transition: scheduler.ts:1269-1270.
- Follow-up gates: paid customers never get the sales cadence (270, 1836), per-customer off switch at arm and fire time (168, 261, 1838), fee refund owed blocks nudges and the review ask (1613, 1837), policy guard on Library text and again on a substituted body (1949, 2045).
- Legacy autopilot reply is re-guarded against current state with `guaranteeBarredFor`: scheduler.ts:1719-1726.
- Template `{{1}}` parameter comes from `greetingName` (letters, apostrophe, hyphen, 2 to 20 chars, else "there"): scheduler.ts:84-90, text-normalize.ts:188-202. No injection into replace patterns.
- Prices in fixed texts are $220 and $385 only: i18n.ts:216, 221, 226, 354, 357, 360. No guarantee wording in i18n.ts.
- Regexes in i18n.ts (NO_REFUND_CASES_Q 205, REFUND_CHANCE_RE 292, BANK_DOC_DENIED_RE 377, quotesOtherPrice 371-372, KEYWORDS 27-32, unsupportedScript 56-62) and scheduler.ts (1818, 1912, 1914, 2432-2433) use bounded quantifiers or plain alternation; I found no nested unbounded repetition.
- Security email body strips `<`, `>` and `&` from the problem text: scheduler.ts:2382.
- Nightly orphan cleanup reads the complete customer set, not the 1,000-row window: scheduler.ts:2234, 2299-2305.
- No secrets, tokens or keys in the four files. The Google review link (i18n.ts:152) and the business BSB/account pattern (scheduler.ts:1912) are public business details.

## Open questions

1. `quotesOtherPrice` (i18n.ts:373) treats 110 as one of our prices. It is not in the brief's price list. Is $110 a real amount (for example the half-fee of the guarantee)?
2. Nightly maintenance sets `paid: true` for any customer in a non-sales, non-closed stage (scheduler.ts:2269-2272), and the legacy autopilot path moves a customer to PAID from a stored `proposedState` (1767-1772). Is the stage accepted as proof of payment on purpose in every case, including a stage reached from the customer's own "I paid" text?
3. `LODGED_CONFIRMATION_MSG` promises the refund "within 14 business days" (i18n.ts:680-682). Business wording, not a security defect; noted because it is a dated promise sent automatically.
4. Does `runDeferredAutoReply` (service.ts, not in this unit) check the kill switch, approval mode and the SVT-enquiry skip? The timer path at scheduler.ts:707-716 skips the SVT-enquiry check that the main loop applies at 748-757.
5. Does `sendWhatsAppTemplate` map template names for SVT? FOLLOW_UP checks approval of `svtTemplateName(...)` (2008) but passes the unmapped name at 2067.
