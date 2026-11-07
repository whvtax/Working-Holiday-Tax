# Log: es-pages

## Applied
- es-guides-b-004 / es-pages-006: blog/[slug]/page.tsx Medicare service box: label "Qué hacemos con el Medicare levy"; blurb now says the levy does not come out of the payslip, it is calculated in the tax return, exemption needs a Medicare Entitlement Statement.
- es-pages-001: blog/data.ts tax-return hub intro: refund-promise sentence replaced ("A menudo el empleador retuvo más... Si hay devolución, y de cuánto, lo decide la ATO.").
- es-pages-002: tax-return hub FAQ now opens "Depende de tu año: ... y eso lo decide la ATO."
- es-pages-003: abn/page.tsx "Nuestra garantía sobre la tarifa se aplica solo...".
- es-pages-004: super hub intro "(12 % desde el 1 de julio de 2025, sin cambios para 2026-27)"; FAQ now "desde el 1 de julio de 2025, según la ATO" + Payday Super sentence (Fair Work attribution removed).
- es-pages-005: DASP FAQ: 35% reframed as the rate for other temporary residents.
- es-pages-007: health insurance FAQ no longer calls it a visa condition; softened, no Home Affairs quote (not verified).
- es-pages-008: home FAQ opens with WHM rates 15/30/37/45 % (2025-26, unchanged 2026-27).
- es-pages-009: flagship: answer-first hero lede (definition + 2025-26 + 15 % up to 45.000 AUD), definition sentence opens "Lo básico", new section "Las cifras clave" (KEY_FIGURES: year, WHM rates, 45 % without TFN, Medicare 2 %, deadline, ~14 business days) with "Fuente: ATO", plus FAQ "¿Cuánto impuesto paga un working holiday maker en Australia?".
- es-pages-010: flagship made the complete guide, /es/tax-return the service page. Flagship: REFUND_SOURCES cards cut to a one-paragraph summary linking to /es/tax-return; 7-step SEQUENCE + HowTo schema + RULES removed and replaced by a short process paragraph + LinkButton "Cómo trabajamos tu tax return, paso a paso" (/es/tax-return); new sections Medicare levy por pasaporte, "Si se te pasó el 31 de octubre" (2025-26 vs 2026-27, late lodgement, Australian-account rule), "¿Puedo hacerlo yo en myGov?"; FAQ "¿Qué tengo que hacer yo?" replaced by a myGov DIY FAQ; "paso 01/04" references reworded. /es/tax-return: dropped keywords 'devolución de impuestos Australia' and 'cuánto tarda la devolución...'; added a contextual link to the flagship under the process steps (GUIDES link kept).
- es-pages-011: /es/medicare: FAQ 1 now "2 % del ingreso imponible: unos 500 AUD sobre 25.000 AUD" (EN page figure); hero lede answer-first; RHCA paragraph added (Spain + 6 LatAm countries not on list; list of 11 with Italy/Malta limited; MES from Services Australia; ATO decides). Flagship has its own Medicare section + FAQ.
- es-pages-012: /es/superannuation: new section before the final CTA bridging to /es/devolucion-impuestos-australia.
- es-pages-013 (blog part): /es/blog: section after the grid linking "Devolución de impuestos en Australia: la guía completa" to the flagship (BlogClient is not mine, so it sits below the grid, not pinned above).
- es-pages-014: work-rights FAQ: "nuestro equipo puede ayudarte a escalarlo" replaced by the free Fair Work Ombudsman route.
- es-pages-015: masculine "el tax return" / "el Medicare levy" across blog/data.ts category hubs (except meta description), guide aside p2 "revisado y aprobado" (matches flagship wording), ABN blurb, category keyword "TFN para el tax return", home "si el levy te correspondía".
- es-pages-016: lost-super FAQ rewritten (TFN, ATO, myGov, help before DASP).
- es-pages-017: calculator doIntro no longer counts ("Esto es lo que myGov no revisa por ti."); diffParas[0] "Hay tres cosas que esta página no puede calcular."
- es-pages-019: /es/superannuation hero lede answer-first (DASP eligibility, 65 % of the taxable component, overseas account).
- es-pages-020: /es/blog: duplicate orgLd removed; collectionLd.publisher = { '@id': `${SITE_URL}/#business` }.
- es-pages-021: expenses (index, delivery-drivers, cleaners): '0,88 AUD por km' / '0,91 AUD por km'; also every "50 céntimos" laundry rate -> "0,50 AUD" (6 places). TFN example: 30 AUD la hora, unos 9 AUD por hora.
- Extra (iron rule, allowed for ES): "Nosotros tratamos directamente con la ATO." replaced in es/page.tsx, es/contact/page.tsx and es/calculator/CalculatorClient.tsx with "Preparamos todo por ti, y un agente fiscal registrado lo revisa y lo aprueba antes de presentarlo ante la ATO." /es/tax-return FAQ "la presentación se hace a través de nosotros" reworded the same way.

## Skipped
- es-pages-014 second part (public holiday "250 % for casuals"): award-specific, not verifiable against an official page in this session.
- es-pages-018 "presentar tarde normalmente no tiene costo adicional si hay devolución": not confirmed; wrote only that interest and a failure-to-lodge penalty may apply if tax is owed (linked to the ATO failure-to-lodge-on-time page already used on the site). No agent-extension wording added.
- blog/data.ts Tax Return hub meta description ("Cómo presentar la tax return...") left as is: titles/meta are locked, gender only.

## Handoff
- src/components/ui/GuideCta.tsx line ~278 (ES copy): "la exención de la Medicare levy" -> "la exención del Medicare levy".
- src/components/wht/CalculatorBlocks.tsx (es-pages-013 calculator part): add `taxReturn: string` to CalcHrefs, a `linkTaxReturn` string to CalcStrings, render `<Link href={p.hrefs.taxReturn}>{t.linkTaxReturn}</Link>` next to linkMedicare. Then in src/app/(es)/es/calculator/CalculatorClient.tsx add `linkTaxReturn: "Cómo se presenta el tax return"` and `taxReturn: '/es/devolucion-impuestos-australia'` in hrefs (other locales need their own values).
- Meta (locked, lead decides): /es/devolucion-impuestos-australia twitter.description "Tú firmas, nosotros presentamos." and /es/tax-return twitter.description "Lo firmas tú y lo presentamos nosotros." read as "we lodge"; suggest "Tú firmas; un agente fiscal registrado lo revisa y aprueba antes de presentarlo."

## Facts checked
- WHM rates 15/30/37/45 % with 45.000/135.000/190.000 thresholds, unchanged 2026-27: public/llms.txt Key facts (ATO).
- SG 12 % from 1 July 2025, Payday Super from 1 July 2026: llms.txt (ATO).
- DASP 65 % of taxable component: llms.txt (ATO).
- 45 % withholding without TFN: llms.txt (ATO).
- Medicare levy 2 %, about 500 AUD on 25.000 AUD: EN src/app/(site)/medicare/page.tsx.
- RHCA list (11 countries; Spain/LatAm absent); Italy limited cover: llms.txt (Services Australia) + FIX_BRIEF.
- Cents per km 88c to 2025-26, 91c from 2026-27; minimum wage 26.44: llms.txt.
- Failure to lodge on time penalty: ATO URL already used on the site (ato.gov.au/.../failure-to-lodge-on-time-penalty); could not fetch ato.gov.au (not on allowlist), so wording kept general ("puede").

## Verification
- tsc: only errors are in src/components/blog/LocaleGuidePage.tsx (not mine: unused localePublishedIso/guideDateFromIso, missing isoGuideDate).
- jest: wht-copy-compliance-6-languages, locale-blog, new-locales-sitemap, page-photo-priority, seo-legal-og: 49/49 pass.
- No U+2013/U+2014 in any es file outside chunks; no NBSP added (existing NBSP before % in data.ts kept in untouched text). eslint src/app/(es) quiet: clean.
