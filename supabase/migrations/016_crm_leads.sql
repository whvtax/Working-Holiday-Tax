-- ════════════════════════════════════════════════════════════════════════════
-- Migration 016: crm_leads — the marketing list
--
-- Deliberately a separate table, not a view over crm_tasks.
--
-- Tasks get marked done, archived, or hard-deleted (deleteTaskPermanent runs a
-- real DELETE), and markTaskDone strips fields on the way. A list derived from
-- them would quietly lose people. This table is written alongside every
-- submission and is never touched by any of that.
--
-- Holds only what a mailing list needs: name and email. No TFN, no documents,
-- no tax details.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS crm_leads (
  -- Email is the identity: one person, one row, however many forms they fill.
  email         TEXT PRIMARY KEY,
  full_name     TEXT NOT NULL DEFAULT '',
  -- 'tax-form' (the original), 'start' (form 1), 'complete' (form 2), 'backfill'
  source        TEXT NOT NULL DEFAULT '',
  country       TEXT NOT NULL DEFAULT '',
  lang          TEXT NOT NULL DEFAULT 'en',
  -- Set when someone opts out. Rows are never deleted on unsubscribe: a deleted
  -- row would be re-added by their next submission and they'd be mailed again.
  unsubscribed  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created  ON crm_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_active   ON crm_leads (unsubscribed) WHERE unsubscribed = false;

ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
-- No policies: written by the service-role key from the submission routes,
-- read by the authenticated CRM route only.

-- ── One-off backfill of everyone already in the system ─────────────────────
-- Runs over tasks first, then clients, so the most recent name wins. Tasks
-- already marked done are included: markTaskDone clears the address and TFN
-- but leaves name and email intact.

INSERT INTO crm_leads (email, full_name, source, country, created_at)
SELECT DISTINCT ON (lower(trim(email)))
  lower(trim(email)),
  coalesce(client_name, ''),
  'backfill',
  coalesce(country, ''),
  coalesce(submitted_at, now())
FROM crm_tasks
WHERE email IS NOT NULL
  AND trim(email) <> ''
  AND email LIKE '%@%'
ORDER BY lower(trim(email)), submitted_at DESC
ON CONFLICT (email) DO NOTHING;

INSERT INTO crm_leads (email, full_name, source, country, created_at)
SELECT DISTINCT ON (lower(trim(email)))
  lower(trim(email)),
  coalesce(full_name, ''),
  'backfill',
  coalesce(country, ''),
  coalesce(created_at, now())
FROM crm_clients
WHERE email IS NOT NULL
  AND trim(email) <> ''
  AND email LIKE '%@%'
ORDER BY lower(trim(email)), created_at DESC
ON CONFLICT (email) DO NOTHING;


-- ── Automatic capture, via trigger ─────────────────────────────────────────
-- Done in the database rather than in the API routes for two reasons:
--
--  1. It catches every route at once - the original /tax-form, form 1 and
--     form 2 - without a line of application code, so /tax-form stays exactly
--     as it is.
--  2. It can't be forgotten. Any future form that writes a task is covered
--     automatically.
--
-- Fires on insert and on update, because form 1 creates the task without an
-- email and form 2 fills it in later.

CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL
     AND trim(NEW.email) <> ''
     AND NEW.email LIKE '%@%'
  THEN
    INSERT INTO crm_leads (email, full_name, source, country, created_at, updated_at)
    VALUES (
      lower(trim(NEW.email)),
      coalesce(NEW.client_name, ''),
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      coalesce(NEW.country, ''),
      coalesce(NEW.submitted_at, now()),
      now()
    )
    ON CONFLICT (email) DO UPDATE SET
      -- Refresh the name and country only when the new value isn't blank, so a
      -- later partial write can't wipe good data.
      full_name  = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE crm_leads.full_name END,
      country    = CASE WHEN coalesce(NEW.country, '')     <> '' THEN NEW.country     ELSE crm_leads.country   END,
      updated_at = now();
      -- unsubscribed is deliberately untouched: submitting again must not
      -- opt someone back in.
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_crm_capture_lead ON crm_tasks;
CREATE TRIGGER trg_crm_capture_lead
  AFTER INSERT OR UPDATE OF email, client_name, country ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION crm_capture_lead();

-- ════════════════════════════════════════════════════════════════════════════
-- Useful queries:
--
-- How many are on the list:
--   select count(*) from crm_leads where unsubscribed = false;
--
-- Where they came from:
--   select source, count(*) from crm_leads group by source order by 2 desc;
--
-- Remove someone by hand:
--   update crm_leads set unsubscribed = true, updated_at = now()
--   where email = 'someone@example.com';
-- ════════════════════════════════════════════════════════════════════════════
