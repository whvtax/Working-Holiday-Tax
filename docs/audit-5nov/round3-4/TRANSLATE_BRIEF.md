# Native version of the new guide `early-tax-return-leaving-australia` (one language)

Repository `/home/claude/v3/whvtax-FINAL58`. The English guide is now in `src/app/(site)/blog/data.ts` (search the
slug). Write the native version for your language. Not a line-by-line translation: native writing with the same facts,
structure (H2 questions, answer-first opening, FAQ), links and sources. Keep English terms backpackers search (tax return,
TFN, myGov, ATO, super, DASP) where the language's other guides keep them.

## Where it goes (you own ONLY these files)
- DE: `src/app/(de)/de/blog/data.ts`; JA: `src/app/(ja)/ja/blog/data.ts`. Study how an existing EN guide gets its DE/JA
  version there (same slug key, title, description, body, faq...) and follow that exact shape.
- FR/IT/ES: a chunk file in `src/app/(<l>)/<l>/blog/chunks/` (add to the chunk that holds the Tax Return category guides or
  the last chunk; follow the shape of existing entries). Also add the slug to the `<l>` list in
  `src/lib/locale-guide-slugs.ts` (only your language's array; the test `src/lib/__tests__/new-locales-sitemap.test.ts`
  tells you if the lists disagree).
- Then add 2 contextual links TO the new guide from your language's versions of `tax-obligations-after-leaving-australia`
  and `australian-financial-year-dates` (varied wording, the link format those files already use).
Never edit other files. Do not commit, build or start servers.

## Rules
Never say or imply the business IS a tax agent or lodges as the agent; a registered tax agent reviews and signs off (the
EN guide may say a registered tax agent can lodge an early return online up to 15 June: keep it as a fact about tax agents
in general, never "we"). Never promise a refund or amount. No dashes (em/en). Native register (DE du, FR vous, IT tu,
ES neutral tuteo, JA as the file). JA: never 税理士 for the business. Facts exactly as in the EN guide (ATO-sourced).

## Verify
`npx tsc --noEmit -p .`; `npx jest __tests__/wht-copy-compliance-6-languages.test.ts src/lib/__tests__/new-locales-sitemap.test.ts`
and blog tests (`grep -rl "blog/data\|chunks" src __tests__ --include=*.test.*`). Log to
`/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad/plan/round4/translog-<lang>.md`. Reply in 3 lines.
