-- ════════════════════════════════════════════════════════════════════════════
-- 031 — Stored post-mortems for leads that never became paying clients
--
-- WHY THIS EXISTS
--   The Lost Leads report reads one conversation per lost lead and asks the
--   model why it did not convert. That is a paid call of several seconds per
--   lead. Doing it on demand would mean an eighty-second page load and a fresh
--   bill every time the owner opened the tab — and a different answer each
--   time, so a finding he read yesterday could not be found again today.
--
--   So it is computed ONCE per lead by the nightly LOST_ANALYSIS job
--   (src/lib/will/lost-analysis.ts) and stored here. The dashboard and
--   /api/will/lost only ever READ this table.
--
-- WHAT IS IN IT
--   One row per customer, keyed by customer_id, so re-running the job is
--   idempotent: an upsert replaces the row rather than accumulating duplicates.
--
--   status = 'OK'    → analysed; the analysis columns are populated.
--   status = 'ERROR' → the attempt failed (no API key, timeout, the model
--                      returned something unusable). `error` says which, and
--                      `attempts` bounds the retrying: the job retries an ERROR
--                      row while attempts < 3, then leaves it alone and shows
--                      it to the owner as "could not be analysed" rather than
--                      spending on it forever.
--
--   The columns mirror src/lib/will/lost-leads.ts exactly. `category` is a
--   closed list there and is what the aggregate view counts, which is why it is
--   a plain column and not buried in JSON.
--
-- WHAT IS DELIBERATELY *NOT* IN IT
--   Nothing here is ever sent to a customer. There is no draft column, no
--   message id, no template. It is a report for the owner and nothing else.
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS will_lost_analysis (
  customer_id       TEXT PRIMARY KEY,
  -- The row is a snapshot: it records the lead as it was when analysed, so the
  -- report still reads correctly if the customer later reactivates.
  state             TEXT NOT NULL DEFAULT '',
  -- 'declined' | 'opted_out' | 'auto_closed' | 'silent' (lost-leads.ts)
  trigger_kind      TEXT NOT NULL DEFAULT '',
  quiet_days        INT  NOT NULL DEFAULT 0,
  -- Hours between the price landing and their last word; NULL when no price was
  -- ever sent. 0 means they read the number and never typed again.
  hours_price_to_silence  DOUBLE PRECISION,

  status            TEXT NOT NULL DEFAULT 'OK',   -- 'OK' | 'ERROR'
  error             TEXT,
  attempts          INT  NOT NULL DEFAULT 1,

  reason            TEXT NOT NULL DEFAULT '',
  category          TEXT NOT NULL DEFAULT 'unclear',
  should_have_done  TEXT NOT NULL DEFAULT '',
  fault             TEXT NOT NULL DEFAULT 'NOT_OURS',   -- OURS | PARTLY_OURS | NOT_OURS
  recoverable       TEXT NOT NULL DEFAULT 'NO',         -- YES | MAYBE | NO
  recovery_action   TEXT,
  evidence_quote    TEXT,
  confidence        DOUBLE PRECISION NOT NULL DEFAULT 0,

  analysed_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The aggregate view ranks categories by frequency, and the job picks up
-- unanalysed/retryable rows; both read these two columns.
CREATE INDEX IF NOT EXISTS idx_will_lost_analysis_category ON will_lost_analysis (category);
CREATE INDEX IF NOT EXISTS idx_will_lost_analysis_status   ON will_lost_analysis (status, analysed_at);

-- Same rule as migration 028: RLS on, no policies. Deny-all for anon and
-- authenticated; every server path uses the service role, which bypasses RLS.
-- These rows contain a written assessment of a real person's conversation, so
-- they must never be readable with the public anon key.
ALTER TABLE will_lost_analysis ENABLE ROW LEVEL SECURITY;

-- Deliberately NOT added to the supabase_realtime publication — see 028.

-- Verify:
--   select count(*) from will_lost_analysis;   -- 0, table exists
