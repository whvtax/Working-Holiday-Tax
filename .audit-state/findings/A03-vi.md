# A03: Vietnamese language review (Student Visa Tax)

Agent: A03, native Vietnamese reviewer. Branch svt-build, baseline d9dbac0. Read only; no repo file changed except this one.
Reader modelled: Vietnamese student, 20 to 26, in Australia, on a phone. Register expected: neutral, "bạn" for the reader, "chúng tôi" for the business on the site; "bên mình"/"mình" in the WhatsApp fixed texts (by decision, kept).

## Summary

The Vietnamese copy is written natively, not machine-translated. Sentence rhythm, particles and word order are those of a Vietnamese writer; the English was clearly used as a brief, not translated line by line. Numbers, dates, thresholds, visa names and conditions match the English in every file compared (home, guides, blog, all 13 long batches, contact, form, UI strings). Diacritics render correctly in Be Vietnam Pro at 390px and 1280px on every page opened; no tofu, no horizontal overflow, no truncated visible text.

Hard-rule scan over every customer-facing Vietnamese file: no em dash, en dash, horizontal bar or Chinese double dash; no AI or bot mention; no "chúng tôi là đại lý thuế" claim (only supervision and sign-off wording); no refund promise; residency always "có thể là" / "thường"; fees $220 / $385 "đã gồm GST" everywhere they appear; no mention of Working Holiday Tax.

One must-fix: a repeated spelling confusion "làm thuế" (do tax) for "làm thuê" (work as an employee) in two ABN articles, which reverses the meaning of the sentence for the reader. The rest is terminology consistency and a few optional polish items.

Counts: 1 must-fix (HIGH), 5 should-fix (MEDIUM/LOW), 11 optional (LOW/INFO). No CRITICAL.

## Must-fix

### A03-1 "người làm thuế" / "đi làm thuế" where "thuê" (employee) is meant
- Severity: HIGH
- File: /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-07.ts
- Slugs: abn-invoicing-international-students (lines 579, 581), abn-business-expenses-international-students (lines 639, 655, 661)
- Evidence (current text):
  - l.579: `ABN không dành cho công việc bạn làm với tư cách người làm thuế, kể cả khi công việc đó được gọi là “contracting”.`
  - l.581: `...có thể bạn thực chất là người làm thuế, có quyền được trả lương tối thiểu và đóng super...`
  - l.639: `- Kiểm tra bạn thật sự đang kinh doanh, không phải đang làm thuế`
  - l.655: `Khi bạn đi làm thuế, chủ lao động trừ thuế từ mỗi kỳ lương.`
  - l.661: `Du học sinh từng đi làm thuế thường quen dùng quy định dành cho người làm thuế, nhưng quy định cho kinh doanh...` (two occurrences on this line)
  - English equivalents (batch-07 en, same slugs) say "employee" / "working as an employee".
- Problem: "làm thuế" means "doing tax (work)"; "làm thuê" means "working for someone / being an employee". On a tax site the misspelling is read literally as "tax preparer", so the sentence "ABN is not for work you do as a tax preparer" is wrong and confusing. Note the same phrase "người làm thuế" is used correctly as "tax preparer" in tfn-scams and who-can-ask-for-tfn (batch-07 lines 313, 332, 392, 470, 472, 483); those must stay.
- Fix (exact): in the six occurrences above, replace `làm thuế` with `làm thuê` (l.579 `người làm thuê`, l.581 `người làm thuê`, l.639 `đang làm thuê`, l.655 `đi làm thuê`, l.661 `đi làm thuê` and `người làm thuê`).
- Verify: `grep -n "làm thuế" src/lib/svt/content/long/vi/batch-07.ts` returns only the tfn-scams / who-can-ask-for-tfn lines; open /vi/blog/abn-invoicing-international-students and /vi/blog/abn-business-expenses-international-students and read the "ABN không dành cho..." sentence.
- Leave unchanged? No. A Vietnamese reader sees a meaning error in exactly the sentence that decides whether they should have an ABN.

## Should-fix

### A03-2 "lương phạt" for penalty rates (standard term elsewhere: "lương phụ trội")
- Severity: MEDIUM
- File: /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-04.ts, lines 241, 806, 810, 815
- Evidence: l.241 `lương phạt (penalty rates)`; l.806 `lương phạt theo ca (shift penalties)`; l.810 `lương phạt theo ca`; l.815 `lương phạt ca Chủ nhật`. The rest of the site uses "lương phụ trội" 61 times for penalty rates.
- Problem: "lương phạt" literally reads as "penalty wage / fine", which a student can read as a deduction from pay, the opposite of a loading. It is also inconsistent with the term the reader has seen on every other page.
- Fix: l.241 `lương phụ trội (penalty rates)`; l.806 `lương phụ trội theo ca (shift penalties)`; l.810 `lương phụ trội theo ca`; l.815 `lương phụ trội ca Chủ nhật`.
- Verify: `grep -rn "lương phạt" src/lib/svt/content` returns nothing.
- Leave unchanged? Tolerable but misleading; recommend fixing in the same pass as A03-1.

### A03-3 "phụ cấp tăng lương (loadings)"
- Severity: LOW
- File: /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-04.ts, line 241
- Evidence: `phụ cấp tăng lương (loadings)`; elsewhere "phụ cấp casual" (48 times) or "phụ cấp (loading, allowance)".
- Problem: "phụ cấp tăng lương" means "pay-rise allowance", not a loading.
- Fix: `phụ cấp (loadings)` or, if casual loading is meant, `phụ cấp casual (casual loading)`.
- Leave unchanged? Acceptable, minor.

### A03-4 Untranslated "Casual loading" in the super-for-casual article
- Severity: LOW
- File: /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-04.ts, lines 800 to 809 (slug super-for-casual-student-workers)
- Evidence: body bullets use "Casual loading" / "casual loading" bare, and "thu nhập đủ điều kiện (qualifying earnings)", while batch-02 uses "thu nhập tính super (qualifying earnings)" and the rest of the site "phụ cấp casual".
- Fix: `phụ cấp casual (casual loading)` on first use, then `phụ cấp casual`; `thu nhập tính super (qualifying earnings)`.
- Verify: open /vi/blog/super-for-casual-student-workers.
- Leave unchanged? Acceptable; the English term is understood by students, but it breaks the site's own term.

### A03-5 Fair Work Ombudsman gloss and two glosses in batch-05
- Severity: LOW
- File: /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-05.ts
- Evidence: l.14 `Fair Work Ombudsman (Thanh tra Lao động Công bằng)` while the site uses "Thanh tra Công bằng Lao động" 61 times; l.53 `tờ khai số thuế (tax file number declaration)` while elsewhere "tờ khai mã số thuế" / "tờ khai TFN"; l.84 `người cư trú tạm thời` while elsewhere "người tạm trú".
- Fix: l.14 `Fair Work Ombudsman (Thanh tra Công bằng Lao động)`; l.53 `tờ khai mã số thuế (tax file number declaration)`; l.84 `người tạm trú`.
- Leave unchanged? Acceptable; consistency only.

### A03-6 Straight quotes in a few places where the rest of the site uses curly quotes
- Severity: LOW
- Files: batch-04.ts (3 lines: `"không"`, `"Tax ready"`), batch-06.ts (1 line), batch-12-deductions.ts (2 lines)
- Evidence: `grep -n '"[^"]*"' ` inside the Vietnamese string literals shows ASCII quotes; everywhere else the copy uses “ ”.
- Fix: replace with “ ” in those six lines.
- Leave unchanged? Yes, purely typographic.

## Optional

### A03-7 Terminology variants (choose one per term)
- Severity: INFO
- TPB: `Hội đồng Người hành nghề Thuế` (batch-02 l.7) vs `Hội đồng hành nghề thuế` (batch-07 l.355, 418) vs plain "Tax Practitioners Board" (15 times). Suggest `Tax Practitioners Board (TPB)` first use, then TPB.
- LITO: `giảm thuế thu nhập thấp` (batch-11 l.513, 579, 587, 663) vs `khoản giảm thuế cho thu nhập thấp` elsewhere.
- DASP: `khoản chi trả super khi rời Úc` (batch-00 l.712, batch-11 l.537) vs `khoản super khi rời Úc`.
- Taxed element: `phần đã đóng thuế (taxed element)` (batch-06 l.50, batch-07 l.144) vs `phần đã chịu thuế`.
- Cents per km: `xu mỗi km` (batch-10) vs `cent mỗi km` elsewhere; "cent" is what students say.
- Leave unchanged? Yes.

### A03-8 Example person named "Anh" referred to as "cô"
- Severity: INFO
- File: batch-00.ts lines 870 to 879. "Anh" is also the second-person pronoun; a sentence like "Anh ... cô ấy" momentarily reads as two people. Suggest renaming the example to "Lan" or "Hương".
- Leave unchanged? Yes.

### A03-9 "nộp đơn vào ngày thứ 3" after a "Thứ Hai" bullet
- Severity: INFO
- File: batch-00.ts line 557. "ngày thứ 3" can be read as "Tuesday". Suggest `vào ngày thứ ba` or `ba ngày sau`.
- Leave unchanged? Yes.

### A03-10 Home meta title "du học sinh Úc"
- Severity: INFO
- File: /home/claude/work/whvtax/src/lib/svt/content/home-vi.ts, meta.title `Khai thuế, hoàn thuế cho du học sinh Úc`. "Du học sinh Úc" can be read as "Australian students abroad". `du học sinh tại Úc` is unambiguous. Rendered title confirmed in browser.
- Leave unchanged? Yes; most readers resolve it correctly.

### A03-11 i18n trust.myGov differs in meaning from English
- Severity: INFO
- File: /home/claude/work/whvtax/src/lib/svt/i18n.ts, vi `trust.myGov: 'Không dịch vụ khai thuế uy tín nào hỏi thông tin đăng nhập myGov của bạn.'` vs en "A registered tax agent will never ask for your myGov login details." Chinese has the same rewrite, so this looks deliberate; the Vietnamese is a true statement and not a stronger promise. Rendered on /vi home (screenshot).
- Leave unchanged? Yes.

### A03-12 Contact page hours sentence
- Severity: INFO
- File: /home/claude/work/whvtax/src/components/svt/pages/ContactPage.tsx line 86: `ngoài giờ thì sáng hôm sau của ngày làm việc kế tiếp.` reads slightly tangled. Suggest `ngoài giờ thì chúng tôi trả lời vào sáng ngày làm việc kế tiếp.` Also `Thứ Hai đến thứ Sáu` mixes capitalisation; `Thứ Hai đến Thứ Sáu`.
- Leave unchanged? Yes.

### A03-13 Header deductions menu "Chăm sóc" for Aged care
- Severity: INFO
- File: /home/claude/work/whvtax/src/components/svt/Header.tsx line 16. "Chăm sóc" alone is vague; `Chăm sóc người già` still fits the one-or-two-words rule loosely (three words). Other labels are fine.
- Leave unchanged? Yes.

### A03-14 "Menu" button label untranslated on /vi
- Severity: INFO
- File: /home/claude/work/whvtax/src/lib/svt/i18n.ts line 157 `menu: 'Menu'`. "Menu" is the normal word on Vietnamese sites; no change needed. Noted because the brief asked to list anything left in English.
- Leave unchanged? Yes.

### A03-15 Form string ends with the English control value "No"
- Severity: INFO
- File: /home/claude/work/whvtax/src/components/svt/form-brand-svt.tsx, vi `invoicesRequired` ends `...đổi câu trả lời ở trên thành No.` Correct if the toggle shows "No"; if the toggle is localised to "Không", change to match. Form is closed in this build, so not verified in the browser.
- Leave unchanged? Yes if the control reads "No".

### A03-16 Article date in ISO form
- Severity: INFO
- Rendered "Cập nhật 2026-10-27" on article pages (screenshot 390_vi_blog_abn-invoicing-international-students.png). Vietnamese readers expect 27/10/2026; shared component, all locales use ISO, so a design decision rather than a language fault.
- Leave unchanged? Yes.

### A03-17 WhatsApp fixed texts: guarantee sentence omits "after the Notice of Assessment"
- Severity: INFO
- File: /home/claude/work/whvtax/src/lib/will/svt-fixed-texts.ts lines 60, 61: `Nếu tiền hoàn thuế thấp hơn phí của bên mình, bên mình sẽ trả lại bạn phần chênh lệch.` The Chinese and English fixed texts say the same without the timing, so it matches the approved wording; the full guarantee with timing is on the site. Not a promise of a refund amount. No change proposed.
- Leave unchanged? Yes.

## What was checked and found correct (no finding)

- Register: "bạn" for the reader and "chúng tôi" for the business throughout the site; "mình" appears only in the customer's own voice (`whatsappHello`, `whatsappAbout`) and in the WhatsApp fixed texts ("bên mình"/"mình"), which is the agreed register there.
- Terminology used consistently: TFN, ABN, ATO, Medicare left as acronyms; "super" / "quỹ hưu" (super dominant, quỹ hưu as gloss); "hoàn thuế", "khai thuế", "tờ khai thuế", "cư trú về thuế" (527 uses), "người tạm trú", "Thanh tra Công bằng Lao động", "lương phụ trội", "phụ cấp casual".
- Numbers and conditions vs English: resident rates and thresholds, foreign resident 30% from the first dollar, LITO tiers, 47% no-TFN withholding, Medicare levy 2% and MES up to 8 weeks, super guarantee 12% and Payday Super from 1/7/2026 (7 and 20 business days), DASP 35/45/65%, unclaimed super after 6 months, GST $75,000 and ride-sourcing from the first trip, 88c up to 5,000 km, penalty unit $364 and $1,820 max, 2 Nov 2026 deadline, min wage $26.44 and casual $33.05, part-year threshold formula, TRS $300 within 60 days, standard deduction $1,000 from 2026-27, 14 days / 28 days / 12-30-50 days, visa 500 and 485. Every worked example's arithmetic re-computed and correct.
- Hard rules: no em/en dash or ―/—— in any customer-facing VI file (Python scan `[–—―]|——`; only hits are in 3 test files); no AI/bot mention; no "we are a registered tax agent"; supervision and sign-off wording matches the fixed English in i18n, home, guides, contact, form; residency always "có thể là" / "thường"; fees $220 / $385 "đã gồm GST" in i18n ctaPrice, home, pricing, contact, batch-11 l.801, fixed texts; no WHT mention or link.
- Browser (Playwright, chromium, 390x844 and 1280x900, GTM/GA stubbed): /vi, /vi/pricing, /vi/tax-residency, /vi/medicare, /vi/blog, /vi/contact, /vi/blog/abn-invoicing-international-students, /vi/blog/what-is-a-tfn-international-students. All 200, `lang="vi"`, Be Vietnam Pro 400/500/600/700 and IBM Plex Mono loaded (document.fonts), h1 font-family resolves to Be Vietnam Pro, Vietnamese diacritics present and rendered without tofu (visually checked in screenshots), no horizontal overflow, no element wider than the viewport, no visible truncated text (the only clipped elements are `svt-visually-hidden` spans and the hidden "Tất cả bài viết" heading), no English-only paragraph detected, no dash characters in rendered text. Headlines wrap cleanly at 390px ("Hóa đơn ABN / cho du học sinh: / cần ghi những gì"). Screenshots in /tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/shots/.

## NOT VERIFIED

- The SVT tax form (/vi/tax-form) is closed in this build, so the Vietnamese form strings and VI_RES in form-brand-svt.tsx were reviewed in source only, not rendered.
- WhatsApp fixed texts (svt-fixed-texts.ts) reviewed in source only; not sent through Will or `stripDashes` (no live run, per brief).
- Legal pages (client agreement, privacy) are intentionally English only and were not reviewed.
- Pages other than the eight listed were not opened in the browser; their copy was reviewed in source.

## Coverage

Read in full, compared with English:
- /home/claude/work/whvtax/src/lib/svt/i18n.ts (vi block lines 153 to 200, against en)
- /home/claude/work/whvtax/src/lib/svt/content/home-vi.ts vs home-en.ts
- /home/claude/work/whvtax/src/lib/svt/content/guides-vi.ts vs guides-en.ts
- /home/claude/work/whvtax/src/lib/svt/content/blog-vi.ts vs blog-en.ts
- /home/claude/work/whvtax/src/lib/svt/content/long/vi/batch-00.ts through batch-11.ts and batch-12-deductions.ts (13 files, 150 slugs, slug parity with long/en confirmed 12/12/11/12/11/11/12/11/12/12/12/10/12)
- /home/claude/work/whvtax/src/components/svt/form-brand-svt.tsx (VI_RES and VI strings; key set identical to ZH)
- /home/claude/work/whvtax/src/components/svt/pages/ContactPage.tsx (vi block vs en)
- /home/claude/work/whvtax/src/components/svt/Header.tsx (DEDUCTION_MENU vi labels)
- /home/claude/work/whvtax/src/lib/will/svt-fixed-texts.ts (vi block vs zh)

Opened in browser at 390px and 1280px: /vi, /vi/pricing, /vi/tax-residency, /vi/medicare, /vi/blog, /vi/contact, /vi/blog/abn-invoicing-international-students, /vi/blog/what-is-a-tfn-international-students.

Not reviewed: legal pages (English only by design), zh and en copy (other agents).
