# UI-03 report

## Coverage

39 of 39 files read in full, 4,500 lines. No file is over 600 lines. Where a file was printed in two overlapping ranges (tool output limit), the ranges are given.

| file | lines | ranges read | status |
|---|---|---|---|
| src/components/atlas/AtlasAsk.tsx | 208 | 1-208 | REVIEWED |
| src/components/atlas/AtlasPanel.tsx | 74 | 1-74 | REVIEWED |
| src/components/atlas/Globe.tsx | 155 | 1-155 | REVIEWED |
| src/components/blog/newLocaleDefaults.ts | 83 | 1-83 | REVIEWED |
| src/components/crm/LeadsTab.tsx | 183 | 1-140, 138-183 | REVIEWED |
| src/components/crm/Shell.tsx | 174 | 1-174 | REVIEWED |
| src/components/layout/Analytics.tsx | 173 | 1-173 | REVIEWED |
| src/components/layout/Nav.module.css | 128 | 1-128 | REVIEWED |
| src/components/mia/MiaActions.tsx | 65 | 1-65 | REVIEWED |
| src/components/svt/Footer.tsx | 71 | 1-71 | REVIEWED |
| src/components/svt/GuidePage.module.css | 68 | 1-68 | REVIEWED |
| src/components/svt/GuidePage.tsx | 146 | 1-146 | REVIEWED |
| src/components/svt/Header.module.css | 84 | 1-10, 10-84 | REVIEWED |
| src/components/svt/Header.tsx | 103 | 1-103 | REVIEWED |
| src/components/svt/TrustStrip.module.css | 4 | 1-4 | REVIEWED |
| src/components/svt/form-brand-svt.tsx | 186 | 1-186 | REVIEWED |
| src/components/svt/pages/BlogBrowser.tsx | 90 | 1-33, 28-90 | REVIEWED |
| src/components/svt/pages/BlogHub.tsx | 67 | 1-67 | REVIEWED |
| src/components/svt/pages/ContactPage.tsx | 148 | 1-148 | REVIEWED |
| src/components/svt/pages/HomePage.tsx | 101 | 1-101 | REVIEWED |
| src/components/ui/Accordion.tsx | 67 | 1-67 | REVIEWED |
| src/components/ui/FormStepper.tsx | 95 | 1-12, 10-95 | REVIEWED |
| src/components/ui/GoogleRating.tsx | 70 | 1-70 | REVIEWED |
| src/components/ui/GoogleReviews.tsx | 187 | 1-187 | REVIEWED |
| src/components/ui/GoogleReviewsBadge.tsx | 75 | 1-75 | REVIEWED |
| src/components/ui/MobileCta.tsx | 136 | 1-136 | REVIEWED |
| src/components/ui/ResidencyFixPanel.tsx | 99 | 1-99 | REVIEWED |
| src/components/ui/form-brand.tsx | 67 | 1-53, 52-67 | REVIEWED |
| src/components/wht/AboutBlocks.tsx | 126 | 1-126 | REVIEWED |
| src/components/wht/Blocks.tsx | 76 | 1-76 | REVIEWED |
| src/components/wht/BlogBlocks.module.css | 122 | 1-122 | REVIEWED |
| src/components/wht/BlogBlocks.tsx | 97 | 1-97 | REVIEWED |
| src/components/wht/CalculatorBlocks.tsx | 250 | 1-250 | REVIEWED |
| src/components/wht/ContactBlocks.tsx | 116 | 1-116 | REVIEWED |
| src/components/wht/CountryBlocks.tsx | 72 | 1-72 | REVIEWED |
| src/components/wht/JobPageBlocks.tsx | 247 | 1-247 | REVIEWED |
| src/components/will/FreeTextTemplates.tsx | 68 | 1-68 | REVIEWED |
| src/components/will/LinkFormTask.tsx | 120 | 1-120 | REVIEWED |
| src/components/will/MorningReport.tsx | 99 | 1-99 | REVIEWED |

Files outside the unit opened to judge a finding (partial reads only, by grep or line range):
src/lib/svt/jsonld.ts (5-13), src/lib/json-ld-html.ts (all), src/lib/analytics.ts (all), src/components/layout/RootDocument.tsx (9-19, 290-330, 355-363), src/components/svt/SvtDocument.tsx (all), src/lib/atlas/actions.ts (all), src/app/api/atlas/action/route.ts (all), src/lib/atlas/ask.ts (76-98, 140-175), src/app/api/crm/leads/route.ts (62-80 plus grep), src/app/api/mia/form-link/route.ts (grep), src/components/svt/GoogleBadge.tsx (1-47), src/lib/svt/brand-public.ts (grep), next.config.js (60-160, 225-245), layouts under src/app/(site)/ (first 30 lines of four).

## Findings

### UI-03-F01: Atlas approval card shows only the model's own summary, never the action that will run
- Severity: MEDIUM
- Confidence: high (for the display gap); medium (for exploitability)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-451 (UI misrepresentation of critical information), related CWE-345
- Files and lines: src/components/atlas/AtlasAsk.tsx:157-170 (card), :82-91 (approve); src/lib/atlas/actions.ts:24-44, :47-51; src/lib/atlas/ask.ts:100, :168-169; src/app/api/atlas/action/route.ts:16-30
- Evidence: The card renders `item.proposal.summary` only (AtlasAsk.tsx:159). On Approve the whole `proposal` object is posted to `/api/atlas/action` (line 90), where `toWillAction` turns it into `manual_reply` (customerId + body), `set_state` (customerId + state) or `resolve_task` (taskId). `summary` is a free string written by the model (ask.ts:100 "Always give a short plain summary"); `cleanProposal` only trims it and requires it to be non-empty. Nothing ties the summary to `kind`, `customerId`, `body` or `state`, and none of those four fields is shown to the person approving.
- Root cause: Human approval is taken on a model-authored description instead of on the structured fields that are executed.
- Attack prerequisites: The Atlas model reads customer WhatsApp text (tools `get_customer_messages`, `get_customer`, and the 24-hour DATA block). A customer who writes instruction-like text, or a plain model error, can produce a proposal whose summary reads as harmless (for example "close the task") while the fields are a WhatsApp reply with different text, a reply to a different customer, or a stage change. A staff member must click Approve.
- Impact: A WhatsApp message or a stage change the owner never saw goes out under an approved click. `manual_reply` is free text, so wording, price or guarantee statements could reach a customer unreviewed. The audit row records kind and ids but not that the summary differed.
- Recommended fix: Render the executed fields on the card from the structured data, not from the summary: the kind in fixed words, the customer's name (looked up server-side from customerId), the exact reply body in full, the target stage label. Build the visible description on the server from those fields and treat the model's summary as a secondary note or drop it.
- Regression test: Component test: a proposal `{kind:'send_reply', summary:'Close task', customerId:'c1', body:'XYZ'}` must render the text "XYZ" and the customer identity before the Approve button is enabled.
- Limits of this verification: I did not read `/api/will/actions/route.ts` in full, so I cannot say which policy guards apply to `manual_reply` there (grep shows 24-hour-window handling near lines 872-914). Those guards would limit, not remove, the gap. No runtime test.

### UI-03-F02: Analytics exclusion list does not cover the staff address /atlas
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-829 (inclusion of functionality from an untrusted control sphere), CWE-359
- Files and lines: src/components/layout/Analytics.tsx:66-68, :137, :144-170; next.config.js:153-154, :237-238; src/components/layout/RootDocument.tsx:292, :357
- Evidence: `isAdminArea` is true only for paths starting `/crm` or `/complete`, plus the `untagged` list (`/start`, `/y8vwp4bf7` and their /de and /ja forms). The staff command centre is served at `/atlas` and `/atlas/:module` by an afterFiles rewrite to `/crm/atlas`. With the browser path `/atlas`, `isAdminArea` is false, so the cookie banner renders on the staff screen and, when `ga_consent` is `granted` in localStorage (one origin-wide key, so an Accept on the public site in the same browser counts), the gtag loader and inline config run on the Atlas page. `/atlas` gets `crmHeaders`, which equal the public CSP when nonce mode is off (the stated default), so the Google script is not blocked.
- Root cause: The exclusion is a hand-kept deny-list of path prefixes that was not updated when the `/atlas` short address was added. The same design means any future page with a token in its URL is tagged unless someone remembers to add it.
- Attack prerequisites: None from an attacker. A staff browser with analytics consent stored.
- Impact: A third-party script runs inside an authenticated staff page that displays customer names, messages and tasks; staff navigation (`/atlas`, `/atlas/<module>`, page title) is reported to the GA4 property; staff visits pollute acquisition data. No customer id is in those URLs.
- Recommended fix: Add `/atlas` to the admin test in Analytics.tsx. Better, invert the rule: render `<Analytics>` only from public layouts, or have the CRM layout opt out, so new staff or token pages are untagged by default.
- Regression test: Unit test of the path predicate: `/atlas`, `/atlas/tasks`, `/crm`, `/crm/whatsapp`, `/start`, `/de/y8vwp4bf7` all return "untagged"; `/tfn` returns "tagged".
- Limits of this verification: Depends on `usePathname()` returning the browser path `/atlas` rather than the rewrite destination `/crm/atlas`. The component's own comment (line 64-65) says an internal segment "can arrive", so behaviour may differ between server render and client. Needs a check in a browser. I did not confirm whether nonce mode is on in production.

### UI-03-F03: Student Visa Tax form shows a hard-coded "5.0 Google Reviews" badge although SVT has no rating configured
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (cross-brand leak, misleading trust claim)
- Files and lines: src/components/svt/form-brand-svt.tsx:163-164; src/components/ui/GoogleReviewsBadge.tsx:18, :42, :57; src/lib/svt/brand-public.ts:35 (`googleRating: null`); src/app/(site)/start/FormClient.tsx:633 (render point); contrast src/components/svt/GoogleBadge.tsx:19-44
- Evidence: `SVT_FORM_BRAND.reviews` returns `<GoogleReviewsBadge lang="en" />`, whose `RATING` constant is a fixed "5.0" with five stars. SVT's own badge component deliberately shows a score "only when SVT_PUBLIC.googleRating is set (real reviews exist)", and that value is `null`. The form therefore presents the Working Holiday Tax rating (or an unverified figure) as Student Visa Tax's, on the page where identity documents and bank details are collected.
- Root cause: The WHT trust badge was reused for the SVT form ("the two forms look and behave the same") without the brand's own rating gate.
- Attack prerequisites: None.
- Impact: Misleading advertising claim by a tax agent service (consumer law and TPB advertising rules) and a WHT-to-SVT brand leak. Not a technical compromise.
- Recommended fix: In `SVT_FORM_BRAND`, use the SVT `GoogleBadge` (which shows no score while `googleRating` is null), or omit `reviews` until SVT has its own rating.
- Regression test: Render the SVT form provider with `googleRating: null` and assert no element contains a numeric score next to "Google".
- Limits of this verification: I did not confirm which Google profile the 5.0 figure belongs to. `sealSrc` on line 162 also points at the WHT asset folder (`/assets/...`) while the rest of SVT uses `/svt-assets/...`; both files exist, so this is cosmetic.

### UI-03-F04: Raw server error text is rendered in the staff UI
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-209
- Files and lines: src/components/crm/LeadsTab.tsx:49-51; src/app/api/crm/leads/route.ts:70-76; src/components/mia/MiaActions.tsx:14, :32
- Evidence: LeadsTab prints `d.detail` after "Could not load the list." The route sets `detail` to the caught exception's `message` unchanged (database or network error text). MiaActions prints `d.error` (short codes from the route). React escapes both, so this is disclosure, not XSS.
- Root cause: A deliberate debugging choice (route comment: "Surface the real reason").
- Attack prerequisites: A valid CRM session.
- Impact: Table, column, constraint or upstream host names can appear on screen and in screenshots. Staff-only, so limited.
- Recommended fix: Return a fixed set of error codes; keep the raw message in the server log only (already logged through `safeErr`).
- Regression test: Route test forcing a store error asserts the JSON body has no `detail` key or only an allow-listed code.
- Limits of this verification: I did not confirm what messages the store layer can throw.

### UI-03-F05: One-time residency correction token is sent in a GET query string and left in the address bar
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-598
- Files and lines: src/components/ui/ResidencyFixPanel.tsx:30-34, :52-56
- Evidence: The panel reads `k` from `window.location.search` and calls `/api/tax-form/link?k=<token>` with GET, then posts the same token to `/api/tax-form/fix`. The page URL is never cleaned (no `history.replaceState`), so the token stays in the address bar and browser history.
- Root cause: Token validation uses a GET with the secret as a parameter.
- Attack prerequisites: Access to request logs (hosting, CDN, any proxy) or to the customer's browser history, before the link is used.
- Impact: Whoever holds an unused token can change that customer's tax residency answer once. Mitigations present: the token is single-use (state `used`), scoped to purpose `fix`, and these pages are excluded from Google Analytics (RootDocument.tsx:292).
- Recommended fix: Validate with POST and the token in the body; after reading `k`, remove it from the URL with `history.replaceState`.
- Regression test: Component test asserts no fetch URL contains the token value and that `location.search` is empty after mount.
- Limits of this verification: I did not read `/api/tax-form/link` or `/api/tax-form/fix` in full (token lifetime, rate limit and logging are another unit's scope).

### UI-03-F06: Mia "Save message" has no in-flight guard and reports a fixed outcome
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: CWE-799 (double submit)
- Files and lines: src/components/mia/MiaActions.tsx:10-19, :61
- Evidence: The button is disabled only when the text is empty; there is no busy state, so a double click posts `/api/mia/send` twice with the same body. On `ok` the UI always says "Saved. Not sent: the SVT number is not live yet", whatever the server did. The header comment mentions an expense PDF control that the component does not contain.
- Root cause: Minimal component written before the SVT number exists.
- Attack prerequisites: None; operator error.
- Impact: Duplicate saved messages today. Once sending is live, a duplicate customer message and a status line that says "not sent" after a real send.
- Recommended fix: Add a busy flag that disables the button during the request; show the status the server returns.
- Regression test: Two rapid clicks produce one fetch call.
- Limits of this verification: `/api/mia/send` not read; it may already de-duplicate.

## Checked and found sound

- JSON-LD script injection: every `<script type="application/ld+json">` in the unit goes through an escaper that replaces `<`, `>` and `&` (src/lib/svt/jsonld.ts:5-7 used at GuidePage.tsx:63, ContactPage.tsx:126, HomePage.tsx:26; src/lib/json-ld-html.ts:5-7 used at JobPageBlocks.tsx:98-101).
- Other `dangerouslySetInnerHTML`: one, a `<style>` block whose only interpolation is a number-derived duration (GoogleReviews.tsx:134, :138-150). Inline `<style>{...}</style>` blocks hold constants only (FormStepper.tsx:60, GoogleReviewsBadge.tsx:43, ResidencyFixPanel.tsx:70).
- Customer and model text is rendered as React text nodes, never as HTML: AtlasAsk.tsx:156, :159; AtlasPanel.tsx:58-59; MorningReport.tsx:29, :33; LinkFormTask.tsx:100, :111; FreeTextTemplates.tsx:51, :58; LeadsTab.tsx (rows); GoogleReviews.tsx:109, :115.
- `href` values: all come from static content, locale helpers or constants. No `href` is built from user input or API data, except the reviewer photo `src` from the reviews feed, which is an `<img>` with `referrerPolicy="no-referrer"` and an error fallback (GoogleReviews.tsx:102). AtlasPanel `href` (line 66) is supplied by server view code (src/lib/atlas/atlas-view, not read).
- External links opened in a new tab carry `rel="noopener noreferrer"` (GuidePage.tsx:123, MobileCta.tsx:125-126, ContactBlocks.tsx:88, :92, CalculatorBlocks.tsx:188, :245).
- Browser storage: the unit writes one key, `ga_consent`, holding `granted` or `denied` (Analytics.tsx:30, :47, :76). The helper it calls stores `wht_ai_source` (an assistant name) in sessionStorage (src/lib/analytics.ts:47-51). No TFN, bank, identity or token data is stored by any file in the unit; the signed SVT intake link is kept in component state only (MiaActions.tsx:21-31).
- Secrets in client code: none. The only identifiers are the two public GA4 measurement ids, passed per brand so one brand never ships the other's (Analytics.tsx:52-55; RootDocument.tsx:357; SvtDocument.tsx:27).
- Consent: no Google script is requested until the visitor accepts (Analytics.tsx:144, :157). Events sent carry path, language, CTA position, topic and tier only (src/lib/analytics.ts:64-128).
- Token pages are excluded from analytics on both brands: `/start` and `/y8vwp4bf7` in en, de and ja (RootDocument.tsx:292); the whole SVT form tree in en, zh and vi, including the residency step under it (SvtDocument.tsx:9; prefix match at Analytics.tsx:68). No fr, it or es token page exists in src/app.
- Search and API calls encode user input: `encodeURIComponent` at LinkFormTask.tsx:58 and ResidencyFixPanel.tsx:34.
- LinkFormTask asks for confirmation before linking a questionnaire picked from the waiting list, and blocks a second pick while one is running (lines 73-80).
- AtlasAsk enforces the 1000-character limit client-side (line 27, :191) and runs an approval only from the `waiting` state (line 84); a failed approval is not retried automatically (line 93).
- Leads CSV export is a plain same-origin link; cells go through `csvCell` on the server (src/app/api/crm/leads/route.ts:51, by grep).
- Prices on the SVT contact page match the brief in all three languages: $220 TFN, $385 with ABN (ContactPage.tsx:49, :73, :97).
- Brand separation in the shared form: number, languages, paths and wording come from a per-brand provider, and the form throws if rendered without one (form-brand.tsx:54-58).
- No file in this unit handles uploads. form-brand-svt.tsx holds upload labels only (4 MB limit wording, lines 101-102, 132-133); the upload logic is in the form client (another unit).
- CSS files (5) and Globe.tsx, Accordion.tsx, FormStepper.tsx, GoogleRating.tsx, BlogBrowser.tsx, BlogHub.tsx, Blocks.tsx, BlogBlocks.tsx, CountryBlocks.tsx, AboutBlocks.tsx, Header.tsx, Footer.tsx, Shell.tsx, newLocaleDefaults.ts: presentation only, no data sinks.

## Open questions

- Does `usePathname()` report `/atlas` or `/crm/atlas` on the Atlas pages in production? This decides UI-03-F02.
- Which guards does `/api/will/actions` apply to `manual_reply` and `set_state` when called from the Atlas route? This bounds UI-03-F01. Authentication, CSRF and rate limits for every endpoint called from this unit (`/api/atlas/*`, `/api/crm/leads`, `/api/mia/*`, `/api/will/search`, `/api/will/morning`, `/api/tax-form/*`) belong to the API units and were not verified here.
- Whose Google profile does the fixed 5.0 on the form badge describe, and is it still accurate for WHT? (GoogleReviewsBadge.tsx:14-18 says it will not update itself.)
- For another unit: a comment at src/app/api/crm/leads/route.ts:43 contains a full phone-number-shaped example, and src/lib/svt/brand-public.ts:23-24 holds the shared WhatsApp number as a documented placeholder for SVT (`whatsappIsPlaceholder`). Both are outside UI-03; numbers not reproduced here.
- The Atlas approval audit row (src/app/api/atlas/action/route.ts:32-37) omits the reply body and the summary, so a mismatch between the two cannot be reconstructed afterwards.
- Process note: while totalling line counts I wrote one scratch file outside the repository, `/tmp/ui03-cov.txt` (coverage rows only, no repository content beyond file paths). Nothing inside the repository was changed other than this report.
