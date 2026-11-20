| finding ids | severity | real today? | devil's advocate (one line) | decision | exact fix or what the owner must do |
|---|---|---|---|---|---|
| WILL-01-F01, WILL-01-F08, WILL-04-F08 | MEDIUM / LOW / LOW | Yes. `chains` is still a module `Map` (service.ts:170), `handleInboundNote` still calls `handleIncomingInner` outside the queue (service.ts:2563), `wasAlreadySentVerbatim` still matches `SENT` rows only (channel.ts:425), `claimJob` still reads `attempts` before the conditional update (store-supabase.ts:1284-1288). | Worst case is a duplicate acknowledgement or a second task; the status flips that decide a send (`claimJob`, `claimQueuedForSend`, `setState` to PAID) are already atomic, and a first-contact unique violation heals on Meta's redelivery. | NEEDS_OWNER | A real fix needs a database lock or SQL functions (`attempts + 1`, `meta \|\| jsonb`, a unique outbox key), which is a migration. Owner must approve a migration plus a test run; nothing small and local removes the race. |
| WILL-01-F02 (opt-out part) | MEDIUM | No. `deliverOut` now reads the customer again before sending and blocks on a fresh `optedOut` (channel.ts:496-503). | n/a | ALREADY_FIXED | channel.ts:498 (`freshOptOut`). |
| WILL-01-F02 (pause and kill-switch part), WILL-02-F07, WILL-01-F12 | MEDIUM / LOW / INFO | Yes. `deliverOut` has no `aiPaused` or kill-switch check (channel.ts:434-530), the tick reads the switch once (scheduler.ts:658), and the paused holding line still goes (service.ts:829-845). | The window is the seconds of one model call or at most one 58-second tick; the legal case (STOP) is closed; the kill-switch holding line is a written owner decision (11 Oct, "decision 1"); a pause check in `deliverOut` would also stop sends that are meant to reach paused chats, such as RESEND_MESSAGE of a human message stored as AI. | NO_FIX | Race is seconds long and not a legal exposure; the holding line under the kill switch is deliberate. |
| WILL-01-F03 | MEDIUM | Yes. The engine guard is still given `lastCustomerMsgAt: new Date()` (service.ts:1273, 1102) and `deliverOut` checks the window only for the template-missing fallback (channel.ts:593-596). Timers armed under the kill switch stay scheduled (service.ts:847-852). | "Inside the window by definition" is a documented decision after a real incident (27 Aug); a deferred reply normally fires 1 to 5 minutes after the message; Meta's later 131047 rejection already raises a card. Only a pause longer than 24 hours reaches it. | NEEDS_OWNER | Approve a change (with a test run) that drops or turns into a task any AUTO_REPLY timer whose burst is older than about 23 hours when it finally runs. It touches every deferred reply, so it is not a blind one-line fix. |
| WILL-01-F04, WILL-03-F04, WILL-04-F05 | MEDIUM | Yes. A typed payment claim still moves the customer to PAID (service.ts:1676-1679, engine.ts:954-978 only holds PAID when no claim was written), a "verified" picture raises no task (service.ts:3132), `customerSaysSigned` still sets SIGNED (engine.ts:459-464), and the prompt still says trust and raise no task (playbook.ts:186, 591, 631). | "Trust the customer" is an explicit owner rule (Jo, 27 Aug, 30 Oct, 10 Nov); the firm sees its own bank account before any return is lodged; the cost of a false claim is a form link. | NEEDS_OWNER | Business decision: keep trust as is, or add one low-severity reconciliation task (or a daily list) for every PAID that came from words or a picture, and decide whether "I signed" may move the stage to SIGNED without a signature record. |
| WILL-01-F05 | MEDIUM | Yes. `assessSuccessConfirmationImage` (service.ts:2445-2448), `describeAttachment` (2549-2551) and `assessPaymentProofImage` (2891-2895) run with no check of `aiPaused`, `isLegacy` or the kill switch; only the payment path checks `optedOut` first (2814). | The same provider already receives every text the customer types; opt-out is about messages to the customer, not processing; the description in the thread helps the person who took the chat over, and skipping the check would bring back tasks the image check was added to remove. | NEEDS_OWNER | Privacy decision: may attachments from paused, legacy and opted-out chats, and all attachments while the kill switch is on, still be read by the model and the description stored? If no, the three calls get a gate and go straight to the existing task. |
| WILL-01-F06 | LOW | Yes. The condition at service.ts:683-684 has no mode test; every sibling instant answer has one (597, 621, 706, 738, 804). | The line is fixed, harmless and answers a question a person on the team just asked; holding it for approval adds a click. | FIX_NOW | Add `mode === 'FULL_AUTO'` to the condition. In Approval mode the message then takes the normal path (draft or task). See details. |
| WILL-01-F07, WILL-02-F03 | LOW / MEDIUM | Yes. `deliverOut` does not call `policyGuard`; the direct sends listed in both reports are still unguarded, and `sendAck` still swaps in the English Library copy without a second guard call (scheduler.ts:1175). | Almost all of these bodies are code constants; the rest are Library rows only the owner can edit; bank numbers are checked nightly; a guard inside `deliverOut` would refuse legitimate system lines (the payment confirmation carries the form link while `paid` is still false). | NEEDS_OWNER | Decide whether Library rows used by system sends (`handoff_holding*`, payment received, form received) must pass the guard when they are saved in the CRM. That is the place to stop a bad row; a guard in `deliverOut` is a larger change needing a full test run. |
| WILL-01-F09 | LOW | Yes. `postMessage` still returns `{ ok: true, skipped: true }` with no credentials (channel.ts:192) and `deliverOut` ignores `skipped`; a failed settings read still falls back to env (channel.ts:86). | Deliberate test mode used by the simulator and the test suite; in production an unconnected line also receives no webhooks, and the health dot shows it. | NEEDS_OWNER | Confirm in Vercel that production always has the WhatsApp token and phone id as environment variables (not only in the settings table). If yes, nothing to change; if the credentials live only in settings, approve making `skipped` a failure in production. |
| WILL-01-F10 | LOW | Yes. The same pattern `/does not exist\|not exist\|132001\|template/i` is at channel.ts:359 and 585. | The loose match errs toward the customer getting a message (English template or in-window text) instead of silence; a tighter match risks silence if Meta's wording differs from what we assume. | NEEDS_OWNER | Check real Meta error texts in the audit log (`template_missing_outside_window`, failed sends) for paused or parameter-mismatch templates. Only with that evidence can the pattern be narrowed to code 132001 safely. |
| WILL-01-F11, WILL-04-F01 | LOW / MEDIUM | Yes. Customer first names with phone numbers are still in the cached system prompt (playbook.ts:139-623, a full number at 622) and in comments (handoff-reasons.ts:508, channel.ts:215, eight lines in service.ts); `customer_created` still audits the raw `waId` (service.ts:250, 2308). | The anecdotes are the owner's own dated rules and the model's behaviour was tuned on them; rewording the prompt can change replies; the audit table is service-role only and the number is the lookup key support uses. | NEEDS_OWNER | Approve removing names and numbers from the prompt text and comments (keep the rule, drop who it was), followed by a simulator run, and say whether audit rows should store a masked number. Prompt wording is owner text, so it is not changed without sign-off. |
| WILL-01-F13, WILL-03-F12 | INFO | Yes, as described. | The token is read only by key (`getSetting(WA_TOKEN_KEY)`, channel.ts:82); no endpoint lists settings by value except the numeric counter prefix query (store-supabase.ts:1059). Hard-coded bank numbers are a control: a tampered `bank_details` setting cannot redirect payments (`WRONG_BANK_DETAILS`). | NO_FIX | No reachable disclosure path; the duplication protects payments. |
| WILL-02-F01 | HIGH | No. The model reply is guarded with `isApprovedTemplate: false`, `guaranteeBarred` and the customer text, and is not sent in Approval mode. | n/a | ALREADY_FIXED | scheduler.ts:836-851. |
| WILL-02-F02 | MEDIUM | Yes. No approval branch on the holding line (scheduler.ts:877), HANDOFF_BUMP (922), REFUND_CHECKIN (997), RESEND_MESSAGE (1562), legacy AUTO_REPLY (1767) or the paperwork ask and nudge (2635, 2646). | A holding line held for approval defeats its purpose (it tells the customer a person is coming); RESEND re-delivers text somebody already approved; the paperwork checklist is off unless the owner turns it on. | NEEDS_OWNER | Decide, per kind, whether Approval mode really means these too: holding line, 24h/48h bump, refund check-in, automatic resend, queued autopilot reply left over from before the switch, paperwork ask. The file header says "everything"; the code makes six exceptions. |
| WILL-02-F04 | MEDIUM | No for three of four: HANDOFF_ACK and HANDOFF_BUMP now test `isLegacy` (scheduler.ts:781, 908) and REVIEW_REQUEST tests `aiPaused` (1629). RESEND_MESSAGE still tests neither, by design (comment at 746-748: it re-delivers a message somebody already chose to send). | n/a | ALREADY_FIXED | scheduler.ts:781, 908, 1629. |
| WILL-02-F05 | MEDIUM | Yes. The transcript is built from raw bodies (scheduler.ts:829-832). | The main reply path sends the same messages, unredacted, to the same provider on every turn (claude.ts:137-153, 60 turns of 4,000 characters); redacting this one smaller call protects nothing and would hide what the model must judge. | NO_FIX | No added exposure over the main path. |
| WILL-02-F06 | LOW | Yes. `original` is loaded by message id and sent to `customer` with no ownership or direction test (scheduler.ts:1537-1562). | The three creators write consistent pairs; reaching it needs a bug elsewhere or write access to `will_jobs`. | FIX_NOW | One extra condition on the existing "no original" exit: a job whose message belongs to another customer, or is not outbound, is closed without sending. See details. |
| WILL-02-F08 | LOW | Yes (scheduler.ts:629-636). | Both the race and the fail-open write are stated, accepted trade-offs in the comment above the function ("smoothing a burst, not an exact quota", "a write failure here should not itself block a send"); failing closed would stop all replies during a store hiccup. | NO_FIX | Deliberate soft limiter. |
| WILL-02-F09 | LOW | Yes (`jobBrand` returns `'wht'` on error, scheduler.ts:651; `signFixToken(customer.id, 'wht')` at 1376). | `deliverOut` takes the brand from the customer row, not from the job context (channel.ts:482), and `postMessage` refuses any payload naming the other brand (channel.ts:185-186), so a WHT link or name cannot leave on the student line; the residency check is a working-holiday concept. | NO_FIX | The transmit-point brand check already fails closed. |
| WILL-02-F10 | LOW | Yes. `localhost.` and `x.internal.` pass (meta-url.ts:27-31); redirects are followed by default (channel.ts:768). | The URL comes from Meta's own API over TLS and the bearer token is only attached for exact Meta suffixes; exploiting it needs Meta's response to be tampered with. | FIX_NOW | Strip one trailing dot before the host tests (one line, fails closed). The redirect and DNS parts are left: they need runtime testing against Meta's CDN. See details. |
| WILL-02-F11 | LOW | Yes (i18n.ts:884-887). | The personal link is an owner feature (Jo, 3 Nov); the token only lets its holder answer one residency question, is signed and expires in 7 days; anyone who can read the stored body can already read the whole chat. | NO_FIX | Low value capability, deliberate design. |
| WILL-02-F12, WILL-04-F10 | INFO / LOW | Yes. `buildNightlyIssueContext` writes the WhatsApp display name unescaped into `id\|name\|text` lines (scheduler.ts:2220-2222). | Effect is limited to a wrong name or link on the owner's own nightly card; no data access. | FIX_NOW | Remove `\|`, line breaks and `---` from the name when the line is built. The unanchored card patterns in handoff-reasons.ts are left alone (changing them relabels real cards). See details. |
| WILL-03-F01 (rewrite path) | MEDIUM | No. `LENGTH_ONLY` now holds `REPLY_TOO_LONG` only. | n/a | ALREADY_FIXED | engine.ts:1332-1334. |
| WILL-03-F01 (account-name stand-in) | MEDIUM | Yes. The branch at engine.ts:1401-1402 still accepts a verdict that contains a paused, legacy, opted-out or kill-switch gate and returns the fixed answer as `queued` with no second guard call; on the deferred path service.ts:1558-1564 sends it. | "Never a task, the customer is at the bank" is an audit decision (11 Oct); the text is fixed and correct. But the comment directly above (1390-1392) says anything alongside one of the four gates still becomes a task, and the determination stand-in below re-guards (1481). | FIX_NOW | Drop `NOT_A_FAULT.has(v)` from that one condition, so a silenced chat gets the task instead of an automatic message. See details. |
| WILL-03-F02 | MEDIUM | Yes. engine.ts:529-533 returns `kind: 'queued'` with no `policyGuard` call and no mode test; every neighbour (566, 593, 616, 637) has both. | The wording is the owner's (Jo, 28 Oct) and the test suite shows it passes the guard; the trigger is narrow (unpaid, English, bank details sent). | FIX_NOW | Same two checks as the neighbours: guard with `input.guard` (so paused, legacy, opted-out and kill switch apply) and `pending_approval` outside Autopilot. Wording and the closing of the lead are unchanged. See details. |
| WILL-03-F03 (guarantee bar) | MEDIUM | Yes. The partial-answer guard context (engine.ts:439-442) has no `guaranteeBarred`; `applyBankRule` strips the guarantee for ABN and foreign income but not for an already-lodged return. | Needs the model to put a guarantee sentence into a hand-over draft for an already-lodged customer; rare. | FIX_NOW | Pass `guaranteeBarred` computed the same way as the normal path (engine.ts:999-1001), using helpers already imported. See details. |
| WILL-03-F03 (payment line, form link, price steps) | MEDIUM | Yes. The partial reply skips the steps after line 980 (`scrubUnpaidDraft`, payment-confirmation filter, `enforcePriceMessage`), and the guard's form-link rule is exempted by the words "payment received" (policy-guard.ts:1571-1572). | Needs the model to choose a hand-over and also write a payment confirmation with the link in the draft; the state does not move to PAID; the second check in `will` mode reads the reply. | NEEDS_OWNER | Approve a larger change with a full test run: route the partial reply through the same post-processing as a normal reply. Scrubbing it in place can leave an empty reply, so it is not a safe one-line fix. |
| WILL-03-F05 | LOW | Yes (policy-guard.ts:1288-1293). | The reporter confirms the main paths are covered (window open by construction, scheduler re-checks with the real timestamp); Meta itself rejects out-of-window text and the webhook raises a card; splitting the flag touches every guard call site. | NO_FIX | No uncovered send path shown; refactor risk outweighs it. |
| WILL-03-F06 | LOW | Yes (`LIBRARY_SENTENCES` is module state, policy-guard.ts:123-135; empty catch at claude.ts:191). | On a failed read the set that stays is the owner's own previous Library; registering an empty set instead would bring back the 3 Sep problem (the owner's wording blocked as improvised text) on every database hiccup. | NO_FIX | Stale set is the safer failure for customers. |
| WILL-03-F07 | LOW | Yes, as read (policy-guard.ts:977-994, 1119, 1143-1144). | A bare link on an odd TLD or an unlabelled number needs the model to be steered into writing it; widening the patterns blocks legitimate replies. The Xero default password is marked owner-approved in the code. | NEEDS_OWNER | Business decision: keep sending the shared default Xero password in chat, or switch customers to the portal's reset flow. The pattern gaps are accepted. |
| WILL-03-F08 | LOW | Yes (close-lead-30oct.ts:25-33). | "Best effort, none can throw" is the stated design of the owner's 30 Oct rule; the follow-up sender re-checks the customer's stage when it fires, and throwing here would break the reply that triggered the close. | NO_FIX | Deliberate; the send-time gate is the backstop. |
| WILL-03-F09 | LOW | Yes. Any `human_task`, including the outage fallback, becomes `payment_link_ready` (engine.ts:794-800); `paymentLinkMessage` has only en, de, ja (i18n.ts:316-319), so another language can end as `silent`. | For en/de/ja the fixed line during an outage is the better outcome (Jo, 9 Nov) and the service opens the URGENT link task (service.ts:1353). | NEEDS_OWNER | Approve a change with a test run: apply the override only when a fixed wording exists for the customer's language, otherwise keep the task. Not done blind because the student line renders this key from its own texts (svt-fixed-texts.ts). |
| WILL-03-F10, WILL-04-F12 | LOW | Yes, as described (claude.ts:609-614, playbook.ts:57-65, 722, 746). | Mined answers are stored as drafts and need an owner click; every outgoing text still passes the guard; `lang` is written by our own detector, so a value like `constructor` cannot arrive from a customer; Library rows are the owner's own. | NO_FIX | No path to a customer-visible effect without an owner action. |
| WILL-03-F11 | LOW | Yes (claude.ts:174-177). | The mock runs in production only when someone sets `WILL_ALLOW_MOCK_BRAIN=true` in Vercel on purpose; the flag exists for the test suite and the default is the safe path (a task). | NO_FIX | Explicit opt-in, safe default. |
| WILL-04-F02, WILL-04-F03 (other writes) | MEDIUM | Yes. `isBlockedContact`, `getCustomerByWaId`, `getCustomerById`, `listMessages` and the others still drop `error` (store-supabase.ts:452-482, 687-692); `setSetting`, `markCustomerRead`, `setMessageStatus` and the rest still ignore the write result (683-685, 1051-1053). `getBank` still returns placeholder numbers on a missing setting (service.ts:163-164), which the guard then refuses as wrong bank details. | Making every read throw changes the behaviour of dozens of callers that today degrade quietly; a transient error would turn into crashed webhooks and Meta redeliveries. | NEEDS_OWNER | Approve a staged change with a full test run: first the three reads that gate a send (`isBlockedContact`, `listMessages`, `getCustomerById`), then the writes. Too wide to apply blind. |
| WILL-04-F03 (kill switch) | MEDIUM | No. The action reads the setting back and returns an error if it did not save, before any audit row. | n/a | ALREADY_FIXED | src/app/api/will/actions/route.ts:1143-1145. |
| WILL-04-F04 | MEDIUM | Yes. Five unchecked deletes, parent last, nothing removed from audit, AI usage, per-customer settings or processed messages (store-supabase.ts:1024-1039). | Deletion is rare and done by the owner; audit rows are kept on purpose as a record. | NEEDS_OWNER | Needs a SQL function (migration) and a decision on what an erasure request must remove or anonymise: audit rows, AI usage rows, per-customer settings. |
| WILL-04-F06 | LOW | Yes. playbook.ts:295 and 622 mention the guarantee without the TFN-only condition; the residency and opening paragraphs still conflict. | The guard and `applyBankRule` strip or refuse the guarantee for ABN, foreign income and already-lodged customers whatever the prompt says. | NEEDS_OWNER | Owner wording: add the TFN-only condition at playbook.ts:295 and 622, pick one residency rule (five or six questions; may Will say "you may count as a resident"), and delete the superseded opening paragraph. |
| WILL-04-F07 | LOW | Yes (store-supabase.ts:1457-1466). | The comment states the choice: at-least-once is safer than dropping a customer's message; the verbatim duplicate guard in `deliverOut` limits repeat replies. | NO_FIX | Deliberate fail-open. |
| WILL-04-F09 | LOW | Yes, the store has no caller identity and most reads are not brand-scoped. | One owner runs both brands in one CRM; authorisation belongs to the routes (other units); brand is enforced where it matters, at customer lookup and at the transmit point. | NO_FIX | By design for a single-owner CRM. |
| WILL-04-F11 | LOW | Yes. `businessHoursBetween` formats one date per minute with no upper bound (handoff-reasons.ts:628-631) and is called with the last holding line's timestamp (scheduler.ts:813-819). | Needs a holding line months old with the task still open; cost is a second or two of one tick. | FIX_NOW | Cap the start of the interval at 7 days back in `holdingAckDue`. Any 7 days contain 40 business hours, so the "at least 4" answer cannot change, and `businessHoursBetween` itself (and its tests) is untouched. See details. |
| WILL-04-F13 | INFO | Yes (store-file.ts:43-74). | Development and simulator only; production refuses the file store (store.ts:564-577). | NO_FIX | No production path. |

## FIX_NOW details

### 1. WILL-01-F06: "Is that you?" answer only on Autopilot

File: `src/lib/will/service.ts` (line 684)

Existing text:
```
      && customer.paid && text.trim().length <= 40 && IDENTITY_YES_RE.test(text.trim())) {
```
Replacement:
```
      && mode === 'FULL_AUTO' && customer.paid && text.trim().length <= 40 && IDENTITY_YES_RE.test(text.trim())) {
```

### 2. WILL-02-F06: RESEND_MESSAGE must belong to the job's customer

File: `src/lib/will/scheduler.ts` (line 1538, the only `if (!original) {` in the file)

Existing text:
```
        if (!original) {
```
Replacement:
```
        // A resend only ever repeats this customer's own outbound message.
        if (!original || original.customerId !== customer.id || original.direction !== 'OUT') {
```

### 3. WILL-02-F10: trailing-dot host names

File: `src/lib/will/meta-url.ts` (line 27, inside `isSafeOutboundHttpsUrl`; the same text also appears at line 39 in `isMetaHost`, which is left as it is)

Existing text (two lines, unique as a pair):
```
  const h = u.hostname.toLowerCase()
  if (!h || !h.includes('.')) return false // localhost, metadata, single-label internal names
```
Replacement:
```
  const h = u.hostname.toLowerCase().replace(/\.$/, '') // "localhost." and "x.internal." are the same hosts
  if (!h || !h.includes('.')) return false // localhost, metadata, single-label internal names
```

### 4. WILL-02-F12, WILL-04-F10: display name cannot forge a nightly card line

File: `src/lib/will/scheduler.ts` (line 2221, in `buildNightlyIssueContext`)

Existing text:
```
  const parseable = rows.map((r) => `${r.id}|${r.name}|${r.text}`).join('\n');
```
Replacement:
```
  // The name is the WhatsApp display name: no field separator, line break or block separator in it.
  const parseable = rows.map((r) => `${r.id}|${String(r.name ?? '').replace(/[|\r\n]+|-{3,}/g, ' ').trim()}|${r.text}`).join('\n');
```

### 5. WILL-03-F01: account-name stand-in never goes to a silenced chat

File: `src/lib/will/engine.ts` (line 1402)

Existing text:
```
        && verdict.violations.every((v) => v === 'ACCOUNT_NAME_WRONG' || v === 'REPLY_TOO_LONG' || NOT_A_FAULT.has(v))) {
```
Replacement:
```
        && verdict.violations.every((v) => v === 'ACCOUNT_NAME_WRONG' || v === 'REPLY_TOO_LONG')) {
```

### 6. WILL-03-F02: free-advice boundary passes the guard and honours Approval mode

File: `src/lib/will/engine.ts` (lines 529-533)

Existing text:
```
      return {
        kind: 'queued', replyText: FREE_ADVICE_BOUNDARY, newState: closed, stateChanged: !!closed,
        decision: { action: 'reply', confidence: 1, reply_text: FREE_ADVICE_BOUNDARY, new_state: closed } as Decision,
        reviewNote: 'Only wants answers before paying: one friendly boundary, chat closed (free-advice-seeker).',
      };
```
Replacement:
```
      // Same two checks as every other fixed line: the guard (a paused, legacy, opted-out or
      // kill-switched chat gets nothing from here) and the mode. Refused: the normal path decides.
      const boundaryVerdict = policyGuard(FREE_ADVICE_BOUNDARY, {
        ...input.guard, state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents,
        isApprovedTemplate: true, customerTextChars: customerBurst.length, customerText: customerBurst,
      });
      if (boundaryVerdict.allowed) {
        return {
          kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
          replyText: FREE_ADVICE_BOUNDARY, newState: closed, stateChanged: !!closed,
          decision: { action: 'reply', confidence: 1, reply_text: FREE_ADVICE_BOUNDARY, new_state: closed } as Decision,
          reviewNote: 'Only wants answers before paying: one friendly boundary, chat closed (free-advice-seeker).',
        };
      }
```
Notes: `policyGuard`, `resolveAiMode`, `mode`, `input` and `customerBurst` (defined at line 501) are all in scope at this point. The message text is not changed.

### 7. WILL-03-F03 (guarantee bar): partial answer uses the same guarantee rule as a normal reply

File: `src/lib/will/engine.ts` (line 441)

Existing text:
```
        isApprovedTemplate: false, customerTextChars: burst.length, customerText: burst,
```
Replacement:
```
        isApprovedTemplate: false, customerTextChars: burst.length, customerText: burst,
        // Same rule as the normal reply path: no guarantee for ABN, foreign income or an already-lodged return.
        guaranteeBarred: ((texts: string[]) => hasForeignIncome(texts) || hasAbnIncome(texts) || alreadyLodged(texts))(
          input.history.filter((t) => t.role === 'customer').map((t) => t.text)),
```
Notes: `hasForeignIncome`, `hasAbnIncome` and `alreadyLodged` are already imported in this file (lines 27, 28, 39).

### 8. WILL-04-F11: bounded business-hours count for the repeat holding line

File: `src/lib/will/handoff-reasons.ts` (line 656, in `holdingAckDue`)

Existing text:
```
  return businessHoursBetween(i.lastAckAt, i.now) >= REPEAT_ACK_AFTER_BUSINESS_HOURS ? 'repeat' : 'none';
```
Replacement:
```
  // Only "at least 4" matters and any 7 days hold 40 business hours, so an old holding line
  // is not counted minute by minute over months.
  const from = new Date(Math.max(i.lastAckAt.getTime(), i.now.getTime() - 7 * 24 * 60 * 60 * 1000));
  return businessHoursBetween(from, i.now) >= REPEAT_ACK_AFTER_BUSINESS_HOURS ? 'repeat' : 'none';
```
