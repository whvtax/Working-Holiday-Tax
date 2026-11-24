# Plan 3 BUILD brief (24 Nov 2026): tax return + super, problem guides, fact fixes

S = /tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad
Repository: /home/claude/v68/base20 (= v69 zip delivered to Jo; the ONLY code base). node_modules installed.
Jo approved: research then build into a new production zip. You are a BUILD agent. Ten agents edit the repo at the same
time: edit ONLY the files your task owns (listed in your task). Re-read a file right before each edit. Do not commit,
deploy, run `next build`, start servers, or touch .data/.

## Read first
1. S/plan2/IMPL_RULES.md: every content rule and the freeze list apply. A single rule breach is unacceptable.
2. S/plan3/r16-facts.md: THE facts file. Use only facts marked verified there or verified (with URL) in the report you
   build from. Anything a report marks unverified stays out. Never: the Code Generator app as a fix (retiring 28 Feb 2027),
   phoning the ATO for a linking code, myID reaching Strong with a foreign passport, a refund paid into an overseas account.
3. S/plan3/r17-architecture.md section P1-1 to P1-5: the slug registry and hub/spoke link rules. Use EXACTLY these slugs.
4. The research reports named in your task (they hold ready text in each language).

## Canonical new guides
WHT EN (slugs identical in every language that gets the guide; a locale guide renders only if the EN twin exists):
myGov set (category "Tax Return" unless noted):
  mygov-problems-tax-return-super (hub), mygov-sms-code-not-received-overseas, mygov-account-locked-out,
  cant-link-ato-to-mygov, myid-foreign-passport-working-holiday, tax-return-without-mygov,
  claim-super-without-mygov (Super)
problem set:
  tax-refund-closed-australian-bank-account, ato-tax-return-status-meaning, tax-refund-less-than-expected-offset,
  ato-letter-asking-for-information-tax-return, notice-of-assessment-working-holiday,
  dasp-online-application-problems (Super), visa-still-active-cant-claim-super (Super),
  certify-documents-overseas-super-claim (Super), claim-super-if-coming-back-to-australia (Super),
  tax-and-super-timeline-working-holiday
Localised: DE = myGov set minus tax-return-without-mygov, plus tax-refund-closed-australian-bank-account,
  dasp-online-application-problems, claim-super-if-coming-back-to-australia.
  JA = full myGov set, plus tax-refund-closed-australian-bank-account, dasp-online-application-problems,
  tax-and-super-timeline-working-holiday.
  FR, IT, ES each = mygov-sms-code-not-received-overseas, mygov-account-locked-out, tax-return-without-mygov,
  claim-super-without-mygov, tax-refund-closed-australian-bank-account.
SVT (en, zh, vi): mygov-sms-code-overseas-international-students, cant-link-ato-mygov-international-students,
  claim-super-without-mygov-international-students, tax-refund-closed-australian-bank-account-international-students.
Every new guide: title up to 60 chars, description 120 to 160, date "24 November 2026", answer-first opening (the answer
in sentence one), question H2s, a short table or numbered steps where it helps, links per r17 (hub money page once, parent
once, 1 to 2 siblings; max 8 body links; none in paragraph 1), and the closing section in approved wording:
"You do not need myGov for us to help" (or the topic equivalent), "We deal with the ATO directly", "Reviewed and signed off
by a registered tax agent before it is lodged with the ATO" (tax return) / supervision wording (super), WhatsApp. For the
super CTA use only what the existing /superannuation page of that language already says about our service. Use the
existing translations of the approved sentences (grep the codebase in that language); never invent a new claim.
English and SVT bodies at least 600 words (tests check this); locale bodies native, not word for word.

## Fact fixes (each agent in its own files)
- Refund timing: "about 12 business days" (and equivalents) becomes the ATO's current wording: most online returns are
  processed within 10 business days (r16 has the sentence per language). Paper returns: up to 90 business days, NOT 50,
  except where the text is about lodging early before leaving Australia (that 50 stays). The 12 in the EN and JA title of
  how-long-does-tax-refund-take-australia is a factual error: fix the number only, keep the rest of the title.
- Closed Australian bank account: use r12/r16 wording (returned via the Reserve Bank, then new details or a cheque; some
  cheques held up to 90 days). DASP: super already held by the ATO is paid only to an Australian account or by cheque; a
  fund may pay by international transfer. Fix any page that says otherwise (r04 found JA FAQs).
- SVT posts: 31 October 2026 was a Saturday; self-lodged returns were accepted until 11:59 pm Monday 2 November (r14).
- WHT "typically into the following May" agent-program line: replace with r14's ATO wording, without implying our clients
  get extra time.
Do NOT change: legal text, Will/Ella/Mia/CRM, tracking, titles/descriptions of existing pages (except the factual 12),
H1s, slugs, or anything the reports say Jo must decide.

## Verify before you finish
`npx tsc --noEmit -p .` clean; jest on the suites touching your files (grep __tests__ for your file names) plus
src/lib/__tests__/new-locales-sitemap.test.ts, __tests__/wht-copy-compliance-6-languages.test.ts and src/lib/svt;
pre-existing failures are only the 8 Will/form-start-lang suites. If another agent's file breaks a test, say so, do not
edit it. Dash grep (– — ― ——) and rule grep on your changed files. Log every change to S/plan3/build-<id>.md
(file, what, why, source URL for each fact). Reply in 5 lines.
