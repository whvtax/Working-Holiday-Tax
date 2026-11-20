| finding ids | severity | real today? | devil's advocate (one line) | decision | exact fix or what the owner must do |
|---|---|---|---|---|---|
| WILL-05-F01 | MEDIUM | Yes. form-link.ts:138-142 sets `income` before the state gate at :159; tax-form/route.ts:308-311 keeps the phone match unless `FORM_TOKEN_ENFORCE === 'true'`; the SVT branch (route.ts:259) always uses the phone match; auto-relink at form-link.ts:294-310 | The code comment (form-link.ts:144-158) already records this as a known product limit; the income-from-form rule is a dated owner rule (28 Sep); lead states only set one flag; the cure is an env switch, not code | NEEDS_OWNER | Set `FORM_TOKEN_ENFORCE=true` in Vercel once old open links are done, and decide (a) whether SVT forms get the token check and (b) whether the form's ABN answer may change `income` for a customer matched by phone only |
| WILL-05-F02 | MEDIUM | Yes. service.ts:2784 calls `expectedFeeAud({ income })` only; service.ts:2982 skips "short" when the paid amount is any fee (`amountMatchesFee`) | The escape exists because the expected fee does not know foreign income, review or years, so removing it would chase correctly paying customers for money; trust-the-customer is the owner's rule; worst case is $165 to $275 on one return and the team sees the file before lodging | NEEDS_OWNER | Decide: when the paid amount is one of our fees but lower than this customer's track or quote (e.g. $220 on TFN + ABN, $220 on a $330 quote), should Will raise a REVIEW task (still moving to Paid) or ask for the rest |
| WILL-05-F03 | MEDIUM | Yes, by design. payment-proof.ts:165-169, service.ts:2878-2918 | Dated owner decision (30 Oct): an unreadable DOCUMENT in a payable state is trusted like a typed "paid" and a verify task is raised; a caption-less picture is not trusted; header of payment-claim.ts states the exposure is one return's work | NO_FIX | Owner decision, documented in code; a person is asked to verify every such case |
| WILL-05-F04 | MEDIUM | Yes, and easier than reported: store-supabase.ts:1041-1049 `getSetting` does not throw on a database error, it returns undefined, so review-asks.ts:47-55 reads `{}` and writes one entry over all | Needs a failed read followed at once by a successful write; scheduler.ts:1609 also checks the chat for an earlier ask; not attacker driven | NEEDS_OWNER | Needs a database change (one row per customer, or an atomic JSON merge function) and a migration; a code-only fix cannot tell a failed read from an empty register because the store hides the error for every key except `kill_switch` on purpose |
| WILL-05-F05, WILL-07-F11 | MEDIUM / LOW | Yes. reviewer.ts:142-159 sends 16 turns unredacted; digest.ts:13 `LONG_DIGITS` allows only spaces and hyphens inside a number | Reviewer: the main reply call already sends the same chat to the same processor, so redacting only the second check protects nothing and blinds it. Redaction: widening the digit rule to dots and slashes would eat dates and amounts ("the words that make a question useful", mode-digest.test.ts) | FIX_NOW (narrow) | Reviewer part: no change. Redaction part: add one extra pattern for an identifier written with dots or slashes in 3-3-2/3 groups (the TFN shape), see details. Names, addresses, dates of birth and BSBs stay as they are (would over-redact) |
| WILL-05-F06 | LOW | Yes, and deeper than reported: store-supabase.ts:702-709 `listMessages` itself returns `[]` on a database error, so changing `messagesOf` (followup-gate-30oct.ts:252) would do nothing | Documented design choice ("a gate must never be the reason a send crashes"); needs a read to fail and the send's own database writes to succeed moments later; a real fix means making the store throw, which touches every caller | NO_FIX | Not attacker driven, tiny window, and the only real fix (store throws on error) is a wide behaviour change |
| WILL-05-F07 | LOW | Yes. form-link.ts:408 stores the typed number whole; the matched path masks (form-link.ts:268-274) | The audit log is behind the CRM login and the same number is in the task anyway | FIX_NOW | Store only the last four digits in the audit row; the task keeps the full number for "Link to chat". Nothing reads `waNumber` from this audit row (grep). See details |
| WILL-05-F08 | LOW | Yes. text-normalize.ts:455-474, followup-gate-30oct.ts:39-47 | The list is owner driven (21 Oct) and tuned on an eval set (15 Nov) with broad phrases left out on purpose; a question or buying signal cancels it; any later real message reopens the lead (declinedInChat) | NO_FIX | Tuned owner rule; a wrong close only stops sales nudges and undoes itself on the next message |
| WILL-05-F09 | LOW | Yes. knowledge.ts:15-26, daily-digest.ts:218-246 | Written decision 004: one shared Library, "Mia knows everything Will knows"; mined entries are drafts that a person approves; brand names and URLs are rewritten or blocked at send (brand-voice) | NO_FIX | Deliberate owner decision (004) |
| WILL-05-F10 | INFORMATIONAL | Yes. reviewer.ts:175-224 | By design the second check is advisory; the deterministic guard re-checks any revised text (service.ts:1100-1107) | NO_FIX | Not a control; nothing to change |
| WILL-06-F01 | MEDIUM | No | n/a | ALREADY_FIXED | brand-voice.ts:223-224: `FORM_LINK_ANY_BRAND` now has `(?:(?:de\|ja\|fr\|it\|es\|zh\|vi)\/)?` before the slug |
| WILL-06-F02 | MEDIUM | Yes. attention-report.ts:166 prints `c.name` and `c.waId`; bodies, drafts, task text and reasons at :62, :137, :146-148, :156-158 are not redacted | Only a logged-in owner can download it and she may like seeing the name | FIX_NOW | Apply the owner's own 15 Nov export rule (route.ts:17-19 and :174-176, "no name and no phone number in the file: the id is enough") to this mode of the same route: header becomes the `cN` ref plus the conversation id, and every free text passes `redactSensitive`. See details. Limit: a name typed inside a message or a task reason is not removed |
| WILL-06-F03 | MEDIUM | No | n/a | ALREADY_FIXED | already-checked.ts:107-109: `NOT_LODGED_RE` (18 Nov) drops negated sentences |
| WILL-06-F04 | LOW | Yes. already-checked.ts:45-63; engine.ts:1104 English only | The owner narrowed this rule on 3 Nov after it wrongly took the guarantee away; failing toward "guarantee kept" is the chosen direction; exposure is one fee difference | NO_FIX | Deliberate fail direction (Jo, 3 Nov) |
| WILL-06-F05 | LOW | Yes. send-failure-30oct.ts:106 `FORM_URL_RE = /\/tax-form\b\|\/form\b/`; the live slug in config/form-paths.js is `start` | A task is still raised by recordSendFailure and the payment confirmation is caught by its own rule | FIX_NOW | Also accept `FORM_LINK_ANY_BRAND` (current and retired slugs, both brands, language prefixes). See details |
| WILL-06-F06 | LOW | Code as described (payment-confirmation.ts:134-138, 183-184), but covered | The stranded-outbound sweep (scheduler.ts:2328-2352) marks any QUEUED/SENDING row older than 15 minutes FAILED and raises an URGENT task; after that `confirmationRescue` sees FAILED and resends | NO_FIX | Another sweep already resolves stuck SENDING rows |
| WILL-06-F07 | LOW | Yes. tasks.ts:71 replaces the reason, :74 keeps the higher severity | The card stays URGENT and the earlier text stays in the context; 37 call sites share this helper and service.ts has its own copy; several sweeps look tasks up by reason prefix; tests cannot be run in this pass | NEEDS_OWNER | Decide whether an open URGENT card keeps its first headline when a lesser event folds in (one line in tasks.ts:71 and the twin in service.ts), and have the test suite run on it |
| WILL-06-F08 | LOW | Yes. document-drop.ts:64-89, 141-152 | A customer gains nothing by inflating an internal file count; the payment-burst rule is the documented design (files around a payment belong to the payment) | NO_FIX | Internal card text only, no customer, money or data effect |
| WILL-06-F09 | LOW | Unverified (needs a run). expense-pdf.ts:115-158 as described | Internal staff tool; a failure is a visible "save failed", not a wrong file; pdf-lib behaviour was not confirmed | NEEDS_OWNER | Have someone build one internal expense PDF with a Japanese supplier name; if it fails, choose between embedding a Unicode font and replacing unsupported characters, and set a page cap for merged receipts |
| WILL-06-F10 | LOW | Yes. expense-rules.ts:43, 49, 96, 117 | It is a hint in the model's context, not a sent text; the guard and the team review still apply; the travel rule text itself says other travel "can be different" | NEEDS_OWNER | Tax wording: decide whether bare `fine`, `course`, `food`, `sim` stop being triggers and whether ride-share drivers on an ABN are excluded from the "travel not claimable" hint |
| WILL-06-F11 | LOW | Yes. stage-sync.ts:176 ends in a bare `\bsigned\b` | The bare word is what catches real replies such as "Signed Thankyou" (report of 11 Nov, report-11nov.test.ts:19); the team cannot lodge without the actual signature in the signing platform | NO_FIX | Removing it loses real "signed" replies; the only cost today is a stopped reminder |
| WILL-06-F12 | LOW | Yes. form-token.ts:2 says "NOT YET WIRED" and :22-23 names a revoke setting; `form_token_revoked_before` appears nowhere else in src | 21-day (7 for a correction) expiry, brand claim and single use in the callers already bound a leaked link | FIX_NOW (comment only) | Correct the header so nobody relies on a revocation that does not exist. Building revocation is a separate owner choice. See details |
| WILL-06-F13 | INFORMATIONAL | Plausible. config.ts:139 uses `hour12: false`; handoff-reasons.ts:622 already uses `hourCycle: 'h23'` | One follow-up up to a day late in one hour of the night, on some runtimes only | FIX_NOW | Use `hourCycle: 'h23'` so local midnight is 0, never 24. See details |
| WILL-07-F01 | MEDIUM | Yes, and wider than reported: scheduler.ts:648-651 returns `'wht'` on a throw AND when `getCustomerById` returns null on a database error (store-supabase.ts:479-482 does not throw) | Needs the SVT line on, Autopilot, and one read failing while the reads a moment later succeed; the send still uses the stored brand and the cross-brand check blocks WHT names to a student | NEEDS_OWNER | Approve a scheduler change before SVT runs on Autopilot: when the brand read fails or returns no row, put the job back instead of running it as WHT (touches job retry behaviour, needs the test suite) |
| WILL-07-F02 | LOW | Yes. knowledge-i18n.ts:138-142 `BRIDGE[w]` and knowledge.ts:200-201 `EXTRA_BRIDGE[w]` are plain objects; the word "constructor" returns a function and `.forEach` / spread throws | Callers catch it, so the only effect is a reply written without Library answers for that message | FIX_NOW | Check `Array.isArray` before use in both places. See details |
| WILL-07-F03, WILL-07-F04 | LOW | Yes. foreign-income.ts:36-40 has no question handling; abn-income.ts:41 skips a whole sentence that ends in a question mark | Each errs in the opposite direction and each fix moves the error to the other side ("I have foreign income, is it more?" would then be missed); both feed prices set by the owner (12 Oct, 3 Nov) | NEEDS_OWNER | Pricing rule: decide which way to err when income is mentioned inside a question: (a) "Do I need to report foreign income?" quoted $330 or $220; (b) "I have an ABN, is that more expensive?" counted as ABN income or not |
| WILL-07-F05 | LOW | Yes. Full number with a first name in the comments at long-message.ts:4 and identity-question.ts:115; partial numbers with first names in about 20 more comment lines under src/lib/will | They are the owner's own incident notes, visible only to people with repository access | NEEDS_OWNER | Approve replacing customer first names and phone numbers in code comments with case ids (the exact text cannot be quoted here without repeating the numbers), and decide whether older copies of the source need cleaning |
| WILL-07-F06 | LOW | Yes. invoice-extract.ts:78-103 never calls `aiBudgetExhausted` | It only runs when a logged-in person presses the button for one task, 50 files at most; the daily budget exists to cap automatic, customer-driven spend; a stolen CRM session is already total loss | NO_FIX | Explicit staff action, bounded per request |
| WILL-07-F07 | LOW | Yes. access-log.ts:39 `crm_file: ['pathHash']`; callers pass `action`, `taskHash`, `built` (expense-pdf/route.ts:48, from-task/route.ts:68), all dropped by `clean()` | It is only a thinner log line | FIX_NOW | Add the three keys to the whitelist; their values already fit the safe shapes. See details |
| WILL-07-F08 | LOW | Yes. audit-config.ts:77-81 alerts are off unless the env variable is "1" or "true"; security-alerts.ts:46 sets the throttle before the send | Opt-in is the written design; the throttle-first order stops two parallel requests sending two emails, and serverless memory resets it anyway | NEEDS_OWNER | In Vercel set `SECURITY_ALERT_BULK_EXPORT`, `SECURITY_ALERT_SIGNATURE_BURST`, `SECURITY_ALERT_KILL_SWITCH` and `SECURITY_ALERT_CRON_STALE` to `true` (and check the admin email is set). No code change |
| WILL-07-F09 | LOW | Yes. http.ts:8-11 | Both routes are behind the session; the platform caps a request body anyway; worst case is a few hundred KB of memory for a logged-in caller | NO_FIX | Cost of the fix is higher than the harm |
| WILL-07-F10 | LOW | Yes. brand-context.ts:46-54 | Only Meta-signed deliveries for numbers on our own Meta app get this far; the permissive default is the kept pre-SVT rule (comment :43-44); dropping deliveries with no number id risks losing real customer messages | NO_FIX | Deliberate; reachable only through a configuration mistake on our own Meta app |
| WILL-07-F12, WILLDATA-01-F05 | INFORMATIONAL / MEDIUM | Yes. Bank details typed out in many message files, six seed answers and the zh/vi rule blocks | They are the business's own public receiving details inside owner-approved wording; the guard blocks any bank detail that is not ours at send time (policy-guard.ts:1299 `WRONG_BANK_DETAILS`), so after an account change a stale copy is stopped, not sent | NO_FIX | A refactor of every approved text for a rare event that already fails safe |
| WILLDATA-01-F01 | HIGH | Yes. Unqualified guarantee sentence at knowledge-seed.ts:1626, 1868, 1980, 2034, 2131, 2480, 2555, 2845, 3131 | The guard blocks the sentence once the customer has named ABN income, foreign income or a lodged return (policy-guard.ts:1610, guarantee-barred.ts) and entry 4615 states the limit; the gap is only before the customer says which income they have | NEEDS_OWNER | Owner's wording: decide whether these nine answers get "On the TFN only option" in front of the guarantee sentence (as 1955 already has) or lose the sentence; 2131 quotes $385 and the guarantee together |
| WILLDATA-01-F02 | HIGH | Yes. knowledge-seed.ts:1296 and 2715 give one fixed temporary password; allowed by policy-guard.ts:1139-1143 | Recorded owner decision (30 Oct, "Jo, confirmed"): it is the signing platform's own temporary password and telling the customer is fine | NEEDS_OWNER | Check with the signing platform: does this temporary password force a change at first login, and can it open an account that already holds a return? If not, remove the sentence from both answers and keep only "Forgot password" |
| WILLDATA-01-F03 | MEDIUM | Yes. knowledge-seed.ts:1608, 1824, 2817 | Each answer restates the genuine details, so a customer holding other numbers sees the difference; the answers exist because banks' payee warnings were losing real payments | NEEDS_OWNER | Owner's wording: decide whether to drop "Yes, confirmed" / "even if your bank shows a different name" and use the 1502 pattern (restate, ask them to compare, send a screenshot if different) |
| WILLDATA-01-F04 | MEDIUM | Yes. knowledge-seed.ts:4131, 4544, 4569, 4614 ask for name, BSB and account number in the chat | Refunds are rare and there is no other collection step today; the alternative needs a form or a staff process | NEEDS_OWNER | Decide how refund bank details are collected (secure form, or the verified account already on file from the questionnaire) and reword the four answers to match |
| WILLDATA-01-F06 | MEDIUM | Yes. knowledge/route.ts:62-107 `import_starter` does not call `knowledgeViolations` (the free `import` branch was fixed on 18 Nov, route.ts:117-127) | The seed is the owner's curated pack in the repository, checked by a unit test and loaded only by a logged-in person; guarding it would silently park approved answers as drafts and leave Will without them | NO_FIX | The seed is trusted, reviewed content; its wording issues are the separate owner rows here |
| WILLDATA-01-F07 | MEDIUM | Yes. e.g. knowledge-seed.ts:27 ("within 14 business days"), 3681 ("within 24 hours"), 1896 (customer and country counts), 3629 ("usually have more time") | These are the owner's own answers; which side is right, the seed or the newer language rules, is not a code question | NEEDS_OWNER | Go through the listed answers (27, 1547, 1635, 1733, 1896, 2343, 2502, 3182, 3286, 3522, 3629, 3681, 4181, 4279, 4467, 4649) against the language rules of 18 Nov and say for each: reword, or change the rule |
| WILLDATA-01-F08 | MEDIUM | Yes. knowledge-seed.ts:1809 and 3394 against 503, 2106, 2166, 2687, 4302 | Each answer was right for the day it was written | NEEDS_OWNER | Decide the one Medicare position, in particular whether a screenshot of a submitted (not approved) application is enough to lodge with the exemption, then retire the answers that say otherwise |
| WILLDATA-01-F09 | MEDIUM | Yes. knowledge-seed.ts:4353; no linking code exists in src/lib/will (per the report's grep) | Nothing in the software links anything; the risk is only a person acting on the promise | NEEDS_OWNER | Owner's wording and procedure: decide the identity check staff do before joining a new number to an old file, and reword the answer to say the team will verify first |
| WILLDATA-01-F10 | LOW | Yes. knowledge-seed.ts:2079, 2057, 3368, 2845 | Reassurance lines the owner wrote | NEEDS_OWNER | Confirm three facts: the passport really is deleted after the identity check (2079), the bank document is an ATO requirement (2057, 3368), and "whether to lodge is then your decision" (2845) is what the tax agent wants said |
| WILLDATA-01-F11 | LOW | Yes. knowledge-seed.ts:4653 (15% working holiday maker withholding) has no brand tag, so Mia can use it | Decision 004 makes untagged entries shared on purpose | FIX_NOW (4653 only) | Add the tag `brand:wht` to 4653 (tag only, wording untouched; `applyBrandTags` in seed.ts merges it into the database). 4649 and 4650 say only "depends on your situation" and stay shared |
| WILLDATA-01-F12 | LOW | Yes. Examples at knowledge-seed.ts:984, 1195, 3004, 3542-3544, 3917 | No name, number, email, TFN or bank detail anywhere in the file; the examples are what the matching runs on | NO_FIX | No identifier present; rewording examples changes retrieval |
| WILLDATA-01-F13 | LOW | Yes. Tax year at knowledge-seed.ts:80, 818, 1128; cents per km and cap at 793 and five more; $300 at four | Correct for the current year and tagged as checked | NEEDS_OWNER | Tax facts: confirm the per-km rate, the km cap and the $300 threshold against the ATO each July, and decide what prior-year customers are told |
| WILLDATA-01-F14 | LOW | Yes. language-rules.generated.ts fr block (extra $110 / $165 amounts), agent-question and emoji rules differ by language, guard-coverage notes are in the prompt | The file is generated from the per-language documents by scripts/build-language-rules.mjs; editing it by hand is undone by the next build; the differences are per-language wording | NEEDS_OWNER | Decide in the source documents (docs/engineering/language-blocks): one amount list for all languages, one agent-question rule, and removal of the "not checked by the guard" notes; French needs a native check |
| WILLDATA-01-F15 | INFORMATIONAL | Yes. Comment at knowledge-seed.ts:3210-3216 against the answers at 1626, 1980, 2845, 1083, 2459, 2607, 4625, 2746, 2759, 3131 | Only a stale comment | NEEDS_OWNER | Confirm the four topics are decided (fee when tax is owed, DASP, closed bank account, free eligibility check) and which wording wins: "registered tax agent" or "tax professional", payslips needed or not |

## FIX_NOW details

### 1. WILL-05-F05, WILL-07-F11: one more redaction shape
File: `src/lib/will/digest.ts`

Existing:
```
    .replace(EMAILISH, '[email removed]')
```
Replace with:
```
    .replace(EMAILISH, '[email removed]')
    // 18 Nov (audit WILL-07-F11): an identifier typed with dots or slashes (123.456.789).
    .replace(/\b\d{3}[./]\d{3}[./]\d{2,3}\b/g, '[number removed]')
```
Does not match dates (2/2/4), amounts or tax years, so the "leaves an ordinary sentence alone" tests are untouched.

### 2. WILL-05-F07: no full number in the audit row
File: `src/lib/will/form-link.ts`

Existing:
```
        await store.audit('system', 'form_received_unmatched', { waNumber, formKind });
```
Replace with:
```
        await store.audit('system', 'form_received_unmatched', { waTail: String(waNumber ?? '').replace(/\D/g, '').slice(-4), formKind });
```

### 3. WILL-06-F02: attention report without name, number or raw text
File: `src/lib/will/attention-report.ts` (nine replacements, each existing text occurs once)

a. Existing: `if (reason) bits.push(`reason: ${reason.slice(0, 200)}`);`
   New: `if (reason) bits.push(`reason: ${redactSensitive(reason).slice(0, 200)}`);`

b. Existing: `${String(m.body ?? '[attachment]').slice(0, 400).replace(/\n/g, ' ')}`
   New: `${redactSensitive(String(m.body ?? '[attachment]')).slice(0, 400).replace(/\n/g, ' ')}`

c. Existing: `${String(prev.body ?? '[attachment]').slice(0, 400).replace(/\n/g, ' ')}`
   New: `${redactSensitive(String(prev.body ?? '[attachment]')).slice(0, 400).replace(/\n/g, ' ')}`

d. Existing: `block.push(indent(String(m.body ?? '').slice(0, 1200), 6));`
   New: `block.push(indent(redactSensitive(String(m.body ?? '')).slice(0, 1200), 6));`

e. Existing: `if (m.meta?.review) block.push(`    Why: ${m.meta.review}`);`
   New: `if (m.meta?.review) block.push(`    Why: ${redactSensitive(String(m.meta.review))}`);`

f. Existing: `${t.status ?? ''}: ${t.reason ?? ''}`.replace(/ +/g, ' '));`
   New: `${t.status ?? ''}: ${redactSensitive(String(t.reason ?? ''))}`.replace(/ +/g, ' '));`

g. Existing: `if (t.context) block.push(indent(String(t.context).slice(0, 1500), 6));`
   New: `if (t.context) block.push(indent(redactSensitive(String(t.context)).slice(0, 1500), 6));`

h. Existing: `block.push(indent(String(t.suggestedReply).slice(0, 1200), 6)); }`
   New: `block.push(indent(redactSensitive(String(t.suggestedReply)).slice(0, 1200), 6)); }`

i. Existing: `out.push([[c.name, c.waId].filter(Boolean).join(' · '), `stage:`
   New: `out.push([`${ref} · Conversation ${c.id}`, `stage:`

`redactSensitive` is already imported in this file and `ref` is in scope in the loop. The existing test strings ("is it lodged?", "held: deadline wording", "Suggested") pass through unchanged.

### 4. WILL-06-F05: the send-failure repair knows the current form link
File: `src/lib/will/send-failure-30oct.ts`

a. Existing: `import type { Store, TaskRow } from './store';`
   New:
```
import type { Store, TaskRow } from './store';
import { FORM_LINK_ANY_BRAND } from './brand-voice';
```
b. Existing: `if (FORM_URL_RE.test(b) && /https?:\/\//i.test(b)) return 'form_link';`
   New: `if ((FORM_URL_RE.test(b) && /https?:\/\//i.test(b)) || FORM_LINK_ANY_BRAND.test(b)) return 'form_link';`

The old pattern stays, so the existing tests on `/tax-form` still pass. `brand-voice.ts` does not import this file (no cycle); `payment-confirmation.ts` already imports the same constant.

### 5. WILL-06-F12: form-token header says what is true (comments only)
File: `src/lib/will/form-token.ts`

a. Existing: ` * Form completion token (round 2 proposal AUTH-4 / F-1, NOT YET WIRED).`
   New: ` * Form completion token (round 2 proposal AUTH-4 / F-1). Wired: channel.ts puts it on form links and the tax-form routes verify it.`

b. Existing:
```
 * bound it; a per-customer revoke time (setting `form_token_revoked_before:<id>`)
 * can kill every earlier token. It carries no PII: a customer id is an opaque
```
   New:
```
 * bound it. There is NO per-customer revocation: the `form_token_revoked_before:<id>`
 * setting was never built, so rotating FORM_TOKEN_SECRET is the only way to kill
 * tokens already issued. It carries no PII: a customer id is an opaque
```

### 6. WILL-06-F13: local midnight is hour 0
File: `src/lib/will/config.ts`

Existing: `    hour12: false, timeZone: tz,`
New: `    hourCycle: 'h23', timeZone: tz,`

### 7. WILL-07-F02: a customer word can never be read as an object method
File: `src/lib/will/knowledge-i18n.ts`

Existing: `    if (hits) hits.forEach((t) => out.add(t));`
New: `    if (Array.isArray(hits)) hits.forEach((t) => out.add(t));`

File: `src/lib/will/knowledge.ts`

Existing: `    if (hit) out.push(...hit);`
New: `    if (Array.isArray(hit)) out.push(...hit);`

### 8. WILL-07-F07: the read log keeps the expense-PDF details
File: `src/lib/will/access-log.ts`

Existing: `  crm_file: ['pathHash'],`
New: `  crm_file: ['pathHash', 'action', 'taskHash', 'built'],`

### 9. WILLDATA-01-F11: the working holiday withholding answer is for WHT only
File: `src/lib/will/knowledge-seed.ts` (line 4653, tag only, answer text untouched)

Existing: `"backpacker", "45000"], "tags": ["post-payment", "tax", "ato-checked"], "lang": "en"}`
New: `"backpacker", "45000"], "tags": ["post-payment", "tax", "ato-checked", "brand:wht"], "lang": "en"}`

`applyBrandTags` (seed.ts) uses the count of brand-tagged seed entries as its marker, so the new tag is merged into the stored row on the next run.

Note: nothing was run in this pass (read-only); every FIX_NOW above should go through the test suite before deploy.
