-- ════════════════════════════════════════════════════════════════════════════
-- Fresh-start filter: keep ONLY 100% new customers in Will.
--
-- When the number joined via coexistence, Meta pushed the whole existing chat
-- history into Will (dozens of old/returning contacts). Jo wants Will to hold
-- only brand-new leads from the cut-over point on. This table lists the
-- normalized numbers of every pre-existing contact; the webhook drops any
-- inbound message from a number in here, even if that person messages again.
--
-- New customers are NEVER added to this table, so their ongoing conversation
-- keeps flowing normally — only the pre-existing set is blocked.
-- ════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS will_known_contacts (
  wa_norm    TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
