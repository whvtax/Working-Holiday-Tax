| finding ids | severity | real today? | devil's advocate (one line) | decision | exact fix or what the owner must do |
|---|---|---|---|---|---|
| UI-01-F01 | MEDIUM | Yes. `src/components/will/Dashboard.tsx:2451-2455`: closes every OPEN task (only 25 are drawn, `SHOWN = 25` at 2476), ignores every result, always toasts "Cleared N". | The second click already says "Yes, clear all N" and the note says it also clears Tasks; one operator; closing with `noReplyNeeded` in bulk is the purpose of the button. | FIX_NOW (result reporting and label only) | See details 1. The bulk `noReplyNeeded` override itself is left as is: whether a bulk clear may close customer tasks that never got a reply is the owner's call. |
| UI-01-F02 | LOW | Yes. `Dashboard.tsx:881` stores any JSON body as health and 1141 reads `health.checks`; `poll()` at 888 has no 401 handling. | Needs an unattended staff screen after the 8 hour session; the server already refuses every request; `refresh()` redirects on the next heavy refetch. | FIX_NOW | See details 2 (guard `setHealth`, redirect on 401 in `poll`). A single fetch wrapper for all calls is not done here (too wide). |
| UI-01-F03 | LOW | Yes. `Dashboard.tsx:2285` sends `commit=1` in the one GET; `src/app/api/will/export/route.ts:68-70` moves the cursor in that same request. | Owner asked for one click (comment "Jo, 3 Nov"); skipped items stay in Tasks and in the 72 hour export; a real fix needs a second commit step on the server; SameSite=Strict blocks cross-site triggering. | NO_FIX | Harm is small and recoverable; the fix is a server change, not a small local one. |
| UI-01-F04 | LOW | Yes. `Dashboard.tsx:268` returns `{}` for a non-JSON reply and 1431 only treats `ok === false` as failure; 2247-2249 reports "Library synced" when the seed call failed; 699-707 `loadChat` has no catch. Chat list and search show an empty result on a failed call (763-771, 819-823). | Only on a server error or dropped connection; the next poll corrects the label; `act()` returning `{}` is pinned by `audit3-ui-28.test.ts:31`, so `act()` itself must not change. | FIX_NOW (three of five parts) | See details 3. The empty chat list and "no match" on a failed search are left: `refresh()` already redirects on 401 and the list reloads on the next poll. |
| UI-01-F05 | LOW | Yes. `Dashboard.tsx:1614` names "a numbered Quick-fill" and "a Follow-up chip above"; the comment at 1464-1469 says both were removed. | Staff-only text; the Templates view still exists; the sentence is pinned word for word by `src/lib/will/__tests__/audit3-ui-18.test.ts:57`. | NEEDS_OWNER | Owner to say which control the banner should name now (the Templates tab, or a restored picker in the composer); the banner and the pinned test line then change together. |
| UI-01-F06 | LOW | Yes. `Dashboard.tsx:180-181, 1046-1049`: the warning shows the one guarantee line for any customer, with no check of income type or brand. | It is a warning, not a block; the wording is owner decision 5 (11 Oct); the operator knows the customer's income type. | NEEDS_OWNER | Owner to decide whether the warning should add "TFN-only returns; does not apply to TFN+ABN" and what it should show for a Student Visa Tax chat. |
| UI-01-F07 | INFO | Code as described (`src/components/ui/LanguageSwitcher.tsx:35-36`), not shown reachable. | Next.js redirects paths with repeated slashes before the component renders; the reporter could not reach it either. | NO_FIX | Not reachable as far as static reading shows. |
| UI-01-F08 | INFO | Yes. `Dashboard.tsx:702` concatenates the id unencoded. | Operator is authorised for every customer; ids are UUIDs. | FIX_NOW | Included in details 3c (`encodeURIComponent(id)`). Structured nightly-issue data is not done here. |
| UI-01-F09 | INFO | Yes. `Dashboard.tsx:718-741`: nothing ever adds to `confirmDismiss`. | Deliberate: comment "30 Oct (Jo): pressing X means close. No second question". | NO_FIX | Owner decision; dead chooser is harmless. |
| UI-02-F01, SITE-01-F08 (form token part) | MEDIUM | Yes in code: `src/components/layout/Analytics.tsx:67-68, 137` only stops rendering the loader; a gtag.js already loaded in the tab stays live. Whether GA sends a page view on Back depends on a GA4 property setting not in the repository. | Needs consent granted, a Back navigation onto `/start?k=...`, and GA4 history-change page views switched on; a code switch (`ga-disable`) set in a React effect can run after gtag has already fired. | NEEDS_OWNER | In the GA4 property (both brands): Admin, Data streams, Enhanced measurement, Page views, turn OFF "Page changes based on browser history events". Then confirm in GA4 Realtime that no page_location contains `k=`. |
| UI-02-F02 | LOW | Yes. `src/components/atlas/AtlasCentre.tsx:174-177`. | If logout failed the cookie is still valid, so `/crm` sends the user straight back to the dashboard, which is visible; same pattern as the CRM logout; session ends at 8 hours. | NO_FIX | Failure is visible and rare. |
| UI-02-F03 | LOW | Yes. `src/lib/atlas/atlas-view.ts:117-136` builds the panels; `AtlasCentre.tsx:154-161` never opens them for crm or will. | Sent only to an authenticated staff session that can see the same names and previews in the CRM; removing `panels` risks the atlas-view tests. | NO_FIX | No new party sees the data. |
| UI-02-F04 | LOW | Yes. `src/components/ui/MobileLanguageBanner.tsx:138-155` builds the link from the path only; rendered on every page (`RootDocument.tsx:355`). | Shown once per device, mobile only, only when browser language differs from the page language. | FIX_NOW (keep the query string) | See details 4. Hiding the banner on `/crm` and checking de/ja page existence are not done here. |
| UI-02-F05 | INFO | Yes. `src/components/ui/ResidencyDeclaration.tsx:216-219, 269` versus 247. | Comment only; no behaviour; the quiz logic was not re-read in full, so a rewritten comment could be wrong too. | NO_FIX | Correct the comment the next time the file is edited. |
| UI-03-F01 | MEDIUM | Yes. `src/components/atlas/AtlasAsk.tsx:159` renders only `proposal.summary`; `src/lib/atlas/actions.ts:47-51` runs `body`, `state`, `taskId`. | Staff only; the same guards and audit as the CRM run on approval; a note under the box says Atlas can make mistakes. | FIX_NOW (show the executed fields) | See details 5. Showing the customer's name (server lookup by id) is a further step, not included. |
| UI-03-F02 | LOW | Yes. `Analytics.tsx:67` lists `/crm` and `/complete` only; `/atlas` is rewritten to `/crm/atlas` (`src/proxy.ts:126` matches `/atlas`). | Only when the staff browser accepted cookies on the public site; GA gets a path, no customer data. | FIX_NOW | See details 6. |
| UI-03-F03, SVTAPP-01-F04 | MEDIUM | Yes. `src/components/svt/form-brand-svt.tsx:163-164` uses `GoogleReviewsBadge` (`RATING = '5.0'`, `GoogleReviewsBadge.tsx:18`) while `src/lib/svt/brand-public.ts:35` has `googleRating: null`. | Code comment: "Jo: the two forms look and behave the same"; SVT line is not live yet. | NEEDS_OWNER | Owner to decide: remove the 5.0 badge from the Student Visa Tax form until SVT has its own Google rating (the SVT `GoogleBadge` shows no score while it is null), or keep it knowingly. A rating that is not SVT's is a consumer-law question, not a code question. |
| UI-03-F04 | LOW | Yes. `src/app/api/crm/leads/route.ts:70-76` returns `detail: message`; `LeadsTab.tsx:49-51` prints it. | Deliberate: route comment "Surface the real reason. This route is behind CRM auth"; React escapes it. | NO_FIX | Owner-facing diagnostics behind the session. |
| UI-03-F05, SITE-04-F05, SITE-01-F08 (phone and search part) | LOW | Yes. `src/components/ui/ResidencyFixPanel.tsx:30-34` reads `k` and sends it on a GET; `DashboardClient.tsx:619, 713` send `?phone=`. | Fix token is single-purpose (residency answer on the customer's own open task) and marked used after one save; phone lookups are authenticated GETs logged only in the owner's own hosting logs; stripping `k` from the address bar breaks reload and React's double effect run in development. | NO_FIX | Exposure is the customer's own history and first-party logs. |
| UI-03-F06 | INFO | Yes. `src/components/mia/MiaActions.tsx:10-19, 61`. | Message is saved as not sent (SVT number not live); a double click makes a duplicate draft only. | NO_FIX | Revisit when the SVT line goes live. |
| UI-04-F01, SITE-04-F01 | MEDIUM | No. | n/a | ALREADY_FIXED | `src/proxy.ts:126`: matcher now contains `'/api/mia/:path*'`. |
| UI-04-F02 | MEDIUM | No. | n/a | ALREADY_FIXED | `src/components/mia/MiaExpensePdf.tsx:16-19`: thousands separators stripped, lone comma before 1-2 digits is a decimal. |
| UI-04-F03 | LOW | Yes. `src/app/api/crm/expense-pdf/route.ts:42` `upsert: true`; path is customer, year, category; the Mia form sends one item. | Staff tool, Mia not live; the PDF can be rebuilt from the task files. | NEEDS_OWNER | Owner to decide how the Mia expense form should work: several rows before building, or refuse to replace an existing PDF without a "replace" tick. |
| UI-04-F04 | LOW | Yes. `src/components/mia/MiaStatusBar.tsx:13-18`: no try/catch. | Mia is not live; a reload shows the true state. | FIX_NOW | See details 7. |
| UI-04-F05, SVTAPP-01-F02, SVTAPP-01-F06, REST-01-F04 | INFO to MEDIUM | Yes. Slugs are in `PublicShellClient.tsx:31-37`, `SvtDocument.tsx:27` (client prop), `src/app/robots.ts:26-31`, `docs/FORM_LINKS_RESET_29OCT.md`. | A slug is an address, not a control; the tax form and the residency fix use a signed token; the robots entry is deliberate (comment at `robots.ts:22-25`); moving the untagged decision server-side is a refactor with no gain while the slug is not a secret. | NO_FIX | Treat every slug as public. The real control is the token (see the SITE-03-F01 row). |
| SITE-01-F01 | MEDIUM | Yes. `src/app/(site)/crm/dashboard/DashboardClient.tsx:912-1221`: saves `<ClientName>_<Type>_<date>.html` with TFN and passport number. | Owner's working tool for lodging; the device is the owner's; removing it changes the daily workflow. | NEEDS_OWNER | Owner to decide: (a) mask TFN and passport number in the downloaded file, (b) drop the customer name from the file name, (c) or keep and add "delete downloads after lodging" to the Done checklist. |
| SITE-01-F02 | MEDIUM | Yes. `DashboardClient.tsx:703` passes the amount with no outcome; `src/app/api/crm/tasks/[id]/route.ts:13` and `src/lib/db.ts:266` store it as a refund. | The customer message itself is correct (outcome goes to `send_estimate`); only the internal note is wrong. The call `finishTask(id, amount, ...)` is pinned by `audit3-ui-66.test.ts`. | NEEDS_OWNER | Owner to decide how an amount payable is recorded on the task and client card (store a type `refund` or `owed`, or record nothing). It touches the route, `markTaskDone`, `refundFromNotes` and any refund totals, so it is not a one-line change. |
| SITE-01-F03 | MEDIUM | Yes. `DashboardClient.tsx:617-630, 711-724, 735`: opening a card pauses Will; only a successful Done resumes, and it resumes regardless of who paused. | Deliberate: "Jo, 8 Sep ... Resumes Will ... on ANY Done". | NEEDS_OWNER | Owner to decide: should Done switch Will back on for a customer a person paused on purpose (complaint, handoff), and should "Back to Tasks" and delete resume Will. A correct fix needs a server-side "paused by task folder" marker. |
| SITE-01-F04 | MEDIUM | Yes. `DashboardClient.tsx:345-349, 2453-2465`; server `send_estimate` and `send_signature` have no repeat guard (`actions/route.ts:1298, 1392`). | Resend is a deliberate feature (correction resend, comments 28 to 31 Aug); the modal already falls back on Will's own record (`sentPerWill`, 2460-2465) after a reload; one operator. | NO_FIX | Existing server-state fallback covers the reload case; two tabs sending at once is not a realistic case for one operator. |
| SITE-01-F05 | LOW | Yes. `DashboardClient.tsx:215, 2031-2043`: `expensePdf` is never reset when another task is opened. | Only after building PDFs and opening another task with files in the same session. | FIX_NOW | See details 8. |
| SITE-01-F06 | LOW | Yes. `DashboardClient.tsx:2073-2085` saves the body without checking `res.ok`; load-more and search ignore failures. | The operator would open the file and see it is wrong. | FIX_NOW (file download only) | See details 9. Load-more and search failure handling left as is. |
| SITE-01-F07 | LOW | Yes. `DashboardClient.tsx:18-28` (Task carries `tfn`, `bankDetails`), 361-366 loads the full list. | Recipient is the authenticated operator who may open any task; no XSS sink was found in this file; a list projection is a server change. | NO_FIX | No additional party gains access. |
| SITE-01-F09 | LOW | Yes. `src/app/(site)/start/FormClient.tsx:439-445`. | Deliberate hard-refresh safety net; tab-scoped; TFN and files are left out on purpose; 2 hour limit. | NO_FIX | Designed trade-off. |
| SITE-01-F10 | LOW | Yes. `DashboardClient.tsx:668, 2438`. | The preview shows the parsed figure before sending; Australian format is what the operator types. | NO_FIX | Preview is the safeguard. |
| SITE-01-F11 | LOW | Yes. `DashboardClient.tsx:1182, 1192` hard-code the WHT name and domain. | Internal working document, never sent to a customer; SVT not live. | NO_FIX | Revisit at SVT launch. |
| SITE-01-F12 | LOW | Yes. `src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx:145-146`: plain text input for the access token. | Staff-only fallback screen; the Facebook SDK is required by Meta's Embedded Signup. | FIX_NOW (input only) | See details 10. The SDK on the CRM origin is a Meta requirement: no change. |
| SITE-01-F13, SITE-04-F02 | INFO, LOW | Yes. Eight page gates call the synchronous `validateSession` (for example `crm/dashboard/page.tsx:9`, `crm/mia/page.tsx:12`). | The pages render an empty shell; every data route uses `validateSessionFresh` or `sessionValid`; a `sandbox` on the PDF preview frame can stop the browser's PDF viewer. | NO_FIX | No data is exposed by the shell. |
| SITE-02-F01, SITE-03-F05 | LOW, INFO | Yes. `src/app/(site)/page.tsx:392-393` and "We deal with the ATO directly" in ten page files (home, tfn, abn, superannuation, medicare, expenses, contact, german, uk, calculator). | Approved customer wording; the supervising agent statement exists on /tax-return. | NEEDS_OWNER | Owner and the supervising registered tax agent to confirm or reword: "A tax agent will never ask ... is not us" and "We deal with the ATO directly"; and whether the supervision line with the agent number goes on every page that says it. |
| SITE-02-F02 | LOW | Yes. `src/app/(site)/abn/page.tsx:438` "a flat $385" (the guarantee sentence beside it is already TFN-only); the file's own rule at line 21 says "No price anywhere". | $385 is correct for TFN+ABN without foreign income. | NEEDS_OWNER | Owner to decide: remove the figure, or say $385 and $495 with foreign income. Price wording. |
| SITE-02-F03 | LOW | Yes. `src/app/(site)/blog/[slug]/GuideArticle.tsx:534-539, 545`. | Share buttons only; no data exposure. | FIX_NOW | See details 11. |
| SITE-02-F04 | INFO | Yes. `src/app/(site)/blog/[slug]/page.tsx:532-534` does not fold accents; `GuideArticle.tsx:89-93` does. | English headings rarely carry accents. | FIX_NOW | See details 12 (identical output for ASCII headings). |
| SITE-02-F05 | INFO | Yes. `GuideArticle.tsx:477`. | Performance only. | FIX_NOW | See details 11 (same file). |
| SITE-02-F06 | INFO | Yes. Build-time month; "has passed" text on /tax-return. | The sentence is true until 1 July 2027; the site is redeployed often. | NO_FIX | Calendar matter, not a defect today. |
| SITE-03-F01, SITE-03-F04, SITE-04-F04, TESTS-02-F02 | MEDIUM, LOW | Partly. TFN and ABN forms and routes: ALREADY_FIXED (removed; `src/app/api` has no `tfn-form` or `abn-form`). Still real: `src/app/api/super-form/route.ts:73-75` merges by email or phone with no token; `src/app/api/tax-form/route.ts:304-311` still falls back to the phone match unless `FORM_TOKEN_ENFORCE=true`; the enforce path has no running test. | Rate limited; every submission is reviewed by a person before anything is lodged or paid. | NEEDS_OWNER | (1) Set `FORM_TOKEN_ENFORCE=true` in Vercel once every form link Will sends carries the token (environment change). (2) Decide whether the super form gets the same signed link; until then staff must treat bank details on a "Returning client" super task as unverified. |
| SITE-03-F02 | LOW | Partly (TFN, ABN removed). `super-form/route.ts:48` requires only name, email, phone; consent text is sent by the browser (`rh84sez58/FormClient.tsx:176`). | A direct POST without the fields only creates an incomplete task that staff see. | NEEDS_OWNER | Owner to approve the server writing the consent wording and version itself and refusing a super submission without the declaration and the selfie (consent wording is legal text). |
| SITE-03-F03 | LOW | Partly (TFN, ABN removed). `src/app/(site)/rh84sez58/FormClient.tsx:294-302`: bank holder, account and BSB inputs lack `autoComplete="off"`. | Customer's own device. | FIX_NOW (autofill only) | See details 13. Clearing state after submit not done here. |
| SITE-04-F03 | LOW | Yes. `src/app/(site)/crm/layout.tsx` is a client component with no check. | All pages gate themselves today and every data route checks the session; moving the gate is a restructure of the layout. | NO_FIX | Defence in depth only. |
| SITE-04-F06 | LOW | Yes. `src/app/(site)/crm/whatsapp/inbound-check/InboundCheckClient.tsx:64`: an 11 digit number in the placeholder. | Could be invented. | FIX_NOW | See details 14. Owner to confirm whose number it was. |
| SITE-04-F07 | INFO | Yes. `crm/layout.tsx:18-55`. | Bounded by the 8 hour token; needs a stolen cookie. | NO_FIX | Accepted limit. |
| SITE-04-F08 | INFO | Yes. `crm/dashboard/error.tsx:19-23`. | Behind the session; production replaces server messages; rendered as text. | NO_FIX | Useful to the owner. |
| SVTAPP-01-F01 | MEDIUM | Yes. `src/app/global-not-found.tsx:17-18` tests the exact host list; `src/lib/brand.ts:65-72` also accepts subdomains and the trailing dot. | Only on a subdomain or trailing-dot host that has no DNS record today. | FIX_NOW | See details 15. |
| SVTAPP-01-F03 | MEDIUM | No. | n/a | ALREADY_FIXED | `src/lib/svt/content/home-en.ts:50`: terms end "The guarantee covers returns where all the work was jobs with a TFN"; `src/lib/svt/llms.ts:37` prints those terms. |
| SVTAPP-01-F05 | LOW | Yes. `src/components/svt/form-brand-svt.tsx:162` `/assets/tpb-registered.png`; on an SVT host that path is rewritten into `/svt-site/...` (`config/brand-routing.js:95-99`); the SVT copy exists at `public/svt-assets/img/tpb-registered.png`. | Broken image only. | FIX_NOW | See details 16. |
| SVTAPP-01-F07, TESTS-02-F05 | LOW, INFO | Yes. `src/lib/svt/brand-public.ts:16-25`; `src/lib/__tests__/launch-gate.test.ts:28-42` skips the number check while shared. | Known and dated owner decision (5 Nov); the launch gate test exists for it. | NEEDS_OWNER | Give Student Visa Tax its own WhatsApp number (Meta action) before launch, then run `SVT_LAUNCH=true npx jest launch-gate`. |
| SVTAPP-01-F08 | INFO | Yes. `src/lib/svt/llms.ts:38` says the TFN guide is English only; `/zh/tfn` and `/vi/tfn` page files exist. The same phrase is in `src/lib/svt/content/services-en.ts`. | Machine-read file; low traffic. | NEEDS_OWNER | Owner to confirm the zh and vi TFN pages are meant to be live, then the "English only for now" clause is removed in both places (published wording). |
| TESTS-01-F01, TESTS-02-F06 | MEDIUM, LOW | Yes. Number-shaped strings beside names in test comments and one `describe` title (for example `policy-guard.test.ts:604, 635`, `payment-proof.test.ts:127`, `invalid-transition.test.ts:4`); values not reproduced here. | Private repository; tests are not deployed. | NEEDS_OWNER | Owner to confirm which are real customers and approve a sweep that replaces names and numbers in test files with synthetic ones (many files; some values are used by the tests, so it is not a one-line edit). |
| TESTS-01-F02, TESTS-02-F01 | MEDIUM | Yes as a test-quality statement (`api-handler-inventory-round2.test.ts:110-165`). | No production defect; the routes were read by the route units and are gated; a behavioural test over about 60 handlers is new work, not a fix. | NO_FIX | Backlog: table-driven 401 test. Nothing to change in the product. |
| TESTS-01-F03 | LOW | Yes in part: matcher tests exist (`src/lib/__tests__/request-guard.test.ts`), no request-level origin test. | The proxy guard and SameSite=Strict are in place; the /api/mia gap is closed. | NO_FIX | Backlog test. |
| TESTS-01-F04 | LOW | Yes. For example `sec2-will-redteam-service.test.ts:77-82`; every kill-switch read is `=== true` (16 sites, for example `service.ts:509`). | The only writer stores a boolean and reads it back (`actions/route.ts:1145`); a failed read reports ON (`store-supabase.ts:1047`); the test says the strictness is pinned on purpose. | NO_FIX | Only a hand edit in the database could store the wrong type. |
| TESTS-01-F05, REST-01-F03 | INFO | Yes. | Published business payment details and Meta identifiers that are useless without the token. | NO_FIX | Not secrets. |
| TESTS-02-F03 | LOW | Yes. `src/app/api/tax-form/fix/route.ts:31-41`: read, update, then mark used; a failed read counts as unused (the Supabase store returns undefined on error, `store-supabase.ts:1048`). | The link only lets its holder answer their own residency question again; staff review the task; a fail-closed read needs a store change. | NO_FIX | Low value target. |
| TESTS-02-F04 | LOW | Yes. `src/lib/field-seal.ts:22-34` stores plaintext with a warning when no key is set; mock brain allowed by a variable. | Deliberate availability choices; nothing fails while the variables are set. | NEEDS_OWNER | Confirm in Vercel production that `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` are set and `WILL_ALLOW_MOCK_BRAIN` is absent. Decide whether production should refuse to store a TFN when the key is missing. |
| REST-01-F01 | LOW | Yes. `.vercelignore` lists `security-assessment` and `audit-output` but not `audit-reports`; `docs/security-audit` also uploads. | Uploaded build files are not served to the public; the repository is private. | FIX_NOW (`.vercelignore` only) | See details 17. Whether audit folders stay in git, and whether `docs` stays in the source zip, is the owner's choice. |
| REST-01-F02 | INFO | Yes. `.data/store.json` exists. | Synthetic demo data; `.data` is in both ignore files. | NO_FIX | Nothing to do. |
| REST-01-F05 | LOW | Yes. `.mcp.json:3-6`. | Developer tooling, exact version pinned, excluded from deploy. | NO_FIX | Accepted. |
| REST-01-F06 | INFO | Yes. Three `.pyc` files in `.claude/skills/ui-ux-pro-max/scripts/__pycache__/`. | `.claude` is not deployed. | FIX_NOW | See details 18. |
| REST-01-F07 | INFO | Yes. `marketing/review-stories/`. | Public Google reviews; the `.vercelignore` comment says marketing was left in on purpose. | NO_FIX | Public content. |
| REST-01-F08 | INFO | Yes. | No identifier found by the reporter. | NO_FIX | Nothing to do. |

## FIX_NOW details

Before applying, note: several tests read source files as text. Each anchor below was checked with a fixed-string search over `src`, `e2e` and `__tests__` and appears only in the file named, except where stated. Nothing was run.

### 1. UI-01-F01: `src/components/will/Dashboard.tsx`

Existing:
```
                          await Promise.all(open.map((t) => act({ action: 'resolve_task', id: t.id, noReplyNeeded: true })));
                          say(`Cleared ${open.length}`);
```
Replace with:
```
                          const results = await Promise.all(open.map((t) => act({ action: 'resolve_task', id: t.id, noReplyNeeded: true })));
                          const failed = results.filter((r) => !r?.ok).length;
                          say(failed ? `❌ Cleared ${open.length - failed} of ${open.length}. ${failed} could not be closed, try again.` : `Cleared ${open.length}`);
```
Existing: `` `Clear the ${open.length} showing` `` Replace with: `` `Clear all ${open.length} open` ``

### 2. UI-01-F02: `src/components/will/Dashboard.tsx`

Existing: `      if (h) setHealth(h);` Replace with: `      if (h && h.checks) setHealth(h);`

Existing: `const v = await fetch('/api/will/version').then((r) => r.json());`
Replace with: `const v = await fetch('/api/will/version').then((r) => { if (r.status === 401) window.location.href = '/crm'; return r.json(); });`

### 3. UI-01-F04 and UI-01-F08: `src/components/will/Dashboard.tsx`

a. AI toggle. Keep the existing line (it is pinned by `audit3-ui-78.test.ts:66`) and add one line directly after it.
Existing (keep): ``if (r?.ok === false) { say(`❌ ${r.error ?? 'could not change'}`); refresh(); return; }``
Add after it: `if (!r?.ok) { say('❌ No confirmation from the server. Check the toggle before relying on it.'); refresh(); return; }`

b. Sync library.
Existing: ``const tpl = rt && rt.ok ? ` Messages: ${(rt.updated ?? 0) + (rt.backfilled ?? 0)} updated.` : '';``
Replace with: ``const tpl = rt && rt.ok ? ` Messages: ${(rt.updated ?? 0) + (rt.backfilled ?? 0)} updated.` : ' ❌ Message templates were NOT synced. Press Sync again.';``

c. `loadChat` (also UI-01-F08).
Existing:
```
    const res = await fetch('/api/will/messages?customerId=' + id);
    if (res.status === 401) { window.location.href = '/crm'; return; }
    const d = await res.json().catch(() => null);
    if (!d || !Array.isArray(d.messages)) return;
```
Replace with:
```
    let res: Response;
    try { res = await fetch('/api/will/messages?customerId=' + encodeURIComponent(id)); }
    catch { if (latestChatReq.current === id) setChatMsgs([]); return; } // never leave the previous customer's messages under the new header
    if (res.status === 401) { window.location.href = '/crm'; return; }
    const d = await res.json().catch(() => null);
    if (!d || !Array.isArray(d.messages)) { if (latestChatReq.current === id) setChatMsgs([]); return; }
```

### 4. UI-02-F04: `src/components/ui/MobileLanguageBanner.tsx`

Existing: `const localeHref = buildLocaleUrl(targetLocale)`
Replace with: `const localeHref = buildLocaleUrl(targetLocale) + (typeof window !== 'undefined' ? window.location.search : '')`

### 5. UI-03-F01: `src/components/atlas/AtlasAsk.tsx`

Existing: `<p dir="auto" className={styles.proposalText}>{item.proposal.summary}</p>`
Replace with:
```
<p dir="auto" className={styles.proposalText}>{item.proposal.summary}</p>
                  {item.proposal.kind === 'send_reply' && <p dir="auto" className={styles.proposalNote}>Message that will be sent, word for word: {item.proposal.body}</p>}
                  {item.proposal.kind === 'set_state' && <p className={styles.proposalNote}>Stage will change to: {item.proposal.state}</p>}
                  {item.proposal.kind === 'resolve_task' && <p className={styles.proposalNote}>The task will be closed.</p>}
```

### 6. UI-03-F02: `src/components/layout/Analytics.tsx`

Existing: `const isAdminArea = pathname.startsWith('/crm') || pathname.startsWith('/complete')`
Replace with: `const isAdminArea = pathname.startsWith('/crm') || pathname.startsWith('/complete') || pathname === '/atlas' || pathname.startsWith('/atlas/')`

### 7. UI-04-F04: `src/components/mia/MiaStatusBar.tsx`

Existing:
```
    const r = await fetch('/api/mia/status', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ paused: !paused }) });
    const d = await r.json();
    if (d.ok) setPaused(d.paused); else setError(d.error ?? 'error');
```
Replace with:
```
    try {
      const r = await fetch('/api/mia/status', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ paused: !paused }) });
      const d = await r.json();
      if (d.ok) setPaused(d.paused); else setError(d.error ?? 'error');
    } catch { setError('the change was not confirmed. Reload to see the real state'); }
```

### 8. SITE-01-F05: `src/app/(site)/crm/dashboard/DashboardClient.tsx`

Existing (one occurrence, line 1622): `setLastViewedTaskId(t.id);setActiveTask(t);`
Replace with: `setLastViewedTaskId(t.id);setActiveTask(t);setExpensePdf({ busy: false, note: '', links: [] });`

### 9. SITE-01-F06: `src/app/(site)/crm/dashboard/DashboardClient.tsx`

Existing: `const res = await fetch(proxyUrl)`
Replace with:
```
const res = await fetch(proxyUrl)
                              if (!res.ok) throw new Error('download_failed')
```
(The existing `catch` then opens the file address in a new tab, where the real error is visible, instead of saving an error body under the document's name.)

### 10. SITE-01-F12: `src/app/(site)/crm/whatsapp/connect/ConnectClient.tsx`

Existing: `<input placeholder="Access token" value={token}`
Replace with: `<input type="password" autoComplete="off" placeholder="Access token" value={token}`

### 11. SITE-02-F03 and SITE-02-F05: `src/app/(site)/blog/[slug]/GuideArticle.tsx`

Existing: `import { useEffect, useState, useRef } from 'react'`
Replace with: `import { useEffect, useMemo, useState, useRef } from 'react'`

Existing: `const headings = getHeadings(guide.body)`
Replace with: `const headings = useMemo(() => getHeadings(guide.body), [guide.body])`

Existing: `  const [copied, setCopied] = useState(false)`
Replace with:
```
  const [copied, setCopied] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  useEffect(() => { setPageUrl(window.location.href) }, [])
```

Existing:
```
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
```
Replace with:
```
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(window.location.href) } catch { return }
    setCopied(true)
```

Existing: ``const waShareUrl = `https://wa.me/?text=${encodeURIComponent(guide.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}` ``
Replace with: ``const waShareUrl = `https://wa.me/?text=${encodeURIComponent((guide.title + ' ' + pageUrl).trim())}` ``

### 12. SITE-02-F04: `src/app/(site)/blog/[slug]/page.tsx` (function `headingAnchor`)

Existing: `return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`
Replace with: `return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`

### 13. SITE-03-F03: `src/app/(site)/rh84sez58/FormClient.tsx`

Existing: `placeholder={T('phBankHolder')} value={bankHolder}`
Replace with: `placeholder={T('phBankHolder')} autoComplete="off" value={bankHolder}`

Existing: `inputMode="numeric" value={bankAccount}`
Replace with: `inputMode="numeric" autoComplete="off" value={bankAccount}`

Existing: `inputMode="numeric" value={bankBsb}`
Replace with: `inputMode="numeric" autoComplete="off" value={bankBsb}`

### 14. SITE-04-F06: `src/app/(site)/crm/whatsapp/inbound-check/InboundCheckClient.tsx`, line 64

In the attribute that starts `placeholder="Check a specific number (optional), e.g. `, replace the 11 digit number after `e.g. ` (not reproduced here) with `61491570156` (a number from the ACMA range reserved for fiction).

### 15. SVTAPP-01-F01: `src/app/global-not-found.tsx`

Existing: `import routing from '../../config/brand-routing'`
Replace with: `import { brandFromHost } from '@/lib/brand'`

Existing:
```
  const host = ((await headers()).get('host') ?? '').toLowerCase().split(':')[0]
  const svt = (routing.SVT_HOSTS as readonly string[]).includes(host)
```
Replace with:
```
  const svt = brandFromHost((await headers()).get('host')) === 'svt'
```
(`routing` is used nowhere else in the file; line 18 was its only use.)

### 16. SVTAPP-01-F05: `src/components/svt/form-brand-svt.tsx`

Existing: `sealSrc: '/assets/tpb-registered.png',` (in this file only; the same text in `src/components/ui/form-brand-wht.tsx` must stay)
Replace with: `sealSrc: '/svt-assets/img/tpb-registered.png',`

### 17. REST-01-F01: `.vercelignore`

Existing: `audit-output`
Replace with:
```
audit-output
audit-reports
docs/security-audit
```
(The test `__tests__/security/sec2-supply-ir.test.ts:202-208` only requires certain lines to be present and build inputs to be absent; neither new line is a build input. `scripts/build-language-rules.mjs` reads `docs/engineering/language-blocks`, which is not touched.)

### 18. REST-01-F06

Delete the folder `.claude/skills/ui-ux-pro-max/scripts/__pycache__/` (three `.pyc` files). In `.gitignore`, after the line `.DS_Store`, add:
```
__pycache__/
*.pyc
```
