# 20-agent audit and fixes, 5 November 2026 (second round)

Base: FINAL58 plus the first round of 5 Nov (docs/SEO_AI_UPDATE_2026-11-05.md).

## Process
1. 20 read-only auditors: 6 languages x (service pages, guides 1-71, guides 72-142), plus technical/AI search and money pages/Search Console. 345 findings (20 P0, 163 P1, 162 P2/P3). All findings: `docs/audit-5nov/findings-*.json`.
2. 13 fixers with disjoint file ownership (per language pages, per language guides, shared code). Logs with applied, skipped and handoffs: `docs/audit-5nov/log-*.md`.
3. Handoffs between buckets applied by the lead, then full verification.

## Main fixes
- **Calculator (all 6 languages):** the super estimate used 35% DASP when "tax resident" was chosen; now always 65% (a $10,000 balance showed $6,500 instead of $3,500). Resident scale now includes the low income tax offset (EN). Each calculator links to the tax return page.
- **Iron rules:** about 15 sentences that implied we are the tax agent or lodge as the agent ("Where we lodge ... on the client's behalf", "nous traitons directement avec l'ATO", "当社が…登録タックスエージェント向けの経路", Spanish "presentamos nosotros ... en tu nombre") and two "backpackers usually get a refund" lines (FR/IT/ES category hubs). Duplicate business schema blocks removed on several pages.
- **Facts:** 12% super from 1 July 2025 (not 2026); DASP 65% also on the untaxed element; Medicare levy example (was $500 on $25,000, below the $28,011 low income threshold; now $800 on $40,000) in all languages; "part year means over-withheld" removed (WHM withholding is a flat 15%); agent deadline extension only if on an agent's list before 31 October; TFN 28-day rule; 15% WHM rate restored in DE/FR/ES guides that had dropped it; STP finalisation by 14 July; paid 10-minute breaks.
- **Medicare by passport:** which countries have a reciprocal agreement and which do not, on the Medicare pages and FAQs of every language; Italy's limited cover (up to 6 months, Services Australia).
- **Money pages:** EN /tax-return gets an answer-first definition, the WHM rates, deadline, a neutral "two ways to lodge" comparison and new FAQs; DE and JA equivalents; FR/IT/ES: the flagship is now the complete guide (key figures with dates, Medicare by passport), /<l>/tax-return the process page, linked both ways.
- **Conversion links:** about 150 guides across the 6 languages now link in the text to the tax return service; super pages link to the tax return; "Tax return" added to the header navigation in all languages (from 1280px).
- **AI search:** answer-first openings on high-traffic guides; related-guides logic spreads links to high-impression guides; schema language lists cover 6 languages; unused SearchAction removed; HowTo markup now matches visible steps; sitemap and sitemap-llms lastmod aligned; FR/IT/ES guides no longer show publication dates before the languages went live (set to 3 Nov 2026 in `src/lib/blog-dates.ts`, correct it if needed); llms files regenerated.

## Kept on purpose (owner decisions)
- "Refunds for our clients range from a few hundred dollars to several thousand" (approved).
- The client agreement text ("as your authorised agent") and the EN/DE/JA home line "a tax agent will never ask for your myGov ... not us": left for Jo to decide.
- No redirects or hreflang changes between /<l>/tax-return and the flagship pages.

## Verification
- tsc clean; eslint clean; jest 454 suites, 6,182 passed, 0 failed.
- Production build (scripts/build-offline.sh), real fonts restored.
- Crawl of all 1,007 sitemap URLs: 0 errors, 0 warnings, incl. 1,010+ internal link targets, hreflang reciprocity, JSON-LD, compliance text scan (rendered text + JSON-LD) and dashes.
- Script scan of every added line (agent claims, refund promises, other brand, LocalBusiness types, dashes): clean (3 hits reviewed, all approved wording or questions).
- Playwright phone viewport, 16 key pages in 6 languages: no overflow, one H1, WhatsApp link, axe 0 violations. Header at 1024/1280/1440: no overflow. Calculator: $30,000/$9,000 gives $4,500; $10,000 super gives $3,500.

## Not verified
- Native human review of the new text in FR/IT/ES/DE/JA.
- Some facts taken from the auditors' ATO lookups (low income thresholds, LITO, Payday Super, GIC rate 11.51%): sources in the logs.
- Field data and Rich Results Test.

## After deploy
1. Search Console: resubmit sitemap.xml; Request Indexing for /tax-return, /superannuation, /calculator and the three flagship pages.
2. `npm run indexnow`.
