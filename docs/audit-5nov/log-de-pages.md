# Log: de-pages

## Applied
- de-pages-001: category/[slug] super intro: "seit dem 1. Juli 2025 sind es 12 Prozent des regulären Lohns" (was "ab dem 1. Juli 2026").
- de-pages-003 (DE part): /de/superannuation small print now says the 65 % apply to the whole taxable component, untaxed element included.
- de-pages-005 (partly): /de/superannuation with-us section: new paragraph after the guarantee with Link to /de/tax-return. FAQ link not added (see Skipped).
- de-pages-007: /de home FAQ "Welchen Steuersatz zahlen Working Holiday Maker" now opens with the WHM rates (15/30/37/45 %, same in 2025/26 and 2026/27), existing text kept after a paragraph break.
- de-pages-008 (page part): /de/medicare #who-is-exempt: new paragraph with the RHCA list (Italy and Malta limited), and "Deutschland, Österreich und die Schweiz stehen nicht auf dieser Liste."
- de-pages-009: /de/medicare FAQ "Wie beantragt man das Medicare Entitlement Statement?" (Services Australia, form MS015, passport page, from 1 July for the previous year; processing time softened, not stated by the source).
- de-pages-010: CATEGORY_INTRO key 'medicare-and-other' renamed to 'medicare' (intro now renders); text corrected ("standardmäßig angesetzt", "Viele Inhaber ..., etwa aus Deutschland oder Österreich", "entscheidet vor allem dein Pass, geprüft wird im Einzelfall").
- de-pages-013: /de/tfn FAQ, gap section and the "28 Tage" figure now state the rule correctly (28 days only if applied and declared; otherwise 45 % from the first pay).
- de-pages-014: /de/tax-return refund cards 3 (foreign resident rate from 30 cents) and 5 ("Beim Satz von 15 % senken je 100 $ an echten Arbeitskosten die Steuer um 15 $").
- de-pages-015: "australischer Ostküstenzeit (Sydney)" added to contact FAQ, contact hours field and home FAQ "Wie schnell antwortet ihr?".
- de-pages-017: /de/calculator FAQ "Welche Steuersätze nutzt der Rechner?" now names WHM and resident 2025/26 rates; only the WHM rates are said to be unchanged for 2026/27 (resident 16 % bracket is not in Key facts for 2026/27, so not claimed).
- de-pages-018 (partly): /de/about talkP2 links /de/tax-return; /de/contact myGov blocker gets link {href:'/de/tax-return', label:'Wie die Steuererklärung abläuft'}.
- de-pages-019: /de/tax-return step 01 lists six languages; availableLanguage six in tax-return, tfn, abn Service nodes.
- de-pages-020 + tech-009 (DE): organizationLd removed from /de home (root graph in RootDocument.tsx owns /#business with six languages); /de/contact mainEntity is now a { '@id': /#business } reference, isPartOf a plain @id ref, ContactPoint redeclaration gone (unused WA_NUMBER import removed); /de/blog: unanchored Organization block removed, CollectionPage isPartOf -> { '@id': /#website }, publisher -> /#business.
- money-027: /de/tax-return: new answer-first Section after the Hero ("Was ist die Steuererklärung für Work and Travel in Australien?", links to /de/blog/backpacker-tax-rate-australia and #two-ways), new Section id="two-ways" with Compare ("Selbst über myGov" / "Mit Working Holiday Tax", rows translated from money-002, last row = approved sign-off sentence) linking /de/blog/diy-tax-return-vs-tax-agent-working-holiday, new first FAQ "Muss ich als Working Holiday Maker eine Steuererklärung machen?", speakable gets '.what-lede'.

## Skipped
- de-pages-016: the FIGURES block in src/app/(de)/de/page.tsx is marked "Freigegeben 22. Aug. Nicht umschreiben." The finding is right ("abziehbar" means tax-deductible, EN says "Removable"); needs owner sign-off. Proposed: 'Mit einer Bescheinigung kann sie wegfallen, und die beantragt fast niemand.'
- de-pages-005 FAQ link part and de-pages-018 about-FAQ link: Accordion answers are plain strings (AccItem.answer: string) that also feed FAQPage JSON-LD, so no Link can go in. Links were placed in adjacent JSX instead.
- de-pages-006 / money-006: needs a change in src/components/wht/CalculatorBlocks.tsx (shared). See Handoff.

## Handoff
1. money-006 / de-pages-006 (shared owns src/components/wht/CalculatorBlocks.tsx):
   - `export interface CalcHrefs { superannuation: string; medicare: string; expenses: string; taxReturn?: string }`
   - CalcStrings: add `linkTaxReturn?: string` and `resultTaxReturnBefore?: string; resultTaxReturnLink?: string; resultTaxReturnAfter?: string` (or similar).
   - Render `{p.hrefs.taxReturn && t.linkTaxReturn && <Link href={p.hrefs.taxReturn} className={blocks.textLink}>{t.linkTaxReturn}</Link>}` first in the diffTitle link row, and the result sentence after `{t.resultNote}`.
   - Then in src/app/(de)/de/calculator/CalculatorClient.tsx (I own it, lead may apply): hrefs `taxReturn: '/de/tax-return'`; T.linkTaxReturn: 'Wie die Steuererklärung für Work and Travel abläuft'; result sentence: 'Das ist nur Rechnen mit deinen Zahlen. Eine ' + [Steuererklärung](/de/tax-return) + ' beginnt mit deinem ATO-Datensatz.'
2. de-pages-008 (de-guides owns src/app/(de)/de/blog/data.ts): in the medicare category FAQs "Habe ich als deutscher Working Holiday Maker Anspruch auf Medicare?" and "Welche Länder haben ein Gesundheitsabkommen (RHCA)...", use: 'Ein Gesundheitsabkommen (Reciprocal Health Care Agreement) hat Australien unter anderem mit Großbritannien, Irland, Italien, den Niederlanden, Belgien, Finnland, Norwegen, Schweden, Malta, Slowenien und Neuseeland, bei Italien und Malta mit eingeschränkter Deckung. Wer aus diesen Ländern kommt, hat in der Regel Zugang zu Medicare und deshalb in der Regel keine Befreiung. Deutschland, Österreich und die Schweiz stehen nicht auf dieser Liste.'
3. de-pages-018 blog index: the intro lives in blogUI (src/app/(de)/de/blog/data.ts, de-guides) rendered by src/app/(site)/blog/BlogClient.tsx (en-pages) as text. Needs a link slot in BlogClient; DE sentence: 'Wenn du nicht alles selbst lesen willst: ' + [So läuft die Steuererklärung](/de/tax-return) + '.'
4. de-pages-003 EN part (en-pages): src/app/(site)/superannuation/page.tsx ~line 311 "withheld at a higher rate" -> for working holiday makers the 65% applies to the whole taxable component, untaxed element included.

## Facts checked
- Super Guarantee 12 % from 1 July 2025: public/llms.txt Key facts.
- DASP 65 % of the taxable component for WHM: llms.txt; untaxed element also 65 % for WHM (ATO DASP rates, as stated in the finding and FIX_BRIEF).
- WHM rates 15/30/37/45 % at 45k/135k/190k, unchanged 2025/26 to 2026/27: llms.txt.
- Resident 2025/26 rates (0 % to 18,200, 16 % to 45,000, 30/37/45 %): matches calculator code calc(); not claimed for 2026/27.
- RHCA list and Germany/Austria not on it: llms.txt; Switzerland and Italy/Malta limitation: FIX_BRIEF known facts.
- Medicare Entitlement Statement: https://www.servicesaustralia.gov.au/how-to-get-medicare-entitlement-statement (form "Application for a Medicare Entitlement Statement", MS015 per https://www.servicesaustralia.gov.au/ms015; passport name and photo page; apply from 1 July for the previous year; no processing time stated, so softened).
- Foreign resident rate from 30 cents, $100 deduction = $15 at 15 %: EN src/app/(site)/tax-return/page.tsx.
- 2025/26 due 31 Oct 2026, late lodgement still possible: FIX_BRIEF.

## For the lead
- Not changed, possible iron-rule question: "Wir regeln das direkt mit dem ATO." in /de/contact (myGov blocker) and /de/superannuation (line ~256), same as EN contact "We deal with the ATO directly." Also "wir reichen ein" / "die Einreichung über uns läuft" in /de/tax-return FAQ and meta. Left as is (sitewide pattern, meta locked).
- Verification: tsc passes, eslint on src/app/(de)/de clean, jest wht-copy-compliance-6-languages, seo-legal-og, brand-routing-26oct, page-photo-priority, round2-frontend-security pass. No em/en dashes, no NBSP in changed files.
