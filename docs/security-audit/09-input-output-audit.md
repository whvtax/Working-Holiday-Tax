# 09. Input and output audit

Sources: API-01, API-02, LIB-01, LIB-02, WILL-01 to WILL-07, UI and SITE units, CONTENT and READ units, DEBATE files. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- The validation, sanitising and encoding code was read in full (`src/lib/sanitise.ts`, `validate.ts`, `intake-validate.ts`, `upload.ts`, `csv.ts`, `json-ld-html.ts`, `render-inline.ts`, `log-safe.ts`, `policy-guard.ts`).
- No input was sent to the application. No payload was tried.

## STATIC ANALYSIS CONCLUSIONS

### Input handling

| input | handling read in code | gap |
|---|---|---|
| Public form fields | every field sanitised; email, phone, TFN, date of birth, year and enums validated; arrays capped | loose date accepted from a hand-made POST onto the sender's own record (accepted, LIB-02-F08); a bare "<" is stripped strictly (accepted, LIB-02-F07) |
| Uploads | content-type allowlist, 10 MB, magic bytes against the declared type, HEIF and WebP checks, name reduced to safe characters, random part, no overwrite | HEIC size guard can cost one serverless call on an odd file (accepted) |
| File URLs in a submission | must be in this brand's own folder; traversal, query, fragment, backslash refused | none |
| Webhook body | size cap, JSON parse, sender 6 to 20 digits, per-message isolation | none |
| WhatsApp display name | letters only, 2 to 20 characters before use in a message; stripped of separators in the nightly report | FIXED (WILL-02-F12 row) |
| Customer text into the model prompt | structure characters stripped, capped, fenced as data | first names and numbers of past cases in the prompt text itself (R069, open) |
| Search and lookup strings | ILIKE wildcards escaped; lookup wildcard characters stripped | FIXED (R006) |
| Meta media URLs | https only, no credentials, port 443, no IP literal, Meta suffix for the token; trailing-dot host now normalised | FIXED (WILL-02-F10); redirect following not runtime-tested |
| WhatsApp connect ids | digits only | FIXED |
| Mia expense amounts | thousands separators and decimal comma parsed | FIXED |
| Kill switch value | boolean only, read back | FIXED (R015) |
| Customer words used as object keys (language bridge) | array check before use | FIXED (WILL-07-F02) |
| Staff regular expression from the Library | owner input only, 64 KB cap | accepted (API-01-F11) |

No SQL built by string concatenation, no command execution with request input and no path built from request input was reported in the application code.

### Output handling

| output | handling read in code | gap |
|---|---|---|
| React pages | customer values rendered as text nodes; no `innerHTML` or `eval` in the CRM and dashboard files | none |
| JSON-LD | `<`, `>`, `&` escaped after `JSON.stringify`; every `dangerouslySetInnerHTML` in the reviewed files is JSON-LD through this helper | none |
| Markdown in articles | angle brackets escaped; links limited to internal, https and mailto | none |
| CSV export | formula-leading cells guarded, quotes doubled | none |
| Lodging HTML download | every customer value escaped | file holds TFN and passport number under the customer's name (R173, open) |
| Security emails | HTML escaped | none |
| Template parameters to Meta | newlines stripped, capped | none |
| Error responses | generic body with a short reference on public routes; `safeErr` masks digits, emails and row contents in logs | raw error text shown to the logged-in owner on some CRM routes (accepted) |
| Text and attention exports | names, numbers and long digit runs removed | FIXED for the attention report (R112); JSON format unredacted (R012, open) |
| Redirects | all destinations fixed or same-site | none |

### Outgoing customer messages (policy guard)

- The guard normalises Unicode (NFKC, zero-width and bidi characters, non-ASCII digits) before checks. Widened on 18 Nov.
- Whole-message rules that approved wording cannot bypass: only the business's own bank identifiers, no prompt echo, no internal notes, no unfilled placeholders, no AI self-identification, no agent-status claim, no card-detail request.
- Price list limited to the fixed amounts. Guarantee refused or stripped for ABN, foreign income and already-lodged returns. Missing timestamp fails closed on the 24-hour rule.
- Gaps: some direct system sends and hand-typed replies do not call the guard (R005, R066, open); the partial hand-over reply skips later post-processing (R085, open); bare links on unusual domains and unlabelled numbers can pass (accepted, R088 row); the guarantee bar on the partial answer and the free-advice line were fixed (R083 and the WILL-03-F03 guarantee row).

### Published content

- Files read or pattern-searched contain no raw HTML in strings, no script outside JSON-LD, no event handlers, no `javascript:` or `data:` URLs, no `http://` links, no key or account shapes. External domains are government sites, schema.org, Wikipedia and one privacy-enhanced video host (six iframes, limited by CSP `frame-src`).
- Content risk is accuracy and wording, not injection (section E of file 19).

## HYPOTHESES

- A model reply steered by a customer could contain a link on an odd domain that the guard pattern misses. The debate pass accepted this as needing the model to be steered first.

## UNVERIFIED ASSUMPTIONS

- That the libraries used to parse customer files (`heic-convert`, `pdf-lib`) are safe on hostile input. They were not reviewed (file 11 backlog).

## NOT TESTED

- No XSS, injection, upload-bypass or SSRF attempt was made. The existing negative tests for these (file 18) were not used as evidence.
