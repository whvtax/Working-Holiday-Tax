# sec-api-logic - public endpoints, API logic, rate limiting, payment and state transitions

Reviewer: sec-api-logic. Static review plus local jest only. No production access, no real data, no secrets read.
Date: 2 Nov 2026. Project copy: /home/claude/work/whvtax-security (FINAL6).

## 1. Scope covered

Read in full: `src/app/api/{tfn-form,abn-form,super-form,tax-form,tax-form/upload,analytics/funnel,google-reviews}/route.ts`, `src/lib/{rate-limit,get-ip,sanitise,validate,intake-validate,upload,leads,googleReviewsServer,supabase(storage URL helpers)}.ts`, `src/proxy.ts`, `vercel.json`, header section of `next.config.js`, `src/lib/db.ts` (createTask, findExistingClient, markTaskDone, deleteTaskAndArchive), `src/lib/will/form-link.ts`, `src/lib/will/state-machine.ts`, `src/lib/will/payment-claim.ts`, `payment-proof.ts`, `payment-confirmation.ts`, `src/app/api/will/webhook/route.ts` (signature, size, idempotency, rate limit), `src/app/api/crm/tasks/*`, `crm/clients/[id]/referral*`.

Structural facts that shape the findings:
- There is NO online payment processor in this codebase (no Stripe, no payment webhook, no price/checkout API). Payment is a manual bank transfer. "Paid" is set by the WhatsApp assistant when the customer says so or sends a receipt (payment-claim.ts header states this is a deliberate owner decision). The only webhook is the Meta WhatsApp one.
- There is NO public contact or lead-capture endpoint. `/contact` is a page with `mailto:` links. Leads are captured by a DB trigger on `crm_tasks` (migration 016, not in scope to test); the only lead API is `/api/crm/leads` (session-gated).
- Fees never travel from the client. The only fee constants are server side (`FEES_AUD`, price messages); no public route accepts a price or fee field. Verified by reading every public route's field list.
- No CORS headers are set anywhere (grep for `Access-Control`, `cors` finds nothing outside comments), so browsers enforce same-origin for the JSON and raw-body endpoints. The multipart form endpoints are "simple" cross-site POSTs (see F-12).
- No server-side fetch takes a user-controlled URL. `googleReviewsServer.ts` fetches a fixed host with a fixed (non-secret, env or constant) widget id. No `redirect()` or `NextResponse.redirect` takes user input (redirects in `next.config.js` are static). No SSRF or open redirect found.

## 2. Findings

| # | Sev | Status | Title | Evidence |
|---|-----|--------|-------|----------|
| F-1 | Medium | Confirmed (known, documented in code) | Unauthenticated tax-form submission drives a stranger's WhatsApp customer state by phone-number match | `tax-form/route.ts:~255` calls `notifyFormReceived`; `will/form-link.ts:95,159-178,334-404` |
| F-2 | Low | Confirmed, FIXED | Raw upload/storage/bucket-guard error text returned to anonymous callers by tfn/abn/super forms | `tfn-form/route.ts:58-63` (and abn, super); `upload.ts` `Upload failed: ${msg}`; `supabase.ts:78,82` |
| F-3 | Low | Confirmed, FIXED | Public tax form accepted URLs of ANY object in the private uploads bucket (other customers' passports, bank statements) | `tax-form/route.ts:81-93`; `supabase.ts` `isValidSupabaseStorageUrl` |
| F-4 | Low | Confirmed, FIXED | Legit file names containing two dots (e.g. `scan..pdf`) were silently dropped from a submission by `pathname.includes('..')` | `supabase.ts` `isValidSupabaseStorageUrl` (old line) |
| F-5 | Medium | Confirmed (design trade-off, patch proposed) | Upload byte budget fails open when Redis is down: 100 requests x 10 MB (about 1 GB) per IP per window into the private bucket holding identity documents | `tax-form/upload/route.ts:143-159` |
| F-6 | Low | Confirmed (patch proposed) | TFN, ABN and super forms are limited to 5 per IP per 15 minutes with no per-person key; the hostel/farm shared-IP problem already fixed on tax-form is still present here | `tfn-form/route.ts:20`, `abn-form/route.ts:20`, `super-form/route.ts:20` |
| F-7 | Info | Confirmed | Rate limiter fails to a per-instance in-memory counter, not open and not closed. On Vercel each warm instance has its own counter, so the effective limit is `limit x instances` while Redis is down. Deliberate and documented; acceptable for public forms, NOT acceptable for login/OTP (see sec-auth report) | `rate-limit.ts:64-98` |
| F-8 | Low | Confirmed (patch proposed) | Refund amount recorded on the permanent client record is taken by regex from free-text notes; the loose fallback `\$\s*([\d,]+...)` picks the first dollar figure, which can be client-supplied text (receipt file names in `invoiceFailures`, SVT `extraNotes`) or a TFN/ABN invoice total on a task archived before it was marked done | `db.ts:341-343`; notes built at `tax-form/route.ts:149-165` |
| F-9 | Low | Confirmed | No idempotency or duplicate-submission control: a double submit or replay creates a second `crm_tasks` row (up to 5 per person per 15 min, up to 30 per IP) and re-queues Will notifications (partly guarded: `form_received_already_queued`) | `tax-form/route.ts:75-180`, `createTask` (new UUID per call) |
| F-10 | Low | Confirmed | Client matching on a single unauthenticated identifier: `findExistingClient` matches email OR phone, so a submission using a victim's email with the attacker's own phone is filed under the victim's `client_id` and labelled "Returning client" in staff notes. A person reading the task sees a mismatched name, but the label is attacker-influenced | `db.ts:139-175`, `tax-form/route.ts:75-77,115` |
| F-11 | Info | Confirmed | Funnel analytics: unauthenticated, 5 events per IP per window, so a shared-IP household loses events (3 events per real session) and anyone can inject fake `submit_success` events (metrics poisoning only). DB errors are answered `ok:true` by design | `analytics/funnel/route.ts` |
| F-12 | Info | Confirmed | Public multipart endpoints have no Origin or Fetch-Metadata check, so any web page can make a visitor's browser POST to them. No cookies are involved, so there is no CSRF impact; the only effect is spending the visitor's IP rate-limit budget (deny-of-service against one person, trivial) | `tax-form/route.ts`, `tfn-form/route.ts` |
| F-13 | Info | Confirmed | Authenticated CRM routes return raw Supabase `error.message` to the browser (session-gated, so staff only) | `crm/partners/route.ts:20,96`, `crm/partners/[id]/route.ts:64`, `crm/clients/[id]/referral*/route.ts:25` |
| F-14 | Info | Design risk, owner-accepted | Payment confirmation is customer-attested: a typed "paid" or a plausible receipt moves a customer to PAID and sends the form link; nothing is connected to a bank (payment-claim.ts header says so, Jo has weighed it). Exposure is one return's work per false claim. The state machine itself is sound (PAID requires a payment report, `TRANSITIONS` is enforced by `canTransition`, closed states only reopen via `reopenTarget`) | `will/payment-claim.ts:1-25`, `will/state-machine.ts:66-90`, `will/service.ts:1305-1340` |
| F-15 | Info | Confirmed OK | Meta webhook: HMAC-SHA256 over the raw body with `timingSafeEqual`, 256 KB cap before parsing, atomic idempotency on message id (`claimInbound`), retry budget, per-sender and global throttles, verify-token compared in constant time. No finding | `will/webhook/route.ts:105-141,653-690,745-770` |
| F-16 | Info | Not exploitable | Server-side fetch (Featurable reviews): host and path are constants, only a public widget id is interpolated, 8 s timeout, response is mapped field by field (no passthrough). No SSRF. `getClientIp` validates IP shape and prefers `x-real-ip`; spoof risk depends on ingress (outside code) | `googleReviewsServer.ts`, `get-ip.ts` |

### Details and exploitability in this architecture

**F-1 (Medium).** `POST /api/tax-form` is public. After saving the task it calls `notifyFormReceived(whatsapp, email, 'tax-return', ...)`, which looks up the Will customer by the phone number the submitter typed and, if that customer is in PAID or FORM_PENDING, queues FORM_RECEIVED (marks the form complete, cancels the reminders, sends "we received your questionnaire") and, when the submitter answers Medicare "No", queues the Medicare Levy Exemption message 15 minutes later. For customers still in a sales state it sets `formComplete` and a remembered Medicare flag. A phone number is a public identifier, so anyone who knows a customer's number can do this to that customer. No oracle: the response is always `{ok:true}`. Bounded by the per-IP limits (30 per window), by the state gate, and by the one-MEDICARE_INFO-ever guard. Impact: operational and reputational (a genuine customer stops being chased, receives a message about a form they never sent, may receive the Medicare exemption message they did not need), no data disclosure. The code comment at `form-link.ts:140-158` already records this as accepted pending a product change. Fix: carry a one-time completion token from the WhatsApp thread into the form link (HMAC over customer id plus expiry), require it before any state change; without it, still save the task but only raise the "unmatched, link by hand" task. Category C for infrastructure of the link format and the Will playbook; not implemented. Status after fix: n/a.

**F-2 (Low), fixed.** An anonymous caller could trigger `Cannot verify uploads bucket privacy: <provider text>`, `Upload failed: <Supabase storage text>` or the line `SECURITY: "uploads" bucket is PUBLIC` and read it in the 400 response (`message`), which the form then shows in an `alert()`. That discloses bucket name, provider error detail and, in the worst case, a misconfiguration. Fix applied: a new `UploadValidationError` class carries only customer-actionable rejections (type, size, not a real image, name too long); the three routes echo only that class; everything else is logged server side and answered `500 submission_failed`. The client already handles `submission_failed`.

**F-3 (Low), fixed.** `invoiceUrls` is client-supplied. `isValidSupabaseStorageUrl` only checked host plus bucket, so an anonymous submitter could attach any existing object in the private bucket to a task. Not practically guessable (`Date.now()` plus UUID fragment plus `CLT-<uuid>` folder), but the stored string is later the key for CRM file access and, when the task is marked done, for DELETION of that object (`markTaskDone` -> `deleteFiles`). So anyone who ever learned a URL (a leaked screenshot, a former staff member, a customer's own copy) could cause another customer's document to be deleted on completion, or make it appear in another task. Fix applied: new `isPublicFormUploadUrl(url, brand)` allows only `public/uploads/tax-form/` (WHT) or `public/uploads/svt/tax-form/` (SVT), rejects traversal segments, `%2e`, `%2f`, backslash, query and fragment in the raw string (the raw string is what is stored). Wired into `tax-form/route.ts` only. `crm/tasks/route.ts` (session-gated) keeps the wider check.

**F-4 (Low), fixed.** `u.pathname.includes('..')` rejected a legitimate upload whose sanitised file name still contains `..`, and the route filters silently, so the customer's document vanished from the submission with no error. Now rejects only a traversal segment (`/../`, `/./`), which the URL parser has already normalised anyway.

**F-5 (Medium).** The 120 MB byte budget lives only in Redis (`getRedis()`); if Redis is unreachable the `catch { /* fail open */ }` skips it, and the only remaining control is the request count (100 per 15 min per IP, via the in-memory fallback, so per instance). Worst case about 1 GB per IP per window of attacker-chosen files (magic-byte checked images/PDFs) written to the bucket that holds passports. No data exposure, but storage cost, noise for staff and possible bucket quota exhaustion that would make real uploads fail. Also, uploaded objects are never linked to a submission until the form posts, so orphans accumulate (see "needs infrastructure": lifecycle rule). Patch P1 below adds a per-instance byte counter as the fallback. Category B (rate limiting), not applied.

**F-6 (Low).** `tax-form` was changed after a real incident so that a shared IP (hostel, farm bunkhouse, carrier NAT) is not blocked; the three standalone forms still use `isRateLimited(ip, '<form>')` at 5 per 15 min. Two customers each retrying once on slow wifi from the same hostel exhaust it. Patch P2 mirrors the tax-form approach. Category B, not applied (a limit change that could also let more abuse through; owner decision).

**F-8 (Low).** `markTaskDone` strips most client-authored lines before archiving, but `⚠️ N receipt(s) did NOT upload ...: <file names>` and SVT `extraNotes` survive, and `deleteTaskAndArchive` reads the first `$` figure when no `💵 Refund:` label exists. An unauthenticated submitter can name a receipt `$9999.jpg` (the name goes through `sanitiseShort`, which keeps `$`) and, when the card is archived without a labelled refund, the client's tax-return history records refund 9999. Also, on a pending task deleted rather than done, the TFN/ABN invoice total can be archived as the refund. Impact: wrong figures in the CRM history and stats, no money movement. Patch P3: use only the labelled figure unless the task predates 4 Sep, and strip `$` from client-origin note lines.

**F-9, F-10 (Low).** No unique constraint or idempotency key; every POST inserts a new task. `findExistingClient` links by email OR phone with first-match-wins, so a stranger can pin tasks onto a real client record. Both only affect staff workload and record cleanliness; staff see the submitted name and bank details on the task. Suggested (not applied, product decision): a short-window duplicate check on (normalised phone, tax year, task type) that returns `ok:true` without inserting, and mark "Returning client" only when BOTH email and phone match.

**F-14.** Reviewed from the business-logic specialist angle. A customer cannot reach PAID by calling any website endpoint (no public route changes `will_customers.state` except the questionnaire flag in F-1). PAID needs an inbound WhatsApp message through the signed webhook. The risk is the owner's accepted trust model: an attacker can claim "paid" with a fake or edited receipt (the vision check verifies amount, recipient and status when visible, and otherwise opens a glance task). Recommend a daily bank reconciliation list of "PAID by claim, not yet matched to a deposit" in the morning report so unpaid work is caught before lodgement. Not code.

## 3. Fixes applied (project copy only)

| File | Change |
|------|--------|
| `src/lib/upload.ts` | Added `UploadValidationError`; user-actionable rejections throw it; storage failure still throws a plain `Error` (internal). |
| `src/app/api/tfn-form/route.ts`, `abn-form/route.ts`, `super-form/route.ts` | Echo `message` only for `UploadValidationError`; any other upload failure is logged and returns `500 {ok:false,error:'submission_failed'}`. |
| `src/lib/supabase.ts` | New `isPublicFormUploadUrl(url, brand)`; `isValidSupabaseStorageUrl` now rejects traversal segments instead of any `..` substring. |
| `src/app/api/tax-form/route.ts` | `invoiceUrls` filtered with `isPublicFormUploadUrl(u, brand)`. (Another agent edited the rate-limit key in the same file in parallel; both changes coexist and the tests pass.) |

Tests added:
- `src/lib/__tests__/public-form-upload-url.test.ts` (6 tests: own-brand accept, `..` file name accept, other folders refused, brand separation, traversal/encoded traversal, signed/other host/http/query/fragment).
- `src/app/api/tfn-form/__tests__/upload-error-leak.test.ts` (6 tests: all three routes, internal error -> generic 500 with no bucket/provider text, validation error still returned).
- `src/app/api/tax-form/__tests__/invoice-urls-scope.test.ts` (1 test: foreign, cross-brand, traversal and off-host URLs dropped, own URL kept).

Behaviour for legitimate input is unchanged: same URLs from the real upload endpoint are accepted, same customer-facing rejection messages for wrong type/size.

## 4. Patches proposed (NOT applied; Category B or owner decision)

**P1 - in-memory byte budget fallback (F-5)** `src/app/api/tax-form/upload/route.ts`
```diff
@@
-const MAX_BYTES_PER_WINDOW = 120 * 1024 * 1024
+const MAX_BYTES_PER_WINDOW = 120 * 1024 * 1024
+// Per-instance fallback used only when Redis is unavailable. Not exact across
+// instances, but removes the unbounded case.
+const _memBytes = new Map<string, { used: number; resetAt: number }>()
+function memBytesExceeded(ip: string, add: number): boolean {
+  const now = Date.now()
+  const e = _memBytes.get(ip)
+  if (!e || e.resetAt <= now) { _memBytes.set(ip, { used: add, resetAt: now + 15 * 60 * 1000 }); return add > MAX_BYTES_PER_WINDOW }
+  e.used += add
+  if (_memBytes.size > 5000) { for (const [k, v] of _memBytes) if (v.resetAt <= now) _memBytes.delete(k) }
+  return e.used > MAX_BYTES_PER_WINDOW
+}
@@
-    try {
-      const redis = await getRedis()
-      if (redis) {
+    try {
+      const redis = await getRedis()
+      if (!redis) {
+        if (memBytesExceeded(ip, body.byteLength)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
+      } else {
         const key = `rlb:tax-form-upload:${ip}`
         const used = await redis.incrBy(key, body.byteLength)
         if (used === body.byteLength) await redis.expire(key, 15 * 60)
         if (used > MAX_BYTES_PER_WINDOW) {
           return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
         }
       }
-    } catch { /* fail open: never block a genuine upload on the limiter */ }
+    } catch { /* limiter error: fall through, the request-count limit still applies */ }
```
Risk of the change: a hostel behind one IP uploading more than 120 MB in 15 minutes is already blocked when Redis is up, so this only aligns behaviour. Test to add before applying: call `POST` 13 times with a 10 MB JPEG body with `getRedis` mocked to null and expect the 13th to return 429.

**P2 - per-person key for the standalone forms (F-6)** in each of `tfn-form`, `abn-form`, `super-form` (needs the body parsed before limiting, so move the check after `formData()`):
```diff
-    if (await isRateLimited(ip, 'tfn-form')) {
-      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
-    }
-
     const formData  = await req.formData()
+    const person = crypto.createHash('sha256')
+      .update(normalisePhone(String(formData.get('whatsapp') ?? formData.get('smsPhone') ?? '')) || String(formData.get('email') ?? ''))
+      .digest('hex').slice(0, 24)
+    if (await isRateLimited(`${ip}:${person}`, 'tfn-form') || await isRateLimited(ip, 'tfn-form-ip', 30)) {
+      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
+    }
```
(import `normalisePhone` from `@/lib/leads`). Trade-off: the body is parsed before the limit, so oversized-body cost moves ahead of the check; the platform body cap (4.5 MB) bounds it.

**P3 - archive refund figure (F-8)** `src/lib/db.ts` in `deleteTaskAndArchive`
```diff
-  const labelled = (task.notes||'').match(/💵 Refund:\s*\$\s*([\d,]+(?:\.\d+)?)/)
-  const refundMatch = labelled ?? (task.notes||'').match(/\$\s*([\d,]+(?:\.\d+)?)/);
+  const labelled = (task.notes||'').match(/💵 Refund:\s*\$\s*([\d,]+(?:\.\d+)?)/)
+  // The loose "first $ in the notes" fallback is limited to cards finished
+  // before 4 Sep and ignores lines a customer authored.
+  const legacy = (task.submittedAt ?? '') < '2026-09-04'
+  const notesNoCustomerLines = (task.notes||'').split(' | ')
+    .filter(p => !/^(⚠️ \d+ receipt|💼 TFN Invoices|🏢 ABN Invoices|⚠️ Other income:|Other income:)/.test(p)).join(' | ')
+  const refundMatch = labelled ?? (legacy ? notesNoCustomerLines.match(/\$\s*([\d,]+(?:\.\d+)?)/) : null);
```
Needs a unit test with a task note containing `⚠️ 1 receipt did NOT upload, ask for it: $9999.jpg` and no labelled line (expect refund 0) before applying. Affects accounting history, so owner sign-off.

## 5. Tests run

- `npx tsc --noEmit`: clean (no output) after the edits.
- `npx jest src/lib/__tests__ src/app/api`: 29 suites, 522 passed, 1 skipped, 0 failed (includes the 3 new files, 13 new tests).
- Re-run after another agent's parallel edit of `tax-form/route.ts`: `npx jest src/app/api src/lib/__tests__/public-form-upload-url.test.ts` 7 suites, 33 tests passed.
- Not run: eslint, full jest suite, any real-browser form submission, `npm audit` (out of scope for this report; see supply-chain part).

## 6. Not assessed / needs infrastructure access

- Whether Vercel overwrites inbound `X-Real-IP` (decides whether per-IP limits can be rotated by a caller). Needs a deployed preview and a header-spoofing request.
- Redis availability policy and alerting (how long, how often it is down in production); Upstash/Vercel KV dashboard.
- Supabase: RLS on `crm_leads`, `form_funnel_events`, `crm_tasks`; the migration-016 lead trigger; unique constraints (to judge F-9/F-10 at DB level); storage lifecycle rule to expire orphan objects in `tax-form/*` that never reach a task; bucket policy and quota.
- Meta app secret handling, webhook subscription fields, and WhatsApp template approvals.
- Bank-side reconciliation process for F-14.
- Real-browser confirmation that the 4.5 MB serverless body limit does not already stop 10 MB uploads (the code allows 10 MB; the platform may be stricter, which would also lower F-5's worst case).

## 7. Specialist perspectives

**API security (Agent 08).** Every public handler validates server side: required fields, email/TFN/DOB/phone/tax-year formats (`intake-validate.ts`), enumerated-ish marital and tax status, length caps via `sanitiseField/Short`, a 50-item cap on URL arrays, a 25-item cap on invoice details, amounts through `safeAmount`. Gaps are length-only fields (country, address, bank details, job) and the absence of a schema library, which is acceptable here because values are stored as text and rendered through React; the defence that matters is output escaping in the CRM, covered by another agent. Responses are uniform small JSON; no stack traces; `tax-form` returns a six-character correlation `ref` only. `Cache-Control: no-store` is applied to `/api/*` in vercel.json. Method handling: only POST/GET exported, Next returns 405 otherwise.

**Business logic and fraud (Agent 17).** Fee manipulation: not possible via the website (no price field exists in any public route; fee amounts are server constants and Will refuses invented amounts via `policyGuard`). Refund-figure poisoning: partly closed by `safeAmount`, still open through free text (F-8). Referral fraud: `refCode` is client supplied and attached to the client when it matches a partner code (`db.ts` archive path), so a partner can self-refer or anyone can attribute a client to a partner; commission payout is a manual staff action (`referral-payment` toggles a timestamp), so it is a review-time control, not code. Recommend that staff verify partner code plus client identity before ticking the commission. State transitions: customer pipeline enforced by `TRANSITIONS`/`canTransition` with audit; CRM task actions (`done`, `delete`, `delete_permanent`) have no precondition checks (a done task can be marked done again and re-runs file deletion and note cleaning; harmless but not idempotent by design) and rely entirely on the session check.

**Red team (Agent 03).** Best unauthenticated chains found: (1) phone-number knowledge -> F-1 state tampering; (2) storage fill via the upload endpoint when Redis is down (F-5); (3) record pollution via client-matching and note text (F-8, F-10). None reaches data disclosure or privilege gain. Ruled out: SSRF, open redirect, CORS misconfiguration, webhook forgery, price tampering, brand spoofing (brand comes from the Host header only; `brand` in the body is ignored and already has a test).

## 8. Devil's advocate

- **F-1 (Medium).** Is it real? Yes, and the team knows (comment block in `form-link.ts`). Could the fix break production? Yes, if the token is mandatory: customers who open the form from a saved link, another device or a different language landing page would fail to link, and Jo reported exactly this class of "form is broken" before. Recommended path is soft: accept without a token but treat it as unmatched (task for a human), not as an automatic state change. Could it block customers? Only the lost auto-confirmation.
- **F-2/F-3/F-4 fixes.** Could they break a real submission? F-3 is the one to watch: if any client path sends URLs from another folder (older cached client bundle uploading to a different path, a future "kind"), they would be dropped silently, as the old `..` bug dropped files. Mitigation: the only client code (`submit-tax-form.ts`) uses the same endpoint that creates `tax-form/...`, and the brand prefix is derived from the same Host on both calls. If a customer submits across hosts (starts on one brand host and posts to another) their files are dropped; that is by design after decision 003. I recommend watching `invoiceFailures` / task notes for "receipt did NOT upload" after release. F-2: a customer who previously saw a provider message now sees the generic failure; strictly better, but they can no longer see "Upload failed: ..." text (which was never actionable).
- **F-5 patch.** Could a rate limit block real customers? 120 MB per IP per 15 minutes is already enforced when Redis is up, so the patch only extends existing behaviour to the outage case; per-instance counters under-count rather than over-count, so false blocks are less likely than with Redis. A hostel with 10 backpackers each uploading 10 MB total would use 100 MB: close to the ceiling, which is an existing business risk, not new.
- **F-6 patch.** Raising effective capacity for shared IPs also raises abuse capacity (30 per IP instead of 5). That is the same trade the owner already accepted for tax-form.
- **F-14.** The strongest objection to my recommendation is cost: reconciliation by hand does not scale to 5,000 customers a year; hence the suggestion is a list in the morning report, not a per-customer check.
- **Severity honesty.** Nothing here is High or Critical. The most severe items are Medium because they need either knowledge of a victim's phone number (F-1) or a Redis outage plus a motivated uploader (F-5), and neither discloses data.
