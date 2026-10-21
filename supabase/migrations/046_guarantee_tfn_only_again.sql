-- ============================================================
-- The guarantee is TFN-only again. Jo, 21 Oct (Norina, +33 7 62):
-- "when the customer says from the start that they have ABN income,
-- drop the commitment sentence."
--
-- The code side (approved-messages.ts, instant-choice.ts, engine.ts and
-- the prompts) is updated; this fixes the LIVE Library rows for the
-- TFN + ABN price message, which still carry the guarantee. Same principle
-- as migrations 032 and 036: only the exact sentence is removed, so a row
-- Jo has reworded since is touched only if it still contains it verbatim.
-- variant_b (the A/B copy) gets the same treatment.
-- Safe to run more than once.
-- ============================================================

UPDATE will_templates
SET body = replace(body,
  E'\n\nIf your tax refund is less than our fee, we''ll refund the difference. If there''s no refund, our full fee applies.',
  '')
WHERE key = 'price_tfn_abn'
  AND body LIKE '%If your tax refund is less than our fee, we''ll refund the difference. If there''s no refund, our full fee applies.%';

UPDATE will_templates
SET variant_b = replace(variant_b,
  E'\n\nIf your tax refund is less than our fee, we''ll refund the difference. If there''s no refund, our full fee applies.',
  '')
WHERE key = 'price_tfn_abn'
  AND variant_b LIKE '%If your tax refund is less than our fee, we''ll refund the difference. If there''s no refund, our full fee applies.%';
