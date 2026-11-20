# 06. Authorisation audit

Sources: API-01, API-02, LIB-01, WILL-04, SITE-04, CONTENT-06 and the DEBATE files. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- The code has one staff role. There is no per-user, per-brand or per-record permission for staff.
- The server uses the Supabase service role, which bypasses row level security. Authorisation therefore rests entirely on the route handlers (LIB-01).
- No authorisation check was exercised by a request.

## Permission matrix (STATIC ANALYSIS CONCLUSION)

"yes" = allowed by the code as read. "token" = only with a valid signed form link for that customer. "sig" = only with Meta's signature. "secret" = only with the cron secret.

| capability | anonymous | form-link holder | WhatsApp customer | staff session | cron | Meta |
|---|---|---|---|---|---|---|
| Read public pages and articles | yes | yes | yes | yes | - | - |
| Submit tax form or super form (creates a task) | yes | yes | yes | yes | - | - |
| Upload a document to the private bucket | yes (validated, rate limited) | yes | yes | yes | - | - |
| Have a form attached to an existing client record | yes, by typed email or phone (R007, open) | yes | yes | - | - | - |
| Have a form linked to a WhatsApp chat | by typed number unless enforcement is on (R008, open) | token | - | - | - | - |
| Correct the residency answer on a task | no | token (own task) | no | yes | - | - |
| See a customer's WhatsApp number | no | token (own number) | - | yes | - | - |
| Deliver an inbound message | no | no | via Meta | no | no | sig |
| Read chats, tasks, clients, documents, TFN and bank details (both brands) | no | no | no | yes | no | no |
| Send a WhatsApp message to a customer | no | no | no | yes | scheduler | no |
| Change stage, pause, opt-out, delete a customer | no | no | STOP only (own chat) | yes | no | no |
| Kill switch, AI mode, templates, knowledge | no | no | no | yes | no | no |
| Save WhatsApp credentials | no | no | no | yes | no | no |
| Bulk export | no | no | no | yes (logged, alert if enabled) | no | no |
| Run the tick or the orphan sweep | no | no | no | yes | secret | no |
| Seed demo data | no | no | no | only outside production with a flag | no | no |
| Direct database access with the anonymous key | not per migrations once 049 is run (R048, open) | - | - | - | - | - |

## Object-level checks read in code

| object | check | location | status |
|---|---|---|---|
| Uploaded file URLs in a public submission | must be in this brand's own upload folder; traversal, query and fragment refused | `src/lib/supabase.ts:133-141` | sound |
| CRM file proxy | host pinned to the project, bucket fixed, traversal refused after decoding | `src/app/api/crm/file/route.ts:41-71` | sound; any staff session can read the whole bucket by design |
| Mia move and draft | customer must be Student Visa Tax; state must be a real state | `src/lib/mia/data.ts:45-51, 63-71` | FIXED (R002, R003) |
| Existing-client lookup | brand scoped; wildcard characters stripped | `src/lib/db.ts:145-164` | FIXED (R006); merge itself OPEN (R007) |
| Residency correction by phone | skips Student Visa Tax tasks | `src/lib/db.ts:362` | FIXED (LIB-01-F08) |
| Resend job | message must belong to the job's customer and be outbound | `src/lib/will/scheduler.ts` | FIXED (R075) |
| Phone lookups | brand scoped; two matches treated as no match | `src/lib/will/store-supabase.ts:460-477` | sound |
| Client update | fixed column list, no mass assignment | `src/lib/db.ts:765-800` | sound |
| Record ids in CRM routes | no ownership check (single tenant) | API-02 table | by design |

## Brand separation

- Brand comes from the Host header or the receiving phone-number id, never from the body.
- The transmit point refuses a payload that names the other brand and never falls back to the other brand's number (`src/lib/will/channel.ts:185-191, 474-478`).
- Open before the Student Visa Tax line goes live: CRM actions run guard calls under the default brand (R016); a failed brand read in the scheduler falls back to Working Holiday Tax (R124); the two brands still share one WhatsApp number (R201).
- Accepted: the store has no caller identity and most reads are not brand scoped, because one owner runs both brands in one CRM (WILL-04-F09).

## Other findings

| topic | status | rows |
|---|---|---|
| Hand-typed staff replies and some system sends skip the policy guard | OPEN | R005, R066 |
| Approval mode has six exceptions in code | OPEN | R072 |
| Atlas showed only a summary of what an approved proposal would do | FIXED | R162 |
| WhatsApp connect accepted ids without a format check and wrote no audit row | FIXED | API-02-F08 |
| Task list read (TFN, bank details) was not in the access log | FIXED | R021 |

## HYPOTHESES

- If default grants to the anonymous role still exist in the live database and migration 049 has not run, the anonymous key could read or write `will_ai_usage` and call two functions. The app does not ship that key (per the reports), so this needs the key to leak first.

## UNVERIFIED ASSUMPTIONS

- That only the owner holds the staff credentials and the admin mailbox.
- That RLS is enabled on every table in the live database as the migrations state.

## NOT TESTED

- No IDOR, cross-brand or privilege test was run against a live route or database.
