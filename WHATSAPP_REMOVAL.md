# WhatsApp automation removed (29 July 2026)

## What was removed (backend automation only)
DELETED:
- src/app/api/whatsapp/              (Meta webhook receiver)
- src/app/api/crm/whatsapp/          (CRM send/pending/messages/register-number routes)
- src/app/api/cron/wa-health/        (the 30-min health check that emailed the alerts)
- src/app/api/cron/wa-reminders/     (hourly follow-up sender)
- src/app/crm/whatsapp/              (CRM WhatsApp Leads page)
- src/lib/whatsapp.ts, wa-store.ts, ai-reply-draft.ts, ai-personalize.ts,
  knowledge-base.ts, abn-classifier.ts, residency-classifier.ts, translate.ts
  (all were used exclusively by the WhatsApp bot)

EDITED:
- vercel.json — both cron jobs removed (no more scheduled runs, no more alert emails)
- src/app/api/{tax,tfn,abn,super}-form/route.ts — WhatsApp linking calls removed.
  The forms themselves are untouched and keep working exactly as before.
- src/app/crm/dashboard + partners — "WhatsApp Leads" nav entry removed
- src/lib/upload.ts — stale comment reference cleaned

## What was deliberately KEPT
- All 36 public pages with "message us on WhatsApp" buttons (wa.me links) — your lead
  channel is untouched. Clients still message you; there is simply no automation behind it.
- WA_NUMBER / WA_URL in src/lib/constants.ts
- All Supabase tables and data (migrations 006/007/008 left in place). Deleting migration
  files would not drop tables, and dropping them would destroy your conversation history,
  including the 111 flagged conversations. The data sits dormant and harmless.

## Environment variables you can now delete in Vercel
WHATSAPP_APP_SECRET, WHATSAPP_WEBHOOK_VERIFY_TOKEN, WA_HEALTH_ALERTS_DISABLED, CRON_SECRET
(RESEND_API_KEY must STAY — it sends your CRM login codes.)

## Also worth doing in Meta
Remove the webhook subscription in the Meta app so Meta stops posting to a URL that no
longer exists.

## Reversible
Everything deleted is in WHATSAPP_REMOVED_BACKUP.zip (original vercel.json and the original
form routes included as *.orig).

## Verified
tsc --noEmit clean · eslint clean on all edited files · no dangling imports · forms intact
