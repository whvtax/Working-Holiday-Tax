# A18 End-to-end QA, A04 Mobile UX, A05 Desktop UX

Baseline d9dbac0, production build on port 3100 (the server had died mid-run; restarted with `npx next start -p 3100` per resume-instructions.md, nothing rebuilt). Playwright chromium with `--host-resolver-rules=MAP svt.localhost 127.0.0.1`; raw HTTP via 127.0.0.1 + `Host: svt.localhost:3100`; GA/GTM routed to empty 200.
Screenshots: `/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/audit-shots/` (119+ files, named `<page>-<width>.png` full page, `d-<page>-<width>-fold|end.png` desktop viewport, plus the journey shots named below). Scripts and raw logs: `.../scratchpad/qa/` (`j1-results.json`, `j2-8.log`, `ux.log`, `ux-results.json`).

Summary: no CRITICAL or HIGH. 1 MEDIUM (sticky header hides anchored headings and the top of the sticky table of contents on article/guide pages), 6 LOW, 4 INFO. All eight A18 journeys ran; the brand-separation, dash, fee and legal-wording checks across all 567 SVT URLs passed.

---

## Section A18: end-to-end QA

### J1 Every SVT route: PASS
Script `qa/j1-crawl.js`, concurrency 6. 558 sitemap URLs (13 en + 13 zh + 13 vi static pages, 173 x 3 articles) plus /contact x3, /client-agreement, /privacy (en, zh, vi), /tax-form x3 = 567 URLs.
- 563/567 status 200; exactly one `h1`; `header` and `footer` present; `html lang` = en-AU (189) / zh-CN (187) / vi (187); zero console errors, zero pageerrors, zero failed requests on every 200 page.
- Brand leak regex `/working\s*holiday|workingholidaytax|0424 513 998/i` on rendered DOM: no match for the brand name, domain or phone number anywhere. 34 en/zh/vi pages contain the generic ATO term "working holiday maker (tax rate)" / "working holiday visa" (e.g. /tax-residency FAQ "I moved from a working holiday visa to a student visa", /blog/student-visa-tax-guide-500-485 "the working holiday maker tax rate does not apply to 500 or 485 visa holders", /zh/blog/tfn-declaration-form-international-students "打工度假者（working holiday maker）"). These are tax-law terms, not the WHT brand; see INFO-1.
- Dash check `/[–—―]/` on `innerText`: no em/en dash on any of the 567 pages.
- The 4 non-200: /zh/privacy, /zh/client-agreement, /vi/privacy, /vi/client-agreement are 404 (legal pages are English-only by design: `src/components/svt/Footer.tsx:61,63` link every locale to `/client-agreement` and `/privacy` with `hrefLang="en-AU"`; `src/lib/svt/pages.ts:45-46` lists them only once). Nothing links to the zh/vi variants; not a defect. The 404 page itself (`src/app/global-not-found.tsx`) is brand-aware by host: on the SVT host it renders SVT ink colours and `wa.me/614123123123`; on WHT `wa.me/61424513998`. No header/footer and `lang="en"` on the 404 by design; see LOW-6.
- /client-agreement and /privacy: 200, `<meta name="robots" content="noindex, follow">` confirmed. /tax-form x3: `noindex, nofollow`.
- Redirects: /questions -> 308 /contact, /zh/questions -> 308 /zh/contact, /vi/questions -> 308 /vi/contact.

### J2 Navigation: PASS
Script `qa/j2-8.js`. Evidence `j2-dropdown-guides-1280.png`, `j2-dropdown-deductions-1280.png`, `j2-mobile-menu-390.png`.
- Desktop 1280, en/zh/vi: both dropdowns (Guides 8 links, Deductions 12 links) are closed at rest, open on hover, open on keyboard focus (`:focus-within`, `Header.module.css:56`), Tab moves into the first panel link with the panel still shown. Panel right edges 843..1111px at 1280/1440: no overflow at the right edge. Header nav does not wrap in zh (649px) or vi (752px) inside the 1120px bar.
- All 20 dropdown links, 25 header links and 14 footer links per locale resolve 200 (external ones are only `wa.me/614123123123` with locale text and `mailto:`).
- Mobile 390 `<details>` menu: summary 55x48 (zh 46x48), opens on tap, 12 links each 48px tall, all 200, no horizontal overflow with the menu open (en/zh/vi, also 360 and 768). Desktop dropdown buttons are `display:none` on mobile.
- Language switch on /, /pricing, /medicare, /blog/student-visa-tax-guide-500-485, /blog, /contact from each of the 3 locales (18 start pages, 36 switches): lands on the correct locale URL, `html lang` changes, `h1` text changes language every time. Every `link[rel=alternate][hreflang]` (en-AU, zh-Hans, vi, x-default) on those pages resolves 200.

### J3 Blog hub: PASS
- en/zh/vi: 173 cards in the HTML, 8 pills. For every pill the visible card count equals min(pill count, 12): All 173->12, TFN 21->12, Tax return 46->12, Deductions 17->12, Work 44->12, ABN 18->12, Super 19->12, Medicare and health 8->8 (pager hidden when one page). `aria-pressed` toggles.
- Pager: "Page 1 of 15" / "第 1 页，共 15 页" / "Trang 1/15"; Previous disabled on page 1; Next -> page 2 (12 cards, scrolls to #articles); Previous back to 1; last page shows 5 cards (173 = 14x12 + 5) with Next disabled.
- Keyboard: Enter on a pill presses it, Space on "All" works, Enter on Next advances; focus ring is `outline 2px` + box-shadow (visible).
- JS disabled (`javaScriptEnabled:false`): 173 article links in the HTML, 12 cards visible, pills and pager rendered (inert). `j3-bloghub-nojs-1280.png`, `j3-bloghub-page2-1280.png`.
- Observation (not a finding): topic and page are component state only, not in the URL; see LOW-5.

### J4 Price check widget: PASS
- Widget is on the home page in all 3 locales (`/`, `/zh`, `/vi`); /pricing has no widget (the brief's "home/pricing" was checked on both; the pricing page uses a static price card). 2 visa + 2 work radios (plus a second instance, 8 radios in total on the page).
- Default $220; Student 500/Graduate 485 + "Work with TFN + ABN" -> $385; back to TFN -> $220. Preview text updates (en "Hi, I am on a 485 visa and had TFN jobs and ABN work this year. Can you do my tax return?"; zh and vi equivalents). `wa.me/614123123123?text=` carries the URL-encoded preview text exactly. No dashes in amount, preview or decoded href. No console errors.

### J5 Tax form (closed build): PASS
- /tax-form, /zh/tax-form, /vi/tax-form: h1 "Your tax form" / "你的报税表" / "Tờ khai thuế của bạn", 0 `<form>`, 0 inputs, one `wa.me/614123123123` link with the locale hello text, `robots: noindex, nofollow`, no gtag script on the page (`FORM_PATHS` untagged). Nothing was submitted to /api/*. `j5-taxform-closed-390.png`.

### J6 Sticky WhatsApp bar: PASS with one deviation from the brief
- Implementation is `position: sticky; bottom: 0` (`StickyWhatsApp.module.css`), placed between `<main>` and `<footer>`: the bar is visible from the first paint (not "after scroll"), stays at the viewport bottom while `main` scrolls, then scrolls away with the end of `main`, so it never covers the footer or the last line of content (measured on 8 pages at 390: at page end bar top = -252px, footer last element bottom 834 < 844, `overlapsFooterEnd=false`, `coversMainEnd=false`). `j6-sticky-mid-390.png`, `j6-sticky-end-390.png`.
- Hidden at >=900px (desktop 1280 `visible=false`), shown at 768 (tablet shows the bar; the header CTA is hidden below 900, so there is always exactly one WhatsApp action).
- It is NOT hidden on /tax-form (the brief expected it hidden): `SvtDocument.tsx` renders it on every page. In this closed build the page is short, the bar sits in flow at y=356 and does not cover anything (`j6-sticky-taxform-390.png`). See LOW-4 for when the form opens.
- `html { scroll-padding-bottom: 96px }` under 900px (`svt.css:66`) keeps focused elements above the bar.

### J7 Back/forward/refresh on the blog hub: PASS
Script `qa/j7.js`. Next -> "Page 2 of 15" (12 cards); last page 5 cards; click first card -> article URL; Back -> /blog with pills and pager working (state resets to page 1, LOW-5); Forward -> article; Back + reload -> page 1, Next -> page 2. Console (all types except log): empty; hydration warnings: 0.

### J8 WHT spot check: PASS
localhost:3100 `/`, `/tax-form`, `/blog`: 200, one h1 each ("Working holiday tax returns ...", "Tell us a bit about yourself", "Working holiday tax guides ..."), `lang=en-AU`, footer present on / and /blog (the WHT form page has no footer, as before), no console errors or pageerrors, no horizontal overflow, no "Student Visa Tax"/"studentvisatax" string in the WHT HTML. WHT has no `<header>` element (its nav is `<nav class="nav-dark fixed ...">`, `src/components/layout/Nav.tsx`), which is the pre-existing WHT markup, not a change. `j8-wht_home-1280.png`, `j8-wht_tax-form-1280.png`, `j8-wht_blog-1280.png`.

---

## Section A04: mobile UX (360x740, 390x844; 768x1024 also measured)

Pages: home, pricing, tax-residency, medicare, blog hub, long article (en, zh, vi), contact, 404, plus /zh, /vi, /vi/pricing, /vi/blog, /zh/blog. Automated measurements per page (`ux-results.json`) plus visual review of the tiled full-page shots (`*-tiled.png`).

Checks that passed on every page at 360 and 390:
- No horizontal overflow: `scrollingElement.scrollWidth == innerWidth` on all 15 pages x 2 widths, also with the mobile menu open in zh and vi.
- No element extends past the viewport edge.
- No clipped visible text (the only `scrollWidth > clientWidth` hits are `svt-visually-hidden` spans, 1px wide by design).
- Body text 16px; h1 38px; long zh/vi strings (h1 "澳洲 500 和 485 签证持有人报税指南", "Hướng dẫn thuế cho người có visa 500 và 485 ở Úc", breadcrumbs, FAQ summaries, footer labels "Client Agreement (Thỏa thuận khách hàng)") wrap cleanly; the Vietnamese webfont subset loads (no fallback glyph mixing visible).
- Touch targets: header summary 48px, menu links 48px, primary buttons 52px+, price-check pills 48px, pager buttons 44px, FAQ summaries 44px+, language pills 44px.
- Pager at 390: Previous 102x44, Next 75x44, centred, thumb-reachable; after Next the `#articles` section lands at y=72 under the 73px header (`scroll-margin-top: 72px`), i.e. the topic pills are the first thing in view. Fine.
- Sticky header (73px) does not cover page content while scrolling (content starts below it); but see MEDIUM-1 for anchors.
- 404 at 360: centred, no overflow, buttons 46px.

Findings are in the table below (LOW-1, LOW-2, LOW-3, LOW-4).

## Section A05: desktop UX (1280x800, 1440x900)

Checks that passed:
- Header: one row at 1280 and 1440 in en/zh/vi, dropdown panels fully inside the viewport (right edge <= 1111px at 1440), no wrap.
- Consistent content width: `main` sections all use the same 32px gutter and `--svt-max` (1120px bar); blog grid 3 columns; footer 4-column grid at 1280/1440, 2 columns at 768, 1 column on phones.
- Hero image on home: 519x600 portrait (natural 1122x1402, `object-fit: cover`) at 1280/1440, plus a 1280/1440x440 wide photo band (natural 1975x724); no stretching, no layout shift observed between fold screenshots.
- Article/guide two-column layout (content + 300px sticky aside) renders at both widths; the long Vietnamese/Chinese TOC labels wrap inside the 300px aside.
- 404 page centred at 440px max width.
- Nothing visibly broken on any page/width reviewed (`desk-grid.png` contact sheet, `d-*-1280|1440-fold|end.png`).

Findings: MEDIUM-1 (sticky header vs anchors/TOC), INFO-3 (empty right half of the hero on pricing and contact).

---

## Findings

| id | sev | page / viewport | evidence | smallest fix | leave as is? |
|---|---|---|---|---|---|
| **A18A04A05-1** | MEDIUM | Every long article and guide page, desktop 1024+ (also deep links with `#id` on any width) | Clicking a TOC link ("On this page") scrolls the target section to `top=24px` but the sticky header is 73px tall, so the heading is fully hidden under the header (heading bottom 55 < header bottom 73; `anchor-toc-1280.png`, `anchor-toc-1440.png`). Cause: `GuidePage.module.css:23 .section { scroll-margin-top: 24px }`, `ShortAnswer.module.css:14 .label { scroll-margin-top: 24px }`, header `position: sticky` (`Header.module.css:3`). Same for the sticky aside: `GuidePage.module.css:61 .aside { position: sticky; top: 24px }` slides under the header while scrolling, hiding the "On this page" title and the first link ("In short") (`aside-under-header-1280.png`, `aside-under-header-1280-guide.png`; `elementFromPoint` at the first link returns the header nav). | In `GuidePage.module.css`: `.section { scroll-margin-top: 100px }` (line 23), `.aside { top: 97px; max-height: calc(100vh - 121px) }` (line 61); in `ShortAnswer.module.css:14` `scroll-margin-top: 100px`. Or one rule in `svt.css`: `html { scroll-padding-top: 100px }` for the anchors. | No for a launch that relies on the article TOC: a reader who clicks "Super from your job" sees the paragraph below the heading and no heading. Visible on every one of the 519 article URLs on desktop. |
| A18A04A05-2 | LOW | Home (en and vi) at 360; also 390 for vi | The language switch pill "Tiếng Việt" wraps onto two lines ("Tiếng / Việt") because three equal-width `flex: 1` pills share 320px with `padding: 0 12px` (`LanguageSwitch.module.css:2-8`); `home-360-tiled.png` (first tile), `home-vi-360-tiled.png`. Not clipped, still 44px tall, but looks broken next to the single-line "English" and "中文". | `.switch a { padding: 0 8px; white-space: nowrap; }` or let the pills size to content (`.switch li { flex: 0 1 auto }`) on phones. | Acceptable for launch; cosmetic. |
| A18A04A05-3 | LOW | Blog hub, all widths (topic pills) and footer link lists on phones | Topic pills are `min-height: 40px` (`BlogHub.module.css:18`), measured 40px; footer "Guides/Learn/Connect" links measured 36px tall at 360/390 (`Footer.module.css`), language-switch link "中文" in the compact row is 28px wide. All below the 44px target the project uses elsewhere (`--svt-tap`), but spaced with 8px gaps so WCAG 2.5.8 (24px) is met. | Pills: `min-height: var(--svt-tap)`; footer links: `min-height: var(--svt-tap)`; compact language links: `padding: 0 8px`. | Yes. |
| A18A04A05-4 | LOW | /tax-form, /zh/tax-form, /vi/tax-form on phones, once `SVT_FORMS_ENABLED=true` | `SvtDocument.tsx:27` renders `<StickyWhatsApp>` on every page including the form pages; the brief expects it hidden there. Today the form is closed and the bar sits in flow (`j6-sticky-taxform-390.png`), harmless. When the form opens, a 76px sticky "Message us on WhatsApp" bar will sit over the bottom of a long multi-step form on phones and compete with the form's own buttons (`scroll-padding-bottom: 96px` mitigates focus, not the visual overlap). | In `SvtDocument` skip `<StickyWhatsApp>` when the pathname is in `FORM_PATHS` (the list already exists there for Analytics), or add `[data-sticky-wa]` hiding in the form provider. | Yes for this build (form closed). Should be fixed before the form is opened. |
| A18A04A05-5 | LOW | Blog hub (en/zh/vi) | Topic and page live only in React state (`BlogBrowser.tsx:38-39`): after opening an article from page 7 and pressing Back the hub is on page 1 "All" again (J7 evidence); the URL cannot be shared with a topic or page. Everything is otherwise reachable. | Mirror `topic`/`page` into `?topic=&page=` with `history.replaceState` and read them in the initial state; or ignore. | Yes. |
| A18A04A05-6 | LOW | SVT 404 for zh/vi paths (e.g. /zh/anything), all widths | `global-not-found.tsx` renders English with `lang="en"`, no header, no footer, no language switch, for any unknown path including `/zh/...` and `/vi/...`. Brand colours and the SVT WhatsApp number are correct. | Pick the words by the `/zh` or `/vi` prefix of the request path (the component already reads headers; add the three strings) and set `lang` accordingly. | Yes. |
| A18A04A05-7 | INFO | 34 SVT pages (listed in `j1-results.json`, `leakText=true`) | Rendered text contains "working holiday maker tax rate" / "working holiday visa" as ATO terminology, never the brand, domain or phone. Flagged only because the brief's regex matches it. Jo's brand rule ("names or links WHT") is not breached. | None, or reword to "417/462 visa rate" if Jo wants zero occurrences of the phrase. | Yes. |
| A18A04A05-8 | INFO | Home price check, all locales | Hero says "$220 per return" (`i18n.ts:88` "per return", vi "mỗi hồ sơ", zh "每份报税"), the price-check result says "$220 per year" (`priceCheck.perYear`, zh "/ 年", vi "mỗi năm"). Same fee, two units on one screen. | Use one wording (per return) in `priceCheck.perYear`. | Yes. |
| A18A04A05-9 | INFO | /pricing and /contact at 1280/1440 | The hero column is ~640px wide and the right half of the first screen is empty until the aside begins (`d-pricing-1440-fold.png`, `d-contact-1440-fold.png`). Consistent with the guide-page layout; not broken. No redesign proposed. | None. | Yes. |
| A18A04A05-10 | INFO | Article meta lines | "Updated 2026-10-27 · 8 min read", "Source: ...", card tag "TFN 6 min read" and footer legal links are 12-13px (mono/meta). Body copy is 16px; this is meta text only. | None, or raise meta to 14px. | Yes. |

No CRITICAL or HIGH findings. Hard business rules checked in the browser (fees $220/$385 incl. GST on home, pricing and price check; supervision wording on home; no dashes on 567 pages; no WHT brand name/phone/domain in SVT DOM; no SVT string in the 3 WHT pages): all pass.

---

## Coverage

Routes tested in full (status, h1, lang, header/footer, console, brand/dash regex): all 558 sitemap URLs on svt.localhost:3100 (`/`, `/pricing`, `/how-it-works`, `/tax-residency`, `/medicare`, `/abn-delivery`, `/do-i-need-to-lodge`, `/past-years`, `/leaving-australia`, `/superannuation`, `/about`, `/contact`, `/blog`, the same 13 under `/zh` and `/vi`, and 173 `/blog/<slug>` in each of en, zh, vi) plus `/client-agreement`, `/privacy`, `/zh/client-agreement`, `/zh/privacy`, `/vi/client-agreement`, `/vi/privacy`, `/tax-form`, `/zh/tax-form`, `/vi/tax-form`, `/questions`, `/zh/questions`, `/vi/questions`, `/nonexistent-page`, `/this-page-does-not-exist`, `/nope`. WHT: `/`, `/tax-form`, `/blog` on localhost:3100.

Journeys run: J1 crawl (567 URLs, concurrency 6), J2 dropdowns hover/focus/Tab + link resolution (en/zh/vi), mobile details menu (en/zh/vi at 390), footer links, language switch 36 transitions + hreflang resolution, J3 pills/pager/counter/keyboard in en/zh/vi + no-JS, J4 price check in en/zh/vi on / and /pricing, J5 closed form en/zh/vi, J6 sticky bar on 8 pages at 390 + 768/1280 visibility, J7 back/forward/reload, J8 WHT spot check, anchor/TOC tests at 390/1280/1440, sticky aside test at 1280.

Viewports screenshotted: 360x740, 390x844, 768x1024, 1280x800, 1440x900 for home, pricing, tax-residency, medicare, blog, article en/zh/vi, contact, 404; 360/390/768 additionally for /zh, /vi, /vi/pricing, /vi/blog, /zh/blog; menu-open shots zh/vi at 360/390/768; price check vi at 360/390/768; dropdown shots at 1280/1440; header strips zh/vi at 1280/1440.

Partially reviewed: visual inspection was done on the tiled mobile shots for home (en, vi), blog (en), article zh, and on the desktop contact sheet (pricing, blog, contact, 404, home end, article vi, tax-residency, home zh, contact end); the remaining screenshots were checked only by the automated measurements (overflow, target size, font size, clipping), not by eye.

NOT VERIFIED: real device touch/scroll behaviour (headless Chromium only; iOS Safari `100svh`/safe-area and `<details>` behaviour not tested); the open-form variant of /tax-form (SVT_FORMS_ENABLED unset in this build); hreflang on the 519 article URLs beyond the 6 page types sampled (J1 shows the four alternates en-AU, zh-Hans, vi, x-default in the DOM on all 558 sitemap pages and none on the 5 noindex pages, but only the sampled ones were HEAD-checked); screen reader output; the `/sitemap.xml` and `robots.txt` content themselves (other agents).
