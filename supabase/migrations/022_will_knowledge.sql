-- ════════════════════════════════════════════════════════════════════════════
-- Migration 022: Will knowledge base (the "brain" that learns from real chats)
--
-- Stores question→answer knowledge mined from your real conversations. Will
-- retrieves the most relevant entries at answer time (RAG) and uses them to
-- inform its reply — so it answers like your best, most patient agent, in a
-- polished professional voice, NOT a copy of anyone's raw wording.
--
-- Run after 021. Supabase Dashboard → SQL Editor → New Query → Paste → Run.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS will_knowledge (
  id          TEXT PRIMARY KEY,
  intent      TEXT NOT NULL DEFAULT '',        -- short label, e.g. "refund timing"
  question    TEXT NOT NULL DEFAULT '',         -- canonical customer question
  examples    JSONB NOT NULL DEFAULT '[]',      -- real phrasings customers used
  answer      TEXT NOT NULL DEFAULT '',         -- the polished, approved-style answer
  keywords    JSONB NOT NULL DEFAULT '[]',      -- for lexical retrieval
  tags        JSONB NOT NULL DEFAULT '[]',
  lang        TEXT NOT NULL DEFAULT 'en',
  weight      INT  NOT NULL DEFAULT 1,          -- recurrence / conversion weight
  status      TEXT NOT NULL DEFAULT 'draft',    -- 'draft' | 'active' | 'archived'
  source      TEXT NOT NULL DEFAULT 'manual',   -- 'mined' | 'manual'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_knowledge_status ON will_knowledge (status);

-- Realtime so the Learning view updates as entries are mined/approved.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE will_knowledge;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Verify:
--   select count(*) from will_knowledge;   -- 0, table exists
