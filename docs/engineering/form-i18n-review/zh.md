# Chinese (zh, Simplified) review of the tax form

Date: 18 Nov 2026. Scope: the tax return form flow for both brands.

## Verdict

**Ready after shared-file fixes.** The Working Holiday Tax form in Chinese is ready now: `src/lib/form-i18n/zh.ts` is corrected and reads naturally. The Student Visa Tax form shows its own older Chinese table (`src/components/svt/form-brand-svt.tsx`), which overrides most of `zh.ts`, so the same corrections do not reach students until that table is updated (section 3). Nothing found is legally wrong or misleading; the open items are softened instructions, wording quality and consistency.

## 1. What was checked

About 260 Chinese strings (259 by the table below), each against its English source:

| Where | Strings | Editable by me |
|---|---|---|
| `src/lib/form-i18n/zh.ts` | 86 | yes |
| `src/components/svt/form-brand-svt.tsx` (`ZH` table 75, `ZH_RES` 20) | 95 | no |
| `src/components/ui/ResidencyStep.tsx` (zh) | 14 | no |
| `src/components/ui/ResidencyDeclaration.tsx` (zh) | 17 | no |
| `src/components/ui/ResidencyFixPanel.tsx` (zh) | 12 | no |
| `src/lib/submit-tax-form.ts` (`FIELD_LABELS` zh) | 8 | no |
| `src/components/ui/FormStepper.tsx` (zh steps and "step x of y") | 4 | no |
| `src/lib/formStrings.ts` (zh entries, `thankYouHeading`, `joinFieldList`) | 13 | no |
| `src/lib/form-lang.ts` (`中文`), zh page titles, `SvtFormClosed.tsx` (zh) | 10 | no |

Checks that came out clean everywhere: no em dash, en dash or Chinese double dash; no mention of AI or bots; no claim that the business is a registered tax agent; no refund promise; all numbers and amounts unchanged ($18,200, $700, 4 MB, 10, 15 minutes, 24 hours, 6 months, 8 or 9 digits); all placeholders and markers intact (`{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`, `\n\n`); no Traditional characters mixed in; full-width punctuation throughout; TFN, ATO, Medicare, BSB, WhatsApp, WHM kept in English; 税务居民 used consistently; friendly "你" tone throughout (no 您). Superannuation and myGov do not appear in the tax form flow.

Student Visa Tax residency copy: `src/components/svt/form-residency-copy.ts` has **no** Chinese. It holds de, ja, es, fr, it, pt only. The student Chinese residency copy is `ZH_RES` in `src/components/svt/form-brand-svt.tsx`.

## 2. Changes made in `src/lib/form-i18n/zh.ts` (17 strings)

| Key | Before | After | Why |
|---|---|---|---|
| `englishOnlyNotice` | 你可以用中文看说明，但请尽量用英文填写答案。 | 你可以选择自己的语言查看说明，但请用英文填写答案。 | 尽量 ("if you can") softened a firm instruction; "choose your language" was missing. |
| `phJob` | …（请尽量用英文填写） | …（请用英文填写） | Same softening. |
| `otherIncomePh` | …（请尽量用英文填写） | …（请用英文填写） | Same softening. |
| `phCountry` | 例如：China（请尽量用英文填写） | 例如：China（请用英文填写） | Same softening. |
| `registeredAgentNo` | 本服务由注册税务代理人监督，TPB 编号 | 负责监督的注册税务代理人编号 | English is "Supervising registered tax agent no."; "TPB" and "this service" were added. Still names supervision, still does not say the business is registered. |
| `phGiven` | 按护照上的拼音（英文字母）填写，例如 WEI | 与护照上的英文拼写完全一致，例如 WEI | "Exactly" was lost. 拼音 is mainland-only: Taiwan and Hong Kong passports are not in pinyin. |
| `phLast` | 按护照上的拼音填写，例如 ZHANG | 与护照上的英文拼写一致，例如 ZHANG | Same. |
| `single` | 未婚 | 单身 | 未婚 means "never married" and leaves divorced or widowed people with no option; "Single" is 单身. Display only: the value sent stays `Single`. |
| `invoicesHint` | 最多可以免费上传 10 张发票。 | 最多可以免费上传 10 张收据或发票。 | 发票 alone reads as an official tax invoice, so a shop receipt seems not to count. Matches the field label and the German and Japanese lines. See doubt 1. |
| `homeCountry` | 你来自哪个国家 | 你来自哪个国家或地区 | Standard neutral wording; comfortable for Hong Kong and Taiwan customers. |
| `phHowHeard` | 例如：小红书、微信、朋友推荐 | 例如：小红书、Instagram、朋友推荐 | Examples cover mainland and Taiwan/Hong Kong users; closer to the English (Instagram). |
| `selfieWithPassport` | 手持护照的自拍 | 手持护照的自拍照 | 自拍 alone is the act; the thing uploaded is a 自拍照. |
| `uploadSelfie` | 上传手持护照的自拍 | 上传手持护照的自拍照 | Same. |
| `selfieHint` | 用来核实你的身份。照片会被安全、保密地保存，核实后立即删除。 | 用于核实你的身份。你的照片会安全保密地保存，核实后立即删除。 | "会被…地保存" is a machine-style passive. Meaning unchanged. |
| `declaration` | 我已阅读并同意{ca}Client Agreement（客户协议）{/ca}和{pp}Privacy Policy（隐私政策）{/pp}。 | 我已阅读并同意 {ca}Client Agreement（客户协议）{/ca}和 {pp}Privacy Policy（隐私政策）{/pp}。 | Spacing only: a space between Chinese and the English link names, as in the rest of the file. Wording untouched. |
| `fileTooLarge` | 这个文件太大了，请用 4 MB 以内的文件。PDF 可以先压缩，或者拍照后上传。 | 这个文件太大，无法上传。请使用 4 MB 以内的文件。如果是 PDF，可以先压缩，或者改为给文件拍照后上传。 | "Too large to upload" and "photograph the document instead" were blurred. |
| `successNextLead` | 我们已收到你的资料。接下来是这样的： | 我们已收到你的资料。接下来的流程如下： | "接下来是这样的" is a literal rendering of "here's what happens next". |

The file header still says it was written by an agent and not checked by a native speaker: a test requires that line, and this review was also done by an agent, so it stays true.

Verification: `npx tsc --noEmit -p .` clean. `npx jest --forceExit src/lib/__tests__/form-nine-languages-18nov` 42 of 42 pass. No test pinned a string I changed.

## 3. Proposed changes in shared files (not edited)

### 3a. `src/components/svt/form-brand-svt.tsx`, `ZH` table (Student Visa Tax form). Most important.

These keys override `zh.ts` for students, so students still see the old text.

| Key | Current | Corrected |
|---|---|---|
| `phJob` | 例如：Barista、Delivery rider（请尽量用英文填写） | 例如：Barista、Delivery rider（请用英文填写） |
| `otherIncomePh` | 例如：海外收入、利息、股票、租金（请尽量用英文填写） | 例如：海外收入、利息、股票、租金（请用英文填写） |
| `registeredAgentNo` | 本服务由注册税务代理人监督，TPB 编号 | 负责监督的注册税务代理人编号 |
| `phGiven` | 按护照上的拼音（英文字母）填写，例如 WEI | 与护照上的英文拼写完全一致，例如 WEI |
| `phLast` | 按护照上的拼音填写，例如 ZHANG | 与护照上的英文拼写一致，例如 ZHANG |
| `invoicesHint` | 最多可以免费上传 10 张发票。 | 最多可以免费上传 10 张收据或发票。 |
| `homeCountry` | 你来自哪个国家 | 你来自哪个国家或地区 |
| `selfieWithPassport` | 手持护照的自拍 | 手持护照的自拍照 |
| `uploadSelfie` | 上传手持护照的自拍 | 上传手持护照的自拍照 |
| `selfieHint` | 用来核实你的身份。照片会被安全、保密地保存，核实后立即删除。 | 用于核实你的身份。你的照片会安全保密地保存，核实后立即删除。 |
| `declaration` | 我已阅读并同意{ca}Client Agreement（客户协议）{/ca}和{pp}Privacy Policy（隐私政策）{/pp}。 | 我已阅读并同意 {ca}Client Agreement（客户协议）{/ca}和 {pp}Privacy Policy（隐私政策）{/pp}。 |
| `fileTooLarge` | 这个文件太大了，请用 4 MB 以内的文件。PDF 可以先压缩，或者拍照后上传。 | 这个文件太大，无法上传。请使用 4 MB 以内的文件。如果是 PDF，可以先压缩，或者改为给文件拍照后上传。 |
| `successNextLead` | 我们已收到你的资料。接下来是这样的： | 我们已收到你的资料。接下来的流程如下： |
| `stepRefund` | 提交报税并告知结果 | 审核你的报税表并提交给 ATO (see doubt 2) |

Simpler alternative: delete from the `ZH` table every key whose text is meant to equal the shared one, keeping only the student-specific ones (`hasMedicare` with the OSHC note, `phJob`, `invalidPhone`, and `stepRefund` if it is meant to differ). Students then get `zh.ts` automatically. The table has no `single`, so students already see the corrected 单身.

### 3b. `src/components/svt/form-brand-svt.tsx`, `ZH_RES` (student residency step)

| Key | Current | Corrected | Why |
|---|---|---|---|
| `questions[3]` | 你在读书期间在澳洲有工作或其他生活上的关联 | 你在读书期间在澳洲有工作或其他联系 | English is "work or have other ties"; 生活上的 is added. Residency test wording should not be embellished. |
| `confirmLead` | 你选择了非澳洲税务居民。这意味着 $18,200 的免税额度和低收入税收抵免（LITO）都不适用，从第一澳元起就要交税。在向 ATO 递交之前，我们会再帮你核实一遍。 | 你选择了非澳洲税务居民。这意味着 $18,200 的免税额度和低收入税收抵免（Low Income Tax Offset）都不适用，从第一澳元起就要交税。在提交任何内容之前，我们会核对你的回答。 | Last sentence added "to the ATO" and "once more"; English is "We check your answer before anything is lodged." Term now matches the working holiday copy. |
| `confirmYes` | 是的，没有问题 | 是的，没错 | English is "Yes, this is correct"; 没有问题 reads as "no problem". |
| `quizIntro` (last sentence) | 最终由 ATO 在我们为你提交报税后，决定你的居民身份。 | 在我们为你提交报税后，最终由 ATO 决定你的税务居民身份。 | Word order was awkward; same meaning. |
| `secure` | 你的信息会被安全、保密地保存。 | 你的信息会安全保密地保存。 | Machine-style passive. |

### 3c. `src/components/ui/ResidencyStep.tsx`, zh block

| Key | Current | Corrected | Why |
|---|---|---|---|
| `quizIntro` (last sentence) | 最终由 ATO 在我们为你提交报税后，决定你的居民身份。 | 在我们为你提交报税后，最终由 ATO 决定你的税务居民身份。 | Same as 3b. |

The six questions are faithful, including the country list (英国、德国、日本、智利、芬兰、以色列、挪威、土耳其). No change.

### 3d. `src/components/ui/ResidencyDeclaration.tsx`, zh block

| Key | Current | Corrected | Why |
|---|---|---|---|
| `secure` | 你的信息会被安全、保密地保存。 | 你的信息会安全保密地保存。 | Same as 3b. |

Declaration intro, labels and the WHM confirmation lines are faithful. No change.

### 3e. `src/components/ui/ResidencyFixPanel.tsx`, zh

| Key | Current | Corrected | Why |
|---|---|---|---|
| `saving` | 正在保存... | 正在保存… | Three half-width dots; the form itself uses `…` (`正在提交…`). |

### 3f. `src/lib/formStrings.ts`

| Key | Current | Corrected | Why |
|---|---|---|---|
| `single.zh` | 未婚 | 单身 | Same as section 2. Overridden by `zh.ts` on the tax form, but other forms would still show it. |
| `phCountry.zh` | 例如：中国（请尽量用英文填写） | 例如：China（请用英文填写） | The example tells the customer to write in English but shows Chinese. Overridden on the tax form. |
| `phHowHeard.zh` | 例如：小红书、微信、朋友推荐 | 例如：小红书、Instagram、朋友推荐 | Optional, for consistency. |

### 3g. `src/lib/submit-tax-form.ts`, `FIELD_LABELS`

| Key | Current | Corrected | Why |
|---|---|---|---|
| `taxStatus.zh` | 税务身份 | 税务居民身份 | Optional: same term as the step name and the residency page. |

## 4. Doubts for the owner

1. `invoicesHint`: English says "Add up to 10 invoices for free." I wrote "receipts or invoices" because 发票 is narrower than "invoice". If the limit is meant for invoices only, revert to `最多可以免费上传 10 张发票。`
2. Student `stepRefund` (`提交报税并告知结果`, "we lodge and tell you the result") does not match the English the student form shows ("Your return is reviewed and lodged with the ATO"). A code comment says the student wording avoids implying a refund; the corrected line does not mention a refund either. Owner to choose.
3. `auPhone` is `澳洲手机号码` (mobile) while English says "phone number". Left as is, because the validation message asks for a mobile number.
4. `yes` / `no` are `是` / `否`. For "do you have…" questions spoken Chinese answers 有 / 没有, but one shared pair serves every question and `invoicesRequired` quotes "否", so I kept it.
5. `fileErrorGeneric` drops "valid" (as Japanese does) and uses `4 MB 以内` for "under 4 MB". Harmless; left.
6. Example phone numbers and names are localized (+86, WEI, ZHANG), as in German and Japanese. Taiwan and Hong Kong customers will still understand them.
7. `thereName` has no Chinese. The tax form does not use it today; if it ever does, the heading would read "谢谢你，there！".
