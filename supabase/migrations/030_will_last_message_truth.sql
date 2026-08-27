-- ════════════════════════════════════════════════════════════════════════════
-- 030 — The chat-list preview must be a message the customer actually got
--
-- WHY THIS EXISTS
--   addMessage() wrote last_message_preview / last_message_direction /
--   last_message_at for EVERY row it inserted, whatever the message's status.
--   Will's drafts are inserted as PENDING_APPROVAL (approval mode) or QUEUED
--   (the held-back autopilot reply), so the moment Will wrote something the
--   chat list started showing it as that conversation's last message — before
--   anyone had approved it, and permanently if the owner discarded it, the
--   policy guard blocked it, or it was simply never approved.
--
--   The list was therefore telling the owner that a customer had received
--   something the customer never received. That is a correctness bug, not a
--   cosmetic one: it is the screen he scans to decide who still needs an answer.
--
--   The code fix is in store-supabase.ts / store-file.ts (only status='SENT'
--   sets the preview, and refreshLastMessage() re-derives it on every status
--   change). This migration repairs the rows already carrying a draft.
--
-- WHAT IT DOES
--   Recomputes the three columns from the newest genuinely-delivered message —
--   inbound from the customer, or outbound that WhatsApp accepted. Both are
--   stored as status='SENT'. Customers with no delivered message at all are
--   cleared to NULL rather than left holding a draft.
--
--   last_customer_msg_at, unread and unread_count are NOT touched: they were
--   always derived from inbound messages only and were never wrong.
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

UPDATE will_customers c
SET last_message_preview   = LEFT(m.body, 80),
    last_message_direction = m.direction,
    last_message_at        = m.created_at
FROM (
  SELECT DISTINCT ON (customer_id) customer_id, body, direction, created_at
  FROM will_messages
  WHERE status = 'SENT'
  ORDER BY customer_id, created_at DESC
) m
WHERE c.id = m.customer_id
  AND (c.last_message_preview   IS DISTINCT FROM LEFT(m.body, 80)
    OR c.last_message_direction IS DISTINCT FROM m.direction
    OR c.last_message_at        IS DISTINCT FROM m.created_at);

-- A conversation whose ONLY outbound message is an unapproved draft has no
-- delivered message to fall back to; it must show nothing rather than the draft.
UPDATE will_customers c
SET last_message_preview   = NULL,
    last_message_direction = NULL,
    last_message_at        = NULL
WHERE c.last_message_preview IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM will_messages m
    WHERE m.customer_id = c.id AND m.status = 'SENT'
  );
