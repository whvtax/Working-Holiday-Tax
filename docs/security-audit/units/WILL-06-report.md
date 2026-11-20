# WILL-06 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/ai-usage.ts | 161 | 1-161 | REVIEWED |
| src/lib/will/already-checked.ts | 109 | 1-109 | REVIEWED |
| src/lib/will/attention-report.ts | 194 | 1-194 | REVIEWED |
| src/lib/will/brand-voice.ts | 231 | 1-231 | REVIEWED |
| src/lib/will/config.ts | 224 | 1-224 | REVIEWED |
| src/lib/will/document-drop.ts | 188 | 1-188 | REVIEWED |
| src/lib/will/expense-pdf.ts | 226 | 1-226 | REVIEWED |
| src/lib/will/expense-rules.ts | 146 | 1-146 | REVIEWED |
| src/lib/will/form-token.ts | 178 | 1-178 | REVIEWED |
| src/lib/will/handoff-diagnostic.ts | 159 | 1-159 | REVIEWED |
| src/lib/will/language-30oct.ts | 245 | 1-245 | REVIEWED |
| src/lib/will/lost-leads.ts | 251 | 1-251 | REVIEWED |
| src/lib/will/monthly-conversion.ts | 198 | 1-198 | REVIEWED |
| src/lib/will/paperwork-checklist.ts | 241 | 1-241 | REVIEWED |
| src/lib/will/payment-confirmation.ts | 197 | 1-197 | REVIEWED |
| src/lib/will/residency-quiz.ts | 182 | 1-182 | REVIEWED |
| src/lib/will/send-failure-30oct.ts | 260 | 1-260 | REVIEWED |
| src/lib/will/stage-sync.ts | 239 | 1-239 | REVIEWED |
| src/lib/will/state-machine.ts | 166 | 1-166 | REVIEWED |
| src/lib/will/suggest.ts | 235 | 1-235 | REVIEWED |
| src/lib/will/tasks.ts | 169 | 1-169 | REVIEWED |

21 of 21 files, 4199 lines. Files outside the unit opened only to judge a finding (partial reads, by grep or short ranges): config/form-paths.js, src/app/api/will/export/route.ts (16-75 and grep), src/app/api/crm/expense-pdf/route.ts (1-53), src/app/api/tax-form/route.ts (40-75), grep hits in src/app/api/tax-form/fix/route.ts and link/route.ts, src/lib/will/channel.ts (484-490), policy-guard.ts (1568-1574), guarantee-barred.ts (1-16), engine.ts (1100-1132 and grep), service.ts (1030-1040, 2696-2712), lost-analysis.ts (60-100), digest.ts (17-25), playbook.ts (line 217), text-normalize.ts (285-292), expense-from-task.ts (grep).

## Findings

### WILL-06-F01: The form-link detector misses the German and Japanese form links, so the "no form link before payment" guard and the completion token both skip them
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-185 (incorrect regular expression), CWE-863
- Files and lines: src/lib/will/brand-voice.ts:221-225; src/lib/will/form-token.ts:156-159, 166-170; src/lib/will/payment-confirmation.ts:92-95 (the sibling regex that does allow the prefix); callers src/lib/will/policy-guard.ts:1571, src/lib/will/channel.ts:487; src/lib/will/playbook.ts:217
- Evidence: `FORM_LINK_ANY_BRAND` requires the host to be followed directly by `/<slug>`. The localized pages exist (`src/app/(de)/de/start`, `src/app/(ja)/ja/start`) and the playbook tells the model to use "/de/start" and "/ja/start". A link `…com.au/de/start` does not match. `CURRENT_FORM_LINK` in payment-confirmation.ts was written with `(?:(?:de|ja|zh|vi)\/)?`, so the two regexes disagree. Consequences read in code: (a) policy-guard.ts:1571 raises `FORM_LINK_BEFORE_PAYMENT` only when `FORM_LINK_ANY_BRAND` matches, so a reply to an unpaid customer carrying the /de/ or /ja/ form link passes that rule; (b) `withFormCompletionToken` returns the body unchanged (form-token.ts:157), so the link goes out with no `?k=` token and the form endpoint falls back to the typed phone number (src/app/api/tax-form/route.ts:48-62), which is the weakness the token was built to close.
- Root cause: one regex used as the single recognizer for a form link was not updated for the language-prefixed routes.
- Attack prerequisites: none beyond a German or Japanese conversation (the model writes the localized link), or any party crafting a submission for another customer's number through an untokenized link.
- Impact: questionnaire access before payment for de/ja customers; submissions from those links are bound to a typed number, not to the chat.
- Recommended fix: add the optional `(?:(?:de|ja|zh|vi)\/)?` segment to `FORM_LINK_ANY_BRAND` (one shared constant for both files), and make `addTokenToFormLinks` cover it.
- Regression test: `FORM_LINK_ANY_BRAND.test('https://workingholidaytax.com.au/de/start')` is true; policyGuard on an unpaid customer with that link returns `FORM_LINK_BEFORE_PAYMENT`; `withFormCompletionToken` appends `?k=` to it.
- Limits of this verification: static only. I did not read the rest of policy-guard.ts, so another rule may also catch the link; I did not confirm how often the model emits the localized link.

### WILL-06-F02: The attention report prints customer names, full WhatsApp numbers and unredacted message text while stating it holds "no names or numbers"
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-532 / CWE-359
- Files and lines: src/lib/will/attention-report.ts:137, 146-148, 156-158, 62, 166, 172; served by src/app/api/will/export/route.ts:48-71
- Evidence: line 166 writes `c.name` and `c.waId` as the header of every customer block. Lines 137, 146, 147, 157, 158 write customer messages, Will's drafts, task context and suggested replies with `slice` only; `redactSensitive` is applied only to `reasonKey` and the second-check note (lines 36, 78). Line 62 writes the audit `reason` raw. The route returns `r.text` as is. The full export in the same route removes name and phone and runs `redact()` on every body (route.ts:176, 195), following the owner's 15 Nov rule quoted there; the attention mode does not.
- Root cause: redaction was added to the ITEM/summary lines only; the free-text block was left as before.
- Attack prerequisites: a valid dashboard session (`sessionValid`). The risk is where the downloaded file goes next (the report is built for analysis outside the system).
- Impact: a TFN, bank detail, email or phone number typed in a chat, plus every affected customer's name and number, leave the system in a plain text file labelled as anonymous.
- Recommended fix: replace line 166 with the `cN` reference already used in the ITEM lines, and pass every body, context, draft and reason through `redactSensitive`.
- Regression test: build a report from a message containing a 9-digit number, an email and a customer with name and waId; assert none appear in `text`.
- Limits of this verification: I did not read `sessionValid` or how the file is used after download.

### WILL-06-F03: "Already lodged" detector has no negation handling, so a customer who says they have NOT lodged is priced as a review and loses the guarantee
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-185, CWE-840 (business logic)
- Files and lines: src/lib/will/already-checked.ts:92-105, 107-109; consumers src/lib/will/guarantee-barred.ts:12-16, src/lib/will/engine.ts:1001, 1093, 1237
- Evidence: `ALREADY_LODGED_RE` is tested against each whole customer message with no denial or question filter (unlike `alreadyCheckedReason` in the same file). Alternatives such as `lodged\s+it`, `filed\s+it`, `submitted\s+it`, `\bamend`, `notice of assessment`, `the ato said`, `check my return` match "I haven't lodged it yet", "should I have filed it already?", "the ATO said I need a TFN". Any one earlier message is enough (`some`). The result feeds `enforcePriceMessage(..., alreadyLodged)` and `guaranteeBarredFor`.
- Root cause: keyword match on the whole history without negation, question or recency handling.
- Attack prerequisites: none; ordinary customer wording.
- Impact: a TFN-only customer can be quoted the review price ($330) instead of $220 and have the guarantee removed. Wrong price sent automatically.
- Recommended fix: split into sentences and drop questions and negated sentences, as `alreadyCheckedReason` does; narrow `the ato said` and `check my return`.
- Regression test: `alreadyLodged(["I haven't lodged it yet"])`, `alreadyLodged(["Do I need to amend anything?"])` are false; the existing positive cases stay true.
- Limits of this verification: I confirmed the regex and the call sites, but did not read `enforcePriceMessage` in full, so a later check may soften the effect.

### WILL-06-F04: The "customer already knows the result" rule is skipped by a question mark, a negation word or a non-English message, so the guarantee stays
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-840
- Files and lines: src/lib/will/already-checked.ts:45, 48-63; src/lib/will/engine.ts:1104-1112
- Evidence: line 53 discards every sentence that ends in a question mark or contains any of `not, never, without, if, whether, can i…`. "My accountant calculated it, I will not get much back" is discarded whole. All patterns are English, and engine.ts:1104 applies the clause only when the language is `en`. Lines 25 and 29-39 use `[^.!?]{0,60}` over text re-joined with `\n`, so a match can also span two unrelated sentences.
- Root cause: sentence-level veto by common words; fail direction is "guarantee kept".
- Attack prerequisites: a customer who knows their refund is below the fee and words the message accordingly, or writes in German or Japanese.
- Impact: the refund-the-difference guarantee is offered where the owner's rule says the fee is non-refundable.
- Recommended fix: restrict the veto to a negation that governs the checking verb; exclude `\n` from the gap classes; decide the non-English behaviour explicitly.
- Regression test: the sentence above returns `elsewhere`; "Can I see it in myGov?" still returns null.
- Limits of this verification: static; guarantee-barred.ts does not call `alreadyCheckedReason`, so the approve-draft path may differ from the engine path (not traced).

### WILL-06-F05: Send-failure repair no longer recognises the current form link
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (stale constant)
- Files and lines: src/lib/will/send-failure-30oct.ts:106, 111-114; config/form-paths.js (`'tax-form': 'start'`, SVT slug)
- Evidence: `FORM_URL_RE = /\/tax-form\b|\/form\b/`. The live slugs are `start` and the SVT random slug; `tax-form` is in `RETIRED`. A failed free-text message with the current form link is therefore not `form_link` critical (unless `meta.paymentConfirmation` is set or the body starts with the en/de/ja "payment received" phrase). `planRepair` then returns `nothing` for `outside_window`, `no_template` and `other` (lines 137-140).
- Root cause: hard-coded path not tied to config/form-paths.
- Attack prerequisites: none; any failed send of a form link.
- Impact: a paid customer's form link that failed is not automatically retried and is not de-duplicated as a critical message. A task is still raised by `recordSendFailure`.
- Recommended fix: build the regex from `FORM_SLUGS_ALT` / `CURRENT_FORM_LINK`.
- Regression test: `criticalSystemKind('https://workingholidaytax.com.au/start')` returns `form_link`.
- Limits of this verification: I did not read the scheduler code that calls `planRepair`.

### WILL-06-F06: A stuck SENDING confirmation counts as "form link delivered", so the rescue sweep never fires for it
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-670
- Files and lines: src/lib/will/payment-confirmation.ts:134-138, 183-184, 189-191
- Evidence: `deliversFormLink` accepts status `SENT` or `SENDING`. `confirmationRescue` returns `none` at line 184 when any such row exists, before the "stuck QUEUED / SENDING older than 15 minutes" branch at line 189 is reached. For a SENDING row whose body has the link, the stuck branch is dead code.
- Root cause: `SENDING` treated as delivered in the helper shared by the duplicate guard and the rescue.
- Attack prerequisites: none; a send that crashes after the row is marked SENDING.
- Impact: a paid customer never receives the form link and no resend or escalation happens from this sweep.
- Recommended fix: in `confirmationRescue`, count only `SENT` as delivered.
- Regression test: one confirmation row, status SENDING, 30 minutes old, body with the link: expect `resend`.
- Limits of this verification: another sweep may reset stale SENDING rows (not checked).

### WILL-06-F07: A folded event overwrites the reason of an open URGENT task; find-then-add is not atomic
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-362, CWE-778
- Files and lines: src/lib/will/tasks.ts:60-62, 69-76, 81
- Evidence: on an existing open task, `reason` is always replaced by the new event's reason (line 71) while severity is kept at the higher level (line 74). An URGENT "SEND FAILED: the payment confirmation did NOT reach the customer" card becomes URGENT "Paid customer sent a file. Nothing to answer" after the customer sends a file. Context is cut to the last 2000 characters (line 69), so customer text can also push the earlier diagnostic out. `findOpenTaskForCustomer` followed by `addTask` has no lock, so two concurrent events can open two cards.
- Root cause: reason is not ranked with severity.
- Attack prerequisites: none; normal traffic. A customer controls it by sending messages.
- Impact: the owner's one signal that a critical message failed can be hidden behind a harmless headline.
- Recommended fix: keep the existing reason when the existing severity outranks the new one; keep the first 300 characters of context when truncating.
- Regression test: fold a REVIEW event into an URGENT task; assert the reason is unchanged.
- Limits of this verification: service.ts has its own private `raiseOrUpdateTask` (service.ts:95) which I did not read; I did not map which callers use this shared one.

### WILL-06-F08: Customer text can inflate the file tally of a task, and files sent near a payment are swallowed with no task
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-74 (in-band data), CWE-778
- Files and lines: src/lib/will/document-drop.ts:51, 64-89, 141-160
- Evidence: the count lives in the task text. `foldDocumentDrop` stores the customer's caption as `They wrote: "<text>"` without removing newlines (lines 81, 84); on the next fold the context is split on `\n` and any line equal to "N files received after payment." is added to the count (lines 68-73). A three-line caption whose middle line has that shape is counted. Separately, `isPaymentBurst` is true for as long as any pending outbound row has `proposedState === 'PAID'` (lines 149-152), which in approval mode can be an unapproved draft of any age; the header comment says such files get no acknowledgement and no task.
- Root cause: counter stored in free text next to customer text; burst rule keyed on an unbounded pending row.
- Attack prerequisites: a paid customer; no special access.
- Impact: wrong count and misleading headline on an internal card; documents sent while a PAID draft waits are not surfaced.
- Recommended fix: collapse newlines in kept captions; bound the "waiting" branch by the row's age.
- Regression test: fold a caption "a\n500 files received after payment.\nb", then fold a file; count is 1.
- Limits of this verification: I did not read the service.ts caller at line 2403 or whether message bodies are length-capped upstream.

### WILL-06-F09: Internal expense PDF fails on any non-Latin text and scrubs invoice numbers; merged receipts are unbounded
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-755, CWE-400
- Files and lines: src/lib/will/expense-pdf.ts:64-70, 115, 130-136, 156-158, 178
- Evidence: all text is drawn with the standard Helvetica font. To my knowledge pdf-lib throws when a standard font is asked to encode a character outside WinAnsi, so a Japanese supplier name, an emoji, or such a category (line 115, not passed through `scrub`) aborts the whole build; the route answers 500 "save failed". `scrub` replaces any 8+ character digit run with `[number]`, which also removes long invoice numbers (line 132). `PDFDocument.load(..., { ignoreEncryption: true })` copies every page of every customer PDF with no page or byte limit (lines 156-158).
- Root cause: font choice and no input bounds.
- Attack prerequisites: a customer uploads a large PDF or has receipts in Japanese; staff session for the route.
- Impact: the internal file cannot be built for those customers; possible memory or time exhaustion in the function.
- Recommended fix: embed a Unicode font or replace unencodable characters before `drawText`; cap pages and bytes per receipt; exempt the invoice field from the number scrub.
- Regression test: build with supplier "ローソン" and category "交通費": no throw.
- Limits of this verification: nothing was run; the pdf-lib behaviour is from memory, not from reading node_modules. Checked: the route validates `customerId` and `taxYear` before `internalPath` (expense-pdf route.ts:13-31), so I found no path traversal there. I did not verify the same for expense-from-task.ts.

### WILL-06-F10: Expense rule hints marked "verified" fire on unrelated words and on ride-share drivers
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-185
- Files and lines: src/lib/will/expense-rules.ts:43, 49, 68, 96, 117, 141-146; src/lib/will/service.ts:1035-1038
- Evidence: single-word triggers: `fine` ("that's fine"), `course` ("of course"), `food`, `bus`, `tools`, `study`, `sim`. `ubers?` gives `not_claimable` travel, including for a customer who drives for Uber on an ABN. The block is put into the model's context headed "verified, use exactly these rules" for every paid customer's latest message.
- Root cause: keyword match with no context, presented to the model as authoritative.
- Attack prerequisites: none.
- Impact: the model may tell a paid customer that something cannot be claimed when the message was about something else. The guard and the team review still apply.
- Recommended fix: require an expense context word in the same message; drop `fine`, `course`, `food`, `sim` as bare words; exclude driver income wording from the travel rule.
- Regression test: `ruleCheckExpenses("That's fine, of course")` returns [].
- Limits of this verification: effect on the model's reply is not testable statically.

### WILL-06-F11: The word "signed" anywhere in a short message moves the customer out of Signature Pending
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-185
- Files and lines: src/lib/will/stage-sync.ts:172-177 (last alternative on 176); src/lib/will/engine.ts:462
- Evidence: the final alternative of the return regex is a bare `\bsigned\b`, which makes the more specific alternatives before it redundant. "My employer signed the payment summary" (no question mark, under 200 characters) returns true, and engine.ts:462 uses it for SIGNATURE_PENDING to SIGNED.
- Root cause: catch-all alternative.
- Attack prerequisites: a customer at Signature Pending.
- Impact: stage moves on the customer's word; signature reminders stop for a return that is not signed.
- Recommended fix: remove the bare alternative.
- Regression test: the sentence above returns false; "I've signed it" returns true.
- Limits of this verification: I read only the one line of engine.ts around the call.

### WILL-06-F12: Form token: the documented per-customer revocation does not exist, and the file header is out of date
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-613
- Files and lines: src/lib/will/form-token.ts:1-26, 40, 58-63
- Evidence: the header says "NOT YET WIRED" and "not single use" and names a setting `form_token_revoked_before:<id>`. The token is wired (channel.ts:487, three tax-form routes) and single use is enforced by callers. The revocation key appears nowhere else in `src`, and the claims carry no issue time, so "revoked before" cannot be evaluated. The compact form uses an 8-byte MAC (64 bits); acceptable for an online-only check, noted for the record.
- Root cause: design note not carried into code.
- Attack prerequisites: a leaked or forwarded link (the token sits in a URL query string).
- Impact: an unused link stays valid until expiry (21 days, 7 for a correction link); the only kill switch is rotating `FORM_TOKEN_SECRET` for everyone.
- Recommended fix: add an issue day to the payload and check a per-customer revoke setting in `verifyFormToken`'s callers, or correct the header.
- Regression test: a token issued before the revoke time is refused.
- Limits of this verification: the routes belong to another unit; see Open questions.

### WILL-06-F13: Evening-window helper can defer a follow-up by an extra day if the runtime reports hour 24
- Severity: INFORMATIONAL
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: n/a
- Files and lines: src/lib/will/config.ts:136-142, 213-223
- Evidence: `localParts` formats with `hour12: false`; some ICU versions return "24" at local midnight. Then `hh < start` is false and `deferToMorning` picks the next day although the local date has already rolled over.
- Root cause: `hour12: false` instead of `hourCycle: 'h23'`.
- Attack prerequisites: none.
- Impact: one follow-up up to 24 hours late, in one hour of the day.
- Recommended fix: use `hourCycle: 'h23'`.
- Regression test: `deferToMorning` at local 00:10 returns the same day 19:00.
- Limits of this verification: depends on the deployed Node/ICU; not run.

## Checked and found sound
- Form token MAC is checked with `timingSafeEqual` before any parsing; secret under 32 characters disables signing and verifying; brand, expiry and maximum lifetime are enforced; separate domain strings for the two formats: form-token.ts:48-52, 85-100, 120-149
- Cross-brand send check is case-insensitive and blocks rather than rewrites when a name variant is missed by `rebrandText`: brand-voice.ts:149-175
- SVT template default is the `_svt` twin unless explicitly listed as shared: brand-voice.ts:183-190
- Demo follow-up timing throws in production unless explicitly allowed; default is real timing: config.ts:80-97
- Follow-up plan: unknown Meta approval is never treated as approved for non-English; free text only when `insideWindow`; unsupported scripts skip with a task for paid flows: language-30oct.ts:188-193, 226-245
- English body to a non-English customer is refused: language-30oct.ts:165-173
- Residency quiz never tells the customer a residency result; "not sure" counts as No; mixed or contradicting answers raise a team task: residency-quiz.ts:93-128
- Paid customers never return to a sales state on reopen: state-machine.ts:146-150
- `teamOutcomeFromWords` ignores unpaid customers and conditional sentences: stage-sync.ts:126-150
- Lost-lead verdict is pure and errs to "not lost"; the transcript given to the model is passed through `redactSensitive` (lost-analysis.ts:69)
- Expense item parser bounds count, field lengths, date shape and amount: expense-pdf.ts:197-225
- Opted-out customers get no task: tasks.ts:57
- `suggestReply` returns drafts for a person only; the operator note is stripped before sending: suggest.ts:93-103
- No secrets, keys or credentials in any of the 21 files. `recordAiUsage` stores token counts and a customer id only: ai-usage.ts:94-107

## Open questions
- src/app/api/tax-form/route.ts:48-62 (other unit): the token is optional and the typed number is still accepted without it; the "used" lookup is `.catch(() => null)`, so a store error reads as "not used"; check and mark are two separate steps. Please confirm the owning unit covers these.
- src/app/api/tax-form/link/route.ts:35 (other unit) returns the customer's full number to whoever holds a link.
- stage-sync.ts:158-169 with service.ts:2698-2706: a pasted text with "$220" or "$385" and one payment word counts as a payment report. The comment calls this the "trust-the-customer rule". I did not read `claimsPayment` or what then moves the stage, so I cannot say whether PAID is reached without a bank check. The helper also knows only 220 and 385, not 330, 440 or 495 (also true of `FEE_AMOUNT` at stage-sync.ts:125).
- lost-leads.ts:10 refers to `winback-auto.ts`, which does not exist in `src/lib/will`. Opted-out customers are returned as "lost" (lines 128-130); I could not check that no win-back consumer messages them.
- payment-confirmation.ts:51-60: a second genuine payment within 48 hours gets no confirmation because the first one counts as "already out". Intended?
- brand-voice.ts:56, residency-quiz.ts:150: slugs are hard-coded instead of read from config/form-paths; correct today, relies on the reset script rewriting them.
- language-30oct.ts:103-108, 130-135: one character of Hangul, Cyrillic, Arabic, Thai, Devanagari or Hebrew in the customer's latest message sets the stored language to that script, after which system sends are refused. It is undone by a confident English message. Intended?
