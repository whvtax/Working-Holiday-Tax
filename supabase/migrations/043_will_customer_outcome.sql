-- ════════════════════════════════════════════════════════════════════════════
-- 043 — Return outcome: refund (default) or tax payable (Jo, 1 Oct)
--
-- WHY THIS EXISTS
--   The 72-hour audit found "Your refund should arrive in your bank account
--   within 14 business days" sent to two customers who owed the ATO money,
--   and a Google review ask an hour after a $2.9k bill. Every money message
--   assumed a refund. Jo: default is refund, but one small toggle in the CRM
--   switches a customer to "tax payable" and every message from then on
--   (estimate, lodged confirmation, review ask, Will's replies) adapts.
--
-- WHAT IT ADDS
--   will_customers.outcome: NULL (= refund) | 'REFUND' | 'PAYABLE'.
-- ════════════════════════════════════════════════════════════════════════════
alter table public.will_customers
  add column if not exists outcome text
  check (outcome is null or outcome in ('REFUND', 'PAYABLE'));
