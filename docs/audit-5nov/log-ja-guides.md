# Fix log: ja-guides

File edited: `src/app/(ja)/ja/blog/data.ts` only. Backup of the pre-fix file: `scratchpad/plan/fix/ja-data.ts.orig`.
Edit scripts: `scratchpad/plan/fix/ja_apply.py`, `scratchpad/plan/fix/ja_medicare.py`.

## Applied
- ja-guides-a-001: refund-timing guide: the sentence about checking the agent channel and dealing with the ATO now has the registered tax agent who reviewed and signed as its subject (not 当社).
- ja-guides-a-002: diy guide: 海外からの代理提出は日常的な業務 -> 海外からの提出はよくあるケース.
- ja-guides-a-003: average-refund: removed the 「どれか一つでも当てはまれば還付…ゼロではなくなります」 promise. The mid-year item is now about early lodgement, not 「ほぼ必ず取りすぎ」.
- ja-guides-a-004: late-penalty: the lead and the FAQ section 「還付を受け取る側でも…」 now match EN: the ATO generally does not issue the penalty when a late return gives a refund or nil, with some exceptions.
- ja-guides-a-005: financial-year-dates: 翌年8月 -> 同じ年の8月.
- ja-guides-a-006: financial-year-dates lead: added the 2025-26 deadline (31 Oct 2026, passed, late lodging still possible, later agent dates only if on an agent's list before 31 Oct). Also fixed the body sentence that said the agent extension helps unconditionally.
- ja-guides-a-007: kitchen-hand: definition-first lead (キッチンハンドとは…).
- ja-guides-a-008: full-time-part-time-casual: added the casual minimum $33.05 (26.44 + 25%) after the first sentence.
- ja-guides-a-009: added /ja/tax-return links to kitchen-hand, update-address (lead link on 「タックスリターンの準備」; 「当チームが対応します」 -> 「当チームが確認します」 to avoid implying we deal with the ATO), employer-not-paying, farm-work-rights, average-refund (via money-011), award-classifications, leave-entitlements, casual-shift-cancellation, barista, bartender, fair-work-act, bullying, hospitality-award, construction, farm-hand, labour-hire.
- ja-guides-a-010: added /ja/expenses links: hospitality (kitchen-hand, barista, bartender, hospitality-award), construction, farm-work (farm-hand, fruit-picking, horticulture-award, farm-work-rights), labouring (labour-hire), delivery-drivers (bicycle-motorcycle). The anchors use the real page titles, and the examples avoid RSA and White Card, because the expense pages say the first White Card is not deductible.
- ja-guides-a-011: update-address: new section 「ATOの登録住所はどう変更するのか？」 (myGov > ATO > My profile > Personal details > Contact details, ATO app, phone 13 28 61 / +61 2 6216 1111, paper form up to 28 days).
- ja-guides-a-012: diy guide: new section 「オーストラリアで「税理士」にあたるのは誰か？」. It defines the role as 「日本の税理士に近い立場」 and links to what-is-a-tax-agent. It never describes the business as 税理士 or agent. I dropped the "only agents may prepare returns for a fee" claim and the repeated business sentence: the same section already has it, and the claim would sit awkwardly next to 当チームが作成.
- ja-guides-a-013: refund-timing: new section 「還付の状況はどこで確認できるのか？」 with the ATO status labels In progress / Under review / Issued.
- ja-guides-a-014: how-does-australian-tax-year-work refocused on mechanics: the deadline section now points to australian-financial-year-dates, and the part-year over-withholding claims are corrected. Two list items reworded (early lodgement; agent dates conditional on being on the list before 31 Oct).
- ja-guides-a-015: GIC: 「2026年10月から12月の四半期は年11.51%です（ATO）」.
- ja-guides-a-016: Payday Super now in present tense.
- ja-guides-b-001: medicare-levy guide rebuilt to match EN: answer-first lead (usually no, 2%, about $500 on $25,000, statement needed), passport test with the 11 RHCA countries and Japan not on the list, MES section, 300/500/700/900 list, agreement-country section with the Italy/Malta limitation, and links to the countries guide, the what-is-medicare guide and /ja/medicare. The amendment section and the closing sign-off sentence are kept verbatim. 「手続きを代行します」 -> 「手配をお手伝いします」.
- ja-guides-b-002: tax-return links added to minimum-wage, unpaid-trial, penalty-rates, what-happens-without-tfn, public-holidays, tfn-australian-address, tfn-vs-abn, restaurant-industry-award, wage-theft, supermarket, who-can-ask-for-tfn, unfair-dismissal.
- ja-guides-b-003: tax-back: the substantiation rule is in the present tense, with the 2026-27 $1,000 standard deduction mentioned as a separate option.
- ja-guides-b-004: flagship 417/462 lead now opens with 15% on the first $45,000 (unchanged from 2025-26) and the registered-employer condition.
- ja-guides-b-005: minimum-wage: weekly $1,004.90 in the lead, plus a new FAQ section on part-time and full-time minimum wage.
- ja-guides-b-006: what-is-a-tax-agent: one sentence defining 税理士 as the nearest Japanese equivalent of the role, with TPB register verification. It does not describe the business.
- ja-guides-b-008: tax-free threshold: 「居住者の場合、年間の最初の18,200ドルまで」.
- ja-guides-b-009: calques fixed: 床 -> 最低ライン/最低時給の保証/最低賃金 (about 17 places; the literal floors 床の清掃 and 濡れた床 are kept), 生き残る/生き続ける -> 残る/有効/消えません (7), 最も静かな損失 -> 最も気づきにくい損失 (2), 静かにお金を失う and 静かに間違って (2).
- ja-guides-b-010: LITO lead now gives 700 / 37,500 / 66,667.
- ja-pages-003: tax-return category FAQ deadline answer replaced (2025-26 deadline passed; the agent extension only applies if on an agent's list by 31 Oct; 2026-27 deadline 31 Oct 2027).
- ja-pages-004: work-rights category FAQ: the 10-minute rest break is paid and the 30-minute meal break is unpaid; refers to the Fair Work Ombudsman.
- ja-pages-007 (data.ts part): medicare category FAQs: Japan is not on the RHCA list; the 11 countries are named; Italy/Malta limitation added.
- ja-pages-010: TFN category FAQ: 28-day declaration rule, then 45%.
- ja-pages-011: super category FAQ: DASP paid within 28 days of all documents; certified copies for balances of $5,000 or more.
- money-011 (JA part): average-refund: 「実際の金額は、ATOの記録から[ワーホリのタックスリターン]…を作成して初めて分かります。」
- money-023 (JA part): minimum-wage, kitchen-hand, unpaid-trial, tfn-australian-address (same edits as b-002/a-009).
- money-028 (guide part): what-is-a-tax-agent: link to [ワーホリのタックスリターン代行](/ja/tax-return) added at the end of the cost section.
- Extra fact fix (brief rule: part-year is not over-withheld at WHM rates): removed or corrected the definite part-year over-withholding claims in average-refund (list item removed, 4 -> 3), tax-back (item removed, 5 -> 4), backpacker-tax-rate-australia (two-financial-years section), do-you-need-to-lodge-tax-return-short-stay, what-is-a-tax-refund-australia (lead, section heading and intro, list item, unclaimed-years paragraph), and australian-financial-year-dates.
- Extra fact fix: tax-back 「2026年分はすでに過ぎています…翌年5月まで延びます」 now names 2025-26 and makes the agent extension conditional.

## Skipped
- ja-guides-b-007 (fee guarantee paragraph in guides): the guarantee wording is owner-approved and must stay as is (FIX_BRIEF decisions). Not removed or changed.
- a-009 part "average-refund: link 「当社の料金」": not done because it would edit the approved guarantee paragraph. money-011 adds the /ja/tax-return link on that page instead.
- a-012 sentence 「報酬を受けて申告書を作成・提出できるのは登録タックスエージェントだけ」: left out (see Applied), to stay conservative about implying agent status.

## Handoff (files I do not own)
- ja-pages bucket, `src/app/(ja)/ja/medicare/page.tsx` (ja-pages-007): in section #who-is-exempt, after the first paragraph, add: 「日本はオーストラリアと相互医療協定（RHCA）を結んでいないため、日本のパスポートの方は一般的にメディケアの対象外です。詳しくは[協定国の一覧](/ja/blog/countries-with-medicare-agreement-australia)をご覧ください。」 (FAQ copy for that page as in ja-pages-007.)
- ja-pages bucket, `src/app/(ja)/ja/tax-return/page.tsx` (money-028): the new section 「オーストラリアのタックスリターンは誰に頼めばいい？」 and the FAQ rename, as written in money-028. Lead should check the line 「当社は登録タックスエージェントの監督のもとで運営しており」 against the approved wording.
- en-guides / de-guides: the EN source (`src/app/(site)/blog/data.ts`, for example lines 1047, 1062, 1087, 1155, 1174, 3474, 3494) still says part years are "often/routinely over withheld". That is wrong at WHM rates, per the brief. The JA copies are fixed; EN/DE should match.

## Facts checked
- GIC Oct-Dec 2026 = 11.51% p.a. (Jul-Sep 2026 = 11.43%): ATO "General interest charge rates" (ato.gov.au/tax-rates-and-codes/general-interest-charge-rates).
- Tax return status labels In progress (Processing / Under review ...) and Issued with the notice of assessment: ATO "Status of your tax return" (ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/status-of-your-tax-return).
- Address update path myGov > ATO > My profile > Personal details > Contact details; ATO app; phone; Change of details form, up to 28 days: ATO "Update your personal contact details" (ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-personal-contact-details). Phone numbers are as already used in the same file.
- Late penalty generally not issued on refund or nil returns: EN data.ts 7468/7488 (ATO position quoted there).
- WHM 15% to $45,000, unchanged from 2025-26; minimum wage $26.44 / $1,004.90 / casual $33.05; RHCA list and Japan not on it; Payday Super from 1 July 2026: llms.txt Key facts.
- Italy RHCA limited to up to 6 months; part-year withholding flat 15%; deadline status for 2025-26: FIX_BRIEF "Known".
- LITO 700 / 37,500 / 66,667: already in the same JA guide body.

## Checks
- `npx tsc --noEmit -p .`: passes.
- `npx jest __tests__/wht-copy-compliance-6-languages.test.ts`: 3/3 pass. `__tests__/seo-legal-og.test.ts`: 4/4 pass.
- Added lines contain no U+2013, U+2014, U+00A0 or 〜. 税理士 appears only in the role definitions (diy guide section and the what-is-a-tax-agent sentence), never for the business.
