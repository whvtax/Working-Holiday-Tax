# SITE-03 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(site)/3cw5w5hcx/FormClient.tsx | 387 | 1-291, 292-387 | REVIEWED |
| src/app/(site)/blog/BlogClient.tsx | 374 | 1-374 | REVIEWED |
| src/app/(site)/blog/[slug]/CategoryHero.tsx | 317 | 1-317 | REVIEWED |
| src/app/(site)/blog/[slug]/StickyBreadcrumbs.tsx | 91 | 1-91 | REVIEWED |
| src/app/(site)/blog/category/[slug]/page.tsx | 315 | 1-315 | REVIEWED |
| src/app/(site)/expenses/cleaners/page.tsx | 343 | 1-343 | REVIEWED |
| src/app/(site)/expenses/construction/page.tsx | 305 | 1-305 | REVIEWED |
| src/app/(site)/expenses/farm-work/page.tsx | 291 | 1-291 | REVIEWED |
| src/app/(site)/expenses/fifo/page.tsx | 297 | 1-297 | REVIEWED |
| src/app/(site)/expenses/page.tsx | 408 | 1-408 | REVIEWED |
| src/app/(site)/german-working-holiday-tax/page.tsx | 336 | 1-336 | REVIEWED |
| src/app/(site)/link-after-payment/page.tsx | 7 | 1-7 | REVIEWED |
| src/app/(site)/medicare/page.tsx | 351 | 1-351 | REVIEWED |
| src/app/(site)/rh84sez58/FormClient.tsx | 417 | 1-367, 368-417 | REVIEWED |
| src/app/(site)/uk-working-holiday-tax/page.tsx | 343 | 1-343 | REVIEWED |
| src/app/(site)/vukjw4byf/FormClient.tsx | 416 | 1-395, 396-416 | REVIEWED |

16 of 16 files, 4,998 of 4,998 lines. No file is over 600 lines; two ranges are listed for the three form clients only because the first print was cut by the tool and the tail was printed separately.

Files outside the unit that were opened to judge a finding (not counted as coverage):

- src/proxy.ts (1-127, in full, as the task asked)
- src/app/api/super-form/route.ts (1-138, in full); src/app/api/abn-form/route.ts and src/app/api/tfn-form/route.ts by `diff` against it only
- src/lib/validate.ts (1-66), src/lib/intake-validate.ts (1-115), src/lib/public-form-guard.ts (1-21), src/lib/json-ld-html.ts (1-7), src/lib/compress-image.ts (1-127), src/components/ui/LinkAfterPayment.tsx (1-51), config/form-paths.js (1-28)
- page.tsx and layout.tsx of the three form folders (in full)
- src/lib/db.ts 141-186 and 227-263 only; src/lib/will/form-link.ts 106-166 and 335-392 only; src/lib/sanitise.ts and src/lib/upload.ts by `grep` only; src/app/api/tax-form/route.ts by `grep` only

This unit contains no CRM or admin page. All 16 files are public pages or public client components.

## Findings

### SITE-03-F01: TFN, ABN and super forms carry no proof of who is submitting, and the server merges the submission into an existing client by email or phone alone

- Severity: MEDIUM
- Confidence: medium
- Status: STRONGLY_SUSPECTED
- CWE: CWE-306 (missing authentication for a critical function), CWE-639
- Files and lines:
  - src/app/(site)/rh84sez58/FormClient.tsx:164-183 (super form builds the body, including `bankDetails` at 174, and posts to `/api/super-form`)
  - src/app/(site)/3cw5w5hcx/FormClient.tsx:152-167 (posts to `/api/abn-form`)
  - src/app/(site)/vukjw4byf/FormClient.tsx:157-179 (posts to `/api/tfn-form`)
  - src/app/api/super-form/route.ts:73-75, 93-124 (outside unit; same lines in the abn and tfn routes per `diff`)
  - src/lib/db.ts:141-186 (outside unit, `findExistingClient`)
- Evidence: None of the three form clients reads a token from the URL or sends one. The body is only what the visitor typed. The route calls `findExistingClient(email, whatsapp)`, which matches `crm_clients` and open `crm_tasks` by email OR by WhatsApp number (case-insensitive `ilike`), and reuses that client's id for the new task, adding a "Returning client" note. The tax-return route does have a signed token (`verifyFormToken`, src/app/api/tax-form/route.ts:17, 44-60); these three routes have no equivalent.
- Root cause: A phone number or an email address is treated as identity. The forms have no shared secret with the WhatsApp chat.
- Attack prerequisites: Knowing a real customer's email or WhatsApp number. No account, no payment, no token. The form URL is public (see F04) and the API can be called directly.
- Impact: An outsider can attach a super (DASP) application to a real customer's record with the outsider's own bank name, account holder, account number and BSB, plus a passport selfie of their choosing. The same applies to a TFN or ABN application in the customer's name. Whether money is actually redirected depends on what staff do with a "returning client" task, which I could not see from the code. The comment at src/lib/will/form-link.ts:144-158 shows the owners already know about the phone-match weakness for the questionnaire; it does not cover the bank-detail case.
- Recommended fix: Send the same signed, single-use completion token that the tax form uses in the links to these three forms, have the client forward it, and take the customer id from the token. Without a valid token, create the task as a new unlinked client and do not mark it "returning". Never show bank details from an unverified submission as belonging to an existing client.
- Regression test: POST `/api/super-form` with an existing client's email, a different phone number and no token; assert the new task does not carry the existing `client_id` and has no "Returning client" note.
- Limits of this verification: Static only. I read `findExistingClient` to line 186, not the rest of db.ts, and did not read how the CRM displays or acts on these tasks. The API routes belong to another unit.

### SITE-03-F02: Most checks on the three forms exist only in the browser; consent text is written by the client

- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-602 (client-side enforcement of server-side security)
- Files and lines:
  - src/app/(site)/3cw5w5hcx/FormClient.tsx:124-145 (validate), 159-160 (consent strings)
  - src/app/(site)/rh84sez58/FormClient.tsx:130-157 (validate), 174 (bank details joined into one string), 176 (terms sent under the name `declared`), 295-301 (bank fields with no `maxLength`)
  - src/app/(site)/vukjw4byf/FormClient.tsx:128-150 (validate), 171-172 (consent strings)
  - src/app/api/super-form/route.ts:48, 61-72, 104, 118 (outside unit)
- Evidence: The browser requires every field, the passport selfie, the declaration tick and the terms tick. The server requires only name, email and phone (route line 48) and format-checks only email, phone, TFN, date of birth and marital status when present (61-72). A direct POST is accepted with no TFN, no bank details, no passport number, no selfie (I did not confirm what `uploadFiles([null])` returns), no declaration and no acceptance of the Client Agreement. The acceptance wording itself is a string the browser sends (`'✓ I have read and accept …'`); the server stores whatever arrives in `declared` and `terms`, or nothing. On the super form the four bank fields are joined into one string in the browser and the server truncates it at 500 characters (`sanitiseField` default) without checking BSB or account number format; bank holder, account, BSB and both address fields have no `maxLength` in the browser. The Australian phone field is "required" but not format-checked on either side.
- Root cause: Validation was written in the client components first; the server-side layer added later covers five shared fields only.
- Attack prerequisites: None. A direct POST.
- Impact: CRM tasks with no recorded consent and no identity document; a consent record that proves nothing because the client authored it; junk or silently truncated bank details in a DASP application. No direct data exposure.
- Recommended fix: Per route, require the fields that service needs and the selfie. Send `declared` and `terms` as booleans, reject when false, and have the server write the consent text and its version. Send BSB and account number as separate fields and validate them (BSB six digits).
- Regression test: POST each route with only name, email and phone; expect 400 naming the missing fields. POST with `terms` absent; expect 400.
- Limits of this verification: I did not read `uploadFiles` beyond a `grep`, so the behaviour with a null file is unverified.

### SITE-03-F03: Identity and bank data stay in the browser after submission, and the bank fields can be saved by browser autofill

- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-524, CWE-359
- Files and lines:
  - src/app/(site)/rh84sez58/FormClient.tsx:294-302 (`bankHolder`, `bankAccount`, `bankBsb` inputs have no `autoComplete="off"`; TFN, passport and super member number do), 184-185 and 196-232 (success view keeps all state)
  - src/app/(site)/3cw5w5hcx/FormClient.tsx:65, 168-169, 180-216
  - src/app/(site)/vukjw4byf/FormClient.tsx:65, 180-181, 192-228
- Evidence: After a successful POST the component only sets `submitted`. The TFN, passport number, bank account number, the selfie `File` and its `blob:` preview URL remain in React state until the tab is closed. `URL.revokeObjectURL` is called only when the user removes the file (line 67-70 / 68-72), never on submit or unmount. The three bank inputs are plain text inputs without `autoComplete="off"`, so a browser may offer the account number to the next person who uses that device.
- Root cause: No clean-up step after submit; autocomplete attributes applied to some sensitive fields and not others.
- Attack prerequisites: Physical or later access to the same browser, which is realistic for this customer group (hostel and shared computers).
- Impact: A later user of the device can be offered a previous customer's bank account number and BSB; the passport selfie stays addressable in the tab.
- Recommended fix: On success clear every sensitive state value and revoke the preview URL (also in an unmount effect). Add `autoComplete="off"` to the bank holder, account and BSB inputs.
- Regression test: Component test: after a mocked 200 response, assert TFN, bank and file state are empty and `URL.revokeObjectURL` was called.
- Limits of this verification: Browser autofill behaviour differs by browser and was not tested.

### SITE-03-F04: "This link opens after payment" is not enforced; the form addresses are published and the API needs no token

- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-656 (reliance on security through obscurity)
- Files and lines:
  - src/app/(site)/link-after-payment/page.tsx:1-7 and src/components/ui/LinkAfterPayment.tsx:13-19 (the promise made to the customer)
  - src/components/layout/PublicShellClient.tsx:34-36 (outside unit: the three slugs, in six languages, inside a client bundle every visitor downloads)
  - src/app/(site)/3cw5w5hcx/page.tsx:10-18, 23, 33-41 and the same lines in the rh84sez58 and vukjw4byf page files (outside unit: canonical, hreflang, Open Graph URL and BreadcrumbList JSON-LD all print the slug)
  - config/form-paths.js:16-23 (outside unit)
- Evidence: The retired form links lead to a page saying the form link is sent on WhatsApp once payment is confirmed. The live forms sit at random-looking paths, but those paths are in the public JavaScript bundle and in each page's own metadata, and the three form clients post to fixed, guessable API routes that accept a submission from anyone. Nothing checks payment.
- Root cause: The payment gate is a hidden URL, not a check.
- Attack prerequisites: None.
- Impact: Anyone can submit TFN, ABN and super applications without paying, which creates staff work and is the entry point for F01. No confidentiality impact by itself.
- Recommended fix: Same token as F01: the form link carries a signed token issued after payment and the route refuses, or parks as unverified, a submission without one. Remove canonical, hreflang, Open Graph and JSON-LD from the form pages; they are `noindex` and gain nothing from them.
- Regression test: POST to each of the three routes without a token; assert the result is refused or stored as unverified and never linked to a paying customer.
- Limits of this verification: I did not read next.config.js redirects or the robots file beyond a `grep`.

### SITE-03-F05: Wording presents the business as the party that deals with the ATO; no registration number is shown on these pages

- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines:
  - src/app/(site)/expenses/page.tsx:116
  - src/app/(site)/medicare/page.tsx:227
  - src/app/(site)/german-working-holiday-tax/page.tsx:101, 241
  - src/app/(site)/uk-working-holiday-tax/page.tsx:111, 246
  - src/app/(site)/vukjw4byf/page.tsx:8 (outside unit: "before we lodge it")
- Evidence: None of the 16 files says the business is a registered tax agent. Every page that mentions the point says the return is "reviewed and signed off by a registered tax agent before it is lodged with the ATO" (for example expenses/page.tsx:72, medicare/page.tsx:263 and 290, german:328, uk:335, and the four job pages at line 72 or 73). The lines listed above go further and say "We deal with the ATO directly", and the Service JSON-LD names the business as provider (medicare:165, german:202, uk:207). No tax agent name or registration number appears in these files.
- Root cause: Marketing copy.
- Attack prerequisites: n/a
- Impact: Compliance wording risk only, for the owner to judge against the tax agent services rules. Not a technical vulnerability.
- Recommended fix: Have the registered agent confirm the "we deal with the ATO directly" lines, or reword them to say who lodges.
- Regression test: A content test that fails on "we are a registered tax agent" style phrases and lists every "deal with the ATO directly" line for review.
- Limits of this verification: I did not read the `#business` JSON-LD node or the footer, which live in other units and may carry the agent's registration details.

## Checked and found sound

- JSON-LD injection: every `dangerouslySetInnerHTML` in the unit goes through `jsonLdHtml`, which escapes `<`, `>` and `&` (src/lib/json-ld-html.ts:5-7). Used at blog/category/[slug]/page.tsx:225-227, medicare/page.tsx:191-194, german-working-holiday-tax/page.tsx:221-224, uk-working-holiday-tax/page.tsx:226-229. All inputs are static module data; the category slug is looked up with `getCategoryBySlug` and `notFound()` is called when absent (category page:165-166).
- XSS: no other `dangerouslySetInnerHTML`, no `innerHTML`, no `eval` in the 16 files. User input is rendered only as React text (file name at FormClient:89/90, first name on the success view). The server's `data.message` is shown with `alert()` only (3cw5w5hcx:173, rh84sez58:189, vukjw4byf:185).
- Tokens in URLs: none of the 16 files reads `location`, `searchParams`, cookies, `localStorage` or `sessionStorage`. link-after-payment takes no parameter.
- Upload handling, client side: size is checked after compression against `MAX_UPLOAD_BYTES` (4 MB) before the POST; `accept` is a hint only. The server re-checks type, size, file name length and magic bytes (src/lib/upload.ts, seen by `grep` only).
- Server-side validation exists for email, phone, TFN and date of birth (src/lib/intake-validate.ts:69-115), with per-IP and per-person rate limits and a byte budget (super-form route:30-39, 53-56). Cross-site browser posts are refused (public-form-guard.ts:19-21).
- External links opened with `target="_blank"` carry `rel="noopener noreferrer"` (form clients: success view and terms links).
- Guarantee wording: every guarantee sentence in the unit limits it to "returns with TFN income only" (cleaners:72, construction:72, farm-work:72, fifo:71, expenses:71, medicare:288, german:327, uk:334). No price appears in any of the 16 files.
- Cross-brand: all 16 files are Working Holiday Tax only; no Student Visa Tax text, links or API calls.
- Form pages are `noindex` (page files line 30; layout files).
- src/proxy.ts: per-request CSP nonce from `crypto.randomUUID()` for /crm and /atlas (86, 107-113); cross-site state-changing calls to /api/crm, /api/will and /api/atlas are refused (61-65). The proxy does NOT check a session and is not meant to; see Open questions.

## Open questions

1. src/proxy.ts performs no session check for /crm or /atlas (lines 54-115). A server-side session check before render must therefore exist in the CRM layout or pages. No CRM page is in this unit, so I could not confirm it. The header comment at proxy.ts:9-10 also contradicts itself ("OFF by default" then "ON by default"); the code at line 25 is ON by default.
2. How does the CRM show a "Returning client" super task to staff, and is the bank detail in it ever used without a call-back to the customer? This decides whether F01 is MEDIUM or HIGH.
3. The passport number, super member number and home address are written into `crm_tasks.notes` in plain text (super-form route:113-117) while TFN and bank details are sealed (db.ts:243-244). For the API or LIB unit to judge.
4. What does `uploadFiles([null], …)` do when no file is posted? Not read.
5. PublicShellClient.tsx:34-36 lists /fr, /it and /es versions of the three form paths, but the form pages' hreflang lists only de and ja. I did not check whether those pages exist.
6. Dates and rates in the content pages (for example the age-35 change for German passports "from 1 July 2026", german:85-86) were not checked against a source; no network use was allowed.
