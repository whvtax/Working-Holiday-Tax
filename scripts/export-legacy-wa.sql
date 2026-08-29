-- ============================================================
-- Export everything the legacy wa_* tables hold, before migration 035 drops
-- them.
--
-- HOW TO RUN: paste into the Supabase SQL editor, run each block, and download
-- each result as CSV. Keep the files somewhere outside the database. Only then
-- run supabase/migrations/035_drop_legacy_wa_tables.sql.
--
-- The counts at the bottom are the check: run them BEFORE the export and again
-- after saving the CSVs, and confirm the row counts match what you downloaded.
-- ============================================================

-- 1. The conversations. This is the one that matters: it carries the phone
--    number, first name, language and pipeline stage of every lead that came
--    through the pre-Will system, including the 111 flagged ones.
SELECT * FROM wa_conversations ORDER BY created_at;

-- 2. The messages in those conversations.
SELECT * FROM wa_messages ORDER BY created_at;

-- 3. Replies that were drafted and never sent.
SELECT * FROM wa_pending_messages ORDER BY created_at;

-- 4. The old knowledge base. Worth a read before it goes: it may contain
--    answers worth adding to the current Library.
SELECT * FROM wa_knowledge_base;

-- 5 and 6. Operational logs. Almost certainly not worth keeping, exported for
--    completeness so the decision is yours rather than mine.
SELECT * FROM wa_system_events ORDER BY created_at;
SELECT * FROM wa_system_status;

-- ── The check ───────────────────────────────────────────────────────────────
SELECT 'wa_conversations'    AS table_name, count(*) FROM wa_conversations
UNION ALL SELECT 'wa_messages',         count(*) FROM wa_messages
UNION ALL SELECT 'wa_pending_messages', count(*) FROM wa_pending_messages
UNION ALL SELECT 'wa_knowledge_base',   count(*) FROM wa_knowledge_base
UNION ALL SELECT 'wa_system_events',    count(*) FROM wa_system_events
UNION ALL SELECT 'wa_system_status',    count(*) FROM wa_system_status;
