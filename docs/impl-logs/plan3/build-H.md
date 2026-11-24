# build-H (24 Nov 2026): SVT zh + vi, 4 new guides and fact fixes

Owner files only: src/lib/svt/content/{blog-zh,blog-vi,guides-zh,guides-vi}.ts, long/zh/**, long/vi/**.
Shape followed: S/plan3/svt-shape.md (agent G). EN twins: long/en/batch-13-problems.ts (G), already in LONG_EN.

## New guides (long articles, same slugs as EN; dates, category, sources come from the EN entry)
- NEW long/zh/batch-13-problems.ts (LONG_ZH_13) and long/vi/batch-13-problems.ts (LONG_VI_13), 4 texts each:
  mygov-sms-code-overseas-international-students, cant-link-ato-mygov-international-students,
  claim-super-without-mygov-international-students, tax-refund-closed-australian-bank-account-international-students.
  Native text, answer first, question H2s in the EN order (7 to 8 sections each), 3 FAQs each (= EN), no links in body.
  zh titles 19 to 25 chars, descriptions 70 to 92; vi titles 45 to 60, descriptions 150 to 159.
  Closings: zh "我们会直接和 ATO 处理" + "在提交给 ATO 之前，由注册税务代理人审核并签字确认" + "我们绝不会索要你的 myGov 密码" + WhatsApp;
  vi "Chúng tôi làm việc trực tiếp với ATO" + "được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO"
  + "Chúng tôi không bao giờ hỏi mật khẩu myGov của bạn" + WhatsApp. Super guide CTA = services-zh/vi.ts superannuation
  wording verbatim (核对养老金账户、签证日期和表格 / kiểm tra các quỹ super, ngày visa và giấy tờ; price confirmed on WhatsApp).
  zh super guide uses ATO's own Chinese term 离澳退休公积金支取 (r09 F4).
  Never: Code Generator as fix, linking code by phone, Strong myID with a foreign passport (said "usually cannot"),
  refund overseas, we lodge/fix myGov, residency (not discussed).
  Facts and URLs (all in the EN sources list):
  - SMS to registered number, roaming, change number only when signed in: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
  - SMS checklist, unlock, new account: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
  - App/passkey/Digital ID need no change overseas: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
  - Strong myID recovery (name, DOB, email match): https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id ; Strong needs Australian documents + photo: https://www.myid.gov.au/set-up
  - Helpdesk +61 1300 169 468 / 132 307 option 1, hours: https://my.gov.au/en/about/help/contact
  - ATO sign-in methods, SMS needs Australian mobile, secret questions unlink: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
  - Linking question list, skip all = fail: .../create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
  - Error codes IDD/OVK/LCK/ICI, Unlink/Link: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
  - ATO +61 2 6216 1111, 13 28 61: https://www.ato.gov.au/About-ATO/Contact-us/phone-us/
  - Lodge from outside Australia (myTax needs linked myGov; agent; paper; Australian account): https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
  - DASP online fields, TFN optional, visa screen wrong -> DASPmail@ato.gov.au, VEVO: .../departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
  - DASP free, payment methods, ATO-held only AU account in your name or cheque, 6 months, 28 days, $5,000 certified copies, registered tax agent with written authority: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
  - Closed account via Reserve Bank (up to 10 days), reissue or cheque, cheques held up to 90 days since Jan 2025: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
  - Refund only to Australian account, update online/app/phone, BSB 6 digits, account up to 9 digits, own or joint: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details
- long/zh/index.ts, long/vi/index.ts: import + `...LONG_ZH_13` / `...LONG_VI_13` at the end of the spread (hand edit; no generator script in repo).

## Fact fixes (source per line)
Refund timing 12 -> 10 business days, paper 50 -> 90 (H4/H5: https://ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return):
- blog-zh.ts how-long-does-a-tax-refund-take: meta description (number only: factual-error exception), lead, list items
  (dropped "大约 10 周"), FAQ a, FAQ q "退税超过 10 个工作日还没到", short answer/mark/figures 10 / 30 / 90.
- blog-vi.ts same post: description (number only), list items (dropped "khoảng 10 tuần"), FAQ a, FAQ q, short 10 / 30 / 90.
- long/zh batch-01 (lodging step 7), batch-04 (two paragraphs, description number only, answer, list, "两周半" -> "一般是两周",
  FAQ q), batch-11 (step 4, lodging paragraph).
- long/vi batch-01, batch-04 (same spots, "hai tuần rưỡi" -> "khoảng hai tuần"), batch-11 (two spots).
- Early-lodgment 50 days: none in zh/vi files (checked), so nothing kept/changed there.
31 Oct 2026 Saturday, self-lodgers until 11:59 pm Monday 2 Nov (r14 V2: https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now):
- blog-zh.ts deadline post body p and short answer (+ fact label; figure kept "晚上 11:59" for the EN figure match);
- blog-vi.ts deadline post body p, short answer, fact label (figure kept "11:59 tối");
- long/zh batch-09: 3 spots (two paragraphs, FAQ a); long/vi batch-09: 4 spots (two paragraphs, answer, FAQ a).
Closed account (r16 I2/I3, missing refunds URL above):
- long/zh batch-04 tax-refund-delays "延误 4" paragraph and FAQ "我的澳洲银行账户已经关了"; long/vi batch-04 same paragraph and FAQ.
DASP payment (r16 E9, DASP URL above):
- long/zh batch-02 and long/vi batch-02 how-long-does-dasp-take: "or decide which overseas account" replaced by the three
  ATO methods, international transfer only via a fund that offers it (fees, conversion), ATO-held super only AU account or cheque.
guides-zh.ts / guides-vi.ts: grep found no 12/50 day, deadline-time, closed-account or DASP-payment error: unchanged.

## Checks
- npx tsc --noEmit -p . : clean.
- jest src/lib/svt (8 suites, 700 tests): all pass, including long-articles (zh/vi new texts) and i18n-rules (checkBlogText figures).
- jest src/lib/__tests__/launch-gate.test.ts, __tests__/wht-copy-compliance-6-languages.test.ts: pass.
- src/lib/__tests__/new-locales-sitemap.test.ts: 1 failure "LOCALE_GUIDE_SLUGS.es matches the chunk data": ES chunk files
  of another agent (in progress), not my files; not edited.
- Dash grep (U+2012 to U+2015, U+2E3A/B, "——") on all owned files: 0. Rule grep on new files (会计, 税务师, 我们报税/提交,
  kế toán, chúng tôi nộp, Code Generator, linking code, Working Holiday, backpacker, AI, 保证, đảm bảo, residency): 0.

## Notes for Jo / lead
- Related links for the 4 slugs live in long/en/links.ts (G's file).
- zh/vi long texts do not need an approved-regex pass (not in i18n-rules JSON) but all agent sentences use the approved forms anyway.
