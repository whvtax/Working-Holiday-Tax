-- ════════════════════════════════════════════════════════════════════════════
-- Migration 021: Will (WhatsApp assistant) tables
--
-- Adds the storage Will needs, namespaced `will_*` so nothing collides with the
-- existing CRM tables. This is the real-database implementation of Will's
-- `Store` interface (previously a local JSON file). Data lives here, in your
-- Supabase, exactly like the rest of the CRM.
--
-- Also wires two integrations:
--   1. A trigger on crm_tasks so a submitted questionnaire enqueues a
--      FORM_RECEIVED job for the matching Will customer (auto-confirm + advance).
--   2. Realtime publication so the dashboard updates on change instead of polling.
--
-- Reuses crm_norm_phone() from migration 019 for phone matching.
-- Run after 020. Supabase Dashboard → SQL Editor → New Query → Paste → Run.
-- ════════════════════════════════════════════════════════════════════════════

-- ── will_customers ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS will_customers (
  id                      TEXT PRIMARY KEY,
  wa_id                   TEXT NOT NULL UNIQUE,
  wa_norm                 TEXT,                       -- crm_norm_phone(wa_id), for CRM matching
  name                    TEXT,
  flag                    TEXT NOT NULL DEFAULT '',
  state                   TEXT NOT NULL DEFAULT 'NEW_LEAD',
  income                  TEXT NOT NULL DEFAULT 'UNKNOWN',
  paid                    BOOLEAN NOT NULL DEFAULT FALSE,
  form_complete           BOOLEAN NOT NULL DEFAULT FALSE,
  missing_docs            JSONB NOT NULL DEFAULT '[]',
  ai_paused               BOOLEAN NOT NULL DEFAULT FALSE,
  is_legacy               BOOLEAN NOT NULL DEFAULT FALSE,
  bot_owned               BOOLEAN NOT NULL DEFAULT FALSE,
  opted_out               BOOLEAN NOT NULL DEFAULT FALSE,
  estimated_refund_cents  BIGINT,
  last_customer_msg_at    TIMESTAMPTZ,
  previous_state          TEXT,
  state_changed_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_preview    TEXT,
  last_message_direction  TEXT,
  unread                  BOOLEAN NOT NULL DEFAULT FALSE,
  lang                    TEXT,                       -- detected customer language (e.g. 'de','ja')
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_customers_state    ON will_customers (state);
CREATE INDEX IF NOT EXISTS idx_will_customers_wa_norm  ON will_customers (wa_norm) WHERE wa_norm IS NOT NULL;

-- ── will_messages ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS will_messages (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT NOT NULL,
  direction    TEXT NOT NULL,
  author       TEXT NOT NULL,
  status       TEXT NOT NULL,
  body         TEXT NOT NULL DEFAULT '',
  meta         JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_messages_customer ON will_messages (customer_id, created_at);
CREATE INDEX IF NOT EXISTS idx_will_messages_status   ON will_messages (status);

-- ── will_tasks (human tasks / escalations) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS will_tasks (
  id              TEXT PRIMARY KEY,
  customer_id     TEXT,
  customer_name   TEXT,
  reason          TEXT NOT NULL DEFAULT '',
  severity        TEXT NOT NULL DEFAULT 'REVIEW',
  context         TEXT,
  suggested_reply TEXT,
  status          TEXT NOT NULL DEFAULT 'OPEN',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_tasks_status ON will_tasks (status);

-- ── will_templates (library + A/B) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS will_templates (
  id            TEXT PRIMARY KEY,
  key           TEXT NOT NULL DEFAULT '',
  category      TEXT NOT NULL DEFAULT '',
  title         TEXT NOT NULL DEFAULT '',
  body          TEXT NOT NULL DEFAULT '',
  requires_meta BOOLEAN NOT NULL DEFAULT FALSE,
  versions      INT NOT NULL DEFAULT 1,
  variant_b     TEXT,
  sent_a        INT NOT NULL DEFAULT 0,
  sent_b        INT NOT NULL DEFAULT 0,
  conv_a        INT NOT NULL DEFAULT 0,
  conv_b        INT NOT NULL DEFAULT 0,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── will_suggestions (learning engine proposals) ────────────────────────────
CREATE TABLE IF NOT EXISTS will_suggestions (
  id                 TEXT PRIMARY KEY,
  kind               TEXT NOT NULL,
  title              TEXT NOT NULL DEFAULT '',
  detail             TEXT NOT NULL DEFAULT '',
  proposed_body      TEXT NOT NULL DEFAULT '',
  target_template_id TEXT,
  occurrences        INT NOT NULL DEFAULT 1,
  status             TEXT NOT NULL DEFAULT 'PENDING',
  dedupe_key         TEXT NOT NULL UNIQUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── will_jobs (scheduler: follow-ups, auto-close, nightly, form-received) ────
CREATE TABLE IF NOT EXISTS will_jobs (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT,
  kind         TEXT NOT NULL,
  payload      JSONB NOT NULL DEFAULT '{}',
  run_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  status       TEXT NOT NULL DEFAULT 'SCHEDULED',
  claimed_at   TIMESTAMPTZ,
  attempts     INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_jobs_due ON will_jobs (status, run_at);

-- ── will_state_history ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS will_state_history (
  id          BIGSERIAL PRIMARY KEY,
  customer_id TEXT NOT NULL,
  from_state  TEXT,
  to_state    TEXT NOT NULL,
  caused_by   TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_will_history_customer ON will_state_history (customer_id, created_at);

-- ── will_settings (key/value: bank details, conversion goal, kill switch…) ───
CREATE TABLE IF NOT EXISTS will_settings (
  key   TEXT PRIMARY KEY,
  value JSONB
);

-- ════════════════════════════════════════════════════════════════════════════
-- Integration 1: questionnaire completion → FORM_RECEIVED job
--
-- When a customer submits your intake form, /api/tax-form inserts a crm_tasks
-- row carrying their WhatsApp number. This trigger matches that number to a Will
-- customer who is still waiting on the form, and enqueues one FORM_RECEIVED job.
-- Will's tick then auto-advances the customer and sends the approved "we got your
-- questionnaire" confirmation in their language. Pure enqueue: all messaging and
-- policy logic stays in the app, never in the database.
-- ════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION will_on_form_received() RETURNS TRIGGER AS $$
DECLARE
  p_norm TEXT;
  cust   TEXT;
BEGIN
  p_norm := nullif(crm_norm_phone(NEW.whatsapp), '');
  IF p_norm IS NULL THEN RETURN NEW; END IF;

  -- Match a Will customer still in the pre-completion part of the flow.
  SELECT id INTO cust
  FROM will_customers
  WHERE wa_norm = p_norm
    AND state NOT IN ('FORM_COMPLETE','DOCUMENTS_COMPLETE','UNDER_REVIEW','ESTIMATE_READY',
                      'FINAL_REVIEW','SIGNATURE_PENDING','SIGNED','LODGED','COMPLETED',
                      'NOT_INTERESTED','WENT_COLD','NOT_RELEVANT')
  LIMIT 1;
  IF cust IS NULL THEN RETURN NEW; END IF;

  -- One pending FORM_RECEIVED per customer; don't stack duplicates.
  IF EXISTS (SELECT 1 FROM will_jobs WHERE customer_id = cust
             AND kind = 'FORM_RECEIVED' AND status = 'SCHEDULED') THEN
    RETURN NEW;
  END IF;

  INSERT INTO will_jobs (id, customer_id, kind, payload, run_at, status, created_at)
  VALUES (
    'job_form_' || cust || '_' || floor(extract(epoch from now()))::text,
    cust, 'FORM_RECEIVED',
    jsonb_build_object('taskId', NEW.id),
    now(), 'SCHEDULED', now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_will_on_form_received ON crm_tasks;
CREATE TRIGGER trg_will_on_form_received
  AFTER INSERT OR UPDATE OF whatsapp, task_type ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION will_on_form_received();

-- ════════════════════════════════════════════════════════════════════════════
-- Integration 2: Realtime — dashboard updates on change, no polling
-- Add Will's live tables to the realtime publication. (Safe to re-run.)
-- ════════════════════════════════════════════════════════════════════════════
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE will_customers;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE will_messages;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE will_tasks;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE will_jobs;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ════════════════════════════════════════════════════════════════════════════
-- Verify:
--   select count(*) from will_customers;              -- 0, table exists
--   select crm_norm_phone('+61 400 000 000');         -- 61400000000
--   select tablename from pg_publication_tables
--     where pubname='supabase_realtime' and tablename like 'will_%';  -- 4 rows
-- ════════════════════════════════════════════════════════════════════════════
