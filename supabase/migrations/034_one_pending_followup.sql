-- ============================================================
-- One pending follow-up per customer, enforced by the database.
--
-- THE RACE. reconcileSchedule() is a read-modify-write: cancel what is pending,
-- count how many of this flow are DONE, insert the next one. The per-customer
-- mutex that is supposed to protect it says so in its own comment, and is
-- explicitly an IN-PROCESS map. The webhook invocation and the cron tick are
-- different processes, so it does not span them.
--
-- The window is small and completely realistic: the customer replies to
-- follow-up #1 at the moment the tick is sending #2. The tick has written DONE
-- and is about to schedule #3; the webhook concurrently cancels (nothing
-- pending yet), counts, and inserts its own. Two SCHEDULED follow-ups for one
-- person.
--
-- WHY THAT IS WORSE THAN A DUPLICATE REPLY. A follow-up goes, by definition, to
-- somebody who has gone quiet and is already being chased. Two nudges in a row
-- reads as harassment, and templates are metered and reputation-scored by Meta.
--
-- A partial unique index is the only place this can be enforced correctly,
-- because the check and the insert have to be one atomic operation. Node cannot
-- do that across two processes; Postgres does it for free.
--
-- addJob() treats a 23505 on this index as "already armed, nothing to do",
-- which is the same shape claimInbound already uses on will_processed_messages.
-- ============================================================

-- Clear any duplicate that the race has already produced, keeping the earliest
-- scheduled one per customer. Without this the index cannot be created.
DELETE FROM will_jobs a
USING will_jobs b
WHERE a.kind = 'FOLLOW_UP' AND a.status = 'SCHEDULED'
  AND b.kind = 'FOLLOW_UP' AND b.status = 'SCHEDULED'
  AND a.customer_id = b.customer_id
  AND a.customer_id IS NOT NULL
  AND (a.run_at, a.id) > (b.run_at, b.id);

CREATE UNIQUE INDEX IF NOT EXISTS will_jobs_one_pending_followup
  ON will_jobs (customer_id)
  WHERE kind = 'FOLLOW_UP' AND status = 'SCHEDULED';
