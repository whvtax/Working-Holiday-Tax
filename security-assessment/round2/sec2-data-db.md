# sec2-data-db: data layer, Supabase, field protection, retention, third parties (round 2)

Static review plus local jest only. No production access, no real data, no secrets printed, no
migration run, nothing deployed. Builds on `parts/sec-uploads-data.md` (F1 to F17); items already
reported there are referenced, not repeated. Both brands considered: SVT must stay isolated.

## 1. Summary

| ID | Sev | Status | Title | State |
|---|---|---|---|---|
| D2-01 | Low | Confirmed (repo), live unknown | `will_ai_usage` has no RLS; round 1 patch P2 was never added as a migration | Migration 049 written (file only) + regression test |
| D2-02 | Low | Confirmed (repo) | Public-schema functions executable by PUBLIC, so reachable as `/rest/v1/rpc/*` with the anon key (`get_dashboard_stats`, `will_bump_counter`) | In 049 |
| D2-03 | Low | Confirmed | Two SECURITY DEFINER trigger functions without a pinned `search_path` | In 049 |
| D2-04 | Low (integrity, brand isolation) | Confirmed by test | WHT `findExistingClient` was not brand scoped: a WHT submission could be merged into an SVT client | FIXED + 8 tests |
| D2-05 | Low | Confirmed by test | `archiveTaskByPhone` (Will "Mark lodged") matched tasks of either brand by phone digits and could delete and file the other brand's card | FIXED + 4 tests |
| D2-06 | Low (latent) | Confirmed | Whole error objects logged on data routes; a PostgREST error carries `details` (row or key values) | FIXED: `safeErr`, 20 call sites, 14 tests |
| D2-07 | Low | Confirmed | `deleteFiles` logged object paths that end in the customer's file name | FIXED |
| D2-08 | Info | Confirmed | No SQL or PostgREST filter injection found; guards added so it stays that way | 7 tests |
| D2-09 | Info | Confirmed | Service role is server-only, anon key is not used at all | 5 tests |
| D2-10 | Medium (design) | Confirmed fact | TFN, bank, DOB, address, passport no. plaintext; WhatsApp access token plaintext in `will_settings` | Tested envelope helper + plan (proposal) |
| D2-11 | Medium | Confirmed | Pending-card delete or archive leaves documents; abandoned pre-submit uploads never expire (round 1 F1, F2) | P1 patch verified on a scratch copy, orphan planner tested (proposal) |
| D2-12 | Info | Not assessable | Backups, PITR, storage-object recovery, region | Notes in section 7 |
| D2-13 | Info | Confirmed | Third-party data flows vs Privacy Policy (new mismatches M9 to M12) | Section 8, legal text not edited |
| D2-14 | Info | Confirmed | `form_funnel_events`: anonymous insert, no brand, no retention | Section 9 |

No Critical or High finding in this area. The most useful fixes are D2-01/02 (one reviewed SQL file)
and the retention work in D2-11; D2-04/05 are real cross-brand defects but internal only.

## 2. Findings

### D2-01 will_ai_usage without RLS (Low, Confirmed in repo, live state unknown)
- Evidence: `supabase/migrations/042_will_ai_usage.sql:20-34` creates the table; no `ENABLE ROW LEVEL SECURITY` for it in any migration (028 lists twelve other tables). No migration 049 existed (round 1 proposed P2 but only as text). 013, 028 and 042 show the convention failing three times.
- Attack path: anyone with the project URL and the anon key (public by design) calls `/rest/v1/will_ai_usage`; if Supabase default grants still apply to this older table, they can read the cost ledger and INSERT forged rows.
- Impact: Low. Columns are feature, model, token counts, cost and an internal customer id; no PII values. Forged rows distort the "System and costs" card only (the spend cap uses `will_settings` counters via `will_bump_counter`, not this table).
- Fix: `supabase/migrations/049_rls_and_function_lockdown.sql` (not run): `ENABLE RLS` on the table, plus a loop that enables RLS on every public table that lacks it (covers tables made by hand), `REVOKE ALL` on tables, sequences and functions from anon/authenticated/PUBLIC and the same as default privileges for future objects, `GRANT EXECUTE ... TO service_role`, and the verification queries.
- Test: `src/lib/__tests__/supabase-schema-guards.test.ts` (42 tests): every `CREATE TABLE` in the migrations must have `ENABLE ROW LEVEL SECURITY` somewhere; no `CREATE POLICY`; no `GRANT ... TO anon/authenticated/PUBLIC`. It fails without 049 (it failed for `will_ai_usage` before the file existed).
- Residual: the dashboard state of every table is unknown. Run the verification queries at the bottom of 049 before and after. If any table was made by hand, the sweep covers it.

### D2-02 RPC functions reachable with the anon key (Low, Confirmed in repo)
- Evidence: `002_dashboard_stats.sql:19` `get_dashboard_stats`, `029_will_ai_budget.sql:32` `will_bump_counter`, `crm_norm_*`. No `REVOKE EXECUTE`. In Postgres, functions are executable by PUBLIC by default and PostgREST exposes them as RPC.
- Today both run with the caller's rights, so RLS on the tables they touch denies anon (returns zeros / errors). It is one disabled flag away from leaking client counts and the refund total, and from letting anyone bump or reset the AI-spend counter (`will_settings`).
- Fix: in 049 (`REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated`, then grant to service_role). The app calls both only with the service role (`store-supabase.ts:1087`, `db.ts` RPC). Test: the guard suite above.
- Residual: Supabase may add functions in other schemas (`extensions`); not assessed.

### D2-03 SECURITY DEFINER without search_path (Low, Confirmed)
`016/017/018/019/020/048` `crm_capture_lead`, `021/038/048` `will_on_form_received`. A definer function with a mutable path can be hijacked by an object in an earlier schema; exploitation needs create rights in a schema on the path, which anon does not have, so Low. 049 pins `public, pg_temp`. Test: every SECURITY DEFINER function name found in the migrations must have an `ALTER FUNCTION ... SET search_path` in 049.

### D2-04 WHT client lookup crossed into SVT (Low, Confirmed by test, FIXED)
- Evidence: `src/lib/db.ts` `findExistingClient`: the brand filter was applied only when `brand === 'svt'` (the old comment: "WHT queries are unchanged, no brand filter"). `tax-form/route.ts:75` passes the brand, but tfn/abn/super forms and WHT submissions use the default.
- Attack path: any WHT submission (or a person who really used both brands) whose email or number equals an SVT client: the WHT task is created with the SVT client's id, `isReturning` is set, and on Done the WHT tax-return history is merged into the SVT client record.
- Impact: brand-separation breach inside the CRM and record pollution. No customer-visible leak (Will's lookups are brand scoped). An attacker cannot read the victim's record this way.
- Fix: WHT now uses `.neq('brand','svt')` (column is NOT NULL DEFAULT 'wht' since 047). If the column does not exist yet, PostgREST errors and WHT repeats the old unscoped query, so behaviour before migration 047 is unchanged; SVT never widens on error.
- Test: `src/lib/__tests__/db-brand-scope-round2.test.ts` (12 tests, in-memory PostgREST-like builder): WHT misses SVT client and SVT pending task by email and phone, still finds WHT and legacy rows, LIKE wildcards never widen, fallback when the column is missing, SVT never falls back.
- Residual: `form_funnel_events` and other tables are not brand filtered (D2-14).

### D2-05 "Mark lodged" could archive the other brand's card (Low, Confirmed by test, FIXED)
- Evidence: `db.ts` `archiveTaskByPhone(whatsapp)` read all `crm_tasks` and matched on phone digits regardless of brand; called from `app/api/will/actions/route.ts` (lodged) with `customer.waId`.
- Path: a number that exists in both brands; pressing Mark lodged for the WHT customer could pick the newest Done SVT card, delete its task row and file it. Needs a real person using both brands and a staff click, so Low.
- Fix: new `brand` parameter (default 'wht'), scoped query with the same missing-column fallback, and the route passes `customer.brand ?? 'wht'`.
- Test: same file, 4 tests (WHT selects only the WHT card and only that id is deleted; SVT the reverse; WHT with only an SVT card finds nothing).

### D2-06 / D2-07 PII in logs (Low, latent; FIXED)
- Evidence: 20 `console.error(..., err)` sites on `tfn-form`, `abn-form`, `super-form`, `tax-form` (4), `tax-form/upload`, `crm/tasks`, `crm/clients`, `crm/leads`, `crm/stats`, `db.ts` audit, `upload.ts`. A PostgrestError object includes `details`/`hint`; for a constraint failure that is `Failing row contains (...)` or `Key (col)=(value)`, which on `crm_tasks` means TFN, bank, address. Not reachable today (no NOT NULL or unique constraint on those columns), so it is latent, as round 1 F15 said.
- Fix: `src/lib/log-safe.ts` `safeErr()` returns name, code and message only, masks Failing-row, Key-value, invalid-input values, digit runs of 6+ and e-mail addresses, caps at 300 chars. `deleteFiles` and `markTaskDone`/`deleteTaskPermanent` no longer log object paths (they contain the customer's file name); the detail is still written to the task note for staff.
- Test: `log-safe.test.ts` (14 tests) including a source pin that none of nine data routes logs a raw `err`.
- Residual (not changed, outside the data scope or not reachable): `crm/login`, `crm/verify-otp`, `rate-limit.ts`, `store-file.ts` (dev only), `will/*` log their own errors. A grep for `console.*` with message bodies, names, numbers or tokens found none by value in the data layer. Vercel log retention and who can read logs: not assessable.

### D2-08 Injection review (Info, no vulnerability found)
- All SQL goes through supabase-js; no `pg`/`postgres` driver, no `sql` tag, no `exec_sql` RPC (test).
- Every user-influenced `ilike`/`like` escapes backslash, `%` and `_` first: `db.ts` (findExistingClient, search), `store-supabase.ts` (`searchCustomers`, `searchMessages`, `listCounters`). Digits-only variants are `\D` stripped.
- PostgREST filter-string injection happens through `.or()`/`.filter()`/`.not(..., 'in', '(...)')` with interpolated values. The only interpolations: `reclaimStaleJobs` `claimed_at.lt.${cutoff}` (ISO string from `Date`, server-built) and `.not('kind','in',\`(${kinds.join(',')})\`)` where `kinds` is the constant `CUSTOMER_FACING_JOB_KINDS`. `.in()` values go through the client's quoting. `.order(orderCol)` takes internal constants (PK names).
- Mass assignment: `updateClient` whitelists and length-caps fields (`db.ts` `asString`); `createTask` builds the row field by field; no `...body` spreads into `.update()/.insert()` in db.ts.
- Test: guard suite pins the two interpolation sites (a third one fails the test), the absence of raw SQL, and the escape helper in both data modules.
- Residual: `%value%` ILIKE on `will_messages.body` scans the table; staff-only, rate-limit not applied. Performance, not security.

### D2-09 Service role and anon key (Info, Confirmed)
`SUPABASE_SERVICE_ROLE_KEY` is read in exactly three server modules (`lib/supabase.ts`, `lib/will/store.ts`, `app/api/will/version/route.ts`); no client component imports `@/lib/supabase`, `db`, `crm-store`, `will/store*`, `will/service`, `will/claude` or `will/channel` (value imports; `import type` is allowed and used by two Will components); no `NEXT_PUBLIC_*` variable has a secret-looking name; the anon key is not referenced anywhere (so the only public Supabase value is the project URL, which is not secret). `getStore()` already fails closed in production when Supabase env is missing (the file store never holds production data). All checks are tests. The file `.env.example` holds placeholders only (checked, values redacted).
Residual: the key is a long-lived all-powerful credential held in Vercel; rotation and scope are operational (not touched). Supabase's newer `sb_secret_` keys and key-level revocation could narrow this: dashboard-side.

### D2-10 Field-level protection (Medium design, Confirmed fact; proposal + tested helper)
- Fields: `crm_tasks.tfn`, `bank_details`, `dob`, `address`; `crm_clients.dob`; passport number inside `crm_tasks.notes` as a "Passport No:" line; the WhatsApp access token in `will_settings` (`channel.ts` `saveWaCreds`, new vs round 1). All plaintext TEXT behind deny-all RLS. DOB is copied to `crm_clients` and never wiped (confirmed again, `db.ts` `initialUpdates.dob`).
- Delivered: `src/lib/field-crypto.ts`, unused by the app, with 14 tests: AES-256-GCM, fresh random IV, `enc1:<kid>:<iv>:<ct+tag>` envelope (fits the existing TEXT columns), AAD binds table, column and row id (moving a ciphertext to another row or column fails; dot-collision tested), every bit flip detected, wrong key / unknown kid / plaintext refused unless a backfill flag is on, rotation with `rewrapField`/`needsRewrap`, separate HMAC index key for duplicate detection (`blindIndex`), errors never contain value or key material, key-ring validation (32 bytes, no duplicates, index key distinct).
- Plan: `proposals/field-encryption/README.md`: keys in Vercel env, dual-read first, move passport number out of notes, backfill script with verify-then-update, flip off plaintext, rotation. No live column changed (Category C).
- What it does not defend (stated honestly in the plan): service-role key plus Vercel env compromise, or a hijacked staff session.
- Residual: until rolled out, a Supabase dashboard viewer, a backup or a leaked service key reads TFNs and bank numbers of pending customers in clear.

### D2-11 Retention, deletion, abandoned uploads (Medium; proposals, one planner applied)
- Confirmed again in the current tree: `deleteTaskAndArchive` (`db.ts`) still never calls `deleteFiles`; no job deletes abandoned pre-submit uploads or ages out pending cards, clients, leads or transcripts.
- Why not applied: deleting objects is irreversible (storage objects are not in database backups per Supabase docs; confirm), so it is not "safe and reversible by design". Implemented only the pure, side-effect-free planner `src/lib/orphan-uploads.ts` (8 tests: prefix allow-list, 14-day minimum age, referenced-by-any-task by decoded path in all three URL spellings, traversal-looking paths refused, unknown age kept, per-run cap).
- Proposal `proposals/retention-and-deletion/`: P1 patch (verified: applies cleanly, 4 tests pass on a scratch copy) with a reversible quarantine variant, P2 orphan runner (dry-run, quarantine not delete, abort if any `file_urls` fails to parse), P3 `tfn_norm` SQL, P4 retention classes table and an `eraseCustomer` outline. Periods are legal choices (round 1 Q3, Q7); get the supervising agent's answer first.
- Abandoned submissions today: objects under `tax-form/{selfie,bank,invoices}/` with no task, forever; plus orphan risk if a customer uploads then abandons. Public endpoint is rate limited (round 1 F10).

## 3. Policy and data flow table (what leaves the system)

| Recipient | What is sent | Where in code | Privacy Policy says |
|---|---|---|---|
| Supabase (region unknown) | Everything: CRM tasks, clients, leads, Will messages, files | `lib/supabase.ts`, `db.ts`, `will/store-supabase.ts` | s5 "secure storage"; no named provider, no country |
| Vercel (functions syd1, logs) | All requests, error logs | platform | not mentioned |
| Anthropic API (US) | WhatsApp transcript text; images and PDFs customers send (IDs, payslips, bank screens) when Will reads them; digests are redacted | `will/claude.ts`, `llm-transport.ts` | s7 "trusted service providers"; AI not mentioned (brand rule: never mention AI to customers) |
| Meta WhatsApp Cloud API | All messages, phone numbers, media | `will/channel.ts` | not named |
| Resend | Staff login OTP and security alerts to the admin address; masked IP, city, device. No customer data found | `crm/login/route.ts`, `security-watch.ts` | not named |
| Upstash Redis | Rate-limit counters (phone/email now hashed), OTP/session state, lockouts | `rate-limit.ts`, `crm-store.ts` | not named |
| Google Analytics (gtag) | Page views, events; `/crm` and `/complete` untagged; event params sanitised (test) | `components/layout/Analytics.tsx`, `lib/analytics.ts` | s6 names Google Analytics: consistent |
| Featurable | Server fetch of public Google reviews (no visitor data sent) | `googleReviewsServer.ts` | n/a |
| Meta Pixel / TikTok / others | Not loaded (no fbq, pixel or tag found; CSP allows `connect.facebook.net` for the WhatsApp connect page) | grep | n/a |

Mismatches (reported, legal text not edited; round 1 M1 to M8 stand):
- M9: s8 says records are kept 5 to 7 years and then destroyed; implementation deletes the sensitive fields at Done and keeps the rest indefinitely, and database backups keep deleted rows for the backup window (not stated).
- M10: s3 lists collected data but not the WhatsApp channel content or the passport photo; s7 names no overseas recipient although Anthropic (US), Meta and possibly Supabase/Redis regions are outside Australia. APP 8 and APP 5 notice need a lawyer (round 1 Q4).
- M11: s5 "access controls limited to authorised personnel": one shared CRM identity, access log now records document and bulk reads (`will/access-log.ts`) but not who.
- M12: s9 deletion right: no erasure path across crm_*, will_*, Redis, Meta, Anthropic (D2-11 P4).
- Not asserted: whether the Privacy Act or GDPR applies, whether a recipient is a "disclosure" or a "use" (APP 8 / s16C); needs the facts and counsel.

## 4. Storage bucket policies
No `storage.objects` policy exists in the repo (grep: none), so with RLS on `storage.objects` (Supabase default) the browser roles have no access; all reads and writes use the service role. The bucket's private flag, size limit and MIME list are dashboard settings (001 comments). 049 sets `public = false` (never widens); the runtime guard `assertUploadsBucketPrivate()` stays (round 1 F17: cached per warm instance). Verification queries are at the end of 049. The returned upload URL has the `/object/public/` form but is not fetchable while the bucket is private; staff view through `/api/crm/file` only. Not assessable: actual bucket config, signed-URL settings, CORS, storage logs.

## 5. Abandoned submission expiry
See D2-11 P2. Mid-form state itself is only the browser (nothing stored until upload or submit). Server-side: files under `tax-form/` with no task (orphans), `form_funnel_events` rows. Redis keys have TTLs.

## 6. Changes made to the tree (all covered by jest)
- `src/lib/db.ts`: brand scoping in `findExistingClient` and `archiveTaskByPhone`; `safeErr` in audit log; log lines no longer carry object paths.
- `src/app/api/will/actions/route.ts`: passes `customer.brand` to `archiveTaskByPhone`.
- `src/lib/log-safe.ts` and 14 routes/modules switched from raw `err` to `safeErr(err)` (abn/tfn/super/tax-form, tax-form/upload, crm tasks, tasks/[id], clients, clients/[id], tax-returns, notes, search, leads, stats; upload.ts).
- New, unused by the app: `src/lib/field-crypto.ts`, `src/lib/orphan-uploads.ts`.
- New SQL file, not run: `supabase/migrations/049_rls_and_function_lockdown.sql`.
- New tests: `db-brand-scope-round2`, `log-safe`, `field-crypto`, `orphan-uploads`, `supabase-schema-guards` under `src/lib/__tests__/`.
- Proposals: `security-assessment/proposals/field-encryption/`, `.../retention-and-deletion/` (patch, test, plan).

## 7. Backups, PITR, resilience (not assessable from the repo; what to check)
- Plan tier, daily backup retention, PITR enabled and window; region. Per Supabase documentation, database backups and PITR do not include Storage objects, so passports and statements have no backup unless you copy them; decide whether that is acceptable (it is also why deletion is irreversible).
- A deleted TFN stays in backups until they age out: state the window in the policy and do not promise immediate erasure.
- A restore drill has never been recorded in the repo. Test a restore into a scratch project, never into production, before relying on it.
- If field encryption is rolled out, the key must be backed up separately from the database backup or the backups become unreadable.
- 049 is idempotent and has a rollback block in its header.

## 8. Not assessed
Supabase dashboard (RLS state of each live table, grants, bucket config, storage policies, publication list, backups, region, who holds dashboard and service-role access, API logs), Vercel (env scopes, log contents and retention, effective headers), Upstash region and retention, Anthropic data retention and no-training settings, Meta terms, DPAs with processors, git history (secrets in old commits, whether `.env` was ever committed), the other five language versions of the Privacy Policy, real malware or decompression-bomb behaviour. Whether another agent's concurrent edits touch the same files: db.ts was edited in parallel (`refundFromNotes`); my edits were re-checked in place.

## 9. Other notes
- D2-14 `form_funnel_events`: anonymous insert (rate limited per IP), `session_id` free text up to 100 characters, no `brand` column written (the SVT tax form shares the name `tax-form`, so SVT visits are counted as WHT), no retention. Not personal data in normal use. Fix later: write `brand`, purge after 13 months.
- Round 1 items still open in the tree: F9 `will/media` still `private, max-age=3600` (confirm live header); F11 `tfn_norm` (P3); F1 and F2 (above); F10, F12 unchanged.
- Verification run: see section 10.

## 10. Verification
- New suites all pass: db-brand-scope-round2 (12), log-safe (14), field-crypto (14), orphan-uploads (8), supabase-schema-guards (42).
- Two existing tests had to follow the `archiveTaskByPhone(waId, brand)` change and were updated, not weakened: `will/__tests__/lodged-files-client` (source pin now expects the brand argument) and `will/__tests__/audit3-actions-31` (mock gained `neq`); both pass with `db`-related suites (23 tests).
- Final run: `tsc` reported one error in my test (unused variable, fixed afterwards) and two in another agent's `crm/file/__tests__/heic-bomb.test.ts` (Blob typing); `eslint` on changed files exit 0; full jest 399 of 405 suites pass (5236 tests). The full `jest src/lib src/app/api` run listed failures in suites outside this area (svt content/i18n/library, will pre-payment-one-line, medicare-auto, thanks-send-chain) and `upload-dangerous` (HEIC-as-jpeg magic bytes), none of which touch my changes (I only changed log lines in upload.ts); likely other agents' in-flight work, re-check on a quiet tree.
