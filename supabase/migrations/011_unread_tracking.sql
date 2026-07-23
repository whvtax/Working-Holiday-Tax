-- ════════════════════════════════════════════════════════════════════════════
-- Migration 011: Unread tracking for the WhatsApp CRM board
--
-- Adds last_read_at to wa_conversations. A conversation is "unread" when
-- last_inbound_at is newer than last_read_at (or last_read_at is null and
-- at least one inbound message exists). Marked as read whenever the tax
-- agent opens that conversation's thread in the CRM.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE wa_conversations
  ADD COLUMN IF NOT EXISTS last_read_at TIMESTAMPTZ;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT id, phone, last_inbound_at, last_read_at FROM wa_conversations LIMIT 20;
-- ════════════════════════════════════════════════════════════════════════════
