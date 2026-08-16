-- ════════════════════════════════════════════════════════════════════════════
-- Migration 014: Form settings — the working-holiday-maker override switch
--
-- By default the tax form does NOT accept a return from anyone who declares
-- themselves a working holiday maker for tax purposes: if they paid the
-- correct 15% and have no significant work-related expenses there is no
-- refund to claim, so the submission would only create work with no outcome.
-- Those clients get an explanation screen instead, and nothing is saved.
--
-- Occasionally that's wrong — someone overpaid, or does have real expenses.
-- For those rare cases, flip allow_whm_submissions ON in the CRM, let the
-- client through, then flip it back OFF. It's a single global switch, read
-- fresh at the moment Submit is pressed, so it takes effect immediately
-- without the client reloading anything.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS form_settings (
  -- Single-row table. The CHECK keeps it that way: there is one set of
  -- settings, and a second row would silently create two sources of truth.
  id                     INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  allow_whm_submissions  BOOLEAN NOT NULL DEFAULT false,
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by             TEXT
);

-- Seed the single row. Default OFF = the block is active.
INSERT INTO form_settings (id, allow_whm_submissions)
VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE form_settings ENABLE ROW LEVEL SECURITY;
-- No policies: written only via the service-role key from the authenticated
-- CRM API route, and read only via the server-side public route. Same pattern
-- as form_funnel_events (migration 012).

-- ════════════════════════════════════════════════════════════════════════════
-- Useful queries:
--
-- Current state:
--   select allow_whm_submissions, updated_at, updated_by from form_settings;
--
-- Turn it on / off by hand if the CRM is unavailable:
--   update form_settings set allow_whm_submissions = true,  updated_at = now() where id = 1;
--   update form_settings set allow_whm_submissions = false, updated_at = now() where id = 1;
--
-- How many people hit the block (last 30 days):
--   select count(*) from form_funnel_events
--   where event_type = 'whm_blocked' and created_at > now() - interval '30 days';
--
-- Blocked, split by language:
--   select lang, count(*) from form_funnel_events
--   where event_type = 'whm_blocked'
--   group by lang order by count(*) desc;
-- ════════════════════════════════════════════════════════════════════════════
