-- ════════════════════════════════════════════════════════════════════════════
-- Migration 058: WhatsApp Coexistence history backup inbox + unmatched messages (25 Nov 2026)
--
-- Meta sends a business's chat history ONCE, as `history` webhooks, after the
-- number is (re)connected with Coexistence. Every such webhook is stored here
-- RAW, before any processing, so nothing is lost if processing fails or the
-- import window was not set yet; "Re-run import from backup" on /will/connect re-runs the
-- import from these rows. Additive only: no existing table is changed.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New Query -> Paste -> Run
-- (BEFORE scanning the QR code / reconnecting the number).
-- ════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS will_history_inbox (
  id            UUID PRIMARY KEY,
  received_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  field         TEXT NOT NULL,              -- history | smb_app_state_sync
  payload       JSONB NOT NULL,             -- the webhook body exactly as Meta sent it
  phase         INTEGER,                    -- 0: day 0-1, 1: day 1-90, 2: day 90-180
  chunk_order   INTEGER,
  progress      INTEGER,                    -- 0-100, 100 = sync complete
  processed_at  TIMESTAMPTZ,
  result        JSONB                       -- counts: received / added / alreadyExisting / failed ...
);

CREATE INDEX IF NOT EXISTS idx_will_history_inbox_received ON will_history_inbox (received_at);
CREATE INDEX IF NOT EXISTS idx_will_history_inbox_unprocessed ON will_history_inbox (processed_at) WHERE processed_at IS NULL;

-- Service-role only, same model as the rest of the CRM.
ALTER TABLE will_history_inbox ENABLE ROW LEVEL SECURITY;

-- ── will_history_unmatched ──────────────────────────────────────────────────
-- In-window history messages from numbers that are NOT Will customers, kept in
-- full (content, direction, time, raw message) so they can be imported later
-- (/will/connect -> "Import stored messages for contacts that now exist").
-- One row per WhatsApp message id: a repeat delivery is ignored.
CREATE TABLE IF NOT EXISTS will_history_unmatched (
  message_id       TEXT PRIMARY KEY,           -- WhatsApp message id (wamid)
  wa_id            TEXT NOT NULL,              -- the contact's WhatsApp number
  phone_number_id  TEXT,                       -- our number it belongs to
  direction        TEXT NOT NULL CHECK (direction IN ('IN','OUT')),
  ts               BIGINT NOT NULL,            -- original WhatsApp time, unix seconds
  body             TEXT,
  type             TEXT NOT NULL DEFAULT '',
  raw              JSONB,                      -- the message exactly as Meta sent it
  received_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  imported_at      TIMESTAMPTZ                 -- set once it is imported into a conversation
);
CREATE INDEX IF NOT EXISTS idx_will_history_unmatched_wa ON will_history_unmatched (wa_id, ts);
CREATE INDEX IF NOT EXISTS idx_will_history_unmatched_pending ON will_history_unmatched (imported_at) WHERE imported_at IS NULL;
ALTER TABLE will_history_unmatched ENABLE ROW LEVEL SECURITY;

-- Verify:
--   SELECT id, received_at, field, phase, chunk_order, progress, processed_at, result
--   FROM will_history_inbox ORDER BY received_at DESC LIMIT 20;
--   SELECT wa_id, count(*), min(to_timestamp(ts)), max(to_timestamp(ts)) FROM will_history_unmatched GROUP BY wa_id;
