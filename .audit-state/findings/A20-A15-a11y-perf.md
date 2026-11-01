# A20 Accessibility (WCAG 2.2 AA) + A15 Performance (Core Web Vitals): Student Visa Tax

Baseline d9dbac0, production build on http://svt.localhost:3100. All measurements by Playwright
(Chromium) scripts in `/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/audit-a11y-perf/`
(`a11y.js`, `a11y2.js`, `perf.js`; raw output `a11y-report.json`, `perf-report.json`; screenshots `*.png`).
GA requests were stubbed. Read-only: no file in the repo was changed.

Pages checked in en, zh, vi: `/`, `/pricing`, `/tax-residency`, `/medicare`, `/blog`,
`/blog/deductions-by-job-international-students` (long article), `/contact`, `/tax-form` (closed notice),
`/nope-404`. Desktop 1280x800 and mobile 390x844 (DPR 3).

---

## A20: Accessibility

### Summary

The SVT shell is in good shape: one `main`/`header`/`footer` per page, no skipped heading levels on any of
the 27 page/locale combinations, every Tab stop has the visible 3px white + 2px ink focus ring
(`--svt-focus`), skip link works, mobile `<details>` menu is keyboard operable, blog pills are real
`<button aria-pressed>` and hidden cards use the `hidden` attribute, `<details name>` FAQ works, the
language switch has `aria-current="page"` plus `lang`/`hreflang`, every `<img>` has meaningful
translated alt text, decorative SVGs are `aria-hidden`, reduced-motion kills every transition, no
horizontal scroll at 200%/400% zoom, text-spacing override clips nothing, and all measured text contrast
is far above 4.5:1. Three real defects found (one MEDIUM, two LOW) plus a few INFO notes.

### Findings

#### A20-1 MEDIUM: In-page jump targets land under the sticky header (TOC and section anchors)

- Files: `src/components/svt/GuidePage.module.css:23` (`.section { scroll-margin-top: 24px }`),
  `src/components/svt/ShortAnswer.module.css:14` (`.label { scroll-margin-top: 24px }`),
  `src/components/svt/Header.module.css:1-9` (header `position: sticky; top: 0`, measured height 73px at 1280).
- Evidence: on `/blog/deductions-by-job-international-students` (1280x800), Tab to the first
  "On this page" link (`#short-answer`), Enter. Result from `a11y2.js`:
  `{ hash: '#short-answer', top: 24, headerBottom: 73, covered: true }`. Screenshot
  `/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/audit-a11y-perf/toc-jump.png`
  shows the "In short" label and the first line of the answer hidden behind the header. The same 24px
  margin applies to every `section[id]` on guide and article pages, so every TOC jump hides ~49px of the
  target. The blog hub already does this right (`BlogHub.module.css:23-24` uses 72px/88px).
- Impact: keyboard and screen-magnifier users (and anyone) following the TOC lose the heading they jumped
  to; on mobile the header is also sticky. WCAG 2.4.11 Focus Not Obscured applies when the target later
  receives focus (e.g. "Back to top"/sequential focus start); at minimum it is a usability defect on
  every article (173 x 3 locales).
- Smallest fix: `scroll-margin-top: 88px` on `.section` and `.label` (or `html { scroll-padding-top: 88px }`
  in `svt.css`, which fixes every anchor at once, including `#main`).
- Verify: re-run `a11y2.js` TOC step; `top` must be >= `headerBottom`.
- Leave unchanged? No; it is a one-line CSS change and affects every long article.

#### A20-2 LOW: Header dropdowns cannot be dismissed with Escape and the button does nothing on activation

- File: `src/components/svt/Header.tsx:42-53` (buttons `aria-haspopup="true"`, no `aria-expanded`, no
  handler), `src/components/svt/Header.module.css:55` (`.drop:hover .dropPanel, .drop:focus-within .dropPanel { display: flex }`).
- Evidence (`a11y2.js`, `/blog` at 1280): focus on "Guides" button -> panel `display: flex` (good: the
  focus-within pattern works with Tab); Escape -> still `flex`; Enter on the button -> nothing (URL
  unchanged, panel unchanged); Shift+Tab out -> `none` (blur closes it). Screenshot
  `drop-_en_.png`. Same on zh and vi.
- Impact: WCAG 1.4.13 Content on Hover or Focus requires the focus-triggered panel to be dismissable
  without moving focus (Escape); a keyboard user must Tab through all 9-12 links to get past it.
  `aria-haspopup="true"` announces a "menu" to screen readers, which implies arrow-key navigation and an
  expanded/collapsed state that is never exposed, so VoiceOver/NVDA users hear "Guides, menu button,
  collapsed" and pressing Enter does nothing.
- Smallest fix: drop `aria-haspopup` (the links are plain links, not a menu) and add a tiny client
  behaviour: `onKeyDown` Escape -> `document.activeElement.blur()` on the `.drop` wrapper, and toggle
  `aria-expanded` on click/focus. Alternative with zero JS: make the trigger a link to the hub page
  (`/blog` for Deductions) so Enter has an effect, and keep the hover/focus-within panel.
- Verify: focus the button, press Escape, the panel must hide; screen reader must not announce "menu".
- Leave unchanged? Acceptable for launch (panel is reachable and closes on blur), fix in the first pass after.

#### A20-3 LOW: 404 page is English only, `lang="en"`, no site header/footer, on zh and vi paths

- File: `src/app/global-not-found.tsx:28-39`.
- Evidence: `GET /zh/nope-404` and `/vi/nope-404` return `<html lang="en">`, title "Page not found", body
  copy "The page you're looking for doesn't exist...", links "Back to home" (to `/`, not `/zh`) and
  "Contact us" (`target="_blank"` without an "opens in new window" hint). No `header`, `nav` or `footer`
  landmark (`a11y-report.json`: `hdr 0 ftr 0`, 2 Tab stops). Focus indicator is the browser default
  outline (present).
- Impact: a Chinese or Vietnamese student who mistypes a URL gets an English page with no way back to
  their language. `lang="en"` is technically correct for the text shown, so this is not a 3.1.1 failure,
  but WCAG 3.2.3 Consistent Navigation (header/nav missing on this page only) and localisation.
- Smallest fix: read the first path segment (`/zh/`, `/vi/`) in `GlobalNotFound` and use the three
  short strings from `UI[locale]`, pointing "Back to home" at `localePath(locale, '/')`; add
  `rel="noopener"` is already there, add visually-hidden "(opens in new window)" text to the WhatsApp link.
- Verify: `curl -H 'Host: svt.localhost' localhost:3100/zh/x | grep '<html lang'` -> `zh-CN`.
- Leave unchanged? Acceptable at launch; low traffic page. Note the comment in the file says the page is
  "same words on both brands (Jo, 27 Oct)", so wording changes need Jo's OK.

#### A20-4 INFO: `/tax-form` title is English on zh and vi

- Files: `src/app/(svt-zh)/svt-site/zh/tax-form/page.tsx:9`, `(svt-vi)/.../tax-form/page.tsx` (same
  pattern): `title: 'Tax form'`. The `<h1>` is translated ("你的报税表"). Not a WCAG failure (2.4.2 only
  requires a descriptive title); a localisation nit for the content agents. The page is `noindex`.

#### A20-5 INFO: targets under 24x24 are all inline-text exceptions

- Desktop header nav links are 23px tall (`Header.module.css:38`, no min-height) with 28px gaps; the
  breadcrumb "Home"/"Articles" links are 16-18px tall (`BlogHub.module.css:3`, 13px text); contact page
  mailto and "Read the client agreement" links are 20px tall inside sentences. All pass WCAG 2.5.8
  (Target Size Minimum) via the spacing/inline exceptions: nothing else lies within a 24px circle of
  their centres. Everything else measured is >= 36px (footer links 36px, pills 40px, pager/buttons/menu
  items 44-48px, `--svt-tap: 48px`). The 44px preferred size is met by all primary actions.
- Optional: `min-height: 24px` on `.nav a` would remove the dependency on the exception.

#### A20-6 INFO: hover-only dropdown on touch tablets NOT VERIFIED

- At >= 900px the dropdown opens only on `:hover`/`:focus-within`. On an iPad in landscape (1024px) with
  Safari, buttons do not receive focus on tap; Safari's synthetic first-tap hover usually shows the
  panel, but this was not tested (no iOS device/WebKit in this environment). The links are also in the
  footer and the hub, so nothing is unreachable.

### Reviewed with no finding (evidence in `a11y-report.json`)

| Check | Result |
|---|---|
| Landmarks | Exactly 1 `main`, 1 `header`, 1 `footer` on every page; visible `nav` labels unique per viewport (Main nav is rendered twice, desktop and mobile `<details>`, but only one is displayed at any width; the related-articles nav uses `aria-labelledby="related-title"`). |
| Heading order | No skipped levels on any of the 27 page/locale combinations; one `h1` each. |
| Skip link | First Tab stop on every page is "Skip to content" (`.svt-skip`), visible at `top: 8px` (screenshots `skip-*.png`); Enter sets `#main`, next Tab lands on the first link inside `main` (`after skip+Tab: A:Home inMain=true`). `main` is not focusable; Chromium/Firefox use the fragment as sequential focus start, so this is fine. |
| Focus indicators | 57-74 Tab stops per page; 0 stops with `:focus-visible` and no ring. Ring is `0 0 0 3px #fff, 0 0 0 5px #12161f` (18:1), footer dark bar uses ink+lime variant. Pills, pager buttons, FAQ summaries, language links, inputs all verified. |
| Mobile menu | `<details><summary>Menu</summary>`: opens with Enter, first item focused on next Tab with ring, closes with Space; native disclosure semantics (no ARIA needed). `menu-*.png`. |
| Blog pills / pager | 8 `<button aria-pressed>`; Enter toggles `aria-pressed` and the card set (12 visible / 161 `hidden`); pager "Next" updates `aria-live="polite"` "Page 2 of 15", focus stays on the button, page scrolls to `#articles`. Disabled state uses the `disabled` attribute (not focusable, exempt from contrast). |
| FAQ | `<details name="svt-...-faq">`: Enter on a summary opens it and closes the other; summary text is the question; `+`/`-` sign is `aria-hidden`. |
| Language switch | `nav[aria-label]` with `aria-current="page"` on the current language, `lang` + `hreflang` per link; absent on `/tax-form` (by design) and on the 404 (see A20-3). |
| Mixed language | English terms inside zh/vi copy (TFN, ABN, Medicare, DASP) are proper nouns, acceptable. Payslip row labels on zh/vi home are English and correctly marked `<span lang="en">`. Scan for unmarked ASCII-only visible text nodes on zh/vi pages found none. |
| Form labels | SVT form closed; home page PriceCheck/Payslip radios: all labelled, inside `<fieldset><legend>`. WHT `/tax-form` on localhost:3100 (shared `FormClient`/`Residency*`): all 9 visible fields labelled (`waNumber`, `auPhone`, given/last name, DOB, TFN, email, address, main job); no heading skips. Later steps NOT VERIFIED (would require submitting data). |
| Images | Every `<img>` has `alt` and it is translated per locale (e.g. zh "一名留学生系着咖啡店围裙，在柜台后上班"); TPB seal alt includes the agent number; logo SVG `aria-hidden` with the brand name as text. No decorative `<img>`. |
| Contrast (computed from `tokens.css`) | ink on white 18.1:1; ink-2 `#3c4350` on white 9.95, on pale lime 9.32, on mist 9.09; ink on lime highlight 15.7; lime on ink (docket `$70`) 15.7; white on ink buttons 18.1; footer: ink-2 on pale lime 9.32, mist-2 `#c9ced6` on ink 11.45, mist on ink 16.5. Pager disabled (ink at opacity .35 ~ 2.2:1) is a disabled control, exempt. Nothing below 4.5:1. |
| Zoom / reflow | 400% at 1280 (= 320px viewport) and 200% (640px): `scrollWidth == innerWidth` on all pages, no overflowing element. Text-spacing override (1.4.12): only the `.svt-visually-hidden` spans "clip", by design. `z400-*.png`. |
| Reduced motion | With `prefers-reduced-motion: reduce` no element has a transition or animation (`svt.css:57`). |
| Sticky WhatsApp bar | `aside[aria-label]`, hidden on the form page, `scroll-padding-bottom: 96px` keeps focused links clear of it on phones. |

---

## A15: Performance and Core Web Vitals

Method: Playwright Chromium, mobile 390x844 DPR 3, Android UA, cache disabled, CDP
`Emulation.setCPUThrottlingRate 4`, `Network.emulateNetworkConditions` latency 150 ms / 1.6 Mbps down /
750 kbps up (Lighthouse "Slow 4G"). LCP from `PerformanceObserver largest-contentful-paint` (final
candidate after load + scroll), CLS from `layout-shift` without recent input, bytes from CDP
`Network.loadingFinished.encodedDataLength` (gzip on the wire). Caveats: this is a local server over
loopback, so TTFB and the absolute LCP are not representative of production (a CDN with brotli and real
RTT will differ in both directions); numbers are cold-cache single runs, not medians. `npx lighthouse` is
not installed (`node_modules/.bin` has no lighthouse) and nothing may be installed, so Lighthouse was skipped.

### Results (mobile, slow 4G, 4x CPU)

| Page | TTFB ms | FCP ms | LCP ms | LCP element | CLS | Requests | Total KB (wire) | HTML KB wire / decoded | JS KB | CSS KB | Fonts KB (files) | Images KB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` en | 10 | 852 | **2788** | hero `IMG-01-mobile.webp` | 0 | 22 | 670 | 13.9 / 65 | 157 (8) | 9.4 (2) | 154 (8) | 336 (3) |
| `/pricing` en | 193 | 924 | 924 | `p.answer` text | 0.0001 | 18 | 339 | 11.3 / 51 | 148 (7) | 9.4 | 131 (7) | 39 |
| article en | 6 | 840 | 840 | `p.answer` text | 0 | 18 | 330 | 18.8 / 88 | 148 (7) | 9.4 | 154 (8) | 0 (seal not loaded in viewport) |
| `/blog` en (173 cards) | 9 | 876 | 876 | `p.intro` text | 0 | 18 | 355 | 41.2 / 225 | 151 (8) | 9.4 | 115 (6) | 39 |
| `/zh` | 11 | 1420 | **2648** | hero `IMG-01-mobile.webp` | 0.0001 | 21 | 655 | 15.5 / 68 | 157 (8) | 9.4 | 138 (7) | 336 (3) |
| `/zh/pricing` | 5 | 1472 | 1472 | `p.answer` text | 0 | 18 | 348 | 13.1 / 54 | 148 (7) | 9.4 | 138 (7) | 39 |
| zh article | 5 | 1116 | 1116 | `p.answer` text | 0 | 17 | 317 | 21.9 / 91 | 148 (7) | 9.4 | 138 (7) | 0 |
| `/zh/blog` | 7 | 840 | 840 | `p.intro` text | 0 | 18 | 362 | 48.1 / 230 | 151 (8) | 9.4 | 115 (6) | 39 |

Against the targets: CLS <= 0.1 passes everywhere (0 to 0.0001). LCP <= 2.5 s passes on 6 of 8 pages
by a wide margin (text LCP, 0.84-1.47 s); the home page in en and zh is marginally over (2.65-2.79 s)
because its LCP is the hero image. DOM nodes: 351 (home), 253 (pricing), 354 (article), 1619 (hub).
Third-party: only `www.googletagmanager.com` (gtag, preloaded by `next/script`), nothing else.
Largest JS chunk: `/_next/static/chunks/0d66q46efh1wk.js` 73 KB gzip (framework), then 45 KB; total
148-157 KB gzip over 7-8 chunks, identical on every page (no page-specific heavy client code; the hub's
`BlogBrowser` adds ~2.4 KB). Render-blocking CSS: 2 stylesheets, 9.4 KB total, no `media` attribute
(normal for Next; small enough that inlining would not pay). Compression: HTML, JS and CSS are gzip;
fonts/images are already compressed formats. Caching: `/_next/static/*` and `/svt-assets/fonts/*` are
`immutable` 1 year; HTML `s-maxage=31536000` (CDN); see A15-2 for images.

Fonts: self-hosted under `/svt-assets/fonts/5.3.0/` (woff2, latin + vietnamese subsets, `font-display:
swap`), two weights preloaded (`SvtDocument.tsx:17-19`). The home page loads 8 font files (Be Vietnam Pro
400/500/600/700 latin, vietnamese-400, IBM Plex Mono 400/500/600) = 154 KB; the vietnamese-400 subset
(12.8 KB) is fetched on every en and zh page because the language switch text "Tiếng Việt" matches its
`unicode-range`. The two `<link rel=preload>` font tags are emitted twice in the HTML (React hoists the
manual tags in `SvtDocument` head and they appear again later in `<head>`); browsers dedupe, no cost.

### Findings

#### A15-1 MEDIUM: Home page LCP 2.65-2.79 s on emulated slow 4G (target <= 2.5 s); hero image competes with 150 KB of fonts and 157 KB of JS

- Files: `src/components/svt/ImageSlot.tsx:27-34` (hero `<picture>`, slot defined in
  `src/lib/svt/images.ts:28`, used by `src/lib/svt/content/home-{en,zh,vi}.ts`) (rendered HTML:
  `<img src="/svt-assets/img/IMG-01-mobile.webp" width="1448" height="891" loading="eager" fetchPriority="high">`),
  `public/svt-assets/img/IMG-01-mobile.webp` (97,608 bytes, 1448x891), `src/components/svt/SvtDocument.tsx:17-19`.
- Evidence (`perf-report.json`): en home FCP 852 ms, LCP 2788 ms, LCP element the hero image (99 KB
  wire); zh home LCP 2648 ms. Bytes fetched before LCP on the 1.6 Mbps link: fonts 154 KB + JS 157 KB +
  image 99 KB + HTML/CSS 23 KB ~ 433 KB ~ 2.2 s of pure transfer. Rendered size on the 390px phone is
  390x240 CSS px (1170x720 device px at DPR 3), so 1448x891 is only slightly over-sized in pixels but
  heavy in bytes (97.6 KB for a 390x240 slot).
- Impact: the one page that carries the brand (and most paid/social traffic lands there) is the only one
  that misses the "good" LCP band on a slow connection. On real 4G with a CDN it will likely land near
  the threshold; it is not a failure on fast connections. Every other page has a text LCP under 1.5 s.
- Smallest fix (pick one or both): (a) add
  `<link rel="preload" as="image" href="/svt-assets/img/IMG-01-mobile.webp" media="(max-width: 1023px)">`
  (and the desktop one with `media="(min-width: 1024px)"`) in the home page head so the image request
  starts with the HTML instead of after CSS; (b) re-encode `IMG-01-mobile.webp` at ~1000 px wide,
  quality ~70 (expected ~45-55 KB). Optional: `fetchPriority` is already `high`, keep it.
- Verify: re-run `perf.js`; LCP for `/` and `/zh` must be < 2.5 s under the same emulation.
- Leave unchanged? Acceptable for launch (marginal, emulated), but cheap to fix and worth doing before
  any paid traffic.

#### A15-2 LOW: SVT images are served with `Cache-Control: public, max-age=0`

- File: `next.config.js:126-172` (`headers()`): rules exist for `/svt-assets/fonts/:path*` (immutable)
  and the WHT `/assets/:path*` (immutable), but none for `/svt-assets/img/:path*` or `/svt-assets/og/*`.
- Evidence: `curl -D - -H 'Host: svt.localhost' localhost:3100/svt-assets/img/IMG-01-mobile.webp` ->
  `Cache-Control: public, max-age=0`; same for `tpb-registered.png` (loaded on every page, 39 KB).
- Impact: every navigation re-validates each image (conditional request, 150 ms+ RTT each on slow 4G,
  full re-download if the CDN does not pass ETags through). The hero and strip images are 98-204 KB.
- Smallest fix: add
  `{ source: '/svt-assets/img/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] }`
  (not `immutable`, the file names are not versioned), and the same for `/svt-assets/og/:path*`.
- Verify: the curl above shows the new header.
- Leave unchanged? Yes if the production CDN overrides caching for `/svt-assets/`; NOT VERIFIED here.

#### A15-3 LOW: Two over-weight images for their rendered size

- `public/svt-assets/img/IMG-02-mobile.webp` 196,350 bytes, 1448x891, rendered 390x240 on phones (lazy,
  below the fold, so not LCP; still 197 KB on a slow link for a 390px-wide strip). Desktop variant
  `IMG-02-desktop.webp` 204 KB for a 1280x440 render is reasonable.
- `public/svt-assets/img/tpb-registered.png` 37,877 bytes, 509x319 PNG, rendered 104x65 (needs 312x196
  at DPR 3) in the footer of every page (lazy).
- Smallest fix: re-encode IMG-02-mobile at ~1000 px / q70 (~70 KB); export the TPB seal at 312 px wide
  as WebP or an optimised PNG (~8-12 KB). No code change.
- Leave unchanged? Yes, acceptable; cosmetic bytes, both lazy-loaded.

#### A15-4 INFO: Blog hub HTML with 173 cards is not a problem

- `/blog` en: 224,752 bytes decoded, 39.7 KB gzip on the wire (41.2 KB with headers); zh 229,940 / 46.7 KB;
  vi 255,452 decoded. 1,619 DOM nodes (161 `li[hidden]`). Measured: FCP 876 ms, LCP 876 ms (text), CLS 0,
  DCL 541 ms with 4x CPU throttle; hydration of `BlogBrowser` is cheap (one `useState` filter over 173
  entries). Lighthouse would flag "DOM size > 1,500 nodes" as a warning, but no measurable cost here.
  Server-rendered cards keep every article link crawlable, which the component comment says is the
  intent. Would only need revisiting past ~400 cards.

#### A15-5 INFO: notes with no action required

- JS is the same ~150 KB gzip on every page: the Next/React runtime, nothing page-specific is heavy.
  The pages are static (`s-maxage=31536000`), so TTFB in production is CDN-bound.
- `vietnamese-400` font subset (12.8 KB) is fetched on en/zh pages because of the "Tiếng Việt" link;
  acceptable (it is the right glyphs for that word). If ever wanted: `font-display: optional` on the
  Vietnamese subset or an inline SVG/wordmark is not worth it.
- Font preload tags are duplicated in the HTML (same two URLs twice); harmless, browsers dedupe.
- Only one third-party origin (`googletagmanager.com`), loaded after interaction by `next/script`, none
  on `/tax-form` (`untagged`).

---

## Coverage

Reviewed in full (browser, 3 locales, desktop + mobile): `/`, `/pricing`, `/tax-residency`, `/medicare`,
`/blog`, `/blog/deductions-by-job-international-students`, `/contact`, `/tax-form` (closed state),
`/nope-404`. Performance measured on `/`, `/pricing`, the article and `/blog` in en and zh.

Source files read in full: `src/components/svt/Header.tsx`, `Header.module.css`, `LanguageSwitch.tsx`,
`SvtDocument.tsx`, `Footer.tsx`, `Footer.module.css`, `Faq.tsx`, `Faq.module.css`,
`pages/BlogBrowser.tsx`, `pages/BlogHub.module.css`, `src/app/(svt)/svt.css`, `tokens.css`, `fonts.css`,
`layout.tsx`, `src/app/global-not-found.tsx`, `next.config.js` (headers section).
Partially: `GuidePage.tsx`/`.module.css`, `ShortAnswer.module.css`, `PriceCheck.tsx`, `Payslip.tsx`,
`StickyWhatsApp.tsx`, `Button.module.css`, `Type.module.css`, `Docket.module.css` (grep for colours,
scroll-margin, fieldsets only).

Not checked / NOT VERIFIED: other guide pages (`/how-it-works`, `/abn-delivery`, `/do-i-need-to-lodge`,
`/past-years`, `/leaving-australia`, `/superannuation`, `/about`), legal pages, the other 172 articles
(same `GuidePage`/article template, so A20-1 applies to all of them), the open SVT tax form (closed in
this build; WHT form first step checked instead, later steps not), real screen-reader output (no
NVDA/VoiceOver here; semantics checked via DOM/ARIA only), iOS Safari touch behaviour of the hover
dropdown, Lighthouse (not installed), production CDN caching and TTFB, vi performance (same bundle and
templates as en/zh; HTML is ~10% larger).
