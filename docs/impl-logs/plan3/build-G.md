# build-G (Student Visa Tax), 24 Nov 2026

Shape file for H: S/plan3/svt-shape.md (written first; includes the zh/vi fact-fix list for H).

## New
- src/lib/svt/content/long/en/batch-13-problems.ts (new, LONG_EN_13), wired in long/en/index.ts. Four long articles,
  dated 2026-11-24, answer-first, question H2s, list blocks, 3 FAQs each, no links in bodies, closing section in approved
  wording. Words / title chars / description chars:
  - mygov-sms-code-overseas-international-students (Tax return) 984 / 59 / 154
  - cant-link-ato-mygov-international-students (Tax return) 770 / 49 / 158
  - claim-super-without-mygov-international-students (Super) 690 / 45 / 155 (closing = what /superannuation already says
    + supervision line; no "you do not need myGov for us" claim on super)
  - tax-refund-closed-australian-bank-account-international-students (Tax return) 722 / 53 / 153
  Facts and URLs (r16 J1, J2, J4, J5, J7 to J12, E1, E2, E4, E8 to E10, F1, I1 to I3; r11 F2, F3, F9 to F11, F13; r08 F8):
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
  https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id
  https://my.gov.au/en/about/help/contact
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato (+ /information-you-need-to-link-mygov-to-the-ato)
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
  https://www.ato.gov.au/About-ATO/Contact-us/phone-us/
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp (+ /help-with-the-dasp-online-application-system)
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
  https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details
  Kept out: Code Generator, ATO linking code, myID Strong with a foreign passport (text says Strong needs Australian
  documents, J8/J9), refund to an overseas account, "DASP needs no myGov" as an ATO quote (worded "does not list a myGov
  sign in", r09 R4), any bank rule on reopening accounts.

## Related lists (r17 P1-3, P2-2; r08 P1-1, P1-3, P2-1; r09 P2-D), checked with longToGuide().related
- long/en/links.ts LONG_ALSO: 4 new entries (parent then siblings); bank-account-and-tax-international-students (new
  entry -> closed account guide); lodging-tax-return-after-going-home-students (myGov guide first);
  tax-after-leaving-australia-international-students, dasp-documents-checklist-international-students,
  how-to-find-lost-super-international-students, tax-refund-delays-international-students (one new link each, lists <= 3).
- services-en.ts /superannuation related: after 'home' insert claim-super-without-mygov, dasp-rejected,
  dasp-or-leave-super, employer-not-paying-super (r17 P1-3 + r08 P1-2).
- blog-en.ts lodge-from-overseas related: myGov guide after 'home'. guides-en.ts leaving-australia related: myGov guide and
  closed account guide (r08 P2-1).
- home-en/zh/vi answer.items: + "Refund late or smaller than expected?" (tax-refund-delays) and "Made a mistake on your
  return?" (amend-tax-return), r17 P1-3 wording in all 3 languages.

## Money-page FAQs (en, zh, vi; counts stay equal)
- home-en/zh/vi faq.items 9 -> 10: "I have left Australia and cannot sign in to myGov. Can I still lodge?" (r08 P1-2; zh/vi
  native, approved sign-off forms; "we deal with the ATO directly" from Will's existing MYGOV_REASSURANCE translations).
  Source: ATO lodge from outside Australia (above).
- services-en/zh/vi /superannuation faq 11 -> 14 (no myGov sign in listed for DASP; overseas account: ask the fund, ATO-held
  super Australian account or cheque; visa still active: VEVO, do not submit, DASPmail@ato.gov.au) + source "Help with the
  DASP online application system" (+ zh/vi sourceLabels). Source: r08 F8 / r16 E9, E10.

## Fact fixes (EN files and the G-owned zh/vi files)
- 12 -> 10 business days, paper 50 -> 90 (r16 H4, H5; how-to-track-the-progress page): home-en/zh/vi refund FAQ; blog-en
  how-long-does-a-tax-refund-take (meta description: number only; lead, list, FAQ q/a, short answer + facts 10/30/90);
  long/en batch-01 Step 7, batch-04 (tax-refund-delays: body, description number, answer, list, "two calendar weeks",
  FAQ q), batch-11 x2. No early-lodgment "50" exists in SVT EN.
- 31 Oct 2026 Saturday, accepted until 11:59 pm Monday 2 November (r14 V2, ATO media release 19 Oct 2026):
  blog-en deadline post (when paragraph, FAQ answer, short answer + fact label; figures unchanged); long/en batch-09
  late-tax-return-penalty-dollars-students and tax-deadline-final-week-checklist-students (body x2, FAQ; media release
  added to both sources); deadline.ts (EN/zh/vi passed note, deadlineFact both branches) and its test regex
  (__tests__/deadline-27oct.test.ts now expects the 2 November wording).
- Closed account (r16 I2, I3, E9): batch-04 tax-refund-delays "Delay 4" paragraph + FAQ (Reserve Bank return up to 10 days,
  reissue to new details or cheque, cheques held up to 90 days since Jan 2025; source missing-tax-return-refunds added);
  batch-02 "or decide which overseas account you will use" -> fund international transfer only if offered, ATO-held super
  Australian account or cheque.
- batch-01 lodging-tax-return-after-going-home-students: r08 P2-1 sentence appended under the existing myGov H2 (H2 text
  unchanged) + my.gov.au sign in help source.

## Prefills (r19 P1-C)
- src/lib/svt/i18n.ts: UiStrings whatsappAboutSuper + whatsappProblem {mygov, past-years, from-overseas} in en/zh/vi (r19
  wording), WHATSAPP_PROBLEM_PAGES map, guideWhatsappMessage(). src/components/svt/GuidePage.tsx guide-end button uses it
  (super/DASP slugs or Super topic -> super message). data-wa-pos unchanged. Every prefill names "Student Visa Tax", so
  Mia's isSvtEnquiry still matches (svt-enquiry-6nov test passes).

## For H (zh/vi files G does not edit)
Listed in svt-shape.md "URGENT for H" and "Closed bank account wording": 12->10 / 50->90 in blog-zh/vi and long/zh|vi
batch-01/04/11; 2 November note in blog-zh/vi deadline post and long/zh|vi batch-09; closed-account wording in long/zh|vi
batch-04 (Delay 4 + FAQ) and batch-02 (DASP payment paragraph). At verify time blog-zh/vi short figures were already 10/30/90.

## Not done / for Jo
- Titles/descriptions untouched except the factual 12 in two descriptions. batch-09 tax-deadline-final-week description
  still says the deadline "was 31 October 2026" (the legal due date; frozen, not wrong).
- /superannuation FAQ "12% of ordinary earnings" (r16 W5, qualifying earnings from 1 Jul 2026): not in my brief, left.
- r19 P2-A trust line under the SVT guide CTA and r17 P1-7 SVT visible crumb: not in my brief.

## Verify
- npx tsc --noEmit -p . : clean.
- jest src/lib/svt + svt-enquiry-6nov + new-locales-sitemap + wht-copy-compliance-6-languages: 727 pass, 3 fail, all in
  src/lib/__tests__/new-locales-sitemap.test.ts "LOCALE_GUIDE_SLUGS.<fr|it|es> matches the chunk data": the WHT FR/IT/ES
  agents added guide slugs to the chunks without regenerating LOCALE_GUIDE_SLUGS. Not my files.
- Dash grep (U+2012 to U+2015, U+2E3A/B, "——") on all changed files: none.
