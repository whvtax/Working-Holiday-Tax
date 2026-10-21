-- 21 Oct 2026: Supabase stops automatically granting Data API access to NEW
-- tables in the "public" schema from 30 Oct 2026. Existing tables keep their
-- grants. The app reaches Supabase with the service role key, so this grants
-- service_role on every table and sequence that exists now, and sets default
-- privileges so any table created by a later migration gets them too.
-- Safe to run more than once.
grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to service_role;
alter default privileges in schema public grant usage, select on sequences to service_role;
