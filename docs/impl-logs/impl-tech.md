# impl-tech (T1, T7, T4, T9, T2b)

Repo /home/claude/v68/base20. tsc clean. Full jest: 7 failed tests in 8 suites, all pre-existing (Will x7 suites, form-start-lang). No dashes in added lines.

## T1 whatsapp_click (both brands), consent kept as Jo decided on 3 Nov
Root causes found:
1. WHT: no site-wide listener. Only ~10 client components called trackWhatsApp (MobileCta, GuideCta, GuideArticle inline, Nav, Footer, HomeWa, calculators). Every other WhatsApp link (server-rendered page CTAs on /tax-return, /superannuation, /tfn, /medicare, home sections, expenses, locale guide/category pages, contact, etc.) sent nothing. The `waClicks` listener existed but was SVT only and only for `a[data-wa-pos]`.
2. The event was a normal gtag hit. SVT LinkButton opens wa.me in the SAME tab, so the page unloads with the hit in flight; WHT target=_blank on mobile backgrounds the page at once.
3. GA loads only after Accept (3 Nov, kept). So GA undercounts by design: visitors who decline or ignore the banner are never counted. The banner also sat at bottom:12px with z-index 60, on top of the mobile sticky WhatsApp bar (WHT .mobile-cta-bar z 60, SVT sticky aside), i.e. it covered the main conversion button until the visitor chose.
4. SVT events sent language only for zh/vi.
Changes:
- src/lib/analytics.ts: whatsapp_click and guide_cta_click sent with transport_type 'beacon'; new isWhatsAppHref() (wa.me, api.whatsapp.com, whatsapp.com/send, whatsapp:); new trackWhatsAppLink(a) (position from data-wa-pos, else sticky/guide-end/nav/footer/inline from DOM context; language from the path, all 8 site languages; optional data-wa-topic). Dedupe: skips if a component already sent whatsapp_click within 1 s. Prefilled message text is never read or sent (no personal data).
- src/components/layout/Analytics.tsx: listener on by default for both brands (waClicks default true), on window bubble phase (React handlers on document run first, so the richer component event wins; still synchronous before navigation), click + middle-click. Gate unchanged: no Google script before Accept. After Accept the init sets Consent Mode v2: analytics_storage granted, ad_storage / ad_user_data / ad_personalization denied, and config allow_google_signals false, allow_ad_personalization_signals false. Banner: on <900px it sits at bottom calc(88px + safe area), above the sticky WhatsApp bar on both brands; z-index 61.
- next.config.js CSP: script-src and connect-src already allowed www.googletagmanager.com, www.google-analytics.com and *.google-analytics.com (covers region1) on WHT static CSP, SVT CSP and the /crm nonce CSP (src/proxy.ts). Added GA4 image fallback hosts (*.google-analytics.com, www.googletagmanager.com) to img-src on WHT and SVT, matching config/csp-report-only.js.
- Privacy policy text not changed.
- NOTE for Jo: GA will still undercount by design (no tag before Accept). The real measure is the CRM count of chats by prefilled message.
- Tests: new src/lib/__tests__/whatsapp-click-23nov.test.ts (href detection, beacon, placement/lang, no message text, dedupe, no throw without gtag, listener/consent/banner offset, CSP hosts, T7, T9, T4). Existing ga-consent-3nov test still passes.

## T7 sticky bar prefill on guide pages
- New src/components/ui/guide-wa-topic.ts (plain module, server-callable): category -> WaTopic table shared with GuideCta (GuideCta now imports it; behaviour unchanged).
- src/app/(site)/blog/[slug]/page.tsx and src/components/blog/LocaleGuidePage.tsx: MobileCta href = waUrl({ topic: guideWaTopic(category), lang, detail: guide.title }), same as the closing GuideCta and the inline CTA; label unchanged; topic passed for GA.
- SVT: src/components/svt/StickyReveal.tsx points the sticky bar at the guide's own guide-end WhatsApp link (whatsappAbout with the guide label, names Student Visa Tax); off guides it keeps the hello message. Label unchanged.

## T4 redirects (next.config.js, inside whtOnly so never on SVT host)
Confirmed slugs: JA and DE Medicare category slug is 'medicare' (jaCategoryMeta line 166, de data.ts line 160); EN is 'medicare-and-other'.
Added 301s: /Home -> /, /ja/Index -> /ja, /de/Index -> /de, /ja/blog/category/medicare-other and /medicare-and-other -> /ja/blog/category/medicare, /de/blog/category/medicare-and-other -> /de/blog/category/medicare, /blog/category//:rest* -> /:rest*, /(de|ja|fr|it|es)/blog/category//:rest* -> /:rest*, plus the collapsed-slash forms /blog/category/(loc)/blog/category/:slug and /blog/category/blog/category/:slug. Next matching is case-insensitive, so /home, /ja/index also covered. Verified with Next's own path-match in tests; live category URLs untouched.

## T9 schema
- Removed Article microdata (itemScope/itemType Article + 4 meta itemProp) from EN guide page and LocaleGuidePage; JSON-LD articleLd already carries headline, datePublished, dateModified, author. No other itemProp in src.
- Organization only: confirmed, no LocalBusiness/ProfessionalService type anywhere (WHT RootDocument, SVT jsonld).
- RootDocument OfferCatalog (schema, my area): removed 'TFN Application' and 'ABN Registration' offers (not a service, Jo 18 Nov); 'Tax Return Lodgement' / "Lodge your Australian tax return" renamed to 'Tax Return' with the approved sentence. Category noindex decision (/blog/category/super) was not in my brief; not done.

## T2b llms files (generator scripts/generate-llms.mjs is not in this zip; hand-edited minimally; regenerate will overwrite, so the generator source must get the same wording)
- public/llms.txt: intro no longer claims "We handle TFN applications, ABN registration ... Medicare levy exemptions"; now tax returns, DASP, Medicare levy exemption claim in the return, guides explain how to apply for a TFN and ABN yourself. "applying for a Medicare Entitlement Statement" -> "explaining how to apply for a Medicare Entitlement Statement". Service list: "TFN Application"/"ABN Registration" -> "TFN"/"ABN" with descriptive (not service) summaries; Tax Return summary "Lodge your..." -> approved sign-off sentence.
- public/llms-full.txt: same three service page entries. No MES claim existed there. No SVT services, super consolidation or mail-holding claims found in either file.
