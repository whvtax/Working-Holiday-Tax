# 14. Data flow analysis

Sources: API, LIB, WILL, SITE, UI and INFRA units and the DEBATE files. Everything here is a STATIC ANALYSIS CONCLUSION from reading code. No data was traced at runtime. Rows (Rnnn) refer to file 19.

## Sensitive data classes

| class | examples | enters through |
|---|---|---|
| Identity | name, date of birth, address, passport number, passport selfie | tax form, super form, uploads |
| Tax and bank | TFN, bank details (holder, BSB, account) | tax form, super form; refund details sometimes in chat (R137) |
| Contact | email, WhatsApp number | forms, WhatsApp |
| Conversation | message text, images, documents, voice notes | WhatsApp webhook |
| Staff | password, one-time code, session | CRM login |
| System | WhatsApp access token, API keys | environment, settings table |

## Flow 1: tax form

1. Browser collects the form. The TFN is kept in memory only, never in browser storage; a tab-scoped draft without TFN and files lasts two hours.
2. Files go to `/api/tax-form/upload`, are validated and written to the private bucket under a brand prefix.
3. `/api/tax-form` sanitises and validates, optionally verifies the signed token, finds or creates the client (brand scoped), and inserts a `crm_tasks` row. TFN and bank details are sealed when keys are set (R029). Passport number, date of birth and address are stored unsealed.
4. A database trigger and `form-link.ts` link the task to a chat and queue the confirmation. The audit row for an unmatched form now keeps the last four digits only.
5. Staff read the task in the CRM (`/api/crm/tasks` returns TFN and bank details decrypted; the read is now logged). Documents are fetched through `/api/crm/file`.
6. Staff may download a lodging HTML file that contains TFN and passport number, named after the customer (R173).
7. Mark Done blanks TFN, bank details and address and deletes the stored files. Archive without Done leaves the files (R020). The orphan sweep deletes unreferenced uploads only if `ORPHAN_UPLOAD_DELETE=true`.

## Flow 2: WhatsApp conversation

1. Meta posts to the webhook. Signature, size and id checks run before parsing.
2. The message is stored in `will_messages`. The full number is the customer key; audit rows mask numbers in most places (R069 for the rest).
3. Attachments are downloaded from Meta with the server token (Meta hosts only) and may be sent to the model for a description or a payment-proof check, including for paused, legacy or opted-out chats (R064).
4. The model receives up to 60 turns of raw chat text, the cleaned first name, the playbook and matching knowledge entries. No unit reported CRM task fields (TFN, bank details, file URLs) reaching the model context; this was not proved, and a test to pin it is proposed (file 18).
5. The reply passes the guard and is sent, drafted or turned into a task. Outbound text is stored.
6. Customer deletion removes the main rows but not audit, AI usage or per-customer settings (R095).

## Flow 3: staff tools

- Atlas: staff question and replayed history now pass redaction before the model call; lookups omit the phone number and cap list sizes. Redaction catches long digit runs and one TFN-shaped pattern; names, addresses and dates are not removed (accepted, R037, R105).
- Expense PDF: invoices from a task are sent to the model for extraction on a staff click; the PDF is stored in an internal folder.
- Exports: text formats are redacted; the JSON format is not (R012); the attention report is now redacted (R112). Exports are logged and can raise an alert if the switch is on (R130).

## Where sensitive data rests

| store | data | protection as read |
|---|---|---|
| `crm_tasks` | TFN, bank details, identity fields, file URLs | RLS with no policies; field sealing for two columns when enabled |
| `crm_clients` | contact details, return history | RLS |
| `will_messages`, `will_customers` | chat text, numbers, names | RLS after 028 |
| `will_audit`, `crm_audit` | actions, previews, some full numbers | RLS |
| `will_settings` | WhatsApp token in clear text, switches | RLS (R070 accepted) |
| Storage `uploads` | passports, bank statements, invoices, PDFs | private bucket asserted by the app |
| Redis | hashed one-time code, counters, hashed rate-limit keys | not inspected |
| Staff device | lodging downloads, CSV, exports | outside the application (R173) |

## Data leaving the system

| destination | data | basis in code |
|---|---|---|
| Meta | outbound messages, template parameters | customer's own chat |
| Model provider | chat text, attachments, staff questions, invoices | R074 accepted; R064 open |
| Email provider | one-time code, alerts (escaped, no customer data by design) | staff only |
| Google Analytics | path, language, placement; no form values | consent-gated; token-in-URL risk depends on a GA4 setting (R157) |
| Google reviews API | none outbound beyond the request | fixed host |
| Logs on the hosting platform | masked errors; phone lookups appear in request URLs of authenticated GETs (accepted, R166) | first-party |

## Personal data inside the repository (location and type only)

- Customer first names with phone numbers in the model prompt text, in code comments under `src/lib/will` and in test comments and titles (R069, R127, R203, open).
- Synthetic demo records in `.data/store.json`; public review names in `marketing/` (accepted).

## HYPOTHESES

- The provider-side retention of chat text and attachments depends on the provider agreement, which was not seen.

## UNVERIFIED ASSUMPTIONS

- That Mark Done really deletes the files in production storage (the code path was read; deletion was not observed).
- That hosting logs are not exported to a third party.

## NOT TESTED

- No record was followed through a running system. Retention periods and actual deletion were not observed.
