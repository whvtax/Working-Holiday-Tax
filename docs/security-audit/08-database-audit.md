# 08. Database audit

Sources: `units/INFRA-01-report.md` (finding F11 inventory) and `units/INFRA-02-report.md` (RLS table), LIB-01, WILL-04, DEBATE-1 and DEBATE-2. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- All 51 migration files and `supabase/RESET_WILL_FRESH_START.sql` were read (a few by search only, as the INFRA reports state).
- The live database was NOT inspected. Tables, policies, grants, functions or buckets made by hand in the dashboard are invisible to this audit.
- Migrations are run by hand. There is no record in the repository of which have run. Two files are numbered 003.
- Headers that say the migration has not been applied: 047 (`047:18`), 049 (`049:3`, "NOT YET RUN ANYWHERE"), 050 (`050:4`).
- No migration contains a `CREATE POLICY` statement.

## Access model (STATIC ANALYSIS CONCLUSION, migrations only)

Every table uses one model: row level security ON with zero policies. That denies the `anon` and `authenticated` roles everything. The server uses the service role, which bypasses RLS and has full access. Where RLS is off, access for `anon` and `authenticated` depends on table grants, which only migration 049 revokes.

## Table and RLS inventory

| table | created | RLS enabled at | policies | anon / authenticated (per migrations) | note |
|---|---|---|---|---|---|
| crm_clients | 001:7 | 001:63 | none | no access | brand column in 047 (marked not applied) |
| crm_tasks | 001:26 | 001:64 | none | no access | holds tfn, bank_details, tfn_norm, completion_token |
| crm_audit | 003_audit_log:8 | 003_audit_log:22 | none | no access | |
| partners | 003_partners:2 | 013:11 | none | no access after 013 | open between 003 and 013 |
| form_funnel_events | 012:12 | 012:25 | none | no access | |
| crm_leads | 016:17 | 016:35 | none | no access | written by a SECURITY DEFINER trigger |
| will_customers | 021:19 | 028:30 | none | no access after 028 | no RLS and published to Realtime between 021 and 028; columns added by 050 (marked not applied) |
| will_messages | 021:48 | 028:31 | none | no access after 028 | same window |
| will_tasks | 021:62 | 028:32 | none | no access after 028 | same window |
| will_templates | 021:76 | 028:33 | none | no access after 028 | |
| will_jobs | 021:107 | 028:35 | none | no access after 028 | same Realtime window |
| will_state_history | 021:121 | 028:36 | none | no access after 028 | |
| will_settings | 021:132 | 028:37 | none | no access after 028 | 028:13-14 says it holds the WhatsApp access token in clear text |
| will_knowledge | 022:12 | 028:38 | none | no access after 028 | Realtime publication removed in 028 |
| will_audit | 023:10 | 028:39 | none | no access after 028 | stores message previews |
| will_processed_messages | 024:11 | 028:40 | none | no access after 028 | |
| will_known_contacts | 027:13 | 028:41 | none | no access after 028 | also created by the reset script without RLS |
| will_lost_analysis | 031:38 | 031:75 | none | no access | |
| will_ai_usage | 042:20 | 049:40 only | none | read and write possible if default grants apply, until 049 is run | R048 |
| wa_system_status, wa_system_events, wa_conversations, wa_messages, wa_knowledge_base, wa_pending_messages, form_settings, will_suggestions | 006 to 021 | in the creating file or 028 | none | no access | all dropped by 035 |

Migration 050 creates no table despite its file name; it adds three columns to `will_customers`.

## Functions

| function | SECURITY DEFINER | search_path fixed | note |
|---|---|---|---|
| get_dashboard_stats(text,text) | no | only by 049:72 | callable by anon through RPC until 049:60; RLS makes it return zero counts |
| crm_capture_lead() | yes | only by 049:70 | trigger on crm_tasks; redefined by 048 |
| will_on_form_received() | yes | only by 049:71 | trigger on crm_tasks; matches a chat by typed phone number (R008); redefined by 048 |
| crm_norm_email, crm_norm_phone, crm_lead_lang | no | no | immutable helpers |
| will_bump_counter(text,int) | no | yes, 029:37 | atomic AI budget counter |

Order matters: running 048 after 049 removes the `search_path` pin again (INFRA-01-F03). Run 048 first, then 049 last.

## Grants, storage, Realtime

- 045 grants table and sequence rights to `service_role` only and revokes nothing. Revokes for `anon`, `authenticated` and PUBLIC exist only in 049:58-67.
- No migration creates a bucket or a storage policy. The `uploads` bucket is made by hand; 049:76 sets it private. The application refuses to upload if the bucket is public (`src/lib/supabase.ts:76-83`).
- Five tables were added to the Realtime publication in 021 and 022 and removed in 028. No Realtime subscription exists in `src/`.

## Destructive statements

035 drops eight tables with CASCADE. 017 and 019 delete duplicate lead rows; 019 drops a column. 034, 040, 041 delete duplicate job and template rows. 047 drops the unique constraint on `wa_id` (replaced by `(wa_id, brand)`). `RESET_WILL_FRESH_START.sql` truncates the chat tables of both brands and names a table that no longer exists (R057, open: delete or archive the file).

## Sensitive columns at rest

- `crm_tasks.tfn` and `bank_details`: sealed with AES-256-GCM by the application, but only once `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` are set. Without keys the value is stored in plain text with a warning (R029, open).
- `crm_tasks.tfn_norm`: a plain copy that no code reads. The sealing script now clears it; the live column is unknown until the script is run with apply (INFRA-01-F01 row, fixed in code).
- Passport number, date of birth and address are never sealed (R029, owner decision).
- `will_settings`: WhatsApp access token in clear text (accepted, R070).
- `will_audit`: full phone number in some rows; the unmatched-form row now keeps the last four digits only (WILL-05-F07 fixed; masking the rest is part of R069).

## Query safety

- Queries go through the Supabase client with parameters. ILIKE wildcards are escaped; filter strings are built from server constants only (WILL-04, API-02).
- Many store reads drop the error and return empty, and several writes ignore the result (R093, open, staged change). The kill-switch read is the exception: a failed read counts as ON.
- Customer deletion is five unchecked deletes with the parent last, and leaves audit, AI usage and settings rows (R095, open).

## Findings summary

| topic | status | rows |
|---|---|---|
| `will_ai_usage` RLS, grant revokes, function `search_path`, private bucket: only in 049 | OPEN | R048 |
| No migration ledger; three files marked not applied | OPEN | R050 |
| 049 cannot cover functions created later | ACCEPTED (rerun the check query) | INFRA-01-F04 row |
| Migration 046 may leave the guarantee sentence in one Library message | OPEN (run the check query) | R056 |
| Cross-instance races needing SQL functions or a unique key | OPEN | R059, R104 |
| Reset script stale and brand-blind | OPEN | R057 |

## HYPOTHESES

- If 028 ran and 049 did not, every table except `will_ai_usage` is closed to the anonymous key and that one table is not.

## UNVERIFIED ASSUMPTIONS

- That 001 to 046 and 048 have all run on production in order, that the bucket is private, and that no table or policy was added by hand.

## NOT TESTED

- No query was run. The check queries at `049:78-94` are the recommended evidence; their output should be kept with this audit.
