# 04. Attack surface

Source: the handler tables in `units/API-01-report.md` (10 handlers) and `units/API-02-report.md` (65 handlers), shortened. The tables describe the code at audit time; the last column notes what changed on 18 Nov. Full columns (input validation, database effects, side effects, error behaviour) are in the two unit reports.

## VERIFIED FACTS

- 75 HTTP handlers were tabulated. Two (`/api/tfn-form`, `/api/abn-form`) were deleted on 18 Nov, leaving 73.
- Handlers with no session and no secret: the public forms and upload, the funnel event, the two token-gated form helpers, Google reviews, login, the one-time code step, logout, and the Meta webhook (signature instead of session).
- Every `/api/crm`, `/api/will`, `/api/atlas` and `/api/mia` handler in the tables checks the session or the cron secret as its first statement (API-02, "Checked and found sound").

## Entry points without a staff session (highest exposure)

| entry point | what an anonymous caller can do | controls read in code | open or accepted gap |
|---|---|---|---|
| `POST /api/will/webhook` | nothing without Meta's signature | HMAC, size cap, id filter, idempotency, rate limits | none open |
| `POST /api/tax-form` | create a task with personal data; trigger one confirmation message to a matched chat | sanitise, validate, rate limits, optional signed token, file URLs limited to own brand folder | merge into an existing client by typed email or phone (R007); token optional (R008, R101, R191) |
| `POST /api/super-form` | create a super task with bank details and a selfie | same guards | no token; consent text sent by the browser (R191, R192) |
| `POST /api/tax-form/upload` | store one validated file in the private bucket | type, size, magic bytes, byte budget | none open |
| `POST /api/tax-form/fix` | answer one residency question on the token holder's own task | signed token, purpose and brand checked | single use not atomic (accepted) |
| `GET /api/tax-form/link` | learn the WhatsApp number of the token's customer | signed token, uniform answer for bad tokens | by design |
| `POST /api/analytics/funnel` | insert an allowlisted funnel event | allowlist, length caps, rate limit | none |
| `GET /api/google-reviews` | read public reviews | fixed host, cache | none |
| `POST /api/crm/login`, `/verify-otp` | attempt to log in | see file 05 | per-IP lockout (accepted) |
| `POST /api/crm/logout` | clear the caller's own cookie | revocation only with a valid session | none |

## Full endpoint table

| method | route | authentication | authorisation | rate limit | source | change on 18 Nov |
|---|---|---|---|---|---|---|
| POST | /api/crm/verify-otp | None (pre-auth). Needs httpOnly `crm_preauth` cookie (48 hex) plus the 8 digit code | Single owner role; success mints `crm_session` (8 h, httpOnly, SameSite=Strict, Secure in production) | 5 guesses per OTP, then OTP deleted (429). No per-IP limit in this route. Proxy cross-site guard applies […] | API-01 |  |
| POST | /api/tax-form | None (public). Optional signed form token `k` | None. Brand from Host header; SVT closed unless `SVT_FORMS_ENABLED` | 5 per 15 min per IP+person hash; 30 per 15 min per IP. Applied AFTER form parse and token lookups. Only […] | API-01 |  |
| POST | /api/tax-form/upload | None (public) | None. Brand prefix from Host | 100 requests per 15 min per IP; 120 MB per 15 min per IP (degrades to in-memory when Redis is down) | API-01 |  |
| GET | /api/will/export | `sessionValid()` (crm_session) | Any valid session; no brand scoping | None | API-01 |  |
| GET | /api/will/health | `sessionValid()` | Any valid session | None | API-01 |  |
| GET | /api/will/knowledge | `sessionValid()` | Any valid session | None | API-01 |  |
| POST | /api/will/knowledge | `sessionValid()`; cross-site guard only through the proxy (not repeated in the route) | Any valid session | None | API-01 |  |
| GET | /api/will/webhook | Meta verify token, constant-time compare | n/a | None | API-01 |  |
| POST | /api/will/webhook | HMAC SHA-256 of the raw body with the Meta app secret (`x-hub-signature-256`), constant-time | Phone number id must be one of ours (when ours is configured); brand derived from it | Text: 40 per sender and 400 global per 15 min. Media/notes: 40 per sender, but only after the payment-proof […] | API-01 |  |
| POST | /api/will/actions | `sessionValid()` | Any valid session; 33 actions, single-tenant, no per-brand or per-role check | None | API-01 |  |
| POST | /api/abn-form | NONE | public | IP 30/15 min, person-hash 5/15 min, 120 MB/15 min by Content-Length | API-02 #1 | REMOVED 18 Nov |
| POST | /api/super-form | NONE | public | IP 30/15 min, person-hash 5/15 min, 120 MB/15 min by Content-Length | API-02 #2 |  |
| POST | /api/tfn-form | NONE | public | IP 30/15 min, person-hash 5/15 min, 120 MB/15 min by Content-Length | API-02 #3 | REMOVED 18 Nov |
| POST | /api/analytics/funnel | NONE | public | IP 5/15 min (default) | API-02 #4 |  |
| POST | /api/tax-form/fix | NONE (signed form token, purpose `fix`, brand wht) | token names the customer | IP 20/15 min | API-02 #5 |  |
| GET | /api/tax-form/link | NONE (signed form token) | token names the customer | IP 60/15 min | API-02 #6 |  |
| GET | /api/google-reviews | NONE | public | none (1 h revalidate) | API-02 #7 |  |
| POST | /api/crm/login | NONE (pre-auth: password) | n/a | per-IP lockout (reserve-before-verify) | API-02 #8 |  |
| POST | /api/crm/logout | optional S-crm | revocation only if session valid | none | API-02 #9 |  |
| PATCH | /api/crm/clients/[id]/notes | S-crm | any staff | none | API-02 #10 |  |
| PATCH | /api/crm/clients/[id]/referral-payment | S-crm | any staff | none | API-02 #11 |  |
| PATCH | /api/crm/clients/[id]/referral | S-crm | any staff | none | API-02 #12 |  |
| GET | /api/crm/clients/[id] | S-crm | any staff | none | API-02 #13 |  |
| PATCH | /api/crm/clients/[id] | S-crm | any staff | none | API-02 #14 |  |
| DELETE | /api/crm/clients/[id] | S-crm | any staff | none | API-02 #15 |  |
| POST | /api/crm/clients/[id]/tax-returns | S-crm | any staff | none | API-02 #16 |  |
| DELETE | /api/crm/clients/[id]/tax-returns | S-crm | any staff | none | API-02 #17 |  |
| GET | /api/crm/clients | S-crm | any staff | none | API-02 #18 |  |
| GET | /api/crm/clients/search | S-crm | any staff | none | API-02 #19 |  |
| POST | /api/crm/expense-pdf/from-task | S-crm | any staff | none | API-02 #20 |  |
| POST | /api/crm/expense-pdf | S-crm | any staff | none | API-02 #21 |  |
| GET | /api/crm/file | S-crm | any staff, whole uploads bucket | none | API-02 #22 |  |
| GET | /api/crm/leads | S-crm | any staff | none | API-02 #23 |  |
| POST | /api/crm/leads | S-crm | any staff | none | API-02 #24 |  |
| GET | /api/crm/partners/[id] | S-crm | any staff | none | API-02 #25 |  |
| DELETE | /api/crm/partners/[id] | S-crm | any staff | none | API-02 #26 |  |
| GET | /api/crm/partners | S-crm | any staff | none | API-02 #27 |  |
| POST | /api/crm/partners | S-crm | any staff | none | API-02 #28 |  |
| POST | /api/crm/seed | S-crm + NODE_ENV != production + SEED_ENABLED=true | any staff | none | API-02 #29 |  |
| GET | /api/crm/stats | S-crm | any staff | none | API-02 #30 |  |
| PATCH | /api/crm/tasks/[id] | S-crm | any staff | none | API-02 #31 |  |
| GET | /api/crm/tasks | S-crm | any staff | none | API-02 #32 |  |
| POST | /api/crm/tasks | S-crm | any staff | none | API-02 #33 |  |
| GET | /api/crm/version | S-crm | any staff | none | API-02 #34 |  |
| POST | /api/atlas/action | S-will | any staff | none | API-02 #35 |  |
| POST | /api/atlas/ask | S-will | any staff | none | API-02 #36 |  |
| GET | /api/mia/chats | S-will | brand fixed to svt in query | none | API-02 #37 |  |
| GET | /api/mia/clients | S-will | brand svt | none | API-02 #38 |  |
| POST | /api/mia/form-link | S-will | customer must have brand svt (checked) | none | API-02 #39 |  |
| POST | /api/mia/move | S-will | SVT customers and real states only (fixed 18 Nov; table text at audit time said no check) | none | API-02 #40 |  |
| GET | /api/mia/pipeline | S-will | brand svt | none | API-02 #41 |  |
| POST | /api/mia/send | S-will | SVT customers only (fixed 18 Nov) | none | API-02 #42 |  |
| GET | /api/mia/status | S-will | any staff | none | API-02 #43 |  |
| POST | /api/mia/status | S-will | any staff | none | API-02 #44 |  |
| GET | /api/mia/tasks | S-will | brand svt | none | API-02 #45 |  |
| GET | /api/will/audit | S-will | any staff | none | API-02 #46 |  |
| GET | /api/will/chats | S-will | any staff | none | API-02 #47 |  |
| GET | /api/will/followups | S-will | any staff | none | API-02 #48 |  |
| GET | /api/will/insights/monthly | S-will | any staff | none | API-02 #49 |  |
| GET | /api/will/link | S-will | any staff | none | API-02 #50 |  |
| GET | /api/will/media/[id] | S-will | any staff, any media id | none | API-02 #51 |  |
| GET | /api/will/messages | S-will | any staff, any customer id | none | API-02 #52 |  |
| GET | /api/will/metrics | S-will | any staff | none | API-02 #53 |  |
| POST | /api/will/mine | S-will | any staff | IP 5/15 min | API-02 #54 |  |
| GET | /api/will/morning | S-will | any staff | none | API-02 #55 |  |
| GET | /api/will/orphan-sweep | CRON | cron secret or any staff session | none | API-02 #56 |  |
| GET | /api/will/report | S-will | any staff | none | API-02 #57 |  |
| GET | /api/will/search | S-will | any staff | none | API-02 #58 |  |
| POST | /api/will/seed | S-will | any staff | none | API-02 #59 |  |
| GET | /api/will/state | S-will | any staff | none | API-02 #60 |  |
| GET | /api/will/system | S-will | any staff | none | API-02 #61 |  |
| GET | /api/will/tick | CRON | cron secret or any staff session | none | API-02 #62 |  |
| GET | /api/will/version | S-will | any staff | none | API-02 #63 |  |
| POST | /api/will/whatsapp/connect | S-will | any staff | none | API-02 #64 |  |
| GET | /api/will/whatsapp/inbound-check | S-will | any staff | none | API-02 #65 |  |

Legend (from API-02): `S-crm` = fresh session check on the `crm_session` cookie; `S-will` = `sessionValid()` on the same cookie; `CRON` = cron secret or session; `NONE` = no session and no secret.

## Other surface

| surface | note |
|---|---|
| Pages | Public pages are static. CRM and Atlas pages gate on the server; eight use the cached session check and render an empty shell without data (accepted, SITE-01-F13). |
| Scheduled routes | `/api/will/tick`, `/api/will/orphan-sweep`: cron secret or session; act on GET by design. |
| Database triggers | `crm_capture_lead()` and `will_on_form_received()` run as SECURITY DEFINER on `crm_tasks` inserts. The second matches a chat by the typed phone number (R008). |
| Storage | One private bucket. Public upload writes; CRM file proxy reads. |
| Image optimizer | Remote patterns emptied on 18 Nov (no page uses `next/image`). |
| Static files | `public/`: no internal path, email or phone found; IndexNow key is public by design. |
| Developer tooling | `.mcp.json` runs a pinned npm package with `npx -y` (accepted); `.claude/` scripts run only on request. |

## STATIC ANALYSIS CONCLUSIONS

- The anonymous write surface is now three form routes and one upload route, all rate limited and validated.
- No rate limit exists on authenticated staff routes. A stolen session is treated as total loss by design.

## UNVERIFIED ASSUMPTIONS

- That no route exists in production that is not in this tree, and that host routing behaves on the live domains as the config reads.

## NOT TESTED

- No endpoint was called. Status codes, headers and limits are as read in code.
