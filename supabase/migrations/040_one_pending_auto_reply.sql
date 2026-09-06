-- ============================================================
-- One pending Autopilot reply timer per customer, enforced by the database.
-- (audit3 core 32, 5 Sep)
--
-- Mirrors migration 034 for AUTO_REPLY. armAutoReply() is cancel-then-insert
-- and only cancels SCHEDULED rows; two messages seconds apart landing on two
-- lambdas could leave two SCHEDULED timers for the same person. When both
-- were due and two ticks ran at once, each claimed one, each saw the other as
-- a rival, both stood aside, and the customer's burst was never answered.
--
-- addJob() already treats a 23505 as "already armed, return the existing
-- row", and the surviving timer reads the whole burst when it fires, so the
-- second message is still answered in the one reply exactly as today.
-- ============================================================

-- Clear any duplicate the race has already produced, keeping the earliest
-- scheduled one per customer. Without this the index cannot be created.
DELETE FROM will_jobs a
USING will_jobs b
WHERE a.kind = 'AUTO_REPLY' AND a.status = 'SCHEDULED' AND (a.payload->>'debounce') = 'true'
  AND b.kind = 'AUTO_REPLY' AND b.status = 'SCHEDULED' AND (b.payload->>'debounce') = 'true'
  AND a.customer_id = b.customer_id
  AND a.customer_id IS NOT NULL
  AND (a.run_at, a.id) > (b.run_at, b.id);

CREATE UNIQUE INDEX IF NOT EXISTS will_jobs_one_pending_auto_reply
  ON will_jobs (customer_id)
  WHERE kind = 'AUTO_REPLY' AND status = 'SCHEDULED' AND (payload->>'debounce') = 'true';
