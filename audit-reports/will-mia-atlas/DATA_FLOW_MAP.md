# Data flow map: WILL MIA ATLAS

Names of fields only. No customer values are recorded here.

| Flow | From | To | Data | Protection in code | Notes |
|---|---|---|---|---|---|
| Customer WhatsApp message | Meta | `/api/will/webhook` | phone (wa_id), message text, media id | HMAC signature; idempotent on message id | Logged to Will audit with masked identifiers |
| Reply draft | Will engine | Claude API | conversation text, brand rules | Server-side only | Model output is text, no tool access |
| Outbound message | Will engine | Meta Graph API | phone, text | Fixed host; token from env | Mia drafts are saved as `PENDING_APPROVAL` and not sent |
| Form submission (tax, ABN, TFN, super) | Customer browser | `/api/tax-form*` | name, contact, tax details, files | Signed form token; upload type and size checks | Files go to private storage |
| File upload | Customer browser | Supabase Storage (`uploads`) | document images, PDFs | Runtime check that bucket is private | Reference URL stored; read only via `/api/crm/file` |
| Owner reads a file | Owner browser | `/api/crm/file` | document bytes | CRM session; service role on server | Access logged via `recordDataRead` |
| Owner login | Owner browser | `/api/crm/login` → email | OTP code (email), hash stored | OTP attempts limited; lockout per IP | Security alert email after failures |
| Atlas question | Owner browser | Claude API | question text, morning report summary | Session required; history cleaned and length-limited | No customer identifiers are needed by design; the report summary may contain names and is sent to the model |
| Mia export (expense PDF) | Owner browser | `/api/crm/expense-pdf` | income and expense rows for one customer | Session required | PDF is saved to the private uploads bucket at an internal path (`saveCategoryPdf`), readable only via `/api/crm/file` |
| Logs | Server | Vercel logs | errors, masked identifiers | Log-safe helpers in `src/lib/log-safe.ts` | Retention of Vercel logs NOT VERIFIED |
| Audit trail | Server | Will audit table | action, actor, ids | Owner-readable only through CRM | Retention policy NOT VERIFIED |

## Points to watch
- Atlas sends a report summary to the model provider. Owners should know this, and the summary should stay free of unnecessary personal detail. This is a privacy review item, not a defect.
- Anything written to Vercel logs is retained by the platform. The code avoids logging phone numbers and addresses in the paths reviewed.
