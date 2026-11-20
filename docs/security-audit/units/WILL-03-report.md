# WILL-03 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/claude.ts | 862 | 1-500, 501-862 | REVIEWED |
| src/lib/will/close-lead-30oct.ts | 34 | 1-34 | REVIEWED |
| src/lib/will/engine.ts | 1610 | 1-500, 501-1000, 1001-1610 | REVIEWED |
| src/lib/will/policy-guard.ts | 1691 | 1-560, 561-850, 851-1140, 1141-1420, 1421-1691 | REVIEWED |

Files opened outside the unit, in part only, to judge findings (not reviewed in full):
`service.ts` (lines 318-345, 1240-1300, 1545-1575, 1636-1700, 2140-2162, 2183-2194, 2549-2575, plus greps), `scheduler.ts` (1700-1745, grep for `killSwitch`), `channel.ts` (`deliverOut`, first 76 lines from line 434), `state-machine.ts` (67-99, 159-166), `judgement.ts` (110-117), `text-normalize.ts` (164-225), `will-decides.ts` (90-120), `i18n.ts` (316-319), `approved-messages.ts` (51-60), `app/api/will/mine/route.ts` (40-75), `daily-digest.ts` (232-262).

Nothing was run. All findings are from reading the code.

## Findings

### WILL-03-F01: Stand-in and rewrite paths discard the hard "do not send" gates (paused, legacy, opted out, kill switch)
- Severity: MEDIUM
- Confidence: high for the engine logic, medium for the end-to-end effect
- Status: CONFIRMED_BY_STATIC_EVIDENCE (engine); REQUIRES_RUNTIME_VALIDATION (delivery)
- CWE: CWE-636 (fail open), CWE-863
- Files and lines: src/lib/will/engine.ts:1332-1333, 1350-1360, 1399-1410; src/lib/will/policy-guard.ts:1282-1285; src/lib/will/service.ts:1558-1564, 2160
- Evidence:
  - `policyGuard` reports `KILL_SWITCH_ACTIVE`, `AI_PAUSED_FOR_CUSTOMER`, `CUSTOMER_OPTED_OUT`, `LEGACY_CHAT_AI_DISABLED` as ordinary entries in the same `violations` list as content faults.
  - engine.ts:1332 puts those four codes in the set `LENGTH_ONLY` next to `REPLY_TOO_LONG`. When the first draft is too long AND one of the four gates is set, the engine asks the model for a shorter rewrite; at 1350-1359, if the rewrite is shorter and its violations are all in `LENGTH_ONLY`, the verdict is overwritten with `allowed: true, violations: []`. A rewrite whose only violation is `AI_PAUSED_FOR_CUSTOMER` therefore becomes "allowed" and is returned as `queued`.
  - engine.ts:1399-1410: when the verdict contains `ACCOUNT_NAME_WRONG` plus any of the four gates (`NOT_A_FAULT`), the fixed account-name answer is returned as `queued` / `pending_approval` without a second `policyGuard` call.
  - The "deliberate silence" branch (1391) only fires when EVERY violation is one of the four gates, so it does not cover these mixed cases.
- Root cause: "this customer must not be messaged" is encoded as a guard violation that later code filters by name, instead of a separate gate checked first and never overridden.
- Attack prerequisites: none for an attacker in the usual sense. It happens when the owner has taken a chat over (AI paused) or the chat is legacy, and the customer writes something that draws a long draft, or a draft that names the account wrongly. A customer can provoke a long draft by asking several questions.
- Impact: Will answers in a chat the owner paused or that is excluded by policy. On the deferred Autopilot path (`runDeferredAutoReply` -> `decideAndAct` with `sendNow`), service.ts:1558-1564 turns `queued` into `sent` and calls `deliverOut` with no further guard; the lines of `deliverOut` I read block only `optedOut`. On the delayed `AUTO_REPLY` path the scheduler re-runs the guard (scheduler.ts:1720) and would stop it, and with the kill switch on the scheduler does not run (scheduler.ts:658), so opt-out and kill switch appear to be covered downstream; paused and legacy are not on the `sendNow` path. The rewrite branch also makes a paid model call while the kill switch is on.
- Recommended fix: check the four gates before any model call and return `silent`; remove them from `LENGTH_ONLY`; in the account-name branch run `policyGuard(safe, guardCtx)` like the determination stand-in does (1481); add an `aiPaused` / `isLegacy` / kill-switch check inside `deliverOut` for `author === 'AI'`.
- Regression test: `runEngine` with `guard.aiPaused = true` and a model stub returning a 2,000-character reply, then a 300-character reply on the rewrite: expect `kind: 'silent'`. Same with a draft that trips `ACCOUNT_NAME_WRONG`.
- Limits of this verification: `service.ts` 2005-2157 and the rest of `deliverOut` were searched by grep, not read line by line; a pause check I did not see would reduce the impact.

### WILL-03-F02: The "free advice seeker" boundary message is sent with no Policy Guard call and ignores the approval mode
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-862, CWE-636
- Files and lines: src/lib/will/engine.ts:520-534
- Evidence: in `will` mode, for an unpaid English chat where the bank details were sent, `isFreeAdviceSeeker` (regex-driven) returns `kind: 'queued'` with `FREE_ADVICE_BOUNDARY` and `newState: NOT_INTERESTED`. No `policyGuard` call, and `kind` is `queued` even when the mode is SUPERVISED. Every other fixed-line path in the file (thank-you 566, goodbye 593, later plan 616, no-refund 637) calls the guard and uses `resolveAiMode(mode)`.
- Root cause: an early-return path added without the two checks its neighbours have.
- Attack prerequisites: none; triggered by ordinary customer wording after the price message.
- Impact: a message goes out, and a lead is closed, in Approval mode without approval, and (on the `sendNow` path, see F01) in a paused or legacy chat. Breaks the rule "nothing sent to a customer without the policy guard". A false positive of the regex closes a live lead (state `NOT_INTERESTED`).
- Recommended fix: run `policyGuard(FREE_ADVICE_BOUNDARY, {..., isApprovedTemplate: true})`, return `silent` when refused, and use `resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval'`.
- Regression test: `runEngine` in `will` mode with `mode: 'SUPERVISED'` and with `guard.aiPaused = true` on a history that satisfies `isFreeAdviceSeeker`: expect `pending_approval` and `silent`.
- Limits of this verification: `free-advice-seeker.ts` was not opened; how often the detector fires is unknown.

### WILL-03-F03: Partial-answer path sends a hand-over draft without the engine's payment, questionnaire, price and guarantee safeguards
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-693, CWE-841
- Files and lines: src/lib/will/engine.ts:431-455, 850-880; src/lib/will/policy-guard.ts:1571-1574; src/lib/will/service.ts:1275, 1294
- Evidence:
  - `service.ts` always passes `partialAnswer: true`. When the model returns `human_task` (severity REVIEW) with a `suggested_reply` that contains a `[TEAM: ...]` marker, `runEngine` strips the marker and sends the rest (`queued` on Autopilot).
  - That draft was only passed through `normaliseWillText`, `fillPlaceholders` and `applyBankRule` (871-873). It never reaches the deterministic steps that the normal reply path applies after line 980: removal of "payment received" and the form link for a customer who did not report a payment (1166-1187), `scrubUnpaidDraft` (only used at 936 and 974), the questionnaire-received check (1197), `fixForeignPrice` (1070), `enforcePriceMessage` (1092), the no-bank-before-exchange rule (1125) and answer-first (1240).
  - The guard context built at 439-442 has no `guaranteeBarred`, so `GUARANTEE_NOT_ALLOWED` cannot fire for an ABN, foreign-income or already-lodged customer on this path (`applyBankRule` strips the guarantee for ABN and foreign income, not for already-lodged).
  - The guard's `FORM_LINK_BEFORE_PAYMENT` rule exempts any text that contains the words "payment received" (or its translations), so a draft that says payment was received and carries the form link passes the guard for an unpaid customer.
- Root cause: the partial-answer shortcut re-enters the send path after the point where the code-level corrections run, and the guard relies on those corrections having run.
- Attack prerequisites: the model must produce a hand-over draft with a `[TEAM:]` marker that also contains the unsafe content. A customer can push it there with a multi-question message that mixes "I think I paid" style wording and an open question (prompt steering); no special access needed.
- Impact: an unpaid customer can be told the payment was received and be sent the form link on Autopilot (the state does not move to PAID, but the customer is told it did); a guarantee can be sent to a customer it does not cover; a model-worded price block can go out unpasted.
- Recommended fix: route the partial reply through the same post-processing function as a normal reply (extract lines 980-1317 into one function and call it for both), or at minimum apply `scrubUnpaidDraft`, the payment-confirmation filter and `guaranteeBarred` here. Make the guard's form-link exemption depend on a caller flag ("this is the system payment confirmation"), not on a phrase in the text.
- Regression test: model stub returns `human_task`, REVIEW, `suggested_reply` = payment-received line + form link + "[TEAM: check bank]" for an unpaid customer whose message does not claim payment: expect no reply containing the link.
- Limits of this verification: not executed; the second check in `service.ts` (1285 onward, described there as fail-open) may hold some of these in `will` mode.

### WILL-03-F04: The model's (or the customer's) word alone advances the pipeline into states that record verified facts
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-841, CWE-345
- Files and lines: src/lib/will/engine.ts:459-464, 896-904, 920-939, 954-978; src/lib/will/state-machine.ts:86-99; src/lib/will/service.ts:1676-1678; src/lib/will/claude.ts:102
- Evidence:
  - The engine holds a proposed state only when the jump is INVALID and targets PAID / SIGNED / LODGED / COMPLETED (927), and separately checks a valid jump into PAID (954). A VALID one-step jump into any other state is accepted: `FORM_PENDING -> FORM_COMPLETE`, `FORM_COMPLETE -> DOCUMENTS_COMPLETE`, ... `SIGNATURE_PENDING -> SIGNED` and `SIGNATURE_PENDING -> LODGED` (state-machine.ts:98) are all valid. The service then writes it with `setState(..., 'AI')`.
  - engine.ts:459-464 sets `SIGNED` whenever the customer's text matches `customerSaysSigned` and any reply is going out. The comment at 915-919 says these states must never flip on the customer's word alone.
  - `new_state` comes from the model, which reads customer text and image descriptions; the only validation in `validateDecision` is membership of the state list.
  - PAID: a typed payment claim (`claimsPayment`) is enough for the engine to accept PAID and let the confirmation and form link through (954-966, 1166). This is documented as intended ("trust the customer").
- Root cause: the transition table is used as the authorisation check; it says which moves are possible, not who has the evidence to make them.
- Attack prerequisites: a customer in the pipeline who writes "signed", "form done", "lodged?" etc., or text that steers the model.
- Impact: CRM stages show a form, documents, a signature or a lodgement that does not exist. Depending on what other units trigger on those stages (lodged message, review request, removal from the team's work queue; not verified here), a return could be treated as signed or lodged when it is not. For PAID: service starts and the form link is sent with no money verified.
- Recommended fix: allow the model to propose only sales-stage transitions and the closing states; move post-payment stages only from the system event that proves them (form webhook, document receipt, team button, signature record). Remove the automatic `SIGNED` at 459-464 or turn it into a task.
- Regression test: at `SIGNATURE_PENDING`, model stub returns a benign reply with `new_state: 'LODGED'`: expect `newState` undefined. At `FORM_PENDING` with `new_state: 'FORM_COMPLETE'` and `ctx.formComplete = false`: same.
- Limits of this verification: I did not read what each stage change triggers downstream, nor whether the team reconciles payments before work starts.

### WILL-03-F05: One flag, `isApprovedTemplate`, switches off the 24-hour window check and most content rules for free text
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (guard); REQUIRES_RUNTIME_VALIDATION (reachability)
- CWE: CWE-693
- Files and lines: src/lib/will/policy-guard.ts:1288-1293, 1333, 1344, 1406, 1520, 1589-1597, 1623, 1680-1684; src/lib/will/engine.ts:568, 595, 618, 639, 827, 994
- Evidence: the guard treats `isApprovedTemplate` as "this is a Meta template": no 24-hour check, no URL check, no length rule, no refund-figure, refund-promise, lodgement or pre-payment rules. The engine sets it to true for fixed lines and for `approvedRendered` text, all of which are sent as ordinary free text, and some of which are edited by code after rendering (`withMygovReassurance`, `withYearsTotal`, the price tail at 1087, name substitution).
- Root cause: "approved wording" and "sent as a template" are two different properties carried by one boolean.
- Attack prerequisites: a reply whose delivery is delayed past 24 hours (an item approved late from the approval queue).
- Impact: a free-text message can be judged sendable outside the window by this guard. In the engine the window is open by construction (the service sets `lastCustomerMsgAt` to now), and the scheduler re-checks with `isApprovedTemplate: msg.meta?.system === true`, so the main paths are covered; the approval route was not read.
- Recommended fix: split into `approvedWording` (content exemption) and `sentAsTemplate` (window exemption); always run the 24-hour check unless `sentAsTemplate`.
- Regression test: `policyGuard(text, { isApprovedTemplate: true, lastCustomerMsgAt: 25 hours ago })` for a free-text send must return `OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE`.
- Limits of this verification: `app/api/will/actions/route.ts` (approval send) not read.

### WILL-03-F06: Library exemption set is process-global, replaced per request, and left stale on error
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-362, CWE-668
- Files and lines: src/lib/will/policy-guard.ts:123-135, 176-183, 1611-1615; src/lib/will/claude.ts:185-193
- Evidence: `registerLibraryBodies` replaces module-level `LIBRARY_SENTENCES` / `LIBRARY_CORES`. Any sentence in that set skips every sentence-level content rule (amounts, determinations, refund promises, DIY). `decide()` registers the set before each model call; if `listTemplates()` throws, the catch is empty and the set from an earlier request (possibly the other brand, possibly edited since) stays in force. Two concurrent requests in one instance share the set.
- Root cause: per-decision data held in module state.
- Attack prerequisites: none direct; needs a Library row with unsafe wording (the comment says rows are guard-checked at save time; not verified here) or a cross-brand/stale set.
- Impact: guard verdicts depend on which request last ran in the instance; a sentence exempt for one brand or one moment is exempt for another. A cold instance that guards without registering sees no Library at all (false blocks).
- Recommended fix: pass the Library set into `policyGuard` through `GuardContext`; on a failed read, register an empty set.
- Regression test: register bodies A, then call `decide` with a store whose `listTemplates` throws, and assert a sentence from A is no longer exempt.
- Limits of this verification: whether `listTemplates` is brand-scoped was not checked.

### WILL-03-F07: Guard pattern gaps: bare links on unlisted TLDs, unlabelled identifiers, and a default portal password that is allowed out
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-184
- Files and lines: src/lib/will/policy-guard.ts:977-994, 1119, 1143-1144, 1310-1317
- Evidence:
  - `hasForeignUrl` catches scheme-less links only for a fixed list of TLDs; a bare domain on a TLD not in the list (for example `.me`, `.to`, `.zip`, `.eu`, `.us`) is not seen. WhatsApp makes such text tappable. The allow-list also accepts any `g.page`, `maps.app.goo.gl` and `search.google.com` link.
  - `PERSONAL_ID_FIGURE` needs the label (TFN, passport, Medicare) within 15 characters before the digits; a nine-digit number echoed without the label passes.
  - `XERO_DEFAULT_PWD` deliberately lets one fixed, trivially guessable numeric password be sent to customers when the text mentions Xero (owner-approved per the comment).
- Root cause: deny-lists and proximity patterns.
- Attack prerequisites: the model must be steered into writing the link or number (customer prompt injection), on Autopilot.
- Impact: a customer can receive a link to a third-party site, or have an identifier repeated back in chat; a shared default password is normalised in customer messages.
- Recommended fix: treat any `label.tld[/path]` token that is not on the allow-list as a URL (allow-list only); block any 8-11 digit run that is not a known business number outside the bank block; stop sending a shared default password and use the portal's reset flow.
- Regression test: `policyGuard('See example.zip/pay for details', ctx)` must return `TYPED_URL`; a reply repeating a nine-digit number from `customerText` must be refused.
- Limits of this verification: regexes were read, not executed.

### WILL-03-F08: `closeLeadAfterNo` swallows every failure and leaves no durable "do not chase" marker
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-390, CWE-755
- Files and lines: src/lib/will/close-lead-30oct.ts:25-33
- Evidence: `cancelJobsFor` and `setState` are each wrapped in an empty catch; the audit write is `.catch(() => undefined)`. If cancellation fails, follow-up jobs stay queued and the caller gets `{cancelled: 0}` with no error. `getSetting` / `setSetting` are in the `CloseStore` type but unused, so the header's "nothing new is ever scheduled" is not enforced here. A lead not in a sales state (for example already `WENT_COLD`) gets its jobs cancelled once and no state change. The two steps are not atomic.
- Root cause: best-effort design with no retry and no persistent flag.
- Attack prerequisites: a transient store error at the moment the customer says no.
- Impact: sales follow-ups or a win-back reach someone who declined (the problem the file was written to stop).
- Recommended fix: on failure, record a per-customer flag that the follow-up sender checks at send time, and raise a task or log an error; do not report success silently.
- Regression test: store stub whose `cancelJobsFor` throws: expect a persisted flag or a thrown/returned error, and a follow-up send that is refused.
- Limits of this verification: whether the follow-up sender re-checks the customer's state and words at send time (scheduler.ts:1854 suggests a gate exists) was not verified.

### WILL-03-F09: Payment-link name override can turn an outage fallback or low-confidence hand-over into a reply, or into silence
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-754
- Files and lines: src/lib/will/engine.ts:794-800, 891-893; src/lib/will/i18n.ts:316-319; src/lib/will/claude.ts:90-92, 106-114
- Evidence: when our last message asked for a name and the customer's message looks like only a name, any `human_task` decision is rewritten to `reply` with `approved_key: 'payment_link_ready'`. This includes the `fallbackTask` produced when the API is down and the low-confidence downgrade. `paymentLinkMessage` has wording for three languages only; for any other language `renderApproved` returns null, so `reply_text` is the model's `suggested_reply` (a draft the model itself rated below 0.8, now sent as a reply after the guard) or the empty string, in which case line 891 returns `silent` and no task is raised by the engine.
- Root cause: the override does not distinguish a model hand-over from an error fallback and has no path for "no fixed wording".
- Attack prerequisites: none; API outage or a non-English/German/Japanese chat at that step.
- Impact: a customer waiting for a card payment link gets no reply and no task (or a low-confidence draft).
- Recommended fix: apply the override only when a fixed wording exists for the language and the decision is not an error fallback; otherwise keep the task.
- Regression test: `decide` stub returns `fallbackTask`, `ctx.lang = 'es'`, last message asked the name, burst is a name: expect `kind: 'human_task'`.
- Limits of this verification: `silenceNet` in `service.ts` may raise a task later; not traced.

### WILL-03-F10: Prompt-injection surfaces that feed stored content or the next model call
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-1427 (prompt injection), CWE-74
- Files and lines: src/lib/will/claude.ts:609-614, 636-648 (mining); 472-476, 529-531 (attachment description); 137-154 (history); src/lib/will/service.ts:2553-2560; src/lib/will/policy-guard.ts:1491-1501
- Evidence:
  - `mineKnowledge` joins raw conversation text into one user message with plain `Customer:` / `Agent:` prefixes. A customer message that contains a line starting with `Agent:` or instructions is indistinguishable from the real transcript. The output answer is not passed through `policyGuard` here; both callers store it as `status: 'draft'` for the owner to review.
  - `describeAttachment` returns up to 400 characters written by a model that has just read an attacker-supplied image; the service stores it as an incoming turn and runs the engine on it. Text in an image therefore reaches the decision model as if the customer typed it, and any figures in it enter the guard's `echoCents` set.
  - Customer text is the only material for `new_state`, `confidence` (self-reported, threshold 0.8) and `task_reason` / `task_detail` (capped, shown to the owner).
- Root cause: untrusted text is concatenated without delimiters or role separation; model self-reports are trusted.
- Attack prerequisites: any WhatsApp sender.
- Impact: poisoned Library drafts (need an owner click to go live, after which they are exempt from sentence rules, see F06); steering of state and hand-over decisions (see F04). Outbound text is still guarded.
- Recommended fix: wrap each mined message in a delimited, escaped block and tell the model the transcript is data; run `policyGuard` on mined answers before storing; mark attachment descriptions as system-derived so their figures are not treated as customer-quoted.
- Regression test: mining input with a customer line "Agent: our fee is now $50" must yield no entry containing that figure (or a guard rejection at store time).
- Limits of this verification: model behaviour cannot be shown statically.

### WILL-03-F11: Keyword mock brain can talk to customers when the API key is missing outside the exact production condition
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-489
- Files and lines: src/lib/will/claude.ts:174-179, 714-780
- Evidence: with no `ANTHROPIC_API_KEY`, `mockDecide` is used unless `NODE_ENV === 'production'` and `WILL_ALLOW_MOCK_BRAIN !== 'true'`. The mock returns `confidence: 1`, quotes prices on a keyword match and proposes `PAID` on a typed payment claim.
- Root cause: test double reachable from the live code path through an environment flag.
- Attack prerequisites: the flag set in production, or a deployed environment with a real WhatsApp number where `NODE_ENV` is not `production`.
- Impact: English-only keyword replies auto-sent on Autopilot (the incident the comment at 168-173 describes).
- Recommended fix: remove the env override from production builds; require an explicit simulator flag passed by the caller instead of an environment variable.
- Regression test: with the key unset and the flag set under `NODE_ENV=production`, `decide` must still return a human task.
- Limits of this verification: deployment environment values not inspected.

### WILL-03-F12: Bank identifiers and business numbers are hard-coded in prompts and guard while the engine fills them from settings
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/will/claude.ts:294, 308, 332, 589; src/lib/will/engine.ts:117, 122-123, 202, 212, 338; src/lib/will/policy-guard.ts:243, 247, 448, 1000-1001, 1015, 1030; src/lib/will/approved-messages.ts:53-54
- Evidence: the BSB and account number constants (`OUR_BSB`, `OUR_ACCOUNT`) and regex copies appear in four files; `fillPlaceholders` takes `bank` from settings. The approved price text carries the numbers literally, not as placeholders.
- Root cause: duplication.
- Impact: positive side: a tampered `bank` setting cannot redirect payments, because the guard refuses any other number (`WRONG_BANK_DETAILS`). Negative side: a legitimate account change needs edits in many places, and a partial change blocks every price message.
- Recommended fix: one constant module imported by all four files.
- Regression test: n/a.
- Limits of this verification: none.

## Checked and found sound

- Only our bank identifiers may appear in an outgoing message; IBAN, PayID and unlabelled digit runs in banking sentences are refused: policy-guard.ts:1002-1037, 1299.
- Missing customer timestamp fails closed on the 24-hour rule (`?? 0`): policy-guard.ts:1289-1291.
- Unicode evasion handled before checks (NFKC, zero-width and bidi characters, non-ASCII digits): policy-guard.ts:76-84, 1264-1268, 1278-1279, 1298.
- Prompt echo, internal notes, unfilled placeholders, AI self-identification, agent-status claims, card-detail requests are whole-message checks that approved wording does not bypass: policy-guard.ts:1296-1347.
- Only the exact mode value `FULL_AUTO` transmits; anything else waits for approval: engine.ts:1541 (except F02 and the documented verbatim-approved exception at 1487, 1541).
- Model output validation: forced tool call, action and confidence checked, state must be in the list, confidence below 0.8 cannot reply: claude.ts:94-131, 215.
- API failures, timeouts, truncation and malformed output become a human task, never a customer-visible error; missing key in production becomes a task: claude.ts:174-177, 221-264.
- Vision checks default to "not proof" / "not a confirmation" / null on every failure: claude.ts:337-380, 418-460, 493-535.
- `judgeHoldingLine` defaults to HOLD on failure and refuses replies with digits, links or questions; the caller guards the reply: claude.ts:829-862, scheduler.ts:837.
- Invalid jump into PAID/SIGNED/LODGED/COMPLETED and an unsupported PAID are held as CONFLICT tasks with a scrubbed draft: engine.ts:927-939, 954-978.
- Payment confirmation and form link removed from a reply when the customer did not report a payment (normal reply path): engine.ts:1166-1187.
- Guarantee stripped or refused for ABN, foreign income and already-lodged (normal reply path): engine.ts:536-542, 999-1001, 1317; policy-guard.ts:1610.
- Price list limited to the fixed amounts, multiples and sums only in context, customer-quoted figures not confirmable as our price: policy-guard.ts:276-283, 462-497, 1479-1513.
- Customer first name used in messages is letters-only, 2-20 characters: text-normalize.ts:188-202.
- No secret values in the four files; the API key is read from the environment and only placed in the request header: claude.ts:167, 231.
- Opt-out is re-checked at the single transmission point: channel.ts (`deliverOut`, opted-out block).

## Open questions

1. Does `runDeferredAutoReply` or `deliverOut` check `aiPaused` / `isLegacy` somewhere I did not read? This decides the real-world severity of F01 and F02.
2. What do the stage changes `FORM_COMPLETE`, `SIGNED`, `LODGED` trigger (messages, review request, team queues)? Needed to size F04.
3. Is a typed "I paid" reconciled against the bank before the team starts work? The engine accepts it by design.
4. `kill_switch` is compared with `=== true` in `service.ts` and `scheduler.ts`; if the setting is ever stored as a string the switch reads as off. Outside this unit, not verified.
5. Are Library rows really guard-checked at save time for every write path (the claim at policy-guard.ts:117-119)? F06 and F10 depend on it.
6. `assessPaymentProofImage`: the tool description (claude.ts:294) tells the model to answer true for any banking receipt with our identifiers "whatever the payee nickname", while the system prompt says "when in doubt, say false". How the service uses `details` to decide "verified" versus "trusted" was not read; an edited screenshot is the obvious test.
7. The vision functions take `bytes` with no size limit of their own; the caller's limit was not checked.
