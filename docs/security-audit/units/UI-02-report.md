# UI-02 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/components/atlas/AtlasCentre.tsx | 288 | 1-288 | REVIEWED |
| src/components/atlas/atlas.module.css | 849 | 1-430, 431-849 | REVIEWED |
| src/components/blog/LocaleCategoryPage.tsx | 282 | 1-282 | REVIEWED |
| src/components/expenses/JobExpensesPage.tsx | 528 | 1-528 | REVIEWED |
| src/components/layout/Footer.tsx | 337 | 1-337 | REVIEWED |
| src/components/layout/Nav.tsx | 455 | 1-455 | REVIEWED |
| src/components/layout/RootDocument.tsx | 363 | 1-363 | REVIEWED |
| src/components/svt/Type.tsx | 12 | 1-12 | REVIEWED |
| src/components/ui/GuideCta.tsx | 363 | 1-363 | REVIEWED |
| src/components/ui/MobileLanguageBanner.tsx | 292 | 1-156, 155-292 | REVIEWED |
| src/components/ui/ResidencyDeclaration.tsx | 363 | 1-363 | REVIEWED |
| src/components/wht/ExpensesBlocks.tsx | 368 | 1-73, 70-368 | REVIEWED |

Total: 12 of 12 files, 4500 lines.

Files outside the unit opened to judge findings (read in full unless a range is given):
src/lib/json-ld-html.ts, src/components/layout/Analytics.tsx, src/lib/tax-form-handoff.ts,
src/lib/submit-tax-form.ts, src/lib/analytics.ts, src/lib/atlas/atlas-view.ts,
src/components/atlas/AtlasPanel.tsx, src/app/api/crm/logout/route.ts,
src/app/(site)/crm/atlas/page.tsx, src/app/(site)/crm/page.tsx,
src/lib/wa.ts (1-200), src/app/(site)/HomeWa.tsx (1-57), src/lib/locale-pages.ts (1-60),
src/app/(site)/start/FormClient.tsx (272-275, 318-345, 405-447 only),
src/components/ui/ResidencyStep.tsx (1-80 only), src/lib/crm-store.ts (146-168 only),
src/lib/will/morning-report.ts (lines 12, 48-49 only, via grep),
src/lib/constants.ts (lines 4-6 only, via grep).

## Findings

### UI-02-F01: The "untagged" list does not stop Google Analytics on token form pages once gtag.js is already loaded in the tab
- Severity: MEDIUM
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-598 (sensitive query string sent to a third party), CWE-201
- Files and lines: src/components/layout/RootDocument.tsx:292 (TOKEN_FORM_PATHS), :357 (passed as `untagged`); src/components/layout/Analytics.tsx:67-68 (isAdminArea), :137 (`return null`), :157-169 (the two Script tags); src/app/(site)/start/FormClient.tsx:275 (`completionToken` read from `?k=`), :447 (`router.push(residencyUrl)`)
- Evidence: RootDocument keeps `/start` and `/y8vwp4bf7` (and the /de and /ja versions) untagged because their URL carries the personal form token `?k=`. The only effect of `untagged` is that `<Analytics>` renders nothing on those paths. It does not unload or disable gtag.js. The form sends the customer by client-side navigation to the tax-residency page, which is NOT on the untagged list, so there gtag.js is injected (if the visitor has accepted the cookie banner, on this or an earlier visit; consent is stored in localStorage key `ga_consent`). From then on the script stays in the tab. If the customer presses the browser Back button to correct an answer, the URL becomes `/start?k=<token>` again by a history event with gtag.js still live. GA4 enhanced measurement ("page changes based on browser history events", on by default) sends a page_view with the full URL as page_location on history changes. The same applies to any in-tab navigation from a tagged public page into `/crm` or `/complete`.
- Root cause: exclusion is done by not rendering the loader, which only works for a full page load. In a single-page app the loader outlives the page that mounted it.
- Attack prerequisites: none for an attacker to trigger; it is a passive leak. Needs: visitor consent = granted, GA4 history-change page views enabled in the property (not visible in the repository), and a history navigation back onto a token URL. Anyone with read access to the GA property could then see the tokens.
- Impact: the signed completion token from the WhatsApp link (variable `completionToken`) is disclosed to Google Analytics, the exact outcome the comment at Analytics.tsx:23-28 says must never happen. What the token permits is decided in the API unit; I did not review that.
- Recommended fix: when the path is untagged, actively switch measurement off rather than just not rendering: set `window['ga-disable-<measurementId>'] = true` on untagged paths (and false on tagged ones) in an effect keyed on pathname; and/or configure gtag with `send_page_view: false` and send page views manually only for tagged paths with a query-stripped `page_location`. Alternatively strip `k` from the address bar with `history.replaceState` as soon as FormClient has read it.
- Regression test: browser test: accept cookies, open `/start?k=TESTTOKEN`, continue to tax-residency, go Back; assert no request to `google-analytics.com`/`googletagmanager.com` contains `TESTTOKEN`.
- Limits of this verification: static only. I could not see the GA4 property settings, so I cannot confirm that history-change page views are on. I did not run a browser. The return leg after a successful submit uses `formUrl` without the token (FormClient.tsx:330), so that leg does not leak.

### UI-02-F02: "Lock & Exit" ignores the result of the logout request and leaves the page as if it had worked
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-613 (insufficient session expiration), CWE-390 (error detected without action)
- Files and lines: src/components/atlas/AtlasCentre.tsx:174-177
- Evidence: `await fetch('/api/crm/logout', { method: 'POST' }).catch(() => undefined)` then `window.location.replace('/crm')`. A network error is swallowed and a non-2xx response is never checked (`res.ok` is not read). The cookie `crm_session` is httpOnly and is only cleared by that route's response (logout/route.ts:46-52).
- Root cause: the failure path is deliberately silenced and no fallback or message exists.
- Attack prerequisites: the logout request fails (offline, timeout, a 5xx from the route, e.g. if `validateSessionFresh` or `destroySession` throws) on a shared or unattended device.
- Impact: the staff member believes the CRM is locked, but the session cookie is still valid for the rest of its lifetime. Whoever next opens `/crm` on that device is sent straight to Atlas (crm/page.tsx:29-30), with customer data. When the network is simply down the browser shows an error page that looks like "gone", which hides this.
- Recommended fix: check the response; on failure keep the user on the page and show "Could not lock, try again", and do not navigate until the server has confirmed. Retry once.
- Regression test: component test with fetch mocked to reject and to return 500: assert `window.location.replace` is not called and an error is shown.
- Limits of this verification: the comment at AtlasCentre.tsx:173 says the CRM dashboard uses the same code; I did not open DashboardClient (not in this unit), so the same defect may exist there.

### UI-02-F03: The Atlas page sends customer names and last-message previews to the browser that the screen never shows
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-201 (sensitive information in sent data), CWE-1164 (irrelevant code)
- Files and lines: src/components/atlas/AtlasCentre.tsx:154-161, 169-171, 270-278; src/lib/atlas/atlas-view.ts:117-134; src/app/(site)/crm/atlas/page.tsx:19
- Evidence: the server builds `view.panels.crm` (customer name plus `last: <preview>` of the customer's last WhatsApp message) and `view.panels.will` (customer name, task reason) and passes the whole `view` as a prop to a client component, so it is serialised into the page. In AtlasCentre, clicking the CRM or Will module navigates away (`window.location.assign`) and never sets `openKey`, while `panelItems` is only non-null when `openKey` is `crm` or `will`. So the panel data can never be displayed, yet it is delivered on every load of the page.
- Root cause: the panels were replaced by direct navigation and the data was left in the payload.
- Attack prerequisites: a valid CRM session (the page is guarded on the server, atlas/page.tsx:11). Exposure is to the browser's memory, cache and any extension on the staff device, not to the public.
- Impact: unnecessary copies of customer names and message text on staff devices; breaks the stated intent "No contact details" data-minimisation of this screen (atlas-view.ts:31).
- Recommended fix: stop sending `panels` (drop it from `AtlasView`, or pass only what is rendered), or render it. Also remove the unused `modRefs`/`setRef`.
- Regression test: unit test on the page output: the serialised props of AtlasCentre contain no `preview` text and no customer name.
- Limits of this verification: I did not check the response cache headers of the page; it is `force-dynamic`.

### UI-02-F04: The mobile language banner offers links that drop the form token or lead to pages that do not exist
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (link construction); REQUIRES_RUNTIME_VALIDATION (effect on a real submission)
- CWE: n/a (plain broken code, business-logic risk)
- Files and lines: src/components/ui/MobileLanguageBanner.tsx:138-150 (buildLocaleUrl), :91-129 (no path exclusion); src/components/layout/RootDocument.tsx:355 (rendered on every page)
- Evidence: the banner is mounted in the shared document for every route, including the token form (`/start?k=...`) and `/crm`. `buildLocaleUrl` builds the target from `pathname` only, so the query string (`k`, `ref`) is lost. For `de` and `ja` there is no existence check at all (only fr/it/es use `hasLocalePage`), so the link is simply `/de<path>` or `/ja<path>`.
- Root cause: the banner assumes every English path has a German and Japanese twin and that URLs carry no state.
- Attack prerequisites: none; a first-time mobile visitor whose browser language is German or Japanese, on an English URL.
- Impact: (a) a customer who opened the English form from a WhatsApp link and taps "Deutsch"/"日本語" lands on `/de/start` or `/ja/start` without `k`; the form then has an empty `completionToken` (FormClient.tsx:275), so the submission is not tied to the chat. (b) on English-only pages and on `/crm/*` the link is a 404. Comments in the file say German and Japanese visitors are about 40% of paying customers.
- Recommended fix: do not render the banner on `/crm`, `/complete` and the token form paths (reuse TOKEN_FORM_PATHS); keep `window.location.search` when building the link; check that the de/ja page exists before offering it.
- Regression test: unit test of `buildLocaleUrl`: for `/start?k=abc` the result keeps `k`; for `/crm/dashboard` no banner is rendered.
- Limits of this verification: I did not read how the server treats a submission without the token (API unit), nor which language link Will actually sends to German and Japanese customers.

### UI-02-F05: Comments in ResidencyDeclaration describe a control that the code does not have
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: src/components/ui/ResidencyDeclaration.tsx:216-219, :269 versus :247-264
- Evidence: comments say "The client cannot change the choice by hand, and cannot submit until the quiz has produced a status" and "Disabled until the quiz has produced a status". The code lets the customer tick either "Australian tax resident" or "Working holiday maker" freely (comment at :247: "The client picks their status by hand"); nothing from the quiz is consulted here.
- Root cause: stale comments after a design change.
- Attack prerequisites: none.
- Impact: none by itself. A reviewer or developer could wrongly believe the resident status on a submission was derived from the quiz. The status is a self-declaration and must be treated as such by the reviewer and by any automatic pricing or guarantee logic.
- Recommended fix: correct the comments.
- Regression test: n/a.
- Limits of this verification: I did not read the full ResidencyStep (lines 81 onward), so a quiz there may still pre-select a value through another path; ResidencyDeclaration takes no such prop.

## Checked and found sound

- JSON-LD in script tags: every `dangerouslySetInnerHTML` in the unit goes through `jsonLdHtml`, which escapes `<`, `>` and `&` (src/lib/json-ld-html.ts:5-7). Uses: RootDocument.tsx:329-336, JobExpensesPage.tsx:236-239, ExpensesBlocks.tsx:175-178, LocaleCategoryPage.tsx:192-194. No other `dangerouslySetInnerHTML` in the unit. Input is repository content, not user input.
- No `javascript:` or data-built href: all `href` values in the unit are repository constants, `pathname`-derived paths that always start with a fixed `/<locale>` prefix (MobileLanguageBanner.tsx:138-150), or `waUrl()` output, which is a fixed `https://wa.me/...` base with the text passed through `encodeURIComponent` (src/lib/wa.ts:188-200; GuideCta.tsx:332).
- External links use `target="_blank"` with `rel="noopener noreferrer"`: Nav.tsx:381-386, :448; Footer.tsx:276, :310; GuideCta.tsx:347-350.
- Browser storage in the unit holds nothing sensitive: only `wht-lang-banner-seen` (MobileLanguageBanner.tsx:97, 133). The form hand-off, including the TFN and the files, is kept in memory only (src/lib/tax-form-handoff.ts:51-52; read at ResidencyDeclaration.tsx:164).
- No secrets in the unit's client code. The GA measurement ID and the public business contact details in the schema block are public by nature (RootDocument.tsx:91-270).
- Third-party script: Google Analytics is only requested after consent (Analytics.tsx:144-170). Fonts are self-hosted through next/font (RootDocument.tsx:21-87). No other third-party script in the unit.
- Atlas is authorised on the server, not only in the client: `sessionValid()` then redirect (src/app/(site)/crm/atlas/page.tsx:11). Module links are fixed same-origin paths (atlas-view.ts:108-115; AtlasCentre.tsx:156).
- Submission result handling: ResidencyDeclaration shows success only when `submitTaxForm` returns `ok` (ResidencyDeclaration.tsx:203-213); `submitTaxForm` returns `ok` only on an HTTP 2xx from the endpoint and aborts if a required upload failed (submit-tax-form.ts:190-195, 275-276). Server error text is rendered as React text, not HTML (:267).
- WHM confirmation gate: a WHM choice never submits without the confirmation dialog (ResidencyDeclaration.tsx:229-232, 298-302); the submit button is disabled while loading (:270).
- atlas.module.css: no `url()`, no `@import`, no remote resource (whole file).
- Type.tsx, Nav.tsx, Footer.tsx: presentation and fixed link lists only; no data flow from user input beyond `pathname` used for locale detection.

## Open questions

- F01 depends on the GA4 property setting for history-change page views. Someone with GA access should confirm, or test in a browser.
- RootDocument.tsx:306-312 states that CSP nonce mode is off and the static policy allows `'unsafe-inline'` scripts. The policy itself lives in next.config.js / proxy.ts (not in this unit); the INFRA reviewer should rate it. With `'unsafe-inline'`, the CSP gives no second line of defence for any HTML injection elsewhere.
- FormClient.tsx:331 and the test at src/lib/__tests__/round2-frontend-security.test.ts:250 mention a sessionStorage snapshot (`SNAPSHOT_KEY`) of the form's text fields. I did not review what it stores (not in this unit); the comment says the TFN is excluded.
- submit-tax-form.ts re-uploads every file on each retry after a failed final POST, and a POST whose response is lost can be sent twice. Whether the server de-duplicates is for the API/LIB units.
- Whether DashboardClient has the same logout pattern as F02 (see the comment at AtlasCentre.tsx:173).
- `destroySession()` on explicit Lock & Exit revokes every staff session by design (logout/route.ts:27-37). Not a defect of this unit; noted for the auth reviewer.
