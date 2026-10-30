// ─────────────────────────────────────────────────────────────────────────
// The public URL slugs of every questionnaire page, in ONE place (Jo, 29 Oct:
// the form links had spread to too many places, so they are reset).
//
// This file is the record of what the slugs are NOW. To reset them again run
//   node scripts/reset-form-links.mjs --apply
// which picks new random slugs, renames the page folders, rewrites every link
// in the code, docs and tests, and updates this file. Nothing else needs
// editing by hand, except pasting the new links into Meta (the script prints
// the full list).
//
// WHT: one slug per page, the same in English, /de and /ja.
// SVT: the form and its second step; the English page lives at /<form>, the
// Chinese and Vietnamese ones at /zh/<form> and /vi/<form>.
// ─────────────────────────────────────────────────────────────────────────
const WHT = {
  'tax-form': 'start',
  'tax-residency': 'y8vwp4bf7',
  'tfn-form': 'vukjw4byf',
  'abn-form': '3cw5w5hcx',
  'super-form': 'rh84sez58',
}
const SVT = { form: 'jhd7hp9xd', residency: 'w3rp42fav' }
// Old WHT slugs. Their pages are gone; next.config.js sends them to the
// "this link opens after payment" page, so a link that is still sitting in an
// old chat, ad or partner site explains itself instead of showing a 404.
const RETIRED = ['tax-form', 'tax-residency', 'tfn-form', 'abn-form', 'super-form', '8u6753gew']
module.exports = { WHT, SVT, RETIRED }
