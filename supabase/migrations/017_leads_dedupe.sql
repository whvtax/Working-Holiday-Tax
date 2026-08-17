-- ════════════════════════════════════════════════════════════════════════════
-- Migration 017: one person, one row — permanently
--
-- crm_leads already keys on email, so the same address can't appear twice. This
-- migration closes the gap that keying on the raw string leaves open:
-- addresses that are written differently but land in the same inbox.
--
--   john.smith@gmail.com
--   johnsmith@gmail.com          ← Gmail ignores dots
--   john.smith+tax@gmail.com     ← everything after + is ignored
--   John.Smith@Gmail.com         ← case
--   john.smith@googlemail.com    ← same mailbox as gmail.com
--
-- All five are one person. Without normalisation, a client who comes back next
-- year and types their address slightly differently becomes a second row and
-- gets mailed twice.
--
-- The original address is still kept in `email` and is what you send to. The
-- normalised form exists only to decide whether two rows are the same person.
--
-- Safe to run whether or not migration 016 has already been applied.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

-- ── The normalisation rule ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION crm_norm_email(addr TEXT) RETURNS TEXT AS $$
DECLARE
  clean  TEXT;
  local  TEXT;
  domain TEXT;
BEGIN
  clean := lower(btrim(coalesce(addr, '')));
  IF clean = '' OR position('@' in clean) = 0 THEN
    RETURN clean;
  END IF;

  local  := split_part(clean, '@', 1);
  domain := split_part(clean, '@', 2);

  -- Everything from a + onwards is an alias on every major provider.
  local := split_part(local, '+', 1);

  -- Dots are ignored by Gmail only. Applying this to every domain would merge
  -- genuinely different people on providers where dots are significant.
  IF domain IN ('gmail.com', 'googlemail.com') THEN
    local  := replace(local, '.', '');
    domain := 'gmail.com';
  END IF;

  RETURN local || '@' || domain;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ── Column + backfill ─────────────────────────────────────────────────────
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS email_norm TEXT;

UPDATE crm_leads SET email_norm = crm_norm_email(email) WHERE email_norm IS NULL;

-- Collapse any duplicates that already slipped in, keeping the oldest row (the
-- first time this person reached us) and carrying over an unsubscribe from any
-- of its twins - opting out must never be lost to a merge.
WITH ranked AS (
  SELECT email, email_norm,
         row_number() OVER (PARTITION BY email_norm ORDER BY created_at ASC) AS rn,
         bool_or(unsubscribed) OVER (PARTITION BY email_norm)                AS any_unsub
  FROM crm_leads
)
UPDATE crm_leads l
SET unsubscribed = r.any_unsub
FROM ranked r
WHERE l.email = r.email AND r.rn = 1 AND r.any_unsub = true;

DELETE FROM crm_leads l
USING (
  SELECT email, row_number() OVER (PARTITION BY email_norm ORDER BY created_at ASC) AS rn
  FROM crm_leads
) d
WHERE l.email = d.email AND d.rn > 1;

-- ── The guarantee ─────────────────────────────────────────────────────────
-- A unique index, not application logic: this holds no matter what writes to
-- the table, now or in future.
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email_norm ON crm_leads (email_norm);

-- ── Capture, now deduplicating on the normalised address ───────────────────
CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL
     AND btrim(NEW.email) <> ''
     AND NEW.email LIKE '%@%'
  THEN
    INSERT INTO crm_leads (email, email_norm, full_name, source, country, created_at, updated_at)
    VALUES (
      lower(btrim(NEW.email)),
      crm_norm_email(NEW.email),
      coalesce(NEW.client_name, ''),
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      coalesce(NEW.country, ''),
      coalesce(NEW.submitted_at, now()),
      now()
    )
    -- Conflict on the normalised address, so a returning client who types their
    -- address differently updates their existing row instead of creating a
    -- second one.
    ON CONFLICT (email_norm) DO UPDATE SET
      full_name  = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE crm_leads.full_name END,
      country    = CASE WHEN coalesce(NEW.country, '')     <> '' THEN NEW.country     ELSE crm_leads.country   END,
      updated_at = now();
      -- email is left as first supplied, and unsubscribed is never reset:
      -- submitting again must not opt someone back in.
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_crm_capture_lead ON crm_tasks;
CREATE TRIGGER trg_crm_capture_lead
  AFTER INSERT OR UPDATE OF email, client_name, country ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION crm_capture_lead();

-- ════════════════════════════════════════════════════════════════════════════
-- Verify:
--
-- Should return zero rows — if it ever doesn't, the guarantee has been broken:
--   select email_norm, count(*) from crm_leads
--   group by email_norm having count(*) > 1;
--
-- See the rule in action:
--   select crm_norm_email('John.Smith+tax@Googlemail.com');  -- johnsmith@gmail.com
--   select crm_norm_email('John.Smith@outlook.com');         -- john.smith@outlook.com
-- ════════════════════════════════════════════════════════════════════════════
