-- ════════════════════════════════════════════════════════════════════════════
-- RESET WILL — FRESH START (run ONCE in the Supabase SQL Editor)
--
-- What it does:
--   1. Records every contact currently in Will as "pre-existing", so those
--      people (the ones pulled in by the coexistence history sync) never come
--      back into Will even if they message again.
--   2. Wipes all conversations, messages, tasks and pipeline data.
--   3. KEEPS your message Library (templates), knowledge base and settings.
--
-- After this, Will starts empty and only 100% NEW customers enter.
-- Safe to run more than once.
-- ════════════════════════════════════════════════════════════════════════════

-- Make sure the fresh-start table exists (same as migration 027).
CREATE TABLE IF NOT EXISTS will_known_contacts (
  wa_norm    TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1) Remember the current contacts as pre-existing (block them going forward).
INSERT INTO will_known_contacts (wa_norm)
SELECT DISTINCT regexp_replace(wa_id, '\D', '', 'g')
FROM will_customers
WHERE wa_id IS NOT NULL
  AND length(regexp_replace(wa_id, '\D', '', 'g')) >= 7
ON CONFLICT (wa_norm) DO NOTHING;

-- 2) Wipe all conversation data (Library / knowledge / settings are untouched).
TRUNCATE
  will_messages,
  will_tasks,
  will_state_history,
  will_jobs,
  will_suggestions,
  will_processed_messages,
  will_customers
RESTART IDENTITY CASCADE;

-- Done. Will is now empty; only brand-new numbers will appear from here on.
