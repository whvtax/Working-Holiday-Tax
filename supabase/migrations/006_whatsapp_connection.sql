-- ════════════════════════════════════════════════════════════════════════════
-- Migration 006: WhatsApp connection health monitoring
--
-- This replaces what a paid BSP dashboard (360dialog / Dualhook) would give
-- you for $59/mo: a single source of truth for "is our WhatsApp connection
-- alive right now", plus a history log so we can see what broke and when.
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

-- ── wa_system_status ────────────────────────────────────────────────────────
-- Singleton row (always id = 1). Holds the CURRENT state of the connection.
-- The monitoring cron job (see /api/cron/wa-health) updates this every run.
CREATE TABLE IF NOT EXISTS wa_system_status (
  id                      INTEGER PRIMARY KEY DEFAULT 1,
  -- Token health
  token_type              TEXT NOT NULL DEFAULT 'system_user',  -- system_user tokens don't expire, but we track anyway
  token_expires_at        TIMESTAMPTZ,                          -- NULL = does not expire
  token_last_verified_at  TIMESTAMPTZ,
  token_status            TEXT NOT NULL DEFAULT 'unknown',      -- healthy | expiring_soon | expired | error | unknown

  -- Heartbeat (periodic "can we still call the Graph API" check)
  last_heartbeat_at       TIMESTAMPTZ,
  last_heartbeat_ok       BOOLEAN,
  consecutive_failures    INTEGER NOT NULL DEFAULT 0,

  -- Webhook liveness (are we still receiving inbound events from Meta)
  last_webhook_received_at TIMESTAMPTZ,

  -- Coexistence-specific: WhatsApp Business App must be opened every 14 days
  -- or Meta drops the Coexistence link. We can't detect "app opened" directly,
  -- but we track the last inbound echo message (smb_message_echoes) as a proxy.
  last_app_echo_at        TIMESTAMPTZ,

  -- Alerting (avoid spamming the same alert every cron run)
  last_alert_sent_at      TIMESTAMPTZ,
  last_alert_reason       TEXT,

  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed the single row so the app can always UPDATE instead of upsert-guessing.
INSERT INTO wa_system_status (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── wa_system_events ────────────────────────────────────────────────────────
-- Append-only history log: every state change / error / alert gets a row.
-- This is the "timeline" you'd see on a BSP's status page.
CREATE TABLE IF NOT EXISTS wa_system_events (
  id          BIGSERIAL PRIMARY KEY,
  event_type  TEXT NOT NULL,        -- heartbeat_ok | heartbeat_fail | token_expiring | token_error | webhook_gap | alert_sent
  severity    TEXT NOT NULL DEFAULT 'info',  -- info | warning | critical
  detail      TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_events_created  ON wa_system_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wa_events_severity ON wa_system_events (severity);

-- Service-role only, same model as the rest of the CRM.
ALTER TABLE wa_system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE wa_system_events ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT * FROM wa_system_status;
--   SELECT * FROM wa_system_events ORDER BY created_at DESC LIMIT 20;
-- ════════════════════════════════════════════════════════════════════════════
