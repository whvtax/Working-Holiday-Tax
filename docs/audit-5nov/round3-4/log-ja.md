# Native review log: ja

Scope: git diff 26a407f HEAD -- src/app/(ja). 11 files changed today; edits made in 2 files
(src/app/(ja)/ja/blog/data.ts, src/app/(ja)/ja/superannuation/page.tsx). Conservative pass:
most of today's Japanese was already natural (the calques 静かに/床/生き残る had already been fixed).

Edits: 15 (14 in blog/data.ts, 1 in superannuation/page.tsx). No titles, meta descriptions,
numbers, facts or approved sentences touched. tsc passes; both jest suites pass (27 tests).

## Top 10 before/after

1. DIY vs agent guide (redundant wording)
   - 前: TPBに登録された登録タックスエージェントです。日本の税理士に近い立場にあたるのが…
   - 後: 日本の税理士に近い立場にあるのが、…TPBに登録されたタックスエージェント（registered tax agent）です。
   (税理士 only describes the Australian role, never the business.)
2. Super page (この before a following sentence is wrong deixis; also unclear scope)
   - 前: この保証はタックスリターンについてのものです。
   - 後: なお、以下の保証はタックスリターンを対象としたもので、スーパーの申請には適用されません。
3. Hospitality deductions bridge, pasted 4x identically. Varied in 3 guides, e.g.
   - 前: 飲食の仕事で控除できるもの（滑り止めの靴や制服の洗濯など）は[飲食の経費控除]にまとめています。
   - 後: 滑り止めの靴や制服の洗濯代など、飲食の仕事ならではの控除は[ホスピタリティの経費控除]で扱っています。
4. Same, cafe guide
   - 後: カフェの仕事で自費で負担したもの（靴や制服の洗濯など）が控除になるかは、[飲食業の経費控除]で確認できます。
5. Farm deductions bridge, pasted 4x identically. Varied in 3 guides, e.g.
   - 後: 日焼け対策や作業用の手袋など、ファームで自費で買ったものの控除は[ファーム・ピッキングの経費控除]で確認できます。
6. Leave guide (精算…精算 repetition)
   - 前: 休暇の精算も他の賃金と一緒に課税され、年度末に[ワーホリのタックスリターン]で精算されます。
   - 後: 休暇の精算分も他の賃金と一緒に課税され、税額は年度末の[タックスリターンの申告]で確定します。
7. Public holidays guide (anchor variation)
   - 後: …引かれた税金は[年に一度のタックスリターン]で精算されます。
8. Wage theft guide (near-duplicate of the minimum-wage-claims bridge)
   - 後: 回収した賃金は受け取った年の所得になります。申告の際は、その年のほかの給与や源泉徴収と一緒に[タックスリターン]に含めます。
9. Workplace guide (3rd copy of 「…でまとめて確認します」)
   - 後: あとから支払われた賃金も、職場ごとの源泉徴収も、最終的にはその年の[タックスリターン]にすべて反映させる必要があります。
10. TFN guide (2nd copy of the 45% bridge)
   - 後: TFNが届くまでの間に45%で源泉徴収された分は、年度末の[タックスリターン]で調整されます（結果はその年の事情によります）。
Also: award guides (掛け持ちした仕事それぞれの源泉徴収は…1年分まとめて精算), penalty rates (年度末の[タックスリターン]でほかの給与とまとめて精算).
Anchor "ワーホリのタックスリターン" was used ~30 times today; about 10 now use other anchors (same target /ja/tax-return).

## Facts that looked wrong or unverifiable (NOT changed)

- Minimum wage guide: 週1,004.90ドル vs 26.44 x 38 = 1,004.72. Check the FWC weekly figure.
- Medicare guide: 2025-26 low-income threshold 28,011ドル (single). Verify against ATO for 2025-26.
- GIC guide: 2026年10月から12月の四半期は年11.51%. Verify the current ATO GIC rate.
- Medicare meta description and /ja/medicare description still say 自動的に差し引かれます, while today's body copy
  says 査定の際に自動的に加算されます. Not an outright error, so left per the title/meta rule; lead may align.
- 'what-is-the-ato' new title says オーストラリア国税庁, but the description and the whole site use
  オーストラリア税務署. Title left as is (not an outright error); consider aligning.
- Medicare guide: 「受給資格を決めるのはビザではなくパスポートです」 is a simplification (RHCA eligibility also
  depends on visa/stay); acceptable for WHM readers but flagging.

## For the lead

- Iron rules hold: 税理士 appears only as an analogy for the Australian registered tax agent role (and in code
  comments); no claim the business is a tax agent; approved sign-off sentence and guarantee untouched; no dashes.
- Many guides still end with the same two-sentence pattern 「…年度末に[ワーホリのタックスリターン]で精算されます。
  年度累計の数字があれば[還付金の試算]ができます。」 (minimum wage, Fair Work Act, casual, restaurant, kitchen hand).
  I varied the worst clusters only, to stay conservative.
