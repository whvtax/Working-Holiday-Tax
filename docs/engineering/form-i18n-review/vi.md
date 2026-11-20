# Vietnamese form review (vi), 18 Nov 2026

Scope: `src/lib/form-i18n/vi.ts` (the only file edited), checked against the English in `src/lib/formStrings.ts`. Also read: the Vietnamese strings in `src/components/svt/form-brand-svt.tsx` (VI, VI_RES), `src/components/ui/ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `FormStepper.tsx`, `src/lib/submit-tax-form.ts` (FIELD_LABELS), the `vi` entries in `formStrings.ts`, `src/lib/form-lang.ts` and `FormLanguageToggle.tsx`.

## Numbers

- `vi.ts`: 86 strings checked, 14 changed.
- Shared files: about 120 more Vietnamese strings read (SVT VI + VI_RES, residency step, declaration, fix panel, stepper, field labels, `formStrings` vi entries). None edited.
- Checks: `npx tsc --noEmit -p .` is clean. `npx jest --forceExit src/lib/__tests__/form-nine-languages-18nov` passes 42 of 42. No pinned test string needed a change.
- Hard rules: `vi.ts` has no em or en dashes, does not mention AI or bots, and makes no registration claim (the seal line still says "giám sát", supervised). All placeholders are intact (`{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`). No prices or numbers changed. TFN, ABN, ATO, BSB, Medicare and WhatsApp stay in English. The tone uses "bạn" throughout; the declaration and the WhatsApp prefill speak as the customer ("Tôi", "Mình").

## Changes in vi.ts

| Key | Before | After | Why |
|---|---|---|---|
| givenNames | Tên (Given names) | Tên đệm và tên (Given names) | In Vietnamese, "Tên" means only the last word of the name (e.g. "An"). Customers would leave out the middle name (Văn, Thị). The English "Given name(s)" includes middle names. |
| phLast | Viết không dấu, ví dụ NGUYEN | Như trên hộ chiếu, ví dụ NGUYEN | The English is "As shown on your passport". The passport reference had been dropped. The example already shows the name without diacritics. |
| whatsapp | Số WhatsApp bạn dùng để nhắn cho chúng tôi | Số WhatsApp bạn đã dùng để nhắn cho chúng tôi | The English is past tense ("messaged us from"). |
| timeEstimate | ⏱ Khoảng 1 phút | ⏱ Mất khoảng 1 phút | The English says "Takes about"; without "Mất" it reads as a timestamp. |
| titleTaxSub | để chúng tôi bắt đầu | để chúng tôi có thể bắt đầu | Reads more naturally; matches "so we can get started". |
| registeredAgentNo | ...đại lý thuế đã đăng ký, mã số đại lý thuế | ...đại lý thuế đã đăng ký, số đăng ký | The old text repeated "đại lý thuế". The number that follows is a registration number. The supervision wording is kept, with no claim that the business is registered. |
| checkResidency | Tiếp tục: tình trạng cư trú về thuế → | Tiếp tục: cư trú về thuế → | Shorter for a 56px pill button on a phone. Matches the stepper label "Cư trú về thuế". |
| tooMany | Bạn gửi quá nhiều lần. | Bạn đã gửi quá nhiều lần. | Tense: this happened already. |
| refPrefix | mã | mã tham chiếu | It is shown as "(mã ABC123)", which a customer could take for a discount code or TFN. "reference" is "mã tham chiếu". |
| fileErrorGeneric | ...ảnh hoặc PDF dưới 4 MB. | ...ảnh hoặc PDF hợp lệ dưới 4 MB. | "valid" was missing. |
| fileTooLarge | Tệp này quá lớn. | Tệp này quá lớn nên không tải lên được. | "too large to upload" was shortened; restored. |
| uploadFailedRequired | ...kiểm tra tệp là ảnh hoặc PDF... | ...kiểm tra xem giấy tờ của bạn có phải là ảnh hoặc PDF dưới 4 MB không, rồi thử lại. | The old sentence was ungrammatical ("kiểm tra tệp là"). It now follows the English "check your documents are...". |
| linkUsedBody | ...chúng tôi sẽ lo phần còn lại. | ...bạn cứ nhắn cho chúng tôi qua WhatsApp, chúng tôi sẽ xử lý giúp bạn. | The English is "we will take care of it" (that change), not "the rest". The new wording is warmer and more natural. |
| thankYou | Cảm ơn | Cảm ơn bạn | The heading is built as "{thankYou}, {name}!". "Cảm ơn, Minh!" sounds abrupt; "Cảm ơn bạn, Minh!" is natural. |

Strings left alone because they are correct and natural include: englishOnlyNotice, waHint, hasMedicare, expensesQuestion, declaration (faithful, document names kept in English with a Vietnamese gloss), bankStatementHint, selfieHint, stepRefund (names the ATO, no refund promise) and all validation lines.

## Proposed shared-file changes (not edited)

1. **`src/components/svt/form-brand-svt.tsx`, `const VI`**: Student Visa Tax has its own Vietnamese block, and it overrides the shared one. None of the fixes above reach SVT customers. To align it, apply the same before and after text to these keys in that object:
   `givenNames`, `phLast`, `whatsapp`, `timeEstimate`, `titleTaxSub`, `registeredAgentNo`, `checkResidency`, `tooMany`, `refPrefix`, `fileErrorGeneric`, `fileTooLarge`, `thankYou`.
   Separately, its `invoicesHint` is "Bạn có thể tải lên tối đa 10 biên lai hoặc hóa đơn." This drops "for free" from the English "Add up to 10 invoices for free." If leaving that out was deliberate for SVT, keep it. Otherwise use: "Bạn có thể tải lên tối đa 10 biên lai hoặc hóa đơn, không mất phí."
2. **`src/components/svt/form-brand-svt.tsx`, `VI_RES.otherLabel`**: currently "Người không cư trú về thuế". Suggested: "Người không cư trú về thuế (foreign resident)". The English is "Foreign resident for tax". Keeping the ATO term, as the zh and de copies do, helps the customer match it to ATO pages.
3. **`src/components/ui/ResidencyStep.tsx`, `vi.questions[5]`**: "...một nước NDA: Anh, Đức, ..." should say "...một nước NDA: Vương quốc Anh, Đức, ...". "Anh" alone means England; the English says "UK".
4. **`src/components/ui/ResidencyStep.tsx`, `vi.questions[3]`**: "Bạn có công việc lâu dài ở Úc" should be "Bạn có công việc ổn định, thường xuyên ở Úc". The English "ongoing work" means continuing work; "lâu dài" suggests a permanent job. This is a minor point, and the meaning is close either way.
5. **`src/lib/formStrings.ts`, `phCountry.vi`**: "Ví dụ: Việt Nam (vui lòng ghi bằng tiếng Anh)" contradicts itself: it asks for English but gives a Vietnamese example. Change it to "Ví dụ: Vietnam (vui lòng ghi bằng tiếng Anh)" to match `vi.ts`. The form does not show this string today, because the `vi` block wins.
6. **`src/app/(site)/start/FormClient.tsx`, line 580** (code, not wording): `const firstName = fullName.split(' ')[0]` uses the first word of Given names. For Vietnamese names this is usually the middle name ("VAN AN" gives "Cảm ơn bạn, VAN!"). Using the last word for `vi`, or simply "Cảm ơn bạn!", would avoid this. The new "Tên đệm và tên" label makes it more likely that customers enter the middle name, which the tax return needs.

The Vietnamese in `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `FormStepper.tsx`, `FIELD_LABELS`, `FORM_LANG_NAMES` ("Tiếng Việt") and the rest of `VI_RES` reads correctly and faithfully.

## Student Visa Tax residency copy

`src/components/svt/form-residency-copy.ts` has **no** Vietnamese block. It holds de, ja, es, fr, it and pt only. SVT's Vietnamese residency copy (`VI_RES`) is in `src/components/svt/form-brand-svt.tsx` and is wired in `residency.copy.vi`. It has 4 questions, never mentions working holiday makers, and is faithful to `EN_RES`, apart from the label noted in item 2.

## Doubts

- **"tax resident" term**: the brief's glossary says "cư dân thuế". The repository uses "người cư trú (về) thuế" almost everywhere (several hundred matches in `src/`, against 2 for "cư dân thuế"), including the residency step and declaration. `vi.ts` itself only says "cư trú về thuế" (tax residency), which is correct. I kept the existing term for consistency, since both are understood. Switching would mean a site-wide change, not a form fix.
- **No diacritics on passport names**: `phGiven` says "Viết không dấu, đúng như trên hộ chiếu" (write without diacritics, as on the passport). This adds to the English, but it is useful, because the answers must be in English. It is worth confirming against a current Vietnamese passport data page.
- **`sectionDeclaration` = "Xác nhận đồng ý"**: kept. The section holds only the agreement tick box. A more literal "Cam đoan" would sound heavier than the English "Declaration" does here.
- **Example numbers**: `phWaNumber` and `invalidPhone` use a +84 example instead of the English +44. This is a localised example, not a price or rule, and I left it.

## Verdict

**Ready after shared-file fixes.** The Working Holiday Tax Vietnamese form (`vi.ts`) is ready now. The Student Visa Tax Vietnamese form needs item 1 applied to `form-brand-svt.tsx` to get the same corrections. Items 2 to 6 are recommended but do not block launch.

## Applied 18 Nov

Item 1 is resolved: the student form keeps only the student answers (OSHC note, job example) and takes every other word from vi.ts. Applied now: 2 ("(foreign resident)"), 4 ("công việc ổn định, thường xuyên"), 5 (phCountry "Vietnam"), 6 (the thank-you screen greets with the last given name for Vietnamese). Item 3 ("Vương quốc Anh") was already in the code.
