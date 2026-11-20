# SITE-01 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(site)/crm/dashboard/DashboardClient.tsx | 2730 | 1-500, 501-1000, 1001-1500, 1501-1950, 1951-2350, 2351-2730 | REVIEWED |
| src/app/(site)/crm/dashboard/page.tsx | 13 | 1-13 | REVIEWED |
| src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx | 167 | 1-167 | REVIEWED |
| src/app/(site)/crm/whatsapp/will-scoped.css | 1048 | 1-525, 526-1048 | REVIEWED |
| src/app/(site)/start/FormClient.tsx | 1042 | 1-520, 521-1042 | REVIEWED |

Total: 5 of 5 files, 5000 lines.

Files outside the unit opened only to judge a finding (partial reads unless stated):
- src/lib/crm-store.ts lines 126-173 (validateSession, validateSessionFresh)
- src/app/(site)/crm/dashboard/ClientOnly.tsx (full, 19 lines)
- src/lib/fb-origin.ts (full), src/lib/csv.ts (full)
- src/app/api/crm/file/route.ts (full, 149 lines)
- src/app/api/crm/tasks/route.ts lines 1-40 and grep of 77-89
- src/app/api/crm/tasks/[id]/route.ts line 13 (grep only)
- src/lib/db.ts lines 265 and 299-305 (grep only, markTaskDone)
- src/app/api/crm/expense-pdf/from-task/route.ts lines 70-74 (grep only)
- src/app/api/tax-form/link/route.ts (full), src/app/api/tax-form/route.ts line 41 (grep only)
- src/app/(site)/crm/whatsapp/connect/page.tsx (full)
- src/app/api/will/whatsapp/connect/route.ts, src/app/api/will/link/route.ts, src/app/api/will/actions/route.ts (grep only)
- next.config.js lines 25-52 and src/proxy.ts line 35 (grep only), src/app/api/crm/login/route.ts line 105 (grep only)

## Findings

### SITE-01-F01: "Download PDF" writes an unencrypted HTML file with TFN, passport number, DOB and address to the staff device, outside the server-side wipe
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-312, CWE-359
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:912-1221 (function `downloadTaskPdf`), button at 2105-2108; TFN fields at 1029, 1071, 1111; passport at 986, 1063; file name at 1204-1215
- Evidence: The button labelled "Download PDF" builds a standalone HTML document from the task and saves it via a Blob as `<ClientName>_<Type>_<date>.html`. The document contains `task.tfn`, the passport number parsed from notes, date of birth, both addresses, phones and email in clear text. The Done flow (lines 663-665, 728, 1818-1826, 2539) tells staff that TFN, bank, address and files are deleted on Done, but a copy saved this way stays in the browser's Downloads folder (and any cloud-synced folder) indefinitely, with the customer's name in the file name. The same applies to the per-file "Download" of identity documents (2073-2085) and, with less sensitive fields, the CSV export (2177-2201).
- Root cause: An export feature that copies the most sensitive fields to an unmanaged local file, with no retention control and a UI promise that the data is wiped.
- Attack prerequisites: Access to the staff device, its backups or its synced Downloads folder; or a lost or shared laptop.
- Impact: TFN plus identity details for any customer whose form was downloaded survive the retention wipe; this is the combination the code itself calls an identity-theft kit (FormClient.tsx:404-405).
- Recommended fix: Generate the printable view in a same-origin tab (or server-side, behind the session) and print from there without saving a file; if a file is required, omit or mask the TFN and passport number and remove the customer name from the file name. Record each export in the access log, as /api/crm/file already does for reads.
- Regression test: Unit test `downloadTaskPdf` output: assert the generated document does not contain the full `tfn` value or the passport number, and that the download name does not contain `clientName`.
- Limits of this verification: Static read only. I did not check whether device management or disk encryption mitigates this.

### SITE-01-F02: An amount payable to the ATO is recorded on the task as a refund
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-840 (business logic)
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:666-704 (`sendEstimateThenDone`), 726-732 (`finishTask`), 2464-2465; src/app/api/crm/tasks/[id]/route.ts:13; src/lib/db.ts:304-305
- Evidence: The Done modal has a REFUND / PAYABLE switch (`doneOutcome`, 2504-2510). `send_estimate` receives `outcome`, but `finishTask(id, amount, ...)` then PATCHes `{action:'done', refundAmount}` with no outcome. The route accepts any positive `refundAmount` and `markTaskDone` writes the line "Refund: $<amount>" unconditionally. A $500 tax bill is therefore stored as a $500 refund. The comment at 700-702 says this figure feeds the client card.
- Root cause: The outcome chosen in the modal is not passed to, or modelled by, the done call.
- Attack prerequisites: None; normal use of the "Tax payable" option.
- Impact: Wrong financial record per customer and inflated refund totals (the Clients tiles at 2151-2160 and 2250-2258 sum refunds); a later message or report built from that note would state a refund the customer never had.
- Recommended fix: Send `{refundAmount, type: 'refund'|'owed'}` from `finishTask` (also on the `finishSentPerWill` path, using the Will customer's `outcome`) and have the server store the type, as the tax-returns endpoint already does (`type: 'refund'|'owed'`, 815).
- Regression test: With `doneOutcome='PAYABLE'`, assert the PATCH body carries the owed type and that `markTaskDone` does not write a refund line.
- Limits of this verification: I read `markTaskDone` only at lines 265 and 299-305 via grep; how the refund line is later turned into the client card was not read.

### SITE-01-F03: Opening and finishing a task silently overrides the customer's Will (AI) on/off state
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-841
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:617-630 (`pauseWillForTaskFolder`), 711-724 (`resumeWillForTaskFolder`), 735, 1622 (called on every pending-card click), 748-779 (no resume on transfer or permanent delete), 1804 (no resume on "Back to Tasks")
- Evidence: Clicking a pending task card posts `toggle_ai value:false` for the matching WhatsApp customer. The only resume is inside `finishTask`, after a successful done PATCH and only when `phone` is passed. Going back to the list, deleting the lead permanently, or a failed done all leave Will off with nothing on screen. In the other direction, any successful Done posts `toggle_ai value:true` without checking the earlier state, so a customer whose AI was deliberately paused by a person (handoff, complaint, human takeover) gets automated replies switched back on. Both calls swallow every error (629, 723).
- Root cause: The pause/resume pair is a blind set-false / set-true with no memory of the previous state and no resume on the non-Done exits.
- Attack prerequisites: None; routine CRM use.
- Impact: Customers left without replies after staff merely look at their task; or automated messages resuming on a conversation a human had taken over, which is outside the "nothing sent without the policy guard / human decision" intent.
- Recommended fix: Do this server-side with a distinct reason (for example a `paused_by_task_folder` marker) so that resume only clears a pause that the folder itself set, and clear it on back, transfer and delete as well. Surface a failure in the UI.
- Regression test: Customer with AI manually off: open the task then Done; assert AI is still off. Customer with AI on: open the task then press Back; assert AI is on again.
- Limits of this verification: I did not read the `toggle_ai` handler in src/app/api/will/actions/route.ts; it may keep a separate manual-pause flag. Needs runtime validation.

### SITE-01-F04: Protection against sending the estimate or signature notice twice exists only in the browser
- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-837, CWE-602
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:345-349 (`estimateSent`, comment "send_estimate has no idempotency"), 694-703, 2453-2465, 2549-2552 ("Send again"); 1372-1399 (`sendSignatureFromCard`, comment at 1379-1381 "The server does not gate this", 1392 "lookup failed: send as before")
- Evidence: After a successful `send_estimate` the only record that it went out is React state, lost on reload or in a second tab. The fallback (`sentPerWill`, 2460-2463) depends on the lookup to /api/will/link succeeding; when that lookup fails, `doneLink` is null and the modal offers plain Done, which is safe, but when two staff tabs are open each can send. For the signature notice the pre-check is a client-side re-read, and when that re-read throws the code sends anyway. No idempotency key is sent with either action.
- Root cause: Duplicate-send control placed in client state instead of a server-side idempotency check.
- Attack prerequisites: Two tabs or two staff members, a reload between send and done, or a transient lookup failure.
- Impact: The customer receives the estimate and invoice link, or the "ready for signature" message, twice; possibly with two different amounts.
- Recommended fix: Have the client send an idempotency key per task (for example task id plus action) and have the server refuse a repeat unless an explicit `resend:true` is given.
- Regression test: Call `send_estimate` twice with the same key; assert one WhatsApp send. Simulate a failed link lookup in `sendSignatureFromCard`; assert the server rejects a second `send_signature`.
- Limits of this verification: Based on the client code and its own comments; src/app/api/will/actions/route.ts was only grepped (it mentions a "correction resend" path near line 1312), so the server may already block part of this.

### SITE-01-F05: Expense PDF links from one customer's task stay on screen under the next customer's task
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-200 (wrong-context disclosure)
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:215, 2031-2043
- Evidence: `expensePdf` (note and `links`) is component-level state set only inside the "Build expense PDFs" click handler. It is never cleared when `activeTask` changes, so after building PDFs for task A and opening task B (which has files), B's Documents panel shows A's "N PDFs built" note and A's links.
- Root cause: Per-task result held in state that is not keyed by task id.
- Attack prerequisites: None; staff workflow.
- Impact: Staff can open, download or forward customer A's expense document while working on customer B.
- Recommended fix: Key the state by task id, or reset it in the same place `setActiveTask` is called.
- Regression test: Build PDFs on task A, open task B; assert no links are rendered.
- Limits of this verification: None for the client side.

### SITE-01-F06: Several failed requests are treated as success or dropped silently
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-252, CWE-754
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:2073-2085 (file download), 371-379 and 399-407 (load more), 498-503 (server search), 617-630 and 711-724 (pause/resume)
- Evidence: The per-file "Download" does `fetch(proxyUrl)` then saves `res.blob()` without checking `res.ok`, so a 401, 403 or 404 JSON body is saved under the identity document's file name and looks like a completed download. `loadMoreTasks` and `loadMoreClients` ignore a non-ok answer and a 401 (no redirect, no message), so the list looks complete when it is not. The server search ignores failures, so a client beyond the loaded page is reported as not found. `crmFetch` (133-138) handles these cases correctly but is not used here.
- Root cause: Raw `fetch` without status handling in the paths that were not migrated to `crmFetch`.
- Attack prerequisites: Expired session or a server error.
- Impact: Staff believe a document was saved, or that a client does not exist; wrong decisions on incomplete data.
- Recommended fix: Check `res.ok` before saving the blob and show an error; route the load-more and search calls through the same 401 and error handling as `loadTasks`.
- Regression test: Mock a 401 from /api/crm/file; assert no file is saved and an error shows.
- Limits of this verification: None.

### SITE-01-F07: TFN and bank details for every listed task are sent to the browser and re-sent on each refresh
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-201
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:18-28 (Task type with `tfn`, `bankDetails`), 361-369, 425-454 (20-second change poll reloading the full list), 1622 (detail view is fed from the list item); src/app/api/crm/tasks/route.ts:11-23
- Evidence: The list call returns up to 200 full task objects and the detail view reads `activeTask.tfn` straight from that list item, so the TFN of every pending task is in page memory whether or not its task is opened. `bankDetails` is in the type and is cleared in the optimistic done update (728) but is never rendered anywhere in this file.
- Root cause: One payload shape for list and detail.
- Attack prerequisites: Any script running in the CRM origin (the Connect page loads a third-party SDK, see F10), a browser extension, or an unattended unlocked session.
- Impact: A single compromise of the page exposes the TFN of every open task instead of one.
- Recommended fix: Return a list projection without `tfn`, `bankDetails`, address and file URLs; fetch those per task on open (which also lets the access log record who viewed which TFN). Drop `bankDetails` from the client type if it is unused.
- Regression test: Assert the list response objects have no `tfn` or `bankDetails` keys.
- Limits of this verification: I did not read `getAllTasks` in src/lib/db.ts to see which columns it selects or whether fields are decrypted there.

### SITE-01-F08: Phone numbers, search text and the form token travel in URL query strings
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-598
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:500, 619, 648, 713, 1358, 1385; src/app/(site)/start/FormClient.tsx:275, 283
- Evidence: The customer's full phone number is sent as `?phone=` on GET /api/will/link (called for every Done card on each revalidation), client search text as `?q=`, and the signed form token as `?k=` both in the page address and on GET /api/tax-form/link. Query strings are written to hosting and proxy request logs and to browser history.
- Root cause: GET with identifiers in the query instead of a POST body or header.
- Attack prerequisites: Read access to request logs, or to the browser history of a shared device for the form token.
- Impact: Customer phone numbers accumulate in logs; a form token in history on a shared computer can be replayed until it is used (the token endpoint then returns the customer's number).
- Recommended fix: Send phone and search text in a POST body; look up the Will customer by task id server-side. For the form, strip `k` from the address bar with `history.replaceState` after reading it, and send it in a POST body.
- Regression test: Assert no request URL issued by the dashboard contains a phone number.
- Limits of this verification: Mitigations seen: `Referrer-Policy: strict-origin-when-cross-origin` (next.config.js:52) stops cross-origin leakage of `k`; the token is single-use and the server takes the number from the token, not from the form. I did not inspect what the hosting platform logs.

### SITE-01-F09: The public form keeps a snapshot of personal details in sessionStorage
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-922
- Files and lines: src/app/(site)/start/FormClient.tsx:331, 439-445 (write), 370-394 (read and remove)
- Evidence: Before going to the residency page the form stores name, date of birth, Australian address, email, both phone numbers, job and other-income text under a fixed key. The TFN and files are deliberately left out (402-405). The entry is removed only when the form page is loaded again in the same tab; if the visitor finishes or abandons on the residency page it stays until the tab is closed.
- Root cause: Hard-refresh convenience snapshot with no cleanup on the abandon path.
- Attack prerequisites: Same browser tab on a shared device (hostel or library computer), or script running on the site origin.
- Impact: The next user of the device can read the previous visitor's identity details, without the TFN.
- Recommended fix: Remove the snapshot on successful submit from the residency page and on `pagehide`; shorten the 2-hour validity.
- Regression test: Submit from the residency page; assert the key is absent from sessionStorage.
- Limits of this verification: The residency page and src/lib/tax-form-handoff.ts are outside this unit and were not read in full; one of them may already clear the key.

### SITE-01-F10: The estimate amount is parsed loosely, so a European-style figure becomes a different amount
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-20
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:668, 2438, 681
- Evidence: `parseFloat(doneAmt.replace(/[^0-9.]/g,''))`: "1.234,56" becomes 1.23456 and is sent as 123 cents; "1.2.3" becomes 1.2. A leading minus sign is stripped. The message preview (2442-2449) does show the parsed figure, which is the only safeguard.
- Root cause: Strip-then-parse instead of validating the whole string.
- Attack prerequisites: Staff typing or pasting a figure with a comma decimal or a stray dot.
- Impact: A wrong refund or payable figure is sent to the customer on WhatsApp and recorded.
- Recommended fix: Accept only `^\d{1,7}(\.\d{1,2})?$` after removing spaces, "$" and thousands commas; otherwise show an error.
- Regression test: "1.234,56" and "1.2.3" are rejected; "2,036.50" gives 203650 cents.
- Limits of this verification: Server-side validation of `amountCents` was not read.

### SITE-01-F11: The downloaded form document is always branded Working Holiday Tax, including for Student Visa Tax tasks
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (cross-brand leak)
- Files and lines: src/app/(site)/crm/dashboard/DashboardClient.tsx:1182, 1192 (hard-coded brand name and domain); `task.brand` is available (27, 1637-1643)
- Evidence: `downloadTaskPdf` writes the WHT name, logo and domain into the header and footer with no check of `task.brand === 'svt'`. The list UI itself takes care to show only a code for SVT because the brands are separate to customers (comment at 1638-1639).
- Root cause: Brand not threaded into the export template.
- Attack prerequisites: Staff printing or forwarding the document for an SVT customer.
- Impact: An SVT customer or a third party sees the other brand on the customer's own form.
- Recommended fix: Select name, logo and domain from `task.brand`.
- Regression test: Export an SVT task; assert the output contains no WHT name or domain.
- Limits of this verification: None.

### SITE-01-F12: Connect WhatsApp screen: access token typed into a plain text field, and a third-party SDK runs on the CRM origin
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-549, CWE-829
- Files and lines: src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx:145-146 (token input, default type, no `autoComplete="off"`), 50-53 (Facebook SDK script, no integrity), 8, 13-16 (fallback app id and config id in code; these are public identifiers, not secrets)
- Evidence: The long-lived WhatsApp access token is entered in a visible text input that the browser may offer to remember, and it stays in component state after a successful save. The page injects `connect.facebook.net/en_US/sdk.js`, which then runs with full access to the CRM origin (it can call every /api/crm and /api/will route with the staff session cookie).
- Root cause: Convenience fallback field; SDK loaded on an admin origin.
- Attack prerequisites: Shoulder surfing, screen sharing or browser form history for the token; compromise of the third-party script for the second part.
- Impact: Disclosure of the token that sends WhatsApp messages as the business; in the SDK case, staff-level access to customer data.
- Recommended fix: `type="password"`, `autoComplete="off"`, clear the field after a successful save. Consider hosting the Connect screen on a separate origin or path with its own tighter CSP so the SDK is not allowed on the pages that show customer data.
- Regression test: Assert the token input has type password and is empty after `status.kind === 'ok'`.
- Limits of this verification: CSP was only grepped (next.config.js:26, src/proxy.ts:35 allow connect.facebook.net); I did not verify which CSP applies to which route.

### SITE-01-F13: Page gate uses the non-fresh session check; preview iframe has no sandbox attribute
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/app/(site)/crm/dashboard/page.tsx:9; src/lib/crm-store.ts:146-161; src/app/(site)/crm/dashboard/DashboardClient.tsx:2721, 2043
- Evidence: `page.tsx` calls `validateSession`, which can answer from a stale revocation cache, so a just-revoked session can still load the dashboard shell. No data is exposed because every API route seen uses `validateSessionFresh` or `sessionValid`. Separately, the PDF preview is an `<iframe src={blob:...}>` without `sandbox`; a blob URL inherits the CRM origin, so safety rests entirely on the proxy's content-type allowlist (src/app/api/crm/file/route.ts:13-16, 116-119), which I found sound. The expense PDF links (2043) use `href` from the server response without a scheme check; the server builds them as same-origin proxy paths.
- Root cause: Defence in depth only.
- Attack prerequisites: n/a
- Impact: None found today.
- Recommended fix: Use `validateSessionFresh` in the page; add `sandbox` to the iframe; accept only hrefs starting with `/api/crm/file?`.
- Regression test: n/a
- Limits of this verification: n/a

## Checked and found sound

- No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `localStorage` or `sessionStorage` use in DashboardClient.tsx (grep plus full read); all customer values are rendered as React text.
- The exported HTML escapes every customer value through `esc` (DashboardClient.tsx:915); the unescaped `sec()` titles and `G`/`GL` values are constants (917-918).
- CSV export uses `csvRow`, which guards formula-leading cells and doubles quotes (DashboardClient.tsx:2191; src/lib/csv.ts).
- wa.me link strips everything except digits and "+" (DashboardClient.tsx:2312); external links carry `rel="noopener noreferrer"`.
- Invoice link must parse as http or https before it is sent (DashboardClient.tsx:670-675).
- Wrong-customer guard on the Done lookup via `doneReq` (DashboardClient.tsx:640, 650, 655).
- Mutations through `crmFetch` roll back optimistic state on failure and redirect on 401 (133-138, 569-609, 748-802).
- Permanent delete needs the typed confirmation word (2644-2669); note this is a UI check only, authorisation is the server session.
- File proxy: session check, own-storage host check, path traversal checks, content-type allowlist, `nosniff`, sandbox CSP, `no-store` (src/app/api/crm/file/route.ts).
- Dashboard and Connect pages are session-gated on the server (dashboard/page.tsx:6-12; connect/page.tsx); CRM cookie is `sameSite: 'strict'` (src/app/api/crm/login/route.ts:105), so the JSON mutations here are not CSRF-reachable.
- Connect: `postMessage` origin limited to https facebook.com hosts (ConnectClient.tsx:59; src/lib/fb-origin.ts); the API re-checks the session and verifies the token and number with Meta before saving.
- Public form: TFN is never written to browser storage (FormClient.tsx:402-405, 439-445); the locked WhatsApp number is display-only and the server takes the number from the token (src/app/api/tax-form/link/route.ts:13-18); token endpoint is rate limited and gives one answer for forged, expired and missing tokens.
- will-scoped.css: no `url()`, `@import` or external reference; styling only.

## Open questions

1. Notes are parsed in the browser by splitting on " | " and by prefix regexes (DashboardClient.tsx:567-573, 784-795, 892-903, 961, 1923-2004). If the form routes do not strip "|" from customer free text (other income, job, how heard), a customer could inject a fake structured part such as the In Progress or Returning client marker, or a fake passport line. The server-side sanitisers were not read in this unit.
2. FormClient.tsx applies no client-side file type or size check beyond the `accept` attribute, and `tfn`, `primaryJob` and `howHeard` have no `maxLength` (689-691, 707-709, 847-849). All limits must therefore be enforced in src/lib/submit-tax-form.ts and /api/tax-form (not in this unit).
3. FormClient.tsx hard-codes `/de/...` and `/ja/...` paths for the expenses, client agreement and privacy links (773, 775, 881, 883) instead of `brand.url`. If the SVT brand ever offers German or Japanese, these would resolve to the wrong brand's pages; I did not check which languages SVT exposes.
4. "Add Client" in the CRM posts to /api/crm/tasks, which calls `notifyFormReceived` (src/app/api/crm/tasks/route.ts:79-84). Whether a manual add therefore sends a WhatsApp or email to the person was not verified.
5. Dead code: `deleteTask`, `deleteClient`, the capture-refund and both confirm modals are unreachable because `setCaptureRefund`, `setConfirmDelete` and `setConfirmDeleteClient` are never called with a value (DashboardClient.tsx:804-857, 2577-2638, 2673-2685). The endpoints they call (`DELETE /api/crm/clients/[id]`, `POST .../tax-returns`) still exist and should be reviewed in their own unit.
6. The file route answers with a `sandbox` CSP; whether the "Open" link (DashboardClient.tsx:2694) still renders a PDF in a new tab under that policy needs a runtime check.
