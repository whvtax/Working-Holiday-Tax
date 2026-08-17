-- ════════════════════════════════════════════════════════════════════════════
-- Migration 015: Two-stage intake (form 1 → review → form 2)
--
-- The tax return can now be collected in two passes:
--
--   Form 1  (/start, public)      name, DOB, TFN, WhatsApp, country,
--                                 Medicare y/n, expenses y/n, selfie
--   ↓  you review in the CRM: is myGov already connected, is it worth continuing
--   Form 2  (/complete/<token>)   the remaining fields, then the residency
--                                 declaration and submit
--
-- Both passes write to the SAME crm_tasks row, so once form 2 is in, the record
-- is indistinguishable from a submission made through the original one-shot
-- form at /tax-form — same fields, same download, same everything.
--
-- The original form is untouched and keeps working exactly as before. All three
-- routes run side by side.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

-- Which route the submission came in through: 'tax-form' (the original) or
-- 'start' (form 1). Written server-side from the route itself, never sent by
-- the browser, so it can't be spoofed. Existing rows stay '' and read as the
-- original form.
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT '';

-- The completion link. Random, single-use, and stored on the task itself, so
-- form 2 needs no identification step at all: the token IS the identity. It's
-- cleared the moment form 2 is submitted.
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS completion_token   TEXT;
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS token_expires_at   TIMESTAMPTZ;
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS token_used_at      TIMESTAMPTZ;

-- Set when form 1 arrives with a TFN that already exists on another task.
-- Flags only - never blocks - because the usual cause is a typo, and blocking
-- would send that person to you instead of through the form.
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS possible_duplicate_of TEXT;

-- Token lookup happens on every load of form 2; partial index keeps it tiny
-- since only tasks awaiting completion carry a token.
CREATE UNIQUE INDEX IF NOT EXISTS idx_tasks_completion_token
  ON crm_tasks (completion_token) WHERE completion_token IS NOT NULL;

-- Duplicate detection matches on the TFN with spaces and dashes stripped, so
-- "432 116 890" and "432-116-890" are recognised as the same number. Stored as
-- its own column and indexed: scanning recent rows instead would quietly stop
-- catching duplicates once the table grows.
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS tfn_norm TEXT;
CREATE INDEX IF NOT EXISTS idx_tasks_tfn_norm ON crm_tasks (tfn_norm) WHERE tfn_norm IS NOT NULL;

-- Backfill for rows created before this migration.
UPDATE crm_tasks
SET tfn_norm = regexp_replace(tfn, '[^0-9]', '', 'g')
WHERE tfn <> '' AND tfn_norm IS NULL;

-- ════════════════════════════════════════════════════════════════════════════
-- Useful queries:
--
-- Leads waiting for you to review (form 1 done, form 2 not sent):
--   select id, client_name, country, submitted_at from crm_tasks
--   where task_type = 'lead' and completion_token is null
--   order by submitted_at desc;
--
-- Links sent but not yet completed:
--   select client_name, token_expires_at from crm_tasks
--   where completion_token is not null order by token_expires_at;
--
-- Which route converts better:
--   select source, count(*) filter (where task_type = 'tax-return') as completed,
--          count(*) as total
--   from crm_tasks group by source;
-- ════════════════════════════════════════════════════════════════════════════
