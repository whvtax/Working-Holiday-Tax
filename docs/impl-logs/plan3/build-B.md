# build-B (24 Nov 2026): /tax-return, /superannuation, home and Medicare fact fixes, llms files, problem prefills

Repo: /home/claude/v68/base20. Only files owned by task B were edited.

## src/app/(site)/tax-return/page.tsx
- KEY_FIGURES Medicare row (r16 W3/P2): now "2% ... for residents for tax purposes. Foreign residents, which most working
  holiday makers are, do not pay it and claim the exemption in the return. A resident who is not entitled to Medicare needs
  a Medicare Entitlement Statement". Sources: D1/D2 https://ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/foreign-residents-exemption-from-medicare-levy ;
  C3 https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/working-holiday-makers ;
  D3 https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits
- KEY_FIGURES processing row (r18 1a / r16 W7, H9): the ATO-sourced row no longer carries our "about 14 business days";
  it now says 10 business days online, up to 30 calendar days with a manual check, up to 90 business days on paper (H4, H5).
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return ;
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return
  NOT changed (frozen or not ATO-attributed): meta description, hero lead, step 07, FAQ 1 and the two "usually about 14
  business days" sentences. Jo: 14 is not on any ATO page (H9); decide in December whether to keep it as our own figure.
- #get-a-refund source line (r18 P2-2): added the page that actually says refunds need an Australian account
  (https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia)
  and the 10 business days page (H4).
- #missed-deadline: new table "Your working holiday dates and the returns they need" (r01 P1-C; rows checked: FY 1 Jul to
  30 Jun, 31 Oct due date H1, myTax prior years from 2016 H7 https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return ,
  early paper return H6). Caption names the early return exception.
- New Section #refund-problems after #missed-deadline, H2 "What can stop a working holiday tax refund, and what do you do?"
  (r15 P1-2, r18 P1-1): verdict sentence, 6-row table (problem / official rule / what to do), sources line, approved close
  ("You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a
  registered tax agent before it is lodged with the ATO."), WhatsApp button (topic tax-return, detail "something is holding
  up my refund"). Q + verdict added to FAQPage with url /tax-return#refund-problems, not to the accordion.
  r15 row 1 "Code Generator app" REMOVED (retiring 28 Feb 2027, BUILD rule). Facts per row: J1 https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato ;
  J6/J7 https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help and https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id ;
  J8 https://www.myid.gov.au/verifying-your-id-in-myid ; J11 linking questions; I1 to I3 https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds ;
  tax ready and 45% rows = facts already on the page (step 2, REFUND_SOURCES); H4/H5; ATO phone from overseas
  +61 2 6216 1111 https://www.ato.gov.au/about-ato/contact-us (r15 F7). Links (canonical slugs): mygov-sms-code-not-received-overseas,
  mygov-account-locked-out, cant-link-ato-to-mygov, tax-refund-closed-australian-bank-account, tax-return-without-tfn-australia,
  ato-tax-return-status-meaning, mygov-problems-tax-return-super.
- FAQS (r01 P1-B): added "Can I get my tax refund without myGov?" and "My Australian bank account is closed. Can I still get
  my refund?" (I1 to I3; outside Australia page lists agent and paper routes). FAQPage follows automatically.
- GUIDES (r17 P1-3): + tax-back-australia-working-holiday, amending-tax-return-australia, tax-obligations-after-leaving-australia,
  mygov-problems-tax-return-super, tax-refund-closed-australian-bank-account, ato-tax-return-status-meaning.
- Title, description, H1 untouched.

## src/app/(site)/superannuation/page.tsx (H1, title, description untouched)
- New Answer #no-mygov "Do you need myGov to claim your super?" after #how-to-claim (r02 P1-1, r13 P1-D). The "no myGov
  sign in" sentence was verified on the application itself today (WebFetch of https://applicant.tr.super.ato.gov.au/applicants/default.aspx?pid=1:
  no myGov, a self-created "shared secret", "exactly the same tax file number, name, passport and date of birth each time")
  plus E10 https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
  (passport, email, fund ABN, TFN optional). Close: "You do not need myGov for us to help either. We deal with the ATO directly."
  Links: claim-super-without-mygov, mygov-problems-tax-return-super.
- New FAQ "Can I claim my super if I cannot get into myGov?" (r02 P1-1).
- New Answer #dasp-online-problems "Why can you not submit your DASP application?" after #how-long (r15 P1-3): 6-row table
  (visa active/VEVO/DASPmail; same details as first time; fund missing, Add application + ABN; shared secret 3 tries, ATO
  +61 2 6216 1111 ask for 13 10 20; certified ID at $5,000 or more E6; ATO-held super Australian account or cheque E9),
  sources (E2 DASP page, E10 help page), links to dasp-online-application-problems, dasp-rejected-what-to-do,
  visa-still-active-cant-claim-super, certify-documents-overseas-super-claim; button detail "my DASP application is stuck".
- Both new Q + answers added to FAQPage with url #no-mygov / #dasp-online-problems (not in the accordion).
- 65% overstatement (r02 P2-2): FAQ and #how-much now "super contributed while you held a 417 or 462 visa ... applies to the
  whole taxable component, because the law does not allow it to be split" (E1/E3; APRA FAQ "The law does not allow for apportionment").
- GUIDES: + super-for-casual-and-part-time-workers, how-to-check-super-balance-working-holiday (r17 P1-3),
  claim-super-without-mygov, dasp-online-application-problems, visa-still-active-cant-claim-super,
  certify-documents-overseas-super-claim.
- speakable dateModified 2026-11-05 -> 2026-11-24.

## src/app/(site)/page.tsx (fact fix only)
- FAQ "after I have already left": "a super refund (DASP) can be paid overseas" -> "from your fund can be paid overseas if
  the fund offers international transfers" (E9; ATO-held super cannot). Nothing else.
- Flag for Jo, NOT changed (approved copy "Do not reword"): FIGURES "2% ... Removable with a certificate almost nobody
  applies for" is only true for residents not entitled to Medicare (D2/D3).

## src/app/(site)/medicare/page.tsx (fact fixes only)
- MYGOV row 3, the "quieter mistake" paragraph and the MES FAQ now say the statement is for residents for tax purposes, and
  that foreign residents (most working holiday makers, C3) do not pay the levy and need no statement (D2 URL above).
- Flag for Jo, NOT changed: hero lead "Removable with a certificate almost nobody applies for" (same issue; hero copy).

## public/llms.txt (hand edit: scripts/generate-llms.mjs is not in the zip)
- Key facts: SG line now "of qualifying earnings for pay from 1 July 2026" (G3 https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super);
  Medicare line corrected as above; new dated lines: refund processing 10 / 30 / 90 and early 50 (H4, H5, H6), refund bank
  account and closed account (I1 to I3), DASP (E2, E4, E8, E9, E6, F1, applicant page), myGov after leaving (J1, J3
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help ; Code Generator stated as retiring, not as a fix).
- New section "Refunds and super: common problems" (r15 P2-1 b), one line each, answer then URL.
- 17 new guides added to Tax Return (now 54) and Super (now 20) with their descriptions (titles read from
  src/app/(site)/blog/data-mygov.ts and data-problems.ts); total 161; "Other languages" sentence made accurate.
## public/llms-full.txt
- 17 new EN entries in the Tax Return and Super sections, counts and "161 English guides" updated.
- 12 -> 10 (and general paper 50 -> 90) in the how-long summaries: EN (now equals data.ts description), DE, JA title and
  summary (r16 P1 JA title), FR, IT, ES. Locale data descriptions were still "12" when checked: if the locale agents
  word them differently, resync these five summaries.

## src/components/ui/guide-wa-topic.ts + src/lib/__tests__/whatsapp-click-23nov.test.ts (r19 P1-A)
- Added WaProblem, GUIDE_WA_PROBLEM (10 existing guides per r19 + 11 new canonical slugs), PROBLEM_PHRASES in en/de/ja/fr/it/es
  (r19 text; two keys added for the new guides: bank-closed, dasp-stuck), guideWaProblem(slug), guideWaUrl({category, slug,
  lang, title}). guideWaTopic and GUIDE_WA_TOPIC unchanged, so GA4 topic values are unchanged. Every myGov line matches
  Will's MYGOV_TROUBLE_RE (tested).
- Test: the MobileCta regex now accepts today's call or `guideWaUrl({ category: guide.category, slug: guide.slug, lang: ..., title: guide.title })`
  with topic still guideWaTopic(guide.category); new test for the map, phrases, no dashes, unmapped fallback.
- NOT wired (files not owned by B): GuideCta.tsx (`waUrl({ topic, lang, detail: title })` -> `guideWaUrl({ category, slug, lang, title })`),
  GuideArticle.tsx InlineGuideCta, blog/[slug]/page.tsx and LocaleGuidePage.tsx MobileCta. Until the owner swaps those
  calls, readers still send today's message.

## Verify
- `npx tsc --noEmit -p .` clean.
- jest: whatsapp-click-23nov, src/lib/svt, brand-routing, locale-blog pass. Failing, not B's: review-fixes-27oct (pre-existing,
  scripts/generate-llms.mjs missing from the zip); new-locales-sitemap "LOCALE_GUIDE_SLUGS.fr/it/es matches the chunk
  data" (FR/IT/ES agents added guides without regenerating the slug list). An earlier run also showed svt i18n-rules
  failing mid-edit by the SVT agent; it passed on the final run. __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo.
- Dash grep (U+2013, U+2014, U+2015, "——") on all changed files: clean. No "we lodge", no tax agent claim, no prices, no
  other brand, no AI wording.
