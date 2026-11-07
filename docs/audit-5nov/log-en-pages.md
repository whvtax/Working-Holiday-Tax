# Fix log: en-pages

## Applied
- money-001 / en-pages-015: /tax-return new section "What is a working holiday tax return?" right after the hero (definition, the 2025-26 deadline has passed and late returns are still possible, WHM rates, link to /blog/backpacker-tax-rate-australia and #two-ways). First paragraph has class `what-lede`, which is added to webPageLd speakable.
- money-002: /tax-return new section id="two-ways", "Two ways to lodge a working holiday tax return", using the Compare block (6 neutral rows), plus two paragraphs and a link to /blog/diy-tax-return-vs-tax-agent-working-holiday. Row 3 is passive ("Your ATO record is read and checked") so it does not suggest we have our own ATO access (en-pages-008).
- money-003: /tax-return 6 FAQ items added (must I lodge, DIY, how much refund (no amount), backpacker tax, lodging before leaving (ATO early-lodgement conditions), registered tax agent (approved wording only)). They flow into faqLd.
- en-pages-021: deadline FAQ has a second paragraph (lodge from 1 July; early lodgement when leaving permanently before 30 June).
- en-pages-008: /tax-return twitter description (was "lodged by us"), meta description (was "We pull your ATO record, lodge the return": a rule breach, reworded minimally), SEQUENCE[2] title "Your ATO record is checked", FAQ "What do I actually have to do?" (approved sentence), overseas FAQ question reworded to "Can my return be lodged...", "returns we prepare". About chapter, about FAQ and contact blocker: "visible to us through the ATO" changed to "already on your ATO record". About whyParas last line no longer says we lodge it (approved sentence instead).
- en-pages-016: SEQUENCE[0] now lists the six languages; Service availableLanguage set to six languages on /tax-return, /tfn, /abn.
- en-pages-022: missing space after the /abn link on /tax-return.
- money-025 + tech-005 (/tax-return part): GUIDES now 7 rows (DIY vs help, lodging it yourself, late return, backpacker tax rates, refund timing, from overseas, residency).
- tech-012 (/tax-return part): links to /uk-working-holiday-tax and /german-working-holiday-tax under the guides block.
- money-026: TPB register line with AGENT_TPB under the trust paragraph ("operates under the supervision of a registered tax agent, Tax Agent Number ...").
- money-030: H1 kicker "Working holiday visa tax return · 417 & 462".
- en-pages-007: calculator resident branch now subtracts LITO ($700 to $37,500, -5c to $45,000, $325 -1.5c to $66,667, floor 0). FAQ "How accurate" mentions it.
- money-008: calculator superHint says "taxable component".
- money-007: calculator FAQ "How is the estimate worked out?" (rates, method, $3,000 at 45% vs 15% mechanism example). Done as an FAQ (in FAQPage schema) because the page layout lives in the shared CalculatorBlocks component.
- en-pages-003: /medicare FAQ and objection line now use $50,000 (about $1,000), FAQ adds resident-only and low-income threshold; Medicare category intro on /blog/category/[slug] likewise.
- en-pages-004: Super category intro: 12% since 1 July 2025, Payday Super from 1 July 2026.
- en-pages-013: /medicare who-is-exempt: added RHCA paragraph (Italy and Malta marked as more limited cover; Germany, Japan, France, Spain, Canada, Austria not on the list; levy only for tax residents). Addition only.
- en-pages-019: /medicare MYGOV rows now say Medicare Entitlement Statement / statement. Hero left as is (100+ click page opening).
- en-pages-005: /superannuation small print: 65% applies to taxed and untaxed element for WHM.
- en-pages-010: /superannuation amber block: "If we also do your tax return:" label before the verbatim guarantee; last line now separates the super claim from the tax return, with a /tax-return link.
- en-pages-011: /superannuation "What is next" is now "Your tax return is a separate claim" with LinkButton to /tax-return, Medicare link kept as a second line; DASP vs refund FAQ points to the tax return page (plain text, the Accordion has no links).
- en-pages-012: /superannuation hero lede is answer-first (DASP, ATO or each fund, visa ceased and left, 65% of taxable component, overseas account); 12% SG line added to "Who can claim".
- tech-001 (EN): HowTo JSON-LD removed from /superannuation.
- en-pages-006: /tfn hero lede and figure 1 fixed (45% only with neither TFN nor declaration of application).
- en-pages-018: /tfn FAQ "What if my TFN has not arrived after 28 days?" (ATO phone numbers as used in the EN guides).
- en-pages-014: /abn lede starts with the yes-and-condition answer; existing sentence kept after it.
- en-pages-017: all 8 expenses pages: closing sentence in the last "answer" section and a /tax-return row first in GUIDES. About: /tax-return link added in talkP2 (whyParas is plain strings rendered by a shared component). Calculator part: handoff.
- en-pages-023: /uk-working-holiday-tax and /german-working-holiday-tax closing H2 is "Tell us about your year", guarantee sentence verbatim as a statement paragraph. Expenses part: handoff.
- money-005: home: link to /tax-return after the ANALYSIS steps, link to /calculator after FIGURES, services row desc for /tax-return reworded. Approved copy untouched.
- tech-009 (EN): home page-level organizationLd and webSiteLd removed (global graph holds both); contact availableLanguage six languages and isPartOf as @id reference; blog hub, category and guide isPartOf now { '@id': '/#website' }.
- en-pages-024 / tech-003 (EN): /blog standalone Organization removed, publisher @id added to CollectionPage.
- en-guides-b-017: ATO WHM citation also fires for working-holiday-visa-tax, tax-free-threshold, second-third-year slugs.
- money-024 (EN): Tax Return and Work Rights service labels "Working holiday tax return: what we check before lodging"; TFN and Medicare & Other guides get a second service row to /tax-return.
- tech-005 (EN renderer): getRelatedGuides now shows one decision guide (rotated by position) plus the nearest same-category neighbours, so every guide receives related links.
- tech-017 (EN): Tax Return list leads with late-tax-return-penalty and how-to-lodge-from-overseas; deadline guide moved to the top from 1 July to 31 October by decisionOrder(); best-way-to-claim-super-leaving-australia removed from Super.
- tech-006 (EN): visible "Updated <date>" in the article meta and About box, from the same modifiedIso as dateModified (shown only when later than publication). Replaces the "Reviewed" label.

## Skipped
- en-pages-002: already fixed (rate = 65), lead decision.
- en-pages-009, money-004: refund range sentence is kept verbatim by lead decision.
- en-pages-025: owner decision on approved home copy; page has 274 clicks.
- en-pages-008 remainder: "We deal with the ATO directly." and step 07 "If the ATO queries something, we answer it" left for the owner decision, as the finding itself asks.
- fr-guides-b-014: slugify (GuideArticle.tsx, mine) and headingAnchor (LocaleGuidePage.tsx, shared) must change together or FAQPage anchors stop matching H2 ids, so both are in handoff instead of a half change.

## Handoff
- shared, components/wht/CalculatorBlocks.tsx (money-006, en-pages-017): add `taxReturn: string` to CalcHrefs and `linkTaxReturn: string` to CalcStrings; render `<Link href={p.hrefs.taxReturn} className={blocks.textLink}>{t.linkTaxReturn}</Link>` first in the diff link row. Then EN CalculatorClient (mine, lead may apply): hrefs add `taxReturn: '/tax-return'`, T add `linkTaxReturn: "How a working holiday tax return is lodged"`. DE/JA per money-006 text.
- shared, components/wht/ExpensesBlocks.tsx:358 (en-pages-023): render the Block title from a new `UI.ctaTitle` ("Tell us about your year") and put `UI.guaranteeHeading` as `<p className={`${blocks.statement} ${blocks.onForest}`}>` inside the block; then add `"ctaTitle": "Tell us about your year"` to UI in the 8 EN expenses pages.
- shared, components/blog/LocaleGuidePage.tsx: mirror money-024 (DE 'Steuererklärung für Working Holiday Maker: was wir vor dem Einreichen prüfen', JA 'ワーホリのタックスリターン：提出前に確認すること'), tech-005 getRelatedGuides change, tech-017 DECISION_GUIDES change (same as the EN file now), fr-guides-b-014 headingAnchor fold.
- shared + lead, fr-guides-b-014: in both `slugify` (src/app/(site)/blog/[slug]/GuideArticle.tsx) and `headingAnchor` (LocaleGuidePage.tsx) prepend `.normalize('NFD').replace(/[̀-ͯ]/g, '')` before `.toLowerCase()`, in the same change.
- shared, components/layout/Footer.tsx (tech-012): add 'UK passport holders' -> /uk-working-holiday-tax and 'German passport holders' -> /german-working-holiday-tax to the EN services column.
- en-guides (data.ts), tech-012 and tech-005 body links: links to /uk-working-holiday-tax and /german-working-holiday-tax from the listed guides; TFN/shift/refund-timing contextual links as listed in tech-005.
- de/ja/fr/es pages buckets: tech-001 (delete howToLd on their superannuation pages), tech-003 (delete Organization block on their blog hubs), tech-009 (their availableLanguage/knowsLanguage/inLanguage lists), money-026 DE/JA TPB line, money-006 DE/JA calculator.

## Facts checked
- Early lodgement when leaving Australia permanently before 30 June, no further Australian-sourced income other than interest, dividends, royalties: ato.gov.au "Lodge your tax return before leaving Australia" (fetched).
- LITO $700 to $37,500, 5c reduction to $45,000, $325 less 1.5c to $66,667, not refundable: ato.gov.au "Low income tax offset" (fetched, page updated 8 June 2026).
- DASP for WHM: taxed and untaxed elements 65%, tax-free component 0%: ato.gov.au "DASP and working holiday makers changes, FAQ" (fetched).
- WHM rates, SG 12% from 1 July 2025 and Payday Super from 1 July 2026, DASP 65% of taxable component, 45% no-TFN rate, RHCA list: public/llms.txt Key facts; Italy/Malta limited cover from FIX_BRIEF.
- AGENT_TPB 26233096: src/lib/agent.ts.
- ATO phone numbers 13 28 61 / +61 2 6216 1111: existing EN guide copy in blog/data.ts.

## Verification
- tsc: no errors in my files. 3 errors remain in src/components/blog/LocaleGuidePage.tsx (shared bucket, in progress).
- jest wht-copy-compliance-6-languages, page-photo-priority, blog-dates: pass. eslint --quiet on all changed files: clean.
- No U+2013/U+2014 in src/app/(site); the only NBSPs are pre-existing French strings in GuideArticle.tsx.
