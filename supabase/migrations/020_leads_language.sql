-- ════════════════════════════════════════════════════════════════════════════
-- Migration 020: make the language column mean something
--
-- crm_leads.lang has been sitting at its default 'en' for every row, because
-- nothing ever wrote to it - the trigger never set it. The CSV export has a
-- "Language" column that was therefore always wrong for German and Japanese
-- clients, which is worse than not having it at all: it looks like data.
--
-- Form 1 records the interface language in the task notes as "Lang: de". This
-- reads it from there. Submissions through the original /tax-form carry no
-- language, so those stay 'en' - which is the right default, since the original
-- form is what English-speaking partner traffic uses.
--
-- Run after 019.
-- Run in: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION crm_lead_lang(notes TEXT) RETURNS TEXT AS $$
DECLARE
  found TEXT;
BEGIN
  found := substring(coalesce(notes, '') from 'Lang: (en|de|ja)');
  RETURN coalesce(found, 'en');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Backfill from the tasks that recorded one.
UPDATE crm_leads l
SET lang = t.lang
FROM (
  SELECT DISTINCT ON (crm_norm_email(email))
         crm_norm_email(email) AS norm, crm_lead_lang(notes) AS lang
  FROM crm_tasks
  WHERE email LIKE '%@%' AND notes ~ 'Lang: (en|de|ja)'
  ORDER BY crm_norm_email(email), submitted_at DESC
) t
WHERE l.email_norm = t.norm;

-- ── Capture, now including the language ────────────────────────────────────
CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
DECLARE
  e_norm   TEXT;
  p_norm   TEXT;
  l_lang   TEXT;
  existing TEXT;
BEGIN
  IF NEW.email IS NULL OR btrim(NEW.email) = '' OR NEW.email NOT LIKE '%@%' THEN
    RETURN NEW;
  END IF;

  e_norm := crm_norm_email(NEW.email);
  p_norm := nullif(crm_norm_phone(NEW.whatsapp), '');
  l_lang := crm_lead_lang(NEW.notes);

  -- Email is the stronger identifier, so it's checked first; the number is the
  -- fallback for someone returning with a new address.
  SELECT email INTO existing FROM crm_leads WHERE email_norm = e_norm LIMIT 1;
  IF existing IS NULL AND p_norm IS NOT NULL THEN
    SELECT email INTO existing FROM crm_leads WHERE whatsapp_norm = p_norm LIMIT 1;
  END IF;

  IF existing IS NOT NULL THEN
    UPDATE crm_leads SET
      full_name     = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE full_name END,
      whatsapp      = CASE WHEN coalesce(NEW.whatsapp, '')    <> '' THEN NEW.whatsapp    ELSE whatsapp  END,
      whatsapp_norm = coalesce(p_norm, whatsapp_norm),
      -- Only overwrite when the task actually stated a language, so a later
      -- write that carries none can't reset someone to English.
      lang          = CASE WHEN NEW.notes ~ 'Lang: (en|de|ja)' THEN l_lang ELSE lang END,
      source        = CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      updated_at    = now()
    WHERE email = existing;
  ELSE
    INSERT INTO crm_leads (email, email_norm, full_name, whatsapp, whatsapp_norm, lang, source, created_at, updated_at)
    VALUES (
      lower(btrim(NEW.email)), e_norm,
      coalesce(NEW.client_name, ''),
      coalesce(NEW.whatsapp, ''), p_norm,
      l_lang,
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      coalesce(NEW.submitted_at, now()), now()
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_crm_capture_lead ON crm_tasks;
CREATE TRIGGER trg_crm_capture_lead
  AFTER INSERT OR UPDATE OF email, client_name, whatsapp, notes ON crm_tasks
  FOR EACH ROW EXECUTE FUNCTION crm_capture_lead();

-- ════════════════════════════════════════════════════════════════════════════
-- Verify:
--   select lang, count(*) from crm_leads group by lang;
-- ════════════════════════════════════════════════════════════════════════════
