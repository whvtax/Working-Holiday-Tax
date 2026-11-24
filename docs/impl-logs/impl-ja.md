# impl-ja: Phase 1 content work, src/app/(ja)/** (24 Nov 2026)

No titles, meta descriptions, slugs or existing H2s changed. No opening paragraph of a frozen page changed. No 税理士 used for us,
no prices added, no dashes added (diff checked for U+2013/2014/2015: 0). Helper scripts (not repo): S/plan2/ja_lib.py,
ja_links_spec.py, ja_links_apply.py.

## T2 Jo decisions (16 fixes): Medicare Entitlement Statement "we arrange" -> "we explain how to apply (Services Australia)"
- blog/data.ts (8 places): diy-tax-return-vs-tax-agent (L213), working-holiday-visa-tax-guide (L302), average-tax-refund (L358),
  tax-back-australia-working-holiday (L410, L423; below the frozen opening), checklist guide L2570, payg/withholding guide L2791,
  medicare-levy guide L8348 ("手配をお手伝い" -> "申請方法をご説明"). Wording: "Services Australiaへの申請方法は当社がご説明します".
- tax-return/page.tsx FAQ (Medicare): "書類の手配は当社が行います" -> client applies, we explain how (FAQ schema uses same string).
- blog/category/[slug]/page.tsx (medicare category intro), blog/[slug]/page.tsx (medicare service blurb).
- page.tsx (/ja): Medicare check body and SERVICES card 05 desc ("免除証明書を申請します" -> explain how to apply, claim in return).
- medicare/page.tsx: compare row, HOW_TO_APPLY step 02, FAQ "Medicare Entitlement Statementとは", Service schema description,
  body paragraph "当社が手配します".
- SVT super consolidation and TFN mail-holding address: no JA occurrences found (grep 郵便/保管/統合). ATO address update kept.

## T6 money pages
- /ja/tax-return (H1 already contains オーストラリアのタックスリターン代行; first 40 words already answer): added H2
  "10月31日を過ぎた方、過去の年度を提出していない方へ" (links past-years + late-penalty guides, WhatsApp CTA; ATO "Lodge a prior
  year tax return"); added 4 question H2s from p1-keywords JA clusters / GSC: "オーストラリアのタックスリターンはいつまで？"
  (いつまで cluster 246 impr; links deadline guide), "帰国後でもオーストラリアのタックスリターンはできる？" (帰国後 35@9.26),
  "タックスリターンでメディケア免除を申請するやり方は？" (メディケア免除 79+28+19+14 impr; links /ja/medicare, "we explain"),
  "オーストラリアのタックスリターンのやり方は？" (やり方 15+10; links DIY guide and diy-vs-agent guide). Facts from the page
  itself, existing JA guides and ATO.
- /ja/superannuation (H1 untouched): new H2 "スーパーアニュエーション返金のやり方は？DASP申請の5つの手順" (返金 やり方 12@6.75,
  dasp 申請 41 impr) with 5 ATO steps, links dasp-documents-required and how-long-does-dasp-take; next-steps section gains a
  sentence + link to past-years guide for missed 31 October. FAQ unchanged (schema = visible).

## T5 internal links (blog/data.ts unless noted): 84 contextual guide links (77 to not-indexed guides, 7 to /ja/superannuation) + page links below
- Crawled-not-indexed (56 JA guides in wht-crawled-not-indexed-1124.xlsx): 77 new links from same-language guides with GSC
  impressions (Pages.csv), appended as one sentence to a relevant non-opening paragraph, max one new link per paragraph, varied
  anchors. Result: 55 of 56 now have >= 2 links from impression-earning, indexed-candidate JA guides (12 already had them).
  Exception: super-stapling-rule-australia has no JA guide and is 301-redirected in next.config.js (line 303) to
  how-much-super-should-employer-pay, so it was not linked (GSC entry is stale).
- Super service: 7 guides about super/leaving gained one /ja/superannuation link (how-to-lodge-tax-return-from-overseas,
  how-to-read-a-payslip, gross-pay-vs-net-pay, can-your-employer-pay-you-cash-in-hand, can-you-work-for-multiple-employers,
  cash-in-hand-tax-return, hospitality-award).
- Tax return service: all 144 JA guides already linked /ja/tax-return (checked), so none added there except below.
- tax-back-australia-working-holiday: after the (frozen) opening, new H2 "税金の還付を受け取る手順は？" with a 5 step numbered
  list (income statement tax ready, lodge via myTax or registered agent, 31 Oct, Australian bank account, NOA ~2 weeks online;
  all facts already on the page / ATO) and a link "ワーホリのタックスリターン代行" to /ja/tax-return.
- what-is-a-tax-agent: new sentence high on the page (section 2) linking /ja/tax-return with anchor タックスリターン代行.
- /ja (page.tsx): sentence under the refund figures linking /ja/tax-return with anchor タックスリターン代行.
- /ja/tax-return and /ja/superannuation: 8 more guide links in the new sections (above).

## Step 4 JA specific
- minimum-wage-australia-2026-27 (frozen opening untouched): new H2 "オーストラリアの最低賃金はいくら？（2026年）" right below
  the opening with a dated rate list (2026-27: 26.44/h, 1,004.90/week, casual 33.05; 2025-26: 24.95/h, 948/week, casual 31.19;
  award minimum +4.75%), source Fair Work Commission 2026 Annual Wage Review, checked Nov 2026. Figures only from the page and
  public/llms.txt. Rendered as a list because the guide markdown renderer (GuideArticle parseBody, not my file) has no table
  support.
- Deadline guide refresh (C2) is a June item; not done now.

## Verify
- tsc: no errors in (ja) files; errors only in src/components/layout/RootDocument.tsx (another agent, in progress).
- jest: targeted suites (locale-blog, new-locales-sitemap, frontend-security, brand-*, whatsapp, photo, redirect, src/lib/svt):
  17/17 suites, 1025 tests pass. Full run: 9 failing suites = Will (7) + form-start-lang + form-translate (the latter passes
  alone; flaky under concurrent edits). __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
