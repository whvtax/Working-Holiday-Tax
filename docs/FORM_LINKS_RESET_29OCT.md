# Questionnaire links reset (Jo, 29 Oct 2026)

Every questionnaire page now has a random address. The old addresses no longer
open a form: they open "This link opens after payment" (en, de, ja). Nothing
about tax residency is on that page.

The slugs live in `config/form-paths.js`. To reset again:
`node scripts/reset-form-links.mjs --apply`, then tsc, eslint, jest, build.

## Working Holiday Tax (replace in Meta)

| Page | Old | New |
| --- | --- | --- |
| Tax form (EN) | https://workingholidaytax.com.au/tax-form | https://workingholidaytax.com.au/start |
| Tax form (DE) | https://workingholidaytax.com.au/de/tax-form | https://workingholidaytax.com.au/de/start |
| Tax form (JA) | https://workingholidaytax.com.au/ja/tax-form | https://workingholidaytax.com.au/ja/start |
| Residency step (EN) | https://workingholidaytax.com.au/tax-residency | https://workingholidaytax.com.au/y8vwp4bf7 |
| Residency step (DE) | https://workingholidaytax.com.au/de/tax-residency | https://workingholidaytax.com.au/de/y8vwp4bf7 |
| Residency step (JA) | https://workingholidaytax.com.au/ja/tax-residency | https://workingholidaytax.com.au/ja/y8vwp4bf7 |
| TFN form (EN/DE/JA) | /tfn-form, /de/tfn-form, /ja/tfn-form | /vukjw4byf, /de/vukjw4byf, /ja/vukjw4byf |
| ABN form (EN/DE/JA) | /abn-form, /de/abn-form, /ja/abn-form | /3cw5w5hcx, /de/3cw5w5hcx, /ja/3cw5w5hcx |
| Super form (EN/DE/JA) | /super-form, /de/super-form, /ja/super-form | /rh84sez58, /de/rh84sez58, /ja/rh84sez58 |

## Student Visa Tax (forms still closed until SVT_FORMS_ENABLED)

| Page | Old | New |
| --- | --- | --- |
| Tax form EN / ZH / VI | https://studentvisatax.com.au/tax-form, /zh/tax-form, /vi/tax-form | https://studentvisatax.com.au/jhd7hp9xd, /zh/jhd7hp9xd, /vi/jhd7hp9xd |
| Second step (EN / ZH / VI) | /tax-form/residency | /jhd7hp9xd/w3rp42fav (also under /zh and /vi) |

The old SVT addresses simply return 404 (no customer has them: the SVT forms are closed).

## Where the links live in Meta (cannot be changed from the code)

1. WhatsApp Manager, template `payment_received` (and `payment_received_de`, `payment_received_ja`): the "Start Here" URL button. Set it to the new tax form link for that language.
2. WhatsApp Manager, template `residency_check` (en, de, ja): the link in the body (text in `docs/Follow-up-templates-14-Oct.md`, already updated to the new address). Edit and resubmit.
3. Anything else in Meta that has the old text pasted in: ad destination URLs, WhatsApp Business app greeting / away message / quick replies, Instagram and Facebook bio and buttons, Linktree. Search each for `tax-form`, `tfn-form`, `abn-form`, `super-form`, `tax-residency`.
4. Partner sites that publish `/tax-form?ref=CODE`: the CRM Partners page now shows the new address; partners need the new link.

## Tax residency on the public site

The guide "Are You a Tax Resident of Australia?" (en, de, ja) stays, as an SEO page (Jo, 29 Oct), but is rewritten to be general: it says what residency can change and why it cannot be settled from a checklist, with no rates table, no threshold advice and no court case, and it ends by sending the reader to a registered tax agent and the contact page.
