-- ════════════════════════════════════════════════════════════════════════════
-- Migration 019: WhatsApp is an identity too, and country goes
--
-- Two changes:
--
--  1. The list no longer keeps country. Not needed for a mailing list.
--
--  2. The WhatsApp number now deduplicates as well as the email. One person can
--     reach us with two email addresses over two years; if the number matches,
--     it's the same person and it stays one row.
--
-- Because there are now two ways to recognise someone, the trigger can't use a
-- plain ON CONFLICT any more: a submission can match an existing row on either
-- key. It looks the person up first, then updates or inserts.
--
-- Numbers are matched digits-only, so all of these are one person:
--   +44 7712 445901 / 0044 7712 445901 / 447712445901 / +447712445901
--
-- Run after 016, 017 and 018.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE crm_leads DROP COLUMN IF EXISTS country;

-- ── Number normalisation ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION crm_norm_phone(num TEXT) RETURNS TEXT AS $$
DECLARE
  digits TEXT;
BEGIN
  digits := regexp_replace(coalesce(num, ''), '\D', '', 'g');
  IF digits = '' THEN RETURN ''; END IF;

  -- 00 is the same international prefix as +, written the other way.
  IF left(digits, 2) = '00' THEN
    digits := substr(digits, 3);
  END IF;

  -- Too short to identify anyone; treat as absent rather than risk a merge.
  IF length(digits) < 7 THEN RETURN ''; END IF;

  RETURN digits;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS whatsapp_norm TEXT;
UPDATE crm_leads SET whatsapp_norm = crm_norm_phone(whatsapp) WHERE whatsapp_norm IS NULL;
UPDATE crm_leads SET whatsapp_norm = NULL WHERE whatsapp_norm = '';

-- ── Collapse anyone already duplicated by number ───────────────────────────
-- Oldest row wins, and an unsubscribe on any of the twins carries across:
-- opting out must never be undone by a merge.
WITH ranked AS (
  SELECT email, whatsapp_norm,
         row_number() OVER (PARTITION BY whatsapp_norm ORDER BY created_at ASC) AS rn,
         bool_or(unsubscribed) OVER (PARTITION BY whatsapp_norm)                AS any_unsub
  FROM crm_leads
  WHERE whatsapp_norm IS NOT NULL
)
UPDATE crm_leads l
SET unsubscribed = r.any_unsub
FROM ranked r
WHERE l.email = r.email AND r.rn = 1 AND r.any_unsub = true;

DELETE FROM crm_leads l
USING (
  SELECT email, row_number() OVER (PARTITION BY whatsapp_norm ORDER BY created_at ASC) AS rn
  FROM crm_leads
  WHERE whatsapp_norm IS NOT NULL
) d
WHERE l.email = d.email AND d.rn > 1;

-- Partial index: rows without a number don't compete for uniqueness.
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_whatsapp_norm
  ON crm_leads (whatsapp_norm) WHERE whatsapp_norm IS NOT NULL;

-- ── Capture: match on either key ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
DECLARE
  e_norm   TEXT;
  p_norm   TEXT;
  existing TEXT;   -- email (primary key) of the row this person already has
BEGIN
  IF NEW.email IS NULL OR btrim(NEW.email) = '' OR NEW.email NOT LIKE '%@%' THEN
    RETURN NEW;
  END IF;

  e_norm := crm_norm_email(NEW.email);
  p_norm := nullif(crm_norm_phone(NEW.whatsapp), '');

  -- Email is checked first: it's the stronger identifier of the two.
  SELECT email INTO existing FROM crm_leads WHERE email_norm = e_norm LIMIT 1;

  IF existing IS NULL AND p_norm IS NOT NULL THEN
    SELECT email INTO existing FROM crm_leads WHERE whatsapp_norm = p_norm LIMIT 1;
  END IF;

  IF existing IS NOT NULL THEN
    -- Each field refreshes only when the incoming value isn't blank, so a later
    -- partial write can't wipe something already known. unsubscribed is never
    -- reset: submitting again must not opt someone back in.
    UPDATE crm_leads SET
      full_name     = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE full_name END,
      whatsapp      = CASE WHEN coalesce(NEW.whatsapp, '')    <> '' THEN NEW.whatsapp    ELSE whatsapp  END,
      whatsapp_norm = coalesce(p_norm, whatsapp_norm),
      source        = CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      updated_at    = now()
    WHERE email = existing;
  ELSE
    INSERT INTO crm_leads (email, email_norm, full_name, whatsapp, whatsapp_norm, source, created_at, updated_at)
    VALUES (
      lower(btrim(NEW.email)), e_norm,
      coalesce(NEW.client_name, ''),
      coalesce(NEW.whatsapp, ''), p_norm,
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      coalesce(nullif(NEW.submitted_at, '')::timestamptz, now()), now()
    )
    -- Belt and braces: if two submissions land at the same instant, the unique
    -- indexes still hold and the loser simply does nothing.
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_crm_capture_lead ON crm_tasks;
CREATE TRIGGER trg_crm_capture_lead
  AFTER INSERT OR UPDATE OF email, client_name, whatsapp ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION crm_capture_lead();

-- ════════════════════════════════════════════════════════════════════════════
-- Verify — both must return zero rows:
--   select email_norm, count(*) from crm_leads group by email_norm having count(*) > 1;
--   select whatsapp_norm, count(*) from crm_leads where whatsapp_norm is not null
--     group by whatsapp_norm having count(*) > 1;
--
-- See the rule:
--   select crm_norm_phone('+44 7712 445901');   -- 447712445901
--   select crm_norm_phone('0044 7712 445901');  -- 447712445901
-- ════════════════════════════════════════════════════════════════════════════
