-- ============================================================
-- The money-back guarantee is TFN-only. Jo, 29 Aug:
-- "יש ABN, אין התחייבות להחזר כספי, היא יורדת."
--
-- The code side (Will's playbook, the mining prompts, the seed answers) is
-- already updated; this fixes the LIVE Library rows, which were seeded before
-- the rule existed. Each UPDATE replaces one exact sentence with its scoped
-- version, so an answer Jo has since reworded is only touched if it still
-- contains the original sentence verbatim, same principle as migration 032:
-- an owner edit is never silently rewritten.
-- ============================================================

UPDATE will_knowledge SET answer = replace(answer,
  'if your refund ends up lower than our fee, we refund you the difference, so you are never out of pocket for our service.',
  'for TFN-only returns, if your refund ends up lower than our fee, we refund you the difference, so you are never out of pocket for our service.')
WHERE answer LIKE '%if your refund ends up lower than our fee, we refund you the difference%';

UPDATE will_knowledge SET answer = replace(answer,
  'and if your refund is lower than our fee, we refund the difference.',
  'and on TFN-only returns, if your refund is lower than our fee, we refund the difference.')
WHERE answer LIKE '%and if your refund is lower than our fee, we refund the difference.%';

UPDATE will_knowledge SET answer = replace(answer,
  'If your refund is less than the fee, we refund the difference, so you''re never out of pocket for our service.',
  'For TFN-only returns: if your refund is less than the fee, we refund the difference, so you''re never out of pocket for our service. (This guarantee doesn''t apply when there''s ABN income.)')
WHERE answer LIKE '%If your refund is less than the fee, we refund the difference, so you''re never out of pocket%';

UPDATE will_knowledge SET answer = replace(answer,
  'You only pay if you''re eligible for a refund, and if it turns out to be less than our fee, we refund the difference, so you''re never out of pocket for our service.',
  'You only pay if you''re eligible for a refund, and on TFN-only returns, if it turns out to be less than our fee, we refund the difference, so you''re never out of pocket for our service.')
WHERE answer LIKE '%You only pay if you''re eligible for a refund, and if it turns out to be less than our fee%';

UPDATE will_knowledge SET answer = replace(answer,
  'prepares and lodges the return for you, and if your refund is less than our fee we refund the difference.',
  'prepares and lodges the return for you, and on TFN-only returns, if your refund is less than our fee we refund the difference.')
WHERE answer LIKE '%prepares and lodges the return for you, and if your refund is less than our fee we refund the difference.%';

UPDATE will_knowledge SET answer = replace(answer,
  'One flat fee, no extras, and if your refund is less than the fee, we refund the difference.',
  'One flat fee, no extras, and on TFN-only returns, if your refund is less than the fee, we refund the difference.')
WHERE answer LIKE '%One flat fee, no extras, and if your refund is less than the fee%';

UPDATE will_knowledge SET answer = replace(answer,
  'a specialist reviews your full situation and prepares and lodges everything, and if your refund is less than the fee we refund the difference.',
  'a specialist reviews your full situation and prepares and lodges everything, and on TFN-only returns, if your refund is less than the fee we refund the difference.')
WHERE answer LIKE '%a specialist reviews your full situation and prepares and lodges everything, and if your refund is less than the fee%';

-- The check: how many live answers still carry an UNSCOPED guarantee sentence.
-- 0 rows = done. Any rows returned are answers Jo reworded himself, he can
-- scope those by hand in the Library, or ignore them if he already did.
SELECT id, question, left(answer, 120) AS answer_start
FROM will_knowledge
WHERE answer ILIKE '%refund the difference%'
  AND answer NOT ILIKE '%TFN-only%';
