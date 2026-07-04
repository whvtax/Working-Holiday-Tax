-- Partners table for referral tracking
CREATE TABLE IF NOT EXISTS partners (
  id          TEXT PRIMARY KEY DEFAULT 'PTR-' || gen_random_uuid()::text,
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add referred_by column to clients table
ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS referred_by TEXT REFERENCES partners(id) ON DELETE SET NULL;

-- Add ref_code to tasks table
ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS ref_code TEXT;

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_clients_referred_by ON crm_clients(referred_by) WHERE referred_by IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tasks_ref_code ON crm_tasks(ref_code) WHERE ref_code IS NOT NULL;
