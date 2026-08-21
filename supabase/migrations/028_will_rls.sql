-- ════════════════════════════════════════════════════════════════════════════
-- 028 — Row Level Security for every will_* table
--
-- WHY THIS EXISTS
--   Migrations 001-016 enable RLS on every table they create, and
--   013_partners_rls.sql exists purely to retrofit it onto one table that was
--   missed. From 021 onward that convention was dropped: all twelve will_*
--   tables were created with no RLS and no policies.
--
--   Supabase grants anon/authenticated access to everything in `public` by
--   default, so RLS is the ONLY gate. Without it, anyone holding the project's
--   anon key -- a key that is public by design -- can read every customer
--   conversation in will_messages and the plaintext WhatsApp access token in
--   will_settings, and can WRITE to will_templates and will_jobs, i.e. make the
--   assistant send arbitrary text to real customers.
--
--   Five of these tables are also in the supabase_realtime publication, whose
--   authorization is evaluated against RLS policies. With RLS off that is a
--   live WebSocket feed of customer messages.
--
-- WHY THERE ARE NO POLICIES
--   RLS enabled + zero policies = deny-all for anon and authenticated. Every
--   server path in this app uses the SERVICE ROLE key, which bypasses RLS
--   entirely, so application behaviour is unchanged. This is the same pattern
--   001_init_crm.sql:61-66 and 013_partners_rls.sql:4-13 already use.
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE will_customers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_messages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_tasks              ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_templates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_suggestions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_jobs               ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_state_history      ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_settings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_knowledge          ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_audit              ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_processed_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE will_known_contacts     ENABLE ROW LEVEL SECURITY;

-- ── Realtime ────────────────────────────────────────────────────────────────
-- The dashboards poll /api/will/version; they do not subscribe to Realtime
-- (the app's own CSP connect-src does not even allow a wss: origin). Publishing
-- these tables therefore buys nothing and, until the statements above ran, was
-- the difference between "readable with the anon key" and "streamed live with
-- the anon key". Removing them is defence in depth: if RLS is ever disabled on
-- one of these tables again, it does not silently become a live feed.
--
-- Guarded so this migration still succeeds if a table was never published.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['will_customers','will_messages','will_tasks','will_jobs','will_knowledge']
  LOOP
    IF EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = t
    ) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime DROP TABLE %I', t);
    END IF;
  END LOOP;
END $$;

-- ── Verify ──────────────────────────────────────────────────────────────────
-- Expect 12 rows, all rls_enabled = true:
--   SELECT tablename, rowsecurity AS rls_enabled
--   FROM pg_tables WHERE schemaname='public' AND tablename LIKE 'will_%'
--   ORDER BY tablename;
--
-- Expect 0 rows:
--   SELECT tablename FROM pg_publication_tables
--   WHERE pubname='supabase_realtime' AND tablename LIKE 'will_%';
