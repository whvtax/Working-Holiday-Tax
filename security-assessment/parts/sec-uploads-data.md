# sec-uploads-data: uploads, data protection, privacy

Project copy: /home/claude/work/whvtax-security. Static review plus local jest only. No production access, no real data, no secrets printed. Specialist lenses applied: Agent 09 (Data Protection and Encryption), Agent 10 (Australian Privacy and Compliance), Agent 12 (File Upload and Document Security), plus the Agent 15 view on service-role key use.

## 1. Scope covered

Read in full: src/lib/upload.ts, src/app/api/tax-form/upload/route.ts, src/app/api/crm/file/route.ts, src/lib/supabase.ts, src/lib/db.ts (tasks, clients, markTaskDone, deleteTaskAndArchive, deleteTaskPermanent, archiveTaskByPhone), src/app/api/tax-form/route.ts, tfn-form, abn-form, super-form, crm/tasks/[id], crm/clients/[id], will/media/[id], analytics/funnel, rate-limit.ts, get-ip.ts, sanitise.ts, intake-validate.ts, vercel.json and next.config.js headers, all 48 migrations (RLS and storage notes), src/lib/legal/legal-text.ts (privacySections). Grepped all 69 console.* calls in src, encryption primitives (none), Anthropic call sites in src/lib/will/claude.ts. `npm audit --omit=dev` ran (network available): 0 vulnerabilities (dependency detail belongs to another agent).

Positives found (evidence, not assumed):
- Uploads go to a private bucket and the code fails closed: assertUploadsBucketPrivate() (src/lib/supabase.ts:68-82) runs before every write (upload route :148, upload.ts :122).
- No signed URLs are issued anywhere. Documents are streamed only through /api/crm/file after validateSession (crm/file/route.ts:73-76). There is no public or time-limited link to expire, so signed-URL expiry and replay are not applicable. Cache-Control is private, no-store, with nosniff (crm/file/route.ts:132-137).
- Content-type allowlist on both write and read (no SVG, HTML or XML); size cap 10 MB; magic-byte match per declared type; executable/script signature at offset 0; object names are timestamp + random UUID fragment + sanitised name; folder prefix is server-controlled (kind is an enum, brand comes from the host); upsert false.
- Service-role key: only read in src/lib/supabase.ts; no NEXT_PUBLIC variant; getSupabase is imported only by server modules/routes (checked by grep). No client component imports it.
- RLS is enabled with zero policies on every table except one (F5); no storage.objects policies exist, which is the intended deny-all for anon.
- Done flow wipes tfn, address, bank_details, passport number and the uploaded files, and refuses to clear file references if storage deletion failed (db.ts:241-296, 536-548).
- /api/* has no-store in vercel.json; funnel analytics store no IP and no PII (session id, language only).

## 2. Findings

| ID | Severity | Status | Title | Evidence | Exploitability here | Impact | Fix |
|---|---|---|---|---|---|---|---|
| F1 | Medium | Confirmed (code), reachability depends on UI use | deleteTaskAndArchive deletes the task row but never the uploaded documents | src/lib/db.ts:318-474 (no deleteFiles call; only markTaskDone :255 and deleteTaskPermanent :537 delete files); callers: crm/tasks/[id]/route.ts:15 action "delete", DashboardClient.tsx:820 and :893, archiveTaskByPhone db.ts:488-523 which falls back to a PENDING task (db.ts:520-521) | Not an attack. Triggered by normal staff use (archive/transfer a card that still has files, or "Mark lodged" in Will on a task not yet marked Done) | Passport selfie, bank statement, payslips stay in the private bucket with no DB row pointing to them: untraceable, never deleted, contradicts the retention promise | Patch P1 (Category B, not applied) |
| F2 | Medium | Confirmed | No retention or expiry job for personal data other than the manual Done flow | No code path touches crm_tasks/crm_clients/crm_leads by age (grep of from('crm_tasks') and scheduler.ts purges: only will_audit 90d, processed msgs 30d, jobs 30d). Pre-submit upload design (src/lib/submit-tax-form.ts:60-120, upload route) writes files before any task exists. will export route comment states messages are never purged (api/will/export/route.ts:48-52). | Passive | (a) Abandoned forms leave orphan passport/bank files with no row. (b) Pending tasks with TFN, bank, address, passport no. live until someone presses Done. (c) After Done, name, email, WhatsApp, DOB, country, notes stay forever in crm_clients and crm_leads. (d) WhatsApp transcripts, including numbers customers type, stay forever. Conflicts with Policy s8 and APP 11.2 (see section 6) | Recommendation R1 (Category C, needs Jo) |
| F3 | Medium (design) | Confirmed fact, risk judgement | TFN, bank details, address, DOB and passport number are stored as plain TEXT, no application-layer encryption | supabase/migrations/001_init_crm.sql:9-39 (dob, tfn, bank_details, address TEXT); passport number goes into notes (tfn-form/route.ts:84); grep for encrypt/cipher/pgcrypto/vault in src and supabase: no hits except unrelated copy | Requires DB read access or service-role key compromise; an encryption key stored in the same Vercel env would not defend against the latter | Anyone with the Supabase dashboard, a backup, a leaked service key, or SQL access reads all pending customers' TFN and bank numbers in clear. Supabase encrypts disks at rest (platform claim, not verifiable from the repo) | R2: field-level encryption (AES-256-GCM, key in Vercel env, versioned) for tfn, bank_details, passport no.; not applied (Category C: changes keys/data format, needs migration of live rows and Jo) |
| F4 | Medium (compliance) | Confirmed fact; legal effect Suspected | Customer-sent IDs, payslips and bank documents are sent in full to Anthropic (US) and transcripts go unredacted | src/lib/will/claude.ts:328-336, 409-417, 484 (base64 image/PDF to api.anthropic.com via llm-transport.ts:9); service.ts:2205 describeAttachment on any non-payment attachment; reply/review prompts use raw transcript (claude.ts:872, 947). Redaction exists only for digests and lost-analysis (digest.ts:17, lost-analysis.ts:69). | Not an exploit | Cross-border disclosure of identity documents and financial data; Privacy Policy s7 says only "trusted service providers" (see M2) | Legal confirmation (Q4, Q5); optional technical mitigation R4 (redact or skip documents likely to be ID/bank) |
| F5 | Low | Confirmed (in repo), live state unknown | will_ai_usage table has no RLS | supabase/migrations/042_will_ai_usage.sql creates it; no ENABLE ROW LEVEL SECURITY anywhere (028 covers only the other will_* tables). Columns: feature, model, token counts, cost, customer_id | Anyone holding the project URL and the anon key (public by design) could read it through PostgREST if RLS is really off in production and default grants apply | Cost data plus internal customer ids; no PII values. Also a pattern risk: 045 sets default privileges for new tables | Patch P2 (one-line SQL, Category C to run on production). Check in dashboard whether RLS was enabled by hand |
| F6 | Low | Confirmed, FIXED | Phone number or email used in a Redis rate-limit key | src/app/api/tax-form/route.ts (old line: person = normalisePhone(whatsapp) or email, then key = ip:person stored in Redis for 15 min) | Passive; Redis is a third-party processor | PII at a processor and in any Redis tooling or logs | Fixed: SHA-256 prefix (see section 3) |
| F7 | Low | Confirmed, FIXED | /api/crm/file path check ran before percent-decoding | crm/file/route.ts:55-65: ".." was tested on the encoded string, decodeURIComponent after; "%2e%2e%2f" survived; malformed escape threw an unhandled URIError (500) | Authenticated staff only, and the target is limited to the same bucket (Supabase normalises) so practically Info/Low | Defence in depth | Fixed with test |
| F8 | Low | Confirmed, FIXED | Filenames containing ".." made documents unviewable | upload sanitiser keeps dots (upload route :134, upload.ts :115); the CRM file route rejects any path with ".." (:55). A customer file named like "scan..jpg" is stored but 403s for staff | Functional, not security | Staff cannot open a customer's passport or statement, may ask for re-upload | Fixed: repeated dots collapsed on new uploads. Existing already-stored files with ".." remain unreadable until renamed in storage (Category C) |
| F9 | Low | Suspected | WhatsApp attachment route sets private, max-age=3600 on customer documents | src/app/api/will/media/[id]/route.ts:40 (comment says intentional). vercel.json sets no-store for /api/(.*); which one wins on the Vercel edge was not verifiable offline | Needs access to the staff browser profile (shared or stolen device) | Passport or payslip photos kept in the browser disk cache up to 1 hour | R3: confirm live response header; if max-age survives, change to private, no-store (loses scroll caching in Will thread) |
| F10 | Low | Confirmed | Public upload endpoint is anonymous; abuse limits are soft | tax-form/upload/route.ts:79 (100 req per 15 min per IP), :129-146 (120 MB per 15 min per IP, fails open if Redis down; in-memory fallback is per instance) | Anyone can POST valid image/PDF bytes into the private bucket; rotating IPs bypasses | Storage cost and potential storage of unlawful content that nobody reviews; also feeds F2 orphans | R5: daily per-IP and global byte ceilings, Turnstile or a signed form-session token, orphan sweep. Not applied (rate limiting is Category B; the form-retry maths in the code comments shows a real risk of blocking customers) |
| F11 | Low | Confirmed | tfn_norm column is never cleared by the Done flow | migration 015 backfills tfn_norm from tfn (digits only); markTaskDone clears tfn but not tfn_norm (db.ts:284-298); no app code writes tfn_norm any more (grep) | DB access needed | Digits of the TFN survive on legacy rows after Done | Patch P3: SQL one-off for legacy rows plus `tfn_norm: null` in markTaskDone only after confirming the column exists in production (an update naming a missing column would fail every Done) |
| F12 | Info | Confirmed | No malware scan, no server-side re-encode, prefix-only content validation | upload.ts and upload route check only the first bytes; PDFs and images are stored verbatim; PDFs are served inline to staff (crm/file :137); HEIC is decoded server side with heic-convert on untrusted bytes (:106-118) with no pixel or time limit | Needs a staff member to open the file; attacker content can be a polyglot or a decompression bomb | PDF viewer exploit on staff device (browser-sandboxed); memory pressure on the serverless function from a crafted HEIC | R6: ClamAV or a vendor scan queue; cap dimensions before HEIC convert; consider Content-Disposition attachment for non-image. Do NOT add CSP "sandbox" to /api/crm/file without testing: Chrome blocks its PDF viewer under sandboxed CSP, which would break statement viewing (the Will media route already sends sandbox, so inline PDFs there may already render blank in Chrome; worth a manual check) |
| F13 | Info | Confirmed | Client-supplied file URLs are accepted if they point anywhere in the uploads bucket | tax-form/route.ts:74-82, supabase.ts:97-114 (host + prefix check only) | Needs another customer's full object path (timestamp + 8 hex + name): not guessable | A forged submission naming a victim's object would make Done delete the victim's file (integrity) | Optional: only accept URLs under the submitting session's own upload prefix |
| F14 | Info | Confirmed | No audit trail of who viewed which document | logAudit is called only for deletes and a few CRM actions (db.ts:116-134); crm/file records nothing; single shared admin identity ("crm-admin") | Insider or stolen session | Cannot answer "who opened this passport" after an incident (APP 11, NDB assessment) | Log object id + time on /api/crm/file reads |
| F15 | Info | Confirmed | Log hygiene review | 69 console.* calls. None prints TFN, passport, bank, email, phone, OTP or tokens by value. Whole error objects are logged (tax-form/route.ts:271, tfn-form :105, db.ts) and provider text is logged on Resend failure (crm/login/route.ts:137). PostgREST errors for a constraint violation can contain "Failing row contains (...)" or key values; no such constraint is reachable today (only brand CHECK and unique indexes on tokens/emails) | None today | Latent: a future NOT NULL or unique error could write a TFN row into Vercel logs | R7: log err.code and err.message only; never err.details/hint |
| F16 | Info | Confirmed | Supabase storage config is outside the repo | 001_init_crm.sql:69-78 are comments (bucket private, 10 MB, MIME list) done by hand; no config.toml, no storage policies | n/a | Cannot verify bucket file-size limit, MIME restriction, PITR/backups, region | Needs dashboard access (section 7) |
| F17 | Info | Confirmed | Runtime privacy guard is cached for the warm instance | supabase.ts:66-82 `_bucketPrivacyVerified` stays true until cold start | Needs a mistaken dashboard change | A bucket flipped to public keeps accepting uploads on warm instances for hours; reads still go through the service role so exposure is by direct URL only | Acceptable; consider re-checking every N minutes |

## 3. Fixes applied (project copy only)

- src/app/api/crm/file/route.ts: decode then re-check for "..", backslash and leading slash; malformed escape returns 403 instead of throwing (F7).
- src/app/api/tax-form/route.ts: per-person rate-limit key now uses a SHA-256 prefix of the phone/email instead of the value (F6). Call shape unchanged, so the existing source-pinning test (audit3-sched-70) still passes. Effect: counters reset once at deploy.
- src/app/api/tax-form/upload/route.ts and src/lib/upload.ts: collapse repeated dots in the sanitised filename (F8). New uploads only.
- New tests: src/app/api/crm/file/__tests__/path-hardening.test.ts (5 tests), src/app/api/tax-form/__tests__/ratelimit-key-pii.test.ts (2 tests), one added case in src/app/api/tax-form/upload/__tests__/brand-26oct.test.ts.

## 4. Patches proposed (not applied)

P1 (F1, Category B: deletes customer documents; needs Jo's sign-off and a test in staging):
```diff
--- a/src/lib/db.ts
+++ b/src/lib/db.ts
@@ export async function deleteTaskAndArchive(taskId: string): Promise<void> {
   const sb = getSupabase()
   const task = await getTask(taskId)
   if (!task) return
+
+  // Same rule as markTaskDone / deleteTaskPermanent: the row is the only record
+  // of where the documents are, so it stays if they cannot be deleted. A done
+  // task has file_urls = [] so this is a no-op for the normal Done-then-transfer path.
+  if (task.fileUrls?.length) {
+    const del = await deleteFiles(task.fileUrls)
+    if (!del.ok) {
+      console.error(`[deleteTaskAndArchive] task ${taskId}: file deletion failed, keeping the row:`, del.error)
+      throw new Error(`documents could not be deleted (${del.error ?? 'storage error'}), so the task was kept`)
+    }
+  }
```
Also strip tfn/bank_details/address on the client record path: they are not copied (initialUpdates has no tfn), so no change needed there. Test to add: mock deleteFiles, assert it is called for a task with file_urls and that a failure keeps the row. Risk: archiveTaskByPhone swallows errors (catch returns null), so a storage failure leaves the pending card in place and Will still marks lodged; acceptable and logged.

P2 (F5, Category C to execute; new migration 049):
```sql
ALTER TABLE will_ai_usage ENABLE ROW LEVEL SECURITY;
-- no policies: deny-all for anon and authenticated; service_role bypasses RLS.
```
Verify first in the Supabase dashboard (Table editor shows an RLS badge); and run `select relname, relrowsecurity from pg_class where relnamespace='public'::regnamespace and relkind='r' and not relrowsecurity;` to catch any other table created by hand.

P3 (F11):
```sql
UPDATE crm_tasks SET tfn_norm = NULL WHERE done = true AND tfn_norm IS NOT NULL;
```
```diff
-    address: '', tfn: '', bank_details: '',
+    address: '', tfn: '', tfn_norm: null, bank_details: '',
```
Apply the code line only after confirming `tfn_norm` exists in production (migration 015 run), otherwise every "Done" would fail.

R3 (F9), only after confirming the live header:
```diff
-      'cache-control': 'private, max-age=3600',
+      'cache-control': 'private, no-store',
```

## 5. Data lifecycle map (no values shown)

| Data | Collection (why) | Transmission | Processing | Storage | Access | Retention (actual) | Deletion (actual) | Public exposure risk |
|---|---|---|---|---|---|---|---|---|
| TFN | /tax-form, /tfn-form: lodge the return, ATO identity | TLS POST to Vercel (syd1) | sanitise + format check; duplicate check historic | crm_tasks.tfn plaintext TEXT (Supabase); tfn_norm legacy digits | CRM admin session (one shared identity); service role | Until Done, then blanked; tfn_norm legacy rows survive (F11) | markTaskDone sets '' ; delete_permanent removes row. Pending tasks never expire (F2) | None via URL; RLS deny-all |
| Passport (photo/selfie with passport) | selfie upload for identity | /api/tax-form/upload (anonymous) or multipart in tfn/abn/super-form | magic-byte check, no re-encode, no scan | uploads bucket (private), folders tax-form/selfie, tfn-form/<clientId>/ | /api/crm/file (session) only; no signed URLs | Until Done; orphans and F1 files indefinitely | deleteFiles on Done and delete_permanent; NOT on delete/archive (F1); never for abandoned forms (F2) | Bucket private + runtime guard; names unguessable |
| Passport number | typed in form, stored in task notes | TLS | none | crm_tasks.notes plaintext | CRM | Stripped on Done (regex on "Passport No:") | markTaskDone / archive filters; copied nowhere else | Low |
| Bank details (customer refund account) and statements | refund payment; bank statement upload | as above | none (Will may read statement images via Anthropic if sent over WhatsApp, F4) | crm_tasks.bank_details plaintext; bank/ folder in bucket | CRM; Anthropic if WhatsApp | Until Done | as passport | Low |
| DOB | identity, return | TLS | validated | crm_tasks.dob and crm_clients.dob plaintext | CRM | NOT wiped on Done; copied to crm_clients (db.ts:434) and kept | Only deleteClient removes it | Low |
| Visa / residency status | residency test | TLS | free text keywords | crm_tasks.tax_status, notes ("Working Holiday", declaration lines) and SVT extraNotes | CRM | Declarations stripped on Done; tax_status column not cleared | n/a | Low |
| Email, phone, name, country | contact, marketing list | TLS | copied to crm_leads, Will | crm_tasks, crm_clients, crm_leads, will_customers, Meta WhatsApp, Resend (OTP only), Redis keys (fixed) | CRM, Will, processors | Indefinite | deleteClient removes only crm_clients; will deleteCustomerByWaId separate; no single erase path | Low |
| WhatsApp messages and attachments | support, sales | Meta Cloud API webhook | Anthropic (US) for replies, payslip/ID/bank image reading | will_messages; media stays at Meta (30 days) and is fetched on demand | CRM session | Messages never purged; audit 90 days | Manual per customer | Low |

## 6. Australian privacy review: questions for a privacy lawyer or the supervising tax agent

I did not assert that any law applies. Facts established from code are marked (F) and need professional confirmation of the legal effect.

Q1 Entity and coverage: which legal entity operates each brand (the code shows bank payee "The Accounting Academy"); is it an APP entity, or a small business operator that may rely on the exemption, and does TFN handling or registered-tax-agent supervision change that? Are the two brands one entity or two?
Q2 TFN rules: obligations under the Privacy (Tax File Number) Rule 2015 and the Privacy Act TFN provisions for TFN recipients: collection limits, security, destruction when no longer needed. (F) TFN is stored plaintext until Done and the legacy tfn_norm digits survive (F11).
Q3 Tax-practitioner confidentiality and record keeping: TPB Code of Professional Conduct confidentiality duty, and the minimum period client records and supporting documents must be kept. (F) Documents and TFN are deleted at Done (shorter than Policy s8's 5 to 7 years) while name, email, DOB and notes are kept indefinitely. Which is right for working papers versus identity copies?
Q4 APP 8 / s16C and APP 1.4(f)(g), APP 5: (F) identity documents, payslips and bank documents are transmitted to Anthropic in the US; messages go through Meta WhatsApp; data at Supabase (region unknown), Vercel (syd1 functions), Redis provider, Resend. Does the Policy need to name the recipients, countries and the purpose? How does that square with the brand rule not to mention AI to customers?
Q5 Consent and sensitive information: the Policy s1 says use of the site is consent. Is a photo of a passport holder's face or a visa status "sensitive information" (biometric, racial or ethnic origin by country)? Is bundled consent adequate for APP 3.3 and APP 6?
Q6 APP 7 direct marketing: (F) crm_leads was back-filled from existing clients and tasks (016) for a mailing list. Is there consent and an unsubscribe on every message; was the backfill within the original purpose (APP 6)?
Q7 APP 11.2 destroy or de-identify: (F) no scheduled deletion; no documented review date. What is the trigger and period for each data class?
Q8 APP 12/13 access, correction, erasure: (F) no self-service or runbook; erasure spans crm_tasks, crm_clients, crm_leads, will_*, Meta, Anthropic, Redis. Who handles requests and within what time?
Q9 Notifiable Data Breaches: assessment procedure, 30-day window, who decides "serious harm", OAIC and ATO notification. (F) there is no document-access log (F14), which limits the ability to scope an incident. Does the ATO/TPB require separate notification for a tax agent?
Q10 Overseas customers: customers come from the EU, UK, Japan and others and the site is in six languages. Does GDPR or UK GDPR apply by targeting (Art 3(2)); if so, is a representative, lawful basis, and SCCs for the US transfer needed?
Q11 Contractual: Supabase, Vercel, Anthropic, Meta, Resend, Redis DPAs and data-residency terms; Anthropic retention and no-training settings for the API account. Not verifiable from code.
Q12 Contractors and staff: Policy s5 promises confidentiality obligations for staff and contractors. (F) one shared CRM credential; who has it?

### Policy versus implementation (src/lib/legal/legal-text.ts privacySections; reported, not rewritten)

- M1 s8 Retention "5 to 7 years ... securely destroyed or de-identified": implementation deletes documents, TFN, bank and passport number at Done (earlier than stated) but keeps name, email, phone, DOB and notes forever and never runs a destroy/de-identify job (F2). Pending and abandoned submissions have no end date.
- M2 s7 Third-party disclosure lists only "trusted service providers" and regulators: does not mention overseas recipients or AI processing of documents and chats (F4), or WhatsApp/Meta, or the hosting and email providers.
- M3 s3 Information collected omits: date of birth, visa and residency status, marital status, gender, country of origin, passport photo with face, referral partner data, WhatsApp conversation content and attachments, and records of hours/time of contact.
- M4 s3 calls IP address "non-identifiable"; IPs are used as rate-limit keys (15 min) and could be linked to a submission by timing; treat as personal information unless counsel says otherwise.
- M5 s5 Data security: "Secure storage systems with restricted access" and "access controls limited to authorised personnel": storage is private and gated, but fields are plaintext (F3), access is a single shared CRM identity with no per-person trail (F14). Statement is not false but is not strong evidence of the controls; do not add claims of encryption of TFN until R2 exists.
- M6 s9 Your rights: deletion is promised "subject to legal obligations" but there is no implemented workflow, and deleting a client in the CRM does not delete tasks, leads, chat history or processor copies.
- M7 s6 Cookies: policy says Google Analytics is used; code loads gtag (components/layout/Analytics.tsx). Consistent. Consent mechanics are out of this scope.
- M8 s1 mentions the NDB scheme, but the repo has no breach runbook (check docs/engineering; none found) and no document-access log.

## 7. Tests run

- npx tsc --noEmit: clean after edits.
- npx jest src/app/api src/lib/__tests__/upload-dangerous src/lib/__tests__/security-fixes src/lib/will/__tests__/audit3-sched-70: 7 suites earlier plus the new ones, all passing (98 + 76 test runs across the two batches, 0 failures). Not the full suite.
- npx eslint on touched paths --quiet: clean.
- npm audit --omit=dev: 0 vulnerabilities.

## 8. Not assessed / needs infrastructure access

- Supabase dashboard: bucket private flag, size and MIME limits, storage policies, RLS state of will_ai_usage and any hand-made table, backups, PITR, region, encryption at rest, who holds service-role and dashboard access, API log retention.
- Vercel: environment variable scopes, log retention and whether logs contain PII in practice, effective response headers (F9), build output secret scan.
- Redis/Upstash region and retention; Anthropic account data-retention setting; Meta WhatsApp data terms; Resend.
- Real behaviour of malware or polyglot files (no malicious samples were used).
- Whether the ".." legacy filenames exist in the bucket (F8).
- Content of the other five language versions of the Privacy Policy (the text is generated from one source, so structure matches, but the translated wording was not reviewed).

## 9. Devil's advocate on my top findings

- F1: Is it real? Yes in code, but if staff only ever use Done then Transfer, file_urls is already empty and nothing leaks. The risk is the path "Delete" on a pending card or Mark lodged in Will on an unfinished task. Could the fix break production? Yes, mildly: with P1 a storage outage would make Delete fail with the existing alert, and Jo may want to keep documents when archiving. That is why it is a patch with sign-off, not applied.
- F2: Is it real? Yes, but a retention period is a legal choice, and deleting more aggressively could breach record-keeping duties (Q3). Do not ship a purge without the lawyer and a backup; the F1 orphan sweep is safer to do first (list objects not referenced by any file_urls, review, then delete).
- F3: Encryption with a key in the same Vercel project protects against a leaked DB dump or dashboard viewer, not against a leaked service key plus env. Real, but the cheaper high-value control is shortening exposure (Done wipe already exists) and tightening who has dashboard access. It could break search, duplicate detection and the CRM edit flows if done badly.
- F4: This is a legal and policy mismatch, not a vulnerability. Redacting documents before Anthropic would remove the very reading (payslips, payment screenshots) that Will relies on; the practical fix may be policy wording plus an API data-retention agreement, which is for counsel.
- F6/F7/F8 fixes: low blast radius. F6 resets per-person counters once at deploy, so one abuser could gain a single window; it cannot lock a real customer out. F8 only changes new filenames and the existing "scan..jpg" files stay unreadable, so it is a partial fix.
- F10: A tighter rate limit could block a hostel full of real customers (the code comments document this exact incident), so I left it as a recommendation.
