# Plan 3: tax return and super, problem guides (24 Nov 2026)

Base: v69 zip (Phase 1). Research: 20 agents (docs/impl-logs/plan3/r01..r20). Build: 10 agents (build-*.md).
Independent review: docs/impl-logs/plan3/review.md (0 rule breaches; 3 medium and 12 low fact points, all fixed).

## New guides
WHT EN (17): mygov-problems-tax-return-super, mygov-sms-code-not-received-overseas, mygov-account-locked-out,
cant-link-ato-to-mygov, myid-foreign-passport-working-holiday, tax-return-without-mygov, claim-super-without-mygov,
tax-refund-closed-australian-bank-account, ato-tax-return-status-meaning, tax-refund-less-than-expected-offset,
ato-letter-asking-for-information-tax-return, notice-of-assessment-working-holiday, dasp-online-application-problems,
visa-still-active-cant-claim-super, certify-documents-overseas-super-claim, claim-super-if-coming-back-to-australia,
tax-and-super-timeline-working-holiday. Files: src/app/(site)/blog/data-mygov.ts, data-problems.ts.
DE 9, JA 10, FR 5, IT 5, ES 5 (same slugs). SVT 4 guides x en/zh/vi (long/*/batch-13-problems.ts).

## Money pages
/tax-return: "What can stop a working holiday tax refund" table (#refund-problems), myGov and closed-account FAQs, dates table.
/superannuation: "Do you need myGov to claim your super?" (#no-mygov), DASP online problems table, FAQ.
DE/JA/FR/IT/ES tax return and super pages: myGov sections or FAQs; SVT home + /superannuation FAQs in en/zh/vi.
Guide lists on all money pages link the new guides; FR anchors repointed to the flagship; IT nav label "Tax return".

## Fact fixes (all languages, both sites)
ATO refund processing: most online returns within 10 business days (was "about 12"), manual up to 30 days, paper up to 90
business days (early lodgement before leaving stays 50). Closed bank account (Reserve Bank, reissue or cheque). ATO-held super
paid only to an Australian account or cheque. 31 Oct 2026 was a Saturday: self lodgers until 2 Nov. Agent lodgement program
wording per ATO. Medicare levy lines no longer say a WHM needs a Medicare Entitlement Statement.

## Other
WhatsApp: guide closing CTA and mobile bar open on the reader's problem (src/components/ui/guide-wa-topic.ts guideWaUrl);
GA topic values unchanged. llms.txt / llms-full.txt updated (hand edit; generator not in zip).

## Not changed, Jo to decide
"About 14 business days" in money-page descriptions and Will messages (our service wording; ATO says 10).
Will tells customers the DASP service is not available (Jo: super is a core service).
Super guide CTAs "lodge it once" (rule: never "we lodge"). ES sidebar "presentamos el reclamo".
Client agreement mentions refunds to an overseas account (ATO pays refunds only to Australian accounts).
GSC: /de/tax-return "crawled, not indexed" since 16 Nov: request indexing.

## Tests
tsc, eslint clean. jest 522 suites: only the 8 suites that fail on the zip as received. next build OK, 1,727 pages.
Crawl WHT 1,070 pages / SVT 573: 0 errors, 0 compliance hits. Rule scan of 5,296 added lines: 0 dashes, 0 agent/lodge
claims, 0 promises, 0 AI. Phone browser + axe on 32 pages incl. 11 new guides: 0 violations.

## Round 2 (final zip, 24 Nov 2026)
Jo: decide everything from the code; website offers super help, WhatsApp bots untouched.
- Super CTAs in all languages: "find every fund under your TFN and go through the claim with you, step by step" (no lodge/submit).
- Client agreement (EN/DE/JA): refund account line corrected (ATO pays refunds only into an Australian account, else cheque).
- New /leaving-australia hub in 6 languages (sitemap + hreflang; footer "Learn" column keeps five links: replaces TFN Articles).
- New payday-super-working-holiday guide in 6 languages; qualifying earnings wording from 1 July 2026 across both sites.
- 7 DE and 7 JA guides that showed in English are now native. Real tables on DE/JA money pages; FR/IT/ES date tables.
- Breadcrumbs Home > money page > category > title; trust line under every closing guide button; super mobile bar uses the
  supervision line; SVT: graduating section, 2026-27 dates, DASP online problems guide (en/zh/vi), Payday Super lines.
- Independent review 2: 0 high, 2 medium, 7 low, all fixed.
Tests: tsc, eslint clean; jest only the 8 suites failing on the zip as received; build 1,742 pages; crawl WHT 1,096 / SVT 576,
0 errors, 0 compliance; phone browser + axe 43 pages, 0 violations.
