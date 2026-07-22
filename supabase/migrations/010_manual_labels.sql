-- ════════════════════════════════════════════════════════════════════════════
-- Migration 010: Manual labels
--
-- Separate from the automated `stage` pipeline entirely — these are just
-- folders the tax agent sorts clients into by hand (mirrors the labels
-- already used in the WhatsApp Business App). No bot logic reads or writes
-- this column today; it's a pure organisational tool, with room to wire up
-- automation later if wanted.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE wa_conversations
  ADD COLUMN IF NOT EXISTS manual_label TEXT;
  -- e.g. 'medicare' | 'signature_payment' | 'done_2026' — see
  -- MANUAL_LABELS in WhatsappClient.tsx for the current list. Free text on
  -- purpose so new labels can be added in the UI without another migration.

CREATE INDEX IF NOT EXISTS idx_wa_conv_manual_label ON wa_conversations(manual_label) WHERE manual_label IS NOT NULL;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT id, phone, stage, manual_label FROM wa_conversations WHERE manual_label IS NOT NULL;
-- ════════════════════════════════════════════════════════════════════════════
