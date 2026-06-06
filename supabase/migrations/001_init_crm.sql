-- ════════════════════════════════════════════════════════════════════════════
-- Supabase migration: CRM tables + indexes + storage bucket policy
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

-- ── crm_clients ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_clients (
  id              TEXT PRIMARY KEY,
  full_name       TEXT NOT NULL DEFAULT '',
  dob             TEXT NOT NULL DEFAULT '',
  whatsapp        TEXT NOT NULL DEFAULT '',
  email           TEXT NOT NULL DEFAULT '',
  country         TEXT NOT NULL DEFAULT '',
  how_heard       TEXT NOT NULL DEFAULT '',
  notes           TEXT NOT NULL DEFAULT '',
  tax_returns     TEXT NOT NULL DEFAULT '[]',
  super_returns   TEXT NOT NULL DEFAULT '[]',
  tfn_service     TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
  abn_service     TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
  created_at      TEXT NOT NULL DEFAULT '',
  archived        BOOLEAN NOT NULL DEFAULT FALSE,
  yearly_checkins TEXT NOT NULL DEFAULT '{}'
);

-- ── crm_tasks ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_tasks (
  id            TEXT PRIMARY KEY,
  client_id     TEXT NOT NULL DEFAULT '',
  client_name   TEXT NOT NULL DEFAULT '',
  task_type     TEXT NOT NULL DEFAULT 'tax-return',
  whatsapp      TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL DEFAULT '',
  country       TEXT NOT NULL DEFAULT '',
  dob           TEXT NOT NULL DEFAULT '',
  tax_year      TEXT NOT NULL DEFAULT '',
  submitted_at  TEXT NOT NULL DEFAULT '',
  done          BOOLEAN NOT NULL DEFAULT FALSE,
  address       TEXT NOT NULL DEFAULT '',
  tfn           TEXT NOT NULL DEFAULT '',
  bank_details  TEXT NOT NULL DEFAULT '',
  primary_job   TEXT NOT NULL DEFAULT '',
  marital       TEXT NOT NULL DEFAULT '',
  tax_status    TEXT NOT NULL DEFAULT '',
  how_heard     TEXT NOT NULL DEFAULT '',
  au_phone      TEXT NOT NULL DEFAULT '',
  notes         TEXT NOT NULL DEFAULT '',
  file_urls     TEXT NOT NULL DEFAULT '[]',
  review_status TEXT NOT NULL DEFAULT 'pending',
  reviewer_note TEXT NOT NULL DEFAULT '',
  reviewed_at   TEXT NOT NULL DEFAULT ''
);

-- ── Indexes for performance ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tasks_submitted ON crm_tasks(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_done      ON crm_tasks(done);
CREATE INDEX IF NOT EXISTS idx_tasks_client    ON crm_tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_created  ON crm_clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_archived ON crm_clients(archived);

-- ── Row Level Security (RLS) ────────────────────────────────────────────────
-- We're using the SERVICE_ROLE key from server-only code, which bypasses RLS.
-- But still enabling RLS to prevent accidental access via anon key.
ALTER TABLE crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_tasks   ENABLE ROW LEVEL SECURITY;

-- No policies = no anonymous access (good!). Only service_role can access.

-- ════════════════════════════════════════════════════════════════════════════
-- STORAGE BUCKET SETUP
-- After running SQL, do this in Storage UI:
--   1. Create bucket named "uploads"
--   2. Set as PRIVATE (NOT public). Client identity documents (passport selfies,
--      ID photos) must never be publicly reachable by URL. The app serves them
--      only to authenticated CRM sessions via /api/crm/file (service-role download).
--   3. File size limit: 10 MB
--   4. Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, application/pdf
--   NOTE: Do NOT add any public SELECT storage policy for this bucket.
-- ════════════════════════════════════════════════════════════════════════════
