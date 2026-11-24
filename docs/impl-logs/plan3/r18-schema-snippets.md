# r18 Schema and snippets: tax return and super pages, both sites, all languages (24 Nov 2026)

Scope: WHT /tax-return and /superannuation in en, de, ja, fr, it, es plus the FR/IT/ES native flagships
(/fr/tax-return-australie-pvt, /it/dichiarazione-redditi-australia, /es/devolucion-impuestos-australia); SVT tax return
service page (home /, /zh, /vi), /superannuation, /pricing, /how-it-works. Research only, no repo edits.

Method. JSON-LD and metadata were RENDERED from the code, not read by eye: a scratch jest run imports each page module,
awaits generateMetadata/metadata and the page component, and walks the React tree for `application/ld+json` scripts
(script and output: S/plan3/r18/__tests__/extract.test.tsx, S/plan3/r18/out.json, summary S/plan3/r18/summ.py). Client
components with hooks (Accordion, GoogleRating, MobileCta, SVT PriceCheck...) could not execute outside React; none of them
emits JSON-LD (grep `ld+json` in src/components: only JobPageBlocks, ExpensesBlocks, LocaleCategoryPage, LocaleGuidePage,
JobExpensesPage, svt/GuidePage, svt HomePage, ContactPage, RootDocument). The site wide graph comes from
src/components/layout/RootDocument.tsx (WHT) and src/lib/svt/jsonld.ts (SVT).
Limit: the shared web search budget ran out early in this run, so live SERPs for refund/super questions were NOT checked
here. Google documentation was read directly on developers.google.com (URLs below). SERP feature claims rely on GSC.

## 1. Findings

### 1a. What each page emits now (FACT, rendered)
WHT: every page also carries the root graph: Organization `#business` (with hasOfferCatalog of 5 Services, provider =
#business), WebSite `#website` (inLanguage en-AU, de, ja, fr, it, es), and a second Organization `#supervising-agent`
(ABN, TPB number, TPB register sameAs; kept on Jo's 5 Nov decision, not described as us). No LocalBusiness anywhere.

| Page | Page level JSON-LD (FAQ count) |
|---|---|
| /tax-return | WebPage (speakable, dateModified 2026-11-24, about #business), Service, HowTo(7), FAQPage(15), BreadcrumbList(2) |
| /de/tax-return | WebPage, Service, HowTo(7), FAQPage(14), BreadcrumbList(2) |
| /ja/tax-return | WebPage, Service, HowTo(7), FAQPage(12), BreadcrumbList(2) |
| /fr/tax-return, /it/tax-return, /es/tax-return | WebPage, Service, HowTo(7), FAQPage(10), BreadcrumbList(2) |
| /fr/tax-return-australie-pvt | WebPage, Service, FAQPage(17), BreadcrumbList(2) |
| /it/dichiarazione-redditi-australia | WebPage, Service, FAQPage(16), BreadcrumbList(2) |
| /es/devolucion-impuestos-australia | WebPage, Service, FAQPage(19), BreadcrumbList(2) |
| /superannuation | Service, WebPage (speakable only: no name, description, isPartOf, about; dateModified 2026-11-05), FAQPage(12), BreadcrumbList(2) |
| /de, /ja, /fr /superannuation | Service, WebPage, HowTo(5/5/6), FAQPage(14/11/13), BreadcrumbList(2) |
| /it, /es /superannuation | Service, WebPage, FAQPage(15/15), BreadcrumbList(2) (no HowTo) |
| SVT / , /zh, /vi (tax return service) | Organization, WebSite, FAQPage(9). No WebPage, no Service |
| SVT /superannuation (en, zh, vi) | Organization, WebSite, Article (author/publisher Organization inline, citation ATO), BreadcrumbList(2), FAQPage(11). No Service |
| SVT /pricing | Organization, WebSite, WebPage, BreadcrumbList(2), FAQPage(3) |

- FACT: every money page FAQPage is built from the same array the page renders (`mainEntity: FAQS` and
  `<Accordion items={FAQS}>` in all 15 WHT files), so markup matches visible text. But the visible copy sits in
  src/components/ui/Accordion.tsx: answers are in the HTML, collapsed to zero height and `inert` until tapped, with ids
  `acc-body-0..n` that say nothing about the question, and the FAQPage answers carry no `url` deep link.
- FACT: EN guides do it differently: FAQPage is generated from the H2 questions and each answer gets
  `url: .../blog/<slug>#<anchor>` (src/app/(site)/blog/[slug]/page.tsx lines 681 to 698). GSC shows 118 `#anchor` rows,
  42,974 impressions (a15 F5). So passage links already work for us where the answer is a visible, anchored H2.
- FACT: Service nodes carry `availableLanguage` (EN tax-return) and `inLanguage`. INFERENCE, not verified this run
  (schema.org could not be fetched): neither property is defined for schema.org/Service, so the Schema Markup Validator
  will likely warn. No effect on Google features (there is no Service rich result).
- FACT: SVT Organization `makesOffer` holds the two prices; GSC "Product snippets" 2 impressions (gsc24/svt/Search
  appearance.csv). Existing, harmless, not to be extended (no new prices).
- FACT: GSC WHT "Q&A rich results" 510 impressions, 17 clicks at 5.09 in the 22 Aug to 21 Nov export (722 on 21 Oct
  export). QAPage was removed 29 Aug (LocaleGuidePage.tsx line 667); this is residue fading out.
- FACT: speakable selectors all resolve to elements that exist (checked `.hero-lede`, `.what-lede`, `.key-figures`,
  `.hero-sub`, `#key-figures`, `.answer-first` in each file).

### 1b. What Google supports in 2026 (FACT, developers.google.com, read 24 Nov 2026)
- FAQ rich results are gone: "This feature will no longer appear in Google Search starting May 7, 2026" (changelog
  8 May 2026); documentation removed 15 Jun 2026. https://developers.google.com/search/updates
- Breadcrumb: "available on desktop in all regions and languages"; changelog 22 Jan 2025: shown only on desktop, not
  mobile. Needs 2 or more ListItems (all ours have 2). https://developers.google.com/search/docs/appearance/structured-data/breadcrumb (updated 2026-09-08)
- Article: no required properties; author may be an Organization with name plus url; dates ISO 8601 "include a
  timezone". https://developers.google.com/search/docs/appearance/structured-data/article (updated 2026-09-08)
- AI Overviews / AI Mode: "There's also no special schema.org structured data that you need to add"; matching structured
  data to visible text stays a fundamental. https://developers.google.com/search/docs/appearance/ai-features
- "Read more" deep links (added 20 Apr 2026): "Make sure content is immediately visible on the page to a human", avoid
  hiding it in expandable sections or tabs, do not control scroll on load, do not strip the hash fragment.
  https://developers.google.com/search/docs/appearance/snippet
- Featured snippets: chosen by Google's systems; no markup involved. https://developers.google.com/search/docs/appearance/featured-snippets
- llms.txt "aren't needed for Google Search" (changelog 15 Jun 2026); keeping them for other services is fine.
- hreflang: ISO 639-1 plus optional ISO 15924 script (zh-Hans allowed) and ISO 3166-1 region; each version lists itself
  and all others; non-reciprocal tags are ignored; URLs must be fully qualified.
  https://developers.google.com/search/docs/specialty/international/localized-versions (updated 2026-09-21)
- Not re-verified this run (search budget): HowTo rich result retirement (2023, per a15 F6) and Speakable (beta). Treat
  both as giving no SERP feature, as a15 did.
CONSEQUENCE (inference): on our pages the only structured data with a visible Google feature left is BreadcrumbList
(desktop) and Organization (logo/entity). FAQPage, HowTo, Service, WebPage and speakable are harmless machine context.
The levers for refund and super snippets are now VISIBLE formats: anchored question headings, a one sentence answer,
ordered lists and real `<table>` markup.

### 1c. hreflang (FACT, rendered metadata; Next resolves relative alternates against metadataBase, node_modules/next/dist/lib/metadata/resolvers/resolve-basics.js line 115)
- WHT tax return cluster: en-AU, de, ja, fr, it, es, x-default (EN) on all six pages; reciprocal and self-referencing.
  EN /tax-return, EN /superannuation and /de/superannuation also list `en` (same EN URL); the other nine omit it.
  Valid either way (same URL), only inconsistent.
- WHT super cluster: same set on all six pages; reciprocal.
- The three native flagships emit canonical only, no hreflang (deliberate, comment in it/dichiarazione-redditi-australia
  line 46). Correct as standalone pages, but see 1d.
- SVT: en-AU, zh-Hans, vi, x-default on /, /superannuation, /pricing, /how-it-works in all three languages; reciprocal;
  metadataBase is the SVT domain in all three SVT layouts. zh-Hans is a valid code (Google doc above). No cross brand
  alternates anywhere.
- No hreflang errors found. The risks are indexing and duplication, not tags (1d).

### 1d. Cluster members Google ignores (FACT, GSC 22 Aug to 21 Nov; coverage export 24 Nov)
- /de/tax-return is in "Crawled, currently not indexed" (wht-crawled-not-indexed-1124.xlsx, crawled 2026-11-16), though
  it had 170 impressions at 6.94 in the 3 month export. It is the `de` member of the tax return cluster.
- /fr/tax-return and /it/tax-return have no row at all in Pages.csv; /es/tax-return 14 impressions at 29. Their native
  flagships: /fr/tax-return-australie-pvt 23 impressions, 1 click, 8.09; IT and ES flagships no row.
  INFERENCE: for FR, Google currently prefers the page that is NOT in the hreflang cluster; the cluster's fr member
  earns nothing. Two indexable FR pages target the same intent (titles "Déclaration d’impôts en Australie pour PVT" and
  "Tax return Australie PVT : déclaration et remboursement"). Too little data to act before December.

### 1e. Snippet formats versus the data (FACT rows from gsc24/wht/Queries.csv, 22 Aug to 21 Nov)
| Query type | GSC rows (impr, clicks, pos) | Format that answers it | Where it already exists |
|---|---|---|---|
| Definition | "dasp" 288, 1, 7.44; "ato dasp" 89, 0, 5.38 | 40 to 50 word "X is..." paragraph under a "What is" H2 | EN /superannuation #what-is-dasp (Phase 1); other languages define DASP in the hero lead only |
| How long | "how long does dasp payment take" 90, 0, 6.78; "dasp processing time" 40, 0, 9.2; "how long does dasp take" 35, 1, 7.91; Bing "tax refund how many days australia" 50% citation share | number first sentence with the source, then a short list of what slows it | #how-long Answer on all 6 super pages; blog/how-long-does-dasp-take (60 Bing citations) |
| Deadline (JA) | "オーストラリア タックスリターン いつまで" 129, 0, 7.73; "タックスリターン いつまで" 65, 1, 6.6 | date table: who lodges / due date / what if late | /ja/tax-return H2 "…いつまで？" answers in sentence 1 (good) but has no table; its key figures are `PlainRows` divs, not `<table>` |
| Problem / fix | "my superannuation claim was rejected, what now?" 62, 0, 9.03; "mygovold" 46, 0, 8.61; "lost superannuation australia" 46, 0, 9.35 | question H2 or H3 + one sentence verdict + `<ol>` of fixes + approved close | guides (dasp-rejected-what-to-do etc.); not on the money pages, where problem answers live only in the accordion |
| Rates / amounts | "super tax working holiday maker" 311, 0, 16.53 | `<table>` part of super x visa type | EN /superannuation #how-much table; DE/FR/IT/ES/JA super use lists or rows |
| Steps | Bing "how to get a tax refund if i am on a working holiday visa" 110 citations, 19.2% share; /tax-return 81 Bing citations | `<ol>` of 4 to 6 steps under a question H2 | EN /tax-return #get-a-refund (Phase 1); FR/IT/ES tax return pages have no `<ol>` |
- FACT: Tables: EN /tax-return (key figures), EN /superannuation (DASP rates), /es/devolucion-impuestos-australia have a
  `<table>`; DE and JA tax return show key figures as `PlainRows`; FR, IT, ES tax return pages and the FR/IT flagships
  have no table and no `<ol>`.
- FACT (source check): /tax-return step 4 says the ATO only pays refunds into Australian accounts and cites
  ato.gov.au .../how-to-lodge-your-tax-return. That page does not contain the statement (WebFetch 24 Nov; it lists myTax,
  registered tax agent, paper; "Most process in 10 business days"; paper "most refunds issue within 50 business days").
  The statement IS on .../lodge-your-tax-return-from-outside-australia: "have an Australian bank account you can use to
  receive any refund amounts" (updated 24 Apr 2026).
- FACT: the /tax-return description and key figure say a refund "usually lands about 14 business days after lodgement";
  the ATO page says "Most process in 10 business days". The 14 is not on that ATO page (may be WHT's own experience).

## 2. Proposals

### P1-1. Problem answers: visible, anchored, answer first, in the FAQ markup with a deep link (all money pages)
Why: FAQ rich results ended 7 May 2026, so an accordion-only answer earns nothing in the SERP, and Google's read-more
rule asks for content visible without a tap. Our guide pattern (visible H2 question + anchor + FAQ `url`) already earns
42,974 fragment impressions. Jo's myGov/problem focus (BRIEF) needs that same shape on /tax-return and /superannuation.
Contract for every problem block (any language, both sites; the wording of each problem comes from the problem reports):
1. A visible `Answer` block (WHT: the `Answer` component already used on super pages; SVT: a guide `section` with `id`)
   with a stable ASCII id (`no-mygov`, `sms-code-old-number`, `claim-rejected`...), heading worded as typed.
2. Sentence 1 is the verdict in 40 words or less; then an `<ol>` (WHT) or `list` block (SVT) of the fix.
3. Close with approved wording: "We deal with the ATO directly." + "Reviewed and signed off by a registered tax agent
   before it is lodged with the ATO." + WhatsApp button (WHT `WaButton`, topic tax-return or super).
4. Add the same Q and the verdict sentences to the page's FAQPage with `url: <page>#<id>` (as in blog/[slug]/page.tsx
   line 696). Do NOT also put it in the accordion (duplicate).
Files: src/app/(site)/tax-return/page.tsx (insert after Section #missed-deadline), src/app/(site)/superannuation/page.tsx
(after Answer #how-long), the same spots in (de|ja|fr|it|es) pages; SVT src/lib/svt/content/home-en.ts (home sections) and
services-en.ts SUPERANNUATION_HUB_EN.sections (+ zh/vi files), keeping SVT guide bodies link free.
READY EN text, /tax-return (facts: ATO how-to-lodge lists "Registered tax agent" as a way to lodge,
https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return ; ATO outside Australia page:
myGov linked to the ATO, sign-in settings updated for overseas, myID recommended, Australian bank account for refunds,
https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia ):
- id `no-mygov`, H2 "No access to myGov? You can still get your tax return done"
- "You do not need to get back into myGov for your working holiday tax return. The ATO lists a registered tax agent as one
  of the ways to lodge, so locked accounts and SMS codes sent to an old Australian number do not stop the return."
- `<ol>`: 1 "Lodging yourself from overseas needs a myGov account linked to the ATO, with sign in settings that work
  outside Australia. The ATO recommends a Digital ID such as myID." 2 "Through us, none of that is needed: you answer one
  questionnaire and sign." 3 "Keep an Australian bank account open. The ATO pays refunds into an Australian account."
- Close: "We deal with the ATO directly. Reviewed and signed off by a registered tax agent before it is lodged with the
  ATO." Button: "Message us on WhatsApp". Source line: the two ATO URLs above, "checked November 2026".
READY EN text, /superannuation (facts: ATO DASP page, updated 21 Apr 2026,
https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp ):
- id `claim-held-up`, H2 "Why is my DASP claim rejected or held up?"
- "Most DASP claims that stall fail one of the ATO's conditions: you can only submit once you have left Australia and hold
  no active visa, and for working holiday makers a claim can take longer when your details do not match Home Affairs
  records."
- `<ol>`: 1 "Check no visa is still active, including a bridging visa." 2 "Check your name, date of birth and passport
  match what Home Affairs holds." 3 "If a fund holds $5,000 or more, it may ask for certified copies of your ID."
  4 "Super the ATO already holds is paid only to an Australian account in your name or by cheque."
- Close as above (super: "We deal with the ATO directly." then WhatsApp button "Ask us about your super"; no sign-off
  sentence, that one is for returns).
READY DE text, /de/tax-return (same sources; du; approved DE phrases from the page itself):
- id `ohne-mygov`, H2 "Kein Zugang mehr zu myGov? Die Steuererklärung geht trotzdem"
- "Für deine Work-and-Travel-Steuererklärung musst du nicht zurück in myGov. Das ATO nennt einen registrierten Tax Agent als
  einen der Wege zur Einreichung, also stoppen ein gesperrtes Konto oder SMS-Codes an deine alte australische Nummer die
  Erklärung nicht."
- `<ol>`: 1 "Wer selbst aus dem Ausland einreicht, braucht ein mit dem ATO verknüpftes myGov-Konto mit Anmeldeeinstellungen,
  die außerhalb Australiens funktionieren. Das ATO empfiehlt eine Digital ID wie myID." 2 "Mit uns brauchst du nichts davon:
  ein Fragebogen, eine Unterschrift." 3 "Lass ein australisches Bankkonto offen. Das ATO zahlt Erstattungen auf ein
  australisches Konto."
- Close: "Wir regeln das direkt mit dem ATO. Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor
  sie beim ATO eingereicht wird." (both strings already on /de pages).
JA: no approved JA rendering of "We deal with the ATO directly" was found in src/app/(ja) (grep 直接 / やり取り), so do
not invent one; use the JA sign-off already in the /ja/tax-return description and get the JA close approved first.

### P1-2. Get /de/tax-return indexed; check /fr/tax-return and /it/tax-return
/de/tax-return is "Crawled, currently not indexed" since 16 Nov (1d) and is the `de` hreflang target of all six tax
return pages. Action (Jo, GSC): URL Inspection, live test, Request indexing; same for /fr/tax-return, /it/tax-return,
/es/tax-return (0 or near 0 impressions). Code: none. Also give /de/tax-return links from the DE guides with the most
impressions if r-other reports do not already (Phase 1 linked guides to /de/tax-return? check
docs/impl-logs before adding). Measure: coverage status and DE tax return impressions in the December export.

### P1-3. Money-page FAQ items: stable anchors and FAQ `url` (small code change, all 15 WHT money pages)
- src/components/ui/Accordion.tsx: accept an optional `id` per item (or derive from a `slug` field), put it on the item
  wrapper; open that item when `location.hash` equals its id on load, without scripting the scroll (the browser scrolls
  to the anchor natively; Google's read-more rule forbids JS scroll control, not opening). Keep `inert` on the others.
- Each page's faqLd: add `url: ${PAGE_URL}#${id}` to acceptedAnswer, mirroring the guide template.
Effect (inference): lets Google and AI answers cite a single FAQ answer as a passage. Lower value than P1-1 because the
text stays collapsed; do it once, in the shared component.

### P2-1. Real tables for deadline and timing on FR, IT, ES (and DE, JA) tax return pages
Convert DE and JA key figures from `PlainRows` to the EN `<table>` markup (same strings, src/app/(de)/de/tax-return
around line 440, src/app/(ja)/ja/tax-return line 413) and add a small "dates and timing" table to /fr/tax-return,
/it/tax-return, /es/tax-return and the FR/IT flagships, placed after the opening section. Rows use only facts verified
this run (ATO outside Australia page, updated 24 Apr 2026, and ATO how-to-lodge page, updated 14 Jun 2026, URLs in P1-1):
FR (caption "Dates et délais d’une tax return PVT. Source : ATO, vérifié en novembre 2026.")
| Exercice fiscal | du 1er juillet au 30 juin, une déclaration par année |
| Date limite si vous déclarez vous-même | 31 octobre après la fin de l’exercice ; avec un agent fiscal enregistré, la date peut être plus tardive |
| Remboursement | versé sur un compte bancaire australien |
| Traitement en ligne (myTax) | la plupart en 10 jours ouvrés selon l’ATO |
| Déclaration papier | la plupart des remboursements sous 50 jours ouvrés |
IT (caption "Date e tempi della tax return working holiday. Fonte: ATO, verificato a novembre 2026.")
| Anno fiscale | dal 1° luglio al 30 giugno, una dichiarazione per anno |
| Scadenza se la presenti da solo | 31 ottobre dopo la fine dell’anno; con un agente fiscale registrato la scadenza può essere più tardi |
| Rimborso | pagato su un conto bancario australiano |
| Elaborazione online (myTax) | per l’ATO la maggior parte in 10 giorni lavorativi |
| Dichiarazione cartacea | la maggior parte dei rimborsi entro 50 giorni lavorativi |
ES (caption "Fechas y plazos del tax return working holiday. Fuente: ATO, revisado en noviembre de 2026.")
| Año fiscal | del 1 de julio al 30 de junio, una declaración por año |
| Plazo si lo presentas tú | 31 de octubre después del cierre del año; con un agente fiscal registrado el plazo puede ser posterior |
| Devolución | se paga en una cuenta bancaria australiana |
| Trámite en línea (myTax) | según la ATO, la mayoría en 10 días hábiles |
| Declaración en papel | la mayoría de las devoluciones en 50 días hábiles |
WHM rate rows may be copied from EN KEY_FIGURES only with their ATO source re-checked by the implementer (not verified
in this run). Each table gets its `id` on the Section (e.g. `fechas-plazos`) so it can be deep linked.

### P2-2. Fix the source behind "refunds only into Australian accounts" (EN, and wherever translated)
/tax-return step 4 and KEY_FIGURES row "Where a refund is paid" cite the how-to-lodge page, which does not say it.
Change the source link in step 4 (src/app/(site)/tax-return/page.tsx, the `Source: ATO` line under #get-a-refund) to add
https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
("have an Australian bank account you can use to receive any refund amounts"). Grep the DE/JA/FR/IT/ES pages for the
same claim with the same link. Not a title/description change.

### P2-3. SVT parity: Service and WebPage nodes on the two money pages
- src/components/svt/pages/HomePage.tsx: add to the jsonLd array a WebPage (`@id` <url>#page, inLanguage, isPartOf
  SVT_WEBSITE_REF) and a Service: name "Tax return for international students (500 and 485 visas)", serviceType
  "Tax return preparation", provider SVT_BUSINESS_REF, areaServed Australia, description "Tax returns for international
  students and graduates on 500 and 485 visas. Operates under the supervision of a registered tax agent." No offers, no
  price (prices stay only where they are). zh/vi: translate name/description from the existing zh/vi home meta wording.
- src/components/svt/GuidePage.tsx: for slug `superannuation` only, add a Service "Help with a DASP super claim",
  description "Help checking funds, visa dates and forms for a departing Australia superannuation payment." (matches the
  "Claiming with us" section; no consolidation, per Jo's decision).
Value: entity clarity for AI answers and Bing; no Google rich result. Effort S.

### P2-4. December decision: which FR/IT/ES page is the hreflang member
If the December export again shows the native flagship earning impressions while /fr|it|es/tax-return earn none, move
the cluster membership: the flagship gets the full alternates block (fr|it|es -> flagship URL on all six cluster pages),
and /fr|it|es/tax-return keeps a self canonical without hreflang. This is a tag change only (no slug change, no redirect,
both pages stay). Files: alternates in the six tax-return pages + the three flagships; the `newLocaleLanguages` helper if
it builds them. Do not do it before the data says so.

### P3
- EN /superannuation WebPage: add name, description, isPartOf #website, about #business (parity with /tax-return; values
  from existing H1 and lead, not from the frozen meta). File src/app/(site)/superannuation/page.tsx `speakableSchema`.
- Service nodes: drop `availableLanguage` and `inLanguage` from Service objects in all money pages (likely validator
  warnings; language is already on WebPage and WebSite). Verify with https://validator.schema.org first.
- dateModified: add a timezone (`2026-11-24T00:00:00+11:00`) in WebPage nodes and SVT guidePageSchema, per the Article doc.
- hreflang `en`: either add `en` to the nine pages that lack it or remove it from the three that have it. Same URL, so
  this is tidiness only.
- DE/FR/IT/ES super pages: a short "Was ist DASP? / Qu’est-ce que le DASP ? / Cos’è il DASP? / ¿Qué es el DASP?" Answer
  block mirroring EN #what-is-dasp, ATO DASP URL as source. Low: their hero leads already define DASP. Leave JA alone
  (CTR 2.70% -> 2.68% -> 2.87% rising, 18 Bing citations).

## 3. Title and description proposals for the December decision (NOT to apply now; frozen until the measurement)
GSC = 3 month page export to 21 Nov (wht/Pages.csv, svt/Pages.csv); trend = wht-1021 -> wht-1105 -> wht.
| Page | Current | GSC behind it | Proposal | Verdict |
|---|---|---|---|---|
| /superannuation | T "Claim superannuation on a working holiday visa (DASP 2026)" | 9,457 impr, 41 clicks, 0.43%, pos 22.0 -> 19.9 -> 16.65; "super tax working holiday maker" 311 at 16.5, "417 visa super claim" 287 at 25.4; generic "claim superannuation" 348 at 38.4 | none | Ranking problem, title already holds the WHM terms. Revisit only if position is under 10 |
| /tax-return | D "...Any refund usually lands about 14 business days after lodgement." | 760 impr, 7 clicks, pos 31.9 -> 30.15 | D (154): "Tax return and refund for 417 and 462 visas: no payslips, no myGov, works from overseas. The ATO says most online returns process within 10 business days." | Only if Jo cannot source "14 business days"; ATO how-to-lodge says 10 |
| /de/superannuation | T "Superannuation aus Australien zurückholen (DASP)" | 1,097 impr, 20 clicks, 1.82%, pos 6.03 -> 5.96 -> 7.47; "superannuation australien zurück bekommen" 34 at 4.59, 0 clicks; "superannuation zurück" 35 at 13.17 | T (57): "Superannuation aus Australien zurückbekommen: DASP-Antrag" | Test: matches the typed verb at position 4.6 with 0 clicks |
| /de/tax-return | T "Steuererklärung Australien für Work and Travel, ohne myGov" | 170 impr, 2.35%, 6.94; crawled not indexed 16 Nov | none | Fix indexing first (P1-2) |
| /ja/superannuation | T "スーパーアニュエーション返金のやり方｜帰国後DASPで日本から申請" | 2,303 impr, 66 clicks, 2.87%, 7.46; "スーパー アニュ エーション 返金 5,000ドル以上" 34 at 5.88 (already in D) | none | Working, keep |
| /ja/tax-return | T "オーストラリアのタックスリターン代行｜ワーホリ・帰国後も" | 27 impr, pos 24.89; JA tax return queries ("…税理士" 136 at 7.12, "…いつまで" 129 at 7.73) land on other pages | none | Never add 税理士 for us; deadline intent goes to P2-1 table |
| /it/tax-return | T (61) "Tax return dall’Italia dopo il working holiday: come funziona", D 166 | no impressions | T (58) "Tax return dall’Italia dopo il working holiday: come si fa"; D (153) "Servono passaporto e conto bancario australiano, niente buste paga. Leggiamo il tuo record ATO e prepariamo la tax return, che firmi tu prima dell’invio." | Length fix only (title over 60, description over 160) |
| /fr/superannuation | D 168 | 15 impr, pos 7 | D (155) "Parti d’Australie avec un visa 417 ou 462 ? Réclamez votre super via le DASP, en ligne depuis la France : conditions, retenue de 65 %, documents, 28 jours." | Length fix only |
| /es/superannuation, /it/superannuation | unchanged | 74 impr 0 clicks at 6.07; 95 impr 1 click at 9.29 | none yet | Baseline too young (pages new about 3 Nov, a04 R9): judge in January |
| SVT / | T (74) "International student tax return in Australia from $220 \| Student Visa Tax", D 165 | 28 impr, 7 clicks, pos 34.54 (+10 impr on http://) | T (60) "Student tax return in Australia from $220 \| Student Visa Tax"; D (158) "Tax returns for 500 and 485 visas: $220, or $385 with ABN work, incl. GST. Reviewed and signed off by a registered tax agent before it is lodged with the ATO." | Length fix; same prices, no new ones |
| SVT /how-it-works | D 164 | 10 impr, 1 click, 5.8 | D (156) "WhatsApp us, pay by bank transfer, fill in a short form and sign online. Reviewed and signed off by a registered tax agent before it is lodged with the ATO." | Length fix |

## 4. What NOT to do
- Do not add FAQPage, HowTo, Speakable or Q&A markup to "win rich results": FAQ results ended 7 May 2026; no snippet
  feature to gain. Keep existing FAQPage (accurate, harmless, used as machine context). Never reintroduce QAPage.
- No LocalBusiness, ProfessionalService or AccountingService (Jo's rule, and AccountingService reads as an accountant
  claim). Organization only, as #business; leave #supervising-agent as Jo decided and never merge it into #business or
  describe WHT/SVT as the agent. No `reviewedBy` naming a person (no named reviewer).
- No aggregateRating or Review markup from Google reviews (self-serving reviews are not eligible; the home rating is
  already null on purpose).
- No Offer/price in any new Service node; SVT prices stay where they are; WHT gets none.
- No myGov problem text only inside the accordion; no JS that scrolls on load or strips `#` (breaks read-more links).
- Do not move FR/IT/ES hreflang before the December data (P2-4); never redirect or delete the twin pages (freeze).
- No WHT link, schema or hreflang to SVT or the reverse; no `sameAs` between the brands.
- Do not change titles/descriptions before the December measurement, including the length fixes in section 3.
- Do not add a new "What is DASP" block to /ja/superannuation; it is the best performing super page.
- Do not use 税理士, 会计/税务师, kế toán, Steuerberater for us in any schema `name`, `serviceType` or `description`
  (current values checked: compliant). JA Service name says タックスリターン; keep it.
- Cannibalisation check for P1-1: problem blocks on the money pages must answer in 2 to 4 sentences and link to the
  full guide (EN blog/dasp-rejected-what-to-do exists; myGov guides proposed elsewhere). Do not copy a guide's opening.
