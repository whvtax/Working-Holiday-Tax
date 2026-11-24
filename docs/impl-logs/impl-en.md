# impl-en: WHT English, phase 1 content (24 Nov 2026)

Scope: src/app/(site)/** except crm and blog/[slug]/page.tsx. No titles, meta descriptions, slugs, /superannuation H1
or frozen openings changed. No existing H2 reworded. No prices added. No dashes.

## 1. Jo-decision wording fixes (9)
Medicare Entitlement Statement: we explain how to apply; the client applies to Services Australia.
- blog/data.ts medicare-levy-working-holiday-makers: "We handle it as part of preparing your return" (under "How does the
  levy affect your return" area) and "We take care of this for you" (under "What is the piece of paper?") rewritten.
- blog/data.ts german-european-health-insurance...: "We handle the statement as part of preparing the return" rewritten.
- medicare/page.tsx: MYGOV row "We help you apply for the statement..."; FAQ "What is a Medicare Entitlement Statement"
  ("so we deal with it"); "Not entitled" card ("we handle that"); Service schema description ("handled ... including the
  Medicare Entitlement Statement").
- german-working-holiday-tax/page.tsx: WHAT_WE_DO "Apply for the Medicare Entitlement Statement"; MYGOV row "apply for
  the statement".
- page.tsx (home): comparison row "We help with the application if you qualify" -> "We explain how to apply if you
  qualify" (row was marked "approved 22 Aug verbatim"; Jo's 24 Nov decision overrides it, flag for Jo); FAQ "Do you only
  handle tax returns?" no longer says we handle "Medicare levy exemption certificates".
TFN mail-holding address (no such service):
- blog/data.ts tfn-application-delayed: "We handle TFN applications with a verified address that holds mail..." ->
  "We help with TFN applications, but the letter always goes to the address you choose..."
Kept: "We work out the address problem with you" (/tfn) and ATO address update wording (service exists).

## 2. Money pages
/tax-return (tax-return/page.tsx)
- H1 now "Working holiday visa tax return (417 & 462)"; slogan kept as subtitle paragraph under it.
- Hero lede is answer-first (one return per financial year, settles withheld vs owed, refund ~14 business days).
- og/twitter title "Lodge Your Working Holiday Tax Return" -> "Working holiday visa tax return (417 & 462)"; og
  description "it is lodged" and twitter "then lodged" -> approved "Reviewed and signed off by a registered tax agent
  before it is lodged with the ATO". Page title and meta description unchanged.
- New H2 "How do I get a tax refund on a working holiday visa?" (Bing grounding query, 110 citations): 52 word answer +
  5 ATO steps + ATO source link. Not an FAQ item, so FAQPage schema (15) still equals visible FAQ.
- New H2 "Missed 31 October, or never lodged an earlier year?": no cut off for unfiled returns, ATO generally no FTL
  penalty on refund/nil, penalty unit $364 from 1 Jul 2026, myTax 2016+, links past-years and late-penalty guides,
  WhatsApp CTA. Facts from existing guides late-tax-return-penalty / past-years (ATO pages cited there).
- dateModified and "Last updated" -> 24 November 2026.
/superannuation (superannuation/page.tsx), H1 untouched
- New "What is DASP?" box (H2) under the photo, ATO DASP source ("dasp" 288 impr at 7.4).
- FAQ 10 -> 12: "How do I get my superannuation back after a working holiday?" (GSC 94@36 + 81@39.6), "Can my super be
  paid into an overseas bank account?". FAQPage schema maps the same array.
/medicare FAQ 6 -> 9: how to apply for the MES (servicesaustralia.gov.au/how-to-get-medicare-entitlement-statement,
  checked 24 Nov: from 1 July, myGov MES dashboard / online application / form MS015, passport photo page, up to 4
  weeks before departure); reciprocal agreement countries (Bing "reciprocal medicare" 164 cit.; list from the page);
  foreign residents do not pay the levy (existing guide text).

## 3. Internal links (43 added in guides)
- tax-back-australia-working-holiday: new H2 "How do you get your tax back, step by step?" right after the frozen
  opening, 5 ATO steps + ATO link + "working holiday tax return service" link to /tax-return.
- how-to-update-address-with-ato (frozen opening untouched): line below opening, address update is part of our tax
  return service, linking /tax-return.
- /superannuation links added to 16 guides that discuss super/DASP/leaving: what-happens-without-your-tfn,
  farm-work-and-abns, how-to-lodge-tax-return-from-overseas, cash-in-hand-tax-return, can-your-employer-pay-you-cash-in-hand,
  can-you-work-for-multiple-employers, farm-work-rights..., how-to-read-a-payslip..., second-third-year-visa...,
  hospitality-award..., restaurant-industry-award..., ato-tax-debt-failure-to-pay..., backpacker-tax-history...,
  how-long-does-tax-refund-take-australia, gross-pay-vs-net-pay-australia, do-you-need-to-lodge-tax-return-short-stay.
- /tax-return: every EN guide (144) already linked it; TFN and ABN guides all already link it, so no extra sentence
  added (would break one link per target).
- /medicare: medicare-levy-working-holiday-makers and uk-medicare-reciprocal-agreement-australia now link it.
- Crawled-not-indexed (wht-crawled-not-indexed-1124.xlsx, /blog/ EN URLs that exist): 23 contextual links so each now
  has at least 2 links from guides with GSC impressions (Pages.csv): fair-work-act (casual-shift-cancellation,
  unpaid-trial-shifts), what-is-an-income-statement (what-does-tax-withheld, what-is-payg-payment-summary),
  bullying-harassment (workplace-injury, fair-work-act), how-many-hours (multiple-employers, six-month rule),
  employer-asking-... (six-month rule, how-many-hours), private-health-insurance (what-is-medicare, german-european),
  waiter-waitress (hospitality-award, rsa-certificate), how-does-australian-tax-year-work (australian-financial-year-dates,
  how-long-tax-refund), second-third-year (do-you-need-new-tfn-second-visa, fruit-picking), bartender (+barista),
  what-is-a-tax-agent (+late-tax-return-penalty), farm-work-rights (+fruit-picking), understating-income
  (+what-does-tax-withheld), abn-deductions (+can-you-have-tfn-and-abn). Links on frozen pages are all below the opening.
  Not linkable: minimum-wage-australia-2025-26, how-to-apply-for-super-back, super-rate-12-percent-2025-2026-increase
  (no longer exist as EN guides); /guides/* URLs are legacy.

## 4. December items (EN)
- super-for-casual-and-part-time-workers: new H2s "Is super payable on overtime for casuals?" (ATO "what payments are
  qualifying earnings", fetched 24 Nov, last updated 2 Sep 2026) and "Do casual employees on a working holiday visa get
  super?" (casual super group about 376 impr).
- gross-pay-vs-net-pay-australia: new H2 "Does gross pay include super?" (89 impr group) with /superannuation link.
- Not done here: Payday Super guide and /leaving-australia (new pages, excluded in this pass).

## Verify
- npx tsc --noEmit: clean. Dash check on added lines: none.
- jest locale-blog, frontend-security, round2-frontend-security, page-photo-priority, brand-separation, analytics-privacy,
  new-locales-sitemap, src/lib/svt: 15 suites, 974 tests pass. Full jest: 7 failed tests (Will + form-start-lang), the
  known pre-existing set. __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
- For Jo: home comparison row was labelled "approved verbatim"; changed only because of the MES decision.
