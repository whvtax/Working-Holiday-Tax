# impl-svt: Student Visa Tax phase 1 (en, zh, vi)

Repo: /home/claude/v68/base20. Files: src/lib/svt/** only (brand-public.ts untouched); no app route or component changed.
No titles, meta descriptions, H1s or existing H2s changed (the coordinator's rule against rewording H2s was followed). No slugs, pages or redirects added.

## 1. Jo-decision wording (T2)
Medicare Entitlement Statement: every sentence implying we arrange, handle or get the MES now says the student applies to Services Australia and we explain how.
- EN: long/en/batch-01.ts (6 places), batch-02.ts (2), batch-04.ts (1), batch-10.ts (5 "tell us early"), batch-11.ts (2, incl. "we handle it" changed to "we check it ... you apply yourself, we explain how"), home-en.ts (story point "what we need from you for it"; FAQ "we tell you what to have ready").
- ZH: long/zh/batch-01.ts (3, "我们会帮你安排", "我们一起处理"), batch-02.ts (2), batch-03.ts (5, "我们会帮你安排 MES" x3, "告诉我们...安排", "MES 要尽早安排"), home-zh.ts (2).
- VI: long/vi/batch-01.ts (6), batch-02.ts (2), batch-03.ts (4), home-vi.ts (2).
Super consolidation (Jo: SVT does not consolidate): en batch-08.ts "We can help you decide whether it makes sense for you." changed to "You can do it yourself in ATO online services or with the fund you are keeping."; zh batch-10.ts "这一步我们可以帮你处理" removed (do it yourself via ATO online services or the fund); zh batch-08.ts "可以问我们" changed to "先问基金". The vi texts had no such claim.
TFN mail-holding address: SVT has no claim that we hold mail. It only gives general advice to use an address that holds mail, so nothing changed.
DASP help ("we check your funds, visa dates and forms") kept: that service exists.

## 2. Money pages (T6)
- Home en/zh/vi (home-*.ts):
  - New answer item "Missed 31 October, or never lodged earlier years?" linking /past-years, in all three languages.
  - New full answer-first block on /zh and /vi (a13 R2). It uses the same facts as en: 500/485, 30 June year, 31 Oct deadline passed but late returns OK, residency "may be" and the ATO decides, $220/$385 incl. GST, services list.
  - 3 new FAQ items in each language. Counts are now en 9, zh 9, vi 9, and FAQPage schema is built from the same list:
    - deadline and missed it (zh "2026报税截止日期")
    - refund time (zh "退税时间"; ATO: 12 business days online, up to 30 calendar days with manual checks, paper up to 50 business days, figures from the existing tax-back guide)
    - how much refund (vi "hoàn thuế ở úc được bao nhiêu"): no amount and no promise; we send an estimate before signing; guarantee limited to TFN-only returns
- /pricing en/zh/vi (guides-*.ts):
  - New section "Missed 31 October, or never lodged earlier years?" (id late). It says late returns are accepted and earlier years take one return each. It gives the penalties and interest facts from the existing past-years guide, which it points to.
  - 1 new FAQ "I missed 31 October..." (en 3 / zh 3 / vi 3).
  - related now has home, past-years and superannuation added.
- /superannuation hub en/zh/vi (services-*.ts): 3 new FAQs, so each language has 11. H1, lead and H2s unchanged. The new questions:
  - "How do I get my super back after I leave Australia?" (claim/get super back queries)
  - "What if my employer is not paying my super?" (GSC "not being paid super" 92 impr). Facts: 12% super guarantee, report unpaid super to the ATO, both from existing SVT articles.
  - "Do I still need a tax return if I claim my super?" (links the two services)

## 3. Internal links (T5)
Article bodies cannot hold links, so the work is done through the related lists:
- pages.ts relatedLinks: resolves new slugs 'home' and 'home#refund' to /, /zh, /vi. The labels are defined in long/en/links.ts HOME_LINKS:
  - 'home': "International student tax return" / "澳洲留学生报税" / "Khai thuế, hoàn thuế cho du học sinh"
  - 'home#refund': "Get your tax refund on a student visa" / "留学生退税：报税拿回多扣的税" / "Hoàn thuế thu nhập cho du học sinh"
- long/library.ts relatedOf: new moneyLinks() puts the core services first in every long article's related list. It decides from the English text, so all three languages behave the same:
  - home (refund anchor for slugs containing refund or tax-back) on every non-Super article, and on Super articles that mention the tax return: 144 of 150 articles.
  - /superannuation on Super articles and on any article mentioning DASP or leaving Australia: 46 articles.
  - This applies in en, zh and vi (zh and vi have texts for the same slugs).
- blog-en.ts (20 short posts, shared by zh/vi), guides-en.ts (8 guides plus pricing) and services-en.ts (TFN and super hubs): 'home', 'home#refund' or 'superannuation' added to related. Strong zh/vi pages such as how-long-does-a-tax-refund-take, tax-return-deadline-31-october and amend-tax-return now link to /zh and /vi.
- Tax-back guide (en/zh/vi long batch-11):
  - New "How to get your tax refund: 5 steps" list under the opening (怎么拿到退税：5 个步骤 / Cách nhận tiền hoàn thuế: 5 bước). The steps are ATO facts already on the page: Tax ready by 14 July, documents, lodging via myTax, an agent or paper, 31 Oct deadline with late lodging allowed, 12 business days, refund paid to an Australian bank account.
  - A pointer to the tax return page, with the approved agent sentence. The home#refund link is first in Related.
- vi TRS article (long/vi/batch-05.ts): new box paragraph at the top of the body, "Bạn tìm hoàn thuế thu nhập (khai thuế cuối năm) hay rút super?". It sends income refund readers to /vi and DASP readers to /vi/superannuation, which are now the first two Related links (a13 R1).
- TFN and ABN articles: all but one already close with a sentence about the tax return (e.g. pays taxed at 47% are worked out on the return), so no body change. They now get the home link via related.
- "Crawled, not indexed" list: WHT only, nothing for SVT.

## Not done (reason)
- vi average-tax-refund H2 "hoàn thuế ở Úc được bao nhiêu": not needed, because the article title is already that question.
- zh deadline and refund-time posts: these short posts must have the same section and FAQ shape as en and vi, so the questions went into the home FAQ in all three languages instead.

## Verify
- `npx tsc --noEmit -p .`: no errors in SVT files. The only errors are syntax errors in src/components/layout/RootDocument.tsx, which another agent is editing; it is not my file.
- jest `src/lib/svt`, wht-copy-compliance-6-languages and new-locales-sitemap: 9 suites, 708 passed.
- Brand, routing, whatsapp and other SVT-related suites: 6 suites, 306 passed, 2 skipped.
- Dash scan on all changed files: none.
