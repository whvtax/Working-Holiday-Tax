-- ════════════════════════════════════════════════════════════════════════════
-- Migration 009: Shadow mode — approve every message before it sends
--
-- While shadow_mode is ON (the default — start cautious), the bot never
-- sends anything on its own. Every reply it WANTS to send gets queued here
-- instead, and shows up in the CRM for you to approve, edit, or reject.
-- Once you trust it, flip shadow_mode off (one row, one column) and it
-- starts sending automatically — exactly like flicking a switch, no code
-- changes needed.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE wa_system_status
  ADD COLUMN IF NOT EXISTS shadow_mode BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS wa_pending_messages (
  id               BIGSERIAL PRIMARY KEY,
  conversation_id  TEXT NOT NULL REFERENCES wa_conversations(id) ON DELETE CASCADE,
  phone            TEXT NOT NULL,
  proposed_text    TEXT NOT NULL,       -- what the bot wants to send
  script_key       TEXT,                -- which script this maps to, e.g. '10.2_standard_pitch'
  next_stage_json  JSONB,               -- { stage, extra } to apply once approved & sent — keeps the
                                         -- conversation's stage from advancing before the message
                                         -- actually goes out
  status           TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  final_text       TEXT,                -- what actually got sent, if edited before approval
  reviewed_by      TEXT,
  reviewed_at      TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_pending_status  ON wa_pending_messages (status);
CREATE INDEX IF NOT EXISTS idx_wa_pending_created ON wa_pending_messages (created_at);

ALTER TABLE wa_pending_messages ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT shadow_mode FROM wa_system_status WHERE id = 1;
--   SELECT * FROM wa_pending_messages WHERE status = 'pending' ORDER BY created_at;
--
-- To turn shadow mode OFF once you trust it:
--   UPDATE wa_system_status SET shadow_mode = false WHERE id = 1;
-- ════════════════════════════════════════════════════════════════════════════
