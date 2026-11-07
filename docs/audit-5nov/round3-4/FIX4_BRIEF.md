# Round 4 fix brief: apply the service-page plans for ONE language (WHT)

Repository `/home/claude/v3/whvtax-FINAL58`. You own ONLY the four service pages of your language and their
co-located files: EN `src/app/(site)/{tfn,abn,tax-return,superannuation}/**`, others
`src/app/(<l>)/<l>/{tfn,abn,tax-return,superannuation}/**`, plus for FR/IT/ES the flagship folder
(`tax-return-australie-pvt`, `dichiarazione-redditi-australia`, `devolucion-impuestos-australia`). Never edit other files.
Other fixers edit other languages and the guide files at the same time. Do not commit, build or start servers.

Plans (`...` = `/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad`):
- `.../plan/round4/svc-{tfn,abn,tax-return,superannuation}-<lang>.json` (one per service)
- DASP research for the super page: `.../plan/round3/dasp-plan.json` (your language's section)
Apply P1 changes, then P2. Skip any change that conflicts with the rules below and log why.

## Rules (a single breach is unacceptable)
- Never say or imply the business IS a tax agent / Steuerberater / 税理士 / agent fiscal / agente fiscale / agente fiscal /
  contador / accountant, or that it lodges the return or the TFN/ABN/DASP application as the agent. Replace "we lodge",
  "wir reichen ein", "当社が提出", "nous déposons", "presentamos nosotros" style lines on these pages with the approved sign-off
  sentence of the language or "prepare" wording. Approved and kept: the sign-off sentence, "operates under the supervision of
  a registered tax agent", "We deal with the ATO directly" (and existing translations), the guarantee wording, and
  "Refunds for our clients range from a few hundred dollars to several thousand" (EN only, keep exactly).
- JA: 税理士 may describe the Australian registered tax agent ROLE in general (e.g. "日本でいう税理士に近い立場"), never the
  business. If unsure, use the plan's fallback without 税理士.
- Never promise a refund, DASP amount or average. Medicare levy exemption: always conditional ("may", "depends on your
  entitlement"), never "you are exempt".
- No em/en dashes. Sentence case headings (EN/FR/IT/ES; keep existing EN Title Case titles only if you are not changing them).
- Facts only as given with official sources in the plans or `public/llms.txt` Key facts. DASP: 65% of the taxable component
  (taxed and untaxed) for WHM; paid within 28 days of a completed application; ATO-held super only to an Australian account
  or by cheque; no time limit to claim. TFN: 45% only applies after the 28-day window unless no TFN declaration was given.
- Keep titles/H1 that perform (the plans already judged this). FAQPage schema must stay generated from the visible FAQ list.
- WhatsApp: use the existing WaButton / waUrl components and topics already used on the page.
- Keep TypeScript valid: respect quote styles and escaping; no non-breaking spaces in code (they are fine inside French
  copy strings where the file already uses them).

## Verify
`cd /home/claude/v3/whvtax-FINAL58 && npx tsc --noEmit -p .` and
`npx jest __tests__/wht-copy-compliance-6-languages.test.ts` plus tests that import your files
(`grep -rl "<service>/page" src __tests__ --include=*.test.*`). Grep your files for U+2013/U+2014.

## Log
`.../plan/round4/fixlog-<lang>.md`: applied (plan + change), skipped (why), facts used (source). Reply in 4 lines.
