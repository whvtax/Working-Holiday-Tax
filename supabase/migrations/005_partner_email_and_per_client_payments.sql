-- Partner email (for contact/payment purposes)
ALTER TABLE partners ADD COLUMN IF NOT EXISTS email TEXT;

-- Per-client commission payment tracking. Replaces the old aggregate
-- paid_through_count snapshot with a granular, auditable record: each
-- referred client has its own paid/unpaid status and timestamp, so you can
-- mark commission paid client-by-client, and the timestamp itself doubles
-- as the payment history log (just query clients where this is set,
-- ordered by the timestamp).
ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS referral_commission_paid_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_clients_referral_commission_paid_at
  ON crm_clients(referral_commission_paid_at) WHERE referral_commission_paid_at IS NOT NULL;
