-- 11 Oct 2026 (full audit, decision 13): a fee refund the team promised in
-- the chat is tracked until it is sent. Nine customers waited one to four
-- weeks; two got a Google review ask while money was owed to them.
alter table public.will_customers add column if not exists refund_promised_at timestamptz;
alter table public.will_customers add column if not exists refund_sent_at timestamptz;
alter table public.will_customers add column if not exists refund_amount_cents integer;
