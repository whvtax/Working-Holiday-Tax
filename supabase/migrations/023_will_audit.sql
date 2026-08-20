-- ════════════════════════════════════════════════════════════════════════════
-- Will decision log (audit trail)
--
-- Every meaningful action Will or the owner takes is written here: a decision
-- the assistant made (with the knowledge it used and the guard verdict), a
-- blocked reply, a human takeover, a scheduled follow-up, a kill-switch toggle.
-- This is what makes the system reviewable: you can see WHY Will did something,
-- not just that it happened. Read-only from the UI via /api/will/audit.
-- ════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS will_audit (
  id         BIGSERIAL PRIMARY KEY,
  actor      TEXT NOT NULL,            -- system | assistant | policy_guard | scheduler | owner | nightly
  action     TEXT NOT NULL,            -- decision | reply_blocked | human_task_created | manual_reply | ...
  detail     JSONB,                    -- structured context (knowledge used, violations, preview, ids)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_will_audit_created ON will_audit (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_will_audit_action  ON will_audit (action, created_at DESC);
