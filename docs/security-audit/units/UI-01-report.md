# UI-01 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/components/blog/LocaleGuidePage.tsx | 862 | 1-500, 501-862 | REVIEWED |
| src/components/ui/LanguageSwitcher.tsx | 262 | 1-262 | REVIEWED |
| src/components/ui/ResidencyStep.tsx | 535 | 1-535 | REVIEWED |
| src/components/will/Dashboard.tsx | 2840 | 1-500, 501-1000, 1001-1500, 1501-2000, 2001-2450, 2451-2840 | REVIEWED |

Total: 4 of 4 files, 4499 of 4499 lines.

Files outside the unit opened only to judge a finding (not fully reviewed):
- src/lib/json-ld-html.ts (whole file, 7 lines)
- src/lib/tax-form-handoff.ts (lines 58-69)
- src/app/api/will/media/[id]/route.ts (whole file)
- src/app/api/will/tick/route.ts (whole file)
- src/app/api/will/export/route.ts (lines 40-75)
- src/app/api/will/actions/route.ts (lines 46-47, 460-465, 856-898, by grep and one range)
- src/lib/will/auth.ts (lines 1-50)
- src/lib/request-guard.ts (lines 20-45)
- src/proxy.ts (grep only: lines 58-63, 126)
- src/lib/will/handoff-reasons.ts (lines 582-608)
- grep for `sessionValid` in the health, version, state, messages, chats, search, knowledge, seed, followups and system routes (presence only)

## Findings

### UI-01-F01: "Clear the N showing" closes every open task, including ones not on screen, and always says it worked
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-754 (improper check for unusual conditions), CWE-841 (business-logic)
- Files and lines: src/components/will/Dashboard.tsx:2441-2455 (button), 2473-2476 and 2629-2631 (only 25 cards are shown)
- Evidence: `open` is every task with status OPEN in `data.tasks`. The button label is "Clear the {open.length} showing", but the panel renders only `handoffs.slice(0, SHOWN)` with `SHOWN = 25`. On the second click it runs `Promise.all(open.map(t => act({ action: 'resolve_task', id, noReplyNeeded: true })))`, ignores every result, and toasts `Cleared ${open.length}`. `noReplyNeeded: true` is the flag that overrides the server's `no_reply_yet` refusal (see lines 715-727), so URGENT customer tasks where nothing was ever sent are closed in bulk too.
- Root cause: the bulk action uses the full open set while the screen shows a capped subset, sends the override flag unconditionally, and has no result handling (the per-row buttons use `actionToast`; this one does not).
- Attack prerequisites: none beyond a logged-in operator with more than 25 open tasks, or any failed request (expired session, 500, dropped connection).
- Impact: (a) customers whose handoff was never read are closed with no reply and disappear from Tasks, the bell and the Decision Log; (b) when requests fail the operator is told "Cleared N" while the tasks are still open, or only some closed.
- Recommended fix: clear only the task ids actually rendered; do not send `noReplyNeeded` in bulk for customer tasks (or list how many have had no reply and ask); count `r?.ok` results and report "Cleared X of N, Y failed".
- Regression test: with 30 open tasks, arm and confirm; assert exactly the 25 rendered ids are sent. With `act` mocked to return `{ok:false}` for some, assert the toast reports the failures.
- Limits of this verification: I did not read the `resolve_task` server branch in full (only that it exists at actions/route.ts:985); whether `/api/will/state` itself caps `tasks` was not checked.

### UI-01-F02: After the session expires the dashboard keeps polling and keeps customer data on screen; one path can crash the render
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-613 (insufficient session expiration, client side), CWE-248
- Files and lines: src/components/will/Dashboard.tsx:885-894 (poll), 899-908 (tickOnce), 920-922 (healthIv), 878-883 (refetchHeavy), 1141 (render reads `health.checks`)
- Evidence: the 401 redirect to `/crm` exists only in `refresh()` (689), `loadChat()` (703) and `act()` (267). `poll()` parses the 401 body, finds no `token`, and returns; `tickOnce()` and the health timer do the same. Nothing calls `refresh()` again, so a tab left open past the 8-hour session keeps requesting `/api/will/version` every 15 s, `/api/will/tick` every 30 s and `/api/will/health` every 45 s indefinitely, while phone numbers, message previews and the open conversation stay rendered. Separately, `refetchHeavy()` stores any JSON body as health (`if (h) setHealth(h)`), so a 401 body `{ok:false,error}` becomes `health`, and line 1141 calls `Object.entries(health.checks)` on `undefined` before the redirect from `refresh()` lands. The 45 s timer guards this with `h && h.checks`; `refetchHeavy` does not.
- Root cause: 401 handling was added per call site instead of in one fetch wrapper.
- Attack prerequisites: physical or shoulder access to an unattended staff screen after session expiry.
- Impact: customer identifiers and chat text remain readable after the server-side session has ended; endless 401 requests from idle tabs; a possible white error screen on load with an expired session.
- Recommended fix: one `willFetch` helper that redirects on 401 for every `/api/will/*` call (including version, tick, health, chats, search, knowledge, system, followups, monthly), and that clears state before redirecting. Guard `setHealth` with `h.checks`.
- Regression test: mock `/api/will/version` to return 401; assert `window.location.href` becomes `/crm` and timers are cleared. Mock `/api/will/health` 401 on mount; assert no throw.
- Limits of this verification: static only; I did not confirm whether an error boundary catches the line 1141 throw.

### UI-01-F03: "Download new items as PDF" moves the report cursor before the operator has the report
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-841
- Files and lines: src/components/will/Dashboard.tsx:2285-2303; src/app/api/will/export/route.ts:46-47, 68-70
- Evidence: the client fetches `/api/will/export?mode=attention&commit=1` in a single request. The server comment says commit is sent "once the report has been received, so a failed download loses nothing", but the server sets `attention_report_cursor` inside that same request, before the body is delivered. If the response is lost, the blob or iframe step fails, or the operator cancels the print dialog, those items are never included in a later "new items" report. A double click or a second tab produces an empty second report. The commit is also a state change on GET.
- Root cause: read and commit are combined in one GET.
- Attack prerequisites: none; ordinary network failure or a cancelled print.
- Impact: handoffs and blocked messages silently drop out of the daily oversight report. They remain in Tasks and in the 72-hour export.
- Recommended fix: fetch without commit, and after the frame has loaded send a separate POST that commits the `reportAt` value returned by the first call.
- Regression test: fail the first fetch after the server handled it; assert the cursor setting is unchanged.
- Limits of this verification: I read only lines 40-75 of the export route. Cross-site triggering is not possible as far as I can see: the session cookie is SameSite=Strict (login/route.ts:105, verify-otp/route.ts:93).

### UI-01-F04: Several failed requests are shown as success or as an empty result
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-252 (unchecked return value), CWE-392
- Files and lines: src/components/will/Dashboard.tsx:268 and 1428-1433 (toggle_ai); 2245-2251 (Sync library); 763-771 (chat list); 819-823 (search); 699-707 (loadChat)
- Evidence:
  - `act()` returns `{}` when the response is not JSON (line 268). The chat-header AI toggle treats only `r?.ok === false` as failure (1431), so an HTML 500 page toasts "paused, you have the wheel" or "resumed" while nothing changed. The drawer copy of the same button (2710) uses `actionToast` and is correct.
  - Sync library: if `/api/will/seed` fails (`rt` null or not ok) the toast still reads "Library synced: ..." and only omits the "Messages:" part (2247-2249).
  - Chat list: on a 401 or 500 JSON body `d.customers` is not an array, so `rows = []` and a reset load replaces the list with nothing (766-768). No message, no redirect.
  - Search: a 401/500 body or a network error yields `[]`, shown as "No customer matches that" (821-823, 1332).
  - `loadChat` has no try/catch around `fetch`, so a network error is an unhandled rejection and the previous customer's messages stay under the newly selected header (700-706: `setChatSelId(id)` runs first, `setChatMsgs` never does).
- Root cause: result handling differs per call site; `actionToast` is not used everywhere.
- Attack prerequisites: none; a server error or expired session.
- Impact: the operator believes Will is paused when it is still answering (or the reverse), believes templates were synced, or concludes a customer does not exist. The `loadChat` case can lead to replying in the wrong thread context: the header and the composer target the new customer while the visible messages belong to the previous one.
- Recommended fix: make `act()` return `{ ok:false, error }` for non-JSON and non-2xx; use `actionToast` at 1431; report seed failure; distinguish "search failed" from "no match"; clear `chatMsgs` when the selection changes and catch fetch errors in `loadChat`.
- Regression test: mock each endpoint with 500 HTML and assert the failure wording; for `loadChat`, reject the fetch and assert `chatMsgs` is empty for the new selection.
- Limits of this verification: static only.

### UI-01-F05: The 24-hour banner tells the operator to use controls that were removed
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (broken behaviour affecting the free-text-inside-24h rule)
- Files and lines: src/components/will/Dashboard.tsx:1614 (banner), 1464-1469 (comment recording removal), 303 and 314-325 (QUICK_TEMPLATES still used only for body matching)
- Evidence: the banner says "Use a numbered Quick-fill (sent unedited) or a Follow-up chip above." The comment at 1464-1469 states the Quick-fill 1-4 row and the follow-up chips were removed entirely. No element in the chats view renders them.
- Root cause: copy not updated when the controls were removed.
- Attack prerequisites: none.
- Impact: outside the window the operator has no working path from this screen except retyping a Library body word for word; typed messages are refused. The Templates view (line 1765) is not mentioned.
- Recommended fix: point the banner at the control that exists, or restore a template picker in the composer.
- Regression test: render a chat outside the window and assert every control named in the banner exists in the DOM.
- Limits of this verification: I did not open FreeTextTemplates.tsx, so I cannot say whether it offers a send path.

### UI-01-F06: The guarantee prompt offers the guarantee wording for every customer, whatever the income type or brand
- Severity: LOW
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-841
- Files and lines: src/components/will/Dashboard.tsx:180-181 (GUARANTEE_LINE, GUARANTEE_VARIANT_RE), 1046-1049 (confirm dialog), 1031 (sendManual has the customer id but does not look at `income` or `brand`)
- Evidence: when a manual message matches the variant pattern, the dialog shows `GUARANTEE_LINE` as "The one wording that is the rule" and asks "Send it anyway?". There is no check that the customer is TFN-only; the brief says the guarantee applies only to TFN-only returns. The same text is offered for chats on the SVT line (`c.brand === 'svt'`, line 1313).
- Root cause: the warning is keyed on the text only.
- Attack prerequisites: none; an operator replying to a TFN+ABN or SVT customer.
- Impact: the tool steers staff to promise the fee guarantee to customers it does not cover. It is a warning only, so nothing is blocked either way.
- Recommended fix: look up the customer; for `income !== 'TFN'` say the guarantee does not apply; use brand-specific wording for SVT.
- Regression test: call `sendManual` for a TFN_ABN customer with "money-back" text and assert the dialog does not present the guarantee line as the rule.
- Limits of this verification: I did not read `humanSend` in actions/route.ts, so I do not know whether the server guard blocks a guarantee promise to a TFN+ABN customer. Whether SVT has the same guarantee is a business fact I could not verify.

### UI-01-F07: LanguageSwitcher builds link targets from the current path without rejecting a leading double slash
- Severity: INFORMATIONAL
- Confidence: low
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-601
- Files and lines: src/components/ui/LanguageSwitcher.tsx:35-36 (stripLocale), 49-54, 58-63, 235
- Evidence: `stripLocale('/de//host')` returns `//host`, which becomes `englishHref` and is passed to `<Link href>`; a protocol-relative value would navigate off site. `newHref` returns `pathname` itself for the current new locale (line 62).
- Root cause: the path is trusted to be single-slash.
- Attack prerequisites: a request path containing `//` after the locale prefix must reach this component. Next.js normally redirects repeated slashes, which would prevent it; I could not confirm that without running the app.
- Impact: at most a crafted link whose language menu points to another site.
- Recommended fix: collapse repeated slashes in `stripLocale` and refuse any result starting with `//`.
- Regression test: unit test `stripLocale` with `/de//example.org` and assert the hrefs start with a single `/`.
- Limits of this verification: not executed; `locale-pages` helpers were not opened.

### UI-01-F08: Customer id is concatenated into a query string unencoded, and one source of that id is parsed from task text
- Severity: INFORMATIONAL
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-88 (parameter injection)
- Files and lines: src/components/will/Dashboard.tsx:702 (`'/api/will/messages?customerId=' + id`), 2491 and 2532-2540 (id from `parseNightlyIssues(t.context)`); src/lib/will/handoff-reasons.ts:582-593
- Evidence: every other query value in the file is passed through `encodeURIComponent` (491, 763, 819); this one is not. On a nightly-check card the id is the first `|`-separated field of each context line, and the second field is the customer name. A name containing a newline followed by `x|y|z` would add a row whose "Open this chat" button calls `openChat` with an attacker-chosen string, which also posts `mark_read` for it (line 712; per the comment at 838-843 `mark_read` pauses the assistant for that customer).
- Root cause: delimiter-based parsing of a field that includes a customer-supplied name; missing encoding.
- Attack prerequisites: the nightly writer must not strip newlines or pipes from the name, and the attacker would need another customer's internal id to do anything meaningful.
- Impact: negligible as far as I can see; the operator is already authorised for every customer.
- Recommended fix: `encodeURIComponent(id)`; validate the parsed id as a UUID; carry the nightly issues as structured data.
- Regression test: parse a context whose name holds `\nabc|n|t` and assert no extra issue is returned.
- Limits of this verification: I did not read the code that writes the nightly context.

### UI-01-F09: The "reply first or no reply needed" chooser is dead code; the X button always overrides the server's no-reply guard
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/components/will/Dashboard.tsx:718-741, 1722-1724, 2617-2619
- Evidence: `confirmDismiss` is only ever deleted from (731, 739); nothing adds a task id, so `DismissChooser` always renders `null`. `tryResolve` retries with `noReplyNeeded: true` as soon as the server answers `no_reply_yet` (721-725). The comment dates this to an instruction of 30 Oct, so it appears deliberate; the server check from 11 Oct therefore has no effect from this screen.
- Root cause: later instruction left the earlier control in place but unreachable.
- Attack prerequisites: none.
- Impact: a single click closes a task for a customer who has received nothing. Recorded because it defeats a control another unit may count as present.
- Recommended fix: remove the dead chooser, or restore the question for URGENT tasks.
- Regression test: n/a (decision for the owner).
- Limits of this verification: none.

## Checked and found sound

- JSON-LD script injection: all five `dangerouslySetInnerHTML` uses go through `jsonLdHtml`, which escapes `<`, `>` and `&` (LocaleGuidePage.tsx:725-732; src/lib/json-ld-html.ts). The `<style>` at 741 is a constant string.
- No `dangerouslySetInnerHTML`, `innerHTML` or `eval` in Dashboard.tsx, LanguageSwitcher.tsx or ResidencyStep.tsx (grep and full read). All customer text (message bodies, captions, task reason and context, names, previews) is rendered as React text nodes.
- Print frame: export text is escaped for `&`, `<`, `>` before being placed in a `<pre>` inside a Blob document; the title uses only a date string (Dashboard.tsx:2288-2290).
- Attachments: `src` is `/api/will/media/` plus `encodeURIComponent(media.id)` (Dashboard.tsx:491); links use `rel="noreferrer"` (505, 513). The route requires a session, validates the id, serves only raster images and PDF inline, forces `application/octet-stream` plus `attachment` otherwise, and sets `nosniff` and a `sandbox` CSP (media/[id]/route.ts). The customer filename is used only in the `download` attribute and as link text.
- No `href` is built from customer data; all are constants (Dashboard.tsx:1088, 1097, 1150-1156, 2264-2271). ResidencyStep.tsx:419 uses `brand.url(lang, 'tax-form')` with a fixed page key.
- No `localStorage`, `sessionStorage`, `document.cookie` or `postMessage` in any of the four files. ResidencyStep reads the form hand-off from memory only (ResidencyStep.tsx:356-357; tax-form-handoff.ts:58-65, with an age limit).
- No secrets, tokens, `process.env` or `NEXT_PUBLIC_` values in the four files. Environment variable names appear only as operator instructions in strings (Dashboard.tsx:2104, 2114, 2129).
- Authorisation is not client-side only: every route the dashboard calls contains a `sessionValid` check (actions, state, messages, chats, search, knowledge, seed, followups, system, health, version, export, media), and tick uses `cronAuthorized`.
- CSRF: `crm_session` is SameSite=Strict, and src/proxy.ts:58-63 applies `crossSiteMutationReason` to `/api/will/*` and `/api/crm/*`, which covers the direct `fetch` POSTs to `/api/will/knowledge` and `/api/will/seed` (Dashboard.tsx:2245-2246, 2764-2795).
- Timers: all five intervals and the search debounce are cleared on unmount, and polling pauses on hidden tabs (Dashboard.tsx:866-867, 918-930, 828).
- Double-send guards: `runOnce` for approve, discard and task reply (282-296); `sendingRef` for manual replies (1055-1082). The composer is cleared only after the server confirms (1633-1640, 2696-2697).
- Send, approve, template save, delete, kill switch, mode change and stage move report server failure (1071-1075, 1556-1557, 1116-1130, 1203-1209, 1396-1397, 2729-2737, 2823-2830).
- Autopilot and delete-chat ask for confirmation (1126, 1456); a forced move of a paid customer back to sales asks first (1393-1395).
- Fees shown match the brief: TFN $220, TFN+ABN $385 (Dashboard.tsx:244).

## Open questions

1. Does `humanSend` (actions/route.ts, not in this unit) run the policy guard on manual replies and task replies? The client checks at Dashboard.tsx:1041-1049 are warnings only.
2. `/api/will/tick` runs `processDueJobs` (which sends WhatsApp messages) on a GET authorised by any staff session, and each open dashboard tab calls it every 30 s (Dashboard.tsx:899-919). Whether two tabs plus the cron can send the same job twice depends on job claiming in the scheduler, which I did not read. The comment in tick/route.ts says 15 s; the client uses 30 s.
3. `quickTemplateKeyFor` (Dashboard.tsx:314-325) matches the typed text against every Library row without regard to brand, then sends `send_template` with that key. Whether the server refuses a WHT template key for an SVT customer was not checked.
4. The dashboard labels every chat with `ASSISTANT_NAME` and the toast "Will stays active" even for SVT (Mia) chats; display only, but worth confirming no customer-facing text depends on that constant.
5. "Auto-resolved by Will" (Dashboard.tsx:2061) is computed from the loaded customer window and the task list, not from server totals, so the percentage may be wrong on large data sets. Not a security matter.
6. ResidencyStep.tsx:60: the English `whmResult` lacks the "our team confirms this" sentence that the other five languages carry. Content difference only; I do not know which version is intended.
