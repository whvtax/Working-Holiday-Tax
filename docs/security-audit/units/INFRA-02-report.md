# INFRA-02 report

Scope note. This is a static, read-only review of repository files. **The live Supabase database and the Vercel project settings were NOT inspected.** Whether any migration has been applied, which tables, grants, policies, publications and functions actually exist, which environment variables are set (`CSP_NONCE_DISABLED`, `CSP_REPORT_ONLY`, `SVT_FORMS_ENABLED`, cron secrets), which Node version and domains the Vercel project uses, and whether Vercel deployment protection is on, are all unknown to this review. No script, SQL, build, test or scanner was run. No network was used, so no package was checked against any advisory database.

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| .github/dependabot.yml | 28 | 1-28 | REVIEWED |
| .github/workflows/ci.yml | 40 | 1-40 | REVIEWED |
| config/brand-routing.d.ts | 18 | 1-18 | REVIEWED |
| config/form-paths.d.ts | 6 | 1-6 | REVIEWED |
| config/form-paths.js | 28 | 1-28 | REVIEWED |
| eslint.config.mjs | 29 | 1-29 | REVIEWED |
| playwright.config.ts | 40 | 1-40 | REVIEWED |
| postcss.config.js | 7 | 1-7 | REVIEWED |
| scripts/build-language-rules.mjs | 29 | 1-29 | REVIEWED |
| scripts/export-legacy-wa.sql | 39 | 1-39 | REVIEWED |
| scripts/svt-long-index.mjs | 31 | 1-31 | REVIEWED |
| supabase/RESET_WILL_FRESH_START.sql | 40 | 1-40 | REVIEWED |
| supabase/migrations/003_audit_log.sql | 26 | 1-26 | REVIEWED |
| supabase/migrations/003_partners.sql | 17 | 1-17 | REVIEWED |
| supabase/migrations/004_partner_paid_tracking.sql | 14 | 1-14 | REVIEWED |
| supabase/migrations/005_partner_email_and_per_client_payments.sql | 13 | 1-13 | REVIEWED |
| supabase/migrations/008_wa_knowledge_base.sql | 29 | 1-29 | REVIEWED |
| supabase/migrations/010_manual_labels.sql | 22 | 1-22 | REVIEWED |
| supabase/migrations/011_unread_tracking.sql | 18 | 1-18 | REVIEWED |
| supabase/migrations/013_partners_rls.sql | 13 | 1-13 | REVIEWED |
| supabase/migrations/022_will_knowledge.sql | 36 | 1-36 | REVIEWED |
| supabase/migrations/023_will_audit.sql | 19 | 1-19 | REVIEWED |
| supabase/migrations/024_will_processed_messages.sql | 15 | 1-15 | REVIEWED |
| supabase/migrations/025_will_unread_count.sql | 17 | 1-17 | REVIEWED |
| supabase/migrations/026_will_last_message_at.sql | 20 | 1-20 | REVIEWED |
| supabase/migrations/027_will_known_contacts.sql | 16 | 1-16 | REVIEWED |
| supabase/migrations/032_estimate_invoice_layout.sql | 30 | 1-30 | REVIEWED |
| supabase/migrations/033_lost_recovery_message.sql | 20 | 1-20 | REVIEWED |
| supabase/migrations/034_one_pending_followup.sql | 40 | 1-40 | REVIEWED |
| supabase/migrations/035_drop_legacy_wa_tables.sql | 41 | 1-41 | REVIEWED |
| supabase/migrations/037_will_scale_indexes.sql | 37 | 1-37 | REVIEWED |
| supabase/migrations/039_message_provider_id_index.sql | 20 | 1-20 | REVIEWED |
| supabase/migrations/040_one_pending_auto_reply.sql | 28 | 1-28 | REVIEWED |
| supabase/migrations/041_will_templates_unique_key.sql | 18 | 1-18 | REVIEWED |
| supabase/migrations/042_will_ai_usage.sql | 34 | 1-34 | REVIEWED |
| supabase/migrations/043_will_customer_outcome.sql | 17 | 1-17 | REVIEWED |
| supabase/migrations/044_will_refund_tracking.sql | 6 | 1-6 | REVIEWED |
| supabase/migrations/045_service_role_grants.sql | 10 | 1-10 | REVIEWED |
| supabase/migrations/046_guarantee_tfn_only_again.sql | 27 | 1-27 | REVIEWED |
| supabase/migrations/050_mia_tables.sql | 18 | 1-18 | REVIEWED |
| package.json (extra, required by task) | 45 | 1-45 | REVIEWED |
| next.config.js (extra, required by task) | 335 | 1-335 | REVIEWED |
| vercel.json (extra, cron definitions) | 43 | 1-43 | REVIEWED |
| package-lock.json (extra) | 11339 | grep only | PARTIALLY_REVIEWED (grep for `resolved` hosts, `hasInstallScript`, git/http/file specifiers, `integrity` count, resolved versions of the direct dependencies; not read line by line) |

Unit list: 40 of 40 files, 956 lines, all read in full. Extra files read in full: 423 lines.

Files opened only to judge a finding (not part of this unit, not fully audited here): `config/brand-routing.js` (lines 1-124 of 125), `config/csp-report-only.js` (1-105), `src/proxy.ts` (1-127), `supabase/migrations/028_will_rls.sql` (1-74), `supabase/migrations/049_rls_and_function_lockdown.sql` (1-94), `src/app/api/will/tick/route.ts` (1-79), `src/app/api/will/orphan-sweep/route.ts` (1-15), `.vercelignore`, `.gitignore`, `.mcp.json`. Grep only: all `supabase/migrations/*.sql` for `CREATE TABLE`, `ENABLE ROW LEVEL SECURITY`, `CREATE POLICY`, `supabase_realtime`, `SECURITY DEFINER`, `REFERENCES will_customers`; `src` for `next/image`, a line-leading `'use server'`, `ANON_KEY`, `will_ai_usage`.

## Table RLS as written in the migrations (not the live database)

No `CREATE POLICY` statement exists in any file under `supabase/migrations` (grep). Every table therefore follows one model: RLS on with zero policies = deny-all for `anon` and `authenticated`; the server uses the service role, which bypasses RLS. "Service role only" below means exactly that. Where RLS is off, access for `anon`/`authenticated` depends on table grants, which this review cannot see.

Tables created or altered by files in this unit:

| table | created in | RLS enabled in | policies | read / insert / update / delete |
|---|---|---|---|---|
| crm_audit | 003_audit_log.sql:8 | same file, line 22 | none | service role only |
| partners | 003_partners.sql:2 | 013_partners_rls.sql:11 (NOT in the creating file) | none | service role only once 013 is applied; before that, anyone holding the anon key if default grants applied |
| wa_knowledge_base | 008_wa_knowledge_base.sql:12 | same file, line 24 | none | service role only; table dropped by 035:32 |
| wa_conversations (altered by 010, 011) | 007 (outside unit) | 007:71 (grep) | none | service role only; dropped by 035:30 |
| will_knowledge | 022_will_knowledge.sql:12 | 028_will_rls.sql:38 (NOT in the creating file) | none | service role only once 028 is applied. 022:32 also adds it to the `supabase_realtime` publication; 028:55-63 removes it |
| will_audit | 023_will_audit.sql:10 | 028_will_rls.sql:39 | none | service role only once 028 is applied |
| will_processed_messages | 024:11 | 028_will_rls.sql:40 | none | service role only once 028 is applied |
| will_known_contacts | 027:13 (also RESET_WILL_FRESH_START.sql:16) | 028_will_rls.sql:41 | none | service role only once 028 is applied |
| will_ai_usage | 042_will_ai_usage.sql:20 | 049_rls_and_function_lockdown.sql:40 only; 049's own header says "NOT YET RUN ANYWHERE" | none | **RLS OFF until 049 is applied** (see F01): read/insert/update/delete open to `anon` and `authenticated` to the extent those roles hold table grants |
| will_customers (altered by 025, 026, 037, 043, 044, 050) | 021 (outside unit) | 028:30 | none | service role only once 028 is applied |
| will_jobs (034, 039, 040), will_messages (037, 039), will_templates (032, 041, 046) | 021 (outside unit) | 028:31-35 | none | service role only once 028 is applied |
| will_lost_analysis (altered by 033) | 031 (outside unit) | 031:75 (grep) | none | service role only |
| crm_clients, crm_tasks (altered by 003_partners, 005) | 001 (outside unit) | 001:63-64 (grep) | none | service role only |

Grants: 045 grants select/insert/update/delete on all public tables and usage/select on sequences to `service_role` only, plus default privileges (045:7-10). It revokes nothing. The revoke of `anon`/`authenticated`/`PUBLIC` privileges on tables, sequences and functions exists only in 049:58-63.

## Findings

### INFRA-02-F01: will_ai_usage is created without row level security; the only fix is in a migration marked as not yet run
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-862 (missing authorisation), CWE-284
- Files and lines: supabase/migrations/042_will_ai_usage.sql:20-34; supabase/migrations/049_rls_and_function_lockdown.sql:3, 6-10, 40; supabase/migrations/045_service_role_grants.sql:7-10
- Evidence: 042 has `CREATE TABLE IF NOT EXISTS will_ai_usage` and two indexes, and no `ENABLE ROW LEVEL SECURITY`. 028 (the retrofit for will_* tables) predates it and does not name it. The only statement that enables RLS on it is 049:40, and 049's header reads "NOT YET RUN ANYWHERE. Review first." 045 adds service-role grants but revokes nothing from `anon`/`authenticated`.
- Root cause: RLS is added per table by convention rather than enforced; the convention was missed for the third time (partners in 003, twelve will_* tables in 021-027, will_ai_usage in 042).
- Attack prerequisites: 049 not applied in production; the project URL and the anon key (designed by Supabase to be public; grep found no `ANON_KEY` reference in `src`, `config` or `next.config.js`, so this app does not publish it itself); `anon` holding table grants on this table (true by Supabase default for tables created before 30 Oct 2026 according to the comment in 045:1-2; 042 is dated 24 Sep).
- Impact: through PostgREST, read of every row (customer_id, feature, model, token counts, cost per call), and insert/update/delete of rows in the AI cost ledger. `src/lib/will/store-supabase.ts` references the table; whether a forged or deleted row can influence a spend cap or kill switch was not traced in this unit. Until 049 runs, functions in `public` also remain executable by `PUBLIC` (049:15-21), and the SECURITY DEFINER trigger functions have no pinned search_path (049:22, 70-72); those are outside this unit's file list.
- Recommended fix: review and apply 049 (after a backup), then run its verification queries (049:78-94). Add `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` to 042 itself so a rebuild from migrations is never open in between. Add a CI test that fails when a migration contains `CREATE TABLE` without RLS being enabled for that table in the same file.
- Regression test: a static test over `supabase/migrations/*.sql` asserting every created table name has a matching `ENABLE ROW LEVEL SECURITY` in its creating file; at runtime, a request with the anon key to `/rest/v1/will_ai_usage` must return no rows and a write must be refused.
- Limits of this verification: the live database was not inspected. It is unknown whether 042, 045 or 049 are applied, whether RLS was enabled by hand, or what grants `anon` holds.

### INFRA-02-F02: /atlas (the CRM under a short address) also matches the public header rule, so the static 'unsafe-inline' CSP is attached to it
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-693 (protection mechanism failure), CWE-1021 n/a
- Files and lines: next.config.js:107, 112, 150-155, 236-239; src/proxy.ts:86-114, 126
- Evidence: `NOT_CRM = '/((?!crm(?:/|$)).*)'` excludes only `/crm`. `/atlas` and `/atlas/:module` are rewritten to `/crm/atlas...` (236-239) but header rules match the requested path, so `/atlas` matches both the dedicated rule at 153-154 (`crmHeaders`, which in the default nonce mode carries NO CSP, line 107) and the `NOT_CRM` rule at 155 (`publicHeaders`, which includes `staticCsp` with `script-src 'self' 'unsafe-inline'`). The comment at 77-79 states the design intent that the two policies never apply to the same response. `src/proxy.ts:86` treats `/atlas` as CRM and sets the nonce CSP on the response (113).
- Root cause: `/atlas` was added to the CRM header rules and to the proxy matcher, but not to the `NOT_CRM` exclusion.
- Attack prerequisites: none for the misconfiguration itself. For it to matter, an HTML/script injection in a CRM screen reached through `/atlas` (the CRM renders customer-written WhatsApp text).
- Impact: depends on how the platform combines the two values, which static reading cannot settle. (a) If the config value replaces the proxy's value, `/atlas` runs under the 'unsafe-inline' policy and the strict nonce CSP intended for the CRM is silently absent on that address. (b) If both headers are sent, the browser enforces both; scripts stay nonce-restricted, but this is the "two CSPs" state the code comments call a debugging trap. (c) If the proxy value replaces the config value, there is no effect. `/crm/...` itself is not affected.
- Recommended fix: exclude atlas from the public rule, for example `'/((?!(?:crm|atlas)(?:/|$)).*)'`, and keep the Report-Only rule at 165 consistent (it uses the same constant).
- Regression test: unit test on the generated `headers()` array: for `/atlas` and `/atlas/x`, no matching rule may contribute a `Content-Security-Policy` key when nonce mode is on. Runtime: `curl -I` on a preview deployment for `/atlas` must show exactly one CSP header containing `'nonce-` and not `'unsafe-inline'` in `script-src`.
- Limits of this verification: header precedence between `next.config.js` headers and proxy response headers on Vercel was not tested. `CSP_NONCE_DISABLED` in the Vercel project was not inspected; if it is `true`, the whole CRM runs on the static policy by design (next.config.js:10, 107).

### INFRA-02-F03: Enforced public CSP is wider than the code needs on pages that collect tax file numbers and bank details; the tightened policy is Report-Only and off by default
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-693, CWE-1021 n/a
- Files and lines: next.config.js:18-46 (WHT), 87-105 (SVT), 15-16, 164-167; config/csp-report-only.js:14-36, 94-103; src/proxy.ts:38-44
- Evidence: the WHT static policy allows `script-src 'self' 'unsafe-inline'` plus googletagmanager.com and connect.facebook.net; `connect-src` allows `https://*.supabase.co`, `https://*.supabase.in` (any Supabase project, not only this one), `https://api.resend.com`, `graph.facebook.com`, `www.facebook.com`; `img-src` allows the same Supabase wildcards. `config/csp-report-only.js:14-25` records, with file references, that none of the Facebook, Resend, Supabase or Google Fonts origins are needed by public pages. That tightened policy is emitted only as Report-Only and only when `CSP_REPORT_ONLY=true` (94-95). The CRM nonce policy in `src/proxy.ts:44` repeats the same wide `connect-src`. SVT also keeps `'unsafe-inline'` for scripts (next.config.js:92).
- Root cause: prerendered pages cannot carry a per-request nonce (documented at next.config.js:64-80), and the origin list was never reduced after features moved server-side.
- Attack prerequisites: an HTML or script injection on a public form page or in the CRM. None was established in this unit.
- Impact: defence in depth only. With an injection, inline script runs on public pages, and data can be sent to any Supabase project, to Resend's API or to Facebook endpoints without the CSP stopping it. `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and `frame-ancestors 'none'` are present and do limit other routes.
- Recommended fix: run the Report-Only candidate on a preview, then promote its origin list to the enforced WHT policy; apply the same reduction to `connect-src`/`img-src` in `src/proxy.ts`; replace the Supabase wildcards with the single project host if any client call really needs it. Hash-based script CSP for static pages is the later step the file already names.
- Regression test: test on `next.config.js` output asserting the enforced WHT `connect-src` contains no `*.supabase.*`, `api.resend.com` or facebook origin, and SVT CSP never names a WHT or third-party origin beyond GA.
- Limits of this verification: no browser test; whether GA4 or any page breaks under the tighter list is unknown. The claims in `csp-report-only.js` about which origins are unused were not re-verified beyond the greps listed under Coverage.

### INFRA-02-F04: The image optimizer stays open on the WHT host for every *.supabase.co and *.supabase.in project although no page uses it
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-918 (limited, allow-listed server-side fetch), CWE-400
- Files and lines: next.config.js:139-145; config/brand-routing.js:83-87
- Evidence: `images.remotePatterns` allows `https` with hostname `**.supabase.co` and `**.supabase.in`, with no `pathname` and no project restriction. `config/brand-routing.js:83-87` closes `/_next/image` on SVT hosts and states "No page of either brand uses next/image". Grep of `src` for an import of `next/image` returned nothing (only a test mentions `/_next/image`). On WHT hosts the endpoint is still reachable.
- Root cause: remote patterns kept after the feature that needed them was removed; the wildcard covers all tenants of the provider.
- Attack prerequisites: none; any visitor can call `/_next/image?url=<public object in any Supabase project>&w=..&q=..` on a WHT host.
- Impact: the server fetches and re-encodes attacker-chosen images from any Supabase project and serves them from the brand's own origin; each distinct url/width/quality is billable image optimisation and cache on Vercel (cost and quota exhaustion). Private objects in this project's own bucket are not exposed by this (the optimizer sends no credentials). Local `/public` images can also be requested, which is harmless on WHT.
- Recommended fix: since nothing uses it, remove `remotePatterns` (and consider `images: { unoptimized: true }`), or pin to the exact project host with `pathname: '/storage/v1/object/public/**'`.
- Regression test: test that `nextConfig.images.remotePatterns` is empty or contains only the exact project hostname; runtime, `/_next/image?url=https://<other-project>.supabase.co/...` returns 400.
- Limits of this verification: not exercised at runtime; Vercel image optimisation settings and spend limits were not inspected. SVG handling relies on Next defaults (`dangerouslyAllowSVG` is not set, which is the safe default).

### INFRA-02-F05: Migration 046 can report success while leaving the guarantee sentence in the live TFN + ABN price message
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: n/a (business logic: guarantee is for TFN-only returns)
- Files and lines: supabase/migrations/046_guarantee_tfn_only_again.sql:15-27
- Evidence: the `WHERE` clause matches any body that contains the guarantee sentence (`LIKE '%If your tax refund is less than our fee ...%'`), but `replace()` removes only the sentence preceded by exactly two line feeds (`E'\n\n...'`). If the owner's Library copy has the sentence with different leading whitespace (one line feed, `\r\n\r\n`, a space, or at the start of the text), the row matches, `replace()` changes nothing, and the statement still reports one row updated. The same applies to `variant_b` (22-27). Only the key `price_tfn_abn` is handled.
- Root cause: the match condition and the replacement pattern are not the same string.
- Attack prerequisites: none; depends on the stored text.
- Impact: customers with ABN income could still be sent the refund-difference guarantee, which the business rule limits to TFN-only returns, while the operator believes the migration fixed it.
- Recommended fix: use the same pattern in both places (match on the `E'\n\n...'` form, plus a second statement for the bare sentence), then run a check query that returns any `will_templates` row with key `price_tfn_abn` (and any other non-TFN-only price key) whose `body` or `variant_b` still contains the sentence; expect zero rows.
- Regression test: an application-level test (already suggested by the code comment in 046:6-7) that the send path for TFN + ABN refuses or strips a Library body containing the guarantee sentence, independent of what the database row holds.
- Limits of this verification: the live `will_templates` rows were not read. Whether a policy guard in the send path already blocks the sentence for ABN customers was not traced (the sentence appears in 11 files under `src/lib/will`, none of which belong to this unit).

### INFRA-02-F06: RESET_WILL_FRESH_START.sql is a stale, destructive, brand-blind script kept next to the migrations
- Severity: LOW
- Confidence: high (script content), medium (effect)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-1164 n/a; closest CWE-459 (incomplete cleanup)
- Files and lines: supabase/RESET_WILL_FRESH_START.sql:16-19, 22-27, 30-38; supabase/migrations/035_drop_legacy_wa_tables.sql:41; supabase/migrations/050_mia_tables.sql:6-8
- Evidence: (a) the `TRUNCATE` list names `will_suggestions` (line 35), which 035:41 drops, so on a database with 035 applied the statement fails; the header claims "Safe to run more than once". (b) It truncates `will_customers`, `will_messages`, `will_tasks`, `will_jobs`, `will_state_history` with no brand filter; 050:6-8 states Student Visa Tax customers are rows in the same tables, so a "reset Will" would also erase Mia's data. (c) It leaves `will_audit` (which stores message previews per 023:14), `will_lost_analysis` and `will_ai_usage` untouched, so the "wipe" keeps personal data and customer ids; grep found no foreign key to `will_customers`, so `CASCADE` removes nothing extra. (d) Lines 16-19 create `will_known_contacts` without RLS if the table is missing. (e) Lines 22-27 copy every existing customer number into the permanent block list read by the webhook (027:7-8).
- Root cause: a one-off operational script was kept and not updated when tables were dropped and the second brand was added.
- Attack prerequisites: none externally; a staff member with SQL editor access runs it.
- Impact: operational: total loss of both brands' conversation data and permanent blocking of all current customers' numbers, or a failed run; no external exploit.
- Recommended fix: move it out of `supabase/` into an archive folder with a "do not run" header, or delete it; if a reset is still wanted, write a new brand-scoped script.
- Regression test: release check (`scripts/package-release.cjs`) or a test that fails when a `.sql` file outside `supabase/migrations` contains `TRUNCATE` or `DROP TABLE`.
- Limits of this verification: not run. Whether the Supabase SQL editor would roll back lines 22-27 when line 30 fails was not determined.

### INFRA-02-F07: HSTS has no includeSubDomains; a legacy XSS header is still sent
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-319 (HSTS scope), CWE-693
- Files and lines: next.config.js:51, 53
- Evidence: `Strict-Transport-Security: max-age=31536000` with no `includeSubDomains` (and so not preload-eligible). `X-XSS-Protection: 1; mode=block` is set; current browsers ignore it and old ones had bugs in that mode.
- Root cause: header values not revisited.
- Attack prerequisites: for HSTS, an active network attacker and a first visit to a subdomain over http.
- Impact: subdomains of both brand domains are not covered by the HSTS pin; cookies scoped to the parent domain could be exposed on a plain-http subdomain request. Vercel may add its own HSTS value for the domain; that was not inspected.
- Recommended fix: `max-age=63072000; includeSubDomains` once every subdomain of both domains is confirmed https-only (then consider `preload`); set `X-XSS-Protection: 0` or drop it.
- Regression test: assert the header value in a config test; `curl -I` on production.
- Limits of this verification: response headers of the live site were not fetched; DNS and subdomains were not inspected.

### INFRA-02-F08: Build and dependency hygiene gaps (grouped)
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: CWE-1104 n/a
- Files and lines: vercel.json:5; .github/workflows/ci.yml:24, 27, 31-33; package.json:15-44 (no `engines` key); next.config.js:135; .vercelignore:4-5; playwright.config.ts:14-15, 35; scripts/export-legacy-wa.sql:5-7, 16
- Evidence:
  1. Production install is `npm ci` (vercel.json:5), which runs lifecycle scripts; CI uses `npm ci --ignore-scripts` (ci.yml:33). The lockfile marks three packages with `hasInstallScript`: `fsevents` 2.3.3, `playwright/node_modules/fsevents` 2.3.2 and `unrs-resolver` 1.11.1, all flagged `dev`. `package.json` itself defines no `preinstall`/`postinstall`/`prepare` script.
  2. package.json has no `engines` field; CI pins Node 22 (ci.yml:29) while `@types/node` is `^20`. The Node version used by Vercel is a project setting that was not inspected.
  3. `experimental.serverActions.bodySizeLimit: '15mb'` (next.config.js:135): grep found no line-leading `'use server'` directive in `src`, so this appears to be dead configuration that would give any future server action a 15 MB body limit.
  4. `.vercelignore` deliberately leaves `docs`, `scripts`, `supabase`, `marketing` and `e2e` in the upload to Vercel (lines 4-5). These are not under `public/` and are not served, but audit reports and SQL scripts are copied to the build environment.
  5. The CI action pins are full commit SHAs with a version comment (ci.yml:24, 27). The SHA-to-tag mapping could not be verified without network access.
  6. Playwright starts `next start` with "whatever local .env exists" (playwright.config.ts:14-15); if that file holds production secrets, end-to-end runs execute against production services.
  7. `scripts/export-legacy-wa.sql` instructs exporting phone numbers and first names of all legacy leads to CSV files kept "outside the database" with no retention or storage guidance.
- Root cause: n/a (hygiene).
- Attack prerequisites: n/a.
- Impact: none demonstrated.
- Recommended fix: add `"engines": { "node": "22.x" }`; consider `npm ci --ignore-scripts` on Vercel after a preview build proves it works; delete the unused `serverActions` block; add `docs`, `scripts`, `supabase`, `marketing`, `e2e` to `.vercelignore` after a preview deployment; verify the two action SHAs against the upstream tags; document that e2e must use a test `.env`; state where the legacy CSV export is stored and when it is deleted.
- Regression test: n/a.
- Limits of this verification: Vercel settings not inspected; lockfile inspected by grep only.

### Dependency backlog for an external advisory check (no vulnerability status is claimed here)

This review did not consult any advisory source. The list below is the input for `npm audit`, OSV or GitHub advisories, to be run by someone with network access. "Resolved" is the version recorded in `package-lock.json` (lockfileVersion 3).

Runtime dependencies (package.json:15-24):

| package | range in package.json | resolved in lockfile |
|---|---|---|
| @supabase/supabase-js | ^2.45.4 | 2.106.0 |
| heic-convert | ^2.1.0 | 2.1.0 |
| libphonenumber-js | ^1.13.11 | 1.13.11 |
| next | ^16.4.6 | 16.4.6 |
| pdf-lib | 1.17.1 (exact) | 1.17.1 |
| react | ^19.2.8 | 19.2.8 |
| react-dom | ^19.2.8 | 19.2.8 |
| redis | ^4.7.0 | 4.7.1 |

Development dependencies (package.json:25-44):

| package | range | resolved |
|---|---|---|
| @playwright/test | 1.56.0 (exact) | 1.56.0 |
| @testing-library/jest-dom | ^6.9.1 | 6.9.1 |
| @testing-library/react | ^16.3.3 | 16.3.3 |
| @types/heic-convert | ^2.1.1 | 2.1.1 |
| @types/jest | ^30.0.0 | 30.0.0 |
| @types/node | ^20.14.10 | 20.19.41 |
| @types/react | ^19.2.18 | 19.2.18 |
| @types/react-dom | ^19.2.5 | 19.2.5 |
| autoprefixer | ^10.4.19 | 10.5.0 |
| axe-core | 4.11.4 (exact) | 4.11.4 |
| eslint | ^9.39.5 | 9.39.5 |
| eslint-config-next | ^16.4.3 | 16.4.3 |
| jest | ^30.3.0 | 30.4.2 |
| jest-environment-jsdom | ^30.4.1 | 30.4.1 |
| postcss | ^8.4.39 | 8.5.26 |
| tailwindcss | ^3.4.6 | 3.4.19 |
| ts-jest | ^29.4.6 | 29.4.9 |
| typescript | ^5.5.3 | 5.9.3 |

Lockfile facts from grep: 778 `resolved` entries, all `https://registry.npmjs.org`; 778 `integrity` entries; no `git+`, `github:`, `http://`, `file:` or `link:` specifier found; no `.npmrc` at the repository root. Transitive packages (about 750) were not listed or reviewed. `.mcp.json` runs `npx -y @playwright/mcp@0.0.83` (developer tooling outside the lockfile, fetched at run time; excluded from Vercel by `.vercelignore:9`). Points worth the external check in particular: `heic-convert` and `pdf-lib` parse customer-supplied files, and `pdf-lib` 1.17.1 is an exact pin, so Dependabot will raise it only as an explicit update.

## Checked and found sound

- Browser source maps: `productionBrowserSourceMaps` is not set anywhere in next.config.js, so the Next default (off) applies. Not verified against the built `.next` output.
- `poweredByHeader: false` (next.config.js:128); `typescript.ignoreBuildErrors: false` (133).
- Clickjacking: `X-Frame-Options: DENY` (50) and `frame-ancestors 'none'` in all three enforced policies (43, 102; src/proxy.ts:49).
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, restrictive `Permissions-Policy`, `Cross-Origin-Resource-Policy: same-origin` with a narrow `/email` exception on WHT only (49-59, 208-215).
- `'unsafe-eval'` only when `NODE_ENV === 'development'` (26, 92; src/proxy.ts:35).
- `/crm` and `/atlas` responses: `X-Robots-Tag` noindex and `Cache-Control: private, no-store` (119-122, 150-154); `/api` responses: noindex (157) and `no-store` (vercel.json:19-32).
- `NOT_CRM` uses a path boundary so `/crmx` still gets security headers (112).
- Redirects: every destination is a fixed same-site path or a same-site path built from a named parameter; no destination is an absolute URL or takes a host from user input, so no open redirect (243-331). `/complete/:token` discards the token (253-257). WHT redirects are wrapped by `whtOnly` (245; brand-routing.js:108-110).
- Rewrites: `afterFiles` `/atlas` rules run after the SVT `beforeFiles` rules, and `fallback` is empty; no rewrite points at an external origin (231-242).
- SVT host pattern is grouped and anchored, covers subdomains and the trailing-dot form, and escapes dots (brand-routing.js:52-64). SVT API allow-list is empty unless `SVT_FORMS_ENABLED=true` (41-47).
- CSP Report-Only: the report URI from the environment is validated to a same-site path or an https URL with no separator characters before being placed in the header (csp-report-only.js:51-58), so no header or directive injection through that variable.
- Cron definitions (vercel.json:9-18): both targets, `/api/will/tick` and `/api/will/orphan-sweep`, call `cronAuthorized()` first and return 401 otherwise (tick/route.ts:18; orphan-sweep/route.ts:11); both export `maxDuration = 60`. The implementation of `cronAuthorized` in `src/lib/will/auth.ts` was NOT read in this unit.
- CI workflow: `permissions: contents: read`, `pull_request` (not `pull_request_target`), `persist-credentials: false`, no secrets referenced, actions pinned by SHA, `npm ci --ignore-scripts` (ci.yml:6-33).
- Dependabot: weekly npm and github-actions updates, nothing auto-merged (dependabot.yml:1-28).
- `.gitignore` and `.vercelignore` exclude `.env*` (except `.env.example`), `.data`, `*.pem`, `*.key` (.gitignore:15-24, 41-42; .vercelignore:6-22).
- No secret, token, key or password literal found in any file of this unit. `config/form-paths.js:16-23` holds the questionnaire URL slugs; these are obscurity, not access control (see Open questions).
- 003_audit_log, 008: RLS enabled in the creating file (003_audit_log.sql:22; 008:24). 013 retrofits `partners` (013:11).
- 024, 034, 040, 041: uniqueness is enforced by a primary key or partial unique index, which is the correct place for the idempotency and "one pending job" guarantees; the de-duplicating `DELETE` statements are scoped by kind, status and customer (034:30-40; 040:18-28; 041:10-18; 024:11-14).
- 032: rewrites the template only when the body still equals the seeded text exactly, so an owner edit is not overwritten (032:27-30).
- 043: `outcome` constrained to NULL, 'REFUND' or 'PAYABLE' (043:15-17).
- 035: drops are `IF EXISTS`; the export script is read-only `SELECT`s (export-legacy-wa.sql:16-39).
- `scripts/build-language-rules.mjs` and `scripts/svt-long-index.mjs`: read and write fixed paths inside the repository, take no arguments or environment input, and embed text with `JSON.stringify` (build-language-rules.mjs:17-20), so no injection into the generated TypeScript from the rule files. `svt-long-index.mjs:13` only accepts `\w+` identifiers.
- `eslint.config.mjs`, `postcss.config.js`, `config/*.d.ts`: no security-relevant behaviour.

## Open questions

1. Is 049 applied in production? Until it is, F01 stands and `anon`/`PUBLIC` keep whatever default table and function privileges the project has. 050 is marked "DRAFT. NOT APPLIED" and depends on the `brand` column from 047 (050:18).
2. Is `CSP_NONCE_DISABLED` set in Vercel? If `true`, the CRM runs on the static 'unsafe-inline' policy (next.config.js:10, 107).
3. On Vercel, when a proxy response sets `content-security-policy` and a `next.config.js` header rule sets the same key (the `/atlas` case in F02), which value reaches the browser, or are both sent?
4. Two migration files share the number 003 (`003_audit_log.sql`, `003_partners.sql`), and tables created in 003_partners and 021-027 only get RLS in a later file. In what order were they applied, and was there a period in production with those tables readable by the anon key?
5. 022:32 added `will_knowledge` to the `supabase_realtime` publication and 028 removes it; is the publication empty today (verification query at 049:93-94)?
6. Do Dependabot `ignore` rules for major versions of `next`, `react`, `react-dom` and `tailwindcss` (dependabot.yml:14-22) also suppress security update pull requests for those packages in this repository's configuration? Not determinable from the file alone.
7. Do the commit SHAs in ci.yml:24 and :27 correspond to the versions named in their comments? Not verifiable offline.
8. The questionnaire slugs in `config/form-paths.js` are described as reset because "the form links had spread". Do the form pages and their APIs enforce anything beyond knowing the slug (payment state, token)? That belongs to the forms units; this unit only notes that the slugs are in source control and in the client build.
9. `will_audit.detail` stores message previews (023:14) and has no retention rule in the migrations; `will_processed_messages` was given `created_at` "so they can be purged" (024:8-9) but no purge exists in the migrations. Is retention handled in application code?
10. Does anything read `will_ai_usage` to enforce a spend limit (relevant to the impact of F01)?
