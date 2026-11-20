# 03. Threat model (STRIDE)

Tied to the real entry points in `units/API-01-report.md` and `units/API-02-report.md`. Each line names the control read in code and the open or accepted gap. Rows (Rnnn) and finding ids refer to file 19. Everything is a STATIC ANALYSIS CONCLUSION; nothing was attacked or run.

## Assets

Tax file numbers, bank details, passport images and numbers, dates of birth, addresses, chat history, the WhatsApp access token, the CRM session, the business's reputation with customers and regulators (wording about refunds, guarantee and agent status), and money (fees paid on trust).

## Actors

Anonymous internet user; customer on WhatsApp; holder of a signed form link; staff (one role, full access to both brands); Meta; the model provider; someone with a stolen staff session; someone with database or hosting console access.

## Spoofing

| entry point | threat | control | gap |
|---|---|---|---|
| `POST /api/will/webhook` | forged Meta delivery | HMAC over raw body, constant-time; missing secret rejects | none reported |
| `POST /api/crm/login`, `/verify-otp` | guessing the password or code | PBKDF2 password check, per-IP lockout, 8-digit code bound to a pre-auth cookie, 5 tries | lockout is per IP by design (API-02-F12, accepted) |
| `POST /api/tax-form`, `/api/super-form` | posing as an existing client by typing their email or phone | brand-scoped match, rate limits, staff review | form merged into the existing client record (R007, open); token binding optional until `FORM_TOKEN_ENFORCE=true` (R008, R101, R191, open) |
| `GET /api/will/tick`, `/orphan-sweep` | forged cron call | cron secret or session, constant-time | none reported |
| WhatsApp chat | customer claims to have paid or signed | vision check defaults to "not proof"; staff see the bank account | typed claim moves the stage to Paid (R063, open, owner rule) |

## Tampering

| entry point | threat | control | gap |
|---|---|---|---|
| `POST /api/will/actions` | cross-site request with the staff cookie | SameSite=Strict cookie; guard in proxy and in the route | none reported |
| `/api/mia/*` | same | proxy matcher now includes `/api/mia` | fixed 18 Nov (R001) |
| `POST /api/will/knowledge` | bad entries reaching the model prompt | guard on add, edit, approve; import capped and guarded | fixed 18 Nov (R011); starter import trusted (accepted) |
| `POST /api/tax-form/upload` | hostile file | type allowlist, 10 MB, magic bytes, server-built name, private bucket | none reported |
| Model output | prompt injection through customer text | forced tool call, output validation, policy guard on every reply, customer text fenced | guard not applied to some system sends and hand-typed replies (R005, R066, open) |
| Database rows (jobs, settings) | edited by someone with console access | out of scope for application controls | resend job now checks ownership (WILL-02-F06, fixed) |

## Repudiation

| area | control | gap |
|---|---|---|
| Staff actions | audit rows with actor, IP and device on Will actions; access log for bulk reads | task list read now logged (R021, fixed); knowledge changes not audited (part of API-01-F05) |
| Security alerts | email on new device, bulk export, signature burst, kill switch | alerts are off unless four environment variables are set (R130, open) |

## Information disclosure

| entry point | threat | control | gap |
|---|---|---|---|
| `crm_tasks` at rest | database read exposes TFN and bank details | AES-256-GCM field sealing | active only when `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` are set; old rows need the script (R029, open) |
| Postgres via anonymous key | direct table or function access | RLS on with no policies; app never ships the anonymous key | `will_ai_usage` RLS and grant revokes only in migration 049, marked not applied (R048, open) |
| `GET /api/crm/tasks`, export, attention report | bulk personal data to a stolen session | session, access log, redacted text export | lodging download with TFN under the customer's name (R173, open); JSON export unredacted (R012, open) |
| Model provider | chat text, attachments | first name only, structure stripped | raw text sent (R074, accepted); attachments of paused or opted-out chats (R064, open) |
| Google Analytics | form token in page URL | loader not rendered on form pages | history-change page views depend on a GA4 setting (R157, open) |
| Source and prompt text | customer names and numbers in comments, prompt, tests | private repository | R069, R127, R203 (open) |

## Denial of service

| entry point | threat | control | gap |
|---|---|---|---|
| Webhook | flood | 40 per sender and 400 global per 15 min; global overflow returned to Meta for retry | fixed 18 Nov (R004) |
| Public forms and upload | flood, large bodies | per-IP and per-person limits, 120 MB byte budget | rate limits fall back to per-instance memory if Redis lacks `EXPIRE NX` (R038, open) |
| Model spend | customer-driven calls | daily AI budget, atomic counter | payment-proof check runs before the note limiter (accepted, owner rule) |
| Login | lockout of the owner | per-IP counters, no global counter | accepted |

## Elevation of privilege

| area | threat | control | gap |
|---|---|---|---|
| Login | pre-auth cookie used as a session | separate cookie names and formats | no behavioural test (proposed, file 18) |
| Model output | model sets recipient or state | recipient fixed by code; state must be in the list; confidence floor; invalid stage jumps held as conflict tasks | none reported |
| Brands | crossing between Working Holiday Tax and Student Visa Tax | brand from Host or receiving number; transmit-point brand check | CRM actions run under the default brand (R016, open, before SVT launch); failed brand read falls back to WHT (R124, open) |
| Atlas | proposal executes more than the staff member is shown | proposals limited to three kinds; executed fields now shown | fixed 18 Nov (R162) |

## HYPOTHESES

- An attacker with a stolen staff session has full access to both brands' data. There is one role and no per-record authorisation. This is the design, not a finding.

## UNVERIFIED ASSUMPTIONS

- The hosting edge sets the client IP headers; the storage bucket is private; secrets are only in the hosting environment.

## NOT TESTED

- No threat above was exercised. Rate limits, lockout and signature checks were read, not triggered.
