# 15. Concurrency and integrity

Sources: WILL-01, WILL-02, WILL-04, WILL-05, WILL-06, API-01, API-02, LIB-01, INFRA units, TESTS units, DEBATE-1 to DEBATE-3. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- The code for claims, locks, retries and idempotency was read in full.
- Nothing was run in parallel. No race was reproduced. Every statement below about a race is a reading of the code, not an observation.

## STATIC ANALYSIS CONCLUSIONS

### Controls that are atomic as read

| control | mechanism | location |
|---|---|---|
| Inbound message processed once | claim by Meta message id (primary key), bounded retries, dead-letter task; retry counter now persisted; no retry after a stored reply | `webhook/route.ts:785-872`; migration 024 |
| One sender of a queued message | conditional status update (`claimMessageForSend`, `claimQueuedForSend`) | `store-supabase.ts:795-809` |
| One worker per job | conditional status flip in `claimJob` | `store-supabase.ts:1286-1289` |
| One pending auto-reply per customer | partial unique index | migrations 034, 040 |
| One template per key | unique key | migration 041 |
| Stage change | optimistic check in `setState`; payment confirmation uses the result as compare-and-set | `store-supabase.ts:582-588`; `service.ts:3033-3037` |
| AI budget | SQL counter function, atomic, fails closed | migration 029 |
| Follow-up not sent twice | job marked done before sending; crash handler does not reopen it | `scheduler.ts:2073, 2165-2169` |
| Login attempts | attempt reserved before the password check; parallel guesses capped | `crm-store.ts:243-251` |
| Verbatim duplicate send | `wasAlreadySentVerbatim` check in `deliverOut` | `channel.ts:425` |
| Approve | guard re-run, stale-state check, atomic claim before send | `actions/route.ts:503-554` |

### Open and accepted gaps

| topic | what the code does | status | rows |
|---|---|---|---|
| Per-customer serialisation | the queue is a module-level map, so it orders work inside one instance only; voice-note handling runs outside it; job `attempts` is read before the conditional update | OPEN: needs a database lock or SQL functions (migration). Worst case stated in the debate: a duplicate acknowledgement or a second task | R059 |
| Review-ask register | one settings value holds all customers; a failed read followed by a write can overwrite the register | OPEN: needs one row per customer or an atomic merge | R104 |
| Store errors read as "empty" | reads return empty and writes ignore the result on a database error | OPEN: staged change | R093 |
| Customer deletion | five separate deletes, parent last, unchecked | OPEN: one SQL function | R095 |
| Form link single use | read, act, then mark used | ACCEPTED | R010, R208 |
| Opt-out between decision and send | customer re-read at the transmit point | FIXED | R060 |
| Pause or kill switch between decision and send | window of seconds; tick reads the switch once | ACCEPTED | R061 |
| Soft send limiter | read-then-write counter, fails open on a write error | ACCEPTED (documented) | R076 |
| Redelivered failure status | adds another card or job; resend checks for a verbatim copy first | ACCEPTED | R013 |
| Idempotency claim release fails open | at-least-once chosen over dropping a message | ACCEPTED | R097 |
| Client return lists | read-modify-write in two helpers | ACCEPTED (one operator) | API-02-F10 row |
| Archive | client write now checked before the task is deleted | FIXED | API-02-F04 row |
| Orphan sweep | stops and deletes nothing on an unreadable row | FIXED | LIB-02-F06 row |
| Resend job | checks the message belongs to the job's customer and is outbound | FIXED | R075 |
| Stuck "sending" rows | a sweep marks rows older than 15 minutes failed and raises an urgent task | sound (reason WILL-06-F06 was accepted) | |
| Double clicks in the CRM | run-once guards on approve, discard, reply; estimate and signature resend have no server repeat guard | ACCEPTED (deliberate resend) | R176 |
| CRM bulk clear | closed every open task and always reported success | FIXED (result reporting and label; the bulk override itself is the owner's call) | R148 |

### Data integrity

- Constraints in migrations: brand check constraint and `(wa_id, brand)` unique index (047, marked not applied); outcome limited to three values (043).
- `get_dashboard_stats` casts stored text; one malformed row fails the whole call (INFRA-01-F12, accepted).
- Migration 046 can report success while leaving the old sentence (R056, open: run the check query).
- Business-hours calculation is now bounded to seven days (WILL-04-F11 fixed). Local midnight is hour 0 (WILL-06-F13 fixed).

## HYPOTHESES

- With more than one serverless instance handling the same customer at the same moment, two replies or two tasks could be produced for one burst of messages. The atomic claims above limit this to the cases in R059.

## UNVERIFIED ASSUMPTIONS

- That migrations 024, 034, 040 and 041 are applied, so the unique keys the code relies on exist.
- That the platform does not run two cron ticks at once often; the job claim is designed for that case.

## NOT TESTED

- No parallel webhook delivery, double tick, parallel approve or concurrent form submission was run. TESTS-01 and TESTS-02 propose tests for these (file 18).
