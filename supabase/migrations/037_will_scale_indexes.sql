-- 037 — Scale indexes for the Will CRM at 5,000+ customers.
--
-- Found by the performance audit (29 Aug run 3). Three hot paths were doing
-- sequential scans that only hurt once the tables grow past a thousand rows:
--
--  1. The dashboard change-token (/api/will/version) runs, every ~15s per open
--     tab, a global "newest row" on will_messages ordered by created_at, and a
--     "newest customer" on will_customers ordered by state_changed_at. Neither
--     column was indexed, so both were full scans + sort of the two largest
--     tables. These two indexes turn each into an index-only top-1.
--
--  2. The customer search (/api/will/search) runs ILIKE '%...%' with a LEADING
--     wildcard across name, last_message_preview, wa_id and wa_norm. A btree
--     cannot serve a leading-wildcard match, so every keystroke was up to six
--     parallel sequential scans. pg_trgm GIN indexes let ILIKE use an index.
--
-- All are IF NOT EXISTS and additive — safe to run more than once, and they
-- change no data, only how it is looked up.

-- 1. Change-token top-1 reads.
CREATE INDEX IF NOT EXISTS idx_will_messages_created
  ON will_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_will_customers_state_changed
  ON will_customers (state_changed_at DESC);

-- 2. Trigram search. The extension ships with Supabase; IF NOT EXISTS keeps it
--    idempotent. gin_trgm_ops makes ILIKE '%q%' index-backed on each column.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_will_customers_name_trgm
  ON will_customers USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_will_customers_preview_trgm
  ON will_customers USING gin (last_message_preview gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_will_customers_wa_id_trgm
  ON will_customers USING gin (wa_id gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_will_customers_wa_norm_trgm
  ON will_customers USING gin (wa_norm gin_trgm_ops);
