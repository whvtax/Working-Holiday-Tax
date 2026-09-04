-- Index the WhatsApp message id we store inside will_messages.meta.
--
-- WHY (audit, 4 Sep). Every delivery receipt, read receipt, reaction and edited
-- message Meta sends is matched back to our row by meta->>'providerId'. There
-- was no index on that expression, so each one was a full scan of the whole
-- messages table. At a few thousand messages that is invisible; at the volume
-- this business is heading for (5,000 customers a year) it is the single
-- hottest query in the system, and it runs several times per outbound message.
--
-- Partial: only rows that actually carry a providerId (our outbound sends),
-- which is a small fraction of the table.
CREATE INDEX IF NOT EXISTS will_messages_provider_id_idx
  ON will_messages ((meta->>'providerId'))
  WHERE meta ? 'providerId';

-- Follow-up bookkeeping reads every job for one customer on each state change
-- and each inbound message (reconcileSchedule, the debounce supersession
-- check). Same reasoning: cheap now, the hottest write-path read later.
CREATE INDEX IF NOT EXISTS will_jobs_customer_kind_idx
  ON will_jobs (customer_id, kind, status);
