# Retention, deletion and abandoned-upload expiry (proposal, nothing applied)

Why this is a proposal and not applied: deleting stored documents cannot be undone.
Supabase database backups and point-in-time recovery cover the DATABASE. Storage objects
are not part of them (per Supabase documentation; confirm in the dashboard), so a deleted
passport photo is gone. Change control (brief, section 8 Category C) therefore applies.
Everything below was verified against a scratch copy of the tree, not the live one.

## P1. Delete a pending task's files when the card is deleted or archived
Files: `P1-delete-archive-files.patch` (applies cleanly with `patch -p1`, dry-run checked)
and `delete-archive-files.proposed.test.ts` (4 tests, pass against the patched scratch copy).

Behaviour: `deleteTaskAndArchive` calls `deleteFiles(task.fileUrls)` after the client record
is saved and before the task row is deleted. If storage refuses, the row is kept and the
call throws (the same rule `markTaskDone` and `deleteTaskPermanent` already follow, because
the row is the only pointer to the files). A task that went through Done has
`file_urls = []`, so the normal "Done, then Transfer" path is a no-op.
Retrying after a failure is safe: the client upsert is idempotent for a given task.

Callers that gain the behaviour: CRM "delete" action (crm/tasks/[id]), DashboardClient
transfer, and `archiveTaskByPhone` (Will "Mark lodged"). `archiveTaskByPhone` swallows
errors, so a storage outage leaves the card in place and is retried by the next press.

Make it reversible by design (recommended before enabling): quarantine instead of delete.
1. In `deleteFiles` add `mode: 'quarantine'`: `storage.from('uploads').move(path, 'quarantine/<yyyy-mm-dd>/<path>')`.
   `move` is atomic per object and keeps the bytes.
2. Staff can restore within 30 days by moving back (runbook one-liner).
3. A nightly job (cron route with CRON_SECRET, like the other will jobs) removes
   `quarantine/` objects older than 30 days. That job is the only hard delete.
4. `/api/crm/file` must refuse the `quarantine/` prefix for normal views.
This needs Jo's sign-off on the 30 day window and on the Privacy Policy sentence.

## P2. Orphan sweep for abandoned pre-submit uploads
`src/lib/orphan-uploads.ts` (applied, pure, unused, 8 tests) decides which objects are
orphans. Rules: only `tax-form/` and `svt/tax-form/`; older than 14 days; not referenced
by ANY task (done or pending) by decoded path; unknown age kept; per-run cap 200.
Runner (to write after approval, dry-run by default):
1. List `tax-form/**` and `svt/tax-form/**` with the storage list API (service role, paged).
2. Read every `crm_tasks.file_urls` (paged). If any row fails to parse, ABORT (a parse failure
   must never shrink the referenced set).
3. `planOrphanSweep(...)`; print the plan (counts and paths hashed, never names).
4. With `--apply`, quarantine (P1 step 1), never hard delete. Run weekly from a manual script
   first (`scripts/`), move to cron only after two clean dry runs.
Why 14 days: the public form can stay open on a phone for days, and uploads happen before submit.

## P3. Legacy `tfn_norm` digits (finding F11 of round 1)
Run in the SQL editor after confirming the column exists. It is destructive by design
(removes TFN digits kept on done rows), so take a table export first and get Jo's approval:
```sql
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='crm_tasks' AND column_name='tfn_norm') THEN
    UPDATE crm_tasks SET tfn_norm = NULL WHERE done = true AND tfn_norm IS NOT NULL;
  END IF;
END $$;
```
Then add `tfn_norm: null` to the markTaskDone update only if the column exists in production.

## P4. Retention schedule that matches the Privacy Policy (needs the lawyer first)
Policy s8 says 5 to 7 years. Code today: TFN, bank, address, passport number and files are
removed at Done (shorter than the policy); name, email, WhatsApp, DOB, country and notes stay
forever in crm_clients/crm_leads; WhatsApp transcripts stay forever; pending and abandoned items
have no end date. Proposed classes (each period is a legal choice, not an engineering one):
| Data | Proposed trigger | Mechanism |
|---|---|---|
| Identity and bank documents, TFN, passport no. | Done (as now) | existing |
| Pending task never completed | 90 days after submit | quarantine files, blank TFN/bank/address, keep contact row |
| Abandoned upload with no task | 14 days | P2 |
| Client record (name, email, DOB, returns) | end of record-keeping period (TPB/ATO, ask supervising agent) | de-identify job |
| WhatsApp transcripts | 24 months after last message (suggested) | purge job on will_messages |
| form_funnel_events | 13 months | delete where created_at < now() - interval |
| Backups | follow the Supabase plan window; state it in the policy | none |
A deletion request (APP 12/13) also has to reach: crm_tasks, crm_clients, crm_leads,
will_customers/messages/tasks/suggestions/audit, Redis keys (TTL, hashed), Meta (media 30 days),
Anthropic (retention setting), Supabase backups (ages out). There is no single erase path today;
write `eraseCustomer(identity)` as a dry-run-first script, not an API route.
