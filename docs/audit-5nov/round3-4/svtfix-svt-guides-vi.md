# svtfix svt-guides-vi

Files edited (ownership only): src/lib/svt/content/guides-vi.ts, blog-vi.ts, long/vi/batch-00, 01, 02, 04, 06, 07, 08, 09, 10, 11.
The earlier agent had left no edits (files dated 2 Nov, no log), so everything below was applied once by
`.../plan/round4/svtfix_vi_apply.py` (64 exact replacements; it skips edits that are already in place).

## P0 (SVT lodges / talks to the ATO / "ask us" after the agent program)
- blog-vi how-long-does-a-tax-refund-take: "Chúng tôi nộp hồ sơ khi..." -> "Chúng tôi chỉ hoàn tất hồ sơ khi...".
- blog-vi amend-tax-return (list item + short answer): "Nếu chúng tôi (đã) nộp giúp" -> "Nếu bạn đã làm hồ sơ qua chúng tôi".
- blog-vi tax-return-deadline-31-october agent section: "Hãy hỏi chúng tôi về trường hợp của riêng bạn." -> pointer to the ATO sources.
- guides-vi do-i-need-to-lodge deadline note: "Hãy cho chúng tôi biết mọi năm bạn đã đi làm." (right after the agent paragraph) -> "Vì vậy, ngay từ đầu hãy liệt kê đủ mọi năm bạn đã đi làm."
- long batch-01 how-to-lodge: "chúng tôi lo việc nộp hồ sơ" (description + body) -> "chúng tôi chuẩn bị hồ sơ"; income-statement article no longer implies we use the agent portal.
- long batch-04: "Nếu chúng tôi nộp hồ sơ giúp bạn ... trao đổi với ATO thay bạn" -> WhatsApp status update; "lo hồ sơ" -> "chuẩn bị hồ sơ"; "phần xác định tình trạng cư trú" -> "phần về tình trạng cư trú. Quyết định cuối cùng về cư trú vẫn thuộc về ATO."
- long batch-11 pillar: "chúng tôi lo việc nộp hồ sơ" -> approved wording (prepared by us, reviewed and signed off by a registered tax agent before it is lodged with the ATO).
- long batch-09 (2 places): "Hãy hỏi chúng tôi về trường hợp của bạn." after the agent lodgment schedule -> pointer to the ATO sources.

## Facts
- VI-01 tax-rates article: 15% claim corrected (WHM 15% vs 2026-27 resident 15% band), title/description now 2025-26 and 2026-27, new section "Thuế suất cho người cư trú năm 2026-27" (0 / 15% / $4,020 + 30% / $31,020 + 37% / $51,370 + 45%, verified on ato.gov.au tax-rates-australian-residents today), worked $50,000 example ($5,520), FAQ[0] rewritten.
- VI-02: pillar heading and list now include 2026-27; no-TFN 47% now "2025-26 và 2026-27" (all occurrences in batch-00).
- VI-06: pillar states the Home Affairs 48 hours per fortnight in session, unrestricted in scheduled breaks, VEVO as final check. Adding the Home Affairs source link is an EN entry change: handoff to svt-guides-en (sources array lives in long/en).
- VI-08 and the brief's Medicare rule: every "không đủ điều kiện hưởng Medicare vì có OSHC" (batch-01 x3, batch-02, batch-06 x2, batch-07) rewritten to "vì có visa tạm thời" with OSHC as the visa requirement; guides-vi medicare meta description no longer ties the exemption to OSHC.
- DASP: lead rule "WHM 65% of the taxable component only" applied wherever vi said "65% cho toàn bộ khoản chi trả / số tiền" (guides-vi superannuation note, batch-02, batch-08, batch-10, batch-11); worked examples now say the balance is all taxable; tax-free component 0% added to the guide.
- VI-03 deadline article: meta, H1 ("Đã qua hạn 31/10/2026? Vẫn nộp được"), lead, short answer and agent bullet now past tense, late lodgement still possible, 2026-27 due date 31/10/2027. Short-answer facts unchanged so figures still match EN. DEADLINE_PASSED_NOTE still prepends in the route; no duplicate sentence added.

## Search intent / cannibalization (no slug changes, no merges)
- VI-04 + strat-02 (vi): superannuation guide title "Rút tiền super khi rời Úc (DASP): thuế bao nhiêu, nộp thế nào", description with "hoàn super", H1, answer-first lead (DASP definition, 35%, 28 days, "hoàn super"/"hoàn thuế xuất cảnh" is not an income tax refund or TRS), section titles "Ai được rút DASP", "Thuế suất DASP", short answer adds 28 days. Structure unchanged.
- VI-05: "Hoàn thuế ở Úc được bao nhiêu? Điều gì quyết định với du học sinh" (still no amount).
- strat-08: tax-back article title "Hoàn thuế ở Úc cho du học sinh: khi nào, bao lâu, cần gì" + opening paragraph separating income tax refund, TRS and DASP.
- VI-07: ABN long article now points to "ABN là gì, du học sinh có cần không?" in its first paragraph; DASP pair: blog meta title "Giấy tờ DASP: cần chuẩn bị gì và mất bao lâu", long title "Bản sao chứng thực cho DASP: làm ở đâu khi đã về nước" with an intro that names the main page; both super pairs get intent-separating intros naming the other page.

## Not done / handoffs
- VI-04 extra FAQ ("Hoàn thuế xuất cảnh có phải là rút super không?") and the strat-02 vi H2 set (apply online, documents, timing, 485): guides-vi must match the EN shape (checkGuideText), so they follow when svt-core/svt-guides-en add the EN FAQ and sections. Suggested vi FAQ: q "“Hoàn thuế xuất cảnh” có phải là rút super không?", a "Thường là không hẳn. Rút super khi rời Úc là DASP. Hoàn thuế thu nhập là hồ sơ thuế sau ngày 30/6, còn hoàn GST khi mua hàng ở sân bay là TRS. Ba việc này làm riêng."
- Links from long vi articles to the four service pages: parseBody (src/lib/svt/content/long/library.ts, svt-core) has no inline link syntax and the long-article test forbids markup, so no links were added. Once svt-core supports [text](/path), add vi links (to /vi/pricing, /vi/superannuation, /vi/abn-delivery, /vi/tfn when it exists).
- VI-09: already glossed in the current files (late-lodgment and white card), nothing to change.
- TPB symbol and WhatsApp number: not present in or not changed by this bucket.
- Nothing needed in guides-i18n.ts / blog-i18n.ts.

## Verify
- npx tsc --noEmit -p . : clean.
- npx jest src/lib/svt src/lib/__tests__/brand-routing-26oct.test.ts src/lib/__tests__/launch-gate.test.ts : 715 passed, 2 skipped (one earlier run failed transiently while the EN agent was mid-edit on guides-en medicare; the rerun passed).
- U+2013, U+2014, U+2015, "——": none in guides-vi.ts, blog-vi.ts, long/vi/*.
