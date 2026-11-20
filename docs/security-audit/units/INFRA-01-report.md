# INFRA-01 report

Scope note. This is a static, read-only review of the repository. **The live Supabase database, the storage bucket, the Vercel project and the GitHub repository were not inspected.** Every statement about tables, RLS, grants, policies, functions and the bucket describes what the migration files say, not what is deployed. The migrations are pasted by hand into the Supabase SQL editor and nothing in the repository records which ones have run, so the deployed state can differ from the files.

No script, SQL, test or build was run. No network was used.

## Coverage

Files in the unit list: 43. Files read in full: 43. Lines read: 4,863.

Four entries in `INFRA-01-files.txt` show a line count of 0 but the files are not empty; the real counts are below.

| file | lines | ranges read | status |
|---|---|---|---|
| .gitignore | 43 (listed 0) | 1-43 | REVIEWED |
| .vercelignore | 24 (listed 0) | 1-24 | REVIEWED |
| config/brand-routing.js | 125 | 1-125 | REVIEWED |
| config/csp-report-only.js | 105 | 1-105 | REVIEWED |
| jest.config.js | 24 | 1-24 | REVIEWED |
| next.config.js | 335 | 1-264, 260-335 | REVIEWED |
| package.json | 45 | 1-45 | REVIEWED |
| scripts/build-offline.sh | 49 (listed 0) | 1-49 | REVIEWED |
| scripts/generate-llms.mjs | 905 | 1-330, 331-905 | REVIEWED |
| scripts/indexnow.mjs | 46 | 1-46 | REVIEWED |
| scripts/lib/secret-scan.cjs | 129 | 1-129 | REVIEWED |
| scripts/package-release.cjs | 144 | 1-144 | REVIEWED |
| scripts/reset-form-links.mjs | 132 | 1-132 | REVIEWED |
| scripts/seal-legacy-task-fields.mjs | 66 | 1-27, 25-66 | REVIEWED |
| scripts/security/full-code-audit.mjs | 417 | 1-417 | REVIEWED |
| scripts/svt-og-images.mjs | 58 | 1-58 | REVIEWED |
| scripts/will-review.py | 47 (listed 0) | 1-47 | REVIEWED |
| supabase/migrations/001_init_crm.sql | 78 | 1-78 | REVIEWED |
| supabase/migrations/002_dashboard_stats.sql | 118 | 1-118 | REVIEWED |
| supabase/migrations/006_whatsapp_connection.sql | 69 | 1-69 | REVIEWED |
| supabase/migrations/007_wa_conversations.sql | 77 | 1-77 | REVIEWED |
| supabase/migrations/009_shadow_mode.sql | 43 | 1-43 | REVIEWED |
| supabase/migrations/012_form_funnel_events.sql | 54 | 1-54 | REVIEWED |
| supabase/migrations/014_form_settings.sql | 73 | 1-73 | REVIEWED |
| supabase/migrations/015_two_stage_intake.sql | 73 | 1-73 | REVIEWED |
| supabase/migrations/016_crm_leads.sql | 130 | 1-130 | REVIEWED |
| supabase/migrations/017_leads_dedupe.sql | 131 | 1-131 | REVIEWED |
| supabase/migrations/018_leads_whatsapp.sql | 87 | 1-87 | REVIEWED |
| supabase/migrations/019_leads_whatsapp_identity.sql | 140 | 1-140 | REVIEWED |
| supabase/migrations/020_leads_language.sql | 98 | 1-98 | REVIEWED |
| supabase/migrations/021_will_tables.sql | 214 | 1-214 | REVIEWED |
| supabase/migrations/028_will_rls.sql | 74 | 1-74 | REVIEWED |
| supabase/migrations/029_will_ai_budget.sql | 56 | 1-56 | REVIEWED |
| supabase/migrations/030_will_last_message_truth.sql | 58 | 1-58 | REVIEWED |
| supabase/migrations/031_will_lost_analysis.sql | 80 | 1-80 | REVIEWED |
| supabase/migrations/036_guarantee_tfn_only.sql | 54 | 1-54 | REVIEWED |
| supabase/migrations/038_form_received_tax_return_only.sql | 46 | 1-46 | REVIEWED |
| supabase/migrations/047_brand_column.sql | 64 | 1-64 | REVIEWED |
| supabase/migrations/048_brand_triggers.sql | 101 | 1-101 | REVIEWED |
| supabase/migrations/049_rls_and_function_lockdown.sql | 94 | 1-94 | REVIEWED |
| tailwind.config.js | 64 | 1-64 | REVIEWED |
| tsconfig.json | 50 | 1-50 | REVIEWED |
| vercel.json | 43 | 1-43 | REVIEWED |

Files outside the unit list that I opened to judge a finding or to complete the table inventory:

- Read in full (they belong to INFRA-02): `.github/workflows/ci.yml` (40), `.github/dependabot.yml` (28), `config/form-paths.js` (28), migrations `003_audit_log`, `003_partners`, `013_partners_rls`, `022_will_knowledge`, `023_will_audit`, `024_will_processed_messages`, `027_will_known_contacts`, `035_drop_legacy_wa_tables`, `042_will_ai_usage`, `045_service_role_grants`, `050_mia_tables`.
- Pattern search only, not read: migrations 004, 005, 008, 010, 011, 025, 026, 032, 033, 034, 037, 039, 040, 041, 043, 044, 046, `supabase/RESET_WILL_FRESH_START.sql`, `scripts/export-legacy-wa.sql`. The search covered `CREATE TABLE`, RLS, `CREATE POLICY`, `GRANT`, `REVOKE`, `SECURITY DEFINER`, `search_path`, `DROP`, `TRUNCATE`, `DELETE FROM`, `storage.`, publication changes and "not applied / not run" headers.
- Partial reads: `src/proxy.ts` 80-126, `src/lib/supabase.ts` 68-90, `src/lib/intake-validate.ts` 5-16; pattern search in `src/` for `tfn_norm`, `brand`, `source_detail`, `process.env.*`, `next/image`, Realtime use, and the `whatsapp` lines of `src/app/api/tax-form/route.ts`.

## Findings

### INFRA-01-F01: Plaintext TFN copy in `crm_tasks.tfn_norm` is not covered by the encryption backfill and is never cleared
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-312
- Files and lines: supabase/migrations/015_two_stage_intake.sql:49-55; scripts/seal-legacy-task-fields.mjs:46
- Evidence: Migration 015 adds column `tfn_norm`, indexes it, and backfills it for every existing row with the digits of `tfn`. The one-time sealing script encrypts only the columns `tfn` and `bank_details`. A search of `src/` finds no code that reads, writes or clears `tfn_norm` (the only hit is a comment in `src/lib/intake-validate.ts:12`).
- Root cause: The duplicate-detection column was left behind when the two-stage intake was removed, and the sealing work listed the sensitive columns by name without it.
- Attack prerequisites: Read access to the `crm_tasks` table or to any backup or export of it (a leaked service-role key, a database dump, a Supabase dashboard account).
- Impact: Every task that existed when 015 ran, and every task written while the code still filled the column, keeps its full tax file number in clear text. This also applies to tasks marked done, where the application clears `tfn`. After the backfill the owner would reasonably believe no TFN is stored unencrypted.
- Recommended fix: After a backup, set `tfn_norm` to NULL on all rows and drop the column and its index `idx_tasks_tfn_norm`. If duplicate detection is still wanted, use the keyed blind index (`FIELD_INDEX_KEY`) instead.
- Regression test: A test that fails if any migration or source file references `tfn_norm` other than to drop it; a verification query `SELECT count(*) FROM crm_tasks WHERE tfn_norm IS NOT NULL` expecting 0.
- Limits of this verification: I did not see the database, so I do not know whether the column still holds values or was cleaned by hand. I did not read the migrations I only searched (a later one could drop it; the search for `DROP` found no such statement).

### INFRA-01-F02: `will_ai_usage` has no row level security unless migration 049 is run, and 049 says it has not been run
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-862
- Files and lines: supabase/migrations/042_will_ai_usage.sql:20-34; supabase/migrations/049_rls_and_function_lockdown.sql:3, 40, 58-63, 76
- Evidence: 042 creates `will_ai_usage` with no `ENABLE ROW LEVEL SECURITY`. The only statement that enables it is 049:40, and the header of 049 reads "NOT YET RUN ANYWHERE. Review first." The same unrun file is also the only place that revokes table, sequence and function privileges from `anon` and `authenticated`, and the only SQL that forces the `uploads` bucket to private.
- Root cause: The convention of enabling RLS in the migration that creates the table was dropped (021-027, then 042), and the repair is parked in a migration that is not applied.
- Attack prerequisites: The project URL and the anon key. The application does not ship the anon key (no anon key variable in `src/`), but Supabase treats it as public and it is visible in the dashboard. The table must also still carry the default Data API grants (042 dates from 24 September, before the change described in 045:1-2).
- Impact: Read of the AI cost ledger (feature, model, token counts, cost, internal customer id) and insertion or alteration of rows, which falsifies the cost figures shown in the CRM. No TFN, bank or message content is in this table.
- Recommended fix: Review and run 049 after a backup. In future, put `ENABLE ROW LEVEL SECURITY` in the same file as every `CREATE TABLE`.
- Regression test: Extend the migration test so each `CREATE TABLE` must have its RLS statement in the same file, and so a migration whose header says it is not applied is reported.
- Limits of this verification: Live grants and RLS flags were not checked. The repository's own checker (`scripts/security/full-code-audit.mjs:291-315`) treats the table as protected because it only looks for the statement in any file, run or not.

### INFRA-01-F03: The `search_path` pin on the SECURITY DEFINER trigger functions is removed again when 048 is run after 049
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-426
- Files and lines: supabase/migrations/016_crm_leads.sql:111; 017_leads_dedupe.sql:114; 018_leads_whatsapp.sql:72; 019_leads_whatsapp_identity.sql:124; 020_leads_language.sql:88; 021_will_tables.sql:180; 038_form_received_tax_return_only.sql:46; 048_brand_triggers.sql:14-46, 48-101; 049_rls_and_function_lockdown.sql:70-72; 047_brand_column.sql:18
- Evidence: `crm_capture_lead()` and `will_on_form_received()` are declared `SECURITY DEFINER` with no `SET search_path` in every version, including the newest in 048. 049 pins the path with `ALTER FUNCTION ... SET search_path`. In PostgreSQL, `CREATE OR REPLACE FUNCTION` keeps owner and privileges but resets all other properties, including `SET` clauses, to what the new statement says. 048 is described as idempotent and is tied to 047, which is "NOT APPLIED YET"; 049 is a security fix likely to be run first.
- Root cause: The pin lives in a separate `ALTER` and not in the function definitions.
- Attack prerequisites: The ability to create objects in a schema that precedes `public` on the caller's path. The anon and authenticated roles cannot do this through the Data API, which is why the severity is low.
- Impact: Loss of a defence-in-depth control with no error or warning.
- Recommended fix: Add `SET search_path = public, pg_temp` to both function definitions in 048, or declare them `SECURITY INVOKER` (the service role already has table grants from 045). Run 049 last, or re-run its step 4 after 048.
- Regression test: A test that fails if a migration contains `SECURITY DEFINER` without `SET search_path` in the same statement.
- Limits of this verification: Based on documented PostgreSQL behaviour; not executed.

### INFRA-01-F04: 049 cannot stop future functions in `public` from being callable by the anon key
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-276
- Files and lines: supabase/migrations/049_rls_and_function_lockdown.sql:57, 63
- Evidence: Line 63 is `ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated`. EXECUTE to PUBLIC is a global default in PostgreSQL, and a per-schema default-privilege command cannot take away a globally granted default. The comment on line 57 promises "now or for tables made later".
- Root cause: Per-schema default privileges only add to the global defaults.
- Attack prerequisites: A function added later in `public`, plus the anon key.
- Impact: A later RPC function is exposed at `/rest/v1/rpc/<name>` to the anon key. If it is `SECURITY DEFINER` it runs with owner rights. The functions that exist today are handled by line 60.
- Recommended fix: Add `REVOKE EXECUTE ON FUNCTION ... FROM PUBLIC, anon, authenticated` to every migration that creates a function, or run `ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC` without `IN SCHEMA` for the role that creates them.
- Regression test: The verification query at 049:85-88 run after each new function migration, expecting 0 rows.
- Limits of this verification: Not executed. Default privileges also apply only to objects created by the role that ran the command; I could not check which role the SQL editor uses.

### INFRA-01-F05: No record of which migrations have run; three say they have not; number 003 is used twice; "safe to re-run" files are not
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: supabase/migrations/047_brand_column.sql:18-19; 049_rls_and_function_lockdown.sql:3; 050_mia_tables.sql:4; 003_audit_log.sql and 003_partners.sql (same number); 028_will_rls.sql:27, 34; 035_drop_legacy_wa_tables.sql:41; 017_leads_dedupe.sql:73-78; 019_leads_whatsapp_identity.sql:64-70
- Evidence: Every migration is pasted by hand into the SQL editor. No ledger table or tool tracks them. 047 ("NOT APPLIED YET"), 049 ("NOT YET RUN ANYWHERE") and 050 ("DRAFT. NOT APPLIED") are unapplied by their own headers. 028 claims "SAFE TO RUN MORE THAN ONCE" but alters `will_suggestions`, which 035 drops, so a re-run after 035 stops with an error at line 34 and leaves lines 35-41 not executed in that run. 017 and 019 delete lead rows each time they are run.
- Root cause: Manual migration process with no state.
- Attack prerequisites: None; this is a process weakness.
- Impact: The security state of the database (RLS, grants, bucket flag) cannot be known from the repository, and a restore or a new environment built from these files can end up without the protections. Application code already depends on unapplied columns: `src/lib/mia/data.ts:26, 52` selects and writes `source`, `source_detail`, `source_at` from 050.
- Recommended fix: Adopt the Supabase CLI migration history, or at least a `schema_migrations` table that each file inserts into. Renumber one of the 003 files. Record the applied state in the repository.
- Regression test: A test that fails on duplicate migration numbers and on a header containing "NOT APPLIED" or "NOT YET RUN" on the release branch.
- Limits of this verification: I did not check how the Mia code behaves when the columns are missing.

### INFRA-01-F06: Two database triggers treat a phone number typed into a public form as proof of identity
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-639
- Files and lines: supabase/migrations/048_brand_triggers.sql:21-43 (and 038:20-43, 021:152-177); 048_brand_triggers.sql:65-84 (and 019:91-107, 020:57-72)
- Evidence: `will_on_form_received()` finds a Will customer by the `whatsapp` value of the new `crm_tasks` row and queues a `FORM_RECEIVED` job for that customer. `crm_capture_lead()` falls back to matching an existing lead by phone and then overwrites that lead's name, number and source. In `src/app/api/tax-form/route.ts:41` the number comes from the form field; line 59 replaces it with the chat customer's own number when a customer was resolved from a token.
- Root cause: Identity matching inside the database on a value the submitter controls.
- Attack prerequisites: The phone number of a customer in state PAID or FORM_PENDING, and a form submission that is accepted without a token bound to that customer (controlled by `FORM_TOKEN_ENFORCE`, which I did not review).
- Impact: A stranger can make Will mark another customer's questionnaire as received and send that customer the confirmation message, and can overwrite the name on a marketing lead. Separately, the job id is built from the customer id and the current second (048:39), so two matching writes in the same second raise a primary key error inside the trigger, which aborts the customer's own form insert.
- Recommended fix: Queue `FORM_RECEIVED` only from the application path that has verified the token (already present per 038:12-13) and drop the trigger, or have the trigger require a server-set marker column. Use a random job id with `ON CONFLICT DO NOTHING`.
- Regression test: Submit a form without a token carrying another customer's number and assert that no `FORM_RECEIVED` job exists for that customer.
- Limits of this verification: The API route was not reviewed in full; token enforcement may already close this.

### INFRA-01-F07: Image optimizer and enforced CSP allow every Supabase project, not only this one
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-918, CWE-1021 (n/a for CSP breadth)
- Files and lines: next.config.js:139-145, 32, 38; config/brand-routing.js:83-87
- Evidence: `images.remotePatterns` accepts `**.supabase.co` and `**.supabase.in`. The enforced policy lists `https://*.supabase.co` and `https://*.supabase.in` in `img-src` and `connect-src`. The comment at brand-routing.js:83-86 says no page of either brand uses `next/image`, and a search of `src/` found it only in a test. `/_next/image` is closed on Student Visa Tax hosts only.
- Root cause: Wildcards kept from an earlier design.
- Attack prerequisites: None for the optimizer: anyone can create a Supabase project and request `/_next/image?url=<their object>` on the Working Holiday Tax host. For the CSP: an existing script injection.
- Impact: The site fetches, transforms and serves third-party images from its own origin (billing for image optimisation, content served under the brand's domain). The CSP wildcard gives an injected script an allowed destination for stolen data.
- Recommended fix: Remove `remotePatterns` (or name the one project host), and remove the Supabase origins from the enforced CSP as the report-only candidate already proposes (config/csp-report-only.js:21-23).
- Regression test: Request `/_next/image?url=https://example.supabase.co/x.png&w=64&q=75` on the WHT host and expect 400 or 404.
- Limits of this verification: Not requested against a running server.

### INFRA-01-F08: `/atlas` receives the static public CSP from next.config.js as well as the nonce CSP from the proxy
- Severity: LOW
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-693
- Files and lines: next.config.js:107, 112, 150-155; src/proxy.ts:86, 111-113, 126
- Evidence: `NOT_CRM` is `/((?!crm(?:/|$)).*)`, which matches `/atlas` and `/atlas/...`. That rule comes after the `/atlas` rules and carries `publicHeaders`, which include the static policy with `'unsafe-inline'`; later rules win per key. The proxy sets a nonce policy for the same paths. The comment at next.config.js:77-79 says the two policies must never apply to the same response.
- Root cause: The exclusion pattern was written for `/crm` and not extended when the `/atlas` short address was added.
- Attack prerequisites: An HTML or script injection in the Atlas screens.
- Impact: Depending on which header Next keeps, Atlas either runs under the weaker `'unsafe-inline'` policy or under both policies at once. Atlas is the CRM landing page.
- Recommended fix: Change the pattern to exclude both prefixes, for example `/((?!(?:crm|atlas)(?:/|$)).*)`.
- Regression test: Fetch `/atlas` and assert exactly one `Content-Security-Policy` header that contains a nonce and no `'unsafe-inline'` in `script-src`.
- Limits of this verification: I did not run the server, so I do not know which header is sent.

### INFRA-01-F09: Gaps in the release secret scanner, the audit script output and `.gitignore`
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-540
- Files and lines: scripts/lib/secret-scan.cjs:35; scripts/security/full-code-audit.mjs:118, 350-354, 383-385; .gitignore:1-43; scripts/package-release.cjs:33
- Evidence: The named-assignment rule lists 15 variable names. Names used in `src/` and absent from it: `FIELD_ENC_KEYS`, `FIELD_INDEX_KEY`, `FORM_TOKEN_SECRET`, `ANTHROPIC_ADMIN_API_KEY`, `WA_ACCESS_TOKEN`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN`. The field encryption keys are plain base64 and have a `kid:` prefix, so no shape rule catches them either. The audit script writes excerpts of matching lines to `audit-output/` and masks secrets to the first four and last two characters. `.gitignore` does not list `audit-output/`, `security-assessment/`, `.audit-state`, `.claude` or `.mcp.json`, all of which exist in the project folder (`.vercelignore` does list them). `package-release.cjs` lists `.env.example`, which does not exist.
- Root cause: The lists were written at different times and not kept in step.
- Attack prerequisites: A developer pastes one of these values into a tracked file, or the project is put into git as it stands.
- Impact: The key that protects stored TFNs and bank details could ship in a release zip or a commit without the guard firing; audit output and agent tool state could be committed.
- Recommended fix: Add the missing names to both scanners and allow a `kid:value` form. Add the five paths to `.gitignore`. Mask secrets fully in the audit report.
- Regression test: A unit test that feeds `FIELD_ENC_KEYS=k1:<44 random base64 chars>` to `scanText` and expects a finding; a test that compares the scanner's name list with the `process.env` names found in `src/`.
- Limits of this verification: The scanner was read, not run.

### INFRA-01-F10: The generated AI-crawler files state the fee guarantee without the TFN-only limit
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: scripts/generate-llms.mjs:187-188, 198, 215, 235, 244, 253, 468, 623; supabase/migrations/036_guarantee_tfn_only.sql:2-3
- Evidence: The constant `GUARANTEE` and its German, Japanese, French, Italian and Spanish versions promise a refund of the difference with no mention that it applies to TFN-only returns. The compliance guard `FORBIDDEN` (lines 326-348) has no rule for it. `public/llms.txt:21` carries the unscoped sentence, and neither generated file contains "TFN-only". Migration 036 records the owner's rule that the guarantee does not apply with ABN income.
- Root cause: The wording was copied from the site pages, and the scope rule was applied to Will's answers only.
- Attack prerequisites: None.
- Impact: A customer with ABN income can point to a published, unqualified guarantee. The script comment says the text is verbatim from the site and client agreement, so the same wording may be on the pages themselves (other units).
- Recommended fix: Have the owner confirm the wording; add the TFN-only scope to the six constants and a guard rule that fails on "refund the difference" without it.
- Regression test: `assertClean` test with an unscoped guarantee sentence expecting failure.
- Limits of this verification: I did not read the site pages or the client agreement.

### INFRA-01-F11: Table, RLS, function, grant, storage and destructive-statement inventory (migrations only)
- Severity: INFORMATIONAL
- Confidence: high for files read in full, medium for files only searched
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: as listed in the tables
- Evidence:

No migration contains a `CREATE POLICY` statement. With RLS on and no policy, `anon` and `authenticated` can do nothing; `service_role` bypasses RLS and can read, insert, update and delete. Where RLS is off, access for `anon` and `authenticated` depends on the default grants, which only 049 (not run) revokes.

| table | created | RLS enabled at | policies | anon / authenticated per migrations | service_role | note |
|---|---|---|---|---|---|---|
| crm_clients | 001:7 | 001:63 | none | no access | read, insert, update, delete | brand column in 047 (not applied) |
| crm_tasks | 001:26 | 001:64 | none | no access | full | holds tfn, bank_details, tfn_norm, completion_token |
| crm_audit | 003_audit_log:8 | 003_audit_log:22 | none | no access | full | |
| partners | 003_partners:2 | 013:11 | none | no access after 013 | full | open between 003 and 013 |
| wa_system_status | 006:14 | 006:62 | none | no access | full | dropped in 035:34 |
| wa_system_events | 006:50 | 006:63 | none | no access | full | dropped in 035:33 |
| wa_conversations | 007:12 | 007:71 | none | no access | full | dropped in 035:30 |
| wa_messages | 007:59 | 007:72 | none | no access | full | dropped in 035:29 |
| wa_knowledge_base | 008:12 (search only) | 008:24 (search only) | none found | no access | full | dropped in 035:32 |
| wa_pending_messages | 009:15 | 009:34 | none | no access | full | dropped in 035:31 |
| form_funnel_events | 012:12 | 012:25 | none | no access | full | |
| form_settings | 014:36 | 014:50 | none | no access | full | dropped in 035:40 |
| crm_leads | 016:17 | 016:35 | none | no access | full | written by SECURITY DEFINER trigger |
| will_customers | 021:19 | 028:30 | none | no access after 028 | full | no RLS and published to Realtime between 021 and 028 |
| will_messages | 021:48 | 028:31 | none | no access after 028 | full | same window |
| will_tasks | 021:62 | 028:32 | none | no access after 028 | full | same window |
| will_templates | 021:76 | 028:33 | none | no access after 028 | full | |
| will_suggestions | 021:93 | 028:34 | none | no access after 028 | full | dropped in 035:41 |
| will_jobs | 021:107 | 028:35 | none | no access after 028 | full | same Realtime window |
| will_state_history | 021:121 | 028:36 | none | no access after 028 | full | |
| will_settings | 021:132 | 028:37 | none | no access after 028 | full | 028:13-14 says it holds the WhatsApp access token in clear text |
| will_knowledge | 022:12 | 028:38 | none | no access after 028 | full | published to Realtime in 022:32, removed in 028:55-61 |
| will_audit | 023:10 | 028:39 | none | no access after 028 | full | |
| will_processed_messages | 024:11 | 028:40 | none | no access after 028 | full | |
| will_known_contacts | 027:13 | 028:41 | none | no access after 028 | full | also created in RESET_WILL_FRESH_START.sql:16 |
| will_lost_analysis | 031:38 | 031:75 | none | no access | full | |
| will_ai_usage | 042:20 | 049:40 only (049 not run) | none | **read and write possible if default grants apply** | full | see F02 |

050 creates no table despite its file name; it adds three columns to `will_customers`.

Functions:

| function | defined | SECURITY DEFINER | search_path fixed | note |
|---|---|---|---|---|
| get_dashboard_stats(text,text) | 002:19 | no | only by 049:72 (not run) | callable by anon through RPC until 049:60; RLS makes it return zero counts |
| crm_capture_lead() | 016:85, 017:86, 018:44, 019:77, 020:40, 048:48 | yes | only by 049:70 (not run); see F03 | trigger on crm_tasks |
| will_on_form_received() | 021:147, 038:15, 048:14 | yes | only by 049:71 (not run); see F03 | trigger on crm_tasks |
| crm_norm_email(text) | 017:26 | no | no | IMMUTABLE helper |
| crm_norm_phone(text) | 019:26 | no | no | IMMUTABLE helper |
| crm_lead_lang(text) | 020:18 | no | no | IMMUTABLE helper |
| will_bump_counter(text,int) | 029:32 | no | yes, 029:37 | callable by anon through RPC until 049:60; RLS on will_settings makes the insert fail |

Grants: 045:7-10 grants table and sequence rights to `service_role` only. 049:58-67 revokes from `anon`, `authenticated` and PUBLIC and grants EXECUTE to `service_role` (not run). No migration grants anything to `anon` or `authenticated`; the rollback note at 049:32-34 would.

Storage: no migration creates a bucket or a policy on `storage.objects`. The `uploads` bucket is created by hand (001:68-78, with the instruction to keep it private and add no public SELECT policy). 049:76 sets `public = false` (not run). The application refuses to upload if the bucket is public (`src/lib/supabase.ts:76-83`).

Realtime: 021:191-206 and 022:30-33 add five tables to `supabase_realtime`; 028:52-64 removes them. No Realtime subscription exists in `src/`.

Destructive statements: 017:73-78 and 019:64-70 delete duplicate `crm_leads` rows (019 merges people who share a phone number, which 018:9-11 said should not be merged); 019:23 drops column `country`; 035:29-41 drops eight tables with CASCADE; 034:30, 040:18 and 041:10 delete rows from `will_jobs` and `will_templates` (search only); 047:46-57 drops the unique constraint on `wa_id`; `supabase/RESET_WILL_FRESH_START.sql:30` truncates tables (search only); 015:53-55, 030:33-58 and 036:13-46 are bulk updates.

Headers that say the migration has not been run: 047:18, 049:3, 050:4.
- Root cause: n/a
- Attack prerequisites: n/a
- Impact: n/a
- Recommended fix: Run the verification queries at 049:78-94 against the live database and keep the output with this audit.
- Regression test: n/a
- Limits of this verification: Migrations only. Tables, policies, grants or buckets made by hand in the dashboard are invisible here.

### INFRA-01-F12: Minor configuration and script observations
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: next.config.js:53, 51; scripts/reset-form-links.mjs:19-20, 38, 46-55; scripts/indexnow.mjs:30; supabase/migrations/002_dashboard_stats.sql:46, 64-65; .github/workflows/ci.yml:3, 24, 27; .vercelignore:4-5
- Evidence:
  - HSTS is sent without `includeSubDomains`; `X-XSS-Protection` is a retired header.
  - Form slug generation uses `byte % 31`, which is slightly biased, and the slugs are stored in `config/form-paths.js`. They are obscurity, not access control.
  - `reset-form-links.mjs --apply` rewrites `.sql` and `.md` files across the repository, so it can edit comments in migrations that have already run (for example the `(/start` text at 015:6).
  - `indexnow.mjs` submits any argument starting with `http` without checking the host. The key in the file is the public IndexNow key, not a secret.
  - `get_dashboard_stats` casts stored text to JSON and numbers; one malformed row makes the whole dashboard call fail.
  - CI: token is read-only (`contents: read`), trigger is `pull_request` and `push` to main (no `pull_request_target`), both actions are pinned to a commit hash, `persist-credentials` is false, install runs with `--ignore-scripts`, and no secret is referenced. The comment on line 3 still says to pin the actions.
  - `docs`, `scripts` and `supabase` are uploaded to Vercel builds by design.
- Root cause: n/a
- Attack prerequisites: n/a
- Impact: Small hardening and robustness gaps.
- Recommended fix: Add `includeSubDomains` once all subdomains serve HTTPS; restrict the link-reset walk to `src`, `config`, `e2e` and `__tests__`; validate the host in `indexnow.mjs`.
- Regression test: n/a
- Limits of this verification: The two action commit hashes could not be compared with the upstream tags without network access (see Open questions).

## Checked and found sound

- RLS enabled in the creating migration, no policies: 001:63-64, 006:62-63, 007:71-72, 009:34, 012:25, 014:50, 016:35, 031:75.
- RLS retrofit for all twelve early `will_*` tables and removal from Realtime: 028:30-41, 52-64.
- Atomic AI budget counter with a fixed `search_path`, not SECURITY DEFINER: 029:32-56.
- Brand column defaults and check constraint; unique index moved to `(wa_id, brand)`: 047:22-58.
- Triggers scoped by brand: 048:27, 67, 72-74.
- Host routing is default-deny on Student Visa Tax hosts; host pattern is grouped, anchored and accepts the trailing dot; API allowlist is empty unless `SVT_FORMS_ENABLED=true`; `/_next/image` closed on those hosts: config/brand-routing.js:46, 61-62, 78-104.
- Security headers on all non-CRM paths; `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`; `poweredByHeader: false`; type errors fail the build: next.config.js:40-43, 48-61, 128, 133.
- CRM and Atlas responses are `noindex` and `private, no-store`: next.config.js:119-122, 150-154.
- API responses are `no-store`: vercel.json:19-32.
- Report-only CSP value is validated before use and is off by default: config/csp-report-only.js:51-58, 94-96.
- CI workflow permissions, triggers, pinning and secrets: .github/workflows/ci.yml:6-13, 24-33.
- Dependabot covers npm and GitHub Actions weekly: .github/dependabot.yml:4-28.
- Env files and key files ignored: .gitignore:15-24, 41-43; .vercelignore:6-22.
- Release packager: allowlist, refuses symlinks and special files, reports file, line and type only, verifies the archive listing, passes the file list to `zip` on stdin with no shell: scripts/package-release.cjs:29-38, 62-79, 100-102, 125-137.
- Secret scanner never returns the matched text: scripts/lib/secret-scan.cjs:75-97.
- Sealing script: dry run by default, AES-256-GCM with a random 12-byte IV and row-bound AAD, skips sealed values, prints counts only, reads keys from the environment: scripts/seal-legacy-task-fields.mjs:15, 31-37, 54-57, 66.
- `build-offline.sh` restores the source file from a trap on exit, interrupt and termination: scripts/build-offline.sh:25-30.
- `generate-llms.mjs`: no network, no child process, escapes XML, refuses to write on an implausible parse, blocks prices in output: scripts/generate-llms.mjs:59-66, 326-348, 364-365, 804-806.
- `svt-og-images.mjs` and `will-review.py`: local files only, no network, no secrets: svt-og-images.mjs:8-19; will-review.py:12.
- `full-code-audit.mjs`: read-only on source, writes only under `audit-output/`, the one network call is `npm audit` through `execFileSync` with fixed arguments: full-code-audit.mjs:357-366, 383-385.
- No secret, token, password or TFN literal found in any file of this unit.

## Open questions

1. Which migrations have actually been run on the production database, in which order, and was 048 or any other `CREATE OR REPLACE` run after 049?
2. Does `crm_tasks.tfn_norm` still hold values on the live database (F01)?
3. Is `will_ai_usage` reachable with the anon key today (F02)? The queries at 049:78-94 answer this and the bucket and Realtime questions.
4. Is the `uploads` bucket private on the live project, and are there any policies on `storage.objects`? No migration defines either.
5. 028:13-14 states that `will_settings` holds the WhatsApp access token in clear text. Is that still the case, or is it now sealed or kept in an environment variable only? (Store code is in another unit.)
6. Do the pinned commit hashes in `ci.yml:24, 27` belong to the official `actions/checkout` and `actions/setup-node` repositories at the tags named in the comments? A hash can resolve to a commit in a fork, so this needs a check against GitHub.
7. Which `Content-Security-Policy` header does a browser receive on `/atlas` (F08)?
8. Is `FORM_TOKEN_ENFORCE` on in production, so that a form cannot be submitted with someone else's number (F06)?
9. Is the unqualified guarantee wording in the AI-crawler files what the owner wants published (F10)?
10. `INFRA-01-files.txt` lists four files with 0 lines that are not empty; the generator of the file lists may have miscounted elsewhere too.
