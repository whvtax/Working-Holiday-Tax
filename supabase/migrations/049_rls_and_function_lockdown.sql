-- ════════════════════════════════════════════════════════════════════════════
-- 049 - Close the last RLS gap and lock down the Data API surface
--       (security round 2, data layer). NOT YET RUN ANYWHERE. Review first.
--
-- WHY
--   1. will_ai_usage (042) was created without ENABLE ROW LEVEL SECURITY. 028
--      fixed the twelve will_* tables that existed then; 042 came after and
--      forgot. Anyone holding the project URL and the anon key (public by
--      design) can read it through PostgREST and, if default grants apply,
--      INSERT forged rows into the AI cost ledger.
--   2. The convention "every new table must say ENABLE ROW LEVEL SECURITY" has
--      now been dropped twice (013, 028, and 042). This file also enables RLS on
--      every public table that lacks it, so a table made by hand in the
--      dashboard is covered too.
--   3. Functions in schema public are executable by PUBLIC by default and
--      PostgREST exposes them as /rest/v1/rpc/<name> to the anon key:
--        get_dashboard_stats(text,text)  aggregate client counts and refund total
--        will_bump_counter(text,int)     writes will_settings
--      Both run as the caller (not SECURITY DEFINER), so RLS currently stops
--      them, but that is one disabled RLS flag away from a leak and a write
--      path. The app calls them with the service role only.
--   4. The two SECURITY DEFINER trigger functions had no pinned search_path.
--
-- WHAT IT DOES NOT TOUCH
--   No policy is created: RLS on with zero policies is deny-all for anon and
--   authenticated, and the service role (used by every server path, see
--   src/lib/supabase.ts) bypasses RLS. The app never uses the anon key
--   (grep: no NEXT_PUBLIC_SUPABASE_ANON_KEY anywhere in src).
--   No data is read, moved or deleted. Storage objects are not touched.
--
-- ROLLBACK (if something unexpected breaks; none is expected)
--   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;
--   ALTER TABLE will_ai_usage DISABLE ROW LEVEL SECURITY;
--   GRANT EXECUTE ON FUNCTION get_dashboard_stats(text,text), will_bump_counter(text,integer) TO PUBLIC;
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

-- 1. The known gap.
ALTER TABLE will_ai_usage ENABLE ROW LEVEL SECURITY;

-- 2. Every other public table, including any created by hand.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT c.relname
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('r', 'p') AND NOT c.relrowsecurity
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.relname);
    RAISE NOTICE 'RLS enabled on public.%', r.relname;
  END LOOP;
END $$;

-- 3. The browser roles get nothing in public, now or for tables made later.
REVOKE ALL ON ALL TABLES    IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES    FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated;

-- The server uses the service role. 045 already grants tables; do functions too.
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO service_role;

-- 4. Pin search_path on the SECURITY DEFINER trigger functions (and the RPCs).
ALTER FUNCTION crm_capture_lead()        SET search_path = public, pg_temp;
ALTER FUNCTION will_on_form_received()   SET search_path = public, pg_temp;
ALTER FUNCTION get_dashboard_stats(text, text) SET search_path = public, pg_temp;

-- 5. The uploads bucket must be private (the app also refuses to upload if not).
--    This only flips the flag to false; it never makes anything more visible.
UPDATE storage.buckets SET public = false WHERE id = 'uploads' AND public IS DISTINCT FROM false;

-- ── Verify (run by hand; expect 0 rows each unless stated) ──────────────────
-- Tables without RLS:
--   SELECT relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
--   WHERE n.nspname='public' AND c.relkind IN ('r','p') AND NOT c.relrowsecurity;
-- Anything the browser roles can still touch in public:
--   SELECT grantee, table_name, privilege_type FROM information_schema.role_table_grants
--   WHERE table_schema='public' AND grantee IN ('anon','authenticated');
-- Functions the browser roles can execute:
--   SELECT p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
--   WHERE n.nspname='public' AND (has_function_privilege('anon', p.oid, 'EXECUTE')
--                              OR has_function_privilege('authenticated', p.oid, 'EXECUTE'));
-- Storage: bucket private (expect public = false) and no policies on storage.objects
-- that mention the uploads bucket (expect 0 rows):
--   SELECT id, public, file_size_limit, allowed_mime_types FROM storage.buckets WHERE id='uploads';
--   SELECT policyname, cmd, roles, qual FROM pg_policies WHERE schemaname='storage' AND tablename='objects';
-- Realtime must not publish customer tables (expect 0 rows):
--   SELECT tablename FROM pg_publication_tables WHERE pubname='supabase_realtime';
