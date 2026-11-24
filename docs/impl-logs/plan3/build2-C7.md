# build2-C7 (24 Nov 2026)

No new facts were added. Every visible sentence below is approved wording or an existing translation of it (grepped in the codebase before use).

## 1. Breadcrumbs through the money page (r17 P1-7)
I checked the existing code first. EN and locale guides had one visible crumb (PageHead) and one BreadcrumbList each, both "Home > Blog > Category > title". I changed position 2 in place, so nothing is duplicated:
- `src/app/(site)/blog/[slug]/page.tsx`: new `MONEY_HUB_CRUMB` map. The 'Tax Return' category becomes "Tax return" /tax-return and 'Super' becomes "Superannuation" /superannuation. It feeds both the BreadcrumbList (position 2) and the visible PageHead crumbs. Other categories keep Blog.
- `src/components/blog/LocaleGuidePage.tsx`: the same map per locale, used for the LD and the visible crumbs:
  - DE: Steuererklärung /de/tax-return, Super auszahlen /de/superannuation
  - JA: タックスリターン /ja/tax-return, スーパー受取 /ja/superannuation
  - FR: Tax return Australie PVT /fr/tax-return-australie-pvt, Superannuation /fr/superannuation
  - IT: Dichiarazione dei redditi /it/dichiarazione-redditi-australia, Superannuation /it/superannuation
  - ES: Devolución de impuestos /es/devolucion-impuestos-australia, Superannuation /es/superannuation
- Decision: the result is Home > hub > category > title, which is the r17 shape. The task wrote "Home > money page > title", and I kept the category crumb so the category pages do not lose that link. For the labels I used each hub's own crumb and BreadcrumbList name instead of the r17 labels (for example "Super auszahlen", not "Super-Auszahlung (DASP)"), so one URL carries one name across the site. The URLs are the r17 URLs.
- NOT done (file not owned): `src/app/(site)/blog/[slug]/StickyBreadcrumbs.tsx` still shows "Blog" at position 2, because its href is hard-coded to `${basePath}/blog`. It needs a `blogHref` prop. Then pass crumbHub.label and crumbHub.path from both templates.

## 2. Trust line under the closing button and the Super MobileCta (r19 P2-A)
- `src/components/ui/GuideCta.tsx` `under` field, in all 6 languages:
  - TFN, ABN, Tax Return and Medicare & Other: "Replies in about an hour. Reviewed and signed off by a registered tax agent before it is lodged with the ATO." plus the DE, JA, FR, IT and ES text from r19.
  - Super: "Replies in about an hour. Working Holiday Tax operates under the supervision of a registered tax agent." plus the translations.
  - Work Rights is unchanged.
- The `under` paragraph now has the style `width:0; minWidth:100%`, so the longer line wraps to the button's width instead of widening the column.
- Fixed a syntax error that was already in HEAD: the IT Super body was single-quoted but contained "dell'invio". It is now double-quoted with the same text.
- `src/components/ui/MobileCta.tsx`: new `variant="super"` with a SUB_SUPER line:
  - EN "Under the supervision of a registered tax agent · reply in ~1 hour"
  - DE "Unter der Aufsicht eines registrierten Tax Agent · …"
  - JA "登録タックスエージェントの監督のもとで運営 · …"
  - FR "Sous la supervision d’un agent fiscal enregistré · …"
  - IT "Sotto la supervisione di un agente fiscale registrato · …"
  - ES "Bajo la supervisión de un agente fiscal registrado · …"

  These are the existing short forms from the footer seal alt and the approved sentence.
- The variant is wired on Super guides in both templates (`variant={guide.category === 'Super' ? 'super' : 'default'}`) and on EN /superannuation. The href, topic and tracking are unchanged.
- NOT done (not owned): the DE, JA, FR, IT and ES /superannuation pages still call MobileCta with the default "Signed off" sub line. Their owners only need to add `variant="super"`.

## 3. Google rating on /superannuation (r19 P2-D)
- `src/app/(site)/superannuation/page.tsx`: `<GoogleRating variant="pill" lang="en" />` under the hero note, the same component /tax-return uses. It shows the real rating fetched live (useGoogleSummary) and renders nothing until that rating is loaded. No number is hard-coded.

## 4. Links to /leaving-australia
- EN /tax-return, "What is next" section: "Leaving soon, or already home? The tax return and the super claim, in the order that works, are on one page: [leaving Australia, before and after you go](/leaving-australia)."
- EN /superannuation, "What is next" section: the same sentence.
- EN home (`src/app/(site)/page.tsx`), services LinkRows: a new row "Leaving Australia" (eyebrow "Before and after you fly home") after the UK row.
- `src/components/layout/Footer.tsx`, Learn/Guides column, second item in each language:
  - EN "Leaving Australia"
  - DE "Australien verlassen"
  - JA "出国前後の手続き"
  - FR "Quitter l’Australie"
  - IT "Lasciare l’Australia"
  - ES "Salir de Australia"

  Each points to /<l>/leaving-australia. The EN Learn column now has six links; Jo had trimmed it to five, and this task adds the hub.
- Nav.tsx is not changed.

## Not touched
- WhatsApp tracking, guide-wa-topic, titles, descriptions, H1s, GuideArticle.tsx.

## Verify
- `npx tsc --noEmit -p .`: clean.
- jest results:
  - Passed: whatsapp-click-23nov, locale-blog, frontend-security, font-imports, ga-consent-3nov, svt-ga4-27oct and analytics-privacy.
  - new-locales-sitemap: 3 failures (fr, it and es "allowlisted route has a page file"). These come from another agent's `src/lib/locale-pages.ts` (SHARED_HUB_PAGES '/leaving-australia'), because the leaving-australia page files do not exist yet. They are not caused by C7 files.
  - `__tests__/wht-copy-compliance-6-languages.test.ts` does not exist in the repo.
- Dash and rule grep on the added lines: clean.
