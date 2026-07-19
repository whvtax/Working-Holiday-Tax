-- ════════════════════════════════════════════════════════════════════════════
-- Migration 007: WhatsApp conversation state (the "waiting room" before a
-- lead becomes a real crm_clients / crm_tasks record)
--
-- Every WhatsApp contact lives here from their first message until they're
-- tagged "ready" (at which point a normal crm_tasks row is created for the
-- tax agent, exactly as if it came from the website form) or "not_relevant".
--
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS wa_conversations (
  id                    TEXT PRIMARY KEY,             -- e.g. 'WA-' || gen_random_uuid()
  phone                 TEXT NOT NULL UNIQUE,          -- E.164 format, e.g. +447911123456
  first_name            TEXT NOT NULL DEFAULT '',
  language              TEXT NOT NULL DEFAULT 'en',    -- en | ja

  -- Where this contact currently sits in the flow (Section 9/10 of the role doc)
  stage                 TEXT NOT NULL DEFAULT 'opening_sent',
  -- opening_sent | pitch_sent | reminder_1_sent | reminder_2_sent |
  -- form_completed | abn_pending | ready | not_relevant | urgent

  -- Branch flags (Section 10.3 / 10.6 of the role doc)
  has_abn               BOOLEAN,
  abn_income_confirmed  BOOLEAN,                       -- null = not asked yet
  is_uber                BOOLEAN,
  residency_check_result TEXT,                         -- resident | non_resident | not_asked
  is_self_lodger         BOOLEAN,                       -- true → closed politely, tagged not_relevant

  -- Linkage once converted
  crm_task_id            TEXT REFERENCES crm_tasks(id) ON DELETE SET NULL,

  -- Timestamps that drive the reminder cron (Section 10.4)
  last_inbound_at         TIMESTAMPTZ NOT NULL DEFAULT now(),  -- last time THEY wrote
  last_outbound_at         TIMESTAMPTZ,                          -- last time WE wrote
  opening_sent_at          TIMESTAMPTZ,
  pitch_sent_at            TIMESTAMPTZ,
  reminder_1_sent_at       TIMESTAMPTZ,
  reminder_2_sent_at       TIMESTAMPTZ,

  -- Escalation (Section 8 + 10.12 of the role doc)
  needs_human              BOOLEAN NOT NULL DEFAULT FALSE,
  escalation_reason        TEXT,

  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_conv_phone       ON wa_conversations(phone);
CREATE INDEX IF NOT EXISTS idx_wa_conv_stage        ON wa_conversations(stage);
CREATE INDEX IF NOT EXISTS idx_wa_conv_needs_human  ON wa_conversations(needs_human) WHERE needs_human = TRUE;
CREATE INDEX IF NOT EXISTS idx_wa_conv_last_inbound ON wa_conversations(last_inbound_at);

-- ── wa_messages ──────────────────────────────────────────────────────────────
-- Full transcript log. Not strictly required for the state machine to work,
-- but you'll want it on day one: for debugging, for the "escalate to human"
-- handoff (so the tax agent sees full context), and for building the
-- knowledge-base loop from Section 8 of the role doc.
CREATE TABLE IF NOT EXISTS wa_messages (
  id               BIGSERIAL PRIMARY KEY,
  conversation_id  TEXT NOT NULL REFERENCES wa_conversations(id) ON DELETE CASCADE,
  direction        TEXT NOT NULL,          -- inbound | outbound
  body             TEXT NOT NULL DEFAULT '',
  script_key       TEXT,                    -- e.g. '10.2_standard_pitch' — null for free-text / human replies
  meta_message_id  TEXT,                    -- Meta's wamid, for delivery-status correlation
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_msg_conversation ON wa_messages(conversation_id, created_at);

ALTER TABLE wa_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wa_messages      ENABLE ROW LEVEL SECURITY;

-- ════════════════════════════════════════════════════════════════════════════
-- Done. Verify:
--   SELECT * FROM wa_conversations ORDER BY created_at DESC LIMIT 20;
-- ════════════════════════════════════════════════════════════════════════════
