-- ════════════════════════════════════════════════════════════════════════════
-- 042 — Exact Claude usage ledger (Jo, 24 Sep)
--
-- WHY THIS EXISTS
--   The System & Costs card showed "≈ US$22 (estimate only)": a COUNT of Will
--   decisions times an assumed price. It ignored the reviewer, the nightly
--   mining, payment-screenshot reading and Ask Will, and it never knew how
--   many tokens a call actually used. Jo asked for the real number.
--
--   Every Anthropic response carries exact token counts. This table keeps one
--   row per paid call: which feature made it, which model, the four token
--   counts, and the cost computed from the published price list at the time
--   of the call. The card sums it by day and by feature; the monthly chart
--   reads it too. The org-level cost report (Admin API) is fetched live and
--   shown beside it as the billing truth.
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS will_ai_usage (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  at            timestamptz NOT NULL DEFAULT now(),
  feature       text NOT NULL,           -- decide | reviewer | mining | vision | assistant | suggest | lost_leads | other
  model         text NOT NULL,
  input_tokens  integer NOT NULL DEFAULT 0,
  output_tokens integer NOT NULL DEFAULT 0,
  cache_write_tokens integer NOT NULL DEFAULT 0,
  cache_read_tokens  integer NOT NULL DEFAULT 0,
  cost_usd      numeric(12,6),           -- NULL when the model has no price on file
  customer_id   text
);

CREATE INDEX IF NOT EXISTS will_ai_usage_at_idx ON will_ai_usage (at DESC);
CREATE INDEX IF NOT EXISTS will_ai_usage_feature_at_idx ON will_ai_usage (feature, at DESC);
