# Round 4 guide brief (WHT, ONE language): DASP bridges, new sections, leftover facts

Repository `/home/claude/v3/whvtax-FINAL58`. You own ONLY your language's guide data:
EN `src/app/(site)/blog/data.ts`; DE/JA `src/app/(<l>)/<l>/blog/data.ts`; FR/IT/ES `src/app/(<l>)/<l>/blog/chunks/*.ts`.
(For FR/IT/ES the `blog/data.ts` category file is NOT yours.) Service pages are being edited by other agents right now:
never touch them. Do not commit, build or start servers. `...` = `/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad`.

## Inputs
1. `.../plan/round3/dasp-plan.json`: the parts about super/DASP GUIDES for your language: bridges to the
   superannuation page placed early (not only in the last section), fixes of wrong DASP facts (28 days from a completed
   application; 65% also on the untaxed element for WHM; ATO-held super only to an Australian account or cheque; the
   $5,000 rule concerns the Home Affairs immigration status certificate on paper applications; one application per fund
   account; you cannot claim before leaving), the unclaimed-super guide fixes, and differentiating
   `tax-on-super-withdrawal-backpacker` from `dasp-tax-rate-65-percent-explained` by intent (NO redirects, NO merges, NO
   slug changes; you may retitle the "claim now or leave it" guide as the plan says).
2. `.../plan/round3/new-guides.json`: the SECTION changes it recommends instead of new guides (e.g. a "who may lodge for
   you" section in what-is-a-tax-agent for EN/DE/FR/IT/ES only, the casual shift guide notice section, the
   tax-obligations-after-leaving-australia payslip fix). The new guide `early-tax-return-leaving-australia` is created ONLY by
   the EN agent (EN data.ts entry, full guide per the brief, Tax Return category); other languages skip it this round.
3. Leftovers to fix in your language if present: claims that a part year or short stay is over-withheld at WHM rates
   (WHM withholding is a flat 15% per pay up to $45,000; remove the claim, keep real causes like 45% before the TFN, a
   second job without a declaration, an unregistered employer); JA: medicare-related descriptions saying the levy is
   "差し引かれます" where the body says it is added at assessment (make the body and description agree: the levy is
   calculated at assessment).

## Rules (a single breach is unacceptable)
- Never say or imply the business IS a tax agent or lodges as the agent (any language); a registered tax agent reviews and
  signs off. When describing who may lodge for a fee, describe the registered tax agent role in general terms; never "we".
- Never promise a refund, DASP amount or average. Medicare exemption always conditional. No AI/bots/Student Visa Tax.
- No em/en dashes. Native, natural writing in the page language (FR vous, IT tu, ES neutral tuteo, DE du, JA as the file).
- Facts only from `public/llms.txt` Key facts, the plans' cited official sources, or official pages you fetch.
- Links: follow the link format already used in the file; locale paths must exist (super page `/superannuation` for EN,
  `/<l>/superannuation` otherwise, written the way the file writes other locale links). Vary bridge wording; do not paste
  the same sentence into many guides.
- Keep TS valid (quote styles, backticks, `${`).
- EN only, new guide: also add its slug wherever EN guides need registering (check how a guide becomes live: data.ts list,
  sitemap and llms generator read the data; run the tests below to confirm). Do not edit files outside data.ts; if
  registration needs another file, note it as a handoff.

## Verify
`npx tsc --noEmit -p .`; `npx jest __tests__/wht-copy-compliance-6-languages.test.ts src/lib/__tests__/new-locales-sitemap.test.ts`
and any blog/guide tests (`grep -rl "blog/data\|chunks" src __tests__ --include=*.test.*`). Grep for U+2013/U+2014.
Log: `.../plan/round4/guidelog-<lang>.md` (applied, skipped, handoffs, facts+sources). Reply in 4 lines.
