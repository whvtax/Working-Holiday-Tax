# WhatsApp Coexistence history import: runbook (25 Nov 2026)

Code: src/lib/will/history-import.ts, webhook branch in src/app/api/will/webhook/route.ts,
admin API src/app/api/will/whatsapp/history/route.ts, panel on /will/connect (HistoryPanel.tsx),
migration supabase/migrations/058_will_history_inbox.sql. Tests: src/lib/will/__tests__/history-import-25nov.test.ts,
webhook-history-25nov.test.ts.

## What it does
- Every `history` / `smb_app_state_sync` webhook is saved RAW to will_history_inbox before processing.
- Only messages inside [WILL_HISTORY_IMPORT_FROM_TS, WILL_HISTORY_IMPORT_TO_TS or now] are imported, into
  customers Will already has, as SENT rows (channel 'history') with the original WhatsApp time.
- Duplicates are skipped ONLY by WhatsApp message id (meta.providerId, processed-messages table). The same
  text under a different id is imported and flagged meta.possibleDuplicate (counted in the report), never
  dropped. Imported ids are claimed so a live redelivery is skipped.
- Master switch WILL_HISTORY_IMPORT_ENABLED=true|false (anything but "true" is off). Off: no backup, no import,
  admin actions refuse; live messages, echoes and statuses are unaffected.
- No engine, reply, task, follow-up, payment detection, stage, tag or customer field change. Chat-list
  preview and unread badges are NOT moved by imported rows.
- In-window messages from numbers with no Will customer are stored in full in will_history_unmatched
  (content, direction, original time, raw message); nothing is created. "Import stored messages for contacts
  that now exist" imports them later; "Download stored messages (JSON)" exports them.
- The live path now handles only the `messages` field: Meta's history media webhook (field `history` with a
  top-level `messages` array) no longer reaches the engine.
- Live webhooks keep the 256 KB cap; a body naming the `history` field may be up to 4 MB.
- 40 s time budget per webhook; the rest is finished by "Re-run import from backup".

## Before scanning the QR code
1. Supabase: run 058_will_history_inbox.sql.
2. Vercel env (Production), then redeploy:
   - WILL_HISTORY_IMPORT_FROM_TS = disconnection time minus 1 hour, unix seconds.
   - META_APP_SECRET and META_VERIFY_TOKEN of the NEW Meta app (a wrong secret rejects every webhook).
   - NEXT_PUBLIC_META_APP_ID / NEXT_PUBLIC_META_CONFIG_ID of the new app if /will/connect is used
     (the code defaults are the OLD app).
   - WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_WABA_ID / WHATSAPP_TOKEN for the new connection. The DB settings
     (wa_access_token, wa_phone_number_id) override env: update them via /will/connect (paste token + phone id)
     right after connecting, or the new number's webhooks are treated as "not ours".
   - WILL_MIN_MESSAGE_TS: live path only; must not be in the future.
3. Meta app (new): Webhooks -> WhatsApp Business Account: callback https://workingholidaytax.com.au/api/will/webhook,
   verify token = META_VERIFY_TOKEN; subscribe messages, smb_message_echoes, history, smb_app_state_sync.
4. Open /will/connect and check the panel: "backup table error" must be empty, window shown.

## After connecting (within 24 hours, once only)
1. Update creds in /will/connect if the phone number id / token changed.
2. Click "1. Sync contacts", then "2. Request chat history". Approve "Share all chats" on the phone.
3. Refresh the report until progress 100. Error 2593109 = history sharing declined.
4. If chunks arrived before the window/creds were right: fix, then "Re-run import from backup".
5. Answer the listed contacts with no Will customer by hand.

## Limits (Meta docs, last updated 20 Apr 2026)
- History must be requested by the system (POST /{phone_number_id}/smb_app_data, sync_type history) within
  24 hours of onboarding; each step can be done once; a re-sync needs offboarding and onboarding again.
- Covers messages within 180 days of onboarding; the docs do not explicitly promise the most recent days.
- Media: placeholders only; media details only for the last 14 days (counted, not downloaded).
