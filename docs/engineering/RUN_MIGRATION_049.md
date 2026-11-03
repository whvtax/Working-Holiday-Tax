# Running migration 049 (RLS and function lockdown)

Owner runs this by hand in the Supabase SQL editor. Nothing deletes or moves data. Safe to run twice.

1. Supabase dashboard, project for the live site, then Database, Backups: confirm a recent backup exists (take one if the plan allows).
2. SQL editor, new query. Run the pre-check below. Note the results.
3. Paste the whole of `supabase/migrations/049_rls_and_function_lockdown.sql` and run it. Expect "Success. No rows returned" and some NOTICE lines.
4. Run the verify queries at the bottom of the migration. Tables without RLS, browser-role grants and anon-executable functions must each return 0 rows; the uploads bucket must show `public = false`.
5. Smoke test within 10 minutes: open /crm, load the dashboard, open one lead, open the Will page, send a test WhatsApp to the business number, and submit a test form. If anything fails, run the rollback block at the top of the migration and tell the developer.

Pre-check (read only):

```sql
select relname, relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relkind in ('r','p') order by relrowsecurity, relname;
select id, public from storage.buckets where id='uploads';
select tablename from pg_publication_tables where pubname='supabase_realtime';
```

The third query should return nothing. If it lists a customer table, stop and ask first.
