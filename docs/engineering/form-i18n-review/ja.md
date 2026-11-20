# Japanese form review (ja)

Read-only review, 18 Nov 2026. No source file was edited. Reviewer: native-level Japanese.

## Scope and count

About 320 Japanese strings checked against their English originals:

| Source | Japanese strings |
|---|---|
| `src/lib/formStrings.ts` (every `ja:` entry, 207 keys) | 207 |
| `src/components/ui/ResidencyStep.tsx` `COPY.ja` (WHT residency step, incl. 6 questions and `warn`) | 45 |
| `src/components/ui/ResidencyDeclaration.tsx` `COPY.ja` | 14 |
| `src/components/svt/form-residency-copy.ts` `JA_RES` (SVT) | 20 |
| `src/components/ui/ResidencyFixPanel.tsx` `ja` | 12 |
| `src/components/ui/FormStepper.tsx`, `src/components/ui/LinkAfterPayment.tsx` | 8 |
| `src/lib/submit-tax-form.ts` `FIELD_LABELS` (`ja`) | 8 |
| `src/lib/form-lang.ts` (`日本語`), `FormLanguageToggle` (uses `langPicker`) | 1 |
| Page metadata: `src/app/(ja)/ja/start`, `ja/y8vwp4bf7`, `ja/rh84sez58`, SVT `ja/jhd7hp9xd` (+ `w3rp42fav`) | ~6 |

Mechanical checks (script over `formStrings.ts`): every key has a `ja` value; all `{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}` markers are intact; no en or em dashes in any Japanese string in scope; no half-width punctuation next to Japanese text; numbers and prices match English ($18,200, $700, $45,000, $2,462, 4 MB, 10 files, 15 minutes, 24 hours, 8 or 9 digits). The only number differences are deliberate localisations (+81 example phone numbers, a Tokyo example address, `100% Online` rendered as `完全オンライン`). No mention of AI or bots. No 税理士. TFN, ABN, ATO, Medicare, WhatsApp, BSB, DASP, Low Income Tax Offset are kept in English (Medicare as `メディケア（Medicare）`).

## Problems

Priority: **H** = must fix (meaning, legal declaration, residency test), **M** = should fix (term consistency, unnatural), **L** = polish.

### H1. ABN declaration drops "I will be the sole owner"
- File: `src/lib/formStrings.ts`, key `declABN` (line 437)
- English: "I declare that I do not own any assets in Australia and have never been issued an ABN. I intend to establish a business as a sole trader, where I will be the sole owner, with operations based in Australia."
- Current: `オーストラリアに資産を所有しておらず、ABNが発行されたことがないことを宣言します。オーストラリアに拠点を置く個人事業主（Sole Trader）として事業を運営する意向です。`
- Corrected: `オーストラリアに資産を所有しておらず、これまでにABNが発行されたことがないことを宣言します。私は、自らが唯一の所有者となる個人事業主（Sole Trader）として、オーストラリアを拠点に事業を始める意向です。`
- Why: a legal declaration must be faithful. "where I will be the sole owner" is missing, and "establish" (始める) became "operate" (運営する). "never" (これまでに) is also weakened.

### H2. SVT residency question: "during the year" translated as "the past 12 months"
- File: `src/components/svt/form-residency-copy.ts`, `JA_RES.questions[2]` (line 44)
- English: "Your usual home during the year is in Australia"
- Current: `この1年間の普段の住まいがオーストラリアにある`
- Corrected: `申告する年度中、普段の住まいがオーストラリアにある`
- Why: `この1年間` means the last 12 months counted back from today, not the tax year being lodged. Residency test questions must be faithful.

### H3. Success step "Your return is reviewed and lodged with the ATO" changed meaning
- File: `src/lib/formStrings.ts`, key `stepRefund` (line 188)
- Current: `ATOへの提出と結果のご案内` ("lodging with the ATO and notifying you of the result")
- Corrected: `内容を確認し、ATOに提出します`
- Why: drops "reviewed" and adds a promise ("we tell you the result") that is not in the English.

### H4. "Last step" note adds "we explain" and has the wrong subject
- File: `src/lib/formStrings.ts`, key `checkResidencyNote` (line 98)
- English: "Last step: tax residency, then you can submit."
- Current: `最後のステップ：税務上の居住区分についてご説明し、その後送信いただけます。`
- Corrected: `最後のステップ：税務上の居住区分を確認したら、送信できます。`
- Why: "ご説明し" is added content (copied from the German), and the sentence mixes "we explain" with "you submit".

### M1. Tax resident term: use 税務上の居住者 everywhere
The brief's term (and 19 uses on the Japanese site) is `税務上の居住者`. The form uses `オーストラリア税務居住者` / `オーストラリアの税務居住者`, so the term is inconsistent within the form and with the site. Replace with `オーストラリアの税務上の居住者` in:
- `src/lib/formStrings.ts` `australianTaxResident` (line 278)
- `src/components/ui/ResidencyStep.tsx` `ja`: `residentName` (143), `condIntro` (145), `note` (152), `quizIntro` (153), `nonNdaResult` (166), `warn.leadPre` (171)
- `src/components/ui/ResidencyDeclaration.tsx` `ja`: `residentLabel` (69), `confirmP1strong` (76: `オーストラリアの税務上の居住者ではありません`), `confirmNote` (78)
- `src/components/ui/ResidencyFixPanel.tsx` `ja.resident` (20)
- `src/components/svt/form-residency-copy.ts` `JA_RES.quizIntro` (40), `JA_RES.residentLabel` (50)

Length: `オーストラリアの税務上の居住者` is 15 characters. It sits in full-width option cards that wrap, so it fits. For SVT also change `JA_RES.otherLabel` (51) from `非居住者（foreign resident）` to `税務上の非居住者（foreign resident）` to match English "Foreign resident for tax".

### M2. quizIntro (WHT and SVT): "on your residency" missing, 本当に is casual
- Files: `ResidencyStep.tsx` `ja.quizIntro` (153); `form-residency-copy.ts` `JA_RES.quizIntro` (40)
- Current (second paragraph): `最終的な判断は、当社がタックスリターンを提出した後にATOが行います。`
- Corrected (whole string, keep `\n\n`): `オーストラリアの税務上の居住者と見なされる（所得の最初の$18,200が非課税になる）には、以下の項目のほとんどが実際に当てはまっている必要があります。\n\n当てはまる場合は、「オーストラリアの税務上の居住者」を選択できます。居住区分の最終的な判断は、当社がタックスリターンを提出した後にATOが行います。`
- Why: "on your residency" was dropped; `本当に` reads as casual speech in a residency test; `税務居住者` term (M1). The SVT version should be identical.

### M3. WHM confirmation lead: "confirm that you understand" lost
- File: `ResidencyDeclaration.tsx` `ja.confirmLead` (74)
- Current: `ご回答に基づき、あなたのタックスリターンはワーキングホリデーメーカー（WHM）として提出されます。これが何を意味するかご確認ください：`
- Corrected: `ご回答に基づき、タックスリターンはワーキングホリデーメーカー（WHM）として提出されます。以下の内容を理解したうえでお進みください：`
- Why: English asks the customer to confirm that they understand. The Japanese only asks them to check what it means. This modal is shown to every Japanese passport holder, even on the English form (`languageForCountry`), so many people see it.

### M4. confirmNote: あなたの国の方 is blunt, wording loose
- File: `ResidencyDeclaration.tsx` `ja.confirmNote` (78)
- Corrected: `お客様の国籍の方は、条件によってはオーストラリアの税務上の居住者と認められ、非課税枠を受けられる場合があります。該当する可能性がある場合は、先に回答を見直してください。`
- Why: "sometimes qualify ... and keep the threshold" needs a conditional (条件によっては). `あなたの国の方` sounds abrupt in polite copy. "review first" is better as `先に見直して`.

### M5. Tax form title reads as an unfinished sentence
- File: `formStrings.ts` `titleTax` (200) / `titleTaxSub` (205)
- Current: h1 `お手続きを始めるために`, sub `簡単な情報をご入力ください`
- Corrected: h1 `基本情報を教えてください`, sub `お手続きを始めるために必要です`
- Why: as an h1 on its own, `〜ために` hangs ("in order to start the procedure"). English: "Tell us a bit about yourself / so we can get started". The new h1 is 12 characters, which fits the `nowrap` title (`clamp(15px, 5.2vw, 24px)`) on a 360 px phone. A longer `あなたについて教えてください` (14) may clip.

### M6. Thank-you heading for a missing name: `ありがとうございます、お客様！`
- File: `formStrings.ts` `thereName` (468) and `thankYouHeading` (599). Used by the super form.
- Why: Japanese does not address the reader as `お客様` in a heading like this, so it reads machine-made. Recommended: `thankYouHeading` returns `ありがとうございます！` for `ja` when `isRealName` is false (code change, so not a string fix). Related: the tax `FormClient.tsx` line 580 does `fullName.split(' ')[0]` without trim, so a leading space gives `ありがとうございます、さん！` (code, not Japanese copy).

### M7. Reference number uses half-width brackets and a space
- File: `src/lib/submit-tax-form.ts` line 309: `` t('somethingWrong') + ` (${t('refPrefix')}${ref})` ``
- Renders: `問題が発生しました。もう一度お試しいただくか、直接ご連絡ください。 (参照番号 AB12CD)`
- Corrected rendering for ja: `…ご連絡ください。（参照番号：AB12CD）`
- Why: full-width punctuation rule. This needs a small per-language format in code (as `thankYouHeading` does), so a string change alone cannot fix it. Change `refPrefix` ja to `参照番号：` at the same time.

### M8. "Additional income" is unnatural
- File: `formStrings.ts` `hasOtherIncome` (416)
- Current: `追加の収入はありますか？`
- Corrected: `ほかに収入はありますか？`
- Why: `追加の収入` is a literal calque. Natural Japanese for this question is `ほかに` / `その他の収入`. It is also used in the "is required" list (`ほかに収入はありますか？は必須項目です` is no worse than today).

### M9. Declaration error label `確認事項`
- File: `formStrings.ts` `sectionDeclaration` (45)
- Current: `確認事項` (shows as `確認事項は必須項目です`)
- Corrected: `同意事項`
- Why: in the tax form this key labels the "I agree to the Client Agreement and Privacy Policy" checkbox, and English is "Declaration". `確認事項` ("items to check") does not tell the customer what is missing.

### L1. linkUsedBody drops "we have your details"
- `formStrings.ts` `linkUsedBody` (159). Corrected: `ありがとうございます。ご入力内容はすでに受け付けています。変更したい点がある場合は、WhatsAppでご連絡ください。こちらで対応いたします。`

### L2. successNextLead
- `formStrings.ts` (184). Current `次の流れはこちらです：`. Corrected `今後の流れは次のとおりです：` (more natural).

### L3. stepWhatsApp
- `formStrings.ts` (187). Current `WhatsAppでご連絡`. Corrected `WhatsAppでご連絡します` (English is a full clause; the other two steps are full clauses after H3).

### L4. selfieHint drops "private"
- `formStrings.ts` (406). Corrected: `本人確認のために使用します。写真は外部に公開されることなく安全に管理され、確認が終わり次第すぐに削除されます。`

### L5. uploadFailedRequired grammar
- `formStrings.ts` (551). Current `…4MB未満の画像またはPDFかをご確認のうえ…`. Corrected: `必要なファイルをアップロードできませんでした。ファイルが4MB未満の画像またはPDFであることをご確認のうえ、もう一度お試しください。`

### L6. howHeard
- `formStrings.ts` (79). Current `どちらで当社をお知りになりましたか？`. Corrected `当社を何でお知りになりましたか？` (the answers are channels such as Instagram, not places).

### L7. givenNames loses "(s)"
- `formStrings.ts` `givenNames` (60). Current `名`. Suggested `名（ミドルネームを含む）`, matching `firstName` (59) and English "Given name(s)", so middle names are not left out of tax records.

### L8. Saving ellipsis
- `ResidencyFixPanel.tsx` `ja.saving` (20). `保存中...` → `保存中…` (as `submitting` already does).

### L9. Tax year term inconsistent
- `submit-tax-form.ts` `FIELD_LABELS.taxYear.ja` = `課税年度`, while `ResidencyStep.tsx` uses `税務年度` (154, 180). Pick one. `課税年度` is clearer.
- Also `FIELD_LABELS.marital.ja` = `婚姻状況` while the form label is `配偶者の有無` (`formStrings.ts` 76). Use `配偶者の有無` in both so the error names the field the customer sees.

### L10. SVT introEmph adds 種類
- `form-residency-copy.ts` `JA_RES.introEmph` (39). Current `ビザの種類とは別のものです。`. Corrected `ビザとは別のものです。` (English: "It is separate from your visa").

### L11. あなた
Polite Japanese UI copy usually leaves out `あなた`. Drop it where the subject is clear: `ResidencyDeclaration.tsx` `confirmLead`, `confirmLeadNonNda` (`あなたのタックスリターンは` → `タックスリターンは`), `confirmP1pre` (`あなたは` → empty).

### L12. Super form "accept terms" word order (structural)
- `formStrings.ts` `acceptTerms` (137) / `and` (139), rendered by `src/app/(site)/rh84sez58/FormClient.tsx` line 321 as `以下を読み、同意します： クライアント規約 および プライバシーポリシー`.
- Why: Japanese needs the objects before the verb. Strings alone cannot fix this. Move the super form to the tax form's marked `declaration` pattern (`{ca}クライアント規約{/ca}・{pp}プライバシーポリシー{/pp}を読み、同意します。`). This form is outside the nine-language scope, so it is low priority.

### L13. Japanese start page meta description differs from English
- `src/app/(ja)/ja/start/page.tsx` line 10: `…ATOへの提出前に、登録タックスエージェントが内容を確認し承認します。`
- The English page says "We prepare it, you sign it, we lodge it." The Japanese does not call the business a registered agent (rule respected), but it claims a review and approval step that the English does not mention. The page is noindex. Suggested, to match English: `オーストラリアのタックスリターンに必要な情報と書類をお送りください。当社が作成し、お客様の署名後にATOへ提出します。`

## Checked and fine (no change)
- `declTFN`, `declaration`, `mustConfirmDecl`, `mustAgree`: faithful.
- `ResidencyStep` `ja.questions` (6 WHT residency test questions): faithful. `intro`, `introEmph` (`在留資格とは異なります。` is correct. `ビザ（在留資格）とは別のものです。` would be plainer for WHMs; optional).
- `ResidencyDeclaration` `ja.intro`, `confirmLeadNonNda`, `confirmP2*`, `confirmYes`/`confirmNo`; `JA_RES` `declIntro`, `confirmLead`, `confirmYes`/`confirmNo`, `sessionLost*`, questions 1, 2, 4.
- `registeredAgentNo` (`監督するタックスエージェントの登録番号`): faithful to "Supervising registered tax agent no.". It names the supervising agent, not the business. `registeredTaxAgent` (`ワーホリ専門チーム`) matches its English "Working holiday specialists" despite the key name.
- FormStepper (`基本情報 / 収入について / 税務上の居住区分`, `ステップ 3/3`), LinkAfterPayment, `日本語`, `言語`.
- Button lengths: the longest Japanese button is `内容を理解しました。この回答で間違いありません` (`warn.btnConfirm`, which is not rendered). Every rendered button (`タックスリターンを送信 →`, `税務上の居住区分へ進む →`, `はい、WHMとして提出してください`) fits a full-width 56 px pill.

## Doubts
1. Unused copy: `ResidencyStep.tsx` `ja.whyTitle`, `whyBody`, `compare*`, `condIntro`, `conditions`, `note`, `yearNote`, `whmResult`, `nonNdaResult`, `warn.*`, and `ResidencyDeclaration` `answerAll`, are never rendered (`StepCopy` renders only 9 keys). I reviewed them anyway. `whmResult` adds `申告書作成時に当チームが確認します。`, which is not in the English (the German has it too). This is harmless while unused, but fix it if the copy comes back.
2. `yearNote` ("These apply to the tax year you're lodging") is not rendered in any language. Without it, WHT question 1 `オーストラリアに6か月以上住んでいる` has no time frame. This is an English-side product question, not a translation one.
3. `dobHint` (`例：2000/10/20`, year-first) is unused in the tax flow. If it is used, the format shown by the native date input depends on the browser locale, so check that they agree.
4. `paymentSummary` adds an explanation in brackets, and `phJob` / `otherIncomePh` / `phCountry` add `（英語でご入力ください）`. These additions help the reader and match the English-only rule. I left them.
5. `formStrings.ts` line 7 says the file carries Japanese, but `checkResidencyNote` (H4) looks copied from the German rather than the English. Other `ja` strings may have been translated from the German too. I compared every one with the English.

## Verdict
**Ready after fixes.** H1 to H4 (ABN declaration, SVT residency question, the stepRefund promise, the added "we explain") and M1 (tax resident term) should be fixed before release. M7 and M6 need small code changes. Everything else is polish.

## Applied 18 Nov

All changes are to Japanese strings only, plus small shared helpers. Covered by `src/lib/__tests__/form-review-fixes-de-ja-18nov.test.ts`.

**Must fix**
- H1: `declABN.ja` was replaced with the corrected text. It now includes "唯一の所有者", "始める" and "これまでに".
- H2: SVT `JA_RES.questions[2]` is "申告する年度中、普段の住まいがオーストラリアにある".
- H3: `stepRefund.ja` is "内容を確認し、ATOに提出します".
- H4: `checkResidencyNote.ja` is "最後のステップ：税務上の居住区分を確認したら、送信できます。"

**Should fix**
- M1: "オーストラリアの税務上の居住者" is now used in:
  - `australianTaxResident`
  - `ResidencyStep` `ja`: `whyBody`, `residentName`, `condIntro`, `note`, `quizIntro`, `nonNdaResult` and `warn.leadPre`
  - `ResidencyDeclaration` `ja`: `residentLabel`, `confirmP1strong` and `confirmNote`
  - `ResidencyFixPanel` `ja.resident`
  - SVT `JA_RES`: `quizIntro` and `residentLabel`

  SVT `otherLabel` is "税務上の非居住者（foreign resident）". No "税務居住者" is left in the form files.
- M2: `quizIntro` was rewritten for WHT and SVT. The two are identical, `\n\n` is kept, and the quoted label matches the radio label.
- M3: `confirmLead` is "…以下の内容を理解したうえでお進みください："
- M4: `confirmNote` was replaced with the corrected text.
- M5: `titleTax.ja` is "基本情報を教えてください" and `titleTaxSub.ja` is "お手続きを始めるために必要です".
- M6 (code): `thankYouHeading('ja', …, isRealName=false)` returns "ありがとうございます！". The tax form passes `isRealName` only when a name exists, and takes the first name with a trimmed `firstNameOf`, so a leading space no longer gives "、さん！".
- M7 (code): the new helper `refSuffix` in `formStrings.ts` is used by `submit-tax-form.ts`. Japanese renders "…ご連絡ください。（参照番号：AB12CD）", and `refPrefix.ja` is "参照番号：". Other languages are unchanged.
- M8: `hasOtherIncome.ja` is "ほかに収入はありますか？"
- M9: `sectionDeclaration.ja` is "同意事項".

**Polish**
- L1: `linkUsedBody` was replaced with the corrected text.
- L2: `successNextLead` now says "今後の流れは次のとおりです：".
- L3: `stepWhatsApp` is "WhatsAppでご連絡します".
- L4: `selfieHint` was replaced with the corrected text.
- L5: `uploadFailedRequired` was replaced with the corrected text.
- L6: `howHeard` is "当社を何でお知りになりましたか？".
- L7: `givenNames` is "名（ミドルネームを含む）".
- L8: `saving` is "保存中…".
- L9: `ResidencyStep` `yearNote` and `warn.read` now use 課税年度, and `FIELD_LABELS.marital.ja` is "配偶者の有無".
- L10: `introEmph` is "ビザとは別のものです。".
- L11: あなた was dropped from `confirmLead`, `confirmLeadNonNda` and `confirmP1pre`.
- L13: the `ja/start` meta description is "オーストラリアのタックスリターンに必要な情報と書類をお送りください。当社が作成し、お客様の署名後にATOへ提出します。"

**Not done**
- `whmResult` extra sentence (Doubt 1): the owner has not decided yet, so it is left as it is.
- L12 (super form consent word order): this needs the super form markup moved to the marked `declaration` pattern for all its languages. That is not a small, local string fix, so it was not done.
- Doubts 2 to 5: these needed no change, or are English-side product questions.
