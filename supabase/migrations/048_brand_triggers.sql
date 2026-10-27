-- ============================================================
-- 048: the two crm_tasks triggers learn the brand (run right after 047).
--
-- Final launch review, 27 Oct: 047 added `brand` to will_customers, crm_tasks
-- and crm_leads, but two triggers on crm_tasks still matched across brands:
--   - will_on_form_received(): an SVT questionnaire could mark a WHT
--     customer's form complete (and send WHT's "we've received your
--     questionnaire"), or the reverse, when one person is mid-flow on both.
--   - crm_capture_lead(): every SVT submission became a WHT lead (column
--     default), or updated the same person's WHT lead.
-- Same functions as 038 and 020, plus a brand match. For WHT rows nothing
-- changes: every existing row is 'wht'. Idempotent (CREATE OR REPLACE).
-- ============================================================
CREATE OR REPLACE FUNCTION will_on_form_received() RETURNS TRIGGER AS $$
DECLARE
  p_norm TEXT;
  cust   TEXT;
BEGIN
  IF coalesce(NEW.task_type, 'tax-return') <> 'tax-return' THEN RETURN NEW; END IF;

  p_norm := nullif(crm_norm_phone(NEW.whatsapp), '');
  IF p_norm IS NULL THEN RETURN NEW; END IF;

  SELECT id INTO cust
  FROM will_customers
  WHERE wa_norm = p_norm
    AND brand = coalesce(NEW.brand, 'wht')
    AND state IN ('PAID', 'FORM_PENDING')
  LIMIT 1;
  IF cust IS NULL THEN RETURN NEW; END IF;

  IF EXISTS (SELECT 1 FROM will_jobs WHERE customer_id = cust
             AND kind = 'FORM_RECEIVED' AND status IN ('SCHEDULED', 'CLAIMED')) THEN
    RETURN NEW;
  END IF;

  INSERT INTO will_jobs (id, customer_id, kind, payload, run_at, status, created_at)
  VALUES (
    'job_form_' || cust || '_' || floor(extract(epoch from now()))::text,
    cust, 'FORM_RECEIVED',
    jsonb_build_object('taskId', NEW.id),
    now(), 'SCHEDULED', now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION crm_capture_lead() RETURNS TRIGGER AS $$
DECLARE
  e_norm   TEXT;
  p_norm   TEXT;
  l_lang   TEXT;
  existing TEXT;
  ex_brand TEXT;
  t_brand  TEXT := coalesce(NEW.brand, 'wht');
BEGIN
  IF NEW.email IS NULL OR btrim(NEW.email) = '' OR NEW.email NOT LIKE '%@%' THEN
    RETURN NEW;
  END IF;

  e_norm := crm_norm_email(NEW.email);
  p_norm := nullif(crm_norm_phone(NEW.whatsapp), '');
  l_lang := crm_lead_lang(NEW.notes);

  SELECT email, brand INTO existing, ex_brand FROM crm_leads WHERE email_norm = e_norm LIMIT 1;
  IF existing IS NULL AND p_norm IS NOT NULL THEN
    SELECT email, brand INTO existing, ex_brand FROM crm_leads WHERE whatsapp_norm = p_norm AND brand = t_brand LIMIT 1;
  END IF;

  -- The same email already belongs to the other brand's list: leave that
  -- lead alone (the email is the key, so a second row cannot exist).
  IF existing IS NOT NULL AND ex_brand IS DISTINCT FROM t_brand THEN
    RETURN NEW;
  END IF;

  IF existing IS NOT NULL THEN
    UPDATE crm_leads SET
      full_name     = CASE WHEN coalesce(NEW.client_name, '') <> '' THEN NEW.client_name ELSE full_name END,
      whatsapp      = CASE WHEN coalesce(NEW.whatsapp, '')    <> '' THEN NEW.whatsapp    ELSE whatsapp  END,
      whatsapp_norm = coalesce(p_norm, whatsapp_norm),
      lang          = CASE WHEN NEW.notes ~ 'Lang: (en|de|ja)' THEN l_lang ELSE lang END,
      source        = CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      updated_at    = now()
    WHERE email = existing;
  ELSE
    INSERT INTO crm_leads (email, email_norm, full_name, whatsapp, whatsapp_norm, lang, source, brand, created_at, updated_at)
    VALUES (
      lower(btrim(NEW.email)), e_norm,
      coalesce(NEW.client_name, ''),
      coalesce(NEW.whatsapp, ''), p_norm,
      l_lang,
      CASE WHEN coalesce(NEW.source, '') = '' THEN 'tax-form' ELSE NEW.source END,
      t_brand,
      coalesce(nullif(NEW.submitted_at, '')::timestamptz, now()), now()
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
