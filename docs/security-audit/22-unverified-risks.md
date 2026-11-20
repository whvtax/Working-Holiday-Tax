# 22. Unverified risks

Operation Iron Fortress, 18 Nov 2026. This file lists what the audit could not confirm, so that nobody reads silence as assurance. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS about the limits of this audit

- Static reading only. No project code, test, scanner or network was used for findings.
- The live database, Vercel, Meta, Supabase, Redis, the email provider and Google Analytics were NOT inspected.
- No tax, wage, visa or health-cover fact was checked against the ATO or any other source.
- `npm audit --omit=dev` was run once earlier in the session (0 known vulnerabilities at that time): a point-in-time note.
- The production build was not verified in this environment.
- Coverage gaps are listed in file 21 ("Honest gaps").

## Production state that decides real exposure (unknown)

| question | why it matters | how to settle it | rows |
|---|---|---|---|
| Have migrations 047, 048, 049, 050 run, and in what order? | 049 alone enables RLS on `will_ai_usage`, revokes anonymous grants, pins function `search_path` and forces the bucket private | run the check queries at `049:78-94`; write a migration ledger | R048, R050 |
| Is RLS enabled on every table, with no policy or grant added by hand? | the whole access model rests on it | Supabase dashboard and the check queries | file 08 |
| Is the `uploads` bucket private? | passports and bank statements | Supabase storage settings | file 08 |
| Are `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` set, and has the sealing script been run? | otherwise TFN and bank details are in plain text | Vercel variables (names only); script dry-run counts | R029 |
| Is `tfn_norm` empty in the live table? | plain copy of the TFN | script dry run | INFRA-01-F01 row |
| Is `FORM_TOKEN_ENFORCE=true`? | otherwise forms attach by typed phone number | Vercel variables | R008 |
| Are the four security alert switches on, and the admin email set? | otherwise bulk export and signature bursts alert nobody | Vercel variables | R130 |
| Is `WILL_ALLOW_MOCK_BRAIN` absent and `SEED_ENABLED` off? | test paths in production | Vercel variables | R209 |
| Are WhatsApp credentials in the environment? | otherwise sends can be skipped silently | Vercel variables | R067 |
| Which Redis version? | limits become per instance without `EXPIRE NX` | provider console | R038 |
| Which CSP header does `/atlas` actually return? | static policy may be attached too | fetch headers on production | R051 |
| Does GA4 record history-change page views with the form token? | token in analytics | GA4 setting and Realtime view | R157 |
| Does the `price_tfn_abn` Library message still carry the guarantee sentence? | wrong promise to ABN customers | the query in R056 | R056 |
| Does the live Library match the seed in the repository? | findings on knowledge answers were made on the seed file | compare in the CRM | R134 to R147 |
| Do preview deployments share production secrets or data? | wider exposure of secrets | Vercel settings | file 12 |

## Assumptions the code makes that were not checked

- The hosting edge overwrites client IP headers (lockout and rate limits depend on it).
- Secrets are long, random and present only in the hosting environment; none was ever committed.
- The browser never receives the Supabase anonymous or service key.
- Meta delivers only genuine messages for numbers on this app; the phone-number-id filter is configured.
- The admin mailbox receiving one-time codes is protected and monitored.
- Staff check the bank account and the signing platform before lodging (the accepted "trust the customer" decisions rely on this).
- The model provider's retention and use of chat text and attachments is acceptable under its agreement (not seen).
- Mark Done deletes stored documents in production as the code path reads.

## Risks that static reading cannot settle

| risk | status in this audit |
|---|---|
| Races across serverless instances (duplicate reply or task) | read in code, not reproduced (R059) |
| Behaviour of a deferred reply after more than 24 hours | read in code, not reproduced (R062) |
| Redirect following and DNS behaviour when downloading provider media | left for runtime testing (WILL-02-F10 note) |
| PDF generation with non-Latin text | unverified, needs one run (R119) |
| Hostile HEIC or PDF files against the parsing libraries | libraries not reviewed (file 11) |
| Real provider error texts for missing templates | needs the audit log (R068) |
| Header and CSP results in a browser; consent gating of analytics | not observed |
| Rate limits, lockout and body caps under real traffic | not exercised |
| Model behaviour under prompt injection | guard read; no adversarial run |
| The 18 Nov fixes in production | covered by the quoted suite run, not by a deployment or a unit re-review |

## Content accuracy (not security, but customer and regulator risk)

- No fact in section E of file 19 was checked at source. Figures the reviewers could not check include wage rates, penalty units, interest rates, per-km rates, Medicare thresholds, super and DASP rules, deduction rules for 2026-27, visa work rules and health-cover limits.
- 64 small content pages were pattern-searched only. Wording problems that the patterns do not match would not have been seen.
- Translations were compared with each other and with the English text by reading, not by a native-speaker review in every language.

## Things outside the repository

- `node_modules` and transitive dependencies.
- Any database object, storage policy, webhook or scheduled job created by hand.
- Earlier copies of the source that may hold names and numbers now flagged (R127).
- Devices where staff download lodging files and exports (R173).
- Git history and remotes (no `.git` directory in this copy), so what has been pushed anywhere is unknown.

## HYPOTHESES to test first if a dynamic assessment is commissioned

1. Anonymous key against `will_ai_usage` and the two RPC functions.
2. A form submission with a known customer's phone number and no token.
3. Parallel delivery of one webhook message and two overlapping cron ticks.
4. Session cookie reuse after logout on a cold instance.
5. Response headers on `/atlas`, `/crm` and a public form page.
