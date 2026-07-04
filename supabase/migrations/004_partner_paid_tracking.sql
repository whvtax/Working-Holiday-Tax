-- Persistent "mark paid / undo" tracking for partner commissions.
-- Without this, commission owed was always recomputed live from referral
-- counts, so there was no way to record that a payout actually happened —
-- the UI would show the same amount owed forever even after paying it.
--
-- paid_through_count = how many paid referrals have already been settled.
-- Owed commission = (current paid referrals - paid_through_count) * 20.
--
-- prev_paid_through_count stores the previous value so "Undo" can revert
-- exactly one "Mark paid" action.

ALTER TABLE partners ADD COLUMN IF NOT EXISTS paid_through_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS prev_paid_through_count INTEGER;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS last_paid_at TIMESTAMPTZ;
