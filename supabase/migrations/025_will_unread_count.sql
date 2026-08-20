-- ════════════════════════════════════════════════════════════════════════════
-- WhatsApp-style unread badge for Will's chat list.
--
-- The UI shows a green dot + a count of unread inbound messages per customer,
-- exactly like the WhatsApp app. `unread` (boolean) already existed; this adds
-- the numeric counter it renders. Incremented on every inbound message and
-- reset to 0 when the owner opens the chat (markCustomerRead).
--
-- Backfill: existing rows that are currently unread start at 1 so nothing that
-- was already flagged loses its badge.
-- ════════════════════════════════════════════════════════════════════════════
ALTER TABLE will_customers
  ADD COLUMN IF NOT EXISTS unread_count INTEGER NOT NULL DEFAULT 0;

UPDATE will_customers
  SET unread_count = 1
  WHERE unread = true AND unread_count = 0;
