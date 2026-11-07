# Log: ja-pages

## Applied
- ja-pages-001: already fixed by the lead (`const rate = 65` in src/app/(ja)/ja/calculator/CalculatorClient.tsx). Nothing to change.
- ja-pages-002: super category intro now says 12% from 1 July 2025, unchanged for 2026-27 (blog/category/[slug]/page.tsx).
- ja-pages-005: /ja/superannuation next-step section now points to /ja/tax-return (new title, text and LinkButton). The Medicare link stays as a secondary text link. The amber section now has "この保証はタックスリターンについてのものです。" with a link to /ja/tax-return, placed before the guarantee.
- ja-pages-006: /ja/superannuation has a self-contained DASP answer paragraph under the Lead, inside .hero-sub.
- ja-pages-007 (partial): /ja/medicare #who-is-exempt has the Japan/RHCA paragraph with a link to /ja/blog/countries-with-medicare-agreement-australia. The category FAQs live in blog/data.ts, see Handoff.
- ja-pages-008: CATEGORY_INTRO key renamed from 'medicare-and-other' to 'medicare', so the intro now renders. First sentence softened as requested.
- ja-pages-009: assessment wording ("査定の際に自動的に加算") now used on home ANALYSIS 03, tax-return REFUND_SOURCES, calculator diffParas[1] and the medicare category intro. The medicare meta descriptions were not touched, see "Lead must check".
- ja-pages-012: calculator superHint rewritten.
- ja-pages-013: new home FAQ "オーストラリアのタックスリターンは誰に頼めばいいですか？" added (TPB, approved supervision and sign-off sentences, flat fee). It does not use 税理士. It is also in faqLd.
- ja-pages-014 (partial): About now has the approved supervision sentence (new whyParas[4]) and a /ja/tax-return link in talkP2. whyParas is `string[]` in the shared AboutBlocks, so the link went into talkP2 instead. "そのうえで申告します" became "そのうえで申告書を準備します" so the copy does not imply that we lodge. The calculator link is a Handoff.
- ja-pages-015: tax-return deadline FAQ now gives the 2026-27 deadline (31 Oct 2027) and the agent-list extension caveat.
- ja-pages-016: "多くの方は両方を受け取れます" became "多くの方は、両方の手続きの対象になります".
- money-028 (partial): /ja/tax-return has a new section "オーストラリアのタックスリターンは誰に頼めばいい？" (TPB plus the approved sentences, flat fee). The deadline FAQ was renamed to "タックスリターンはいつまでに提出すればいいですか？". The section sits between the rules section and the amber guarantee, not right after "ご用意いただくもの", so the pale/white tone alternation still holds. I left out the sentence "日本の税理士資格だけでは…", following the lead decision to keep 税理士 out of the copy. The guide line is a Handoff.
- tech-009 (JA part): the home page no longer re-declares the Organization (/#business) block with 3 languages. webPageLd.about already references /#business. The contact page mainEntity is now `{ '@id': SITE_URL/#business }` and isPartOf is a bare @id reference. The unused WA_NUMBER import is removed. Service.availableLanguage now lists six languages on /ja/tax-return, /ja/tfn and /ja/abn.

## Skipped
- ja-pages-005, sub-part: linking "タックスリターンの側" in the MYGOV Compare row. The CompareRow type is `string` only (shared component).
- money-006 (JA): CalcHrefs and CalcStrings live in src/components/wht/CalculatorBlocks.tsx (shared). That file has no `taxReturn` href or `linkTaxReturn` string, and bucket-shared has no money-006, so passing them now would break tsc. See Handoff.

## Handoff
1. src/app/(ja)/ja/blog/data.ts (ja-guides), medicare category FAQs:
   - Replace the answer to '日本人のワーキングホリデーはメディケアの対象になりますか？' with: '日本はオーストラリアと相互医療協定（RHCA）を結んでいないため、日本のパスポートでワーキングホリデー中の方は、一般的にメディケアの対象になりません。その年度にメディケア税が課される場合は、Medicare Entitlement Statementを取得して、対象外だった日数分の免除を申請できることがあります。最終的な判断はATOが行います。'
   - Replace the answer to the RHCA FAQ (the one that says '一部の国') with: 'イギリス、アイルランド、ニュージーランド、イタリア、マルタ、オランダ、ベルギー、フィンランド、ノルウェー、スウェーデン、スロベニアの11か国です。日本、ドイツ、オーストリアは含まれません。'
2. src/app/(ja)/ja/blog/data.ts (ja-guides), guide what-is-a-tax-agent: add this line at the end of the section '費用はどう考えればいいのか？': '当社の進め方と保証は[ワーホリのタックスリターン代行](/ja/tax-return)のページにまとめています。'
3. src/components/wht/CalculatorBlocks.tsx (shared), money-006 / ja-pages-014: add optional `taxReturn?: string` to CalcHrefs and optional `linkTaxReturn?: string` (plus optionally `resultTaxReturnLine?`) to CalcStrings, and render it first in the link row under diffTitle. After that, in src/app/(ja)/ja/calculator/CalculatorClient.tsx: hrefs add `taxReturn: '/ja/tax-return'`, T add `linkTaxReturn: 'ワーホリのタックスリターンの流れ'`. Result line (if added): 'これは入力した数字の計算にすぎません。タックスリターンは、ATOの記録から始めます。' linking タックスリターン to /ja/tax-return. I can apply the JA side once the component supports it.

## Lead must check
- "ATOとは当社が直接やり取りします。" appears in /ja/superannuation (statement under Compare), /ja/medicare (statement under Compare) and the calculator doStatement. It can read as us dealing with the ATO as the agent (iron rule). I left it untouched because it is outside the findings and close to the owner-pending "myGov ... not us" lines. Suggested JA: "myGovへのログインもID連携も不要です。" and drop the second sentence, or use "手続きは当社が進めます。"
- The /ja/medicare meta description and OG/Twitter descriptions still say "自動的に差し引かれます", which contradicts the page's own FAQ. Titles are lead-only, so I did not change them. Suggested: "査定の際に自動的に加算されます".
- tech-009: removing the JA home organizationLd also removes the Japanese OfferCatalog that only that block carried. The root graph keeps the entity.

## Facts checked
- SG 12% from 1 July 2025, unchanged for 2026-27: public/llms.txt Key facts.
- DASP 65% of the taxable component: llms.txt Key facts.
- RHCA list (11 countries, Japan not on it): llms.txt Key facts. The JA guide countries-with-medicare-agreement-australia gives the same list.
- Medicare levy is calculated at assessment, not withheld per pay: /ja/medicare FAQ and MYGOV row 1 (internal consistency).
- 2025-26 deadline of 31 Oct 2026 has passed; 2026-27 runs 1 Jul 2026 to 30 Jun 2027 with a 31 Oct 2027 self-lodge deadline; the agent extension applies only if on an agent's list before 31 Oct: FIX_BRIEF known facts.
- The DASP 28-day payment window after all documents are received is already stated on /ja/superannuation (#how-long).

## Verification
- `npx tsc --noEmit -p .`: pass.
- jest: wht-copy-compliance-6-languages, seo-legal-og and all of src/lib/__tests__ pass (881 passed, 1 skipped).
- eslint --quiet on the changed files: clean. No U+2013, U+2014, U+2015 or NBSP in the changed files. No 税理士 in any new copy.
