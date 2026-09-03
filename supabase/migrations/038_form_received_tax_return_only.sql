-- ============================================================
-- FORM_RECEIVED fires for the tax questionnaire only (audit, 3 Sep).
--
-- will_on_form_received() enqueued a FORM_RECEIVED job for ANY crm_tasks row
-- carrying a matching WhatsApp number: the superannuation form, a TFN or ABN
-- application, or a task the owner creates by hand. A paid customer who filled
-- the super form BEFORE the tax questionnaire was moved to Form Complete, told
-- "we've received your questionnaire", asked the ABN questions, and never
-- chased for the questionnaire we did not have.
--
-- Same function, one extra condition: only a 'tax-return' task counts. The
-- app-side enqueue (form-link.ts, called by /api/tax-form) keeps working as
-- before; the SCHEDULED-dedupe line below already stops the two from stacking.
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
