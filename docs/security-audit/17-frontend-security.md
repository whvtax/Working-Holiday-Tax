# 17. Frontend security

Sources: UI-01 to UI-04, SITE-01 to SITE-04, SVTAPP-01, LIB-02, INFRA units, CONTENT units, DEBATE-4. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- All 143 component files and all 76 site and CRM page files in the UI and SITE units were read in full, as were the 53 Student Visa Tax app files.
- No page was loaded in a browser. No header, cookie or script behaviour was observed.

## STATIC ANALYSIS CONCLUSIONS

### Cross-site scripting

- Customer text (messages, captions, names, task reasons, previews) is rendered as React text nodes. No `innerHTML` or `eval` in the dashboards.
- Every `dangerouslySetInnerHTML` in the reviewed files is JSON-LD passed through a helper that escapes `<`, `>` and `&`.
- Article markdown: angle brackets escaped; links limited to internal, https and mailto targets.
- The lodging export and the print frame escape customer values.
- No `href` is built from customer data in the dashboards. External links opened in a new tab carry `rel="noopener noreferrer"`.

### Content Security Policy and headers

- CRM and Atlas: nonce-based policy with `strict-dynamic`, `object-src 'none'`, `frame-ancestors 'none'`.
- Public pages: static policy that allows inline script (needed today); a tighter policy exists as report-only (R046, open). `/atlas` may also receive the static policy (R051, open: check on production).
- Clickjacking: `X-Frame-Options: DENY` and `frame-ancestors 'none'` on all policies.
- Six fixed video iframes on Medicare pages from a privacy-enhanced host, limited by `frame-src` (accepted).

### Cross-site request forgery

- Session cookie is SameSite=Strict. The proxy refuses cross-site state-changing calls to `/api/crm`, `/api/will`, `/api/atlas` and now `/api/mia` (R001 fixed). `/api/will/actions` repeats the check.
- Public forms refuse `Sec-Fetch-Site: cross-site`.
- WhatsApp connect: `postMessage` origin limited to https hosts of the provider.

### Browser storage and tokens in URLs

- No `localStorage`, `sessionStorage` or `document.cookie` use in the dashboards. The tax form never writes the TFN to browser storage; a tab-scoped draft without TFN and files expires after two hours (accepted, SITE-01-F09).
- The form token travels in the page URL (`k`). The analytics loader is not rendered on form pages; whether a history-change page view can still carry it depends on a GA4 setting (R157, open). The residency fix token is sent on a GET (accepted, R166).
- Staff phone lookups go in GET query strings (accepted).

### Authorisation in the browser

- Not client-side only: every route the dashboards call checks the session on the server. Page gates run on the server; the CRM layout itself has no check (accepted, R194, R184).
- Idle timer in the CRM layout is bounded by the 8-hour token (accepted).

### Sensitive data in the browser

- The CRM task list carries TFN and bank details for all listed tasks to the authenticated operator (accepted, SITE-01-F07).
- Lodging download holds TFN and passport number in a file named after the customer (R173, open).
- Atlas view sends panels for modules the screen never opens (accepted: no new party sees them).

### Findings fixed on 18 Nov (interface)

| topic | finding |
|---|---|
| Bulk clear closed every open task and always reported success | UI-01-F01 (R148) |
| Health and polling after session expiry | UI-01-F02 |
| Failed calls shown as success (AI toggle, library sync, chat load); customer id not encoded in a URL | UI-01-F04, UI-01-F08 |
| Mobile language banner dropped the query string | UI-02-F04 |
| Atlas showed only the summary of a proposal, not the fields it executes | UI-03-F01 (R162) |
| Analytics loader on `/atlas` | UI-03-F02 |
| Mia status bar without error handling; Mia expense amount parsing | UI-04-F04, UI-04-F02 |
| Expense PDF state kept across tasks; file download saved an error body | SITE-01-F05, SITE-01-F06 |
| Access token typed into a plain text input | SITE-01-F12 |
| Share buttons and clipboard on article pages; heading anchors with accents | SITE-02-F03, F04, F05 |
| Bank inputs on the super form allowed autofill | SITE-03-F03 |
| A phone-shaped placeholder in a staff screen replaced by a fictional number | SITE-04-F06 |
| Not-found page brand test on subdomain and trailing-dot hosts | SVTAPP-01-F01 |
| Broken badge image path on Student Visa Tax hosts | SVTAPP-01-F05 |

### Open interface items

| topic | rows |
|---|---|
| Banner names controls that were removed | R152 |
| Guarantee warning shows one line for any customer and brand | R153 |
| A 5.0 rating badge on the Student Visa Tax form | R164 |
| Mia expense PDF overwrites the previous one | R170 |
| Amount payable stored as a refund; Done resumes Will | R174, R175 |
| Super form consent text supplied by the browser | R192 |

## HYPOTHESES

- An injected script on a public form page (none was found) would be able to read form fields before submission. The tighter CSP would reduce what it could load and where it could send data.

## UNVERIFIED ASSUMPTIONS

- That the headers written in the configuration are the headers browsers receive in production.
- That consent gating of analytics works as the component reads.

## NOT TESTED

- No browser test, no DOM XSS probe, no CSP violation report, no accessibility or clickjacking check on a live page.
