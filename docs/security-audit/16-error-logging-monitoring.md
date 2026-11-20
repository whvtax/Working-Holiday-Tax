# 16. Error handling, logging and monitoring

Sources: API, LIB, WILL, UI, SITE units, TESTS units, DEBATE files. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- The logging and audit helpers were read in full (`src/lib/log-safe.ts`, `src/lib/will/access-log.ts`, `audit-config.ts`, `security-alerts.ts`, `src/lib/security-watch.ts`).
- No log output, audit table or alert email was inspected. Hosting log settings were not seen.

## STATIC ANALYSIS CONCLUSIONS

### Fail-safe and fail-open behaviour

| situation | behaviour as read | assessment |
|---|---|---|
| Kill switch read fails | counts as ON (no automatic sends) | fail-safe |
| Kill switch write | value must be boolean; read back before the audit row | FIXED 18 Nov |
| Model call fails, times out or returns bad output | human task, never a customer-visible error | fail-safe |
| Model key missing in production | human task | fail-safe |
| Vision check fails | "not proof" | fail-safe |
| AI budget counter fails | closed | fail-safe |
| Redis missing at login | 500, login refused | fail-closed |
| Rate limiter without Redis | in-memory counter per instance, bounded | degraded, not open (R038) |
| Storage bucket public | upload refused | fail-closed |
| File store in production | refused | fail-closed |
| Field-encryption key missing | value stored in plain text with a warning | fail-open by rollout plan (R029, open) |
| Session revocation refresh fails | treated as fresh for a short time | fail-open by design (R031, accepted) |
| Store read error | empty result; store write error often ignored | fail-open (R093, open) |
| Follow-up gate read fails | gate lets the send through | accepted (WILL-05-F06) |
| Library sentence set read fails | previous set kept | accepted (R087) |
| Brand read fails in the scheduler | job runs as Working Holiday Tax | R124, open |
| WhatsApp credentials missing | send reported as ok and skipped | R067, open: confirm production variables |
| Idempotency claim release fails | message may be processed again | accepted (R097) |

### Error responses

- Public routes: generic message with a short reference; validation errors list fields only; upload errors echo only the customer-fixable class.
- Staff routes: some return raw error text (up to 200 to 300 characters) to the logged-in owner (accepted, R022). Several GET handlers have no try/catch and return the framework's plain 500.
- CRM error page shows the message behind the session (accepted).
- Interface fixes on 18 Nov: failed calls no longer shown as success in the AI toggle, library sync, chat load, file download, Mia status bar and bulk clear; redirect to login on 401 in polling.

### Logging and audit trail

| record | content | gap |
|---|---|---|
| `will_audit` | actions with actor, IP, device; masked numbers in most rows; login and session events | raw number in `customer_created` rows (R069, open); knowledge edits not audited |
| Access log (`data_read`) | export, media, search, chats, CRM file, leads CSV, clients, and now tasks; throttled per session | expense-PDF details now kept (fixed) |
| `crm_audit` | client delete and return changes | |
| Server logs | `safeErr`: no details, hint or stack; digit runs, emails and row contents masked | phone lookups visible in request URLs of authenticated GETs (accepted, R166) |
| Unmatched form audit row | last four digits only | FIXED |
| WhatsApp credentials saved | ids only, never the token | FIXED (new audit row) |

No finding reports a TFN, bank detail, token or message body written to server logs.

### Monitoring and alerts

- Security emails: new device at login, lockout, bulk export, webhook signature burst, kill switch change, stale cron. The last four are off unless `SECURITY_ALERT_BULK_EXPORT`, `SECURITY_ALERT_SIGNATURE_BURST`, `SECURITY_ALERT_KILL_SWITCH` and `SECURITY_ALERT_CRON_STALE` are set to true (R130, open).
- Health endpoint for staff: channel, templates, counts, persist errors.
- Operational cards: dead-letter task for an inbound message that fails three times; urgent task for stranded outbound rows after 15 minutes; card on a Meta send failure; nightly issue report (display name now sanitised).
- Nightly check of the bank details in settings against the hard-coded values.
- CSP reporting exists as report-only, off by default (R046).
- No external error-tracking or uptime service is configured in the repository.

## HYPOTHESES

- If the alert switches are unset in production, a bulk export from a stolen session would be logged but nobody would be told.

## UNVERIFIED ASSUMPTIONS

- That audit tables are retained long enough for an investigation and are not purged by the nightly cleanup beyond the configured actors.
- That the admin mailbox is monitored.

## NOT TESTED

- No error was provoked. No alert email was triggered. Log content on the hosting platform was not read. A test for "no message text and no full number in webhook failure logs" is proposed (file 18).
