# WILLDATA-01 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/will/knowledge-seed.ts | 4654 | 1-800, 801-1600, 1601-2400, 2401-3198, 3199-3958, 3959-4654 | REVIEWED |
| src/lib/will/language-rules.generated.ts | 12 (92,145 bytes; nine lines of 7-13 KB each) | Lines 1-2 and 12 whole. Long lines read by byte range: line 3 (en) 1-3000, 2900-13083; line 4 (de) 1-3000, 2900-10207; line 5 (es) 1-3000, 2900-10223; line 6 (fr) 1-3000, 2900-10481; line 7 (it) 1-3000, 2900-9561; line 8 (pt) 1-5500, 5400-7059; line 9 (ja) 1-3000, 2400-10336; line 10 (zh) 1-3000, 2700-10574; line 11 (vi) 1-3000, 2800-10448 | REVIEWED |

Other files opened to judge findings (partial reads only, not reviewed as part of this unit):
- src/app/api/will/knowledge/route.ts lines 1-125 (how the seed is imported)
- scripts/build-language-rules.mjs (whole, 29 lines)
- src/lib/will/playbook.ts lines 735-760 (how library answers and language rules enter the prompt)
- src/lib/will/knowledge.ts lines 10-40 (brand tag filter)
- src/lib/will/seed.ts lines 425-470 (brand tag backfill)
- src/lib/will/__tests__/policy-guard.test.ts lines 360-392 (guard test over the seed)
- grep hits only in src/lib/will/policy-guard.ts (lines 687, 1086, 1139-1143, 1300, 1341, 1344, 1610) and src/lib/will/brand-voice.ts (lines 56-60, 73, 80)

Facts about the data: 218 seed entries, all `lang: "en"`. No em or en dashes in the seed. Dollar amounts in answers are only $220, $385, $330, $440, $495 and the $300 no-receipt threshold.

## Findings

### WILLDATA-01-F01: Refund guarantee stated without the TFN-only limit, including next to the ABN fee
- Severity: HIGH
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (content); delivery to an ABN customer REQUIRES_RUNTIME_VALIDATION
- CWE: n/a (business-logic)
- Files and lines: src/lib/will/knowledge-seed.ts:2131, 2845 (with example at 2842), 1626, 1868, 1980, 2034, 2480, 2555, 3131
- Evidence: Nine answers carry "if your refund is less than our fee, we refund the difference" with no TFN-only condition. Line 2131 quotes both fees ("$220 ... or $385 if you also had ABN income") and then gives the guarantee for "the fee". Line 2845 is the answer for a question whose examples include an ABN customer who owes tax asking for the fee back (line 2842), and it gives the unqualified guarantee. Only 1955, 2529, 2582, 4614 and 4615 state the limit correctly.
- Root cause: The guarantee sentence was pasted into objection answers that are not tied to a chosen option. The language block (language-rules.generated.ts line 3, section 6) says the sentence appears only in TFN price messages and is never applied to ABN, foreign income or a lodged return; the seed contradicts it.
- Attack prerequisites: None. Any pre-payment customer with ABN or foreign income who asks one of these questions.
- Impact: A written promise to refund the fee difference to customers the guarantee does not cover; refund claims and disputes, misleading-conduct exposure.
- Recommended fix: Add "On the TFN only option" to each of the nine answers, or remove the sentence from them and leave it to the price message and to entries 4614/4615. Rewrite 2131 so the guarantee is attached to the $220 option only.
- Regression test: For every seed answer matching the guarantee sentence, assert the same answer contains "TFN only"; assert no answer contains both "$385" and the guarantee sentence unless it also says the ABN fee is fixed.
- Limits of this verification: A guard code `GUARANTEE_NOT_ALLOWED` exists (policy-guard.ts:1610) and fires when `ctx.guaranteeBarred` is set. I did not read when that flag is set; before the customer has named ABN income it is unlikely to be set, which is exactly the case in 2131.

### WILLDATA-01-F02: One fixed, trivial password for customers' signing accounts is handed out in chat
- Severity: HIGH
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-1392 (use of default credentials), CWE-798
- Files and lines: src/lib/will/knowledge-seed.ts:1296, 2715 (value not reproduced here); whitelisted in src/lib/will/policy-guard.ts:1139-1143 (constant `XERO_DEFAULT_PWD`)
- Evidence: Two answers tell the customer that the signing platform "may have created an account" and to "try the password" followed by one fixed nine-digit sequence. The guard has an explicit exception that allows exactly this password to be sent.
- Root cause: Accounts on the e-signature platform appear to be created with the same default password for every customer, and the bot is the distribution channel for it.
- Attack prerequisites: Knowing or guessing a customer's email address. The password is the same for all customers, is trivially guessable, and is now also in source code, the knowledge table and chat history.
- Impact: If the suspicion holds, a third party can open another customer's signing account and read or sign their tax return (name, TFN, income, bank details).
- Recommended fix: Stop creating accounts with a shared password; use the platform's per-recipient magic link or forced reset. Remove both answers' password sentence and the guard exception, and keep only the "Forgot password" route.
- Regression test: Assert no seed answer and no approved text matches a digit run of six or more next to the word "password"; assert the guard blocks any reply that states a password.
- Limits of this verification: I could not see how the signing accounts are created (outside this unit, possibly outside the repo). The text says "may have created", so the default may apply only to some accounts.

### WILLDATA-01-F03: Answers tell customers to override their bank's payee-mismatch warning and open with "Yes, confirmed"
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-356 (product UI does not warn of unsafe actions), CWE-451
- Files and lines: src/lib/will/knowledge-seed.ts:1608, 1824 (examples 1818-1822), 2817; contrast 1502
- Evidence: 1608 says "those are definitely our details" and that after a bank warning "you can go ahead"; 2817 says "this is the correct account even if your bank shows a different name"; 1824 begins "Yes, confirmed." for the question "is BSB ... account ... really your account?". Entry 1502 gives the safer instruction (send a screenshot and we check).
- Root cause: Canned reassurance matched by keywords, not by comparing the numbers the customer actually typed.
- Attack prerequisites: A customer who has been given different bank details by an impostor (fake profile, spoofed message) and asks Will to confirm them, or whose bank flags a mismatch for a real reason.
- Impact: Will may answer "Yes, confirmed" or "go ahead" to a customer who is about to pay a fraudster. The answer does restate the genuine numbers, which limits but does not remove the risk.
- Recommended fix: Remove "Yes, confirmed" and "even if your bank shows a different name". Use the 1502 pattern in all four entries: restate the details, ask the customer to compare them character by character, and send a screenshot if anything differs. Add an engine check that compares any BSB or account number in the customer's message with the real ones before a confirming answer is allowed.
- Regression test: Simulated customer message quoting a wrong account number plus "is this your account?" must not produce a reply starting with an affirmation.
- Limits of this verification: I did not read the retrieval or reply-selection code, so I cannot say whether the answer is sent verbatim. The Italian block says the guard blocks "bank details that are not ours" in outgoing text; that does not cover numbers in the incoming message.

### WILLDATA-01-F04: Customers are asked to type bank account details into the WhatsApp chat
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359
- Files and lines: src/lib/will/knowledge-seed.ts:4131, 4544, 4569, 4614
- Evidence: Four answers ask the customer to send "full name, BSB and account number here" (overpayment, fee refund, guarantee refund). Entry 1644 forbids only TFN and passport details in chat and names the secure form as "the only place we collect them".
- Root cause: The refund flow has no secure collection step, so the chat is used.
- Attack prerequisites: None; this is the normal flow.
- Impact: Customer bank details are stored in message history, shown in the dashboard, and included in later model prompts as conversation context. It also trains customers to send bank details over chat, which helps impostors.
- Recommended fix: Collect refund bank details through the secure form (or reuse the verified account already on file from the questionnaire) and change the four answers to say so.
- Regression test: Assert no seed answer asks the customer to send BSB or account number "here"/"in the chat".
- Limits of this verification: I did not check whether inbound messages are redacted before storage or before the prompt.

### WILLDATA-01-F05: The firm's bank details are hardcoded in the seed and in the prompt rules, with no single source
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-1051 (hard-coded data in multiple places)
- Files and lines: src/lib/will/knowledge-seed.ts:1502, 1608, 1819 (inside an example), 1824, 2792, 2817; src/lib/will/language-rules.generated.ts line 10 (zh, sections 4.6, 4.7, 4.8) and line 11 (vi, key `account_name`). A grep for the same numbers lists 19 further non-test files under src/lib/will (for example approved-messages.ts, account-name.ts, svt-fixed-texts.ts, engine.ts, policy-guard.ts).
- Evidence: Account name, BSB and account number are typed out in six seed entries and three times in the Chinese block and once in the Vietnamese block. The German block says bank details "come from the BANK constant ... and are never retyped in a reply"; the seed and the zh/vi blocks retype them. The seed copies are then written to the database by `import_starter`.
- Root cause: No single constant is interpolated into these texts.
- Attack prerequisites: None. Triggered by an account change, or by an edit to one copy.
- Impact: After a bank change, stale copies in the knowledge table and in the prompt keep telling customers to pay the old account. A wrong digit in any one copy sends payments elsewhere.
- Recommended fix: Keep the details in one constant; use a placeholder in seed answers and language blocks that the engine fills; add a test that the numbers appear in exactly one source file.
- Regression test: Grep test: the BSB and account number literals occur only in the one constants file.
- Limits of this verification: I did not check whether the guard would catch a mismatching copy at send time.

### WILLDATA-01-F06: `import_starter` makes all 218 seed answers active without running the content guard
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-20, CWE-1039
- Files and lines: src/app/api/will/knowledge/route.ts:62-107 (compare 145, 157, 168 where `knowledgeViolations` is called, and 109-118 where arbitrary imports default to draft); data in src/lib/will/knowledge-seed.ts:16-4654
- Evidence: The `import_starter` branch defaults `status` to `active` and calls `store.addKnowledge` / `store.updateKnowledge` for every seed entry with no call to `knowledgeViolations`. With `overwrite: true` it replaces the stored answer of any matching question. The only check on seed content is a unit test (policy-guard.test.ts:364-382) that asserts ten guard codes plus forbidden amounts in an unpaid context; it does not assert `AGENT_CLAIM`, `GUARANTEE_NOT_ALLOWED`, date promises or social proof.
- Root cause: The seed is treated as already approved.
- Attack prerequisites: A valid dashboard session (the route checks `sessionValid`). The real risk is not an attacker but an unreviewed edit to the seed file reaching customers in one click.
- Impact: Findings F01, F02, F03, F04, F07 and F08 reach the live library unfiltered.
- Recommended fix: Run `knowledgeViolations` on each seed answer in `import_starter` and skip or draft the ones that fail; return the list of failures. Extend the unit test to all content codes.
- Regression test: Import a seed entry containing a forbidden amount and assert it is not stored as active.
- Limits of this verification: Route lines 125 onward were not read in full. I did not run the unit test.

### WILLDATA-01-F07: Seed answers make time, refund and deduction promises that the language rules in the same prompt forbid
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (business-logic)
- Files and lines: src/lib/will/knowledge-seed.ts; rules in src/lib/will/language-rules.generated.ts line 3 (en) sections 3 and 6, line 4 (de) section 6
  - Refund timing: 27, 2502, 3182, 3522 ("within 14 business days"); 1635, 1733 ("about two weeks"). The en block says "No refund date" and that the day count in the lodged confirmation is forbidden.
  - Team timing: 3681 ("within 24 hours"), a phrase the en block bans by name; 1547 says one business day.
  - Social proof: 1896 (customer and country counts, review link). The en block bans counts; the de block bans the same country figure by name.
  - Deduction and tax decisions by the bot: 3286 ("Yes, we can claim the work-related portion"), 4279 ("Yes, wait until the back-pay is through"), 4649 (states what the ATO looks at for student residency).
  - Deadline assurance: 3629 ("Returns lodged through us usually have more time than lodging yourself"), which conflicts with 1035 and 4644 (penalties possible, cannot say either way).
  - Soft refund expectation: 4181 (the calculator's owing result is "usually where the number moves").
  - Lists: 27 (numbered) and 2343, 4467 (bullets), which the rules forbid outside approved messages.
- Root cause: Seed answers were written before the per-language rule blocks (dated 18 Nov) and were not reconciled with them.
- Attack prerequisites: None.
- Impact: The model receives two conflicting instructions; either it repeats a forbidden promise from the library or the guard blocks a library answer and the customer gets nothing. Refund and deadline promises create liability when the ATO takes longer or applies a penalty.
- Recommended fix: Rewrite the listed answers to the rule wording (no day count for refunds, the approved one-business-day holding line only, no counts, "the team confirms in the review" for deductions). Drop the sentence in 3629.
- Regression test: Run every seed answer through the guard with all content codes, in both paid and unpaid contexts; assert none contains "business days", "24 hours", "two weeks" or a customer count.
- Limits of this verification: policy-guard.ts:687 has a comment about the 14-business-days wording; I did not read whether the guard allows or blocks it.

### WILLDATA-01-F08: Medicare exemption answers give do-it-yourself steps and say an unapproved application is enough to lodge
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (business-logic)
- Files and lines: src/lib/will/knowledge-seed.ts:1809, 3394; conflicting answers at 503, 2106, 2166, 2687, 4302
- Evidence: 1809 sends the customer to the Services Australia page with a link and says "once it's submitted, send us a screenshot and we'll include the exemption in your return". 3394 says a screenshot that the application was submitted "is enough for us to proceed" before approval. 2687 says the team "handles it as part of your return"; 2166 and 503 say the firm cannot help with anything through Services Australia; 4302 says the customer need not apply unless told.
- Root cause: Several generations of answers on the same topic were kept.
- Attack prerequisites: None.
- Impact: The en block bans "steps to apply" for Medicare. Promising to include the exemption on proof of submission only means returns may claim an exemption the customer does not yet hold, with amendment and penalty risk for the customer. Customers get opposite answers depending on wording.
- Recommended fix: Keep one Medicare position (the approved `medicare_exemption` and `MEDICARE_CANT_HELP_MSG` meanings), remove the link-and-steps answer or restrict it to post-payment handoff, and have the owner decide whether lodging on a submitted application is policy.
- Regression test: Assert only one active seed entry per Medicare sub-topic and that none contains a Services Australia URL unless tagged post-payment.
- Limits of this verification: Whether lodging before approval is accepted practice is a professional decision I cannot judge.

### WILLDATA-01-F09: Answer promises to link a new phone number to an old chat on the customer's word
- Severity: MEDIUM
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-287, CWE-639
- Files and lines: src/lib/will/knowledge-seed.ts:4353
- Evidence: "What was your old number? I'll link it so the team sees your whole history, and we carry on from here."
- Root cause: Identity is taken from an unverified statement in chat.
- Attack prerequisites: Knowing a customer's WhatsApp number and messaging from another number.
- Impact: If any linking is done (by the engine or by staff following the bot's promise) without a second check, the caller gains the other customer's file context: status, estimate, documents requested, and replies meant for them.
- Recommended fix: Change the answer to a handoff that says the team will verify identity first; require a check against form data (date of birth or email) before any link.
- Regression test: A "new number" message must create a team task and must not change which customer record the chat is attached to.
- Limits of this verification: A grep in src/lib/will found no linking code; I did not search the dashboard or API. The risk may be limited to a human following the promise.

### WILLDATA-01-F10: Unverified factual assurances about legal duties and data handling
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: n/a
- Files and lines: src/lib/will/knowledge-seed.ts:2845, 2079, 2057, 3368
- Evidence: 2845 tells a customer who owes tax that "whether to lodge is then your decision". 2079 promises the passport is "deleted as soon as your identity has been verified". 2057 and 3368 call the bank document "an ATO requirement".
- Root cause: Reassurance text not tied to a verified fact or control.
- Attack prerequisites: None.
- Impact: 2845 can be read as advice that not lodging is an option when tax is owed. 2079 is a privacy promise; a grep found no deletion-on-verification code in src/lib, only comments about orphaned passport files (db.ts:272, upload.ts:219), so the promise may be untrue.
- Recommended fix: Remove the last clause of 2845. Make 2079 match the actual retention rule in the privacy policy. Reword 2057/3368 to "we need it to make sure".
- Regression test: Assert the seed does not contain "deleted as soon as" unless a retention job exists and is tested.
- Limits of this verification: Retention code was not reviewed; this is a grep result only.

### WILLDATA-01-F11: Brand-specific answers without a brand tag
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: n/a (cross-brand leak)
- Files and lines: src/lib/will/knowledge-seed.ts:4653 (working holiday maker 15% withholding), 4650 (working holiday visa residency), 4649 (student and graduate visa residency), 1824 (names the WHT brand), 1248, 1272, 1703, 1923, 2982 (WHT client-agreement URL); filter at src/lib/will/knowledge.ts:23-26
- Evidence: An entry with no `brand:` tag is used for both brands. 4653 and 4650 are working-holiday content and carry no `brand:wht` tag; 4649 is student content with no `brand:svt` tag. The Spanish block says "For SVT, never quote working holiday tax rates".
- Root cause: Tags were added by hand to some entries only.
- Attack prerequisites: An SVT customer asking about tax withheld, or a WHT customer asking about residency.
- Impact: A student may be told working-holiday withholding rules. Brand names and URLs are rewritten by brand-voice.ts (lines 56-60), which lowers the risk for 1824 and the URLs.
- Recommended fix: Tag 4650 and 4653 `brand:wht`, 4649 `brand:svt`; add a test that any answer mentioning "working holiday" or "backpacker" is tagged.
- Regression test: As above.
- Limits of this verification: brand-voice.ts was not reviewed beyond grep hits.

### WILLDATA-01-F12: Verbatim customer messages, with exact income and tax figures, are kept in source and copied to the database
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359
- Files and lines: src/lib/will/knowledge-seed.ts examples at 984, 1195, 3004, 3542-3544, 3917 (and the header at 1-5 and 3200-3208, which says the entries were mined from real conversations)
- Evidence: The `examples` arrays quote customers' own sentences, some with exact earnings, tax withheld, a tax bill, visa subclasses, cities and lengths of stay. I found no customer names, phone numbers, email addresses, TFNs or customer bank details anywhere in either file. The one TFN-shaped string (line 1643) is an obvious placeholder sequence.
- Root cause: Examples were copied rather than paraphrased.
- Attack prerequisites: Read access to the repository or the knowledge table.
- Impact: Low re-identification risk on its own; the combination of exact figures and circumstances is personal information that did not need to be kept.
- Recommended fix: Round or replace the figures and generalise the places in the listed examples.
- Regression test: Assert no example contains a dollar amount with cents or more than four significant digits.
- Limits of this verification: I cannot tell whether a figure is real or already altered.

### WILLDATA-01-F13: Tax year, per-kilometre rate and thresholds are hardcoded in answers
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/lib/will/knowledge-seed.ts:80, 818, 1128 (the 2025-26 year dates); 793, 3257, 4378, 4467, 4509, 4613 (cents per km and km cap); 3228, 4439, 4467, 4519 ($300)
- Evidence: Answers state the year "1 July 2025 to 30 June 2026" and one per-kilometre rate as fixed facts. The seed also sells prior-year returns (1059, 2372, 2399), for which those dates and that rate can be wrong.
- Root cause: No link to src/lib/will/tax-calendar.ts, which already holds the year label.
- Attack prerequisites: None.
- Impact: Wrong figures given to prior-year customers now and to everyone after 30 June 2027.
- Recommended fix: Use placeholders filled from tax-calendar.ts, or word the answers without the year and rate.
- Regression test: Assert no seed answer contains a four-digit year.
- Limits of this verification: I did not verify the rate against the ATO.

### WILLDATA-01-F14: Language blocks disagree with each other and tell the model where the guard has gaps
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-1059, CWE-200
- Files and lines: src/lib/will/language-rules.generated.ts line 6 (fr) sections 3, 4 and 6; line 7 (it) section 8; line 3 (en) sections 4 and 6; line 8 (pt) sections 6 and 8; line 11 (vi) section 6.1; line 9 (ja) section 4; line 5 (es) section 6
- Evidence:
  - Amounts: the fr block allows "$110 extra for foreign income, and $165 for the ABN upgrade"; en, de, es, it, ja and vi allow only $220, $385, $330, $440, $495; ja adds "never state the difference between foreign and domestic prices".
  - Agent question: en answers with the supervision sentence; pt and vi say never answer and hand to the team; the en rule "never open with Yes" sits beside a fr approved text that "opens with Oui".
  - Emoji on price messages: es says none, en says at most one.
  - Guard gaps disclosed to the model: fr says a named accountant title is "not checked by the guard"; it says a sentence the guard "cannot read as English is marked unguarded, and the English checks do not cover it"; de lists which titles the guard checks and which are "model rules".
  - Internal file names, guard thresholds (450 characters, 1.3 times, 170 characters) and the other brand's name are in every customer-facing prompt.
- Root cause: Nine blocks written separately and copied verbatim from engineering docs into the prompt (scripts/build-language-rules.mjs).
- Attack prerequisites: For the disclosure part, a customer who gets the model to repeat its instructions.
- Impact: Different fee and agent behaviour by language; a prompt leak shows exactly which wording is not checked.
- Recommended fix: Move the price list, agent rule and emoji rule to one shared block; strip guard-coverage notes and file names from the generated prompt text.
- Regression test: Assert every block's amount list is identical; assert the generated file contains no "not checked by the guard" or "unguarded".
- Limits of this verification: I did not read the guard's `PROMPT_ECHO` rule, which may limit leakage.

### WILLDATA-01-F15: Seed comment says five undecided topics were left out, but answers for four of them are in the file
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/will/knowledge-seed.ts:3210-3216 versus 1626, 1980, 2845 (fee when the customer owes tax), 1083, 2459, 2607, 4625 (DASP), 2746, 2759 against 1538 (closed bank account), 3131 (free eligibility check)
- Evidence: The comment says shipping a guess on these "would make Will confidently wrong about money". Other inconsistent pairs: payslips needed (105, 1152) versus "no payslips needed" (2662); agent wording "registered tax agent" (1248, 1272, 2982) versus "tax professional" (1703, 1896, 1923, 2131, 2317).
- Root cause: Stale comment or unrecorded decisions.
- Recommended fix: Confirm each of the four topics has an owner decision and update the comment; merge duplicate entries.
- Limits of this verification: I cannot tell which answer reflects the current decision.

## Checked and found sound

- No answer or rule states the business itself is a registered tax agent; the seed uses "under the supervision of a registered tax agent" (knowledge-seed.ts:1248, 1272, 2982) and every language block forbids the claim (language-rules.generated.ts lines 3-11, section 6 of each).
- No TPB or agent number is given anywhere; answers point to the client agreement (knowledge-seed.ts:1272, 1923).
- Fees in answers are only the fixed ones: $220, $385, $495, and $330/$440 for a review (knowledge-seed.ts:527, 1435, 1955, 2634, 2900). No discount is offered (2582, 3419).
- No refund amount is promised; refund-chance answers decline to give a figure before payment (knowledge-seed.ts:1224, 1868, 3547, 3841).
- Customers are told not to send TFN or passport details in chat (knowledge-seed.ts:1644) and are never asked for myGov logins (2926, 3573, 4594).
- Refunds go only to an account in the customer's own name (knowledge-seed.ts:2746, 2759).
- No customer names, phone numbers, emails, TFNs or customer bank details in either file (grep for email, phone and long digit runs; the only long digit runs are the firm's own details and the default password).
- No instruction in either file tells the model to ignore or relax the guard; the Italian block says not to rephrase a blocked claim to get past it (language-rules.generated.ts line 7, section 8).
- Library answers are passed through `sanitizeReference` before entering the prompt (playbook.ts:736).
- The generated rules file matches its build script's shape: nine keys, JSON-escaped strings, no executable content (scripts/build-language-rules.mjs:16-26).
- SVT-only blocks (zh, vi) forbid WHT names; WHT-only blocks (de, fr, ja, pt) forbid SVT names.

## Open questions

1. How are the signing-platform accounts created, and do they all share the default password in F02?
2. When is `ctx.guaranteeBarred` set, and does it cover a pre-payment customer who has not yet said whether they have ABN income (F01)?
3. Are library answers sent verbatim or always rewritten by the model, and does the guard see them as free text (F03, F07)?
4. Is there any code or staff procedure that links a new number to an old customer record (F09)?
5. Is the passport really deleted after identity verification (F10)?
6. Is lodging with a Medicare exemption on proof of submission only an approved practice (F08)?
7. Has the owner decided the four topics listed in F15?
8. The source docs in docs/engineering/language-blocks/ were not compared with the generated file; I assumed the generated file is what ships.
