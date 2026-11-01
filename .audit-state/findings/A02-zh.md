# A02: Simplified Chinese (zh) language review, Student Visa Tax

Reviewer: A02 (native mainland Mandarin). Baseline d9dbac0, branch svt-build. Read-only.
Target reader: 20 to 26 year old mainland Chinese student in Australia, on a phone.

## Summary

The Chinese copy is written natively, not machine-translated. Sentence rhythm, particles
(就、才、再、照样、先别…), colloquial student register (打两份工、送外卖、跑网约车、搬家、
合租房) and the "可能是税务居民" hedge are all right. Every worked example I recomputed
(about 60 across the long library) matches the English figures; an automated figure diff of
all 150 long articles against English found no numeric drift, and the paragraph/list/heading
structure of every zh article matches its English twin exactly.

Hard rules: no em/en dash, horizontal bar or Chinese double dash anywhere in zh copy (node
scan of every zh source file); no "we are a registered tax agent"; no AI/bot mention; no
refund promise stronger than English; no WHT mention. Zero CRITICAL findings.

What needs work is (a) one legal-wording deviation on the Contact page, (b) one
mistranslated term (penalty rates rendered as 加班费率 "overtime rate") and (c) terminology
drift between batches written by different hands (award, penalty rates, casual loading,
payment summary, Home Affairs, dates with/without spaces). None of it misleads on money or
law except the penalty-rate term.

Counts: must-fix 3, should-fix 9, optional 10, INFO 4.

## Must-fix

### A02-1 (HIGH) Contact page uses a non-fixed rendering of the supervision/sign-off wording
- File: `src/components/svt/pages/ContactPage.tsx:66,69`
- Current (line 69): `Student Visa Tax 在注册税务代理的监督下运营。你的报税在递交给 ATO 之前，由注册税务代理审核并签字确认。` and (line 66): `注册税务代理绝不会向你要 myGov 的登录信息。`
- Problem: the brief fixes the ZH rendering already in the code (`src/lib/svt/i18n.ts:117` and `home-zh.ts:13,19,45`): `在注册税务代理人 … 的监督下运营` and `在提交给 ATO 之前，由注册税务代理人审核并签字确认`. Contact drops 人 (代理 alone means "agency/to act for", 代理人 is the person) and swaps 提交 for 递交. Same legal sentence, two renderings on one site, on the page where a hesitant user checks "你们靠谱吗？".
- Fix (line 69): `Student Visa Tax 在注册税务代理人的监督下运营。你的报税在提交给 ATO 之前，由注册税务代理人审核并签字确认。服务条款全文都公开在客户协议里。`
- Fix (line 66, last sentence): `注册税务代理人绝不会向你索要 myGov 登录信息。`
- Verify: `grep -rn "注册税务代理[^人]" src/` returns nothing; reload /zh/contact.
- Leave unchanged? No. It is the one sentence Jo fixed per language.

### A02-2 (HIGH) "penalty rates" translated as 加班费率 (overtime rate) in the public-holiday article
- File: `src/lib/svt/content/long/zh/batch-05.ts:517,541,565,580` (slug `public-holiday-pay-international-students`)
- Current: `可能有权按你的行业裁定或协议拿到加班费率（penalty rates）`, `加班费率是某些时段或日子更高的工资标准`, `你是否有额外的工资，比如加班费率`, `某一项加班费率算不算正常工时收入`.
- Problem: 加班 means overtime. Penalty rates on a public holiday are not overtime; the article even lists overtime separately. The site's own term (60 uses) is 加成工资（penalty rate）. A student reading 加班费率 will think the higher rate only applies if the holiday hours are overtime.
- Fix: replace 加班费率 with 加成工资 in those four places (line 541: `可能有权拿到加成工资（penalty rates）。加成工资是某些时段或日子更高的工资标准`). Line 819 of batch-04 (`按加班费率加了 3 小时班`) is genuinely overtime and stays.
- Verify: `grep -n 加班费率 src/lib/svt/content/long/zh/batch-05.ts` returns nothing.
- Leave unchanged? No: it changes the meaning of a pay-rights article.

### A02-3 (MEDIUM) Contact page changes the bank-account advice (meaning drift)
- File: `src/components/svt/pages/ContactPage.tsx:68`
- Current: `ATO 只会把退税打到澳洲的银行账户，如果你已经销户了，请告诉我们。`
- English: "Keep your Australian bank account open if you can: the ATO pays refunds only into an Australian account."
- Problem: the English tells the student what to do before leaving (keep the account); the Chinese only says "tell us if you closed it", which drops the one actionable instruction every other zh page repeats (先别关掉澳洲银行账户). A student who reads only this page gets the opposite impression (closing is fine, just tell us).
- Fix: `可以的话，先别关掉你的澳洲银行账户：ATO 只会把退税打到澳洲的银行账户。如果已经销户了，请告诉我们。`
- Verify: reload /zh/contact, open "我已经离开澳洲了，还能帮我吗？".
- Leave unchanged? Tolerable for a week, not for launch: it contradicts the guides.

## Should-fix

### A02-4 (MEDIUM) Four names for "award" and three for "penalty rates" across the long library
- Dominant (266 uses): 行业裁定（award）; 加成工资（penalty rate）(60). Variants:
  - 现代裁决 ×6, `batch-06.ts` (piece-rates, labour-hire, payslip articles: lines 701,707,820,894,897,932)
  - 行业裁决 ×1, `batch-04.ts:270`
  - 罚金工资率 ×6, `batch-06.ts:801,831,881,897,901,932`; 罚金费率 ×1, `batch-08.ts:847`
  - untranslated `penalty rates` ×8 in `batch-09.ts` (hospitality/restaurant award articles: 406,432,456,583,585,595,613,619)
- Problem: 罚金 means "fine/penalty money"; a reader meets 罚金工资率 and thinks of a deduction. 现代裁决 is a literal of "modern award" nobody uses in Chinese. Same concept, four labels, sometimes two in one article (batch-06 payslip article uses 现代裁决 and 罚金工资率; its neighbour uses 行业裁定/加成工资).
- Fix: global replace in zh files: 现代裁决→行业裁定, 行业裁决→行业裁定, 罚金工资率→加成工资, 罚金费率→加成工资; in batch-09 write `加成工资（penalty rates）` on first use per article and 加成工资 after. Also 园艺业现代裁决（Horticulture Award）→园艺行业裁定（Horticulture Award）(batch-06:701,707).
- Verify: `grep -c "现代裁决\|行业裁决\|罚金工资率\|罚金费率" src/lib/svt/content/long/zh/*.ts` all zero.
- Leave unchanged? Readable but it reads as three translators; fix before launch.

### A02-5 (MEDIUM) Hospitality Award named three different ways
- `batch-10.ts:461,543,622,714`: 餐饮业（综合）行业裁定（Hospitality Industry (General) Award）
- `batch-08.ts:937`, `batch-09.ts:405`: 酒店业行业裁定（Hospitality Award）
- Problem: 餐饮业 means "food and beverage", which in the same articles is the Restaurant Award (餐厅业行业裁定). batch-09 explicitly teaches "酒店 vs 餐厅 use different awards"; batch-10 then calls the hotel one 餐饮业, which collapses the distinction the reader was just taught.
- Fix: use 酒店业行业裁定（Hospitality Industry (General) Award）in batch-10 at the four lines.
- Verify: `grep -n "餐饮业（综合）" src/lib/svt/content/long/zh/*.ts` empty.
- Leave unchanged? No, it undermines the award-distinction articles.

### A02-6 (MEDIUM) payment summary rendered four ways
- 工资总结（payment summary）×23 (guides-zh, blog-zh, batch-01, batch-02, batch-11); 付款汇总 ×3 `batch-00.ts:689,754,775`; 工资汇总表 ×4 `batch-04.ts:85,104,418,449`; 工资明细 (`batch-05.ts:733`, `batch-05.ts:816`, "最后一次的工资明细" for "final pay details", acceptable).
- Fix: 付款汇总→工资总结, 工资汇总表→工资总结, keep the bracketed English on first use.
- Verify: grep as above.
- Leave unchanged? Low harm; fix in the same pass as A02-4.

### A02-7 (MEDIUM) Department of Home Affairs: 内政部 (74) vs 移民局 (29)
- 移民局 in `batch-00.ts` (8), `batch-09.ts` (20), `batch-07.ts:66` (the one in batch-07 is a quoted threat, "我去举报你给移民局", and should stay colloquial).
- Problem: students say 移民局 colloquially, but the site mostly uses the correct name 内政部（Department of Home Affairs）. Mixed use within one site; batch-09 is all 移民局.
- Fix: in batch-00 and batch-09 use 内政部（Department of Home Affairs）on first use per article, 内政部 after. Optionally one explanatory gloss on the home or about page: 内政部（Home Affairs，也就是大家常说的移民局）.
- Leave unchanged? Acceptable; both are understood. Fix for consistency.

### A02-8 (MEDIUM) Date typography: "2026年7月1日" without spaces in three batches, with spaces everywhere else
- `batch-03.ts` (26 instances, e.g. lines 99,186,214,255,292,303,552,573,575,737,765,843,907,936), `batch-06.ts` (24, e.g. 48,158,576,602,655,661,713,761,803,894,919,921), `batch-10.ts` (48, e.g. 90,100,147,299,327,…,927). All other files, guides, blog and UI write `2026 年 7 月 1 日` / `6 月 30 日`.
- Problem: both conventions are valid Chinese, but the site mixes them, sometimes in one sentence (`batch-03.ts:186`: "从 2026年7月1日或之后开始的第一个完整发薪周期起，全国最低工资是每小时 $26.44，或者每周 38 小时"). On a phone the unspaced run also breaks differently from the rest of the page.
- Fix: in those three files insert the thin spaces: `(\d)年(\d)` → `$1 年 $2`, `(\d)月(\d)` → `$1 月 $2`, `(\d)日(?=[一-鿿])` → `$1 日 ` (and `从(\d)` → `从 $1`, `是(\d)` → `是 $1`, `在(\d)` → `在 $1`, `到(\d)` → `到 $1` where a digit follows a CJK character). Review the handful of `7:00` style times by hand.
- Verify: node scan `/[一-鿿]\d|\d[一-鿿]/` on zh files returns 0 (currently 39/48/71 hits).
- Leave unchanged? Acceptable, but cheap to fix and visible.

### A02-9 (LOW) "一个一个月" (doubled 一个) in three TFN-address sentences
- `batch-00.ts:109`: `一个一个月后你还能收到信的澳洲邮寄地址`; `batch-00.ts:227`: `填一个一个月后你还在用的地址`; `batch-00.ts:572`: `选一个一个月内都能帮你收信的澳洲地址`.
- Problem: grammatical but reads as a typo on first pass.
- Fix: 109 → `一个月后仍能收到信的澳洲邮寄地址`; 227 → `填一个月后还在用的地址`; 572 → `选一个至少一个月内都能帮你收信的澳洲地址`.
- Leave unchanged? Yes, but it is a two-minute fix.

### A02-10 (LOW) Blog fact label reads as a fragment
- `src/lib/svt/content/blog-zh.ts:77` (apply-for-tfn-student-visa) facts: `{"figure": "28 天", "label": "内邮寄到你手上"}`.
- Problem: rendered as a big "28 天" over a small "内邮寄到你手上"; the label starts with 内 and only works if read glued to the figure. English is "28 days / to arrive by post".
- Fix: `"label": "之内邮寄到你手上"` is still glued; better `"label": "邮寄到手的最长时间"`.
- Leave unchanged? Yes, cosmetic.

### A02-11 (LOW) casual loading / casual worker: three terms
- 临时工加成 ×22 (batch-03, batch-05), 临时工附加工资 ×12 (batch-02, batch-04), 临时工附加 ×9 (batch-06, batch-10); 零工 for "casual" ×15 in `batch-04.ts` (super-for-casual article) against 临时工（casual）everywhere else (home/guides use 零工 once each for "casual jobs", which is fine).
- Fix: standardise on 临时工附加工资（casual loading）on first use, 临时工附加工资 after; use 临时工 for the worker. batch-04:778-856 零工→临时工.
- Leave unchanged? Acceptable; same pass as A02-4.

### A02-12 (LOW) Multiplication sign: letter x in six formulas
- `batch-03.ts:40,41,284,285,657,658` (`5 x $30.00`), `batch-10.ts:207` (`2,000 x 88 分`), `batch-12-deductions.ts:743,924` (`25 天 x 16 公里`, `5,000 公里 x 88 澳分`). Other formulas use ×.
- Fix: replace ` x ` with ` × ` in those lines.
- Leave unchanged? Yes, cosmetic.

## Optional

- A02-13 `src/lib/svt/i18n.ts:120` trust.myGov: `任何正规的报税服务都不会向你索要 myGov 登录信息。` English: "A registered tax agent will never ask for your myGov login details." Chinese generalises to "any legitimate tax service". Suggest `注册税务代理人绝不会向你索要 myGov 登录信息。` (VI has the same generalisation; coordinate.)
- A02-14 `src/lib/svt/i18n.ts:119` checkHint nested brackets `（在新标签页打开税务从业者委员会（TPB）网站）`. Suggest `（在新标签页打开 TPB 官网）`.
- A02-15 `src/lib/svt/i18n.ts:141` priceCheck.perYear `/ 年` renders as "$220 / 年" on the home price check. More natural: `每年`.
- A02-16 `src/lib/svt/i18n.ts:128` footer.learn `文章与问答` heads a footer column that lists 办理流程/价格/文章/联系我们. Suggest `了解更多`.
- A02-17 `src/lib/svt/content/home-zh.ts:70` FAQ Uber Eats answer: `有。ABN 收入没有预扣税，所以要连同你的工作开支一起，按营业收入申报。` English says income goes on as business income "minus your work costs"; 连同…一起 ("together with") is loose. Suggest `有。外卖平台是按 ABN 付钱给你的，不会预扣税。这部分收入要作为营业收入申报，可以扣除相关的工作开支。这种报税是 $385。`
- A02-18 `src/lib/svt/content/home-zh.ts:57` adds `学生保险公司不会寄给你` (not in English). Harmless and true; keep or drop.
- A02-19 `src/lib/svt/content/blog-zh.ts:579` late-lodgment h1 mark `晚交也要交` vs English "Lodge as soon as you can". Punchy but shifts emphasis. Suggest `尽快补交`.
- A02-20 `src/lib/svt/content/blog-zh.ts:261` cancel-abn: English glosses myID as "the government's digital ID app"; zh omits. Suggest `用 myID（政府的数字身份 app）网上注销`. Same for VEVO in `blog-zh.ts:398` (`内政部的 VEVO 签证查询`).
- A02-21 `src/lib/svt/content/guides-zh.ts:225` `走之前向他要一份工资总结` (他 for an employer). Suggest `走之前向雇主索要一份工资总结`.
- A02-22 `src/components/svt/pages/ContactPage.tsx:66` `也不用绑定澳洲身份证件，我们直接和 ATO 对接` is an addition to the English ("nothing to set up or link first"); 绑定澳洲身份证件 is puzzling to a student. Suggest `你不用登录 myGov，也不用先做任何绑定或设置，我们直接和 ATO 对接。` (VI has the same addition.) Also line 73 `只有 TFN 收入 $220，有 ABN 收入 $385` → `只有 TFN 工作 $220，有 ABN 工作 $385`, matching the guides.

## INFO (not Chinese defects, for the coordinator / other agents)

- A02-I1 Sample payslip on /zh home keeps its English line labels (Gross pay, PAYG withheld, Super, Net pay) with Chinese explanations. A real Australian payslip is English, so this is defensible; the i18n legend reads 工资单示例. No change recommended.
- A02-I2 Long-article renderer (`src/lib/svt/content/long/library.ts:85-90`) moves the intro paragraph(s) under the first H2 in every language. In Chinese this is more visible because several first sections open with a direct answer to the heading (e.g. `tax-rates-international-students-2025-26`: heading 什么决定你的税率？ is followed by the 15%-rate intro, and only then by 由你是否属于税务居民来决定。, which now answers nothing). Screenshot `…/scratchpad/shots/crop-rates-1280.png`. Cross-language structural point, not a translation fault. Smallest fix: render intro blocks before the first H2 (sections.unshift({id:'intro', title:'', blocks: intro})).
- A02-I3 Full-page screenshots at 390px show the sticky "在 WhatsApp 上联系我们" bar painted over the first H2 / first line of the body (and over the category chips on /zh/blog). This is a sticky element captured at one position, so NOT VERIFIED as a real overlap while scrolling; UI agent to confirm the bar never covers content at rest.
- A02-I4 Shared tax form (closed in this build): the Yes/No toggles are hard-coded English in `src/app/(site)/tax-form/FormClient.tsx:694,736`; the zh copy `form-brand-svt.tsx:91` correctly says `把上面的答案改成 No` to match. Whether `ResidencyStep` shows 是/否 for zh could not be checked (form closed): NOT VERIFIED. Blog dates render as `2026-10-27` on /zh/blog (ISO, not 2026 年 10 月 27 日); acceptable but not localised.

## Hard-rule check (evidence)

Node scan over `i18n.ts`, `home-zh.ts`, `guides-zh.ts`, `blog-zh.ts`, all 13 `long/zh/batch-*.ts`, `form-brand-svt.tsx`, `ContactPage.tsx`, `Header.tsx`, `svt-fixed-texts.ts` for `[—–―]`, `——`, 人工智能|机器人|AI, 我们是注册…税务代理, 保证/一定/肯定…退税, Working Holiday Tax: zero hits in customer-facing strings (only hits: a `"可能"` in a code comment, `...` in a JS spread). Half-width `,;:?!` after CJK: none. Half-width parentheses adjacent to CJK: none (all 全角 （）). Ellipsis `1、2、3...` at `batch-03.ts:448` is three ASCII dots; suggest `1、2、3 等` (cosmetic).

Fees: $220 / $385 incl. GST stated identically in i18n, home, pricing guide, contact, diy article and all WhatsApp price texts. Guarantee wording in home/pricing matches English including the "no refund or tax owed → full fee" clause. WhatsApp fixed texts match `approved-messages.ts` line by line (the English `price_tfn` guarantee line also omits the tax-owed case; not a zh issue).

Residency: every example says 可能是税务居民 / 可能是澳洲税务居民; the few definite `是税务居民` are either conditionals (`如果你是税务居民`) or mirror a definite English sentence (`batch-09.ts:386` "Mei is a resident for tax purposes" in English too).

## Browser checks (Playwright, chromium, `--host-resolver-rules=MAP svt.localhost 127.0.0.1`, GA stubbed)

Pages at 390×844 and 1280×900, full-page screenshots in
`/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/shots/` (`zh-390.png`, `zh_pricing-390.png`, `zh_tax-residency-390.png`, `zh_medicare-390.png`, `zh_blog-390.png`, `zh_contact-390.png`, `zh_blog_tax-rates-international-students-2025-26-390.png`, `zh_blog_public-holiday-pay-international-students-390.png`, `zh_blog_tfn-declaration-two-jobs-390.png` and the `-1280` twins; DOM text in the `.txt` files; `report.json`).

- All nine pages HTTP 200, `<html lang="zh-CN">`, no horizontal scroll (scrollWidth = clientWidth at both widths), no element overflowing the viewport, no `text-overflow: ellipsis` truncation.
- Line breaking: Chinese wraps per character; mixed Latin tokens (ATO, WhatsApp, $18,200, TFN) keep their thin spaces and do not orphan; h1 highlighter marks wrap cleanly (`专为学生签证 / 持有人办理报税`, `留学生的报税 / 问题，讲清楚`).
- Punctuation on screen: full-width 。，、：？！（） throughout; quotes are “ ”; no dash characters.
- Nothing left in English that should be Chinese on these pages, except: sample payslip labels (I1), blog dates (I4), `Client Agreement（客户协议）/ Privacy Policy（隐私政策）` footer links (intentional, legal pages are English only, and the footer says so: 客户协议和隐私政策仅有英文版).
- Page titles: guide pages `/zh/pricing` and `/zh/medicare` lack the `| Student Visa Tax` suffix that other pages have (metadata, not language; noting for the SEO agent).

## Coverage

Reviewed in full, line by line, against English:
- `src/lib/svt/i18n.ts` (zh block and shape)
- `src/lib/svt/content/home-zh.ts` vs `home-en.ts`
- `src/lib/svt/content/guides-zh.ts` vs `guides-en.ts` (+ `guides-i18n.ts` shape check)
- `src/lib/svt/content/blog-zh.ts` vs `blog-en.ts` (all 23 articles)
- `src/lib/svt/content/long/zh/batch-00.ts` … `batch-11.ts`, `batch-12-deductions.ts` (all 150 articles, every title/description/answer/body/faq read in full); English twins read in full for batch-00 and batch-01, and consulted for every sentence flagged above in the other batches; all 150 compared automatically for figures, FAQ count, H2 count, paragraph/list/bold counts (scripts in scratchpad: `load.js`, `check.js`, `struct.js`; all structure counts identical, figure diff only glosses such as `$5 million（500 万澳元）`).
- `src/components/svt/form-brand-svt.tsx` (ZH and ZH_RES)
- `src/components/svt/pages/ContactPage.tsx` (zh block)
- `src/components/svt/Header.tsx` (DEDUCTION_MENU zh)
- `src/lib/will/svt-fixed-texts.ts` (zh) vs `src/lib/will/approved-messages.ts`
- Browser: /zh, /zh/pricing, /zh/tax-residency, /zh/medicare, /zh/blog, /zh/contact, /zh/blog/tax-rates-international-students-2025-26, /zh/blog/public-holiday-pay-international-students, /zh/blog/tfn-declaration-two-jobs at 390 and 1280.

Partially reviewed: English long batches 02 to 12 (spot-read for flagged sentences and all worked examples, not every paragraph).

Not reviewed: the zh tax form in the browser (closed in this build), Will's zh free-text replies (engine output, not fixed text), zh legal pages (none exist by design), `llms.ts` zh headings.
