# sec2-forms-uploads: public forms, uploads, tokens (round 2)

Scope: /api/tax-form, /api/tfn-form, /api/abn-form, /api/super-form, /api/tax-form/upload, /api/google-reviews, lib/upload.ts, lib/supabase.ts, /api/crm/file (the only reader of uploads), brand routing as it affects these routes. Both brands. Local jest only, synthetic bytes, stubbed storage; no network, no production, no secrets printed.

Built on round 1 (parts/sec-uploads-data.md, parts/sec-api-logic.md, parts/sec-auth.md AUTH-4). Not repeated: private-bucket guard, no signed URLs, magic bytes, size cap, F-2/F-3/F-4 fixes. Another round 2 agent (sec2-cron-abuse) changed rate-limit.ts, get-ip.ts, log-safe.ts and added consumeByteBudget and a Content-Length pre-check to the upload route (R2-2); I verified those are present and did not redo them.

## Summary table

| ID | Sev | Status | Title | State |
|---|---|---|---|---|
| FU2-01 | Medium | Confirmed (design) | Public tax form acts on any typed phone number (AUTH-4 / F-1) | Library in tree + patch in proposals (not wired) |
| FU2-02 | Medium | Confirmed in code, edge behaviour Suspected | SVT host with a trailing dot is served as WHT (pages, /crm, all /api) | Fixed + test |
| FU2-03 | Low | Confirmed | Customer text can forge the refund label and note parts in crm_tasks.notes; invoice totals and typed amounts can become the archived refund | Fixed + test |
| FU2-04 | Low | Confirmed | `ftyp` alone passed as HEIC/JPEG: MP4, MOV, M4A, 3GP stored as images | Fixed + test |
| FU2-05 | Low | Suspected | HEIC decompression bomb when staff open a document (transcode trusts declared dimensions) | Mitigated + test |
| FU2-06 | Low | Confirmed | NUL and bidi-override characters accepted into every text field | Fixed + test |
| FU2-07 | Low | Confirmed | `invoiceDetails: [null]` turned a well-formed request into a 500 plus audit row | Fixed + test |
| FU2-08 | Low | Confirmed | Public multipart forms accept cross-site browser POSTs (F-12): lets another site spend a visitor's rate limit or spread spam over visitors' IPs | Fixed + test |
| FU2-09 | Info | Confirmed | Third-party review data was only partly bounded (no cap, any URL scheme for photo) | Hardened + test |
| FU2-10 | Info | Refuted | Mass assignment into crm_tasks from the public form | Test proves it |
| FU2-11 | Info | Refuted / accepted | SVG, HTML, polyglot, PDF-with-script, ZIP, exe, case and parameter tricks on content type | Test matrix (66 cases) |
| FU2-12 | Low | Confirmed, partly open | Duplicate and replay submissions are not controlled (F-9) | Not changed, reason below |
| FU2-13 | Low | Confirmed | A public referral code is trusted for partner attribution; email OR phone match files a stranger's task under a real client (F-10) | Not changed, product decision |
| FU2-14 | Info | Confirmed | Residual log and audit-row PII paths | Closed for these routes |

## Findings

### FU2-01 (Medium, Confirmed) completion token for the questionnaire

Evidence: src/app/api/tax-form/route.ts (notifyFormReceived call), src/lib/will/form-link.ts applyFormReceived and its own comment. Attack path: anyone who knows a customer's WhatsApp number submits the form with that number; if the customer is PAID or FORM_PENDING their questionnaire is marked complete, reminders stop, a confirmation goes out, and on Medicare "No" the exemption message is queued. Impact: operational and reputational, no data disclosure; the reverse (a customer who types another number) is not matched at all. Fix: signed per-customer token in the WhatsApp link, verified by the route. Not applied because it changes the link customers receive, the send path (deliverOut) and a source-pinned test.

Delivered: src/lib/will/form-token.ts (HMAC-SHA256, own secret FORM_TOKEN_SECRET of at least 32 characters, domain separated, brand and customer bound, 21 day expiry, 60 day hard cap, fails closed with no secret, not single use by design because customers legitimately resubmit) with src/lib/will/__tests__/form-token.test.ts (7 tests: round trip, uniqueness, expiry, wrong brand, wrong key, tampered payload, junk and alg-none shapes, absurd lifetime, no secret, link rewriting is idempotent and touches form links only). Wiring patch and a route test are in security-assessment/proposals/form-completion-token/ (README with rollout, rollback, hazards; wiring.patch dry-run applies; patch verified against a tree copy with the 3 route tests and the full will test directory, which showed one source-pinned test, medicare-auto, that must be updated when the patch is applied). Test of record: the 3 wiring cases pass against the wired tree. Residual risk: a leaked link works for its customer for 21 days; links not sent by Will (plain site visitors) carry no token and, under enforcement, become one "Link to chat" task.

### FU2-02 (Medium, Confirmed in code; reachability at the Vercel edge Suspected) trailing-dot host defeats brand isolation

Evidence: config/brand-routing.js svtHostPattern and src/lib/brand.ts brandFromHost. A probe with Next's own matchers showed `Host: studentvisatax.com.au.` (absolute form, final dot) matched no rewrite and brandFromHost returned wht: `/` stayed `/`, `/crm` stayed `/crm`, `/api/crm/login`, `/api/tfn-form` and `/api/will/*` stayed open. Attack path: send or type the SVT domain with a trailing dot, if the edge forwards it unnormalised. Impact: WHT pages, the CRM login surface and every public API route on the SVT domain, breaking "SVT isolated from WHT and /crm" (login still needs credentials, hence Medium not High). Whether Vercel normalises the dot before matching cannot be seen from the repo. Fix: optional `\.?` in the router host pattern and trailing dot stripped in brandFromHost. Test: src/lib/__tests__/brand-host-absolute-form.test.ts (4 spellings x 3 checks, plus look-alike hosts staying WHT) and the existing brand-routing-26oct suite. Residual: Host spellings with leading space are trimmed by brandFromHost but not by the router; that direction fails closed (SVT forms refuse), and HTTP parsers do not deliver such a Host.

### FU2-03 (Low, Confirmed) notes forging and refund figure

Evidence: tax-form/route.ts notes builder; db.ts markTaskDone and deleteTaskAndArchive. crm_tasks.notes is a ' | ' separated string read back by shape: parts are dropped by prefix when a task is done, and the archived refund is read by regex from anywhere in the string. Attack path: type " | 💵 Refund: $9999.00" into any free-text answer (otherIncomeText, hasMedicare, declared, an invoice description, a receipt file name, SVT extraNotes). The forged label survived the Done scrub and, being earlier in the string than the staff-written label, was the figure archived in the permanent client record. Separately the loose "first dollar sign" fallback read the customer's own invoice totals and typed amounts. Impact: wrong refund history and stats; no money movement. Fix: sanitiseNote / sanitiseNoteShort (separator, label glyph and line breaks neutralised, whitespace collapsed) on every note builder in the four routes; extraNotes lines are labelled "Form note:"; refundFromNotes() takes the LAST label and the loose fallback ignores customer-authored parts. Tests: src/app/api/tax-form/__tests__/notes-injection.test.ts (forgery, ordinary answers unchanged byte for byte, refundFromNotes cases). Residual: tasks already in the database keep whatever they hold; the last-label rule covers the forged-label case for them. Round 1 proposal P3 for F-8 is therefore superseded.

### FU2-04 (Low, Confirmed) ISO media files accepted as images

Evidence: upload/route.ts validateMagicBytes and lib/upload.ts checked bytes 4 to 7 for "ftyp" only. That is also the header of MP4, MOV, 3GP and M4A. Impact: up to 10 MB of arbitrary video or audio stored per request under an image content type in the identity-document bucket (storage abuse, odd content for staff). Fix: the major brand (bytes 8 to 11) must be a HEIF brand (hei*, hev*, mif*, msf*), the same rule /api/crm/file already used to decide on transcoding. Tests: content-sniffing.test.ts (isom, mp42, M4A, qt, 3gp4 and avif refused as heic, heif and jpeg; eight real HEIF brands accepted) and upload-sniffing.test.ts for the multipart path; upload-dangerous.test.ts updated because it used a bare "ftyp" synthetic. Residual: AVIF is refused, which was never a supported type.

### FU2-05 (Low, Suspected) HEIC decompression bomb

Evidence: /api/crm/file runs heic-convert (libheif in WebAssembly) on stored bytes with no pixel limit; allocation follows declared dimensions, not file size. A 10 MB upload can declare a very large grid. Not demonstrated against the real decoder (local run of the decoder on a crafted file was not attempted). Impact: memory exhaustion of the serverless function when staff open that document; the customer-facing site is unaffected. Fix: src/lib/heic-guard.ts reads the `ispe` box dimensions without decoding and refuses to transcode above 100 megapixels (the file is then served as stored). Tests: heic-guard.test.ts (5) and crm/file/__tests__/heic-bomb.test.ts (a normal HEIC still transcodes, a 60000 x 60000 one never reaches the decoder). Residual: a file whose `ispe` understates its real size is decoded as before; libheif has its own limits.

### FU2-06 (Low, Confirmed) control and bidi characters

Evidence: lib/sanitise.ts stripped tags only. A NUL byte is rejected by Postgres text columns (known Postgres behaviour, not run against a database here), so the INSERT fails with a 500 and an audit row for a request built on purpose; RLO and isolate characters render a name reversed on a CRM card. Fix: C0 controls (except tab, newline, carriage return), DEL, C1, bidi marks, overrides and isolates, and BOM removed in sanitiseField. Test in notes-injection.test.ts (name, country, multi-line address). Residual: zero-width joiner is kept (needed for emoji).

### FU2-07 (Low, Confirmed) malformed JSON member

`invoiceDetails=[null]` threw inside the notes builder, before any insert, answering 500 and writing a public_form_failed audit row per attempt. Entries that are not objects are now dropped. Test in notes-injection.test.ts.

### FU2-08 (Low, Confirmed) cross-site POSTs to the public forms (round 1 F-12)

multipart/form-data is a CORS "simple" request, so any web page could make a visitor's browser POST to tax-form, tfn-form, abn-form and super-form. The upload endpoint was already protected by preflight (image/png and application/pdf are not safelisted). Impact: spend the visitor's per-IP budget, and spread spam or phone-number probing across the IPs of everyone who opens the attacker's page. Fix: lib/public-form-guard.ts refuses only `Sec-Fetch-Site: cross-site` (set by the browser, not forgeable by page script; same-site, same-origin, none and absent are allowed, so www vs apex, old browsers, curl and the e2e suite are unaffected); wired into the four routes and the upload route. Test: tax-form/__tests__/cross-site-guard.test.ts (5 routes). Residual: a non-browser attacker is unaffected, as before; this is about browsers acting for a third-party page.

### FU2-09 (Info) /api/google-reviews and the server fetch

No SSRF (fixed host, only the public widget id interpolated), no user input reaches the route, nothing is rendered as HTML (review text, names and photo are React text and img src; profileUrl is never rendered; the only dangerouslySetInnerHTML in the component is a CSS string built from numbers). Hardening added anyway for third-party data: cap 100 reviews, 4000 characters per comment, field types checked, star rating clamped, photo and profile URLs must be https. Test: google-reviews-shaping.test.ts (3, includes script-looking review text passing through as inert data).

### FU2-10 (Info, Refuted) mass assignment

createTask maps explicit fields; done, id, clientId, brand, taskType, reviewStatus, reviewerNote, reviewedAt, submittedAt and fileUrls from a direct POST are ignored or re-validated (brand only from Host; fileUrls only through isPublicFormUploadUrl). Test: notes-injection.test.ts "mass assignment" posts all of them plus is_admin and role.

### FU2-11 (Info) content sniffing matrix

content-sniffing.test.ts (66 cases) shows: SVG (declared svg, png), HTML (declared jpeg, pdf), XML, JS, ZIP, PHP, ELF, PE, wrong-type pairs, `Image/PNG`, `image/png; charset`, multipart and empty content types are all refused with nothing stored; every allowed type stores with the declared type only; a JPEG with HTML appended and a PDF containing /JavaScript objects are accepted and stored inert (never text/html), served by /api/crm/file with nosniff and a sandbox CSP. Filename traversal forms (`../`, `%2f`, backslash, NUL, bidi, 400 characters, empty, dotfiles, tags) all end as one path segment under the server-chosen folder; `kind` is an enum; brand prefix comes from Host only (x-brand, x-forwarded-host, query and body tried); same name twice never collides; exactly 10 MB passes, one byte more is refused. Decision on PDFs: not scanned for /JavaScript or /Launch. Real bank statements and form-based PDFs can contain them, compressed object streams hide them anyway, and the control that matters (sandboxed, nosniff, private, staff-only) is already in place. Metadata: EXIF (including GPS) is stored as the customer sent it; it is the customer's own data, visible only to staff, and stripping it would alter evidence documents. Round 1 F-12 (no malware scan) stands.

### FU2-12 (Low) duplicates and replay

Unchanged (F-9). A short-window duplicate drop on (phone, tax year, type) would also drop the legitimate "forgot a receipt" resubmission, which the code comments say happens, and the new receipts would be lost. The Will side is already idempotent (one scheduled FORM_RECEIVED, one MEDICARE_INFO ever). The right control is a signed form-session id that makes a retry replace its own earlier task; that belongs with the completion-token rollout (FU2-01) and is not designed here.

### FU2-13 (Low) referral code and client matching

`refCode` is a public value from ?ref= and is stored, then used at archive time to set referred_by if a partner has that code, so any submitter can attribute a client to any partner whose code they know (codes are shared publicly by design). `findExistingClient` matches email OR phone, so a stranger who types a victim's email gets filed under the victim's client id (F-10). Both are product and trust-model decisions with only record-cleanliness impact; not changed. Suggested: mark "Returning client" and carry referral only when email AND phone both match, and show the partner code check to staff on the card.

### FU2-14 (Info) logging

Whole-object logging of storage and provider errors in the tfn, abn, super and upload routes now goes through safeErr (lib/log-safe.ts, by the sibling agent); the tax-form catch also wrote err.message into the audit log and now writes the scrubbed form. Zero other console calls in these routes print request values.

## Questions answered from the brief

- Token entropy, expiry, single use, binding: the only tokens on these surfaces are the proposed completion token (above). There are no signed or magic-link URLs in these routes; createSignedUrl and createSignedUploadUrl occur nowhere in src outside tests. getPublicUrl returns a reference string for a private bucket, not a credential.
- Private bucket enforcement: unchanged and verified present (assertUploadsBucketPrivate before every write).
- Size and count limits with Redis down (F-5): the in-memory byte budget fallback exists (consumeByteBudget, sibling) and the route uses it; remaining gap is per-instance counting and chunked bodies with no Content-Length, which the 4.5 MB Vercel body cap bounds on the platform (not verifiable from code).
- Quota and storage abuse: the per-IP budget bounds one address (120 MB per 15 minutes is still about 11 GB a day); a global daily byte ceiling, an orphan sweep for files with no task row, and Turnstile on the form are infrastructure or product work (see round 1 R5).
- PII in error responses: tax-form answers `invalid_fields` with field names and generic reasons, never values; other failures are `submission_failed` plus a six character ref.

## Files changed (all in the project tree)

config/brand-routing.js, src/lib/brand.ts, src/lib/sanitise.ts, src/lib/db.ts (refundFromNotes, deleteTaskAndArchive uses it), src/lib/upload.ts, src/lib/googleReviewsServer.ts, src/app/api/tax-form/route.ts, src/app/api/tax-form/upload/route.ts, src/app/api/tfn-form/route.ts, src/app/api/abn-form/route.ts, src/app/api/super-form/route.ts, src/app/api/crm/file/route.ts. New: src/lib/heic-guard.ts, src/lib/public-form-guard.ts, src/lib/will/form-token.ts. New tests: tax-form/__tests__/notes-injection.test.ts, tax-form/__tests__/cross-site-guard.test.ts, tax-form/upload/__tests__/content-sniffing.test.ts, crm/file/__tests__/heic-bomb.test.ts, lib/__tests__/brand-host-absolute-form.test.ts, heic-guard.test.ts, google-reviews-shaping.test.ts, upload-sniffing.test.ts, lib/will/__tests__/form-token.test.ts. One test edited: lib/__tests__/upload-dangerous.test.ts (bare "ftyp" synthetic now carries a real brand). Proposal: security-assessment/proposals/form-completion-token/.

Verification: `npx tsc --noEmit` shows one error, in a sibling's file (src/lib/__tests__/supabase-schema-guards.test.ts, unused variable); `npx eslint --quiet` on the changed files is clean; 22 relevant suites, 285 tests pass. Two failures outside my files were seen while other agents were editing: audit3-actions-31 (archiveTaskByPhone brand scoping in db.ts) and round2-auth (will/actions order); neither touches code I changed.

## What I could not assess

- Vercel edge behaviour for a trailing-dot Host, the real 4.5 MB body limit, whether x-real-ip is overwritten at ingress, and whether `?k=` survives the form-slug redirects (confirm with the e2e suite before enabling the token).
- Supabase dashboard state: bucket private flag and file-size or MIME limits, storage quota, backups, region, whether RLS is on for every table.
- Real heic-convert behaviour on a crafted file (guard is by declared dimensions, not by observing decoder memory).
- Git history and previously stored objects or rows (old uploads with ".." names, forged notes already in crm_tasks).
- Real PDF viewer behaviour under the sandbox CSP in staff browsers (round 1 F-12 note stands).
- Meta template messages that contain a fixed form URL (cannot carry a per-customer token).
