-- ════════════════════════════════════════════════════════════════════════════
-- Migration 012: Form funnel tracking
--
-- Lightweight, no-external-dependency event log for form conversion funnels
-- (starting with tax-form's new 2-step wizard). No Google Analytics/GA4
-- needed — this logs directly into Supabase, queryable with plain SQL you
-- already know how to run.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS form_funnel_events (
  id            BIGSERIAL PRIMARY KEY,
  form_name     TEXT NOT NULL,          -- e.g. 'tax-form'
  event_type    TEXT NOT NULL,          -- 'view' | 'step1_complete' | 'submit_success'
  session_id    TEXT NOT NULL,          -- random id generated client-side per form visit
  lang          TEXT,                   -- 'en' | 'de' | 'ja', for language-split analysis
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_funnel_form_event ON form_funnel_events (form_name, event_type);
CREATE INDEX IF NOT EXISTS idx_funnel_session      ON form_funnel_events (session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_created       ON form_funnel_events (created_at DESC);

ALTER TABLE form_funnel_events ENABLE ROW LEVEL SECURITY;
-- No policies added — this table is only ever written to via the service-role
-- key from the server-side API route, and only ever read by you directly in
-- the SQL Editor (which also uses an elevated role). Matches the same
-- pattern already used for wa_system_events.

-- ════════════════════════════════════════════════════════════════════════════
-- Useful queries once this is live:
--
-- Overall funnel counts (last 30 days):
--   select event_type, count(*)
--   from form_funnel_events
--   where form_name = 'tax-form' and created_at > now() - interval '30 days'
--   group by event_type;
--
-- Step-1 → Step-2 → Submit conversion rate:
--   with counts as (
--     select
--       count(*) filter (where event_type = 'view')           as views,
--       count(*) filter (where event_type = 'step1_complete')  as step1,
--       count(*) filter (where event_type = 'submit_success')  as submits
--     from form_funnel_events
--     where form_name = 'tax-form' and created_at > now() - interval '30 days'
--   )
--   select views, step1, submits,
--     round(100.0 * step1 / nullif(views,0), 1)   as pct_view_to_step1,
--     round(100.0 * submits / nullif(step1,0), 1)  as pct_step1_to_submit,
--     round(100.0 * submits / nullif(views,0), 1)  as pct_overall_conversion
--   from counts;
-- ════════════════════════════════════════════════════════════════════════════
