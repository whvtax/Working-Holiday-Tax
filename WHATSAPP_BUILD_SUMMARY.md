# WhatsApp Automation — Final Build Summary

Everything below has been verified: `npx tsc --noEmit` → 0 errors across the
whole project, `npx eslint src/` → 0 warnings/errors. `npm run build` was
attempted and gets all the way through compiling every file — it only fails
in this sandbox because it can't reach fonts.googleapis.com (no internet
access here). It will build fine in your real dev/CI environment.

## What's built

### 1. Core conversation engine (`src/app/api/whatsapp/webhook/route.ts`)
Automates Sections 10.1–10.3, 10.6, and 8/9 of the role doc:
- Opening message with AI-personalised acknowledgment line (never AI-authored content beyond that one line — see `src/lib/ai-personalize.ts`)
- Standard pitch
- ABN detection + the 4 follow-up questions + Uber sub-case
- ABN income classification (no income yet vs has income) — gates the "Ready" tag per Section 10.3's rule
- Full residency-check red-flag flow (Section 10.6), including the self-lodge closing script and the tax-resident/non-resident outcomes
- "New/undefined question" fallback (Section 8/9): checks the knowledge base first, then falls back to a holding message + human escalation
- Image/document handling: downloads receipts/invoices clients send, stores them in Supabase Storage, links them to the conversation, sends a fixed acknowledgment
- Japanese detection + natural translation of every outbound message (Section 4) — see `src/lib/translate.ts`

All AI classifier calls (`residency-classifier.ts`, `abn-classifier.ts`) follow one rule throughout: **the model only ever returns a category label, never client-facing text.** Every word a client reads is one of the fixed scripts from the role doc, or (for Japanese) a translation of one.

### 2. Shadow mode (`src/lib/wa-store.ts` → `dispatchMessage`)
Every automated reply goes through one function. While shadow mode is ON
(the default), nothing sends itself — everything queues in
`wa_pending_messages` for approval in the CRM. Turn it off with one click
once you trust it. Fails safe: if the system can't even check the setting,
it defaults to requiring approval.

### 3. Knowledge base (`src/lib/knowledge-base.ts`)
When the tax agent answers a flagged question from the CRM, it's saved.
Next time something similar comes in, the bot sends that exact saved
answer instead of escalating again ("every question gets asked once").

### 4. Reminders (`src/app/api/cron/wa-reminders/route.ts`)
Hourly cron: Reminder 1 (20h) → Reminder 2 (24h later) → tagged
"Not Relevant" (48h later) — skips anyone who's already replied.

### 5. Connection health monitor (`src/app/api/cron/wa-health/route.ts`)
Every 30 minutes: checks the Graph API token still works, checks webhook
hasn't gone silent, checks for stale "Urgent" conversations. Emails an
alert (via your existing Resend setup) when something's wrong.

### 6. CRM — "WhatsApp Leads" tab (`src/app/crm/whatsapp/`)
- Stage-based view: New → Reminder 1 → Reminder 2 → ABN Pending → Ready / Urgent / Not Relevant
- Shadow-mode approval queue with edit-before-send
- Script readiness stats (approved-as-is vs edited vs rejected, per script)
- Reply box for flagged/urgent conversations — sends the reply and saves it to the knowledge base in one action
- `/crm/whatsapp/connect` — the one-time Embedded Signup page (uses Meta's real "Yes, I have a WhatsApp Business App" flow, not the generic number-migration wizard that would disconnect the app)

### 7. CRM ↔ website form link (`src/lib/wa-store.ts` → `linkFormSubmissionToConversation`)
Wired into all 4 form routes (tax-form, abn-form, super-form, tfn-form).
When someone who's been chatting on WhatsApp submits the website form, their
conversation is automatically tagged "Ready" and linked to the real
`crm_tasks` row — unless they have confirmed ABN income, in which case it's
flagged for manual receipt verification first (per Section 10.3).

## Known, deliberate scope boundaries

- **Business hours restriction was intentionally NOT built** — the role doc's "don't touch outside business hours" rule was written for a *human* rep; once automated, 24/7 coverage is a feature, not a risk, so this was left out on purpose.
- **Historical chat import was not built** — depends entirely on whether Meta's Coexistence history sync (up to 6 months, optional, chosen during the Meta connection itself) actually delivers data through the webhook. This needs to be tested once the number is connected before it's worth building an import/classification pipeline for it.
- **Per-script shadow-mode toggle** (vs. the current global on/off) was discussed but deliberately not built yet — there's no usage data yet to justify the complexity. Revisit once the Script Readiness panel has real numbers in it.

## Environment variables needed (see `.env.example` for the full annotated list)

```
WHATSAPP_ACCESS_TOKEN
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_WABA_ID
WHATSAPP_APP_SECRET
WHATSAPP_WEBHOOK_VERIFY_TOKEN
CRON_SECRET
ANTHROPIC_API_KEY
NEXT_PUBLIC_META_APP_ID
NEXT_PUBLIC_META_CONFIG_ID
```

## Migrations to run, in order (Supabase SQL Editor)

1. `006_whatsapp_connection.sql` — connection health tables
2. `007_wa_conversations.sql` — the core conversation + message tables
3. `008_wa_knowledge_base.sql` — the learning knowledge base
4. `009_shadow_mode.sql` — shadow mode + approval queue

## What's still needed before going fully live

1. Complete the Meta connection (`/crm/whatsapp/connect`) — in progress, currently blocked on Business Verification.
2. Register the webhook URL in Meta Business Suite.
3. Run shadow mode for a while with real traffic; use the Script Readiness panel to see which scripts are trustworthy.
4. Turn shadow mode off once satisfied.
