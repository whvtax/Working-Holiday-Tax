# API-02 report

## Handler table (extra focus)

Legend. Auth: `S-crm` = `validateSessionFresh(crm_session cookie)` (lib/crm-store.ts:127); `S-will` = `sessionValid()` (lib/will/auth.ts:17, same cookie); `CRON` = `cronAuthorized()` (Bearer CRON_SECRET, x-cron-secret, or session; constant-time compare, lib/will/auth.ts:25-33); `NONE` = no session and no secret. Authorisation: the system has one staff role, so "session" means full access to both brands unless noted. CSRF guard = `crossSiteMutationReason` in src/proxy.ts (runs only for paths in the proxy matcher, see F01). "RL" = rate limit. **FLAG** = no session or secret check AND reads customer data, writes data, sends messages or uploads files.

| # | Method | Route | Auth | Authorisation | Input validation | Database effects | External side effects | Rate limit | Error behaviour | Flag |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | POST | /api/abn-form | NONE | public | sanitise*, validateIntake (email, phone, tfn, dob, marital), required name/email/phone; Sec-Fetch-Site cross-site refused | read crm_clients/crm_tasks (match by email/phone); insert crm_tasks (TFN/bank sealed); will_audit row via notifyFormReceived | Supabase Storage upload (selfie) | IP 30/15 min, person-hash 5/15 min, 120 MB/15 min by Content-Length | 400/403/429; 500 generic `submission_failed` | **FLAG** (write + upload) |
| 2 | POST | /api/super-form | NONE | public | as #1 | as #1 (task type super) | Storage upload | as #1 | as #1 | **FLAG** (write + upload) |
| 3 | POST | /api/tfn-form | NONE | public | as #1 | as #1 (task type tfn) | Storage upload | as #1 | as #1 | **FLAG** (write + upload) |
| 4 | POST | /api/analytics/funnel | NONE | public | allowlist of formName/eventType; sessionId cut to 100, lang to 10 | insert form_funnel_events | none | IP 5/15 min (default) | always `ok:true` on exception; insert error not checked | **FLAG** (write, no customer data) |
| 5 | POST | /api/tax-form/fix | NONE (signed form token, purpose `fix`, brand wht) | token names the customer | status must be `resident` or `whm`; host must be WHT; Sec-Fetch-Site guard | update crm_tasks tax status; settings (token used); will_audit | none | IP 20/15 min | 403/404/409/500 generic | **FLAG** (write; token-gated, see F07) |
| 6 | GET | /api/tax-form/link | NONE (signed form token) | token names the customer | token <= 512 chars, MAC verified, brand from Host | read settings, will_customers | none | IP 60/15 min | uniform `state:none` | **FLAG** (returns the customer's full WhatsApp number to the token holder; by design) |
| 7 | GET | /api/google-reviews | NONE | public | none (no input) | none | fetch to review provider (lib/googleReviewsServer.ts, not opened) | none (1 h revalidate) | `ok:false` | no (no customer data) |
| 8 | POST | /api/crm/login | NONE (pre-auth: password) | n/a | password string 1-200 chars | Redis: lockout counters, OTP hash (10 min), preauth id; login audit events | Resend email: OTP to CRM_ADMIN_EMAIL, alert email on lockout | per-IP lockout (reserve-before-verify) | 400/401/500 generic | **FLAG** (sends email + writes, pre-auth by nature; see F12) |
| 9 | POST | /api/crm/logout | optional S-crm | revocation only if session valid | `reason` optional | Redis: global revoke or single-session revoke | none | none | always `ok:true`, clears cookie | no (unauthenticated call only clears caller's cookie) |
| 10 | PATCH | /api/crm/clients/[id]/notes | S-crm | any staff | notes string cut to 10k | update crm_clients.notes | none | none | 500 `db_error` | |
| 11 | PATCH | /api/crm/clients/[id]/referral-payment | S-crm | any staff | `paid` boolean | update crm_clients.referral_commission_paid_at | none | none | 400/500 | |
| 12 | PATCH | /api/crm/clients/[id]/referral | S-crm | any staff | partnerId null or `^[A-Za-z0-9_-]{1,64}$`, must exist | update crm_clients.referred_by | none | none | 400/404/500 | |
| 13 | GET | /api/crm/clients/[id] | S-crm | any staff | none on id (used in `.eq`) | read crm_clients | none | none | 404/500 | |
| 14 | PATCH | /api/crm/clients/[id] | S-crm | any staff | per action: year regex, amounts clamped 0..1,000,000, strings cut; `update` field allowlist is inside db.updateClient | update crm_clients (notes, services, returns, contact fields, archive) | none | none | 400/404/500 | |
| 15 | DELETE | /api/crm/clients/[id] | S-crm | any staff | none on id | delete crm_clients row; crm audit `client.delete` | none | none | 500 | |
| 16 | POST | /api/crm/clients/[id]/tax-returns | S-crm | any staff | year regex, amount 0..1,000,000 | update crm_clients tax_returns/super_returns | none | none | 400/500 | |
| 17 | DELETE | /api/crm/clients/[id]/tax-returns | S-crm | any staff | year regex | update crm_clients.tax_returns; audit | none | none | 400/500 | |
| 18 | GET | /api/crm/clients | S-crm | any staff | limit 1..5000, offset >= 0 | read crm_clients; access-log row | none | none | 503 `db_error` | |
| 19 | GET | /api/crm/clients/search | S-crm | any staff | q cut to 100, ILIKE wildcards escaped, limit 1..100 | read crm_clients | none | none | 500 | |
| 20 | POST | /api/crm/expense-pdf/from-task | S-crm | any staff | taskId `^[A-Za-z0-9_-]{1,80}$`; max 50 files; extension allowlist | read crm_tasks; access-log | Storage download + upload (will-internal); customer invoices sent to the model (extractInvoice) | none | 400/404/500 generic | |
| 21 | POST | /api/crm/expense-pdf | S-crm | any staff | customerId/taxYear regex, category 1..60, parseItems | access-log | Storage upload (path built server-side) | none | 400/500 generic | |
| 22 | GET | /api/crm/file | S-crm | any staff, whole uploads bucket | URL host must equal Supabase host, bucket fixed, `..`, `\`, leading `/` refused after decoding, content-type allowlist | access-log (path hash) | Storage download; HEIC decode | none | 400/401/403/404/502 | |
| 23 | GET | /api/crm/leads | S-crm | any staff | `csv=1` flag | read crm_leads; access-log + audit only for CSV | none | none | 500 with `detail` = raw error message | |
| 24 | POST | /api/crm/leads | S-crm | any staff | email string, unsubscribed boolean | update crm_leads.unsubscribed | none | none | 400/500 | |
| 25 | GET | /api/crm/partners/[id] | S-crm | any staff | none on id | read partners, crm_clients (referred) | none | none | 404/500 | |
| 26 | DELETE | /api/crm/partners/[id] | S-crm | any staff | none on id | delete partners row | none | none | 500 | |
| 27 | GET | /api/crm/partners | S-crm | any staff | none | read partners + one crm_clients query per partner | none | none | 500 | |
| 28 | POST | /api/crm/partners | S-crm | any staff | name 1..200; email not validated or capped | insert partners | none | none | 400/500 | |
| 29 | POST | /api/crm/seed | S-crm + NODE_ENV != production + SEED_ENABLED=true | any staff | none | seedDemoData (lib/seed.ts, not opened) | none | none | 404 when disabled, 401, 500 | |
| 30 | GET | /api/crm/stats | S-crm | any staff | `refresh=1` | read (getDashboardStats), 10 s in-memory cache | none | none | 500 | |
| 31 | PATCH | /api/crm/tasks/[id] | S-crm | any staff | per action; notes cut to 10k/2k; refundAmount finite > 0 | update/delete crm_tasks; upsert crm_clients (delete action); deletes stored files (done, delete_permanent) | Storage delete; `fix_link` returns a signed 7-day customer link | none | 400/404/409/500 | |
| 32 | GET | /api/crm/tasks | S-crm | any staff | limit 1..200, offset >= 0 | read crm_tasks (TFN and bank details decrypted in the reply) | none | none | 503 | |
| 33 | POST | /api/crm/tasks | S-crm | any staff | sanitise*, task type allowlist, fileUrls must be own Storage URLs, max 50 | insert crm_tasks; notifyFormReceived (may queue the "form received" flow for a matched tax-return customer) | indirect WhatsApp confirmation via scheduler (lib/will/form-link.ts) | none | 500 | |
| 34 | GET | /api/crm/version | S-crm | any staff | none | 6 count/latest reads | none | none | `ok:true, token:''` on error | |
| 35 | POST | /api/atlas/action | S-will | any staff | cleanProposal | via /api/will/actions (not in this unit) + will_audit `atlas_action` | whatever the delegated action does | none | 502 with up to 300 chars of inner response | |
| 36 | POST | /api/atlas/ask | S-will | any staff | question non-empty, <= ATLAS_MAX_QUESTION; cleanHistory | reads via loadMorningReport / runAtlasTool | model call | none | 502/503 | |
| 37 | GET | /api/mia/chats | S-will | brand fixed to svt in query | limit 1..100, offset >= 0 | read will_customers (svt) | none | none | 503 | |
| 38 | GET | /api/mia/clients | S-will | brand svt | archived flag | read crm_clients (svt) | none | none | 503 | |
| 39 | POST | /api/mia/form-link | S-will | customer must have brand svt (checked) | customerId string | read will_customers | returns signed form link | none | 400/404/503 | |
| 40 | POST | /api/mia/move | S-will | **no brand check, no state validation** (F02) | customerId and toState are strings only | update will_customers.state (+paid), insert will_state_history | none | none | 500 `move_failed`; audit stores error text | |
| 41 | GET | /api/mia/pipeline | S-will | brand svt | none | read will_customers (svt, up to 1000) | none | none | 503 | |
| 42 | POST | /api/mia/send | S-will | **no brand check** (F03) | body 1..4096 chars | insert will_messages (PENDING_APPROVAL) | none directly | none | 503 | |
| 43 | GET | /api/mia/status | S-will | any staff | none | read setting | none | none | none (getMiaPaused swallows errors) | |
| 44 | POST | /api/mia/status | S-will | any staff | `paused === true` | write setting mia_paused | none | none | 503 | |
| 45 | GET | /api/mia/tasks | S-will | brand svt | none | read crm_tasks (svt, open) | none | none | 503 | |
| 46 | GET | /api/will/audit | S-will | any staff | limit 1..500 | read will_audit | none | none | unhandled throw -> framework 500 | |
| 47 | GET | /api/will/chats | S-will | any staff | limit 1..100, offset, filter mapped to known groups, brand allowlist | read will_customers; access-log | none | none | 500 with error message (200 chars) | |
| 48 | GET | /api/will/followups | S-will | any staff | none | read jobs, templates, customers, settings | none | none | unhandled throw | |
| 49 | GET | /api/will/insights/monthly | S-will | any staff | brand: svt else wht | read all customers, history, human messages | none | none | unhandled throw | |
| 50 | GET | /api/will/link | S-will | any staff | phone string, brand svt else wht | read will_customers, templates, settings | none | none | `customer:null` on any error | |
| 51 | GET | /api/will/media/[id] | S-will | any staff, any media id | id `^[A-Za-z0-9_=-]{5,256}$` | access-log (id hash) | Meta media fetch with server token | none | upstream status passed through | |
| 52 | GET | /api/will/messages | S-will | any staff, any customer id | customerId required | read will_messages (up to 1000) | none | none | 400; unhandled throw | |
| 53 | GET | /api/will/metrics | S-will | any staff | none | read audit (5000), all messages, all customers | none | none | unhandled throw | |
| 54 | POST | /api/will/mine | S-will | any staff | conversations array, max 100; message text size not capped | read + insert will_knowledge (draft) | model calls with posted conversation text | IP 5/15 min | 400/429 | |
| 55 | GET | /api/will/morning | S-will | any staff | none | read customers, tasks, history, 24 h messages, auth audit | none | none | unhandled throw | |
| 56 | GET | /api/will/orphan-sweep | CRON | cron secret or any staff session | none | reads referenced URLs (lib/orphan-sweep-run.ts, not opened) | Storage delete of orphan uploads | none | 500 with counts only | |
| 57 | GET | /api/will/report | S-will | any staff | none | read customers, tasks, history, setting | none | none | unhandled throw | |
| 58 | GET | /api/will/search | S-will | any staff | q cut to 100, min 2 chars, wildcards escaped in store | read will_customers; access-log (length and kind only) | none | none | 500 with error message (200 chars) | |
| 59 | POST | /api/will/seed | S-will | any staff | `overwrite === true` only | insert/update will_templates; audit on overwrite | none | none | 500 `seed_failed` | |
| 60 | GET | /api/will/state | S-will | any staff | none | read 1000 customers, tasks, templates, pending drafts, counts | none | none | unhandled throw | |
| 61 | GET | /api/will/system | S-will | any staff | none | read audit, counters, usage ledger, customers, settings | Anthropic Admin cost report fetch (lib/will/cost-report.ts, not opened) | none | most reads `.catch` to empty | |
| 62 | GET | /api/will/tick | CRON | cron secret or any staff session | none | writes settings, templates/knowledge backfill, jobs; runs processDueJobs | WhatsApp sends by the scheduler (lib/will/scheduler.ts, not in this unit) | none | 500 with `detail` (300 chars of error) | |
| 63 | GET | /api/will/version | S-will | any staff | none | 4 light reads + kill_switch setting | none | none | `token:'err'` | |
| 64 | POST | /api/will/whatsapp/connect | S-will | any staff | strings trimmed only; wabaId/phoneNumberId not format-checked | writes WhatsApp token, phone id, WABA id to settings | Graph API: code exchange with app secret, subscribed_apps POST, phone lookup | none | 400 with Meta's error message | |
| 65 | GET | /api/will/whatsapp/inbound-check | S-will | any staff | number reduced to digits | read audit (300), blocked-contact lookup | none (resolveWaCreds) | none | findings include internal error text | |

Handlers with no session or secret check: #1-#9. Of these, #1, #2, #3 (write customer data and upload files), #4 (write), #5 (write, token-gated), #6 (reads a customer's phone number, token-gated) and #8 (sends email, pre-auth) are flagged above. None of the unauthenticated handlers in this unit sends a WhatsApp message directly: for TFN, ABN and super forms `notifyFormReceived` only writes an audit row (lib/will/form-link.ts:426-431).

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/app/api/abn-form/route.ts | 135 | 1-135 | REVIEWED |
| src/app/api/analytics/funnel/route.ts | 49 | 1-49 | REVIEWED |
| src/app/api/atlas/action/route.ts | 43 | 1-43 | REVIEWED |
| src/app/api/atlas/ask/route.ts | 24 | 1-24 | REVIEWED |
| src/app/api/crm/clients/[id]/notes/route.ts | 24 | 1-24 | REVIEWED |
| src/app/api/crm/clients/[id]/referral-payment/route.ts | 30 | 1-30 | REVIEWED |
| src/app/api/crm/clients/[id]/referral/route.ts | 41 | 1-41 | REVIEWED |
| src/app/api/crm/clients/[id]/route.ts | 125 | 1-125 | REVIEWED |
| src/app/api/crm/clients/[id]/tax-returns/route.ts | 65 | 1-65 | REVIEWED |
| src/app/api/crm/clients/route.ts | 36 | 1-36 | REVIEWED |
| src/app/api/crm/clients/search/route.ts | 26 | 1-26 | REVIEWED |
| src/app/api/crm/expense-pdf/from-task/route.ts | 78 | 1-78 | REVIEWED |
| src/app/api/crm/expense-pdf/route.ts | 53 | 1-53 | REVIEWED |
| src/app/api/crm/file/route.ts | 149 | 1-149 | REVIEWED |
| src/app/api/crm/leads/route.ts | 95 | 1-95 | REVIEWED |
| src/app/api/crm/login/route.ts | 172 | 1-172 | REVIEWED |
| src/app/api/crm/logout/route.ts | 54 | 1-54 | REVIEWED |
| src/app/api/crm/partners/[id]/route.ts | 73 | 1-73 | REVIEWED |
| src/app/api/crm/partners/route.ts | 104 | 1-104 | REVIEWED |
| src/app/api/crm/seed/route.ts | 24 | 1-24 | REVIEWED |
| src/app/api/crm/stats/route.ts | 36 | 1-36 | REVIEWED |
| src/app/api/crm/tasks/[id]/route.ts | 42 | 1-42 | REVIEWED |
| src/app/api/crm/tasks/route.ts | 90 | 1-57, 55-90 | REVIEWED |
| src/app/api/crm/version/route.ts | 38 | 1-38 | REVIEWED |
| src/app/api/google-reviews/route.ts | 16 | 1-16 | REVIEWED |
| src/app/api/mia/chats/route.ts | 19 | 1-19 | REVIEWED |
| src/app/api/mia/clients/route.ts | 16 | 1-16 | REVIEWED |
| src/app/api/mia/form-link/route.ts | 25 | 1-25 | REVIEWED |
| src/app/api/mia/move/route.ts | 22 | 1-22 | REVIEWED |
| src/app/api/mia/pipeline/route.ts | 22 | 1-22 | REVIEWED |
| src/app/api/mia/send/route.ts | 23 | 1-23 | REVIEWED |
| src/app/api/mia/status/route.ts | 23 | 1-23 | REVIEWED |
| src/app/api/mia/tasks/route.ts | 15 | 1-15 | REVIEWED |
| src/app/api/super-form/route.ts | 138 | 1-138 | REVIEWED |
| src/app/api/tax-form/fix/route.ts | 49 | 1-49 | REVIEWED |
| src/app/api/tax-form/link/route.ts | 42 | 1-42 | REVIEWED |
| src/app/api/tfn-form/route.ts | 137 | 1-137 | REVIEWED |
| src/app/api/will/audit/route.ts | 15 | 1-15 | REVIEWED |
| src/app/api/will/chats/route.ts | 44 | 1-44 | REVIEWED |
| src/app/api/will/followups/route.ts | 113 | 1-113 | REVIEWED |
| src/app/api/will/insights/monthly/route.ts | 32 | 1-32 | REVIEWED |
| src/app/api/will/link/route.ts | 96 | 1-96 | REVIEWED |
| src/app/api/will/media/[id]/route.ts | 56 | 1-56 | REVIEWED |
| src/app/api/will/messages/route.ts | 14 | 1-14 | REVIEWED |
| src/app/api/will/metrics/route.ts | 18 | 1-18 | REVIEWED |
| src/app/api/will/mine/route.ts | 73 | 1-73 | REVIEWED |
| src/app/api/will/morning/route.ts | 20 | 1-20 | REVIEWED |
| src/app/api/will/orphan-sweep/route.ts | 15 | 1-15 | REVIEWED |
| src/app/api/will/report/route.ts | 118 | 1-118 | REVIEWED |
| src/app/api/will/search/route.ts | 41 | 1-41 | REVIEWED |
| src/app/api/will/seed/route.ts | 68 | 1-68 | REVIEWED |
| src/app/api/will/state/route.ts | 94 | 1-94 | REVIEWED |
| src/app/api/will/system/route.ts | 168 | 1-168 | REVIEWED |
| src/app/api/will/tick/route.ts | 79 | 1-79 | REVIEWED |
| src/app/api/will/version/route.ts | 47 | 1-47 | REVIEWED |
| src/app/api/will/whatsapp/connect/route.ts | 106 | 1-106 | REVIEWED |
| src/app/api/will/whatsapp/inbound-check/route.ts | 169 | 1-95, 93-169 | REVIEWED |

57 of 57 files, 3,539 lines. Files opened outside the unit to judge findings (partial reads, not a review of those files): src/proxy.ts (1-127), src/lib/request-guard.ts (1-47), src/lib/will/auth.ts (1-50), src/lib/public-form-guard.ts (1-21), src/lib/get-ip.ts (1-134), src/lib/mia/data.ts (1-94), src/lib/db.ts (136-336, 405-572 without comment lines, 691-830, 975-1031), src/lib/will/form-link.ts (309-439), src/lib/will/store-supabase.ts (400-500, 532-640, 700-720, 882-905), src/lib/crm-store.ts (grep extracts around 8-23, 60-72, 127-161), src/lib/rate-limit.ts (108-153), src/lib/will/channel.ts (93-99), src/lib/leads.ts (96-105), src/lib/will/form-token.ts (104-142, 176-178), src/lib/orphan-uploads.ts (47-56), src/lib/__tests__/request-guard-mia-17nov.test.ts (1-10), grep hits in src/app/api/will/actions/route.ts (lines 564-570).

Process note: while totalling line counts I redirected one `awk` output to a scratch file, `/tmp/api02-cov.txt`, outside the repository. That was a slip against hard rule 1. I did not use or delete it; nothing inside the repository was created or changed other than this report.

## Findings

### API-02-F01: The cross-site guard never runs for /api/mia/* because the proxy matcher omits it
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-352
- Files and lines: src/proxy.ts:126 (matcher); src/lib/request-guard.ts:43 (`GUARDED_API_PREFIXES` includes `/api/mia/`); src/lib/__tests__/request-guard-mia-17nov.test.ts:3-6; affected handlers src/app/api/mia/move/route.ts:9, src/app/api/mia/send/route.ts:9, src/app/api/mia/status/route.ts:13, src/app/api/mia/form-link/route.ts:14
- Evidence: `isGuardedApiPath` returns true for `/api/mia/...`, and the 17 Nov test asserts exactly that. The proxy `config.matcher` lists `/api/crm/:path*`, `/api/will/:path*`, `/api/atlas/:path*` and no `/api/mia/:path*`, so the proxy function is not invoked for Mia routes and the guard is dead code for them. The four Mia POST handlers have no Origin or Sec-Fetch-Site check of their own and parse the body with `req.json()` regardless of content type.
- Root cause: The prefix list and the matcher are two separate lists; the fix of 17 Nov (WMA-01) updated one and the test covers only the pure function.
- Attack prerequisites: A logged-in staff browser and a page the attacker controls on a host that is same-site with the CRM (a sibling subdomain, which is the case the guard's own comment at request-guard.ts:4-7 names). SameSite=Strict on `crm_session` still blocks other sites.
- Impact: Forged calls to move customers between stages (with F02, any customer of either brand, including marking them paid), queue outbound drafts, pause Mia, and mint form links.
- Recommended fix: Add `/api/mia/:path*` to the matcher. Derive the matcher and the prefix list from one constant, or add a test that reads `config.matcher`.
- Regression test: Test that every entry in `GUARDED_API_PREFIXES` has a matching entry in `proxy.config.matcher`; request test that `POST /api/mia/status` with `Sec-Fetch-Site: same-site` returns 403.
- Limits of this verification: Static only. I did not run the app, so I rely on Next's documented behaviour that the proxy runs only for matcher paths.

### API-02-F02: /api/mia/move can move any customer of either brand to any state, with no state-machine check
- Severity: MEDIUM
- Confidence: high for the missing checks; medium for the reach of arbitrary state strings
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639, CWE-20
- Files and lines: src/app/api/mia/move/route.ts:12-16; src/lib/mia/data.ts:43-45; src/lib/will/store-supabase.ts:532-590
- Evidence: The route checks only that `customerId` and `toState` are strings. `moveMiaCustomer` calls `getStore().setState(customerId, toState as never, 'mia')` inside `withBrand('svt', ...)`. `setState` loads the row by id alone (no brand filter), does not check that `to` is a known state or an allowed transition, writes history, and sets `paid = true` when the target is a post-payment state. The file comment "through Will's state machine" is not what the code does.
- Root cause: The route trusts the id and the state name; the store method is a raw setter, and the brand context is not applied to lookups by id.
- Attack prerequisites: A CRM session (or F01).
- Impact: A WHT customer can be moved from the Mia screen (cross-brand write). Any customer can be set to a post-payment stage, which flags them as paid and stops sales follow-ups, without a payment and without an owner-action audit row (only the state history with `caused_by: 'mia'`). An unknown state string may be stored, which would drop the customer out of every stage group.
- Recommended fix: In the route, load the customer, require `brand === 'svt'` (as /api/mia/form-link does at line 20), validate `toState` against the state list and the allowed transitions, and write an audit row.
- Regression test: `POST /api/mia/move` with a WHT customer id returns 404; with `toState: 'NOT_A_STATE'` returns 400; neither changes the row.
- Limits of this verification: I did not check whether the database has a CHECK constraint or enum on `will_customers.state` (a grep of supabase/migrations for one found nothing, but I did not read the migrations). I did not read the file-backed store's `setState`.

### API-02-F03: /api/mia/send saves an outbound draft against any customer id, and the draft enters Will's normal approval queue
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-639
- Files and lines: src/app/api/mia/send/route.ts:13-18; src/lib/mia/data.ts:61-66; src/lib/will/store-supabase.ts:882-891; src/app/api/will/actions/route.ts:564-570
- Evidence: The route does not check that the customer exists or is an SVT customer. `saveMiaDraft` inserts a `PENDING_APPROVAL`, `OUT`, `HUMAN` message. `pendingApprovals()` returns every pending row with no brand filter, and /api/will/state returns them. The approve path sends with `customer.brand`. The only thing that marks the draft as "not to be sent" is `meta.reason: 'svt_number_not_live'`, and a search of src/ finds that string only where it is written, never where it is checked.
- Root cause: "Never sent until the SVT number is live" is a comment and a response field, not an enforced rule.
- Attack prerequisites: A CRM session (or F01) to create the draft; an owner approval in Will to send it.
- Impact: A draft typed in Mia for a WHT customer id, or for an SVT customer before the SVT line is live, can be approved from Will's pending list and sent on that customer's line. A foreign-key violation on a bad id is returned as 503 and its message written to the audit log.
- Recommended fix: Require `brand === 'svt'` on the customer in the route; have the approve path refuse a message whose meta carries `svt_number_not_live` until the SVT line is enabled.
- Regression test: `POST /api/mia/send` with a WHT customer id returns 404 and inserts nothing; approving a `svt_number_not_live` draft with the SVT line off is refused.
- Limits of this verification: I read only lines 564-570 of the approve path through grep, not the whole handler, so a check elsewhere in that handler (policy guard, 24-hour window, brand gate) may already stop the send.

### API-02-F04: Archiving a task deletes the task even when the client record was not written
- Severity: MEDIUM
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-252, CWE-703
- Files and lines: src/app/api/crm/tasks/[id]/route.ts:34 (action `delete`); src/lib/db.ts `deleteTaskAndArchive` (starts line 405; the `crm_clients` update and insert calls inside it, and the final `crm_tasks` delete)
- Evidence: Inside `deleteTaskAndArchive` both `await sb.from('crm_clients').update(updates).eq('id', task.clientId)` and `await sb.from('crm_clients').insert(initialUpdates)` discard the returned `{ error }`. The Supabase client reports failures in that object and does not throw. The function then deletes the task row and only that delete's error is checked. The route answers `ok:true`.
- Root cause: Unchecked result on the write that must succeed before the destructive step; no transaction.
- Attack prerequisites: None; any failed insert or update (constraint, missing column, network) triggers it during normal staff use.
- Impact: The customer's task (name, contact details, tax year, refund note) is deleted and no client record exists: silent loss of a customer record.
- Recommended fix: Check both results and throw before the delete; better, do the move in one database function.
- Regression test: With the `crm_clients` insert mocked to return an error, `deleteTaskAndArchive` throws and the task row remains.
- Limits of this verification: I read this function with comment lines filtered out, so I cannot give exact line numbers for the two calls, and a comment may explain an intent I did not see. db.ts is outside this unit.

### API-02-F05: Bulk reads of TFNs, bank details and full conversations are not written to the access log
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-778
- Files and lines: src/app/api/crm/tasks/route.ts:11-23 (with src/lib/db.ts `toTask`, which opens the sealed `tfn` and `bank_details` fields); src/app/api/will/messages/route.ts:7-13; src/app/api/crm/clients/[id]/route.ts:15-21; src/app/api/crm/clients/search/route.ts:11-21; src/app/api/crm/leads/route.ts:26-28 (JSON path); src/app/api/will/state/route.ts:27; src/app/api/will/followups/route.ts:45; src/app/api/mia/chats, clients, pipeline, tasks
- Evidence: `recordDataRead` is called in /api/crm/clients, /api/crm/file, the expense-pdf routes, the leads CSV path, /api/will/chats, /api/will/media and /api/will/search. It is not called by `GET /api/crm/tasks`, which returns up to 200 tasks per call with decrypted TFN and bank details, by `GET /api/will/messages`, which returns up to 1,000 messages of any customer, or by the other routes listed. The leads JSON path returns the same rows as the CSV path, unlogged.
- Root cause: Access logging was added route by route.
- Attack prerequisites: A valid or stolen session.
- Impact: After a session compromise the log cannot show that the most sensitive data (TFN, bank details, message history) was read or paged out.
- Recommended fix: Call `recordDataRead` in these handlers (throttled as for `clients`), at least for crm/tasks, will/messages and the leads JSON path.
- Regression test: A GET to each route with a valid session writes one access-log row with no customer values in it.
- Limits of this verification: I did not read lib/will/access-log.ts beyond the function header, so I do not know which route names it accepts.

### API-02-F06: Internal error text is returned to the browser on several staff routes
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-209
- Files and lines: src/app/api/crm/leads/route.ts:70-76 (`detail: message`); src/app/api/will/chats/route.ts:42; src/app/api/will/search/route.ts:28, 39; src/app/api/will/tick/route.ts:74; src/app/api/atlas/action/route.ts:39-40; src/app/api/will/whatsapp/connect/route.ts:70, 100; src/app/api/will/whatsapp/inbound-check/route.ts:64, 109
- Evidence: Each of these puts a database, provider or exception message into the JSON reply. /api/will/tick also does so for a caller that holds only the cron secret.
- Root cause: Diagnostics returned to the caller instead of logged.
- Attack prerequisites: A session (or the cron secret for tick).
- Impact: Schema, table and provider detail is disclosed to whoever holds a session. Other routes in the unit already return fixed codes (`db_error`).
- Recommended fix: Return a fixed code and log the detail through `safeErr`.
- Regression test: With the store mocked to throw `relation "x" does not exist`, the reply body does not contain that text.
- Limits of this verification: None beyond static reading.

### API-02-F07: The one-time check on the residency correction link fails open and is not atomic
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-294, CWE-367
- Files and lines: src/app/api/tax-form/fix/route.ts:32-34, 39-42
- Evidence: The "already used" lookup is `store.getSetting(...).catch(() => null)`, so a store error reads as "not used". The used-marker is written after the change, and a failure to write it is only logged. Check and write are separate steps.
- Root cause: Replay protection built as read-then-write with errors swallowed.
- Attack prerequisites: Possession of a valid `fix` token (7-day life, sent to the customer).
- Impact: The link can be used again during a settings-store fault, or twice in parallel. The effect is bounded: it can only set the residency answer on that customer's open tax task to one of two values.
- Recommended fix: Claim the nonce first with an insert-if-absent and refuse when the claim fails or errors; then apply the change.
- Regression test: With `getSetting` rejecting, the route returns 5xx and does not call `setTaskTaxStatus`; two parallel posts with one token give one 200 and one 409.
- Limits of this verification: I did not read `setTaskTaxStatus` or `findOpenTaxTaskByWhatsapp` (db.ts:337-363).

### API-02-F08: Replacing the live WhatsApp credentials leaves no audit record, and Graph path segments are not validated
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-778, CWE-20
- Files and lines: src/app/api/will/whatsapp/connect/route.ts:50-52, 79, 90, 97, 103; src/lib/will/channel.ts:93-99
- Evidence: Any staff session can post `{ token, phoneNumberId }`; after one Graph check the pair is stored by `saveWaCreds`, which writes three settings and no audit row. `wabaId` and `phoneNumberId` are trimmed and placed directly into `https://graph.facebook.com/<version>/<value>/...` URLs sent with the supplied token.
- Root cause: The connect route predates the audit trail; ids are treated as trusted.
- Attack prerequisites: A CRM session.
- Impact: The sending number for all customer messages can be switched to another Meta account with nothing in the decision log. Through the unvalidated ids a caller can aim the three Graph requests at other Graph paths (host is fixed, so no SSRF beyond graph.facebook.com).
- Recommended fix: Require ids to match `^\d{5,25}$`; write an audit row (actor, phone id, WABA id, never the token).
- Regression test: A phoneNumberId containing `/` or `?` returns 400 before any fetch; a successful connect writes one audit row without the token.
- Limits of this verification: I did not check how the token is stored at rest (settings table) or whether the settings store encrypts it.

### API-02-F09: Paid model calls on staff routes have no rate limit or size cap
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-770
- Files and lines: src/app/api/crm/expense-pdf/from-task/route.ts:49-62 (up to 50 files per call, one extraction each, no limiter); src/app/api/atlas/ask/route.ts:10-21 (no limiter); src/app/api/will/mine/route.ts:38-47 (limiter 5 per 15 min per IP, 100 conversations, but no cap on messages per conversation or text length, and no body size limit)
- Evidence: As described; only /api/will/mine has a limiter.
- Root cause: Cost controls added to one route only.
- Attack prerequisites: A CRM session (a stolen one, or F-class CSRF where a guard is missing; these three routes are under guarded prefixes).
- Impact: Uncontrolled spend on the model account and long-running requests.
- Recommended fix: Add `isRateLimited` to from-task and atlas/ask; cap messages per conversation and characters per message in mine.
- Regression test: The sixth from-task call in 15 minutes returns 429; a mine payload with a 1 MB message is rejected with 400.
- Limits of this verification: I did not read `mineKnowledge`, `extractInvoice` or `askAtlas`; they may apply their own caps or the daily AI budget.

### API-02-F10: Client updates are read-modify-write without a version check, and writes to a missing id report success
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-362
- Files and lines: src/lib/db.ts:706-761 and 819-828 (addTaxReturn, removeTaxReturn, addSuperReturn, removeSuperReturn, setYearlyCheckin: read JSON column, modify in memory, write back), reached from src/app/api/crm/clients/[id]/route.ts:48-106 and src/app/api/crm/clients/[id]/tax-returns/route.ts:29-59; src/app/api/crm/partners/route.ts:85-97 (code uniqueness checked then inserted); src/app/api/crm/clients/[id]/referral-payment/route.ts:20-29, referral/route.ts:31-40, notes/route.ts:18-19
- Evidence: Two tabs adding returns for different years for one client can each read the old array and the later write drops the earlier one. The add/remove helpers return silently when the client does not exist and the routes then answer `ok:true`; the referral and notes updates match zero rows for an unknown id and also answer `ok:true`.
- Root cause: JSON-in-text columns updated in application code; no row count check.
- Attack prerequisites: None; concurrent staff use, or a stale id.
- Impact: Lost tax-return or check-in entries; the operator is told a change was saved when nothing changed.
- Recommended fix: Use a conditional update (compare the previous value) or a database function; return 404 when no row matched.
- Regression test: Two concurrent `add-tax` calls for different years leave both years stored; PATCH on an unknown client id returns 404.
- Limits of this verification: Whether the partners table has a unique index on `code` was not checked.

### API-02-F11: Public TFN, ABN and super forms attach a submission to an existing client on an email or phone match alone
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: CWE-290
- Files and lines: src/app/api/abn-form/route.ts:73-75, 81, 112; src/app/api/super-form/route.ts:73-75, 81; src/app/api/tfn-form/route.ts:74-76, 82; src/lib/db.ts:141-199; src/lib/will/form-link.ts:408
- Evidence: An unauthenticated submitter who knows a client's email or WhatsApp number gets a task carrying that client's id, the "Returning client" note, and an upload stored under that client's folder. The reply is the same `ok:true` either way, so it is not an oracle. When staff archive the task, only `how_heard`, notes and the service flag are merged into the existing client (contact details are not overwritten). Separately, for a number that matches no chat, `notifyFormReceived` writes the typed phone number in clear into the audit log. The comment at lines 124-128 of each form route ("sends the confirmation") is out of date: for these three forms nothing is sent.
- Root cause: Identity is inferred from typed contact details.
- Attack prerequisites: Knowledge of a client's email or number; within the rate limits.
- Impact: A staff member may treat a stranger's submission (with the stranger's bank details and TFN) as coming from a known client. Unauthenticated callers can write phone numbers into the audit log.
- Recommended fix: Show the match as a suggestion for staff to confirm, not as the task's client id; hash the number in the `form_received_unmatched` audit row.
- Regression test: A submission that matches an existing email creates a task whose client link is marked unconfirmed.
- Limits of this verification: lib/upload.ts, lib/sanitise.ts and lib/intake-validate.ts were not opened; file type and size checks are assumed from their names and the route comments.

### API-02-F12: CRM login notes (single shared password, per-IP lockout only)
- Severity: INFORMATIONAL
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-307
- Files and lines: src/app/api/crm/login/route.ts:14-21, 47, 60-78; src/lib/crm-store.ts:8-12; src/lib/get-ip.ts:84-98
- Evidence: The password is read in clear from the env var `CRM_PASSWORD` and hashed at runtime with a fixed salt from `PASSWORD_SALT`. Lockout is keyed on the client IP only, taken from `x-real-ip` and then the rightmost `x-forwarded-for` entry; there is no global failure ceiling. A correct password from any address triggers an OTP email to the admin address.
- Root cause: One shared credential, with the second factor carrying the security.
- Attack prerequisites: Many source addresses, or an ingress that passes a client-set `x-real-ip`.
- Impact: Password guessing is not bounded across addresses; a guessed password lets an attacker send repeated OTP emails. The 8-digit OTP step (outside this unit) remains.
- Recommended fix: Add a global failure counter with alerting; confirm at the edge that `x-real-ip` cannot be set by the client.
- Regression test: 50 failures from 50 addresses in 15 minutes trigger the global limit.
- Limits of this verification: /api/crm/verify-otp is not in this unit and was not read. The ingress behaviour cannot be checked from code.

### API-02-F13: State-changing GET handlers are outside the cross-site guard
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: CWE-352
- Files and lines: src/app/api/will/tick/route.ts:17-78; src/app/api/will/orphan-sweep/route.ts:10-14; src/lib/request-guard.ts:15, 21
- Evidence: Both handlers do work on GET (run the scheduler, which sends due messages; delete orphaned uploads) and accept a staff session as authorisation. The guard returns early for GET.
- Root cause: Cron platforms call with GET.
- Attack prerequisites: A logged-in staff browser loading a same-site page that embeds the URL.
- Impact: Forces a scheduler tick or a sweep early. Both are designed to be repeatable, so the effect is limited to timing.
- Recommended fix: For the session path only, require `Sec-Fetch-Site: same-origin`.
- Regression test: GET /api/will/tick with a session and `Sec-Fetch-Site: same-site` returns 403; with the cron secret it returns 200.
- Limits of this verification: The scheduler and sweep code were not read.

## Checked and found sound

- Every /api/crm, /api/will, /api/atlas and /api/mia handler in the unit checks the session or cron secret as its first statement (table above; e.g. crm/clients/[id]/route.ts:16, 29, 116; will/state/route.ts:28).
- Cron secrets are compared in constant time and an unset secret never matches (lib/will/auth.ts:9-13, 29-31).
- /api/crm/logout: global revocation needs a valid session; an anonymous call only clears the caller's cookie (crm/logout/route.ts:26-40).
- /api/crm/seed is closed in production and without SEED_ENABLED, then needs a session (crm/seed/route.ts:9-16).
- /api/crm/file: host pinned to the Supabase project, bucket fixed, traversal refused after decoding, content-type allowlist, `nosniff`, sandbox CSP, `no-store` (crm/file/route.ts:41-71, 111-147).
- /api/will/media/[id]: id format check, non-raster types forced to download, sandbox CSP (will/media/[id]/route.ts:21-54).
- Search inputs escape ILIKE wildcards and use separate `.ilike` calls, not a PostgREST `or()` string (lib/db.ts:981-1005; lib/will/store-supabase.ts:400-420); the referral route validates partnerId before use (crm/clients/[id]/referral/route.ts:22).
- `updateClient` writes only a fixed set of columns from `body.data`, each coerced and cut (lib/db.ts:765-800), so `action: 'update'` is not a mass-assignment hole.
- CRM task creation accepts only file URLs from the project's own storage (crm/tasks/route.ts:43-46).
- Expense PDF storage paths are built on the server from validated ids (crm/expense-pdf/route.ts:13-14, 26-31).
- Public forms: Sec-Fetch-Site guard, per-IP and per-person limits, byte budget before parsing, generic 500, upload validation errors only echoed for the customer-fixable class (abn-form/route.ts:25-39, 54, 86-90; same in tfn-form and super-form).
- Rate limiter falls back to an in-memory counter rather than failing open (lib/rate-limit.ts:108-134).
- /api/tax-form/link answers the same `none` for forged, expired and missing tokens, with `no-store` (tax-form/link/route.ts:26-27, 40); token MAC is verified in constant time before parsing (lib/will/form-token.ts:134-136).
- /api/mia/form-link checks the customer is SVT before signing (mia/form-link/route.ts:19-20); Mia list queries fix the brand in the query (lib/mia/data.ts:35, 80, 90).
- /api/will/link scopes the phone lookup by brand and treats two matches as no match (will/link/route.ts:42-43; lib/will/store-supabase.ts:460-477).
- Login: password length cap, attempt reserved before verification, OTP bound to an httpOnly SameSite=Strict pre-auth cookie, OTP stored hashed for 10 minutes (crm/login/route.ts:32, 67, 87-108).
- /api/atlas/action passes the change to the /api/will/actions handler and is itself under the proxy guard (atlas/action/route.ts:13-30; proxy.ts:126).
- No secret, token or key literal found in the 57 files. The Meta app id at will/whatsapp/connect/route.ts:20 is a public identifier.

## Open questions

- Does `will_customers.state` have a database constraint that would reject an unknown state from /api/mia/move (F02)?
- Does the approve path in /api/will/actions stop a Mia draft before sending (F03)? Only lines 564-570 were seen.
- Is `x-real-ip` overwritten by the hosting edge for every route, including direct deployment URLs (F12)?
- How is the WhatsApp token stored by `saveWaCreds` (plain settings row or encrypted)? Not checked.
- lib/seed.ts (`seedDemoData`), lib/orphan-sweep-run.ts, lib/googleReviewsServer.ts, lib/will/cost-report.ts, lib/atlas/* and lib/upload.ts were not opened; their behaviour in the table is taken from route comments and names.
- /api/analytics/funnel uses the default limit of 5 events per IP per 15 minutes; whether that is enough for several real visitors behind one address is a product question, not a security one.
