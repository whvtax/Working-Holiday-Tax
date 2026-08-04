# Changelog — 4 August 2026

## New

**`src/app/uk-working-holiday-tax/page.tsx`** — new English landing page for UK passport holders (414 lines, built on the existing service-page design system).

Content: the three-year / age-35 arrangements under the enhanced UK–Australia FTA (applications from 1 July 2024); the 2025-26 working holiday maker rate table; why UK citizens are generally **not** entitled to the Medicare levy exemption (the UK is on the Reciprocal Health Care Agreement list, unlike Germany and Japan); the Addy v Commissioner of Taxation High Court decision of November 2021; superannuation and DASP after a multi-year stay; and the mismatch between the UK tax year (6 April to 5 April) and the Australian year (1 July to 30 June).

SEO: canonical, OpenGraph, Twitter, robots, plus Service, FAQPage, BreadcrumbList and Speakable schema. 8 FAQ entries. No DIY lodging instructions.

## Changed

- `src/app/page.tsx` — nationality entry point card below the services grid ("Where you are from changes what you get back → UK passport holders").
- `src/app/medicare/page.tsx` — link to the UK page in the related grid.
- `src/app/tax-return/page.tsx` — link to the UK page in the related grid.
- `src/app/sitemap.ts` — `/uk-working-holiday-tax` registered (English only, `translated: false`).
- `src/app/de/tax-return/page.tsx` — new Addy section plus a matching FAQ entry. States explicitly that Germany is on the ATO list and Austria and Switzerland are not.
- `src/app/ja/tax-return/page.tsx` — new Addy section plus a matching FAQ entry. States that Japan is one of the seven countries.
- `src/lib/formStrings.ts` — `bankStatementHint` reworded in EN, DE and JA to "Just the first page with your full name, BSB, and account number."

## Search Console driven fixes (from the 7-day export to 1 Aug and the July report)

Four query clusters were sitting at positions 5–25 with zero clicks:

- `how-long-does-it-take-to-get-a-tfn` — title now leads with the answer ("About 2 Weeks, 28 Days Maximum") instead of a hedged range. Nine query variants, ~130 impressions per week, were ranking 8–15 with no clicks.
- `medicare-levy-working-holiday-makers` — title now answers the yes/no question actually being searched ("Do Working Holiday Makers Pay the Medicare Levy? Usually Not"), and the description names the UK/Ireland exception.
- `casual-shift-cancellation-rules-australia` — title now leads with the money ("You May Still Be Owed 2 to 3 Hours Pay").
- `tax-on-super-withdrawal-backpacker` — title moved closer to the query wording.
- `what-does-tax-withheld-mean-payslip` — title now defines the term rather than asking a different question.

**Factual correction** in `how-long-does-it-take-to-get-a-tfn`: the article said employers withhold 45% until they hold the TFN and that accepting the ATO confirmation was "at their discretion". Corrected to the 28-day rule — declaring on the TFN declaration that you have applied means normal withholding during that window, and any excess comes back at lodgement.

## AI / LLM discoverability

- `public/llms.txt` — UK page entry with a full description, plus three new Key Facts lines (the UK 35 / three-visa rule, the Addy country list, and the RHCA list with an explicit note that Germany, Japan and Austria are **not** on it).
- `public/llms-full.txt` — full UK section appended.
- `public/sitemap-llms.xml` — UK page entry.
- `src/app/robots.ts` — unchanged; already allows 22 named AI crawlers.

## Not done

- `npm run build` was not run in the environment that produced this package. Structural checks (brace, paren and `<section>` balance, no em-dashes) passed on all changed files, but run a build before deploying.
- German and Japanese blog titles were not touched. The failing queries were English and there is no country-level data to justify changing pages that may be performing.
- `.git` is not included in this archive.

## Open items worth checking

- `/guides/tfn-application-delayed` still shows impressions and clicks in Search Console even though the 301 to `/blog/` exists in `next.config.js`. Confirm the redirect is live in production.
- `/superannuation` had 336 impressions and zero clicks in a single week at average position 33.6, with the whole super query cluster sitting at positions 27–50. This is a ranking problem, not a title problem, and needs its own decision.
