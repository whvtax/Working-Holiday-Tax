-- ════════════════════════════════════════════════════════════════════════════
-- 013: Enable Row Level Security on the partners table
-- ════════════════════════════════════════════════════════════════════════════
-- Every other table (crm_clients, crm_tasks, crm_audit, form_funnel_events,
-- wa_*) enables RLS as a backstop so the anon key can never read or write it
-- (see 001_init_crm.sql). 003_partners.sql missed this step, leaving partners
-- (partner names, emails, referral codes) exposed to anyone holding the
-- project's anon key. Server code uses the service_role key, which bypasses
-- RLS, so enabling it changes nothing for the app.

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- No policies = no anonymous access. Only service_role can access.
