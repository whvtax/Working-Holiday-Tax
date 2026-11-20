# LIB-01 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/lib/atlas/ask.ts | 194 | 1-194 | REVIEWED |
| src/lib/atlas/atlas-view.ts | 137 | 1-137 | REVIEWED |
| src/lib/blog-dates.ts | 166 | 1-47, 48-166 | REVIEWED |
| src/lib/crm-store.ts | 268 | 1-268 | REVIEWED |
| src/lib/db.ts | 1031 | 1-520, 520-1031 | REVIEWED |
| src/lib/field-crypto.ts | 183 | 1-118, 118-183 | REVIEWED |
| src/lib/get-ip.ts | 134 | 1-134 | REVIEWED |
| src/lib/googleReviewsServer.ts | 72 | 1-72 | REVIEWED |
| src/lib/legal/legal-text.ts | 310 | 1-310 (lines 43, 70, 72, 110, 217 printed a second time in full because the first print clipped them) | REVIEWED |
| src/lib/normalise-labels.ts | 285 | 1-285 | REVIEWED |
| src/lib/rate-limit.ts | 183 | 1-183 | REVIEWED |
| src/lib/security-watch.ts | 165 | 1-165 | REVIEWED |
| src/lib/seed.ts | 148 | 1-148 | REVIEWED |
| src/lib/submit-tax-form.ts | 310 | 1-136, 137-310 | REVIEWED |
| src/lib/supabase.ts | 141 | 1-141 | REVIEWED |
| src/lib/upload.ts | 266 | 1-266 | REVIEWED |
| src/lib/wa.ts | 202 | 1-202 | REVIEWED |

Total: 17 of 17 files, 4195 lines.

Files outside the unit opened to judge a finding (read in full unless a range is given):
src/lib/field-seal.ts, src/app/api/crm/login/route.ts, src/app/api/crm/verify-otp/route.ts, src/lib/will/auth.ts, src/app/api/crm/seed/route.ts, src/app/api/crm/tasks/[id]/route.ts, src/app/api/tax-form/fix/route.ts, src/app/api/tax-form/upload/route.ts, src/app/api/tfn-form/route.ts (lines 55-135 only), src/lib/orphan-sweep-run.ts (lines 1-40 only), src/lib/validate.ts (lines 8-16 only), src/lib/intake-validate.ts (lines 84-92 only), src/lib/sanitise.ts (lines 16-33 only). For src/app/api/crm/file/route.ts and src/app/api/tax-form/route.ts only grep hits were seen, not the files.

src/proxy.ts exists but is NOT in this unit's file list and was not read. Its matcher coverage is not assessed here.

## Findings

### LIB-01-F01: Anonymous form submission can be merged into another customer's client record (wildcard in the match, and no proof of identity)
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED (the wildcard part depends on PostgREST behaviour and needs a runtime check; the unverified merge is CONFIRMED_BY_STATIC_EVIDENCE)
- CWE: CWE-639, CWE-155
- Files and lines: src/lib/db.ts:141-199 (escapeLike at 145, `.ilike` at 172-173 and 181-182); callers src/app/api/tax-form/route.ts:106, src/app/api/tfn-form/route.ts:74, src/app/api/abn-form/route.ts:73, src/app/api/super-form/route.ts:73; validator src/lib/validate.ts:8-9
- Evidence: `findExistingClient` matches a public, unauthenticated submission against `crm_clients` and open `crm_tasks` by email OR WhatsApp with `.ilike(...)`. `escapeLike` escapes only `\`, `%` and `_`. PostgREST also treats `*` as an alias for `%` in like/ilike patterns, and `*` is not escaped. The email validator (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) accepts `*`, and `sanitiseShort` does not remove it. A submitted email made of `*` characters around `@` and `.` would therefore match the first existing client of that brand. Separately, a correct email or number of a real client (no wildcard needed) is enough: the new task takes that client's `client_id` and the "Returning client" note (tfn-form/route.ts:74-76, 113).
- Root cause: the client match trusts unverified, attacker-typed identifiers, and the LIKE escape does not cover PostgREST's `*` alias. An exact match (`eq` on a normalised column) was intended; a pattern operator is used instead.
- Attack prerequisites: none beyond reaching a public form (rate limit applies). For the targeted variant, knowing a client's email or WhatsApp number.
- Impact: an impostor's task is filed under a real client and labelled as a returning client, carrying the impostor's own bank details. When staff archive it (`deleteTaskAndArchive`, db.ts:430-494) the real client's record is changed: notes appended, the tax return entry for that year replaced, TFN/ABN service marked done. No data is returned to the attacker.
- Recommended fix: match with equality on normalised values (lower-cased email, digits-only phone), or at minimum escape `*` as well and reject `*`, `%`, `_` in the email validator. Treat a match as a hint for staff ("possible returning client, verify") rather than reusing the client id automatically.
- Regression test: `findExistingClient('*@*.**', '')` against a table with one client returns null; a submission with a matching email but a different phone does not reuse the client id without a staff step.
- Limits of this verification: PostgREST's `*` handling was not exercised (no code was run). src/app/api/tax-form/route.ts was not read in full; abn-form and super-form were seen by grep only.

### LIB-01-F02: Archiving a task deletes the task row even when the client write failed, and never removes its documents
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-252, CWE-459
- Files and lines: src/lib/db.ts:494 (update, result ignored), 555 (insert, result ignored), 558 (delete), 405-560 (no `deleteFiles` call); 613-615 (`archiveTaskByPhone` falls back to a PENDING task); caller src/app/api/crm/tasks/[id]/route.ts:34
- Evidence: `await sb.from('crm_clients').update(updates)...` and `await sb.from('crm_clients').insert(initialUpdates)` do not look at the returned `error` (the Supabase client returns it, it does not throw). The next statement deletes the task. `deleteTaskAndArchive` also never calls `deleteFiles` and never checks `task.done`, while `archiveTaskByPhone` deliberately picks a pending task when no done task exists (line 613). `deleteTaskPermanent` (622-640) and `markTaskDone` (265-323) both handle files; this path does not.
- Root cause: unchecked write result before a destructive step; file cleanup assumed to have happened earlier in `markTaskDone`.
- Attack prerequisites: none for the data-loss case (any failed client write: a constraint, a missing column, a bad `referred_by`). For the orphaned-file case, staff use "delete"/"Mark lodged" on a task that was not marked Done first.
- Impact: the only record of a customer's submission is lost with no client record created. Passport, selfie and bank statement objects stay in storage with no row pointing at them. The orphan sweep (src/lib/orphan-sweep-run.ts) deletes nothing unless `ORPHAN_UPLOAD_DELETE=true` and only covers its configured prefixes.
- Recommended fix: check `error` on both client writes and stop before the delete; in `deleteTaskAndArchive`, delete files (and keep the row if that fails) exactly as `deleteTaskPermanent` does, or refuse tasks that are not done.
- Regression test: with the client insert mocked to return an error, the task row still exists afterwards; archiving a pending task with `file_urls` removes the objects or refuses.
- Limits of this verification: the orphan sweep was read only to line 40; whether the UI can call `delete` on a pending task was not checked.

### LIB-01-F03: TFN and bank details are stored in plain text when the encryption keys are absent, and other identity data is never encrypted
- Severity: MEDIUM
- Confidence: high (code), low (whether production has the keys)
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-311
- Files and lines: src/lib/field-seal.ts:23-44 (returns the plain value when `FIELD_ENC_KEYS` / `FIELD_ENC_ACTIVE` are missing); src/lib/db.ts:243-244 (only `tfn`, `bank_details` sealed), 238, 242, 250 (dob, address, notes plain), 288-292 (notes hold passport number, super member number, home address); src/lib/seed.ts:26-27; src/lib/field-crypto.ts:6-7 (header still says nothing imports the module)
- Evidence: `sealField` logs one warning and returns the plaintext if no key ring is configured. `createTask` seals two columns only. The `notes` column carries "Passport No:", "Super Member Number:", "Home Country Address:" until `markTaskDone` strips them; `dob` and `address` are plain columns. `crm_clients.dob` is plain for the life of the record.
- Root cause: fail-open rollout switch, and encryption scoped to two columns.
- Attack prerequisites: read access to the database, a backup, or the Supabase dashboard.
- Impact: tax file numbers and bank details readable at rest if the keys were never set; passport numbers, dates of birth and addresses readable regardless.
- Recommended fix: confirm the two env vars are set in production and that scripts/seal-legacy-task-fields.mjs has run; then make a missing key a hard error in production. Extend sealing to the passport number and other identifiers, or move them out of `notes`.
- Regression test: with `NODE_ENV=production` and no keys, `sealField` throws; a created task row has `enc1:` values in both columns.
- Limits of this verification: environment configuration and database contents were not inspected. The AES-256-GCM envelope itself (random 12-byte IV, AAD bound to table/column/row, key length checks) was read and looks correct.

### LIB-01-F04: Logged-out or revoked CRM sessions are accepted when the revocation list cannot be loaded
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-613
- Files and lines: src/lib/crm-store.ts:92-102, 112-124 (`_lastRefresh = now` is set at 116 before the refresh has succeeded), 146-161 (`validateSession` refreshes in the background and answers from the old cache); non-fresh callers src/app/(site)/crm/page.tsx:29, crm/dashboard/page.tsx:9, crm/partners/page.tsx:9, crm/partners/[id]/page.tsx:9, crm/mia/page.tsx:12, crm/whatsapp/page.tsx:12, crm/whatsapp/connect/page.tsx:18, crm/whatsapp/inbound-check/page.tsx:18
- Evidence: revocation lives in process memory plus Redis. `refreshRevocation` swallows every error; `ensureRevocationFresh` stamps `_lastRefresh` first, so a failed or timed-out (1.5 s) refresh is not retried for 60 s and a cold instance treats every signed, unexpired token as valid for that minute. The server pages listed use `validateSession`, which on a cold instance returns before the first refresh completes.
- Root cause: deliberate fail-open (comment at 104-110), plus the timestamp being set before success.
- Attack prerequisites: a stolen `crm_session` cookie that the owner has since logged out, and a Redis outage/timeout or a cold instance.
- Impact: the stolen session keeps working for up to its 8-hour life on affected instances.
- Recommended fix: set `_lastRefresh` only after a successful read; use `validateSessionFresh` in the server pages; consider failing closed for state-changing routes when the list has never been loaded.
- Regression test: with Redis mocked to reject, a second call within 60 s attempts the refresh again; a revoked sid is rejected by the first page render on a fresh module instance.
- Limits of this verification: the listed pages were seen by grep only, so what data they render server-side is not known.

### LIB-01-F05: Password lockout is per IP address only, with no overall cap
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-307
- Files and lines: src/lib/crm-store.ts:193-251 (keys built from the IP scope at 219-223); src/app/api/crm/login/route.ts:47, 60-71; src/lib/get-ip.ts:84-98
- Evidence: the attempt counter key is `crm_fail_count:<ip or /64>`. Each address gets 3 guesses per 35 minutes; nothing counts attempts across addresses. There is one shared password (`CRM_PASSWORD`), no username. In `reserveLoginAttemptRedis` the TTL is set only when `count === 1` (line 246), in a separate call from the INCR.
- Root cause: the global counter was replaced by a per-IP one (comment AUTHZ-DOS-01) with no global ceiling kept behind it.
- Attack prerequisites: many source addresses. The emailed 8-digit code is still required after the password.
- Impact: unbounded distributed guessing of the single password. If the EXPIRE after the first INCR is lost, that address is blocked with no expiry (counter key has no TTL).
- Recommended fix: add a global attempts-per-hour ceiling that raises an alert and adds a delay rather than a hard lock; set INCR and EXPIRE in one MULTI.
- Regression test: 3 failures from each of N distinct addresses trips the global ceiling; a counter key always has a TTL.
- Limits of this verification: password strength is unknown.

### LIB-01-F06: Client IP is taken from request headers; safe only if the edge overwrites them
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-348
- Files and lines: src/lib/get-ip.ts:84-98 (x-real-ip first, then the rightmost x-forwarded-for hop), 24-30 (IPv4 check accepts leading zeros, so one address has several spellings), 46-64 (zone id after `%` is not bounded beyond the 45-character cap), 115-129 (hex-form IPv4-mapped addresses all collapse to one `0:0:0:0::/64` bucket); src/lib/security-watch.ts:51-57 (`x-vercel-ip-country`, `x-vercel-ip-city` trusted the same way)
- Evidence: as described; the file's own header (lines 10-22) states the assumption.
- Root cause: no trusted-proxy configuration exists in code; trust rests on the hosting edge.
- Attack prerequisites: a path to the origin that does not pass through the Vercel edge, or a proxy in front that forwards client-supplied headers.
- Impact: every rate limit, the upload byte budget and the login lockout can be reset per request by changing the header; the "new device" country can be chosen by the caller.
- Recommended fix: confirm on the live deployment that inbound `x-real-ip` and `x-vercel-ip-*` are overwritten; canonicalise IPv4 (strip leading zeros) and drop the zone id in `getClientIp`.
- Regression test: `getClientIp` returns the same string for `1.2.3.4` and `001.2.3.4`; `fe80::1%a` and `fe80::1%b` give one key.
- Limits of this verification: deployment behaviour not tested.

### LIB-01-F07: "New device" login alert keys on browser family, operating system and country only
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-778
- Files and lines: src/lib/security-watch.ts:32-39, 62-64, 79-108; 111-122 and 127-142 (bank-detail check)
- Evidence: `deviceKey` hashes `"<Browser> on <OS>|<country>"`. Any login from, for example, the same browser family and OS in the same country as the owner is treated as a known device and sends no email. The list is read, changed and written back without a lock. The nightly bank check only recognises numbers that follow the words "BSB" or "account"/"konto"/"口座"; a changed PayID, an unlabelled number or a payment link is not detected.
- Root cause: coarse fingerprint; pattern-based tamper check.
- Attack prerequisites: valid password and email code (alert bypass); CRM access to edit a template (bank check bypass).
- Impact: a break-in with a common browser raises no alert; a payment-redirection edit worded without those labels passes the nightly check.
- Recommended fix: key the device on a long-lived random cookie set after a successful login (plus IP prefix), and alert on every login from an address not seen before. For templates, compare against an approved hash of each message rather than pattern matching.
- Regression test: two logins with the same user agent and country but no device cookie both alert.
- Limits of this verification: none for the code read; the caller of `checkBankDetails` was not opened.

### LIB-01-F08: Residency correction looks up the task by the last 9 digits, across both brands, in the newest 300 rows only
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639
- Files and lines: src/lib/db.ts:357-362, 337-354; caller src/app/api/tax-form/fix/route.ts:35-41
- Evidence: `findOpenTaxTaskByWhatsapp` loads `getAllTasks(300, 0)` (no brand filter, done tasks included) and returns the first open tax-return task whose customer-typed number ends with the same 9 digits. The route is WHT-only but the lookup is not. `setTaskTaxStatus` then rewrites `tax_status` and the notes line by read-then-write. The link is marked used after the write, not atomically.
- Root cause: phone-suffix matching against an unverified, typed field instead of a stored link between the Will customer and the task.
- Attack prerequisites: a valid staff-issued correction link. A second task (other brand, other country code, or submitted by someone who typed the same number) that is newer.
- Impact: the residency answer of a different task is changed (it drives Medicare levy and tax rates in the return). In season, a task older than 300 rows cannot be corrected at all.
- Recommended fix: carry the task id (or client id) inside the signed token, filter by brand, and query by it directly.
- Regression test: with an SVT task and a WHT task ending in the same 9 digits, the WHT link changes only the WHT task.
- Limits of this verification: src/lib/will/form-token.ts was not read.

### LIB-01-F09: Stored file references are deleted by path text without re-checking host or folder; staff-entered URL forms that cannot be deleted are accepted
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-20
- Files and lines: src/lib/upload.ts:222-246 (`url.indexOf(marker)`, no host check, raw string sliced); src/lib/supabase.ts:94-113 (accepts `sign/` and bare object paths, query strings, fragments, userinfo and port; percent-encoded dot segments pass because the parsed path is checked but the raw string is stored), 133-141; src/app/api/crm/tasks/route.ts:45
- Evidence: `deleteFiles` trusts whatever follows `/storage/v1/object/public/uploads/` in the stored string. `isValidSupabaseStorageUrl` accepts shapes that `deleteFiles` cannot parse (they return `ok:false`, so the task keeps its files: safe, but those files are never deleted), and shapes whose raw text differs from the validated path. The public path uses the stricter `isPublicFormUploadUrl`, which is sound, but it only limits the folder: a public submission may reference any object under its brand's `tax-form/` folder, since an upload is not bound to the submission that follows it.
- Root cause: validation at write time and parsing at delete time use different rules; no upload token.
- Attack prerequisites: a CRM session for the staff path. For the public path, the exact object URL of another customer's upload (millisecond timestamp, 8 random hex characters and file name; returned only to the uploader).
- Impact: with a known URL, another customer's document would be shown under, and deleted with, the attacker's task. Guessing the URL is not practical.
- Recommended fix: store the object path (not a URL), validate and normalise it once with one function used by both store and delete; have the upload endpoint return a signed upload token that the submission must present.
- Regression test: `deleteFiles` refuses a URL on another host; a URL with `%2e%2e` or a query string is rejected at store time.
- Limits of this verification: src/app/api/crm/tasks/route.ts and src/app/api/crm/file/route.ts were seen by grep only.

### LIB-01-F10: Atlas sends the staff question and chat history to the model without redaction
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-359
- Files and lines: src/lib/atlas/ask.ts:144-147 (history and `question` are inserted as is; only the DATA block and tool results go through `redactForModel`), 18-34 (history comes from the browser, including "assistant" turns), 55-57 (customer name and last message preview are part of DATA)
- Evidence: as described. Tool results are redacted and cut to 20,000 characters (line 179). Proposals are capped at three and need a click to run (167-172).
- Root cause: redaction applied to data the server fetched, not to text typed or replayed by the client.
- Attack prerequisites: a CRM session; a staff member pasting an identifier into the question.
- Impact: a TFN, bank detail or passport number typed into the chat is sent to the model provider. Customer names and message previews are sent by design.
- Recommended fix: pass `question` and each history turn through the same redaction before the call.
- Regression test: a question containing a 9-digit TFN-shaped number reaches the `call` mock as `[removed]`.
- Limits of this verification: src/lib/atlas/redact.ts and src/lib/atlas/actions.ts were not read, so what `redactForModel` removes, and whether an approved `send_reply` passes the policy guard and the 24-hour window, are not verified here.

### LIB-01-F11: Rate limiting falls back to a per-instance counter whenever Redis is missing, slow or rejects the command
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-770
- Files and lines: src/lib/rate-limit.ts:19-22, 108-134, 149-179 (`EXPIRE ... NX` at 118 and 170)
- Evidence: with no `REDIS_URL`/`KV_URL`, a 1.5 s timeout, or any thrown error, the limit is counted in the memory of one serverless instance. `EXPIRE key ttl NX` needs Redis 7 or later; on an older server the transaction reports an error and every call takes the memory path for good.
- Root cause: chosen degrade mode (documented at lines 1-6).
- Attack prerequisites: requests spread across instances while Redis is degraded.
- Impact: public form and upload limits (including the 120 MB byte budget) become roughly "per instance" instead of "per client". CRM login is not affected (it refuses to run without Redis).
- Recommended fix: confirm the Redis version supports `EXPIRE NX`; alert when the fallback is used; consider a lower fallback ceiling.
- Regression test: with `exec` mocked to reject, the function logs once and a metric/alert is raised.
- Limits of this verification: Redis version and client error behaviour not tested.

### LIB-01-F12: Client Agreement lists two fees only; document handling text does not match the code
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/legal/legal-text.ts:64-76 (clause 6), 203-204 (clause 25), 272-273 (privacy 8); src/lib/db.ts:276-321
- Evidence: clause 6 states $220 (TFN only) and $385 (TFN and ABN). The $330 / $495 foreign-income fees and the $330 / $440 review fees are not stated, although the guarantee wording at line 70 refers to both foreign income and reviews. The guarantee scope itself matches the rule (TFN-only returns; not ABN, not foreign income, not reviews). Clause 25 says the client may ask for a copy of the documents they provided "at any time" and privacy 8 says records are kept 5 to 7 years, while `markTaskDone` deletes the uploaded documents and blanks TFN, bank details and address when a task is marked Done.
- Root cause: legal text and code changed separately.
- Attack prerequisites: none.
- Impact: compliance and dispute exposure, not a technical weakness.
- Recommended fix: have the registered agent confirm the fee list and the retention wording against what the system does.
- Regression test: n/a.
- Limits of this verification: no legal judgement is offered.

### LIB-01-F13: The firm's own BSB and account number are constants in source
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/lib/security-watch.ts:18-19 (`OUR_BSB`, `OUR_ACCOUNT`), 134-135 (repeated inside message strings); also seen by grep in src/lib/will/handoff-reasons.ts:340
- Evidence: used as the reference values for the nightly tamper check. These are payment details given to customers, not credentials. The values are repeated as literals in three places, so a change of bank account must be made in each.
- Root cause: reference value kept in code so that a database edit cannot change it.
- Attack prerequisites: none.
- Impact: none direct; drift risk if one copy is missed.
- Recommended fix: build the message strings from the two constants.
- Regression test: n/a.
- Limits of this verification: none.

## Checked and found sound

- Session token: HMAC-SHA256 over the payload, constant-time compare with a length check, numeric `exp`/`iat` enforced, 8-hour ceiling, random 128-bit session id (src/lib/crm-store.ts:43-72, 142-144). `JWT_SECRET` is used only here; form links use a separate secret (grep; src/lib/will/form-token.ts:14 comment).
- Session and pre-auth cookies: `httpOnly`, `secure` in production, `sameSite: 'strict'`, 8 h / 10 min (src/app/api/crm/verify-otp/route.ts:90-96; src/app/api/crm/login/route.ts:102-108).
- One-time code: `crypto.randomInt`, 8 digits, stored as a hash, bound to a random pre-auth cookie, 5 tries, 10-minute life, deleted on use, constant-time compare (src/lib/crm-store.ts:21-23; verify-otp/route.ts:26-80).
- Password check: PBKDF2-SHA512, 100,000 rounds, `timingSafeEqual`, input capped at 200 characters, attempt reserved before the check (src/lib/crm-store.ts:8-19, 243-251; login/route.ts:32, 67-73). Login refuses to run without Redis (login/route.ts:43-44).
- Lockout scope collapses IPv6 to /64 and sanitises the key (src/lib/crm-store.ts:207-223).
- Rate-limit keys hash phone and email shaped identifiers; memory fallback is bounded to 5000 keys; non-numeric Redis replies are treated as failure (src/lib/rate-limit.ts:69-80, 100-106, 123, 171).
- Field encryption primitive: AES-256-GCM, fresh random 12-byte IV, tag checked, AAD is JSON of table/column/row, keys must be exactly 32 bytes, index key must differ from data keys, errors never include the value (src/lib/field-crypto.ts:63-86, 95-103, 110-156).
- Uploads: type allow-list, 10 MB cap, magic-byte match against the declared type, HEIF brand check, WebP marker check, sanitised name with random part, `upsert: false`, private-bucket assertion before every write (src/lib/upload.ts:134-189; src/lib/supabase.ts:73-85). The CRM file route sets `nosniff` and a sandbox CSP (grep only, src/app/api/crm/file/route.ts:141-146).
- Public upload URL check limits a submission to its own brand's `tax-form/` folder and rejects traversal, query, fragment and backslash (src/lib/supabase.ts:133-141).
- Brand scoping in `findExistingClient` and `archiveTaskByPhone`; an SVT lookup never widens to WHT rows (src/lib/db.ts:160-164, 193-197, 595-605).
- `markTaskDone` and `deleteTaskPermanent` keep the file references when storage deletion fails (src/lib/db.ts:276-285, 313, 629-636).
- Seed data: demo values only, and the route is blocked in production, needs `SEED_ENABLED=true` and a fresh session (src/lib/seed.ts; src/app/api/crm/seed/route.ts:9-16).
- Security email HTML is escaped (src/lib/security-watch.ts:98-102, 163-165).
- Google reviews fetch: fixed host, 8 s timeout, sizes capped, photo and profile URLs must be https (src/lib/googleReviewsServer.ts:20-23, 36-71).
- `waUrl`: fixed number, text passed through `encodeURIComponent`, detail cut to 120 characters (src/lib/wa.ts:188-202).
- No secrets found in the 17 files. blog-dates.ts, normalise-labels.ts, atlas-view.ts: pure functions, nothing security relevant.
- Service-role Supabase client is a server-only singleton with session persistence off (src/lib/supabase.ts:19-50). Every query in this unit runs with Row-Level Security bypassed, so authorisation rests entirely on the calling routes.

## Open questions

1. Does PostgREST on this project convert `*` to `%` in `ilike` values sent by supabase-js? (decides the wildcard half of F01)
2. Are `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` set in production, and has the legacy backfill run? (F03)
3. Does the Vercel edge overwrite inbound `x-real-ip`, `x-forwarded-for` and `x-vercel-ip-*` on every route, including any custom domain or proxy in front? (F06)
4. Which Redis version is in use, and does `EXPIRE ... NX` succeed? (F11)
5. src/lib/submit-tax-form.ts:94-98 relabels HEIC as `image/jpeg`. The public upload route accepts that (upload/route.ts:74-78), but `validateFileContents` in src/lib/upload.ts:100-111 would reject it. Do the TFN/ABN/super forms send HEIC photos the same way? If so those uploads fail.
6. Is the bucket-privacy result (cached for the life of a warm instance, src/lib/supabase.ts:72-85) acceptable, given a bucket switched to public later is not noticed until a cold start?
7. `getDashboardStats` fallback counts active clients with `.eq('archived', false)` while the list functions also include `archived IS NULL` (src/lib/db.ts:902 vs 648). Counts can differ; not a security issue.
8. src/proxy.ts was named in the task's extra focus but is not in LIB-01-files.txt. Which unit covers it?
