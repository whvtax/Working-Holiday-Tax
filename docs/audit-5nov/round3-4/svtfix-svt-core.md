# svtfix svt-core (round 4)

The earlier stopped agent left no changes in svt-core files (checked mtimes). The only changes already there were the lead's (brand-public.ts, the whatsappHello/whatsappAbout strings in i18n.ts, price-check.ts and their tests). I kept all of them as they were.

## Implemented
- **TFN hub (new, English only)**: `src/lib/svt/content/services-en.ts` (`TFN_HUB_EN`) and the route `src/app/(svt)/svt-site/tfn/page.tsx` at public URL `/tfn`.
  - It uses the same GuideContent shape and GuidePage template as the other service pages.
  - The page opens with the answer, then: who can apply, the steps, what to do if the TFN has not arrived after 28 days, working before it arrives (the 28 day rule, then top rate withholding), the TFN declaration and tax-free threshold (residency "may be" and "usually", the ATO decides), TFN or ABN, keeping the TFN safe, and where we come in (free, no charge, approved agent wording).
  - It has a 5 question FAQ, 3 ATO sources and 9 related spokes.
  - It has no hreflang alternates, and the language switch shows English only. The sitemap entry is `/tfn` only. guideLinksFor('en') puts it first in the header menu and the footer.
- **/superannuation rebuild (English)**: `SUPERANNUATION_HUB_EN` in services-en.ts.
  - `[slug]/page.tsx` serves it in place of the guides-en.ts entry, for both the page and its metadata. /zh and /vi still use guides-zh.ts and guides-vi.ts.
  - Title: "Tax on departing Australia superannuation payment (DASP)". The lead and an FAQ question use that exact phrase.
  - The page opens with the answer: 0% tax-free, 35% taxed, 45% untaxed, and 65% on the taxable component only for working holiday visa super. The old text said "65% to the whole amount", which was wrong; this version fixes it.
  - New sections: 28 days from a completed application, applying online free (start in Australia, submit after leaving), documents (certified ID copies may be needed at $5,000 or more), the 6 month rule, 485 and bridging visas, and claiming with us.
  - FAQ: 5 questions. Related: the DASP spokes.
  - Facts checked on ato.gov.au on 5 Nov 2026 (the DASP page, the TFN application page, Apply for a TFN, TFN declaration payer obligations). The URLs are in the file header and the sources.
- **Home answer block** (`home-en.ts` optional `answer` field, rendered in `components/svt/pages/HomePage.tsx` under the trust strip, with CSS added to HomePage.module.css):
  - Heading "International student tax return in Australia: the short answer".
  - The 31 October deadline is in past tense, with "a late return can still be lodged".
  - 4 short answers with "Read more" links: /do-i-need-to-lodge, /tax-residency, /medicare, /leaving-australia.
  - "What we help with" links to the four services: /pricing, /tfn, /abn-delivery, /superannuation.
  - Home meta title is now "International student tax return in Australia from $220".
  - The home Medicare FAQ now says the exemption depends on Medicare entitlement, not on OSHC.
  - `answer` is optional, so home-zh.ts and home-vi.ts are untouched (next wave).
- **P0 ContactPage** (`components/svt/pages/ContactPage.tsx`):
  - Removed zh "我们直接和 ATO 对接" and vi "Chúng tôi làm việc trực tiếp với ATO".
  - Removed zh "我们通过 ATO 都能看到" and vi "chúng tôi xem được qua ATO".
  - The myGov answers (en/zh/vi) now say "not to lodge with us", with the MES done by the student through myGov or the Services Australia form (fixes pe-07).
  - The payslip answers now say "usually not", that payslips help if an employer has not reported pay, and that ABN work needs app earnings.
  - The zh/vi meta descriptions changed to match.
- **P1 links**:
  - The GuidePage end-of-page price line now links to /pricing (TECH-03, part 1).
  - The footer guides now include tfn (English), abn-delivery and superannuation (pe-04).
  - `relatedLinks` resolves the 'tfn' slug in English and silently drops it in zh/vi. **guides/long buckets can add `'tfn'` to `related` safely.**
- **llms.txt** (`llms.ts`):
  - New "## Services" section listing the 4 hub URLs.
  - DASP rates and 28 days, and TFN free and 28 days, added to the key facts. 417/462 are kept out of the summary.
  - The Guides list uses the live English hubs (TFN included, with sources).
  - The stale "/zh /vi first articles" line is replaced.
- **Sitemap**: /superannuation is priority 0.9 with the hub's lastmod; /tfn is listed once (en).
- **Images**: PAGE_SCENE `tfn: 'IMG-10'`.
- **Tests**:
  - content-rules covers the hubs: wording, fees, AI, residency, meta budget, sources domains, related resolve, sitemap.
  - A new "round 4 hubs" describe checks the rates, 28 days, the en-only /tfn and the home service links.
  - The llms test checks /tfn.

## Tested
- `npx tsc --noEmit -p .`: clean.
- `npx jest src/lib/svt` plus brand-routing-26oct, brand-separation-26oct, launch-gate, svt-ga4-27oct and brand-isolation-round2: 13 suites, 951 passed, 2 skipped (launch gate).
- eslint --quiet on the touched files: clean.
- Dash scan (U+2013/2014/2015, ——) on the touched files: none.

## Not tested
- No build and no browser check, per the brief: the home answer block layout, /tfn render and footer have not been checked on phone or desktop.

## Not done / logged
- TPB symbol in the footer (pe-01) and the WhatsApp number (TECH-01, zh-02): owner decision, unchanged.
- TECH-05 (global-not-found.tsx host match) and TECH-06 (formStrings/analytics): shared files outside my ownership.
- http/www/HSTS (pe-05, TECH-02): hosting/next.config, outside my ownership.
- P2 items: Service JSON-LD (TECH-08), blog hub CollectionPage, robots Disallow for the assessment step (TECH-09), sitemap xhtml alternates, zh htmlLang (TECH-11), the zh/vi blog meta titles and i18n wording (zh-09, zh-11, vi-pages-08).
- 2026-27 resident rates: none are stated in svt-core files, so there was nothing to verify or remove.
- The guides-en.ts `superannuation` entry is no longer rendered in English. svt-guides-en should not spend effort there and should link to /superannuation and /tfn from the spokes. zh/vi hubs (/zh/tfn, /vi/tfn, DASP rebuild) belong to the next wave: create them in guides-zh/vi together with a GUIDES_EN 'tfn' entry, or extend services-en.
- **Ownership note**: I edited SVT-only components in `src/components/svt` (HomePage, ContactPage, Footer, GuidePage plus CSS). No bucket owns them, and the home block and P0 fixes needed them. I touched no shared WHT component, no brand-routing.js and no brand-public.ts.
