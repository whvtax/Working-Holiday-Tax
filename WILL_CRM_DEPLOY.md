# Will × CRM — what was integrated & how to deploy

Will (the WhatsApp assistant) now lives inside your CRM as a native tab, reusing
your login and your Supabase database. This is the merged repo. Nothing in your
existing tabs, routes, or tables was changed — only new files were added, plus two
small, fail-safe edits (a sidebar button, and a cheaper auto-refresh).

## What was added

- **Tab:** a "WhatsApp" button in the CRM sidebar → `/crm/whatsapp`, which loads
  Will's screens (Pipeline, Inbox, Learning, Library, Reports, System & Costs).
  The page is behind the same `crm_session` gate as the rest of `/crm`.
- **Code:** `src/lib/will/*` (engine, scheduler, policy guard, playbook, stores),
  `src/components/will/*` (the UI), `src/app/api/will/*` (API), all namespaced so
  nothing collides with the CRM.
- **Database:** `supabase/migrations/021_will_tables.sql` — the `will_*` tables
  (this is the real-database implementation of Will's data; the JSON-file store
  is now only the local-dev fallback).
- **Auth:** every Will API route requires a valid CRM session (`src/lib/will/auth.ts`).
  The webhook is public but HMAC-verified; the tick accepts the cron secret.

## The two integrations you asked for

**1. Automatic questionnaire flow.** After payment Will already sends the form
link. When the customer submits, `/api/tax-form` writes a `crm_tasks` row; the
migration's trigger matches it to the Will customer by phone and enqueues a
`FORM_RECEIVED` job. On the next tick Will moves them to *Form complete*, stops
the form chasers, and sends a "we've received your questionnaire" confirmation in
the customer's language (English/German/Japanese/Spanish/French/Italian/Portuguese;
English fallback). All messaging stays in the app, behind the policy guard.

**2. No more constant polling.** Both dashboards now poll a tiny change-token and
only reload the heavy data when something actually changed:
`/api/will/version` for Will, `/api/crm/version` for the CRM. Idle load drops to
near-zero. (On any error they fall back to a full reload, so nothing gets staler
than before.)

## Deploy steps

1. **Run the migration.** Supabase Dashboard → SQL Editor → paste
   `supabase/migrations/021_will_tables.sql` → Run. Creates the `will_*` tables,
   the form-completion trigger, and the realtime publication entries.
2. **Set env vars** (Vercel → Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — already set; Will
     auto-selects the Supabase store when both are present.
   - `ANTHROPIC_API_KEY` — optional. Without it Will runs the deterministic mock
     brain (safe, no live model). With it, replies are model-generated.
   - `CLAUDE_MODEL` — optional (defaults to a Sonnet model).
   - `CRON_SECRET` — set one; Vercel sends it as `Authorization: Bearer …` to the
     scheduled tick, and the tick rejects anything else.
   - `RESEND_API_KEY` — already set (your CRM login codes).
3. **Deploy.** `vercel.json` now has a cron hitting `/api/will/tick` every 5
   minutes — that's what drives follow-ups, auto-close and the questionnaire
   confirmation in production.
4. **Seed the Library once.** Log in to the CRM, then POST `/api/will/seed`
   (e.g. from the browser console: `fetch('/api/will/seed',{method:'POST'})`).
   It fills the message templates from the approved corpus; it's idempotent.
5. **Set the bank details** used in the price message: they live in the
   `will_settings` row `bank_details` (`{ "bsb": "...", "account": "..." }`), which
   you can set from the System panel or directly in Supabase.

## Test before going live (important)

Will has never run against a real WhatsApp number. Before pointing the production
number at it:

- Point the **WhatsApp test number** webhook at `/api/will/webhook` and send a few
  messages; confirm they appear in the Inbox and the state advances.
- Submit a test questionnaire with a matching phone and confirm the customer flips
  to *Form complete* and gets the confirmation on the next tick (≤5 min, or hit
  the tick manually).
- Only then switch the production number over.

## Notes / honest limits

- **Realtime option:** the change-token approach was chosen over browser Supabase
  Realtime because your CRM uses a custom session (not Supabase Auth), so a browser
  Realtime subscription would need the anon key and risk exposing `will_*` data.
  The token poll gives the same "update on change" behaviour while staying behind
  your login. True push can be added later via a server-driven Realtime broadcast
  if you want zero polling.
- **CRM auto-refresh:** the token catches new leads, new clients, done-toggles and
  review-status changes across sessions. A reviewer-note-only edit in another
  session is the one case it won't catch until the next real change; the local
  session that made the edit sees it immediately.
- **Localized form link:** the form link is auto-sent; wiring the per-language URL
  (`/de/tax-form`, `/ja/tax-form`) is a small follow-up if you want it.
- The sandbox build only fails on Google Fonts (no network); it builds on Vercel.
