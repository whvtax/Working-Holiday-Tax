-- ════════════════════════════════════════════════════════════════════════════
-- Migration 008: WhatsApp knowledge base (Section 8/9 of the role doc —
-- "every question gets asked once")
--
-- Every time the tax agent answers a question the bot didn't know, that
-- Q&A pair lands here. Next time a similar question comes in, the bot
-- checks here FIRST before falling back to "flag for human" — so the
-- number of questions needing a human drops over time instead of staying
-- constant.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS wa_knowledge_base (
  id             BIGSERIAL PRIMARY KEY,
  question_text  TEXT NOT NULL,        -- the client message that triggered this entry (for matching + audit)
  answer_text    TEXT NOT NULL,        -- the tax agent's exact reply — sent VERBATIM next time, never reworded
  times_used     INTEGER NOT NULL DEFAULT 0,   -- how many times this saved answer has been reused
  created_by     TEXT,                 -- who answered it (email/name), for audit
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_wa_kb_created ON wa_knowledge_base (created_at DESC);

ALTER TABLE wa_knowledge_base ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT * FROM wa_knowledge_base ORDER BY created_at DESC LIMIT 20;
-- ════════════════════════════════════════════════════════════════════════════
