-- ════════════════════════════════════════════════════════════════════════════
-- 050 - Mia (Student Visa Tax) uses the shared CRM and Will tables with brand 'svt'.
--
-- DRAFT. NOT APPLIED. Back up the database, then run in the Supabase SQL editor.
--
-- Mia is a separate screen, not a separate store. Its customers are rows in
-- will_customers with brand = 'svt', and its clients and tasks are the existing
-- crm_clients and crm_tasks rows with brand = 'svt'. Nothing is copied.
--
-- This migration only records where a lead came from (kept when it moves to
-- the CRM). Additive and nullable: existing rows get NULL, nothing else changes.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE will_customers ADD COLUMN IF NOT EXISTS source        TEXT;
ALTER TABLE will_customers ADD COLUMN IF NOT EXISTS source_detail TEXT;
ALTER TABLE will_customers ADD COLUMN IF NOT EXISTS source_at     TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_will_customers_svt_source ON will_customers (brand, source);
