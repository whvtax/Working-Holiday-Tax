# Supabase security report: WILL MIA ATLAS

Scope: the 51 SQL files in `supabase/migrations/` and the way the app calls Supabase. Live project settings were not available, so this report covers only what the code and migrations show.

## What the code shows
- The app uses the Supabase service role on the server (`src/lib/supabase.ts`). The service role bypasses RLS, so RLS does not protect the app's own queries. The server must do the authorization, and the routes do (see the API report).
- Browser code (`'use client'` components in Mia and Atlas) calls the app's own API routes, not Supabase directly. A grep for `service_role` in client components found nothing.
- Migration 049 (`rls_and_function_lockdown`) revokes broad grants and reduces function execution to `service_role`. Its broader grant lines are commented out, so the lockdown relies on what runs on the live database.
- No `CREATE POLICY` statements appear in the migrations. Tables that have RLS enabled and no policies deny `anon` and `authenticated` by default. This is the intended outcome only if the live database matches the migrations.
- Several functions are `SECURITY DEFINER` (migrations 016 to 021, 038, 048, 049). Their `search_path` settings were not read in detail in this pass. This needs a check.
- The Mia pipeline reads `will_customers` with `brand = 'svt'`. Stage changes go through Will's state machine (`setState`), so business rules apply.

## Findings
- **WMA-07 (UNVERIFIED):** Live RLS on every table, the list of grants to `anon` and `authenticated`, and the storage bucket visibility. These need a read-only check in the Supabase dashboard or a read-only SQL query that does not change anything.
- **WMA-03 (Medium):** Uploads use public URLs. See `SECURITY_FINDINGS.md`.
- **New item (needs check):** Review `search_path` on each `SECURITY DEFINER` function. A function with a mutable search path can be abused by a user who can create objects in a schema that is searched first.

## Checklist for the owner (read-only, in the Supabase dashboard)
1. Table editor: confirm RLS is enabled on every table in `public`.
2. Authentication, policies: confirm no policy grants `anon` access to customer tables.
3. Storage: confirm which buckets are public. Customer document buckets should be private.
4. Database functions: for each `SECURITY DEFINER` function, confirm `search_path` is set.
5. API settings: confirm the service role key has not been shared outside the server.
6. Backups: confirm the backup schedule and do a restore test on a separate project, not production.

No SQL was run against the live database for this report.
