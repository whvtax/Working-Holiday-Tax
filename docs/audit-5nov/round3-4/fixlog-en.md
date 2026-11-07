# Round 4 fix log: EN service pages

Files edited (only these): `src/app/(site)/tfn/page.tsx`, `src/app/(site)/abn/page.tsx`,
`src/app/(site)/tax-return/page.tsx`, `src/app/(site)/superannuation/page.tsx`.

## Applied

### /tfn (svc-tfn-en.json)
- P1 title "Working holiday visa TFN: how to apply"; new meta description.
- P1 H1 kicker "Tax File Number (TFN) application · working holiday visa 417 and 462"; slogan unchanged.
- P1 hero lede rewritten answer first (in .hero-lede).
- P1 figures block: Free / 28 days / Day 29 / 45% / 15% (unique keys), dated intro line, small line linking /tax-return.
- P1 new section "How to apply for a TFN on a working holiday visa" (id how-title): 4 steps, ATO link, "Who can apply online" rows (palePanel pairs), inline WaButton (topic tfn).
- P1 failure section eyebrow "Where it goes wrong", "more weeks" wording.
- P1 FAQS replaced by the 10 planned items (FAQPage still mapped from FAQS).
- P1 webPageLd name/description, dateModified 2026-11-05, two ATO citations; speakable kept.
- P2 "After your TFN arrives" LinkRows (/tax-return, /abn, /superannuation) + "Keep the letter" line. Eyebrow left off to avoid two "What is next" eyebrows.
- P2 GUIDES +3 (delayed, no fixed address, before arriving); section title "More on the TFN".
- P2 guarantee moved after the return section with the lead sentence; guarantee text unchanged.
- P2 sources line under the FAQ (3 ATO links, checked 5 November 2026).
- P2 forest CTA copy; FAILURE_POINTS[2] body; serviceLd description.
- Rule fixes beyond the plan: OG description "We prepare and lodge the TFN application" -> "We prepare the TFN application with you"; trust text "Every TFN application we lodge" -> "we prepare"; FAILURE_POINTS[2] title "It was lodged before the visa was active" -> "It was sent before you were in Australia" (matches ATO "located in Australia"); WHAT_WE_DO "before lodging" -> "before anything goes to the ATO". "Would rather we handled it?" -> "Would you rather we handled it?" (grammar).

### /abn (svc-abn-en.json)
- P1 title/OG/twitter/webPageLd name: plan text converted to sentence case ("Can you get an ABN on a working holiday visa?"), because the brief only allows Title Case for unchanged titles.
- P1 descriptions, hero lede, split intro, key figures section (Figures, id figures-title, sources line), how-to section (HOW_TO steps + guide link), ATO myth paragraph, inline WaButton "Send us the job on WhatsApp", 3 new FAQs first.
- P2 DIY FAQ moved last; TFN/ABN FAQ last sentence; /tfn paragraph; /superannuation link in warn section; GUIDES +3 and title; second LinkButton to /superannuation; breadcrumb "ABN"; dateModified + speakable #figures-title; serviceLd description.
- Rule fix beyond the plan: WHAT_WE_DO "We register it against the work you actually do" -> "We prepare it around the work you actually do" (implied lodging the ABN application).

### /tax-return (svc-tax-return-en.json)
- P1 key figures table (real table, th scope=row, class key-figures, caption) after the "What is" section; Medicare row made conditional ("An exemption, where you are entitled to one, needs ...").
- P1 early-lodgement FAQ; WhatsApp prompt + WaButton (waUrl detail) in #two-ways; title "Working holiday visa tax return (417 & 462)" (sentence case), description, webPageLd name; residency card; REFUND_SOURCES href/linkText rendered with Link.
- P2 two FAQs (financial year; unregistered employer); rules section moved before #how-it-works; FAQ section eyebrow/title + "Ask it on WhatsApp" (WaLink with tracking instead of a bare <a>); "Last updated 5 November 2026"; dateModified + speakable .key-figures; totalTime removed; breadcrumb "Tax return"; GUIDES (removed backpacker rates row, added deadline and Medicare guides).
- From dasp-plan S10: super bridge paragraph after the RULES cards, worded "a fund that offers international transfers can pay it overseas".
- Rule fixes beyond the plan: serviceLd name/serviceType "Lodgement"/"preparation and lodgement" -> "Preparation"/"Tax return preparation"; keyword "tax agent working holiday maker" -> "tax return help working holiday maker"; RULES[0] and overseas FAQ "DASP can be paid overseas" qualified "if your fund offers it" (ATO-held super only to an Australian account or cheque). Refund range sentence kept exactly.

### /superannuation (svc-superannuation-en.json + dasp-plan.json en)
- P1 title (absolute, sentence case), description (removes "how we lodge it for you"), hero lede; dasp S1 timing/blockers sentence added as second paragraph in .hero-sub.
- P1 key figures section (#key-figures, dl, "Source: ATO", dated link to ATO DASP page); MYGOV rows 1-3 and leftLabel "On your own"; statement; new #how-to-claim ordered steps with the two links and inline WaButton; #how-much heading + DASP rates table with caption/source; #how-long; #from-overseas; #never-claimed (no deadline, "fee free" removed); faqs[0].
- P2 #who-can-claim paragraph 1 (no other active visa, 405/410), ABN paragraph, #while-in-australia paragraph, #find-your-fund links, 2 FAQs (start before leaving; no deadline), GUIDES +2, "What is next" leaving line, speakable + dateModified + inLanguage, indentation fixes, with-us line.
- From dasp-plan S5: #documents "will usually want" -> "may ask for", plus Certification of Immigration Status on paper applications for $5,000 or more. S4: ATO-held line now "through the same application" (no "same standard" claim). S11 keywords added.
- Section tones re-alternated (pale/white) after inserting #how-to-claim.

## Skipped
- tfn P2 `src/lib/wa.ts` EN.tfn prefill: outside my files (brief: never edit other files).
- tax-return P2 datePublished "first publish date from git": git history is a single shallow import (2026-11-05), no reliable first-publish date; only dateModified added.
- dasp-plan S9 extra FAQs (form, $5,000, PR/NZ, when can I claim) and S6 alternative MYGOV rows: round 4 plan supersedes with its own rows/FAQs; kept page length in line with the plan.
- dasp-plan "not verified" softening of "not something a later visa application turns on": kept, since the round 4 plan lists "claiming a DASP does not affect future visa applications" as an ATO-sourced fact.
- dasp-plan S10 blog service card / LocaleGuidePage edits: other files.

## Facts used (source)
- TFN online application rules, free, 28 days, no second application, NZ, 8101/8103/8116, updated 22 June 2026: ATO foreign passport holders TFN application page.
- 28-day withholding at normal rate after declaration: ATO TFN declaration payer information.
- 45% no TFN, 15% WHM to $45,000 from 1 July 2026, WHM brackets, 47% no ABN, $75,000 GST, 12% SG + Payday Super, 8547: public/llms.txt Key facts (ATO / Home Affairs).
- ATO phones 13 28 61 / +61 2 6216 1111: ato.gov.au/contact (plan).
- ABN free, outcome on completion, 20 business days review: business.gov.au; ABN entitlement: abr.gov.au; contractor myths: ATO.
- Early lodgement paper only, 50 business days; refunds only to Australian accounts; 10 business days online processing; residency nationals list: ATO pages cited in svc-tax-return-en.json.
- DASP 65% taxed/untaxed for WHM (35%/45% others, nil tax-free) since 1 July 2017; 28 days from completed application; ATO-held super only to an Australian account or cheque; no deadline; unclaimed after six months; start and save before leaving; $5,000 certified ID / Certification of Immigration Status: ATO DASP pages (svc-superannuation-en.json, dasp-plan.json F1-F9).

## Verification
- `npx tsc --noEmit -p .`: clean.
- `npx jest __tests__/wht-copy-compliance-6-languages.test.ts`: 3/3 pass. No test imports these page files directly; related page/SEO/security suites pass; full `npx jest`: 454 suites pass (6182 tests, 1 skipped).
- `npx eslint --quiet` on the 4 files: clean.
- No U+2013/U+2014/U+2015/U+00A0 in the 4 files.
- Not done (per brief): build, dev server, browser check.
