-- ════════════════════════════════════════════════════════════════════════════
-- Migration 003: CRM audit log
-- Records every sensitive / destructive CRM action (deletes, sensitive-data
-- clears, archives, tax/super removals) so there is an accountability trail.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS crm_audit (
  id         BIGSERIAL PRIMARY KEY,
  actor      TEXT NOT NULL DEFAULT 'crm-admin',   -- who performed the action
  action     TEXT NOT NULL,                       -- e.g. 'client.delete'
  target_id  TEXT NOT NULL DEFAULT '',            -- client/task id affected
  detail     TEXT NOT NULL DEFAULT '',            -- optional context (JSON/string)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON crm_audit (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_target  ON crm_audit (target_id);
CREATE INDEX IF NOT EXISTS idx_audit_action  ON crm_audit (action);

-- Service-role only (same model as the rest of the CRM). RLS on, no policies.
ALTER TABLE crm_audit ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:  SELECT * FROM crm_audit ORDER BY created_at DESC LIMIT 20;
-- ════════════════════════════════════════════════════════════════════════════
