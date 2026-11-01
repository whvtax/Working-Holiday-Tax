# A13 Technical SEO + A14 AI search discoverability: Student Visa Tax

Baseline d9dbac0, production build on http://svt.localhost:3100 (fetched with `curl -H 'Host: svt.localhost:3100' http://127.0.0.1:3100/...`). No internet, so nothing was run through the live Rich Results Test or Schema Markup Validator; structured data was parsed and checked against the schema.org/Google documented shapes I know. Items that need the live validator are marked NOT VERIFIED.

Working files (crawler, parsed JSON, saved HTML of every page): `/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/seo/` (`crawl.py`, `pages.json`, `html/`, `sitemap.xml`, `robots.txt`, `llms.txt`).

## Summary

No CRITICAL finding. One HIGH (A14-1: on 507 of 558 indexable pages the only visible "registered" signal is the TPB seal with alt text "Tax Practitioners Board registered, Tax Agent Number 26233096" inside the Student Visa Tax brand column, with no supervision sentence on the page; an AI or a reader can take that as "Student Visa Tax is a registered tax agent"). One HIGH already known to the team (placeholder WhatsApp number 614123123123 in 560 links on every page). Everything else is MEDIUM or below. The technical SEO baseline is unusually clean: 558/558 sitemap URLs return 200, every canonical is self-referencing and matches the sitemap, hreflang (en-AU / zh-Hans / vi / x-default) is complete and reciprocal on all 558 pages, one h1 per page, no duplicate titles or descriptions, no heading-level skips, every image has alt text, every JSON-LD block parses, no LocalBusiness / rating / review markup, prices 220/385 everywhere, no cross-brand mention in either direction.

Severity order: A14-1 (HIGH), A13-1 (HIGH, known placeholder), A14-2 (MEDIUM), A13-2 (MEDIUM), A13-3 (LOW), A13-4 (LOW), A13-5 (LOW), A13-6 (LOW), A13-7 (LOW), A14-3 (LOW), A14-4 (LOW), INFO items.

---

## Section A13: Technical SEO (Google Search Central rules)

### Reviewed with no finding

- **robots.txt** (`/robots.txt`, 200, text/plain): `User-agent: * / Allow: / / Disallow: /api/ / Sitemap: https://studentvisatax.com.au/sitemap.xml`. Correct syntax, absolute sitemap URL on the production host, no mention of the other brand. No per-bot AI crawler blocks, so every AI crawler is allowed by the `*` group (WHT lists ~27 bots explicitly, all Allow, so the effective policy is the same). `/tax-form` and the legal pages are not disallowed, which is right because they rely on `noindex` and a disallow would hide that tag from Googlebot.
- **sitemap.xml** (200, application/xml): well-formed `urlset`, 558 `<loc>` entries, `lastmod` in W3C `YYYY-MM-DD` form (456 × 2026-10-27, 102 × 2026-10-26), all absolute https URLs on the production host, no trailing slashes, no noindex URL listed (tax-form, tax-form/residency, privacy, client-agreement are absent), no 3xx URL listed. Every listed URL returned 200 on the SVT host. 186 en + 186 zh + 186 vi, symmetric.
- **Canonical**: 558/558 have exactly one `<link rel="canonical">`, absolute, self-referencing, equal to the sitemap `<loc>` and to `og:url`.
- **hreflang**: 558/558 carry `en-AU`, `zh-Hans`, `vi` and `x-default` (= en-AU); every set is identical across the three language versions (reciprocal), every target is a 200 page in the sitemap, and no page exists in one language without the other two. Legal pages (English only, noindex) carry no hreflang and are not referenced by hreflang.
- **html lang**: en-AU / zh-CN / vi on the right trees (186 each).
- **h1**: exactly one on every page (558/558). Heading hierarchy: no level skips on any page.
- **Title / description**: present on 558/558, zero duplicates of either across the site. Titles are unique per language.
- **OG / Twitter**: full set on every page (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale` en_AU/zh_CN/vi_VN, `og:image` 1200×630 per language `/svt-assets/og/og-{en,zh,vi}.png`, all 200; `twitter:card summary_large_image` + title/description/image).
- **Noindex scope**: `/tax-form` and `/tax-form/residency` → `noindex, nofollow`; `/privacy` and `/client-agreement` → `noindex, follow`; the global 404 → `noindex`. No other page carries a robots meta. `/zh/privacy`, `/vi/client-agreement` do not exist (404); zh/vi footers link to the English legal pages with a bracketed translation, which is deliberate (`Footer.tsx` comment "Legal pages are English only").
- **404**: `/no-such-page`, `/blog/no-such-article`, `/zh/no-such`, `/svt-site/...`, `/de`, `/ja` all return HTTP 404 with a branded "Page not found" page (`lang="en"`, noindex, links only to `/` and WhatsApp, no WHT mention).
- **Redirects**: `/questions`, `/zh/questions`, `/vi/questions` → 308 to `/contact` (per locale) (`next.config.js:259`). Trailing-slash variants (`/pricing/`, `/blog/`, `/zh/`, `/vi/`, `/sitemap.xml/`) → 308 to the slashless URL. No internal link on any page uses a trailing slash or points to `/questions`.
- **Internal links**: 560 unique internal targets across the site; all resolve to 200 pages (558 sitemap URLs + the two English legal pages). No orphans: every sitemap URL has at least one inbound internal link. External links go only to ato.gov.au, fairwork.gov.au, servicesaustralia.gov.au, privatehealth.gov.au and wa.me.
- **Blog hubs** (`/blog`, `/zh/blog`, `/vi/blog`): all 173 article links per language are present in the server HTML (verified with curl, no JS). See A13-6 for the `hidden` attribute detail.
- **Images**: 654 `<img>` elements, 654 have a non-empty `alt`. Content images (`/svt-assets/img/IMG-*.webp`) all 200.
- **Structured data**: 555 `<script type="application/ld+json">` blocks (one array per page; 3 pages have none, see A13-4), all valid JSON, all `@context: https://schema.org`. Types found: Organization 555 (every one `@id https://studentvisatax.com.au/#business`, single identity), WebSite 552, Article 540, BreadcrumbList 549, FAQPage 480, WebPage 6, AboutPage 3, ContactPage 3, plus nested Offer/Service/PriceSpecification (prices only "220" and "385", AUD, `valueAddedTaxIncluded: true`), Country, ListItem, Question/Answer. No LocalBusiness, AggregateRating, Review or Rating anywhere. No `telephone` property (so the placeholder number is not in the markup). Article: `headline`, `description`, `datePublished`, `dateModified`, `image`, `author` (Organization), `publisher`, `mainEntityOfPage`, `inLanguage`, `citation` present; `dateModified` equals the sitemap `lastmod` and the visible "Updated" date on all pages. BreadcrumbList: last item equals the page URL on all 549; the trail is visible on the page (`<p class="…crumb">Home / Price`). FAQPage: every Question `name` and every Answer `text` is present verbatim in the visible page text (480/480 pages, 1452 Q/A pairs). No dashes (em/en/horizontal/Chinese double) in any JSON-LD string or visible text.
- **Cross-brand separation**: SVT robots.txt / sitemap.xml / llms.txt / all 558 pages: zero occurrences of "Working Holiday Tax" or workingholidaytax (the only "working holiday visa" strings are tax facts about DASP/417-462 rates, not the brand). WHT host (`localhost:3100`): robots.txt (27 bot groups, `Host:` and two `Sitemap:` lines, workingholidaytax.com.au only), sitemap.xml (506 URLs) and llms.txt contain zero occurrences of studentvisatax / Student Visa Tax. WHT host returns 404 for `/zh/pricing` and `/svt-site/pricing`; SVT host returns 404 for `/de`, `/ja`, `/de/preise`.
- **Wording scans** (visible text, 558 pages): no "we are a registered tax agent" or variant in en/zh/vi; no AI/bot/chatbot/LLM mention; no "guaranteed/maximum/biggest refund"; no em/en dash.

### A13-1 (HIGH, already known to the team): placeholder WhatsApp number on every indexable page

- Files: `src/lib/svt/brand-public.ts:17-20` (`phone: '04123123123'`, `whatsappNumber: '614123123123'`, `whatsappIsPlaceholder: true`, comment "PLACEHOLDER until the new WhatsApp number exists (DEPLOYMENT_CHECKLIST.md)").
- Evidence: 560 distinct `https://wa.me/614123123123?text=...` hrefs across the 558 pages (every page, hero, sticky button, CTA, footer, 404 page).
- Impact: if the sitemap is submitted or the site is crawled before the number is swapped, Google and AI crawlers index a dead contact channel; AI answers will quote it. Not an SEO defect in the code, but it is the single most visible wrong fact on the site today.
- Smallest fix: set the real number and `whatsappIsPlaceholder: false` before DNS cut-over, as the deployment checklist already says. Make it a hard gate (fail the build or the e2e suite when `whatsappIsPlaceholder` is true in production).
- Verify: `curl -s -H 'Host: svt...' /pricing | grep -c 614123123123` → 0.
- Leaving unchanged acceptable? No for launch; yes for this build.

### A13-2 (MEDIUM): `/zh/contact` ContactPage `inLanguage` is `zh-CN` while every other zh block, the hreflang and the WebSite block use `zh-Hans`

- Evidence: `/zh/contact` JSON-LD `{"@type":"ContactPage","@id":"https://studentvisatax.com.au/zh/contact#webpage","inLanguage":"zh-CN"}`; `/zh/pricing` WebPage `inLanguage: "zh-Hans"`; all 180 zh Article blocks `zh-Hans`; hreflang `zh-Hans`.
- File: `src/components/svt/pages/ContactPage.tsx:119` (`inLanguage: { en: 'en-AU', zh: 'zh-CN', vi: 'vi' }[locale]`), a local map instead of `LOCALE_META[locale].hreflang` (`src/lib/svt/i18n.ts:18`, `zh-Hans`).
- Impact: harmless for ranking, but it is the one place the site tells machines two different language codes for the same content. Low cost to fix, so MEDIUM only because it is an inconsistency in the entity graph AI systems read.
- Fix: replace the inline map with `LOCALE_META[locale].hreflang`.
- Verify: fetch `/zh/contact`, parse JSON-LD, `inLanguage == "zh-Hans"`.
- Leaving unchanged acceptable? Yes, but it is a one-line change.

### A13-3 (LOW): Article `headline` differs from the visible h1 on 89 of 540 Article pages

- Evidence: `/tax-residency` headline "Are international students tax residents?" vs h1 "Are you a tax resident?"; `/medicare` "Medicare levy exemption for international students" vs "The Medicare levy and your student health cover"; `/blog/low-income-tax-offset-students` "Low income tax offset for international students" vs "Up to $700 off your tax: the low income tax offset"; same pattern on the zh/vi twins. The other 451 Article pages match. The 89 are the 10 guides + the first ~20 articles (batch-00) in each language, i.e. the pages whose h1 was rewritten in the 27 Oct polish while `headline` kept following `<title>`.
- Impact: Google says `headline` should be the article's title; a mismatch between markup and on-page heading is a soft "markup must reflect visible content" issue. No rich-result eligibility loss expected, but the Rich Results Test will not flag it either (NOT VERIFIED there).
- Fix: in `src/lib/svt/jsonld.ts` set `headline` to the h1 text (or keep `headline` = title and add `alternativeHeadline` = h1). Either way the page title stays as is.
- Verify: re-run the crawler check (`headline` normalised == h1 normalised) → 0 mismatches.
- Leaving unchanged acceptable? Yes.

### A13-4 (LOW): structured-data coverage is uneven on hub and contact pages

- Evidence: `/blog`, `/zh/blog`, `/vi/blog` have **no** JSON-LD at all (no Organization, WebSite, BreadcrumbList, CollectionPage). `/contact`, `/zh/contact`, `/vi/contact` have Organization + ContactPage but no WebSite and no BreadcrumbList (every other inner page has both). Home has Organization + WebSite + FAQPage but no WebPage.
- Impact: minor; the Organization entity is still declared on 555 pages. Mostly a consistency issue for crawlers building the site graph.
- Fix: render `svtOrganization() + svtWebsite() + breadcrumbList()` (and `CollectionPage` for the hubs) through the same helper the guides use.
- Verify: every sitemap URL has ≥ 1 JSON-LD block with Organization `#business`.
- Leaving unchanged acceptable? Yes.

### A13-5 (LOW): titles and descriptions over the usual display length

- Evidence: 82 titles > 60 characters (max 70, e.g. `/vi/blog/understating-income-ato-penalty-students` "Khai thiếu thu nhập trong hồ sơ thuế? Mức phạt của ATO cho du học sinh"; `/blog/tools-under-300-deduction-international-students` 68 chars). 205 descriptions > 160 characters (85 en, 120 vi; 38 are > 175; max 207 at `/vi/blog/low-income-tax-offset-examples-international-students`). Chinese pages are short by character count and fine. The brand suffix " | Student Visa Tax" is only added when the title is ≤ 40 chars (`src/lib/svt/page-meta.ts:8-17`), so 167 pages carry it and 391 do not; this is deliberate and documented in the file.
- Impact: Google rewrites or truncates; no ranking effect. The long descriptions lose their last clause in snippets.
- Fix: optional trim of the 38 descriptions over 175 chars; leave the rest.
- Leaving unchanged acceptable? Yes.

### A13-6 (LOW): blog hub hides 161 of 173 article links with the `hidden` attribute, no URL-addressable pagination

- Files: `src/components/svt/pages/BlogBrowser.tsx:28,46,68` (`PER_PAGE = 12`, `<li hidden={!visible.has(a.slug)}>`), pager is `useState`, no `?page=` URLs.
- Evidence: `/blog` server HTML contains 185 `/blog/...` anchors; 161 sit inside `<li hidden>`; 162 elements carry `hidden`. Same on zh/vi.
- Impact: Googlebot does parse links inside hidden elements, and every article is also linked from guides, "Related" blocks and the sitemap, so nothing is undiscoverable (orphan check: 0). Content in hidden elements may be weighted lower, and a no-JS visitor or a text-only AI fetcher sees only 12 cards with a non-functional "Next" button. Not a defect under Google's rules, listed for completeness.
- Fix (if wanted): keep the client pager but render the pager as real links (`/blog?page=2`) or a `<noscript>` note, or drop `hidden` and let CSS paginate.
- Leaving unchanged acceptable? Yes.

### A13-7 (LOW): thin pages: `/about` (238 words) and `/blog/cash-in-hand-and-tips` (233 words in the article body)

- Evidence (words in `<main>` after removing nav/aside): `/about` 238; `/blog/cash-in-hand-and-tips` 233 (full main 262); next shortest `/blog/underpaid-student-visa` 264, `/blog/tax-payment-plan` 276, `/blog/unpaid-trial-shifts` 277; all other English pages ≥ 284 words. zh pages: shortest `/zh/blog/cash-in-hand-and-tips` 551 characters, `/zh/about` 625; vi shortest `/vi/about` 313 words. Near-duplicate check: 18 slug-similar pairs (e.g. `what-is-an-abn-students` vs `what-is-an-abn-international-students`, `cash-in-hand-and-tips` vs `cash-in-hand-tax-return-international-students`) have body similarity ≤ 0.27, so they are distinct articles, not duplicates. Title-token overlap ≥ 0.5 only on 7 pairs that are clearly different topics.
- Impact: two pages are slightly under the ~250-word bar the brief sets; neither is duplicate content. `/about` being short matters more for A14 (it is the entity page AI systems read first).
- Fix: add one paragraph to `/about` naming the supervising agent, TPB number, the three languages and the review/sign-off step (it already has the first two); one or two more paragraphs on the cash-in-hand article or merge it into `/blog/cash-in-hand-tax-return-international-students`.
- Leaving unchanged acceptable? Yes.

### A13 INFO

- FAQPage markup is on 477 articles + home + the two other language homes. Since Aug 2023 Google shows FAQ rich results only for authoritative government/health sites, so no rich result will appear; the markup is harmless and the Q/A are all visible, so no action.
- Article `image` on every article is the per-language OG image (`og-en.png` etc.), not a per-article image. Valid; Google prefers representative images but does not require them.
- Organization `logo` is `/svt-assets/favicon.svg` (200, image/svg+xml). SVG is an accepted logo format; the Rich Results Test would confirm size handling (NOT VERIFIED).
- `/favicon.ico` returns 404; the page declares `<link rel="icon" href="/svt-assets/favicon.svg" type="image/svg+xml">`, which Google accepts. Some crawlers still request `/favicon.ico` blindly; optional to add.
- The visible breadcrumb is a `<p>` not a `<nav aria-label="Breadcrumb"><ol>`; accessibility detail only, not an SEO issue (BreadcrumbList is correct).
- Sitemap `changefreq`/`priority` are present; Google ignores both. `lastmod` is all 26/27 Oct 2026 (launch), consistent with the visible "Updated" dates and JSON-LD `dateModified` (0 mismatches).
- robots.txt has no explicit `Disallow: /tax-form`; the page is `noindex, nofollow`, which is the right mechanism. If the form ever opens and should stay out of the index, keep it noindex rather than disallow.

---

## Section A14: AI search / generative engine discoverability

### Reviewed with no finding

- **Business identity**: name "Student Visa Tax", domain, email `info@studentvisatax.com.au`, service "tax returns for 500 and 485 visa holders", fees $220 / $385 incl. GST, languages en/zh/vi, guarantee wording, supervising agent "The Accounting Academy Services Pty Limited, Tax Agent Number 26233096" are identical in `llms.txt`, the Organization JSON-LD on 555 pages, the home hero, `/pricing` "In short", `/about`, `/contact` FAQ and the legal pages. 3-digit dollar amounts near fee/price words are only 220/385 (other amounts in text are refund examples, $300 deduction rule, OSHC limits). No page promises a refund amount; residency language is "may be" / "usually" on `/tax-residency`, home FAQ and llms.txt.
- **Answer-first structure**: `/pricing`, `/tax-residency`, `/medicare`, `/abn-delivery` (and all guides/articles) open with an "In short" block of 1-3 sentences directly after the lead, followed by two key figures with an ATO source link, then the body. Home opens with visa scope, fee, GST and the sign-off sentence in the first 40 words. This is the right shape for extraction.
- **FAQ quality and markup**: FAQPage only where the FAQ is visible (480/480 verified; questions and answers match visible text verbatim). Answers are 1-3 sentences, hedged correctly.
- **Freshness**: 543 pages show a visible `<time datetime="2026-10-26|27">Updated …</time>` that equals JSON-LD `dateModified` and sitemap `lastmod`; the 15 without (home, pricing, how-it-works, about, contact per language) carry `dateModified` in JSON-LD where a WebPage/AboutPage block exists.
- **Author / expertise**: Article `author` and `publisher` are the Organization `#business`; `/about` and `/contact` name the supervising registered tax agent and TPB number; every guide and most articles carry "Source: ATO …" links (`citation` array in JSON-LD). No fake person authors, no credentials claimed that are not held.
- **llms.txt** (200, text/plain, 581 lines, 333 KB): identity block, key facts for 2025-26 (financial year dates, lodging deadline, 6-month residency rule with "may be", $18,200 threshold, 2% Medicare levy + MES, 12% super + DASP, $26.44 minimum wage), then one line per page with URL, one-sentence summary and "Updated" date, in three sections (Guides 10 + Articles 173 in English; 中文 183; Tiếng Việt 183 = 549 links, all in the sitemap). The deadline fact is correct: 31 October 2026 is a Saturday (checked with `datetime`), so the self-lodger date rolls to Monday 2 November 2026, and the agent-list date is stated as 31 October 2026. No dashes, no AI/bot words, no WHT mention. Only the home, `/blog` and `/contact` per language are not listed (9 URLs), which is fine for a links file.
- **Crawlability with JS off**: all article, guide, nav and footer links are in the server HTML (see A13-6 for the hidden-attribute note). No content depends on client fetches.
- **Text aimed at AI rather than people**: none found. Scanned visible text and llms.txt for "for AI", "AI assistants", "language models", "cite this page", "machine-readable", "key facts for" (only in llms.txt where it belongs). The "In short" blocks read as copy for students.
- **Cross-brand**: no SVT page or file names or links WHT; no WHT page or file names SVT (counts above).

### A14-1 (HIGH): on 507 of 558 indexable pages the only visible "registered" signal is the TPB seal alt text inside the Student Visa Tax brand column, with no supervision sentence on the page

- Files: `src/components/svt/Footer.tsx:26-33` (brand column: brand name, tagline, intro, "Ask us anything", then `<img src="/svt-assets/img/tpb-registered.png" alt={fill(t.sealAlt, …)}>`); `src/lib/svt/i18n.ts:82,130,178` (`sealAlt: 'Tax Practitioners Board registered, Tax Agent Number {tpb}'` / `'Tax Practitioners Board 注册标志，编号 {tpb}'` / `'Đã đăng ký với Tax Practitioners Board, mã số {tpb}'`). The footer `supervision` string still exists at `i18n.ts:76,123,171` but is no longer rendered: commit 02bca12 ("WHT-style footer with TPB seal") removed `<p className={styles.legal}>{fill(t.supervision, …)}</p>` from the footer, and `TrustStrip.tsx:4` notes "the supervision sentence moved out".
- Evidence (rendered HTML, scripts stripped): the sentence "operates under the supervision of a registered tax agent" (or its zh/vi rendering) is visible on only 5 en pages (`/about`, `/contact`, `/blog/lodge-from-overseas`, `/blog/what-is-a-tax-agent-international-students`, `/blog/diy-tax-return-vs-tax-agent-international-students`), 1 zh page and 5 vi pages. "Reviewed and signed off by a registered tax agent before it is lodged with the ATO" is visible on 10 en, 10 zh, 31 vi pages. 507 pages (all guides except about/contact, the hubs, ~165 articles per language) show neither. On every one of those pages the footer reads, in DOM order: "Student Visa Tax / Student tax, sorted. / Tax returns for student and graduate visas … / Ask us anything / [img alt: Tax Practitioners Board registered, Tax Agent Number 26233096]". The sentence lives only inside the Organization JSON-LD `description` ("Operates under the supervision of a registered tax agent.") on those pages.
- Impact: a text-only fetcher (which is what AI answer engines and screen readers use) sees the brand name immediately followed by "Tax Practitioners Board registered, Tax Agent Number 26233096" and nothing saying whose registration it is. That is the implied claim the hard rule forbids ("never 'we are a registered tax agent'"), and it is the most likely way an AI summary will describe the business ("Student Visa Tax is a TPB-registered tax agent, number 26233096"). The TPB's own guidance on using the registered symbol also expects the registered entity to be identified next to it. The JSON-LD description partly mitigates for Google, but most generative engines read page text, not JSON-LD.
- Smallest fix (one of): (a) change the three `sealAlt` strings to name the registrant, e.g. "Registered tax agent symbol of The Accounting Academy Services Pty Limited, Tax Agent Number 26233096, which supervises Student Visa Tax" (zh/vi equivalents), or (b) render the already-translated `t.footer.supervision` line under the seal again (one `<p>` in `Footer.tsx`). (b) also restores the sentence to every page, which the brief lists as the fixed wording. Jo removed it on 27 Oct, so this needs Jo's decision; the alt-text change (a) does not change the visual design.
- Verify: for every sitemap URL, strip scripts and assert the visible text contains either the supervision sentence or an alt text that names the registrant; and assert the string "Tax Practitioners Board registered" is never adjacent to the brand name without it.
- Leaving unchanged acceptable? No. It does not literally say "we are a registered tax agent", but it is the strongest implied version of it, on 91% of pages, in the one place every page shares.

### A14-2 (MEDIUM): the 2025-26 lodging date is stated two ways

- Evidence: `llms.txt` line 15 and `/blog/tax-return-deadline-31-october` (h1 "The tax deadline is Monday 2 November", title "Tax return deadline 2026 for students: 2 November") and `/blog/australian-tax-year-international-students` ("31 October 2026 is a Saturday, so the ATO say…") give **Monday 2 November 2026** for self-lodgers. Four articles say the 2025-26 return "is due by 31 October 2026" with no mention of the Saturday rule: `/blog/short-job-do-students-need-to-lodge`, `/blog/lodging-tax-return-after-going-home-students`, `/blog/late-tax-return-penalty-dollars-students`, `/blog/tax-deadline-final-week-checklist-students`, and their zh/vi twins ("2026 年 10 月 31 日之前提交", "trước ngày 31 tháng 10 năm 2026"). Source: `src/lib/svt/content/long/en/batch-01.ts:940,1012` and `batch-09.ts` (the "outstanding prior-year return" passages).
- Impact: both statements are defensible (31 Oct is the statutory date, 2 Nov the accepted lodgment day), but an AI asked "when is the deadline" will find the site contradicting itself across 12 pages and may pick either. The generic "usual deadline is 31 October" sentences elsewhere are fine.
- Fix: in those four passages write "due by 31 October 2026 (a Saturday, so the ATO accepts lodgment on Monday 2 November 2026)" in all three languages, or link to the deadline article.
- Verify: grep rendered text for "31 October 2026" and confirm each hit also mentions 2 November.
- Leaving unchanged acceptable? Marginal; it is a 12-page consistency fix on the single most asked fact.

### A14-3 (LOW): `/about` is the shortest page on the site (238 words)

- Evidence: see A13-7. It does carry the supervising agent, TPB number and sign-off sentence (`guides-en.ts:541`), AboutPage JSON-LD and breadcrumb.
- Impact: entity pages are what AI systems read to describe a business; this one has the right facts but little else (no "who answers WhatsApp", no response hours beyond the contact page, no explicit "not a registered tax agent ourselves" line).
- Fix: one or two more paragraphs; include the languages, the review/sign-off step and the guarantee wording once.
- Leaving unchanged acceptable? Yes.

### A14-4 (LOW): title suffix inconsistency affects how AI engines label results

- Evidence: 167 pages carry " | Student Visa Tax" in `<title>`, 391 do not (rule in `page-meta.ts`: suffix only when title ≤ 40 chars, ≤ 20 for zh). `og:site_name` is always "Student Visa Tax" and `og:title` never has the suffix.
- Impact: engines that build citations from `<title>` will show the brand on some results and not others. Deliberate, documented, so LOW.
- Leaving unchanged acceptable? Yes.

### A14 INFO

- No LocalBusiness, address, opening hours or telephone in markup; the business is correctly modelled as an online Organization serving Australia. If a Google Business Profile exists (`googleReviewUrl` in `brand-public.ts`) make sure its name/category do not describe SVT as a "tax agent" (NOT VERIFIED: no internet).
- `knowsLanguage: ["en","zh-Hans","vi"]` and `inLanguage` on WebSite match the three trees.
- The home-page FAQ "Am I a tax resident on a student visa?" answers "may be a resident"; `/tax-residency` "In short" uses "may be"; llms.txt uses "may be". Consistent hedging.
- Could the site be misread as a tax agent itself? Apart from A14-1, no: the only "registered tax agent" strings in body text are the two fixed sentences, ATO facts about agents, and "Your registered tax agent. If someone lodged your return before…" in `/blog/find-lost-tfn-international-students` (refers to the reader's previous agent, acceptable).

---

## Coverage

- URLs fetched on the SVT host: 558 sitemap URLs (all 200, HTML saved and parsed) + 36 probe URLs (`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/tax-form`, `/tax-form/residency`, `/privacy`, `/client-agreement`, `/zh/privacy`, `/vi/client-agreement`, `/questions`, `/questions/foo`, `/zh/questions`, `/vi/questions/bar`, `/questions/`, 6 non-existent paths, 5 trailing-slash variants, `/index.html`, `/residency`, `/svt-site`, `/svt-site/pricing`, `/de`, `/ja`, `/de/preise`, `/api/health`, `/llms-full.txt`, `/sitemap-0.xml`, `/favicon.ico`, `/opengraph-image`, 3 OG images, favicon.svg, tpb-registered.png, IMG-13.webp).
- URLs fetched on the WHT host: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/`, `/pricing`, `/zh/pricing`, `/svt-site/pricing`.
- JSON-LD blocks parsed: 555 script blocks (each a JSON array) containing 2,688 top-level objects; all valid JSON. 1,452 FAQ Q/A pairs checked against visible text; 549 BreadcrumbLists; 540 Articles.
- Checks run on all 558 pages: status, content-type, html lang, title, description, robots meta, canonical, hreflang (completeness, reciprocity, target existence), h1 count, heading hierarchy, OG/Twitter set and per-language image/locale, all `<a href>` targets (560 internal, 200-checked; external allow-list), `<img alt>`, `<time>` vs lastmod vs dateModified, visible wording scans (agent claim, AI words, dashes, refund promises, supervision sentence), word/character counts, near-duplicate similarity on 18 slug-similar article pairs and title-token overlap on all 14,878 English article pairs, WHT mention.
- Source files read in full: `src/lib/svt/brand-public.ts`, `src/lib/svt/page-meta.ts`, `src/components/svt/Footer.tsx`, `src/components/svt/TrustStrip.tsx`. Read in part: `src/lib/svt/i18n.ts` (lines 48-90 and grep hits), `src/components/svt/pages/BlogBrowser.tsx` (grep), `src/components/svt/GuidePage.tsx` (grep), `next.config.js` (lines 250-268), `src/lib/svt/content/guides-en.ts` and `content/long/en/batch-01.ts`, `batch-09.ts` (grep hits only), git log of `Footer.tsx`.
- Read in part: `src/components/svt/pages/ContactPage.tsx` (line 119 and FAQ at line 45). Not reviewed: `src/lib/svt/jsonld.ts` and `src/lib/svt/pages.ts` source (behaviour verified from rendered output only); WHT page HTML beyond the 4 URLs above; the tax form pages' content (noindex, out of scope); Playwright/browser rendering (all checks are on server HTML, which is what matters for crawlers).
- NOT VERIFIED (no internet): Rich Results Test / Schema Markup Validator results, Google Search Console, the Google Business Profile wording, whether `favicon.svg` is accepted as the Organization logo by Google's logo pipeline, live robots.txt behaviour on the production host.
