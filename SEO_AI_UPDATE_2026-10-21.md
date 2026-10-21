# SEO and AI Search Update, 21 October 2026

Based on the Search Console export for 19 Jul to 18 Oct 2026 (2,348 clicks, 173,867 impressions) and a full audit of the built site (503 indexable pages, EN/DE/JA).

## Rules held throughout

1. The business is never described as a tax agent. The only wording used is the existing approved sentence, verbatim, in each language:
   - EN: "Reviewed and signed off by a registered tax agent before it is lodged with the ATO."
   - DE: "Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird."
   - JA: "申告書は、ATOへ提出する前に登録税理士が確認して承認します。"
2. No refund is promised and no refund amount is given. The existing guarantee wording is copied verbatim and never reworded. The only refund-size statement is the owner-approved range ("a few hundred dollars to several thousand").
3. The about page still carries no tax agent mention.
4. Pages and snippets that already perform were left alone (for example casual-shift-cancellation, tfn-application-delayed, can-you-start-work-without-a-tfn, /medicare, all Japanese titles).

Every added line was scanned for agent claims, promises and amounts. The only figures added are ATO penalty figures.

## What changed

### 1. Keyword H1 on the money pages (12 pages)
`/`, `/tax-return`, `/tfn`, `/abn` in EN, DE and JA. The H1s were slogans with no search terms in them ("Anyone can press submit..."). The kicker line above the H1 now sits inside the H1 and carries the query words. It renders where the kicker always rendered, and the slogan is untouched. This is the same fix that moved `/superannuation` from position 41 to 22 in August.
- JA `/ja/tax-return` kicker: "タックスリターン代行｜申告書は登録税理士が確認して承認". This matches the "タックスリターン 税理士" queries (the strongest JA commercial queries) using only the approved wording.

### 2. Real Google reviews in the static HTML
The reviews used to load in the browser, so AI crawlers (which do not run JS) saw only "5.0". `GoogleReviewsServer` fetches the same Featurable data on the server (with 1 hour revalidation) and passes it to the unchanged carousel. If the fetch fails, the page renders exactly as before. Nothing is ever invented.
Files: `src/lib/googleReviewsServer.ts`, `src/components/ui/GoogleReviewsServer.tsx`, `GoogleReviews.tsx`, `googleSummary.ts`, `api/google-reviews/route.ts`, and 15 pages.

### 3. Entity data (sitewide JSON-LD)
- `availableLanguage` changed from English only to English, German and Japanese.
- Removed `contactOption: TollFree` (the number is a mobile).
- Added `knowsLanguage`.
- Added Facebook to `sameAs`.

### 4. AI crawler files
- `scripts/generate-llms.mjs` still pointed at the old pre-route-group data paths, so it could not run. The paths are fixed and the files are regenerated (142 guides x 3).
- `llms.txt` gains native German and Japanese sections, built only from existing site sentences.

### 5. IndexNow (Bing, which feeds ChatGPT Search and Copilot)
- Key file: `public/843b75167189fadc1e22ed25b84c7134.txt`.
- Run `npm run indexnow` after each deploy, or `node scripts/indexnow.mjs /blog/slug` for single URLs.

### 6. New guide: tax return deadline (EN/DE/JA)
`/blog/tax-return-deadline-31-october-working-holiday` and its `/de` and `/ja` versions. It targets "tax return deadline" and "タックスリターン いつまで" searches, and is time-critical. It is linked from the late-lodgement guide (3 languages), leads the Tax Return "decision guides" block on every Tax Return article, and appears in the sitemap and llms files.
Verified facts:
- 31 Oct 2026 is a Saturday, so the next business day (Mon 2 Nov) applies (ATO next business day rule).
- The agent lodgement program needs the client to be on the agent's list before 31 October (ATO).
- The penalty unit is $364 from 1 July 2026, so the maximum is $1,820.

### 7. Outdated penalty figures corrected
The penalty unit figures were updated from $330 / $1,650 to $364 / $1,820 (dated, with the old value noted) in the late-lodgement and tax-debt guides, in all three languages.

### 8. Snippet rewrites (EN only, chosen by the CTR gap)
- how-long-does-it-take-to-get-a-tfn (0.37% CTR on 18k impressions)
- how-to-update-address-with-ato (0.42%)
- what-does-tax-withheld-mean-payslip (0.22%)
- how-long-does-tax-refund-take-australia (0.23%)
- average-tax-refund-working-holiday: the description now uses the approved range, so EN agrees with DE/JA.

Two contextual links were also added from TFN guides to `/tfn`.

## After deploy (in this order)

1. In Search Console, run URL Inspection and Request indexing for the 3 deadline URLs.
2. Run `npm run indexnow`.
3. In Bing Webmaster Tools, choose Import from Google Search Console (2 minutes, no code), then submit `sitemap.xml`.
4. Compare in 3 to 4 weeks: `/tax-return` position (baseline 30.8), "working holiday tax return" (32.4), `/ja/tax-return` impressions (14), and CTR on the 5 rewritten posts.

## Off-site (where AI answers get their sources)

- Google Business Profile: post the 31 October / 2 November deadline, and keep asking happy clients for reviews in their own language.
- Partner guides (the existing outreach programme) are the best source of real backlinks and mentions. Prioritise Japanese and German WHV sites.
- Answer real questions in WHV communities (Facebook groups, Reddit, Japanese WHV blogs) with a link only where it genuinely answers the question.

---

# Round 2 (same day): conversion, Japanese fixes, German page, measurement

Focus: the tax return (the refund) is the core service, so the traffic that converts best is routed there.

1. **TFN guides now carry an in-article CTA aimed at the 45% moment** (EN/DE/JA). It uses the site's existing line: over-withheld tax comes back when the return is lodged. No amount and no promise.
2. **Chats from TFN and Work Rights guides open on the tax-return prefill** instead of the TFN or generic one, both in-article and at the end of the guide. In GA4, `topic` for those clicks now reads `tax-return`.
3. **Japanese read time was "1分で読めます" on every guide.** It was counted by spaces, and Japanese has none. It now counts characters (about 500 a minute).
4. **Two Japanese snippets with zero clicks were rewritten:** the minimum wage 2026 guide (position 8 to 10) and kitchen hand (position 5).
5. **New page: `/german-working-holiday-tax`**, modelled on the UK page:
   - no Medicare entitlement, so the levy exemption needs a Medicare Entitlement Statement
   - Germany is on the ATO's Addy list
   - German passport holders can apply up to age 35 from 1 July 2026
   - DASP can be paid to a German account, but a tax refund cannot
   It is listed in the sitemap and llms files, and linked from the German health-insurance guide. Further country pages were deliberately not built: France, Canada or Ireland would mostly repeat this page and the UK page, which reads as doorway pages.
6. **New FAQs:**
   - "When is a working holiday tax return due?" on `/tax-return` (EN/DE/JA)
   - "Can you claim super on a 417 or 462 visa?" on `/superannuation` (EN/DE/JA), the WHV-specific super queries at positions 25 to 29
7. **AI referral measurement.** Sessions arriving from ChatGPT, Perplexity, Copilot, Gemini or Claude fire one `ai_referral` event, and every later event in the session (including `whatsapp_click`) carries `ai_source`.
   - In GA4, register `ai_source` as an event-scoped custom dimension (Admin > Custom definitions) so it shows in reports.
   - The source is held in sessionStorage only, and no personal data is collected.

---

# Round 3 (same day): the tax return page

1. **New section on `/tax-return`, `/de/tax-return` and `/ja/tax-return`: "Why working holiday makers are often owed a tax refund".** The page sat around position 30 for "working holiday tax return" and nothing on it explained why a refund exists, which is the question that query carries. The section has six mechanisms, each already stated elsewhere on the site:
   - 45% withholding with no TFN or in-progress declaration
   - a second job without its own declaration
   - an employer not registered for working holiday makers
   - the Medicare levy applied by default
   - unclaimed work expenses (with a $100 to $15 illustration of the 15% rate)
   - Addy for listed nationalities

   It includes the one owner-approved range sentence and closes with a link to the calculator. No amount is promised.
2. **Japanese internal links.** The anchors in the strongest JA guides (the 税理士, residency and Medicare guides) now read "タックスリターン代行", matching the `/ja/tax-return` title. A new link was added from the guide on tax obligations after leaving Australia. `/ja/tax-return` had only 14 impressions in the period.
3. **Eight German descriptions were trimmed** to 165 characters or fewer, so they are no longer cut off in Google.

---

# Round 4 (final)

- **One entity, one type.** The business is an Organization at a single `@id` (`/#business`) everywhere:
  - The EN, DE and JA homepages re-declared that `@id` as a LocalBusiness. That block is removed, along with the rating fetch it no longer used.
  - The DE and JA homepages declared a second organisation at `/#organization`. It now uses `/#business`, so it merges with the root graph.
- **Related-guide cards on DE/JA guides** now show the read time of the translated text, not the English one.
- **Verified:** production build passes, 2,855 tests pass, 0 lint errors, and 0 iron-rule hits across 1,676 added lines.
