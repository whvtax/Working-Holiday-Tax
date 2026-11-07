# Keyword map: studentvisatax.com.au, Simplified Chinese (zh)

Audience: students from mainland China on visa 500 and graduates on 485, searching on Google from Australia (often with Baidu or Xiaohongshu habits: short noun strings, 澳洲 not 澳大利亚, 攻略, 多久, 多少钱, 怎么).
Base URL for every page below: `https://studentvisatax.com.au/zh/...`. All zh pages are self canonical (src/lib/svt/page-meta.ts), so overlap between pages is real competition, not handled by canonicals.

## Evidence used and its limits

1. GSC (3 months to 5 Nov 2026, site live since about 26 Oct): only three Chinese queries exist: 2026报税截止日期 (5 impressions, pos 9.2), 退税时间 (1, pos 8), 澳洲 个人 报税 时间 (1, pos 11). Every other zh signal is page level (a zh page got n impressions at average position X, from any query). Page level numbers are quoted as "page pos X (n impr)". With 1 to 23 impressions these are directional only.
2. SERP observed (Google, zh queries run 5 Nov 2026): the zh SERP for these topics is led by austaxai.com.au (zh guides, city pages "找持牌税务师" from AU$129), baronaccounting.com (cn posts on ABN, 外卖骑手 ABN, DASP), liuxue.xdf.cn (新东方 "澳洲退税季来了！留学生这样做可以多退几百刀！"), studyaustralia.gov.au/zh, SBS 中文 ("出国了还能领澳洲养老金吗"), and ATO Community threads. studentvisatax.com.au did not appear on page one for any of the eight head queries checked.
3. Native phrasing: how mainland students actually type it (tested against the wording competitors use).

Competitor wording worth matching: austaxai FAQ "中国留学生在澳洲需要报税吗？", "国内父母汇款给我的钱要在澳洲报税吗？"; Baron DASP page title "DASP退休金退还申请指南", FAQ "申请DASP需要付费吗？", "可以在离开澳洲之前申请DASP吗？", "超过6个月没申请会怎样"; xdf "澳洲退税季", "多退几百刀", "TFN（税号）". Our zh content uses 退休金 0 times, 退税季 0 times, 税务师 0 times (grep of src/lib/svt/content zh files).

## 1. Keyword tables

### TFN (税号)

SVT does not sell TFN applications (the ATO application is free), so TFN pages are information pages that feed the tax return service.

| Keyword | Intent | Evidence | Page that should win it | Current state |
|:--|:--|:--|:--|:--|
| 澳洲税号怎么申请 | info | SERP observed (austaxai, studyau, eol.cn rank) | /zh/blog/how-to-apply-for-a-tfn-international-students | page exists, no GSC data; not on page one |
| 留学生申请TFN | info | SERP observed | /zh/blog/how-to-apply-for-a-tfn-international-students | page exists but weak; competes with /zh/blog/apply-for-tfn-student-visa |
| 学生签证 TFN 申请 | info | native phrasing | /zh/blog/how-to-apply-for-a-tfn-international-students | page exists but weak |
| TFN 是什么 | info | native phrasing | /zh/blog/what-is-a-tfn-international-students | page pos 3.5 (2 impr) |
| TFN 多久寄到 | info | SERP observed (ATO Community, dcard threads) | /zh/blog/how-long-does-a-tfn-take-students | page exists, no GSC data |
| TFN 28天没收到 | info | SERP observed; EN twin "tfn not received after 28 days" GSC 1 impr pos 11 | /zh/blog/tfn-application-delayed-students | page exists, no GSC data |
| 没有TFN可以打工吗 | info | native phrasing; EN twin "can you work without a tfn" GSC 1 impr pos 10 | /zh/blog/working-before-tfn-arrives-international-students | page pos 3 (1 impr) |
| TFN 申请需要什么材料 | info | native phrasing | /zh/blog/tfn-documents-international-students | page pos 3 (1 impr) |
| 税号声明表 怎么填 / TFN declaration | info | native phrasing; EN twin "what is a tfn declaration" GSC 1 impr | /zh/blog/tfn-declaration-form-international-students | page pos 9 (3 impr) |
| 两份工 免税额度 | info | native phrasing | /zh/blog/tfn-declaration-two-jobs | page exists, no GSC data |
| TFN 忘了 怎么查 | info | native phrasing | /zh/blog/find-lost-tfn-international-students | page pos 8 (1 impr) |
| 来澳洲之前能申请TFN吗 | info | native phrasing | /zh/blog/apply-for-tfn-before-arriving-students | page exists, no GSC data |
| TFN 诈骗 | info | native phrasing | /zh/blog/tfn-scams-international-students | page pos 3 (1 impr) |
| TFN 和 ABN 区别 | info | SERP observed (austaxai tfn-vs-abn zh ranks) | /zh/blog/tfn-vs-abn-international-students | page pos 6 (1 impr) |

### ABN

| Keyword | Intent | Evidence | Page that should win it | Current state |
|:--|:--|:--|:--|:--|
| 留学生送外卖 ABN 报税 | service | SERP observed (Baron 外卖骑手 ABN guide, austaxai uber zh rank) | /zh/abn-delivery | page exists, no GSC data; not on page one |
| Uber Eats 报税 | service | native phrasing | /zh/abn-delivery | page exists but weak; info twin /zh/blog/uber-doordash-tax-international-students page pos 4.3 (3 impr) |
| 外卖 ABN 要交多少税 | info | native phrasing | /zh/blog/food-delivery-rider-student-visa-tax | page pos 4 (2 impr) |
| ABN 是什么 | info | SERP observed (Baron, austaxai, Stripe cn rank) | /zh/blog/what-is-an-abn-students | page exists, no GSC data |
| 留学生可以申请ABN吗 | info | native phrasing | /zh/blog/what-is-an-abn-students | page exists but weak |
| ABN 怎么申请 / 个人ABN申请 | info | SERP observed (Baron "个人ABN注册") | /zh/blog/how-to-register-for-an-abn-students | page exists, no GSC data |
| 有TFN还能有ABN吗 | info | native phrasing | /zh/blog/tfn-and-abn-together-international-students | page exists, no GSC data |
| ABN 要注册 GST 吗 | info | native phrasing | /zh/blog/gst-abn-international-students | page pos 4 (1 impr) |
| 开 Uber ABN GST | info | native phrasing | /zh/blog/uber-driver-student-visa-tax | page pos 10 (2 impr) |
| ABN 可以抵扣什么 | info | native phrasing | /zh/blog/abn-business-expenses-international-students | page exists, no GSC data |
| ABN 注销 / 回国前注销ABN | info | native phrasing; EN twins "cancelling abn", "cancel abn tax agent" GSC 1 impr each | /zh/blog/cancel-abn-when-you-stop-working-students | page exists; competes with /zh/blog/cancel-abn-before-leaving |
| ABN 开发票 | info | native phrasing | /zh/blog/invoices-with-an-abn-international-students | page exists; competes with /zh/blog/abn-invoicing-international-students |
| 雇员还是承包商 | info | native phrasing | /zh/blog/employee-or-contractor | page exists; competes with /zh/blog/employee-vs-contractor-test-international-students |

### Tax return and refund (报税 / 退税)

| Keyword | Intent | Evidence | Page that should win it | Current state |
|:--|:--|:--|:--|:--|
| 澳洲留学生报税 | service | SERP observed (austaxai, xdf, Baron rank) | /zh (home) | page exists, no GSC data; not on page one |
| 澳洲留学生退税 | service | SERP observed | /zh (home) | page exists but weak |
| 留学生报税多少钱 / 找会计报税多少钱 | service | SERP observed (austaxai city pages "from AU$129", "持牌税务师") | /zh/pricing | page exists, no GSC data; uses neither 会计 nor 税务师 in title |
| 2026报税截止日期 | info | GSC 5 impressions, pos 9.2 | /zh/blog/tax-return-deadline-31-october | ranks pos 9.2 for the query; page pos 7.3 (23 impr) |
| 澳洲个人报税时间 / 报税季 | info | GSC 1 impression, pos 11 | /zh/blog/tax-return-deadline-31-october | ranks pos 11 |
| 澳洲退税多久到账 / 退税时间 | info | GSC 1 impression ("退税时间"), pos 8 | /zh/blog/how-long-does-a-tax-refund-take | ranks pos 8; page pos 5.0 (22 impr) |
| 留学生需要报税吗 | info | SERP observed (austaxai FAQ "中国留学生在澳洲需要报税吗？") | /zh/do-i-need-to-lodge | page exists, no GSC data |
| 澳洲怎么报税 流程 / myTax 报税教程 | info | SERP observed (austaxai mytax guide zh) | /zh/blog/how-to-lodge-tax-return-international-students | page exists, no GSC data |
| 500签证 报税 | info | native phrasing | /zh/blog/student-visa-tax-guide-500-485 | page pos 4.8 (6 impr) |
| 澳洲退税能退多少 | info | SERP observed (xdf "多退几百刀") | /zh/blog/average-tax-refund-international-students | page exists, no GSC data |
| 回国后怎么报税 | service | SERP observed (austaxai leaving australia zh); EN twin "australian tax return from overseas" GSC 5 impr pos 49.8 | /zh/blog/lodging-tax-return-after-going-home-students | page exists; competes with /zh/blog/lodge-from-overseas |
| 报税填错了怎么改 | info | native phrasing | /zh/blog/amend-tax-return | page pos 5.7 (11 impr, 1 click) |
| 逾期报税罚款 | info | native phrasing; EN twins "penalty for late tax return australia" GSC 2 impr | /zh/blog/late-lodgment | page pos 6.3 (8 impr) |
| 往年没报税 补报 | service | native phrasing | /zh/past-years | page exists, no GSC data |
| 留学生 税率 2026 / 免税额度 | info | native phrasing; EN twin "student visa tax rate australia" GSC 2 impr pos 7 | /zh/blog/tax-rates-international-students-2025-26 | page pos 4.7 (3 impr) |

### Super and DASP (养老金 / 退休金 / 离境养老金退税)

| Keyword | Intent | Evidence | Page that should win it | Current state |
|:--|:--|:--|:--|:--|
| 养老金退税 | service | SERP observed (SBS 中文 uses 养老金) | /zh/superannuation | page exists, no GSC data; not on page one |
| 澳洲退休金 回国 取出 | service | SERP observed (Baron "DASP退休金退还", xdf use 退休金) | /zh/superannuation | page exists but weak: the word 退休金 appears 0 times in zh content |
| super 退税 / super退税 | service | native phrasing | /zh/superannuation | page exists but weak (in meta description only) |
| DASP 申请 | service | SERP observed (Baron, ATO); EN twins "dasp application", "dasp online application" GSC 1 impr each | /zh/superannuation | page exists but weak; no step by step section |
| DASP 税率 / 养老金退税 扣多少税 | info | SERP observed (Baron "实际要缴多少税"); EN twin "tax on departing australia superannuation payment" GSC 147 impr pos 91 | /zh/blog/dasp-tax-rate-international-students | page exists, no GSC data |
| DASP 多久到账 | info | native phrasing; EN twin "dasp processing time" GSC 2 impr pos 9.5 | /zh/blog/how-long-does-dasp-take-international-students | page exists; competes with /zh/blog/dasp-documents-and-timing |
| DASP 需要什么材料 | info | native phrasing | /zh/blog/dasp-documents-checklist-international-students | page exists; competes with /zh/blog/dasp-documents-and-timing |
| DASP 被拒 | info | native phrasing | /zh/blog/dasp-rejected-international-students | page pos 2 (1 impr) |
| 离开澳洲前能领养老金吗 | info | SERP observed (Baron FAQ "可以在离开澳洲之前申请DASP吗？") | /zh/superannuation (FAQ) | page exists; FAQ answers it |
| 养老金超过6个月没领 | info | SERP observed (Baron "超过6个月没申请会怎样") | /zh/blog/what-happens-to-unclaimed-super-international-students | page pos 9 (1 impr) |
| 雇主没交养老金 | info | native phrasing; EN twin "not being paid super" GSC 92 impr pos 78 | /zh/blog/employer-not-paying-super | page pos 5 (1 impr) |
| 留学生有养老金吗 / 兼职有super吗 | info | native phrasing; EN twin "superannuation for international students" GSC 2 impr pos 15 | /zh/blog/super-for-casual-student-workers | page pos 3.5 (4 impr) |
| 找回养老金 / 多个养老金账户合并 | info | native phrasing | /zh/blog/find-and-check-your-super | page pos 6 (3 impr); competes with two others |
| 485签证 能领养老金吗 | info | native phrasing | /zh/superannuation (FAQ) | page exists; FAQ answers it |

## 2. Gaps (clear demand, no matching page or section)

1. 退休金 synonym. Baron, xdf and many posts call super 退休金 ("澳洲退休金退税", "DASP退休金退还"); we use only 养老金. Extend /zh/superannuation: add 退休金 to the title and lead ("养老金（退休金、super）"), and one FAQ "澳洲退休金回国怎么取出来？". Mirror once in /zh/leaving-australia.
2. DASP step by step application. English GSC shows "dasp application", "dasp online application", "dasp application form"; Baron ranks with "到底怎么申请". No zh page walks through the ATO online form. Extend /zh/superannuation with a numbered "DASP 怎么申请" section (or retarget /zh/blog/dasp-documents-and-timing into "DASP 网上申请步骤", see section 3).
3. TFN hub. Fourteen zh TFN articles but no hub; the service pages do not link them as a set. Make /zh/blog/how-to-apply-for-a-tfn-international-students the hub ("澳洲税号 TFN 申请攻略"), linking the wait, delayed, documents, declaration and lost TFN articles.
4. 退税季 and 退税攻略 head terms. xdf ranks with "澳洲退税季…多退几百刀"; 退税季 appears 0 times in our zh content. Extend /zh/blog/tax-back-australia-international-students with "退税季（7 月 1 日到 10 月 31 日）" and an "怎么多退税" section built on deductions and the two jobs threshold mistake.
5. 找会计报税 / 税务师 / 报税代理 多少钱. austaxai ranks city pages "持牌税务师 from AU$129"; our pricing page says 注册税务代理人 only. Extend /zh/pricing title or H2 to "找会计报税多少钱" and add 税务师 / 会计 wording once each, plus an FAQ comparing with free Tax Help.

## 3. Cannibalisation (zh pages that compete)

| Keyword | Competing pages | Owner | Action for the other |
|:--|:--|:--|:--|
| 留学生申请TFN | /zh/blog/apply-for-tfn-student-visa; /zh/blog/how-to-apply-for-a-tfn-international-students | how-to-apply-for-a-tfn-international-students (hub, see gap 3) | retitle apply-for-tfn-student-visa to "TFN 免费吗" angle or link it to the hub as the short answer |
| 没有TFN可以打工吗 | /zh/blog/working-before-tfn-arrives-international-students; /zh/blog/start-work-without-a-tfn-students; /zh/blog/no-tfn-tax-withheld-students | working-before-tfn-arrives-international-students (page pos 3) | start-work-without-a-tfn: merge into owner; no-tfn-tax-withheld keeps "没给雇主TFN 扣47%" only |
| TFN 多久 vs 28天没收到 | /zh/blog/how-long-does-a-tfn-take-students; /zh/blog/tfn-application-delayed-students | split: how-long owns 多久; delayed owns 没收到 | make the titles and H1s say so; cross link |
| ABN 是什么 | /zh/blog/what-is-an-abn-students; /zh/blog/what-is-an-abn-international-students | what-is-an-abn-students (title already "ABN 是什么？") | the long one is titled "ABN 收入怎么交税": rename slug intent there and point it at /zh/abn-delivery |
| 外卖 ABN 报税 | /zh/abn-delivery; /zh/blog/uber-doordash-tax-international-students; /zh/blog/food-delivery-rider-student-visa-tax | /zh/abn-delivery (service) | the two articles stay informational and link to /zh/abn-delivery with the $385 price |
| ABN 注销 | /zh/blog/cancel-abn-before-leaving; /zh/blog/cancel-abn-when-you-stop-working-students | cancel-abn-when-you-stop-working-students | merge cancel-abn-before-leaving into it or retarget to "回国前 ABN 和 TFN 要处理什么" |
| ABN 开发票 | /zh/blog/invoices-with-an-abn-international-students; /zh/blog/abn-invoicing-international-students | invoices-with-an-abn-international-students | merge |
| 雇员还是承包商 | /zh/blog/employee-or-contractor; /zh/blog/employee-vs-contractor-test-international-students | employee-or-contractor | the test article keeps "自测" angle only |
| 澳洲留学生报税 | /zh; /zh/blog/student-visa-tax-guide-500-485; /zh/blog/how-to-lodge-tax-return-international-students; /zh/blog/tax-back-australia-international-students | /zh owns the service term | guide owns "500签证 报税"; how-to-lodge owns "怎么报税 流程"; tax-back owns "退税攻略" (gap 4); all link to /zh with exact anchor 澳洲留学生报税 |
| 退税多久到账 | /zh/blog/how-long-does-a-tax-refund-take; /zh/blog/tax-refund-delays-international-students | how-long-does-a-tax-refund-take (page pos 5.0, 22 impr) | delays keeps "退税为什么还没到" |
| 回国后报税 | /zh/blog/lodge-from-overseas; /zh/blog/lodging-tax-return-after-going-home-students; /zh/blog/tax-after-leaving-australia-international-students; /zh/leaving-australia | lodging-tax-return-after-going-home-students for info; /zh/leaving-australia for service | merge lodge-from-overseas into the owner; tax-after-leaving keeps the checklist of other tasks |
| 报税填错了 | /zh/blog/amend-tax-return; /zh/blog/fix-tax-return-mistakes-international-students | amend-tax-return (page pos 5.7, 1 click) | merge or retarget fix-tax-return-mistakes to "发现错误后 ATO 会罚吗" |
| 逾期报税罚款 | /zh/blog/late-lodgment; /zh/blog/late-tax-return-penalty-dollars-students; /zh/blog/tax-deadline-final-week-checklist-students | late-lodgment (page pos 6.3) | penalty-dollars keeps "罚款多少钱" with numbers; final-week checklist keeps "截止日过了怎么办" |
| 欠ATO的税 分期 | /zh/blog/tax-payment-plan; /zh/blog/owe-the-ato-international-students; /zh/blog/ato-tax-debt-interest-international-students | tax-payment-plan for 分期; owe-the-ato for 欠税 | interest article keeps 利息 only |
| DASP 多久 / 材料 | /zh/blog/dasp-documents-and-timing; /zh/blog/how-long-does-dasp-take-international-students; /zh/blog/dasp-documents-checklist-international-students | how-long owns 多久; checklist owns 材料 | retarget dasp-documents-and-timing to "DASP 网上申请步骤" (gap 2) |
| 养老金退税 | /zh/superannuation; /zh/leaving-australia | /zh/superannuation | leaving-australia links to it with anchor 养老金退税 |
| 雇主交多少养老金 | /zh/blog/how-much-super-employer-pays; /zh/blog/how-much-super-should-employer-pay-international-students | how-much-super-employer-pays (page pos 3) | the other keeps the "怎么自己算" worked example |
| 找回养老金 | /zh/blog/find-and-check-your-super; /zh/blog/how-to-find-lost-super-international-students; /zh/blog/super-multiple-funds-international-students | find-and-check-your-super (page pos 6) | lost-super keeps 失联; multiple-funds keeps 合并 |

## 4. AI answers (questions AI assistants are likely asked, and the quotable page)

| Question | Page that should be the quotable answer | Note |
|:--|:--|:--|
| 中国留学生在澳洲打工需要报税吗？怎么报？ | /zh/do-i-need-to-lodge | add the austaxai style wording "中国留学生" to the short answer box |
| 留学生回国后怎么把澳洲养老金（退休金）领回来？要扣多少税？ | /zh/superannuation | short answer already gives 35%; add 退休金 (gap 1) and the 6 month rule in the box |
| 学生签证怎么申请 TFN 税号？要多久？ | /zh/blog/how-to-apply-for-a-tfn-international-students | the short box should state free, online, 28 days, like apply-for-tfn-student-visa does now |
| 留学生送 Uber Eats 需要 ABN 吗？外卖收入怎么报税？ | /zh/abn-delivery | add a one sentence direct answer at the top (no tax withheld, GST only above threshold, $385) |
| 澳洲退税一般多久到账？ | /zh/blog/how-long-does-a-tax-refund-take | already has "12 个工作日" fact box and GSC page pos 5.0; keep it the single owner |
