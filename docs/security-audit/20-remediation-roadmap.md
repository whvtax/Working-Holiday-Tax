# 20. Remediation roadmap

Operation Iron Fortress, 18 Nov 2026. Row numbers (Rnnn) refer to `19-security-findings.md`. 77 rows are already fixed. This roadmap covers the 108 open rows and the accepted risks the owner should confirm knowingly. Almost every open item is an owner action: a setting, a migration, a wording decision or a fact to check at source. Very few are code-only.

Priority meaning: P0 = do first, protects TFN, bank details or money, or closes a known gap with a setting. P1 = before the Student Visa Tax line or Autopilot is widened, or a wording risk in live customer answers. P2 = planned changes that need a migration or a full test run. P3 = hygiene, content facts, confirmations.

## Already done on 18 Nov (VERIFIED FACTS as stated by the fix log; presence of the FIX_NOW texts checked by search)

- Before the debate pass: `/api/mia` added to the proxy matcher; Mia move and draft limited to SVT customers and real states; wildcard characters stripped in `findExistingClient`; Mia expense amount parsing; `tfn_norm` cleared by the backfill script; model-written holding reply guarded as improvised text and not sent in Approval mode; `isLegacy` on HANDOFF_ACK and HANDOFF_BUMP, `aiPaused` on REVIEW_REQUEST; TFN-only limit added to the SVT guarantee text (en, zh, vi); already-lodged negation; localized form-link detection; engine LENGTH_ONLY reduced to length; knowledge import capped and guarded; archive checks the client write before deleting the task; kill switch read back and boolean-only; fresh opt-out read in `deliverOut`; globally rate-limited inbound returned to Meta; TFN and ABN application forms and their API routes deleted.
- Earlier the same day: TFN and bank details sealed at rest (active only once the keys are set, see P0); webhook retry counter persisted; no retry after a stored reply; policy guard Unicode fold and wider rules.
- After the debate pass: every FIX_NOW item, except the two in P0 item 7 and P3 item 1.
- Test suite after the fixes: 6,526 passing, 2 failing only because `.env.example` is absent from this working copy. The production build was NOT verified in this environment (Google Fonts unreachable).

## P0: owner actions that switch on existing protections

| # | action | where | rows |
|---|---|---|---|
| 1 | Back up the database. Run migration 048, then 049 LAST, in the Supabase SQL editor (047 first if the brand column is not yet live; 047, 049 and 050 are marked not applied in their own headers). Run the check queries at 049:78-94 and keep the output. Running 048 after 049 removes the `search_path` pin again. | Supabase | R048, R050 |
| 2 | Set `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` in Vercel production. Until both are set, TFN and bank details are stored in plain text. Then run `scripts/seal-legacy-task-fields.mjs --apply` (it also clears `tfn_norm`). Decide whether a missing key should make the form fail, and whether passport number, date of birth and address are sealed too. | Vercel, script | R029, R209 |
| 3 | Set `FORM_TOKEN_ENFORCE=true` in Vercel once old form links without a token are done. Until then a form is matched to a chat by the typed phone number. Decide whether the database trigger `will_on_form_received` is then dropped and whether SVT and super forms get the signed link. | Vercel, later a migration | R008, R101, R191 |
| 4 | Decide on the fixed temporary password for the signing account in two knowledge answers: ask the platform whether it forces a change at first login and whether it can open an account that already holds a return. If not, keep only "Forgot password". | owner, signing platform | R135, R088 |
| 5 | Decide the anonymous merge: a public form whose typed email or phone matches an existing client is attached to that client automatically. Keep, or attach only after staff confirm. | owner | R007, R141 |
| 6 | Restore `.env.example` in the working copy (two tests fail without it; the ignore files expect it). | repository | test note |
| 7 | Secret-scanner name list: the FIX_NOW text for `scripts/lib/secret-scan.cjs:35` is not in the file. Re-apply or record why not. | repository | R053 |
| 8 | Confirm in Vercel: `WILL_ALLOW_MOCK_BRAIN` absent; WhatsApp token and phone id present as environment variables; the four `SECURITY_ALERT_*` variables set to `true` and the admin email set. | Vercel | R209, R067, R130 |

## P1: wording and behaviour in live customer answers; before SVT goes live

| # | action | rows |
|---|---|---|
| 1 | Guarantee wording. (a) Nine knowledge answers state the guarantee with no TFN-only limit. (b) About 100 places in de, es, fr, it, ja say "returns with TFN income", which a TFN+ABN return also has: approve one "TFN income only" phrase per language with a native speaker. (c) AI-crawler files, the model prompt (two lines), three SVT meta descriptions, the CRM warning banner, guarantee bands on TFN and Medicare pages. (d) Run the check query for the `price_tfn_abn` Library message. | R134, R218, R054, R096, R217, R153, R219, R056 |
| 2 | Refund timing figures: 10, 12, 14 days and "two weeks" appear in different places. Check the ATO page, choose one figure, decide whether a day count may stay in hero, social and HowTo text, add "the ATO says" where missing. | R226, R139 |
| 3 | Bank and identity answers in the knowledge seed: "Yes, confirmed ... even if your bank shows a different name"; refund bank details asked for in chat; promise to join a new number to an old file without a stated identity check. | R136, R137, R141 |
| 4 | Registered-agent wording: have the supervising agent confirm "We deal with the ATO directly", "A tax agent will never ask ... is not us", the client-agreement fee list and document-retention wording, and whether the agent number goes on every page. | R185, R220, R039, R147 |
| 5 | SVT form shows a 5.0 Google rating that is not SVT's. Remove until SVT has its own rating, or keep knowingly. | R164 |
| 6 | Before the SVT WhatsApp line is switched on: give SVT its own number and run the launch gate test; wrap CRM customer actions in the customer's brand; make a failed brand read re-queue the job instead of running it as WHT. | R201, R016, R124 |
| 7 | Google Analytics: in both GA4 properties turn off "Page changes based on browser history events" and confirm no page location contains the form token parameter. | R157 |
| 8 | Approval mode exceptions: decide, per kind, whether holding line, bumps, refund check-in, resend, leftover autopilot reply and paperwork ask must wait for approval. Decide whether hand-typed replies and system Library rows pass the guard. | R072, R005, R066 |
| 9 | Payment trust: keep "trust the customer", or add a reconciliation task for every Paid that came from words or a picture; decide the underpayment case and whether "I signed" may move the stage. | R063, R102 |
| 10 | Privacy decisions: attachments from paused, legacy and opted-out chats are still read by the model; customer first names and numbers sit in the cached prompt text, code comments and test files; the lodging download holds TFN and passport number under the customer's name. | R064, R069, R127, R203, R173 |

## P2: planned engineering (migration or full test run needed, owner approval)

| # | action | rows |
|---|---|---|
| 1 | Cross-instance races: per-customer lock or SQL functions (atomic attempts, JSON merge, unique outbox key). | R059, R104 |
| 2 | Store error handling: make the three reads that gate a send fail closed, then the writes. | R093 |
| 3 | Deferred replies older than about 23 hours: drop or turn into a task (24-hour window). | R062 |
| 4 | Partial hand-over reply through the same post-processing as a normal reply; payment-link override only where a fixed wording exists. | R085, R090 |
| 5 | Customer deletion as one SQL function, with a decision on audit rows, AI usage rows and settings. | R095 |
| 6 | Archive without Done leaves uploaded documents in storage: decide delete or refuse; decide `ORPHAN_UPLOAD_DELETE`. | R020 |
| 7 | CSP: check `/atlas` response headers on production; run the tighter policy in report-only on a preview, then promote. HSTS `includeSubDomains` after confirming all subdomains are HTTPS. | R051, R046, R058 |
| 8 | Record which migrations have run on production; delete or archive `RESET_WILL_FRESH_START.sql`. Confirm Redis is version 7 or later. | R050, R057, R038 |
| 9 | CRM behaviour decisions: amount payable recorded as a refund; Done resumes Will for a chat paused on purpose; JSON export format; super-form consent written by the server; Mia expense PDF overwrite; URGENT card headline; stale banner text. | R174, R175, R012, R192, R170, R117, R152 |
| 10 | Tests proposed by TESTS-01 and TESTS-02 (file 18), first the behavioural 401 test over all gated handlers and the form-token enforcement test. | file 18 |

## P3: hygiene, content facts, confirmations

| # | action | rows |
|---|---|---|
| 1 | Delete the three `.pyc` files under `.claude/` (skipped on 18 Nov). | R213 |
| 2 | Tax and wage facts to check at source (ATO, Fair Work, Services Australia, ABR, privatehealth.gov.au, state regulators), then align all languages: minimum wage and award figures, $1,000 standard deduction and the $300 rule, ABN asset rule, RSA and White Card, duty to lodge, partial-year wording, super and DASP, Medicare levy, no-TFN rate, 15% rate start date, TFN before ABN, per-km rate, GIC rate, postal address on the ATO form, OSHC limits. | R225, R228 to R235, R238, R239, R248 to R253, R255, R256, R258, R145, R140, R120 |
| 3 | Native-speaker fixes and translation sync (vi, zh, fr, it, ja, de). | R240, R246, R254, R273, R146, R247 |
| 4 | Dated text for the July checklist; link pairs to open; example payslip rate. | R227, R270, R272 |
| 5 | Service claims to confirm as true: passport selfie deletion time, services listed only in some languages, reply-time wording, wage-help and visa assurances, zh and vi TFN pages live. | R243, R241, R244, R242, R202, R142 |
| 6 | Other small decisions: income mentioned inside a question, internal expense PDF with non-Latin text, Meta error pattern, $385 on the ABN page. | R126, R119, R068, R186 |
| 7 | Dependency advisory check with network access (file 11 backlog). | file 11 |

## Accepted risks the owner should confirm knowingly (status ACCEPTED, no change planned)

| risk | why accepted in the debate pass | rows |
|---|---|---|
| WhatsApp access token stored unencrypted in the settings table (service-role only) | Read only by key; no endpoint lists settings by value. Depends on RLS and grants being as the migrations say (P0 item 1). | R070, INFRA-01-F11 note |
| Raw customer text sent to the model provider (main reply path, second check, holding-line judge); Atlas redaction catches long digit runs only | The same provider already receives the chat; redacting one smaller call protects nothing. One extra TFN-shaped pattern was added (R105). | R074, R105, R037 |
| Form link single use is read-then-write, not atomic; a failed read counts as unused | Harm limited to the link holder's own record; an atomic claim needs a migration. | R010, R208 |
| Login lockout is per IP; kill-switch and pause races of seconds; soft send limiter | Deliberate, documented trade-offs. | R027, R061, R076 |
| Form addresses are public (robots file, client code, a document) | A slug is an address, not a control; the control is the signed token (P0 item 3). | R172 |
| Authorisation of gated routes proved in tests by source text, not by calling the route | No product defect; backlog test. | R204 |

## NOT VERIFIED

No item in this roadmap was verified against the live database, Vercel, Meta, Supabase or Google Analytics settings. Whether P0 items 1 to 3 are already done in production is unknown to this audit.
