# svtfix: svt-guides-zh (second pass)

Earlier agent (stopped) had already applied: ZH-01, ZH-02, ZH-03 (P0/P1 agent wording), ZH-04, ZH-05, ZH-06 (deadline past tense),
ZH-07 (residency verbs), ZH-08 (min wage retitles), ZH-09 (养老金退税 / super 退税 / 澳洲退税 in meta), pages-zh zh-10 (dated
deadline line in guides-zh), zh-11 (leaving-australia h1, MES note), most of ZH-11 (answer/description lengths), and part of
ZH-10 ('ATO 表示' 419 -> 296). Verified each in the current files; not duplicated.

## Applied in this pass
- Agent wording (P0 sweep): long/zh/batch-01.ts "报税时谁来查看？" said a registered tax agent can see income statements
  "所以请我们帮你报税时" (implied SVT is the agent). Rewritten to match EN: you see it in your ATO account, an agent sees it
  through their ATO services, "我们帮你准备报税时，会把核对收入报表作为工作的一部分".
- Medicare/OSHC causation (lead decision: exemption depends on entitlement, not on OSHC): 10 passages said students are not
  entitled to Medicare "因为有 OSHC". Rewritten to "没有资格享受 Medicare，看病靠的是 OSHC", plus an explicit line in two
  places that the exemption depends on entitlement, not OSHC. Files: long/zh batch-01 (3), batch-02, batch-06 (2), batch-07,
  batch-11 (3). NOTE for svt-guides-en / svt-guides-vi: EN has the same "not entitled to Medicare because they have OSHC"
  (long/en batch-01:548,614,868; batch-02:26; batch-06:492,631); vi likely too.
- 'ATO 表示' repetition: removed repeated attributions inside one section (batch-01 x4, batch-04 double in one line,
  batch-11 x2). Remaining count about 288; most are one per section or in separate FAQ answers.
- uk-students-medicare-reciprocal-agreement answer trimmed (130 -> about 95 characters).

## Not done / handoffs
- Links from long articles to the four service pages: the long-article body format forbids links (long/types.ts), and
  related links come from relatedOf() in src/lib/svt/content/long/library.ts (shared, not in this bucket). Needs svt-core or
  the lead (TECH-03 / GEN-06).
- pages-zh zh-06 / strat-02 (new DASP sections "怎么申请", "多久到账" on /zh/superannuation): section ids are locked to the
  EN structure by checkTexts; waits for svt-core's EN /superannuation rewrite, then the next zh wave.
- TPB symbol and WhatsApp number: untouched (owner decision pending).

## Verify
- npx tsc --noEmit -p . : clean.
- npx jest src/lib/svt src/lib/__tests__/brand-routing-26oct.test.ts : 9 suites, 711 tests passed.
- U+2013/U+2014/U+2015/"——" in guides-zh.ts, blog-zh.ts, long/zh/*, guides-i18n.ts, blog-i18n.ts: none.
