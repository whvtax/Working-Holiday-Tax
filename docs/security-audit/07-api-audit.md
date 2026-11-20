# 07. API audit

Sources: `units/API-01-report.md`, `units/API-02-report.md` (all 65 route files read in full, 7,539 lines) and DEBATE-1. The endpoint table is in file 04. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- Every route file under `src/app/api` at audit time was read in full. Two routes were deleted afterwards (TFN and ABN forms).
- The API units reported 25 findings (API-01: 12, API-02: 13). None is HIGH or CRITICAL.
- No request was sent to any route.

## STATIC ANALYSIS CONCLUSIONS

### Controls found sound

- Session or cron check as the first statement of every staff handler; cross-site guard in the proxy for `/api/crm`, `/api/will`, `/api/atlas`, `/api/mia`, repeated inside `/api/will/actions`.
- Webhook: signature over the raw body before parsing, 256 KB cap, sender format check, per-message error isolation, idempotency by Meta id with bounded retries and a dead-letter task, masked numbers in audit rows.
- Approve path: guard re-run, stale-state check, atomic claim before send.
- Public forms: Sec-Fetch-Site guard, per-IP and per-person limits, byte budget before parsing, generic 500 with a short reference.
- Upload: type allowlist, 10 MB, magic bytes, server-generated path, private-bucket assertion.
- Search inputs escape ILIKE wildcards and use separate filter calls, not a filter string built from input.
- File and media proxies: host pinned, id format checked, non-raster types forced to download, `nosniff`, sandbox CSP, `no-store`.
- `/api/crm/seed` closed in production.
- No secret, token or key literal in the route files.

### Findings by status

| finding | severity | status | row |
|---|---|---|---|
| `/api/mia` outside the proxy guard matcher | MEDIUM | FIXED | R001 |
| Mia move: no brand or state check | MEDIUM | FIXED | R002 |
| Mia draft: no brand check | LOW | FIXED | R003 |
| Globally rate-limited inbound messages were dropped | MEDIUM | FIXED (returned to Meta for retry) | R004 |
| Hand-typed reply and estimate link skip content rules | MEDIUM | OPEN | R005 |
| Wildcard characters in the existing-client lookup | MEDIUM | FIXED | R006 |
| Anonymous form merged into an existing client by typed email or phone | MEDIUM | OPEN | R007 |
| Form matched to a chat by typed number unless enforcement is on | MEDIUM / LOW | OPEN | R008 |
| Student Visa Tax form link never marked used | MEDIUM | FIXED | API-01-F04 (b) |
| Form link single use not atomic | LOW | ACCEPTED | R010 |
| Knowledge import without caps or guard | MEDIUM | FIXED | R011 |
| JSON export returns raw rows | LOW | OPEN | R012 |
| Redelivered failure status adds a duplicate card | LOW | ACCEPTED | R013 |
| Payment-proof check before the note limiter | LOW | ACCEPTED (owner rule) | R014 |
| Kill switch accepted a non-boolean value | LOW | FIXED | R015 |
| CRM actions not wrapped in the customer's brand | LOW | OPEN (before SVT launch) | R016 |
| Archive deleted the task without checking the client write | MEDIUM | FIXED | API-02-F04 row |
| Archived task leaves documents in storage | MEDIUM | OPEN | R020 |
| Task list read not logged | LOW | FIXED | R021 |
| Raw error text returned to the logged-in owner | LOW | ACCEPTED | R022 |
| WhatsApp connect: ids not format-checked, no audit row | LOW | FIXED | API-02-F08 row |
| No rate limit on two staff routes that call the model | LOW | ACCEPTED | API-02-F09 row |
| Read-then-write on client return lists | LOW | ACCEPTED | API-02-F10 row |
| Lockout per IP | INFORMATIONAL | ACCEPTED | R027 |
| Tick and sweep act on GET | INFORMATIONAL | ACCEPTED | API-02-F13 row |

### Design points worth knowing (not findings)

- Several staff GET handlers have no try/catch; a store error becomes the framework's plain 500.
- `/api/will/export` with `mode=attention&commit=1` writes a cursor on a GET (accepted, UI-01-F03).
- `/api/will/health` calls Meta's API when a staff page polls it (cached 5 minutes per the code comment).
- `/api/tax-form/link` returns the customer's full WhatsApp number to the token holder, by design.

## HYPOTHESES

- With enforcement off, someone who knows a customer's phone number could cause one wrong "we received your questionnaire" message to that customer and attach a form to their record. Staff read every task before lodging.

## UNVERIFIED ASSUMPTIONS

- The platform caps request bodies for routes without an explicit cap.
- `Sec-Fetch-Site` is sent by the browsers customers use; non-browser clients are not stopped by that guard and rely on the rate limits.

## NOT TESTED

- Status codes, limits, body caps, error bodies and timing were not observed. The proposed route-level tests are in file 18.
