-- ════════════════════════════════════════════════════════════════════════════
-- Migration 018: keep the WhatsApp number on the list too
--
-- Email stays the identity - one person, one row, keyed on the normalised
-- address (migration 017). The WhatsApp number is stored alongside it so the
-- list can be used for WhatsApp broadcasts as well as email.
--
-- Stored exactly as the client typed it, because that's what has to be dialled.
-- It is never used for deduplication: two people can share a phone (couples
-- travelling together do), and merging them would be worse than a rare
-- duplicate number.
--
-- Run after 016 and 017.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS whatsapp TEXT NOT NULL DEFAULT '';

-- Backfill from tasks, newest first so the most recent number wins.
UPDATE crm_leads l
SET whatsapp = t.whatsapp
FROM (
  SELECT DISTINCT ON (crm_norm_email(email))
         crm_norm_email(email) AS norm, whatsapp
  FROM crm_tasks
  WHERE email LIKE '%@%' AND coalesce(whatsapp, '') <> ''
  ORDER BY crm_norm_email(email), submitted_at DESC
) t
WHERE l.email_norm = t.norm AND l.whatsapp = '';

-- And from clients, for anyone tasks didn't cover.
UPDATE crm_leads l
SET whatsapp = c.whatsapp
FROM (
  SELECT DISTINCT ON (crm_norm_email(email))
         crm_norm_email(email) AS norm, whatsapp
  FROM crm_clients
  WHERE email LIKE '%@%' AND coalesce(whatsapp, '') <> ''
  ORDER BY crm_norm_email(email), created_at DESC
) c
WHERE l.email_norm = c.norm AND l.whatsapp = '';

-- ── Capture, now including the number ──────────────────────────────────────
CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL
     AND btrim(NEW.email) <> ''
     AND NEW.email LIKE '%@%'
  THEN
    INSERT INTO crm_leads (email, email_norm, full_name, whatsapp, source, country, created_at, updated_at)
    VALUES (
      lower(btrim(NEW.email)),
      crm_norm_email(NEW.email),
      coalesce(NEW.client_name, ''),
      coalesce(NEW.whatsapp, ''),
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      coalesce(NEW.country, ''),
      coalesce(NEW.submitted_at, now()),
      now()
    )
    ON CONFLICT (email_norm) DO UPDATE SET
      -- Each field refreshes only when the incoming value isn't blank, so a
      -- partial later write can't wipe something already known.
      full_name  = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE crm_leads.full_name END,
      whatsapp   = CASE WHEN coalesce(NEW.whatsapp, '')    <> '' THEN NEW.whatsapp    ELSE crm_leads.whatsapp  END,
      country    = CASE WHEN coalesce(NEW.country, '')     <> '' THEN NEW.country     ELSE crm_leads.country   END,
      updated_at = now();
      -- unsubscribed is never reset: submitting again must not opt someone in.
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_crm_capture_lead ON crm_tasks;
CREATE TRIGGER trg_crm_capture_lead
  AFTER INSERT OR UPDATE OF email, client_name, country, whatsapp ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION crm_capture_lead();

-- ════════════════════════════════════════════════════════════════════════════
-- Verify:
--   select count(*) filter (where whatsapp <> '') as with_number,
--          count(*)                               as total
--   from crm_leads;
--
-- Still no duplicates (must return zero rows):
--   select email_norm, count(*) from crm_leads group by email_norm having count(*) > 1;
-- ════════════════════════════════════════════════════════════════════════════
