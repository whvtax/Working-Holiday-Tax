-- ════════════════════════════════════════════════════════════════════════════
-- WhatsApp-style most-recent-first ordering for Will's chat list.
--
-- A conversation should jump to the top of the list on ANY new message, incoming
-- OR outgoing — exactly like the WhatsApp app. `last_customer_msg_at` only tracks
-- inbound, so a reply the owner sends would not re-sort. This column is stamped
-- on every message in either direction and is what the chat list sorts by.
--
-- Backfill: seed existing rows from the best timestamp we already have so the
-- ordering is sensible immediately, without waiting for the next message.
-- ════════════════════════════════════════════════════════════════════════════
ALTER TABLE will_customers
  ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ;

UPDATE will_customers
  SET last_message_at = COALESCE(last_customer_msg_at, state_changed_at, created_at)
  WHERE last_message_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_will_customers_last_message_at
  ON will_customers (last_message_at DESC);
