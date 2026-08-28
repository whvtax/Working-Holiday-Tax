-- ============================================================
-- The estimate + invoice message, laid out the way Jo wants it read.
--
-- WHY A MIGRATION AND NOT JUST THE CONSTANT. The send path reads the LIBRARY
-- copy (libraryBody('estimate_invoice')) so the owner's edits go live without a
-- deploy. That copy was seeded once from the constant in approved-messages.ts,
-- so changing the constant alone would change nothing in production: the row is
-- already there and seeding does not overwrite it.
--
-- WHAT IT CHANGES. The amount gets its own paragraph and the invoice link its
-- own line, so WhatsApp renders the link as a link instead of running it into
-- the sentence before it.
--
-- WHY THE WHERE CLAUSE. It only rewrites the row if the body is still the exact
-- text that was seeded. If Jo has edited this message in the Library since,
-- HIS wording wins and this does nothing: an owner edit must never be silently
-- reverted by a deploy.
-- ============================================================
UPDATE will_templates
SET body = 'Your estimated tax refund is {{AMOUNT}}.

I''ll send it for final review, then to you for signature.
Here is your invoice:
 {{INVOICE_LINK}}',
    versions = versions + 1,
    updated_at = now()
WHERE key = 'estimate_invoice'
  AND body = 'Your estimated tax refund is {{AMOUNT}}.
I''ll send it for final review, then to you for signature.
Here is your invoice: {{INVOICE_LINK}}';
