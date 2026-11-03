# audit-seo: Gate 5, technical international SEO

Method: sitemap.xml (1007 URLs) parsed; first crawl of localhost:3200 fetched 340 pages with HTTP 200 (EN 167, DE 147, JA 26; 8 workers). The dev server then went down mid-crawl (connection refused for the remaining 671 URLs, incl. all FR/IT/ES and most JA), and was down again during a gentler re-crawl. I did not start or restart servers. All rendered-page statistics below are therefore for those 340 pages only (lab, dev server, not production).

## Findings

| ID | Page / component | Lang | Sev | Conf | Evidence | Fix | Test | Residual risk | Status |
|---|---|---|---|---|---|---|---|---|---|
| S1 | /de|/ja client-agreement, privacy | de, ja | Medium | High | og:url = language home (/de, /ja) and og:title inherited from layout, not canonical | Added page-level openGraph + twitter (url, title, locale, image) in 4 page files | __tests__/seo-legal-og.test.ts (4 pass) | Rendered re-check pending server | partially verified (source+test; render not re-fetched) |
| S2 | /client-agreement, /privacy | en | Low | High | og:locale and og:type missing; EN client-agreement meta description only 37 chars | Added type/locale/siteName; description lengthened (no new claims) | none (static) | none | partially verified |
| S3 | /blog, /de/blog, /ja/blog (BlogClient) | en,de,ja (+fr/it/es share BlogClient, unverified) | Medium | High | Heading order h1 then h3 (cards) with no h2 | Added visually hidden h2 above the card list using existing ui.allArticles / category label | tsc + full jest pass | Visual-only; hidden h2 text changes with the active filter | partially verified |
| S4 | /de/tax-return | de | Low | High | meta description 199 chars (truncates in SERP) | Trimmed to 162 chars, same facts, no new claim | none | none | partially verified |
| S5 | 10 EN/DE guide pages | en, de | Low | High | meta descriptions 167-184 chars (e.g. /de/blog/appealing-ato-decision-australia 184) | Not changed (data-driven per guide; low value) | | Minor SERP truncation | verified (measured) |
| S6 | /german-working-holiday-tax, /de/abn | en, de | Info | High | Title 66-67 chars incl. brand suffix | Not changed | | Minor truncation | verified |
| S7 | sitemap.xml | all | Info | High | No duplicate URLs; lastmod valid ISO dates (2026-08-01, 08-22, 10-21) none in future. EN 170 vs DE/JA 168 (EN-only /uk- and /german- pages), FR/IT/ES 167 each with flagship locale-only pages. DE/JA category slug is /medicare (EN /medicare-and-other) and is handled. No xhtml:link alternates in sitemap (hreflang is in page head only, acceptable) | none | | | verified |
| S8 | public/sitemap-llms.xml (listed in robots.txt) | all | Low | High | Static generated file lacks 30 URLs present in sitemap.xml (FR/IT/ES about + 7 expense pages each, client-agreement, privacy, de/ja legal) | PROPOSAL: re-run `npm run generate:llms` and extend the generator to include FR/IT/ES statics and legal pages, or stop listing it in robots.txt. Not run: it also rewrites llms.txt and llms-full.txt | | Stale crawl hints only | verified |
| S9 | robots.txt | all | Info | High | Allow / with /crm, /api/, /y8vwp4bf7 (+5 locales) disallowed for all listed agents; sitemaps declared; form paths intentionally rely on noindex (documented in robots.ts) | none | | | verified |
| S10 | canonical / hreflang (340 crawled) | en, de, ja | Info | Medium | Exactly one canonical per page, self-referencing; hreflang self-entry present, x-default present, no duplicate hreflang codes, no noindex targets, no missing/duplicate titles or descriptions, no duplicate titles/descriptions across pages, no thin pages (<250 words) | none | | Reciprocity to fr/it/es targets not verified on render | partially verified |
| S11 | / (home) | en | Info | High | hreflang en-AU href has no trailing slash while canonical is "/" (equivalent URL) | none | | none | verified |
| S12 | html lang | all | Info | High | en-AU, de-DE, ja-JP on all crawled pages (valid) | none | | fr/it/es not crawled | partially verified |
| S13 | JSON-LD (340 pages) | en, de, ja | Info | Medium | All blocks parse. Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Article, Service, HowTo, WebApplication present. No Review, AggregateRating or Rating anywhere (no invented ratings). 24 expense hub/spoke Articles (EN/DE/JA) lack datePublished, dateModified, image, mainEntityOfPage | PROPOSAL: add dateModified from a real source date and image; I did not invent dates. FAQ-to-visible-content match only spot checked, not exhaustively | | Article warnings in Rich Results Test possible | partially verified |
| S14 | Redirects | all | Info | High | /guides -> /blog 308; old min-wage slugs 308 to 2026-27; /tfn/ -> /tfn 308; /de/ -> /de; /DE and unknown URLs 404 with noindex | none | | | verified |
| S15 | noindex | all | Info | High | Only form/utility pages and 404s are noindex among crawled pages; no indexable page noindexed by mistake | none | | | verified |
| S16 | OG/Twitter (340 pages) | en, de, ja | Info | Medium | After S1/S2 all crawled pages have og:title/description/image/url/locale/type and twitter:card/title/image; twitter:title differs slightly from og:title on home (intentional) | | | | verified |
| S17 | Images alt | en, de, ja | Info | Medium | No <img> without an alt attribute on the 340 pages | none | | decorative empty alt not audited for correctness | partially verified |
| S18 | 3 EN guides | en | Unknown | Low | /blog/how-to-lodge-tax-return-from-overseas, /blog/do-you-need-to-lodge-tax-return-short-stay, /blog/what-is-payg-payment-summary returned 500 during the crawl, immediately before the dev server went down | NOT diagnosed: could be the server failing under load rather than a page bug | | Must be re-fetched on a healthy server | not assessed |
| S19 | FR/IT/ES: all checks | fr, it, es | n/a | n/a | Not rendered (server down). Source reviewed only: sitemap derived from allowlists (locale-pages.ts), hreflang built with newLocaleFor languages helper so clusters stay symmetric; legal pages absent in fr/it/es by design | | | | not assessed |

## Changes made (files)
- src/app/(de)/de/privacy/page.tsx, (de)/de/client-agreement/page.tsx, (ja)/ja/privacy/page.tsx, (ja)/ja/client-agreement/page.tsx: page-level openGraph and twitter
- src/app/(site)/privacy/page.tsx, (site)/client-agreement/page.tsx: og type/locale/siteName; agreement description
- src/app/(site)/blog/BlogClient.tsx: hidden h2 above cards (all six blog indexes)
- src/app/(de)/de/tax-return/page.tsx: shorter meta description
- __tests__/seo-legal-og.test.ts: new
- Checks: `npx tsc --noEmit` clean; full `npx jest`: 369 suites, 4581 passed, 1 skipped (run before the new test was added; the new test passes alone).

## Not assessed
- FR/IT/ES rendered pages; JA beyond 26 pages; the sample of 40 guides per language; internal link coverage and broken-link crawl (needs the full crawl); hreflang reciprocity against FR/IT/ES; the 3 pages that returned 500; exhaustive FAQ/visible-content match; Google Rich Results Test and Search Console (no access, so no field or index data); production headers/redirects (dev server only).
- Re-run needed: crawler is at scratchpad/crawl.js, analysis at scratchpad/an.js; use concurrency 2 and a healthy server.
- The dev server became unreachable twice during this audit (once under 8 parallel requests); cause not investigated.
