# 18. Test security coverage

Sources: `units/TESTS-01-report.md`, `units/TESTS-02-report.md`, DEBATE-4. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- 505 test files were in scope (43,097 lines). 104 were read in full (9,349 lines). 399 were read by titles only or in part: statements about them rest on test titles and targeted searches, not on the assertions. 2 binary fixtures were not opened.
- The reviewers did not run any test. Tests were not used as evidence for any finding.
- After the 18 Nov fixes the owner's session ran the suite: 6,526 passing, 2 failing only because `.env.example` is absent from this working copy. One test file was added with the fixes (`src/lib/will/__tests__/audit-fixes-18nov.test.ts`); it was not reviewed by a unit.
- The production build was not verified in this environment.

## STATIC ANALYSIS CONCLUSIONS

### Where behavioural negative tests exist (by the reviewers' reading)

| control | kind of test |
|---|---|
| Webhook signature, size, shape, flood, phone-number-id routing | behavioural |
| Login: wrong password, parallel guesses, lockout scope | behavioural |
| One-time code: forged pre-auth id, five-guess cap | behavioural |
| Session: garbage, unsigned, tampered token; revoked token on a cold instance | behavioural |
| Cron secret: missing, empty, near miss, forged cookie | behavioural |
| Cross-site guard for CRM and Will API trees, incl. `Origin: null` | behavioural (matcher level) |
| Document proxy: foreign host, encoded traversal, no session; HEIC decompression bomb | behavioural |
| Upload: content sniffing, names, 10 MB boundary, brand prefix | behavioural (storage and limiter mocked) |
| Public forms: cross-site refusal, per-person and per-IP limits, other customers' and other brand's file URLs | behavioural |
| Form token library: expiry, brand, key, tamper, purpose | behavioural |
| Policy guard: injection outputs, Unicode tricks, six languages, card and bank details, 24-hour window | behavioural, extensive |
| Model output validation, cross-customer history | behavioural |
| Media URLs: SSRF targets, token only to the provider's hosts | behavioural |
| Brand isolation: host spellings, store lookups, send number, receiving number | behavioural |
| Field encryption: other row or column does not open; rotation; plaintext refusal | behavioural; no tampered or malformed-envelope case |
| Kill switch read fails safe; no model key in production gives a task | behavioural |
| Rate limiter: IPv6 /64, Redis failure, key flood, hashed keys | behavioural |
| Log and error redaction; audit rows without names or numbers | behavioural |
| Data deletion at Done; orphan sweep limits | behavioural |
| Release packaging and secret scanner | behavioural on a temp fixture |

### Gaps

| gap | status | rows |
|---|---|---|
| Authorisation of most session-gated routes is proved by a regular expression over source text, not by calling the route. Mia and Atlas routes have no route test | ACCEPTED as a product matter; backlog test | R204 |
| No request-level origin test; cookie flags checked on source text | ACCEPTED; backlog test | TESTS-01-F03 row |
| Tests that pin fail-open behaviour (plain-text storage without a key, strict boolean read of the kill switch, mock model flag) | partly ACCEPTED, partly OPEN | TESTS-01-F04 row, R209 |
| Form-token binding in the live tax-form route has no test that runs | OPEN with the enforcement setting | R191 |
| Fix-link single use tested in sequence only; guard mocked away | ACCEPTED | R208 |
| Cross-brand number leak check switched off while the number is shared; Student Visa Tax form end-to-end test skipped by default | OPEN (launch gate) | R201 |
| Number-shaped strings beside first names in test comments, titles and one fixture | OPEN: owner to confirm which are real and approve a sweep | R203 |
| Business bank details, agent number and a provider phone-number id hard-coded in fixtures | ACCEPTED (not secrets) | TESTS-01-F05 row |
| Database RLS, grants, function privileges tested only as text in migration files | noted; live check is roadmap P0 item 1 | |
| Security headers computed from config, not from a running server | noted | |
| Playwright starts the app with whatever local environment file exists | noted (INFRA-02-F08) | |

## Proposed tests

### From TESTS-01 (15)

1. `will/actions` refuses every action without a session: 401 for each action name, zero writes, zero sends.
2. Every gated handler answers 401 with no cookie and with a garbage cookie, with data layers replaced by throwing spies.
3. A cross-site POST to a state-changing CRM or Will route is refused (another site's `Origin`, and `Sec-Fetch-Site: cross-site`).
4. Session token rejected when expired, re-signed with another secret, or edited under the old signature.
5. A password-step cookie cannot be used as a session.
6. Password hashing is salted and slow; the one-time code comes from a cryptographic random source.
7. The same message id delivered in parallel is processed once on a real store.
8. Two overlapping scheduler ticks send a due follow-up once.
9. A kill switch value of the wrong type fails closed (or the setter refuses it; the setter part was fixed on 18 Nov).
10. An oversized inbound text is truncated before storage and before the model.
11. Public form routes refuse an oversized multipart body before parsing.
12. A submitter cannot attach a stored object that is not from their own upload session.
13. A malformed or truncated encryption envelope is an error, never plain text.
14. Logs and audit rows on the webhook failure path carry no message text and no full number.
15. The context sent to the model holds no TFN, bank detail or document URL from the CRM record.

### From TESTS-02 (15)

1. Every non-public API handler refuses a caller with no session or a forged session.
2. Mia send and move cannot act on a customer of the other brand.
3. A tax-form submission is bound to the token's customer; with enforcement on, an untokened or wrongly tokened submission touches no customer.
4. The personal form link endpoint gives nothing without a valid token and never returns contact details beyond the design.
5. A fix link changes the status once under two parallel requests and fails closed when the used marker cannot be read.
6. In production, missing field-encryption keys are a fault, not silent plain text.
7. A sealed field that was altered, truncated or sealed under an unknown key id does not open and does not throw.
8. A one-time code cannot be reused, and parallel guesses cannot exceed the cap.
9. A pre-auth id or a form token is not accepted as a CRM session.
10. Gated routes use the fresh session check, so a logged-out token is refused on a cold instance.
11. An upload larger than 10 MB with no or a false `content-length` is refused without buffering it all.
12. Two deliveries of the same WhatsApp message arriving together are processed once.
13. Public form endpoints refuse a request whose `Origin` is another site when `Sec-Fetch-Site` is absent.
14. No customer-facing send path skips the policy guard.
15. When the two brands have different numbers, the other brand's number is a leak everywhere.

Several pairs overlap (TESTS-01 items 1, 2, 5, 7, 13 with TESTS-02 items 1, 9, 12, 7). Two proposals mention the deleted TFN and ABN form routes; apply them to the tax and super forms. Proposals 5 and 6 of TESTS-02 would fail today by design until the owner decides R010 and R029. Each proposal's target, preconditions, expected result, CWE and isolation needs are in the unit reports.

### Suggested order

First: TESTS-02 item 1 (behavioural 401 over all gated handlers), item 3 (form-token enforcement), item 14 (no unguarded send path). Then the concurrency tests (TESTS-01 items 7 and 8) alongside roadmap P2 item 1.

## UNVERIFIED ASSUMPTIONS

- That the 399 files read by title assert what their titles say.
- That the suite result quoted above reflects the code in this working copy at the time it was run.

## NOT TESTED

- The reviewers ran nothing. No coverage measurement, mutation test or end-to-end run was made for this audit.
