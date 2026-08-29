-- ============================================================
-- Drop the six dormant wa_* tables from the pre-Will WhatsApp system.
--
-- ⚠️  RUN THE EXPORT FIRST. scripts/export-legacy-wa.sql selects everything
--     these tables hold. Save that output somewhere you can find it, THEN run
--     this. Dropping is not reversible.
--
-- WHY. WHATSAPP_REMOVAL.md (29 July) left these in place deliberately, and the
-- reasoning was sound at the time: the data "sits dormant and harmless" and
-- dropping it would have destroyed the conversation history, including 111
-- flagged conversations.
--
-- What has changed is not the code, it is the calendar. Two months on, no line
-- in the application touches any of them, verified against all 317 source
-- files: crm_clients resolves to 7 files, will_customers to 3, and each of
-- these to zero. wa_conversations holds a phone number, a first name, a
-- language and a pipeline stage for every lead that ever came through the old
-- system.
--
-- "Dormant and harmless" is true operationally and not true for personal data.
-- Contact details nobody reads, nobody maintains and nobody remembers are pure
-- liability: they cannot help anyone, and they are in every backup, every
-- restore and every future breach. The right end state for a dataset that has
-- served its purpose is exported and gone, not quietly retained.
--
-- Jo's decision, 29 Aug: export, then drop.
-- ============================================================

DROP TABLE IF EXISTS wa_messages CASCADE;         -- migration 007
DROP TABLE IF EXISTS wa_conversations CASCADE;    -- migration 007: phone, first_name, language, stage
DROP TABLE IF EXISTS wa_pending_messages CASCADE; -- migration 009
DROP TABLE IF EXISTS wa_knowledge_base CASCADE;   -- migration 008
DROP TABLE IF EXISTS wa_system_events CASCADE;    -- migration 010
DROP TABLE IF EXISTS wa_system_status CASCADE;    -- migration 011

-- Two more that were created and never read by anything. Neither has ever held
-- a row written by this application: form_settings (migration 014) and
-- will_suggestions (migration 021). suggest.ts computes its suggestions live
-- and does not use the table of that name.
DROP TABLE IF EXISTS form_settings CASCADE;
DROP TABLE IF EXISTS will_suggestions CASCADE;
