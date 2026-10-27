-- ============================================================
-- Brand on every customer-level record (tax forms in crm_tasks included) (Student Visa Tax, 26 Oct).
-- Architecture: docs/engineering/ARCHITECTURE.md, "Data".
--
-- One CRM serves two brands that are fully separate to customers. Every
-- customer, client, lead and funnel event records which brand it came from,
-- so replies, templates, reports and invoices never cross over.
--
-- Backward compatible and non-destructive:
--   - ADD COLUMN ... NOT NULL DEFAULT 'wht': every existing row is Working
--     Holiday Tax, which is true, and code that does not know about the
--     column keeps working and keeps writing WHT rows.
--   - No row is changed apart from receiving the default. Nothing is dropped.
--   - The brand is set by the SERVER from the request host (src/lib/brand.ts),
--     never from a value the customer sends (milestone 4).
--   - Safe to run more than once (IF NOT EXISTS / guarded constraint).
--
-- NOT APPLIED YET. Apply before deploying the milestone 4 code that writes
-- brand = 'svt', after a database backup (DEPLOYMENT_CHECKLIST.md).
-- ============================================================

ALTER TABLE will_customers      ADD COLUMN IF NOT EXISTS brand text NOT NULL DEFAULT 'wht';
ALTER TABLE crm_tasks           ADD COLUMN IF NOT EXISTS brand text NOT NULL DEFAULT 'wht';
ALTER TABLE crm_clients         ADD COLUMN IF NOT EXISTS brand text NOT NULL DEFAULT 'wht';
ALTER TABLE crm_leads           ADD COLUMN IF NOT EXISTS brand text NOT NULL DEFAULT 'wht';
ALTER TABLE form_funnel_events  ADD COLUMN IF NOT EXISTS brand text NOT NULL DEFAULT 'wht';

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['will_customers', 'crm_tasks', 'crm_clients', 'crm_leads', 'form_funnel_events'] LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = t || '_brand_check'
    ) THEN
      EXECUTE format('ALTER TABLE %I ADD CONSTRAINT %I CHECK (brand IN (''wht'', ''svt''))', t, t || '_brand_check');
    END IF;
  END LOOP;
END $$;

-- One Will customer per phone number PER BRAND (decision 004). A student who
-- was a WHT customer on a working holiday visa and now writes to the SVT
-- number is a separate conversation, answered from the SVT number. The old
-- single-column UNIQUE(wa_id) is replaced by UNIQUE(wa_id, brand). Nothing in
-- the code relies on wa_id alone being unique (no ON CONFLICT on it), and
-- duplicates within one brand are still impossible.
DO $$
DECLARE c text;
BEGIN
  FOR c IN
    SELECT con.conname FROM pg_constraint con
    JOIN pg_attribute a ON a.attrelid = con.conrelid AND a.attnum = ANY (con.conkey)
    WHERE con.conrelid = 'will_customers'::regclass AND con.contype = 'u'
      AND array_length(con.conkey, 1) = 1 AND a.attname = 'wa_id'
  LOOP
    EXECUTE format('ALTER TABLE will_customers DROP CONSTRAINT %I', c);
  END LOOP;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS will_customers_wa_id_brand_key ON will_customers (wa_id, brand);

-- The CRM lists customers by brand and state, newest first.
CREATE INDEX IF NOT EXISTS idx_will_customers_brand_state ON will_customers (brand, state);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_brand_submitted ON crm_tasks (brand, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_clients_brand_created  ON crm_clients (brand, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_brand            ON crm_leads (brand);
