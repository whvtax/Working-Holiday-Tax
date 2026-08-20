-- ════════════════════════════════════════════════════════════════════════════
-- Atomic inbound idempotency (RACE-01 / REL-02 / WILL-WH-01 / COST-02)
--
-- Replaces the non-atomic getSetting/setSetting('wa_msg:<id>') dedupe (a
-- check-then-act TOCTOU that let two concurrent deliveries of the same Meta
-- message id both process). A UNIQUE primary key makes the claim atomic: the
-- first INSERT wins, a duplicate INSERT fails and is treated as "already seen".
-- Also gives dedupe markers a dedicated table with a created_at so they can be
-- purged (COST-02: they used to accumulate forever in will_settings).
-- ════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS will_processed_messages (
  meta_id    TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_processed_created ON will_processed_messages (created_at);
